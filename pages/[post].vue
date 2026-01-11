<template>
  <div class="post_page" :class="{ indicators_page: isIndicatorsPage }">
    <div v-if="loading || status === 'pending'" class="loading">
      <img src="/loading.gif" />
    </div>
    <template v-else>
      <div class="post_page-header">
        <IeButton
          v-if="hasOtherContent"
          blue
          boxed
          class="other_content-button"
          :class="{ 'e2r-button': !showE2R }"
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
            <div class="header_info">
              <span>
                Published {{ utils.formatDate(post.created_at) }}
                {{
                  author ? `by ${author.first_name} ${author.last_name}` : ''
                }}
              </span>
            </div>
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
import utils from '~/scripts/utils';
import useMyFetch from '~/composables/useMyFetch';

const config = useRuntimeConfig();
const store = useMainStore();
const router = useRouter();
const route = useRoute();

// Post data ref
const postData = ref(null);

// Variables needed for meta tags
const defaultTitle = config.public.defaultTitle;

// Define computed values for SEO early
const post = computed(() => {
  if (postData.value) {
    return postData.value;
  }

  const storePost = store.getPost(route.params.post);
  if (storePost) {
    return storePost;
  }

  return null;
});

const pageTitle = computed(() =>
  post.value?.title ? `${post.value.title} | ${defaultTitle}` : defaultTitle
);

const pageDescription = computed(
  () =>
    post.value?.excerpt ||
    'Ambitions. Rights. Belonging. 20 million people with intellectual disabilities and their families in Europe.'
);

const pageImage = computed(
  () =>
    post.value?.picture?.picture ||
    'https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg'
);

const pageUrl = computed(() => `https://www.inclusion.eu${route.path}`);

// Define updateHeadMeta function early so it can be used in onServerPrefetch
const updateHeadMeta = () => {
  useHead({
    title: pageTitle.value,
  });
  useSeoMeta({
    title: pageTitle.value,
    description: pageDescription.value,
    ogTitle: pageTitle.value,
    ogDescription: pageDescription.value,
    ogImage: pageImage.value,
    ogUrl: pageUrl.value,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle.value,
    twitterDescription: pageDescription.value,
    twitterImage: pageImage.value,
  });
};

// Fetch post data using onServerPrefetch for SSR
onServerPrefetch(async () => {
  try {
    const data = await useMyFetch(`/post/slug/${route.params.post}`);
    if (data) {
      postData.value = utils.treatPost(data);
      // Update head meta tags after fetching
      updateHeadMeta();
    }
  } catch (e) {
    console.error('API fetch failed:', e);
  }
});

const author = ref(null);
const showE2R = ref(route.query.e2r === '1');
const loading = computed(() => store.isLoading);

const isIndicatorsPage = computed(() => {
  return route.path === '/indicators';
});

const isStaticPage = computed(() => {
  return post.value?.article_type === 'static_page';
});

const hasOtherContent = computed(() => {
  if (!post.value) return false;

  if (post.value.default_type === 'e2r') {
    return !!post.value.content;
  }
  return !!post.value.content_e2r;
});

const displayAuthor = computed(() => {
  return post.value?.author;
});

// Watch for post data changes and update meta tags
watch(
  postData,
  () => {
    if (postData.value) {
      updateHeadMeta();
    }
  },
  { immediate: true }
);

// Ensure the `updateHeadMeta` function is called whenever the `post` data changes
watch(
  post,
  (newPost) => {
    if (newPost) {
      updateHeadMeta();
    }
  },
  { immediate: true }
);

// Load additional data on mount
onMounted(async () => {
  // Load post from store if not already available
  if (!post.value && !store.isLoading) {
    await store.loadPost(route.params.post);
  }

  // Load author data
  if (post.value?.author) {
    try {
      const authorData = await useMyFetch(`/author/${post.value.author}`);
      author.value = authorData[0];
    } catch (error) {
      console.warn('Failed to load author data:', error);
    }
  }

  // Handle E2R content display
  const shouldShowE2R = route.query.e2r && post.value?.content_e2r;
  if (post.value?.default_type === 'e2r' || shouldShowE2R) {
    showE2R.value = true;
    if (!route.query.e2r) {
      await router.replace({ query: { e2r: 1 } });
    }
  }
});

const toggleContentType = () => {
  showE2R.value = !showE2R.value;

  if (showE2R.value) {
    router.replace({ query: { e2r: 1 } });
  } else {
    router.replace({ query: {} });
  }
};
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
  }

  &:deep(ul) {
    list-style-type: disc;
  }

  &:deep(ol) {
    list-style-type: decimal;
  }

  &:deep(ul),
  &:deep(ol) {
    list-style-position: inside;
    margin-bottom: 1rem;

    p {
      display: inline;
    }
  }
}
</style>
