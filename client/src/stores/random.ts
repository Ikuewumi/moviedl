import { apiGet } from "@/composables/auth"
import { defineStore } from "pinia"
import useToast from "./toast"

type RandomItem = {
   Title: string,
   Type: 'movie' | 'series',
   imdbID: string
}


const wrap = async (fn: () => Promise<any>) => {
   const toastPinia = useRandom()
   try { return (await fn()) }
   catch (e) { toastPinia.toast.show(e as string, true) }
}

const getRandom = async () => {
   const res = await apiGet('public/random')
   const data = res?.data ?? []
   return data
}


const useRandom = defineStore('useRandom', {
   state: () => {
      return {
         data: [] as RandomItem[],
         toast: useToast()
      }
   },

   actions: {
      async getServerData() {
         const data = await getRandom()
         this.data = data ?? []

      }
   }
})

export default useRandom