<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
    <!-- Effets de fond animés améliorés -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-32 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse-slow delay-500"></div>
    </div>

    <!-- Navigation latérale améliorée -->
    <div class="fixed inset-y-0 left-0 w-20 lg:w-64 bg-white/90 backdrop-blur-2xl border-r border-gray-200/60 z-50 transform transition-all duration-300 hover:bg-white/95 hover:shadow-xl">
      <div class="p-4 lg:p-6 h-full flex flex-col">
        <!-- Logo amélioré -->
        <div class="flex items-center justify-center lg:justify-start gap-3 mb-8 group cursor-pointer" @click="$router.push('/')">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl">
            <i class="fas fa-chalkboard-teacher text-white text-xl"></i>
          </div>
          <div class="hidden lg:block">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              EduManager
            </h1>
            <p class="text-sm text-gray-600 transform transition-all duration-300 group-hover:translate-x-1 mt-1">
              Tableau de Bord Parent
            </p>
          </div>
        </div>

        <!-- Navigation améliorée -->
        <nav class="flex-1 space-y-2">
          <NuxtLink to="/parent/create-enseignant" class="nav-link-enhanced group">
            <i class="fas fa-user-plus text-blue-500 group-hover:text-white transition-colors"></i>
            <span class="hidden lg:block">Gestion des Enseignants</span>
          </NuxtLink>
          <NuxtLink to="/parent/create-eleve" class="nav-link-enhanced group">
            <i class="fas fa-graduation-cap text-green-500 group-hover:text-white transition-colors"></i>
            <span class="hidden lg:block">Gestion des Élèves</span>
          </NuxtLink>
          <NuxtLink to="/parent/create-temoin" class="nav-link-enhanced group">
            <i class="fas fa-user-check text-purple-500 group-hover:text-white transition-colors"></i>
            <span class="hidden lg:block">Gestion des Témoins</span>
          </NuxtLink>
          <NuxtLink to="/parent/rapport-parent" class="nav-link-enhanced group">
            <i class="fas fa-chart-bar text-orange-500 group-hover:text-white transition-colors"></i>
            <span class="hidden lg:block">Rapports & Statistiques</span>
          </NuxtLink>
          <NuxtLink to="/parent/emploi-parent" class="nav-link-enhanced group">
            <i class="fas fa-calendar-alt text-red-500 group-hover:text-white transition-colors"></i>
            <span class="hidden lg:block">Emploi du Temps</span>
          </NuxtLink>
          <NuxtLink to="/parent/mesreports"  class="nav-link-enhanced group">
            <i class="fas fa-calendar-alt text-red-500 group-hover:text-white transition-colors"></i>
            <span class="hidden lg:block">Reports</span>
          </NuxtLink>
          <NuxtLink to="/parent/stat" class="nav-link-enhanced group">
            <i class="fas fa-calendar-alt text-red-500 group-hover:text-white transition-colors"></i>
            <span class="hidden lg:block">Statistiques</span>
          </NuxtLink>
        </nav>

        <!-- Profil utilisateur amélioré -->
        <div class="p-4 border-t border-gray-200/60 mt-auto bg-white/50 rounded-lg">
          <div class="flex items-center justify-center lg:justify-start gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg transform transition-all duration-300 hover:scale-110">
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

    <!-- Contenu principal amélioré -->
    <div class="ml-20 lg:ml-64 min-h-screen flex flex-col">
      <!-- Header amélioré -->
      <header class="bg-white/90 backdrop-blur-2xl border-b border-gray-200/60 py-6 px-8 sticky top-0 z-40 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Tableau de Bord Parent</h1>
            <p class="text-gray-700 text-sm mt-2">Bienvenue, {{ user.prenom_nom }} {{ user.nom_famille }}</p>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Menu utilisateur amélioré -->
            <div class="relative">
              <button 
                @click="toggleUserMenu"
                class="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100/80 transition-all duration-300 border border-gray-200/60 hover:border-gray-300"
              >
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {{ userInitials }}
                </div>
                <div class="text-left hidden sm:block">
                  <span class="font-semibold text-gray-800 block">{{ user.prenom_nom }}</span>
                  <span class="text-xs text-gray-600">Parent</span>
                </div>
                <i class="fas fa-chevron-down text-gray-500 text-sm transition-transform duration-300" :class="{'rotate-180': showUserMenu}"></i>
              </button>
              
              <div 
                v-if="showUserMenu"
                class="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-2xl rounded-xl shadow-2xl border border-gray-200/60 z-20 animate-in slide-in-from-top-2"
              >
                <div class="p-4 border-b border-gray-200/60 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
                  <p class="font-semibold text-gray-800 truncate">{{ user.prenom_nom }} {{ user.nom_famille }}</p>
                  <p class="text-sm text-gray-600 truncate mt-1">{{ user.courriel }}</p>
                </div>
                <NuxtLink to="/parent/profil" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50/80 transition-all duration-200 group">
                  <i class="fas fa-user mr-3 text-blue-500 group-hover:text-blue-600"></i> 
                  <span>Mon profil</span>
                </NuxtLink>
                <NuxtLink to="/parent/parametres" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50/80 transition-all duration-200 group">
                  <i class="fas fa-cog mr-3 text-gray-500 group-hover:text-gray-600"></i> 
                  <span>Paramètres</span>
                </NuxtLink>
                <div class="border-t border-gray-200/60">
                  <button 
                    @click="handleLogout" 
                    class="w-full text-left flex items-center px-4 py-3 text-red-600 hover:bg-red-50/80 transition-all duration-200 group"
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

      <!-- Contenu principal amélioré -->
      <main class="flex-1 overflow-auto p-6 md:p-8">
        <!-- Grid des statistiques amélioré -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="stat-card-enhanced bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <i class="fas fa-chalkboard-teacher stat-icon-enhanced bg-white/20 text-white"></i>
            <div>
              <p class="stat-value-enhanced">{{ stats.enseignants }}</p>
              <p class="stat-label-enhanced">Enseignants</p>
            </div>
          </div>

          <div class="stat-card-enhanced bg-gradient-to-br from-green-500 to-green-600 text-white">
            <i class="fas fa-user-graduate stat-icon-enhanced bg-white/20 text-white"></i>
            <div>
              <p class="stat-value-enhanced">{{ stats.eleves }}</p>
              <p class="stat-label-enhanced">Élèves</p>
            </div>
          </div>

          <div class="stat-card-enhanced bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <i class="fas fa-user-check stat-icon-enhanced bg-white/20 text-white"></i>
            <div>
              <p class="stat-value-enhanced">{{ stats.temoins }}</p>
              <p class="stat-label-enhanced">Témoins</p>
            </div>
          </div>

          <div class="stat-card-enhanced bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <i class="fas fa-clock stat-icon-enhanced bg-white/20 text-white"></i>
            <div>
              <p class="stat-value-enhanced">{{ stats.seances }}</p>
              <p class="stat-label-enhanced">Séances</p>
            </div>
          </div>
        </div>

        <!-- Section supplémentaire pour améliorer le design -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white/80 backdrop-blur-2xl rounded-2xl p-6 border border-gray-200/60 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Activités Récentes</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3 p-3 bg-blue-50/50 rounded-lg">
                <i class="fas fa-plus-circle text-blue-500"></i>
                <p class="text-sm text-gray-700">Nouvel enseignant créé</p>
                <span class="text-xs text-gray-500 ml-auto">Aujourd'hui</span>
              </div>
              <div class="flex items-center space-x-3 p-3 bg-green-50/50 rounded-lg">
                <i class="fas fa-user-graduate text-green-500"></i>
                <p class="text-sm text-gray-700">Élève ajouté</p>
                <span class="text-xs text-gray-500 ml-auto">Hier</span>
              </div>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-2xl rounded-2xl p-6 border border-gray-200/60 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Prochaines Séances</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3 p-3 bg-purple-50/50 rounded-lg">
                <i class="fas fa-clock text-purple-500"></i>
                <p class="text-sm text-gray-700">Mathématiques - 10:00</p>
                <span class="text-xs text-gray-500 ml-auto">Demain</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const user = ref({})
