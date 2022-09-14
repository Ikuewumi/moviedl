import type { App, AppContext } from "vue";
import Preview from '../components/utilities/Preview.vue'


export default {
   install: (app: App, context: AppContext) => {
      app.component('my-preview', Preview)
   }
}