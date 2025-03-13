<template>
  <div class="sitemap" :class="!props.isShown ? 'sitemap--hidden' : ''">
    <div
      v-for="item in menu"
      :key="`menu_item_${item.id}`"
      class="sitemap_section"
    >
      <h5 class="sitemap_section-title">
        {{ item.name }}
      </h5>
      <router-link
        tabindex="0"
        v-for="page in item.pages"
        :key="page.idx"
        class="navbar-element"
        :to="`${page.url}`"
        @click="(e) => e.target.blur()"
      >
        {{ page.title }}
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { useMainStore } from '~/store';

const store = useMainStore();
const menu = computed(() => store.getMenu);

const props = defineProps({
  isShown: Boolean,
});
</script>
<style lang="scss" scoped>
.sitemap {
  grid-column: 1 / -1;
  height: auto;
  transition: all 0.3s ease-in;
  overflow: hidden;
  display: flex;
  gap: 2rem;
  color: white;
  flex-wrap: wrap;
  opacity: 1;

  &_section {
    display: flex;
    flex-direction: column;
    min-width: 140px;

    &-title {
      font-weight: 500;
      margin-bottom: 1rem;
    }

    a {
      color: white;
    }
  }

  &--hidden {
    height: 0;
    margin-top: -40%;
    opacity: 0;
  }
}
</style>
