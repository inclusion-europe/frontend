<template>
    <div class="posts">
        <h1 class="section-title">
            <span>{{ isInArchive ? 'Archive' : 'Posts' }}</span>
            <template v-if="!isInArchive">
                <IeButton boxed pink @click="newPost"> Add a post </IeButton>
                <IeButton v-if="!isInArchive" @click="showArchives">
                    Archives
                </IeButton>
            </template>
            <IeButton boxed @click="hideArchives" v-else>
                Back to Posts
            </IeButton>
        </h1>
        <div class="posts-table">
            <div class="header">Title</div>
            <div class="header">Author</div>
            <div class="header">Created</div>
            <div class="header">Last modified</div>
            <div class="header">Published?</div>
            <div class="header" />
            <div
                class="row-wrapper"
                v-for="post in posts"
                :key="`post_${post.idx}`"
            >
                <div class="post-title">
                    {{ post.title }}
                </div>
                <div class="post-author">
                    <template v-if="post.author">
                        {{ post.author.first_name }} {{ post.author.last_name }}
                    </template>
                    <template v-else> - </template>
                </div>
                <div class="post-date">
                    {{ new Date(post.created_at).toLocaleString() }}
                </div>
                <div class="post-date">
                    {{
                        post.modified_at !== post.created_at
                            ? new Date(post.modified_at).toLocaleString()
                            : '-'
                    }}
                </div>
                <div class="post-published">
                    {{ post.published ? '✅' : '❌' }}
                </div>
                <div class="post-actions">
                    <template v-if="!isInArchive">
                        <IeButton small boxed blue @click="editPost(post.idx)">
                            Edit
                        </IeButton>
                        <IeButton
                            small
                            boxed
                            pink
                            @click="archivePost(post.idx)"
                        >
                            Archive
                        </IeButton>
                    </template>
                    <IeButton
                        small
                        boxed
                        blue
                        @click="restorePost(post.idx)"
                        v-else
                    >
                        Restore
                    </IeButton>
                    <IeButton small boxed @click="deletePost(post.idx)">
                        Delete
                    </IeButton>
                </div>
            </div>
        </div>
        <Modal
            title="Confirm Delete"
            :active="isDeleting > -1"
            @close="closeDeleteModal"
        >
            <div class="confirm_modal">
                Are you sure you want to delete this post?
                <div class="confirm_modal-actions">
                    <IeButton small boxed pink @click="confirmDelete">
                        Yes
                    </IeButton>
                    <IeButton small boxed @click="closeDeleteModal">
                        Cancel
                    </IeButton>
                </div>
            </div>
        </Modal>

        <Modal
            title="Modal"
            :active="isArchiving > -1"
            @close="closeArchiveModal"
        >
            <div class="confirm_modal">
                Are you sure you want to archive this post?
                <div class="confirm_modal-actions">
                    <IeButton small boxed pink @click="confirmArchive">
                        Yes
                    </IeButton>
                    <IeButton small boxed @click="closeArchiveModal">
                        Cancel
                    </IeButton>
                </div>
            </div>
        </Modal>

        <Modal
            title="Modal"
            :active="isRestoring > -1"
            @close="closeRestoreModal"
        >
            <div class="confirm_modal">
                Are you sure you want to restore this post?
                <div class="confirm_modal-actions">
                    <IeButton small boxed blue @click="confirmRestore">
                        Yes
                    </IeButton>
                    <IeButton small boxed @click="closeRestoreModal">
                        Cancel
                    </IeButton>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
import IeButton from '@/elements/Button.vue';
import Modal from '@/components/Modal.vue';

export default {
    name: 'AdminPosts',
    components: {
        IeButton,
        Modal,
    },
    data: () => ({
        posts: [],
        users: [],
        isDeleting: -1,
        isArchiving: -1,
        isRestoring: -1,
        isInArchive: false,
    }),
    watch: {
        isInArchive() {
            this.loadPosts();
        },
    },
    mounted() {
        this.loadUsers().then(() => {
            this.loadPosts();
        });
    },
    methods: {
        loadUsers() {
            return this.$axios.get('users').then((res) => {
                this.users = res.data;
            });
        },
        loadPosts() {
            let route = 'posts';
            if (this.isInArchive) route += '/archive';
            else route += '/all';
            this.$axios.get(route).then((res) => {
                const posts = res.data;
                posts.forEach((a) => {
                    Object.assign(a, { author: this.findAuthor(a.author) });
                });
                this.posts = posts;
            });
        },
        showArchives() {
            this.isInArchive = true;
        },
        hideArchives() {
            this.isInArchive = false;
        },
        findAuthor(email) {
            return this.users.find((u) => u.email === email);
        },
        editPost(postId) {
            this.$router.push({
                name: 'admin-post_edit',
                query: {
                    postId,
                },
            });
        },
        deletePost(postId) {
            this.isDeleting = postId;
        },
        confirmDelete() {
            this.$axios.delete(`post/${this.isDeleting}`).then(() => {
                this.closeDeleteModal();
                this.loadPosts();
            });
        },
        closeDeleteModal() {
            this.isDeleting = -1;
        },
        archivePost(postId) {
            this.isArchiving = postId;
        },
        confirmArchive() {
            this.$axios.patch(`archive/${this.isArchiving}`).then(() => {
                this.closeArchiveModal();
                this.loadPosts();
            });
        },
        closeArchiveModal() {
            this.isArchiving = -1;
        },
        restorePost(postId) {
            this.isRestoring = postId;
        },
        confirmRestore() {
            this.$axios.patch(`restore/${this.isRestoring}`).then(() => {
                this.closeRestoreModal();
                this.loadPosts();
            });
        },
        closeRestoreModal() {
            this.isRestoring = -1;
        },
        newPost() {
            this.$router.push({
                name: 'admin-post_edit',
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/variables.scss';
.posts {
    .section-title {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    &-table {
        display: grid;
        grid-template-columns: repeat(6, auto);
        background: var(--black);
        gap: 1px;
        border-radius: 4px;
        border: 1px solid var(--black);
        overflow: hidden;
        width: fit-content;

        .header {
            font-family: GilroyBold;
            font-size: 22px;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--ie-blue);
            color: white;
        }

        .row-wrapper {
            display: contents;

            & > div {
                padding: 4px 12px;
                background: white;
                display: flex;
                align-items: center;
                justify-content: flex-start;
            }

            &:hover,
            &:focus-within {
                & > div {
                    background: var(--ie-blue--light);
                }
            }
        }

        .post {
            &-title,
            &-author {
                font-size: 20px;
            }

            &-published {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            &-actions {
                gap: 4px;
            }
        }
    }
}

.confirm_modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;

    &-actions {
        display: flex;
        gap: 12px;
    }
}
</style>
