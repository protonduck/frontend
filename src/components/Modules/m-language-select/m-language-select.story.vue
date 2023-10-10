<script setup>
import mLanguageSelect from '@modules/m-language-select/m-language-select.vue';
</script>

<template>
  <Story title="Modules/Language select">
    <m-language-select />

    Selected language is: {{ $i18n.locale }}
  </Story>
</template>
