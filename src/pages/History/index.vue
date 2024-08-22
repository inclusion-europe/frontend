<template>
    <div class="history_page post_page">
        <article>
            <header>
                <div class="header_texts">
                    <h1>History</h1>
                </div>
            </header>
            <div class="history_container">
                <div>
                    <history-navigation
                        :items="historyItems"
                        @showItem="showItem"
                        :selected="shownItem"
                    />
                </div>
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
        </article>
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
.history_container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

@media screen and (min-width: 1080px) {
    .history_container {
        display: grid;
        grid-template-columns: 20% auto;
    }
}
</style>
