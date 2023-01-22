<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="less">
// 全局样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

.errMessage {
  position: absolute;
  background-color: #fef0f0;
  left: 50%;
  color: #f56c6c;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 250px;
  height: 45px;
  padding: 0 10px;
  transform: translate(-50%, 0);
  border-radius: 5px;
  font-size: .8em;

  animation: errMessage 1.7s linear alternate 2;


  @keyframes errMessage {
    0% {
      opacity: 0;
      top: -16px;
    }

    100% {
      opacity: 1;
      top: 16px
    }
  }
}
</style>
