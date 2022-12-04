<script setup>
import mLanguageSelect from '@modules/m-language-select/m-language-select.vue';
</script>

<template>
  <Story title="Modules/Language Select">
    <m-language-select />

    {{ $t('site.name') }} ({{ $i18n.locale }})
  </Story>
</template>
