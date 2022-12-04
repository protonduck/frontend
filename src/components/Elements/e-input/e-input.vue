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
  <div class="field">
    <div class="label">
      <label v-if="label" :for="id">{{ $t(label) }}</label>
    </div>
    <div class="control">
      <input v-bind="$attrs" :id="id" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="$t(label)" :autocomplete="autocomplete" class="input" />
    </div>
  </div>
</template>
