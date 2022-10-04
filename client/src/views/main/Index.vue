<script setup lang="ts">
import { apiGet } from '@/composables/auth';
import type { BaseFilm } from '@/composables/types';
import { computed, inject, onMounted, ref, type Ref } from 'vue';
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router';

const props = defineProps({
   name: {
      type: String,
      default: 'Ikuewumi'
   }
})



const obj = ref({
   movies: [
      'Tenet',
      'Thor: Ragnarok',
      'La Llorona',
      'The Tommorrow War',
      'The Karate Kid'
   ],
   series: [
      'Queen of the South',
      'Game Of Thrones',
      'House Of The Dragon',
      'Arrow',
      'The Flash',
      'Westworld'
   ]
})

let type = $ref('movies' as 'movies' | 'series')

const info = computed(() => type === 'series' ? 'Enjoy your tv shows' : 'Hub for all your movies')
const p = computed(() => type === 'series' ? 'Enjoy your tv shows' : 'Hub for all your movies')


const state = $ref({
   page: {
      movies: 1,
      series: 1
   },

   data: {
      movies: [] as BaseFilm<string[]>[],
      series: [] as BaseFilm<string[]>[],
   },

   increment: 200,
   count: 0
})

let computedObject = $computed({
   get() {
      return type === 'movies' ? state.data.movies : state.data.series
   },
   set(val) {
      if (type === 'movies') { state.data.movies = val }
      else if (type === 'series') { state.data.series = val }
   }
})

let computedData = $computed({
   get() {
      return type === 'movies' ? state.data.movies : state.data.series
   },
   set(val) {
      if (type === 'movies') { state.data.movies = val }
      else if (type === 'series') { state.data.series = val }
   }
})
let computedPages = $computed({
   get() {
      return type === 'movies' ? state.page.movies : state.page.series
   },
   set(val) {
      if (type === 'movies') { state.page.movies = val }
      else if (type === 'series') { state.page.series = val }
   }
})

let data = []
const title = inject('title') as Function
const wrapFn = inject('wrapFn') as Function

const route = useRoute()


const getData = async () => {
   try {
      title('Index Page')
      const d = await apiGet(`pages/index/${type}?page=${computedPages}`)
      let a = d.data.filter((i: any) => !(computedData.find(e => e.imdbID === i.imdbID)))
      computedData = [...computedData, ...a]
      computedPages = d.page
      state.count = d.count

      
   }
   catch (e) { }
   finally { }
}

await getData()

const checkType = (route: RouteLocationNormalizedLoaded) => {
   let result = route.query?.t === 'series' ? 'series' : 'movies'
   return result
}

const typeFunction = (x: string = '') => {
   return x === 'movie' ? 'm' : 's'
}

const change = () => {
   return getData()
}

const computedDone = $computed(() => {
   return (computedPages * state.increment) >= state.count
})

const changePageNumber = () => {
   computedPages += 1
   return change()
}

onMounted(() => { type = checkType(route) as 'movies' | 'series' })
</script>

<template>
   <div class="pb-10 grid g-2" data-page-index>
      <section class="hero br-4 grid a-center j-center">
         <span class="f-emoji">{{ type === 'movies' ? '🎞' : '📺' }}</span>
         <!-- 🎞📺 -->

         <div data-select>
            <select name="type" v-model="type" @change="change" class="z-2 f-round weight-normal f-size-m-big">
               <option value="movies">movies</option>
               <option value="series">series</option>
            </select>
         </div>
      </section>
      <h3 class="lh-1 mt-5 min-auto f-size-big f-round text-center mbl-7 pin-2">{{ info }}</h3>

      <ul class="grid g-3 pin-5" v-if="computedData?.length">
         <router-link :to="`${typeFunction(x.Type)}/${x.imdbID}`" v-for="(x, i) in computedData" :key="i"
            class="pin-3 c-dark pbl-3 br-4 cursor f-size-medium">
            {{ x.Title }}
         </router-link>
      </ul>

      <span role="button" v-if="!computedDone"
         class="w-fit min-auto cursor mt-7 pin-4 pbl-2 f-size-medium c-white bg-blue br-4" @click="changePageNumber">See
         More</span>
   </div>
</template>

<style lang="scss">
[data-page-index] {


   .hero {
      grid-template-areas: "hero";
      min-height: 300px;
      height: min(50vh, 100%);
      max-height: 400px;
      overflow: hidden;
      width: 100%;
      background: rgba(0, 0, 0, 0.034);
      background-blend-mode: multiply;
      align-items: center;
      justify-content: center;

      &>* {
         grid-area: hero;
      }

      select {
         align-self: center;
         justify-content: center;
         font-size: 1.1rem;
      }

      span.f-emoji {
         font-size: 25ch;
         line-height: 0.9;
         object-fit: cover;
         display: grid;
         place-items: center;
         transform: translateY(-5%);
         width: 100%;
         height: 100%;
         z-index: 0;
         opacity: 0.2;
         pointer-events: none;

         &::selection {
            background: transparent;
         }
      }
   }

   ul a {
      list-style: none;
      background: rgb(0 0 0 / 0.03);
      box-shadow: 0 0 4px -2px rgb(0 0 0 / 0.1);
      transition: background-color 0.3s;
      // max-width: 200px;

      &:hover {
         background: rgb(204, 237, 237);
      }
   }

   ul {
      grid-template-columns: repeat(auto-fit, minmax(200px, auto));
      // place-items: center;
   }


}
</style>