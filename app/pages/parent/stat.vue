<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-6">Statistiques des validations</h1>
    <button
      @click="fetchStats"
      class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mb-4"
    >
      Rafraîchir
    </button>

    <div class="bg-white shadow rounded-lg p-4 overflow-x-auto">
      <table class="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="border px-3 py-2">Matière</th>
            <th class="border px-3 py-2">Jour</th>
            <th class="border px-3 py-2">Heure</th>
            <th class="border px-3 py-2">Enseignant</th>
            <th class="border px-3 py-2">Validé</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in stats" :key="s.id" class="hover:bg-gray-50 transition">
            <td class="border px-3 py-2">{{ s.matiere }}</td>
            <td class="border px-3 py-2">{{ s.jour }}</td>
            <td class="border px-3 py-2">{{ s.heure }}</td>
            <td class="border px-3 py-2">{{ s.enseignant_prenom }} {{ s.enseignant_nom }}</td>
            <td class="border px-3 py-2 text-green-600 font-semibold">{{ s.nb_valide }}</td>
          </tr>
          <tr v-if="stats.length === 0">
            <td colspan="7" class="text-center py-4 text-gray-500">
              Aucune séance trouvée
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const stats = ref([])

const fetchStats = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const res = await fetch('http://localhost:8000/api/statistiques-validations', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error('Erreur récupération statistiques')
    stats.value = await res.json()
  } catch (err) {
    console.error(err)
    alert('Impossible de récupérer les statistiques')
  }
}

onMounted(fetchStats)
</script>
