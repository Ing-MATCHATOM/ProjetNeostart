<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <div class="w-64 bg-indigo-800 text-white p-6 flex flex-col">
      <h2 class="text-2xl font-bold mb-8">Enseignant</h2>
      <nav class="space-y-4">
        <NuxtLink to="programmation" class="nav-link">Programmation Emploi du temps</NuxtLink>
        <NuxtLink to="emploi" class="nav-link">Emploi du temps</NuxtLink>
        <NuxtLink to="rapport-enseignant" class="nav-link">Rapports</NuxtLink>
        <NuxtLink to="reports" class="nav-link">Report</NuxtLink>
      </nav>
    </div>

    <!-- Contenu principal -->
    <div class="flex-1 p-8 bg-gray-50">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Bienvenue Enseignant</h1>
          <p class="text-gray-600">{{ user.prenom }} {{ user.nom_famille }}</p>
          <p class="text-sm text-gray-500">{{ user.courriel }}</p>
        </div>
        <button
          @click="handleLogout"
          class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Déconnexion
        </button>
      </div>

      <!-- Statistiques -->
      <div class="bg-white p-6 rounded shadow mb-8">
        <h2 class="text-2xl font-semibold mb-4">Statistiques des séances</h2>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div class="dashboard-card">
            <div>
              <p class="dashboard-value">{{ totalSeances }}</p>
              <p class="dashboard-label">Total séances</p>
            </div>
          </div>
          <div class="dashboard-card">
            <div>
              <p class="dashboard-value">{{ planifiees }}</p>
              <p class="dashboard-label">Planifiées</p>
            </div>
          </div>
          <div class="dashboard-card">
            <div>
              <p class="dashboard-value">{{ reportees }}</p>
              <p class="dashboard-label">Reportées</p>
            </div>
          </div>
          <div class="dashboard-card">
            <div>
              <p class="dashboard-value">{{ valides }}</p>
              <p class="dashboard-label">Validées</p>
            </div>
          </div>
        </div>

        <!-- Diagramme circulaire Chart.js -->
        <div class="max-w-md mx-auto">
          <canvas id="seancesChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(PieController, ArcElement, Tooltip, Legend)

const user = ref({})
const seances = ref([])

// Comptage statuts
const totalSeances = ref(0)
const planifiees = ref(0)
const reportees = ref(0)
const valides = ref(0)

// Chart instance
let chartInstance = null

const handleLogout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  navigateTo('/login')
}

// Récupérer l'utilisateur connecté
onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
    fetchSeances()
  } else {
    navigateTo('/login')
  }
})

// Récupérer les séances de l'enseignant
const fetchSeances = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const res = await fetch('http://localhost:8000/api/enseignant/seances', {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()

    seances.value = data

    // Comptage par statut
    totalSeances.value = seances.value.length
    valides.value = seances.value.filter(s => s.statut === 'valide').length
    reportees.value = seances.value.filter(s => s.statut === 'reporte').length
    planifiees.value = seances.value.filter(s => s.statut === 'Planifié' || s.statut === 'attente').length

    await nextTick()
    renderChart()
  } catch (err) {
    console.error('Erreur API:', err)
  }
}

// Fonction pour afficher le pie chart
const renderChart = () => {
  const ctx = document.getElementById('seancesChart').getContext('2d')
  if (chartInstance) chartInstance.destroy()
  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Planifiées', 'Reportées', 'Validées'],
      datasets: [{
        data: [planifiees.value, reportees.value, valides.value],
        backgroundColor: ['#3B82F6', '#FBBF24', '#34D399']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  })
}
</script>

<style scoped>
.nav-link {
  display: block;
  padding: 10px 14px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}
.nav-link:hover {
  background-color: #4338ca;
}

.dashboard-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: all 0.3s;
}
.dashboard-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.dashboard-value {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}
.dashboard-label {
  font-size: 14px;
  color: #555;
  text-align: center;
}
</style>
