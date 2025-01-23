<template>
  <div
    class="picture_upload"
    :class="{ 'picture_upload--active': isDragging }"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <input
      type="file"
      multiple
      :name="inputName || 'file'"
      :id="inputName || 'fileInput'"
      class="hidden-input"
      @change="updatePicture"
      ref="picture"
      accept=".pdf,.jpg,.jpeg,.png"
    />

    <label :for="inputName || 'fileInput'" class="file-label">
      <img v-if="picture" :src="picture" class="picture_preview" />
      <img
        v-else
        src="@/assets/picture_placeholder.svg"
        class="picture_preview"
      />
      <div v-if="isDragging">Release to drop files here.</div>
      <div v-else>Drop files here or <u>click here</u> to upload.</div>
    </label>
  </div>
</template>
<script>
export default {
  name: 'FileUpload',
  props: {
    picture: {
      type: String,
      default: null,
    },
    inputName: {
      type: String,
      default: null,
    },
  },
  methods: {
    drop(e) {
      e.preventDefault();
      this.$emit('uploadPicture', e.dataTransfer.files[0]);
      this.isDragging = false;
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    updatePicture(e) {
      this.$emit('uploadPicture', e.target.files[0]);
    },
  },
};
</script>
<style lang="scss" scoped>
.picture_upload {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);

  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(var(--color-gray-300) / var(--tw-ring-opacity, 1));
  --tw-ring-inset: inset;

  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
    var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
    calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  --tw-text-opacity: 1;

  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
    var(--tw-shadow, 0 0 #0000) !important;
  padding: 10px;
  border-radius: 0.375rem;
  border: 0;
  border-color: var(--black);
  width: auto;

  &--active {
    border-color: var(--ie-blue);
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .picture_preview {
    max-height: 100px;
    width: auto;
    border-radius: 2px;
  }
}
</style>
