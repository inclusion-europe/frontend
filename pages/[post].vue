<template>
  <div class="post_page" :class="{ indicators_page: isIndicatorsPage }">
    <div v-if="loading" class="loading">
      <img src="/loading.gif" />
    </div>
    <template v-else>
      <div class="post_page-header">
        <IeButton
          v-if="hasOtherContent"
          blue
          boxed
          class="other_content-button"
          :class="{ 'e2r-button': !shfowE2R }"
          :e2r="!showE2R"
          @click="toggleContentType"
        >
          <img v-if="!showE2R" src="@/assets/e2r.png" />
          {{ showE2R ? 'Plain English' : 'Easy-to-Read' }} version
        </IeButton>
      </div>
      <article>
        <header :class="{ 'header--column': !post.excerpt || isStaticPage }">
          <div class="header_texts">
            <h1>
              {{ post.title }}
            </h1>
            <img
              v-if="post.picture?.picture && isStaticPage"
              :src="post.picture.picture"
              :alt="post.picture.alt || `Picture for ${post.title}`"
            />
            <h2 v-if="post.excerpt">
              {{ post.excerpt }}
            </h2>
          </div>
          <img
            v-if="post.picture?.picture && !isStaticPage"
            :src="post.picture.picture"
            :alt="post.picture.picture || `Picture for ${post.title}`"
          />
        </header>
        <section class="post-content">
          <e-2-r-content v-if="showE2R" :content="post.content_e2r" />
          <vue-markdown
            :source="post.content"
            :options="{ html: true }"
            v-else
          />
        </section>
        <section v-if="isIndicatorsPage" class="indicators-table">
          <h4>Country ranking</h4>
          <inclusion-indicators-countries />
        </section>
        <section v-if="post.tags" class="post-tags">
          <h3>
            Tags:
            <template v-for="(tag, i) in post.tags" :key="`tag_${tag}_link`">
              <router-link class="tag" :to="`/tag/${encodeURI(tag)}`">
                {{ tag }}
              </router-link>
              <span v-if="i < post.tags.length - 1" :key="`tagsep_${i}`">
                ,
              </span>
            </template>
          </h3>
        </section>
      </article>
    </template>
  </div>
</template>
<script setup>
import VueMarkdown from 'vue-markdown-render';
import InclusionIndicatorsCountries from '~/elements/IndicatorsCountries.vue';
import E2RContent from '~/elements/E2RContent.vue';
import IeButton from '~/elements/Button.vue';
import { useMainStore } from '~/store';

const config = useRuntimeConfig();
const store = useMainStore();
const router = useRouter();
const route = useRoute();

const post = ref({
  title: 'Test',
});
const showE2R = ref(false);
const loading = ref(true);

const isIndicatorsPage = computed(() => {
  return route.path === '/indicators';
});
const isStaticPage = computed(() => {
  return post.value.article_type === 'static_page';
});
const hasOtherContent = computed(() => {
  if (post.value.default_type === 'e2r') {
    return !!post.value.content;
  }

  return !!post.value.content_e2r;
});

useHead({
  title: `${post.value.title} | ${config.public.defaultTitle}`,
});

useSeoMeta({
  description: () => post.value.excerpt,
  image: () => post.value.picture?.picture,
  title: () => `${post.value.title} | ${config.public.defaultTitle}`,
  ogDescription: () => post.value.excerpt,
  ogImage: () => post.value.picture?.picture,
  ogTitle: () => `${post.value.title} | ${config.public.defaultTitle}`,
});

watch(
  showE2R,
  (val) => {
    if (val) {
      router.replace({
        query: {
          e2r: 1,
        },
      });
    } else {
      router.replace({
        query: {},
      });
    }
  },
  { immediate: true }
);

const toggleContentType = () => {
  showE2R.value = !showE2R.value;
};

onMounted(() => {
  const posts = store.getPosts;
  const workPost = posts.find(
    (art) =>
      art.url.toLowerCase() ===
      `/${encodeURIComponent(route.params.post).toLowerCase()}`
  );
  if (workPost) {
    workPost.content = unescape(workPost.content);
    workPost.content_e2r =
      typeof workPost.content_e2r === 'string'
        ? JSON.parse(workPost.content_e2r)
        : workPost.content_e2r;
    workPost.tags =
      typeof workPost.tags === 'string'
        ? workPost.tags.split(',')
        : workPost.tags;
    post.value = workPost;

    const shouldShowE2R = route.query.e2r && post.value.content_e2r;
    if (post.value.default_type === 'e2r' || shouldShowE2R) {
      showE2R.value = true;
    }
    loading.value = false;
    // } else {
    //     router.push('/');
  }
});
</script>
<style lang="scss" scoped>
article {
  &:deep(img) {
    display: block;
    width: auto;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    border-radius: 9px;

    @media screen and (min-width: 1024px) {
      max-width: 60%;
    }
  }
}
</style>
