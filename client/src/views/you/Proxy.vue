<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { apiGet } from '@/composables/auth';
import Search from '@/components/admin/Search.vue';
import useToast from '@/stores/toast';

let data = $ref({})
const router = useRouter()
const toast = useToast()
const route = useRoute()
const type = $computed(() => {
   let result;

   switch (route.query?.type) {
      case 'series':
      case 's':
         result = 'series'
         break;

      case 'movies':
      case 'm':
      default:
         result = 'movies'
         break;
   }

   return result
})

const search = async (imdb: string) => {
   const x = type === 'movies' ? 'movie' : 'show'
   try {
      // `/create?type=${type}&imdbid=${imdb}`

      const data_ = await apiGet(`public/${type}/${imdb}`, true)

      if (data_) {
         toast.show(`This ${x} already exsts, Editing...`)
         return router.push(`/edit?type=${type}&imdbid=${imdb}`)
      }
   }
   catch (e) {
      toast.show(e as string, true)

      toast.show(`Creating new ${x}...`)
      return router.push(`/create?type=${type}&imdbid=${imdb}`)
   }
}



</script>

<template>
   <div data-page-proxy data-padded>
      <Search :type="type" @custom-search="search" />
   </div>
</template>

<style lang="scss">
[data-page-proxy] {
   [data-search] {
      max-width: 100%;
   }
}
</style>