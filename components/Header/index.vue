<template>
  <header class="header">
    <div class="header-content">
      <NuxtLink to="/" tabindex="0">
        <img
          src="@/assets/logo.svg"
          class="header-logo"
          alt="Inclusion Europe logo"
        />
      </NuxtLink>
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

const loadMenu = async () => {
  const res = await useMyFetch('menu/full');
  const menu = res.sort((a, b) => a.position - b.position);
  menu.forEach((item) => {
    switch (item.id) {
      case 1:
        item.pages.push(
          {
            idx: 97,
            menu_position: 97,
            title: 'Board and Staff',
            url: '/staff',
          },
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
};

onServerPrefetch(async () => {
  await loadMenu();
});

onMounted(() => {
  if (!menuItems.value.length) {
    loadMenu();
  }
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
  z-index: 49;
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
