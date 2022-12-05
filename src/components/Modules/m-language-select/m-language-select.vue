<script setup>
  import { useI18n } from 'vue-i18n';

  const { t, locale } = useI18n();

  // update on change language
  function languageChanged() {
    localStorage.setItem('locale', locale.value);
    document.querySelector('html').setAttribute('lang', locale.value);
    document.title = t('site.name')
  }

  // load selected language from localStorage
  if (localStorage.getItem('locale')) {
    locale.value = localStorage.getItem('locale');
  }
</script>

<template>
  <div class="select">
    <select v-model="$i18n.locale" @change="languageChanged()">
      <option v-for="(language, index) in $i18n.availableLocales" :key="`language-${index}`" :value="language">
        {{ language }}
      </option>
    </select>
  </div>
</template>
