import { I18n } from "i18n-js";
import translations from "../translations.json";

const i18n = new I18n();
i18n.store(translations);
i18n.locale =
  document.querySelector<HTMLMetaElement>("meta[name='i18n-locale']")
    ?.content ?? "en";
export default i18n;
