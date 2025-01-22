<template>
  <div>
    <div v-if="loading && !notLive" class="loading">
      <img src="/loading.gif" />
    </div>
    <template v-else-if="!notLive">
      <Hero v-if="highlights.length" :highlights="highlights" />
      <E2R v-if="e2r_articles.length" :posts="e2r_articles" />
      <Videos v-if="false" />
      <Articles v-if="articles.length" :posts="articles" />
      <Publications v-if="publications.length" :posts="publications" />
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
import useMyFetch from '~/composables/useMyFetch';

const store = useMainStore();
const config = useRuntimeConfig();

const notLive = config.public.notlive;

const loading = ref(true);
const posts = store.getPosts;

watch(
  posts,
  (val) => {
    console.log(val);
    if (val.length) {
      loading.value = false;
    }
  },
  { immediate: true }
);

const e2r_articles = computed(() => {
  return posts
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
  return posts
    .filter((post) => post.highlighted)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 3);
});

const publications = computed(() => {
  return posts
    .filter((post) => ['report'].includes(post.article_type))
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
});

const articles = computed(() => {
  return posts
    .filter((post) => ['news', 'blogpost'].includes(post.article_type))
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
});
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
