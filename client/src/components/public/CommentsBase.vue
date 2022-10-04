<template>
   <div class="grid g-3 c-comments-b">

      <div data-c-comment-base class="grid g-1 pin-3 pbl-3">
         <div class="bar cursor f-emoji" @click="emitPin">
            🔗
         </div>
         <h3 class="f-round">
            {{ comment.name }}
            <span class="admin" v-if="comment.admin">ADMIN</span>
         </h3>
         <small>{{ date(comment.timestamp) }}</small>
         <p>{{ comment.content }}</p>
      </div>

      <div data-second-ring class="grid g-4">
         <div class="grid g-1 pin-2 pbl-3" v-for="(x, i) in comment.comments" :key="i" data-c-comment-base>
            <h5><span class="f-emoji">☝</span></h5>
            <h3 class="f-round">
               {{ x.name }}
               <span class="admin" v-if="x.admin">ADMIN</span>
            </h3>
            <small>{{ date(x.timestamp) }}</small>
            <p>{{ x.content }}</p>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
type CommentBase_ = {
   _id: string
   aid: string,
   name: string,
   timestamp: number,
   content: string
   admin: boolean
}

interface Comment_ extends CommentBase_ {
   comments: CommentBase_[]
}

const props = defineProps<{
   comment: Comment_
}>()

const date = (x: CommentBase_["timestamp"]) => {
   if (typeof x === 'number') {
      return (new Date(x)).toLocaleDateString([], {
         month: 'long',
         day: "2-digit",
         year: "numeric"
      })
   }
}
const emit = defineEmits<{
   (event: 'pin', aid: string): void,
}>()

const emitPin = () => {

   emit('pin', props.comment._id)

}
</script>

<style lang="scss">
.c-comments-b [data-c-comment-base] .bar,
.c-comments-b [data-c-comment-base] .bar:hover,
.c-comments-b [data-c-comment-base] .bar:focus {
   background: transparent;
}

[data-c-comment-base] {
   // background: rgba(255, 255, 255, 0.945);
   border: 1px solid var(--clr-blue);
   border-radius: 1.2vmax;
   border-left-width: 5px;
   position: relative;

   h3 {
      font-weight: var(--weight-normal);
      font-size: 1.4rem;
      display: flex;
      line-height: 1.2;
      gap: var(--size-1);
      flex-wrap: wrap;
   }

   h5,
   .bar {
      font-weight: 300;
      letter-spacing: 2px;
      font-size: 0.8rem;
      padding-left: var(--size-2);
      font-family: var(--f-round);
      color: rgb(51, 51, 51);
      position: absolute;
      inset: 0 0 auto auto;
      transform: translateX(-20%) translateY(30%);
      text-align: right;
      background: transparent;
   }

   small {
      font-size: var(--f-size-small);
      font-weight: var(--weight-normal);
      color: var(--clr-blue);
   }

   p {
      line-height: 1.5;
      font-size: var(--f-size-small);
   }

   span.admin {
      padding: 0.1rem 0.2rem;
      line-height: 1;
      border-radius: 1.2vmax;
      background: rgb(209, 209, 18);
      font-weight: 600;
      font-family: var(--f-round);
      font-size: 11px;
      letter-spacing: 0.5px;
      color: var(--clr-white);
      align-self: center;
      justify-content: space-around;
   }

}

[data-second-ring] {
   width: 90%;
   margin-left: auto;
   align-self: flex-end;
}
</style>