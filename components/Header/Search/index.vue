<template>
  <span :class="{ 'search-container': true, 'is-open': isOpen }">
    <template v-if="isOpen">
      <form
        @submit.prevent="triggerSearch"
        class="flex-grow w-full flex items-center gap-2"
      >
        <UInput
          placeholder="Search..."
          size="md"
          class="rounded-full search-input"
          clearable
          autofocus
          v-model="searchInput"
        />
        <UButton
          icon="i-lucide-search"
          size="md"
          color="primary"
          :variant="isSearchDisabled ? 'outline' : 'solid'"
          class="font-bold rounded-full"
          label="Search"
          :disabled="isSearchDisabled"
          @click="triggerSearch"
        />
      </form>
    </template>
    <UButton
      :icon="isOpen ? 'i-lucide-x' : 'i-lucide-search'"
      size="md"
      color="primary"
      variant="outline"
      class="font-bold rounded-full"
      @click="openCloseButtonClick"
    />
  </span>
</template>
<script setup>
const router = useRouter();

const isOpen = ref(false);
const searchInput = ref('');

const emit = defineEmits(['toggleSearch']);

const isSearchDisabled = computed(() => {
  return searchInput.value.trim() === '';
});

const openCloseButtonClick = () => {
  isOpen.value = !isOpen.value;
  emit('toggleSearch');
  if (isOpen.value === false) {
    searchInput.value = '';
  }
};

const triggerSearch = () => {
  router.push(`/search/${encodeURIComponent(searchInput.value.trim())}`);
  openCloseButtonClick();
};
</script>
<style>
.search-container {
  display: flex;
  align-items: center;
  gap: 8px;

  &.is-open {
    flex-grow: 1;
  }

  .search-input {
    flex-grow: 1;
    width: 100%;
  }
}
</style>
