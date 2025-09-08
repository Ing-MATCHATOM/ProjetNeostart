<template>
  <div class="bg-white shadow rounded p-4 mt-4">
    <h2 class="text-xl font-bold mb-4">Validation de la Séance</h2>

    <div v-for="user in acteurs" :key="user.role" class="flex items-center mb-2">
      <p class="flex-1 capitalize">{{ user.role }}</p>
      <button
        @click="valider(user.role)"
        :class="user.valid ? 'bg-green-500' : 'bg-gray-300'"
        class="px-4 py-1 rounded text-white"
      >
        {{ user.valid ? 'Validé' : 'Valider' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const acteurs = ref([
  { role: 'enseignant', valid: false },
  { role: 'eleve', valid: true },
  { role: 'parent', valid: false },
  { role: 'temoin', valid: false }
])

const valider = (role) => {
  const user = acteurs.value.find(u => u.role === role)
  if (user) user.valid = true
}
</script>
