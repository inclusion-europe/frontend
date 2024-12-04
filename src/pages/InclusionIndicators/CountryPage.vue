<template>
    <div class="post_page">
        <ie-button @click="$router.push('/indicators')" blue boxed small>
            Back to the Inclusion Indicators page
        </ie-button>
        <div class="year-selector" v-if="otherYears.length > 1">
            <IeButton
                v-for="(year, i) in otherYears"
                rounded
                boxed
                :white="selectedYear != year"
                :pink="selectedYear == year"
                :key="`year-selector-button-${i}`"
                @click="$router.push(year)"
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
                        {{ labels[entry] }}
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
                    <span
                        v-html="
                            countryData.quotes[quotesLength > 1 ? 1 : 0].quote
                        "
                    />
                    <sup
                        v-if="
                            countryData.quotes[quotesLength > 1 ? 1 : 0].source
                        "
                        class="quote-source_note"
                    >
                        {{
                            countryData.quotes[quotesLength > 1 ? 1 : 0]
                                .sourceNote
                        }}
                    </sup>
                </p>
            </section>
            <country-table
                :table-data="countryData.reported_numbers"
                :year="selectedYear"
            />
            <div class="additional_notes" v-if="countryData.additional_notes">
                <h4>Additional notes:</h4>
                <p>{{ countryData.additional_notes }}</p>
            </div>
        </article>
        <div class="quote_sources" v-if="quoteSources.length">
            <p v-for="(src, i) in quoteSources" :key="'quotesource_' + i">
                <sup>{{ i + 1 }}</sup>
                <span v-html="src" />
            </p>
        </div>
    </div>
</template>
<script>
import countrycodes from '@/assets/datasets/countries.json';
import CountryChart from './CountryChart.vue';
import CountryTable from './CountryTable.vue';
import IeButton from '@/elements/Button.vue';
import utils from '@/scripts/utils';

export default {
    name: 'CountryPage',
    components: {
        CountryChart,
        CountryTable,
        IeButton,
    },
    computed: {
        availableYears() {
            return process.env.VUE_APP_INDICATORS_YEARS.split(',');
        },
        dataset() {
            const datasets = require.context(
                '@/assets/datasets/',
                false,
                /\.json$/,
            );
            return datasets(`./inclusion-indicators-${this.selectedYear}.json`);
        },
        countryData() {
            const data = {
                ...this.dataset.data.find(
                    (el) => el.country === this.fullCountryName,
                ),
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
        },
        quoteSources() {
            const srcs = [];
            for (let i = 0; i < this.countryData.quotes.length; i++) {
                if (
                    Object.prototype.hasOwnProperty.call(
                        this.countryData.quotes[i],
                        'source',
                    )
                ) {
                    srcs.push(this.countryData.quotes[i].source);
                }
            }

            return srcs;
        },
        otherYears() {
            return utils.findOtherCountryIndicatorYears(
                this.availableYears,
                this.fullCountryName,
            );
        },
        fullCountryName() {
            return countrycodes[this.$route.params.country.toUpperCase()];
        },
        selectedYear() {
            return this.$route.params.year;
        },
        labels() {
            return this.dataset.labels;
        },
        chartData() {
            const labels = [
                ...Object.keys(this.countryScores).map((k) => this.labels[k]),
                'Average inclusion score',
            ];
            const country = {
                label: this.fullCountryName,
                data: [
                    ...Object.keys(this.countryScores).map(
                        (k) =>
                            Math.round(this.countryScores[k].score * 10) / 10,
                    ),
                    this.countryAverage,
                ],
                borderColor: '#ffc704ff',
                backgroundColor: '#ffc7048c',
                borderWidth: 1,
            };
            const euroAvg = {
                label: 'European average',
                data: [
                    ...Object.keys(this.countryScores).map(
                        (k) =>
                            Math.round(this.dataset.european_averages[k] * 10) /
                            10,
                    ),
                    this.dataset.european_averages.inclusion_score,
                ],
                borderColor: '#01aab5ff',
                backgroundColor: '#01aab58c',
                borderWidth: 1,
            };

            const config = {
                type: 'horizontalBar',
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
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

            const data = {
                labels,
                datasets: [country, euroAvg],
            };

            return { ...config, data };
        },
        countryScores() {
            return this.countryData.scores;
        },
        quotesLength() {
            if (!Array.isArray(this.countryData.quotes)) return 0;
            return this.countryData.quotes.length;
        },
        countryAverage() {
            const data = { ...this.countryScores };
            let total = 0;
            Object.values(data).forEach((el) => {
                total += el.score;
            });
            return Math.round((total / Object.entries(data).length) * 10) / 10;
        },
    },
    mounted() {
        if (!this.fullCountryName || !this.countryData) {
            this.$router.push('/indicators');
        }
    },
    methods: {
        indicatorScoreColour(score) {
            return utils.indicatorScoreColour(score);
        },
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
