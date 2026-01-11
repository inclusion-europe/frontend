<template>
  <div class="website">
    <div v-if="!isHydrated" class="loading homepage">
      <img src="/loading.gif" />
    </div>
    <template v-else>
      <WebsiteHeader v-if="isHydrated" />
      <NuxtPage :page-key="(route) => route.fullPath" />
      <WebsiteFooter />
      <ScrollUp />
    </template>
  </div>
</template>
<script setup>
import WebsiteHeader from './components/Header';
import WebsiteFooter from './components/Footer';
import ScrollUp from './elements/ScrollUp.vue';
import { useMainStore } from '~/store';

const config = useRuntimeConfig();
const store = useMainStore();

const isHydrated = ref(false);

const posts = computed(() => store.getPosts);
const menu = computed(() => store.getMenu);

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
  titleTemplate: (titleChunk) =>
    titleChunk && titleChunk.length
      ? titleChunk
      : config.public.defaultTitle,
});

onServerPrefetch(async () => {
  try {
    if (!posts.value.length) {
      await store.loadPosts();
    }
    if (!menu.value.length) {
      await store.loadMenu();
    }
  } catch (error) {
    console.error('Error prefetching data:', error);
  }
});

onMounted(() => {
  if (!posts.value.length) {
    store
      .loadPosts()
      .catch((err) => console.error('Error loading posts:', err));
  }

  if (!menu.value.length) {
    store.loadMenu().catch((err) => console.error('Error loading menu:', err));
  }

  isHydrated.value = true;
});
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
