/**
 * @author Leroy
 * 图片懒加载
 */

import { onMounted, type Ref } from "vue";

const options = {
  // root: document.querySelector(".container"), // 根元素，默认为视口
  rootMargin: "0px", // 根元素的边距
  threshold: 0.5, // 可见性比例阈值
  once: true,
};

function callback(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) {
  entries.forEach((entry) => {
    // 完全不可见则跳出
    if (entry.intersectionRatio <= 0) return;

    // 获取目标element
    const img: Element = entry.target;
    // 获取自定义参数
    const src = img.getAttribute("data-src");
    // 设置属性
    // @ts-ignore
    img.onload = () => {
      img.setAttribute("class", "fade-in");
    };
    // 将真实src给与
    img.setAttribute("src", src ?? ""); // 将真实的图片地址赋给 src 属性
    // 停止监听
    observer.unobserve(img);


  });
}

export const useInView = (ref: Ref) => {
  // 给每个元素创建监听器
  const observer = new IntersectionObserver(callback, options);
  // 不加这个挂不上去事件
  onMounted(() => {
    Object.keys(ref.value).forEach((e) => observer.observe(ref.value[e]));
  });
};

/*  !例子
<script setup lang="ts">
import { ref } from "vue";
import { useInView } from "./hooks/useInView";

const imgRef = ref(null);

useInView(imgRef);

</script>

<template>
  <h4>公众号：萌萌哒草头将军</h4>
  <div
    v-for="(_, idx) in new Array(200).fill(11)"
    style="width: 200px height: 200px;"
  >
    <img
      ref="imgRef"
      style="height: 100%"
      src="https://via.placeholder.com/200"
      :data-src="`https://picsum.photos/200/${180 + idx}`"
      alt="b"
    />
  </div>
</template>

<style scoped>

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}


.fade-in {
  animation: fadeIn 0.6s ease-in;
}
</style>
*/
