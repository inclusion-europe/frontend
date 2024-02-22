<template>
    <div class="e2r-entry">
        <template v-for="(entry, i) in entries" :key="`entry_${i}`">
            <template v-if="currently_editing === i">
                <FileUpload
                    :picture="entry.pic"
                    @upload-picture="(f) => addPic(f, i)"
                    :input-name="`entry_${i}_pic`"
                />
                <!-- <v-md-editor
          :value="entries[i].text"
          height="300px"
          :key="`entry_${i}_editor`"
          @change="(val) => updateText(val, i)"
        ></v-md-editor> -->
                <v-md-editor
                    v-model="entries[i].text"
                    height="300px"
                    :key="`entry_${i}_editor`"
                ></v-md-editor>
                <!-- <textarea
          :id="`e2r_entry_${i}_text`"
          :name="`entry_${i}_text`"
          v-model="entries[i].text"
          @change="update"
          rows="6"
        /> -->
            </template>
            <template v-else>
                <img v-if="entry.pic" :src="entry.pic" class="preview-pic" />
                <div v-else />
                <div>
                    <vue-markdown :source="entry.text" />
                </div>
            </template>
            <div>
                <IeButton v-if="currently_editing === i" @click="stopEditing">
                    Save
                </IeButton>
                <IeButton v-else @click="startEditing(i)"> Edit </IeButton>
                <IeButton
                    v-if="entries.length > 1"
                    @click="removeEntry(i)"
                    .class="remove_entry_button"
                    boxed
                >
                    Remove
                </IeButton>
            </div>
        </template>
        <IeButton boxed class="e2r-add-row" @click="addEntry">
            Add entry
        </IeButton>
    </div>
</template>
<script>
import VueMarkdown from 'vue-markdown-render';
import IeButton from '@/elements/Button.vue';
import FileUpload from '@/elements/FileUpload.vue';
import utils from '@/scripts/utils';

export default {
    name: 'E2REditor',
    components: {
        IeButton,
        FileUpload,
        VueMarkdown,
    },
    props: {
        content: {
            type: Array,
            required: true,
        },
        editOnInit: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        entries: [],
        currently_editing: -1,
    }),
    watch: {
        entries(val) {
            this.$emit('update', val);
        },
        editOnInit(val) {
            if (val) this.currently_editing = 0;
        },
    },
    mounted() {
        this.entries = this.content;

        if (this.editOnInit) {
            this.currently_editing = 0;
        }
    },
    methods: {
        addEntry() {
            this.entries.push({
                pic: null,
                text: '',
            });
            this.currently_editing = this.entries.length - 1;
        },
        removeEntry(index) {
            this.entries.splice(index, 1);
        },
        update() {
            this.$emit('update', this.entries);
        },
        updateText(val, i) {
            this.entries[i].text = val;
            this.update();
        },
        addPic(file, i) {
            utils.uploadFile(file).then((res) => {
                this.entries[i].pic = res.file.filepath;
            });
            this.update();
        },
        startEditing(i) {
            this.currently_editing = i;
        },
        stopEditing() {
            this.currently_editing = -1;
        },
    },
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/variables.scss';
.e2r-entry {
    display: grid;
    grid-template-columns: 175px 1fr max-content;
    align-items: stretch;
    gap: 10px;
    width: var(--width);
    max-width: var(--max-width);

    .preview-pic {
        height: 150px;
        width: 150px;
        align-self: center;
        justify-self: center;
        border-radius: 2px;
        object-fit: cover;
    }
}

.e2r-add-row {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
