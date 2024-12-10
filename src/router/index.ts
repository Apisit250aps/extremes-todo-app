import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import HeroReverseLayout from "@/components/layouts/HeroReverseLayout.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import DrawerLayout from "@/components/layouts/DrawerLayout.vue";
import { useAuthStore } from "@/stores/auth";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DrawerLayout,
    children: [
      {
        path: "/",
        name: "dashboard",
        component: HomeView,
        meta: { requiresAuth: true }, // Add meta for protected route
      },
    ],
  },
  {
    path: "/auth",
    component: HeroReverseLayout,
    children: [
      {
        path: "login",
        name: "login",
        component: LoginView,
      },
      {
        path: "register",
        name: "register",
        component: RegisterView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes,
});

// Middleware: Authentication Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Access the auth store

  if (to.meta.requiresAuth && !authStore.token) {
    // If the route requires auth and the user is not logged in, redirect to login
    next({ name: "login" });
  } else if ((to.name === "login" || to.name === "register") && authStore.token) {
    // If the user is logged in and tries to access auth pages, redirect to dashboard
    next({ name: "dashboard" });
  } else {
    // Proceed to the requested route
    next();
  }
});

export default router;
