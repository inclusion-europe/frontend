<template>
  <div class="e2r-entry">
    <template v-for="(entry, i) in entries" :key="`entry_${i}`">
      <template v-if="currently_editing === i">
        <FileUpload
          :picture="entry.pic"
          @upload-picture="(f) => addPic(f, i)"
          :input-name="`entry_${i}_pic`"
        />
        <!-- <input
          type="file"
          accept="image/png, image/jpeg"
          :name="`entry_${i}_pic`"
          @change="(event) => addPic(event, i)"
        /> -->
        <!-- <v-md-editor v-model="entries[i].text" height="300px"></v-md-editor> -->
        <textarea
          :id="`e2r_entry_${i}_text`"
          :name="`entry_${i}_text`"
          v-model="entries[i].text"
          @change="update"
          rows="6"
        />
      </template>
      <template v-else>
        <img :src="entry.pic" v-if="entry.pic" class="preview-pic" />
        <div v-else />
        <div>
          <span v-html="entry.text" />
        </div>
      </template>
      <div>
        <Button v-if="currently_editing === i" @click="stopEditing"
          >Save</Button
        >
        <Button v-else @click="startEditing(i)">Edit</Button>
        <Button
          v-if="entries.length > 1"
          @click="removeEntry(i)"
          .class="remove_entry_button"
          boxed
        >
          Remove
        </Button>
      </div>
    </template>
    <Button boxed class="e2r-add-row" @click="addEntry">Add entry</Button>
  </div>
</template>
<script>
import Button from "@/elements/Button.vue";
import FileUpload from "@/elements/FileUpload.vue";
import utils from "@/scripts/utils";

export default {
  name: "E2REditor",
  components: {
    Button,
    FileUpload,
  },
  data: () => ({
    entries: [],
    currently_editing: 0,
  }),
  props: {
    content: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.entries = this.content;
  },
  watch: {
    entries(val) {
      this.$emit("update", val);
    },
  },
  methods: {
    addEntry() {
      this.entries.push({
        pic: null,
        text: null,
      });
      this.currently_editing = this.entries.length - 1;
    },
    removeEntry(index) {
      this.entries.splice(index, 1);
    },
    update() {
      this.$emit("update", this.entries);
    },
    addPic(file, i) {
      utils.uploadFile(file).then((res) => {
        this.entries[i].pic = res.file.filepath;
      });
      this.update();
    },
    startEditing(i) {
      this.currently_editing = i;
    },
    stopEditing() {
      this.currently_editing = -1;
    },
  },
};
</script>
<style lang="scss" scoped>
.e2r-entry {
  display: grid;
  grid-template-columns: 175px 1fr max-content;
  align-items: stretch;
  gap: 10px;

  .preview-pic {
    height: 150px;
    width: 150px;
    align-self: center;
    justify-self: center;
    border-radius: 2px;
    object-fit: cover;
  }
}

.e2r-add-row {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
