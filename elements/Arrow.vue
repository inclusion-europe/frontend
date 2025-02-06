<template>
  <svg
    viewBox="0 0 22 10"
    :class="`arrow-${blue ? 'blue' : pink ? 'pink' : 'black'}`"
  >
    <path
      d="M20.8,3.4l-2.7-2.9c-0.3-0.3-0.8-0.3-1.1,0s-0.3,0.8,0,1.1l2.1,2.3H1c-0.4,0-0.8,0.3-0.8,0.8S0.6,5.5,1,5.5
      h18.3l-2.2,2.4c-0.3,0.3-0.3,0.8,0,1.1c0.1,0.1,0.3,0.2,0.5,0.2c0.3,0,0.5-0.1,0.5-0.3L20.8,6C21.5,5.3,21.5,4.1,20.8,3.4z"
    />
  </svg>
</template>
<script>
export default {
  name: 'ArrowIcon',
  props: {
    blue: {
      type: Boolean,
      default: false,
    },
    pink: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.arrow {
  &-blue {
    fill: var(--ie-blue);
  }
  &-pink {
    fill: var(--ie-pink);
  }
  &-blue {
    fill: var(--black);
  }
}
</style>
