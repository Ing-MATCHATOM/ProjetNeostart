<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
    <!-- Effets de fond légers et modernes -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-32 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl animate-float-slow delay-2000"></div>
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl animate-float-slow delay-1000"></div>
      <div class="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-200/30 rounded-full blur-3xl animate-float-slow delay-1500"></div>
      
      <!-- Motifs géométriques subtils -->
      <div class="absolute inset-0 opacity-[0.03]">
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse-slow"></div>
      </div>
    </div>

    <!-- Navigation latérale claire -->
    <div class="fixed inset-y-0 left-0 w-20 lg:w-64 bg-white/95 backdrop-blur-2xl border-r border-gray-200/60 z-50 transform transition-all duration-500 hover:bg-white/98 hover:shadow-xl">
      <div class="p-4 lg:p-6 h-full flex flex-col">
        <!-- Logo élégant -->
        <div class="flex items-center justify-center lg:justify-start gap-3 mb-8 group cursor-pointer" @click="$router.push('/')">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-blue-200/50">
            <i class="fas fa-chalkboard-teacher text-white text-xl"></i>
          </div>
          <div class="hidden lg:block">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduManager
            </h1>
            <p class="text-sm text-gray-600 transform transition-all duration-500 group-hover:translate-x-1 mt-1">
              Tableau de Bord
            </p>
          </div>
        </div>

        <!-- Navigation claire -->
        <nav class="flex-1 space-y-3">
          <NuxtLink to="programmation" class="nav-link-light group">
            <div class="nav-icon-container">
              <i class="fas fa-user-plus text-blue-500 group-hover:text-white transition-colors"></i>
            </div>
            <span class="hidden lg:block">Programmation</span>
            <div class="nav-highlight"></div>
          </NuxtLink>
          
          <NuxtLink to="emploi" class="nav-link-light group">
            <div class="nav-icon-container">
              <i class="fas fa-graduation-cap text-emerald-500 group-hover:text-white transition-colors"></i>
            </div>
            <span class="hidden lg:block">Emploi du temps</span>
            <div class="nav-highlight"></div>
          </NuxtLink>
          
          <NuxtLink to="rapport-enseignant" class="nav-link-light group">
            <div class="nav-icon-container">
              <i class="fas fa-user-check text-purple-500 group-hover:text-white transition-colors"></i>
            </div>
            <span class="hidden lg:block">Rapports</span>
            <div class="nav-highlight"></div>
          </NuxtLink>
          
          <NuxtLink to="reports" class="nav-link-light group">
            <div class="nav-icon-container">
              <i class="fas fa-chart-bar text-orange-500 group-hover:text-white transition-colors"></i>
            </div>
            <span class="hidden lg:block">Report</span>
            <div class="nav-highlight"></div>
          </NuxtLink>
        </nav>

        <!-- Profil utilisateur clair -->
        <div class="p-4 border-t border-gray-200/60 mt-auto bg-white/80 rounded-xl backdrop-blur-lg">
          <div class="flex items-center justify-center lg:justify-start gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-3">
              {{ userInitials }}
            </div>
            <div class="hidden lg:block truncate">
              <p class="font-semibold text-sm truncate text-gray-800">{{ user.prenom_nom }} {{ user.nom_famille }}</p>
              <p class="text-xs text-gray-600 truncate">{{ user.courriel }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu principal clair -->
    <div class="ml-20 lg:ml-64 min-h-screen flex flex-col">
      <!-- Header clair -->
      <header class="bg-white/95 backdrop-blur-2xl border-b border-gray-200/60 py-6 px-8 sticky top-0 z-40 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Tableau de Bord Enseignant</h1>
            <p class="text-gray-700 text-sm mt-2">Bienvenue, {{ user.prenom_nom }} {{ user.nom_famille }}</p>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Menu utilisateur clair -->
            <div class="relative">
              <button 
                @click="toggleUserMenu"
                class="flex items-center space-x-3 p-3 rounded-xl bg-white/80 hover:bg-white transition-all duration-300 border border-gray-200/60 hover:border-blue-300 hover:shadow-lg"
              >
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {{ userInitials }}
                </div>
                <div class="text-left hidden sm:block">
                  <span class="font-semibold text-gray-800 block">{{ user.prenom_nom }}</span>
                  <span class="text-xs text-gray-600">Enseignant</span>
                </div>
                <i class="fas fa-chevron-down text-gray-500 text-sm transition-transform duration-300" :class="{'rotate-180': showUserMenu}"></i>
              </button>
              
              <div 
                v-if="showUserMenu"
                class="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200/60 z-20 animate-in slide-in-from-top-2"
              >
                <div class="p-4 border-b border-gray-200/60 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                  <p class="font-semibold text-gray-800 truncate">{{ user.prenom_nom }} {{ user.nom_famille }}</p>
                  <p class="text-sm text-gray-600 truncate mt-1">{{ user.courriel }}</p>
                </div>
                <NuxtLink to="/parent/profil" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-all duration-200 group border-b border-gray-200/30">
                  <i class="fas fa-user mr-3 text-blue-500 group-hover:text-blue-600"></i> 
                  <span>Mon profil</span>
                </NuxtLink>
                <NuxtLink to="/parent/parametres" class="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 transition-all duration-200 group border-b border-gray-200/30">
                  <i class="fas fa-cog mr-3 text-gray-500 group-hover:text-gray-600"></i> 
                  <span>Paramètres</span>
                </NuxtLink>
                <div class="border-t border-gray-200/60">
                  <button 
                    @click="handleLogout" 
                    class="w-full text-left flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 group"
                  >
                    <i class="fas fa-sign-out-alt mr-3 group-hover:scale-110 transition-transform"></i> 
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Contenu des statistiques clair -->
      <main class="flex-1 p-8">
        <!-- Statistiques -->
        <div class="bg-white/80 backdrop-blur-2xl p-8 rounded-3xl shadow-lg border border-gray-200/40 mb-8">
          <h2 class="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Statistiques des séances</h2>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="stat-card-light group">
              <div class="stat-content">
                <p class="stat-value">{{ totalSeances }}</p>
                <p class="stat-label">Total séances</p>
              </div>
              <div class="stat-gradient bg-gradient-to-br from-blue-100 to-blue-200"></div>
            </div>
            <div class="stat-card-light group">
              <div class="stat-content">
                <p class="stat-value">{{ totalSeances-reportees-valides }}</p>
                <p class="stat-label">Planifiées</p>
              </div>
              <div class="stat-gradient bg-gradient-to-br from-emerald-100 to-emerald-200"></div>
            </div>
            <div class="stat-card-light group">
              <div class="stat-content">
                <p class="stat-value">{{ reportees }}</p>
                <p class="stat-label">Reportées</p>
              </div>
              <div class="stat-gradient bg-gradient-to-br from-amber-100 to-amber-200"></div>
            </div>
            <div class="stat-card-light group">
              <div class="stat-content">
                <p class="stat-value">{{ valides }}</p>
                <p class="stat-label">Validées</p>
              </div>
              <div class="stat-gradient bg-gradient-to-br from-purple-100 to-purple-200"></div>
            </div>
          </div>

          <!-- Diagramme circulaire Chart.js -->
          <div class="max-w-md mx-auto bg-white/60 rounded-2xl p-6 border border-gray-200/40">
            <canvas id="seancesChart"></canvas>
          </div>
        </div>
      </main>
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
  navigateTo('/')
}
const showUserMenu = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const userInitials = computed(() => {
  if (user.value.prenom_nom && user.value.nom_famille) {
    return (user.value.prenom_nom[0] + user.value.nom_famille[0]).toUpperCase()
  }
  return 'U'
})

