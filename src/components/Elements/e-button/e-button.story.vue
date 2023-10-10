<script setup>
import { reactive } from 'vue';
import eButton from '@elements/e-button/e-button.vue';

const state = reactive({
  layout: 'primary',
});
</script>

<template>
  <Story title="Elements/Button">
    <Variant title="Button">
      <e-button :layout="state.layout">Test button</e-button>
      <template #controls>
        <HstSelect
          v-model="state.layout"
          title="Layout"
          :options="{
            primary: 'Primary',
            'link-light': 'Link light',
            'link-danger': 'Link danger',
            'link-light-danger': 'Link light danger',
            text: 'Text',
          }"
        />
      </template>
    </Variant>
    <Variant title="Button is disabled">
      <e-button is-disabled="true">Test button</e-button>
    </Variant>
  </Story>
</template>
