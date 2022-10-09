<script setup lang="ts">
import { validateId } from '@/composables/abstract';
import { apiGet } from '@/composables/auth';
import { ref, inject, computed, watchEffect, watch, onErrorCaptured } from 'vue';
import { regexObject } from '@/composables/env';
import Link from '@/components/public/Link.vue';
import Metadata from '@/components/public/Metadata.vue';
import Comments from '@/components/public/Comments.vue'
import type { iPinia, iTitle, Movie } from '@/composables/types';
import { useRoute, useRouter } from 'vue-router';
import useUser from '@/stores/user';

const props = defineProps(['id'])
const route = useRoute()


const imdbId = $computed(() => {
   if (regexObject.imdbId.test(props.id)) return props.id;
   (state.pinia).toast.show('Invalid imdbID');
   return false
})

let data = $ref({} as Movie<string[]>)
let wrapFn = inject('wrapFn') as Function
const p = (inject('pinia')) as Function

let state = $ref({
   pinia: p() as iPinia,
   title: inject('title') as iTitle,
   type: 'movies',
   isLoaded: computed(() => {
      if (!data) return false
      if (data?._id?.length === 24) {
         state.title(data?.Title)
      }
      return (data?._id?.length === 24)
   }),
   imdbID: computed(() => {
      if (regexObject.imdbId.test(props.id)) return props.id;
      state.pinia.toast.show('Invalid imdbID', true);
      return false
   })
})

state.title('Movie Page')

const updateDetails = async () => {
   data = {} as unknown as Movie<string[]>
   const func = async () => await apiGet(`public/${state.type}/${route.params.id}`)
   data = await wrapFn('Loading Movie details', func) ?? {}
}

watch(route, () => {
   if (route.name === 'movie' && route.params.id !== props.id) {
      updateDetails()
   }
})


const func = async () => await apiGet(`public/${state.type}/${state.imdbID}`)
data = await wrapFn('Loading Movie details', func) ?? {}

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
	const router = useRouter()
        router.push('/404')
})

</script>

<template>
   <div v-if="state.isLoaded" class="relative" data-page-movie>
      <router-link v-if="user.getUser?.admin" :to="`/edit?type=movies&imdbid=${data.imdbID}`"
         class="bar absolute pin-4 pbl-2 f-size-medium c-white bg-blue br-4 flex a-center j-center g-2">
         <span class="f-e f-size-tiny">✏</span>
      </router-link>

      <div class="grid g-4" data-component-metadata>
         <Metadata :data="data" />
      </div>

      <time class="mbl-9" data-padded>Last updated on: {{ formatDate(data?.updatedAt ?? data?.createdAt ?? '')
      }}</time>

      <div class="links g-5 pt-5 pb-5" data-padded data-links>
         <Link v-for="(data_, i) in data.MovieLinks" :key="i" :data="data_" />
      </div>


      <Comments :imdbID="state.imdbID" />

   </div>
</template>

<style lang="scss">
@use '@/scss/abstracts/mixins' as *;

[data-page-movie] {

   time {
      font-style: italic;
      font-size: 1rem;
      color: #ccc;
   }

   [data-links] {
      columns: 300px 2;
      height: max-content;

      @include mq(small) {
         columns: 250px 1;
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