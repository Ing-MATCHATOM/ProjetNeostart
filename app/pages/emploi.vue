<template>
  <div class="min-h-screen flex bg-gray-50">
    <!-- Sidebar -->
    <div class="w-64 bg-indigo-800 text-white p-6 flex flex-col">
      <h2 class="text-2xl font-bold mb-8">Enseignant</h2>
      <nav class="space-y-4">
        <NuxtLink to="/enseignant/emploi" class="nav-link">Accueil</NuxtLink>
        <NuxtLink to="/" class="nav-link">Emploi du temps</NuxtLink>
        <NuxtLink to="/enseignant/rapports" class="nav-link">Rapports</NuxtLink>
        <NuxtLink to="/enseignant/validation" class="nav-link">Validation</NuxtLink>
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
            <label class="block text-gray-700 font-medium mb-1">Date</label>
            <input type="date" v-model="form.date" required class="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-1">Heure</label>
            <input type="time" v-model="form.heure" required class="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-1">Matière</label>
            <input type="text" v-model="form.matiere" required placeholder="Ex: Maths" class="w-full border px-3 py-2 rounded" />
          </div>

          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Enregistrer
          </button>
        </form>

        <!-- Messages -->
        <p v-if="successMessage" class="text-green-600 mt-3">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-600 mt-3">{{ errorMessage }}</p>
      </div>

      <!-- Liste des séances -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-if="seances.length === 0" class="text-gray-500 col-span-full">
          Aucune séance programmée.
        </div>

        <div v-for="(seance, index) in seances" :key="index" class="dashboard-card">
          <i class="fas fa-calendar-alt dashboard-icon bg-indigo-100 text-indigo-600"></i>
          <div>
            <p><strong>Date:</strong> {{ formatDate(seance.date) }}</p>
            <p><strong>Heure:</strong> {{ seance.heure }}</p>
            <p><strong>Matière:</strong> {{ seance.matiere }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const user = ref({})
const successMessage = ref('')
const errorMessage = ref('')

// Charger utilisateur
onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  } else {
    navigateTo('/login')
  }
})

// Formulaire de séance
const form = ref({
  date: '',
  heure: '',
  matiere: ''
})

// Liste des séances
const seances = ref([])

// Charger les séances existantes
async function fetchSeances() {
  try {
    const data = await $fetch('/api/seances') // endpoint pour récupérer les séances
    seances.value = data
  } catch (err) {
    errorMessage.value = "Impossible de charger les séances."
    console.error('Erreur chargement:', err)
  }
}

// Soumettre le formulaire et enregistrer via l'API
const handleSubmit = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    // Préparer le payload pour l'API seances
    const payload = {
      jour: form.value.date,            // si ton backend attend "jour"
      heure: form.value.heure,
      matiere: form.value.matiere,

    }

    // Appel API POST pour enregistrer la séance
    const response = await fetch('http://localhost:8000/api/emploi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // ⚡ backticks obligatoires
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) throw new Error('Erreur lors de l\'envoi.')

    successMessage.value = '✅ Séance enregistrée avec succès'
    form.date = ''
    form.heure = ''
    form.matiere = ''

    // Rafraîchir la liste des séances
    fetchSeances()

  } catch (err) {
    console.error(err)
    errorMessage.value = '❌ Une erreur est survenue.'
  }
}

// Déconnexion
const handleLogout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  navigateTo('/login')
}

onMounted(fetchSeances)

// Formater la date pour l'affichage
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR')
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

.dashboard-card {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  gap: 12px;
  background: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: all 0.3s;
}
.dashboard-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.dashboard-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
</style>
