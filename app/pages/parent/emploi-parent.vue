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
        <p><strong>Statut :</strong> {{ selectedEvent.extendedProps.statut }}</p>
        <div class="flex justify-end space-x-2 mt-4">
          <button
            class="px-4 py-2 bg-gray-400 text-white rounded-md"
            @click="closeModal"
          >
            Fermer
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
const seances = ref([])
const selectedEvent = ref(null)

// Déconnexion
const handleLogout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  router.push('/login')
}

// Charger les séances liées aux enseignants du parent
const fetchSeances = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await fetch('http://localhost:8000/api/emplois-parent', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!response.ok) throw new Error('Erreur API')
    seances.value = await response.json()
    console.log('Séances parent connecté:', seances.value)
  } catch (err) {
    console.error('Erreur API:', err)
  }
}

onMounted(fetchSeances)

// Conversion des séances pour FullCalendar
const getCalendarEvents = () =>
  seances.value.map(s => ({
    id: s.id_seance,
    title: s.matiere,
    start: mapJourToDate(s.jour, s.heure),
    color: s.statut === 'valide' ? '#34D399'
          : s.statut === 'reporte' ? '#FBBF24'
          : '#3B82F6',
    extendedProps: {
      jour: s.jour,
      heure: s.heure,
      statut: s.statut,
      enseignant: `${s.enseignant_nom} ${s.enseignant_prenom}`
    }
  }))

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, interactionPlugin, listPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek,list'
  },
  locale: 'fr',
  events: getCalendarEvents(),
  eventClick: info => selectedEvent.value = info.event,
  eventContent: arg => {
    const statusText =
      arg.event.extendedProps.statut === 'valide' ? '✅'
      : arg.event.extendedProps.statut === 'reporte' ? '⏰'
      : '⏳'
    return { html: `
      <div class="p-1 cursor-pointer">
        <div class="font-semibold text-sm">${arg.event.title}</div>
        <div class="text-xs">${arg.event.extendedProps.heure}</div>
        <div class="text-xs">${arg.event.extendedProps.enseignant}</div>
        <div class="text-xs">${statusText}</div>
      </div>` }
  }
}))

function closeModal() {
  selectedEvent.value = null
}

function mapJourToDate(jour, heure) {
  const joursMap = { lundi:1, mardi:2, mercredi:3, jeudi:4, vendredi:5, samedi:6, dimanche:0 }
  const today = new Date()
  const diff = (joursMap[jour.toLowerCase()] ?? 1) - today.getDay()
  const eventDate = new Date(today)
  eventDate.setDate(today.getDate() + diff)
  return `${eventDate.toISOString().split('T')[0]}T${heure}`
}
</script>
