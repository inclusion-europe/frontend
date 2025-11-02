import { _ as _export_sfc, e as useRouter, f as useRoute, h as _imports_0$2, I as IeButton, H as navigateTo, c as useRuntimeConfig, b as utils } from './server.mjs';
import { useSSRContext, ref, computed, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { c as countrycodes, a as useFetch } from './countries-AosiVuF2.mjs';
import { Chart } from 'chart.js/auto';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import '@iconify/utils';
import 'consola/core';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';
import 'vue-router';
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';
import 'vue3-toastify';
import '@iconify/utils/lib/css/icon';

const _sfc_main$2 = {
  name: "CountryChart",
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  mounted() {
    const ctx = (void 0).getElementById("country-chart");
    new Chart(ctx, this.chartData);
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<canvas${ssrRenderAttrs(mergeProps({ id: "country-chart" }, _attrs))}></canvas>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("elements/CountryChart.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const CountryChart = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {
  name: "CountryTable",
  props: {
    tableData: {
      type: Object,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "reported_numbers" }, _attrs))} data-v-0e366073><table class="reported_numbers-table" data-v-0e366073><tbody data-v-0e366073><tr data-v-0e366073><th colspan="2" data-v-0e366073> Reported numbers of people with intellectual disabilities in </th></tr><tr data-v-0e366073><td data-v-0e366073>Mainstream education</td><td data-v-0e366073>${ssrInterpolate($props.tableData.mainstream_education)}${ssrInterpolate("*".repeat($props.tableData.mainstream_education_note + 1))}</td></tr><tr data-v-0e366073><td data-v-0e366073>Special education</td><td data-v-0e366073>${ssrInterpolate($props.tableData.special_education)}${ssrInterpolate("*".repeat($props.tableData.special_education_note + 1))}</td></tr><tr data-v-0e366073><td data-v-0e366073>No education</td><td data-v-0e366073>${ssrInterpolate($props.tableData.no_education)}${ssrInterpolate("*".repeat($props.tableData.no_education_note + 1))}</td></tr><tr class="spacer-row" data-v-0e366073><td data-v-0e366073></td><td data-v-0e366073></td></tr><tr data-v-0e366073><td data-v-0e366073>Larger institutions</td><td data-v-0e366073>${ssrInterpolate($props.tableData.larger_institutions)}${ssrInterpolate("*".repeat($props.tableData.larger_institutions_note + 1))}</td></tr><tr data-v-0e366073><td data-v-0e366073>Smaller institutions</td><td data-v-0e366073>${ssrInterpolate($props.tableData.smaller_institutions)}${ssrInterpolate("*".repeat($props.tableData.smaller_institutions_note + 1))}</td></tr>`);
  if ($props.year > 2023) {
    _push(`<tr data-v-0e366073><td data-v-0e366073>Small care homes</td><td data-v-0e366073>${ssrInterpolate($props.tableData.small_care_homes)}${ssrInterpolate("*".repeat($props.tableData.small_care_homes_note + 1))}</td></tr>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<tr data-v-0e366073><td data-v-0e366073>Psychiatric hospitals</td><td data-v-0e366073>${ssrInterpolate($props.tableData.psychiatric_hospitals)}${ssrInterpolate("*".repeat($props.tableData.psychiatric_hospitals_note + 1))}</td></tr>`);
  if ($props.year > 2023) {
    _push(`<tr data-v-0e366073><td data-v-0e366073>Living with family</td><td data-v-0e366073>${ssrInterpolate($props.tableData.living_with_family)}${ssrInterpolate("*".repeat($props.tableData.living_with_family_note + 1))}</td></tr>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.year > 2023) {
    _push(`<tr data-v-0e366073><td data-v-0e366073>Living in their own home</td><td data-v-0e366073>${ssrInterpolate($props.tableData.living_in_own_place)}${ssrInterpolate("*".repeat($props.tableData.living_in_own_place_note + 1))}</td></tr>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.year > 2023) {
    _push(`<tr data-v-0e366073><td data-v-0e366073>In foster care</td><td data-v-0e366073>${ssrInterpolate($props.tableData.in_foster_care)}${ssrInterpolate("*".repeat($props.tableData.in_foster_care_note + 1))}</td></tr>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.year > 2023) {
    _push(`<tr data-v-0e366073><td data-v-0e366073>Homeless</td><td data-v-0e366073>${ssrInterpolate($props.tableData.homeless)}${ssrInterpolate("*".repeat($props.tableData.homeless_note + 1))}</td></tr>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</tbody></table><div class="reported_numbers-notes" data-v-0e366073><!--[-->`);
  ssrRenderList($props.tableData.notes, (note, i) => {
    _push(`<p data-v-0e366073>${ssrInterpolate("*".repeat(i + 1))} ${ssrInterpolate(note)}</p>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("elements/CountryTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CountryTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0e366073"]]);
const _sfc_main = {
  __name: "[year]",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    useRouter();
    const route = useRoute();
    config.public.indicatorsYears.split(",");
    const dataset = ref({ data: [], labels: {}, european_averages: {} });
    const loading = ref(true);
    const otherYears = ref([]);
    const countryData = computed(() => {
      const data = {
        ...dataset.value.data.find((el) => el.country === fullCountryName.value)
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
      var _a, _b;
      const srcs = [];
      for (let i = 0; i < ((_b = (_a = countryData == null ? void 0 : countryData.value) == null ? void 0 : _a.quotes) == null ? void 0 : _b.length); i++) {
        if (Object.prototype.hasOwnProperty.call(
          countryData.value.quotes[i],
          "source"
        )) {
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
        "Average inclusion score"
      ];
      const country = {
        label: fullCountryName.value,
        axis: "y",
        data: [
          ...Object.keys(countryScores.value).map(
            (k) => Math.round(countryScores.value[k].score * 10) / 10
          ),
          countryAverage.value
        ],
        borderColor: "#ffc704ff",
        backgroundColor: "#ffc7048c",
        borderWidth: 1
      };
      const euroAvg = {
        label: "European average",
        axis: "y",
        data: [
          ...Object.keys(countryScores.value).map(
            (k) => Math.round(dataset.value.european_averages[k] * 10) / 10
          ),
          dataset.value.european_averages.inclusion_score
        ],
        borderColor: "#01aab5ff",
        backgroundColor: "#01aab58c",
        borderWidth: 1
      };
      const data = {
        labels,
        datasets: [country, euroAvg]
      };
      const config2 = {
        type: "bar",
        data,
        options: {
          indexAxis: "y",
          responsive: true,
          plugins: {
            legend: {
              position: "top"
            },
            title: {
              display: true,
              text: `How does ${fullCountryName.value} compare to the European average`
            }
          },
          layout: {
            padding: {
              left: 0,
              right: 100,
              top: 0,
              bottom: 0
            }
          },
          scales: {
            x: {
              min: 0,
              max: 10
            }
          }
        }
      };
      return { ...config2, data };
    });
    const countryScores = computed(() => {
      if (!countryData.value.scores)
        return {};
      return countryData.value.scores;
    });
    const quotesLength = computed(() => {
      if (!Array.isArray(countryData.value.quotes))
        return 0;
      return countryData.value.quotes.length;
    });
    const countryAverage = computed(() => {
      const data = { ...countryScores.value };
      let total = 0;
      Object.values(data).forEach((el) => {
        total += el.score;
      });
      return Math.round(total / Object.entries(data).length * 10) / 10;
    });
    watch(
      selectedYear,
      (val) => {
        useFetch(`/datasets/inclusion-indicators-${val}.json`, "$aQBLPp9vCE").then((res) => {
          dataset.value = res.data.value;
          loading.value = false;
        });
      },
      { immediate: true }
    );
    const indicatorScoreColour = (score) => {
      return utils.indicatorScoreColour(score);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "post_page" }, _attrs))} data-v-52302415>`);
      if (unref(loading)) {
        _push(`<div class="loading" data-v-52302415><img${ssrRenderAttr("src", _imports_0$2)} data-v-52302415></div>`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(IeButton, {
          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/indicators"),
          blue: "",
          boxed: "",
          small: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Back to the Inclusion Indicators page `);
            } else {
              return [
                createTextVNode(" Back to the Inclusion Indicators page ")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(otherYears).length > 1) {
          _push(`<div class="year-selector" data-v-52302415><!--[-->`);
          ssrRenderList(unref(otherYears), (year, i) => {
            _push(ssrRenderComponent(IeButton, {
              rounded: "",
              boxed: "",
              white: unref(selectedYear) != year,
              pink: unref(selectedYear) == year,
              key: `year-selector-button-${i}`,
              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(year)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(year)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(year), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<article class="country-page" data-v-52302415><header data-v-52302415><h1 data-v-52302415>${ssrInterpolate(unref(fullCountryName))}</h1><div class="country-avg" data-v-52302415><h2 class="country-avg--score" style="${ssrRenderStyle({
          color: indicatorScoreColour(unref(countryAverage))
        })}" data-v-52302415>${ssrInterpolate(unref(countryAverage))}</h2><h5 data-v-52302415>out of 10</h5></div></header><!--[-->`);
        ssrRenderList(Object.keys(unref(countryScores)), (entry, i) => {
          _push(`<section class="category" data-v-52302415><div class="category-copy_block" data-v-52302415><h4 data-v-52302415>${ssrInterpolate(unref(computedLabels)[entry])}</h4><p data-v-52302415>${ssrInterpolate(unref(countryScores)[entry].copy)}</p></div><h3 class="category-score" style="${ssrRenderStyle({
            color: indicatorScoreColour(unref(countryScores)[entry].score)
          })}" data-v-52302415>${ssrInterpolate(Math.round(unref(countryScores)[entry].score * 10) / 10)}</h3></section>`);
        });
        _push(`<!--]-->`);
        if (unref(quotesLength) > 1) {
          _push(`<section data-v-52302415><p class="quote" data-v-52302415><span data-v-52302415>${(_a = unref(countryData).quotes[0].quote) != null ? _a : ""}</span>`);
          if (unref(countryData).quotes[0].source) {
            _push(`<sup class="quote-source_note" data-v-52302415>${ssrInterpolate(unref(countryData).quotes[0].sourceNote)}</sup>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(CountryChart, { "chart-data": unref(chartData) }, null, _parent));
        if (unref(quotesLength)) {
          _push(`<section data-v-52302415><p class="quote" data-v-52302415><span data-v-52302415>${(_b = unref(countryData).quotes[unref(quotesLength) > 1 ? 1 : 0].quote) != null ? _b : ""}</span>`);
          if (unref(countryData).quotes[unref(quotesLength) > 1 ? 1 : 0].source) {
            _push(`<sup class="quote-source_note" data-v-52302415>${ssrInterpolate(unref(countryData).quotes[unref(quotesLength) > 1 ? 1 : 0].sourceNote)}</sup>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(CountryTable, {
          "table-data": unref(countryData).reported_numbers,
          year: +unref(selectedYear)
        }, null, _parent));
        if (unref(countryData).additional_notes) {
          _push(`<div class="additional_notes" data-v-52302415><h4 data-v-52302415>Additional notes:</h4><p data-v-52302415>${ssrInterpolate(unref(countryData).additional_notes)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
        if (unref(quoteSources).length) {
          _push(`<div class="quote_sources" data-v-52302415><!--[-->`);
          ssrRenderList(unref(quoteSources), (src, i) => {
            _push(`<p data-v-52302415><sup data-v-52302415>${ssrInterpolate(i + 1)}</sup><span data-v-52302415>${src != null ? src : ""}</span></p>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Indicators/[country]/[year].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _year_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-52302415"]]);

export { _year_ as default };
//# sourceMappingURL=_year_-BFnJmFku.mjs.map
