<template>
  <div class="login">
    <header>
      <!-- 插入一张图片 -->
    </header>
    <section>
      <!-- 轮播图 -->
      <aside>
        <!-- 点我刷新轮播图 -->
        <p>{{ res.data.data }}</p>
      </aside>
    </section>
    <footer>
      <!-- 放入网站信息 -->
    </footer>
  </div>
</template>
<script setup lang="ts">
import { useRequest } from "@/hooks/request";
import { ref } from "vue";



const {res} = useRequest("src/assets/swiper.json");














</script>
<style lang="less" scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #eee;
}
</style>
