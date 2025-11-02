import { useSSRContext, ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { P as Preview } from './Preview-DfjQjWy_.mjs';
import { _ as _export_sfc, f as useRoute, e as useRouter, L as useServerSeoMeta, g as useSeoMeta, u as useHead, c as useRuntimeConfig, a as __nuxt_component_0$5 } from './server.mjs';

const _sfc_main$1 = {
  __name: "PostsPagination",
  __ssrInlineRender: true,
  props: {
    length: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    const route = useRoute();
    const props = __props;
    const between = (x, min, max) => {
      return x >= min && x <= max;
    };
    const showExtraPage = (pageNr) => {
      if (pageNr <= 3)
        return false;
      if (pageNr >= this.props.length - 2)
        return false;
      const betweenMin = Math.ceil(this.props.length / 2) - 1;
      const betweenMax = Math.ceil(this.props.length / 2) + 1;
      if (this.between(pageNr, betweenMin, betweenMax))
        return false;
      return true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "posts_page-pagination-numbers" }, _attrs))} data-v-1436ed3f><span data-v-1436ed3f>Page:</span>`);
      if (props.currentPage > 1) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: {
            query: {
              ...unref(route).query,
              pageNr: props.currentPage - 1
            }
          },
          class: "posts_page-pagination-item"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Previous `);
            } else {
              return [
                createTextVNode(" Previous ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (props.length < 15) {
        _push(`<!--[-->`);
        ssrRenderList(new Array(props.length), (e, i) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: `page_button_${i + 1}`,
            to: {
              query: {
                ...unref(route).query,
                pageNr: i + 1
              }
            },
            class: ["posts_page-pagination-item", {
              "posts_page-pagination-item--active": props.currentPage === i + 1
            }]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(i + 1)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(i + 1), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(new Array(3), (e, i) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: `page_button_${i + 1}`,
            to: {
              query: {
                ...unref(route).query,
                pageNr: i + 1
              }
            },
            class: ["posts_page-pagination-item", {
              "posts_page-pagination-item--active": props.currentPage === i + 1
            }]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(i + 1)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(i + 1), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
        if (props.currentPage - 3 > 2) {
          _push(`<span data-v-1436ed3f> ... </span>`);
        } else {
          _push(`<!---->`);
        }
        if (between(props.currentPage, 3, Math.ceil(props.length / 2) - 1)) {
          _push(`<!--[-->`);
          ssrRenderList(new Array(3), (e, i) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              style: showExtraPage(props.currentPage - (1 - i)) ? null : { display: "none" },
              key: `page_button_${props.currentPage - (1 - i)}`,
              to: {
                query: {
                  ...unref(route).query,
                  pageNr: props.currentPage - (1 - i)
                }
              },
              class: ["posts_page-pagination-item", {
                "posts_page-pagination-item--active": props.currentPage === props.currentPage - (1 - i)
              }]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(props.currentPage - (1 - i))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(props.currentPage - (1 - i)), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (Math.abs(props.currentPage - (Math.ceil(props.length / 2) - 1)) > 1 && props.currentPage - 3 <= 2) {
          _push(`<span data-v-1436ed3f> ... </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(new Array(3), (e, i) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: `page_button_${Math.ceil(props.length / 2) - (1 - i)}`,
            to: {
              query: {
                ...unref(route).query,
                pageNr: Math.ceil(props.length / 2) - (1 - i)
              }
            },
            class: ["posts_page-pagination-item", {
              "posts_page-pagination-item--active": props.currentPage === Math.ceil(props.length / 2) - (1 - i)
            }]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(Math.ceil(props.length / 2) - (1 - i))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(Math.ceil(props.length / 2) - (1 - i)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
        if (Math.abs(props.currentPage - (Math.ceil(props.length / 2) + 1)) > 1 && props.length - 2 - props.currentPage <= 2) {
          _push(`<span data-v-1436ed3f> ... </span>`);
        } else {
          _push(`<!---->`);
        }
        if (between(
          props.currentPage,
          Math.ceil(props.length / 2) + 1,
          props.length - 2
        )) {
          _push(`<!--[-->`);
          ssrRenderList(new Array(3), (e, i) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              style: showExtraPage(props.currentPage - (1 - i)) ? null : { display: "none" },
              key: `page_button_${props.currentPage - (1 - i)}`,
              to: {
                query: {
                  ...unref(route).query,
                  pageNr: props.currentPage - (1 - i)
                }
              },
              class: ["posts_page-pagination-item", {
                "posts_page-pagination-item--active": props.currentPage === props.currentPage - (1 - i)
              }]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(props.currentPage - (1 - i))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(props.currentPage - (1 - i)), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (props.length - 2 - props.currentPage > 2) {
          _push(`<span data-v-1436ed3f> ... </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(new Array(3), (e, i) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: `page_button_${props.length - (2 - i)}`,
            to: {
              query: {
                ...unref(route).query,
                pageNr: props.length - (2 - i)
              }
            },
            class: ["posts_page-pagination-item", {
              "posts_page-pagination-item--active": props.currentPage === props.currentPage - (2 - i)
            }]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(props.length - (2 - i))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(props.length - (2 - i)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--><!--]-->`);
      }
      if (props.currentPage < props.length) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: {
            path: unref(route).path,
            query: {
              ...unref(route).query,
              pageNr: props.currentPage + 1
            }
          },
          class: "posts_page-pagination-item"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Next `);
            } else {
              return [
                createTextVNode(" Next ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PostsPagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PostsPagination = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1436ed3f"]]);
const _sfc_main = {
  __name: "PostList",
  __ssrInlineRender: true,
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const currentPage = ref(1);
    const pageLength = ref(9);
    const config = useRuntimeConfig();
    const route = useRoute();
    useRouter();
    const props = __props;
    const typeTitle = computed(() => {
      switch (route.params.type) {
        case "articles":
          return "Articles";
        case "e2r":
          return "Easy-to-Read articles";
        case "events":
          return "Events";
        case "reports":
          return "Reports";
        case "podcast":
          return "Podcasts";
        default:
          return "Posts";
      }
    });
    const currentPagePosts = computed(() => {
      return props.posts.slice(
        (currentPage.value - 1) * pageLength.value,
        currentPage.value * pageLength.value
      );
    });
    const pagesAmount = computed(() => {
      return Math.ceil(props.posts.length / pageLength.value);
    });
    const pageTitle = computed(() => {
      let returnee = (() => {
        switch (route.name) {
          case "tag-tag":
            return `Posts tagged "${route.params.tag}"`;
          case "search-search":
            return `Search results for "${route.params.search}"`;
          case "type-type":
            return typeTitle.value;
          default:
            return "Posts";
        }
      })();
      if (pagesAmount.value > 1) {
        returnee += ` - Page ${currentPage.value}`;
      }
      return returnee;
    });
    useServerSeoMeta({
      title: `${pageTitle.value} | ${config.public.defaultTitle}`,
      ogTitle: `${pageTitle.value} | ${config.public.defaultTitle}`
    });
    useSeoMeta({
      title: `${pageTitle.value} | ${config.public.defaultTitle}`,
      ogTitle: `${pageTitle.value} | ${config.public.defaultTitle}`
    });
    useHead({
      title: `${pageTitle.value} | ${config.public.defaultTitle}`
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "posts_page" }, _attrs))} data-v-c2d56d8e><h1 class="page_title" data-v-c2d56d8e>${ssrInterpolate(unref(pageTitle))}</h1><div class="posts_page-list" data-v-c2d56d8e><!--[-->`);
      ssrRenderList(unref(currentPagePosts), (post) => {
        _push(ssrRenderComponent(Preview, {
          key: `post_${post.idx}`,
          post,
          stack: ""
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
      if (props.posts.length > unref(pageLength)) {
        _push(`<div class="posts_page-pagination" data-v-c2d56d8e>`);
        _push(ssrRenderComponent(PostsPagination, {
          length: unref(pagesAmount),
          "current-page": unref(currentPage)
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(pagesAmount) > 1) {
        _push(`<div class="posts_page-pagination" data-v-c2d56d8e><span data-v-c2d56d8e> Go to page:</span><select data-v-c2d56d8e><option disabled${ssrRenderAttr("value", null)} selected data-v-c2d56d8e></option><!--[-->`);
        ssrRenderList(new Array(unref(pagesAmount)), (e, i) => {
          _push(`<option${ssrRenderAttr("value", i + 1)} data-v-c2d56d8e>${ssrInterpolate(i + 1)}</option>`);
        });
        _push(`<!--]--></select></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PostList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PostList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c2d56d8e"]]);

export { PostList as P };
//# sourceMappingURL=PostList-DxBpMc4E.mjs.map
