<template>
   <transition @leave="leave" @enter="enter">
      <Teleport to="#modal">
         <div role="alert" data-overlay @click.self="$emit('close')" v-if="show"
            class="w-full fixed z-7 grid j-center g-2 bg-gray-t">
            <div data-c-alert id="my-alert" class="br-4 w-form" data-content>
               <h4 class="pin-4 pbl-5 f-size-medium weight-normal">
                  <slot>Alert Content?</slot>
               </h4>

               <span class="bar f-e f-size-m-big flex">
                  <span @click="$emit('close')" role="button">❌</span>
                  <span @click="$emit('done')" role="button">✅</span>
               </span>
            </div>
         </div>
      </Teleport>
   </transition>
</template>

<script setup lang="ts">
import { gFactory } from '@/composables/gsap';

defineProps({
   show: {
      required: true,
      type: Boolean,
      default: true
   }
})

defineEmits(['close', 'done'])

const animObject = {
   off: {
      duration: 1,
      opacity: 0,
      ease: 'sine'
   } as gsap.TweenVars,
   on: {
      duration: 1,
      opacity: 1,
      ease: 'cosine'
   } as gsap.TweenVars
}

const [enter, leave] = gFactory(animObject.off, animObject.on)
</script>

<style lang="scss">
#my-alert[data-c-alert] {
   --clr: rgba(162, 158, 158, 0.1);
   height: fit-content;
   // width: min(600px, 95vw);
   max-width: 90vw;
   background: #fff;
   transform: translateY(10%);


   .bar {
      width: 100%;
      border-top: 1px solid var(--clr);

      &>span {
         flex-basis: 50%;
         padding: var(--size-3) var(--size-2);
         text-align: center;
         cursor: pointer;
         transition: 0.3s ease;
         background: #fff;

         &:hover {
            background: rgba(204, 204, 205, 0.133);
         }
      }

      &>span:first-child {
         border-right: 0.5px solid var(--clr);
         outline-color: rgb(190, 20, 11);
      }

      &>span:last-child {
         border-left: 0.5px solid var(--clr);
         outline-color: rgb(68, 200, 104);
      }
   }

   /* width: ; */
}
</style>