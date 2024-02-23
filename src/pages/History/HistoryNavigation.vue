<template>
    <ul class="history_navigation">
        <li
            v-for="(item, i) in items"
            :key="'history_nav-' + i"
            @click="$emit('showItem', i)"
            :class="{ selected: selected === i }"
        >
            {{ item.title }}
        </li>
    </ul>
</template>
<script>
export default {
    name: 'HistoryNavigation',
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

    li {
        cursor: pointer;
        transition: all 0.2s ease;

        &.selected {
            font-family: GilroyBold;
            color: var(--ie-pink);
        }

        &:hover {
            color: var(--ie-pink);
        }
    }
}
</style>
