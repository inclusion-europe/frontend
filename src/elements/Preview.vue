<template>
    <router-link
        class="preview"
        :class="{
            'preview--full': full,
            'preview--big': big,
            'preview--stack': stack,
            'preview--blue': blue,
            'preview--pink': pink,
            'preview--has_picture': !overtakeNoPicture,
        }"
        :to="`${post.url}`"
    >
        <h3 v-if="big || full" class="preview-title">
            {{ post.title }}
        </h3>
        <div
            class="preview-picture"
            v-if="!overtakeNoPicture && post.picture?.picture"
        >
            <img
                class="preview-picture-photo"
                :src="post.picture.picture"
                :alt="post.picture.alt || `Picture for ${post.title}`"
            />
            <img
                class="preview-picture-video"
                v-if="video"
                src="@/assets/play-button.svg"
                alt="Play button overlay"
            />
        </div>
        <div class="preview-content">
            <h3 v-if="!big && !full" class="preview-title">
                {{ post.title }}
            </h3>
            <p v-if="post.excerpt" class="preview-excerpt">
                {{ post.excerpt }}
            </p>
            <SeeAll :href="`${post.url}`" :blue="blue" :big="big">
                {{ video ? 'Watch now' : 'Read more' }}
            </SeeAll>
        </div>
    </router-link>
</template>
<script>
import SeeAll from './SeeAll.vue';

export default {
    name: 'PreviewBlock',
    components: {
        SeeAll,
    },
    props: {
        big: {
            type: Boolean,
            default: false,
        },
        stack: {
            type: Boolean,
            default: false,
        },
        post: {
            type: Object,
            required: true,
        },
        noPicture: {
            type: Boolean,
            default: false,
        },
        blue: {
            type: Boolean,
            default: false,
        },
        pink: {
            type: Boolean,
            default: true,
        },
        video: {
            type: Boolean,
            default: false,
        },
        full: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        overtakeNoPicture() {
            return this.noPicture || !this.post.picture?.picture;
        },
    },
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/variables.scss';

.preview {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-decoration: none !important;
    color: unset;
    align-items: flex-start;

    &-picture {
        width: 100%;
        aspect-ratio: 16 / 9;
        height: auto;
        border-radius: 4px;
        overflow: hidden;
        position: relative;

        &-photo {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        &-video {
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: center;
            transform: translate(-50%, -50%);
        }
    }

    &:hover,
    &:focus-within {
        .preview-title,
        a {
            color: var(--ie-pink) !important;
            transition: 0.2s ease-out;

            * {
                color: var(--ie-pink) !important;
                fill: var(--ie-pink);
            }
        }
    }

    &--blue {
        &:hover,
        &:focus-within {
            .preview-title,
            a {
                color: var(--ie-blue) !important;

                * {
                    color: var(--ie-blue) !important;
                    fill: var(--ie-blue);
                }
            }
        }
    }

    &--pink {
        &:hover,
        &:focus-within {
            .preview-title,
            a {
                color: var(--ie-pink) !important;

                * {
                    color: var(--ie-pink) !important;
                    fill: var(--ie-pink);
                }
            }
        }
    }

    * {
        text-decoration: none !important;
    }

    &-content {
        display: flex;
        flex-direction: column;
        gap: 3px;

        * {
            margin: 0;
        }

        &:hover {
            .preview-excerpt {
                color: var(--black) !important;
            }
        }
    }

    &:hover,
    &:focus {
        &:deep(.see_all) {
            span {
                color: var(--ie-pink);
            }

            svg {
                fill: var(--ie-pink);
            }
        }
    }

    &-title {
        font-family: GilroySemiBold;
        font-size: 18px;
        font-weight: 600;
    }

    &-excerpt {
        font-family: GilroyRegular;
        font-size: 14px;
        font-weight: 400;
    }

    @media screen and (min-width: 1080px) {
        flex-direction: row;
        gap: 22px;

        &--has_picture:not(.preview--big) {
            display: grid;
            grid-template-columns: auto auto;

            &.preview--full {
                grid-template-columns: 300px auto;
                grid-template-rows: auto auto;
            }
        }

        &-picture {
            grid-column: 1;
            grid-row: 1 / -1;
            width: 205px;
            height: 156px;
        }

        &--big,
        &--full {
            display: flex;
            flex-direction: column;
            gap: 18px;

            .preview-picture {
                border-radius: 10px;
                width: 100%;
                height: 325px;
            }

            .preview-content {
                gap: 18px;
            }

            .preview-title {
                font-family: GilroySemiBold;
                font-size: 34px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                margin: 0;
            }
        }

        &--full {
            gap: 16px;

            .preview-picture {
                border-radius: 10px;
                height: 200px;
                width: 100%;
                grid-column: 1;
                grid-row: 2;
            }

            .preview-content {
                align-self: flex-start;
                gap: 16px;
            }

            .preview-title {
                grid-column: 1 / 3;
                grid-row: 1;
                align-self: flex-start;
            }
        }

        &--stack,
        &--has_picture.preview--stack {
            display: flex;
            flex-direction: column;
            gap: 12px;

            .preview-picture {
                width: 100%;
                aspect-ratio: 16 / 9;
                height: auto;
            }
        }
    }
}
</style>
