import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import HomeView from "../views/HomeView.vue"
import HeroReverseLayout from "@/components/layouts/HeroReverseLayout.vue"
import LoginView from "@/views/auth/LoginView.vue"
import RegisterView from "@/views/auth/RegisterView.vue"
import DrawerLayout from "@/components/layouts/DrawerLayout.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass:"active",
  routes: [
    {
      path: "/",
      component: DrawerLayout,
      children: [
        {
          path: "/",
          name: "dashboard",
          component: HomeView
        }
      ]
    },
    {
      path: "/auth",
      component: HeroReverseLayout,
      children: [
        {
          path: "login",
          name: "login",
          component: LoginView
        },
        {
          path: "register",
          name: "register",
          component: RegisterView
        }
      ]
    }
  ]
})

export default router
