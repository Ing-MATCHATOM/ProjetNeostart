<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
    <!-- Effets de fond animés -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-32 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
    </div>

    <!-- Navigation latérale -->
    <div class="fixed inset-y-0 left-0 w-20 lg:w-64 bg-white/80 backdrop-blur-2xl border-r border-gray-200/40 z-50 transform transition-all duration-300 hover:bg-white/90 hover:backdrop-blur-3xl">
      <div class="p-4 lg:p-6 h-full flex flex-col">
        <!-- Logo -->
        <div class="flex items-center justify-center lg:justify-start gap-3 mb-8 group cursor-pointer">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <i class="fas fa-user-shield text-white text-lg"></i>
          </div>
          <div class="hidden lg:block">
            <h1 class="text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              EduManager
            </h1>
            <p class="text-xs text-gray-500 transform transition-all duration-300 group-hover:translate-x-1">
              Dashboard Témoins
            </p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="space-y-2 flex-1">
          <NuxtLink 
            to="/Dashboard" 
            class="flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden"
            :class="showList 
              ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 shadow-lg border border-blue-200/50' 
              : 'text-gray-600 hover:bg-white/80 hover:shadow-xl hover:border-blue-200/30'"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 relative z-10"
                 :class="showList 
                   ? 'bg-blue-100 text-blue-600 shadow-sm' 
                   : 'bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:shadow-sm'">
              <i class="fas fa-home text-sm"></i>
            </div>
            <span class="hidden lg:block font-medium text-sm relative z-10 transform transition-transform duration-300 group-hover:translate-x-1">
              Tableau de bord
            </span>
          </NuxtLink>

          <NuxtLink 
            to="/parent/ajout-temoin" 
            class="flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden"
            :class="!showList 
              ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 shadow-lg border border-blue-200/50' 
              : 'text-gray-600 hover:bg-white/80 hover:shadow-xl hover:border-blue-200/30'"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 relative z-10"
                 :class="!showList 
                   ? 'bg-blue-100 text-blue-600 shadow-sm' 
                   : 'bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:shadow-sm'">
              <i class="fas fa-user-plus text-sm"></i>
            </div>
            <span class="hidden lg:block font-medium text-sm relative z-10 transform transition-transform duration-300 group-hover:translate-x-1">
              Créer Témoin
            </span>
          </NuxtLink>
        </nav>

        <!-- User info -->
        <div class="pt-4 border-t border-gray-100/50">
          <div class="flex items-center justify-center lg:justify-start gap-2 p-2 rounded-xl bg-gradient-to-r from-gray-50/50 to-blue-50/30 backdrop-blur-sm border border-gray-200/30 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
              <i class="fas fa-user text-white text-xs"></i>
            </div>
            <div class="hidden lg:block flex-1 min-w-0">
              <p class="font-medium text-gray-900 text-sm truncate">Admin User</p>
              <p class="text-xs text-gray-500 truncate">Administrateur</p>
            </div>
            <i class="hidden lg:block fas fa-chevron-down text-gray-400 text-xs transform transition-transform duration-300 hover:rotate-180"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu principal -->
    <main class="ml-0 lg:ml-20 xl:ml-64 min-h-screen p-4 lg:p-6 relative z-10 transition-all duration-300">
      <!-- En-tête -->
      <div class="mb-6 transform transition-all duration-300">
        <div class="flex justify-between items-start mb-4">
          <div class="transform transition-all duration-300 hover:translate-x-2">
            <h1 class="text-xl lg:text-2xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              Gestion des Témoins
            </h1>
            <p class="text-xs lg:text-sm text-gray-600 transform transition-all duration-300 delay-75">
              Consultez et gérez tous les témoins de l'établissement
            </p>
          </div>
        </div>

        <!-- Statistiques rapides -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 mb-6">
          <div v-for="(stat, index) in stats" :key="index"
               class="bg-white/80 backdrop-blur-lg rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-gray-200/40 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-200/60"
               :style="`animation-delay: ${index * 100}ms`">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-medium text-gray-600">{{ stat.label }}</p>
                <p class="text-lg lg:text-xl font-bold text-gray-900">{{ stat.value }}</p>
                <p class="text-xs text-green-500 font-medium mt-1" v-if="stat.trend">
                  <i class="fas fa-arrow-up text-xs mr-1"></i>
                  {{ stat.trend }}
                </p>
              </div>
              <div class="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110"
                   :class="stat.iconBg">
                <i :class="stat.icon" class="text-white text-xs lg:text-sm"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Liste des témoins -->
        <div v-if="showList" class="bg-white/80 backdrop-blur-lg rounded-2xl lg:rounded-3xl border border-gray-200/40 shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
          <!-- En-tête du tableau -->
          <div class="p-4 lg:p-6 border-b border-gray-100/40 bg-gradient-to-r from-gray-50/50 to-blue-50/30">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 lg:gap-4">
              <div>
                <h2 class="text-base lg:text-lg font-bold text-gray-900 mb-1">Liste des témoins</h2>
                <p class="text-xs text-gray-600">Gérez les témoins et leurs associations</p>
              </div>
              <div class="flex items-center gap-2 lg:gap-3 w-full sm:w-auto">
                <div class="relative flex-1 sm:flex-none min-w-[150px] lg:min-w-[200px]">
                  <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                  <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    class="w-full pl-9 lg:pl-10 pr-3 lg:pr-4 py-2 lg:py-3 bg-white/80 border border-gray-200/60 rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-sm backdrop-blur-sm"
                    v-model="searchQuery"
                  >
                </div>
                <button class="p-2 lg:p-3 bg-white/80 border border-gray-200/60 rounded-lg lg:rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  <i class="fas fa-filter text-gray-600 text-sm"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Tableau -->
          <div class="overflow-x-auto custom-scrollbar">
            <table class="w-full min-w-[500px] lg:min-w-[600px]">
              <thead class="bg-gradient-to-r from-gray-50/80 to-blue-50/30 backdrop-blur-sm">
                <tr>
                  <th class="px-4 lg:px-6 py-3 lg:py-4 text-left font-semibold text-gray-700 text-xs uppercase tracking-wider rounded-l-xl">
                    <div class="flex items-center gap-2">
                      <span>Témoin</span>
                      <i class="fas fa-sort text-gray-400 text-xs cursor-pointer hover:text-gray-600 transition-colors"></i>
                    </div>
                  </th>
                  <th class="px-4 lg:px-6 py-3 lg:py-4 text-left font-semibold text-gray-700 text-xs uppercase tracking-wider">
                    Contact
                  </th>
                
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100/40">
                <tr 
                  v-for="(temoin, index) in filteredTemoins" 
                  :key="getTemoinId(temoin)" 
                  class="hover:bg-gradient-to-r from-blue-50/20 to-purple-50/20 transition-all duration-300 group transform hover:scale-[1.01]"
                  :style="`animation-delay: ${index * 50}ms`"
                >
                  <td class="px-4 lg:px-6 py-3 lg:py-4 rounded-l-xl">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg lg:rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-lg transform transition-all duration-300 group-hover:scale-110">
                        {{ getInitials(temoin) }}
                      </div>
                      <div class="min-w-0">
                        <p class="font-semibold text-gray-900 text-sm truncate">{{ getTemoinNom(temoin) }} {{ getTemoinPrenom(temoin) }}</p>
                        <p class="text-xs text-gray-500 truncate flex items-center gap-1 mt-1">
                          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                          Actif
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 lg:px-6 py-3 lg:py-4">
                    <p class="text-gray-900 text-sm truncate font-medium">{{ getTemoinEmail(temoin) }}</p>
                    
                  </td>
                  <td class="px-4 lg:px-6 py-3 lg:py-4">
                    <div class="space-y-2 max-w-xs">
                      <div v-for="asso in temoin.associations" :key="asso.id" 
                           class="flex items-center gap-2 p-2 bg-white/50 rounded-lg border border-gray-200/40 transform transition-all duration-300 hover:scale-105">
                        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <div class="flex-1 min-w-0">
                          <p class="text-xs font-medium text-gray-900 truncate">
                            {{ asso.eleve.nom_famille }} {{ asso.eleve.prenom }}
                          </p>
                          <p class="text-xs text-gray-500 flex items-center gap-1 truncate">
                            <i class="fas fa-chalkboard-teacher text-gray-400 text-xs"></i>
                            {{ asso.enseignant.nom_famille }} {{ asso.enseignant.prenom }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pied de tableau -->
          <div class="p-3 lg:p-4 border-t border-gray-100/40 bg-gradient-to-r from-gray-50/50 to-blue-50/30 backdrop-blur-sm">
            <div class="flex flex-col sm:flex-row justify-between items-center gap-2 lg:gap-3">
              <p class="text-xs text-gray-600 font-medium">
                Affichage de <span class="text-blue-600 font-bold">{{ filteredTemoins.length }}</span> 
                sur <span class="text-gray-900 font-bold">{{ temoins.length }}</span> témoins
              </p>
              <div class="flex items-center gap-1 lg:gap-2">
                <button class="w-7 h-7 lg:w-8 lg:h-8 bg-white border border-gray-200/60 rounded-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <i class="fas fa-chevron-left text-gray-600 text-xs"></i>
                </button>
                <span class="text-xs text-gray-600 font-medium mx-1 lg:mx-2">Page 1 sur 1</span>
                <button class="w-7 h-7 lg:w-8 lg:h-8 bg-white border border-gray-200/60 rounded-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <i class="fas fa-chevron-right text-gray-600 text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const base_url = "http://127.0.0.1:8000/api"
const showList = ref(true)
const temoins = ref([])
const searchQuery = ref('')
const listes = ref({ eleves: [], enseignants: [] })

const modal = ref({
  open: false,
  temoinId: null,
  eleveId: '',
  enseignantId: '',
  loading: false
})

const form = ref({ nom: '', prenom: '', courriel: '' })
const loading = ref(false)

// Statistiques calculées
const stats = computed(() => [
  {
    label: 'Total Témoins',
    value: temoins.value.length,
    trend: '+2.1%',
    icon: 'fas fa-user-shield',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    label: 'Taux d\'Engagement',
    value: '78%',
    trend: '+2.5%',
    icon: 'fas fa-chart-line',
    iconBg: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    label: 'Nouveaux Témoins',
    value: temoins.value.filter(t => t.statut === 'nouveau').length,
    trend: '+1.9%',
    icon: 'fas fa-user-plus',
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600'
  }
])

// Computed properties
const filteredTemoins = computed(() => {
  if (!searchQuery.value) return temoins.value
  return temoins.value.filter(temoin => {
    const nom = getTemoinNom(temoin).toLowerCase()
    const prenom = getTemoinPrenom(temoin).toLowerCase()
    const email = getTemoinEmail(temoin).toLowerCase()
    const search = searchQuery.value.toLowerCase()
    return nom.includes(search) || prenom.includes(search) || email.includes(search)
  })
})

const totalAssociations = computed(() => {
  return temoins.value.reduce((total, temoin) => total + (temoin.associations?.length || 0), 0)
})

const selectedWitnessName = computed(() => {
  if (!modal.value.temoinId) return ''
  const temoin = temoins.value.find(t => getTemoinId(t) === modal.value.temoinId)
  return temoin ? `${getTemoinNom(temoin)} ${getTemoinPrenom(temoin)}` : ''
})

// Helpers
const getToken = () => JSON.parse(localStorage.getItem('token'))

const getTemoinId = (temoin) => temoin?.temoin?.id ? temoin.temoin.id : temoin?.id
const getTemoinNom = (temoin) => temoin?.nom ?? temoin?.temoin?.nom
const getTemoinPrenom = (temoin) => temoin?.prenom ?? temoin?.temoin?.prenom
const getTemoinEmail = (temoin) => temoin?.courriel ?? temoin?.temoin?.courriel

const getInitials = (temoin) => {
  const nom = getTemoinNom(temoin) || ''
  const prenom = getTemoinPrenom(temoin) || ''
  return (prenom[0] + nom[0]).toUpperCase()
}

// Fonctions API
const fetchTemoins = async () => {
  const token = getToken()
  if (!token) return alert('Veuillez vous connecter')
  try {
    const res = await fetch(`${base_url}/temoin/index`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    temoins.value = data.map(temoin => ({
      ...temoin,
      statut: Math.random() > 0.7 ? 'nouveau' : 'actif'
    }))
  } catch (error) {
    console.error('Erreur fetchTemoins:', error)
  }
}

const handleSubmit = async () => {
  loading.value = true
  const token = getToken()
  if (!token) {
    alert('Veuillez vous connecter')
    loading.value = false
    return
  }
  try {
    const res = await fetch(`${base_url}/temoin/store`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(form.value)
    })
    alert('Enregistrement effectué')
    form.value = { nom: '', prenom: '', courriel: '' }
    showList.value = true
    await fetchTemoins()
  } catch (err) {
    console.error(err)
    alert('Erreur création')
  } finally {
    loading.value = false
  }
}

const openAssocier = async (temoinId) => {
  modal.value.temoinId = temoinId
  modal.value.open = true
  modal.value.eleveId = ''
  modal.value.enseignantId = ''

  const token = getToken()
  if (!token) return alert('Veuillez vous connecter')

  try {
    const [elevesRes, enseignantsRes] = await Promise.all([
      fetch(`${base_url}/eleve`, { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch(`${base_url}/enseignant`, { headers: { 'Authorization': `Bearer ${token}` } })
    ])

    if (!elevesRes.ok || !enseignantsRes.ok) throw new Error('Erreur API')
    listes.value.eleves = await elevesRes.json()
    listes.value.enseignants = await enseignantsRes.json()
  } catch (e) {
    console.error('Erreur openAssocier:', e)
  }
}

const closeModal = () => { 
  modal.value.open = false 
}

onMounted(fetchTemoins)
</script>

<style scoped>
/* Animations personnalisées */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Scrollbar personnalisée */
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
}

/* Animations d'entrée pour les lignes du tableau */
tr {
  animation: slideInUp 0.5s ease-out forwards;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Effets de hover améliorés */
.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Gradient animé pour les boutons */
.gradient-animate {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Responsive design amélioré */
@media (max-width: 1024px) {
  .ml-64 {
    margin-left: 5rem;
  }
}

@media (max-width: 768px) {
  .ml-64 {
    margin-left: 0;
  }
  
  .fixed.inset-y-0 {
    transform: translateX(-100%);
  }
  
  .min-w-\[500px\] {
    min-width: 400px;
  }
}

@media (max-width: 480px) {
  .min-w-\[500px\] {
    min-width: 320px;
  }
  
  .grid-cols-1 {
    grid-template-columns: 1fr;
  }
  
  .text-xl {
    font-size: 1.25rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
}
</style>