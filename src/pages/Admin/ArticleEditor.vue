<template>
  <div class="new-article" v-if="pageReady">
    <h1 class="section-title">
      <Button @click="goBack">Go Back</Button>
      {{ isEditing > -1 ? "Editing article" : "New article" }}
    </h1>
    <form class="new_article-form" @submit="submitForm">
      <label for="title">Title</label>
      <input type="text" name="title" v-model="title" />

      <!-- <label>URL</label>
      <span class="url_preview">{{ rootUrl }}{{ generatedUrl }}</span> -->

      <label for="author">Author</label>
      <select name="author" v-model="author">
        <option :value="null">Leave blank</option>
        <option
          v-for="user in users"
          :key="`user_${user.id}`"
          :value="user.email"
        >
          {{ user.first_name }} {{ user.last_name }}
        </option>
      </select>

      <label for="excerpt">Excerpt</label>
      <textarea name="excerpt" rows="3" v-model="excerpt" />

      <label for="picture">Preview picture</label>
      <!-- <div
        class="picture_upload"
        :class="{ 'picture_upload--active': isDragging }"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      >
        <input
          type="file"
          multiple
          name="file"
          id="fileInput"
          class="hidden-input"
          @change="updatePicture"
          ref="picture"
          accept=".pdf,.jpg,.jpeg,.png"
        />

        <label for="fileInput" class="file-label">
          <img v-if="picture" :src="picture" class="picture_preview" />
          <img
            v-else
            src="@/assets/picture_placeholder.svg"
            class="picture_preview"
          />
          <div v-if="isDragging">Release to drop files here.</div>
          <div v-else>Drop files here or <u>click here</u> to upload.</div>
        </label>
      </div> -->
      <FileUpload :picture="picture" @upload-picture="updatePicture" />

      <label for="picture_alt">Picture alt text</label>
      <input type="text" name="picture_alt" v-model="picture_alt" />

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
        <E2REditor @update="updateE2R($event)" :content="e2rContent" />
      </template>

      <template v-if="has_other_content">
        <template v-if="content_type === 'e2r'">
          <label for="content">Content</label>
          <v-md-editor v-model="content" height="400px"></v-md-editor>
        </template>

        <template v-if="content_type === 'plain'">
          <label for="title">E2R Content</label>
          <E2REditor @update="updateE2R($event)" :content="e2rContent" />
        </template>
      </template>

      <div class="other_content_row full_row">
        <Button @click="toggleOtherContent" boxed>{{
          `${has_other_content ? "Remove" : "Add"} ${
            content_type === "e2r" ? "plain text" : "easy-to-read"
          } content`
        }}</Button>
      </div>

      <Button class="submit_button full_row" type="submit" boxed>Submit</Button>
    </form>
  </div>
</template>
<script>
import E2REditor from "./E2REditor.vue";
import Button from "@/elements/Button.vue";
import FileUpload from "@/elements/FileUpload.vue";
import utils from "@/scripts/utils";

export default {
  name: "ArticleEditor",
  components: {
    E2REditor,
    Button,
    FileUpload,
  },
  data: () => ({
    content: "",
    content_type: "plain",
    title: "",
    author: null,
    excerpt: "",
    picture: null,
    picture_alt: "",
    e2rContent: [],

    users: [],
    has_other_content: false,
    pageReady: false,
    isDragging: false,

    isEditing: -1,
  }),
  computed: {
    rootUrl() {
      return window.location.origin;
    },
    generatedUrl() {
      return "/" + encodeURIComponent(this.title);
    },
  },
  watch: {
    content_type(val) {
      if (val === "e2r") {
        this.initE2R();
      }
    },
    has_other_content(val) {
      if (val && this.content_type === "plain") {
        this.initE2R();
        return;
      }

      if (!val) {
        switch (this.content_type) {
          case "plain":
            this.e2rContent = [];
            break;
          case "e2r":
            this.content = "";
            break;
          default:
            return;
        }
      }
    },
  },
  mounted() {
    this.loadUsers();
    console.log({ route: this.$route });
    if (this.$route.query.article_id) {
      this.$axios
        .get(`/article/${this.$route.query.article_id}`)
        .then((res) => {
          if (res.data.result.length) {
            let {
              idx,
              title,
              author,
              picture,
              content_e2r,
              content,
              excerpt,
              default_type,
              url,
            } = res.data.result[0];

            let parsedPicture = JSON.parse(picture);
            let parsedE2R = JSON.parse(content_e2r);

            this.isEditing = idx;
            this.title = title;
            this.author = author;
            this.picture = parsedPicture.picture;
            this.picture_alt = parsedPicture.alt;
            this.e2rContent = parsedE2R;
            this.content = content;
            this.excerpt = excerpt;
            this.content_type = default_type;
            this.url = url;
            this.has_other_content =
              default_type === "plain" ? !!parsedE2R.length : !!content;
          }
        });
    }
    this.pageReady = true;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toggleOtherContent() {
      this.has_other_content = !this.has_other_content;
    },
    loadUsers() {
      this.$axios.get("users").then((res) => {
        this.users = res.data.result;
      });
    },
    initE2R() {
      if (!Array.isArray(this.e2rContent) || !this.e2rContent.length) {
        this.e2rContent = [
          {
            pic: null,
            text: null,
          },
        ];
      }
    },
    updatePicture(file) {
      utils.uploadFile(file).then((res) => {
        this.picture = res.file.filepath;
      });
    },
    updateE2R(entries) {
      this.e2rContent = entries;
    },
    submitForm(event) {
      event.preventDefault();

      let e2r = this.e2rContent?.length ? this.e2rContent : null;

      let body = {
        content: this.content,
        default_type: this.content_type,
        title: this.title,
        author: this.author,
        excerpt: this.excerpt,
        picture: this.picture,
        picture_alt: this.picture_alt,
        content_e2r: e2r,
        url: this.generatedUrl,
      };

      if (this.isEditing > -1) {
        body.modified_at = new Date().toISOString();

        this.$axios
          .patch(`/article/${this.isEditing}`, body)
          .then(() => {
            this.$router.push({ name: "admin-articles" });
          })
          .catch((err) => {
            console.error({ err });
          });
      } else {
        this.$axios
          .post("/article", body)
          .then(() => {
            this.$router.push({ name: "admin-articles" });
          })
          .catch((err) => {
            console.error({ err });
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.url_preview {
  padding: 8px 15px;
}

.new-article {
  .section-title {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.new_article-form {
  display: grid;
  grid-template-columns: max-content auto;
  gap: 10px;

  label {
    margin-top: 9px;
    text-align: right;

    &:not(.file-label)::after {
      content: ":";
    }
  }

  .full_row {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .submit_button {
    justify-self: center;
    margin-top: 1rem;
  }
}
</style>
