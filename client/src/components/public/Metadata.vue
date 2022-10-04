<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { onMounted } from 'vue';

const props = defineProps<{
   data: {
      Poster: string,
      Title: string,
      Year: string,
      Plot: string,
      imdbRating: number | string,
      Genre: Array<string>,
      Actors: Array<string>,
   }
}>()

gsap.registerPlugin(ScrollTrigger)


const actors = $computed(() => {
   return props.data.Actors.join(', ')
})

const percent = $computed(() => {
   return Number(props.data.imdbRating) * 10
})


onMounted(() => {
   gsap.to(ratingEl.value, {
      duration: 1.5,
      "--i": `${percent}%`,
      ease: 'bounce.out',
      scrollTrigger: ratingEl.value
   })
})

const ratingEl = ref({} as Element)
</script>

<template>

   <div class="grid g-3 comp-metadata">
      <div class="br-6 image">
         <img :src="data.Poster" :alt="data.Title" class="br-6" />
      </div>
      <section class="content grid g-3">
         <h2 class="f-round f-size-big">
            {{ data.Title }}
            <small class="f-size-normal weight-thin">
               {{ data.Year }}
            </small>
         </h2>
         <p class="lh-2 f-size-medium">{{ data.Plot }}</p>
         <span class="f-size-a-big f-round">
            <span ref="ratingEl" class="g" :data-rating="data.imdbRating"></span>
         </span>
         <hr>
         <span class="flex g-2 flex-wrap a-end lh-1 f-size-medium">
            <span class="weight-bold f-size-medium f-round">Actors: </span>
            {{ actors }}
         </span>

         <div class="flex flex-wrap g-1 f-size-tiny mt-1">
            <span class="cursor pin-2 pbl-1 f-round br-3 genre" v-for="(genre, i) in data.Genre" :key="i">
               {{ genre }}
            </span>
         </div>

      </section>
   </div>

</template>

<style lang="scss">
.comp-metadata {
   span.genre {
      background: rgb(0 0 0 / 0.2);
      color: hsla(0, 0%, 20%, 0.7)
   }

   small {
      font-weight: 400;
   }

   span.g {
      --i: 40;
      width: 70px;
      height: 70px;
      aspect-ratio: 1 / 1;
      font-size: var(--f-size-big);
      font-family: var(--f-round);

      position: relative;
      display: grid;
      place-items: center;
      background: #fff;
      border-radius: 1.2vmax;


      &::before,
      &::after {
         content: '';
         position: absolute;

         inset: 50% auto auto 50%;
         transform: translate(-50%, -50%);
         // border-radius: 50%;
         background: var(--clr-white);
         border-radius: 1.2vmax;

      }

      &::before {
         z-index: 3;
         width: 100%;
         height: 100%;
         background: linear-gradient(90deg, rgba(59, 134, 144, 0.825) 0 var(--i), transparent var(--i) 100%);
         box-shadow: 0 0 7px -3px rgb(0 0 0 / 0.4);
         outline: 4px solid rgb(0 0 0 / 0.2);
         outline-offset: -2px;
      }

      &::after {
         content: attr(data-rating);
         display: grid;
         place-items: center;
         z-index: 4;
         background: transparent;
         width: fit-content;
         height: fit-content;
         background: rgb(255 255 255 / 0.7);
         color: rgba(23, 52, 56, 0.825);
         padding: var(--size-2);
      }

   }
}
</style>