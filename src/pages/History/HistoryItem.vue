<template>
    <div class="history_item">
        <h1>{{ title }}</h1>
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
