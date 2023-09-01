<template>
  <div class="hero">
    <Highlights />
    <div class="hero-static">
      <section class="hero-static-tagline">
        <img
          src="@/assets/hero-tagline.png"
          alt="Ambitions. Rights. Belongings."
          class="hero-static-tagline-title"
        />
        <h3 class="hero-static-tagline-subtitle">
          20 million people<br />
          with intellectual disabilities<br />
          and their families in Europe.
        </h3>
      </section>
      <Newsletter />
    </div>
    <Currently />
  </div>
</template>
<script>
import Newsletter from "@/components/Newsletter.vue";
import Currently from "./Currently.vue";
import Highlights from "./Highlights.vue";

export default {
  name: "Hero",
  components: {
    Newsletter,
    Currently,
    Highlights,
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.hero {
  display: grid;
  grid-template: auto / 1fr 1fr;
  gap: 150px 135px;
  max-width: $max-width;
  margin: auto;
  padding: 55px 0;
  margin-bottom: 95px;
  align-items: start;

  &-static {
    display: flex;
    flex-direction: column;
    gap: 100px;

    &-tagline {
      &-title {
        width: 305px;
        position: relative;
        left: -5px;
      }

      &-subtitle {
        font-family: GilroySemiBold;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
}
</style>
