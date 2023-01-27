<template>
  <div>
    
    
    
    <button @click="logout">logout</button>
  </div>
</template>
<script  setup lang="ts">
import {ref, reactive} from "vue"
import { useToken } from "@/stores/authUser"
import router from "@/router";
// 带着token去请求数据，权限，用户信息等
import { useRequest } from "@/hooks/userequest";



const data = reactive<{}>({})

const authUrl = "/userinfo.json"

const userinfo = async (url: string)=>{
  const res = await useRequest(url)
  if (res.status === -1) {
    alert("请求失败!")
  } else {
    console.log(res.data);
  }
}



userinfo(authUrl)









const useTo = useToken()
const logout = ()=>{
  useTo.removeToken();
  router.push("/login")
}




</script>
<style lang="less" scoped>
  div {
    height: 100vh;
    background-color: #ccc;
  }
</style>