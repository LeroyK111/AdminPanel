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

@font-face {
  // 全局引入字体
  font-family: "SmileySans";
  src: url("@/assets/fonts/SmileySans-Oblique.otf.woff2") format("woff2");
    src: url("@/assets/fonts/SmileySans-Oblique.ttf.woff2") format("woff2");
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
  line-height: 45px;
}


.is-message-box {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, .4);
  display: flex;
  align-items: center;
  justify-content: center;

  .el-message-box {
    width: 370px;
    height: 124px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .el-message-box__header {
      font-size: 18px;
      color: #333;
      font-weight: bold;
      border-bottom: 1px #ccc;
    }

    .el-message-box__content {
      font-size: 16px;
    }

    .el-message-box__btns {
      display: flex;
      justify-content: end;
    }
  }
}
</style>
