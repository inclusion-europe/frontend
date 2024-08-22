<template>
    <section class="videos-section">
        <h2 class="section-title section-title--pink">Videos</h2>
        <div class="videos-section-video_grid">
            <Preview
                v-for="(video, i) in videos"
                :key="`videos_article_${i}`"
                :post="video"
                video
            />
            <SeeAll href="#" big> See all videos </SeeAll>
        </div>
    </section>
</template>
<script>
import Preview from '@/elements/Preview.vue';
import SeeAll from '@/elements/SeeAll.vue';

export default {
    name: 'VideosSection',
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
.videos-section {
    &-video_grid {
        gap: 40px 135px;
    }
}
</style>
<style lang="scss">
.videos-section {
    .see_all {
        grid-column: 2;
    }
}
</style>
