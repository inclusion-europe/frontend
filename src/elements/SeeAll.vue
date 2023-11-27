<template>
  <a
    :class="`see_all${blue ? ' see_all--blue' : pink ? ' see_all--pink' : ''}${
      big ? ' see_all--big' : ''
    }`"
    :href="href"
  >
    <span><slot /></span>
    <Arrow :blue="blue" :pink="pink" />
  </a>
</template>
<script>
import Arrow from "./Arrow.vue";

export default {
  name: "SeeAll",
  components: {
    Arrow,
  },
  props: {
    big: {
      type: Boolean,
      default: false,
    },
    pink: {
      type: Boolean,
      default: true,
    },
    blue: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.see_all {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  text-decoration: none;
  width: fit-content;
  transition: all 0.2s ease-out;

  * {
    transition: all 0.2s ease-out;
  }

  span {
    color: $ie-pink;
    font-family: GilroySemiBold;
    font-size: 14px;
    font-weight: 600;
    line-height: 12px;
  }

  svg {
    height: 8px;
    fill: $ie-pink;
  }

  &:hover,
  &:focus {
    span {
      color: $ie-pink !important;
    }

    svg {
      fill: $ie-pink !important;
    }
  }

  &--blue {
    span {
      color: $ie-blue !important;
    }

    svg {
      fill: $ie-blue !important;
    }
  }

  &--big {
    gap: 5px;

    &:hover {
      span {
        text-decoration: underline;
      }
    }

    span {
      font-size: 20px;
    }

    svg {
      position: relative;
      top: 2px;
      height: 12px;
    }
  }
}
</style>
