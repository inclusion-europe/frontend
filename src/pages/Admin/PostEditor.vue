<template>
  <div class="new-post" v-if="pageReady">
    <Button @click="goBack">Go Back</Button>
    <h1 class="section-title">
      {{ isEditing > -1 ? "Editing post" : "New post" }}
    </h1>
    <form class="new_post-form" @submit="submitForm">
      <label for="article_type">Post type</label>
      <select name="article_type" v-model="article_type" class="short">
        <option :value="null" />
        <option value="news">News</option>
        <option value="blogpost">Blogpost</option>
        <option value="e2r_article">E2R Article</option>
        <option value="event">Event</option>
        <option value="report">Report</option>
        <option value="podcast">Podcast</option>
        <option value="static_page">Static page</option>
      </select>

      <label for="author">Author</label>
      <select name="author" v-model="author" class="short">
        <option :value="null">Leave blank</option>
        <option
          v-for="user in users"
          :key="`user_${user.id}`"
          :value="user.email"
        >
          {{ user.first_name }} {{ user.last_name }}
        </option>
      </select>

      <template v-if="article_type === 'static_page'">
        <label for="menu_parent">Parent menu item</label>
        <select name="menu_parent" v-model="menu_parent" class="short">
          <option :value="null"></option>
          <option
            v-for="item in menu_items"
            :key="`menu_item_${item.id}`"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </select>

        <label for="menu_position">Position in dropdown</label>
        <input
          type="number"
          :disabled="!menu_parent"
          class="short"
          v-model="menu_position"
        />
      </template>

      <label for="title">Title</label>
      <input type="text" name="title" v-model="title" />

      <!-- <label>URL</label>
      <span class="url_preview">{{ rootUrl }}{{ generatedUrl }}</span> -->

      <label for="published">Published</label>
      <input type="checkbox" v-model="published" class="short" />

      <label for="highlighted">Highlighted</label>
      <input
        type="checkbox"
        v-model="highlighted"
        class="short"
        :disabled="!published"
      />

      <label for="tags">Tags</label>
      <div class="tags">
        <vue3-tags-input
          v-model="tag"
          :tags="tags"
          placeholder=""
          @on-tags-changed="handleChangeTag"
          :add-tag-on-keys="[13, 188]"
        />
        <div class="tags-autocomplete" v-if="showAutocomplete">
          <Button
            v-for="(t, i) in filteredAutoTags"
            :key="`autotag_${i}`"
            class="autotag"
            @click="selectAutoTag(t)"
          >
            {{ t }}
          </Button>
        </div>
      </div>

      <label for="excerpt">Excerpt</label>
      <textarea name="excerpt" rows="3" v-model="excerpt" />

      <label for="picture">Preview picture</label>
      <FileUpload :picture="picture" @upload-picture="updatePicture" />

      <label for="picture_alt">Picture alt text</label>
      <input type="text" name="picture_alt" v-model="picture_alt" />

      <label for="default-content-type">Default view</label>
      <select name="default-content-type" v-model="content_type" class="short">
        <option value="plain">Plain text</option>
        <option value="e2r">Easy-to-Read</option>
      </select>

      <label for="url">Post url</label>
      <input type="text" name="url" v-model="url" class="short" />

      <label for="picture">Upload a PDF</label>
      <input type="file" accept=".pdf" class="short" @change="uploadDocument" />
      <label for="uploaded_files">Copy an url</label>
      <select name="uploaded_files" v-model="copied_id" class="short">
        <option :value="null" />
        <option
          v-for="(file, i) in last_uploads"
          :key="`last_file_${i}`"
          :value="i"
        >
          {{ file.originalFilename }}
        </option>
      </select>

      <template v-if="content_type === 'plain'">
        <label for="content">Content</label>
        <v-md-editor
          v-model="content"
          height="400px"
          left-toolbar="undo redo | bold italic | h ul ol table link | image"
          :disabled-menus="[]"
          @upload-image="uploadPicToText"
        ></v-md-editor>
      </template>

      <template v-if="content_type === 'e2r'">
        <label for="title">E2R Content</label>
        <E2REditor
          @update="updateE2R($event)"
          :content="e2rContent"
          :edit-on-init="startEditingE2R"
        />
      </template>

      <template v-if="has_other_content">
        <template v-if="content_type === 'e2r'">
          <label for="content">Content</label>
          <v-md-editor v-model="content" height="400px"></v-md-editor>
        </template>

        <template v-if="content_type === 'plain'">
          <label for="title">E2R Content</label>
          <E2REditor
            @update="updateE2R($event)"
            :content="e2rContent"
            :edit-on-init="startEditingE2R"
          />
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