onMounted(async () => {
  // Récupérer utilisateur
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  } else {
    navigateTo('/')
    return
  }
})

// Récupérer l'utilisateur connecté
onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
    fetchSeances()
  } else {
    navigateTo('/')
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
    // Récupérer le count des séances validées
    const resCount = await fetch('http://localhost:8000/api/stats-validations', {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (!resCount.ok) throw new Error('Erreur lors de la récupération du count')
    const dataCount = await resCount.json()

    // Affecter directement le count à valides.value
    valides.value = dataCount.count || 0
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
        data: [totalSeances.value  -  reportees.value - valides.value, reportees.value, valides.value],
        backgroundColor: ['#3b82f6', '#f59e0b', '#10b981'],
        borderColor: ['#1d4ed8', '#d97706', '#047857'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { 
          position: 'bottom',
          labels: {
            color: '#374151',
            font: {
              size: 12
            }
          }
        }
      }
    }
  })
}
</script>

<style scoped>
/* Animations douces */
@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(180deg); }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-in {
  animation: slideIn 0.3s ease-out;
}

/* Navigation links clairs */
.nav-link-light {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 1rem;
  color: #6b7280;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.nav-link-light:hover {
  color: #ffffff;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  transform: translateX(5px);
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3);
}

.nav-link-light.router-link-active {
  color: #ffffff;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3);
}

.nav-icon-container {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.nav-link-light:hover .nav-icon-container,
.nav-link-light.router-link-active .nav-icon-container {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.nav-highlight {
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 0;
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.nav-link-light:hover .nav-highlight,
.nav-link-light.router-link-active .nav-highlight {
  height: 60%;
}

/* Cartes de statistiques claires */
.stat-card-light {
  position: relative;
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.4s ease;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.stat-card-light:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}

.stat-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.stat-card-light:hover .stat-gradient {
  opacity: 1;
}

.stat-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, #1d4ed8, #7c3aed);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .stat-value {
    font-size: 2rem;
  }
  
  .nav-link-light {
    padding: 0.5rem;
  }
}
</style>