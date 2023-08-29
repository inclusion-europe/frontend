<template>
  <div class="newsletter" :class="{ 'newsletter-white': darkBg }">
    <h3 class="newsletter-title">
      Want to know about our next meetup? Subscribe to our newsletter!
    </h3>
    <form class="newsletter-form">
      <div class="newsletter-form-input_row">
        <input type="email" placeholder="email" name="email" />
        <Button type="submit" boxed blue>subscribe</Button>
      </div>
      <label class="newsletter-form-input_row">
        <input type="checkbox" name="include_nwsl" checked />
        <h4>Subscribe to the <b>Include</b> newsletter</h4>
      </label>
      <label class="newsletter-form-input_row">
        <input type="checkbox" name="europe_for_us" />
        <h4>Subscribe to the <b>Europe for us</b> newsletter</h4>
      </label>
    </form>
  </div>
</template>
<script>
import Button from "@/elements/Button.vue";
export default {
  name: "Newsletter",
  components: {
    Button,
  },
  props: {
    darkBg: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.newsletter {
  &-title {
    font-family: GilroySemiBold;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: lowercase;
    margin-bottom: 18px;
  }

  &-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;

    &-input_row {
      display: flex;
      gap: 15px;
      align-items: center;

      input[type="text"] {
        flex-grow: 1;
      }

      h4 {
        font-family: GilroyRegular;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        b {
          font-family: GilroySemiBold;
          font-weight: 600;
        }
      }
    }
  }

  &-white {
    label,
    h3,
    b,
    h4 {
      color: white;
    }

    input[type="email"] {
      color: white;
      background: $black;

      &:not(:focus) {
        border-color: white;
      }
    }

    input[type="checkbox"] {
      color: white;
      background: $black;

      &::before {
        box-shadow: inset 1em 1em $black;
      }

      &:checked {
        background: $ie-blue;
        &::before {
          box-shadow: inset 1em 1em white;
        }
      }
    }
  }
}
</style>
