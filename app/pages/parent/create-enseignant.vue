<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
    <!-- Effets de fond animés -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-32 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
    </div>

    <!-- Navigation latérale -->
    <div class="fixed inset-y-0 left-0 w-64 bg-white/80 backdrop-blur-2xl border-r border-gray-200/40 z-50 transform transition-all duration-300 hover:bg-white/90 hover:backdrop-blur-3xl">
      <div class="p-6 h-full flex flex-col">
        <!-- Logo -->
        <div class="flex items-center gap-3 mb-8 group cursor-pointer">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <i class="fas fa-chalkboard-teacher text-white text-lg"></i>
          </div>
          <div>
            <h1 class="text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              EduManager
            </h1>
            <p class="text-xs text-gray-500 transform transition-all duration-300 group-hover:translate-x-1">
              Dashboard Enseignant
            </p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="space-y-2 flex-1">
          <NuxtLink 
            to="/Dashboard" 
            class="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden"
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
            <span class="font-medium text-sm relative z-10 transform transition-transform duration-300 group-hover:translate-x-1">
              Tableau de bord
            </span>
          </NuxtLink>

          <NuxtLink 
            to="/parent/ajout-enseignant" 
            class="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden"
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
            <span class="font-medium text-sm relative z-10 transform transition-transform duration-300 group-hover:translate-x-1">
              Créer Enseignant
            </span>
          </NuxtLink>
        </nav>

        <!-- User info -->
        <div class="pt-4 border-t border-gray-100/50">
          <div class="flex items-center gap-2 p-2 rounded-xl bg-gradient-to-r from-gray-50/50 to-blue-50/30 backdrop-blur-sm border border-gray-200/30 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
              <i class="fas fa-user text-white text-xs"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 text-sm truncate">Admin User</p>
              <p class="text-xs text-gray-500 truncate">Administrateur</p>
            </div>
            <i class="fas fa-chevron-down text-gray-400 text-xs transform transition-transform duration-300 hover:rotate-180"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu principal -->
    <main class="ml-64 min-h-screen p-6 relative z-10">
      <!-- En-tête -->
      <div class="mb-6 transform transition-all duration-300">
        <div class="flex justify-between items-start mb-4">
          <div class="transform transition-all duration-300 hover:translate-x-2">
            <h1 class="text-2xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              Gestion des Enseignants
            </h1>
            <p class="text-sm text-gray-600 transform transition-all duration-300 delay-75">
              Consultez et gérez tous les enseignants de l'établissement
            </p>
          </div>
        </div>

        <!-- Statistiques rapides -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div v-for="(stat, index) in stats" :key="index"
               class="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-gray-200/40 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-200/60"
               :style="`animation-delay: ${index * 100}ms`">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-medium text-gray-600">{{ stat.label }}</p>
                <p class="text-xl font-bold text-gray-900">{{ stat.value }}</p>
                <p class="text-xs text-green-500 font-medium mt-1" v-if="stat.trend">
                  <i class="fas fa-arrow-up text-xs mr-1"></i>
                  {{ stat.trend }}
                </p>
              </div>
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110"
                   :class="stat.iconBg">
                <i :class="stat.icon" class="text-white text-sm"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Liste des enseignants -->
    <div v-if="showList" class="bg-white/80 backdrop-blur-lg rounded-3xl border border-gray-200/40 shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
      <!-- En-tête du tableau -->
      <div class="p-6 border-b border-gray-100/40 bg-gradient-to-r from-gray-50/50 to-blue-50/30">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 class="text-lg font-bold text-gray-900 mb-1">Liste des enseignants</h2>
            <p class="text-sm text-gray-600">Gérez les enseignants et leurs associations</p>
          </div>
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <div class="relative flex-1 sm:flex-none min-w-[200px]">
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              <input 
                type="text" 
                placeholder="Rechercher un enseignant..." 
                class="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-sm backdrop-blur-sm"
                v-model="searchQuery"
              >
            </div>
            <button class="p-3 bg-white/80 border border-gray-200/60 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              <i class="fas fa-filter text-gray-600 text-sm"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Tableau -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full min-w-[900px]"> <!-- Augmenté la largeur minimale -->
          <thead class="bg-gradient-to-r from-gray-50/80 to-blue-50/30 backdrop-blur-sm">
            <tr>
              <th class="px-6 py-4 text-left font-semibold text-gray-700 text-xs uppercase tracking-wider rounded-l-xl">
                <div class="flex items-center gap-2">
                  <span>Enseignant</span>
                  <i class="fas fa-sort text-gray-400 text-xs cursor-pointer hover:text-gray-600 transition-colors"></i>
                </div>
              </th>
              <th class="px-6 py-4 text-left font-semibold text-gray-700 text-xs uppercase tracking-wider">
                Contact
              </th>
              <th class="px-6 py-4 text-left font-semibold text-gray-700 text-xs uppercase tracking-wider">
                Mode de Paiement
              </th>
              <th class="px-6 py-4 text-left font-semibold text-gray-700 text-xs uppercase tracking-wider">
                Salaire
              </th>
              <th class="px-6 py-4 text-left font-semibold text-gray-700 text-xs uppercase tracking-wider">
                Associations
              </th>
              <th class="px-6 py-4 text-left font-semibold text-gray-700 text-xs uppercase tracking-wider rounded-r-xl">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100/40">
            <tr 
              v-for="(ens, index) in filteredEnseignants" 
              :key="getEnsId(ens)" 
              class="hover:bg-gradient-to-r from-blue-50/20 to-purple-50/20 transition-all duration-300 group transform hover:scale-[1.02]"
              :style="`animation-delay: ${index * 50}ms`"
            >
              <td class="px-6 py-4 rounded-l-xl">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-lg transform transition-all duration-300 group-hover:scale-110">
                    {{ getInitials(ens) }}
                  </div>
                  <div class="min-w-0">
                    <p class="font-semibold text-gray-900 text-sm truncate">{{ getEnsNom(ens) }} {{ getEnsPrenom(ens) }}</p>
                    <p class="text-xs text-gray-500 truncate flex items-center gap-1 mt-1">
                      <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      En ligne
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <p class="text-gray-900 text-sm truncate font-medium">{{ getEnsEmail(ens) }}</p>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                  <span class="text-xs font-medium px-2 py-1 rounded-full" 
                        :class="getModePaiementClass(getModePaiement(ens))">
                    {{ getModePaiement(ens) }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-col gap-1">
                  <p class="text-sm font-bold text-green-600">
                    {{ formatSalaireFCFA(getEnsSalaire(ens)) }}
                  </p>
                  <p class="text-xs text-gray-500 flex items-center gap-1">
                    <i class="fas fa-calendar text-gray-400"></i>
                    {{ getModePaiement(ens) }}
                  </p>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="space-y-2 max-w-xs">
                  <div v-for="asso in ens.associations" :key="asso.id" 
                       class="flex items-center gap-2 p-2 bg-white/50 rounded-lg border border-gray-200/40 transform transition-all duration-300 hover:scale-105">
                    <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div class="flex-1 min-w-0">
                      <p class="text-xs font-medium text-gray-900 truncate">
                        {{ asso.eleve.nom_famille }} {{ asso.eleve.prenom }}
                      </p>
                      <p class="text-xs text-gray-500 flex items-center gap-1 truncate">
                        <i class="fas fa-user-friends text-gray-400 text-xs"></i>
                        {{ asso.temoin ? asso.temoin.nom + ' ' + asso.temoin.prenom : 'Aucun témoin' }}
                      </p>
                    </div>
                  </div>
                  <div v-if="!ens.associations || ens.associations.length === 0" 
                       class="text-xs text-gray-400 italic p-2 text-center">
                    Aucune association
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 rounded-r-xl">
                <div class="flex items-center gap-2">
                  <button
                    @click="openAssocier(getEnsId(ens))"
                    class="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-xs shadow-md"
                  >
                    <i class="fas fa-link text-xs"></i>
                    Associer
                  </button>
                  <button class="w-9 h-9 bg-white border border-gray-200/60 rounded-xl flex items-center justify-center hover:bg-gray-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105 group/action">
                    <i class="fas fa-ellipsis-v text-gray-600 text-xs group-hover/action:text-blue-600"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

          <!-- Pied de tableau -->
          <div class="p-4 border-t border-gray-100/40 bg-gradient-to-r from-gray-50/50 to-blue-50/30 backdrop-blur-sm">
            <div class="flex flex-col sm:flex-row justify-between items-center gap-3">
              <p class="text-xs text-gray-600 font-medium">
                Affichage de <span class="text-blue-600 font-bold">{{ filteredEnseignants.length }}</span> 
                sur <span class="text-gray-900 font-bold">{{ enseignants.length }}</span> enseignants
              </p>
              <div class="flex items-center gap-2">
                <button class="w-8 h-8 bg-white border border-gray-200/60 rounded-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <i class="fas fa-chevron-left text-gray-600 text-xs"></i>
                </button>
                <span class="text-xs text-gray-600 font-medium mx-2">Page 1 sur 1</span>
                <button class="w-8 h-8 bg-white border border-gray-200/60 rounded-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <i class="fas fa-chevron-right text-gray-600 text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Association -->
    <div v-if="modal.open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Overlay avec animation -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300" 
           @click="closeModal"></div>
      
      <!-- Modal -->
      <div class="relative w-full max-w-md transform transition-all duration-300 scale-95 opacity-0"
           :class="modal.open ? 'scale-100 opacity-100' : ''">
        <div class="bg-white rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden mx-auto">
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative overflow-hidden">
            <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <h3 class="text-xl font-bold relative z-10">Associer un enseignant</h3>
            <p class="opacity-90 text-sm relative z-10 mt-1">Liez un enseignant à des élèves et témoins</p>
          </div>
          
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Enseignant</label>
              <div class="p-3 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl border border-gray-200/40">
                <p class="font-medium text-gray-900 text-sm">{{ selectedTeacherName }}</p>
                <p class="text-xs text-gray-500">Mathématiques</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Élève *</label>
              <select 
                v-model="modal.eleveId" 
                class="w-full px-4 py-3 bg-white border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-sm backdrop-blur-sm"
              >
                <option value="" disabled>-- Sélectionner un élève --</option>
                <option v-for="e in listes.eleves" :key="e.eleve.id" :value="e.eleve.id">
                  {{ e.eleve.nom_famille }} {{ e.eleve.prenom }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Témoin (optionnel)</label>
              <select 
                v-model="modal.temoinId" 
                class="w-full px-4 py-3 bg-white border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-sm backdrop-blur-sm"
              >
                <option value="">-- Aucun témoin --</option>
                <option v-for="t in listes.temoins" :key="t.temoin.id" :value="t.temoin.id">
                  {{ t.temoin.nom }} {{ t.temoin.prenom }}
                </option>
              </select>
            </div>

            <div class="flex gap-3 pt-2">
              <button 
                @click="closeModal"
                class="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
              >
                Annuler
              </button>
              <button
                @click="submitAssociation"
                :disabled="!modal.eleveId || modal.loading"
                class="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm relative overflow-hidden"
              >
                <span class="relative z-10">{{ modal.loading ? 'Association...' : 'Créer l\'association' }}</span>
                <div v-if="modal.loading" class="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 animate-pulse"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const base_url = "http://127.0.0.1:8000/api"
const showList = ref(true)
const enseignants = ref([])
const searchQuery = ref('')
const associations = ref({})
const listes = ref({ eleves: [], temoins: [] })

const modal = ref({
  open: false,
  enseignantId: null,
  eleveId: '',
  temoinId: '',
  loading: false
})

// Adapter le formulaire avec vos champs existants
const form = ref({ 
  nom_famille: '', 
  prenom: '', 
  courriel: '',
  salaire: '',
  mode_paiement: '' // Ajout du mode de paiement
})
const loading = ref(false)

// Nouvelles statistiques calculées
const stats = computed(() => [
  {
    label: 'Total Enseignants',
    value: enseignants.value.length,
    trend: '+2.5%',
    icon: 'fas fa-users',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    label: 'Associations Actives',
    value: totalAssociations.value,
    trend: '+5.1%',
    icon: 'fas fa-link',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    label: 'Masse Salariale',
    value: formatSalaireFCFA(masseSalariale.value),
    trend: '+3.2%',
    icon: 'fas fa-money-bill-wave',
    iconBg: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    label: 'En Ligne',
    value: enseignants.value.filter(e => e.statut === 'actif').length,
    trend: '+1.8%',
    icon: 'fas fa-wifi',
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600'
  }
])

// Computed properties
const filteredEnseignants = computed(() => {
  if (!searchQuery.value) return enseignants.value
  return enseignants.value.filter(ens => {
    const nom = getEnsNom(ens).toLowerCase()
    const prenom = getEnsPrenom(ens).toLowerCase()
    const email = getEnsEmail(ens).toLowerCase()
    const search = searchQuery.value.toLowerCase()
    return nom.includes(search) || prenom.includes(search) || email.includes(search)
  })
})

const totalAssociations = computed(() => {
  return enseignants.value.reduce((total, ens) => total + (ens.associations?.length || 0), 0)
})

const masseSalariale = computed(() => {
  return enseignants.value.reduce((total, ens) => {
    const salaire = parseFloat(getEnsSalaire(ens)) || 0
    return total + salaire
  }, 0)
})

const selectedTeacherName = computed(() => {
  if (!modal.value.enseignantId) return ''
  const ens = enseignants.value.find(e => getEnsId(e) === modal.value.enseignantId)
  return ens ? `${getEnsNom(ens)} ${getEnsPrenom(ens)}` : ''
})

// Helpers
const getToken = () => JSON.parse(localStorage.getItem('token'))

const getEnsId = (ens) => ens?.enseignant?.id ? ens.enseignant.id : ens?.id
const getEnsNom = (ens) => ens?.nom_famille ?? ens?.enseignant?.nom_famille
const getEnsPrenom = (ens) => ens?.prenom ?? ens?.enseignant?.prenom
const getEnsEmail = (ens) => ens?.courriel ?? ens?.enseignant?.courriel
const getEnsSalaire = (ens) => ens?.salaire ?? ens?.enseignant?.salaire ?? 0
const getModePaiement = (ens) => ens?.mode_paiement ?? ens?.enseignant?.mode_paiement ?? 'Non défini'

const getInitials = (ens) => {
  const nom = getEnsNom(ens) || ''
  const prenom = getEnsPrenom(ens) || ''
  return (prenom[0] + nom[0]).toUpperCase()
}

const formatSalaireFCFA = (salaire) => {
  const montant = parseFloat(salaire) || 0
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF', // FCFA
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(montant)
}

const getModePaiementClass = (mode) => {
  const classes = {
    'Par seance': 'bg-orange-100 text-orange-800',
    'Par semaine': 'bg-blue-100 text-blue-800',
    'Par mois': 'bg-green-100 text-green-800',
    'Non défini': 'bg-gray-100 text-gray-800'
  }
  return classes[mode] || classes['Non défini']
}

// Fonctions API
const fetchEnseignants = async () => {
  const token = getToken()
  if (!token) return alert('Veuillez vous connecter')
  try {
    const res = await fetch(`${base_url}/enseignant/index`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    enseignants.value = data.map(ens => ({
      ...ens,
      statut: Math.random() > 0.2 ? 'actif' : 'congé'
    }))
  } catch (error) {
    console.error('Erreur fetchEnseignants:', error)
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
    const res = await fetch(`${base_url}/enseignant/store`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(form.value)
    })
    
    if (!res.ok) throw new Error('Erreur lors de la création')
    
    const data = await res.json()
    
    // Afficher le salaire créé dans une alerte avec le mode de paiement
    if (data.enseignant) {
      const salaireCree = data.enseignant.salaire
      const modePaiement = data.enseignant.mode_paiement
      alert(`Enseignant créé avec succès!\nSalaire: ${formatSalaireFCFA(salaireCree)} (${modePaiement})`)
    } else {
      alert('Enregistrement effectué')
    }
    
    // Réinitialiser le formulaire
    form.value = { 
      nom_famille: '', 
      prenom: '', 
      courriel: '', 
      salaire: '', 
      mode_paiement: '' 
    }
    showList.value = true
    await fetchEnseignants()
  } catch (err) {
    console.error(err)
    alert('Erreur lors de la création')
  } finally {
    loading.value = false
  }
}

// Les autres fonctions restent inchangées...
const openAssocier = async (enseignantId) => {
  modal.value.enseignantId = enseignantId
  modal.value.open = true
  modal.value.eleveId = ''
  modal.value.temoinId = ''

  const token = getToken()
  if (!token) return alert('Veuillez vous connecter')

  try {
    const [elevesRes, temoinsRes] = await Promise.all([
      fetch(`${base_url}/eleve`, { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch(`${base_url}/temoin`, { headers: { 'Authorization': `Bearer ${token}` } })
    ])

    if (!elevesRes.ok || !temoinsRes.ok) throw new Error('Erreur API')
    listes.value.eleves = await elevesRes.json()
    listes.value.temoins = await temoinsRes.json()
  } catch (e) {
    console.error('Erreur openAssocier:', e)
  }
}

const closeModal = () => { 
  modal.value.open = false 
}

const submitAssociation = async () => {
  if (!modal.value.eleveId || !modal.value.enseignantId) return
  modal.value.loading = true
  const token = getToken()
  if (!token) {
    alert('Veuillez vous connecter')
    modal.value.loading = false
    return
  }
  try {
    const res = await fetch(`${base_url}/associations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        enseignant_id: modal.value.enseignantId,
        eleve_id: modal.value.eleveId,
        temoin_id: modal.value.temoinId || null
      })
    })

    if (!res.ok) throw new Error('Erreur serveur')
    const data = await res.json()

    if (data.message) {
      alert(data.message)
      await fetchEnseignants()
      closeModal()
    } else {
      alert('Erreur lors de l\'association')
    }
  } catch (e) {
    console.error(e)
    alert("Erreur lors de l'association")
  } finally {
    modal.value.loading = false
  }
}

onMounted(fetchEnseignants)
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
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 10px;
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
@media (max-width: 768px) {
  .ml-64 {
    margin-left: 0;
  }
  
  .fixed.inset-y-0 {
    transform: translateX(-100%);
  }
}
</style>