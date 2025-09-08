<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-3xl font-bold mb-6">Emploi du temps</h1>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded shadow">
        <thead class="bg-blue-500 text-white">
          <tr>
            <th class="py-2 px-4">Jour / Heure</th>
            <th class="py-2 px-4">08:00 - 09:00</th>
            <th class="py-2 px-4">09:00 - 10:00</th>
            <th class="py-2 px-4">10:00 - 11:00</th>
            <th class="py-2 px-4">11:00 - 12:00</th>
            <th class="py-2 px-4">13:00 - 14:00</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="day in timetable" :key="day.name" class="text-center border-b">
            <td class="py-2 px-4 font-semibold">{{ day.name }}</td>
            <td v-for="hour in day.hours" :key="hour" class="py-2 px-4">
              {{ hour || '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

// Exemple de données d'emploi du temps
const timetable = reactive([
  { name: 'Lundi', hours: ['Math', 'Physique', 'Anglais', '', 'Histoire'] },
  { name: 'Mardi', hours: ['Français', '', 'Math', 'EPS', 'SVT'] },
  { name: 'Mercredi', hours: ['Anglais', 'Math', '', 'Informatique', ''] },
  { name: 'Jeudi', hours: ['Physique', 'SVT', 'Français', '', 'EPS'] },
  { name: 'Vendredi', hours: ['Histoire', 'Math', 'Anglais', 'Physique', ''] },
])
</script>

<style scoped>
table {
  border-collapse: collapse;
}
th, td {
  border: 1px solid #e2e8f0;
}
</style>
