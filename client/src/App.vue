<script setup>
import '@/scss/app.scss'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/Footer.vue'
import Random from '@/components/utilities/Random.vue'
import Toast from '@/components/utilities/Toast.vue'
import Loader from '@/components/utilities/Loader.vue'
import ErrorVue from '@/components/utilities/Error.vue'
import useUser from '@/stores/user';
import useRandom from '@/stores/random';
import { onBeforeMount, onMounted, watchEffect, onErrorCaptured } from 'vue';
import { getToken } from '@/composables/env'
import { useRoute } from 'vue-router'
const user = useUser()
const route = useRoute()
const random = useRandom()
let err = $ref(false)
const checkUser = async () => {
   try {
      await getToken()
      user.refreshUser()
   } catch (e) { }
}

watchEffect(() => {
   if (route.path) {
      random.getServerData()
      err = false
   }
})
onBeforeMount(checkUser)

onErrorCaptured(() => err = true)
</script>

<template>
   <!-- Message -->
   <div id="top-msg" class="message f-round f-size-medium pin-3 pbl-1 bg-blue-l text-center">Can't find your movie?,
      <router-link class="c-dark underline weight-bold" to="/request">
         Request it here
      </router-link>
   </div>
   <Toast />
   <Loader />

   <Header />
   <main id="page" class="mt-6 container flex a-start g-4">
      <section id="current-page relative" class="bg-gray-vl br-4">
         <Suspense>
            <template #default>
               <RouterView v-slot="{ Component, route }">
                  <component :is="Component"></component>
               </RouterView>
            </template>
            <template #fallback>
               <h1 class="f-size-big text-center c-blue" data-loader-text>Loading....</h1>
            </template>
         </Suspense>

      </section>
      <Random />
   </main>
   <Footer />
   <!-- 👤📺✖❌🗑📋🖊🖥🎞✉🔑⭐◀▶✖➕💾 -->
</template>

<style lang="scss">
@use './scss/abstracts/mixins' as *;

[data-loader-text] {
   position: absolute;
   inset: 50% auto auto 50%;
   transform: translate(-50%, -50%);
   width: 100%;
   height: 100%;
   display: grid;
   place-items: center;
   background: var(--clr-white);
   z-index: 5;
}


main#page {
   grid-template-columns: repeat(auto-fit, minmax(1fr, auto));
   position: relative;

   >section:nth-child(1) {
      width: 100%;
      min-height: 70vh;
      background: hsl(0, 0%, 96%);
      background: #fff;
      border: 0.5px solid rgba(85, 85, 85, 0.116);
      padding-bottom: var(--size-8);


      @include mq(small) {
         border: 0;

      }
   }

   >section:nth-child(2) {
      width: min(250px, 100%);
      // background: hsl(0, 0%, 96%);
      position: sticky;
      top: 0
   }

   @include mq(large) {
      flex-direction: column;
   }

}
</style>
