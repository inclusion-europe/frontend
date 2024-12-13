<template>
    <div class="countries-ranking">
        <div class="data-selector" v-if="availableYears.length > 1">
            <IeButton
                v-for="(year, i) in availableYears"
                rounded
                boxed
                :white="selectedYear != year"
                :pink="selectedYear == year"
                :key="`year-selector-button-${i}`"
                @click="selectYear(i)"
            >
                {{ year }}
            </IeButton>
        </div>
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
<script setup>
// eslint-disable-next-line object-curly-newline
import { ref, computed, onMounted, onBeforeMount, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import VueTable from 'vue3-table-lite';
import utils from '@/scripts/utils';
import countrycodes from '@/assets/datasets/countries.json';
import IeButton from '@/elements/Button.vue';

const availableYears = process.env.VUE_APP_INDICATORS_YEARS.split(',');

const fields = [
    'voteDecide',
    'liveIndep',
    'housingSupport',
    'education',
    'employment',
    'healthcare',
    'representation',
];

const router = useRouter();

const visibleColumns = ref([]);
const windowWidth = ref(window.innerWidth);
const selectedYear = ref(availableYears[availableYears.length - 1]);

const countryData = ref({ data: [], labels: {} });
const prevYearData = ref({ data: [], labels: {} });

watch(
    selectedYear,
    // eslint-disable-next-line func-names
    (val) => {
        axios.get(`/datasets/inclusion-indicators-${val}.json`).then((res) => {
            countryData.value = res.data;
        });

        if (availableYears.includes((+val - 1).toString())) {
            axios
                .get(`/datasets/inclusion-indicators-${+val - 1}.json`)
                .then((res) => {
                    prevYearData.value = res.data;
                });
        }
    },
    { immediate: true },
);

function onResize() {
    windowWidth.value = window.innerWidth;
}

function selectColumn(i) {
    const inArray = visibleColumns.value.indexOf(i);
    if (inArray > -1) visibleColumns.value.splice(inArray, 1);
    else visibleColumns.value.push(i);
}

function selectYear(y) {
    selectedYear.value = availableYears[y];
}

function countryCode(row) {
    const returnedCountryCode =
        Object.keys(countrycodes)[
            Object.values(countrycodes).findIndex((el) => el === row.country)
        ];
    if (!returnedCountryCode) {
        router.push('/indicators');
    }
    return returnedCountryCode || null;
}

function countryUrl(row) {
    return `<a href="/indicators/${countryCode(row).toLowerCase()}/${
        selectedYear.value
    }">${row.country}</a>`;
}

const dataset = computed(() => {
    const arr = countryData.value.data;
    arr.forEach((country) => {
        Object.assign(country, {
            average: utils.scoreRoundFn(utils.averageFn(country, fields)),
        });
    });
    return arr;
});

const isMobile = computed(() => windowWidth.value < 1024);

function getEvolution(row, field, isAverage = false) {
    let score = row.scores[field] ? row.scores[field].score : undefined;

    if (isAverage) score = row.average;
    if (score === undefined) return '';

    const evo = utils.indicatorEvolution(
        row.country,
        +selectedYear.value,
        score,
        field,
        availableYears,
        isAverage,
        fields,
    );
    if (evo === undefined) return '';
    if (evo > 0) {
        return '<img class="table-evo-indicator" src="/assets/arrow-better.svg" alt="Better than last year" />';
    }
    if (evo < 0) {
        return '<img class="table-evo-indicator" src="/assets/arrow-worse.svg" alt="Worse than last year" />';
    }
    return '<img class="table-evo-indicator" src="/assets/arrow-no-change.svg" alt="Same as last year" />';
}

const extraColumns = computed(() =>
    fields.map((field) => ({
        field,
        sortable: true,
        display: (row) =>
            `${
                row.scores[field]
                    ? utils.scoreRoundFn(row.scores[field].score)
                    : ''
            } ${getEvolution(row, field)}`,
        label: countryData.value.labels[field],
    })),
);

const shownColumns = computed(() => [
    ...extraColumns.value.filter((x, i) => visibleColumns.value.includes(i)),
]);

const columns = computed(() => [
    {
        field: 'country',
        sortable: true,
        label: countryData.value.labels.country,
        isKey: true,
        display: (row) => {
            const code = countryCode(row);
            return code ? countryUrl(row) : row.country;
        },
    },
    {
        field: 'average',
        sortable: true,
        label: countryData.value.labels.average,
        display: (row) =>
            `${row.average} ${getEvolution(row, 'average', true)}`,
    },
    ...shownColumns.value,
]);

function initTable() {
    return extraColumns.value.map((x, i) => i);
}

watch(
    isMobile,
    // eslint-disable-next-line func-names
    (val) => {
        if (!val) {
            visibleColumns.value = initTable();
        }
    },
    { immediate: true },
);

onMounted(() => {
    window.addEventListener('resize', onResize);
});

onBeforeMount(() => {
    window.removeEventListener('resize', onResize);
});
</script>
<style lang="scss" scoped>
.countries-ranking {
    max-width: 90vw;
    width: fit-content;
    margin: auto;
    padding-bottom: 30px;

    &:deep(.table-evo-indicator) {
        height: 15px;
        width: 15px;
        margin: 0;
    }

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

        &-tbody-td {
            & > div {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
    }
}
</style>
