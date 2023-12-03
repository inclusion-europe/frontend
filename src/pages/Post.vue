<template>
  <div class="post_page" :class="{ indicators_page: isIndicatorsPage }">
    <div v-if="loading">⏳</div>
    <template v-else>
      <div class="post_page-header">
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
        <header :class="{ 'header--column': !post.excerpt || isStaticPage }">
          <div class="header_texts">
            <h1>
              {{ post.title }}
            </h1>
            <img
              v-if="post.picture?.picture && isStaticPage"
              :src="post.picture.picture"
              :alt="post.picture.alt || `Picture for ${post.title}`"
            />
            <h2 v-if="post.excerpt">{{ post.excerpt }}</h2>
          </div>
          <img
            v-if="post.picture?.picture && !isStaticPage"
            :src="post.picture.picture"
            :alt="post.picture.picture || `Picture for ${post.title}`"
          />
        </header>
        <section class="post-content">
          <e-2-r-content :content="post.content_e2r" v-if="showE2R" />
          <vue-markdown
            :source="post.content"
            :options="{ html: true }"
            v-else
          />
        </section>
        <section v-if="isIndicatorsPage" class="indicators-table">
          <h4>Country ranking</h4>
          <inclusion-indicators-countries />
        </section>
        <section class="post-tags" v-if="post.tags">
          <h3>
            Tags:
            <template v-for="(tag, i) in post.tags" :key="`tag_${tag}`">
              <router-link :to="`/tag/${encodeURI(tag)}`" class="tag">
                {{ tag }}
              </router-link>
              <span v-if="i < post.tags.length - 1">, </span>
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
  name: "Post",
  data: () => ({
    post: {
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
    ...mapGetters(["getPosts"]),
    isIndicatorsPage() {
      return this.$route.path === "/indicators";
    },
    isStaticPage() {
      return this.post.article_type === "static_page";
    },
    hasOtherContent() {
      switch (this.post.default_type) {
        case "e2r":
          return !!this.post.content;
        default:
          return !!this.post.content_e2r;
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
    while (!this.getPosts.length) {
      this.loading = true;
    }
    let posts = this.getPosts;
    let post = posts.find((art) => {
      return (
        art.url.toLowerCase() ===
        "/" + encodeURIComponent(this.$route.params.post).toLowerCase()
      );
    });
    if (post) {
      post.content = unescape(post.content);
      post.content_e2r =
        typeof post.content_e2r === "string"
          ? JSON.parse(post.content_e2r)
          : post.content_e2r;
      post.tags =
        typeof post.tags === "string" ? post.tags.split(",") : post.tags;
      this.post = post;
      document.title = post.title + " | " + process.env.VUE_APP_DEFAULT_TITLE;
      let shouldShowE2R = this.$route.query.e2r && post.content_e2r;
      if (post.default_type === "e2r" || shouldShowE2R) this.showE2R = true;
      this.loading = false;
    } else {
      console.log(
        "/" + encodeURIComponent(this.$route.params.post).toLowerCase()
      );
    }
  },
  methods: {
    ...mapActions(["loadPosts"]),
    toggleContentType() {
      this.showE2R = !this.showE2R;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.post_page {
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

    .post-tags {
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
.post_page {
  article {
    .post-content {
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

      .inclusion_indicators-links {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 48px;

        a {
          color: #fff;
          padding: 6px 8px;
          border-radius: 4px;
          border: 2px;
          border-style: solid;
          background: $ie-blue;
          border-color: $ie-blue;
          transition: 0.2s ease-out;
          text-decoration: none;
          font-size: 20px;
          font-style: normal;
          font-family: GilroyBold;
          font-weight: 700;

          &:hover,
          &:focus:not(:disabled) {
            background: $ie-blue--transp;
            color: white !important;
          }
        }
      }
    }
  }
}
</style>
