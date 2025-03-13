<template>
  <section class="eu-support">
    <img
      src="@/assets/european-union.png"
      alt="Flag of the European Union"
      class="eu-support-flag"
    />
    <p class="eu-support-text">
      Supported by the<br aria-hidden="true" />European Union.
    </p>
  </section>
</template>
<script>
export default {
  name: 'EUSupport',
};
</script>
<style lang="scss" scoped>
.eu-support {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding: 30px;

  &-flag {
    width: 100px;
  }

  &-text {
    text-align: center;
    font-family: GilroySemiBold;
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
