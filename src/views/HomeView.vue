<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="asideWidth" class="aside">
        <Homenavbar @changeWidth="changeWidth"/>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import Homenavbar from '@/components/homenavbar.vue';
import { ref } from 'vue';


const asideWidth = ref("60px")

const changeWidth = ()=>{
  asideWidth.value = asideWidth.value === "60px"? "200px": "60px"
}






</script>







<style scoped lang="less">
.common-layout {
  .aside {
    border-right: 2px #ccc solid;
    box-shadow: 1px 2px 2px #ccc;
    z-index: 15;
    transition: width .5s ease-in-out;
    position: fixed;
    background-color: #fff;
  }
  .main {
    z-index: 10;
    padding: 0 0 0 65px;
  }
}
</style>