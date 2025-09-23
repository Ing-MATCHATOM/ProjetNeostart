<template>
  <div class="min-h-screen flex bg-gray-50">
    <!-- Sidebar -->
    <div class="w-64 bg-indigo-800 text-white p-6 flex flex-col">
      <h2 class="text-2xl font-bold mb-8">Enseignant</h2>
      <nav class="space-y-4">
        <NuxtLink to="dashboard-enseignant" class="nav-link">Accueil</NuxtLink>
        <NuxtLink to="emploi" class="nav-link">Emploi du temps</NuxtLink>
        <NuxtLink to="rapport-enseignant" class="nav-link">Rapports</NuxtLink>
        <NuxtLink to="/enseignant/statistiques" class="nav-link">Statistiques</NuxtLink>
      </nav>
    </div>

    <!-- Contenu principal -->
    <div class="flex-1 p-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Programmer une séance</h1>
          <p class="text-gray-600">{{ user.prenom }} {{ user.nom_famille }}</p>
          <p class="text-sm text-gray-500">{{ user.courriel }}</p>
        </div>
        <button
          @click="handleLogout"
          class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Déconnexion
        </button>
      </div>

      <!-- Formulaire de séance -->
      <div class="bg-white p-6 rounded shadow-md max-w-xl mb-8">
        <h2 class="text-2xl font-bold mb-4">Nouvelle séance</h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-medium mb-2">
              Jours, Heures, Matières, Élèves & Témoins
            </label>
            <div class="space-y-3">
              <div
                v-for="day in daysOfWeek"
                :key="day.value"
                class="flex flex-col md:flex-row md:items-center md:space-x-4 p-2 border rounded"
              >
                <div class="flex items-center space-x-2 mb-2 md:mb-0">
                  <input
                    type="checkbox"
                    :value="day.value"
                    v-model="selectedDays"
                    class="rounded border-gray-300"
                  />
                  <span class="w-24">{{ day.label }}</span>
                </div>

                <!-- Heure -->
                <input
                  v-if="selectedDays.includes(day.value)"
                  type="time"
                  v-model="form[day.value].heure"
                  class="border px-2 py-1 rounded w-32"
                />

                <!-- Matière -->
                <input
                  v-if="selectedDays.includes(day.value)"
                  type="text"
                  v-model="form[day.value].matiere"
                  placeholder="Ex: Maths"
                  class="border px-2 py-1 rounded flex-1"
                />

                <!-- Sélection Élève & Témoin -->
                <div
                  v-if="selectedDays.includes(day.value)"
                  class="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0"
                >
                  <!-- Élèves -->
                  <select
                    v-model="form[day.value].eleveId"
                    class="border px-2 py-1 rounded w-full md:w-48"
                  >
                    <option value="" disabled>-- Sélectionner un élève --</option>
                    <option
                      v-for="e in eleves"
                      :key="e.eleve_id"
                      :value="e.eleve_id"
                    >
                      {{ e.eleve_nom }} {{ e.eleve_prenom }}
                    </option>
                  </select>

                  <!-- Témoins -->
                  <select
                    v-model="form[day.value].temoinId"
                    class="border px-2 py-1 rounded w-full md:w-48"
                  >
                    <option value="" disabled>-- Sélectionner un témoin --</option>
                    <option
                      v-for="t in temoins"
                      :key="t.temoin_id"
                      :value="t.temoin_id"
                    >
                      {{ t.temoin_nom }} {{ t.temoin_prenom }}
                    </option>
                  </select>
                  <!-- Témoins -->
                  <select
                    v-model="form[day.value].temoinId"
                    class="border px-2 py-1 rounded w-full md:w-48"
                  >
                    <option value="" disabled>-- Sélectionner un Parent --</option>
                    <option
                      v-for="t in parents"
                      :key="t.parent_id"
                      :value="t.parent_id"
                    >
                      {{ t.parent_nom }} {{ t.parent_prenom }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </form>

        <!-- Messages -->
        <p v-if="successMessage" class="text-green-600 mt-3">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-600 mt-3">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref({})
const successMessage = ref('')
const errorMessage = ref('')

// Jours de la semaine
const daysOfWeek = [
  { value: 'lundi', label: 'Lundi' },
  { value: 'mardi', label: 'Mardi' },
  { value: 'mercredi', label: 'Mercredi' },
  { value: 'jeudi', label: 'Jeudi' },
  { value: 'vendredi', label: 'Vendredi' },
  { value: 'samedi', label: 'Samedi' },
  { value: 'dimanche', label: 'Dimanche' },
]

// jours cochés
const selectedDays = ref([])

// Formulaire initialisé
const form = ref({})
daysOfWeek.forEach(day => {
  form.value[day.value] = { heure: '', matiere: '', eleveId: '', temoinId: '' ,parentId:''}
})

// Liste des élèves et témoins
const eleves = ref([])
const temoins = ref([])
const parents = ref([])

// Charger utilisateur, élèves et témoins
onMounted(async () => {
  const userData = localStorage.getItem('user')
  if (userData) user.value = JSON.parse(userData)
  else router.push('/login')

  const token = JSON.parse(localStorage.getItem('token'))
  try {
    const res = await fetch('http://localhost:8000/api/mes-eleves', {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    eleves.value = data.eleves || []
    temoins.value = data.temoins || []
    parents.value = data.parent ? [data.parent] : []
  } catch (err) {
    console.error('Erreur chargement élèves ou témoins:', err)
  }
})

// Soumettre le formulaire
const handleSubmit = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const payload = selectedDays.value.map(jour => ({
      jour,
      heure: form.value[jour].heure,
      matiere: form.value[jour].matiere,
      eleve_id: form.value[jour].eleveId,
      temoin_id: form.value[jour].temoinId,
      parent_id: form.value[jour].parentId
    }))

    const response = await fetch('http://localhost:8000/api/emploi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ seances: payload })
    })

    if (!response.ok) throw new Error('Erreur lors de l\'envoi.')

    successMessage.value = 'Séances enregistrées avec succès'
    selectedDays.value = []

    // Réinitialiser le formulaire
    daysOfWeek.forEach(day => {
      form.value[day.value] = { heure: '', matiere: '', eleveId: '', temoinId: '' }
    })
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Une erreur est survenue.'
  }
}

// Déconnexion
const handleLogout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.nav-link {
  display: block;
  padding: 10px 14px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}
.nav-link:hover {
  background-color: #4338ca;
}
</style>
