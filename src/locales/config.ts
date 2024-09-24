import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import english from "./resources/english.json";
import mandarin from "./resources/mandarin.json";
import burnese from "./resources/burnese.json";

const resources = { EN: { translation: english }, CN: { translation: mandarin }, MM: { translation: burnese } };

i18next.use(initReactI18next).init({ resources, lng: "MM" });
export default i18next;
