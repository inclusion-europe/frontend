<template>
  <div>
    <Hero />
    <E2R />
    <Videos />
    <Articles />
    <Publications />
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
