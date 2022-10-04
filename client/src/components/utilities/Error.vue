<script setup lang="ts">
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
   <div class="grid g-4 a-center j-center" data-error>
      <span class="f-emoji">✖</span>
      <p class="c-gray-d text-center weight-medium">{{ msg }}</p>
      <RouterLink :to="link" class="f-round pin-6 pbl-2 mt-4 br-6">
         <slot>Go Home</slot>
      </RouterLink>
   </div>
</template>


<style lang="scss">
[data-error] {
   &>* {
      max-width: 70vw;
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