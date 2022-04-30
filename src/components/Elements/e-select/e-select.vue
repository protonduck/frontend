<template>
  <div class="form-group">
    <e-label :id="id" :text="labelText" :data-testid="labelDataTestId" />
    <div :class="containerClass">
      <select
        :id="id"
        v-model.trim="vObj.$model"
        :class="validationCssClass(vObj)"
        :data-testid="dataTestId"
        class="form-control"
        @keydown="filterErrors(id)"
      >
        <option v-for="(option, index) in options" :key="index" :value="option.id">
          {{ option.name }}
        </option>
      </select>
      <template v-for="(validator, validatorName, index) in vObj.$params">
        <div
          v-if="!vObj[validatorName]"
          :key="index"
          v-t="validator && validator.message ? validator.message : validator"
          class="invalid-feedback"
        />
      </template>
    </div>
  </div>
</template>

<script>
import eLabel from '../e-label/e-label.vue';

export default {
  name: 'e-select',
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
    errors: {
      type: Array,
    },
    options: {
      type: Array,
    },
    labelText: {
      type: String,
    },
    labelDataTestId: {
      type: String,
    },
    dataTestId: {
      type: String,
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
    filterErrors(field) {
      return this.errors.filter((item) => item.field !== field);
    },
  },
};
</script>
