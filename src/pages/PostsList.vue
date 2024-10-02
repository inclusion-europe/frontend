<template>
    <div class="posts_page">
        <h1 class="page_title">
            {{ pageTitle }}
        </h1>
        <div class="posts_page-list">
            <Preview
                v-for="post in currentPagePosts"
                :key="`post_${post.idx}`"
                :post="post"
                stack
            />
        </div>
        <div class="posts_page-pagination" v-if="posts.length > pageLength">
            <PostsPagination
                :length="pagesAmount"
                :current-page="currentPage"
            />
        </div>
        <div class="posts_page-pagination" v-if="pagesAmount > 1">
            <span> Go to page:</span>
            <select @input="(e) => goToPage(+e.target.value)">
                <option disabled :value="null" selected />
                <option
                    v-for="(e, i) in new Array(pagesAmount)"
                    :value="i + 1"
                    :key="`jump_to_${i + 1}`"
                >
                    {{ i + 1 }}
                </option>
            </select>
        </div>
    </div>
</template>
<script>
import utils from '@/scripts/utils.js';
import Preview from '@/elements/Preview.vue';
import PostsPagination from '@/components/PostsPagination.vue';

export default {
    name: 'PostsList',
    components: {
        Preview,
        PostsPagination,
    },
    data: () => ({
        posts: [],
        currentPage: 1,
        pageLength: 9,
    }),
    computed: {
        pageTitle() {
            let pageTitle = (() => {
                switch (this.$route.name) {
                    case 'tag':
                        return `Posts tagged "${this.$route.params.tag}"`;
                    case 'type':
                        return this.typeTitle;
                    default:
                        return 'Posts';
                }
            })();

            if (this.pagesAmount > 1) {
                pageTitle += ` - Page ${this.currentPage}`;
            }

            return pageTitle;
        },
        typeTitle() {
            switch (this.$route.params.type) {
                case 'articles':
                    return 'Articles';
                case 'e2r':
                    return 'Easy-to-Read articles';
                case 'event':
                    return 'Events';
                case 'report':
                    return 'Reports';
                case 'podcast':
                    return 'Podcasts';
                default:
                    return 'Posts';
            }
        },
        currentPagePosts() {
            return this.posts.slice(
                (this.currentPage - 1) * this.pageLength,
                this.currentPage * this.pageLength,
            );
        },
        pagesAmount() {
            return Math.ceil(this.posts.length / this.pageLength);
        },
        getterRoute() {
            let { type } = this.$route.params;

            if (type === 'e2r') return '/posts/e2r';

            switch (type) {
                case 'articles':
                    type = 'news,blogpost';
                    break;
                case 'publications':
                    type = 'report';
                    break;
                default:
                    break;
            }

            return `/posts/type/${type}`;
        },
    },
    mounted() {
        switch (this.$route.name) {
            case 'tag':
                this.loadPostsByTag();
                break;
            case 'type':
            default:
                this.loadPostsByType();
                break;
        }
        if (this.$route.params.pageNr) {
            this.currentPage = +this.$route.params.pageNr;
        }
    },
    watch: {
        pageTitle(val) {
            document.title = `${val} | ${process.env.VUE_APP_DEFAULT_TITLE}`;
        },
    },
    methods: {
        loadPostsByTag() {
            const { tag } = this.$route.params;

            this.$axios.get(`/posts/tag/${tag}`).then((res) => {
                this.posts = utils.treatPosts(res.data);
            });
        },
        loadPostsByType() {
            this.$axios.get(this.getterRoute).then((res) => {
                this.posts = utils.treatPosts(res.data);

                if (this.currentPage > this.pagesAmount || !this.currentPage) {
                    this.$router.replace({
                        params: { ...this.$route.params, pageNr: 1 },
                    });
                }
            });
        },
        goToPage(pageNr) {
            this.$router.replace({
                params: {
                    ...this.$route.params,
                    pageNr,
                },
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.posts_page {
    width: var(--width);
    max-width: var(--max-width);
    margin: auto;
    padding-bottom: 30px;

    .page_title {
        color: #1e1e1e;
        font-size: 40px;
        font-family: GilroyBold;
    }

    .posts_page-list {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .posts_page-pagination {
        margin-top: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: 0.4rem;
    }
}
@media screen and (min-width: 1024px) {
    .posts_page {
        .posts_page-list {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 44px 32px;
            align-items: start;
            justify-items: start;
        }
    }
}
</style>
