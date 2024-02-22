<template>
    <div class="navbar-element" tabindex="0">
        <slot />
        <div class="navbar-element-dropdown">
            <router-link
                tabindex="0"
                v-for="page in pages"
                :key="page.idx"
                class="navbar-element"
                :to="`${page.url}`"
                @click="(e) => e.target.blur()"
            >
                {{ page.title }}
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NavDropdown',
    props: {
        pages: {
            type: Array,
            default: () => [],
        },
    },
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/variables.scss';

.navbar-element {
    &-dropdown {
        display: none;
    }

    &:hover,
    &:focus,
    &:focus-within {
        color: var(--ie-blue) !important;

        .navbar-element-dropdown {
            z-index: 99999;
            position: absolute;
            left: 0;
            top: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            background: white;
            width: auto;
            padding: 12px;
            border-radius: 4px;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06),
                0 3px 6px rgba(0, 0, 0, 0.09);

            .navbar-element {
                &:hover,
                &:focus {
                    color: var(--ie-blue) !important;
                }
            }
        }
    }
}
</style>
