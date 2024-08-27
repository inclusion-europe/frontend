<template>
    <div class="posts_page">
        <h1 class="page_title">
            {{ pageTitle }}
        </h1>
        <div class="posts_page-list">
            <Preview
                v-for="post in posts"
                :key="`post_${post.idx}`"
                :post="post"
                stack
            />
        </div>
    </div>
</template>
<script>
import Preview from '@/elements/Preview.vue';

export default {
    name: 'PostsList',
    components: {
        Preview,
    },
    data: () => ({
        posts: [],
    }),
    computed: {
        pageTitle() {
            switch (this.$route.name) {
                case 'tag':
                    return `Posts tagged "${this.$route.params.tag}"`;
                case 'type':
                    return this.typeTitle;
                default:
                    return 'Posts';
            }
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
        document.title = `${this.pageTitle} | ${process.env.VUE_APP_DEFAULT_TITLE}`;
    },
    methods: {
        treatData(posts) {
            return posts.map((post) => {
                const toReturn = post;
                toReturn.picture = JSON.parse(post.picture);
                return toReturn;
            });
        },
        loadPostsByTag() {
            const { tag } = this.$route.params;

            this.$axios.get(`/posts/tag/${tag}`).then((res) => {
                this.posts = this.treatData(res.data);
            });
        },
        loadPostsByType() {
            let { type } = this.$route.params;
            if (type === 'e2r') type = 'e2r_article';
            if (type === 'articles') type = 'news,blogpost';
            if (type === 'publications') type = 'report';

            this.$axios.get(`/posts/type/${type}`).then((res) => {
                this.posts = this.treatData(res.data);
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
