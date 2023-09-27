<template>
  <div class="articles">
    <h1 class="section-title">
      Articles
      <Button boxed pink @click="newArticle">Add an article</Button>
    </h1>
    <div class="articles-table">
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
        <div class="article-actions">
          <Button small boxed blue @click="editArticle(article.idx)">
            Edit
          </Button>
          <Button small boxed @click="deleteArticle(article.idx)">
            Delete
          </Button>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import Button from "@/elements/Button.vue";

export default {
  name: "Articles",
  components: {
    Button,
  },
  data: () => ({
    articles: [],
    users: [],
  }),
  mounted() {
    this.loadUsers().then(() => {
      this.loadArticles();
    });
  },
  methods: {
    loadUsers() {
      return this.$axios.get("users").then((res) => {
        this.users = res.data.result;
      });
    },
    loadArticles() {
      this.$axios.get("articles").then((res) => {
        let articles = res.data.result;
        articles.forEach((a) => {
          a.author = this.findAuthor(a.author);
        });
        this.articles = articles;
      });
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
      this.$axios.delete(`article/${article_id}`).then(() => {
        this.loadArticles();
      });
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
    grid-template-columns: auto auto auto auto auto;
    background: $black;
    gap: 1px;
    border-radius: 4px;
    border: 1px solid $black;
    overflow: hidden;
    width: fit-content;

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

      &-actions {
        gap: 4px;
      }
    }
  }
}
</style>
