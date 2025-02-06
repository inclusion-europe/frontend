<template>
  <div v-if="pageReady" class="new-post">
    <IeButton @click="goBack"> Go Back </IeButton>
    <h1 class="section-title">
      {{ isEditing > -1 ? 'Editing post' : 'New post' }}
    </h1>
    <form class="new_post-form-- grid grid-cols-2 gap-4" @submit="submitForm">
      <UFormGroup label="Post type">
        <USelect
          v-model="articleType"
          class="short"
          :options="articleTypes"
          size="md"
        />
      </UFormGroup>

      <UFormGroup label="Author">
        <USelect
          v-model="authorRef"
          class="short"
          :options="authors"
          size="md"
        />
      </UFormGroup>

      <template v-if="articleType === 'static_page'">
        <UFormGroup label="Parent menu item">
          <USelect
            v-model="menuParent"
            name="menu_parent"
            class="short"
            option-attribute="name"
            valueAttribute="id"
            :options="menu_items"
          />
        </UFormGroup>

        <UFormGroup label="Position in dropdown">
          <UInput
            type="number"
            :disabled="!menuParent"
            v-model="menuPosition"
          />
        </UFormGroup>
      </template>

      <UFormGroup label="Title" class="col-span-2">
        <UInput v-model="titleRef" size="md" class="grow" />
      </UFormGroup>

      <div class="col-span-2 flex gap-4">
        <UFormGroup label="Post-url" class="flex-grow">
          <UInput
            v-model="urlRef"
            :placeholder="generatedUrl"
            size="md"
            class="grow"
          />
        </UFormGroup>

        <UFormGroup label="Published">
          <UToggle v-model="isPublished" class="short" size="lg" />
        </UFormGroup>

        <UFormGroup label="Highlighted">
          <UToggle
            v-model="isHighlighted"
            class="short"
            :disabled="!isPublished"
            size="lg"
          />
        </UFormGroup>
      </div>

      <UFormGroup label="Tags" class="col-span-2">
        <div class="tags">
          <vue3-tags-input
            v-model="tag"
            :tags="tagsRef"
            placeholder=""
            @on-tags-changed="handleChangeTag"
            :add-tag-on-keys="[13, 188]"
          />
          <div v-if="showAutocomplete" class="tags-autocomplete">
            <IeButton
              v-for="(t, i) in filteredAutoTags"
              :key="`autotag_${i}`"
              class="autotag"
              @click="selectAutoTag(t)"
            >
              {{ t }}
            </IeButton>
          </div>
        </div>
      </UFormGroup>

      <UFormGroup label="Excerpt" class="col-span-2">
        <UTextarea name="excerpt" rows="3" v-model="excerptRef" />
      </UFormGroup>

      <UFormGroup label="Preview picture" class="col-span-2">
        <FileUpload :picture="pictureRef" @upload-picture="updatePicture" />
      </UFormGroup>

      <UFormGroup label="Picture alt text" class="col-span-2">
        <UInput type="text" name="picture_alt" v-model="picture_alt" />
      </UFormGroup>

      <h3 class="col-span-2">Post content</h3>

      <UFormGroup label="Default-view" class="col-span-2">
        <USelect
          v-model="content_type"
          name="default-content-type"
          :options="[
            { value: 'plain', label: 'Plain text' },
            { value: 'e2r', label: 'Easy-to-read' },
          ]"
        />
      </UFormGroup>

      <UFormGroup label="Upload a PDF">
        <UInput
          type="file"
          accept=".pdf"
          class="short"
          @change="uploadDocument"
          multiple
        />
      </UFormGroup>

      <UFormGroup
        :label="`Select to copy (${last_uploads.length} file${
          last_uploads.length != 1 ? 's' : ''
        } uploaded)`"
      >
        <USelect
          name="uploaded_files"
          v-model="copied_id"
          class="short"
          :disabled="!availableFiles.length"
          placeholder="⬅️ Upload a file to activate"
          :options="availableFiles"
          option-attribute="originalFilename"
          value-attribute="index"
        />
      </UFormGroup>

      <UFormGroup
        label="Content"
        v-if="content_type === 'plain'"
        class="col-span-2"
      >
        <MdEditor
          v-model="contentRef"
          height="400px"
          :toolbars="[
            'bold',
            'italic',
            '-',
            'title',
            'unorderedList',
            'orderedList',
            'table',
            'link',
            '-',
            'image',
            '=',
            'preview',
            'catalog',
            'fullscreen',
          ]"
          @onUploadImg="uploadPicToText"
          language="en-US"
        />
      </UFormGroup>

      <UFormGroup
        label="E2R Content"
        v-if="content_type === 'e2r'"
        class="col-span-2"
      >
        <E2REditor
          @update="updateE2R($event)"
          :content="e2rContent"
          :edit-on-init="startEditingE2R"
        />
      </UFormGroup>

      <template v-if="has_other_content">
        <UFormGroup
          label="Content"
          v-if="content_type === 'e2r'"
          class="col-span-2"
        >
          <template #label v-if="has_other_content">
            Content
            <UButton @click="toggleOtherContent" size="xs">
              Remove plain text content
            </UButton>
          </template>
          <MdEditor
            v-model="contentRef"
            height="400px"
            :toolbars="[
              'bold',
              'italic',
              '-',
              'title',
              'unorderedList',
              'orderedList',
              'table',
              'link',
              '-',
              'image',
              '=',
              'preview',
              'catalog',
              'fullscreen',
            ]"
            @onUploadImg="uploadPicToText"
            language="en-US"
          />
        </UFormGroup>

        <UFormGroup
          label="E2R Content"
          v-if="content_type === 'plain'"
          class="col-span-2"
        >
          <template #label v-if="has_other_content">
            E2R Content
            <UButton @click="toggleOtherContent" size="xs">
              Remove easy-to-read content
            </UButton>
          </template>
          <E2REditor
            @update="updateE2R($event)"
            :content="e2rContent"
            :edit-on-init="startEditingE2R"
          />
        </UFormGroup>
      </template>

      <div class="other_content_row col-span-2 flex flex-center">
        <UButton
          v-if="!has_other_content"
          @click="toggleOtherContent"
          size="xl"
        >
          {{
            `Add ${
              content_type === 'e2r' ? 'plain text' : 'easy-to-read'
            } content`
          }}
        </UButton>
      </div>

      <UButton class="submit_button col-span-2" block type="submit" size="xl">
        Submit
      </UButton>
    </form>
  </div>
</template>
<script setup>
import Vue3TagsInput from 'vue3-tags-input';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import E2REditor from '~/elements/E2REditor.vue';
import IeButton from '@/elements/Button.vue';
import FileUpload from '@/elements/FileUpload.vue';
import utils from '@/scripts/utils';
import useMyFetch from '~/composables/useMyFetch';

const articleTypes = [
  { value: 'news', label: 'News' },
  { value: 'blogpost', label: 'Blogpost' },
  { value: 'e2r_article', label: 'E2R Article' },
  { value: 'event', label: 'Event' },
  { value: 'report', label: 'Report' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'static_page', label: 'Static page' },
];

const router = useRouter();
const route = useRoute();

const config = useRuntimeConfig();

const articleType = ref(null);
const contentRef = ref('');
const content_type = ref('plain');
const menuParent = ref(null);
const menuPosition = ref(null);
const titleRef = ref('');
const authorRef = ref(0);
const tagsRef = ref([]);
const excerptRef = ref('');
const pictureRef = ref(null);
const picture_alt = ref('');
const e2rContent = ref([]);
const copied_id = ref(null);
const urlRef = ref('');

const users = ref([]);
const autoTags = ref([]);
const menu_items = ref([]);
const has_other_content = ref(false);
const pageReady = ref(false);
const isDragging = ref(false);
const tag = ref('');
const isPublished = ref(false);
const isHighlighted = ref(false);
const last_uploads = ref([]);

const isEditing = ref(-1);
const startEditingE2R = ref(false);

const rootUrl = config.app.baseURL;

const generatedUrl = computed(() => {
  return `/${encodeURIComponent(
    titleRef.value.trim().replace(/\s+/g, '-').replaceAll(',', '').toLowerCase()
  )}`;
});

const filteredAutoTags = computed(() => {
  return autoTags.value.filter(
    (i) =>
      i.toLowerCase().indexOf(tag.value) !== -1 && !tagsRef.value.includes(i)
  );
});

const showAutocomplete = computed(() => {
  return tag.value.length && filteredAutoTags.value.length;
});

const authors = computed(() => {
  const returnee = [{ value: 0, label: 'Leave blank' }];
  returnee.push(
    ...users.value.map((i) => {
      return {
        value: i.email,
        label: i.first_name + ' ' + i.last_name,
      };
    })
  );
  return returnee;
});

const availableFiles = computed(() =>
  last_uploads.value.map((i, idx) => ({ index: idx, ...i }))
);

watch(content_type, (val) => {
  if (val === 'e2r') {
    initE2R();
  }
});

watch(copied_id, (val) => {
  if (val !== null) {
    copyFileUrl(val);
  }
});

watch(articleType, (val) => {
  if (val === 'e2r_article') {
    content_type.value = 'e2r';
  }
});

watch(has_other_content, (val) => {
  if (val && content_type.value === 'plain') {
    initE2R();
    return;
  }

  if (!val) {
    switch (content_type.value) {
      case 'plain':
        e2rContent.value = [];
        break;
      case 'e2r':
        contentRef.value = '';
        break;
      default:
    }
  }
});

watch(isPublished, (val) => {
  if (!val) {
    isHighlighted.value = false;
  }
});

onMounted(() => {
  loadUsers();
  loadTags();
  loadMenuItems();
  if (route.query.postId) {
    useMyFetch(`post/id/${route.query.postId}`).then((res) => {
      if (res.hasOwnProperty('idx')) {
        const {
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
        } = res;

        const parsedPicture = picture
          ? JSON.parse(picture)
          : { picture: null, alt: null };

        const parsedE2R = JSON.parse(content_e2r) || [];
        if (tags) {
          tagsRef.value = tags.split(',').filter((i) => !utils.isEmptyStr(i));
        } else {
          tagsRef.value = [];
        }

        menuParent.value = menu_parent;
        menuPosition.value = menu_position;
        isEditing.value = idx;
        titleRef.value = title;
        authorRef.value = author || 0;
        pictureRef.value = parsedPicture?.picture;
        picture_alt.value = parsedPicture?.alt;
        e2rContent.value = parsedE2R || [];
        contentRef.value = unescape(content) || '';
        excerptRef.value = excerpt;
        content_type.value = default_type;
        urlRef.value = url.startsWith('/') ? url.substring(1) : url;
        articleType.value = article_type;
        isPublished.value = !!published;
        isHighlighted.value = !!highlighted;
        has_other_content.value =
          default_type === 'plain' ? !!parsedE2R?.length : !!content;
      }
      /* eslint-enable camelcase */
    });
  }
  pageReady.value = true;
});

const goBack = () => {
  router.back();
};

const toggleOtherContent = () => {
  has_other_content.value = !has_other_content.value;
};

const loadUsers = () => {
  useMyFetch('admin/users').then((res) => {
    users.value = res;
  });
};

const loadMenuItems = () => {
  useMyFetch('menu/items').then((res) => {
    menu_items.value = res;
  });
};

const loadTags = () => {
  useMyFetch('tags').then((res) => {
    autoTags.value = utils.uniquesInArray(
      res
        .map((i) => i.tags)
        .join(',')
        .split(',')
    );
  });
};

const initE2R = () => {
  if (!Array.isArray(e2rContent.value) || !e2rContent.value.length) {
    e2rContent.value = [
      {
        pic: null,
        text: '',
      },
    ];
    startEditingE2R.value = true;
  }
};

const uploadPicToText = async (files, callback) => {
  const res = await Promise.all(files.map((file) => utils.uploadFile(file)));

  callback(res.map((item) => item.file.filepath));
};

const uploadDocument = async (files) => {
  if (files.length === 0) return;

  const res = await Promise.all(
    Array.from(files).map((file) => utils.uploadFile(file))
  );

  res.map((item) => {
    last_uploads.value.push(item.file);
  });
};

const copyFileUrl = (index) => {
  window.navigator.clipboard
    .writeText(
      `[${availableFiles.value[index].originalFilename}](${availableFiles.value[index].filepath})`
    )
    .then(() => {
      useNuxtApp().$toast('Link copied to clipboard');
    });
};

const updatePicture = (file) => {
  utils.uploadFile(file).then((res) => {
    pictureRef.value = res.file.filepath;
  });
};

const updateE2R = (entries) => {
  e2rContent.value = entries;
};

const handleChangeTag = (input) => {
  tagsRef.value = input;
};

const selectAutoTag = (selectedTag) => {
  tagsRef.value.push(selectedTag);
  tag.value = '';
};

const submitForm = (event) => {
  event.preventDefault();

  const content_e2r = e2rContent.value?.length ? e2rContent.value : null;
  const tagsValue = tagsRef.value?.length ? tagsRef.value.join(',') : null;
  const menu_parent = menuParent.value ? +menuParent.value : null;
  let urlValue = utils.isEmptyStr(urlRef.value)
    ? generatedUrl.value
    : urlRef.value;

  if (!urlValue.startsWith('/')) {
    urlValue = `/${urlValue}`;
  }

  const body = {
    default_type: content_type.value,
    title: titleRef.value,
    url: urlValue,
    author: authorRef.value || null,
    article_type: articleType.value,
    tags: tagsValue,
    content_e2r,
    menu_parent,
    content: contentRef.value,
    excerpt: excerptRef.value,
    picture_alt: picture_alt.value,
    picture: pictureRef.value,
    published: isPublished.value,
    highlighted: isHighlighted.value,
  };

  let prom;
  if (isEditing.value > -1) {
    prom = useMyFetch(`/post/${isEditing.value}`, { method: 'PATCH', body });
  } else {
    prom = useMyFetch('/post', { method: 'POST', body });
  }

  prom
    .then(() => {
      navigateTo('/admin/posts');
    })
    .catch(() => {
      useNuxtApp().$toast(
        'Error submitting post, please contact the developer.'
      );
    });
};
</script>
<style lang="scss" scoped>
.url_preview {
  padding: 8px 15px;
}

.new-post {
  width: var(--width);
  max-width: var(--max-width);
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
  width: var(--width);
  max-width: var(--max-width);

  & > *:not(label) {
    align-self: center;
    &:not(.short) {
      grid-column: 2 / -1;
    }
  }

  label {
    margin-top: 9px;
    text-align: right;

    &:not(.file-label)::after {
      content: ':';
    }
  }

  .full_row {
    grid-column: 1 / -1 !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
    z-index: 100;

    .autotag {
      font-weight: 400;
      font-family: 'Gilroy';
      font-size: 18px;
      padding: 5px;
      width: 100%;
      text-align: left;

      &:hover {
        background-color: var(--ie-blue--whiteout);
      }
    }
  }
}
</style>
