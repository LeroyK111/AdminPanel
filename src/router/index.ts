import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      // 独立前置守卫
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      // 独立前置守卫
    },
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      redirect: {name: "login"}
    },
  ],
});

export default router;
