<template>
  <div class="bg-white shadow rounded p-4">
    <h2 class="text-xl font-bold mb-4">Liste des Séances</h2>

    <table class="min-w-full table-auto">
      <thead>
        <tr class="bg-gray-200">
          <th class="px-4 py-2">Matière</th>
          <th class="px-4 py-2">Date</th>
          <th class="px-4 py-2">Heure</th>
          <th class="px-4 py-2">Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="seance in seances" :key="seance.id" class="border-b hover:bg-gray-50">
          <td class="px-4 py-2">{{ seance.matiere }}</td>
          <td class="px-4 py-2">{{ seance.date }}</td>
          <td class="px-4 py-2">{{ seance.heure }}</td>
          <td class="px-4 py-2">
            <span :class="statusClass(seance.statut)" class="px-2 py-1 rounded text-white text-sm">
              {{ seance.statut }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  seances: {
    type: Array,
    required: true
  }
})

const statusClass = (statut) => {
  switch (statut) {
    case 'planifie': return 'bg-blue-500'
    case 'valide': return 'bg-green-500'
    case 'reportee': return 'bg-yellow-500'
    case 'annulee': return 'bg-red-500'
    default: return 'bg-gray-400'
  }
}
</script>
