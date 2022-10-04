<script setup>
import '@/scss/app.scss'
import Header from '@/components/header/Header.vue'
import Random from '@/components/utilities/Random.vue'
import Toast from '@/components/utilities/Toast.vue'
import Loader from '@/components/utilities/Loader.vue'
import useUser from '@/stores/user';
import useRandom from '@/stores/random';
import { onBeforeMount, onMounted, watchEffect } from 'vue';
import { getToken } from '@/composables/env'
import { useRoute } from 'vue-router'
const user = useUser()
const route = useRoute()
const random = useRandom()
const checkUser = async () => {
   try {
      await getToken()
      user.refreshUser()
   } catch (e) { }
}

watchEffect(() => {
   if (route.path) {
      random.getServerData()
   }
})
onBeforeMount(checkUser)
</script>

<template>
   <Toast />
   <Loader />

   <Header />
   <main id="page" class="mt-6 container flex a-start g-4">
      <section id="current-page" class="bg-gray-vl br-4">
         <Suspense>
            <template #default>
               <RouterView v-slot="{ Component, route }">
                  <component :is="Component"></component>
               </RouterView>
            </template>
            <template #fallback>
               <h1>Loading....</h1>
            </template>
         </Suspense>

      </section>
      <Random />
   </main>
   <!-- 👤📺✖❌🗑📋🖊🖥🎞✉🔑⭐◀▶✖➕💾 -->
</template>

<style lang="scss">
@use './scss/abstracts/mixins' as *;

main#page {
   grid-template-columns: repeat(auto-fit, minmax(1fr, auto));
   position: relative;

   >section:nth-child(1) {
      width: 100%;
      min-height: 40vh;
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
