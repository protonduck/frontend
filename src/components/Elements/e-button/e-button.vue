<template>
  <button
    :id="id"
    :type="type"
    :disabled="isDisabled"
    :data-testid="dataTestId"
    :class="classes"
    @click="$emit('click')"
    class="btn mr-2"
  >
    <slot v-if="hasSlot" />
    <template v-else>
      {{ text }}
    </template>
  </button>
</template>

<script>
export default {
  name: 'e-button',
  props: {
    id: String,
    type: {
      type: String,
      default: 'submit',
      validator: (value) => [
        'button',
        'submit',
        'reset',
      ].includes(value),
    },
    text: String,
    isDisabled: {
      type: Boolean,
      default: false,
    },
    dataTestId: {
      type: String,
    },
    classes: {
      type: String,
      default: 'btn-primary',
    },
  },
  methods: {
    hasSlot(name = 'default') {
      return !!this.$slots[name];
    },
  },
  emit: [
    'click',
  ],
};
</script>

<style scoped lang="scss" src="./e-button.scss" />
