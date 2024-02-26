<template>
    <div class="history_navigation">
        <ie-button
            v-for="(item, i) in items"
            :key="'history_nav-' + i"
            @click="$emit('showItem', i)"
            boxed
            small
            :white="selected !== i"
            :pink="selected === i"
        >
            {{ item.title }}
        </ie-button>
    </div>
</template>
<script>
import IeButton from '@/elements/Button.vue';

export default {
    name: 'HistoryNavigation',
    components: {
        IeButton,
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
        selected: {
            type: Number,
            default: -1,
        },
    },
};
</script>
<style lang="scss" scoped>
.history_navigation {
    list-style: none;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 1rem;
    gap: 0.25rem;

    li {
        cursor: pointer;
        transition: all 0.2s ease;

        &.selected {
            font-family: GilroySemiBold;
            color: var(--ie-pink);
        }

        &:hover {
            color: var(--ie-pink);
        }
    }
}
</style>
