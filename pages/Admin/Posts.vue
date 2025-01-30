<template>
  <div class="posts">
    <h1 class="section-title flex items-center justify-between">
      <span>{{ isInArchive ? 'Archive' : 'Posts' }}</span>
      <template v-if="!isInArchive">
        <UButton v-if="!isInArchive" color="black" @click="showArchives">
          Archives
        </UButton>
      </template>
      <UButton boxed @click="hideArchives" v-else> Back to Posts </UButton>
    </h1>
    <UCard
      class="w-full"
      :ui="{
        body: {
          padding: '',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-start gap-0">
          <UInput
            icon="i-heroicons-magnifying-glass-20-solid"
            v-model="searchTerm"
            placeholder="Search posts"
          />
          <UButton
            icon="i-heroicons-x-mark-20-solid"
            @click="clearSearch"
            color="gray"
            v-if="searchTerm !== ''"
          />
        </div>
      </template>
      <UTable
        :rows="filteredPosts"
        :sort="sort"
        :columns="columns"
        class="w-full"
        :ui="{
          default: { checkbox: { color: 'gray' } },
        }"
      >
        <template #actions-header v-if="!isInArchive">
          <div class="flex items-center justify-center">
            <UButton
              boxed
              color="ie-pink"
              @click="newPost"
              icon="i-heroicons-plus-20-solid"
            >
              Add a post
            </UButton>
          </div>
        </template>
        <template #title-data="{ row }">
          <span class="post-title">{{ row.title }}</span>
        </template>
        <template #author-data="{ row }">
          <span class="post-author">
            <template v-if="row.author">
              {{ row.author.first_name }} {{ row.author.last_name }}
            </template>
            <template v-else> - </template>
          </span>
        </template>
        <template #created_at-data="{ row }">
          <span class="post-date">
            {{ new Date(row.created_at).toLocaleString() }}
          </span>
        </template>
        <template #modified_at-data="{ row }">
          <span class="post-date">
            {{
              row.modified_at !== row.created_at
                ? new Date(row.modified_at).toLocaleString()
                : '-'
            }}
          </span>
        </template>
        <template #published-data="{ row }">
          <span class="post-published">
            {{ row.published ? '✅' : '❌' }}
          </span>
        </template>
        <template #actions-data="{ row }">
          <UButtonGroup size="xs">
            <template v-if="!isInArchive">
              <UButton size="xs" @click="editPost(row.idx)"> Edit </UButton>
              <UButton size="xs" color="ie-pink" @click="archivePost(row.idx)">
                Archive
              </UButton>
            </template>
            <UButton size="xs" @click="restorePost(row.idx)" v-else>
              Restore
            </UButton>
            <UButton size="xs" color="black" @click="deletePost(row.idx)">
              Delete
            </UButton>
          </UButtonGroup>
        </template>
      </UTable>
    </UCard>

    <Modal
      title="Confirm Delete"
      :active="isDeleting > -1"
      @close="closeDeleteModal"
    >
      <div class="confirm_modal">
        Are you sure you want to delete this post?
        <div class="confirm_modal-actions">
          <UButton size="sm" color="ie-pink" @click="confirmDelete">
            Yes
          </UButton>
          <UButton size="sm" color="black" @click="closeDeleteModal">
            Cancel
          </UButton>
        </div>
      </div>
    </Modal>

    <Modal title="Modal" :active="isArchiving > -1" @close="closeArchiveModal">
      <div class="confirm_modal">
        Are you sure you want to archive this post?
        <div class="confirm_modal-actions">
          <UButton size="sm" color="ie-pink" @click="confirmArchive">
            Yes
          </UButton>
          <UButton size="sm" color="black" @click="closeArchiveModal">
            Cancel
          </UButton>
        </div>
      </div>
    </Modal>

    <Modal title="Modal" :active="isRestoring > -1" @close="closeRestoreModal">
      <div class="confirm_modal">
        Are you sure you want to restore this post?
        <div class="confirm_modal-actions">
          <UButton size="sm" @click="confirmRestore"> Yes </UButton>
          <UButton size="sm" color="black" @click="closeRestoreModal">
            Cancel
          </UButton>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script setup>
