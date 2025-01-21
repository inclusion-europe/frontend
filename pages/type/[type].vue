<template>
  <PostList :posts="posts" />
</template>
<script setup>
import PostList from '~/components/PostList.vue';
import utils from '~/scripts/utils.js';
import useMyFetch from '~/composables/useMyFetch';

const router = useRouter();
const route = useRoute();

const posts = ref([]);

const getterRoute = computed(() => {
  let { type } = route.params;

  if (type === 'e2r') return '/posts/e2r';

  switch (type) {
    case 'articles':
      type = 'news,blogpost';
      break;
    case 'publications':
      type = 'report';
      break;
    default:
      break;
  }

  return `/posts/type/${type}`;
});

const loadPosts = () => {
  useMyFetch(getterRoute.value).then((res) => {
    posts.value = utils.treatPosts(res);

    if (currentPage > pagesAmount || !currentPage) {
      router.replace({
        params: { ...route.params, pageNr: 1 },
      });
    }
  });
};

onMounted(() => {
  loadPosts();
});
</script>
