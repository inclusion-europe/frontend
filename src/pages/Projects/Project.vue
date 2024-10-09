<template>
    <div class="post-content">
        <h3 class="section-title">{{ project.name }}</h3>
        <p>
            <VueMarkdown :source="project.content" :options="{ html: true }" />
        </p>
        <section class="section__low-spacing deinst_videos-section">
            <div class="videos-grid" v-if="project?.videos?.length">
                <iframe
                    v-for="(video, i) in project.videos"
                    :key="`video_${i}`"
                    width="640"
                    height="360"
                    :src="`https://www.youtube.com/embed/${video}`"
                >
                </iframe>
            </div>
        </section>
        <section
            class="section__low-spacing grid-section"
            v-if="project?.articles?.length"
        >
            <h4 class="section-title">Articles</h4>
            <div class="article_grid">
                <Preview
                    v-for="article in articles"
                    :key="`article_${article.idx}`"
                    :post="article"
                    blue
                />
            </div>
            <SeeAll :href="`/tag/${project.seeAll.tag}`" blue big>
                See all articles about {{ project.seeAll.linkCopy }}
            </SeeAll>
        </section>
        <section
            class="section__low-spacing grid-section"
            v-if="project?.publications?.length"
        >
            <h4 class="section-title">Publications</h4>
            <div class="article_grid">
                <Preview
                    v-for="article in publications"
                    :key="`article_${article.idx}`"
                    :post="article"
                    blue
                    noPicture
                />
            </div>
        </section>
    </div>
</template>
<script>
import VueMarkdown from 'vue-markdown-render';
import Preview from '@/elements/Preview.vue';
import SeeAll from '@/elements/SeeAll.vue';
import utils from '@/scripts/utils';

export default {
    name: 'ProjectComp',
    components: {
        Preview,
        SeeAll,
        VueMarkdown,
    },
    data: () => ({
        articles: [],
        publications: [],
    }),
    props: {
        project: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        if (this.project.articles?.length) {
            this.getArticles();
        }
        if (this.project.publications?.length) {
            this.getPublications();
        }
    },
    methods: {
        async getArticles() {
            const promises = this.project.articles.map((article) =>
                this.$axios.get(`/post/${article}`),
            );
            const returned = await Promise.all(promises).then((res) =>
                res.map((r) => [...r.data]),
            );
            this.articles = utils.treatPosts(returned.flat());
        },
        async getPublications() {
            const promises = this.project.publications.map((article) =>
                this.$axios.get(`/post/${article}`),
            );
            const returned = await Promise.all(promises).then((res) =>
                res.map((r) => [...r.data]),
            );
            this.publications = utils.treatPosts(returned.flat());
        },
    },
};
</script>
<style lang="scss" scoped>
.videos-grid {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    iframe {
        max-width: 100%;
    }

    @media screen and (min-width: 1024px) {
        flex-direction: row;
        justify-content: space-around;

        iframe {
            max-width: 48%;
        }
    }
}

.grid-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;

    .section-title {
        align-self: flex-start;
    }
}
</style>
