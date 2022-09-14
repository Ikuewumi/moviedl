<script setup>
import Logo from '../utilities/Logo.vue'
import User from './User.vue';
import Links from './Links.vue';
import Search from './Search.vue';
</script>
<template>
   <header>
      <div class="container pbl-3 g-3">
         <article class="flex j-between a-center">
            <Logo />
            <User />
         </article>
         <Links />
         <Search />
      </div>
   </header>
</template>

<style lang="scss">
</style> 