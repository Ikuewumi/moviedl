<script setup lang="ts">
import { validateId } from '@/composables/abstract';
import { apiGet } from '@/composables/auth';
import { ref, inject, computed, watchEffect, watch, onErrorCaptured } from 'vue';
import { regexObject } from '@/composables/env';
import Link from '@/components/public/Link.vue';
import Metadata from '@/components/public/Metadata.vue';
import type { iPinia, iTitle, Series } from '@/composables/types';
import type { B, Season } from '@/composables/series';
import IndexView from '@/components/public/IndexView.vue';
import SeasonView from '@/components/public/SeasonView.vue';
import Comments from '@/components/public/Comments.vue';
import { useRoute, useRouter } from 'vue-router';
import useUser from '@/stores/user';

const props = defineProps(['id'])
const route = useRoute()

let data = $ref({} as Series<string[]>)
let wrapFn = inject('wrapFn') as Function
let p = inject('pinia') as Function

let state = $ref({
   pinia: p() as iPinia,
   title: inject('title') as iTitle,
   type: 'series',
   indexView: true,
   isLoaded: computed(() => {
      if (!data) return false
      if (data?._id?.length === 24) { state.title(data?.Title) }
      return (data?._id?.length === 24)
   }),
   imdbID: computed(() => {
      if (regexObject.imdbId.test(props.id)) return props.id;
      state.pinia.toast.show('Invalid imdbID', true);
      return false
   })
})

state.title('Series Page')


const func = async () => await apiGet(`public/${state.type}/${state.imdbID}`)
data = await wrapFn('Loading Series details...', func) ?? {}

const updateDetails = async () => {
   console.log('fired')
   data = {} as unknown as Series<string[]>
   const func = async () => await apiGet(`public/${state.type}/${route.params.id}`)
   data = await wrapFn('Loading Movie details', func) ?? {}
}


watch(route, () => {
   if (route.name === 'series' && route.params.id !== props.id) {
      console.log('changed',)
      updateDetails()
   }
})

const formatDate = (x: string) => {
   return (new Date(x)).toLocaleDateString([], {
      month: 'long',
      day: "2-digit",
      year: "numeric"
   })

}

const user = useUser()

onErrorCaptured((e) => {
   console.error(e)
})


</script>

<template>
   <div v-if="state.isLoaded" class="relative" data-page-movie>
      <router-link v-if="user.getUser?.admin" :to="`/edit?type=series&imdbid=${data.imdbID}`"
         class="bar absolute pin-4 pbl-2 f-size-medium c-white bg-blue br-4 flex a-center j-center g-2">
         <span class="f-e f-size-tiny">✏</span>
      </router-link>
      <div class="grid g-4" data-component-metadata>
         <Metadata :data="data" />
      </div>
      <time class="mt-9 mb-9" data-padded>Last updated on: {{ formatDate(data?.updatedAt ?? '') }}</time>

      <section class="widget w-full grid g-2 text-center f-round f-size-medium mt-4" data-padded>
         <span class="pbl-3 pin-2 f-round br-4 cursor bg-gray-l" :class="state.indexView ? 'active' : ''"
            @click="state.indexView = true">index</span>
         <span class="pbl-3 pin-2 f-round br-4 cursor bg-gray-l" :class="!state.indexView ? 'active' : ''"
            @click="state.indexView = false">seasons</span>
      </section>

      <!-- <div class="links g-5 mbl-7" data-component-metadata data-links>
         <Link v-for="(data_, i) in state.indexView" :key="i" :data="data_.links[0]" />
      </div> -->

      <IndexView :data="data.SeriesLinks" data-padded class="pbl-5" v-if="state.indexView" />
      <SeasonView :data="data.SeriesLinks" data-padded v-else />

      <Comments :imdbID="state.imdbID" data-padded />
   </div>
</template>

<style lang="scss">
@use '@/scss/abstracts/mixins' as *;

[data-page-movie] {
   [data-links] {
      columns: 350px 2;
      height: max-content;

      @include mq(small) {
         columns: 250px 1;
      }

   }

   time {
      font-style: italic;
      color: #ccc;
      font-size: 1rem;
   }

   .widget {
      grid-template-columns: repeat(auto-fit, minmax(100px, auto));
      max-width: 300px;
      // margin-inline: auto;

      span.active {
         background: var(--clr-blue);
         color: var(--clr-white);
      }
   }

   .bar {
      inset: 0 0 auto auto;
      // background: #000;
      border-top-left-radius: 0;
      border-bottom-right-radius: 0;
      background: rgb(0 0 0 / 0.2);


      transition: background 0.2s ease;

      &:hover {
         background: #75bdcd;
      }
   }
}
</style>