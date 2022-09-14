<script setup lang="ts">
import image from '../../assets/img5.jpg';

type Card = {
   plot: string;
   title: string;
   poster: string;
   year: string;
}

defineProps({
   data: {
      type: Object,
      required: true
   }
})

</script>

<template>
   <div class="card grid br-6 bg-gray-dt a-center j-center relative">
      <span class="type absolute f-emoji f-size-m-big bg-gray-t br-5 z-4 grid a-center j-center pin-2 pbl-2">
         {{ Math.random() * 1 > 0.5 ? '📺' : '🎞' }}
      </span>

      <img :src="`./src/assets/img${Math.floor(Math.random() * 17)}.jpg`" class="br-6 z-1">

      <section class="content grid a-center g-1 pin-2 pbl-2 br-6 z-2 pb-4">
         <h2 class="f-round f-size-a-big pbl-2">
            {{ data.title }}
            <small class="f-size-normal"> 2012-2022</small>
         </h2>
         <p class="f-size-tiny lh-1">
            {{ data.plot }}
         </p>
         <div class="mt-1">
            <span>
               <span class="f-emoji">⭐</span>
               {{ (Math.random() * 10).toFixed(1) }}
            </span>
         </div>
         <div class="flex flex-wrap g-1 f-size-tiny mt-2">
            <span class="pin-2 pbl-1 f-round br-3 bg-gray-l">Action</span>
            <span class="pin-2 pbl-1 f-round br-3 bg-gray-l">Adventure</span>
            <span class="pin-2 pbl-1 f-round br-3 bg-gray-l">Myth</span>
         </div>
      </section>
   </div>
</template>



<style lang="scss">
@use '../../scss/abstracts/mixins' as *;

.card {
   --w: 200px;
   align-items: center;
   justify-content: center;
   grid-template-rows: repeat(auto-fit, minmax(var(--w), auto));
   box-shadow: 0 0 10px -9px rgba(0, 0, 0, 0.423);
   width: min(400px, 100%);

   span.type {
      inset: 0 auto auto 0;
      transform: translate(10%, 10%);
      box-shadow: 0 0 5px rgba(255, 252, 252, 0.423);
      line-height: 0.8;
   }

   small {
      font-weight: 400;
   }

   h2 {
      line-height: 0.9;
   }


   &>img {
      height: var(--w);
      width: 100%;
      object-fit: cover;
      object-position: center;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
   }

   &>.content {
      height: fit-content;
      width: auto;
      align-items: start;
      justify-content: center;
      justify-self: end;
      // align-self: flex-end;
   }
}
</style>