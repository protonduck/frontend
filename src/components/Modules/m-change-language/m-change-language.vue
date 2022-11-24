<template>
  <select
    v-model="selectedLanguage"
    class="m-change-language custom-select custom-select-sm"
    @change="changeLanguage($event.target.value)"
  >
    <option v-for="(language, index) in languages" :key="index" :value="language">
      {{ language }}
    </option>
  </select>
</template>

<script>
import { loadLanguageAsync, localeParamName } from '../../../lang/i18n-setup';

export default {
  name: 'm-change-language',
  data() {
    return {
      selectedLanguage: 'en'
    };
  },
  props: {
    languages: {
      type: Array,
      default: () => ['en', 'ru']
    }
  },
  created() {
    const selectedLocale = localStorage.getItem(localeParamName);

    if (selectedLocale) {
      this.selectedLanguage = selectedLocale;
    }
  },
  methods: {
    changeLanguage(language) {
      loadLanguageAsync(language);
    }
  }
};
</script>

<style scoped lang="scss" src="./m-change-language.scss" />
