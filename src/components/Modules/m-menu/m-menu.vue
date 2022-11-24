<template>
  <nav v-if="menu">
    <div class="m-menu">
      <template v-for="(item, index) in filtredMenu">
        <div class="m-menu__item" :key="index">
          <router-link :to="{ name: item.name }" :class="item.classes">
            {{ item.label }}
          </router-link>
        </div>
      </template>
      <div class="m-menu__item" v-if="hasSlot('slot1')">
        <slot name="slot1" />
      </div>
      <div class="m-menu__item" v-if="hasSlot('slot2')">
        <slot name="slot2" />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'm-menu',
  props: {
    menu: {
      type: Object,
      required: true
    },
    isLoggedIn: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    filtredMenu() {
      return this.menu.items.filter((item) => item.isLoggedIn === this.isLoggedIn);
    }
  },
  methods: {
    hasSlot(name = 'default') {
      return !!this.$slots[name];
    }
  }
};
</script>

<style lang="scss" scoped src="./m-menu.scss" />
