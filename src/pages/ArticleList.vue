<template>
  <div class="articles_page">
    <h1>{{ pageTitle }}</h1>
    <div v-for="article in articles" :key="`article_${article.idx}`">
      {{ article.title }}
    </div>
  </div>
</template>
<script>
export default {
  name: "ArticleList",
  data: () => ({
    articles: [],
  }),
  computed: {
    pageTitle() {
      switch (this.$route.name) {
        case "tag":
          return 'Articles tagged "' + this.$route.params.tag + '"';
        default:
          return "Articles";
      }
    },
  },
  mounted() {
    let title_prefix = "";
    switch (this.$route.name) {
      case "tag":
        this.loadArticlesByTag();
        this.title_prefix = this.pageTitle + " | ";
    }
    document.title = title_prefix + process.env.VUE_APP_DEFAULT_TITLE;
  },
  methods: {
    loadArticlesByTag() {
      let { tag } = this.$route.params;
      this.$axios.get("/articles/tag/" + tag).then((res) => {
        this.articles = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.articles_page {
  width: $max-width;
  max-width: 80vw;
  margin: auto;
  padding-bottom: 30px;
}
</style>
