<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { onMounted } from 'vue';
gsap.registerPlugin(ScrollTrigger)

const cr = () => Math.floor(Math.random() * 15)

const logo = $computed(() => {
   return `../src/assets/img${cr()}.jpg`
})

const obj = $ref([
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


onMounted(() => {
   const a = document.querySelector('#carousel')
   console.dir(a)
   let sections = gsap.utils.toArray('#carousel .card-featured')

   //xPercent: -100 * (sections.length - 1),
   gsap.to(sections, {
      ease: 'none',
      scrollTrigger: {
         trigger: '#carousel .card-featured',
         scrub: 1,
         snap: 1 / (sections.length),
         horizontal: true,
         toggleActions: 'restart pause reverse pause',
         start: '0% 0%',
         scroller: '#carousel',
         end: () => document.getElementById('carousel')!.scrollWidth,
         id: 'my-carousel',
      } as ScrollTrigger.Vars,
      duration: 1,
   })

})
</script>

<template>
   <div id="carousel" class="carousel grid">

      <div class="card-featured grid a-center j-center br-5 relative">
         <img :src="`../src/assets/img${cr()}.jpg`" class="br-5" />
         <section class="content relative grid g-2 pin-3 pbl-6 br-6 c-white">
            <div class="grid g-2">
               <h1 class="f-round f-size-big">House of the Dragon<small class="pl-1 f-size-normal weight-thin">2022
                     -</small></h1>
               <p class="lh-1">
                  Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after
                  being
                  dormant for millennia.
               </p>
               <span>
                  <span class="f-emoji">⭐</span>
                  8.7
               </span>
               <div class="flex flex-wrap g-1 f-size-tiny">
                  <span class="pin-2 pbl-1 f-round br-3 bg-gray-dtt c-white">Action</span>
                  <span class="pin-2 pbl-1 f-round br-3 bg-gray-dtt c-white">Adventure</span>
                  <span class="pin-2 pbl-1 f-round br-3 bg-gray-dtt c-white">Myth</span>
               </div>
            </div>


         </section>
      </div>

      <div class="card-featured grid a-center j-center br-5 relative">
         <img :src="`../src/assets/img${cr()}.jpg`" class="br-5" />
         <section class="content relative grid g-2 pin-3 pbl-6 br-6 c-white">
            <div class="grid g-2">
               <h1 class="f-round f-size-big">House of the Dragon<small class="pl-1 f-size-normal weight-thin">2022
                     -</small></h1>
               <p class="lh-1">
                  Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after
                  being
                  dormant for millennia.
               </p>
               <span>
                  <span class="f-emoji">⭐</span>
                  8.7
               </span>
               <div class="flex flex-wrap g-1 f-size-tiny">
                  <span class="pin-2 pbl-1 f-round br-3 bg-gray-dtt c-white">Action</span>
                  <span class="pin-2 pbl-1 f-round br-3 bg-gray-dtt c-white">Adventure</span>
                  <span class="pin-2 pbl-1 f-round br-3 bg-gray-dtt c-white">Myth</span>
               </div>
            </div>


         </section>
      </div>

      <div class="card-featured grid a-center j-center br-5 relative">
         <img :src="`../src/assets/img${cr()}.jpg`" class="br-5" />
         <section class="content relative grid g-2 pin-3 pbl-6 br-6 c-white">
            <div class="grid g-2">
               <h1 class="f-round f-size-big">House of the Dragon<small class="pl-1 f-size-normal weight-thin">2022
                     -</small></h1>
               <p class="lh-1">
                  Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after
                  being
                  dormant for millennia.
               </p>
               <span>
                  <span class="f-emoji">⭐</span>
                  8.7
               </span>
               <div class="flex flex-wrap g-1 f-size-tiny">
                  <span class="pin-2 pbl-1 f-round br-3 bg-gray-dtt c-white">Action</span>
                  <span class="pin-2 pbl-1 f-round br-3 bg-gray-dtt c-white">Adventure</span>
                  <span class="pin-2 pbl-1 f-round br-3 bg-gray-dtt c-white">Myth</span>
               </div>
            </div>

         </section>
      </div>

   </div>

</template>



<style lang="scss">
.carousel {
   grid-auto-flow: column;
   grid-template-columns: repeat(3, 100%);
   overflow-x: auto;
   // overflow-x: hidden;
   overflow-y: hidden;
   // overflow-y: ;
}

.card-featured {
   grid-template-areas: "featured";
   height: 500px;
   width: 100%;

   &:hover::after {
      opacity: 0.6;
   }

   &::after {
      content: '';
      position: absolute;
      inset: 0 auto auto 0;
      width: 100%;
      height: 100%;
      background: var(--clr-gray-dtt);
      transition: 0.4s;
      z-index: 1;
   }

   &>* {
      grid-area: featured;
      z-index: 2;
   }

   img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 500px;
      z-index: 1;
   }

   section.content {
      max-height: 70%;
      align-self: flex-end;
      justify-self: center;
      // width: 499px;
      clip-path: polygon(0 0, 100% 10%, 100% 100%, 0% 100%);
      background: rgba(0, 0, 0, 0.387);
   }



}
</style>