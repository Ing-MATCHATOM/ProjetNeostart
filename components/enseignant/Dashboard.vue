<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-3xl font-bold mb-6">Tableau de bord Enseignant</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Emploi du temps -->
      <div class="bg-white p-4 rounded shadow hover:shadow-lg transition">
        <h2 class="text-xl font-semibold mb-2">Emploi du temps</h2>
        <p class="text-gray-600">Voir votre planning de cours.</p>
      </div>

      <!-- Rapports -->
      <div class="bg-white p-4 rounded shadow hover:shadow-lg transition">
        <h2 class="text-xl font-semibold mb-2">Rapports</h2>
        <p class="text-gray-600">Générer et consulter vos rapports.</p>
      </div>

      <!-- Validation -->
      <div class="bg-white p-4 rounded shadow hover:shadow-lg transition">
        <h2 class="text-xl font-semibold mb-2">Validation</h2>
        <p class="text-gray-600">Valider les notes et travaux des élèves.</p>
      </div>

      <!-- Statistiques -->
      <div class="bg-white p-4 rounded shadow hover:shadow-lg transition">
        <h2 class="text-xl font-semibold mb-2">Statistiques</h2>
        <p class="text-gray-600">Voir vos statistiques par classe et matière.</p>
      </div>
    </div>

    <!-- Section détails rapides -->
    <div class="mt-8 bg-white p-6 rounded shadow">
      <h2 class="text-2xl font-semibold mb-4">Résumé rapide</h2>
      <ul class="space-y-2 text-gray-700">
        <li>- Nombre de cours cette semaine: 12</li>
        <li>- Rapports non validés: 3</li>
        <li>- Étudiants en retard sur les travaux: 5</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Tu peux ici importer des données depuis ton API backend si nécessaire
</script>

<style scoped>
/* Styles supplémentaires si nécessaire */
</style>
