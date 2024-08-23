<template>
    <nav class="navbar">
        <router-link class="navbar-element" to="/" tabindex="0">
            Home
        </router-link>
        <nav-dropdown
            v-for="item in menu"
            :key="`menu_item_${item.id}`"
            :pages="item.pages"
        >
            {{ item.name }}
        </nav-dropdown>
    </nav>
</template>
<script>
import NavDropdown from './NavDropdown.vue';

export default {
    name: 'WebsiteNavigation',
    components: { NavDropdown },
    data: () => ({
        menu: [],
    }),
    mounted() {
        this.$axios.get('menu/full').then((res) => {
            const menu = res.data.sort((a, b) => a.position - b.position);
            menu.forEach((item) => {
                switch (item.id) {
                    case 1:
                        item.pages.push({
                            idx: 99,
                            menu_position: 99,
                            title: 'History',
                            url: '/history',
                        });
                        break;
                    case 2:
                        item.pages.push({
                            idx: 99,
                            menu_position: 99,
                            title: 'Articles',
                            url: '/type/articles',
                        });
                        break;
                    case 5:
                        item.pages.push({
                            idx: 99,
                            menu_position: 99,
                            title: 'Easy-To-Read Articles',
                            url: '/type/e2r',
                        });
                        break;
                    default:
                }
            });
            this.menu = res.data;
        });
    },
};
</script>
<style lang="scss" scoped>
.navbar {
    display: none;
}

@media screen and (min-width: 1024px) {
    .navbar {
        display: flex;
        gap: 28px;

        &:deep(.navbar-element) {
            font-family: GilroySemiBold;
            color: var(--black);
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            cursor: pointer;
            position: relative;
            overflow: visible;
            padding-bottom: 6px;
            white-space: nowrap;
            text-decoration: none;

            &:hover,
            &:focus {
                color: var(--ie-blue) !important;
            }
        }
    }
}
</style>
