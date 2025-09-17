<template>
  <div class="min-h-screen flex bg-gradient-to-br from-indigo-50 to-purple-100">
    <!-- Nav verticale -->
    <aside class="w-64 bg-white shadow-md p-6 flex flex-col">
      <h2 class="text-2xl font-bold mb-6 text-indigo-700">Enseignant Dashboard</h2>
      <nav class="flex flex-col gap-3">
        <NuxtLink to="/parent" class="px-3 py-2 rounded hover:bg-indigo-100 transition bg-indigo-100">Accueil</NuxtLink>
        <NuxtLink to="/parent/ajout-enseignant" class="px-3 py-2 rounded hover:bg-indigo-100 transition bg-indigo-100">Créer Enseignant</NuxtLink>
      </nav>
    </aside>

    <!-- Contenu principal -->
    <main class="flex-1 p-6">
      <div v-if="showList" class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6">
        <h2 class="text-xl font-bold mb-4">Liste des enseignants</h2>
        <table class="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr class="bg-gray-100">
              <th class="border px-4 py-2 text-left">Nom</th>
              <th class="border px-4 py-2 text-left">Prénom</th>
              <th class="border px-4 py-2 text-left">Email</th>
              <th class="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="enseignant in enseignants" :key="enseignant.id" class="hover:bg-gray-50">
              <td class="border px-4 py-2">{{ enseignant.enseignant.nom_famille }}</td>
              <td class="border px-4 py-2">{{ enseignant.enseignant.prenom }}</td>
              <td class="border px-4 py-2">{{ enseignant.enseignant.courriel }}</td>

              <td class="border px-4 py-2 text-center">
                <button @click="associer(enseignant.enseignant.id)" 
             
                        class="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition">
                  Associer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Formulaire Ajouter Enseignant -->
        <div class="bg-indigo-600 p-4 text-center">
          <h2 class="text-2xl font-bold text-white">Créer un enseignant</h2>
        </div>

        <div class="p-6">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-gray-700 mb-1">Nom</label>
              <input v-model="form.nom_famille" type="text" placeholder="Nom" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>

            <div>
              <label class="block text-gray-700 mb-1">Prénom</label>
              <input v-model="form.prenom" type="text" placeholder="Prénom" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>

            <div>
              <label class="block text-gray-700 mb-1">Email</label>
              <input v-model="form.courriel" type="email" placeholder="Email" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>

            <div class="flex gap-3">
              <button type="button" @click="showList = true"
                      class="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition">Retour</button>
              <button type="submit" :disabled="loading"
                      class="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                {{ loading ? 'Création...' : 'Valider' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const base_url = "http://127.0.0.1:8000/api"
const showList = ref(true)
const enseignants = ref([])

const form = ref({
  nom_famille: '',
  prenom: '',
  courriel: ''
})
const loading = ref(false)

const fetchEnseignants = async () => {
  const token = JSON.parse(localStorage.getItem('token'))

  try {
    const res = await fetch(`${base_url}/enseignant/index`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    enseignants.value = await res.json()
  } catch (e) {
    console.error(e)
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) {
      alert('Veuillez vous connecter')
      return
    }

    const res = await fetch(`${base_url}/enseignant/store`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form.value)
    })

    if (!res.ok) throw new Error('Erreur serveur')

    alert('Enregistrement effectué')
    form.value = { nom_famille: '', prenom: '', courriel: '' }
    showList.value = true
    fetchEnseignants()

  } catch (err) {
    console.error(err)
    alert('Erreur création')
  } finally {
    loading.value = false
  }
}

const associer = (id) => {
  alert(`Associer enseignant ID: ${id}`)
}

onMounted(fetchEnseignants)
</script>

<style scoped>
table th, table td { border: 1px solid #ddd; }
</style>
