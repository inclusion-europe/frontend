<template>
    <a
        :class="`see_all${
            blue ? ' see_all--blue' : pink ? ' see_all--pink' : ''
        }${big ? ' see_all--big' : ''}`"
        :href="href"
    >
        <span><slot /></span>
        <Arrow :blue="blue" :pink="pink" />
    </a>
</template>
<script>
import Arrow from './Arrow.vue';

export default {
    name: 'SeeAll',
    components: {
        Arrow,
    },
    props: {
        big: {
            type: Boolean,
            default: false,
        },
        pink: {
            type: Boolean,
            default: true,
        },
        blue: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
<style lang="scss" scoped>
.see_all {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    text-decoration: none;
    width: fit-content;
    transition: all 0.2s ease-out;

    * {
        transition: all 0.2s ease-out;
    }

    span {
        color: var(--ie-pink);
        font-family: GilroySemiBold;
        font-size: 14px;
        font-weight: 600;
        line-height: 12px;
    }

    svg {
        height: 8px;
        fill: var(--ie-pink);
    }

    &:hover,
    &:focus {
        span {
            color: var(--ie-pink) !important;
            text-decoration: none !important;
        }

        svg {
            fill: var(--ie-pink) !important;
        }
    }

    &--blue {
        span {
            color: var(--ie-blue) !important;
        }

        svg {
            fill: var(--ie-blue) !important;
        }
    }

    @media screen and (min-width: 1024px) {
        &--big {
            gap: 5px;

            &:hover {
                span {
                    text-decoration: underline;
                }
            }

            span {
                font-size: 20px;
            }

            svg {
                position: relative;
                top: 2px;
                height: 12px;
            }
        }
    }
}
</style>
