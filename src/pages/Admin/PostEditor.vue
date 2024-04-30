<template>
    <div v-if="pageReady" class="new-post">
        <IeButton @click="goBack"> Go Back </IeButton>
        <h1 class="section-title">
            {{ isEditing > -1 ? 'Editing post' : 'New post' }}
        </h1>
        <form class="new_post-form" @submit="submitForm">
            <label for="article_type">Post type</label>
            <select v-model="article_type" name="article_type" class="short">
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
            <select v-model="author" name="author" class="short">
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
                <select v-model="menu_parent" name="menu_parent" class="short">
                    <option :value="null" />
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

            <label for="url">Post url</label>
            <input type="text" name="url" v-model="url" />

            <!-- <label>URL</label>
      <span class="url_preview">{{ rootUrl }}{{ generatedUrl }}</span> -->

            <label for="published">Published</label>
            <input v-model="published" type="checkbox" class="short" />

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

            <label for="excerpt">Excerpt</label>
            <textarea name="excerpt" rows="3" v-model="excerpt" />

            <label for="picture">Preview picture</label>
            <FileUpload :picture="picture" @upload-picture="updatePicture" />

            <label for="picture_alt">Picture alt text</label>
            <input type="text" name="picture_alt" v-model="picture_alt" />

            <h3 class="full_row">Post content</h3>

            <label for="default-content-type">Default view</label>
            <select v-model="content_type" name="default-content-type">
                <option value="plain">Plain text</option>
                <option value="e2r">Easy-to-Read</option>
            </select>

            <label for="picture">Upload a PDF</label>
            <input
                type="file"
                accept=".pdf"
                class="short"
                @change="uploadDocument"
                multiple
            />
            <label for="uploaded_files">Copy an url</label>
            <select
                name="uploaded_files"
                v-model="copied_id"
                class="short"
                :disabled="!last_uploads.length"
            >
                <option :value="null">
                    {{
                        last_uploads.length
                            ? `Select to copy (${last_uploads.length} files uploaded)`
                            : '⬅️ Upload a file to activate'
                    }}
                </option>
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
                    <v-md-editor v-model="content" height="400px" />
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
                <IeButton boxed @click="toggleOtherContent">
                    {{
                        `${has_other_content ? 'Remove' : 'Add'} ${
                            content_type === 'e2r'
                                ? 'plain text'
                                : 'easy-to-read'
                        } content`
                    }}
                </IeButton>
            </div>

            <IeButton class="submit_button full_row" type="submit" boxed>
                Submit
            </IeButton>
        </form>
    </div>
</template>
<script>
import Vue3TagsInput from 'vue3-tags-input';
import { toast } from 'vue3-toastify';
import E2REditor from './E2REditor.vue';
import IeButton from '@/elements/Button.vue';
import FileUpload from '@/elements/FileUpload.vue';
import utils from '@/scripts/utils';

