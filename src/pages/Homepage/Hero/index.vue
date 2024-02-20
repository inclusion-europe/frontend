<template>
  <div class="hero">
    <Highlights :posts="highlights" />
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
      <Newsletter v-if="false" />
      <div class="newsletter-temp-block" v-else>
        <h3>Stay in touch with us</h3>
        <Button type="link" :href="newsletterLink" boxed blue target="_blank"
          >Subscribe to our newsletters!</Button
        >
      </div>
    </div>
    <Currently v-if="false" />
  </div>
</template>
<script>
import Newsletter from "@/components/Newsletter.vue";
import Button from "@/elements/Button.vue";
import Currently from "./Currently.vue";
import Highlights from "./Highlights.vue";

export default {
  name: "Hero",
  props: {
    highlights: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Newsletter,
    Button,
    Currently,
    Highlights,
  },
  computed: {
    newsletterLink() {
      return process.env.VUE_APP_NWSLTR_FORM_ACTION;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.hero {
  display: grid;
  grid-template: auto / 1fr 1fr;
  gap: 150px 135px;
  width: var(--width);
  max-width: var(--max-width);
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
        font-size: 20px;
        font-weight: 600;
      }
    }

    .newsletter-temp-block {
      h3 {
        font-family: GilroySemiBold;
        font-size: 20px;
        font-weight: 600;
      }
      width: 305px;
    }
  }
}
</style>
