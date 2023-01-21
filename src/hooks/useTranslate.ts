// Omit this line if loading form a CDN
import translate from "translate";

translate.engine = "google"; // Or "google", "yandex", "libre"
// translate.key = process.env.DEEPL_KEY;

export async function useTranslate(old: string = "", target: string = "es") {
  const text = await translate(old, target);
  return text;
}
