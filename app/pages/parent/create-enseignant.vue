<template>
  <div class="min-h-screen flex bg-gradient-to-br from-indigo-50 to-purple-100">
    <!-- Nav -->
    <aside class="w-64 bg-white shadow-md p-6 flex flex-col">
      <h2 class="text-2xl font-bold mb-6 text-indigo-700">Enseignant Dashboard</h2>
      <nav class="flex flex-col gap-3">
        <NuxtLink to="/parent" class="px-3 py-2 rounded hover:bg-indigo-100 transition bg-indigo-100">Accueil</NuxtLink>
        <NuxtLink to="/parent/ajout-enseignant" class="px-3 py-2 rounded hover:bg-indigo-100 transition bg-indigo-100">Créer Enseignant</NuxtLink>
      </nav>
    </aside>

    <!-- Contenu -->
    <main class="flex-1 p-6">
      <!-- Liste enseignants -->
      <div v-if="showList" class="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6">
        <h2 class="text-xl font-bold mb-4">Liste des enseignants</h2>
        <table class="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr class="bg-gray-100">
              <th class="border px-4 py-2 text-left">Nom</th>
              <th class="border px-4 py-2 text-left">Prénom</th>
              <th class="border px-4 py-2 text-left">Email</th>
              <th class="border px-4 py-2 text-left">Association</th>
              <th class="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ens in enseignants" :key="getEnsId(ens)" class="hover:bg-gray-50">
              <td class="border px-4 py-2">{{ getEnsNom(ens) }}</td>
              <td class="border px-4 py-2">{{ getEnsPrenom(ens) }}</td>
              <td class="border px-4 py-2">{{ getEnsEmail(ens) }}</td>
              <td class="border px-4 py-2">
                Eleve:
                <ul>
                  <li v-for="asso in ens.associations">{{ asso.eleve.nom_famille }} {{ asso.eleve.prenom }}</li>

                </ul>

                Témoin:
                <ul>
                  <li v-for="asso in ens.associations">{{ asso.temoin ? asso.temoin.nom + ' ' + asso.temoin.prenom : 'Aucun' }}</li>
                </ul>
               
                  
                 
              </td>
              <td class="border px-4 py-2 text-center">
                <button
                  @click="openAssocier(getEnsId(ens))"
                  class="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
                >
                  Associer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Formulaire création enseignant -->
      <div v-else class="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="bg-indigo-600 p-4 text-center">
          <h2 class="text-2xl font-bold text-white">Créer un enseignant</h2>
        </div>
        <div class="p-6">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-gray-700 mb-1">Nom</label>
              <input v-model="form.nom_famille" type="text" placeholder="Nom" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>
            <div>
              <label class="block text-gray-700 mb-1">Prénom</label>
              <input v-model="form.prenom" type="text" placeholder="Prénom" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>
            <div>
              <label class="block text-gray-700 mb-1">Email</label>
              <input v-model="form.courriel" type="email" placeholder="Email" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>
            <div class="flex gap-3">
              <button type="button" @click="showList = true"
                      class="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition">Retour</button>
              <button type="submit" :disabled="loading"
                      class="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                {{ loading ? 'Création...' : 'Valider' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>

    <!-- Modal Association -->
    <div v-if="modal.open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h3 class="mb-4 text-lg font-semibold">Associer à l’enseignant</h3>
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium">Choisir élève *</label>
          <select v-model="modal.eleveId" class="w-full rounded border p-2">
            <option value="" disabled>-- Sélectionner --</option>
            <option v-for="e in listes.eleves" :key="e.eleve.id" :value="e.eleve.id">{{ e.eleve.nom_famille}} {{ e.eleve.prenom}}</option>
          </select>
        </div>

        <div class="mb-6">
          <label class="mb-1 block text-sm font-medium">Choisir témoin (optionnel)</label>
          <select v-model="modal.temoinId" class="w-full rounded border p-2">
            <option value="">-- Aucun --</option>
            <option v-for="t in listes.temoins" :key="t.temoin.id" :value="t.temoin.id">{{ t.temoin.nom }} {{ t.temoin.prenom }}</option>
          </select>
        </div>


        <div class="flex items-center justify-end gap-2">
          <button class="rounded border px-4 py-2" @click="closeModal">Annuler</button>
          <button
            class="rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-60"
            :disabled="!modal.eleveId || modal.loading"
            @click="submitAssociation"
          >
            {{ modal.loading ? 'Association…' : 'Associer' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const base_url = "http://127.0.0.1:8000/api" // Laravel tourne bien en local d’après ta stack
const showList = ref(true)
const enseignants = ref([])
const associations = ref({})
const listes = ref({ eleves: [], temoins: [] })

const modal = ref({
  open: false,
  enseignantId: null,
  eleveId: '',
  temoinId: '',
  loading: false
})

const form = ref({ nom_famille: '', prenom: '', courriel: '' })
const loading = ref(false)

const getToken = () => JSON.parse(localStorage.getItem('token'))

// Helpers: supportent { id, ... } ou { enseignant: { id, ... } }
const getEnsId = (ens) => ens?.enseignant?.id ? ens?.enseignant?.id : null
const getEnsNom = (ens) => ens?.nom_famille ?? ens?.enseignant?.nom_famille
const getEnsPrenom = (ens) => ens?.prenom ?? ens?.enseignant?.prenom
const getEnsEmail = (ens) => ens?.courriel ?? ens?.enseignant?.courriel

// Charger enseignants
const fetchEnseignants = async () => {
  const token = getToken()
  if (!token) return alert('Veuillez vous connecter')
  const res = await fetch(`${base_url}/enseignant/index`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  enseignants.value = await res.json()
}

// Créer enseignant
const handleSubmit = async () => {
  loading.value = true
  const token = getToken()
  if (!token) {
    alert('Veuillez vous connecter')
    loading.value = false
    return
  }
  try {
    const res = await fetch(`${base_url}/enseignant/store`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(form.value)
    })
      alert('Enregistrement effectué')
      form.value = { nom_famille: '', prenom: '', courriel: '' }
      showList.value = true
      await fetchEnseignants()
  } catch (err) {
    console.error(err)
    alert('Erreur création')
  } finally {
    loading.value = false
  }
}

// Ouvrir le modal + charger listes
const openAssocier = async (enseignantId) => {
  modal.value.enseignantId = enseignantId
  modal.value.open = true
  modal.value.eleveId = ''
  modal.value.temoinId = ''

  const token = getToken()
  if (!token) return alert('Veuillez vous connecter')

  try {
    const [elevesRes, temoinsRes] = await Promise.all([
      fetch(`${base_url}/eleve`, { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch(`${base_url}/temoin`, { headers: { 'Authorization': `Bearer ${token}` } })
    ])

    if (!elevesRes.ok || !temoinsRes.ok) throw new Error('Erreur API')
    listes.value.eleves = await elevesRes.json()

    listes.value.temoins = await temoinsRes.json()
  } catch (e) {
    console.error('Erreur openAssocier:', e)
  }
}

const closeModal = () => { modal.value.open = false }

// Soumettre l'association
const submitAssociation = async () => {
  if (!modal.value.eleveId || !modal.value.enseignantId) return
  modal.value.loading = true
  const token = getToken()
  if (!token) {
    alert('Veuillez vous connecter')
    modal.value.loading = false
    return
  }
  try {
    const res = await fetch(`${base_url}/associations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        enseignant_id: modal.value.enseignantId,
        eleve_id: modal.value.eleveId,
        temoin_id: modal.value.temoinId || null
      })
    })

    if (!res.ok) throw new Error('Erreur serveur')
    const data = await res.json()

    if (data.message) {
      alert(data.message)
      associations.value[modal.value.enseignantId] = {
        eleve: data.association?.eleve?.nom || '',
        temoin: data.association?.temoin?.nom || ''
      }
      closeModal()
    } else {
      alert('Erreur lors de l’association')
    }
  } catch (e) {
    console.error(e)
    alert("Erreur lors de l’association")
  } finally {
    modal.value.loading = false
  }
}

onMounted(fetchEnseignants)
</script>

<style scoped>
table th, table td { border: 1px solid #ddd; }
</style>
    alert('Enregistrement effectué')
      form.value = { nom_famille: '', prenom: '', courriel: '' }
      showList.value = true