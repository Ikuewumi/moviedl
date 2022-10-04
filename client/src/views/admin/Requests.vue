<template>
   <div data-page-all-requests class="pbl-8 relative" data-padded>

      <h1 class="f-round f-size-big case-lower weight-normal text-center">ALL REQUESTS</h1>

      <section class="mt-5 grid g-3 min-auto">
         <div data-c-request-link tabindex="0" @click="showAlert(i)" class="br-4 min-auto cursor"
            v-for="(req, i) in computedData" :key="i">
            <h3 class="f-size-a-big g-1 f-round weight-normal">
               {{ req.Title }}<small class="f-size-small pin-1">{{ req.votes }}</small>
            </h3>
            <div class="close pin-3 br-4 f-size-normal cursor" tabindex="0" @click.stop="remove(req.imdbID)">❌</div>
         </div>

         <span role="button" v-if="!computedDone" @click="changePageNumber"
            class="w-fit min-auto cursor mt-7 pin-4 pbl-2 f-size-medium c-white bg-blue br-4">See
            More</span>
      </section>


      <my-alert v-if="computedFilm?.imdbID" :show="state.booleans.alert" @close="stopAlert" @done="create">
         Create `{{ computedFilm?.Title }}`?
      </my-alert>
   </div>
</template>

<script setup lang="ts">
import { apiDelete, apiGet } from '@/composables/auth';
import useToast from '@/stores/toast';
import { inject } from 'vue';
import { useRouter } from 'vue-router';

type Requested = {
   imdbID: string,
   Title: string,
   Type: 'movie' | 'series',
   votes: number
}

const state = $ref({
   booleans: {
      alert: false
   },
   i: 0
})

const router = useRouter()
const title = inject('title') as Function
const wrapFn = inject('wrapFn') as Function

const computedFilm = $computed(() => {
   return data[state.i]
})

const showAlert = (i = 0) => { state.i = i; state.booleans.alert = true }
const stopAlert = () => state.booleans.alert = false

let data = $ref([] as Requested[])

const computedData = $computed(() => {
   return data.sort((a, b) => b.votes - a.votes)
})



const create = () => {
   const type = computedFilm.Type === 'series' ? 'series' : 'movies'
   const id = computedFilm.imdbID

   return router.push(`/create?type=${type}&imdbid=${id}`)
}

let count = $ref(0)
const increment = 20
let page = $ref(1)
const toast = useToast()

const getData = async () => {

   const func = async () => {
      const x = await apiGet(`requests?page=${page}`, true)
      let a = x.data.filter((d: any) => !data.find(i => i.imdbID === d.imdbID))
      data = [...data, ...a] ?? [] as Requested[]
      page = x.page
      count = x.count
      
   }

   await wrapFn('Getting Requests...', func)
}



const computedDone = $computed(() => {
   return (page * increment) >= count
})

const changePageNumber = () => {
   page += 1
   getData()

}



const remove = async (imdbID: string) => {
   const func = async () => {
      await apiDelete(`requests/${imdbID}`)
      data.filter(a => a.imdbID !== imdbID)
   }

   if (confirm('Delete this request?')) {
      await wrapFn('Deleting the request...', func)
   }
}

await getData()

title('Admin - All Requests')
</script>

<style lang="scss">
[data-c-request-link] {
   height: 70px;
   width: min(500px, 100%);
   background: rgba(255, 255, 255, 0.4);
   display: flex;
   align-items: stretch;
   justify-content: space-between;
   border: 1px solid var(--clr-gray-l);
   transition: border 0.2s ease;

   &:hover,
   &:focus-within {
      border-left-width: 5px;
      border-color: var(--clr-blue)
   }

   &:focus {
      outline-width: 0px;
   }

   &>* {
      align-self: center;

   }

   h3 {
      // text-align: center;
      padding-inline: 1rem;
      width: 100%;
      // display: flex;
      align-items: center;
      align-items: baseline;


      small {
         color: var(--clr-blue-l);
         height: fit-content;
         font-weight: 700;
         letter-spacing: 1px;
         align-self: baseline;
      }

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

[data-page-all-requests] {
   span.bar {
      inset: 0 0 auto auto;
      // background: #000;
      border-top-left-radius: 0;
      border-bottom-right-radius: 0;

      transition: background 0.2s ease;

      &:hover {
         background: #75bdcd;
      }
   }

   span[role=button].bar {
      transition: background 0.2s ease;

      &:hover {
         background: #75bdcd;
      }
   }
}
</style>