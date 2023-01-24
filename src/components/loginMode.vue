<template>
  <div class="login" @keyup.enter="btnLogin">
    <div class="logo">
      {{ labelText.logo }}
    </div>
    <div class="model">
      <div class="username">
        <el-input
          v-model="username"
          :placeholder="labelText.username"
          :minlength="5"
          validate-event
          :maxlength="100"
          autofocus
          @input="checkUsername"
        >
        <template #prefix><el-icon><CircleCloseFilled color="red" v-if="checkStatus.username === -1"/><SuccessFilled v-else-if="checkStatus.username===1" color="#2dcc9f"/>
          <QuestionFilled v-else/>
        </el-icon></template>
      </el-input>
      </div>
      <div class="password">
        <el-input
          v-model="password"
          type="password"
          :minlength="5"
          :maxlength="100"
          :placeholder="labelText.password"
          show-password
          @input="checkPassword"
        >
        <template #prefix>
          <el-icon>
            <CircleCloseFilled color="red" v-if="checkStatus.password===-1"/>
            <SuccessFilled v-else-if="checkStatus.password===1" color="#2dcc9f"/>
            <QuestionFilled v-else/>
          </el-icon>
        </template>
      </el-input>
      </div>
      <div class="vcode">
        <el-image
          class="codeImg"
          :src="imgDataURL"
          fit="contain"
          @click="changeCode"
        />
        <el-input
          class="codeInput"
          v-model="code"
          :placeholder="labelText.vcode"
          @input="checkVcode"
        >
        <template #prefix><el-icon><CircleCloseFilled color="red" v-if="checkStatus.vcode===-1"/><SuccessFilled  v-else-if="checkStatus.vcode===1" color="#2dcc9f"/><QuestionFilled v-else/></el-icon></template>
      </el-input>
      </div>
    </div>
    <div class="btnLogin">
      <el-button type="primary" @click="btnLogin" :loading="loading">
        {{ labelText.btnLogin }}
      </el-button>
    </div>
    <div class="linkRegister">
      <el-link @click="linkReset">
        <el-icon><DArrowLeft /></el-icon>{{ labelText.linkReset }}
      </el-link>
      <el-link @click="linkRegister">
        {{ labelText.linkRegister }}<el-icon><DArrowRight /></el-icon>
      </el-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useLanguage } from "@/stores/recordLanguage";
import { useTranslate } from "@/hooks/useTranslate";
import { reactive, ref, watchEffect } from "vue";
// 需要时再用真实请求
// import { useRequest } from "@/hooks/request";
import { DArrowRight, DArrowLeft, CircleCloseFilled,SuccessFilled,QuestionFilled } from "@element-plus/icons-vue";

// 生成随机验证码，本来应该选择请求后端。
import verification from "verification-code";
import { ElMessageBox } from "element-plus";
// 权限操作
import { useAuthUser } from "@/hooks/useCrypto"
import { useToken } from "@/stores/authUser";
// 编程式路由
import router from "@/router";
import { value } from "dom7";

const { setToken, getToken, isToken } = useToken()

let result = verification.create();
const vcode = ref(result.code);
const imgDataURL = ref(result.dataURL);
const username = ref("");
const password = ref("");
const code = ref("");

const checkStatus = reactive({
  username: 0,
  password: 0,
  vcode: 0,
})


const loading = ref(false);


const labelText = reactive<any>({
  username: "用户名",
  password: "密码",
  btnLogin: "登录",
  linkRegister: "注册账号",
  linkReset: "忘记密码",
  vcode: "验证码",
  logo: "管理页面",
  errMessage: "验证失败，请重试!",
  errTitle: "提示",
});

const changeCode = () => {
  result = verification.create();
  vcode.value = result.code;
  imgDataURL.value = result.dataURL;
};



const checkUsername = ()=>{
  const l = username.value.length
  if (l<5 || l>100){
    checkStatus.username = -1
  } else {
    checkStatus.username = 1
  }
}

const checkPassword = ()=>{
  const l = password.value.length
  if (l<5 || l>100){
    checkStatus.password = -1
  }else {
    checkStatus.password = 1
  }
}


const checkVcode = ()=>{
  const l = password.value.length
  if (code.value !== vcode.value){
    checkStatus.vcode = -1
  } else {
    checkStatus.vcode = 1
  }
}













const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const btnLogin = async (event: Event) => {
  if (loading.value) {
    // TODO document why this block is empty
    return null;
  }
  
  loading.value = true;
  // 模仿数据请求
  await wait(2000);

  if (
    username.value === "admin" &&
    password.value === "admin" &&
    vcode.value === code.value
  ) {
    // 请求验证成功
    loading.value = false;
    // 保存加密后的token
    const { token } = useAuthUser("admin", "admin")
    setToken(token.value)
    
    // 跳转路由拦截页面(必须后端验证)，不记录历史
    router.replace({ path: '/home' })

  } else {
    // 请求失败
    changeCode();
    ElMessageBox.alert(labelText.errMessage, labelText.errTitle, {
      confirmButtonText: "OK",
      showClose: false,
      callback: ()=>{
        setTimeout(() => {
          loading.value = false;
        }, 500);
      }
    });
  }
};


const linkRegister = () => {
  console.log("弹出对话框，形成遮盖");
};

const linkReset = () => {
  console.log("弹出对话框");
};


























const Lang = useLanguage();

watchEffect(() => {
  Object.keys(labelText).map(async (key: string) => {
    labelText[key] = await useTranslate(
      labelText[key],
      Lang.oldLanguage,
      Lang.Language
    );
  });
});
</script>
<style lang="less" scoped>
@font-face {
  font-family: "SmileySans";
  src: url("src/assets/fonts/SmileySans-Oblique.otf.woff2") format("woff2"),
    url("src/assets/fonts/SmileySans-Oblique.ttf.woff2") format("woff2");
}

.login {
  // background-color: rgba(0, 0, 0, .);
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 5%;
  width: 300px;

  .logo {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "SmileySans", "微软雅黑", Courier, monospace;
    font-size: 2.5em;
    font-weight: bold;
    letter-spacing: 0.1em;
    text-transform: capitalize;
    text-align: center;
    width: 100%;
    color: #0096fa;
  }

  .model {
    flex: 4;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .username {
      width: 100%;
    }

    .password {
      width: 100%;
    }

    .vcode {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .codeInput {
        width: 125px;
      }

      .codeImg {
        width: 100px;
        cursor: pointer;
      }
    }
  }

  .btnLogin {
    width: 80%;
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      width: 100%;
    }
  }

  .linkRegister {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    a {
      font-size: 10px;
    }
  }
}
</style>
