import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useLanguage = defineStore("useLanguage", () => {
  const Language = ref("zh");

  const LanguageObj: { [key: string]: string } = {
    简体中文: "zh-CN",
    English: "en",
    日本語: "ja",
    繁體中文: "zh-TW",
    Русский: "ru",
    Français: "fr",
    Español: "es",
    عربي: "ar",
  };

  const setLanguage = (i: string) => {
    Language.value = LanguageObj[i];
  };


  return { Language, setLanguage };
});
