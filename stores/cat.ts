import type { ICatModel } from "~/types"

export const useCatStore = defineStore('catStore', () => {

  const state = reactive({
    loading: false,
    url: '',
    selectedAnimation: ref('fade'),
    animations: [
      'fade',
      'slide-fade',
      'zoom',
      'vertical-slide'
    ]
  })

  const getRandomAnimation = () => {
    const randomIndex = Math.floor(Math.random() * state.animations.length)
    state.selectedAnimation = state.animations[randomIndex]
  }

  const fetchCat = async () => {
    try {
      state.loading = true
      const response = await $fetch<ICatModel[]>('/api')
      if (response?.[0]) {
        const cat = response[0]
        state.url = cat.url
      }
    } catch (error) {
      console.error('Error fetching cat data:', error);
    } finally {
      state.loading = false
    }
  }

  return { state, fetchCat, getRandomAnimation }
})