<template>
  <div class="min-h-screen flex bg-gradient-to-br from-indigo-50 to-purple-100">
    <!-- Navigation verticale gauche -->
    <aside class="w-64 bg-white shadow-md p-6 flex flex-col">
      <h2 class="text-2xl font-bold mb-6 text-indigo-700">Parent Dashboard</h2>
      <nav class="flex flex-col gap-3">
        <NuxtLink to="/parent" class="px-3 py-2 rounded hover:bg-indigo-100 transition bg-indigo-100">Accueil</NuxtLink>
        <NuxtLink to="/parent/create-eleve" class="px-3 py-2 rounded hover:bg-indigo-100 transition">Créer Élève</NuxtLink>
        <NuxtLink to="/parent/create-temoin" class="px-3 py-2 rounded hover:bg-indigo-100 transition">Créer Témoin</NuxtLink>
        <NuxtLink to="/parent/create-enseignant" class="px-3 py-2 rounded hover:bg-indigo-100 transition bg-indigo-100">Créer Enseignant</NuxtLink>
      </nav>
    </aside>

    <!-- Contenu dynamique à droite : formulaire enseignant -->
    <main class="flex-1 p-6 bg-white rounded-xl shadow-md m-4">
      <div class="max-w-lg mx-auto">
        <!-- En-tête formulaire -->
        <div class="bg-indigo-600 p-4 text-center relative rounded-t-lg">
          <h2 class="text-2xl font-bold text-white">Créer un enseignant</h2>
        </div>

        <div class="p-6 bg-white rounded-b-lg shadow">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Nom -->
            <div>
              <label class="block text-gray-700 mb-1">Nom</label>
              <input v-model="form.nom_famille" type="text" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>

            <!-- Prénom -->
            <div>
              <label class="block text-gray-700 mb-1">Prénom</label>
              <input v-model="form.prenom" type="text" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-gray-700 mb-1">Email</label>
              <input v-model="form.courriel" type="email" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>

            <!-- Mode de paiement -->
            <div>
              <label class="block text-gray-700 mb-1">Mode de paiement</label>
              <select v-model="form.mode_paiement" required
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                <option disabled value="">-- Choisir le mode de paiement --</option>
                <option value="Par seance">Par séance</option>
                <option value="Par semaine">Par semaine</option>
                <option value="Par mois">Par mois</option>
              </select>
            </div>

            <!-- Classe d'intervention -->
            <div>
              <label class="block text-gray-700 mb-1">Classe d'intervention</label>
              <input v-model="form.classe" type="text" placeholder="Ex: 4ème, 3ème..." required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>

            <!-- Nombre d'enfants -->
            <div>
              <label class="block text-gray-700 mb-1">Nombre d'enfants</label>
              <input v-model.number="form.nbre_enfant" type="number" min="0" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>

            <!-- Matière -->
            <div>
              <label class="block text-gray-700 mb-1">Matière</label>
              <input v-model="form.matiere" type="text" placeholder="Ex: Mathématiques, Physique..." required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>

            <!-- Salaire -->
            <div>
              <label class="block text-gray-700 mb-1">Salaire (FCFA)</label>
              <input v-model.number="form.salaire" type="number" placeholder="Montant du salaire" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>

            <!-- Boutons -->
            <div class="flex gap-3">
              <button type="button" @click="goBack"
                      class="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition">Retour</button>
              <button type="submit" :disabled="loading"
                      class="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                {{ loading ? 'Validation...' : 'Valider' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const base_url = "http://127.0.0.1:8000/api"
const router = useRouter()

const form = ref({
  nom_famille: '',
  prenom: '',
  courriel: '',
  mode_paiement:"",
  nbre_enfant: 0,
  classe: '',
  matiere: '',
  salaire: 0
})

const loading = ref(false)

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/parent')
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) {
      alert("Veuillez vous connecter d'abord")
      router.push('/login')
      return
    }

    const response = await fetch(`${base_url}/enseignant/store`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) throw new Error('Erreur serveur')

    alert('Enregistrement effectué')
    router.push('/parent')
  } catch (error) {
    console.error(error)
    alert('Une erreur est survenue lors de la création.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
select {
  background-image: none;
}
</style>
