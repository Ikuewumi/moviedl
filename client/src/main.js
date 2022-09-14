import { createApp } from 'vue'
import router from './router/index'
import { createPinia } from 'pinia'
import App from './App.vue'
import custom from './plugins/previewPlugin'

const pinia = createPinia()

createApp(App)
   .use(pinia)
   .use(router)
   .use(custom)
   .mount('#app')
