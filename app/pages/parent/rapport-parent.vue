<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="text-3xl font-bold mb-6">Mes Rapports</h1>

    <div v-if="rapports.length === 0" class="text-gray-500">
      Aucun rapport disponible pour le moment.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="r in rapports"
        :key="r.id"
        class="bg-white p-4 rounded-lg shadow"
      >
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-indigo-700">
            Rapport du {{ r.date }}
          </h2>
          <button
            @click="supprimerRapport(r.id)"
            class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>

        <p class="text-sm text-gray-600">
          De {{ r.heure_debut }} à {{ r.heure_fin }}
        </p>
        <p class="text-sm text-gray-500">
          Enseignant : {{ r.enseignant_prenom }} {{ r.enseignant_nom }} |
          Élèves : {{ r.eleves }}
        </p>

        <div class="mt-2 prose max-w-none" v-html="r.contenu"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const rapports = ref([])

onMounted(async () => {
  await chargerRapports()
})

async function chargerRapports() {
  const token = JSON.parse(localStorage.getItem("token"))
  try {
    const res = await fetch("http://localhost:8000/api/mes-rapports", {
      headers: { Authorization: `Bearer ${token}` },
    })
    rapports.value = await res.json()
  } catch (err) {
    console.error("Erreur chargement rapports:", err)
  }
}

async function supprimerRapport(id) {
  const token = JSON.parse(localStorage.getItem("token"))
  if (!confirm("Voulez-vous vraiment supprimer ce rapport ?")) return

  try {
    await fetch(`http://localhost:8000/api/rapports/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    rapports.value = rapports.value.filter(r => r.id !== id)
  } catch (err) {
    console.error("Erreur suppression:", err)
  }
}
</script>

<style>
.prose {
  white-space: pre-line;
}
</style>
