<template>
  <div class="form-group">
    <label
      v-if="labelText"
      :data-testid="labelDataTestId"
      :for="id"
    >
      {{ labelText }}
    </label>
    <div :class="containerClass">
      <input
        :id="id"
        v-model.trim="vObj.$model"
        :autocomplete="autocomplete"
        :class="validationCssClass(vObj)"
        :data-testid="dataTestId"
        :type="type"
        class="form-control"
      />
      <slot name="error" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PDInput',
  props: {
    id: {
      required: true,
      type: String,
    },
    vObj: {
      required: true,
      type: Object,
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => [
        'text',
        'password',
        'email',
      ].includes(value),
    },
    labelText: {
      required: false,
      type: String,
    },
    dataTestId: {
      required: false,
      type: String,
    },
    labelDataTestId: {
      required: false,
      type: String,
    },
    autocomplete: {
      required: false,
      type: String,
      validator: (value) => [
        'off',
        'email',
        'new-password',
        'current-password',
        'username',
      ].includes(value),
    },
    containerClass: {
      required: false,
      type: String,
    },
  },
  methods: {
    validationCssClass(validation) {
      return {
        'is-valid': !validation.$error && validation.$dirty,
        'is-invalid': validation.$error,
      };
    },
  },
};
</script>

<style scoped>

</style>
