<template>
  <label v-if="text" :for="id">
    {{ text }}
  </label>
</template>

<script>
export default {
  name: 'e-label',
  props: {
    id: {
      type: String,
    },
    text: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss" src="./e-label.scss" />
