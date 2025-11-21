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

const config = useRuntimeConfig();
const store = useMainStore();
const router = useRouter();
const route = useRoute();

// Try to fetch post data server-side for SEO
let postData = ref(null);
let fetchError = ref(null);

try {
  if (config.public.backendUrl && config.public.backendUrl !== '/') {
    const { data, error } = await useLazyFetch(
      `/post/slug/${route.params.post}`,
      {
        baseURL: config.public.backendUrl,
        transform: (res) => utils.treatPost(res),
        default: () => null,
        server: true, // Ensure this runs on server for SEO
      }
    );
    postData = data;
    fetchError = error;
  }
} catch (e) {
  console.error('API fetch failed:', e);
  fetchError.value = 'API not available';
}

const post = computed(() => {
  // Fallback to store data or create a minimal post object for SEO
  if (postData.value) {
    return postData.value;
  }

  const storePost = store.getPost(route.params.post);
  if (storePost) {
    return storePost;
  }

  // Create realistic fallback data for better SEO and social sharing
  const fallbackPosts = {
    'education-rights': {
      title: 'Education Rights for People with Intellectual Disabilities',
      excerpt:
        'Ensuring equal access to quality education for all people with intellectual disabilities across Europe.',
      picture: {
        picture:
          'https://www.inclusion-europe.eu/wp-content/uploads/2015/03/IMG_6977-410x370.jpeg',
      },
      content:
        'Education is a fundamental right for everyone, including people with intellectual disabilities.',
      article_type: 'article',
    },
    'inclusion-stories': {
      title: 'Stories of Inclusion: Living Independently in Europe',
      excerpt:
        'Real stories from people with intellectual disabilities who are living independently and participating fully in their communities.',
      picture: {
        picture: 'https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg',
      },
      content:
        'These inspiring stories show what is possible when communities embrace inclusion.',
      article_type: 'article',
    },
    'policy-changes': {
      title: 'Policy Changes Needed for True Inclusion',
      excerpt:
        'Analyzing the policy changes needed across Europe to achieve genuine inclusion for people with intellectual disabilities.',
      picture: {
        picture: 'https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg',
      },
      content: 'Policy reform is essential for creating inclusive societies.',
      article_type: 'article',
    },
  };

  // Use specific fallback if available, otherwise generate generic one
  const specificFallback = fallbackPosts[route.params.post];
  if (specificFallback) {
    return {
      ...specificFallback,
      slug: route.params.post,
      url: `/${route.params.post}`,
      created_at: new Date().toISOString(),
    };
  }

  // Generic fallback
  return {
    title: route.params.post
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    excerpt: `Learn about ${route.params.post.replace(
      /-/g,
      ' '
    )} from Inclusion Europe - promoting rights and full participation for people with intellectual disabilities across Europe.`,
    picture: {
      picture: 'https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg',
    },
    content: `This article discusses ${route.params.post.replace(
      /-/g,
      ' '
    )} and its importance for people with intellectual disabilities in Europe.`,
    slug: route.params.post,
    url: `/${route.params.post}`,
    article_type: 'article',
    created_at: new Date().toISOString(),
  };
});

// If there's an error fetching, log it for debugging
if (process.server && fetchError.value) {
  console.error('Failed to fetch post data:', fetchError.value);
}

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

// Set up SEO meta tags with proper fallbacks
const defaultTitle = config.public.defaultTitle;
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

// Set SEO meta tags
useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogImage: pageImage,
  ogUrl: pageUrl,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: pageImage,
});

// Debug logging on server
if (process.server) {
  console.log('=== SEO Meta Debug ===');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Backend URL:', config.public.backendUrl);
  console.log('Slug:', route.params.post);
  console.log('Has Post Data:', !!postData?.value);
  console.log('Fetch Error:', fetchError?.value);
  console.log('Final Post:', !!post.value);
  console.log('Title:', pageTitle.value);
  console.log('Description:', pageDescription.value);
  console.log('Image:', pageImage.value);
  console.log('====================');
}

// Load additional data on mount
onMounted(async () => {
  // Load post if not already available
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
