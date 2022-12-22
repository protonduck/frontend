<script setup>
import storage from '@plugins/storage';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

// update on change language
function languageChanged() {
  storage.setItem('locale', locale.value);
  document.querySelector('html').setAttribute('lang', locale.value);
  document.title = t('site.name');
}

// load selected language from storage
if (storage.getItem('locale')) {
  locale.value = storage.getItem('locale');
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
