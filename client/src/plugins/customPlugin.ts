import useLoad from "@/stores/load";
import useToast from "@/stores/toast";
import type { App, AppContext } from "vue";
import Preview from '@/components/utilities/Preview.vue'
import Alert from '@/components/utilities/Alert.vue'

export default {
   install: (app: App, context: AppContext) => {

      app.component('my-preview', Preview)
         .component('my-alert', Alert)

      const load = useLoad()
      const toast = useToast()

      const pinia = () => {
         return {
            load: useLoad(),
            toast: useToast()
         }
      }

      const wrap = async (msg: string, fn: () => Promise<any>) => {
         const state = pinia()

         try {
            state.load.start(msg)
            return (await fn())
         }
         catch (e) {
            state.toast.show(e as string, true)
         }
         finally {
            state.load.stop()
         }

      }

      const editTitle = (title: string = 'Home Page') => {
         document.title = `${title} | MoviesDL`
      }



      app.provide('wrapFn', wrap)
         .provide('pinia', pinia)
         .provide('title', editTitle)
   }
}