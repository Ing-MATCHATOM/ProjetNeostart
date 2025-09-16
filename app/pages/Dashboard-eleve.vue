<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Tableau de bord Élève</h1>
      <button
        @click="handleLogout"
        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Déconnexion
      </button>
    </div>

    <!-- Statistiques rapides -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500">
        <p class="text-gray-500">Séances à venir</p>
        <p class="text-xl font-semibold">{{ seances.length }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-4 border-l-4 border-green-500">
        <p class="text-gray-500">Séances validées</p>
        <p class="text-xl font-semibold">{{ validatedSeances }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-4 border-l-4 border-yellow-500">
        <p class="text-gray-500">Séances reportées</p>
        <p class="text-xl font-semibold">{{ reportedSeances }}</p>
      </div>
    </div>

    <!-- Liste des séances -->
    <div class="bg-white shadow rounded-lg p-4">
      <h2 class="text-xl font-semibold mb-4">Séances à venir</h2>
      <div v-for="seance in seances" :key="seance.id" class="border rounded-lg p-4 mb-3">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="font-semibold text-lg">{{ seance.matiere }}</h3>
            <p class="text-gray-600">{{ formatDate(seance.date) }} à {{ seance.heure }}</p>
          </div>
          <div>
            <span :class="[
              'px-3 py-1 rounded-full text-sm font-medium',
              seance.statut === 'planifie' ? 'bg-blue-100 text-blue-800' : '',
              seance.statut === 'valide' ? 'bg-green-100 text-green-800' : '',
              seance.statut === 'reporte' ? 'bg-yellow-100 text-yellow-800' : ''
            ]">
              {{ getStatusText(seance.statut) }}
            </span>
          </div>
        </div>
        <div class="mt-3 flex space-x-2">
          <button 
            v-if="seance.statut === 'planifie'" 
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            @click="validateSeance(seance.id)"
          >
            Valider
          </button>
          <button 
            v-if="seance.statut === 'planifie'" 
            class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            @click="postponeSeance(seance.id)"
          >
            Reporter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const seances = ref([
  { id: 1, matiere: 'Mathématiques', date: '2025-09-10', heure: '10:00', statut: 'planifie' },
  { id: 2, matiere: 'Physique', date: '2025-09-11', heure: '14:00', statut: 'valide' },
  { id: 3, matiere: 'Chimie', date: '2025-09-15', heure: '11:30', statut: 'planifie' },
  { id: 4, matiere: 'Informatique', date: '2025-09-18', heure: '09:00', statut: 'planifie' }
])

const validatedSeances = ref(1)
const reportedSeances = ref(0)

const formatDate = (dateString) => {
  const options = { weekday: 'long', day: 'numeric', month: 'long' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

const getStatusText = (status) => {
  const statusMap = {
    'planifie': 'Planifié',
    'valide': 'Validé',
    'reporte': 'Reporté'
  }
  return statusMap[status] || status
}

const validateSeance = (id) => {
  const seance = seances.value.find(s => s.id === id)
  if (seance) {
    seance.statut = 'valide'
    validatedSeances.value++
  }
}

const postponeSeance = (id) => {
  const seance = seances.value.find(s => s.id === id)
  if (seance) {
    seance.statut = 'reporte'
    reportedSeances.value++
  }
}

const handleLogout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  router.push('/login')
}
</script>