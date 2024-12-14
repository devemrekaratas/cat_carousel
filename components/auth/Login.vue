<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const authStore = useAuthStore()

const state = reactive({
  email: '',
  password: ''
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ name: 'email', message: 'Required' })
  if (!state.password) errors.push({ name: 'password', message: 'Required' })
  return errors
}

const onSubmit = async (event: FormSubmitEvent<any>) => {
  authStore.login(event.data)
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold text-center">Ready to continue?</h2>
    <h3 class="text-gray-500 text-center mb-4">Step back into the purr-fect world of cats!</h3>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput class="w-full" v-model="state.email" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput class="w-full" v-model="state.password" type="password" />
      </UFormField>

      <UButton block type="submit">
        Sign In
      </UButton>

      <USeparator label="or" />

      <UButton @click="authStore.signInWithGoogle" block icon="i-devicon:google" size="md" color="secondary"
        variant="solid">Sign in with Google</UButton>

      <div class="text-center">
        <ULink to="/register" as="button">Sign up here</ULink>
      </div>
    </UForm>
  </div>
</template>