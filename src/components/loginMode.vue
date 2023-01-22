<template>
  <div class="login">
    <div class="logo">网站logo</div>
    <div class="model">
      <label for="username">{{ labelText.username }}</label><el-input id="username" v-model="username" placeholder="Please input username" />
      <label for="password">{{ labelText.password }}</label>
      <el-input
    v-model="password"
    type="password"
    id="password"
    placeholder="Please input password"
    show-password
  />
    <el-image class="codeImg" :src="imgDataURL" fit="contain" @click="changeCode"/>
    <el-input v-model="code" placeholder="Please input code"></el-input>
    </div>
    <el-button type="primary">
      登录<el-icon class="el-icon--right"><Upload /></el-icon>
    </el-button>
    <el-link>
      注册账号<el-icon class="el-icon--right"><icon-view /></el-icon>
    </el-link>
  </div>
</template>
<script lang="ts" setup>
import { useLanguage } from "@/stores/recordLanguage"
import { useTranslate } from "@/hooks/useTranslate"
import { reactive, ref } from "vue"
import { useRequest } from "@/hooks/request";
// 生成随机验证码，本来应该选择请求后端。
import verification from 'verification-code';
let result = verification.create()

const vcode = ref(result.code)
const imgDataURL = ref(result.dataURL)


const username = ref('')
const password = ref('')
const code = ref("")
const labelText = reactive({
  username: '用户名',
  password: '密码'
})


const changeCode = ()=>{
  result = verification.create()
  vcode.value = result.code
  imgDataURL.value = result.dataURL
}









</script>
<style lang="less" scoped>
.login {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 5%;

  .logo {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  
}
</style>