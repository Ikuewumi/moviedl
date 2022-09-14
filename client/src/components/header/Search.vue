<template>
   <form id="search" class="mt-5 flex a-strech w-search min-auto" @submit.prevent>
      <input type="search" name="search" placeholder="Search a movie or series..."
         class="w-max pin-3 pbl-2 f-size-normal bw-1 b-gray-d" />
      <input type="submit" value="🔍" class="pbl-2 pin-3 f-size-m-big bg-gray-l cursor">
   </form>
</template>

<script setup>

</script>

<style lang="scss">
#search {
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

   input[type=search]:focus {
      border-width: 1.3px;
      border: 1.3px solid var(--clr-blue);
      border-right: 0;
      outline: none;
   }
}
</style>