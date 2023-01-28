<template>
  <div :class="!isWidth? 'homenavbar': 'homenavbar2'">
    <el-icon @click="isChangeWidth" class="DArrowRight" color="rgb(140, 140, 140)" size="30px"><DArrowRight v-if="!isWidth"/><DArrowLeft v-else/></el-icon>
    <div class="avatar">
      <el-avatar
        :src="data.userinfo.icon"
        @error="errorHandler"
        :size="45"
        class="icon"
      >
      <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
    </el-avatar>
      <div class="nickname">{{data.userinfo.nickname}}</div>
    </div>
    <div class="iconFonts" @click="goChild(item)" v-for="(item, index) in functionList.icons" :key="index">
      <svg class="iconFont" aria-hidden="true">
        <use :xlink:href="item"></use>
      </svg>
      <div class="iconTitle">
      {{ functionList.iconsTitle[index] }}
      </div>
    </div>
    <el-link class="logout" :underline="false" @click="logout">
      <div>
        <el-icon><SwitchButton /></el-icon>
        {{ beTitles.logout }}
      </div>
    </el-link>
  </div>
</template>
<script  setup lang="ts">
import {ref, reactive, watch, watchEffect} from "vue"
import { useToken } from "@/stores/authUser"
import router from "@/router";
// 带着token去请求数据，权限，用户信息等
import { useRequest } from "@/hooks/userequest";
import { useTranslate } from "@/hooks/useTranslate";
import { useLanguage } from "@/stores/recordLanguage";
import {SwitchButton, DArrowRight, DArrowLeft} from "@element-plus/icons-vue";
// 引入字体js文件
import "@/assets/fonts/iconfont.js"










const goChild = (url: string)=>{  
  switch (url) {
    case "#icon-shujutongji":
      router.push({name:"datagraph"});
      break;
    case "#icon-wangdian":
      router.push({name:"gismap"});
      break;
    case "#icon-shezhi":
      router.push({name:"settings"});
      break;
    case "#icon-quanbu":
      router.push({name:"functions"});
      break;
    case "#icon-bangzhuzhongxin":
      router.push({name:"help"});
      break;
  }
}







const beTitles = reactive({
  logout: "退出登录",
})


const emit = defineEmits(["changeWidth"])
const isWidth = ref(false)

const functionList = reactive({
  icons:["#icon-shujutongji", "#icon-wangdian", "#icon-shezhi", "#icon-quanbu", "#icon-bangzhuzhongxin"],
  iconsTitle: reactive(["数据图表", "GIS地图", "设置", "功能", "帮助"])
})





const store = useLanguage()
// 读取存储数据
store.$hydrate({ runHooks: false })


watchEffect(async ()=>{
  beTitles.logout = await useTranslate(beTitles.logout, store.oldLanguage, store.Language)
  functionList.iconsTitle.map(async (item, index)=>{
    functionList.iconsTitle[index] = await useTranslate(item, store.oldLanguage, store.Language)
  })
})






const isChangeWidth = ()=>{
  emit("changeWidth")
  isWidth.value = isWidth.value?false:true
}


const errorHandler = () => true







const data = reactive<{[kay: string]: any}>({
  userinfo: reactive({
    icon: "",
    nickname: "",
    authLevel: 0
  }),
  status: 0
})

const authUrl = "/userinfo.json"

const userinfo = async (url: string)=>{

  console.log();
  

  const res = await useRequest(url)
  if (res.status === -1) {
    data.status = res.status
  } else {
    data.status = res.status
    Object.assign(data.userinfo, res.data.userinfo)
  }
}
userinfo(authUrl)


watch(()=>data.status, (statue)=>{
  if (statue === -1) {
    userinfo(authUrl)
  }
})








const useTo = useToken()

const logout = ()=>{
  useTo.removeToken();
  router.push("/login")
}




</script>
<style lang="less" scoped>
.homenavbar {
  height: 100vh;
  border-right: 1px #ccc;
  position: relative;
  display: flex;
  flex-direction: column;
  font-family: 'SmileySans', 'Courier New', Courier, monospace;
  overflow: hidden;


  .iconFonts {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    cursor: pointer;

    &:hover {
      background-color: #f3d19e;
    }

    .iconTitle {
      width: 100%;
      text-align: center;
      font-size: 12px;
      margin-top: 3px;
    }


    .iconFont {
      height: 45px;
      width: 100%;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  }

  .DArrowRight {
    display: block;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    cursor: pointer;

    &:hover {
      color: skyblue;
    }
  }


  .avatar {
    margin: 5px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    height: 70px;
    width: 100%;
    cursor: pointer;

    .icon {
      border: #ccc 1px solid;
    }

    .nickname {
      font-size: 12px;
      font-weight: bold;
    }
  }





  .logout {
    position: absolute;
    width: 100%;
    height: 45px;
    bottom: 0px;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}





.homenavbar2 {
  height: 100vh;
  border-right: 1px #ccc;
  position: relative;
  display: flex;
  flex-direction: column;


  .iconFonts {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    cursor: pointer;

    &:hover {
      background-color: #f3d19e;
    }

    .iconTitle {
      width: 100%;
      text-align: center;
      font-size: 15px;
    }


    .iconFont {
      height: 45px;
      width: 100%;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  }

  .DArrowRight {
    display: block;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    cursor: pointer;

    &:hover {
      color: skyblue;
    }
  }


  .avatar {
    margin: 5px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    height: 70px;
    width: 100%;
    cursor: pointer;

    .icon {
      border: #ccc 1px solid;
    }

    .nickname {
      font-size: 12px;
      font-weight: bold;
    }
  }





  .logout {
    position: absolute;
    width: 100%;
    height: 45px;
    bottom: 0px;

    span {
      div {
        width: 198px;
        height: 45px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        
        i {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>