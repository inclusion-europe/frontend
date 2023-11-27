<template>
  <div class="website">
    <Header />
    <div class="loading" v-if="loading">Loading</div>
    <router-view v-else :key="$route.fullPath" />
    <Footer />
    <ScrollUp />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollUp from "./elements/ScrollUp.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  data: () => ({
    loading: false,
  }),
  components: {
    Header,
    Footer,
    ScrollUp,
  },
  computed: {
    onAdminPage() {
      return this.$route.name === "admin";
    },
  },
  mounted() {
    document.title = process.env.VUE_APP_DEFAULT_TITLE;
    this.loadArticles().then(() => (this.loading = false));
  },
  methods: {
    ...mapActions(["loadArticles"]),
  },
};
</script>

<style src="@/assets/style/index.scss" lang="scss"></style>
