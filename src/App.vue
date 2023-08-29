<template>
  <div class="website">
    <Header />
    <Homepage />
    <EUSupport />
    <Footer />
    <ScrollUp />
  </div>
</template>

<script>
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import EUSupport from "./components/EUSupport";
import Footer from "./components/Footer";
import ScrollUp from "./elements/ScrollUp.vue";

export default {
  name: "App",
  components: {
    Header,
    Homepage,
    EUSupport,
    Footer,
    ScrollUp,
  },
};
</script>

<style src="@/assets/style/index.scss" lang="scss"></style>
