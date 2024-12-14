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
    <div class="dashboard">
        <DashboardHeader />
        <div class="relative mt-10 sm:w-[75%] sm:h-[70vh] h-[60vh] w-full sm:px-0 px-2 mx-auto">
            <div class="flex justify-center items-center absolute z-10 w-full h-full bg-gray-200 dark:bg-black">
                <UIcon name="i-line-md:loading-loop" size="xl" color="white" />
            </div>
            <Transition :name="catStore.state.selectedAnimation">
                <div v-if="!imageLoaded" class="relative z-20 w-full h-full">
                    <img v-if="state.url !== ''" :src="state.url" alt="cat" @load="onImageLoad" class="w-full h-full object-cover">
                </div>
            </Transition>
        </div>
        <UButton class="flex mx-auto mt-4" @click="fetchCat" icon="i-fluent-emoji-flat:black-cat" size="md"
            color="secondary" variant="solid">Ready for more furry fun?
        </UButton>
        <div>{{ imageLoaded }}</div>
    </div>
</template>