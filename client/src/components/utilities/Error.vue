<script setup lang="ts">
import errorimg from '@/assets/youre_lost.svg'
defineProps({
   msg: {
      type: String,
      default: 'Something went Wrong!',
   },
   link: {
      type: String,
      default: '/',
   }
})
</script>
<template>
   <div class="flex a-center j-center" data-error>
      <div class="container-err grid g-2 a-center j-center">

         <img :src="errorimg" alt="">
         <p class="c-gray-d text-center weight-medium">{{ msg }}</p>
         <RouterLink :to="link" class="f-round pin-6 pbl-2 mt-4 br-6">
            <slot>Go Home</slot>
         </RouterLink>
      </div>
   </div>
</template>


<style lang="scss">
[data-error] {
   min-height: 70vh;

   .container-err {
      max-width: 70vw;
   }

   img {
      width: min(200px, 60vw);
   }

   .f-emoji {
      font-size: clamp(10rem, 15rem + 20vmax, 150px);
      opacity: 0.3;
   }

   p {
      font-size: clamp(1rem, 1rem + 1vmax, 1.2rem);
   }

   a {
      font-size: clamp(1rem, 1rem + 2vmax, 1.5rem);
      background: hsl(193, 20%, 85%);
      color: var(--clr-gray-d);
      box-shadow: 0 0 6px -4px rgb(0 0 0 / 0.2);
      transition: 0.2s ease;

      &:hover {
         background: var(--clr-blue);
         color: var(--clr-white);
      }
   }
}
</style>