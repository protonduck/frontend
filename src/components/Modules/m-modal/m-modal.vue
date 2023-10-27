<script setup>
import { VueFinalModal } from 'vue-final-modal';
import eButton from '@elements/e-button/e-button.vue';

defineEmits(['cancel']);
</script>

<template>
  <vue-final-modal
    v-bind="$attrs"
    :esc-to-close="true"
    classes="modal-container"
    content-class="modal-content box has-background-white"
  >
    <div class="is-flex is-justify-content-space-between">
      <div class="title"><slot name="title" /></div>
      <e-button layout="text" @click="$emit('cancel', close)">
        <font-awesome-icon icon="fa-solid fa-close" />
      </e-button>
    </div>
    <slot name="content" />
  </vue-final-modal>
</template>

<style lang="scss" scoped>
// override vue final modal style
::v-deep(.modal-container) {
  display: flex;
  align-items: center;
}

::v-deep(.vfm__content) {
  box-sizing: initial;
}
</style>
