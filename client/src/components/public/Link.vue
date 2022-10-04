<script setup lang="ts">
import type { B } from '@/composables/series';

const props = defineProps<{
   data: B
}>()



const movieExtensions = [
   'mp4', 'avi', 'mkv'
]

const extractLinkName = (str: string) => {
   let result = ''
   const array = str.split('/')
   const extracted = array[array.length - 1]!
   const format = movieExtensions.find((ext) => extracted.endsWith(`.${ext}`))
   result = format ? extracted : str
   return result
}
</script>


<template>
   <div class="public" data-component-link v-if="data.links?.length">
      <div class="f-size-m-big f-round" data-label>{{ data.type }}</div>
      <div class="grid br-6 z-2">
         <a :href="link" download target="_blank" class="bg-white z-1" data-link v-for="(link, i) in data.links"
            :key="i">{{ extractLinkName(link) }}</a>
      </div>
   </div>
</template>

<style lang="scss">
@use '@/scss/abstracts/mixins' as *;

[data-component-link].public {
   // flex-wrap: wrap;
   // background: rgb(0 0 0 / 0.5);
   width: min(350px, 100%);
   break-inside: avoid;
   background: transparent;
   box-shadow: none;

   &+& {
      margin-block: var(--size-5);
   }

   [data-label] {
      align-self: start;
      background: rgba(227, 237, 243, 0.2);
      border: 0.5px solid rgba(80, 77, 77, 0.281);
      border-bottom: 0;
      display: grid;
      place-items: center;
      line-height: 0.9;
      padding: var(--size-1) var(--size-2);
      border-top-left-radius: 1.2vmin;
      border-top-right-radius: 1.2vmin;
      max-width: fit-content;
      transform: translateX(20%);
      // text-transform: uppercase;
      font-weight: 400;
   }

   a[data-link] {
      // width: fit-content;
      padding: var(--size-2);
      border-radius: 0;
      border: 0.5px solid rgba(80, 77, 77, 0.281);
      resize: vertical;
      font-size: var(--f-size-medium);
      color: var(--clr-blue);
      font-weight: var(--f-weight-thick);
      word-wrap: break-word;
      word-break: break-all;
      line-height: 1.4;


      &:focus {
         outline-offset: -5px;
         outline-width: 0.2px;
      }
   }

   a[data-link]:first-child {
      border-top-left-radius: 1.2vmin;
      border-top-right-radius: 1.2vmin;
   }

   a[data-link] {
      border-bottom: 0;
   }

   a[data-link]:last-child {
      border-bottom-left-radius: 1.2vmin;
      border-bottom-right-radius: 1.2vmin;
      border-bottom: 0.5px solid rgba(80, 77, 77, 0.281);
   }
}
</style>