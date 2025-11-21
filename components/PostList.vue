<template>
  <div class="posts_page">
    <h1 class="page_title">
      {{ pageTitle }}
    </h1>
    <div class="posts_page-list">
      <Preview
        v-for="post in currentPagePosts"
        :key="`post_${post.idx}`"
        :post="post"
        stack
      />
    </div>
    <div class="posts_page-pagination" v-if="props.posts.length > pageLength">
      <PostsPagination :length="pagesAmount" :current-page="currentPage" />
    </div>
    <div class="posts_page-pagination" v-if="pagesAmount > 1">
      <span> Go to page:</span>
      <select @input="(e) => goToPage(+e.target.value)">
        <option disabled :value="null" selected />
        <option
          v-for="(e, i) in new Array(pagesAmount)"
          :value="i + 1"
          :key="`jump_to_${i + 1}`"
        >
          {{ i + 1 }}
        </option>
      </select>
    </div>
  </div>
</template>
<script setup>
import Preview from '~/elements/Preview.vue';
import PostsPagination from './PostsPagination.vue';

const currentPage = ref(1);
const pageLength = ref(9);

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

const props = defineProps({
  posts: {
    type: Array,
    required: true,
  },
});

const typeTitle = computed(() => {
  switch (route.params.type) {
    case 'articles':
      return 'Articles';
    case 'e2r':
      return 'Easy-to-Read articles';
    case 'events':
      return 'Events';
    case 'reports':
      return 'Reports';
    case 'podcast':
      return 'Podcasts';
    default:
      return 'Posts';
  }
});

const currentPagePosts = computed(() => {
  return props.posts.slice(
    (currentPage.value - 1) * pageLength.value,
    currentPage.value * pageLength.value
  );
});

const pagesAmount = computed(() => {
  return Math.ceil(props.posts.length / pageLength.value);
});

const pageTitle = computed(() => {
  let returnee = (() => {
    switch (route.name) {
      case 'tag-tag':
        return `Posts tagged "${route.params.tag}"`;
      case 'search-search':
        return `Search results for "${route.params.search}"`;
      case 'type-type':
        return typeTitle.value;
      default:
        return 'Posts';
    }
  })();

  if (pagesAmount.value > 1) {
    returnee += ` - Page ${currentPage.value}`;
  }

  return returnee;
});

useServerSeoMeta({
  title: `${pageTitle.value} | ${config.public.defaultTitle}`,
  ogTitle: `${pageTitle.value} | ${config.public.defaultTitle}`,
});

useSeoMeta({
  title: `${pageTitle.value} | ${config.public.defaultTitle}`,
  ogTitle: `${pageTitle.value} | ${config.public.defaultTitle}`,
});

const goToPage = (pageNr) => {
  router.replace({
    query: {
      ...route.query,
      pageNr,
    },
  });
};

onMounted(() => {
  currentPage.value = +route.query.pageNr || 1;

  if (currentPage.value > pagesAmount || !currentPage.value) {
    router.replace({
      params: { ...route.query, pageNr: 1 },
    });
  }
});

useHead({
  title: `${pageTitle.value} | ${config.public.defaultTitle}`,
});
</script>
<style lang="scss" scoped>
.posts_page {
  width: var(--width);
  max-width: var(--max-width);
  margin: auto;
  padding-bottom: 30px;

  .page_title {
    color: #1e1e1e;
    font-size: 40px;
    font-family: GilroyBold;
    margin-bottom: 30px;
  }

  .posts_page-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .posts_page-pagination {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 0.4rem;
  }
}
@media screen and (min-width: 1024px) {
  .posts_page {
    .posts_page-list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 44px 32px;
      align-items: start;
      justify-items: start;
    }
  }
}
</style>
