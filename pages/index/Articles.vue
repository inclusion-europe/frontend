<template>
  <section class="articles-section">
    <h2 class="section-title section-title--blue">Recent articles</h2>
    <div class="articles-section-article_grid">
      <div class="articles-section-article_grid-list">
        <Preview
          v-for="(article, i) in posts.slice(0, 3)"
          :key="`articles_article_${i}`"
          :post="article"
          blue
        />
      </div>
      <div class="articles-section-article_grid-list" v-if="posts.length > 3">
        <Preview
          v-for="(article, i) in posts.slice(3, 6)"
          :key="`articles_article_${i}`"
          :post="article"
          blue
        />
      </div>
    </div>
    <SeeAll v-if="posts.length > 6" href="/type/articles" blue big>
      See all articles
    </SeeAll>
  </section>
</template>
<script>
import Preview from '@/elements/Preview.vue';
import SeeAll from '@/elements/SeeAll.vue';

export default {
  name: 'ArticlesSection',
  components: {
    Preview,
    SeeAll,
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped></style>
