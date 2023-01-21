import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import dayjs from "dayjs";
import locale_zhcn from "dayjs/locale/zh-cn";
import locale_en from "dayjs/locale/en";

// you know plug-in
// import isLeapYear from 'dayjs/plugin/isLeapYear';

export const useDatetime = defineStore("useDatetime", () => {
  let now = reactive<any>(dayjs());

  const zhcnNow = computed(() =>
    dayjs(now).locale(locale_zhcn).format("YYYY[年]MM[月]DD[日] HH:mm:ss")
  );

  const enNow = computed(() =>
    dayjs(now).locale(locale_en).format("YYYY-MM-DD HH:mm:ss")
  );

  function Recapture() {
    const day: any = dayjs();
    for (const key in day) {
      now[key] = day[key];
    }
  }

  return { now, zhcnNow, enNow, Recapture };
});
