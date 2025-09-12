<template>
  <div class="min-h-screen flex bg-gradient-to-br from-yellow-50 to-orange-100">
    <!-- Nav verticale -->
    <aside class="w-64 bg-white shadow-md p-6 flex flex-col">
      <h2 class="text-2xl font-bold mb-6 text-yellow-700">Témoin Dashboard</h2>
      <nav class="flex flex-col gap-3">
        <NuxtLink to="/parent" class="px-3 py-2 rounded hover:bg-yellow-100 transition bg-yellow-100">Accueil</NuxtLink>
        <NuxtLink to="/parent/ajout-temoin" class="px-3 py-2 rounded hover:bg-yellow-100 transition bg-yellow-100">Créer Témoin</NuxtLink>
      </nav>
    </aside>

    <!-- Contenu principal -->
    <main class="flex-1 p-6">
      <div v-if="showList" class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6">
        <h2 class="text-xl font-bold mb-4">Liste des témoins</h2>
        <table class="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr class="bg-gray-100">
              <th class="border px-4 py-2">Nom</th>
              <th class="border px-4 py-2">Téléphone</th>
              <th class="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="temoin in temoins" :key="temoin.id" class="hover:bg-gray-50">
              <td class="border px-4 py-2">{{ temoin.nom_famille }}</td>
              <td class="border px-4 py-2">{{ temoin.telephone }}</td>
              <td class="border px-4 py-2 text-center">
                <button @click="associer(temoin.id)" class="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700">
                  Associer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Formulaire -->
      <div v-else class="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="bg-yellow-600 p-4 text-center">
          <h2 class="text-2xl font-bold text-white">Créer un témoin</h2>
        </div>
        <div class="p-6">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <input v-model="form.nom_famille" type="text" placeholder="Nom" class="input" required />
            <input v-model="form.telephone" type="text" placeholder="Téléphone" class="input" required />

            <div class="flex gap-3">
              <button type="button" @click="showList = true" class="btn-gray">Retour</button>
              <button type="submit" :disabled="loading" class="btn-yellow">
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
const temoins = ref([])
const form = ref({ nom_famille:'', telephone:'' })
const loading = ref(false)

const fetchTemoins = async () => {
  const res = await fetch(`${base_url}/temoin/index`)
  temoins.value = await res.json()
}
const handleSubmit = async () => { /* même logique que Enseignant */ }
const associer = (id) => alert(`Associer témoin ID: ${id}`)
onMounted(fetchTemoins)
</script>

<style scoped>
</style>
