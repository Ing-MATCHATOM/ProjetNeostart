<template>
  <div class="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-teal-100 p-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- En-tête avec icône -->
      <div class="bg-green-600 p-4 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-2">
          <i class="fas fa-user-check text-green-600 text-2xl"></i>
        </div>
        <h2 class="text-2xl font-bold text-white">Créer un compte témoin</h2>
      </div>
      
      <div class="p-8">
        <form @submit.prevent="handleSubmit">
          <!-- Nom -->
          <div class="mb-5">
            <label for="nom" class="block text-gray-700 font-medium mb-2">Nom</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user text-gray-400"></i>
              </div>
              <input
                type="text"
                id="nom"
                v-model="form.nom"
                placeholder="Entrez le nom"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <!-- Prénom -->
          <div class="mb-5">
            <label for="prenom" class="block text-gray-700 font-medium mb-2">Prénom</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-signature text-gray-400"></i>
              </div>
              <input
                type="text"
                id="prenom"
                v-model="form.prenom"
                placeholder="Entrez le prénom"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <!-- Email -->
          <div class="mb-6">
            <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-envelope text-gray-400"></i>
              </div>
              <input
                type="email"
                id="email"
                v-model="form.email"
                placeholder="exemple@mail.com"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <!-- Bouton -->
          <button
            type="submit"
            class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
            :disabled="loading"
          >
            <i class="fas fa-user-plus mr-2"></i>
            {{ loading ? 'Création en cours...' : 'Créer compte témoin' }}
          </button>
        </form>
      </div>
      
      <!-- Pied de page -->
      <div class="bg-gray-100 p-4 text-center text-sm text-gray-600">
        <p><i class="fas fa-info-circle mr-1"></i> Ce compte aura un accès limité en lecture seule</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  nom: '',
  prenom: '',
  email: ''
})

const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  
  // Simulation d'un appel API
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Compte témoin créé:', form.value)
    // Réinitialiser le formulaire après soumission
    form.value = { nom: '', prenom: '', email: '' }
    alert('Compte témoin créé avec succès!')
  } catch (error) {
    console.error('Erreur:', error)
    alert('Une erreur est survenue lors de la création.')
  } finally {
    loading.value = false
  }
}
</script>

<style>
/* Styles spécifiques si nécessaires */
</style>