<template>
  <div>{{ data }}</div>
</template>
<script setup lang="ts">
const { data } = defineProps(["data"])

// swiper/vue明显有bug，不要使用






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