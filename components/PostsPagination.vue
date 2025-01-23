<template>
  <div class="posts_page-pagination-numbers">
    <span>Page:</span>
    <NuxtLink
      v-if="props.currentPage > 1"
      :to="{
        query: {
          ...route.query,
          pageNr: props.currentPage - 1,
        },
      }"
      class="posts_page-pagination-item"
    >
      Previous
    </NuxtLink>
    <template v-if="props.length < 15">
      <NuxtLink
        v-for="(e, i) in new Array(props.length)"
        :key="`page_button_${i + 1}`"
        :to="{
          query: {
            ...route.query,
            pageNr: i + 1,
          },
        }"
        class="posts_page-pagination-item"
        :class="{
          'posts_page-pagination-item--active': props.currentPage === i + 1,
        }"
      >
        {{ i + 1 }}
      </NuxtLink>
    </template>
    <!-- Abbreviated list with ellipses -->
    <template v-else>
      <!-- First 3 -->
      <NuxtLink
        v-for="(e, i) in new Array(3)"
        :key="`page_button_${i + 1}`"
        :to="{
          query: {
            ...route.query,
            pageNr: i + 1,
          },
        }"
        class="posts_page-pagination-item"
        :class="{
          'posts_page-pagination-item--active': props.currentPage === i + 1,
        }"
      >
        {{ i + 1 }}
      </NuxtLink>

      <!-- Active between first and middle 3 -->
      <span v-if="props.currentPage - 3 > 2"> ... </span>
      <template
        v-if="between(props.currentPage, 3, Math.ceil(props.length / 2) - 1)"
      >
        <NuxtLink
          v-for="(e, i) in new Array(3)"
          v-show="showExtraPage(props.currentPage - (1 - i))"
          :key="`page_button_${props.currentPage - (1 - i)}`"
          :to="{
            query: {
              ...route.query,
              pageNr: props.currentPage - (1 - i),
            },
          }"
          class="posts_page-pagination-item"
          :class="{
            'posts_page-pagination-item--active':
              props.currentPage === props.currentPage - (1 - i),
          }"
        >
          {{ props.currentPage - (1 - i) }}
        </NuxtLink>
      </template>

      <!-- Middle 3 -->
      <span
        v-if="
          Math.abs(props.currentPage - (Math.ceil(props.length / 2) - 1)) > 1 &&
          props.currentPage - 3 <= 2
        "
      >
        ...
      </span>
      <NuxtLink
        v-for="(e, i) in new Array(3)"
        :key="`page_button_${Math.ceil(props.length / 2) - (1 - i)}`"
        :to="{
          query: {
            ...route.query,
            pageNr: Math.ceil(props.length / 2) - (1 - i),
          },
        }"
        class="posts_page-pagination-item"
        :class="{
          'posts_page-pagination-item--active':
            props.currentPage === Math.ceil(props.length / 2) - (1 - i),
        }"
      >
        {{ Math.ceil(props.length / 2) - (1 - i) }}
      </NuxtLink>

      <!-- Active between middle and last 3 -->
      <span
        v-if="
          Math.abs(props.currentPage - (Math.ceil(props.length / 2) + 1)) > 1 &&
          props.length - 2 - props.currentPage <= 2
        "
      >
        ...
      </span>
      <template
        v-if="
          between(
            props.currentPage,
            Math.ceil(props.length / 2) + 1,
            props.length - 2
          )
        "
      >
        <NuxtLink
          v-for="(e, i) in new Array(3)"
          v-show="showExtraPage(props.currentPage - (1 - i))"
          :key="`page_button_${props.currentPage - (1 - i)}`"
          :to="{
            query: {
              ...route.query,
              pageNr: props.currentPage - (1 - i),
            },
          }"
          class="posts_page-pagination-item"
          :class="{
            'posts_page-pagination-item--active':
              props.currentPage === props.currentPage - (1 - i),
          }"
        >
          {{ props.currentPage - (1 - i) }}
        </NuxtLink>
      </template>
      <!-- Last 3 -->
      <span v-if="props.length - 2 - props.currentPage > 2"> ... </span>
      <NuxtLink
        v-for="(e, i) in new Array(3)"
        :key="`page_button_${props.length - (2 - i)}`"
        :to="{
          query: {
            ...route.query,
            pageNr: props.length - (2 - i),
          },
        }"
        class="posts_page-pagination-item"
        :class="{
          'posts_page-pagination-item--active':
            props.currentPage === props.currentPage - (2 - i),
        }"
      >
        {{ props.length - (2 - i) }}
      </NuxtLink>
    </template>
    <NuxtLink
      v-if="props.currentPage < props.length"
      :to="{
        path: route.path,
        query: {
          ...route.query,
          pageNr: props.currentPage + 1,
        },
      }"
      class="posts_page-pagination-item"
    >
      Next
    </NuxtLink>
  </div>
</template>
<script setup>
const route = useRoute();

const props = defineProps({
  length: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const between = (x, min, max) => {
  return x >= min && x <= max;
};

const showExtraPage = (pageNr) => {
  if (pageNr <= 3) return false;
  if (pageNr >= this.props.length - 2) return false;

  const betweenMin = Math.ceil(this.props.length / 2) - 1;
  const betweenMax = Math.ceil(this.props.length / 2) + 1;

  if (this.between(pageNr, betweenMin, betweenMax)) return false;

  return true;
};
</script>
<style lang="scss" scoped>
.posts_page-pagination {
  &-numbers {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.4rem;
  }

  &-item {
    &--active {
      color: var(--ie-blue);
      text-decoration: none;
    }
  }
}
</style>
