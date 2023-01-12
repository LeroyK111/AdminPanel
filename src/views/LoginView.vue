<template>
  <div class="login">
    <header>
      <!-- 插入一张图片 -->
    </header>
    <section>
      <!-- 轮播图 -->
      <aside>
        <div>
          x:<p>{{ x }}</p>
          y:<p>{{ y }}</p>
          x+y: <p>{{ xy }}</p>
        </div>
        <!-- 刷新背景图按钮 -->
        <button @click="update">点我刷数据</button>
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


// 直接请求数据
const {res} = useRequest("")














</script>
<style lang="less" scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #eee;
}
</style>
