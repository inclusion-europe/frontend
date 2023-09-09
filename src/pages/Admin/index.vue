<template>
  <div class="admin" v-if="pageReady">
    <h1 class="section-title">New article</h1>
    <form class="new_article-form" @submit="submitForm">
      <label for="title">Title</label>
      <input type="text" name="title" v-model="title" />

      <label for="excerpt">Excerpt</label>
      <textarea name="excerpt" rows="3" v-model="excerpt" />

      <label for="picture">Preview picture</label>
      <input
        type="file"
        accept="image/png, image/jpeg"
        name="picture"
        @change="updatePicture"
      />

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

export default {
  name: "Admin",
  components: {
    E2REditor,
    Button,
  },
  data: () => ({
    content: "",
    content_type: "plain",
    title: "",
    excerpt: "",
    picture: null,
    e2rContent: [],

    has_other_content: false,
    pageReady: false,
  }),
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
    if (
      this.$cookies.get("im_auth_token") ||
      (process.env.VUE_APP_NOAUTH && process.env.VUE_APP_NOAUTH === "true")
    ) {
      this.pageReady = true;
      return;
    }

    const code = this.$route.query.code;
    const im_auth_state = this.$route.query.state;
    const im_auth_state_cookie = this.$cookies.get("im_auth_state");
    if (
      !code ||
      !im_auth_state ||
      !im_auth_state_cookie ||
      im_auth_state !== im_auth_state_cookie
    ) {
      console.error("Invalid authentication");
      this.$router.push("/");
      return;
    }

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
      .then((res) => {
        if (!res.data || !res.data.access_token) {
          console.error("Invalid token response");
          this.$router.push("/");
          return;
        }

        let expires = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);

        this.$cookies.set("im_auth_token", res.data.access_token, { expires });

        this.$router.push("/admin");
      })
      .catch((err) => {
        console.error({ err });
      });
  },
  methods: {
    toggleOtherContent() {
      this.has_other_content = !this.has_other_content;
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
    updatePicture(event) {
      let formData = new FormData();
      formData.append("attachment", event.target.files[0]);

      this.$axios.post("upload", formData).then((res) => {
        console.log({ res });
      });
    },
    updateE2R(entries) {
      this.e2rContent = entries;
    },
    submitForm(event) {
      event.preventDefault();

      let e2r = this.e2rContent;

      if (Array.isArray(e2r)) {
        e2r.forEach((item, i) => {
          if (item.pic && !!item.pic.length) {
            e2r[i].pic = item.pic[0];
          }
        });
      }

      let body = {
        content: this.content,
        content_type: this.content_type,
        title: this.title,
        excerpt: this.excerpt,
        picture: this.picture && !!this.picture.length ? this.picture[0] : null,
        e2rContent: e2r,
      };

      console.log({ body });
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
