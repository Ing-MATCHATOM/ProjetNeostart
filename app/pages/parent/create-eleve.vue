<template>
  <div class="min-h-screen flex bg-gradient-to-br from-green-50 to-blue-100">
    <!-- Nav verticale -->
    <aside class="w-64 bg-white shadow-md p-6 flex flex-col">
      <h2 class="text-2xl font-bold mb-6 text-green-700">Élève Dashboard</h2>
      <nav class="flex flex-col gap-3">
        <NuxtLink to="/parent" class="px-3 py-2 rounded hover:bg-green-100 transition bg-green-100">Accueil</NuxtLink>
        <NuxtLink to="/parent/ajout-eleve" class="px-3 py-2 rounded hover:bg-green-100 transition bg-green-100">Créer Élève</NuxtLink>
      </nav>
    </aside>

    <!-- Contenu principal -->
    <main class="flex-1 p-6">
      <div v-if="showList" class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6">
        <h2 class="text-xl font-bold mb-4">Liste des élèves</h2>
        <table class="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr class="bg-gray-100">
              <th class="border px-4 py-2">Nom</th>
              <th class="border px-4 py-2">Prénom</th>
              <th class="border px-4 py-2">Classe</th>
              <th class="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="eleve in eleves" :key="eleve.id" class="hover:bg-gray-50">
              <td class="border px-4 py-2">{{ eleve.eleve.nom_famille }}</td>
              <td class="border px-4 py-2">{{ eleve.eleve.prenom }}</td>
              <td class="border px-4 py-2">{{ eleve.eleve.classe }}</td>
              <td class="border px-4 py-2 text-center">
                <button @click="associer(eleve.eleve.id)" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                  Associer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Formulaire -->
      <div v-else class="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="bg-green-600 p-4 text-center">
          <h2 class="text-2xl font-bold text-white">Créer un élève</h2>
        </div>
        <div class="p-6">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <input v-model="form.nom_famille" type="text" placeholder="Nom" class="input" required />
            <input v-model="form.prenom" type="text" placeholder="Prénom" class="input" required />
            <input v-model="form.classe" type="text" placeholder="Classe" class="input" required />

            <div class="flex gap-3">
              <button type="button" @click="showList = true" class="btn-gray">Retour</button>
              <button type="submit" :disabled="loading" class="btn-green">
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
const eleves = ref([])
const form = ref({ nom_famille: '', prenom: '', classe: '' })
const loading = ref(false)

// Récupérer la liste des élèves
const fetchEleves = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const res = await fetch(`${base_url}/eleve/index`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    eleves.value = await res.json()
  } catch (e) {
    console.error(e)
  }
}

// Créer un élève
const handleSubmit = async () => {
  loading.value = true
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) {
      alert('Veuillez vous connecter')
      return
    }

    const res = await fetch(`${base_url}/eleve/store`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form.value)
    })

    if (!res.ok) throw new Error('Erreur serveur')

    alert('Élève créé avec succès')
    form.value = { nom_famille: '', prenom: '', classe: '' }
    showList.value = true
    fetchEleves() // rafraîchir la liste

  } catch (err) {
    console.error(err)
    alert('Erreur lors de la création')
  } finally {
    loading.value = false
  }
}

// Associer un élève
const associer = (id) => {
  alert(`Associer élève ID: ${id}`)
}

onMounted(fetchEleves)
</script>


<style scoped>
</style>
