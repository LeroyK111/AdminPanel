<template>
  <swiper class="swiper" v-bind="swiperConfig">
    <swiper-slide class="swiper-slide" v-for="(item, index) in data.data" :key="index">
      <img :src="item.src" :alt="data.alt">
    </swiper-slide>
  </swiper>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay} from "swiper"
import "swiper/css"
import { reactive } from "vue";

const { data } = defineProps(["data"])

const swiperConfig = reactive<any>({
  loop: true,
  modules: [Autoplay],
  autoplay: {
    delay: 0,
    disableOnInteraction: false
  },
  speed: 10000,
  slidesPerView: "auto",
  loopedSlides: 2
})





</script>
<style lang="less" scoped>
.swiper-slide {
  width: auto;

  img {
    height: 100%;
  }
}
</style>