export default {
    name: 'PostEditor',
    components: {
        E2REditor,
        IeButton,
        FileUpload,
        Vue3TagsInput,
    },
    data: () => ({
        article_type: null,
        content: '',
        content_type: 'plain',
        menu_parent: null,
        menu_position: null,
        title: '',
        author: null,
        tags: [],
        excerpt: '',
        picture: null,
        picture_alt: '',
        e2rContent: [],
        copied_id: null,
        url: '',

        users: [],
        autoTags: [],
        menu_items: [],
        has_other_content: false,
        pageReady: false,
        isDragging: false,
        tag: '',
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
            return `/${encodeURIComponent(
                this.title
                    .trim()
                    .replace(/\s+/g, '-')
                    .replaceAll(',', '')
                    .toLowerCase(),
            )}`;
        },
        filteredAutoTags() {
            return this.autoTags.filter(
                (i) =>
                    i.toLowerCase().indexOf(this.tag) !== -1 &&
                    !this.tags.includes(i),
            );
        },
        showAutocomplete() {
            return this.tag.length && this.filteredAutoTags.length;
        },
    },
    watch: {
        content_type(val) {
            if (val === 'e2r') {
                this.initE2R();
            }
        },
        copied_id(val) {
            if (val !== null) {
                this.copyFileUrl(val);
            }
        },
        article_type(val) {
            if (val === 'e2r_article') {
                this.content_type = 'e2r';
            }
        },
        has_other_content(val) {
            if (val && this.content_type === 'plain') {
                this.initE2R();
                return;
            }

            if (!val) {
                switch (this.content_type) {
                    case 'plain':
                        this.e2rContent = [];
                        break;
                    case 'e2r':
                        this.content = '';
                        break;
                    default:
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
        if (this.$route.query.postId) {
            this.$axios.get(`/post/${this.$route.query.postId}`).then((res) => {
                if (res.data.length) {
                    /* eslint-disable camelcase */
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
                    } = res.data[0];

                    const parsedPicture = picture
                        ? JSON.parse(picture)
                        : { picture: null, alt: null };

                    const parsedE2R = JSON.parse(content_e2r) || [];
                    if (tags) {
                        this.tags = tags
                            .split(',')
                            .filter((i) => !utils.isEmptyStr(i));
                    } else {
                        this.tags = [];
                    }

                    this.menu_parent = menu_parent;
                    this.menu_position = menu_position;
                    this.isEditing = idx;
                    this.title = title;
                    this.author = author;
                    this.picture = parsedPicture?.picture;
                    this.picture_alt = parsedPicture?.alt;
                    this.e2rContent = parsedE2R || [];
                    this.content = unescape(content) || '';
                    this.excerpt = excerpt;
                    this.content_type = default_type;
                    this.url = url.startsWith('/') ? url.substring(1) : url;
                    this.article_type = article_type;
                    this.published = !!published;
                    this.highlighted = !!highlighted;
                    this.has_other_content =
                        default_type === 'plain'
                            ? !!parsedE2R?.length
                            : !!content;
                }
                /* eslint-enable camelcase */
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
            this.$axios.get('users').then((res) => {
                this.users = res.data;
            });
        },
        loadMenuItems() {
            this.$axios.get('menu/items').then((res) => {
                this.menu_items = res.data;
            });
        },
        loadTags() {
            this.$axios.get('tags').then((res) => {
                this.autoTags = utils.uniquesInArray(
                    res.data
                        .map((i) => i.tags)
                        .join(',')
                        .split(','),
                );
            });
        },
        initE2R() {
            if (!Array.isArray(this.e2rContent) || !this.e2rContent.length) {
                this.e2rContent = [
                    {
                        pic: null,
                        text: '',
                    },
                ];
                this.startEditingE2R = true;
            }
        },
        uploadPicToText(event, insertImage, file) {
            utils.uploadFile(file[0]).then((res) => {
                insertImage({
                    url: res.file.filepath,
                    desc: 'alt-text',
                });
            });
        },
        uploadDocument(event) {
            if (event.target.files.length === 0) return;

            const promises = [];
            for (let i = 0; i < event.target.files.length; i++) {
                promises.push(utils.uploadFile(event.target.files[i]));
            }
            Promise.all(promises).then((res) => {
                this.last_uploads.push(...res.map((r) => r.file));
            });
        },
        copyFileUrl(index) {
            window.navigator.clipboard.writeText(
                this.last_uploads[index].filepath,
            );
        },
        updatePicture(file) {
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
            this.tag = '';
        },
        submitForm(event) {
            event.preventDefault();

            const contentE2r = this.e2rContent?.length ? this.e2rContent : null;
            const tags = this.tags?.length ? this.tags.join(',') : null;
            const menuParent = this.menu_parent ? +this.menu_parent : null;
            let url = utils.isEmptyStr(this.url) ? this.generatedUrl : this.url;

            if (!url.startsWith('/')) {
                url = `/${url}`;
            }

            const body = {
                default_type: this.content_type,
                title: this.title,
                url,
                author: this.author,
                article_type: this.article_type,
                tags,
                content_e2r: contentE2r,
                menu_parent: menuParent,
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
                        this.$router.push({ name: 'admin-posts' });
                    })
                    .catch(() => {
                        toast(
                            'Error submitting post, please contact the developer.',
                        );
                    });
            } else {
                this.$axios
                    .post('/post', body)
                    .then(() => {
                        this.$router.push({ name: 'admin-posts' });
                    })
                    .catch(() => {
                        toast(
                            'Error submitting post, please contact the developer.',
                        );
                    });
            }
        },
    },
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/variables.scss';

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
}
</style>
