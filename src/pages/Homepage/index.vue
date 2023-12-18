<template>
  <div>
    <div v-if="loading && !notLive" class="loading">
      <img src="/loading.gif" />
    </div>
    <template v-else-if="!notLive">
      <Hero :highlights="highlights" />
      <E2R :posts="e2r_articles" />
      <Videos v-if="false" />
      <Articles :posts="articles" />
      <Publications v-if="publications.length" :posts="publications" />
    </template>
    <h1 class="maint" v-else>
      The website is currently under maintenance, check back soon!
    </h1>
  </div>
</template>
<script>
import Hero from "./Hero";
import E2R from "./E2R";
import Videos from "./Videos";
import Articles from "./Articles";
import Publications from "./Publications";
export default {
  name: "Homepage",
  components: {
    Hero,
    E2R,
    Videos,
    Articles,
    Publications,
  },
  data: () => ({
    loading: true,
    posts: [],
  }),
  computed: {
    notLive() {
      return process.env.VUE_APP_NOTLIVE.toLowerCase() === "true";
    },
    e2r_articles() {
      return this.posts
        .filter((post) => ["e2r_article"].includes(post.article_type))
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    },
    highlights() {
      return this.posts.filter((post) => post.highlighted).slice(0, 3);
    },
    publications() {
      return this.posts
        .filter((post) => ["report"].includes(post.article_type))
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    },
    articles() {
      return this.posts
        .filter((post) => ["news", "blogpost"].includes(post.article_type))
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    },
  },
  mounted() {
    if (!this.notLive) {
      this.$axios.get("/posts/all").then((res) => {
        this.posts = res.data.map((post) => ({
          ...post,
          picture: JSON.parse(post.picture),
        }));
        this.loading = false;
      });
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.maint {
  max-width: $max-width;
  margin: auto;

  color: #1e1e1e;
  font-size: 40px;
  font-family: GilroyBold;
  min-height: calc(100vh - 400px);
}

.loading {
  display: flex;
  min-height: calc(100vh - 400px);
  align-items: center;
  justify-content: center;

  img {
    width: 60%;
  }
}
</style>
