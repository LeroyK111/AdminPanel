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
    <el-image class="codeImg" :src="imgDataURL" fit="cover" @click="changeCode"/>
    <el-input v-model="code" placeholder="Please input code"></el-input>
    </div>
    <div class="btnLogin">
      <el-button type="primary" @click="btnLogin" :loading="loading">
      {{ labelText.btnLogin }}
    </el-button>
    </div>
    <div class="linkRegister">
      <el-link @click="linkRegister">
      {{ labelText.linkRegister }}<el-icon><DArrowRight /></el-icon>
    </el-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useLanguage } from "@/stores/recordLanguage"
import { useTranslate } from "@/hooks/useTranslate"
import { reactive, ref } from "vue"
import { useRequest } from "@/hooks/request";
import { DArrowRight } from "@element-plus/icons-vue"
import {useAuthUser }from "@/stores/authUser"
// 生成随机验证码，本来应该选择请求后端。
import verification from 'verification-code';
let result = verification.create()

const vcode = ref(result.code)
const imgDataURL = ref(result.dataURL)


const username = ref('')
const password = ref('')
const loading = ref(false)

const code = ref("")
const labelText = reactive({
  username: '用户名',
  password: '密码',
  btnLogin: "登录",
  linkRegister: "注册账号"
})




const changeCode = ()=>{
  result = verification.create()
  vcode.value = result.code
  imgDataURL.value = result.dataURL
}

const wait = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));


const btnLogin = async () => {
  loading.value = true
  // 模仿数据请求
  await wait(2000)
  loading.value = false
  if (username.value === "admin" && password.value === "admin" && vcode.value===code.value ) {
    console.log("验证成功，跳转路由拦截页面(必须后端验证)，保存加密后的token");
  } else {
    changeCode()
    console.log("验证失败, 弹窗提示");
  }
}


const linkRegister = ()=>{
  console.log("弹出对话框，形成遮盖");
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

  .model {
    .codeImg {
      cursor: pointer;
    }
  }

  .btnLogin {
    font-size: 45px;
  }


}
</style>