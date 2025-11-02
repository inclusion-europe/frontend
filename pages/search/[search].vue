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
const searchTerm = computed(() => route.params.search);

// Set up SEO meta tags for search results
const pageTitle = computed(() => 
  `Search results for "${searchTerm.value}" | ${config.public.defaultTitle}`
);

const pageDescription = computed(() => 
  `Search results for "${searchTerm.value}" on Inclusion Europe. Find articles, publications, and content about intellectual disabilities and inclusion.`
);

const pageUrl = computed(() => 
  `https://www.inclusion.eu${route.path}`
);

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
  robots: 'noindex' // Prevent indexing search result pages
});

const loadPosts = async () => {
  try {
    const res = await useMyFetch(`/posts/search/${route.params.search}`);
    posts.value = utils.treatPosts(res);
  } catch (error) {
    console.error('Failed to load search results:', error);
    posts.value = [];
  }
};

// Load posts server-side for better SEO
await loadPosts();

// Reload when search term changes
watch(() => route.params.search, loadPosts);
</script>
