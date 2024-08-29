<template>
    <section class="easy_to_read-section">
        <h2 class="section-title section-title--blue">Easy-to-read</h2>
        <div class="easy_to_read-section-post_grid">
            <Preview :post="posts[0]" big blue />
            <div class="easy_to_read-section-post_grid-list">
                <Preview
                    v-for="(post, i) in posts.slice(1, 5)"
                    :key="`e2r_post_${i}`"
                    :post="post"
                    no-picture
                    blue
                />
                <SeeAll v-if="posts.length > 6" href="/type/e2r" blue big>
                    See all easy-to-read articles
                </SeeAll>
            </div>
        </div>
    </section>
</template>
<script>
import Preview from '@/elements/Preview.vue';
import SeeAll from '@/elements/SeeAll.vue';

export default {
    name: 'E2R',
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
.easy_to_read-section {
    &-see_all {
        display: flex;
        align-items: flex-end;
        gap: 5px;
        text-decoration: none;
        width: fit-content;

        * {
            transition: all 0.2s ease-out;
        }

        span {
            color: var(--ie-blue);
            font-family: GilroySemiBold;
            font-size: 20px;
            font-weight: 600;
            line-height: 12px;
        }

        svg {
            height: 10px;
            fill: var(--ie-blue);
        }

        &:hover,
        &:focus {
            text-decoration: underline;

            * {
                color: var(--ie-pink);
                fill: var(--ie-pink);
            }
        }
    }
}
</style>
