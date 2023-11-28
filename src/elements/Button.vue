<template>
  <a
    v-if="type === 'link'"
    class="ie-button"
    :class="{
      'ie-button-boxed': boxed,
      'ie-button-blue': blue,
      'ie-button-pink': pink,
      'ie-button-white': white,
      'ie-button-small': small,
      'ie-button-e2r': e2r,
    }"
  >
    <slot />
  </a>

  <button
    v-else
    class="ie-button"
    :class="{
      'ie-button-boxed': boxed,
      'ie-button-blue': blue,
      'ie-button-pink': pink,
      'ie-button-white': white,
      'ie-button-small': small,
      'ie-button-e2r': e2r,
    }"
    :type="type"
  >
    <slot />
  </button>
</template>
<script>
export default {
  name: "Button",
  props: {
    boxed: {
      type: Boolean,
      default: false,
    },
    blue: {
      type: Boolean,
      default: false,
    },
    pink: {
      type: Boolean,
      default: false,
    },
    white: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "button",
    },
    e2r: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.ie-button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-decoration: none;

  color: $black;
  font-size: 20px;
  font-style: normal;
  font-family: GilroyBold;
  font-weight: 700;

  &-blue {
    color: $ie-blue;
  }
  &-pink {
    color: $ie-pink;
  }

  &-small {
    font-size: 14px;
  }

  &-boxed {
    color: #fff;
    padding: 6px 8px;
    border-radius: 4px;
    border: 2px;
    border-style: solid;
    background: $black;
    border-color: $black;
    transition: 0.2s ease-out;

    &:hover,
    &:focus:not(:disabled) {
      background: $black--transp;
    }

    &.ie-button-blue {
      padding: 5px 7px;
    }

    &.ie-button-blue {
      background: $ie-blue;
      border-color: $ie-blue;

      &:hover,
      &:focus:not(:disabled) {
        background: $ie-blue--transp;
      }
    }

    &.ie-button-e2r {
      background: #0b129c;
      border-color: #0b129c;

      &:hover,
      &:focus:not(:disabled) {
        background: #0b129ccc;
      }
    }

    &.ie-button-pink {
      background: $ie-pink;
      border-color: $ie-pink;

      &:hover,
      &:focus:not(:disabled) {
        background: $ie-pink--transp;
      }
    }

    &.ie-button-white {
      color: $black;
      background: white;

      &:hover,
      &:focus:not(:disabled) {
        background: white;
      }
    }
  }

  &:disabled {
    cursor: not-allowed;
    background: $grey;
    border-color: $grey;
  }
}
</style>
