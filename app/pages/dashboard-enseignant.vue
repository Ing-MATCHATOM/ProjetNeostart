<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <div class="w-64 bg-indigo-800 text-white p-6 flex flex-col">
      <h2 class="text-2xl font-bold mb-8">Enseignant</h2>
      <nav class="space-y-4">
        <NuxtLink to="/enseignant/emploi" class="nav-link">Emploi du temps</NuxtLink>
        <NuxtLink to="rapport-enseignant" class="nav-link">Rapports</NuxtLink>
        <NuxtLink to="/enseignant/validation" class="nav-link">Validation</NuxtLink>
        <NuxtLink to="/enseignant/statistiques" class="nav-link">Statistiques</NuxtLink>
      </nav>
    </div>

    <!-- Contenu principal -->
    <div class="flex-1 p-8 bg-gray-50">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Bienvenue Enseignant</h1>
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

      <!-- Cartes principales -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="dashboard-card">
          <i class="fas fa-calendar-alt dashboard-icon bg-indigo-100 text-indigo-600"></i>
          <div>
            <p class="dashboard-value">12</p>
            <p class="dashboard-label">Cours cette semaine</p>
          </div>
        </div>

        <div class="dashboard-card">
          <i class="fas fa-file-alt dashboard-icon bg-yellow-100 text-yellow-600"></i>
          <div>
            <p class="dashboard-value">3</p>
            <p class="dashboard-label">Rapports non validés</p>
          </div>
        </div>

        <div class="dashboard-card">
          <i class="fas fa-user-clock dashboard-icon bg-red-100 text-red-600"></i>
          <div>
            <p class="dashboard-value">5</p>
            <p class="dashboard-label">Élèves en retard</p>
          </div>
        </div>

        <div class="dashboard-card">
          <i class="fas fa-chart-line dashboard-icon bg-green-100 text-green-600"></i>
          <div>
            <p class="dashboard-value">78%</p>
            <p class="dashboard-label">Taux de progression</p>
          </div>
        </div>
      </div>

      <!-- Résumé rapide -->
      <div class="bg-white p-6 rounded shadow">
        <h2 class="text-2xl font-semibold mb-4">Résumé rapide</h2>
        <ul class="space-y-2 text-gray-700">
          <li>- Nombre de cours cette semaine : 12</li>
          <li>- Rapports non validés : 3</li>
          <li>- Étudiants en retard sur les travaux : 5</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = ref({})

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  } else {
    navigateTo('/login')
  }
})
const soumettreRapport = async () => {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch('http://localhost:8000/api/rapports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(rapport.value)
    })

    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.message || 'Erreur lors de l\'envoi.')
    }

    const data = await response.json()
    message.value = '✅ Rapport enregistré avec succès'
    console.log(data)

    rapport.value = { date: '', heure_debut: '', heure_fin: '', contenu: '' }
  } catch (error) {
    console.error(error)
    message.value = `❌ ${error.message}`
  }
}

const handleLogout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  navigateTo('/login')
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
  background-color: #4338ca; /* indigo plus clair */
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
.dashboard-value {
  font-size: 22px;
  font-weight: bold;
}
.dashboard-label {
  font-size: 14px;
  color: #555;
}
</style>