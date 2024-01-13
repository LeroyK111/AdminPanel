<template>
  <div>
    {{ usedt.enNow }}
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted} from '@vue/runtime-dom';
import {useDatetime} from "@/stores/datetime"

let eve: any;
const usedt = useDatetime()

onMounted(() => {
  eve = setInterval(() => {
    usedt.Recapture()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(eve)
})

</script>
<style lang="less" scoped>

</style>