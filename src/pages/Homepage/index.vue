<template>
  <div>
    <Hero v-show="false" />
    <E2R v-show="false" />
    <Videos v-show="false" v-if="false" />
    <Articles v-show="false" />
    <Publications v-show="false" />
    <h1 class="maint">
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
