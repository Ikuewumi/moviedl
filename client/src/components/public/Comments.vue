<script setup lang="ts">
import FormTextarea from '@/components/utilities/FormTextarea.vue';
import CommentsBase from '@/components/public/CommentsBase.vue';
import { ref, type Ref } from '@vue/reactivity';
import { gFactory } from '@/composables/gsap';
import { apiGet, apiPatch, apiPost } from '@/composables/auth';
import useUser from '@/stores/user';
import useToast from '@/stores/toast';
import useLoad from '@/stores/load';
import type { ReactiveVariable } from 'vue/macros';
import { onErrorCaptured, onMounted, watchEffect } from 'vue';

const props = defineProps<{
   imdbID: string
}>()

const pinnedUser = {
   from: {
      yPercent: -10,
      opacity: 0.4,
      zIndex: -1,
      duration: 1,
      ease: 'elastic'
   } as gsap.TweenVars,

   to: {
      yPercent: 0,
      opacity: 1,
      zIndex: 0,
      duration: 1,
      ease: 'cosine'
   } as gsap.TweenVars
}

const [enter, leave] = gFactory(pinnedUser.from, pinnedUser.to)
let content = $ref('')
const user = useUser()
const toast = useToast()
const load = useLoad()

type CommentBase_ = {
   _id: string,
   aid: string,
   name: string,
   timestamp: string | number,
   content: string
}

interface Comment_ extends CommentBase_ {
   comments: CommentBase_[]
}


let data: ReactiveVariable<Comment_[]> = $ref([])
const refreshComments = async () => {
   try {
      const x = await apiGet(`comments/${props.imdbID}`) as Comment_[]
      data = x ?? []
      
      return
   } catch (e) {
      toast.show(String(e), true)
   }
}
await refreshComments()
let pinned = ref({} as unknown as Comment_)


const pin = (id: string) => {
   const obj = data.find((d) => d._id === id)
   

   if (obj) pinned.value = obj!
   else pinned.value = {} as unknown as Comment_
}


const comment = async () => {
   try {
      if (!user.getUser._id) throw Error('You must be logged in to comment')
      if (content.trim() === '') throw Error('The comment field can\'t be empty')
      if (pinned?.value.aid) { await apiPatch(`comments/${pinned.value._id}`, { content }) }
      else { await apiPost(`comments/${props.imdbID}`, { content }, true) }
      await refreshComments()
   }
   catch (e) { toast.show(String(e), true) }
   finally {
      content = '';
      pin('')
   }
}



onErrorCaptured((e) => {
   toast.show(String(e), true)
})


</script>


<template>
   <div class="pt-8 mt-8 mb-8 pb-8" data-top>

      <div class="grid g-3" data-c-comments>
         <h1 class="f-round f-size-big c-blue-d">Comments</h1>

         <form @submit.prevent="comment" class="grid g-3">
            <FormTextarea p="Comment here..." class="mt-3" v-model="content">

               <template #more>
                  <transition @enter="enter" @leave="leave">
                     <div class="flex a-center j-center" id="pinned-user" v-show="pinned?.aid">
                        <span>Replying to {{ pinned.name }}</span>
                        <small @click="pin('')" class="cursor">❌</small>
                     </div>
                  </transition>
               </template>


            </FormTextarea>
            <div>
               <button type="submit" class="btn pbl-2 pin-3 bg-blue c-white f-size-normal br-3">
                  <span class="f-emoji">✒</span> Post Comment
               </button>
            </div>
         </form>
         <div v-if="data.length">
            <div class="mb-3"></div>

            <h2 class="f-round f-size-a-big underline pl-1 c-blue-d">{{ data.length }} Comments</h2>

            <div class="grid g-3">

               <CommentsBase v-if="data.length" @pin="pin" v-for="(data_, i) in data" :comment="data_" class="mt-3" />
            </div>
         </div>
      </div>

   </div>

</template>



<style lang="scss">
[data-c-comments] {
   width: min(500px, 100%);
   margin-inline: auto;

   h1,
   h2 {
      color: #82989d;
   }
}

#pinned-user {
   background: rgb(255 255 255 / 0.5);
   width: fit-content;
   padding: 0 var(--size-2);
   transform: translateX(-4%);
   margin-left: auto;
   border-bottom-left-radius: 1.2vmax;
   border-bottom-right-radius: 1.2vmax;
   border: 1px solid var(--clr-blue);
   border-top-width: 0;
   max-width: 80%;


   span {
      font-size: var(--f-size-normal);
      font-size: var(--f-size-small);
      padding: var(--size-2) var(--size-2);
      min-width: 100px;
      max-width: 100%;
   }
}

[data-top] {
   border-top: 1px dotted var(--clr-blue);
}
</style>