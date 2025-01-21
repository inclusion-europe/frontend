<template>
    <div v-if="active" class="modal_overlay">
        <div class="modal">
            <div class="modal-header">
                <h3 v-if="title">
                    {{ title }}
                </h3>
            </div>
            <IeButton class="modal-close" @click="$emit('close')">
                <XMarkIcon />
            </IeButton>
            <div class="modal-content">
                <slot />
            </div>
        </div>
    </div>
</template>
<script>
import { XMarkIcon } from '@heroicons/vue/20/solid';
import IeButton from '@/elements/Button.vue';

export default {
    name: 'IeModal',
    components: {
        IeButton,
        XMarkIcon,
    },
    props: {
        active: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: null,
        },
    },
    watch: {
        active: {
            immediate: true,
            handler(val) {
                if (val) {
                    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
                } else {
                    document.getElementsByTagName('body')[0].style.overflow = 'auto';
                }
            },
        },
    },
};
</script>
<style lang="scss" scoped>
.modal {
    &_overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
    }

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 4px;
    border: 1px solid #fefefe;
    min-width: 20vw;
    max-width: 90vw;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

    &-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 12px;
        border-bottom: 1px solid #fefefe;

        h3 {
            margin-top: 0;
            margin-bottom: 0;
        }
    }

    &-content {
        padding: 12px;
    }

    &-close {
        position: absolute;
        right: 5px;
        top: 5px;
        color: red;
        height: 22px;
        width: 22px;
    }
}
</style>
