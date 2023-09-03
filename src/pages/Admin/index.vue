<template>
  <div class="admin">
    <h1 class="section-title">New article</h1>
    <form class="new_article-form">
      <label for="title">Title</label>
      <input type="text" name="title" />

      <label for="excerpt">Excerpt</label>
      <textarea name="excerpt" rows="3" />

      <label for="picture">Preview picture</label>
      <input type="file" accept="image/png, image/jpeg" name="picture" />

      <label for="default-content-type">Default view</label>
      <select name="default-content-type" v-model="content_type">
        <option value="plain">Plain text</option>
        <option value="e2r">Easy-to-Read</option>
      </select>

      <template v-if="content_type === 'plain'">
        <label for="content">Content</label>
        <v-md-editor v-model="content" height="400px"></v-md-editor>
      </template>

      <template v-if="content_type === 'e2r'">
        <label for="title">E2R Content</label>
        <E2REditor />
      </template>

      <template v-if="has_other_content">
        <template v-if="content_type === 'e2r'">
          <label for="content">Content</label>
          <v-md-editor v-model="content" height="400px"></v-md-editor>
        </template>

        <template v-if="content_type === 'plain'">
          <label for="title">E2R Content</label>
          <E2REditor />
        </template>
      </template>

      <div class="other_content_row">
        <Button @click="toggleOtherContent">{{
          `${has_other_content ? "Remove" : "Add"} ${
            content_type === "e2r" ? "plain text" : "easy-to-read"
          } content`
        }}</Button>
      </div>
    </form>
  </div>
</template>
<script>
import E2REditor from "./E2REditor.vue";
import Button from "@/elements/Button.vue";

export default {
  name: "Admin",
  components: {
    E2REditor,
    Button,
  },
  data: () => ({
    content: "",
    content_type: "plain",
    has_other_content: false,
  }),
  mounted() {
    const code = this.$route.query.code;
    this.$axios
      .post(
        "/login",
        {},
        {
          params: {
            callback: `${encodeURI(window.location.origin)}/admin`,
            code,
          },
        }
      )
      .then((res, err) => {
        console.log({
          err,
          res,
        });
      });
  },
  methods: {
    toggleOtherContent() {
      this.has_other_content = !this.has_other_content;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.admin {
  max-width: $max-width;
  margin: auto;
  padding-bottom: 30px;
}
.new_article-form {
  display: grid;
  grid-template-columns: max-content auto;
  gap: 10px;

  label {
    margin-top: 9px;
    text-align: right;

    &::after {
      content: ":";
    }
  }

  .other_content_row {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
