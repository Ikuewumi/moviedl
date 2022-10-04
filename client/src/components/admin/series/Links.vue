<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { inject } from 'vue';
import Link from '@/components/admin/series/Link.vue';
import type { Episode, GenericLinks, Season, SeasonLinks } from '@/composables/series';
import type { HybridOptions, Series } from '@/composables/types';

const emit = defineEmits<{
   (event: 'custom-change', obj: GenericLinks, options: HybridOptions): void,
   (event: 'add-link', options: HybridOptions): void,
   (event: 'custom-delete', options: HybridOptions): void,
   (event: 'custom-focus'): void,
   (event: 'custom-save', options: HybridOptions): void
}>()
const props = defineProps<{
   data: Series<string>,
   linksArray: Array<Season>
}>()

type SArray = {
   season: number;
   episodes: {
      number: number,
      episode_links: {
         type: string;
         links: string[];
      }[],
      _open?: boolean
   }[];
}[]

const sarray = $ref([
   {
      season: 1,
      totalEpisodes: 5,
      links: [
         {
            id: 'episode',
            number: 4,
            type: '720p',
            links: ['string', 'http://abcman.com'],
         }
      ]
   } as Season
])

function addEpisode() {
   emit('add-link', {
      type: 'series',
      seasonNumber: computedProps.currentSeason.value?.season!
   })
}

function changeEpisode(index: number, link: SeasonLinks) {
   emit('custom-change', link, {
      index,
      type: 'series',
      seasonNumber: computedProps.currentSeason.value?.season!
   })

}

function removeEpisode(index: number) {
   emit('custom-delete', {
      index,
      type: 'series',
      seasonNumber: computedProps.currentSeason.value?.season!
   })

   if (index === state.focus) {
      actions.focus(-1)
   }
}

function change(i: number, link: SeasonLinks) {
   
   sarray[0].links[i] = link
   console.dir(sarray[0].links[i])
}

function removeLink(index: number) {
   sarray[0].links.filter((link, i) => i !== index)
}

function focus(index: number) {
   state.focus = index
}

// @TODO - Synchronize the different links
const state = $ref({
   i: props.linksArray[0].season,
   booleans: {
      preview: false,
      alert: false
   },
   focus: -1
})

const actions = {
   tab(val: number) { state.i = val },
   addEpisode,
   focus,
   alert() { state.booleans.alert = true },
   stopAlert() { state.booleans.alert = false },
   preview() { state.booleans.preview = true },
   stopPreview() { state.booleans.preview = false },

}
const currentSeason = computed(() => {
   return props.linksArray.find(season => season.season === state.i)
})
const computedProps = {
   currentSeason
}

const options: HybridOptions = {
   type: 'series',
   get seasonNumber() {
      return computedProps.currentSeason.value?.season ?? 0
   }
}

function save() {
   emit(
      'custom-save',
      options
   )
}

const emits = {
   save
}




const currentEpisode = computed(() => {

})


</script>

<template>
   <div class="grid g-3" data-component-links>
      <h3 class="f-round f-size-big">Seasons</h3>
      <div class="flex flex-wrap g-2 a-center f-size-a-big f-round">
         <span class="season br-5 pin-3 pbl-1 bg-bt cursor" @click="actions.tab(x.season)"
            v-for="x in props.data.SeriesLinks" :class="state.i === x.season ? 'active' : ''" :key="x">
            {{ x.season }}
         </span>

      </div>
      <hr>
      <div>
         <button @click="actions.addEpisode" class="pin-2 pbl-1 f-round br-3 bg-bt c-white f-size-medium btn secondary">
            <span class="f-emoji f-size-normal">➕</span>
         </button>
      </div>



      <TransitionGroup name="link" tag="ul" class="grid g-4" appear>


         <Link @custom-focus="actions.focus(index)" @custom-delete="removeEpisode"
            v-for="(x, index) in computedProps.currentSeason.value?.links"
            :totalEpisodes="computedProps.currentSeason.value?.totalEpisodes" :i="index" :key="index"
            :_open="index === state.focus" @custom-change="changeEpisode" :data="x" />

      </TransitionGroup>

      <!-- {{ computedProps.currentSeason }} -->
      <!-- {{ sarray[0].links }} -->







      <button
         class="pin-7 pbl-3 br-3 bg-bt btn c-white flex a-center j-center g-2 f-size-a-big mt-5 text-center min-auto"
         @click="actions.alert">
         <span class="f-emoji f-size-small">💾</span> Save
      </button>

      <my-alert :show="state.booleans.alert" @done="emits.save" @close="actions.stopAlert">
         Save `{{ props.data.Title }}`?
      </my-alert>

   </div>
</template>

<style lang="scss">
button#bottom-right {
   position: fixed;
   inset: auto auto 0 0;
   transform: translateY(-20%);
   outline: none;
   background: rgb(0 0 0 / 0.4);
   border-bottom-left-radius: 0;
   border-top-left-radius: 0;
   transition: 0.2s ease;
   z-index: 6;

   &:hover {
      background: rgb(0 0 0 / 0.5);

   }
}
</style>