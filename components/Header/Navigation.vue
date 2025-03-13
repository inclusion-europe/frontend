<template>
  <nav class="navbar">
    <router-link class="navbar-element" to="/" tabindex="0"> Home </router-link>
    <nav-dropdown
      v-for="item in menuItems"
      :key="`menu_item_${item.id}`"
      :pages="item.pages"
    >
      {{ item.name }}
    </nav-dropdown>
  </nav>
</template>
<script>
import NavDropdown from './NavDropdown.vue';

export default {
  name: 'WebsiteNavigation',
  components: { NavDropdown },
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar {
  display: flex;
  gap: 28px;

  &:deep(.navbar-element) {
    font-family: GilroySemiBold;
    color: var(--black);
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
    position: relative;
    overflow: visible;
    padding-bottom: 6px;
    white-space: nowrap;
    text-decoration: none;

    &:hover,
    &:focus {
      color: var(--ie-blue) !important;
    }
  }
}
</style>
