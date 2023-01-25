import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useToken = defineStore("useToken", () => {
  const token = ref();

  const setToken = (src: string = token.value) => {
    localStorage.setItem("token", src);
  };

  const getToken = () => {
    token.value = localStorage.getItem("token") as string;
  };

  const removeToken = ()=>{
    localStorage.removeItem("token");
    token.value = "";
  }

  const isToken = computed(() => (token.value? true : false));

  return { token, setToken, getToken, isToken, removeToken };
});
