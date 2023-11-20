<template>
  <div class="article_page">
    <div v-if="loading">⏳</div>
    <h1 v-else>{{ article.title }}</h1>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Article",
  data: () => ({
    article: {
      title: "Test",
    },
    loading: true,
  }),
  computed: {
    ...mapGetters(["getArticles"]),
  },
  mounted() {
    while (!this.getArticles.length) {
      this.loading = true;
    }
    let articles = this.getArticles;
    let article = articles.find((art) => {
      return (
        art.url.toLowerCase() ===
        "/" + encodeURIComponent(this.$route.params.article).toLowerCase()
      );
    });
    if (article) {
      this.article = article;
      this.loading = false;
    } else {
      console.log(
        "/" + encodeURIComponent(this.$route.params.article).toLowerCase()
      );
    }
  },
  methods: {
    ...mapActions(["loadArticles"]),
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.article_page {
  max-width: $max-width;
  margin: auto;
  padding-bottom: 30px;
}
</style>
