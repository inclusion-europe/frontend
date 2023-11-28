<template>
  <div
    class="newsletter"
    :class="{ 'newsletter--white': darkBg, 'newsletter--small': inFooter }"
  >
    <h3 class="newsletter-title">Subscribe to our newsletter!</h3>
    <form class="newsletter-form">
      <div class="newsletter-form-input_row">
        <input
          type="email"
          placeholder="email"
          name="email"
          :class="{ 'input-small': inFooter }"
        />
        <Button type="submit" disabled boxed blue :small="inFooter"
          >subscribe</Button
        >
      </div>
      <label class="newsletter-form-input_row">
        <input
          type="checkbox"
          name="include_nwsl"
          checked
          :class="{ 'checkbox-small': inFooter }"
        />
        <h4>Subscribe to the <b>Include</b> newsletter</h4>
      </label>
      <label class="newsletter-form-input_row">
        <input
          type="checkbox"
          name="europe_for_us"
          :class="{ 'checkbox-small': inFooter }"
        />
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
    inFooter: {
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
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: 0;

        b {
          font-family: GilroySemiBold;
          font-weight: 600;
        }
      }
    }
  }

  &--small {
    .newsletter-title {
      font-size: 24px;
    }
    h4 {
      font-size: 15px;
    }
  }

  &--white {
    label,
    h3,
    b,
    h4 {
      color: white;
    }

    input[type="email"] {
      color: white;
      background: $dark-grey;

      &:not(:focus) {
        border-color: white;
      }
    }

    input[type="checkbox"] {
      color: white;
      background: $dark-grey;

      &::before {
        box-shadow: inset 1em 1em $dark-grey;
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
