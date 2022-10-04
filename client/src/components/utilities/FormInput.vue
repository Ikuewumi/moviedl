<script setup>
const props = defineProps(['name', 'label', 'modelValue', 'p'])
const emit = defineEmits(['update:modelValue'])

const input = $computed({
   get() { return props.modelValue },
   set(value) { emit('update:modelValue', value) }
})
</script>

<template>
   <div data-component-input class="grid a-center">
      <label v-if="label" :for="name" data-label>{{ label }}</label>
      <input type="text" :name="name" data-input :placeholder="p" v-model="input">

      <small v-if="$slots.about" class="mt-1">
         <slot name="about">More information</slot>
      </small>
      <slot name="more"></slot>
   </div>
</template>

<style lang="scss">
</style>