<
<template>
  <div class="website">
    <div class="under_const">
      <h3>The website is still under development, more updates coming soon!</h3>
    </div>
    <WebsiteHeader />
    <NuxtPage :key="$route.fullPath" />
    <WebsiteFooter />
    <ScrollUp />
  </div>
</template>

<script setup>
import WebsiteHeader from './components/Header';
import WebsiteFooter from './components/Footer';
import ScrollUp from './elements/ScrollUp.vue';
import { useMainStore } from '~/store';

const config = useRuntimeConfig();
const store = useMainStore();

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: '/inclusion_europe.css',
    },
    {
      rel: 'stylesheet',
      href: '/style.css',
    },
  ],
  title: config.public.defaultTitle,
});

store.loadPosts();
</script>
<style src="@/assets/style/index.scss" lang="scss"></style>
<style lang="scss" scoped>
.under_const {
  background: var(--ie-blue);
  min-height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;

  h3 {
    margin: 0;
    color: white;
    font-size: 16px;
  }
}

.website {
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;

  &:deep(.header + *) {
    flex-grow: 1;
  }
}

@media screen and (min-width: 1024px) {
}
</style>
>
