<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Tableau de bord Parent</h1>
      <button
        @click="handleLogout"
        class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
      >
        Déconnexion
      </button>
    </div>

    <!-- Calendrier -->
    <div class="bg-white shadow rounded-lg p-4">
      <h2 class="text-xl font-semibold mb-4">Emploi du temps des enseignants</h2>
      <div class="h-[650px] overflow-auto">
        <FullCalendar :options="calendarOptions" />
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="selectedEvent"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-96 p-6">
        <h3 class="text-lg font-bold mb-2">{{ selectedEvent.title }}</h3>
        <p><strong>Jour :</strong> {{ selectedEvent.extendedProps.jour }}</p>
        <p><strong>Heure :</strong> {{ selectedEvent.extendedProps.heure }}</p>
        <p><strong>Enseignant :</strong> {{ selectedEvent.extendedProps.enseignant }}</p>
        <p><strong>Statut :</strong> {{ currentStatus }}</p>

        <!-- Actions principales -->
        <div class="flex justify-end space-x-2 mt-4">
          <button
            class="px-4 py-2 bg-gray-400 text-white rounded-md"
            @click="closeModal"
          >
            Fermer
          </button>

          <button
            class="px-4 py-2 text-white rounded-md"
            :class="toggleButtonColor"
            @click="toggleSeanceValidation(selectedEvent.id)"
          >
            {{ toggleButtonText }}
          </button>

          <button
            class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            @click="showReportForm = !showReportForm"
          >
            Reporter
          </button>

          <button
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            @click="deleteSeance(selectedEvent.id)"
          >
            Supprimer
          </button>
        </div>

        <!-- Formulaire de report -->
        <div v-if="showReportForm" class="mt-4 space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Nouvelle date & heure</label>
            <input
              v-model="reportDate"
              type="datetime-local"
              class="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Motif du report</label>
            <textarea
              v-model="reportReason"
              rows="3"
              class="w-full border rounded px-3 py-2"
              placeholder="Ex: indisponibilité, conflit de salle, etc."
            ></textarea>
          </div>

          <div class="flex justify-end space-x-2">
            <button
              class="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              @click="showReportForm = false"
            >
              Annuler
            </button>
            <button
              class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              @click="reportSeance"
            >
              Confirmer le report
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()

// === Données ===
const seances = ref([])
const selectedEvent = ref(null)
const showReportForm = ref(false)
const reportDate = ref('')
const reportReason = ref('')

// Nouvelle variable reactive pour gérer le statut courant affiché
const currentStatus = ref('')

// === Déconnexion ===
const handleLogout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  router.push('/login')
}

// === API : Charger les séances ===
const fetchSeances = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await fetch('http://localhost:8000/api/emplois-enseignant', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!response.ok) throw new Error('Erreur API')
    seances.value = await response.json()
  } catch (err) {
    toast.error('Erreur lors du chargement des séances.')
    console.error(err)
  }
}
onMounted(fetchSeances)

// === Mapping vers FullCalendar ===
function mapJourToDate(jour, heure) {
  const joursMap = { lundi: 1, mardi: 2, mercredi: 3, jeudi: 4, vendredi: 5, samedi: 6, dimanche: 0 }
  const today = new Date()
  const currentDay = today.getDay()
  const targetDay = joursMap[jour.toLowerCase()] ?? 1
  const diff = (targetDay - currentDay + 7) % 7
  const eventDate = new Date(today)
  eventDate.setDate(today.getDate() + diff)
  return `${eventDate.toISOString().split('T')[0]}T${heure}`
}

// === Événements calendrier ===
const calendarEvents = ref([])
watch(seances, () => {
  calendarEvents.value = seances.value.map((s) => ({
    id: s.id,
    title: s.matiere,
    start: mapJourToDate(s.jour, s.heure),
    color:
      s.statut === 'valide' ? '#34D399' :
      s.statut === 'reporte' ? '#FBBF24' : '#3B82F6',
    extendedProps: {
      jour: s.jour,
      heure: s.heure,
      statut: s.statut,
      enseignant: s.enseignant || 'Non renseigné'
    }
  }))
}, { immediate: true })

