<template>
  <div class="login">
    <header>
      <a href="https://github.com/LeroyK111" target="_blank">
        <img src="/icon.png" alt="找不到图片" />
      </a>
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
        color="#000"
      >
        <el-icon><OfficeBuilding /></el-icon>
        {{ item.title }}
    </el-button>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { useRequest } from "@/hooks/request";
import { ref, reactive } from "vue";

const message = [
  { type: "", title: "组 织 信 息", icon: "" },
  { type: "", title: "语 言 选 择", icon: "" },
];

const { res } = useRequest("src/assets/swiper.json");
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

    img {
      position: absolute;
      height: 80%;
      top: 0.5vw;
      right: 1vw;
      border-radius: 20%;
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
  }
}
</style>
