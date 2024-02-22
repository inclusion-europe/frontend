<template>
    <section class="articles-section">
        <h2 class="section-title section-title--blue">Recent articles</h2>
        <div class="articles-section-article_grid">
            <Preview :post="posts[0]" big blue />
            <div class="articles-section-article_grid-list">
                <Preview
                    v-for="(article, i) in posts.slice(1, 5)"
                    :key="`articles_article_${i}`"
                    :post="article"
                    no-picture
                    blue
                />
                <SeeAll href="/type/articles" blue v-if="posts.length > 5" big>
                    > See all articles
                </SeeAll>
            </div>
        </div>
    </section>
</template>
<script>
import Preview from '@/elements/Preview.vue';
import SeeAll from '@/elements/SeeAll.vue';

export default {
    name: 'ArticlesSection',
    components: {
        Preview,
        SeeAll,
    },
    props: {
        posts: {
            type: Array,
            default: () => [],
        },
    },
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/variables.scss';
.articles-section {
    width: var(--width);
    max-width: var(--max-width);
    margin: auto;
    margin-bottom: 130px;

    .section-title {
        text-align: center;
        margin: 37px auto;
        width: auto;
    }

    &-article_grid {
        display: grid;
        grid-template: auto / 1fr 1fr;
        gap: 150px 135px;
        align-items: start;

        &-list {
            margin-left: 30px;
            display: flex;
            flex-direction: column;
            gap: 40px;
        }
    }
}
</style>
