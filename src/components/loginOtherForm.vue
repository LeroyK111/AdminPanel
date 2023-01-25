<template>
    <el-dialog :before-close="closeDialog" :title="type? message.title[0]: message.title[1]" :append-to-body="true" width="380px" draggable v-model="switchDialog" class="dialog">
    <el-form :model="form" class="form">
      <el-form-item class="Register" :label="message.input2[key]" v-for="key in Object.keys(message.input2)" :key="key" v-if="!type">
        <el-input v-model="form[key]" :placeholder="message.input2[key]" autocomplete="off" v-if="key === 'userName'"/>
        <el-input v-model="form[key]" :placeholder="message.input2[key]" autocomplete="off" type="password" show-password v-else/>
      </el-form-item>
      <el-form-item class="select" :label="message.select">
        <el-select v-model="useSelect" :placeholder="message.select">
          <el-option
            v-for="key in Object.keys(message.input1)"
            :key="key"
            :value="key"
            :label="message.input1[key]"
          />
        </el-select>
        <el-input v-model="form.userEmail" type="email" autocomplete="off" v-if="useSelect === 'userEmail'" placeholder="email"/>
        <el-input v-else-if="useSelect === 'phone'" v-model="form.phone" type="tel" autocomplete="off" placeholder="phone"/>
      </el-form-item>
      <el-form-item class="vcode" :label="message.vcode">
        <el-image :src="vcode.src" fit="cover" @click="refreshVCode"/>
        <el-input v-model="form.vcode" autocomplete="off" :placeholder="message.vcode"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">{{message.cancel}}</el-button>
        <el-button type="primary" @click="ResetTip" :loading="loading" v-if="type">{{message.confirm[0]}}</el-button>
        <el-button type="primary" @click="RegisterTip" :loading="loading" v-else>{{message.confirm[1]}}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {computed, reactive, ref, watchEffect} from "vue";
// import {useRequest} from "@/hooks/userequest";
import verification from "verification-code";
import { useLanguage } from "@/stores/recordLanguage";
import { useTranslate } from "@/hooks/useTranslate";

const loading = ref(false);


const wait = (ms:any)=> new Promise((resolve)=>{setTimeout(resolve, ms)})


const ResetTip = async ()=>{
  loading.value = true
  await wait(3000)
  loading.value = false
  alert("You should write your own interface.")
}


const RegisterTip = async ()=>{
  loading.value = true
  await wait(3000)
  loading.value = false
  alert("You should write your own interface.")
}




















const result = verification.create();
const vcode = reactive({
  src: result.dataURL,
  code: result.code
});



const Language = useLanguage()
const useSelect = ref('userEmail')


const message = reactive<any>({
  cancel: "取消",
  confirm: reactive(["确认", "注册"]),
  title: reactive(["忘记密码", "注册账号"]),
  select: "找回方式",
  vcode: "验证码",
  input1: reactive({userEmail:"注册邮箱", phone:"电话"}),
  input2: reactive({userName:"用户名", passWord:"密码", rePassWord:"确认密码"}),
})


function arrTr(data: [any]){
  data.map(async (d: string, index: number) =>{
    data[index] = await useTranslate(d, Language.oldLanguage, Language.Language)
  })
}



async function objTr(data: {[key: string]: string}) {
  for (const key in data) {
    data[key] = await useTranslate(data[key], Language.oldLanguage, Language.Language)
  }
}




watchEffect(async ()=>{
  for (const key in message) {
    if (typeof message[key] === "string") {
      message[key] = await useTranslate(message[key], Language.oldLanguage, Language.Language)
    } else if (typeof message[key] as any === "array") {
      arrTr(message[key])
    } else {
      objTr(message[key])
    }
  }
})




const form = reactive<any>({
  userEmail: "",
  vcode: "",
  userName: "",
  passWord: "",
  rePassWord: "",
  phone: ""
})


const props = defineProps(["type", "switchDialog"])
const switchDialog = computed({
  get() {return props.switchDialog},
  set() {return props.switchDialog},
})
const type = computed({
  get() {return props.type === "Reset"? true:false},
  set() {return props.type === "Reset"? true:false},
})


const emits = defineEmits(["closeDialog"])
const closeDialog = ()=>{
  emits("closeDialog")
}
const refreshVCode = ()=>{
  const result = verification.create();
  vcode.code = result.code
  vcode.src = result.dataURL
} 











</script>
<style lang="less" scoped>
.dialog {
  .form {

    .select {
      .el-form-item__content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .el-select {
          width: 100%;
          margin-bottom: 5px;
        }

        .el-input {
          width: 100%;
        }
      }
    }

    .vcode {
      .el-form-item__content {
        display: flex;

        .el-image {
          cursor: pointer;
          width: 90px;
          margin-right: 5px;
        }

        .el-input {
          flex: 1;
        }
      }
    }
  }
}
</style>