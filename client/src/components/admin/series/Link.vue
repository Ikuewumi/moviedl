<script lang="ts" setup>
import FormTextarea from '@/components/utilities/FormTextarea.vue'
import { gFactory } from '@/composables/gsap';
import type { Episode, Season, SeasonLinks, Codec, Id } from '@/composables/series';
import { computed, ref } from '@vue/reactivity';

const animState = {
   off: {
      height: 0,
      duration: 0.3,
      ease: 'cosine'
   } as gsap.TweenVars,

   on: {
      height: 'auto',
      duration: 0.3,
      ease: 'sine'
   } as gsap.TweenVars,

}

const [enter, leave] = gFactory(animState.off, animState.on)

const props = defineProps<{
   data: SeasonLinks,
   i: number,
   totalEpisodes: number,
   _open: boolean

}>()

const emit = defineEmits(['custom-change', 'custom-focus', 'custom-delete'])
function checkForIdChange(value: Id): any {

}

function generateEpisodesArray(n: number): Array<number> {
   const array = []
   for (let i = 1; i <= n; i++) {
      array.push(i)
   }
   return array
}

const strToArr = (string: string): string[] => string.trim() === '' ? [] : string.split('\n').map(key => key.trim())
const arrToStr = (array: string[]): string => array.join('\n')

const text = computed({
   get: () => {
      return arrToStr(props.data.links)
   },

   set: (value: string) => {
      emit('custom-change', props?.i, {
         ...getData(props.data.id === 'episode'),
         links: strToArr(value)
      })
   }
})

// GET ID
const id = computed({
   get: () => {
      return props.data.id ?? 'episode'
   },

   set: (value: Id) => {
      emit('custom-change', props.i, {
         ...getData(value === 'episode'),
         id: value
      })
   }
})

// COMPUTED CODEC
const type = computed({
   get: () => {
      return props.data.type ?? '480p'
   },

   set: (value: Codec) => {
      emit('custom-change', props.i, {
         ...getData(props.data.id === 'episode'),
         type: value
      })
   }
})

// computed data
function getData(remove = true) {
   const obj: {
      id: Id;
      number?: number;
      type: Codec;
      links: string[];
   } = {
      ...props.data
   }

   if (remove) {

      obj.number = obj.number ?? 1
   } else {

      delete obj.number
   }

   return obj
}

const isEpisode = computed(() => Boolean(props.data.id === 'episode'))
const currentEpisode = computed({
   get: () => {
      if (props.data.id === 'episode') {
         return props.data.number
      }
      return 0
   },
   set: (value: number | string) => {
      if (props.data.id !== 'episode') return false

      const num = Number(value)
      if (!num) return false

      emit('custom-change', props.i, {
         ...getData(),
         number: num
      })

   }
})
const episodesArray = computed(() => (props.data.id === 'episode') ? generateEpisodesArray(props.totalEpisodes) : [])

const computedProps = $ref({
   text, type, id,
   episodesArray, isEpisode, currentEpisode
})

const state = $ref({
   text: '',
   validTypes: ['480p', '540p', '720p', '1080p', '2160p', '4K', 'other'] as Array<Codec>
})


const emitDelete = () => emit('custom-delete', props.i)
const emitFocus = (e: Element) => {
   if (e.classList.contains('close')) return
   emit('custom-focus', props.i)
}
</script>

<template>
   <div class="grid a-center br-6" tabindex="0" @click="emitFocus($event.target)" data-component-link data-padded>
      <div class="flex a-center flex-wrap g-2 pbl-3">
         <div data-select>
            <select name="id" v-model="computedProps.id" class="bg-white">
               <option value="episode">episode</option>
               <option value="batch">batch</option>
               <option value="special">special</option>
            </select>
         </div>

         <div data-select v-if="computedProps.isEpisode">
            <select name="number" class="bg-white" v-model="computedProps.currentEpisode">
               <option v-for="x in computedProps.episodesArray" :key="x" :value="x">{{ x }}</option>
            </select>
         </div>

         <div data-select>
            <select name="type" class="bg-white" v-model="computedProps.type">
               <option v-for="x in state.validTypes" :key="x" :value="x">{{ x }}</option>
            </select>
         </div>
      </div>
      <Transition @enter="enter" @leave="leave">
         <FormTextarea class="mb-4" v-model="computedProps.text" p="e.g. Different links on different lines"
            v-show="_open" />
      </Transition>
      <span tabindex="0" @click="emitDelete" class="close cursor f-emoji br-6 grid a-center j-center">🗑</span>
   </div>
</template>

<style lang="scss">
@use '@/scss/abstracts/mixins' as *;

[data-c-select-link] {
   padding-block: var(--size-5);
   padding-inline: var(--size-5);

   @include mq(small) {
      padding-inline: var(--size-2);
      padding-block: var(--size-2);
   }
}

[data-component-link] {
   width: 100%;
   background: rgb(0 0 0 / 0.04);
   position: relative;
   overflow: hidden;
   box-shadow: 0 2px rgb(0 0 0 / 0.2);

   // [data-component-input] [data-input] {
   //    border-top-left-radius: 0;
   //    border-top-right-radius: 0;
   //    padding-inline: var(--size-5);

   //    @include mq(small) {
   //       padding-inline: var(--size-2);
   //    }
   // }


   // @include mq(small) {
   //    padding-block: var(--size-3)
   // }

   .close {
      position: absolute;
      inset: 0 0 auto auto;
      padding-inline: var(--size-2);
      aspect-ratio: 1 / 1;
      background: rgb(0 0 0 / 0.1);
      border-top-left-radius: 0;
      transition: 0.2s ease;

      &:hover {
         background: var(--clr-pink-l);
      }

      &:focus {
         outline-color: var(--clr-pink-l);
         outline-width: 0;
      }
   }
}
</style>