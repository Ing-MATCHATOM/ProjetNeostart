<template>
  <div class="min-h-screen transition-colors duration-500" :class="isDark ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'">
    <!-- Bouton de bascule du mode -->
    <div class="absolute top-4 right-4 z-20">
      <button 
        @click="toggleDarkMode"
        class="p-3 rounded-full backdrop-blur-md border transition-all duration-500 hover:scale-110"
        :class="isDark ? 'bg-white/10 border-white/20 text-yellow-300' : 'bg-black/10 border-black/20 text-gray-700'"
      >
        <svg v-if="isDark" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
        </svg>
        <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"/>
        </svg>
      </button>
    </div>

    <!-- Arrière-plan animé -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-1/2 -left-1/2 w-full h-full rounded-full animate-pulse-slow transition-opacity duration-500" 
           :class="isDark ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10' : 'bg-gradient-to-r from-blue-200/30 to-purple-200/30'"></div>
      <div class="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full animate-pulse-slow delay-1000 transition-opacity duration-500" 
           :class="isDark ? 'bg-gradient-to-r from-pink-500/10 to-purple-500/10' : 'bg-gradient-to-r from-pink-200/30 to-purple-200/30'"></div>
      <div class="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-xl animate-float transition-opacity duration-500" 
           :class="isDark ? 'bg-white/5' : 'bg-white/60'"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-xl animate-float-delayed transition-opacity duration-500" 
           :class="isDark ? 'bg-purple-400/10' : 'bg-purple-200/40'"></div>
    </div>

    <!-- Carte de connexion -->
    <div class="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-6 sm:p-8 rounded-3xl shadow-2xl border relative z-10 transform transition-all duration-500 hover:shadow-2xl backdrop-blur-md"
         :class="isDark ? 'bg-white/10 border-white/20' : 'bg-white/80 border-gray-200/50'">
      
      <!-- En-tête avec logo et titre -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl shadow-2xl mb-4 transform transition-transform duration-300 hover:scale-105"
             :class="isDark ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gradient-to-r from-indigo-400 to-purple-500'">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent drop-shadow-lg transition-all duration-500"
            :class="isDark ? 'bg-gradient-to-r from-white to-indigo-200' : 'bg-gradient-to-r from-gray-800 to-indigo-600'">
          Connexion
        </h2>
        <p class="mt-3 text-lg transition-colors duration-500" 
           :class="isDark ? 'text-white/80' : 'text-gray-600'">Accédez à votre espace personnel</p>
      </div>
      
      <form @submit.prevent="handleLogin">
        <!-- Champ email -->
        <div class="mb-6 relative group">
          <label class="block mb-3 font-medium text-base sm:text-lg transition-colors duration-500" 
                 :class="isDark ? 'text-white' : 'text-gray-700'" for="email">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform duration-300 group-focus-within:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors duration-500" 
                   :class="isDark ? 'text-indigo-300' : 'text-indigo-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              v-model="form.courriel"
              type="email"
              id="email"
              class="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 text-base shadow-lg backdrop-blur-sm"
              :class="isDark ? 'bg-white/10 border border-white/20 focus:ring-indigo-400 text-white placeholder-white/60' : 'bg-white border border-gray-300 focus:ring-indigo-500 text-gray-800 placeholder-gray-500'"
              placeholder="votre@email.com"
              required
            />
            <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                 :class="isDark ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10' : 'bg-gradient-to-r from-indigo-100 to-purple-100'"></div>
          </div>
        </div>
        
        <!-- Champ mot de passe -->
        <div class="mb-6 relative group">
          <label class="block mb-3 font-medium text-base sm:text-lg transition-colors duration-500" 
                 :class="isDark ? 'text-white' : 'text-gray-700'" for="password">Mot de passe</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform duration-300 group-focus-within:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors duration-500" 
                   :class="isDark ? 'text-indigo-300' : 'text-indigo-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              v-model="form.mot_de_passe"
              type="password"
              id="password"
              class="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 text-base shadow-lg backdrop-blur-sm"
              :class="isDark ? 'bg-white/10 border border-white/20 focus:ring-indigo-400 text-white placeholder-white/60' : 'bg-white border border-gray-300 focus:ring-indigo-500 text-gray-800 placeholder-gray-500'"
              placeholder="Votre mot de passe"
              required
            />
            <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                 :class="isDark ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10' : 'bg-gradient-to-r from-indigo-100 to-purple-100'"></div>
          </div>
        </div>

        <!-- Ajout du choix de rôle -->
        <div class="mb-6 relative group">
          <label class="block mb-3 font-medium text-base sm:text-lg transition-colors duration-500" 
                 :class="isDark ? 'text-white' : 'text-gray-700'" for="role">
            Se connecter en tant que
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform duration-300 group-focus-within:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors duration-500" 
                   :class="isDark ? 'text-indigo-300' : 'text-indigo-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <select
              v-model="form.role"
              id="role"
              class="w-full pl-12 pr-10 py-3 sm:py-4 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 appearance-none text-base shadow-lg backdrop-blur-sm"
              :class="isDark ? 'bg-white/10 border border-white/20 focus:ring-indigo-400 text-white' : 'bg-white border border-gray-300 focus:ring-indigo-500 text-gray-800'"
              required
            >
              <option disabled value="" class="text-gray-800">-- Sélectionnez un rôle --</option>
              <option value="parent" class="text-gray-800">Parent</option>
              <option value="eleve" class="text-gray-800">Élève</option>
              <option value="temoin" class="text-gray-800">Témoin</option>
              <option value="enseignant" class="text-gray-800">Enseignant</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-colors duration-500" 
                   :class="isDark ? 'text-indigo-300' : 'text-indigo-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                 :class="isDark ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10' : 'bg-gradient-to-r from-indigo-100 to-purple-100'"></div>
          </div>
        </div>
        
        <!-- Message d'erreur -->
        <div v-if="error" class="mb-5 p-4 rounded-xl text-base flex items-start backdrop-blur-sm border transition-colors duration-500"
             :class="isDark ? 'bg-red-400/20 border-red-400/30 text-red-200' : 'bg-red-100 border-red-200 text-red-700'">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ error }}</span>
        </div>
        
        <!-- Options + lien -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-7">
          <label class="flex items-center text-base cursor-pointer group transition-colors duration-500"
                 :class="isDark ? 'text-white' : 'text-gray-700'">
            <div class="relative">
              <input type="checkbox" class="sr-only">
              <div class="w-5 h-5 border rounded-md flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                   :class="isDark ? 'bg-white/10 border-white/30 group-hover:bg-white/20' : 'bg-white border-gray-300 group-hover:bg-gray-100'">
                <svg class="w-3 h-3 transition-opacity duration-200"
                     :class="isDark ? 'text-indigo-400' : 'text-indigo-600'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span class="ml-3">Se souvenir de moi</span>
          </label>
          <a href="#" class="text-base font-medium transition-all duration-300 hover:underline"
             :class="isDark ? 'text-indigo-300 hover:text-white' : 'text-indigo-600 hover:text-indigo-800'">Mot de passe oublié?</a>
        </div>
        
        <!-- Bouton -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full text-white py-3 sm:py-4 rounded-xl font-semibold transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg relative overflow-hidden group"
          :class="isDark ? 
            'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600' : 
            'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500'"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="relative z-10">{{ loading ? 'Connexion...' : 'Se connecter' }}</span>
        </button>
      </form>
      
      <!-- Séparateur -->
      <div class="my-8 flex items-center">
        <div class="flex-grow border-t transition-colors duration-500"
             :class="isDark ? 'border-white/30' : 'border-gray-300'"></div>
        <span class="mx-4 text-base transition-colors duration-500"
              :class="isDark ? 'text-white/70' : 'text-gray-500'">ou</span>
        <div class="flex-grow border-t transition-colors duration-500"
             :class="isDark ? 'border-white/30' : 'border-gray-300'"></div>
      </div>
      
      <!-- Lien créer compte -->
      <div class="mt-8 text-center">
        <p class="text-base transition-colors duration-500"
           :class="isDark ? 'text-white/80' : 'text-gray-600'">
          Pas encore de compte? 
          <NuxtLink to="/register" class="font-medium transition-all duration-300 hover:underline"
                    :class="isDark ? 'text-indigo-300 hover:text-white' : 'text-indigo-600 hover:text-indigo-800'">
            Créer un compte
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const form = ref({
  courriel: '',
  mot_de_passe: '',
  role: ''
})

