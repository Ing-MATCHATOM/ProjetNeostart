<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <div class="w-64 bg-blue-800 text-white p-6 flex flex-col">
      <h2 class="text-2xl font-bold mb-8">Tableau de Bord</h2>
      <nav class="space-y-4">
        <NuxtLink to="/parent/create-enseignant" class="nav-link">Créer Enseignant</NuxtLink>
        <NuxtLink to="/parent/create-eleve" class="nav-link">Créer Élève</NuxtLink>
        <NuxtLink to="/parent/create-temoin" class="nav-link">Créer Témoin</NuxtLink>
        <a href="/parent/rapport-parent" class="nav-link">Rapports & Statistiques</a>
        <a href="/parent/emploi-parent" class="nav-link">Emploi du Temps</a>
        <a href="/parent/mesreports" class="nav-link">Reports</a>
        <a href="/parent/stat" class="nav-link">Statistiques</a>
        
      </nav>
    </div>

    <!-- Contenu principal -->
    <div class="flex-1 p-8 bg-gray-50">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Bienvenue</h1>
          <p class="text-gray-600">{{ user.prenom_nom }} {{ user.nom_famille }}</p>
          <p class="text-sm text-gray-500">{{ user.courriel }}</p>
        </div>
        <button
          @click="handleLogout"
          class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Déconnexion
        </button>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="stat-card bg-green-100 text-green-700">
          <i class="fas fa-chalkboard-teacher stat-icon bg-blue-100 text-blue-600"></i>
          <div>
            <p class="stat-value">{{ stats.enseignants }}</p>
            <p class="stat-label">Enseignants</p>
          </div>
        </div>

        <div class="stat-card bg-green-100 text-green-700">
          <i class="fas fa-user-graduate stat-icon bg-blue-100 text-blue-600"></i>
          <div>
            <p class="stat-value">{{ stats.eleves }}</p>
            <p class="stat-label">Élèves</p>
          </div>
        </div>

        <div class="stat-card bg-green-100 text-green-700">
          <i class="fas fa-user-check stat-icon bg-blue-100 text-blue-600"></i>
          <div>
            <p class="stat-value">{{ stats.temoins }}</p>
            <p class="stat-label">Témoins</p>
          </div>
        </div>

        <div class="stat-card bg-green-100 text-green-700">
          <i class="fas fa-clock stat-icon bg-blue-100 text-blue-600"></i>
          <div>
            <p class="stat-value">{{ stats.seances }}</p>
            <p class="stat-label">Séances</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = ref({})
const stats = ref({
  enseignants: 0,
  eleves: 0,
  temoins: 0,
  seances: 0,
})

onMounted(async () => {
  // Récupérer utilisateur
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  } else {
    navigateTo('/')
    return
  }

  // Récupérer token
  const token = JSON.parse(localStorage.getItem('token'))
  try {
    const response = await fetch('http://127.0.0.1:8000/api/parent/stats', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) throw new Error('Erreur API')
    stats.value = await response.json()
  } catch (error) {
    console.error('Erreur récupération stats:', error)
  }
})

const handleLogout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  navigateTo('/')
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
  background-color: #2563eb; /* hover bleu plus clair */
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  gap: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.stat-value {
  font-size: 22px;
  font-weight: bold;
}
.stat-label {
  font-size: 14px;
}
</style>
