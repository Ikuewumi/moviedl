<template>
   <div class="logo f-size-big flex a-center j-center w-fit" :class="`f-${theme}`" v-once>
      <svg class="w-logo" viewBox="0 0 24 24">
         <use href="#logo"></use>
      </svg>

      <strong v-if="full" class="f-size-bigger f-round ls-medium" :class="`c-${theme}`">MoviesDl</strong>
   </div>
</template>

<script setup>
defineProps({
   theme: {
      type: String,
      default: 'blue'
   },

   full: {
      type: Boolean,
      default: true
   }
})
</script>

<style lang="scss">
@use '../../scss/abstracts/mixins' as *;


@include mq(small) {
   .logo strong {
      display: none;
   }
}
</style>