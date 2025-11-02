<template>
  <PostList :posts="posts" />
</template>
<script setup>
import PostList from '~/components/PostList.vue';
import utils from '~/scripts/utils.js';
import useMyFetch from '~/composables/useMyFetch';

const route = useRoute();
const config = useRuntimeConfig();

const posts = ref([]);

const getterRoute = computed(() => {
  let { type } = route.params;

  if (type === 'e2r') return '/posts/e2r';

  switch (type) {
    case 'articles':
      type = 'news,blogpost';
      break;
    case 'reports':
      type = 'report';
      break;
    case 'events':
      type = 'event';
      break;
    default:
      break;
  }

  return `/posts/type/${type}`;
});

// Get human-readable type name
const typeName = computed(() => {
  const { type } = route.params;

  switch (type) {
    case 'articles':
      return 'Articles';
    case 'reports':
      return 'Reports';
    case 'events':
      return 'Events';
    case 'e2r':
      return 'Easy-to-Read';
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
});

// Set up SEO meta tags
const pageTitle = computed(
  () => `${typeName.value} | ${config.public.defaultTitle}`
);

const pageDescription = computed(
  () =>
    `Browse ${typeName.value.toLowerCase()} on Inclusion Europe. Find content about intellectual disabilities and inclusion in Europe.`
);

const pageUrl = computed(() => `https://www.inclusion.eu${route.path}`);

// Set SEO meta tags
useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogImage: 'https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg',
  ogUrl: pageUrl,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: 'https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg',
});

const loadPosts = async () => {
  try {
    const res = await useMyFetch(getterRoute.value);
    posts.value = utils.treatPosts(res);
  } catch (error) {
    console.error('Failed to load posts for type:', error);
    posts.value = [];
  }
};

// Load posts server-side for better SEO
await loadPosts();

// Reload when type changes
watch(() => route.params.type, loadPosts);
</script>
