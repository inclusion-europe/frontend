<template>
  <div class="posts">
    <h1 class="section-title">
      <span>{{ isInArchive ? "Archive" : "Posts" }}</span>
      <template v-if="!isInArchive">
        <Button boxed pink @click="newPost">Add a post</Button>
        <Button @click="showArchives" v-if="!isInArchive">Archives</Button>
      </template>
      <Button boxed @click="hideArchives" v-else>Back to Posts</Button>
    </h1>
    <div class="posts-table">
      <div class="header">Title</div>
      <div class="header">Author</div>
      <div class="header">Created</div>
      <div class="header">Last modified</div>
      <div class="header">Published?</div>
      <div class="header"></div>
      <div class="row-wrapper" v-for="post in posts" :key="`post_${post.idx}`">
        <div class="post-title">{{ post.title }}</div>
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
              : "-"
          }}
        </div>
        <div class="post-published">
          {{ post.published ? "✅" : "❌" }}
        </div>
        <div class="post-actions">
          <template v-if="!isInArchive">
            <Button small boxed blue @click="editPost(post.idx)"> Edit </Button>
            <Button small boxed pink @click="archivePost(post.idx)">
              Archive
            </Button>
          </template>
          <Button small boxed blue @click="restorePost(post.idx)" v-else>
            Restore
          </Button>
          <Button small boxed @click="deletePost(post.idx)"> Delete </Button>
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
          <Button small boxed pink @click="confirmDelete"> Yes </Button>
          <Button small boxed @click="closeDeleteModal"> Cancel </Button>
        </div>
      </div>
    </Modal>

    <Modal title="Modal" :active="isArchiving > -1" @close="closeArchiveModal">
      <div class="confirm_modal">
        Are you sure you want to archive this post?
        <div class="confirm_modal-actions">
          <Button small boxed pink @click="confirmArchive"> Yes </Button>
          <Button small boxed @click="closeArchiveModal"> Cancel </Button>
        </div>
      </div>
    </Modal>

    <Modal title="Modal" :active="isRestoring > -1" @close="closeRestoreModal">
      <div class="confirm_modal">
        Are you sure you want to restore this post?
        <div class="confirm_modal-actions">
          <Button small boxed blue @click="confirmRestore"> Yes </Button>
          <Button small boxed @click="closeRestoreModal"> Cancel </Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Button from "@/elements/Button.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "Posts",
  components: {
    Button,
    Modal,
  },
  data: () => ({
    posts: [],
    users: [],
    isDeleting: -1,
    isArchiving: -1,
    isRestoring: -1,
    isInArchive: false,
  }),
  mounted() {
    this.loadUsers().then(() => {
      this.loadPosts();
    });
  },
  watch: {
    isInArchive() {
      this.loadPosts();
    },
  },
  methods: {
    loadUsers() {
      return this.$axios.get("users").then((res) => {
        this.users = res.data;
      });
    },
    loadPosts() {
      let route = "posts";
      if (this.isInArchive) route += "/archive";
      else route += "/all";
      this.$axios.get(route).then((res) => {
        let posts = res.data;
        posts.forEach((a) => {
          a.author = this.findAuthor(a.author);
        });
        this.posts = posts;
      });
    },
    showArchives() {
      this.isInArchive = true;
    },
    hideArchives() {
      this.isInArchive = false;
    },
    findAuthor(email) {
      return this.users.find((u) => u.email === email);
    },
    editPost(post_id) {
      this.$router.push({
        name: "admin-post_edit",
        query: {
          post_id,
        },
      });
    },
    deletePost(post_id) {
      this.isDeleting = post_id;
    },
    confirmDelete() {
      this.$axios.delete(`post/${this.isDeleting}`).then(() => {
        this.closeDeleteModal();
        this.loadPosts();
      });
    },
    closeDeleteModal() {
      this.isDeleting = -1;
    },
    archivePost(post_id) {
      this.isArchiving = post_id;
    },
    confirmArchive() {
      this.$axios.patch(`archive/${this.isArchiving}`).then(() => {
        this.closeArchiveModal();
        this.loadPosts();
      });
    },
    closeArchiveModal() {
      this.isArchiving = -1;
    },
    restorePost(post_id) {
      this.isRestoring = post_id;
    },
    confirmRestore() {
      this.$axios.patch(`restore/${this.isRestoring}`).then(() => {
        this.closeRestoreModal();
        this.loadPosts();
      });
    },
    closeRestoreModal() {
      this.isRestoring = -1;
    },
    newPost() {
      this.$router.push({
        name: "admin-post_edit",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.posts {
  .section-title {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &-table {
    display: grid;
    grid-template-columns: repeat(6, auto);
    background: $black;
    gap: 1px;
    border-radius: 4px;
    border: 1px solid $black;
    overflow: hidden;
    width: fit-content;

    .header {
      font-family: GilroyBold;
      font-size: 22px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $ie-blue;
      color: white;
    }

    .row-wrapper {
      display: contents;

      & > div {
        padding: 4px 12px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: start;
      }

      &:hover {
        & > div {
          background: lighten($ie-blue, 60%);
        }
      }
    }

    .post {
      &-title,
      &-author {
        font-size: 20px;
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
