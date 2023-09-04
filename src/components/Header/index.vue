<template>
  <header class="header">
    <div class="header-content">
      <router-link to="/">
        <img src="@/assets/logo.svg" class="header-logo" />
      </router-link>
      <E2RButton />
    </div>
    <Navigation />
  </header>
</template>

<script>
import Navigation from "./Navigation.vue";
import E2RButton from "@/elements/E2RButton.vue";

export default {
  name: "Header",
  components: {
    Navigation,
    E2RButton,
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
  max-width: $max-width;
  margin: auto;
  margin-bottom: 55px;

  &-content {
    width: 100%;
    padding: 8px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 40px;
  }

  &-logo {
    height: 39px;
  }
}
</style>
