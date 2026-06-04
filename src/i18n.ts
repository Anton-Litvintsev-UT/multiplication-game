import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en/translation.json";
import eeTranslation from "./locales/ee/translation.json";
import ruTranslation from "./locales/ru/translation.json";

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				translation: enTranslation,
			},
			ee: {
				translation: eeTranslation,
			},
			ru: {
				translation: ruTranslation,
			},
		},
		fallbackLng: "ee",
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
