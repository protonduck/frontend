<script setup>
import { reactive } from 'vue';
import mNotification from '@modules/m-notification/m-notification.vue';

const state = reactive({
  status: '404',
  message: 'Not found',
});
</script>

<template>
  <Story title="Modules/Notification">
    <Variant title="Default">
      <m-notification :item="state" />
    </Variant>
  </Story>
</template>
