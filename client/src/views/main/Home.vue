<template>
   <Featured />
   <ul class="pin-6 pbl-7 mt-5 grid g-5 pb-6" data-card-list>
      <Card v-for="(d, i) in arr" :data="d" :key="i" />
   </ul>
</template>

<script setup>
import Featured from '../../components/card/Featured.vue';
import Card from '../../components/card/Card.vue';
import { ref } from '@vue/reactivity';

const arr = ref([
   {
      plot: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex architecto exercitationem odit porro necessitatibus distinctio dolorum quo repellat eveniet fuga!',
      title: 'The Time Traveller\'s wife',
      poster: 'img1.jpg',
      year: '2022'
   },

   {
      plot: 'dolor sit amet consectetur adipisicing elit. Ex architecto exercitationem odit porro necessitatibus distinctio dolorum quo repellat eveniet fuga!',
      title: 'Boruto: Naruto Next Generations',
      poster: 'img2.jpg',
      year: '2012-2016'
   },

   {
      plot: 't amet consectetur adipisicing elit. Ex architecto exercitationem odit porro necessitatibus distinctio dolorum quo repellat eveniet fuga!',
      title: 'Man Of Recaps',
      poster: 'img4.jpg',
      year: '2014'
   },

   {
      plot: 't amet consectetur adipisicing elit. Ex architecto exercitationem odit porro necessitatibus distinctio dolorum quo repellat eveniet fuga!',
      title: 'Good will studios',
      poster: 'img3.jpg',
      year: '2014'
   },

   {
      plot: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex architecto exercitationem odit porro necessitatibus distinctio dolorum quo repellat eveniet fuga!',
      title: 'The Time Traveller\'s wife',
      poster: 'img1.jpg',
      year: '2022'
   },

   {
      plot: 'dolor sit amet consectetur adipisicing elit. Ex architecto exercitationem odit porro necessitatibus distinctio dolorum quo repellat eveniet fuga!',
      title: 'Boruto: Naruto Next Generations',
      poster: 'img2.jpg',
      year: '2012-2016'
   },
])
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