<template>
   <ErrorVue msg="Uh..oh! This Page does't exist" />
</template>

<script setup lang="ts">
import ErrorVue from '@/components/utilities/Error.vue';
import { inject } from 'vue';

const title = inject('title') as Function

title('Uh..oh')
</script>

<style lang="scss" scoped>
</style>