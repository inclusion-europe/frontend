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
    <UCard
      class="w-full table-card"
      :ui="{
        body: {
          padding: '',
        },
      }"
    >
      <UTable
        :rows="dataset"
        :columns="columns"
        class="country-table"
        :sort-button="{
          variant: 'transparent',
          align: 'left',
        }"
      >
        <template #country-data="{ row }">
          <span class="data-cell">
            <a :href="countryUrl(row)">{{ row.country }}</a>
          </span>
        </template>
        <template #average-data="{ row }">
          <span class="data-cell">
            {{ row.average }}
            <EvolutionIndicator :evo="getEvolution(row, 'average', true)" />
          </span>
        </template>
        <template
          v-for="col in shownColumns"
          v-slot:[`${col.key}-data`]="{ row, column }"
        >
          <span class="data-cell">
            {{ getScore(row, column.key) }}
            <EvolutionIndicator :evo="getEvolution(row, column.key)" />
          </span>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
<script setup>
import { useWindowSize } from '@vueuse/core';

import utils from '~/scripts/utils';
import countrycodes from '~/assets/datasets/countries.json';
import IeButton from './Button.vue';
import EvolutionIndicator from './EvolutionIndicator.vue';

const config = useRuntimeConfig();

const availableYears = config.public.indicatorsYears.split(',');

const fields = [
  'voteDecide',
  'liveIndep',
  'housingSupport',
  'education',
  'employment',
  'healthcare',
  'representation',
];

const visibleColumns = ref([]);

const windowSize = useWindowSize();
const selectedYear = ref(availableYears[availableYears.length - 1]);

const previousYear = computed(() => {
  const prev = (Number(selectedYear.value) - 1).toString();
  return availableYears.includes(prev) ? prev : null;
});

const { data: countryData } = await useFetch(
  () => `/datasets/inclusion-indicators-${selectedYear.value}.json`,
  {
    default: () => ({ data: [], labels: {} }),
    watch: [selectedYear],
  }
);

const { data: prevYearData } = await useAsyncData(
  'indicators-previous-year',
  async () => {
    if (!previousYear.value) {
      return { data: [], labels: {} };
    }

    return await $fetch(
      `/datasets/inclusion-indicators-${previousYear.value}.json`
    );
  },
  {
    default: () => ({ data: [], labels: {} }),
    watch: [previousYear],
  }
);

const indicatorEvolution = (
  country,
  score,
  indicator,
  isAverageCell = false,
  fields = null
) => {
  if (!prevYearData.value.data.length) return undefined;

  const previousYearData = prevYearData.value.data.find(
    (datapoint) => datapoint.country === country
  );

  if (!previousYearData) {
    return undefined;
  }

  if (!isAverageCell) {
    if (!(indicator in previousYearData.scores)) {
      return undefined;
    }

    return (
      utils.scoreRoundFn(score) -
      utils.scoreRoundFn(previousYearData.scores[indicator].score)
    );
  }

  return score - utils.averageFn(previousYearData, fields);
};


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
  return returnedCountryCode || null;
}

function countryUrl(row) {
  return `/indicators/${countryCode(row).toLowerCase()}/${selectedYear.value}`;
}

const dataset = computed(() => {
  const arr = countryData.value.data;
  arr.forEach((country) => {
    Object.assign(country, {
      average: utils.scoreRoundFn(utils.averageFn(country, fields)),
    });
    Object.keys(country.scores).forEach((field) => {
      country[field] = utils.scoreRoundFn(country.scores[field].score);
    });
  });
  return arr;
});

const isMobile = computed(() => windowSize.width.value < 1024);

const getScore = (row, field) => {
  return row.scores[field] ? utils.scoreRoundFn(row.scores[field].score) : '';
};

const getEvolution = (row, field, isAverage = false) => {
  let score = row.scores[field] ? row.scores[field].score : undefined;

  if (isAverage) score = row.average;
  if (score === undefined) return '';

  let evo = indicatorEvolution(row.country, score, field, isAverage, fields);

  if (evo === undefined) return null;
  return evo;
};

const extraColumns = computed(() =>
  fields.map((field) => ({
    key: field,
    sortable: true,
    label: countryData.value.labels[field],
    direction: 'desc',
  }))
);

const shownColumns = computed(() => [
  ...extraColumns.value.filter((x, i) => visibleColumns.value.includes(i)),
]);

const columns = computed(() => [
  {
    key: 'country',
    sortable: true,
    label: countryData.value.labels.country,
  },
  {
    key: 'average',
    sortable: true,
    label: countryData.value.labels.average,
    direction: 'desc',
  },
  ...shownColumns.value,
]);

function initTable() {
  return extraColumns.value.map((x, i) => i);
}

watch(
  isMobile,
  (val) => {
    if (!val) {
      visibleColumns.value = initTable();
    }
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped>
.countries-ranking {
  max-width: 90vw;
  width: fit-content;
  margin: auto;
  padding-bottom: 30px;

  .data-selector {
    width: var(--width);
    max-width: 100%;
    margin: auto;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
  }

  .table-card {
    width: fit-content;
    margin: auto;
  }

  .country-table {
    max-width: 100%;
    width: fit-content !important;
    margin: auto;

    &:deep(th) {
      // background: var(--dark-grey) !important;
    }

    &:deep(tr) {
      &:nth-child(2n) {
        background: #ececec !important;
      }
    }

    .data-cell {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
