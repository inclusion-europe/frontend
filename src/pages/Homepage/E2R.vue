<template>
  <section class="easy_to_read-section">
    <h2 class="section-title section-title--blue">Easy-to-read</h2>
    <div class="easy_to_read-section-article_grid">
      <Preview :article="articles[0]" big blue />
      <div class="easy_to_read-section-article_grid-list">
        <Preview
          v-for="(article, i) in articles.slice(1)"
          :key="`e2r_article_${i}`"
          :article="article"
          no-picture
          blue
        />
        <SeeAll href="#" blue big>See all easy-to-read articles</SeeAll>
      </div>
    </div>
  </section>
</template>
<script>
import utils from "@/scripts/utils";
import Preview from "@/elements/Preview.vue";
import SeeAll from "@/elements/SeeAll.vue";

export default {
  name: "E2R",
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
.easy_to_read-section {
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

  &-see_all {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    text-decoration: none;
    width: fit-content;

    * {
      transition: all 0.2s ease-out;
    }

    span {
      color: $ie-blue;
      font-family: GilroySemiBold;
      font-size: 20px;
      font-weight: 600;
      line-height: 12px;
    }

    svg {
      height: 10px;
      fill: $ie-blue;
    }

    &:hover,
    &:focus {
      text-decoration: underline;

      * {
        color: $ie-pink;
        fill: $ie-pink;
      }
    }
  }
}
</style>
