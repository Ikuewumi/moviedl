<template>
   <div class="pbl-4 grid g-2" data-padded data-page-search>
      <h2 class="f-round f-size-big weight-bold c-gray-l">Search Results - <span class="c-gray-d">"{{ term }}"</span>
      </h2>

      <small class="f-size-medium mt-2">{{ count }} {{ count === 1 ? 'result' : 'results' }} found!</small>

      <ul class="pbl-2 mt-2 grid g-5" data-card-list>
         <Card v-for="(d, i) in data" :data="d" :key="i" />
      </ul>


      <span role="button" v-if="!computedDone"
         class="w-fit min-auto cursor mt-7 pin-4 pbl-2 f-size-medium c-white bg-blue br-4" @click="changePageNumber">See
         More</span>
   </div>
</template>

<script setup lang="ts">
import Card from '@/components/card/Card.vue';
import { apiGet } from '@/composables/auth';
import useToast from '@/stores/toast';
import { inject, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const toast = useToast()
const title = inject('title') as Function
let page = $ref(1)
let count = $ref(0)
let data: Array<any> = $ref([])
const increment = 20

const term = $computed(() => {
   return route.query?.term?.toString().trim() ?? ''
})

const getData = async () => {
   try {
      const x = await apiGet(`pages/search/${term}?page=${page}`)
      let a = x.data.filter((d: any) => !data.find(i => i.imdbID === d.imdbID))
      data = [...data, ...a]
      count = x.count
      page = x.page
      
   }
   catch (e) { toast.show(e as string, true) }
}

const changePageNumber = () => {
   page += 1
   return getData()
}

const computedDone = $computed(() => {
   return (page * increment) >= count
})

watch(route, () => {
   if (route.params.term !== term) {
      data = []
      page = 1
   }
   getData()
   title(`Search Results - ${term}`)
})

await getData()

title(`Search Results - ${term}`)

</script>

<style lang="scss">
[data-page-search] {

   >h2 {
      color: #aaa;
   }

   ul[data-card-list] {
      justify-content: center;
      align-items: flex-start;
      // place-items: center;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      grid-auto-flow: dense;
   }

   >small {
      font-style: italic;
      color: #ccc;

      // padding-top: 10rem;
   }

}
</style>