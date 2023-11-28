<template>
  <div>
    <template v-if="!notLive">
      <Hero />
      <E2R />
      <Videos v-if="false" />
      <Articles />
      <Publications />
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
  computed: {
    notLive() {
      return process.env.VUE_APP_NOTLIVE.toLowerCase() === "true";
    },
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
</style>
