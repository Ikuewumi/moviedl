import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes = [
   {
      "name": "home",
      "path": "/",
      "component": () => import("../views/main/Home.vue"),
      "props": false
   },
   {
      "name": "index",
      "path": "/index",
      "component": () => import("../views/main/Index.vue"),
      "props": false
   },
   {
      "name": "about",
      "path": "/about",
      "component": () => import("../views/main/About.vue"),
      "props": false
   },
   {
      "name": "you",
      "path": "/you",
      "component": () => import("../views/main/You.vue"),
      "props": false
   },
   {
      "name": "request",
      "path": "/request",
      "component": () => import("../views/main/Request.vue"),
      "props": false
   },
   {
      "name": "edit-profile",
      "path": "/edit-profile",
      "component": () => import("../views/you/EditProfile.vue"),
      "props": false
   },
   {
      "name": "start",
      "path": "/start",
      "component": () => import("../views/you/Proxy.vue"),
      "props": false
   },
   {
      "name": "create",
      "path": "/create",
      "component": () => import("../views/you/Create.vue"),
      "props": false
   },
   {
      "name": "edit",
      "path": "/edit",
      "component": () => import("../views/you/Edit.vue"),
      "props": true
   },
   {
      "name": "all-requests",
      "path": "/admin/requests",
      "component": () => import("../views/admin/Requests.vue"),
      "props": false
   },
   {
      "name": "movie",
      "path": "/m/:id",
      "component": () => import("../views/public/Movie.vue"),
      "props": true
   },
   {
      "name": "series",
      "path": "/s/:id",
      "component": () => import("../views/public/Series.vue"),
      "props": true
   },
   {
      "name": "search",
      "path": "/search",
      "component": () => import("../views/public/Search.vue"),
      "props": false
   },
   {
      "name": "not-found",
      "path": "/:catchAll(.*)",
      "component": () => import("../views/public/NotFound.vue"),
      "props": false
   }
]


const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes,
   scrollBehavior(to, from, savedPosition) {
      return { top: 0 }
   }
})

export default router

