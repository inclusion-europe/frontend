<template>
  <div class="website">
    <div class="under_const">
      <h3>The website is still under development, more updates coming soon!</h3>
    </div>
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
    this.loadPosts().then(() => (this.loading = false));
  },
  methods: {
    ...mapActions(["loadPosts"]),
  },
};
</script>

<style src="@/assets/style/index.scss" lang="scss"></style>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.under_const {
  background: $ie-blue;
  min-height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;

  h3 {
    margin: 0;
    color: white;
    font-size: 16px;
  }
}
</style>
