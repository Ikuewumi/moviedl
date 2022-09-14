import { defineStore } from 'pinia'

const useToast = defineStore('useToast', {
   state: () => {
      return {
         msg: '',
         error: false,
         timeout: 0
      }
   },

   getters: {
      getMsg: (state) => state.msg
   },


   actions: {
      show(message: string, x: boolean = false) {
         clearTimeout(this.timeout)

         this.error = x
         this.msg = message

         this.timeout = setTimeout(
            () => { this.msg = '' }, 2000
         )
      },

      close() {
         clearTimeout()

         this.msg = ''
         this.error = false
      }
   }
})

export default useToast