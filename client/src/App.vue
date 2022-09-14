<script setup>
import './scss/app.scss'
import Header from './components/header/Header.vue'
import Random from './components/utilities/Random.vue'
import Toast from './components/utilities/Toast.vue'
import Loader from './components/utilities/Loader.vue'
import useUser from './stores/user';
import { onBeforeMount } from 'vue';
import { getToken } from './composables/env'
const user = useUser()
const checkUser = async () => {
   try {
      await getToken()
      user.refreshUser()
   } catch (e) { }
}
onBeforeMount(checkUser)
</script>

<template>
   <Toast />
   <Loader />

   <Header />
   <main id="page" class="mt-6 container flex a-start g-4">
      <section id="current-page" class="bg-gray-vl br-4">
         <router-view />
      </section>
      <Random />
   </main>
   <!-- 👤📺✖❌🗑📋🖊🖥🎞✉🔑⭐◀▶✖ -->
</template>

<style lang="scss">
@use './scss/abstracts/mixins' as *;

main#page {
   grid-template-columns: repeat(auto-fit, minmax(1fr, auto));

   >section:nth-child(1) {
      width: 100%;
      min-height: 120vh;
   }

   >section:nth-child(2) {
      width: min(500px, 100%);
   }

   @include mq(large) {
      flex-direction: column;
   }

}
</style>
