<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { apiGet, apiPost } from '@/composables/auth';
import Search from '@/components/admin/Search.vue';
import FormInput from '@/components/utilities/FormInput.vue'
import useToast from '@/stores/toast';
import { vimdbid } from '@/composables/form';
import { inject, onMounted } from 'vue';
import useLoad from '@/stores/load';
import Link from '@/components/admin/Link.vue';
import LinksSeries from '@/components/admin/series/Links.vue';
import LinksMovies from '@/components/admin/movies/Links.vue';
import { gFactory } from '@/composables/gsap';
import Metadata from '@/components/public/Metadata.vue'
import { ref } from '@vue/reactivity'
import gsap from 'gsap';
import type { HybridOptions, Movie, Series, SeriesOptions } from '@/composables/types';
import type { B, Episode_, GenericLinks, SeasonLinks } from '@/composables/series';

interface Form {
   poster: string
   links: {}[]
}

const toast = useToast()
const load = useLoad()
const route = useRoute()
const type = $computed(() => {
   let result;

   switch (route.query?.type) {
      case 'series':
      case 's':
         result = 'series'
         break;

      case 'movies':
      case 'm':
      default:
         result = 'movies'
         break;
   }

   return result
})

const v = $computed(() => {
   if (!data) return false
   return (data?._id?.length === 24)
})

const metadata = $computed(() => {
   return {
      Poster: state.poster!,
      Plot: data.Plot!,
      Title: data.Title!,
      Year: data.Year!,
      imdbRating: data.imdbRating!,
      Genre: data.Genre?.split(',').map((key) => key.trim())!,
      Actors: data.Actors?.split(',').map((key) => key.trim())!
   }
})



// @TODO - Have the page in three objects: API data, form fields, user field and component state

const img = $computed(() => {
   return `../../src/assets/img${Math.floor(Math.random() * 15)}.jpg`
})


let state = $ref({
   poster: '',
   showPreview: false,

   p_show() { state.showPreview = true },
   p_hide() { state.showPreview = false },

})

let data = $ref({} as unknown as Movie<string> | Series<string>)
const title = inject('title') as Function

let form = $ref({
   poster: ''
}! as Form)

const refreshImg = () => {
   //@TODO - Change this to the actual poster later
   const x = (form?.poster > '') ? form.poster : data.Poster
   state.poster = x!

   return x as string
}

const x = async () => {
   try {
      load.start('Loading Data...')

      await vimdbid(route.query?.imdbid as string)
      data = await apiGet(`omdb/${type}/${route.query?.imdbid as string}`)

      title('Create Page - ' + data.Title)


      form.poster = refreshImg()

   }
   catch (e) { toast.show(e as string, true) }
   finally { load.stop() }
}

await x()
title('Create Page')

const loadImg = async () => {
   try {
      if (form.poster === '') throw Error('invalid image!')
      load.start('Loading image....')
      const response = await fetch(form.poster)
      if (!response.ok) throw Error('Something went wrong')
      const data_ = await response.blob()

      if (!data_.type.startsWith('image')) throw Error('The provided url does not lead to an image')
      refreshImg()
      toast.show('Image updated!')
   }
   catch (e) { toast.show(e as string, true) }
   finally { load.stop() }
}

// SERIES METHODS
function sAddLink(options: HybridOptions) {
   if (
      data.Type === 'series' &&
      data.SeriesLinks &&
      Array.isArray(data.SeriesLinks) &&
      options.type === 'series'
   ) {
      const index = data.SeriesLinks.findIndex(season => season.season === options.seasonNumber)
      if (index === -1) return false

      data.SeriesLinks[index].links.push({
         type: '480p',
         id: 'episode',
         number: 1,
         links: []
      })
   }

}

function sChangeLink(obj: GenericLinks, options: HybridOptions) {
   if (
      data.Type === 'series' &&
      data.SeriesLinks &&
      Array.isArray(data.SeriesLinks) &&
      options.type === 'series' &&
      Number.isInteger(options.index)
   ) {
      const index = data.SeriesLinks.findIndex(season => season.season === options.seasonNumber)
      if (index === -1) return false

      data.SeriesLinks[index].links[options.index!] = obj as SeasonLinks
   }

}

