<template>
   <div data-overlay class="w-full fixed z-7 grid a-center j-center g-2 bg-gray-t" @click.self="$emit('close')"
      v-if="show">
      <section class="z-6 grid" data-preview>
         <div class="heading flex a-center j-between pbl-3 pin-6">
            <h2 class="f-round f-size-big weight-thin">
               <slot name="title">Preview</slot>
            </h2>

            <span class="f-emoji f-size-f-big cursor" @click="$emit('close')">✖</span>
         </div>
         <div class="body mbl-4 pin-6">
            <slot name="body">
               <h1>Some Preview Content</h1>
            </slot>
         </div>
         <div class="pin-6 pbl-3" data-form>
            <button class="f-round pbl-4 f-size-a-big cursor br-2" @click="$emit('done')">
               <slot name="btn">Save</slot>
            </button>
         </div>
      </section>
   </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
   show: {
      type: Boolean,
      default: true
   }
})

defineEmits(['close', 'done'])


</script>

<style lang="scss">
[data-preview] {
   width: min(600px, 80vw);
   // max-width: 90vw;
   background: #fff;


   >div:nth-child(2) {
      // height: min(30vh, 400px);
      max-height: min(500px, 50vh);
      min-height: 30vh;
      overflow-y: auto;
   }

   >div:nth-child(1) {
      box-shadow: 0 1px 2px -1px rgba(0, 0, 0, 0.4);
   }

   >div:nth-child(3) {
      box-shadow: 0 -1px 2px -1px rgba(0, 0, 0, 0.4);
   }

   >div {
      width: 100%;
   }

   button {
      width: 100%;
      transition: 0.2s ease;

      &:hover {
         background: var(--clr-blue);
         color: var(--clr-white)
      }
   }

   .profile-pic {
      width: min(150px, 70vw);
      aspect-ratio: 1/1;
      background-color: rgba(0, 0, 0, 0.2);
      outline: 4px solid var(--clr-white);
      outline-offset: -7px;
      font-size: clamp(2rem, 2rem + 5vw, min(100px, 60vw));

      img {
         object-fit: cover;
         height: 100%;
         border-radius: 1.6vmax;
      }
   }
}
</style>