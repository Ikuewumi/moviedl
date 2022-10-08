import { apiGet, apiPost } from '@/composables/auth'
import { setToken } from '@/composables/env'
import { defineStore } from 'pinia'

type User = {
   _id?: string,
   name?: string,
   email?: string,
   admin?: boolean,
   description?: string,
   img?: string
}

const useUser = defineStore('useUser', {
   state: () => {
      return {
         user: {} as User
      }
   },

   getters: {
      getUser: (state) => state.user
   },

   actions: {
      async refreshUser() {
         this.user = {}
         const data = await apiGet('user', true)
         this.user = data
      },

      async signUp(user: { name: string, email: string, password: string }) {
         await apiPost('auth/signup', user)
         const token = await apiPost('auth/login', {
            email: user.email,
            password: user.password
         })
         setToken(token)
         return this.refreshUser()
      }

   }
})


export default useUser