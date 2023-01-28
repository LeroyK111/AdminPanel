<template>
  <div class="login">
    <header>
      <el-avatar class="el-avatar" :size="45" shape="square" fit="fill" @error="true" @click="urlblank">
        <img src="@/assets/imgs/icon.png" />
      </el-avatar>
    </header>
    <section>
      <LoginMode class="loginMode">
      </LoginMode>
      <swiperBack class="swiperBack" v-bind="response" v-if="response.status !== -1" />
      <div v-else class="noSwiper"></div>
      <aside @click="handleAside">
        <div class="la-square-jelly-box la-2x">
          <div>
            <el-icon :size="40" color=" #73767a" class="refresh">
              <RefreshRight />
            </el-icon>
            </div>
            <div></div>
            </div>
            </aside>
            </section>
            <footer>
              <el-dropdown v-for="(item, index) in message" :key="index" placement="top" trigger="click" :max-height="200">
                <el-button :type="item.type" text size="small">
                  <el-icon v-if="item.icon === 'OfficeBuilding'">
                    <OfficeBuilding />
                  </el-icon>
                  <el-icon v-else-if="item.icon === 'Operation'">
                    <Operation />
                  </el-icon>
                  <span></span>
                  <default :class="footerDefault == 1 ? 'dropdownBut' : ''">{{ item.title }}</default>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu v-if="item.icon === 'OfficeBuilding'">
                    <el-dropdown-item class="dropdown-item" v-for="(i, idx) in item.message" :key="idx">{{
                      i.Language === "中文" ?
                      "公司" : "Company"
                      }}:
              {{ i.Company }}</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu v-else-if="item.icon === 'Operation'">
            <el-dropdown-item @click="handleMessage(i)" v-for="(i, idx) in item.message" :key="idx">{{
              i
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <nowDatetime class="nowDatetime"></nowDatetime>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { useRequest } from "@/hooks/userequest.js"
import { ref, reactive, watchEffect, toRefs, onMounted } from "vue"
import { OfficeBuilding, Operation, RefreshRight } from "@element-plus/icons-vue"
import nowDatetime from "@/components/nowDatetime.vue"
import swiperBack from "@/components/swiperBack.vue"
import LoginMode from "@/components/loginMode.vue"
import { useLanguage } from "@/stores/recordLanguage"
import { useTranslate } from "@/hooks/useTranslate"
import { ElMessage } from 'element-plus'


const response = reactive({
  data: {},
  status: 0
});
const group = ref(1)


const swiperUrl = "/swiper.json"

watchEffect(async () => {
  const res = await useRequest(swiperUrl, { data: { group: group.value } });
  response.data = res.data
  response.status = res.status
  group.value = res.data.group
})



const footerDefault = ref(1)
const errMessage = reactive({ flag: 0, message: "Sorry, Language switching failure." })




function handleAside() {
  group.value++
}






const store = useLanguage()

const handleMessage = (i: string) => {
  store.setLanguage(i);
}



const Translate = (i: any) => {
  useTranslate(i.title, store.oldLanguage, store.Language).then(res => {
    ElMessage.closeAll()
    i.title = res
    if (['zh', 'jp'].includes(store.Language)) {
      footerDefault.value = 1
    } else {
      footerDefault.value = 0
    }
    localStorage.setItem("message", JSON.stringify(message))
  }, (err) => {
    if (errMessage.flag < 1) {
      ElMessage({
        message: errMessage.message,
        type: 'error',
        customClass: "errMessage",
        duration: 3000,
        appendTo: document.querySelector("#app") as HTMLElement
      })
      errMessage.flag += 1
    } else {
      errMessage.flag = 0
    }
  })
}





let objMessage: any;


watchEffect(() => {
  if (localStorage.getItem("message")) {
    objMessage = JSON.parse(localStorage.getItem("message") as string)

    if (['zh', 'jp'].includes(store.Language)) {
      footerDefault.value = 1
    } else {
      footerDefault.value = 0
    }
  } else {
    const title = ""
    objMessage = [{ title }, { title }]
  }
})






const urlblank = () => {
  window.open("https://github.com/LeroyK111", "_blank");
}


const message = reactive<Array<{ type: string, title: string, icon: string, message: any }>>([
  {
    type: "success",
    title: objMessage[0].title || "公司",
    icon: "OfficeBuilding",
    message: [
      {
        Language: "English",
        Company: "I really want to, but I'm still looking for a job.",
      },
      { Language: "中文", Company: "真的想写，但我还在找工作。" },
    ],
  },
  {
    type: "success",
    title: objMessage[1].title || "语言",
    icon: "Operation",
    message: ["English", "简体中文", "日本語", "Русский", "Français", "Español", "عربي"],
  },
])






store.$subscribe(() => {
  message.forEach((i) => {
    Translate(i)
  })
})





















</script>
<style lang="less" scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #eee;





  header {
    position: absolute;
    height: 60px;
    width: 100vw;
    background: transparent;
    top: 0;
    left: 0;
    z-index: 20;

    .el-avatar {
      position: absolute;
      height: 80%;
      top: 1vh;
      right: 1vh;
      cursor: pointer;
    }
  }

  section {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    padding-bottom: 30px;

    .loginMode {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -70%);
      z-index: 15;
      width: 300px;
      height: 400px;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.6);
    }

    .swiperBack {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    .noSwiper {
      background: url("./swiperImg/1.jpg") no-repeat;
      background-size: 100% 100%;
      width: 100%;
      height: 100%;
      position: absolute;
    }




    &::after {
      position: absolute;
      z-index: 11;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      content: "";
      /* From https://css.glass */
      background: rgba(255, 255, 255, 0.01);
      backdrop-filter: blur(2.6px);
      -webkit-backdrop-filter: blur(.5px);
    }


    aside {
      z-index: 20;
      position: absolute;
      right: 7vh;
      bottom: 10vh;
      cursor: pointer;

      .la-square-jelly-box,
      .la-square-jelly-box>div {
        position: relative;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }


      .la-square-jelly-box.la-2x {
        width: 50px;
        height: 50px;
      }

      .la-square-jelly-box {
        display: block;
        font-size: 0;
        color: #fff;
      }

      .la-square-jelly-box.la-dark {
        color: #333;
      }

      .la-square-jelly-box>div {
        display: inline-block;
        float: none;
        background-color: currentColor;
        border: 0 solid currentColor;
      }


      .la-square-jelly-box>div:nth-child(1),
      .la-square-jelly-box>div:nth-child(2) {
        position: absolute;
        left: 0;
        width: 100%;
      }

      .la-square-jelly-box>div:nth-child(1) {
        top: -25%;
        z-index: 1;
        height: 100%;
        border-radius: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .la-square-jelly-box>div:nth-child(2) {
        bottom: -9%;
        height: 10%;
        background: #000;
        border-radius: 50%;
        opacity: .2;
      }


      .la-square-jelly-box>div:nth-child(2):hover {
        -webkit-animation: square-jelly-box-shadow .6s -.1s linear infinite;
        -moz-animation: square-jelly-box-shadow .6s -.1s linear infinite;
        -o-animation: square-jelly-box-shadow .6s -.1s linear infinite;
        animation: square-jelly-box-shadow .6s -.1s linear infinite;
      }

      .la-square-jelly-box>div:nth-child(1):hover {
        -webkit-animation: square-jelly-box-animate .6s -.1s linear infinite;
        -moz-animation: square-jelly-box-animate .6s -.1s linear infinite;
        -o-animation: square-jelly-box-animate .6s -.1s linear infinite;
        animation: square-jelly-box-animate .6s -.1s linear infinite;


        .refresh {
          -webkit-animation: refresh-box .6s -.1s linear infinite;
          -moz-animation: refresh-box .6s -.1s linear infinite;
          -o-animation: refresh-box .6s -.1s linear infinite;
          animation: refresh-box .6s -.1s linear infinite;
        }
      }





      @media screen and (max-width: 1000px) {
        .la-square-jelly-box>div:nth-child(1) {
          -webkit-animation: square-jelly-box-animate .6s -.1s linear infinite;
          -moz-animation: square-jelly-box-animate .6s -.1s linear infinite;
          -o-animation: square-jelly-box-animate .6s -.1s linear infinite;
          animation: square-jelly-box-animate .6s -.1s linear infinite;
        }

        .la-square-jelly-box>div:nth-child(2) {
          -webkit-animation: square-jelly-box-shadow .6s -.1s linear infinite;
          -moz-animation: square-jelly-box-shadow .6s -.1s linear infinite;
          -o-animation: square-jelly-box-shadow .6s -.1s linear infinite;
          animation: square-jelly-box-shadow .6s -.1s linear infinite;
        }

        .refresh {
          -webkit-animation: refresh-box .6s -.1s linear infinite;
          -moz-animation: refresh-box .6s -.1s linear infinite;
          -o-animation: refresh-box .6s -.1s linear infinite;
          animation: refresh-box .6s -.1s linear infinite;
        }
      }


      @keyframes refresh-box {

        0% {
          -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          transform: rotate(0deg);
        }

        100% {
          -webkit-transform: rotate(360deg);
          -moz-transform: rotate(360deg);
          -o-transform: rotate(36deg);
          transform: rotate(360deg);
        }
      }

      @-webkit-keyframes square-jelly-box-animate {
        17% {
          border-bottom-right-radius: 10%;
        }

        25% {
          -webkit-transform: translateY(25%) rotate(22.5deg);
          transform: translateY(25%) rotate(22.5deg);
        }

        50% {
          border-bottom-right-radius: 100%;
          -webkit-transform: translateY(50%) scale(1, .9) rotate(45deg);
          transform: translateY(50%) scale(1, .9) rotate(45deg);
        }

        75% {
          -webkit-transform: translateY(25%) rotate(67.5deg);
          transform: translateY(25%) rotate(67.5deg);
        }

        100% {
          -webkit-transform: translateY(0) rotate(90deg);
          transform: translateY(0) rotate(90deg);
        }
      }

      @-moz-keyframes square-jelly-box-animate {
        17% {
          border-bottom-right-radius: 10%;
        }

        25% {
          -moz-transform: translateY(25%) rotate(22.5deg);
          transform: translateY(25%) rotate(22.5deg);
        }

        50% {
          border-bottom-right-radius: 100%;
          -moz-transform: translateY(50%) scale(1, .9) rotate(45deg);
          transform: translateY(50%) scale(1, .9) rotate(45deg);
        }

        75% {
          -moz-transform: translateY(25%) rotate(67.5deg);
          transform: translateY(25%) rotate(67.5deg);
        }

        100% {
          -moz-transform: translateY(0) rotate(90deg);
          transform: translateY(0) rotate(90deg);
        }
      }

      @-o-keyframes square-jelly-box-animate {
        17% {
          border-bottom-right-radius: 10%;
        }

        25% {
          -o-transform: translateY(25%) rotate(22.5deg);
          transform: translateY(25%) rotate(22.5deg);
        }

        50% {
          border-bottom-right-radius: 100%;
          -o-transform: translateY(50%) scale(1, .9) rotate(45deg);
          transform: translateY(50%) scale(1, .9) rotate(45deg);
        }

        75% {
          -o-transform: translateY(25%) rotate(67.5deg);
          transform: translateY(25%) rotate(67.5deg);
        }

        100% {
          -o-transform: translateY(0) rotate(90deg);
          transform: translateY(0) rotate(90deg);
        }
      }

      @keyframes square-jelly-box-animate {
        17% {
          border-bottom-right-radius: 10%;
        }

        25% {
          -webkit-transform: translateY(25%) rotate(22.5deg);
          -moz-transform: translateY(25%) rotate(22.5deg);
          -o-transform: translateY(25%) rotate(22.5deg);
          transform: translateY(25%) rotate(22.5deg);
        }

        50% {
          border-bottom-right-radius: 100%;
          -webkit-transform: translateY(50%) scale(1, .9) rotate(45deg);
          -moz-transform: translateY(50%) scale(1, .9) rotate(45deg);
          -o-transform: translateY(50%) scale(1, .9) rotate(45deg);
          transform: translateY(50%) scale(1, .9) rotate(45deg);
        }

        75% {
          -webkit-transform: translateY(25%) rotate(67.5deg);
          -moz-transform: translateY(25%) rotate(67.5deg);
          -o-transform: translateY(25%) rotate(67.5deg);
          transform: translateY(25%) rotate(67.5deg);
        }

        100% {
          -webkit-transform: translateY(0) rotate(90deg);
          -moz-transform: translateY(0) rotate(90deg);
          -o-transform: translateY(0) rotate(90deg);
          transform: translateY(0) rotate(90deg);
        }
      }

      @-webkit-keyframes square-jelly-box-shadow {
        50% {
          -webkit-transform: scale(1.25, 1);
          transform: scale(1.25, 1);
        }
      }

      @-moz-keyframes square-jelly-box-shadow {
        50% {
          -moz-transform: scale(1.25, 1);
          transform: scale(1.25, 1);
        }
      }

      @-o-keyframes square-jelly-box-shadow {
        50% {
          -o-transform: scale(1.25, 1);
          transform: scale(1.25, 1);
        }
      }

      @keyframes square-jelly-box-shadow {
        50% {
          -webkit-transform: scale(1.25, 1);
          -moz-transform: scale(1.25, 1);
          -o-transform: scale(1.25, 1);
          transform: scale(1.25, 1);
        }
      }
    }
  }





  footer {
    position: absolute;
    height: 30px;
    width: 100vw;
    bottom: 0px;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    padding-left: 20px;
    z-index: 20;
    border-top: rgba(255, 255, 255, .7);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;


    .nowDatetime {
      color: #dedfe0;
      font-size: 12px;
      font-weight: bold;
      position: absolute;
      right: 20px;
    }

    .dropdownBut {
      letter-spacing: .4em
    }
  }
}
</style>
