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

const seoMeta = computed(() => {
  if (status === 'pending') {
    return null;
  }
  return {
    description: post.value?.excerpt,
    image: post.value?.picture?.picture,
    title: `${post.value?.title} | ${config.public.defaultTitle}`,
    ogDescription: post.value?.excerpt,
    ogImage: post.value.picture?.picture,
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
  const prefetchedPost = await useMyFetch(`/post/${post}`).then((res) => {
    return utils.treatPost(res);
  });

  useServerSeoMeta({
    description: prefetchedPost.excerpt,
    image: prefetchedPost.picture?.picture,
    title: `${prefetchedPost.title} | ${config.public.defaultTitle}`,
    ogDescription: prefetchedPost.excerpt,
    ogImage: prefetchedPost.picture?.picture,
    ogTitle: `${prefetchedPost.title} | ${config.public.defaultTitle}`,
  });
});

useServerSeoMeta(seoMeta);

watch(
  post,
  (val) => {
    if (!post.value) {
      return;
    }
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
}
</style>
