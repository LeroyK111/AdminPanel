<template>
  <div class="login">
    <header>
      <el-avatar class="el-avatar" :size="45" shape="square" fit="fill" @error="true" @click="urlblank">
        <img src="/icon.png" />
      </el-avatar>
    </header>
    <section>
      <!-- 轮播图 -->
      
      <aside></aside>
    </section>
    <footer>
      <el-button
        v-for="(item, index) in message"
        :key="index"
        :type="item.type"
        text
        size="small"
        @click="handleMessage(item.icon)"
      >
        <el-icon v-if="item.icon === 'OfficeBuilding'"
          ><OfficeBuilding
        /></el-icon>
        <el-icon v-else-if="item.icon === 'Operation'"><Operation /></el-icon>
        <span></span>
        <default>{{ item.title }}</default>
      </el-button>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { useRequest } from "@/hooks/request";
import { ref, reactive} from "vue";
import { OfficeBuilding, Operation } from "@element-plus/icons-vue";



const message = [
  { type: "success", title: "组 织 信 息", icon: "OfficeBuilding" },
  { type: "success", title: "语 言 选 择", icon: "Operation" },
];

const { res } = useRequest("src/assets/swiper.json");

const handleMessage = (icon: string) => {
  if (icon === "OfficeBuilding") {
    console.log(111);
  } else if (icon === "Operation") {
    console.log(222);
  }
};


const urlblank = () => {
  window.open("https://github.com/LeroyK111", "_blank")
};















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

    .el-avatar {
        position: absolute;
        height: 80%;
        top: 0.5vw;
        right: 1vw;
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
      padding-left: 30px;
  }
}
</style>
