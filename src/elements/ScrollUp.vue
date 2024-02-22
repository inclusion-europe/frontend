<!-- eslint-disable max-len -->
<template>
    <IeButton
        @click="scrollUp"
        class="scroll_up-buttn"
        :class="{ 'scroll_up-buttn--shown': shown }"
    >
        <svg
            height="20px"
            width="20px"
            viewBox="0 0 32 32"
            aria-labelledby="Scroll up"
        >
            <path
                d="M16,24.6c-0.5,0-1-0.2-1.4-0.6L1.4,10.8c-0.8-0.8-0.8-2,0-2.8c0.8-0.8,2-0.8,2.8,0L16,19.8L27.8,8c0.8-0.8,2-0.8,2.8,0
		c0.8,0.8,0.8,2,0,2.8L17.4,24C17,24.4,16.5,24.6,16,24.6z"
            />
        </svg>
    </IeButton>
</template>
<script>
import IeButton from './Button.vue';

export default {
    name: 'ScrollUp',
    components: {
        IeButton,
    },
    data: () => ({
        shown: false,
    }),
    mounted() {
        this.shown = window.scrollY > 0;
        window.onscroll = () => {
            this.shown = window.scrollY > 0;
        };
    },
    methods: {
        scrollUp() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/variables.scss';
.scroll_up-buttn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 4px;
    background: var(--ie-blue);
    position: fixed;
    right: 20px;
    bottom: -20px;
    opacity: 0;
    transition: 0.2s ease-out;

    svg {
        transform: rotate(180deg);
        transform-origin: center;
        fill: white;
    }

    &--shown {
        opacity: 1;
        bottom: 20px;
    }

    &:hover,
    &:focus {
        background: var(--ie-pink);
    }
}
</style>
