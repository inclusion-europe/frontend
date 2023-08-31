<template>
  <div class="website">
    <Header />
    <router-view />
    <EUSupport v-if="!onAdminPage" />
    <Footer />
    <ScrollUp />
  </div>
</template>

<script>
import Header from "./components/Header";
import EUSupport from "./components/EUSupport";
import Footer from "./components/Footer";
import ScrollUp from "./elements/ScrollUp.vue";

export default {
  name: "App",
  components: {
    Header,
    EUSupport,
    Footer,
    ScrollUp,
  },
  computed: {
    onAdminPage() {
      return this.$route.name === "admin";
    },
  },
};
</script>

<style src="@/assets/style/index.scss" lang="scss"></style>
