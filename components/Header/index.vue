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
      <template v-if="!isMobile">
        <Navigation v-if="!isSearchOpen && !isMobile" />
        <Search @toggleSearch="toggleSearch" />
      </template>
      <span v-else class="mobile-header-content">
        <Search @toggleSearch="toggleSearch" />
        <MobileNav />
      </span>
    </div>
  </header>
</template>

<script setup>
import Search from './Search';
import Navigation from './Navigation.vue';
import MobileNav from './MobileNav.vue';

import { useWindowSize } from '@vueuse/core';

const isSearchOpen = ref(false);

const windowSize = useWindowSize();

const isMobile = computed(() => {
  return windowSize.width.value < 1200;
});

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
};
</script>
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
    width: 100%;
    max-width: var(--max-width);
    margin: auto;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  &-logo {
    height: 45px;
    position: relative;
    top: 5px;
  }
}

.mobile-header-content {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
}

@media screen and (min-width: 1200px) {
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
