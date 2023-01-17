<template>
  <div>
    {{data}}
  </div>
</template>
<script setup lang="ts">
// !不要使用vue swiper组件，有bug没有修
// 直接使用swiperjs库

const { data } = defineProps(["data"])







</script>
<style lang="less">
.swiper {
  height: 100%;

  img {
      height: 100%;
    }
  }
  
  .swiper-slide {
    width: auto;
  }
  
  .swiper-free-mode>.swiper-wrapper {
    -webkit-transition-timing-function: linear;
    /*之前是ease-out*/
    -moz-transition-timing-function: linear;
    -ms-transition-timing-function: linear;
    -o-transition-timing-function: linear;
    transition-timing-function: linear;
  }
</style>