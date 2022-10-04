<script setup lang="ts">
import { gFactory } from '@/composables/gsap';
import useToast from '@/stores/toast'
import gsap from 'gsap';
const toast = useToast()

const animObject = {
   off: {
      duration: 0.15,
      y: '-60px',
      opacity: 0,
      ease: 'sine'
   } as gsap.TweenVars,
   on: {
      duration: 1,
      y: '0px',
      opacity: 1,
      ease: 'elastic'
   } as gsap.TweenVars
}

const [enter, leave] = gFactory(animObject.off, animObject.on)


</script>

<template>
   <transition @enter="enter" @leave="leave">
      <div class="br-4 w-search flex a-center j-between z-8" :class="toast.error ? 'a' : ''" v-if="toast.getMsg"
         data-toast>
         <span class="c-white f-size-tiny lh-1 ">
            {{ toast.getMsg }}
         </span>
         <span class="f-e f-size-m-big cursor" tabindex="0" @click="toast.close">
            ✖
         </span>
      </div>
   </transition>

</template>



<style lang="scss">
[data-toast] {
   position: fixed;
   inset: 1rem auto auto 50%;
   transform: translateX(-50%);
   background: #222;
   border-top: 5px solid transparent;
   border-color: var(--clr-blue);

   &.a {
      border-color: var(--clr-red)
   }

   >span {
      padding-inline: var(--size-4);
      padding-block: var(--size-4);
   }

   >span:last-child {
      --br: 0.8vmax;
      background: rgb(0 0 0 / 0.5);
      border-top-right-radius: var(--br);
      border-bottom-right-radius: var(--br);
      height: 100%;
      display: block;
      width: fit-content;
   }
}
</style>