// === Options calendrier ===
const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, interactionPlugin, listPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek,list'
  },
  locale: 'fr',
  events: calendarEvents.value,
  eventClick: handleEventClick,
  eventContent: (arg) => {
    const statusText = {
      valide: '✅',
      reporte: '⏰',
      en_attente: '⏳'
    }[arg.event.extendedProps.statut] || '⏳'

    return {
      html: `
        <div class="p-1 cursor-pointer">
          <div class="font-semibold text-sm">${arg.event.title}</div>
          <div class="text-xs">${arg.event.extendedProps.heure}</div>
          <div class="text-xs">${statusText}</div>
        </div>
      `
    }
  }
}))

// === Modal ===
function handleEventClick(info) {
  selectedEvent.value = info.event
  currentStatus.value = info.event.extendedProps.statut  // Mise à jour du statut affiché
  showReportForm.value = false
  reportDate.value = ''
  reportReason.value = ''
}
function closeModal() {
  selectedEvent.value = null
  currentStatus.value = ''
}

// === Toggle statut ===
const isSeanceValide = computed(() => currentStatus.value === 'valide')

const toggleButtonText = computed(() =>
  isSeanceValide.value ? 'Annuler' : 'Valider'
)

const toggleButtonColor = computed(() =>
  isSeanceValide.value
    ? 'bg-red-500 hover:bg-red-600'
    : 'bg-green-500 hover:bg-green-600'
)

const toggleSeanceValidation = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await fetch(`http://localhost:8000/api/seances/${id}/validerE`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) throw new Error('Erreur toggle')

    const seance = seances.value.find((s) => s.id === id)
    if (seance) {
      const newStatut = seance.statut === 'valide' ? 'en_attente' : 'valide'
      seance.statut = newStatut
      selectedEvent.value.setExtendedProp('statut', newStatut)
      currentStatus.value = newStatut  // Mise à jour du statut affiché
      toast.success(`Séance ${newStatut === 'valide' ? 'validée' : 'annulée'}.`)
    }
  } catch (err) {
    console.error(err)
    toast.error('Erreur lors de la mise à jour.')
  }
}

// === Reporter ===
const reportSeance = async () => {
  if (!reportDate.value || !reportReason.value) {
    toast.warning('Veuillez remplir la date et le motif.')
    return
  }

  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await fetch(`http://localhost:8000/api/seances/${selectedEvent.value.id}/reporter`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        nouvelle_date: reportDate.value,
        motif: reportReason.value
      })
    })

    if (!response.ok) throw new Error('Erreur report')

    const seance = seances.value.find((s) => s.id === selectedEvent.value.id)
    if (seance) {
      seance.statut = 'reporte'
      seance.jour = reportDate.value.split('T')[0]
      seance.heure = reportDate.value.split('T')[1]
      selectedEvent.value.setExtendedProp('statut', 'reporte')
      currentStatus.value = 'reporte'  // Mise à jour du statut affiché
    }

    toast.success('Séance reportée.')
    showReportForm.value = false
    closeModal()
  } catch (err) {
    console.error(err)
    toast.error('Erreur lors du report.')
  }
}

// === Supprimer ===
const deleteSeance = async () => {
  const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cette séance ?')
  if (!confirmDelete) return

  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await fetch(`http://localhost:8000/api/seances/${selectedEvent.value.id}/supprimer`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) throw new Error('Erreur suppression')

    // Supprimer localement dans la liste
    seances.value = seances.value.filter((s) => s.id !== selectedEvent.value.id)

    toast.success('Séance supprimée avec succès.')
    closeModal()
  } catch (err) {
    console.error(err)
    toast.error("Erreur lors de la suppression de la séance.")
  }
}

</script>
