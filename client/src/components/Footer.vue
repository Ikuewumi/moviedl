<template>
   <footer class="grid a-center j-center">
      <div class="container flex a-center j-between flex-wrap pbl-6 g-3">

         <Logo />
         <nav class="flex a-center j-center g-2 flex-wrap">
            <RouterLink to="/">home</RouterLink>
            <RouterLink to="/index">index</RouterLink>
            <RouterLink to="/you">you</RouterLink>
            <RouterLink to="/request">request</RouterLink>
         </nav>
      </div>
   </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Logo from './utilities/Logo.vue';
</script>

<style lang="scss">
@use '@/scss/abstracts/mixins' as *;

footer {
   background: var(--clr-blue-l, rgba(53, 52, 52, 0.226));
   background: #91D7F230;
   margin-top: var(--size-5);

   nav {
      a {
         padding: var(--size-2) var(--size-6);
         font-size: var(--f-size-medium);
         font-weight: 600;
         color: var(--clr-blue);
         border-radius: 1.2vmax;
         background: rgb(0 0 0 / 0.05);
         transition: 0.1s ease;
         // box-shadow: 0 0px 2px rgba(185, 128, 128, 0.2);
         border: 1px solid rgb(255 255 255 / 0.3);

         &:hover {
            background: rgba(0, 0, 0, 0.137);

         }
      }
   }

   @include mq(small) {
      .container {
         align-items: center;
         justify-content: center;
      }
   }

}
</style>