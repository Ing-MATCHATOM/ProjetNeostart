<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Tableau de bord Témoin</h1>
      <button
        @click="handleLogout"
        class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
      >
        Déconnexion
      </button>
    </div>

    <!-- Calendrier -->
    <div class="bg-white shadow rounded-lg p-4">
      <h2 class="text-xl font-semibold mb-4">Emploi du temps</h2>
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
        <p><strong>Statut :</strong> {{ selectedEvent.extendedProps.statut }}</p>
        
        <div class="flex justify-end space-x-2 mt-4">
          <button
            class="px-4 py-2 bg-gray-400 text-white rounded-md"
            @click="closeModal"
          >
            Fermer
          </button>
          <button
            v-if="selectedEvent.extendedProps.statut === 'Planifié'"
            class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            @click="validateSeance(selectedEvent.id)"
          >
            Valider
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

const router = useRouter()

// === Déconnexion ===
const handleLogout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  router.push('/login')
}

// === Données ===
const seances = ref([])
const selectedEvent = ref(null)

// Charger les données depuis API
const fetchSeances = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await fetch('http://localhost:8000/api/emplois-temoin', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!response.ok) throw new Error('Erreur API')
    seances.value = await response.json()
    console.log('Séances élève connecté:', seances.value)
  } catch (err) {
    console.error('Erreur API:', err)
  }
}
onMounted(fetchSeances)

// === Conversion des données API vers événements FullCalendar ===
function mapJourToDate(jour, heure) {
  const joursMap = {
    lundi: 1,
    mardi: 2,
    mercredi: 3,
    jeudi: 4,
    vendredi: 5,
    samedi: 6,
    dimanche: 0
  }
  const today = new Date()
  const currentDay = today.getDay()
  const targetDay = joursMap[jour.toLowerCase()] ?? 1
  const diff = targetDay - currentDay
  const eventDate = new Date(today)
  eventDate.setDate(today.getDate() + diff)
  return `${eventDate.toISOString().split('T')[0]}T${heure}`
}

const getCalendarEvents = () =>
  seances.value.map((s) => {
    return {
      id: s.id, // ✅ corriger ici, c’est "id" dans ta réponse API
      title: s.matiere,
      start: mapJourToDate(s.jour, s.heure),
      color:
        s.statut === 'valide'
          ? '#34D399'
          : s.statut === 'reporte'
          ? '#FBBF24'
          : '#3B82F6',
      extendedProps: { 
        jour: s.jour,
        heure: s.heure,
        statut: s.statut
      }
    }
  })

// === Événements réactifs ===
const calendarEvents = computed(() => getCalendarEvents())

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
  events: calendarEvents.value, // ✅ maintenant réactif
  eventClick: handleEventClick,
  eventContent: (arg) => {
    const statusText =
      arg.event.extendedProps.statut === 'valide'
        ? '✅'
        : arg.event.extendedProps.statut === 'reporte'
        ? '⏰'
        : '⏳'
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
}
function closeModal() {
  selectedEvent.value = null
}

// === Action Valider ===
const validateSeance = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await fetch(`http://localhost:8000/api/seances/${id}/validerT`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) throw new Error('Erreur validation')
    // Mettre à jour localement
    const seance = seances.value.find((s) => s.id === id)
    if (seance) seance.statut = 'valide'
    closeModal()
  } catch (err) {
    console.error(err)
  }
}
</script>

