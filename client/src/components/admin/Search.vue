<script setup lang="ts">
import { apiGet } from '@/composables/auth';
import { vimdbid } from '@/composables/form';
import useToast from '@/stores/toast';

const props = defineProps(['type'])
const emit = defineEmits(['custom-search'])

const x = $ref('')
const toast = useToast()

const p = $computed(() => {
   return `Enter ${props.type === 'movies' ? 'movie' : props.type} imdbId`
})

const search = async (x: string) => {
   try {
      await vimdbid(x)
      emit('custom-search', x.toString())
   }
   catch (e) { toast.show(e as string, true) }
}
</script>
<template>
   <form data-search class="mt-5 flex a-strech w-search min-auto imdb" @submit.prevent="search(x)">
      <input v-model="x" type="search" name="search" :placeholder="p"
         class="w-max pin-3 pbl-2 f-size-normal bw-1 b-gray-d br-6" />
   </form>
</template>


<style lang="scss">
</style>