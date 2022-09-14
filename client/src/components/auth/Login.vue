<template>
   <section class="w-full fixed z-7 bg-white grid a-center j-center g-2" data-overlay>
      <div class="absolute f-size-big cursor w-fit" @click="this.$emit('close')" data-close>❌</div>
      <div class="pin-4 pbl-5 bg-gray-vl br-2 w-form f-size-m-big" data-content>
         <h2 class="f-size-bigger weight-bold f-round">Login!</h2>
         <p class="f-size-m-big mt-3">Welcome back! Let's just make sure it's you</p>
         <form data-form @submit.prevent class="grid g-3 mt-5">
            <div class="field">
               <span class="f-emoji">✉</span>
               <input type="email" name="email" placeholder="e.g. user@gmail.com" class="f-size-m-big" />
            </div>
            <div class="field">
               <span class="f-emoji">👤</span>
               <input type="text" name="name" placeholder="e.g. Tim Urban" class="f-size-m-big" />
            </div>
            <div class="field">
               <span class="f-emoji">🔑</span>
               <input type="password" name="password" placeholder="Enter your password" class="f-size-m-big" />
            </div>

            <button type="submit" class="pbl-3 mt-3 f-size-m-big cursor bg-blue c-white br-2">Sign Up</button>
         </form>
      </div>

   </section>
</template>

<script setup>

</script>

