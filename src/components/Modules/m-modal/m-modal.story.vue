<script setup>
import { ref } from 'vue';
import mModal from '@modules/m-modal/m-modal.vue';

let showModal = ref(false);
</script>

<template>
  <Story title="Modules/Modal">
    <div @click="showModal = true">Open modal</div>
    <m-modal v-model="showModal" @cancel="showModal = false">
      <template #title>Modal title</template>
      <template #content>Modal content</template>
    </m-modal>
  </Story>
</template>
