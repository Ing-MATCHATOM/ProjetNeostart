<template>
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Inscription</h2>
    
    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Prénom et Nom</label>
        <input v-model="form.prenom_nom" type="text" required
               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Nom de Famille</label>
        <input v-model="form.nom_famille" type="text" required
               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input v-model="form.courriel" type="email" required
               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Mot de passe</label>
        <input v-model="form.mot_de_passe" type="password" required
               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Confirmer le mot de passe</label>
        <input v-model="form.mot_de_passe_confirmation" type="password" required
               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      
      <button type="submit" :disabled="loading"
              class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition-colors">
        {{ loading ? 'Inscription en cours...' : 'S\'inscrire' }}
      </button>
      
      <div v-if="error" class="text-red-500 text-sm p-2 bg-red-50 rounded">{{ error }}</div>
      <div v-if="success" class="text-green-500 text-sm p-2 bg-green-50 rounded">{{ success }}</div>
    </form>

    <!-- Ligne ajoutée : Déjà un compte ? -->
    <div class="mt-6 text-center">
      <p class="text-gray-600 text-sm">
        Déjà un compte ?
        <NuxtLink to="/login" class="text-blue-500 font-medium hover:text-blue-700 transition">
          Se connecter
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  prenom_nom: '',
  nom_famille: '',
  courriel: '',
  mot_de_passe: '',
  mot_de_passe_confirmation: ''
})

const loading = ref(false)
const error = ref('')
const success = ref('')

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    // Utilisation du proxy Nuxt
    const { data } = await $fetch('/api/register', {
      method: 'POST',
      body: form.value,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    
    success.value = 'Inscription réussie ! Redirection...'
    console.log('Succès:', data)
    
    // Redirection après 2 secondes
    setTimeout(() => {
      navigateTo('/login')
    }, 2000)
    
  } catch (err) {
    console.error('Erreur complète:', err)
    
    if (err.data?.errors) {
      // Erreurs de validation Laravel
      const errors = err.data.errors
      error.value = Object.values(errors)[0][0]
    } else if (err.data?.message) {
      error.value = err.data.message
    } else if (err.status === 500) {
      error.value = 'Erreur serveur. Vérifiez que Laravel est démarré.'
    } else {
      error.value = 'Erreur de connexion au serveur'
    }
  } finally {
    loading.value = false
  }
}
</script>