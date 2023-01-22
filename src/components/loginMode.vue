<template>
  <div class="login">
    <div class="logo">网站logo</div>
    <div>
      
      <el-input v-model="username" placeholder="Please input username" />
      <el-input
    v-model="password"
    type="password"
    placeholder="Please input password"
    show-password
  />
      
    </div>
    <button>登录按钮</button>
    <div>注册账号
      
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useLanguage } from "@/stores/recordLanguage"
import { useTranslate } from "@/hooks/useTranslate"
import { reactive, ref } from "vue"
import { useRequest } from "@/hooks/request";




const username = ref('')
const password = ref('')












</script>
<style lang="less" scoped>
.login {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 5%;
}
</style>