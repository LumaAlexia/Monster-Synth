import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importa le traduzioni
import enCommon from "../../public/locales/en/common.json";
import itCommon from "../../public/locales/it/common.json";
import esCommon from "../../public/locales/es/common.json";
import deCommon from "../../public/locales/de/common.json";

const resources = {
	en: {
		translation: enCommon, // usa 'translation' come namespace di default
	},
	it: {
		translation: itCommon,
	},
	es: {
		translation: esCommon,
	},
	de: {
		translation: deCommon,
	},
};

// Controlla se siamo nel browser o nel server
const isClient = typeof window !== "undefined";

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "en",

		// Non rilevare la lingua sul server per evitare hydration mismatch
		...(isClient && {
			detection: {
				order: ["localStorage", "navigator", "htmlTag"],
				caches: ["localStorage"],
			},
		}),

		// Se non siamo nel client, usa la lingua di default
		...(!isClient && {
			lng: "en",
		}),

		interpolation: {
			escapeValue: false, // react è già sicuro da xss
		},

		// namespace predefinito per react-i18next
		defaultNS: "translation",
		ns: ["translation"],

		// Importante per evitare errori di hydration
		react: {
			useSuspense: false,
		},
	});

export default i18n;
