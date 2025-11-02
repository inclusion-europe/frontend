import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { useSSRContext, ref, withAsyncContext, computed, resolveComponent, mergeProps, unref, withCtx, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, watch, createSlots, createVNode, renderList } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, d as useMainStore, e as useRouter, f as useRoute, b as utils, g as useSeoMeta, h as _imports_0$2, I as IeButton, c as useRuntimeConfig } from './server.mjs';
import { V as VueMarkdown } from '../_/VueMarkdown.mjs';
import { _ as __nuxt_component_1, a as __nuxt_component_5 } from './Table-CatYFNsP.mjs';
import { useWindowSize } from '@vueuse/core';
import { u as useLazyFetch, a as useFetch, c as countrycodes } from './countries-AosiVuF2.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import '@iconify/utils';
import 'consola/core';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';
import 'vue-router';
import 'tailwind-merge';
import '@iconify/vue';
import 'vue3-toastify';
import '@iconify/utils/lib/css/icon';
import 'markdown-it';

const _imports_1 = "" + buildAssetsURL("e2r.CoOarkud.png");
const _sfc_main$3 = {
  __name: "EvolutionIndicator",
  __ssrInlineRender: true,
  props: {
    evo: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const altText = computed(() => {
      if (props.evo > 0) {
        return "Better than last year";
      }
      if (props.evo < 0) {
        return "Worse than last year";
      }
      return "Same as last year";
    });
    const src = computed(() => {
      if (props.evo > 0) {
        return "/assets/arrow-better.svg";
      }
      if (props.evo < 0) {
        return "/assets/arrow-worse.svg";
      }
      return "/assets/arrow-no-change.svg";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<img${ssrRenderAttrs(mergeProps({
        style: __props.evo != void 0 ? null : { display: "none" },
        class: "table-evo-indicator",
        src: unref(src),
        alt: unref(altText)
      }, _attrs))} data-v-2c39b5c7>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("elements/EvolutionIndicator.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const EvolutionIndicator = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-2c39b5c7"]]);
const _sfc_main$2 = {
  __name: "IndicatorsCountries",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const availableYears = config.public.indicatorsYears.split(",");
    const fields = [
      "voteDecide",
      "liveIndep",
      "housingSupport",
      "education",
      "employment",
      "healthcare",
      "representation"
    ];
    const visibleColumns = ref([]);
    const windowSize = useWindowSize();
    const selectedYear = ref(availableYears[availableYears.length - 1]);
    const countryData = ref({ data: [], labels: {} });
    const prevYearData = ref({ data: [], labels: {} });
    const indicatorEvolution = (country, score, indicator, isAverageCell = false, fields2 = null) => {
      if (!prevYearData.value.data.length)
        return void 0;
      const previousYearData = prevYearData.value.data.find(
        (datapoint) => datapoint.country === country
      );
      if (!previousYearData) {
        return void 0;
      }
      if (!isAverageCell) {
        if (!(indicator in previousYearData.scores)) {
          return void 0;
        }
        return utils.scoreRoundFn(score) - utils.scoreRoundFn(previousYearData.scores[indicator].score);
      }
      return score - utils.averageFn(previousYearData, fields2);
    };
    watch(
      selectedYear,
      (val) => {
        useFetch(`/datasets/inclusion-indicators-${val}.json`, "$jNMmmbl2NP").then((res) => {
          countryData.value = res.data.value;
        });
        if (availableYears.includes((+val - 1).toString())) {
          useFetch(`/datasets/inclusion-indicators-${+val - 1}.json`, "$TBBzxR6nS2").then(
            (res) => {
              prevYearData.value = res.data.value;
            }
          );
        } else {
          prevYearData.value = { data: [], labels: {} };
        }
      },
      { immediate: true }
    );
    function selectColumn(i) {
      const inArray = visibleColumns.value.indexOf(i);
      if (inArray > -1)
        visibleColumns.value.splice(inArray, 1);
      else
        visibleColumns.value.push(i);
    }
    function selectYear(y) {
      selectedYear.value = availableYears[y];
    }
    function countryCode(row) {
      const returnedCountryCode = Object.keys(countrycodes)[Object.values(countrycodes).findIndex((el) => el === row.country)];
      return returnedCountryCode || null;
    }
    function countryUrl(row) {
      return `/indicators/${countryCode(row).toLowerCase()}/${selectedYear.value}`;
    }
    const dataset = computed(() => {
      const arr = countryData.value.data;
      arr.forEach((country) => {
        Object.assign(country, {
          average: utils.scoreRoundFn(utils.averageFn(country, fields))
        });
        Object.keys(country.scores).forEach((field) => {
          country[field] = utils.scoreRoundFn(country.scores[field].score);
        });
      });
      return arr;
    });
    const isMobile = computed(() => windowSize.width.value < 1024);
    const getScore = (row, field) => {
      return row.scores[field] ? utils.scoreRoundFn(row.scores[field].score) : "";
    };
    const getEvolution = (row, field, isAverage = false) => {
      let score = row.scores[field] ? row.scores[field].score : void 0;
      if (isAverage)
        score = row.average;
      if (score === void 0)
        return "";
      let evo = indicatorEvolution(row.country, score, field, isAverage, fields);
      if (evo === void 0)
        return null;
      return evo;
    };
    const extraColumns = computed(
      () => fields.map((field) => ({
        key: field,
        sortable: true,
        label: countryData.value.labels[field],
        direction: "desc"
      }))
    );
    const shownColumns = computed(() => [
      ...extraColumns.value.filter((x, i) => visibleColumns.value.includes(i))
    ]);
    const columns = computed(() => [
      {
        key: "country",
        sortable: true,
        label: countryData.value.labels.country
      },
      {
        key: "average",
        sortable: true,
        label: countryData.value.labels.average,
        direction: "desc"
      },
      ...shownColumns.value
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_1;
      const _component_UTable = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "countries-ranking" }, _attrs))} data-v-87f1cf4e>`);
      if (unref(availableYears).length > 1) {
        _push(`<div class="data-selector" data-v-87f1cf4e><!--[-->`);
        ssrRenderList(unref(availableYears), (year, i) => {
          _push(ssrRenderComponent(IeButton, {
            rounded: "",
            boxed: "",
            white: unref(selectedYear) != year,
            pink: unref(selectedYear) == year,
            key: `year-selector-button-${i}`,
            onClick: ($event) => selectYear(i)
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
      _push(`<div class="data-selector" data-v-87f1cf4e><!--[-->`);
      ssrRenderList(unref(extraColumns), (field, i) => {
        _push(ssrRenderComponent(IeButton, {
          rounded: "",
          boxed: "",
          white: !unref(visibleColumns).includes(i),
          key: `selector-button-${i}`,
          onClick: ($event) => selectColumn(i)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(field.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(field.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_UCard, {
        class: "w-full table-card",
        ui: {
          body: {
            padding: ""
          }
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UTable, {
              rows: unref(dataset),
              columns: unref(columns),
              class: "country-table",
              "sort-button": {
                variant: "transparent",
                align: "left"
              }
            }, createSlots({
              "country-data": withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="data-cell" data-v-87f1cf4e${_scopeId2}><a${ssrRenderAttr("href", countryUrl(row))} data-v-87f1cf4e${_scopeId2}>${ssrInterpolate(row.country)}</a></span>`);
                } else {
                  return [
                    createVNode("span", { class: "data-cell" }, [
                      createVNode("a", {
                        href: countryUrl(row)
                      }, toDisplayString(row.country), 9, ["href"])
                    ])
                  ];
                }
              }),
              "average-data": withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="data-cell" data-v-87f1cf4e${_scopeId2}>${ssrInterpolate(row.average)} `);
                  _push3(ssrRenderComponent(EvolutionIndicator, {
                    evo: getEvolution(row, "average", true)
                  }, null, _parent3, _scopeId2));
                  _push3(`</span>`);
                } else {
                  return [
                    createVNode("span", { class: "data-cell" }, [
                      createTextVNode(toDisplayString(row.average) + " ", 1),
                      createVNode(EvolutionIndicator, {
                        evo: getEvolution(row, "average", true)
                      }, null, 8, ["evo"])
                    ])
                  ];
                }
              }),
              _: 2
            }, [
              renderList(unref(shownColumns), (col) => {
                return {
                  name: `${col.key}-data`,
                  fn: withCtx(({ row, column }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="data-cell" data-v-87f1cf4e${_scopeId2}>${ssrInterpolate(getScore(row, column.key))} `);
                      _push3(ssrRenderComponent(EvolutionIndicator, {
                        evo: getEvolution(row, column.key)
                      }, null, _parent3, _scopeId2));
                      _push3(`</span>`);
                    } else {
                      return [
                        createVNode("span", { class: "data-cell" }, [
                          createTextVNode(toDisplayString(getScore(row, column.key)) + " ", 1),
                          createVNode(EvolutionIndicator, {
                            evo: getEvolution(row, column.key)
                          }, null, 8, ["evo"])
                        ])
                      ];
                    }
                  })
                };
              })
            ]), _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UTable, {
                rows: unref(dataset),
                columns: unref(columns),
                class: "country-table",
                "sort-button": {
                  variant: "transparent",
                  align: "left"
                }
              }, createSlots({
                "country-data": withCtx(({ row }) => [
                  createVNode("span", { class: "data-cell" }, [
                    createVNode("a", {
                      href: countryUrl(row)
                    }, toDisplayString(row.country), 9, ["href"])
                  ])
                ]),
                "average-data": withCtx(({ row }) => [
                  createVNode("span", { class: "data-cell" }, [
                    createTextVNode(toDisplayString(row.average) + " ", 1),
                    createVNode(EvolutionIndicator, {
                      evo: getEvolution(row, "average", true)
                    }, null, 8, ["evo"])
                  ])
                ]),
                _: 2
              }, [
                renderList(unref(shownColumns), (col) => {
                  return {
                    name: `${col.key}-data`,
                    fn: withCtx(({ row, column }) => [
                      createVNode("span", { class: "data-cell" }, [
                        createTextVNode(toDisplayString(getScore(row, column.key)) + " ", 1),
                        createVNode(EvolutionIndicator, {
                          evo: getEvolution(row, column.key)
                        }, null, 8, ["evo"])
                      ])
                    ])
                  };
                })
              ]), 1032, ["rows", "columns"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("elements/IndicatorsCountries.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const InclusionIndicatorsCountries = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-87f1cf4e"]]);
