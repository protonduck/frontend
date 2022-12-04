<script setup>
  const props = defineProps({
    id: {
      required: true,
      type: String
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => ['text', 'password', 'email', 'color', 'hidden'].includes(value)
    },
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    autocomplete: {
      type: String,
      default: 'off',
      validator: (value) => ['off', 'email', 'new-password', 'current-password', 'username'].includes(value)
    },
  })
</script>

<template>
  <div class="e-input">
    <div class="e-input__label">
      <label v-if="label" :for="id">{{ $t(label) }}</label>
    </div>
    <div class="e-input__wrapper">
      <input v-bind="$attrs" :id="id" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="$t(label)" :autocomplete="autocomplete" class="e-input__element" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "@assets/scss/main.scss";

  .e-input__label {
    padding-bottom: $spacing-5;
    font-size: $size-15;
  }

  .e-input__wrapper {
    margin-bottom: $spacing-15;
  }

  .e-input__element {
    display: block;
    width: 100%;
    padding: $spacing-15;
    border: 1px solid $color-gray--lighten;
    border-radius: $spacing-5;
    color: $color-gray;
    font-size: $size-15;

    &:focus, &:active {
      outline: 1px solid;
      outline-color: $color-gray--lighten;
    }
  }

  ::placeholder {
    color: $color-gray--lighten;
  }
</style>
