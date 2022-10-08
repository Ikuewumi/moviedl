<script setup lang="ts">
import { apiGet } from '@/composables/auth';
import type { BaseFilm } from '@/composables/types';
import { onErrorCaptured, inject } from 'vue'
const cr = () => Math.floor(Math.random() * 15)

const wrapFn = inject('wrapFn')

let data = $ref([] as BaseFilm<string[]>[])
data = await wrapFn('Loading Data...', async () => await apiGet('public/featured') ?? []) as BaseFilm<string[]>[]

onErrorCaptured(e => console.error(e))

const type = (x: string = '') => {
   return x === 'movie' ? 'm' : 's'
}


</script>

<template>
   <div id="carousel" class="carousel grid relative pb-4" :style="`--n: ${data.length ?? 0}`">

      <div class="card-featured grid a-center j-center br-5 relative" v-for="(movie, i) in data" :key="i">
         <img :src="movie.Poster" class="br-5" />
         <section class="content relative grid g-2 pin-3 pbl-6 br-6 c-white">
            <div class="grid g-2">
               <router-link :to="`${type(movie.Type)}/${movie.imdbID}`" class="f-round f-size-big weight-bold c-white">
                  {{
                        movie.Title
                  }}<small class="pl-1 f-size-normal weight-thin">{{
      movie.Year
}}</small></router-link>
               <p class="lh-1">
                  {{ movie.Plot }}
               </p>
               <span>
                  <span class="f-emoji">⭐</span>
                  {{ movie.imdbRating }}
               </span>
               <div class="flex flex-wrap g-1 f-size-tiny">
                  <span class="pin-2 pbl-1 f-round br-3 bg-gray-dtt c-white" v-for="(g, i) in movie.Genre" :key="i">{{ g
                  }}</span>
               </div>
            </div>


         </section>
      </div>

   </div>

</template>



<style lang="scss">
@use '../../scss/abstracts/mixins' as *;

.carousel {
   grid-auto-flow: column;
   grid-auto-columns: 100%;
   overflow-x: auto;
   scroll-snap-type: x mandatory;
   // overflow-x: hidden;
   overflow-y: hidden;

   @include mq(small) {
      padding-bottom: var(--size-2)
   }

   // overflow-y: ;
   &::-webkit-scrollbar {
      background: hsla(0, 0%, 87%, 0.82);
      border-radius: 3vmax;
      height: 15px;
   }

   &::-webkit-scrollbar-track {
      width: 10px;

   }



   &::-webkit-scrollbar-thumb {
      // width: 10px;
      border-radius: 5vmax;
      background: #19292d59;
      box-shadow: 0 0 1px rgb(0 0 0 / 0.5);

   }
}

.card-featured {
   grid-template-areas: "featured";
   height: 500px;
   padding: var(--size-2);

   p {
      font-size: var(--f-size-medium);
   }

   @include mq(small) {
      padding: var(--size-1)
   }

   width: 100%;
   scroll-snap-align: start;
   scroll-behavior: smooth;

   &:hover::after {
      opacity: 0.6;
   }

   &::after {
      content: '';
      position: absolute;
      inset: 0 auto auto 0;
      width: 100%;
      height: 100%;
      background: var(--clr-gray-dtt);
      transition: 0.4s;
      z-index: 1;
   }

   &>* {
      grid-area: featured;
      z-index: 2;
   }

   img {
      object-fit: cover;
      object-position: top center;
      width: 100%;
      height: 500px;
      z-index: 1;
   }

   section.content {
      max-height: 70%;
      align-self: flex-end;
      justify-self: center;
      // width: 499px;
      clip-path: polygon(0 0, 100% 10%, 100% 100%, 0% 100%);
      background: rgba(0, 0, 0, 0.387);
   }



}
</style>