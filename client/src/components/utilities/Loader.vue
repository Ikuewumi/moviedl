<script setup lang="ts">
import { gFactory } from '@/composables/gsap';
import useLoad from '@/stores/load';
import gsap from 'gsap';
const loader = useLoad();

const animObject = {
   off: {
      duration: 1,
      y: '60px',
      opacity: 0,
      ease: 'sine'
   } as gsap.TweenVars,
   on: {
      duration: 1,
      y: '0px',
      opacity: 1,
      ease: 'bounce'
   } as gsap.TweenVars
}

const [enter, leave] = gFactory(animObject.off, animObject.on) 
</script>

<template>
   <transition @enter="enter" @leave="leave">
      <div data-loader class="z-9 flex a-center pin-3" v-if="loader.data">
         <div class="w-body min-auto flex a-center g-2 c-gray-d f-size-normal">
            <svg class="w-logo load f-gray-l" viewBox="0 0 24 24">
               <use href="#logo"></use>
            </svg>

            {{ loader.msg > '' ? loader.msg : 'Loading...' }}
         </div>
      </div>
   </transition>
</template>

<style lang="scss">
[data-loader] {
   --bg: rgba(255, 252, 252, 0.99);
   position: fixed;
   inset: auto auto 0 0;
   background-color: var(--bg);
   box-shadow: 0 0 10px -7px rgb(0 0 0 / 0.8);
   width: 100%;

   >div {
      height: 100px;
   }

   .load {
      max-width: 40px;
      max-height: 40px;
      background:
         linear-gradient(#bbb 20%,
            transparent 20%,
            transparent 50%,
            #bbb 50%);
      background: transparent;
      // border-radius: 50%;
      overflow: hidden;
      // width: ;
      transform: rotate(0) translateY(0);
      animation: move 0.9s ease infinite alternate;

      @keyframes move {
         to {
            transform: translateY(-5px) rotate(360deg);
         }
      }
   }
}
</style>