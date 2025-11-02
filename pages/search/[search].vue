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
  useMyFetch(`/posts/search/${route.params.search}`).then((res) => {
    posts.value = utils.treatPosts(res);
  });
};

onMounted(() => {
  loadPosts();
});
</script>
