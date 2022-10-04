<template>
   <div class="mbl-10 pbl-5 grid g-4" data-c-admin-panel data-padded>
      <h1 class="f-size-big f-round c-gray-l text-center">admin<span class="c-blue f-round case-upper">panel</span></h1>

      <div class="panel-container g-3">

         <div data-panel class="grid g-2">
            <h3 class="f-size-a-big f-round c-blue weight-normal flex a-center g-1"><span
                  class="f-e f-size-small lh-1">➕</span> Creation
            </h3>

            <p class="f-size-medium lh-1">Create your own movies or tv-shows</p>

            <ul data-card-list class="g-2 grid">
               <router-link to="/start?type=movie" class="grid g-3" data-card>
                  <span class="f-emoji img">🎞</span>
                  <p>Movie</p>
               </router-link>


               <router-link to="/start?type=series" class="grid g-3" data-card>
                  <span class="f-emoji img">📺</span>
                  <p>Series</p>
               </router-link>
            </ul>
         </div>

         <div data-panel class="grid g-2">
            <h3 class="f-size-a-big f-round c-blue weight-normal flex a-center g-1"><span
                  class="f-e f-size-small lh-1">❔</span> Requests
            </h3>

            <p class="f-size-medium lh-1">Check the requests</p>

            <ul data-card-list class="g-2 grid">
               <router-link to="/admin/requests" class="grid g-3" data-card>
                  <span class="f-emoji img">❔</span>
                  <p>All Requests</p>
               </router-link>

               <router-link to="/request" class="grid g-3" data-card>
                  <span class="f-emoji img">❔</span>
                  <p>Make a Request</p>
               </router-link>
            </ul>
         </div>

      </div>

   </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
@use '@/scss/abstracts/mixins' as *;

[data-c-admin-panel] {
   // overflow-x: hidden;
   flex-direction: column;
   background: rgb(0 0 0/ 0.01);

   >h1 {
      color: rgba(8, 15, 20, 0.5)
   }

   @include mq(small) {
      padding-block: var(--size-2);
   }

   .panel-container {
      columns: 350px 2;
      // grid-template-columns: repeat(auto-fit, 3);
      justify-content: center;
      align-items: center;
      width: fit-content;
      margin-inline: auto;

      >*+* {
         margin-block: var(--size-5);
      }

   }




   [data-card] {
      width: 150px;
      height: 150px;
      aspect-ratio: 1 / 1;
      background: rgba(0, 0, 0, 0.05);
      grid-template-areas: "admincard";
      place-items: center;
      overflow: hidden;
      position: relative;
      border-radius: 1.2vmax;
      cursor: pointer;
      transition: 0.2s ease-out;
      box-shadow: inset 0 -1px 1px 0px rgba(0, 0, 0, 0.2);
      color: var(--clr-blue-d);

      @include mq(small) {
         width: 100%;
         height: 70px;
      }


      &:hover,
      &:focus-within {
         background: rgba(107, 168, 197, 0.2);
      }

      .img {
         grid-area: auto;
         position: absolute;
         font-size: 100px;
         inset: 50% auto auto 50%;
         transform: translate(-50%, -50%);
         opacity: 0;
         transition: opacity 0.1s ease-in-out;
         line-height: 0.9;
      }



      &:hover .img,
      &:focus-within .img {
         font-size: 100px;
         opacity: 0.1;


      }

      p {
         grid-area: admincard;
         color: var(--clr-blue-d);
         font-size: var(--f-size-a-big);
         font-family: var(--f-round);
         font-weight: var(--weight-bold);
         text-align: center;
      }
   }

   ul[data-card-list] {
      grid-template-columns: repeat(auto-fit, minmax(150px, auto));
      grid-auto-flow: dense;
      width: 100%;
      align-items: start;
      justify-content: start;

      @include mq(small) {
         grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
         width: inherit;

      }

   }

}
</style>