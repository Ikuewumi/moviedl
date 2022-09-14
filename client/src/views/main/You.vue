<script setup>
import useUser from '@/stores/user';
import { onBeforeMount } from 'vue';
const user = useUser()

onBeforeMount(user.refreshUser)
</script>

<template>
   <div class="pbl-9" data-page-you>
      <section class="grid g-2 a-center p-center text-center pin-5">
         <div class="profile-pic br-6 grid a-center j-center min-auto">
            <img v-if="user.getUser.img" :src="user.getUser.img" alt="">
            <span v-else class="f-emoji">👤</span>
         </div>
         <h1 class="lh-1 mt-2 min-auto f-size-big f-round">
            {{ user.getUser.name }}
         </h1>
         <p class="lh-2 mt-2 min-auto" v-if="user.getUser.description">
            {{ user.getUser.description }}
         </p>
         <div class="mt-6 f-size-m-big">
            <router-link class="pbl-2 pin-4 bg-gray-l c-gray-d br-6" to="/edit-profile">
               <span class="f-emoji">✏</span> edit profile
            </router-link>
         </div>
      </section>

      <section class="mt-10 pbl-6 pin-5 bg-white flex g-3 a-center j-center">
         <h3 class="f-round f-size-a-big w-fit c-gray-d weight-thin">Create:</h3>
         <div class="grid create-bar g-3">
            <router-link to="/create?type=movie" class="c-gray-d pin-3 pbl-3 br-6 cursor f-size-m-big"><span
                  class="f-emoji">🎞</span> Movie</router-link>
            <router-link to="/create?type=series" class="c-gray-d pin-3 pbl-3 br-6 cursor f-size-m-big"><span
                  class="f-emoji">📺</span> Series</router-link>
         </div>

      </section>


   </div>
</template>

<style lang="scss">
@use '../../scss/abstracts/mixins' as *;

.profile-pic {
   width: min(150px, 70vw);
   aspect-ratio: 1 / 1;
   background-color: rgb(0 0 0 / 0.2);
   outline: 4px solid var(--clr-white);
   outline-offset: -7px;
   font-size: clamp(2rem, 2rem + 5vw, min(100px, 60vw));

   img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 1.2vmax;
   }
}

[data-page-you] {
   >section:first-child p {
      max-width: 50ch;
   }

   >section:nth-child(2) {
      // grid-template-columns: repeat(auto-fit, minmax(50px, auto));
      flex-direction: row;

      @include mq(small) {
         flex-direction: column;
      }

   }

   .create-bar {
      grid-template-columns: repeat(auto-fill, minmax(200px, auto));
      width: 100%;
      max-width: 450px;

      >a {
         background: rgb(0 0 0 / 0.02);
         outline: 0.5px solid rgb(0 0 0 / 0.22);
         line-height: 0.9;

         transition: color 0.3s;

         &:hover {
            background: rgba(74, 171, 190, 0.1);
         }
      }
   }
}
</style>