<template>
    <div class="posts_page-pagination-numbers">
        <span>Page:</span>
        <router-link
            v-if="currentPage > 1"
            :to="{
                params: {
                    ...$route.params,
                    pageNr: currentPage - 1,
                },
            }"
            class="posts_page-pagination-item"
        >
            Previous
        </router-link>
        <template v-if="length < 15">
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
        </template>
        <!-- Abbreviated list with ellipses -->
        <template v-else>
            <!-- First 3 -->
            <router-link
                v-for="(e, i) in new Array(3)"
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

            <!-- Active between first and middle 3 -->
            <span v-if="currentPage - 3 > 2"> ... </span>
            <template v-if="between(currentPage, 3, Math.ceil(length / 2) - 1)">
                <router-link
                    v-for="(e, i) in new Array(3)"
                    v-show="showExtraPage(currentPage - (1 - i))"
                    :key="`page_button_${currentPage - (1 - i)}`"
                    :to="{
                        params: {
                            ...$route.params,
                            pageNr: currentPage - (1 - i),
                        },
                    }"
                    class="posts_page-pagination-item"
                    active-class="posts_page-pagination-item--active"
                >
                    {{ currentPage - (1 - i) }}
                </router-link>
            </template>

            <!-- Middle 3 -->
            <span
                v-if="
                    Math.abs(currentPage - (Math.ceil(length / 2) - 1)) > 1 &&
                    currentPage - 3 <= 2
                "
            >
                ...
            </span>
            <router-link
                v-for="(e, i) in new Array(3)"
                :key="`page_button_${Math.ceil(length / 2) - (1 - i)}`"
                :to="{
                    params: {
                        ...$route.params,
                        pageNr: Math.ceil(length / 2) - (1 - i),
                    },
                }"
                class="posts_page-pagination-item"
                active-class="posts_page-pagination-item--active"
            >
                {{ Math.ceil(length / 2) - (1 - i) }}
            </router-link>

            <!-- Active between middle and last 3 -->
            <span
                v-if="
                    Math.abs(currentPage - (Math.ceil(length / 2) + 1)) > 1 &&
                    length - 2 - currentPage <= 2
                "
            >
                ...
            </span>
            <template
                v-if="
                    between(currentPage, Math.ceil(length / 2) + 1, length - 2)
                "
            >
                <router-link
                    v-for="(e, i) in new Array(3)"
                    v-show="showExtraPage(currentPage - (1 - i))"
                    :key="`page_button_${currentPage - (1 - i)}`"
                    :to="{
                        params: {
                            ...$route.params,
                            pageNr: currentPage - (1 - i),
                        },
                    }"
                    class="posts_page-pagination-item"
                    active-class="posts_page-pagination-item--active"
                >
                    {{ currentPage - (1 - i) }}
                </router-link>
            </template>
            <!-- Last 3 -->
            <span v-if="length - 2 - currentPage > 2"> ... </span>
            <router-link
                v-for="(e, i) in new Array(3)"
                :key="`page_button_${length - (2 - i)}`"
                :to="{
                    params: {
                        ...$route.params,
                        pageNr: length - (2 - i),
                    },
                }"
                class="posts_page-pagination-item"
                active-class="posts_page-pagination-item--active"
            >
                {{ length - (2 - i) }}
            </router-link>
        </template>
        <router-link
            v-if="currentPage < length"
            :to="{
                params: {
                    ...$route.params,
                    pageNr: currentPage + 1,
                },
            }"
            class="posts_page-pagination-item"
        >
            Next
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
        currentPage: {
            type: Number,
            required: true,
        },
    },
    methods: {
        between(x, min, max) {
            return x >= min && x <= max;
        },
        showExtraPage(pageNr) {
            if (pageNr <= 3) return false;
            if (pageNr >= this.length - 2) return false;

            const betweenMin = Math.ceil(this.length / 2) - 1;
            const betweenMax = Math.ceil(this.length / 2) + 1;

            if (this.between(pageNr, betweenMin, betweenMax)) return false;

            return true;
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
