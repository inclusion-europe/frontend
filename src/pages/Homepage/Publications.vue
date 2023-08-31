<template>
  <section class="publications-section">
    <h2 class="section-title section-title--pink">Publications</h2>
    <div class="publications-section-publication_grid">
      <div class="publications-section-publication_grid-list">
        <Preview :article="publications[0]" big no-picture />
        <Preview :article="publications[1]" big no-picture />
      </div>
      <div class="publications-section-publication_grid-list">
        <Preview
          v-for="(publication, i) in publications.slice(2)"
          :key="`publications_publication_${i}`"
          :article="publication"
          no-picture
        />
        <SeeAll href="#" big>See all publications</SeeAll>
      </div>
    </div>
  </section>
</template>
<script>
import utils from "@/scripts/utils";
import Preview from "@/elements/Preview.vue";
import SeeAll from "@/elements/SeeAll.vue";

export default {
  name: "Publications",
  components: {
    Preview,
    SeeAll,
  },
  computed: {
    publications() {
      return utils.articlesArray(5);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.publications-section {
  max-width: $max-width;
  margin: auto;
  margin-bottom: 130px;

  .section-title {
    text-align: center;
    margin: 37px auto;
    width: auto;
  }

  &-publication_grid {
    display: grid;
    grid-template: auto / 1fr 1fr;
    gap: 150px 135px;
    align-items: end;

    &-list {
      display: flex;
      flex-direction: column;
      gap: 70px;

      &:not(:first-child) {
        gap: 40px;
        margin-left: 30px;
      }
    }
  }
}
</style>
