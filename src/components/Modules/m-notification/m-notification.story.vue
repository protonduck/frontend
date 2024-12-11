<script setup>
import { reactive } from 'vue';
import mNotification from '@modules/m-notification/m-notification.vue';

const state = reactive({
  layout: 'danger',
});
</script>

<template>
  <Story title="Modules/Notification">
    <Variant title="Default">
      <m-notification message="Test notification" :layout="state.layout" />
      <template #controls>
        <HstSelect
          v-model="state.layout"
          title="Layout"
          :options="{
            'danger': 'Danger',
            'warning': 'Warning',
          }"
        />
      </template>
    </Variant>
  </Story>
</template>
