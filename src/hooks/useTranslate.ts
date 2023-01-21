// Omit this line if loading form a CDN
import translate from "translate";

translate.engine = "google"; // Or "google", "yandex", "libre"
// translate.key = process.env.DEEPL_KEY;

export async function useTranslate(
  str: string = "",
  from: string = "zh",
  to: string = "es"
) {
  const text = await translate(str, {from, to});
  return text;
}
