<script setup>
import { reactive } from 'vue';
import eInput from '@elements/e-input/e-input.vue';

const state = reactive({
  id: 'test-input',
  label: 'Test label',
  placeholder: 'Test placeholder',
});
</script>

<template>
  <Story title="Elements/Input">
    <Variant title="Input">
      <e-input v-bind="state" />
    </Variant>

    <Variant title="With icon left">
      <e-input v-bind="state" icon-left="fa-solid fa-user" />
    </Variant>

    <Variant title="With icon right">
      <e-input v-bind="state" icon-right="fa-solid fa-user" />
    </Variant>

    <Variant title="With error message">
      <e-input v-bind="state" errorMessage="Test error message" />
    </Variant>
  </Story>
</template>
