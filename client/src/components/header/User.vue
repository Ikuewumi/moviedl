<script setup lang="ts">
import { ref } from 'vue'
import Auth from '../auth/Auth.vue';
const showAuth = ref(false)
</script>

<template>
   <div class="flex w-fit g-2 case-lower f-emoji f-size-medium">
      <div @click="showAuth = true" tabindex="0" class="bg-gray-vl c-gray-d f-size-bigger br-6 cursor">👨‍💻</div>
   </div>

   <Auth v-if="showAuth" @close="showAuth = false" />
</template>