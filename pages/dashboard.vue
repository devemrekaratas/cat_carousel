<script setup lang="ts">
const catStore = useCatStore()

const state = computed(() => catStore.state)

const imageLoaded = ref(false)

const onImageLoad = () => {
    imageLoaded.value = false
}

const fetchCat = async () => {
    await catStore.fetchCat()
    catStore.getRandomAnimation()
    imageLoaded.value = true
}

onMounted(async () => {
    await catStore.fetchCat()
})
</script>

<template>
    <div class="overflow-hidden">
        <DashboardHeader />
        <div class="relative mt-10 sm:w-[35%] sm:h-[50vh] h-[50vh] w-full mx-auto">
            <div class="flex justify-center items-center absolute z-10 w-full h-full">
            </div>
            <Transition :duration="1000" :name="state.selectedAnimation">
                <div v-if="!imageLoaded" class="relative z-20 w-full h-full">
                    <img v-if="state.url !== ''" :src="state.url" alt="cat" @load="onImageLoad" class="w-full h-full object-cover">
                </div>
            </Transition>
        </div>
        <UButton :loading="imageLoaded" class="flex mx-auto mt-4" @click="fetchCat" loading-icon="i-lucide-repeat-2" icon="i-fluent-emoji-flat:black-cat" size="md"
            color="secondary" variant="solid">Ready for more furry fun?
        </UButton>
    </div>
</template>