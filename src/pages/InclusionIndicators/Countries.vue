<template>
    <div class="countries-ranking">
        <div class="data-selector">
            <IeButton
                v-for="(field, i) in extraColumns"
                rounded
                boxed
                :white="!visibleColumns.includes(i)"
                :key="`selector-button-${i}`"
                @click="selectColumn(i)"
            >
                {{ field.label }}
            </IeButton>
        </div>
        <vue-table
            :row-classes="['countries-row']"
            :columns="columns"
            :rows="dataset"
            :total="dataset.length"
            :page-size="50"
            :is-static-mode="true"
            :is-hide-paging="true"
            :is-fixed-first-column="isMobile"
        >
        </vue-table>
    </div>
</template>
<script>
import VueTable from 'vue3-table-lite';
import countryData from '@/assets/datasets/inclusion-indicators-2023.json';
import countrycodes from '@/assets/datasets/countries.json';
import IeButton from '@/elements/Button.vue';

export default {
    name: 'InclusionIndicators.Countries',
    components: {
        VueTable,
        IeButton,
    },
    data: () => ({
        visibleColumns: [],
        windowWidth: window.innerWidth,
    }),
    computed: {
        dataset() {
            const arr = countryData.data;
            arr.forEach((country) => {
                Object.assign(country, {
                    average: Math.round(this.averageFn(country) * 10) / 10,
                });
            });
            return arr;
        },
        isMobile() {
            return this.windowWidth < 1024;
        },
        labels() {
            return countryData.labels;
        },
        columns() {
            return [
                {
                    field: 'country',
                    sortable: true,
                    label: this.labels.country,
                    isKey: true,
                    display: (row) => {
                        const code = this.countryCode(row);
                        return code ? this.countryUrl(row) : row.country;
                    },
                },
                {
                    field: 'average',
                    sortable: true,
                    label: this.labels.average,
                },
                ...this.shownColumns,
            ];
        },
        extraColumns() {
            return [
                {
                    field: 'voteDecide',
                    sortable: true,
                    display: (row) =>
                        row.scores.voteDecide
                            ? this.scoreRoundFn(row.scores.voteDecide.score)
                            : '',
                    label: this.labels.voteDecide,
                },
                {
                    field: 'liveIndep',
                    sortable: true,
                    display: (row) =>
                        row.scores.liveIndep
                            ? this.scoreRoundFn(row.scores.liveIndep.score)
                            : '',
                    label: this.labels.liveIndep,
                },
                {
                    field: 'housingSupport',
                    sortable: true,
                    display: (row) =>
                        row.scores.housingSupport
                            ? this.scoreRoundFn(row.scores.housingSupport.score)
                            : '',
                    label: this.labels.housingSupport,
                },
                {
                    field: 'education',
                    sortable: true,
                    display: (row) =>
                        row.scores.education
                            ? this.scoreRoundFn(row.scores.education.score)
                            : '',
                    label: this.labels.education,
                },
                {
                    field: 'employment',
                    sortable: true,
                    display: (row) =>
                        row.scores.employment
                            ? this.scoreRoundFn(row.scores.employment.score)
                            : '',
                    label: this.labels.employment,
                },
                {
                    field: 'healthcare',
                    sortable: true,
                    display: (row) =>
                        row.scores.healthcare
                            ? this.scoreRoundFn(row.scores.healthcare.score)
                            : '',
                    label: this.labels.healthcare,
                },
                {
                    field: 'representation',
                    sortable: true,
                    display: (row) =>
                        row.scores.representation
                            ? this.scoreRoundFn(row.scores.representation.score)
                            : '',
                    label: this.labels.representation,
                },
            ];
        },
        shownColumns() {
            return this.extraColumns.filter((x, i) =>
                this.visibleColumns.includes(i),
            );
        },
    },
    mounted() {
        this.$watch(
            'isMobile',
            // eslint-disable-next-line func-names
            function (val) {
                if (!val) {
                    this.visibleColumns = this.initTable();
                }
            },
            { immediate: true },
        );

        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        });
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onResize() {
            this.windowWidth = window.innerWidth;
        },
        averageFn(row) {
            const {
                voteDecide,
                liveIndep,
                housingSupport,
                education,
                employment,
                healthcare,
                representation,
            } = row.scores;

            const arr = [
                voteDecide?.score,
                liveIndep?.score,
                housingSupport?.score,
                education?.score,
                employment?.score,
                healthcare?.score,
                representation?.score,
            ].filter((a) => ![null, undefined, false].includes(a));

            return arr.reduce((a, b) => a + b, 0) / arr.length;
        },
        selectColumn(i) {
            const inArray = this.visibleColumns.indexOf(i);
            if (inArray > -1) this.visibleColumns.splice(inArray, 1);
            else this.visibleColumns.push(i);
        },
        initTable() {
            return this.extraColumns.map((x, i) => i);
        },
        countryCode(row) {
            const countryCode =
                Object.keys(countrycodes)[
                    Object.values(countrycodes).findIndex(
                        (el) => el === row.country,
                    )
                ];
            if (!countryCode) {
                this.$router.push('/indicators');
            }
            return countryCode || null;
        },
        countryUrl(row) {
            return `<a href="/indicators/${this.countryCode(
                row,
            ).toLowerCase()}">${row.country}</a>`;
        },
        scoreRoundFn(score) {
            return Math.round(score * 10) / 10;
        },
    },
};
</script>
<style lang="scss" scoped>
.countries-ranking {
    max-width: 90vw;
    width: fit-content;
    margin: auto;
    padding-bottom: 30px;

    .data-selector {
        width: var(--width);
        max-width: var(--max-width);
        margin: auto;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 10px;
    }

    &:deep(.vtl) {
        width: 100%;

        &-table {
            width: fit-content !important;
            margin: auto;

            th {
                background: var(--dark-grey) !important;
            }

            .countries-row {
                &:nth-child(2n) {
                    background: #ececec;
                }
            }
        }
    }
}
</style>
