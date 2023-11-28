<template>
  <div class="articles_page">
    <h1 class="page_title">{{ pageTitle }}</h1>
    <div class="articles_page-list">
      <Preview
        v-for="article in articles"
        :key="`article_${article.idx}`"
        :article="article"
        stack
      />
    </div>
  </div>
</template>
<script>
import Preview from "@/elements/Preview.vue";
export default {
  name: "ArticleList",
  components: {
    Preview,
  },
  data: () => ({
    articles: [],
  }),
  computed: {
    pageTitle() {
      switch (this.$route.name) {
        case "tag":
          return 'Articles tagged "' + this.$route.params.tag + '"';
        case "type":
          return this.typeTitle;
        default:
          return "Articles";
      }
    },
    typeTitle() {
      switch (this.$route.params.type) {
        case "articles":
          return "Articles";
        case "e2r":
          return "Easy-to-Read articles";
        case "event":
          return "Events";
        case "report":
          return "Reports";
        case "podcast":
          return "Podcasts";
        default:
          return "Articles";
      }
    },
  },
  mounted() {
    switch (this.$route.name) {
      case "tag":
        this.loadArticlesByTag();
        break;
      case "type":
        this.loadArticlesByType();
        break;
    }
    document.title = this.pageTitle + " | " + process.env.VUE_APP_DEFAULT_TITLE;
  },
  methods: {
    treatData(articles) {
      return articles.map((article) => {
        let toReturn = article;
        toReturn.picture = JSON.parse(article.picture);
        return toReturn;
      });
    },
    loadArticlesByTag() {
      let { tag } = this.$route.params;

      this.$axios.get("/articles/tag/" + tag).then((res) => {
        this.articles = this.treatData(res.data);
      });
    },
    loadArticlesByType() {
      let { type } = this.$route.params;
      if (type === "e2r") type = "e2r_article";
      if (type === "articles") type = "news||blogpost";
      if (type === "publications") type = "report";

      this.$axios.get("/articles/type/" + type).then((res) => {
        this.articles = this.treatData(res.data);
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

  .page_title {
    color: #1e1e1e;
    font-size: 40px;
    font-family: GilroyBold;
  }

  .articles_page-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 44px 32px;
    align-items: start;
    justify-items: start;
  }
}
</style>
