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
