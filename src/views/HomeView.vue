<script setup lang="ts">
import {ref} from "vue"
import { useToken } from "@/stores/authUser"
import router from "@/router";

const useTo = useToken()


const logout = ()=>{
  useTo.removeToken();
  router.push("/login")
}

</script>




<template>
  <h1>首页</h1>
  <button @click="logout">logout</button>
</template>


<style scoped lang="less">

</style>