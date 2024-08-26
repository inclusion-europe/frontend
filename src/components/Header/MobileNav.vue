<template>
    <div class="mobile-nav">
        <input
            class="menu-btn"
            type="checkbox"
            id="menu-btn"
            v-model="menuOpen"
        />
        <label class="menu-icon" for="menu-btn">
            <span class="navicon"></span>
        </label>
        <div class="menu">
            <router-link to="/" class="navbar-element" @click="goHome">
                <img
                    src="@/assets/logo.svg"
                    class="mobile-nav-logo"
                    alt="Inclusion Europe logo"
                />
            </router-link>
            <div class="menu-content" :class="{ hidden: shownDropdown !== -1 }">
                <router-link class="navbar-element" to="/" @click="goHome">
                    <div class="mobile-navitem">
                        <span> Home </span>
                    </div>
                </router-link>
                <a
                    class="navbar-element"
                    @click="toggleDropdown(item.id)"
                    v-for="item in menuItems"
                    :key="`menu_item_${item.id}`"
                >
                    <div class="mobile-navitem">
                        <span> {{ item.name }} </span>
                        <img
                            src="@/assets/chevron.svg"
                            class="chevron"
                            :alt="`Toggle '${itemName}' submenu`"
                        />
                    </div>
                </a>
            </div>
            <nav-dropdown
                v-for="item in menuItems"
                :key="`menu_item_${item.id}_dropdown`"
                :pages="item.pages"
                :is-dropdown-shown="shownDropdown == item.id"
                :item-name="item.name"
                @showMainMenu="toggleDropdown(item.id)"
            />
        </div>
    </div>
</template>
<script>
import NavDropdown from './MobileNavDropdown.vue';

export default {
    name: 'MobileNav',
    components: {
        NavDropdown,
    },
    data: () => ({
        menuOpen: false,
        shownDropdown: -1,
    }),
    props: {
        menuItems: {
            type: Array,
            required: true,
        },
    },
    watch: {
        $route() {
            this.menuOpen = false;
            this.shownDropdown = -1;
        },
        menuOpen(val) {
            if (!val) {
                this.shownDropdown = -1;
            }
        },
    },
    methods: {
        goHome() {
            this.$router.push('/');
            this.menuOpen = false;
            this.shownDropdown = -1;
        },
        toggleDropdown(id) {
            if (this.shownDropdown === id) this.shownDropdown = -1;
            else this.shownDropdown = id;
        },
    },
};
</script>
<style lang="scss" scoped>
$interlines: 8px;

.mobile-nav {
    &-logo {
        height: 55px;
        position: relative;
        top: 23px;
        left: var(--left-limit);
    }

    .menu-icon {
        cursor: pointer;
        display: inline-block;
        padding: 28px 20px;
        position: relative;
        right: -15px;
        user-select: none;

        .navicon {
            height: 4px;
            width: 25px;
            border-radius: 4px;
            background: var(--dark-grey);
            display: block;
            position: relative;
            transition: background 0.2s ease-out;
            z-index: 9999;

            &:before,
            &:after {
                content: '';
                height: 100%;
                width: 100%;
                border-radius: 4px;
                background: var(--dark-grey);
                display: block;
                position: absolute;
                transition: all 0.2s ease-out;
            }

            &:before {
                top: $interlines;
            }

            &:after {
                top: -($interlines);
            }
        }
    }

    /* menu btn */

    .menu-btn {
        display: none;

        &:checked ~ .menu {
            clip-path: circle(200% at 100% 0);
        }

        &:checked ~ .menu-icon .navicon {
            background: transparent;
        }

        &:checked ~ .menu-icon .navicon:before {
            transform: rotate(-45deg);
        }

        &:checked ~ .menu-icon .navicon:after {
            transform: rotate(45deg);
        }

        &:checked ~ .menu-icon:not(.steps) .navicon:before,
        &:checked ~ .menu-icon:not(.steps) .navicon:after {
            top: 0;
        }
    }

    /* menu */

    .menu {
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #fff;
        transition: clip-path 0.4s ease-out;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        height: 100vh;
        clip-path: circle(0% at 100% 0);

        &-content {
            width: var(--max-width);
            margin: auto;
            padding: 15px 0;
            display: flex;
            flex-direction: column;
            position: absolute;
            transition: left 0.2s ease-out;
            left: var(--left-limit);

            &.hidden {
                left: -125vw;
            }
        }
    }
    &:deep(.navbar-element) {
        font-family: GilroySemiBold;
        color: var(--black);
        font-size: 25px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        cursor: pointer;
        overflow: visible;
        padding-bottom: 6px;
        white-space: wrap;
        width: auto;
        text-decoration: none;
        width: fit-content;

        &:hover,
        &:focus {
            color: var(--ie-blue) !important;
        }

        .mobile-navitem {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: var(--max-width);

            .chevron {
                height: 1rem;
                transform-origin: center center;
                transform: rotate(-90deg);
            }
        }
    }
}
</style>
