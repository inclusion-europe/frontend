<template>
  <div class="post_page">
    <article class="country-page">
      <header>
        <h1>{{ fullCountryName }}</h1>
        <div class="country-avg">
          <h2
            class="country-avg--score" 
            :style="{ color: indicatorScoreColour(countryAverage) }"
          >
            {{ countryAverage }}
          </h2>
          <h5>out of 10</h5>
        </div>
        <img :src="countryFlag" />
      </header>
      <section
        v-for="(entry, i) in Object.keys(countryDataPurified)"
        :key="`entry_${i}`"
        class="category"
      >
        <div class="category-copy_block">
          <h4>
            {{ labels[entry] }}
          </h4>
          <p>
            {{ countryDataPurified[entry].copy }}
          </p>
        </div>
        <h3 
          class="category-score" 
          :style="{ color: indicatorScoreColour(countryDataPurified[entry].score) }"
        >
          {{ Math.round(countryDataPurified[entry].score * 10) / 10 }}
        </h3>
      </section>
      <section v-if="quotesLength > 1">
        <p class="quote">
          {{ countryData.quotes[0].quote }}
          <sup 
            v-if="countryData.quotes[0].source" 
            class="quote-source_note"
          >
            {{ countryData.quotes[0].sourceNote }}
          </sup>
        </p>
      </section>
      <country-chart :chart-data="chartData" />
      <section v-if="quotesLength">
        <p class="quote">
          {{ countryData.quotes[quotesLength > 1 ? 1 : 0].quote }}
          <sup
            v-if="countryData.quotes[quotesLength > 1 ? 1 : 0].source"
            class="quote-source_note"
          >
            {{ countryData.quotes[quotesLength > 1 ? 1 : 0].sourceNote }}
          </sup>
        </p>
      </section>
    </article>
  </div>
</template>
<script>
import dataset from "@/assets/datasets/inclusion-indicators-2023.json";
import countrycodes from "@/assets/datasets/countries.json";
import CountryChart from "./CountryChart.vue";
import utils from "@/scripts/utils"

export default {
  name: "CountryPage",
  components: { CountryChart },
  computed: {
    fullCountryName() {
      return countrycodes[this.$route.params.country.toUpperCase()];
    },
    countryData() {
      let data = {
        ...dataset.data.find((el) => el.country === this.fullCountryName),
      };
      if (Array.isArray(data.quotes)) {
        let sourceCounter = 0;
        data.quotes.forEach((q) => {
          if (q.source) {
            sourceCounter++;
            q.sourceNote = sourceCounter;
          }
        });
      }
      return data;
    },
    labels() {
      return dataset.labels;
    },
    chartData() {
      let labels = [
        ...Object.keys(this.countryDataPurified).map((k) => this.labels[k]),
        "Average inclusion score",
      ];
      let country = {
        label: this.fullCountryName,
        data: [
          ...Object.keys(this.countryDataPurified).map((k) => {
            return Math.round(this.countryDataPurified[k].score * 10) / 10;
          }),
          this.countryAverage,
        ],
        borderColor: "#ffc704ff",
        backgroundColor: "#ffc7048c",
        borderWidth: 1,
      };
      let euro_avg = {
        label: "European average",
        data: [
          ...Object.keys(this.countryDataPurified).map((k) => {
            return Math.round(dataset.european_averages[k] * 10) / 10;
          }),
          dataset.european_averages.inclusion_score,
        ],
        borderColor: "#01aab5ff",
        backgroundColor: "#01aab58c",
        borderWidth: 1,
      };

      let config = {
        type: "horizontalBar",
        options: {
          indexAxis: "y",
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `How does ${this.fullCountryName} compare to the European average`,
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
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  suggestedMax: 10,
                },
              },
            ],
          },
        },
      };

      let data = {
        labels,
        datasets: [country, euro_avg],
      };

      return { ...config, data };
    },
    countryDataPurified() {
      let data = { ...this.countryData };
      delete data.country;
      delete data.in_eu;
      delete data.quotes;
      delete data.notes;
      return data;
    },
    quotesLength() {
      if (!Array.isArray(this.countryData.quotes)) return 0;
      return this.countryData.quotes.length;
    },
    countryFlag() {
      let imgImport = require.context("@/assets/flags", false, /\.svg$/);
      return imgImport(`./${this.$route.params.country}.svg`);
    },
    countryAverage() {
      let data = { ...this.countryDataPurified };
      let total = 0;
      Object.values(data).forEach((el) => {
        total += el.score;
      });
      return Math.round((total / Object.entries(data).length) * 10) / 10;
    },
  },
  mounted() {
    if (!this.fullCountryName || !this.countryData) {
      this.$router.push("/indicators");
    }
  },
  methods: {
    indicatorScoreColour(score) {
      return utils.indicatorScoreColour(score)
    }
  },
};
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

    img {
      height: 150px;
      width: auto !important;
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
        text-shadow: 0 0 8px rgba(0,0,0,.85);
        -webkit-text-stroke: 2px rgba(0,0,0,.35);
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

      & > * {
        margin: 0;
      }
    }

    &-score {
      margin: 0;
      font-size: 2rem;
      font-family: GilroyBold;
      text-shadow: 0 0 4px rgba(25,25,25,.55);
      -webkit-text-stroke: 2px rgba(0,0,0,.35);
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
}
</style>
