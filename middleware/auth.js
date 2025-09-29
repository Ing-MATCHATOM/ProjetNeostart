export default defineNuxtRouteMiddleware((to, from) => {
  // Vérifier simplement si l'utilisateur est stocké dans localStorage
  const user = localStorage.getItem('user')
  const isAuthenticated = !!user
  
  // Routes protégées
  const protectedRoutes = ['/dashboard', '/parent', '/enseignant', '/eleve', '/temoin']
  const isProtected = protectedRoutes.some(route => to.path.startsWith(route))
  
  if (isProtected && !isAuthenticated) {
    return navigateTo('/login')
  }
  
  // Rediriger vers le dashboard si déjà connecté
  if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    return navigateTo('/dashboard')
  }
})
import { createApp } from 'vue'
import App from 'C:/Users/user/OneDrive/Desktop/frontend/app/pages/emploi.vue'  // ou le chemin vers ton composant racine
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(Toast)

app.mount('#app')
