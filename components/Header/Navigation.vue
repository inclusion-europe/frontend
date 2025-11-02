<template>
  <nav class="navbar">
    <router-link class="navbar-element" to="/" tabindex="0"> Home </router-link>
    <nav-dropdown
      v-for="item in menu"
      :key="`menu_item_${item.id}`"
      :pages="item.pages"
      :parent-url="item.url"
    >
      {{ item.name }}
    </nav-dropdown>
    <span class="spacer" />
  </nav>
</template>
<script setup>
import NavDropdown from './NavDropdown.vue';
import { useMainStore } from '~/store';

const store = useMainStore();
const menu = computed(() => store.getMenu);
</script>
<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: stretch;
  flex-grow: 1;

  .spacer {
    flex-grow: 1;
  }

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
