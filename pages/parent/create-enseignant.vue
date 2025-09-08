<template>
  <div class="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
    <div class="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- En-tête avec icône et bouton retour -->
      <div class="bg-indigo-600 p-4 text-center relative">
        <!-- Bouton retour -->
        <button 
          @click="goBack" 
          class="absolute left-4 top-4 text-white hover:text-gray-200 transition"
          title="Retour"
        >
          <i class="fas fa-arrow-left text-xl"></i>
        </button>
        
        <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-2">
          <i class="fas fa-chalkboard-teacher text-indigo-600 text-2xl"></i>
        </div>
        <h2 class="text-2xl font-bold text-white">Créer un enseignant</h2>
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
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <!-- Prénoms -->
          <div class="mb-5">
            <label for="prenoms" class="block text-gray-700 font-medium mb-2">Prénoms</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-signature text-gray-400"></i>
              </div>
              <input
                type="text"
                id="prenoms"
                v-model="form.prenoms"
                placeholder="Entrez les prénoms"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <!-- Email -->
          <div class="mb-5">
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
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <!-- Tarif -->
          <div class="mb-5">
            <label for="tarif" class="block text-gray-700 font-medium mb-2">Mode de tarif</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-money-bill-wave text-gray-400"></i>
              </div>
              <select
                id="tarif"
                v-model="form.tarif"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none transition"
                required
              >
                <option disabled value="">-- Choisir le mode de tarif --</option>
                <option>Par séance</option>
                <option>Par semaine</option>
                <option>Par mois</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i class="fas fa-chevron-down text-gray-400"></i>
              </div>
            </div>
          </div>

          <!-- Classe d'intervention -->
          <div class="mb-5">
            <label for="classe" class="block text-gray-700 font-medium mb-2">Classe d'intervention</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-graduation-cap text-gray-400"></i>
              </div>
              <input
                type="text"
                id="classe"
                v-model="form.classe"
                placeholder="Ex: 4ème, 3ème..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <!-- Matière -->
          <div class="mb-5">
            <label for="matiere" class="block text-gray-700 font-medium mb-2">Matière</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-book text-gray-400"></i>
              </div>
              <input
                type="text"
                id="matiere"
                v-model="form.matiere"
                placeholder="Ex: Mathématiques, Physique..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <!-- Salaire -->
          <div class="mb-6">
            <label for="salaire" class="block text-gray-700 font-medium mb-2">Salaire (FCFA)</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-money-bill text-gray-400"></i>
              </div>
              <input
                type="number"
                id="salaire"
                v-model="form.salaire"
                placeholder="Montant du salaire"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <!-- Boutons -->
          <div class="flex space-x-4">
            <button
              type="button"
              @click="goBack"
              class="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              Retour
            </button>
            
            <button
              type="submit"
              class="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
              :disabled="loading"
            >
              <i class="fas fa-check-circle mr-2"></i>
              {{ loading ? 'Validation...' : 'Valider' }}
            </button>
          </div>
        </form>
      </div>
      
      <!-- Pied de page -->
      <div class="bg-gray-100 p-4 text-center text-sm text-gray-600">
        <p><i class="fas fa-shield-alt mr-1"></i> Informations sécurisées et confidentielles</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  nom: '',
  prenoms: '',
  email: '',
  tarif: '',
  classe: '',
  matiere: '',
  salaire: ''
})

const loading = ref(false)

const goBack = () => {
  // Retour à la page précédente
  window.history.length > 1 ? window.history.back() : navigateTo('/parent')
}

const handleSubmit = async () => {
  loading.value = true
  
  // Simulation d'un appel API
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Enseignant créé:', form.value)
    // Réinitialiser le formulaire après soumission
    form.value = { 
      nom: '', 
      prenoms: '', 
      email: '', 
      tarif: '', 
      classe: '', 
      matiere: '', 
      salaire: '' 
    }
    alert('Enseignant créé avec succès!')
  } catch (error) {
    console.error('Erreur:', error)
    alert('Une erreur est survenue lors de la création.')
  } finally {
    loading.value = false
  }
}
</script>

<style>
/* Styles pour le select */
select {
  background-image: none;
}
</style>