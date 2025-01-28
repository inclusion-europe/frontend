<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="grid grid-cols-1 gap-4">
      <div
        v-for="(entry, i) in entries"
        :key="`entry_${i}`"
        class="e2r-entry flex gap-4"
      >
        <template v-if="currently_editing === i">
          <FileUpload
            :picture="entry.pic"
            @upload-picture="(f) => addPic(f, i)"
            :input-name="`entry_${i}_pic`"
          />
          <MdEditor
            v-model="entries[i].text"
            :key="`entry_${i}_editor`"
            :toolbars="[
              'bold',
              'italic',
              '-',
              'title',
              'unorderedList',
              'orderedList',
              'table',
              'link',
              '=',
              'preview',
            ]"
            :preview="false"
            style="height: 300px"
            @upload-image="uploadPicToText"
            language="en-US"
          />
        </template>
        <template v-else>
          <img v-if="entry.pic" :src="entry.pic" class="preview-pic" />
          <div class="grow e2r-content-preview" @click="startEditing(i)">
            <vue-markdown :source="entry.text" />
          </div>
        </template>
        <div class="flex flex-col gap-2 items-stretch justify-start">
          <UButton v-if="currently_editing === i" block @click="stopEditing">
            Save
          </UButton>
          <UButton v-else block @click="startEditing(i)"> Edit </UButton>
          <UButton
            v-if="entries.length > 1"
            block
            @click="removeEntry(i)"
            .class="remove_entry_button"
            boxed
          >
            Remove
          </UButton>
        </div>
      </div>
    </div>
    <UButton boxed class="e2r-add-row" @click="addEntry"> Add entry </UButton>
  </div>
</template>
<script setup>
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import FileUpload from '@/elements/FileUpload.vue';
import utils from '@/scripts/utils';
import VueMarkdown from 'vue-markdown-render';

const entries = ref([]);
const currently_editing = ref(-1);

const props = defineProps({
  content: {
    type: Array,
    required: true,
  },
  editOnInit: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update']);

watch(entries, (val) => {
  emit('update', val);
});

watch(props.editOnInit, (val) => {
  if (val) currently_editing.value = 0;
});

onMounted(() => {
  entries.value = props.content;

  if (props.editOnInit) {
    currently_editing.value = 0;
  }
});

const addEntry = () => {
  entries.value.push({
    pic: null,
    text: '',
  });
  currently_editing.value = entries.value.length - 1;
};

const removeEntry = (index) => {
  entries.value.splice(index, 1);
};

const update = () => {
  emit('update', entries.value);
};

const updateText = (val, i) => {
  entries.value[i].text = val;
  update();
};

const addPic = (file, i) => {
  utils.uploadFile(file).then((res) => {
    entries.value[i].pic = res.file.filepath;
  });
  update();
};

const startEditing = (i) => {
  currently_editing.value = i;
};

const stopEditing = () => {
  currently_editing.value = -1;
};
</script>
<style lang="scss" scoped>
.e2r-entry {
  // display: grid;
  // grid-template-columns: 175px 1fr max-content;
  // align-items: stretch;
  // gap: 10px;
  // width: var(--width);
  // max-width: var(--max-width);

  &:deep(.picture_upload) {
    max-width: 200px;

    .picture_preview {
      max-height: 180px;
    }
  }

  .preview-pic {
    height: 200px;
    width: 200px;
    align-self: center;
    justify-self: center;
    border-radius: 2px;
    object-fit: cover;
  }

  .e2r-content-preview {
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
    cursor: pointer;

    &:deep(p):first-child {
      margin-block-start: 0 !important;
    }
  }
}

.e2r-add-row {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
