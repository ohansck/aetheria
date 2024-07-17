'use client';

import i18next from "i18next";
import {
  initReactI18next
} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
  });

export const i18nextLanguages = i18next.isInitialized;
