<template>
  <section class="hero-highlights">
    <Preview
      v-for="(article, i) in testArticles"
      :key="`highlight_article_${i}`"
      :article="article"
    />
  </section>
</template>
<script>
import Preview from "@/elements/Preview.vue";
import utils from "@/scripts/utils";

export default {
  name: "Highlights",
  components: {
    Preview,
  },
  computed: {
    testArticles() {
      return utils.articlesArray(3);
    },
  },
};
</script>
<style lang="scss" scoped>
.hero-highlights {
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: auto;
}
</style>
