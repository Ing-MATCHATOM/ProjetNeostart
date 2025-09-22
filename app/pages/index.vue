<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-6 sm:p-8 bg-white rounded-xl shadow-lg">
      
      <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
        Connexion
      </h2>
      
      <form @submit.prevent="handleLogin">
        <!-- Champ email -->
        <div class="mb-5">
          <label class="block text-gray-700 mb-2 font-medium text-sm sm:text-base" for="email">Email</label>
          <input
            v-model="form.courriel"
            type="email"
            id="email"
            class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm sm:text-base"
            placeholder="votre@email.com"
            required
          />
        </div>
        
        <!-- Champ mot de passe -->
        <div class="mb-6">
          <label class="block text-gray-700 mb-2 font-medium text-sm sm:text-base" for="password">Mot de passe</label>
          <input
            v-model="form.mot_de_passe"
            type="password"
            id="password"
            class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm sm:text-base"
            placeholder="Votre mot de passe"
            required
          />
        </div>

        <!-- Ajout du choix de rôle -->
    <div class="mb-5">
      <label class="block text-gray-700 mb-2 font-medium text-sm sm:text-base" for="role">
        Se connecter en tant que
      </label>
      <select
        v-model="form.role"
        id="role"
        class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm sm:text-base"
        required
      >
        <option disabled value="">-- Sélectionnez un rôle --</option>
        <option value="parent">Parent</option>
        <option value="eleve">Élève</option>
        <option value="temoin">Témoin</option>
        <option value="enseignant">Enseignant</option>
      </select>
    </div>

        
        <!-- Message d'erreur -->
        <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {{ error }}
        </div>
        
        <!-- Options + lien -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6">
          <label class="flex items-center text-gray-700 text-sm sm:text-base">
            <input type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600 transition">
            <span class="ml-2">Se souvenir de moi</span>
          </label>
          <a href="#" class="text-sm sm:text-base text-indigo-600 hover:text-indigo-800 transition">Mot de passe oublié?</a>
        </div>
        
        <!-- Bouton -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-indigo-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition-colors shadow-md text-sm sm:text-base"
        >
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
      
      <!-- Lien créer compte -->
      <div class="mt-6 text-center">
        <p class="text-gray-600 text-sm sm:text-base">
          Pas encore de compte? 
          <NuxtLink to="/register" class="text-indigo-600 font-medium hover:text-indigo-800 transition">
            Créer un compte
          </NuxtLink>
        </p>
      </div>
      
      <!-- Réseaux sociaux (optionnel) -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <div class="flex justify-center space-x-3 sm:space-x-4">
          <button class="p-2 sm:p-3 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition">
            <i class="fab fa-facebook-f"></i>
          </button>
          <button class="p-2 sm:p-3 bg-red-100 rounded-full text-red-600 hover:bg-red-200 transition">
            <i class="fab fa-google"></i>
          </button>
          <button class="p-2 sm:p-3 bg-blue-100 rounded-full text-blue-400 hover:bg-blue-200 transition">
            <i class="fab fa-twitter"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  courriel: '',
  mot_de_passe: '',
  role: ''   // ← ajout du rôle
})


const loading = ref(false)
const error = ref('')

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
        navigateTo('/dashboard-eleve')
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
        navigateTo('/dashboard-eleve')
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
/* Styles personnalisés si besoin */
</style>