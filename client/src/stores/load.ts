import { defineStore } from "pinia";

const useLoad = defineStore('useLoad', {
   state: () => {
      return {
         data: false,
         msg: ''
      }
   },

   actions: {
      start(a = '') {
         this.msg = a.trim()
         this.data = true
      },
      stop() { this.data = false }
   }
})

export default useLoad