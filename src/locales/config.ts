import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import english from "./resources/english.json";
import mandarin from "./resources/mandarin.json";
import malay from "./resources/malay.json";

const resources = { EN: { translation: english }, CN: { translation: mandarin }, MY: { translation: malay } };

i18next.use(initReactI18next).init({ resources, lng: "EN" });
export default i18next;
