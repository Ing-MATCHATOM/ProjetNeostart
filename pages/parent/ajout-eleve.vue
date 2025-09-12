<template>
  <div class="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Navigation verticale gauche -->
    <aside class="w-64 bg-white shadow-md p-6 flex flex-col">
      <h2 class="text-2xl font-bold mb-6 text-indigo-700">Parent Dashboard</h2>
      <nav class="flex flex-col gap-3">
        <NuxtLink to="/parent" class="px-3 py-2 rounded hover:bg-indigo-100 transition bg-indigo-100">Accueil</NuxtLink>
        <NuxtLink to="/parent/create-eleve" class="px-3 py-2 rounded hover:bg-indigo-100 transition bg-indigo-100">Créer Élève</NuxtLink>
        <NuxtLink to="/parent/create-temoin" class="px-3 py-2 rounded hover:bg-indigo-100 transition">Créer Témoin</NuxtLink>
        <NuxtLink to="/parent/create-enseignant" class="px-3 py-2 rounded hover:bg-indigo-100 transition">Créer Enseignant</NuxtLink>
      </nav>
    </aside>

    <!-- Contenu dynamique à droite : formulaire élève -->
    <main class="flex-1 p-6">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- En-tête -->
        <div class="bg-indigo-600 p-4 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-2">
            <i class="fas fa-user-graduate text-indigo-600 text-2xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-white">Créer un élève</h2>
        </div>

        <div class="p-6">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Nom -->
            <div>
              <label class="block text-gray-700 mb-1">Nom</label>
              <input v-model="form.nom_famille" type="text" placeholder="Entrez le nom" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>

            <!-- Prénom -->
            <div>
              <label class="block text-gray-700 mb-1">Prénom</label>
              <input v-model="form.prenom" type="text" placeholder="Entrez le prénom" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>

            <!-- Classe -->
            <div>
              <label class="block text-gray-700 mb-1">Classe</label>
              <select v-model="form.niveau_id" required
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none">
                <option disabled value="">-- Sélectionner une classe --</option>
                <option v-for="niveau in niveaux" :key="niveau.id" :value="niveau.id">{{ niveau.nom }}</option>
              </select>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-gray-700 mb-1">Email</label>
              <input v-model="form.courriel" type="email" placeholder="exemple@mail.com" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>

            <!-- Boutons -->
            <div class="flex gap-3">
              <button type="button" @click="goBack"
                      class="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition">Retour</button>
              <button type="submit" :disabled="loading"
                      class="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                {{ loading ? 'Création en cours...' : 'Créer l\'élève' }}
              </button>
            </div>
          </form>
        </div>

        <div class="bg-gray-100 p-4 text-center text-sm text-gray-600">
          <p><i class="fas fa-shield-alt mr-1"></i> Toutes les données sont sécurisées</p>
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
const niveaux = ref([])

const form = ref({
  nom_famille: '',
  prenom: '',
  courriel: '',
  niveau_id: ''
})
const loading = ref(false)

const fetchNiveaux = async () => {
  try {
    const res = await fetch(`${base_url}/niveau/index`)
    niveaux.value = await res.json()
  } catch (e) {
    console.error("Erreur lors du chargement des niveaux :", e)
  }
}

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/Dashboard')
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

    const response = await fetch(`${base_url}/eleve/store`, {
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

onMounted(fetchNiveaux)
</script>

<style scoped>
select {
  background-image: none;
}
</style>
