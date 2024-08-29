<template>
    <div class="posts_page-pagination-numbers">
        <router-link
            v-for="(e, i) in new Array(length)"
            :key="`page_button_${i + 1}`"
            :to="{
                params: {
                    ...$route.params,
                    pageNr: i + 1,
                },
            }"
            class="posts_page-pagination-item"
            active-class="posts_page-pagination-item--active"
        >
            {{ i + 1 }}
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'PostsPagination',
    props: {
        length: {
            type: Number,
            required: true,
        },
    },
};
</script>
<style lang="scss" scoped>
.posts_page-pagination {
    &-numbers {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.4rem;
    }

    &-item {
        &--active {
            color: var(--ie-blue);
            text-decoration: none;
        }
    }
}
</style>
