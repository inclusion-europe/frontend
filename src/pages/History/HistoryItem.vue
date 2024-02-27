<template>
    <div class="history_item">
        <h1 class="item_title">{{ title }}</h1>
        <vue-markdown :source="content" :options="{ html: true }" />
    </div>
</template>
<script>
import VueMarkdown from 'vue-markdown-render';

export default {
    name: 'HistoryItem',
    components: {
        VueMarkdown,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
};
</script>
<style lang="scss" scoped>
.history_item {
    .item_title {
        margin-top: 0;
    }

    &:deep(blockquote) {
        font-size: 1.2rem;
        max-width: 60%;
        margin-left: auto;
        margin-right: auto;
        font-family: GilroyRegularItalic;

        p,
        ul {
            width: fit-content;
            margin: 0 auto;
        }

        p {
            white-space: pre-wrap;
        }

        & + p {
            text-align: center;
            font-family: GilroyMedium;
            font-size: 1.1rem;
        }
    }
}
</style>
