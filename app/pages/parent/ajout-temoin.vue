<template>
  <div :class="[isDark ? 'dark-mode' : 'light-mode', 'min-h-screen relative overflow-hidden transition-colors duration-500']">
    <!-- Nouvel arrière-plan avec particules animées -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Grille géométrique animée -->
      <div class="absolute inset-0 opacity-20">
        <div :class="isDark ? 'bg-grid-indigo-dark' : 'bg-grid-indigo-light'"></div>
      </div>

      <!-- Éclairs de lumière animés -->
      <div v-if="isDark" class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse-slow"></div>
      <div v-if="isDark" class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-pulse-slow delay-1000"></div>

      <!-- Particules flottantes -->
      <div class="absolute inset-0">
        <div v-for="i in 30" :key="i" 
             :class="isDark ? 'bg-blue-400/30' : 'bg-blue-600/20'"
             class="absolute w-1 h-1 rounded-full animate-float-particles"
             :style="{
               left: Math.random() * 100 + '%',
               top: Math.random() * 100 + '%',
               animationDelay: Math.random() * 5 + 's',
               animationDuration: (Math.random() * 10 + 10) + 's'
             }">
        </div>
      </div>

      <!-- Ondes concentriques -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96">
        <div :class="isDark ? 'border-blue-400/20' : 'border-blue-600/30'" class="absolute inset-0 border-2 rounded-full animate-ripple-1"></div>
        <div :class="isDark ? 'border-purple-400/20' : 'border-purple-600/30'" class="absolute inset-8 border-2 rounded-full animate-ripple-2"></div>
        <div :class="isDark ? 'border-indigo-400/20' : 'border-indigo-600/30'" class="absolute inset-16 border-2 rounded-full animate-ripple-3"></div>
      </div>

      <!-- Gradient orbes flottants -->
      <div v-if="isDark" class="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-orb-float-1"></div>
      <div v-if="isDark" class="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-indigo-600/10 to-pink-600/10 rounded-full blur-3xl animate-orb-float-2"></div>
      <div v-if="isDark" class="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-2xl animate-orb-float-3"></div>

      <!-- Gradient orbes light mode -->
      <div v-if="!isDark" class="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl animate-orb-float-1"></div>
      <div v-if="!isDark" class="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-indigo-200/40 to-pink-200/40 rounded-full blur-3xl animate-orb-float-2"></div>
      <div v-if="!isDark" class="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-200/40 to-blue-200/40 rounded-full blur-2xl animate-orb-float-3"></div>

      <!-- Effet de profondeur -->
      <div :class="isDark ? 'bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900' : 'bg-gradient-to-b from-transparent via-white/50 to-white'"></div>
    </div>

    <!-- Bouton toggle dark/light -->
    <button 
      @click="toggleDarkMode"
      :class="isDark ? 'bg-slate-800/20 border-white/10 text-white' : 'bg-white/20 border-gray-300/50 text-gray-700'"
      class="fixed top-6 right-6 z-50 w-12 h-12 rounded-2xl backdrop-blur-3xl border shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 group"
      title="Toggle dark/light mode"
    >
      <i v-if="isDark" class="fas fa-sun text-yellow-400 group-hover:rotate-180 transition-transform duration-500"></i>
      <i v-else class="fas fa-moon text-indigo-600 group-hover:rotate-180 transition-transform duration-500"></i>
    </button>

    <!-- Navigation latérale avec effet glassmorphism amélioré -->
    <div :class="isDark ? 'bg-slate-800/20 border-white/10' : 'bg-white/20 border-gray-300/50'" class="fixed inset-y-0 left-0 w-80 backdrop-blur-3xl border-r shadow-2xl z-40 transition-colors duration-500">
      <div class="p-8 h-full flex flex-col">
        <!-- Logo avec effet néon -->
        <div class="flex items-center gap-3 mb-12 group cursor-pointer" @click="goToDashboard">
          <div :class="isDark ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-400 to-purple-500'" class="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 relative">
            <div :class="isDark ? 'bg-blue-500/20 group-hover:bg-purple-500/30' : 'bg-blue-400/30 group-hover:bg-purple-400/40'" class="absolute inset-0 rounded-2xl blur-md transition-all duration-500"></div>
            <i class="fas fa-chalkboard-teacher text-white text-xl relative z-10"></i>
          </div>
          <div>
            <h1 :class="isDark ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-gradient-to-r from-blue-600 to-purple-600'" class="text-2xl font-black bg-clip-text text-transparent drop-shadow-lg">
              EduManager
            </h1>
            <p :class="isDark ? 'text-purple-300' : 'text-purple-600'" class="text-sm font-medium mt-1">Création Témoin</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="pt-6" :class="isDark ? 'border-purple-400/20' : 'border-purple-400/30'">
          <div :class="isDark ? 'bg-slate-800/30 border-white/10' : 'bg-white/30 border-gray-300/30'" class="p-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-colors duration-500">
            
            <NuxtLink 
              to="/parent/create-temoin" 
              :class="isDark ? 'from-slate-800/40 to-purple-900/30 hover:from-slate-700/50 hover:to-purple-800/40' : 'from-white/40 to-purple-200/30 hover:from-gray-100/50 hover:to-purple-100/40'"
              class="flex flex-col items-center gap-2 p-6 bg-gradient-to-br rounded-xl font-bold hover:shadow-lg transition-all duration-300 group text-center relative overflow-hidden"
            >
              <div :class="isDark ? 'from-blue-500/10 to-purple-500/10' : 'from-blue-400/20 to-purple-400/20'" class="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div :class="isDark ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-400 to-purple-500'" class="w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 mb-2 relative z-10">
                <i class="fas fa-user-plus text-white text-xl"></i>
              </div>
              <span :class="isDark ? 'text-white group-hover:text-blue-200' : 'text-gray-800 group-hover:text-blue-600'" class="font-bold transition-colors duration-300 relative z-10">Créer Témoin</span>
              <div :class="isDark ? 'bg-blue-400' : 'bg-blue-500'" class="w-2 h-2 rounded-full animate-ping mt-1 relative z-10"></div>
            </NuxtLink>
          </div>
        </nav>

        <!-- User info avec effet lumineux -->
        <div class="mt-auto pt-6" :class="isDark ? 'border-purple-400/20' : 'border-purple-400/30'">
          <div :class="isDark ? 'bg-slate-800/30 border-white/10' : 'bg-white/30 border-gray-300/30'" class="flex items-center gap-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-colors duration-500">
            <div :class="isDark ? 'bg-gradient-to-br from-green-500 to-blue-500' : 'bg-gradient-to-br from-green-400 to-blue-400'" class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg relative">
              <div :class="isDark ? 'bg-green-500/20' : 'bg-green-400/30'" class="absolute inset-0 rounded-xl blur-sm"></div>
              <i class="fas fa-user-check text-white text-sm relative z-10"></i>
            </div>
            <div class="flex-1">
              <p :class="isDark ? 'text-white' : 'text-gray-800'" class="font-bold">Session Active</p>
              <p :class="isDark ? 'text-purple-300' : 'text-purple-600'" class="text-sm">Prêt à créer</p>
            </div>
            <div :class="isDark ? 'bg-green-400' : 'bg-green-500'" class="w-3 h-3 rounded-full animate-pulse shadow-lg"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu principal avec carte en verre -->
    <main class="ml-80 min-h-screen flex items-center justify-center p-8">
      <div class="max-w-md w-full animate-slide-up">
        <!-- En-tête avec effet lumineux -->
        <div class="text-center mb-8">
          <div class="relative inline-block mb-6">
            <div :class="isDark ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600' : 'bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-500'" class="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl mx-auto relative z-10">
              <i class="fas fa-user-check text-white text-2xl"></i>
            </div>
            <div v-if="isDark" class="absolute -inset-4 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-3xl blur-xl animate-pulse-slow"></div>
            <div v-if="isDark" class="absolute -inset-2 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-3xl animate-ping-slow"></div>
            <div v-if="!isDark" class="absolute -inset-4 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl animate-pulse-slow"></div>
          </div>
          
          <h1 :class="isDark ? 'from-blue-400 via-purple-400 to-indigo-400' : 'from-blue-600 via-purple-600 to-indigo-600'" class="text-4xl font-black bg-gradient-to-r bg-clip-text text-transparent mb-3 drop-shadow-lg">
            Nouveau Témoin
          </h1>
          <p :class="isDark ? 'text-purple-300' : 'text-purple-600'" class="text-lg font-medium">Remplissez les informations ci-dessous</p>
        </div>

        <!-- Carte formulaire avec glassmorphism -->
        <div :class="isDark ? 'bg-slate-800/20 border-white/10' : 'bg-white/20 border-gray-300/30'" class="backdrop-blur-3xl rounded-3xl border shadow-2xl overflow-hidden relative transition-colors duration-500">
          <!-- Effet de bordure lumineuse -->
          <div v-if="isDark" class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl blur-lg opacity-50"></div>
          <div v-if="!isDark" class="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 rounded-3xl blur-lg opacity-30"></div>
          
          <!-- En-tête avec gradient néon -->
          <div :class="isDark ? 'from-blue-500/20 via-purple-500/20 to-indigo-600/20 border-white/10' : 'from-blue-400/30 via-purple-400/30 to-indigo-500/30 border-gray-300/30'" class="bg-gradient-to-r p-6 relative overflow-hidden border-b">
            <div v-if="isDark" class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
            <div v-if="!isDark" class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]"></div>
            <div class="relative z-10 text-center">
              <h2 :class="isDark ? 'text-white' : 'text-gray-800'" class="text-xl font-bold mb-1 drop-shadow-lg">Formulaire de Création</h2>
              <p :class="isDark ? 'text-purple-200' : 'text-purple-700'" class="opacity-90 text-sm">Tous les champs sont requis</p>
            </div>
          </div>

          <!-- Formulaire -->
          <div class="p-6 relative z-10">
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Nom -->
              <div class="space-y-2">
                <label :class="isDark ? 'text-blue-300' : 'text-blue-600'" class="block text-sm font-bold flex items-center gap-2">
                  <i :class="isDark ? 'text-blue-400' : 'text-blue-500'" class="fas fa-signature text-xs"></i>
                  Nom *
                </label>
                <input 
                  v-model="form.nom" 
                  type="text" 
                  required
                  placeholder="Entrez le nom"
                  :class="isDark ? 'bg-slate-700/30 border-white/10 text-white placeholder-slate-400 focus:ring-blue-500' : 'bg-white/50 border-gray-300/50 text-gray-800 placeholder-gray-500 focus:ring-blue-400'"
                  class="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 shadow-lg text-sm backdrop-blur-sm"
                >
              </div>

              <!-- Prénom -->
              <div class="space-y-2">
                <label :class="isDark ? 'text-blue-300' : 'text-blue-600'" class="block text-sm font-bold flex items-center gap-2">
                  <i :class="isDark ? 'text-blue-400' : 'text-blue-500'" class="fas fa-user text-xs"></i>
                  Prénom *
                </label>
                <input 
                  v-model="form.prenom" 
                  type="text" 
                  required
                  placeholder="Entrez le prénom"
                  :class="isDark ? 'bg-slate-700/30 border-white/10 text-white placeholder-slate-400 focus:ring-blue-500' : 'bg-white/50 border-gray-300/50 text-gray-800 placeholder-gray-500 focus:ring-blue-400'"
                  class="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 shadow-lg text-sm backdrop-blur-sm"
                >
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label :class="isDark ? 'text-cyan-300' : 'text-cyan-600'" class="block text-sm font-bold flex items-center gap-2">
                  <i :class="isDark ? 'text-cyan-400' : 'text-cyan-500'" class="fas fa-envelope text-xs"></i>
                  Email *
                </label>
                <input 
                  v-model="form.courriel" 
                  type="email" 
                  required
                  placeholder="email@exemple.com"
                  :class="isDark ? 'bg-slate-700/30 border-white/10 text-white placeholder-slate-400 focus:ring-cyan-500' : 'bg-white/50 border-gray-300/50 text-gray-800 placeholder-gray-500 focus:ring-cyan-400'"
                  class="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 shadow-lg text-sm backdrop-blur-sm"
                >
              </div>

              <!-- Boutons colorés -->
              <div class="flex gap-3 pt-4">
                <button 
                  type="button" 
                  @click="goBack"
                  :class="isDark ? 'from-slate-700/50 to-slate-600/50 text-white border-white/10 hover:from-slate-600/50 hover:to-slate-500/50' : 'from-gray-200/50 to-gray-300/50 text-gray-700 border-gray-300/50 hover:from-gray-300/50 hover:to-gray-400/50'"
                  class="flex-1 px-4 py-3 bg-gradient-to-r rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg backdrop-blur-sm border hover:border-white/20"
                >
                  <i class="fas fa-arrow-left text-xs"></i>
                  Retour
                </button>
                <button 
                  type="submit" 
                  :disabled="loading"
                  :class="isDark ? 'from-blue-500/80 to-purple-500/80 hover:from-blue-400/80 hover:to-purple-400/80 border-blue-400/20' : 'from-blue-400/80 to-purple-400/80 hover:from-blue-300/80 hover:to-purple-300/80 border-blue-300/30'"
                  class="flex-1 px-4 py-3 bg-gradient-to-r text-white rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg relative overflow-hidden backdrop-blur-sm hover:border-blue-400/40"
                >
                  <div :class="isDark ? 'bg-white/10' : 'bg-white/20'" class="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <i class="fas fa-plus text-xs"></i>
                  {{ loading ? 'Création...' : 'Créer' }}
                </button>
              </div>

              <!-- Message d'erreur/succès -->
              <div v-if="message" class="p-3 rounded-xl mt-4 backdrop-blur-sm border" :class="messageType === 'success' ? (isDark ? 'bg-green-500/20 border-green-400/30' : 'bg-green-500/30 border-green-400/50') : (isDark ? 'bg-red-500/20 border-red-400/30' : 'bg-red-500/30 border-red-400/50')">
                <p :class="messageType === 'success' ? (isDark ? 'text-green-300' : 'text-green-700') : (isDark ? 'text-red-300' : 'text-red-700')" class="text-xs font-medium">
                  <i :class="messageType === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'" class="mr-1"></i>
                  {{ message }}
                </p>
              </div>
            </form>
          </div>
        </div>

        <!-- Footer avec couleur -->
        <div class="text-center mt-4">
          <p :class="isDark ? 'text-purple-300' : 'text-purple-600'" class="text-xs flex items-center justify-center gap-1">
            <i :class="isDark ? 'text-blue-400' : 'text-blue-500'" class="fas fa-shield-alt text-xs"></i>
            Formulaire sécurisé et crypté
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const base_url = "http://127.0.0.1:8000/api"
const router = useRouter()

