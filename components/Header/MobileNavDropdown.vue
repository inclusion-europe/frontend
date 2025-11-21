<template>
  <div class="navbar-element-dropdown" :class="{ visible: isDropdownShown }">
    <div
      class="navbar-element mobile-navitem back-item"
      @click="$emit('showMainMenu')"
    >
      <img
        src="@/assets/chevron.svg"
        class="chevron"
        alt="Return to main menu"
      />
      <span> Back </span>
    </div>
    <router-link
      tabindex="0"
      v-if="parentUrl"
      class="navbar-element"
      :to="parentUrl"
      @click="(e) => e.target.blur()"
    >
      <div class="mobile-navitem">
        {{ itemName }}
      </div>
    </router-link>
    <router-link
      tabindex="0"
      v-for="page in pages"
      :key="page.idx"
      class="navbar-element"
      :to="`${page.url}`"
      @click="(e) => e.target.blur()"
    >
      <div class="mobile-navitem">
        {{ page.title }}
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'NavDropdown',
  props: {
    pages: {
      type: Array,
      default: () => [],
    },
    isDropdownShown: {
      type: Boolean,
      default: false,
    },
    itemName: {
      type: String,
      required: true,
    },
    parentUrl: {
      type: String,
      default: null,
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar-element-dropdown {
  position: absolute;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  top: 4.8rem;
  left: 120vw;
  transition: left 0.2s ease-out;
  width: var(--max-width);

  .mobile-navitem {
    .chevron {
      height: 1rem;
      transform: rotate(90deg);
      transform-origin: center center;
    }
  }

  .navbar-element {
    white-space: wrap;
    width: auto;
  }

  & > .navbar-element:first-child {
    margin-top: 6px;
  }

  &.visible {
    left: var(--left-limit);
  }

  .back-item {
    display: flex;
    align-content: center;
    align-items: center;
    gap: 0.3rem;
  }
}
</style>
