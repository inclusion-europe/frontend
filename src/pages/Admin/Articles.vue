<template>
  <div class="articles">
    <h1 class="section-title">
      <span>{{ isInArchive ? "Archive" : "Articles" }}</span>
      <template v-if="!isInArchive">
        <Button boxed pink @click="newArticle">Add an article</Button>
        <Button @click="showArchives" v-if="!isInArchive">Archives</Button>
      </template>
      <Button boxed @click="hideArchives" v-else>Back to Articles</Button>
    </h1>
    <div class="articles-table">
      <div class="header">Title</div>
      <div class="header">Author</div>
      <div class="header">Created</div>
      <div class="header">Last modified</div>
      <div class="header">Published?</div>
      <div class="header"></div>
      <template v-for="article in articles" :key="`article_${article.idx}`">
        <div class="article-title">{{ article.title }}</div>
        <div class="article-author">
          <template v-if="article.author">
            {{ article.author.first_name }} {{ article.author.last_name }}
          </template>
          <template v-else> - </template>
        </div>
        <div class="article-date">
          {{ new Date(article.created_at).toLocaleString() }}
        </div>
        <div class="article-date">
          {{
            article.modified_at !== article.created_at
              ? new Date(article.modified_at).toLocaleString()
              : "-"
          }}
        </div>
        <div class="article-published">
          {{ article.published ? "✅" : "❌" }}
        </div>
        <div class="article-actions">
          <template v-if="!isInArchive">
            <Button small boxed blue @click="editArticle(article.idx)">
              Edit
            </Button>
            <Button small boxed pink @click="archiveArticle(article.idx)">
              Archive
            </Button>
          </template>
          <Button small boxed blue @click="restoreArticle(article.idx)" v-else>
            Restore
          </Button>
          <Button small boxed @click="deleteArticle(article.idx)">
            Delete
          </Button>
        </div>
      </template>
    </div>
    <Modal
      title="Confirm Delete"
      :active="isDeleting > -1"
      @close="closeDeleteModal"
    >
      <div class="confirm_modal">
        Are you sure you want to delete this article?
        <div class="confirm_modal-actions">
          <Button small boxed pink @click="confirmDelete"> Yes </Button>
          <Button small boxed @click="closeDeleteModal"> Cancel </Button>
        </div>
      </div>
    </Modal>

    <Modal title="Modal" :active="isArchiving > -1" @close="closeArchiveModal">
      <div class="confirm_modal">
        Are you sure you want to archive this article?
        <div class="confirm_modal-actions">
          <Button small boxed pink @click="confirmArchive"> Yes </Button>
          <Button small boxed @click="closeArchiveModal"> Cancel </Button>
        </div>
      </div>
    </Modal>

    <Modal title="Modal" :active="isRestoring > -1" @close="closeRestoreModal">
      <div class="confirm_modal">
        Are you sure you want to restore this article?
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
  name: "Articles",
  components: {
    Button,
    Modal,
  },
  data: () => ({
    articles: [],
    users: [],
    isDeleting: -1,
    isArchiving: -1,
    isRestoring: -1,
    isInArchive: false,
  }),
  mounted() {
    this.loadUsers().then(() => {
      this.loadArticles();
    });
  },
  watch: {
    isInArchive() {
      this.loadArticles();
    },
  },
  methods: {
    loadUsers() {
      return this.$axios.get("users").then((res) => {
        this.users = res.data;
      });
    },
    loadArticles() {
      let route = "articles";
      if (this.isInArchive) route += "/archive";
      else route += "/all";
      this.$axios.get(route).then((res) => {
        let articles = res.data;
        articles.forEach((a) => {
          a.author = this.findAuthor(a.author);
        });
        this.articles = articles;
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
    editArticle(article_id) {
      this.$router.push({
        name: "admin-article_edit",
        query: {
          article_id,
        },
      });
    },
    deleteArticle(article_id) {
      this.isDeleting = article_id;
    },
    confirmDelete() {
      this.$axios.delete(`article/${this.isDeleting}`).then(() => {
        this.closeDeleteModal();
        this.loadArticles();
      });
    },
    closeDeleteModal() {
      this.isDeleting = -1;
    },
    archiveArticle(article_id) {
      this.isArchiving = article_id;
    },
    confirmArchive() {
      this.$axios.patch(`archive/${this.isArchiving}`).then(() => {
        this.closeArchiveModal();
        this.loadArticles();
      });
    },
    closeArchiveModal() {
      this.isArchiving = -1;
    },
    restoreArticle(article_id) {
      this.isRestoring = article_id;
    },
    confirmRestore() {
      this.$axios.patch(`restore/${this.isRestoring}`).then(() => {
        this.closeRestoreModal();
        this.loadArticles();
      });
    },
    closeRestoreModal() {
      this.isRestoring = -1;
    },
    newArticle() {
      this.$router.push({
        name: "admin-article_edit",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.articles {
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
      font-size: 20px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $ie-blue;
      color: white;
    }

    & > div {
      padding: 4px 12px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: start;
    }

    .article {
      &-title,
      &-author {
        font-size: 18px;
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