function sRemoveLink(options: HybridOptions) {
   if (
      data.Type === 'series' &&
      options.type === 'series' &&
      Number.isInteger(options.index) &&
      Number.isInteger(options.seasonNumber)
   ) {
      const index = data.SeriesLinks.findIndex(season => season.season === options.seasonNumber)
      if (index === -1) return false


      data.SeriesLinks[index].links = data.SeriesLinks[index].links.filter((_, i) => i !== options.index)


   }

}

const funct = (...args: any) => {


}


// MOVIE METHODS
const mAddLink = (options: HybridOptions) => {
   if (data.Type === 'movie' && options.type === 'movie') {
      data.MovieLinks?.push({
         type: '480p',
         links: []
      })
   }
}

const mRemoveLink = (options: HybridOptions) => {
   if (
      data.Type === 'movie' &&
      options.type === 'movie' &&
      Number.isInteger(options.index)
   ) {
      data.MovieLinks = data.MovieLinks.filter((_, index) => {
         return index !== options?.index
      })
   }
}

const mChangeLink = (obj: GenericLinks, options: HybridOptions) => {
   if (
      data.Type === 'movie' &&
      options.type === 'movie' &&
      Number.isInteger(options.index)
   ) {
      data.MovieLinks[options?.index ?? 0] = obj as B
   }
}


const wrapFn = inject('wrapFn') as Function
const router = useRouter()

const saveData = async (options: HybridOptions) => {

   if (!Array.isArray(linksArray)) return

   await wrapFn('Saving movie data...', () => apiPost(`admin/${type}/${data.imdbID}`, {
      img: state.poster,
      links: linksArray
   }))

   const t = type === 'series' ? 's' : 'm'

   router.push(`/${t}/${data.imdbID}`)


}

const linksArray = $computed(() => {
   if (!v) return
   if (data.Type === 'movie') return data.MovieLinks
   else if (data.Type === 'series') return data.SeriesLinks
})
</script>

<template>
   <div v-if="v">

      <div class="grid g-4" data-component-metadata>
         <Metadata :data="metadata" />
         <div class="mbl-7">
            <FormInput name="img" v-model="form.poster" p="Enter image link" label="Image" @keypress.enter="loadImg">
               <template #about>
                  Put in a new link and `enter` to replace the image
               </template>
            </FormInput>
         </div>

      </div>


      <LinksMovies v-if="data?.Type === 'movie'" :data="data" :linksArray="data.MovieLinks" @add-link="mAddLink"
         @custom-change="mChangeLink" @custom-save="saveData" @custom-delete="mRemoveLink" />

      <LinksSeries v-else-if="data.Type === 'series'" :data="data" :linksArray="data.SeriesLinks" @add-link="sAddLink"
         @custom-change="sChangeLink" @custom-save="saveData" @custom-delete="sRemoveLink" />


   </div>

</template>

<style lang="scss">
@use '@/scss/abstracts/mixins' as *;



[data-component-links] {
   ul {
      position: relative;
   }
}

[data-component-metadata] {
   padding: var(--size-5);

   @include mq(small) {
      padding: var(--size-2);
   }

   &>div:first-child {
      grid-template-columns: repeat(auto-fit, minmax(270px, auto));
   }

   .image {
      height: fit-content;
      align-self: start;
      background: rgb(0 0 0 / 0.2);

   }

   img:first-of-type {
      object-fit: cover;
      max-height: 400px;
      width: 100%;
   }

   section.content {
      height: fit-content;
      margin: 0;
      padding: 0;
   }
}

[data-component-links] {

   button {
      background: rgb(134, 181, 184);
      color: var(--clr-white);
      transition: 0.2s ease;

      &.full {
         width: 100%;

      }

      &.btn {
         width: fit-content;
         outline-offset: 4px;

      }

      &:hover {
         background: var(--clr-blue);

      }
   }


}
</style>