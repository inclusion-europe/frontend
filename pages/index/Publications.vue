<template>
  <section class="publications-section">
    <h2 class="section-title section-title--pink">Publications</h2>
    <div class="publications-section-publication_grid">
      <div class="publications-section-publication_grid-list">
        <Preview :post="posts[0]" big no-picture />
        <Preview v-if="posts.length > 1" :post="posts[1]" big no-picture />
      </div>
      <div
        v-if="posts.length > 2"
        class="publications-section-publication_grid-list"
      >
        <Preview
          v-for="(publication, i) in posts.slice(2, 6)"
          :key="`publications_publication_${i}`"
          :post="publication"
          no-picture
        />
        <SeeAll href="/type/publications" v-if="posts.length > 5" big>
          See all publications
        </SeeAll>
      </div>
    </div>
  </section>
</template>
<script>
import Preview from '@/elements/Preview.vue';
import SeeAll from '@/elements/SeeAll.vue';

export default {
  name: 'PublicationsSection',
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
<style lang="scss" scoped>
.publications-section {
  &-publication_grid {
    &-list {
      gap: 70px;

      &:not(:first-child) {
        gap: 40px;
        margin-left: 30px;
      }
    }
  }
}
</style>
