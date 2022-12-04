<script setup>
  import i18n from '../i18n';
  
  // set initial language
  languageChanged();

  // update on change language
  function languageChanged() {
    document.querySelector('html').setAttribute('lang', i18n.global.locale);
    document.title = i18n.global.t('site.name')
  }
</script>

<template>
  <select v-model="$i18n.locale" @change="languageChanged()">
    <option v-for="(language, index) in $i18n.availableLocales" :key="`language-${index}`" :value="language">
      {{ language }}
    </option>
  </select>
</template>
