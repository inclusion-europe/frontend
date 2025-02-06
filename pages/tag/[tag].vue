<template>
  <PostList :posts="posts" />
</template>

<script setup>
import PostList from '~/components/PostList.vue';
import utils from '~/scripts/utils.js';
import useMyFetch from '~/composables/useMyFetch';

const route = useRoute();

const posts = ref([]);

const loadPosts = () => {
  const { tag } = route.params;

  useMyFetch(`/posts/tag/${tag}`).then((res) => {
    posts.value = utils.treatPosts(res);
  });
};

onMounted(() => {
  loadPosts();
});
</script>
