<script setup lang="ts">
import useUser from '@/stores/user';
import useLoad from '@/stores/load';
import useToast from '@/stores/toast';
import { computed, onMounted, ref } from 'vue';
import { selectImage } from '@/composables/form';
import { vname } from '@/composables/form'
import { apiPatch } from '@/composables/auth';
import { useRouter } from 'vue-router';
const user = useUser()
const loader = useLoad()
const toast = useToast()
const router = useRouter()

const x = ref(false)

const iprofile = ref('')
const name = ref('')
const description = ref('')

const data = computed(() => {
   return {
      name: name.value,
      description: description.value,
      img: iprofile.value
   }
})

const f = async () => {
   try {
      loader.start('Getting User Credentials')
      await user.refreshUser()
      name.value = user.getUser.name ?? ''
      description.value = user.getUser.description ?? ''
      iprofile.value = user.getUser.img ?? ''

   }
   catch (e) { toast.show(e as string, true) }
   finally { loader.stop() }
}

onMounted(f)


const eProfilePicture = async (evt: Event) => {
   try {
      const a = await selectImage(evt.target as HTMLInputElement)
      if (a) a.onload = () => iprofile.value = a.result as string
   }
   catch (e) { toast.show(e as string, true) }
}

const checkProfile = async () => {
   try {
      await vname(data.value.name)
      x.value = true
      console.log(data.value)
   }
   catch (e) { toast.show(e as string, true) }
   finally { loader.stop() }
}

const saveProfile = async () => {
   try {
      loader.start('Updating Profile')
      const data_ = await apiPatch('user', data.value)
      toast.show(data_.msg as string)
      await user.refreshUser()
      router.push('/you')
   }
   catch (e) { toast.show(e as string, true) }
   finally { loader.stop() }
}
</script>


<template>
   <div class="" data-page-edit-profile v-if="user.getUser.name">
      <h3 class="lh-1 mt-5 min-auto f-size-big f-round mbl-7 pin-2 c-dark" data-form>Edit Profile</h3>

      <form class="min-auto grid g-3 a-center mt-5 mb-7" data-form @submit.prevent="checkProfile">
         <div class="field">
            <span class="f-emoji f-size-bigger">👤</span>
            <input type="text" name="name" placeholder="Name..." class="f-size-medium" v-model="name">
         </div>

         <div class="field">
            <span class="f-emoji f-size-bigger">ℹ</span>
            <textarea type="text" name="about" placeholder="About me..." class="f-size-medium"
               v-model="description">{{ description }}</textarea>
         </div>


         <div>

            <div class="field">
               <span class="f-emoji f-size-bigger">🖼</span>
               <input type="file" @change="eProfilePicture" name="profile" placeholder="Name..." class="f-size-medium">
            </div>
            <div class="field cover relative" v-if="iprofile">
               <img :src="iprofile" />
               <span class="close f-emoji absolute cursor" @click="iprofile = ''">❌</span>
               <p class="mt-4 c-gray-l underline f-round f-size-m-big">Profile Image</p>
            </div>
         </div>

         <button type="submit" class="f-round pbl-4 mt-3 f-size-a-big cursor br-2">Save</button>
      </form>
   </div>
   <my-preview :show="x" @close="x = false" @done="saveProfile">
      <template #body>
         <div class="grid a-center j-center">
            <div class="profile-pic grid a-center j-center br-6" v-if="data.img">
               <img :src="data.img" alt="Profile Picture">
            </div>
            <h1 class="lh-1 mt-2 min-auto f-size-big f-round">
               {{ data.name }}
            </h1>
            <p class="lh-2 mt-2 min-auto" v-if="data.description">
               {{ data.description }}
            </p>
         </div>
      </template>
   </my-preview>
</template>


<style lang="scss">
[data-page-edit-profile] {

   [data-form] {
      max-width: 90vw;
      width: min(90%);

      .field {
         padding-inline: var(--size-3);
         padding-block: var(--size-2);
      }



      .field.cover {
         grid-template-columns: none;
         grid-template-areas: none;

         padding-block: 0 var(--size-4);

         justify-content: start;

         &>* {
            grid-area: auto;
         }
      }

      span.close {
         inset: 0 auto auto var(--size-3);
         padding: var(--size-2);
         background-color: var(--clr-gray-t);
         border-radius: 0.4vmax;

      }

      input {
         align-self: center;
         // justify-self: center;
      }

      img {
         max-width: 60%;
         min-width: 50px;
         object-fit: contain;

      }

      button {
         background: rgb(79, 133, 148);
         color: var(--clr-white);
         transition: 0.2s ease;

         &:hover {
            background: var(--clr-blue);
         }
      }
   }
}
</style>