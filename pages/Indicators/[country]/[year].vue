<template>
  <div class="post_page">
    <div v-if="loading" class="loading">
      <img src="/loading.gif" />
    </div>
    <template v-else>
      <div>
        <ie-button @click="navigateTo('/indicators')" blue boxed small>
          Back to the Inclusion Indicators page
        </ie-button>
      </div>
      <div class="year-selector" v-if="otherYears.length > 1">
        <IeButton
          v-for="(year, i) in otherYears"
          rounded
          boxed
          :white="selectedYear != year"
          :pink="selectedYear == year"
          :key="`year-selector-button-${i}`"
          @click="navigateTo(year)"
        >
          {{ year }}
        </IeButton>
      </div>
      <article class="country-page">
        <header>
          <h1>{{ fullCountryName }}</h1>
          <div class="country-avg">
            <h2
              class="country-avg--score"
              :style="{
                color: indicatorScoreColour(countryAverage),
              }"
            >
              {{ countryAverage }}
            </h2>
            <h5>out of 10</h5>
          </div>
        </header>
        <section
          v-for="(entry, i) in Object.keys(countryScores)"
          :key="`entry_${i}`"
          class="category"
        >
          <div class="category-copy_block">
            <h4>
              {{ computedLabels[entry] }}
            </h4>
            <p>
              {{ countryScores[entry].copy }}
            </p>
          </div>
          <h3
            class="category-score"
            :style="{
              color: indicatorScoreColour(countryScores[entry].score),
            }"
          >
            {{ Math.round(countryScores[entry].score * 10) / 10 }}
          </h3>
        </section>
        <section v-if="quotesLength > 1">
          <p class="quote">
            <span v-html="countryData.quotes[0].quote" />
            <sup v-if="countryData.quotes[0].source" class="quote-source_note">
              {{ countryData.quotes[0].sourceNote }}
            </sup>
          </p>
        </section>
        <country-chart :chart-data="chartData" />
        <section v-if="quotesLength">
          <p class="quote">
            <span v-html="countryData.quotes[quotesLength > 1 ? 1 : 0].quote" />
            <sup
              v-if="countryData.quotes[quotesLength > 1 ? 1 : 0].source"
              class="quote-source_note"
            >
              {{ countryData.quotes[quotesLength > 1 ? 1 : 0].sourceNote }}
            </sup>
          </p>
        </section>
        <country-table
          :table-data="countryData.reported_numbers"
          :year="+selectedYear"
        />
        <span>
          <b>Disclaimer</b>: these are the reported or estimated numbers of the
          country. In most cases, in reality, the numbers will be higher as the
          data is underreported or missing entirely.
        </span>
        <div class="additional_notes" v-if="countryData.additional_notes">
          <h4>Additional notes:</h4>
          <p v-html="countryData.additional_notes" />
        </div>
      </article>
      <div class="quote_sources" v-if="quoteSources.length">
        <p v-for="(src, i) in quoteSources" :key="'quotesource_' + i">
          <sup>{{ i + 1 }}</sup>
          <a :href="src" v-html="src" target="_blank" />
        </p>
      </div>
    </template>
  </div>
</template>
<script setup>
import countrycodes from '~/assets/datasets/countries.json';
import CountryChart from '~/elements/CountryChart.vue';
import CountryTable from '~/elements/CountryTable.vue';
import IeButton from '~/elements/Button.vue';
import utils from '~/scripts/utils';

const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();

const availableYears = config.public.indicatorsYears.split(',');

const dataset = ref({ data: [], labels: {}, european_averages: {} });
const loading = ref(true);
const otherYears = ref([]);

const countryData = computed(() => {
  const data = {
    ...dataset.value.data.find((el) => el.country === fullCountryName.value),
  };
  if (Array.isArray(data.quotes)) {
    let sourceCounter = 0;
    data.quotes.forEach((q) => {
      if (q.source) {
        sourceCounter++;
        Object.assign(q, { sourceNote: sourceCounter });
      }
    });
  }
  return data;
});

const quoteSources = computed(() => {
  const srcs = [];
  for (let i = 0; i < countryData?.value?.quotes?.length; i++) {
    if (
      Object.prototype.hasOwnProperty.call(
        countryData.value.quotes[i],
        'source'
      )
    ) {
      srcs.push(countryData.value.quotes[i].source);
    }
  }

  return srcs;
});

const fullCountryName = computed(() => {
  return countrycodes[route.params.country.toUpperCase()];
});

const selectedYear = computed(() => {
  return route.params.year;
});

const computedLabels = computed(() => {
  return dataset.value.labels;
});

