<script setup>
  import i18n from '@/i18n';

  // update on change language
  function languageChanged() {
    localStorage.setItem('locale', i18n.global.locale);
    document.querySelector('html').setAttribute('lang', i18n.global.locale);
    document.title = i18n.global.t('site.name')
  }

  // load selected language from localStorage
  if (localStorage.getItem('locale')) {
    i18n.global.locale = localStorage.getItem('locale');
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
