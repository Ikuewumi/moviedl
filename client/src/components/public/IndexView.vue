<script setup lang="ts">
import type { B, Season } from '@/composables/series';
import { linkBlueprints } from '@/composables/types';
import { computed } from '@vue/reactivity';
import Link from './Link.vue';

const props = defineProps({
   data: Array<Season>
})

type Seasons_ = { season: number, links: B[] }[]

const seasons = computed(() => {
   const processed: Seasons_ = []

   const seasons = props.data?.filter(season => season.links.length > 0)
   

   seasons?.forEach((season_) => {
      const episodes: B[] = []

      

      season_.links.forEach((link, i) => {
         const x = episodes.findIndex(ep => ep.type === link.type)

         

         function checkLinks(oldLinks: string[], newLinks: string[]) {
            const array = newLinks.filter((link) => {
               return !(oldLinks.includes(link))
            })

            return array
         }

         if (x === -1) {
            
            episodes.push({
               type: link.type,
               links: link.links
            })
         }
         else {
            
            episodes[x].links.push(...checkLinks(episodes[x].links, link.links))

         }

      })

      

      processed.push({
         season: season_.season,
         links: episodes
      })





   })



   return processed
})


</script>

<template>
   <div class="g-7 br-6" data-c-index>

      <div v-for="(season, i) in seasons" :key="i" class="grid" data-index>
         <h2 class="f-round f-size-m-big weight-bold case-upper pin-3 pbl-3">Season {{ season.season }}</h2>

         <Link v-for="(data, i) in season.links" :key="i" :data="data" class="pin-3" />

      </div>
   </div>
</template>



<style lang="scss">
@use '@/scss/abstracts/mixins' as *;

[data-page-movie] {


   [data-index] {
      width: min(350px, 100%);
      break-inside: avoid;
      align-self: flex-start;
      box-shadow: 0 1px 2px rgb(0 0 0 / 0.2);
      // box-shadow: 0 2px rgb(0 0 0 / 0.2);
      border-radius: 0.4vmax;
      padding-bottom: var(--size-2);
      // background: rgb(0 0 0 / 0.1);

      @include mq(small) {
         width: min(300px, 100%);
         padding-block: 0;

         // border-radius: 0;
         box-shadow: 0 1px 2px rgb(0 0 0 / 0.3);
         // padding-bottom: 0;


      }



      [data-component-link].public:first-of-type:last-of-type {
         margin-bottom: var(--size-4);


      }




      h2 {
         border-bottom: 0.2px solid rgb(0 0 0 / 0.2);
         background-color: rgba(19, 67, 73, 0.1);
         color: rgb(112, 111, 111);
         // font-family: var(--f-normal);
         font-size: var(--f-size-normal);
         // text-transform: capitalize;
         font-weight: 600;
         border-top-left-radius: 0.4vmax;
         border-top-right-radius: 0.4vmax;
         margin-bottom: var(--size-3);

         @include mq(small) {

            border-top-left-radius: 0;
            border-top-right-radius: 0;

         }

      }

   }

   [data-index]+[data-index] {
      margin-block: var(--size-6);

      @include mq(small) {
         margin-top: var(--size-6);
         margin-bottom: 0;
      }

      [data-component-link].public {
         margin-bottom: 0;

      }

      [data-component-link].public:last-of-type {
         margin-bottom: var(--size-4);
      }
   }


   [data-c-index] {
      columns: 300px 2;
      height: max-content;
      width: fit-content;

      @include mq(small) {
         columns: 100% 1;
         padding-inline: 0;
         margin-inline: auto;

      }

      [data-component-link].public {
         &:first-child {
            margin-top: var(--size-2);
         }
      }
   }
}
</style>