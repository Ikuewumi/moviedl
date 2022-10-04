<script lang="ts" setup>
import FormTextarea from '@/components/utilities/FormTextarea.vue'
import { gFactory } from '@/composables/gsap';
import { computed } from '@vue/reactivity';

const animState = {
   off: {
      height: 0,
      duration: 0.3,
      ease: 'cosine'
   } as gsap.TweenVars,

   on: {
      height: 'auto',
      duration: 0.3,
      ease: 'sine'
   } as gsap.TweenVars,

}

const [enter, leave] = gFactory(animState.off, animState.on)

const props = defineProps({
   data: Object,
   open: {
      type: Boolean,
      default: false
   },
   i: Number
})

const emit = defineEmits(['custom-change', 'custom-focus', 'custom-delete'])

const state = $ref({
   data() {
      const object = {
         text: state.text,
         type: state.type
      }

      return object
   },


   show: computed(() => {
      return props.data?._open ?? false
   }),

   text: computed({
      get() {
         return arrStr(props.data?.links) ?? ''
      },
      set(val) {
         emit('custom-change', props?.i, {
            text: val,
            type: state.type
         })
      }
   }),

   type: computed({
      get() {
         return props.data?.type ?? '480p'
      },
      set(val) {

         emit('custom-change', props?.i, {
            text: state.text,
            type: val
         })
      }
   })


})

const arrStr = (array: string[]) => array.join('\n')
const emitDelete = () => emit('custom-delete', props.i)
const emitFocus = (e: Event) => {
   const element = e.target as Element
   const isValid = !(element.classList.contains('close'))
   if (isValid) {
      emit('custom-focus', props.i)
   }
}
</script>

<template>
   <div class="grid g-3 a-center br-6" data-c-select-link @focusin="emitFocus" tabindex="0" data-component-link
      data-padded>
      <div data-select>
         <select v-model="state.type" name="type" class="bg-white">
            <option value="480p">480p</option>
            <option value="540p">540p</option>
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
            <option value="2160p">2160p</option>
            <option value="4K">4K</option>
            <option value="other">other</option>
         </select>
      </div>
      <Transition @enter="enter" @leave="leave">
         <FormTextarea @change="" v-model="state.text" p="Enter your links, each new one on a new line"
            v-show="state.show" />
      </Transition>
      <span @click="emitDelete" tabindex="1" class="close cursor f-emoji br-6 grid a-center j-center">🗑</span>
   </div>
</template>

<style lang="scss">
@use '@/scss/abstracts/mixins' as *;



[data-component-link] {
   width: 100%;
   background: rgb(0 0 0 / 0.04);
   position: relative;
   overflow: hidden;


   @include mq(small) {
      padding-block: var(--size-3)
   }

   .close {
      position: absolute;
      inset: 0 0 auto auto;
      padding-inline: var(--size-2);
      aspect-ratio: 1 / 1;
      background: rgb(0 0 0 / 0.1);
      border-top-left-radius: 0;
      transition: 0.2s ease;

      &:hover {
         background: var(--clr-pink-l);
      }

      &:focus {
         outline-color: var(--clr-pink-l);
         outline-width: 0;
      }
   }
}
</style>