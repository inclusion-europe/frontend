<template>
  <header class="header">
    <div class="header-content">
      <router-link to="/" tabindex="0">
        <img src="@/assets/logo.svg" class="header-logo" />
      </router-link>
      <Navigation v-show="!notLive" />
    </div>
  </header>
</template>

<script>
import Navigation from "./Navigation.vue";

export default {
  name: "Header",
  components: {
    Navigation,
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
.header {
  height: 65px;
  width: 100vw;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
  width: $max-width;
  max-width: 80vw;
  margin: auto;
  margin-bottom: 55px;

  &-content {
    width: 100%;
    padding: 0;
    padding-top: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 40px;
  }

  &-logo {
    height: 55px;
    position: relative;
    top: 5px;
  }
}
</style>
