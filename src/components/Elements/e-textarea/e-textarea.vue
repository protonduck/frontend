<template>
  <div class="form-group">
    <e-label :id="id" :text="labelText" :data-testid="labelDataTestId" />
    <div :class="containerClass">
      <textarea
        :id="id"
        :rows="rows"
        :class="validationCssClass(vObj)"
        :data-testid="dataTestId"
        v-model.trim="vObj.$model"
        class="form-control"
      />
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
  name: 'e-textarea',
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
    rows: {
      type: Number,
      default: 2,
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
  },
};
</script>
