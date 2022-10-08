<script setup lang="ts">
import type { BaseFilm } from '@/composables/types';

type Card = {
   plot: string;
   title: string;
   poster: string;
   year: string;
}

const props = defineProps<{
   data: BaseFilm<string[]>
}>()

const type = $computed(() => {
   return props.data.Type === 'movie' ? 'm' : 's'
})

</script>

<template>
   <div class="card grid br-6 bg-gray-dt a-center j-center relative">
      <span class="type absolute f-emoji f-size-m-big bg-gray-t br-5 z-4 grid a-center j-center pin-2 pbl-2">
         {{ data.Type === 'series' ? '📺' : '🎞' }}
      </span>

      <img :src="data.Poster" class="br-6 z-1">

      <section class="content grid a-center g-1 pin-2 pbl-2 br-6 z-2 pb-4">
         <router-link :to="`${type}/${data.imdbID}`" class="f-round f-size-a-big pbl-1 c-dark weight-bold">
            {{ data.Title }}
            <small class="f-size-normal">{{ data.Year }}</small>
         </router-link>
         <p class="f-size-tiny lh-2">
            {{ data.Plot }}
         </p>
         <div class="mt-1">
            <span>
               <span class="f-emoji">⭐</span>
               {{ data.imdbRating }}
            </span>
         </div>
         <div class="flex flex-wrap g-1 f-size-tiny mt-2">
            <span class="pin-2 pbl-1 f-round br-3 bg-gray-l" v-for="(g, i) in data.Genre" :key="g">{{ g }}</span>
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
   box-shadow: 0 0 2px rgba(0, 0, 0, 0.423);
   width: min(400px, 100%);
   background: rgb(0 0 0 / 0.05);

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
      object-position: top center;
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