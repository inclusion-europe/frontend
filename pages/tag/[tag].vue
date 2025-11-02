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
const tagName = computed(() => decodeURIComponent(route.params.tag));

// Set up SEO meta tags
const pageTitle = computed(
  () => `Posts tagged "${tagName.value}" | ${config.public.defaultTitle}`
);

const pageDescription = computed(
  () =>
    `Articles and publications tagged with "${tagName.value}" on Inclusion Europe. Find content about intellectual disabilities and inclusion.`
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
  const { tag } = route.params;

  try {
    const res = await useMyFetch(`/posts/tag/${tag}`);
    posts.value = utils.treatPosts(res);
  } catch (error) {
    console.error('Failed to load posts for tag:', error);
    posts.value = [];
  }
};

// Load posts server-side for better SEO
await loadPosts();

// Reload when tag changes
watch(() => route.params.tag, loadPosts);
</script>
