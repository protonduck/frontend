import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import messages from './en';

Vue.use(VueI18n);

export const localeParamName = 'selectedLocale';

let selectedLocale = localStorage.getItem(localeParamName);

if (!selectedLocale) {
  selectedLocale = 'en';
}

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en: messages },
});

const loadedLanguages = ['en'];

function setI18nLanguage(lang) {
  localStorage.setItem(localeParamName, lang);
  i18n.locale = lang;
  axios.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector('html').setAttribute('lang', lang);

  return lang;
}

export function loadLanguageAsync(lang) {
  // when same localization
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // when localization has already been uploaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // when localization has not yet been uploaded
  return import(`./${lang}.js`)
    // eslint-disable-next-line no-shadow
    .then((messages) => {
      i18n.setLocaleMessage(lang, messages.default);
      loadedLanguages.push(lang);

      return setI18nLanguage(lang);
    });
}
