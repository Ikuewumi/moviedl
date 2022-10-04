<script setup lang="ts">
import type { B, Id, Season } from '@/composables/series';
import { linkBlueprints } from '@/composables/types';
import { computed, ref } from '@vue/reactivity';
import Link from './Link.vue';


const props = defineProps({
   data: Array<Season>
})

const seasonsBar = computed(() => {
   const seasons = props.data?.filter(s => s.links.length > 0)
   return seasons ?? []
})

const currentSeason = computed(() => {
   return props.data?.find(season => season.season === state.i)
})

const filterEpisodes = computed((s: Season) => {

   let array: EpisodeView[] = []
   const episodes = currentSeason.value?.links.filter(id => id.id === 'episode')

   episodes?.forEach(episode => {
      if (!(episode.id === 'episode')) return

      const ai = array.findIndex(ep => ep.number === episode.number)

      if (ai === -1) {
         array.push({
            id: 'episode',
            number: episode.number,
            links: [{
               type: episode.type,
               links: episode.links
            }]
         })

      } else {
         const li = array[ai].links.findIndex(link => link.type === episode.type)

         if (li === -1) {
            array[ai].links.push({
               type: episode.type,
               links: episode.links
            })
         } else {
            array[ai].links[li].links.push(...checkLinks(array[ai].links[li].links, episode.links))
         }
      }


   })

   array = array.sort((a, b) => a.number - b.number)

   return array


})

const filterBatch = (str: 'special' | 'batch') => {
   let array: View = {
      id: str,
      links: []
   }
   const episodes = currentSeason.value?.links.filter(link => link.id === str)

   

   episodes?.forEach(episode => {
      if (!(['special', 'batch'].includes(episode.id))) return

      const li = array.links.findIndex(link => link.type === episode.type)

      if (li === -1) {
         
         array.links.push({
            type: episode.type,
            links: episode.links
         })
      } else {
         
         array.links[li].links.push(...checkLinks(array.links[li].links, episode.links))
      }
   })
   

   return array
}

function checkLinks(oldLinks: string[], newLinks: string[]) {
   const array = newLinks.filter((link) => {
      return !(oldLinks.includes(link))
   })

   return array
}


const state = $ref({
   i: Number(seasonsBar.value[0]?.season ?? 0),
   id: 'episode' as Id,
   episodeNumber: null as unknown as number,
   episodesArray: []
})

const computedChoice = computed({
   get() {
      return state.id ?? 'episode'
   },
   set(value) {
      state.id = value as Id
   }
})

const computedEpisodeNumber = computed({
   get() {
      if (state.id === 'episode') {
         const first = seasonsBar.value[0].links.find(episode => episode.id === 'episode')
         let result = 0
         if (first?.id === 'episode') { result = first.number }

         return state.episodeNumber ?? result ?? 1
      }
   },

   set(value) {
      state.episodeNumber = Number(value) ?? null
   }
})

const computedData = computed(() => {
   if (state.id === 'episode') {
      return filterEpisodes.value.find(n => n.number === computedEpisodeNumber.value)
   } else {
      const type = state.id === 'batch' ? 'batch' : 'special'
      return (filterBatch(type))
   }
})

function tab(n: number) {
   state.i = n
}

const actions = {
   tab
}

type View = {
   id: Id,
   links: B[]

}

interface EpisodeView extends View {
   id: 'episode',
   number: number
}



const episode = ref(filterEpisodes.value[0].number) ?? 0

</script>

<template>
   <div class="grid g-3 pbl-4" data-c-seasons-view>
      <div class="flex flex-wrap g-2 a-center f-size-a-big f-round">
         <span class="season br-5 pin-3 pbl-1 bg-bt cursor" :class="state.i === x.season ? 'active' : ''"
            @click="tab(x.season)" v-for="x in seasonsBar" :key="x">
            {{ x.season }}
         </span>
      </div>
      <div class="flex a-center flex-wrap g-2 mt-2">
         <div data-select>
            <select name="id" class="bg-white" v-model="computedChoice">
               <option value="episode">episode</option>
               <option value="batch">batch</option>
               <option value="special">special</option>
            </select>
         </div>

         <div data-select v-if="state.id === 'episode'">
            <select name="number" class="bg-white" v-model="computedEpisodeNumber">
               <option v-for="(a, i) in filterEpisodes" :key="i">{{ a.number }}</option>
            </select>
         </div>

      </div>
      <div class="g-3 mt-3" data-links>
         <Link v-for="(link, i) in computedData?.links ?? []" :key="i" :data="link" />
      </div>
   </div>
</template>

<style lang="scss">
@use '@/scss/abstracts/mixins' as *;

[data-c-seasons-view] {
   [data-links] {
      width: fit-content;
      gap: 2rem;
      padding: 0;
   }

   [data-links] {
      columns: 300px 2;
      height: max-content;

      @include mq(small) {
         columns: 250px 1;
      }

   }

   [data-component-link].public+[data-component-link].public {
      margin-block: var(--size-5);
   }
}
</style>