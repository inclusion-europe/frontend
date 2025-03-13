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
        <Navigation v-if="!isMobile" />
        <MobileNav v-else />
      </template>
    </div>
  </header>
</template>

<script setup>
import Navigation from './Navigation.vue';
import MobileNav from './MobileNav.vue';

import { useWindowSize } from '@vueuse/core';

const config = useRuntimeConfig();

const windowSize = useWindowSize();
const menuItems = ref([]);

const notLive = config.public.notlive;

const isMobile = computed(() => {
  return windowSize.width.value < 1024;
});
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
