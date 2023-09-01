<template>
  <nav class="navbar">
    <a class="navbar-element">Home</a>
    <a class="navbar-element">Discover</a>
    <a class="navbar-element">Self-advocacy</a>
    <a class="navbar-element">About Us</a>
    <a class="navbar-element">Engage!</a>
  </nav>
</template>
<script>
export default {
  name: "Navigation",
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.navbar {
  display: flex;
  gap: 28px;

  &-element {
    font-family: GilroySemiBold;
    color: $black;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;

    &:hover,
    &:focus {
      color: $ie-blue !important;
    }
  }
}
</style>
