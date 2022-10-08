<template>
   <div>
      <Featured />
      <ul class="pin-6 pbl-7 mt-5 grid g-5 pb-6" data-card-list>
         <Card v-for="(d, i) in data" :data="d" :key="i" />
      </ul>
   </div>

</template>

<script setup lang="ts">
import Featured from '../../components/card/Featured.vue';
import Card from '../../components/card/Card.vue';
import { ref } from '@vue/reactivity';
import { inject, onErrorCaptured } from 'vue';
import type { BaseFilm } from '@/composables/types';
import { apiGet } from '@/composables/auth';

const state = $ref({
   title: inject('title') as Function,
   page: 1,
   count: 0,
   increment: 20
})
const wrapFn = inject('wrapFn')

const computedDone = $computed(() => {
   return (state.page * state.increment) >= state.count
})

state.title('Home Page')

let data = $ref([] as BaseFilm<string[]>[])
const x = wrapFn('Loading Home Page', async () => await apiGet(`pages/home?page=${state.page}`))
if (x) {

   state.count = x.count
   state.page = x.page
   data = x.data as BaseFilm<string[]>[]
}

onErrorCaptured((e) => { console.error(e) })

</script>

<style lang="scss">
ul[data-card-list] {
   justify-content: center;
   align-items: flex-start;
   // place-items: center;
   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
   grid-auto-flow: dense;
}
</style>