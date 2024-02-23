<template>
    <div class="history_page post_page">
        <history-navigation
            :items="historyItems"
            @showItem="showItem"
            :selected="shownItem"
        />
        <div>
            <history-item
                v-for="(item, i) in historyItems"
                :key="'history_item-' + i"
                :title="item.title"
                :content="item.content"
                v-show="shownItem === i"
            />
        </div>
    </div>
</template>
<script>
import HistoryNavigation from './HistoryNavigation.vue';
import HistoryItem from './HistoryItem.vue';
import historyData from '@/assets/datasets/history.json';

export default {
    name: 'HistoryPage',
    components: {
        HistoryNavigation,
        HistoryItem,
    },
    data: () => ({
        shownItem: 0,
    }),
    computed: {
        historyItems() {
            return [...historyData];
        },
    },
    methods: {
        showItem(i) {
            this.shownItem = i;
        },
    },
};
</script>
<style lang="scss" scoped>
.history_page {
    display: grid;
    grid-template-columns: 20% auto;
    gap: 2rem;
}
</style>
