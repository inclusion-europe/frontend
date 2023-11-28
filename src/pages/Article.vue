<template>
  <div class="article_page" :class="{ indicators_page: isIndicatorsPage }">
    <div v-if="loading">⏳</div>
    <template v-else>
      <div class="article_page-header">
        <Button
          v-if="hasOtherContent"
          blue
          boxed
          class="other_content-button"
          :class="{ 'e2r-button': !showE2R }"
          :e2r="!showE2R"
          @click="toggleContentType"
        >
          <img v-if="!showE2R" src="@/assets/e2r.png" />
          {{ showE2R ? "Plain English" : "Easy-to-Read" }} version
        </Button>
      </div>
      <article>
        <header :class="{ 'header--column': !article.excerpt || isStaticPage }">
          <div class="header_texts">
            <h1>
              {{ article.title }}
            </h1>
            <img
              v-if="article.picture?.picture && isStaticPage"
              :src="article.picture.picture"
              :alt="article.picture.alt || `Picture for ${article.title}`"
            />
            <h2 v-if="article.excerpt">{{ article.excerpt }}</h2>
          </div>
          <img
            v-if="article.picture?.picture && !isStaticPage"
            :src="article.picture.picture"
            :alt="article.picture.picture || `Picture for ${article.title}`"
          />
        </header>
        <section class="article-content">
          <e-2-r-content :content="article.content_e2r" v-if="showE2R" />
          <vue-markdown :source="article.content" v-else />
        </section>
        <section v-if="isIndicatorsPage" class="indicators-table">
          <h4>Country ranking</h4>
          <inclusion-indicators-countries />
        </section>
        <section class="article-tags" v-if="article.tags">
          <h3>
            Tags:
            <template v-for="(tag, i) in article.tags" :key="`tag_${tag}`">
              <router-link :to="`/tag/${encodeURI(tag)}`" class="tag">
                {{ tag }}
              </router-link>
              <span v-if="i < article.tags.length - 1">, </span>
            </template>
          </h3>
        </section>
      </article>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import VueMarkdown from "vue-markdown-render";
import InclusionIndicatorsCountries from "./InclusionIndicators/Countries.vue";
import E2RContent from "@/elements/E2RContent.vue";
import Button from "@/elements/Button.vue";

export default {
  name: "Article",
  data: () => ({
    article: {
      title: "Test",
    },
    showE2R: false,
    loading: true,
  }),
  components: {
    VueMarkdown,
    InclusionIndicatorsCountries,
    E2RContent,
    Button,
  },
  computed: {
    ...mapGetters(["getArticles"]),
    isIndicatorsPage() {
      return this.$route.path === "/article/inclusion-indicators";
    },
    isStaticPage() {
      return this.article.article_type === "static_page";
    },
    hasOtherContent() {
      switch (this.article.default_type) {
        case "e2r":
          return !!this.article.content;
        default:
          return !!this.article.content_e2r;
      }
    },
  },
  watch: {
    showE2R(val) {
      if (val)
        this.$router.replace({
          query: {
            e2r: 1,
          },
        });
      else
        this.$router.replace({
          query: {},
        });
    },
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
      article.content_e2r =
        typeof article.content_e2r === "string"
          ? JSON.parse(article.content_e2r)
          : article.content_e2r;
      article.tags =
        typeof article.tags === "string"
          ? article.tags.split(",")
          : article.tags;
      this.article = article;
      document.title =
        article.title + " | " + process.env.VUE_APP_DEFAULT_TITLE;
      let shouldShowE2R = this.$route.query.e2r && article.content_e2r;
      if (article.default_type === "e2r" || shouldShowE2R) this.showE2R = true;
      this.loading = false;
    } else {
      console.log(
        "/" + encodeURIComponent(this.$route.params.article).toLowerCase()
      );
    }
  },
  methods: {
    ...mapActions(["loadArticles"]),
    toggleContentType() {
      this.showE2R = !this.showE2R;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.article_page {
  width: $max-width;
  max-width: 80vw;
  margin: auto;
  padding-bottom: 30px;

  &-header {
    margin-bottom: 12px;
    .other_content-button {
      img {
        height: 45px;
        border-radius: 3px;
      }

      display: flex;
      align-items: center;
      gap: 12px;

      padding-left: 38px;
      padding-right: 38px;

      &.e2r-button {
        padding-left: 12px;
      }
    }
  }

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
          font-size: 22px;
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

    .article-tags {
      .tag {
        color: $black;
      }
    }
  }

  &.static_page {
    header {
      flex-direction: column;

      img {
        width: 100%;
      }
    }
  }

  &.indicators_page {
    max-width: 90vw;

    article {
      header {
        width: $max-width;
        max-width: 80vw;
        margin: auto;
      }
      section {
        width: $max-width;
        max-width: 80vw;
        margin: auto;

        &.indicators-table {
          margin-top: 2rem;
          max-width: 90vw;
          width: fit-content;

          & > *:not(.countries-ranking) {
            width: $max-width;
            max-width: 80vw;
            margin-left: 0;
          }

          .countries-ranking {
            position: relative;
            left: calc((1128px - 100%) / 2);
          }

          h4 {
            width: $max-width;
            max-width: 80vw;
            color: #ed0f69;
            font-family: GilroySemiBold;
            font-size: 32px;
            margin: auto;
            margin-bottom: 12px;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/style/variables.scss";
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
        font-size: 22px;
      }

      img {
        width: 100%;
        border-radius: 9px;
      }

      a {
        color: $ie-pink;
      }
    }
  }
}
</style>
