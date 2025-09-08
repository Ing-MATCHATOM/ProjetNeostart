<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Tableau de bord Témoin</h1>

    <!-- Statistiques rapides -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white shadow rounded p-4">
        <p class="text-gray-500">Séances à venir</p>
        <p class="text-xl font-semibold">{{ seances.length }}</p>
      </div>
      <div class="bg-white shadow rounded p-4">
        <p class="text-gray-500">Séances validées</p>
        <p class="text-xl font-semibold">{{ validatedSeances }}</p>
      </div>
      <div class="bg-white shadow rounded p-4">
        <p class="text-gray-500">Séances reportées</p>
        <p class="text-xl font-semibold">{{ reportedSeances }}</p>
      </div>
    </div>

    <!-- Liste des séances -->
    <SeanceList :seances="seances" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SeanceList from '../seances/SeanceList.vue'

const seances = ref([
  { id: 1, matiere: 'Math', date: '2025-09-10', heure: '10:00', statut: 'planifie' },
  { id: 2, matiere: 'Physique', date: '2025-09-11', heure: '14:00', statut: 'valide' }
])

const validatedSeances = ref(1)
const reportedSeances = ref(0)
</script>
