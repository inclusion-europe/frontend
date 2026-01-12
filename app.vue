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
const route = useRoute();

const isHydrated = ref(false);

const posts = computed(() => store.getPosts);
const menu = computed(() => store.getMenu);

const siteUrl = 'https://www.inclusion.eu';
const defaultDescription =
  'Ambitions. Rights. Belonging. 20 million people with intellectual disabilities and their families in Europe.';
const defaultImage = 'https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg';
const defaultImageAlt = 'Inclusion Europe members';

const globalStylesheets = [
  {
    key: 'global-inclusion-css',
    rel: 'stylesheet',
    href: '/inclusion_europe.css',
  },
  {
    key: 'global-style-css',
    rel: 'stylesheet',
    href: '/style.css',
  },
];

const mergeEntries = (base = [], overrides = []) => {
  const keyed = new Map();
  base.filter(Boolean).forEach((entry, index) => {
    const key = entry.key ?? `base-${entry.rel || entry.name || entry.property || index}`;
    keyed.set(key, entry);
  });
  (overrides || []).filter(Boolean).forEach((entry, index) => {
    const key = entry.key ?? `override-${entry.rel || entry.name || entry.property || index}`;
    keyed.set(key, entry);
  });
  return Array.from(keyed.values());
};

useHead(() => {
  const pageHead = route.meta?.pageHead;
  const fallbackHead = {
    title: config.public.defaultTitle,
    link: [
      {
        key: 'canonical',
        rel: 'canonical',
        href: `${siteUrl}${route.path}`,
      },
    ],
    meta: [
      {
        key: 'description',
        name: 'description',
        content: defaultDescription,
      },
      {
        key: 'og:title',
        property: 'og:title',
        content: config.public.defaultTitle,
      },
      {
        key: 'og:description',
        property: 'og:description',
        content: defaultDescription,
      },
      {
        key: 'og:url',
        property: 'og:url',
        content: `${siteUrl}${route.path}`,
      },
      {
        key: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        key: 'og:image',
        property: 'og:image',
        content: defaultImage,
      },
      {
        key: 'og:image:alt',
        property: 'og:image:alt',
        content: defaultImageAlt,
      },
      {
        key: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        key: 'twitter:title',
        name: 'twitter:title',
        content: config.public.defaultTitle,
      },
      {
        key: 'twitter:description',
        name: 'twitter:description',
        content: defaultDescription,
      },
      {
        key: 'twitter:image',
        name: 'twitter:image',
        content: defaultImage,
      },
    ],
  };

  const mergedLinks = mergeEntries(fallbackHead.link, pageHead?.link);
  const mergedMeta = mergeEntries(fallbackHead.meta, pageHead?.meta);

  return {
    title: pageHead?.title ?? fallbackHead.title,
    titleTemplate: (titleChunk) =>
      titleChunk && titleChunk.length
        ? titleChunk
        : config.public.defaultTitle,
    link: [...globalStylesheets, ...mergedLinks],
    meta: mergedMeta,
  };
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