const chartData = computed(() => {
  const labels = [
    ...Object.keys(countryScores.value).map((k) => computedLabels.value[k]),
    'Average inclusion score',
  ];

  const country = {
    label: fullCountryName.value,
    axis: 'y',
    data: [
      ...Object.keys(countryScores.value).map(
        (k) => Math.round(countryScores.value[k].score * 10) / 10
      ),
      countryAverage.value,
    ],
    borderColor: '#ffc704ff',
    backgroundColor: '#ffc7048c',
    borderWidth: 1,
  };

  const euroAvg = {
    label: 'European average',
    axis: 'y',
    data: [
      ...Object.keys(countryScores.value).map(
        (k) => Math.round(dataset.value.european_averages[k] * 10) / 10
      ),
      dataset.value.european_averages.inclusion_score,
    ],
    borderColor: '#01aab5ff',
    backgroundColor: '#01aab58c',
    borderWidth: 1,
  };

  const data = {
    labels,
    datasets: [country, euroAvg],
  };

  const config = {
    type: 'bar',
    data,
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `How does ${fullCountryName.value} compare to the European average`,
        },
      },
      layout: {
        padding: {
          left: 0,
          right: 100,
          top: 0,
          bottom: 0,
        },
      },
      scales: {
        x: {
          min: 0,
          max: 10,
        },
      },
    },
  };

  return { ...config, data };
});

const countryScores = computed(() => {
  if (!countryData.value.scores) return {};
  return countryData.value.scores;
});

const quotesLength = computed(() => {
  if (!Array.isArray(countryData.value.quotes)) return 0;
  return countryData.value.quotes.length;
});

const countryAverage = computed(() => {
  const data = { ...countryScores.value };
  let total = 0;
  Object.values(data).forEach((el) => {
    total += el.score;
  });
  return Math.round((total / Object.entries(data).length) * 10) / 10;
});

watch(
  selectedYear,
  (val) => {
    useFetch(`/datasets/inclusion-indicators-${val}.json`).then((res) => {
      dataset.value = res.data.value;
      loading.value = false;
    });
  },
  { immediate: true }
);

const indicatorScoreColour = (score) => {
  return utils.indicatorScoreColour(score);
};

const findOtherCountryIndicatorYears = async () => {
  const results = await Promise.all(
    availableYears.map(async (year) => {
      const res = await $fetch(`/datasets/inclusion-indicators-${year}.json`);
      const dataForThatYear = res.data.find(
        (datapoint) => datapoint.country === fullCountryName.value
      );
      return dataForThatYear ? year : null;
    })
  );

  const filtered = results.filter((year) => year !== null);
  console.log({ results, filtered });
  return filtered;
};

onMounted(async () => {
  if (!fullCountryName.value || !countryData.value) {
    router.push('/indicators');
  }

  otherYears.value = await findOtherCountryIndicatorYears();
});
</script>
<style lang="scss" scoped>
.country-page {
  display: flex;
  flex-direction: column;
  gap: 38px;

  header {
    align-items: center !important;
    justify-content: space-between;

    h1 {
      font-size: 3rem;
    }

    & > * {
      margin: 0;
    }

    .country-avg {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      & > * {
        margin: 0;
      }

      &--score {
        font-size: 3rem;
        font-family: GilroyBold;
        text-shadow: 0 0 8px rgba(0, 0, 0, 0.85);
        -webkit-text-stroke: 2px rgba(0, 0, 0, 0.35);
      }
    }
  }

  .category {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 32px;

    &-copy_block {
      flex-grow: 1;
      max-width: 80%;

      & > * {
        margin: 0;
      }

      h4 {
        font-family: GilroyBold;
      }
    }

    &-score {
      margin: 0;
      font-size: 2rem;
      font-family: GilroyBold;
      text-shadow: 0 0 4px rgba(25, 25, 25, 0.55);
      -webkit-text-stroke: 2px rgba(0, 0, 0, 0.35);
    }
  }

  .quote {
    width: 80%;
    font-size: 1.2rem;
    font-style: italic;
    text-align: center;
    margin: auto;

    &-source_note {
      font-size: small;
    }
  }

  .additional_notes {
    h4 {
      font-size: 1.2rem;
      font-family: GilroyBold;
    }

    & > * {
      margin: 0;
    }
  }
}

.quote_sources {
  border-top: 1px solid black;
  margin-top: 1rem;

  sup {
    margin-right: 0.5rem;
  }
}

.year-selector {
  width: var(--width);
  max-width: var(--max-width);
  margin: auto;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
}
</style>
