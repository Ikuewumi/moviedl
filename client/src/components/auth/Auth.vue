<script setup lang="ts">
import { vemail, vname, vpassword } from '@/composables/form';
import { setToken } from '@/composables/env';
import useLoad from '@/stores/load';
import useToast from '@/stores/toast';
import useUser from '@/stores/user';
import { ref } from 'vue';
import { apiPost } from '@/composables/auth';

const emit = defineEmits(['close'])

const showLogin = ref(true)
const user = useUser()
const toast = useToast()
const loader = useLoad()

const login = async (evt: HTMLFormElement) => {
   try {
      const a = evt.elements.namedItem('email') as HTMLInputElement
      const b = evt.elements.namedItem('password') as HTMLInputElement

      await vemail(a.value)
      await vpassword(b.value)

      const user_ = {
         email: a.value,
         password: b.value
      }

      loader.start('Logging in...')

      const data = await apiPost('auth/login', user_, false)
      setToken(data?.msg as string)
      await user.refreshUser()
      emit('close')


   } catch (e) {
      toast.show(e as string, true)
   } finally {
      loader.stop()
   }

}

const signup = async (evt: HTMLFormElement) => {
   try {
      const a = evt.elements.namedItem('email') as HTMLInputElement
      const b = evt.elements.namedItem('password') as HTMLInputElement
      const c = evt.elements.namedItem('name') as HTMLInputElement

      await vname(c.value)
      await vemail(a.value)
      await vpassword(b.value)

      const user_ = {
         name: c.value,
         email: a.value,
         password: b.value
      }

      loader.start('Creating new User...')

      await apiPost('auth/signup', user_, false)

      const data = await apiPost('auth/login', user_, false)
      setToken(data?.msg as string)
      await user.refreshUser()
      emit('close')

   } catch (e) {
      toast.show(e as string, true)
   } finally {
      loader.stop()
   }

}
</script>

<template>
   <section class="w-full fixed z-7 grid a-center j-center g-2 bg-gray-t" data-overlay @click.self="$emit('close')">
      <div class="grid g-2 w-form" data-content>
         <section class="w-full grid g-2 text-center f-round">
            <span class="pbl-3 pin-2 f-round br-4 cursor bg-gray-l" :class="showLogin ? 'active' : ''"
               @click="showLogin = true">login</span>
            <span class="pbl-3 pin-2 f-round br-4 cursor bg-gray-l" :class="!showLogin ? 'active' : ''"
               @click="showLogin = false">signup</span>
         </section>

         <div class="pin-4 pbl-5 bg-gray-vl br-2 f-size-m-big" v-if="showLogin">
            <h2 class="f-size-bigger weight-bold f-round">Login!</h2>
            <p class="f-size-m-big mt-3">Welcome back! Let's just make sure it's you</p>
            <form data-form @submit.prevent="login($event.target as HTMLFormElement)" class="grid g-3 mt-5">
               <div class="field">
                  <span class="f-emoji">✉</span>
                  <input type="email" name="email" placeholder="e.g. user@gmail.com" class="f-size-m-big" />
               </div>
               <div class="field">
                  <span class="f-emoji">🔑</span>
                  <input type="password" name="password" placeholder="Enter your password" class="f-size-m-big" />
               </div>

               <button type="submit" class="f-round pbl-3 mt-3 f-size-m-big cursor bg-blue c-white br-2">Log In</button>
            </form>
         </div>

         <div class="pin-4 pbl-5 bg-gray-vl br-2 f-size-m-big" v-else>
            <h2 class="f-size-bigger weight-bold f-round">Sign Up</h2>
            <p class="f-size-m-big mt-3">Join us to access more features</p>
            <form data-form @submit.prevent="signup($event.target as HTMLFormElement)" class="grid g-3 mt-5">
               <div class="field">
                  <span class="f-emoji">✉</span>
                  <input type="email" name="email" placeholder="e.g. user@gmail.com" class="f-size-m-big" />
               </div>
               <div class="field">
                  <span class="f-emoji">👤</span>
                  <input type="text" name="name" placeholder="e.g. Tim Urban" class="f-size-m-big" />
               </div>
               <div class="field">
                  <span class="f-emoji">🔑</span>
                  <input type="password" name="password" placeholder="Enter your password" class="f-size-m-big" />
               </div>

               <button type="submit" class="f-round pbl-3 mt-3 f-size-m-big cursor bg-blue c-white br-2">Sign
                  Up</button>
            </form>
         </div>
      </div>

   </section>
</template>

<style lang="scss">
[data-overlay] {
   inset: 0 auto auto 0;
   height: 100vh;
   overflow-x: hidden;
   overflow-y: auto;

   [data-close] {
      inset: 1rem 1rem auto auto;
   }

   [data-content] {
      box-shadow: 0 0 10px -7px rgb(0 0 0 / 0.2);
      max-width: 450px;
   }

   [data-content]>section {
      grid-template-columns: repeat(auto-fit, minmax(100px, auto));

      span.active {
         background: var(--clr-blue);
         color: var(--clr-white);
      }
   }
}

[data-form] {
   .field {
      display: grid;
      grid-template-columns: 50px calc(100% - 50px);
      grid-template-areas: "emoji input";
      background: var(--clr-white);
      padding-block: var(--size-1);
      border-radius: 0.4vmax;
      max-width: 100%;

      span.f-emoji {
         grid-area: emoji;
         align-self: flex-start;
      }

      input,
      select,
      textarea {
         padding-inline: var(--size-1);
         padding-block: var(--size-1);
         border: none;
         outline: none;
         background-color: transparent;
         grid-area: input;
         min-width: 0;
      }

      textarea {
         width: 100%;
         resize: vertical;
         min-height: 200px;
         padding-top: var(--size-2);
      }

      *:nth-child(1) {
         display: grid;
         place-content: center;
      }
   }

   button {
      outline: none;
      border: none;
   }

}
</style>