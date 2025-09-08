<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- En-tête avec infos utilisateur -->
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Dashboard Parent</h1>
        <p class="text-gray-600" v-if="user.prenom_nom">
          Bienvenue, {{ user.prenom_nom }} {{ user.nom_famille }}
        </p>
        <p class="text-sm text-gray-500">{{ user.courriel }}</p>
      </div>
      <button
        @click="handleLogout"
        class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
      >
        Déconnexion
      </button>
    </div>

    <!-- Menu de navigation -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Menu de navigation</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NuxtLink to="/parent/create-enseignant" class="menu-item">
          <div class="menu-icon bg-purple-100 text-purple-600">
            <i class="fas fa-user-check"></i>
          </div>
          <span>Créer Enseignant</span>
        </NuxtLink>

        <NuxtLink to="/parent/create-eleve" class="menu-item">
          <div class="menu-icon bg-purple-100 text-purple-600">
            <i class="fas fa-user-check"></i>
          </div>
          <span>Créer Eleve</span>
        </NuxtLink>

        <NuxtLink to="/parent/create-temoin" class="menu-item">
          <div class="menu-icon bg-purple-100 text-purple-600">
            <i class="fas fa-user-check"></i>
          </div>
          <span>Créer Témoin</span>
        </NuxtLink>

        <a href="#" class="menu-item">
          <div class="menu-icon bg-blue-100 text-blue-600">
            <i class="fas fa-chart-line"></i>
          </div>
          <span>Rapports & Statistiques</span>
        </a>

        <a href="#" class="menu-item">
          <div class="menu-icon bg-orange-100 text-orange-600">
            <i class="fas fa-calendar-alt"></i>
          </div>
          <span>Emploi du Temps</span>
        </a>

        <a href="#" class="menu-item">
          <div class="menu-icon bg-red-100 text-red-600">
            <i class="fas fa-clipboard-check"></i>
          </div>
          <span>Validation des Séances</span>
        </a>
      </div>
    </div>

    <!-- Statistiques rapides -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Aperçu</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="stat-card">
          <div class="stat-icon bg-indigo-100 text-indigo-600">
            <i class="fas fa-chalkboard-teacher"></i>
          </div>
          <div class="stat-content">
            <p class="stat-value">12</p>
            <p class="stat-label">Enseignants</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon bg-green-100 text-green-600">
            <i class="fas fa-user-graduate"></i>
          </div>
          <div class="stat-content">
            <p class="stat-value">24</p>
            <p class="stat-label">Élèves</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon bg-purple-100 text-purple-600">
            <i class="fas fa-user-check"></i>
          </div>
          <div class="stat-content">
            <p class="stat-value">5</p>
            <p class="stat-label">Témoins</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon bg-blue-100 text-blue-600">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-content">
            <p class="stat-value">8</p>
            <p class="stat-label">Séances cette semaine</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = ref({})

onMounted(() => {
  // Récupérer l'utilisateur depuis localStorage
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
    console.log('Utilisateur connecté:', user.value)
  } else {
    // Rediriger vers login si pas connecté
    navigateTo('/login')
  }
})

const handleLogout = async () => {
  try {
    await $fetch('/api/logout', {
      method: 'POST'
    })
  } catch (err) {
    console.error('Erreur déconnexion:', err)
  } finally {
    // Nettoyer le localStorage
    localStorage.removeItem('user')
    navigateTo('/login')
  }
}
</script>

<style scoped>
.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  background-color: #f9fafb;
  transition: all 0.3s ease;
  color: #374151;
  font-weight: 500;
}

.menu-item:hover {
  background-color: #e5e7eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.menu-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 16px;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 10px;
  background-color: #f9fafb;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 16px;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 2px;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
}
</style>