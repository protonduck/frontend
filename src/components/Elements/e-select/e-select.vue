<script setup>
defineProps({
  id: {
    required: true,
    type: String,
  },
  label: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: '',
  },
  iconLeft: {
    type: String,
    default: '',
  },
  iconRight: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="field">
    <div class="label">
      <label v-if="label" :for="id">{{ $t(label) }}</label>
    </div>
    <div class="control" :class="{ 'has-icons-left': iconLeft, 'has-icons-right': iconRight }">
      <div class="select">
        <select
          v-bind="$attrs"
          :id="id"
          :value="modelValue"
          :class="{ 'is-danger': errorMessage }"
          @change="$emit('update:modelValue', $event.target.value)"
        >
          <option v-for="(option, index) in options" :key="`option-${index}`" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
      <p v-if="errorMessage" class="help is-danger">
        {{ $t(errorMessage) }}
      </p>
      <span v-if="iconLeft" class="icon is-small is-left">
        <font-awesome-icon :icon="iconLeft" />
      </span>
      <span v-if="iconRight" class="icon is-small is-right">
        <font-awesome-icon :icon="iconRight" />
      </span>
    </div>
  </div>
</template>
