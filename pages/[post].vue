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

const post = computed(() => {
  return store.getPost(route.params.post);
});

const author = ref(null);

const showE2R = computed(() => {
  return route.query.e2r === '1';
});

const loading = computed(() => store.isLoading);

const isIndicatorsPage = computed(() => {
  return route.path === '/indicators';
});
const isStaticPage = computed(() => {
  if (status === 'pending') {
    return null;
  }
  return post.value.article_type === 'static_page';
});
const hasOtherContent = computed(() => {
  if (status === 'pending') {
    return null;
  }
  if (post.value.default_type === 'e2r') {
    return !!post.value.content;
  }

  return !!post.value.content_e2r;
});

const displayAuthor = computed(() => {
  // const author = await useMyFetch(`/author/${post.value.author}`).then(
  //   (res) => {
  //     console.log({ author: res[0] });
  //     return res[0]['first_name'];
  //   }
  // );

  // console.log('test');

  return post.value.author;
});

const seoMeta = computed(() => {
  if (status === 'pending') {
    return null;
  }
  return {
    description: post.value?.excerpt,
    image: post.value?.picture?.picture,
    title: `${post.value?.title} | ${config.public.defaultTitle}`,
    ogDescription: post.value?.excerpt,
    ogImage: post.value?.picture?.picture,
    ogTitle: `${post.value?.title} | ${config.public.defaultTitle}`,
  };
});

const headTags = computed(() => {
  if (status === 'pending') {
    return null;
  }
  if (post.value) {
    return {
      title: `${post.value.title} | ${config.public.defaultTitle}`,
      meta: [
        { property: 'description', content: post.value.excerpt },
        { property: 'image', content: post.value.picture?.picture },
        {
          property: 'title',
          content: `${post.value.title} | ${config.public.defaultTitle}`,
        },
        { property: 'og:description', content: post.value.excerpt },
        { property: 'og:image', content: post.value.picture?.picture },
        {
          property: 'og:title',
          content: `${post.value.title} | ${config.public.defaultTitle}`,
        },
      ],
    };
  }

  return {};
});

onServerPrefetch(async () => {
  const prefetchedPost = await useMyFetch(`/post/${route.params.post}`).then(
    (res) => {
      return utils.treatPost(res);
    }
  );

  useServerSeoMeta({
    description: computed(() => prefetchedPost.excerpt),
    image: computed(() => prefetchedPost.picture?.picture),
    title: computed(
      () => `${prefetchedPost.title} | ${config.public.defaultTitle}`
    ),
    ogDescription: computed(() => prefetchedPost.excerpt),
    ogImage: computed(() => prefetchedPost.picture?.picture),
    ogTitle: computed(
      () => `${prefetchedPost.title} | ${config.public.defaultTitle}`
    ),
  });
});

useSeoMeta({
  description: computed(() => post.value?.excerpt),
  image: computed(() => post.value?.picture?.picture),
  title: computed(() => `${post.value?.title} | ${config.public.defaultTitle}`),
  ogDescription: computed(() => post.value?.excerpt),
  ogImage: computed(() => post.value?.picture?.picture),
  ogTitle: computed(
    () => `${post.value?.title} | ${config.public.defaultTitle}`
  ),
});

watch(
  post,
  async (val) => {
    if (!post.value) {
      return;
    }
    author.value = (await useMyFetch(`/author/${post.value.author}`))[0];
    useHead(headTags);
    // useSeoMeta(seoMeta);
    const shouldShowE2R = route.query.e2r && val.content_e2r;
    if (val.default_type === 'e2r' || shouldShowE2R) {
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

// if (post.value) {
//   useHead({
//     title: () => `${post.value.title} | ${config.public.defaultTitle}`,
//   });
// }

useHead(headTags);
// useSeoMeta(seoMeta);

const toggleContentType = () => {
  showE2R.value = !showE2R.value;
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

    @media screen and (min-width: 1024px) {
      max-width: 60%;
    }
  }

  &:deep(ul) {
    list-style-type: disc;
    margin-bottom: 1rem;
  }

  &:deep(ol) {
    list-style-type: decimal;
    margin-bottom: 1rem;
  }
}
</style>
