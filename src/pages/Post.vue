<template>
    <div class="post_page" :class="{ indicators_page: isIndicatorsPage }">
        <div v-if="loading" class="loading">
            <img src="/loading.gif" />
        </div>
        <template v-else>
            <div class="post_page-header">
                <IeButton
                    v-if="hasOtherContent"
                    blue
                    boxed
                    class="other_content-button"
                    :class="{ 'e2r-button': !shfowE2R }"
                    :e2r="!showE2R"
                    @click="toggleContentType"
                >
                    <img v-if="!showE2R" src="@/assets/e2r.png" />
                    {{ showE2R ? 'Plain English' : 'Easy-to-Read' }} version
                </IeButton>
            </div>
            <article>
                <header
                    :class="{ 'header--column': !post.excerpt || isStaticPage }"
                >
                    <div class="header_texts">
                        <h1>
                            {{ post.title }}
                        </h1>
                        <img
                            v-if="post.picture?.picture && isStaticPage"
                            :src="post.picture.picture"
                            :alt="
                                post.picture.alt || `Picture for ${post.title}`
                            "
                        />
                        <h2 v-if="post.excerpt">
                            {{ post.excerpt }}
                        </h2>
                    </div>
                    <img
                        v-if="post.picture?.picture && !isStaticPage"
                        :src="post.picture.picture"
                        :alt="
                            post.picture.picture || `Picture for ${post.title}`
                        "
                    />
                </header>
                <section class="post-content">
                    <e-2-r-content v-if="showE2R" :content="post.content_e2r" />
                    <vue-markdown
                        :source="post.content"
                        :options="{ html: true }"
                        v-else
                    />
                </section>
                <section v-if="isIndicatorsPage" class="indicators-table">
                    <h4>Country ranking</h4>
                    <inclusion-indicators-countries />
                </section>
                <section v-if="post.tags" class="post-tags">
                    <h3>
                        Tags:
                        <router-link
                            v-for="tag in post.tags"
                            :key="`tag_${tag}`"
                            :to="`/tag/${encodeURI(tag)}`"
                            class="tag"
                        >
                            {{ tag }}
                        </router-link>
                        <span
                            v-for="(_, i) in Array(post.tags.length - 1)"
                            :key="`tagsep_${i}`"
                        >
                            ,
                        </span>
                    </h3>
                </section>
            </article>
        </template>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import VueMarkdown from 'vue-markdown-render';
import InclusionIndicatorsCountries from './InclusionIndicators/Countries.vue';
import E2RContent from '@/elements/E2RContent.vue';
import IeButton from '@/elements/Button.vue';

export default {
    name: 'PostPage',
    components: {
        VueMarkdown,
        InclusionIndicatorsCountries,
        E2RContent,
        IeButton,
    },
    data: () => ({
        post: {
            title: 'Test',
        },
        showE2R: false,
        loading: true,
    }),
    computed: {
        ...mapGetters(['getPosts']),
        isIndicatorsPage() {
            return this.$route.path === '/indicators';
        },
        isStaticPage() {
            return this.post.article_type === 'static_page';
        },
        hasOtherContent() {
            if (this.post.default_type === 'e2r') {
                return !!this.post.content;
            }

            return !!this.post.content_e2r;
        },
    },
    watch: {
        showE2R(val) {
            if (val) {
                this.$router.replace({
                    query: {
                        e2r: 1,
                    },
                });
            } else {
                this.$router.replace({
                    query: {},
                });
            }
        },
    },
    mounted() {
        while (!this.getPosts.length) {
            this.loading = true;
        }
        const posts = this.getPosts;
        const post = posts.find(
            (art) =>
                art.url.toLowerCase() ===
                `/${encodeURIComponent(this.$route.params.post).toLowerCase()}`,
        );
        if (post) {
            post.content = unescape(post.content);
            post.content_e2r =
                typeof post.content_e2r === 'string'
                    ? JSON.parse(post.content_e2r)
                    : post.content_e2r;
            post.tags =
                typeof post.tags === 'string'
                    ? post.tags.split(',')
                    : post.tags;
            this.post = post;
            document.title = `${post.title} | ${process.env.VUE_APP_DEFAULT_TITLE}`;
            const shouldShowE2R = this.$route.query.e2r && post.content_e2r;
            if (post.default_type === 'e2r' || shouldShowE2R) {
                this.showE2R = true;
            }
            this.loading = false;
        } else {
            this.$router.push('/');
        }
    },
    methods: {
        ...mapActions(['loadPosts']),
        toggleContentType() {
            this.showE2R = !this.showE2R;
        },
    },
};
</script>
<style lang="scss" scoped>
.loading {
    display: flex;
    min-height: calc(100vh - 400px);
    align-items: center;
    justify-content: center;

    img {
        width: 60%;
    }
}
</style>
