import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import { useAuthUser } from "@/hooks/useCrypto";
import { ref } from "vue";
import HomeView from "@/views/HomeView.vue";
// 子组件子路由
import datagraph from "@/components/datagraph.vue"
import homeDefault from "@/components/homeDefault.vue"
import gismap from "@/components/gismap.vue"
import settings from "@/components/settings.vue"
import functions from "@/components/functions.vue"
import help from "@/components/help.vue"

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
      component: HomeView,
      beforeEnter: (to, from) => {
        getToken()
        if (token.value && checkTokenTimeOut(token.value)) {
          return true
        }
        removeToken()
        router.push("/login")
      },
      children: [
        { path: '', component: homeDefault, name: "default"},
        {
          path: "datagraph",
          component: datagraph,
          name: "datagraph"
        },
        {
          path: "gismap",
          component: gismap,
          name: "gismap"
        },
        {
          path: "settings",
          component: settings,
          name: "settings"
        },
        {
          path: "functions",
          component: functions,
          name: "functions"
        },
        {
          path: "help",
          component: help,
          name: "help"
        }
      ]
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
