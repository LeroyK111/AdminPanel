import { ref } from "vue";
import { defineStore } from "pinia";

export const useLanguage = defineStore(
  "useLanguage",
  () => {
    const Language = ref("zh");
    const oldLanguage = ref("");

    const LanguageObj: { [key: string]: string } = {
      简体中文: "zh",
      English: "en",
      日本語: "ja",
      Русский: "ru",
      Français: "fr",
      Español: "es",
      عربي: "ar",
    };

    const setLanguage = (i: string) => {
      oldLanguage.value = Language.value;
      Language.value = LanguageObj[i];
    };
    return { Language, setLanguage, oldLanguage };
  },
  {
    persist: true,
  }
);
