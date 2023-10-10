<script setup>
defineProps({
  id: {
    required: true,
    type: String,
  },
  rows: {
    type: Number,
    default: 2,
  },
  cols: {
    type: Number,
    default: 50,
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
  },
});
</script>

<template>
  <div class="field">
    <div class="label">
      <label v-if="label" :for="id">{{ $t(label) }}</label>
    </div>
    <div class="control">
      <textarea
        v-bind="$attrs"
        :id="id"
        :rows="rows"
        :cols="cols"
        :value="modelValue"
        :placeholder="$t(placeholder)"
        :class="{ 'is-danger': errorMessage }"
        @input="$emit('update:modelValue', $event.target.value)"
        class="textarea"
      />
      <p v-if="errorMessage" class="help is-danger">
        {{ $t(errorMessage) }}
      </p>
    </div>
  </div>
</template>
