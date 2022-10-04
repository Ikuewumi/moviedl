import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const createLink = (link: string) => `../views/${link}.vue`
const createRoute = (name: string, path: string, component: string, props = false): RouteRecordRaw => {
   return {
      name, path: `${path}`,
      component: () => import(/* @vite-ignore */createLink(component)),
      props
   }
}
const redirect = (from: string, to: string): RouteRecordRaw => {
   return {
      path: `${from}`,
      redirect: `${to}`
   }
}

const routes = [
   createRoute('home', '/', 'main/Home'),
   createRoute('index', '/index', 'main/Index'),
   createRoute('about', '/about', 'main/About'),
   createRoute('you', '/you', 'main/You'),
   createRoute('request', '/request', 'main/Request'),
   createRoute('edit-profile', '/edit-profile', 'you/EditProfile'),
   createRoute('start', '/start', 'you/Proxy'),
   createRoute('create', '/create', 'you/Create'),
   createRoute('edit', '/edit', 'you/Edit', true),
   createRoute('all-requests', '/admin/requests', 'admin/Requests'),
   createRoute('movie', '/m/:id', 'public/Movie', true),
   createRoute('series', '/s/:id', 'public/Series', true),
   createRoute('search', '/search', 'public/Search'),
   createRoute('not-found', '/:catchAll(.*)', 'public/NotFound'),
]


const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes,
   scrollBehavior(to, from, savedPosition) {
      return { top: 0 }
   }
})

export default router

