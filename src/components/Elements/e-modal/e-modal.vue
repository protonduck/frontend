<template>
  <transition name="e-modal">
    <div class="e-modal-mask">
      <div class="e-modal-wrapper">
        <div class="e-modal-container">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'e-modal',
};
</script>

<style lang="scss" scoped src="./e-modal.scss" />
