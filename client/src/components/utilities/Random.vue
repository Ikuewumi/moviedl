<template>
   <section id="random" class="bg-gray-l br-4  grid g-3 ">
      <h2 class="f-round f-size-a-big text-center bg-blue c-white weight-normal br-4 pbl-3 pin-2">Random Posts</h2>
      <div class="grid g-2 pin-3 pb-5">
         <router-link class="pin-2 pbl-1 weight-normal f-size-normal" :to="random.link"
            v-for="(random, i) in computedRandom">
            {{ random.Title }}
         </router-link>
      </div>
   </section>
</template>

<script setup lang="ts">
import useRandom from '@/stores/random';

type RandomItem = {
   Title: string,
   Type: 'movie' | 'series',
   imdbID: string
}

const random = useRandom()

random.getServerData()

const computedRandom = $computed(() => {
   return random.data.slice(0, 5).map((d) => {
      return {
         ...d,
         link: extractLink(d)
      }
   })
})

const extractLink = (object: RandomItem) => {
   const link = object.Type === 'series' ? 's' : 'm'

   return `/${link}/${object.imdbID}`
}
</script>

<style lang="scss">
section#random {
   min-height: 100px;
   position: sticky;
   top: 0;

   &>div {
      grid-template-columns: repeat(auto-fit, minmax(150px, auto));
      grid-auto-flow: dense;
   }

   a {
      border: 1px solid var(--clr-blue);
      border-radius: 1.2vmax;
      border-left-width: 1px;
      border-radius: 0.5vmax;
      color: #444;
      width: fit-content;

      transition: border 0.3s ease;

      &:hover,
      &:focus-within {
         border-left-width: 5px;
         background: rgb(255 255 255 / 0.5);
      }

      &:focus {
         outline: none;
      }
   }
}
</style>