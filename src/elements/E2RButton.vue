<template>
  <Button href="./e2r" class="e2r-button" type="link">
    <img
      src="@/assets/e2r.png"
      alt="easy-to-read logo"
      class="e2r-button-logo"
    />
    <span class="e2r-button-label">Easy-to-Read</span>
  </Button>
</template>
<script>
import Button from "./Button.vue";

export default {
  name: "E2RButton",
  components: {
    Button,
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.e2r-button {
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease-out;

  &-logo {
    height: 25px;
  }

  &-label {
    font-family: GilroySemiBold;
    font-size: 18px;
    font-weight: 600;
    transition: all 0.2s ease-out;
  }

  &:hover .e2r-button-label {
    color: $ie-pink;
    text-decoration: underline;
  }
}
</style>
