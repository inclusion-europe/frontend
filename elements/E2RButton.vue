<template>
  <IeButton href="./e2r" class="e2r-button" type="link">
    <img
      src="@/assets/e2r.png"
      alt="easy-to-read logo"
      class="e2r-button-logo"
    />
    <span class="e2r-button-label">Easy-to-Read</span>
  </IeButton>
</template>
<script>
import IeButton from './Button.vue';

export default {
  name: 'E2RButton',
  components: {
    IeButton,
  },
};
</script>
<style lang="scss" scoped>
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
    font-size: 20px;
    font-weight: 500;
    transition: all 0.2s ease-out;
  }

  &:hover .e2r-button-label {
    color: var(--ie-pink);
    text-decoration: underline;
  }
}
</style>
