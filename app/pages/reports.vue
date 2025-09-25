<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Mes Reports envoyés</h1>
      <button
        @click="fetchReports"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Rafraîchir
      </button>
    </div>

    <!-- Table des reports -->
    <div class="bg-white shadow rounded-lg p-4 overflow-x-auto">
      <table class="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="border px-3 py-2">Matière</th>
            <th class="border px-3 py-2">Nouvelle date</th>
            <th class="border px-3 py-2">Ancienne date</th>
            <th class="border px-3 py-2">Motif</th>
            <th class="border px-3 py-2">Élèves</th>
            <th class="border px-3 py-2">Statut (parent)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="r in reports"
            :key="r.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="border px-3 py-2">{{ r.matiere }}</td>
            <td class="border px-3 py-2">{{ formatDate(r.nouvelle_date) }}</td>
            <td class="border px-3 py-2">
              {{ r.ancien_jour }} {{ r.ancienne_heure }}
            </td>
            <td class="border px-3 py-2">{{ r.motif }}</td>
            <td class="border px-3 py-2">{{ r.eleves }}</td>
            <td class="border px-3 py-2">
              <span
                v-if="r.statut === 'en_attente'"
                class="text-yellow-600 font-semibold"
              >
                En attente ⏳
              </span>
              <span
                v-else-if="r.statut === 'valide'"
                class="text-green-600 font-semibold"
              >
                Validé ✅
              </span>
              <span
                v-else-if="r.statut === 'refuse'"
                class="text-red-600 font-semibold"
              >
                Refusé ❌
              </span>
            </td>
          </tr>
          <tr v-if="reports.length === 0">
            <td colspan="6" class="text-center py-4 text-gray-500">
              Aucun report trouvé
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const reports = ref([])

const fetchReports = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const res = await fetch('http://localhost:8000/api/mes-reports-enseignant', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error('Erreur récupération reports enseignant')
    reports.value = await res.json()
  } catch (err) {
    console.error(err)
    alert('Impossible de récupérer les reports enseignant')
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(fetchReports)
</script>
