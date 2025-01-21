<template>
  <img
    v-show="evo != undefined"
    class="table-evo-indicator"
    :src="src"
    :alt="altText"
  />
</template>
<script setup>
const props = defineProps({
  evo: {
    type: Number,
    required: true,
  },
});

const altText = computed(() => {
  if (props.evo > 0) {
    return 'Better than last year';
  }
  if (props.evo < 0) {
    return 'Worse than last year';
  }
  return 'Same as last year';
});

const src = computed(() => {
  if (props.evo > 0) {
    return '/assets/arrow-better.svg';
  }
  if (props.evo < 0) {
    return '/assets/arrow-worse.svg';
  }
  return '/assets/arrow-no-change.svg';
});
</script>
<style scoped>
.table-evo-indicator {
  height: 15px;
  width: 15px;
  margin: 0;
}
</style>
