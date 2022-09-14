<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue';
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router';

const props = defineProps({
   name: {
      type: String,
      default: 'Ikuewumi'
   }
})

console.log(props)

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

const type = ref('movies')

const info = computed(() => type.value === 'series' ? 'Enjoy your tv shows' : 'Hub for all your movies')
const p = computed(() => type.value === 'series' ? 'Enjoy your tv shows' : 'Hub for all your movies')

const data = computed(() => type.value === 'series' ? obj.value.series : obj.value.movies)

const route = useRoute()
console.log(route.query)

const getData = async (a: boolean = true) => {
   try { }
   catch (e) { }
   finally { }
}

const checkType = (route: RouteLocationNormalizedLoaded) => {
   let result = route.query?.t === 'series' ? 'series' : 'movies'
   return result
}

onMounted(() => {
   type.value = checkType(route)
})
</script>

<template>
   <div class="pb-10" data-page-index>
      <section class="hero br-4 grid a-center j-center">
         <span class="f-emoji">{{ type === 'movies' ? '🎞' : '📺' }}</span>
         <!-- 🎞📺 -->

         <select name="type" v-model="type" class="z-2 f-round weight-normal f-size-m-big">
            <option value="movies">movies</option>
            <option value="series">series</option>
         </select>
      </section>
      <h3 class="lh-1 mt-5 min-auto f-size-big f-round text-center mbl-7 pin-2">{{ info }}</h3>

      <!-- {{ data }} -->
      <ul class="grid g-3 pin-5">
         <li v-for="(x, i) in data" :key="i" class="pin-3 pbl-3 br-4 cursor">
            {{ x }}
         </li>
      </ul>
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
      background: rgb(0 0 0 / 0.1);
      background-blend-mode: multiply;
      align-items: center;
      justify-content: center;

      &>* {
         grid-area: hero;
      }

      select {
         align-self: center;
         justify-content: center;
      }

      span.f-emoji {
         font-size: 25ch;
         line-height: 0.8;
         object-fit: cover;
         transform: translateY(10%);
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

   li {
      list-style: none;
      background: rgb(0 0 0 / 0.03);
      box-shadow: 0 0 4px -2px rgb(0 0 0 / 0.1);
      transition: background-color 0.3s;

      &:hover {
         background: #fff;
      }
   }

   ul {
      grid-template-columns: repeat(auto-fit, minmax(200px, auto));
   }


}
</style>