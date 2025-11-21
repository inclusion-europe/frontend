<template>
  <section class="publications-section">
    <h2 class="section-title section-title--pink">Reports</h2>
    <div class="publications-section-publication_grid">
      <div class="publications-section-publication_grid-list">
        <Preview
          v-for="(publication, i) in posts.slice(0, 3)"
          :key="`publications_publication_${i}`"
          :post="publication"
          pink
        />
      </div>
      <div
        v-if="posts.length > 3"
        class="publications-section-publication_grid-list"
      >
        <Preview
          v-for="(publication, i) in posts.slice(3, 6)"
          :key="`publications_publication_${i}`"
          :post="publication"
          no-picture
          pink
        />
      </div>
    </div>
    <SeeAll href="/type/reports" v-if="posts.length > 6" big>
      See all reports
    </SeeAll>
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
