<template>
    <section class="hero-highlights">
        <Preview
            v-for="(post, i) in posts"
            :key="`highlight_post_${i}`"
            :post="post"
        />
    </section>
</template>
<script>
import Preview from '@/elements/Preview.vue';

export default {
    name: 'HeroHighlights',
    components: {
        Preview,
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
.hero-highlights {
    display: flex;
    flex-direction: column;
    gap: 50px;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    width: auto;
}
</style>
