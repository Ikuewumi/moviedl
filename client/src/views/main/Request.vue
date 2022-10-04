<template>
   <div data-page-request>

      <div class="hero pbl-9 relative" data-padded>

         <router-link v-if="user.getUser?.admin" to="/admin/requests"
            class="bar absolute f-round pin-4 pbl-2 f-size-medium c-white bg-gray-l br-4">
            All Requests
         </router-link>


         <div class="grid g-2 min-auto w-fit mb-10">

            <form data-search class="flex a-strech w-search min-auto" @submit.prevent="search">
               <input class="w-max pin-3 pbl-2 f-size-normal bw-1 b-gray-d" type="search" v-model="state.term"
                  name="search" placeholder="Enter the movie/series' imdbID..." />
               <input type="submit" value="✅" class="pbl-2 pr-3 pl-2 f-size-m-big bg-gray-l cursor ">
            </form>
            <a class="f-size-normal text-center c-blue" href="#request-text">Whats this? <span class="f-e">ℹ</span>
            </a>

         </div>

         <div data-s-request-link class="br-4 min-auto" v-if="!data?.imdbID">
            <div></div>
            <div class="close pin-5 br-4"></div>
         </div>
         <div @click="showAlert" data-c-request-link tabindex="0" class="br-4 min-auto cursor" v-else>
            <h3 class="f-size-a-big f-round weight-normal">{{ data.Title }}</h3>
            <div class="close pin-3 br-4 f-size-normal cursor" tabindex="0" @click.stop="remove">❌</div>
         </div>

      </div>

      <div id="request-text" class="pbl-5 grid g-2 lh-2 f-size-normal" data-padded>
         <p>This is a means to `officially` request for movies and shows you want to see. The
            imdbID is needed to avoid confilct of names of different movies. To get the imdbID, Just do go to the
            imdbPage for your show. For example in this URL `https://www.imdb.com/title/tt0944947/`, the imdbID is
            <b>tt0944947</b>
         </p>

         <p>
            You can make at-most five(<b>5</b>) requests in one day
         </p>
      </div>

      <my-alert v-if="data?.imdbID" :show="state.alert" @close="stopAlert" @done="request">
         Request for `{{ data?.Title }}`?
      </my-alert>

   </div>
</template>

<script setup lang="ts">
import { apiGet, apiPost } from '@/composables/auth';
import { regexObject } from '@/composables/env';
import type { iPinia, iTitle } from '@/composables/types';
import { inject } from 'vue';
import useUser from '@/stores/user';
const p = inject('pinia') as Function
const wrapFn = inject('wrapFn') as Function
const state = $ref({

   pinia: p() as iPinia,
   title: inject('title') as iTitle,
   term: '',
   alert: false

})

const stopAlert = () => state.alert = false
const showAlert = () => state.alert = true

type Requested = {
   imdbID: string,
   Title: string,
   Type: 'movie' | 'series'
}

let data = $ref({} as unknown as Requested)

const remove = () => {
   state.term = ''
   data = {} as unknown as Requested
}

const searchFunc = async () => {
   const x = await apiGet(`requests/${state.term}`, true)

   return x
}

const request = async () => {
   try {
      const func = async () => {
         await apiPost(`requests/${state.term}`)
         state.pinia.toast.show('Request made!')
      }
      await wrapFn('Requesting...', func)
   }
   catch (e) { 
   finally { return stopAlert() }

   }

   const search = async () => {
      try {
         if (!regexObject.imdbId.test(state.term)) {
            state.term = ''
            throw Error('Search term must be a vaild imdbID')
         }

         data = await wrapFn('Searching...', searchFunc)

      }

      catch (e) {
         state.pinia.toast.show(String(e), true)
      }
   }

   state.title('Request Page')
   const user = useUser()
</script>

<style lang="scss">
[data-page-request] {
   .hero {
      min-height: 300px;
      height: min(50vh, 100%);
      max-height: 400px;
      overflow: hidden;
      width: 100%;
      background: rgba(0, 0, 0, 0.034);
      background-blend-mode: multiply;
      align-items: center;
      justify-content: center;

      a.bar {
         inset: 0 0 auto auto;
         // background: #000;
         border-top-left-radius: 0;
         border-bottom-right-radius: 0;

         transition: background 0.2s ease;

         &:hover {
            background: #75bdcd;
         }
      }
   }

   [data-search] {
      max-width: 90%;
   }
}

[data-s-request-link] {
   height: 70px;
   width: min(400px, 100%);
   background: rgb(226, 226, 226);
   display: flex;
   align-items: stretch;
   justify-content: space-between;

   >div.close {
      background: rgb(219, 217, 217);

   }
}

[data-c-request-link] {
   height: 70px;
   width: min(400px, 100%);
   background: rgba(255, 255, 255, 0.4);
   display: flex;
   align-items: stretch;
   justify-content: space-between;
   border: 1px solid var(--clr-gray-l);

   &:focus {
      outline-width: 0.1px;
   }

   &>* {
      align-self: center;

   }

   h3 {
      // text-align: center;
      padding-inline: 1rem;
      width: 100%;
      display: flex;
      align-content: center;
      // place-content: center;
   }

   >div.close {
      // background: rgb(219, 217, 217);

      height: 100%;
      background: rgba(235, 235, 235, 0.808);
      display: grid;
      align-items: center;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

      transition: background 0.2s ease;

      &:hover {
         background: rgb(228, 228, 228);

      }

      &:focus {
         outline: none;
      }

   }
}


.anim-fade {
   animation: fade 0.6s infinite alternate;

}

@keyframes fade {
   0% {
      opacity: 1
   }

   100% {
      opacity: 0.3
   }
}
</style>