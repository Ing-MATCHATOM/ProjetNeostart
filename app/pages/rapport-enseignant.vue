<script setup>
import { ref, onMounted } from 'vue'
import Editor from '@tinymce/tinymce-vue'  // ✅ Import TinyMCE

const user = ref({})
const message = ref('')
const rapport = ref({
  date: '',
  heure_debut: '',
  heure_fin: '',
  contenu: ''   // TinyMCE va remplir cette valeur
})

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  } else {
    navigateTo('/login')
  }
})

const handleLogout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  navigateTo('/login')
}

const soumettreRapport = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const payload = { ...rapport.value, id_enseignant: user.value.id_enseignant }

    const response = await fetch('http://localhost:8000/api/rapports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) throw new Error('Erreur lors de l\'envoi.')

    message.value = 'Rapport enregistré avec succès'
    rapport.value = { date: '', heure_debut: '', heure_fin: '', contenu: '' }

  } catch (error) {
    console.error(error)
    message.value = 'Une erreur est survenue.'
  }
}
</script>

<template>
  <div class="min-h-screen flex">
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
    <div class="flex-1 p-8 bg-gray-50">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Nouveau Rapport</h1>
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

      <!-- Formulaire de rapport -->
      <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <form @submit.prevent="soumettreRapport">
          <div class="mb-4">
            <label class="block text-gray-700 mb-1">Date</label>
            <input
              type="date"
              v-model="rapport.date"
              class="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 mb-1">Heure de début</label>
            <input
              type="time"
              v-model="rapport.heure_debut"
              class="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 mb-1">Heure de fin</label>
            <input
              type="time"
              v-model="rapport.heure_fin"
              class="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 mb-1">Contenu du travail effectué</label>
            <!-- ✅ TinyMCE Editor -->
            <Editor
              v-model="rapport.contenu"
              api-key="ka00j44uxmx5xxnyrv23a89u450gvux44ggxsphvf8e2ityr"
              :init="{
                height: 300,
                menubar: false,
                plugins: 'lists link image table code help wordcount',
                toolbar: 'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help'
              }"
            />
          </div>

          <button
            type="submit"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded"
          >
            Valider
          </button>
        </form>

        <!-- Message succès/erreur -->
        <p v-if="message" :class="message.startsWith('✅') ? 'mt-4 text-green-600 font-medium' : 'mt-4 text-red-600 font-medium'">
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
 .nav-link { display: block; padding: 10px 14px; border-radius: 8px; font-weight: 500; transition: all 0.3s ease; } .nav-link:hover { background-color: #4338ca; } </style>