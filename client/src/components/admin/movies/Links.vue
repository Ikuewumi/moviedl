<template>
   <div class="grid g-3" data-component-links>
      <h3 class="f-round f-size-big">Links</h3>
      <button @click="emits.addLink" class="pin-2 pbl-2 f-round br-3 bg-bt c-white f-size-small btn">
         <span class="f-emoji">➕</span>
      </button>
      <TransitionGroup name="link" tag="ul" class="grid g-4" appear>
         <Link @custom-focus="actions.focus" @custom-change="emits.changeLink" @custom-delete="emits.deleteLink"
            v-for="(data_, i) in props.linksArray" :_open="state.focus === i" :i="i" :data="data_" :key="i" />
      </TransitionGroup>

      <!-- {{ props.linksArray }} -->

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

<script setup lang="ts">
import Link from './Link.vue';
import type { B, Codec, GenericLinks } from '@/composables/series';
import type { HybridOptions, Movie } from '@/composables/types';


const emit = defineEmits<{
   (event: 'custom-change', obj: GenericLinks, options: HybridOptions): void,
   (event: 'add-link', options: HybridOptions): void,
   (event: 'custom-delete', options: HybridOptions): void,
   (event: 'custom-focus'): void,
   (event: 'custom-save', options: HybridOptions): void
}>()

const props = defineProps<{
   data: Movie<string>,
   linksArray: Array<B>
}>()

const options: HybridOptions = {
   type: 'movie'
}

const state = $ref({
   booleans: {
      preview: false,
      alert: false
   },
   focus: -1
})

function focus(index: number) { state.focus = index ?? -1 }
const actions = {
   focus,
   alert() { state.booleans.alert = true },
   stopAlert() { state.booleans.alert = false },
   preview() { state.booleans.preview = true },
   stopPreview() { state.booleans.preview = false },
}


// EMITS
function addLink() {
   emit('add-link', options)
}
function changeLink(index: number, object: B) {
   emit(
      'custom-change',
      object, { ...options, index }
   )
}
function deleteLink(index: number) {
   emit(
      'custom-delete',
      { ...options, index }
   )
}
function save() {
   emit(
      'custom-save',
      options
   )
}

const emits = {
   addLink,
   changeLink,
   deleteLink,
   save
}



</script>

<style lang="scss">
</style>