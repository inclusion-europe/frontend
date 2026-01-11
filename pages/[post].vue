<template>
  <div class="post_page" :class="{ indicators_page: isIndicatorsPage }">
    <div v-if="loading || fetchedPending" class="loading">
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
const slug = computed(() => route.params.post?.toString() || '');

// Fetch post via Nuxt's useAsyncData (works for SSR and client navigation)
const {
  data: fetchedPost,
  pending: fetchedPending,
} = await useAsyncData(
  `post-${route.params.post}`,
  async () => {
    if (!slug.value) {
      return null;
    }
    const response = await useMyFetch(`/post/slug/${slug.value}`, {
      query: { prefetch: 1 },
    });
    return response ? utils.treatPost(response) : null;
  },
  {
    server: true,
    lazy: false,
    default: () => null,
    watch: [slug],
  }
);

// Variables needed for meta tags
const defaultTitle = config.public.defaultTitle;

// Define computed values for SEO early
const post = computed(() => {
  if (fetchedPost?.value) return fetchedPost.value;
  const storePost = store.getPost(slug.value);
  if (storePost) return storePost;
  return null;
});

const generateSeo = (postData) => {
  const title = postData?.title
    ? `${postData.title} | ${defaultTitle}`
    : defaultTitle;
  const description =
    postData?.excerpt ||
    'Ambitions. Rights. Belonging. 20 million people with intellectual disabilities and their families in Europe.';
  const image =
    postData?.picture?.picture ||
    'https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg';
  const url = `https://www.inclusion.eu${route.path}`;

  return {
    title,
    description,
    image,
    url,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogUrl: url,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
  };
};

const seoMeta = computed(() => generateSeo(post.value));

useHead(() => {
  const data = seoMeta.value;
  return {
    title: data.title,
    meta: [
      { key: 'description', name: 'description', content: data.description },
      { key: 'og:title', property: 'og:title', content: data.ogTitle },
      {
        key: 'og:description',
        property: 'og:description',
        content: data.ogDescription,
      },
      { key: 'og:image', property: 'og:image', content: data.ogImage },
      { key: 'og:url', property: 'og:url', content: data.ogUrl },
      {
        key: 'twitter:title',
        name: 'twitter:title',
        content: data.twitterTitle,
      },
      {
        key: 'twitter:description',
        name: 'twitter:description',
        content: data.twitterDescription,
      },
      {
        key: 'twitter:image',
        name: 'twitter:image',
        content: data.twitterImage,
      },
    ],
    link: [{ key: 'canonical', rel: 'canonical', href: data.url }],
  };
});

// Register reactive SEO metadata (accepts refs/computeds)
useServerSeoMeta(() => ({
  ...seoMeta.value,
  ogType: 'article',
  twitterCard: 'summary_large_image',
}));

useSeoMeta(() => ({
  ...seoMeta.value,
  ogType: 'article',
  twitterCard: 'summary_large_image',
}));

// onServerPrefetch was not reliably firing in some navigation modes; useAsyncData above
// ensures server fetch during SSR and runs again on client navigation.

const author = ref(null);
const showE2R = ref(route.query.e2r === '1');
const loading = computed(() => store.isLoading || !!fetchedPending.value);

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

// No imperative watches needed; `useSeoMeta` consumes the reactive `page*` values.

// Load additional data on mount
onMounted(async () => {
  // Load post from store if not already available
  if (!post.value && !store.isLoading) {
    const loadedPost = await store.loadPost(route.params.post);
    if (loadedPost) {
      fetchedPost.value = loadedPost;
    }
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
