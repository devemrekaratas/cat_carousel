<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const authStore = useAuthStore()

const state = reactive({
  displayName: '',
  email: '',
  password: ''
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.displayName) errors.push({ name: 'displayName', message: 'Required' })
  if (!state.email) errors.push({ name: 'email', message: 'Required' })
  if (!state.password) errors.push({ name: 'password', message: 'Required' })
  return errors
}

const onSubmit = async (event:FormSubmitEvent<any>) => {
  authStore.register(event.data)
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold text-center">Don’t have an account yet?</h2>
    <h3 class="text-gray-500 text-center mb-4">Create an account to explore the cats world!</h3>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">

      <UFormField label="Name" name="displayName">
        <UInput class="w-full" v-model="state.displayName" />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput class="w-full" v-model="state.email" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput class="w-full" v-model="state.password" type="password" />
      </UFormField>

      <UButton block type="submit">
        Create Account
      </UButton>

      <USeparator label="or" />

      <UButton @click="authStore.signUpWithGoogle" block icon="i-devicon:google" size="md" color="secondary" variant="solid">Sign up with Google</UButton>

      <div class="text-center">
        <ULink to="/" as="button">Sign in here</ULink>
      </div>

    </UForm>
  </div>
</template>