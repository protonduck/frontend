<template>
  <div class="form-group">
    <e-label :id="id" :text="labelText" :data-testid="labelDataTestId" />
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
import eLabel from '../e-label/e-label.vue';

export default {
  name: 'e-input',
  components: {
    eLabel,
  },
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
      type: String,
    },
    dataTestId: {
      type: String,
    },
    labelDataTestId: {
      type: String,
    },
    autocomplete: {
      type: String,
      default: 'off',
      validator: (value) => [
        'off',
        'email',
        'new-password',
        'current-password',
        'username',
      ].includes(value),
    },
    containerClass: {
      type: String,
      default: 'col-sm-3',
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