import useMyFetch from '~/composables/useMyFetch';
import Modal from '~/components/Modal.vue';

const posts = ref([]);
const users = ref([]);
const isDeleting = ref(-1);
const isArchiving = ref(-1);
const isRestoring = ref(-1);
const isInArchive = ref(false);

const searchTerm = ref('');

const expand = ref({
  openedRows: [],
  row: {},
});

const sort = ref({
  column: 'created_at',
  direction: 'desc',
});

const columns = [
  {
    key: 'title',
    label: 'Title',
    class: 'post-title',
    sortable: true,
  },
  {
    key: 'author',
    label: 'Author',
    sortable: true,
  },
  {
    key: 'created_at',
    label: 'Created',
    sortable: true,
  },
  {
    key: 'modified_at',
    label: 'Last modified',
    sortable: true,
  },
  {
    key: 'published',
    label: 'Published?',
    sortable: true,
  },
  {
    key: 'actions',
    label: '',
  },
];

const filteredPosts = computed(() => {
  if (!searchTerm.value) {
    return posts.value;
  }

  return posts.value.filter((post) => {
    return post.title.includes(searchTerm.value);
  });
});

const loadUsers = () => {
  return useMyFetch('users').then((res) => {
    users.value = res;
  });
};

const showArchives = () => {
  isInArchive.value = true;
};

const hideArchives = () => {
  isInArchive.value = false;
};

const loadPosts = () => {
  let route = 'posts';
  if (isInArchive.value) route += '/archive';
  else route += '/all';
  useMyFetch(route).then((res) => {
    const workPosts = res;
    workPosts.forEach((a) => {
      Object.assign(a, { author: findAuthor(a.author) });
    });
    posts.value = workPosts;
  });
};

const findAuthor = (email) => {
  return users.value.find((u) => u.email === email);
};

watch(isInArchive, () => {
  loadPosts();
});

onMounted(() => {
  loadUsers().then(() => {
    loadPosts();
  });
});

const clearSearch = () => {
  searchTerm.value = '';
};

const newPost = () => {
  navigateTo({
    path: '/admin/editor',
  });
};

const editPost = (postId) => {
  navigateTo({
    path: '/admin/editor',
    query: {
      postId,
    },
  });
};

const deletePost = (postId) => {
  isDeleting.value = postId;
};

const confirmDelete = () => {
  useMyFetch(`post/${isDeleting.value}`, { method: 'DELETE' }).then(() => {
    closeDeleteModal();
    loadPosts();
  });
};

const closeDeleteModal = () => {
  isDeleting.value = -1;
};

const archivePost = (postId) => {
  isArchiving.value = postId;
};

const confirmArchive = () => {
  useMyFetch(`archive/${isArchiving.value}`, { method: 'PATCH' }).then(() => {
    closeArchiveModal();
    loadPosts();
  });
};

const closeArchiveModal = () => {
  isArchiving.value = -1;
};

const restorePost = (postId) => {
  isRestoring.value = postId;
};

const confirmRestore = () => {
  useMyFetch(`restore/${isRestoring.value}`, { method: 'PATCH' }).then(() => {
    closeRestoreModal();
    loadPosts();
  });
};

const closeRestoreModal = () => {
  isRestoring.value = -1;
};
</script>
<style lang="scss" scoped>
.posts {
  .section-title {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .post {
    &-title {
      text-wrap: wrap;
    }

    &-table {
      display: grid;
      grid-template-columns: repeat(6, auto);
      background: var(--black);
      gap: 1px;
      border-radius: 4px;
      border: 1px solid var(--black);
      overflow: hidden;
      width: fit-content;

      .header {
        font-family: GilroyBold;
        font-size: 22px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--ie-blue);
        color: white;
      }

      .row-wrapper {
        display: contents;

        & > div {
          padding: 4px 12px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        &:hover,
        &:focus-within {
          & > div {
            background: var(--ie-blue--light);
          }
        }
      }

      &-published {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &-actions {
        gap: 4px;
      }
    }
  }
}

.confirm_modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  &-actions {
    display: flex;
    gap: 12px;
  }
}
</style>