const _sfc_main$1 = {
  name: "E2RContent",
  components: {
    VueMarkdown
  },
  props: {
    content: {
      type: Array,
      required: true
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_vue_markdown = resolveComponent("vue-markdown");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "e2r-grid" }, _attrs))} data-v-f98267d3><!--[-->`);
  ssrRenderList($props.content, (entry, i) => {
    _push(`<!--[--><img${ssrRenderAttr("src", entry.pic)} data-v-f98267d3><div data-v-f98267d3>`);
    _push(ssrRenderComponent(_component_vue_markdown, {
      source: entry.text,
      options: { html: true }
    }, null, _parent));
    _push(`</div><!--]-->`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("elements/E2RContent.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const E2RContent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f98267d3"]]);
const _sfc_main = {
  __name: "[post]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const store = useMainStore();
    const router = useRouter();
    const route = useRoute();
    let postData = ref(null);
    let fetchError = ref(null);
    try {
      if (config.public.backendUrl && config.public.backendUrl !== "/") {
        const { data, error } = ([__temp, __restore] = withAsyncContext(() => useLazyFetch(`/post/slug/${route.params.post}`, {
          baseURL: config.public.backendUrl,
          transform: (res) => utils.treatPost(res),
          default: () => null,
          server: true
          // Ensure this runs on server for SEO
        }, "$TuOCaFkYXy")), __temp = await __temp, __restore(), __temp);
        postData = data;
        fetchError = error;
      }
    } catch (e) {
      console.error("API fetch failed:", e);
      fetchError.value = "API not available";
    }
    const post = computed(() => {
      if (postData.value) {
        return postData.value;
      }
      const storePost = store.getPost(route.params.post);
      if (storePost) {
        return storePost;
      }
      const fallbackPosts = {
        "education-rights": {
          title: "Education Rights for People with Intellectual Disabilities",
          excerpt: "Ensuring equal access to quality education for all people with intellectual disabilities across Europe.",
          picture: { picture: "https://www.inclusion-europe.eu/wp-content/uploads/2015/03/IMG_6977-410x370.jpeg" },
          content: "Education is a fundamental right for everyone, including people with intellectual disabilities.",
          article_type: "article"
        },
        "inclusion-stories": {
          title: "Stories of Inclusion: Living Independently in Europe",
          excerpt: "Real stories from people with intellectual disabilities who are living independently and participating fully in their communities.",
          picture: { picture: "https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg" },
          content: "These inspiring stories show what is possible when communities embrace inclusion.",
          article_type: "article"
        },
        "policy-changes": {
          title: "Policy Changes Needed for True Inclusion",
          excerpt: "Analyzing the policy changes needed across Europe to achieve genuine inclusion for people with intellectual disabilities.",
          picture: { picture: "https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg" },
          content: "Policy reform is essential for creating inclusive societies.",
          article_type: "article"
        }
      };
      const specificFallback = fallbackPosts[route.params.post];
      if (specificFallback) {
        return {
          ...specificFallback,
          slug: route.params.post,
          url: `/${route.params.post}`,
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        };
      }
      return {
        title: route.params.post.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        excerpt: `Learn about ${route.params.post.replace(/-/g, " ")} from Inclusion Europe - promoting rights and full participation for people with intellectual disabilities across Europe.`,
        picture: {
          picture: "https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg"
        },
        content: `This article discusses ${route.params.post.replace(/-/g, " ")} and its importance for people with intellectual disabilities in Europe.`,
        slug: route.params.post,
        url: `/${route.params.post}`,
        article_type: "article",
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      };
    });
    if (fetchError.value) {
      console.error("Failed to fetch post data:", fetchError.value);
    }
    const author = ref(null);
    const showE2R = ref(route.query.e2r === "1");
    const loading = computed(() => store.isLoading);
    const isIndicatorsPage = computed(() => {
      return route.path === "/indicators";
    });
    const isStaticPage = computed(() => {
      var _a;
      return ((_a = post.value) == null ? void 0 : _a.article_type) === "static_page";
    });
    const hasOtherContent = computed(() => {
      if (!post.value)
        return false;
      if (post.value.default_type === "e2r") {
        return !!post.value.content;
      }
      return !!post.value.content_e2r;
    });
    computed(() => {
      var _a;
      return (_a = post.value) == null ? void 0 : _a.author;
    });
    const defaultTitle = config.public.defaultTitle;
    const pageTitle = computed(
      () => {
        var _a;
        return ((_a = post.value) == null ? void 0 : _a.title) ? `${post.value.title} | ${defaultTitle}` : defaultTitle;
      }
    );
    const pageDescription = computed(
      () => {
        var _a;
        return ((_a = post.value) == null ? void 0 : _a.excerpt) || "Ambitions. Rights. Belonging. 20 million people with intellectual disabilities and their families in Europe.";
      }
    );
    const pageImage = computed(
      () => {
        var _a, _b;
        return ((_b = (_a = post.value) == null ? void 0 : _a.picture) == null ? void 0 : _b.picture) || "https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg";
      }
    );
    const pageUrl = computed(() => `https://www.inclusion.eu${route.path}`);
    useSeoMeta({
      title: pageTitle,
      description: pageDescription,
      ogTitle: pageTitle,
      ogDescription: pageDescription,
      ogImage: pageImage,
      ogUrl: pageUrl,
      ogType: "article",
      twitterCard: "summary_large_image",
      twitterTitle: pageTitle,
      twitterDescription: pageDescription,
      twitterImage: pageImage
    });
    {
      console.log("=== SEO Meta Debug ===");
      console.log("Environment:", "production");
      console.log("Backend URL:", config.public.backendUrl);
      console.log("Slug:", route.params.post);
      console.log("Has Post Data:", !!(postData == null ? void 0 : postData.value));
      console.log("Fetch Error:", fetchError == null ? void 0 : fetchError.value);
      console.log("Final Post:", !!post.value);
      console.log("Title:", pageTitle.value);
      console.log("Description:", pageDescription.value);
      console.log("Image:", pageImage.value);
      console.log("====================");
    }
    const toggleContentType = () => {
      showE2R.value = !showE2R.value;
      if (showE2R.value) {
        router.replace({ query: { e2r: 1 } });
      } else {
        router.replace({ query: {} });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["post_page", { indicators_page: unref(isIndicatorsPage) }]
      }, _attrs))} data-v-d283c04b>`);
      if (unref(loading) || _ctx.status === "pending") {
        _push(`<div class="loading" data-v-d283c04b><img${ssrRenderAttr("src", _imports_0$2)} data-v-d283c04b></div>`);
      } else {
        _push(`<!--[--><div class="post_page-header" data-v-d283c04b>`);
        if (unref(hasOtherContent)) {
          _push(ssrRenderComponent(IeButton, {
            blue: "",
            boxed: "",
            class: ["other_content-button", { "e2r-button": !unref(showE2R) }],
            e2r: !unref(showE2R),
            onClick: toggleContentType
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (!unref(showE2R)) {
                  _push2(`<img${ssrRenderAttr("src", _imports_1)} data-v-d283c04b${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(` ${ssrInterpolate(unref(showE2R) ? "Plain English" : "Easy-to-Read")} version `);
              } else {
                return [
                  !unref(showE2R) ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: _imports_1
                  })) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(unref(showE2R) ? "Plain English" : "Easy-to-Read") + " version ", 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><article data-v-d283c04b><header class="${ssrRenderClass({ "header--column": !unref(post).excerpt || unref(isStaticPage) })}" data-v-d283c04b><div class="header_texts" data-v-d283c04b><h1 data-v-d283c04b>${ssrInterpolate(unref(post).title)}</h1>`);
        if (((_a = unref(post).picture) == null ? void 0 : _a.picture) && unref(isStaticPage)) {
          _push(`<img${ssrRenderAttr("src", unref(post).picture.picture)}${ssrRenderAttr("alt", unref(post).picture.alt || `Picture for ${unref(post).title}`)} data-v-d283c04b>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(post).excerpt) {
          _push(`<h2 data-v-d283c04b>${ssrInterpolate(unref(post).excerpt)}</h2>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="header_info" data-v-d283c04b><span data-v-d283c04b> Published ${ssrInterpolate(unref(utils).formatDate(unref(post).created_at))} ${ssrInterpolate(unref(author) ? `by ${unref(author).first_name} ${unref(author).last_name}` : "")}</span></div></div>`);
        if (((_b = unref(post).picture) == null ? void 0 : _b.picture) && !unref(isStaticPage)) {
          _push(`<img${ssrRenderAttr("src", unref(post).picture.picture)}${ssrRenderAttr("alt", unref(post).picture.picture || `Picture for ${unref(post).title}`)} data-v-d283c04b>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</header><section class="post-content" data-v-d283c04b>`);
        if (unref(showE2R)) {
          _push(ssrRenderComponent(E2RContent, {
            content: unref(post).content_e2r
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(VueMarkdown), {
            source: unref(post).content,
            options: { html: true }
          }, null, _parent));
        }
        _push(`</section>`);
        if (unref(isIndicatorsPage)) {
          _push(`<section class="indicators-table" data-v-d283c04b><h4 data-v-d283c04b>Country ranking</h4>`);
          _push(ssrRenderComponent(InclusionIndicatorsCountries, null, null, _parent));
          _push(`</section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(post).tags) {
          _push(`<section class="post-tags" data-v-d283c04b><h3 data-v-d283c04b> Tags: <!--[-->`);
          ssrRenderList(unref(post).tags, (tag, i) => {
            _push(`<!--[-->`);
            _push(ssrRenderComponent(_component_router_link, {
              class: "tag",
              to: `/tag/${encodeURI(tag)}`
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(tag)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(tag), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            if (i < unref(post).tags.length - 1) {
              _push(`<span data-v-d283c04b> , </span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]--></h3></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article><!--]-->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[post].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _post_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d283c04b"]]);

export { _post_ as default };
//# sourceMappingURL=_post_-bJGQY2TE.mjs.map