// Gestion du mode dark/light
const isDark = ref(true)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  localStorage.setItem('darkMode', isDark.value.toString())
}

// Charger la préférence utilisateur au montage
onMounted(() => {
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode !== null) {
    isDark.value = savedMode === 'true'
  } else {
    // Préférence système par défaut
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
})

const form = ref({
  nom: '',
  prenom: '',
  courriel: ''
})

const loading = ref(false)
const message = ref('')
const messageType = ref('') // 'success' or 'error'

const goToDashboard = () => {
  router.push('/Dashboard')
}

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/Dashboard')
  }
}

const showMessage = (text, type) => {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
    messageType.value = ''
  }, 5000)
}

const handleSubmit = async () => {
  // Validation des champs
  if (!form.value.nom || !form.value.prenom || !form.value.courriel) {
    showMessage('Veuillez remplir tous les champs obligatoires', 'error')
    return
  }

  // Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.courriel)) {
    showMessage('Veuillez entrer une adresse email valide', 'error')
    return
  }

  loading.value = true
  message.value = ''

  try {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) {
      showMessage('Veuillez vous connecter d\'abord', 'error')
      router.push('/login')
      return
    }

    const response = await fetch(`${base_url}/temoin/store`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Erreur serveur: ${response.status}`)
    }

    const data = await response.json()
    
    showMessage(' Témoin créé avec succès ! Redirection...', 'success')
    
    // Réinitialiser le formulaire après succès
    form.value = {
      nom: '',
      prenom: '',
      courriel: ''
    }

    // Redirection après 2 secondes
    setTimeout(() => {
      router.push('/parent/create-temoin')
    }, 2000)

  } catch (error) {
    console.error('Erreur détaillée:', error)
    showMessage(`❌ Erreur: ${error.message || 'Une erreur est survenue lors de la création'}`, 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Classes pour les modes */
.dark-mode {
  background: linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%);
}

.light-mode {
  background: linear-gradient(135deg, #f8fafc 0%, #e9d5ff 50%, #f8fafc 100%);
}

/* Grilles pour les modes */
.bg-grid-indigo-dark {
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
  background-size: 64px 64px;
}

.bg-grid-indigo-light {
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
  background-size: 64px 64px;
}

/* Animations */
@keyframes float-particles {
  0% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) translateX(20px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes ripple-1 {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes ripple-2 {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

@keyframes ripple-3 {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2.1);
    opacity: 0;
  }
}

@keyframes orb-float-1 {
  0%, 100% { 
    transform: translate(0, 0) rotate(0deg); 
  }
  33% { 
    transform: translate(30px, -30px) rotate(120deg); 
  }
  66% { 
    transform: translate(-20px, 20px) rotate(240deg); 
  }
}

@keyframes orb-float-2 {
  0%, 100% { 
    transform: translate(0, 0) rotate(0deg); 
  }
  33% { 
    transform: translate(-40px, 20px) rotate(-120deg); 
  }
  66% { 
    transform: translate(20px, -40px) rotate(-240deg); 
  }
}

@keyframes orb-float-3 {
  0%, 100% { 
    transform: translate(0, 0) rotate(0deg); 
  }
  50% { 
    transform: translate(25px, 25px) rotate(180deg); 
  }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

@keyframes ping-slow {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes slide-up {
  0% { transform: translateY(30px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

.animate-float-particles {
  animation: float-particles linear infinite;
}

.animate-ripple-1 {
  animation: ripple-1 3s ease-out infinite;
}

.animate-ripple-2 {
  animation: ripple-2 3s ease-out infinite;
  animation-delay: 1s;
}

.animate-ripple-3 {
  animation: ripple-3 3s ease-out infinite;
  animation-delay: 2s;
}

.animate-orb-float-1 {
  animation: orb-float-1 15s ease-in-out infinite;
}

.animate-orb-float-2 {
  animation: orb-float-2 18s ease-in-out infinite;
}

.animate-orb-float-3 {
  animation: orb-float-3 12s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 2s ease-in-out infinite;
}

.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out;
}

/* Scrollbar moderne */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}

/* Amélioration de la sélection de texte */
::selection {
  background: rgba(59, 130, 246, 0.3);
  color: white;
}

/* Responsive design amélioré */
@media (max-width: 1024px) {
  .fixed.inset-y-0.left-0 {
    width: 280px;
  }
  
  main.ml-80 {
    margin-left: 280px;
  }
}

@media (max-width: 768px) {
  .fixed.inset-y-0.left-0 {
    width: 100%;
    position: relative;
    height: auto;
  }
  
  main.ml-80 {
    margin-left: 0;
  }
  
  .max-w-md {
    max-width: 100%;
  }
  
  /* Correction de la grille pour mobile */
  .bg-grid-indigo {
    background-size: 32px 32px;
  }
  
  /* Adaptation des effets pour mobile */
  .absolute.top-1\/2.left-1\/2.transform.-translate-x-1\/2.-translate-y-1\/2.w-96.h-96 {
    width: 16rem;
    height: 16rem;
  }

  .absolute.-top-32.-left-32.w-96.h-96,
  .absolute.-bottom-32.-right-32.w-96.h-96 {
    width: 12rem;
    height: 12rem;
  }
}

@media (max-width: 480px) {
  .p-8 {
    padding: 1rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .w-80 {
    width: 100%;
  }
}
</style>