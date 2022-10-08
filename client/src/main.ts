import { createApp } from 'vue'
import router from './router/index'
import { createPinia } from 'pinia'
import App from './App.vue'
import custom from './plugins/customPlugin'

const pinia = createPinia()

createApp(App)
   .use(pinia)
   .use(custom)
   .use(router)
   .mount('#app')

const initLoader = document.querySelector('#loader')
initLoader?.remove()
