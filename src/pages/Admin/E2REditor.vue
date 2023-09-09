<template>
  <div class="e2r-entry">
    <template v-for="(entry, i) in entries" :key="`entry_${i}`">
      <input
        type="file"
        accept="image/png, image/jpeg"
        :name="`entry_${i}_pic`"
        @change="(event) => addPic(event, i)"
      />
      <input
        type="text"
        :name="`entry_${i}_text`"
        v-model="entries[i].text"
        @change="update"
      />
      <div>
        <Button v-if="entries.length > 1" @click="removeEntry(i)">
          Remove
        </Button>
      </div>
    </template>
    <Button boxed class="e2r-add-row" @click="addEntry">Add entry</Button>
  </div>
</template>
<script>
import Button from "@/elements/Button.vue";
export default {
  name: "E2REditor",
  components: {
    Button,
  },
  data: () => ({
    entries: [],
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
    },
    removeEntry(index) {
      this.entries.splice(index, 1);
    },
    update() {
      this.$emit("update", this.entries);
    },
    addPic(event, i) {
      this.entries[i].pic = event.target.files;
      this.update();
    },
  },
};
</script>
<style lang="scss" scoped>
.e2r-entry {
  display: grid;
  grid-template-columns: max-content max-content 200px;
  align-items: center;
  gap: 10px;
}

.e2r-add-row {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
