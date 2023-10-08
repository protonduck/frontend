<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: 'fa-solid fa-spinner',
  },
});
</script>

<template>
  <div v-show="isLoading" class="icon">
    <font-awesome-icon :icon="icon" />
  </div>
</template>

<style scoped lang="scss">
.icon {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
