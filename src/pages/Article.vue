<template>
  <div class="article_page">
    <div v-if="loading">⏳</div>
    <article v-else>
      <header :class="{ 'header--column': !article.excerpt }">
        <div class="header_texts">
          <h1>
            {{ article.title }}
          </h1>
          <h2 v-if="article.excerpt">{{ article.excerpt }}</h2>
        </div>
        <img
          v-if="article.picture?.picture"
          :src="article.picture.picture"
          :alt="article.picture.picture || `Picture for ${article.title}`"
        />
      </header>
      <section class="article-content">
        <vue-markdown :source="article.content" />
      </section>
      <section class="article-tags" v-if="article.tags">
        <h3>
          Tags:
          <a v-for="tag in article.tags" :key="`tag_${tag}`">{{ tag }}</a>
        </h3>
      </section>
    </article>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import VueMarkdown from "vue-markdown-render";

export default {
  name: "Article",
  data: () => ({
    article: {
      title: "Test",
    },
    loading: true,
  }),
  components: {
    VueMarkdown,
  },
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
      article.content = unescape(article.content);
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

  article {
    header {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 28px;
      margin-bottom: 38px;

      .header_texts {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 31px;
        justify-content: space-between;

        h1 {
          color: #1e1e1e;
          font-size: 40px;
          font-family: GilroyBold;
          margin: 0;
        }

        h2 {
          color: #1e1e1e;
          font-size: 20px;
          font-family: GilroyRegular;
          margin: 0;
        }
      }

      img {
        width: 42%;
        border-radius: 9px;
        aspect-ratio: 16 / 9;
        object-fit: cover;
      }

      &.header--column {
        flex-direction: column;

        img {
          width: 100%;
          border-radius: 9px;
          aspect-ratio: 16 / 4;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.article_page {
  article {
    .article-content {
      h3 {
        color: #1e1e1e;
        font-size: 32px;
        font-family: GilroyBold;
        margin: 0;
        margin-bottom: 12px;
      }

      h4 {
        color: #ed0f69;
        font-family: GilroySemiBold;
        font-size: 32px;
        margin: 0;
        margin-bottom: 12px;
      }

      p,
      li {
        color: #1e1e1e;
        font-family: GilroyRegular;
        font-size: 20px;
      }
    }

    .article-tags {
    }
  }
}
</style>
