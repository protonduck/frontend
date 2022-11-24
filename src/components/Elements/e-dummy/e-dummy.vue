<template>
  <div class="e-dummy">
    {{ example }}
  </div>
</template>

<script>
export default {
  name: 'e-dummy',
  components: {},
  props: {
    example: {
      type: String,
      default: ''
    }
  },
  data: () => ({}),
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss" src="./e-dummy.scss" />
