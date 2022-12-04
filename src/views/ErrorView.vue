<template>
  <div class="error">
    <h1>{{ $t('views.error.title') }}</h1>
    <p>{{ $t('views.error.content') }}</p>
  </div>
</template>

<style lang="scss" scoped>
  @import "@assets/scss/main.scss";
  .error {
    margin: $spacing-20;
  }
</style>