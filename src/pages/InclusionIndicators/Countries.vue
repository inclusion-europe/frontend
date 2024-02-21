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
                        return code
                            ? `<a href="/indicators/${code.toLowerCase()}">${
                                row.country
                            }</a>`
                            : row.country;
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
                    display: (row) => (row.voteDecide
                        ? Math.round(row.voteDecide.score * 10) / 10
                        : ''),
                    label: this.labels.voteDecide,
                },
                {
                    field: 'liveIndependentlyCommunity',
                    sortable: true,
                    display: (row) => (row.liveIndependentlyCommunity
                        ? Math.round(
                            row.liveIndependentlyCommunity.score * 10,
                        ) / 10
                        : ''),
                    label: this.labels.liveIndependentlyCommunity,
                },
                {
                    field: 'housingSupport',
                    sortable: true,
                    display: (row) => (row.housingSupport
                        ? Math.round(row.housingSupport.score * 10) / 10
                        : ''),
                    label: this.labels.housingSupport,
                },
                {
                    field: 'education',
                    sortable: true,
                    display: (row) => (row.education
                        ? Math.round(row.education.score * 10) / 10
                        : ''),
                    label: this.labels.education,
                },
                {
                    field: 'employment',
                    sortable: true,
                    display: (row) => (row.employment
                        ? Math.round(row.employment.score * 10) / 10
                        : ''),
                    label: this.labels.employment,
                },
                {
                    field: 'healthcare',
                    sortable: true,
                    display: (row) => (row.healthcare
                        ? Math.round(row.healthcare.score * 10) / 10
                        : ''),
                    label: this.labels.healthcare,
                },
                {
                    field: 'representation',
                    sortable: true,
                    display: (row) => (row.representation
                        ? Math.round(row.representation.score * 10) / 10
                        : ''),
                    label: this.labels.representation,
                },
            ];
        },
        shownColumns() {
            return this.extraColumns.filter((x, i) => this.visibleColumns.includes(i));
        },
    },
    mounted() {
        this.visibleColumns = this.initTable();
    },
    methods: {
        averageFn(row) {
            const {
                voteDecide,
                liveIndependentlyCommunity,
                housingSupport,
                education,
                employment,
                healthcare,
                representation,
            } = row;

            const arr = [
                voteDecide?.score,
                liveIndependentlyCommunity?.score,
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
            const countryCode = Object.keys(countrycodes)[
                Object.values(countrycodes).findIndex(
                    (el) => el === row.country,
                )
            ];
            if (!countryCode) {
                this.$router.push('/indicators');
            }
            return countryCode || null;
        },
    },
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/variables.scss';
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
