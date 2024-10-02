<template>
    <div class="post-content">
        <h2>Deinstitutionalisation</h2>
        <p>
            Inclusion Europe reported on issues linked to institutionalisation
            of people with intellectual disabilities and raised awareness of
            solutions for more humane, person- centred and individualised
            support.
        </p>
        <section class="section__low-spacing deinst_videos-section">
            <div class="videos-grid">
                <iframe
                    width="640"
                    height="360"
                    src="https://www.youtube.com/embed/DjVy3lenHOc"
                >
                </iframe>
                <iframe
                    width="640"
                    height="360"
                    src="https://www.youtube.com/embed/JI5wzJICbmA"
                >
                </iframe>
            </div>
        </section>
        <section class="section__low-spacing segreg_posts-section">
            <div class="article_grid">
                <Preview
                    v-for="(article, i) in segregArticles.slice(0, 2)"
                    :key="`segreg_article_${i}`"
                    :post="article"
                    blue
                />
            </div>
            <SeeAll
                href="/type/articles"
                blue
                v-if="segregArticles.length > 2"
                big
            >
                See all articles
            </SeeAll>
        </section>
        <p>
            Inclusion Europe advocated for inclusive policies and practices that
            foster community integration for people with intellectual
            disabilities. This includes advocating for the closure of
            institutions and the transition to community-based support.
        </p>
        <section class="section__low-spacing indep_posts-section">
            <div class="article_grid">
                <Preview
                    v-for="(article, i) in indepArticles.slice(0, 3)"
                    :key="`indep_article_${i}`"
                    :post="article"
                    blue
                />
            </div>
            <SeeAll
                href="/type/articles"
                blue
                v-if="indepArticles.length > 3"
                big
            >
                See all articles about independent living
            </SeeAll>
        </section>
        <section class="section__low-spacing projects-section">
            <h3>Projects</h3>
            <div class="projects_grid">
                <IeButton type="link" href="/projects/together-plus" boxed blue>
                    Together +
                </IeButton>
            </div>
        </section>
        <section class="secion__low-spacing publications-section">
            <h3>Publications</h3>
            <div>
                <Preview
                    v-for="(article, i) in publications.slice(0, 3)"
                    :key="`publication_${i}`"
                    :post="article"
                    no-picture
                    blue
                />
                <SeeAll
                    href="/type/articles"
                    blue
                    v-if="publications.length > 3"
                    big
                >
                    See all publications
                </SeeAll>
            </div>
        </section>
    </div>
</template>
<script>
import utils from '@/scripts/utils.js';
import Preview from '@/elements/Preview.vue';
import SeeAll from '@/elements/SeeAll.vue';
import IeButton from '@/elements/Button.vue';

export default {
    name: 'DeinstitProject',
    components: {
        Preview,
        SeeAll,
        IeButton,
    },
    data: () => ({
        segregArticles: [],
        indepArticles: [],
        publications: [],
    }),
    mounted() {
        this.loadSegregPosts();
        this.loadIndepPosts();
        this.loadPublications();
    },
    methods: {
        loadSegregPosts() {
            this.$axios
                .get(
                    '/posts/tag/deinstitutionalisation|segregation?ignore=report,publication',
                )
                .then((res) => {
                    this.segregArticles = utils.treatPosts(res.data);
                });
        },
        loadIndepPosts() {
            this.$axios
                .get('/posts/tag/independent?ignore=report,publication')
                .then((res) => {
                    this.indepArticles = utils.treatPosts(res.data);
                });
        },
        loadPublications() {
            this.$axios
                .get(
                    '/publications/tag/deinstitutionalisation|segregation|independent',
                )
                .then((res) => {
                    this.publications = utils.treatPosts(res.data);
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.videos-grid {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;

    iframe {
        max-width: 48%;
    }
}
</style>
