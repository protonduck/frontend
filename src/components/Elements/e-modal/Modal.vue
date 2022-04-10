<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
};
</script>

<style lang="scss" scoped src="./modal.scss" />