import Vue3TagsInput from "vue3-tags-input";

export default {
  name: "PostEditor",
  components: {
    E2REditor,
    Button,
    FileUpload,
    Vue3TagsInput,
  },
  data: () => ({
    article_type: null,
    content: "",
    content_type: "plain",
    menu_parent: null,
    menu_position: null,
    title: "",
    author: null,
    tags: [],
    excerpt: "",
    picture: null,
    picture_alt: "",
    e2rContent: [],
    copied_id: null,
    url: "",

    users: [],
    autoTags: [],
    menu_items: [],
    has_other_content: false,
    pageReady: false,
    isDragging: false,
    tag: "",
    published: false,
    highlighted: false,
    last_uploads: [],

    isEditing: -1,
    startEditingE2R: false,
  }),
  computed: {
    rootUrl() {
      return window.location.origin;
    },
    generatedUrl() {
      return (
        "/" +
        encodeURIComponent(
          this.title
            .trim()
            .replace(/\s+/g, "-")
            .replaceAll(",", "")
            .toLowerCase()
        )
      );
    },
    filteredAutoTags() {
      return this.autoTags.filter((i) => {
        return (
          i.toLowerCase().indexOf(this.tag) !== -1 && !this.tags.includes(i)
        );
      });
    },
    showAutocomplete() {
      return this.tag.length && this.filteredAutoTags.length;
    },
  },
  watch: {
    content_type(val) {
      if (val === "e2r") {
        this.initE2R();
      }
    },
    copied_id(val) {
      if (val !== null) {
        this.copyFileUrl(val);
      }
    },
    article_type(val) {
      if (val === "e2r_article") {
        this.content_type = "e2r";
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
    published(val) {
      if (!val) {
        this.highlighted = false;
      }
    },
  },
  mounted() {
    this.loadUsers();
    this.loadTags();
    this.loadMenuItems();
    if (this.$route.query.post_id) {
      this.$axios.get(`/post/${this.$route.query.post_id}`).then((res) => {
        if (res.data.length) {
          let {
            idx,
            title,
            menu_parent,
            menu_position,
            author,
            picture,
            content_e2r,
            content,
            excerpt,
            default_type,
            url,
            tags,
            article_type,
            published,
            highlighted,
          } = res.data[0];

          let parsedPicture = picture
            ? JSON.parse(picture)
            : { picture: null, alt: null };

          let parsedE2R = JSON.parse(content_e2r) || [];
          console.log(content_e2r, parsedE2R);
          if (tags) {
            tags = tags.split(",").filter((i) => !utils.isEmptyStr(i));
          } else {
            tags = [];
          }

          this.menu_parent = menu_parent;
          this.menu_position = menu_position;
          this.isEditing = idx;
          this.title = title;
          this.author = author;
          this.picture = parsedPicture?.picture;
          this.picture_alt = parsedPicture?.alt;
          this.e2rContent = parsedE2R || [];
          this.content = unescape(content) || "";
          this.excerpt = excerpt;
          this.content_type = default_type;
          this.url = url.startsWith("/") ? url.substring(1) : url;
          this.tags = tags;
          this.article_type = article_type;
          this.published = !!published;
          this.highlighted = !!highlighted;
          this.has_other_content =
            default_type === "plain" ? !!parsedE2R?.length : !!content;
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
        this.users = res.data;
      });
    },
    loadMenuItems() {
      this.$axios.get("menu/items").then((res) => {
        this.menu_items = res.data;
      });
    },
    loadTags() {
      this.$axios.get("tags").then((res) => {
        this.autoTags = utils.uniquesInArray(
          res.data
            .map((i) => {
              console.log(i.tags);
              return i.tags;
            })
            .join(",")
            .split(",")
        );
      });
    },
    initE2R() {
      if (!Array.isArray(this.e2rContent) || !this.e2rContent.length) {
        this.e2rContent = [
          {
            pic: null,
            text: "",
          },
        ];
        this.startEditingE2R = true;
      }
    },
    uploadPicToText(event, insertImage, file) {
      console.log({
        event,
        insertImage,
        file,
      });
      utils.uploadFile(file[0]).then((res) => {
        insertImage({
          url: res.file.filepath,
          desc: "alt-text",
        });
      });
    },
    uploadDocument(event) {
      utils.uploadFile(event.target.files[0]).then((res) => {
        this.last_uploads.push(res.file);
      });
    },
    copyFileUrl(index) {
      console.log({
        list: this.last_uploads,
        index,
        file: this.last_uploads[index],
      });
    },
    updatePicture(file) {
      console.log({ file });
      utils.uploadFile(file).then((res) => {
        this.picture = res.file.filepath;
      });
    },
    updateE2R(entries) {
      this.e2rContent = entries;
    },
    handleChangeTag(tags) {
      this.tags = tags;
    },
    selectAutoTag(tag) {
      this.tags.push(tag);
      this.tag = "";
    },
    submitForm(event) {
      event.preventDefault();

      let content_e2r = this.e2rContent?.length ? this.e2rContent : null;
      let tags = this.tags?.length ? this.tags.join(",") : null;
      let menu_parent = this.menu_parent ? +this.menu_parent : null;

      let body = {
        default_type: this.content_type,
        title: this.title,
        url: utils.isEmptyStr(this.url)
          ? this.generatedUrl
          : this.url.startsWith("/")
          ? this.url
          : `/${this.url}`,
        author: this.author,
        article_type: this.article_type,
        tags,
        content_e2r,
        menu_parent,
        content: this.content,
        excerpt: this.excerpt,
        picture_alt: this.picture_alt,
        picture: this.picture,
        published: this.published,
        highlighted: this.highlighted,
      };

      if (this.isEditing > -1) {
        this.$axios
          .patch(`/post/${this.isEditing}`, body)
          .then(() => {
            this.$router.push({ name: "admin-posts" });
          })
          .catch((err) => {
            console.error({ err });
          });
      } else {
        this.$axios
          .post("/post", body)
          .then(() => {
            this.$router.push({ name: "admin-posts" });
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
@import "@/assets/style/variables.scss";

.url_preview {
  padding: 8px 15px;
}

.new-post {
  width: $max-width;
  max-width: 80vw;
  .section-title {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.new_post-form {
  display: grid;
  grid-template-columns: max-content 1fr max-content 1fr;
  gap: 10px;
  width: $max-width;
  max-width: 80vw;

  & > *:nth-child(2n) {
    align-self: center;
    &:not(.short) {
      grid-column: 2 / -1;
    }
  }

  label {
    margin-top: 9px;
    text-align: right;

    &:not(.file-label)::after {
      content: ":";
    }
  }

  .full_row {
    grid-column: 1 / -1 !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .submit_button {
    justify-self: center;
    margin-top: 1rem;
  }

  .tags {
    position: relative;

    &-autocomplete {
      position: absolute;
      top: calc(100% + 2px);
      border-radius: 4px;
      border: 1px solid #000;
      background: white;
      width: calc(100% - 8px);
      margin: 0 4px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0;

      .autotag {
        font-weight: 400;
        font-family: "Gilroy";
        font-size: 18px;
        padding: 5px;
        width: 100%;
        text-align: left;

        &:hover {
          background-color: $ie-blue--whiteout;
        }
      }
    }
  }
}
</style>
