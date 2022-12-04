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
    iconLeft: {
      type: String,
      default: '',
    },
    iconRight: {
      type: String,
      default: '',
    },
  })
</script>

<template>
  <div class="field">
    <div class="label">
      <label v-if="label" :for="id">{{ $t(label) }}</label>
    </div>
    <div class="control" :class="{ 'has-icons-left': iconLeft, 'has-icons-right': iconRight }">
      <input v-bind="$attrs" :id="id" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="$t(label)" :autocomplete="autocomplete" class="input" />
      <span v-if="iconLeft" class="icon is-small is-left">
        <font-awesome-icon :icon="iconLeft" />
      </span>
      <span v-if="iconRight" class="icon is-small is-right">
        <font-awesome-icon :icon="iconRight" />
      </span>
    </div>
  </div>
</template>
