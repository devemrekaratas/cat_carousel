export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.getCurrentUserData(); 
  const currentUser = authStore.state.currentUser;

  if (currentUser && (to.path === '/' || to.path === '/register')) {
    return navigateTo('/dashboard');
  }

  if (!currentUser && to.path === '/dashboard') {
    return navigateTo('/');
  }
})
