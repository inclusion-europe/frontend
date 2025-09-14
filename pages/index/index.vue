<template>
  <div>
    <div v-if="!isHydrated || (pending && !notLive)" class="loading">
      <img src="/loading.gif" />
    </div>
    <template v-else-if="!notLive">
      <Hero v-if="highlights.length" :highlights="highlights" />
      <E2R v-if="e2r_articles.length" :posts="e2r_articles" />
      <Videos v-if="false" />
      <Articles v-if="articles.length" :posts="articles" />
      <Publications v-if="publications.length" :posts="publications" />
      <Events v-if="events.length" :posts="events" />
    </template>
    <h1 v-else class="maint">
      The website is currently under maintenance, check back soon!
    </h1>
  </div>
</template>
<script setup>
import Hero from './Hero';
import E2R from './E2R';
import Videos from './Videos';
import Articles from './Articles';
import Publications from './Publications';
import { useMainStore } from '~/store';
import Events from './Events.vue';

const store = useMainStore();
const config = useRuntimeConfig();

const notLive = config.public.notlive;

const isHydrated = ref(false);

const loading = computed(() => store.isLoading);
const posts = computed(() => store.getPosts);

const e2r_articles = computed(() => {
  return posts.value
    .filter(
      (post) =>
        ['e2r_article'].includes(post.article_type) ||
        post.tags?.includes('easy to read') ||
        post.tags?.includes('easy-to-read')
    )
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
});

const highlights = computed(() => {
  return posts.value
    .filter((post) => post.highlighted)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 3);
});

const publications = computed(() => {
  return posts.value
    .filter((post) => ['report'].includes(post.article_type))
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
});

const articles = computed(() => {
  return posts.value
    .filter((post) => ['news', 'blogpost'].includes(post.article_type))
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
});

const events = computed(() => {
  return posts.value
    .filter((post) => ['event'].includes(post.article_type))
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
});

onMounted(() => {
  isHydrated.value = true;
});

// useSeoMeta({
//   description:
//     'Ambitions. Rights. Belonging. 20 million people with intellectual disabilities and their families in Europe.',
//   image: 'https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg',
//   title: config.public.defaultTitle,
//   ogDescription:
//     'Ambitions. Rights. Belonging. 20 million people with intellectual disabilities and their families in Europe.',
//   ogImage: 'https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg',
//   ogTitle: config.public.defaultTitle,
// });
</script>

<style lang="scss" scoped>
.maint {
  max-width: var(--width);
  margin: auto;

  color: #1e1e1e;
  font-size: 40px;
  font-family: GilroyBold;
  min-height: calc(100vh - 400px);
}
</style>
