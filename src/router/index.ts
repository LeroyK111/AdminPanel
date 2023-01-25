import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import { useAuthUser } from "@/hooks/useCrypto";
import { ref } from "vue";

const { checkTokenTimeOut } = useAuthUser();

// 鉴权, 不适合vuehook，但可以用纯粹的js
const funcToken = () => {
  const token = ref()

  const getToken = () => {
    token.value = localStorage.getItem("token") as string
  }

  const removeToken = ()=>{
    localStorage.removeItem("token")
  }
  return {getToken, token, removeToken};
};

const {token, getToken, removeToken} = funcToken()



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      beforeEnter: (to, from) => {
        getToken()
        if (token.value && checkTokenTimeOut(token.value)) {
          return true
        }
        removeToken()
        router.push("/login")
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      // 独立前置守卫
      beforeEnter: (to, from)=>{
        getToken()
        if (token.value){
          router.push("/home")
        }
      }
    },
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      redirect: { name: "login" },
    },
  ],
});

export default router;
