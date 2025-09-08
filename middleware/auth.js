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