const stats = ref({
  enseignants: 0,
  eleves: 0,
  temoins: 0,
  seances: 0,
})
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

  // Récupérer token
  const token = JSON.parse(localStorage.getItem('token'))
  try {
    const response = await fetch('http://127.0.0.1:8000/api/parent/stats', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) throw new Error('Erreur API')
    stats.value = await response.json()
  } catch (error) {
    console.error('Erreur récupération stats:', error)
  }
})

const handleLogout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  navigateTo('/')
}
</script>

<style scoped>
/* Animation pour le menu utilisateur */
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

.animate-in {
  animation: slideIn 0.2s ease-out;
}

/* Navigation links améliorés */
.nav-link-enhanced {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  color: #374151;
  transition: all 0.3s ease;
}

.nav-link-enhanced:hover {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.nav-link-enhanced.router-link-active {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Cartes de statistiques améliorées */
.stat-card-enhanced {
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-card-enhanced:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.stat-icon-enhanced {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
}

.stat-value-enhanced {
  font-size: 1.875rem;
  font-weight: bold;
  margin-top: 0.5rem;
}

.stat-label-enhanced {
  font-size: 0.875rem;
  opacity: 0.9;
}

/* Amélioration de la visibilité des liens actifs */
.router-link-active {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
}

/* Responsive adjustments améliorés */
@media (max-width: 768px) {
  .flex.items-center.space-x-2 > span:not(.font-bold) {
    display: none;
  }
  
  .stat-card-enhanced {
    padding: 1rem;
  }
  
  .stat-value-enhanced {
    font-size: 1.5rem;
  }
}

/* Effet de pulse amélioré */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>