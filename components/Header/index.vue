<template>
  <header class="header">
    <div class="header-content">
      <router-link to="/" tabindex="0">
        <img
          src="@/assets/logo.svg"
          class="header-logo"
          alt="Inclusion Europe logo"
        />
      </router-link>
      <template v-if="!notLive">
        <Navigation v-if="!isMobile" :menu-items="menuItems" />
        <MobileNav v-else :menu-items="menuItems" />
      </template>
    </div>
  </header>
</template>

<script setup>
import Navigation from './Navigation.vue';
import MobileNav from './MobileNav.vue';
import useMyFetch from '~/composables/useMyFetch';

import { useWindowSize } from '@vueuse/core';

const config = useRuntimeConfig();

const windowSize = useWindowSize();
const menuItems = ref([]);

const notLive = config.public.notlive;

const isMobile = computed(() => {
  return windowSize.width.value < 1024;
});

onMounted(() => {
  useMyFetch('menu/full').then((res) => {
    const menu = res.sort((a, b) => a.position - b.position);
    menu.forEach((item) => {
      switch (item.id) {
        case 1:
          item.pages.push(
            {
              idx: 98,
              menu_position: 98,
              title: 'History',
              url: '/history',
            },
            {
              idx: 99,
              menu_position: 99,
              title: 'Projects',
              url: '/projects',
            }
          );
          break;
        case 2:
          item.pages.push({
            idx: 99,
            menu_position: 99,
            title: 'Articles',
            url: '/type/articles',
          });
          break;
        case 5:
          item.pages.push({
            idx: 99,
            menu_position: 99,
            title: 'Easy-To-Read Articles',
            url: '/type/e2r',
          });
          break;
        default:
      }
    });
    menuItems.value = menu;
  });
});
</script>

<!-- <script>

export default {
    beforeUnmount() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onResize() {
            this.windowWidth = window.innerWidth;
        },
    },
};
</script> -->

<style lang="scss" scoped>
.header {
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
  margin: auto;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 999;
  width: 100%;

  &-content {
    width: var(--width);
    max-width: var(--max-width);
    margin: auto;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-logo {
    height: 55px;
    position: relative;
    top: 5px;
  }
}

@media screen and (min-width: 1024px) {
  .header {
    height: 65px;
    margin-bottom: 55px;
    position: static;
    width: var(--width);
    max-width: var(--max-width);

    &-content {
      justify-content: flex-start;
      gap: 40px;
    }
  }
}
</style>
