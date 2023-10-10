<script setup>
import { reactive } from 'vue';
import eTextarea from '@elements/e-textarea/e-textarea.vue';

const state = reactive({
  id: 'test-textarea',
  label: 'Test label',
  placeholder: 'Test placeholder',
  modelValue: 'Test text area',
});
</script>

<template>
  <Story title="Elements/Textarea">
    <Variant title="Textarea">
      <e-textarea v-bind="state" />
    </Variant>

    <Variant title="With error message">
      <e-textarea v-bind="state" errorMessage="Test error message" />
    </Variant>
  </Story>
</template>
