<template>
  <nav class="navbar">
    <a class="navbar-element">home</a>
    <a class="navbar-element">discover</a>
    <a class="navbar-element">self-advocacy</a>
    <a class="navbar-element">about us</a>
    <a class="navbar-element">engage!</a>
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