const loading = ref(false)
const error = ref('')
const isDark = ref(false)

// Vérifier la préférence système au chargement
onMounted(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const savedTheme = localStorage.getItem('theme')
  
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = prefersDark
  }
  
  // Mettre à jour la classe sur le document
  updateThemeClass()
})

// Basculer entre les modes
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  updateThemeClass()
}

// Mettre à jour la classe sur le document pour les transitions globales
const updateThemeClass = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    console.log('Tentative de connexion...')

    const response = await $fetch('http://localhost:8000/api/login', {
      method: 'POST',
      body: form.value,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    
    console.log('Réponse complète:', response)
    console.log('Type de réponse:', typeof response)
    
    // Vérifiez la structure de la réponse
    if (response && response.user) {
      localStorage.setItem('user', JSON.stringify(response.user))
      localStorage.setItem('token', JSON.stringify(response.token))
      localStorage.setItem('role', response.role)
      console.log('Utilisateur stocké:', response.user)
      if (response.role === 'parent') {
        navigateTo('dashboard')
      } else if (response.role === 'eleve') {
        navigateTo('/dashboard-eleve')
      } else if (response.role === 'enseignant') {
        navigateTo('/dashboard-enseignant')
      } else if (response.role === 'temoin') {
        navigateTo('/dashboard-temoin')
      }

    } else if (response && response.data && response.data.user) {
      // Si la réponse est encapsulée dans .data
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', JSON.stringify(response.data.token))
      console.log('Utilisateur stocké (dans data):', response.data.user)
          console.log('token stocké (dans data):', response.data.token)
      if (response.role === 'parent') {
        navigateTo('/dashboard-parent')
      } else if (response.role === 'eleve') {
        navigateTo('/dashboard-eleve')
      } else if (response.role === 'enseignant') {
        navigateTo('/dashboard-enseignant')
      } else if (response.role === 'temoin') {
        navigateTo('/dashboard-temoin')
      }

    } else {
      console.error('Structure de réponse inattendue:', response)
      error.value = 'Structure de réponse inattendue du serveur'
    }
    
  } catch (err) {
    console.error('Erreur détaillée:', err)
    console.error('Réponse erreur:', err.data)
    
    if (err.data?.message) {
      error.value = err.data.message
    } else if (err.data?.errors) {
      const errors = err.data.errors
      error.value = Object.values(errors)[0][0]
    } else {
      error.value = 'Erreur de connexion: ' + (err.message || 'Vérifiez la console')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Animations personnalisées */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(15px) rotate(-5deg); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

/* Transition globale pour un changement de thème fluide */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

/* Style personnalisé pour la sélection de texte */
::selection {
  background-color: rgba(139, 92, 246, 0.3);
}

/* Amélioration du défilement */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Support pour la préférence de mouvement réduit */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>