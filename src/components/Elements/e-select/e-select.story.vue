<script setup>
import { reactive } from 'vue';
import eSelect from '@elements/e-select/e-select.vue';

const state = reactive({
  id: 'test-select',
  label: 'Test label',
  options: [
    { id: 'primary', name: 'Primary' },
    { id: 'text', name: 'Text' },
  ],
  modelValue: 'primary',
});
</script>

<template>
  <Story title="Elements/Select">
    <Variant title="Select">
      <e-select v-bind="state" />
    </Variant>

    <Variant title="With icon">
      <e-select v-bind="state" icon-left="fa-solid fa-user" />
    </Variant>

    <Variant title="With error message">
      <e-select v-bind="state" error-message="Test error message" />
    </Variant>
  </Story>
</template>
