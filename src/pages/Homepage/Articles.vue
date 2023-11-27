<template>
  <section class="articles-section">
    <h2 class="section-title section-title--blue">Recent articles</h2>
    <div class="articles-section-article_grid">
      <Preview :article="articles[0]" big blue />
      <div class="articles-section-article_grid-list">
        <Preview
          v-for="(article, i) in articles.slice(1)"
          :key="`articles_article_${i}`"
          :article="article"
          no-picture
          blue
        />
        <SeeAll href="#" blue big>See all articles</SeeAll>
      </div>
    </div>
  </section>
</template>
<script>
import utils from "@/scripts/utils";
import Preview from "@/elements/Preview.vue";
import SeeAll from "@/elements/SeeAll.vue";

export default {
  name: "Articles",
  components: {
    Preview,
    SeeAll,
  },
  computed: {
    articles() {
      return utils.articlesArray(5);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.articles-section {
  width: $max-width;
  max-width: 80vw;
  margin: auto;
  margin-bottom: 130px;

  .section-title {
    text-align: center;
    margin: 37px auto;
    width: auto;
  }

  &-article_grid {
    display: grid;
    grid-template: auto / 1fr 1fr;
    gap: 150px 135px;
    align-items: start;

    &-list {
      margin-left: 30px;
      display: flex;
      flex-direction: column;
      gap: 40px;
    }
  }
}
</style>
