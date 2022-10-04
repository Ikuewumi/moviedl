<template>
   <form data-search class="mt-5 flex a-strech w-search min-auto" @submit.prevent="search">
      <input type="search" v-model="term" name="search" placeholder="Search a movie or series..."
         class="w-max pin-3 pbl-2 f-size-normal bw-1 b-gray-d" />
      <input type="submit" value="🔍" class="pbl-2 pr-3 pl-2 f-size-m-big bg-gray-l cursor ">
   </form>
</template>

<script setup lang="ts">
import useToast from '@/stores/toast';
import { useRouter } from 'vue-router';
const toast = useToast()
const router = useRouter()
let term = $ref('')
const search = () => {
   if (term.trim() === '') { return toast.show('Search Term cannot be empty', true) }
   else { router.push(`/search?term=${term.trim()}`) }
   term = ''
}
</script>

<style lang="scss">
[data-search] {
   --br: 1.2vmax;

   input[type=submit] {
      border: none;
      border-top-right-radius: var(--br);
      border-bottom-right-radius: var(--br);

      &:hover {
         background-color: var(--clr-blue);
      }
   }

   input[type=search] {
      border: 1px solid rgb(0 0 0 / 0.2);
      border-right: 0;
      border-top-left-radius: var(--br);
      border-bottom-left-radius: var(--br);
      width: 100%;
   }

   &.imdb {
      input[type=search] {
         border-right: 1px solid rgb(0 0 0 / 0.2);
         border-radius: var(--br);
      }

      input[type=search]:focus {
         border-right: 1.3px solid var(--clr-blue);
      }
   }

   input[type=search]:focus {
      border-width: 1.3px;
      border: 1.3px solid var(--clr-blue);
      outline: none;
   }
}
</style>