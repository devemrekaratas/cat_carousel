<script setup lang="ts">
const user = useCurrentUser()
const authStore = useAuthStore()

const items = ref([
  {
    label: 'Logout',
    icon: 'i-lucide-log-out',
    async onSelect() {
      await authStore.logout()
    }
  }
])
</script>

<template>
  <div class="flex items-center gap-x-2">
    <div class="sm:block hidden"><strong>Welcome</strong>,{{ user?.displayName }}</div>
    <UDropdownMenu :items="items" :content="{
      align: 'end',
      side: 'bottom',
      sideOffset: 8
    }" :ui="{
    content: 'w-48'
  }">
      <UButton icon="i-lucide-user" color="neutral" variant="ghost" />
    </UDropdownMenu>
  </div>
</template>
