<template>
  <div class="posts">
    <h1 class="section-title">
      <span>{{ isInArchive ? 'Archive' : 'Posts' }}</span>
      <template v-if="!isInArchive">
        <UButton boxed color="ie-pink" @click="newPost"> Add a post </UButton>
        <UButton
          v-if="!isInArchive"
          variant="ghost"
          color="black"
          @click="showArchives"
        >
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
      <UTable
        :rows="posts"
        :columns="columns"
        class="w-full"
        :ui="{
          default: { checkbox: { color: 'gray' } },
        }"
      >
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
          <UButtonGroup>
            <template v-if="!isInArchive">
              <UButton size="xs" boxed blue @click="editPost(row.idx)">
                Edit
              </UButton>
              <UButton
                size="xs"
                boxed
                color="ie-pink"
                @click="archivePost(row.idx)"
              >
                Archive
              </UButton>
            </template>
            <UButton size="xs" boxed blue @click="restorePost(row.idx)" v-else>
              Restore
            </UButton>
            <UButton size="xs" boxed color="black" @click="deletePost(row.idx)">
              Delete
            </UButton>
          </UButtonGroup>
        </template>
      </UTable>
    </UCard>
    <div class="posts-table" v-if="false">
      <div class="header">Title</div>
      <div class="header">Author</div>
      <div class="header">Created</div>
      <div class="header">Last modified</div>
      <div class="header">Published?</div>
      <div class="header" />
      <div class="row-wrapper" v-for="post in posts" :key="`post_${post.idx}`">
        <div class="post-title">
          {{ post.title }}
        </div>
        <div class="post-author">
          <template v-if="post.author">
            {{ post.author.first_name }} {{ post.author.last_name }}
          </template>
          <template v-else> - </template>
        </div>
        <div class="post-date">
          {{ new Date(post.created_at).toLocaleString() }}
        </div>
        <div class="post-date">
          {{
            post.modified_at !== post.created_at
              ? new Date(post.modified_at).toLocaleString()
              : '-'
          }}
        </div>
        <div class="post-published">
          {{ post.published ? '✅' : '❌' }}
        </div>
        <div class="post-actions">
          <template v-if="!isInArchive">
            <IeButton small boxed blue @click="editPost(post.idx)">
              Edit
            </IeButton>
            <IeButton small boxed pink @click="archivePost(post.idx)">
              Archive
            </IeButton>
          </template>
          <IeButton small boxed blue @click="restorePost(post.idx)" v-else>
            Restore
          </IeButton>
          <IeButton small boxed @click="deletePost(post.idx)">
            Delete
          </IeButton>
        </div>
      </div>
    </div>
    <Modal
      title="Confirm Delete"
      :active="isDeleting > -1"
      @close="closeDeleteModal"
    >
      <div class="confirm_modal">
        Are you sure you want to delete this post?
        <div class="confirm_modal-actions">
          <IeButton small boxed pink @click="confirmDelete"> Yes </IeButton>
          <IeButton small boxed @click="closeDeleteModal"> Cancel </IeButton>
        </div>
      </div>
    </Modal>

    <Modal title="Modal" :active="isArchiving > -1" @close="closeArchiveModal">
      <div class="confirm_modal">
        Are you sure you want to archive this post?
        <div class="confirm_modal-actions">
          <IeButton small boxed pink @click="confirmArchive"> Yes </IeButton>
          <IeButton small boxed @click="closeArchiveModal"> Cancel </IeButton>
        </div>
      </div>
    </Modal>

    <Modal title="Modal" :active="isRestoring > -1" @close="closeRestoreModal">
      <div class="confirm_modal">
        Are you sure you want to restore this post?
        <div class="confirm_modal-actions">
          <IeButton small boxed blue @click="confirmRestore"> Yes </IeButton>
          <IeButton small boxed @click="closeRestoreModal"> Cancel </IeButton>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script setup>
import IeButton from '~/elements/Button.vue';
import Modal from '~/components/Modal.vue';
import useMyFetch from '~/composables/useMyFetch';

const posts = ref([]);
const users = ref([]);
const isDeleting = ref(-1);
const isArchiving = ref(-1);
const isRestoring = ref(-1);
const isInArchive = ref(false);

const expand = ref({
  openedRows: [],
  row: {},
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

//     methods: {
//         editPost(postId) {
//             this.$router.push({
//                 name: 'admin-post_edit',
//                 query: {
//                     postId,
//                 },
//             });
//         },
//         deletePost(postId) {
//             this.isDeleting = postId;
//         },
//         confirmDelete() {
//             this.$axios.delete(`post/${this.isDeleting}`).then(() => {
//                 this.closeDeleteModal();
//                 this.loadPosts();
//             });
//         },
//         closeDeleteModal() {
//             this.isDeleting = -1;
//         },
//         archivePost(postId) {
//             this.isArchiving = postId;
//         },
//         confirmArchive() {
//             this.$axios.patch(`archive/${this.isArchiving}`).then(() => {
//                 this.closeArchiveModal();
//                 this.loadPosts();
//             });
//         },
//         closeArchiveModal() {
//             this.isArchiving = -1;
//         },
//         restorePost(postId) {
//             this.isRestoring = postId;
//         },
//         confirmRestore() {
//             this.$axios.patch(`restore/${this.isRestoring}`).then(() => {
//                 this.closeRestoreModal();
//                 this.loadPosts();
//             });
//         },
//         closeRestoreModal() {
//             this.isRestoring = -1;
//         },
//         newPost() {
//             this.$router.push({
//                 name: 'admin-post_edit',
//             });
//         },
//     },
// };
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
