<template>
  <div class="website">
    <div v-if="!isHydrated" class="loading homepage">
      <img src="/loading.gif" />
    </div>
    <template v-else>
      <div class="under_const">
        <h3>
          The website is still under development, more updates coming soon!
        </h3>
      </div>
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

useSeoMeta({
  description:
    'Ambitions. Rights. Belonging. 20 million people with intellectual disabilities and their families in Europe.',
  image: 'https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg',
  title: config.public.defaultTitle,
  ogDescription:
    'Ambitions. Rights. Belonging. 20 million people with intellectual disabilities and their families in Europe.',
  ogImage: 'https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg',
  ogTitle: config.public.defaultTitle,
});

// onServerPrefetch(async () => {
//   await store.loadPosts();
// });

onMounted(() => {
  if (!posts.value.length) {
    store.loadPosts();
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
