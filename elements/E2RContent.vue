<template>
    <div class="e2r-grid">
        <template v-for="(entry, i) in content" :key="`e2r_entry_${i}`">
            <img :src="entry.pic" />
            <div>
                <vue-markdown :source="entry.text" :options="{ html: true }" />
            </div>
        </template>
    </div>
</template>
<script>
import VueMarkdown from 'vue-markdown-render';

export default {
    name: 'E2RContent',
    components: {
        VueMarkdown,
    },
    props: {
        content: {
            type: Array,
            required: true,
        },
    },
};
</script>
<style lang="scss" scoped>
.e2r-grid {
    display: grid;
    grid-template-columns: 150px auto;
    max-width: 570px;
    margin: auto;
    gap: 50px;

    img {
        max-width: 150px;
        max-height: 150px;
        align-self: center;
        justify-self: center;
    }
}
</style>
