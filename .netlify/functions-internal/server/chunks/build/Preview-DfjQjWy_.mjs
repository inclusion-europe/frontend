import { useSSRContext, mergeProps, resolveComponent, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main$2 = {
  name: "ArrowIcon",
  props: {
    blue: {
      type: Boolean,
      default: false
    },
    pink: {
      type: Boolean,
      default: false
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    viewBox: "0 0 22 10",
    class: `arrow-${$props.blue ? "blue" : $props.pink ? "pink" : "black"}`
  }, _attrs))} data-v-a46d5595><path d="M20.8,3.4l-2.7-2.9c-0.3-0.3-0.8-0.3-1.1,0s-0.3,0.8,0,1.1l2.1,2.3H1c-0.4,0-0.8,0.3-0.8,0.8S0.6,5.5,1,5.5
      h18.3l-2.2,2.4c-0.3,0.3-0.3,0.8,0,1.1c0.1,0.1,0.3,0.2,0.5,0.2c0.3,0,0.5-0.1,0.5-0.3L20.8,6C21.5,5.3,21.5,4.1,20.8,3.4z" data-v-a46d5595></path></svg>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("elements/Arrow.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Arrow = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-a46d5595"]]);
const _sfc_main$1 = {
  __name: "SeeAll",
  __ssrInlineRender: true,
  props: {
    big: {
      type: Boolean,
      default: false
    },
    pink: {
      type: Boolean,
      default: true
    },
    blue: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        class: `see_all${__props.blue ? " see_all--blue" : __props.pink ? " see_all--pink" : ""}${__props.big ? " see_all--big" : ""}`,
        href: __props.href
      }, _attrs))} data-v-acc7d477><span data-v-acc7d477>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
      _push(ssrRenderComponent(Arrow, {
        blue: __props.blue,
        pink: __props.pink
      }, null, _parent));
      _push(`</a>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("elements/SeeAll.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SeeAll = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-acc7d477"]]);
const _imports_0 = "data:image/svg+xml,%3csvg%20width='70'%20height='69'%20viewBox='0%200%2070%2069'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3.70557%2034.4136V59.0322C3.70557%2063.4527%208.32351%2066.3555%2012.3069%2064.4389L63.4748%2039.8204C68.0063%2037.6401%2068.0063%2031.1872%2063.4748%2029.0069L12.3069%204.38839C8.3235%202.47184%203.70557%205.37463%203.70557%209.79514V34.4136Z'%20fill='white'%20fill-opacity='0.6'/%3e%3cpath%20d='M2.20557%2034.4136V59.0322C2.20557%2064.5578%207.978%2068.1863%2012.9573%2065.7906L64.1251%2041.1721C69.7896%2038.4468%2069.7895%2030.3805%2064.1251%2027.6552L12.9573%203.0367C7.97798%200.64101%202.20557%204.26951%202.20557%209.79514V34.4136Z'%20stroke='black'%20stroke-opacity='0.6'%20stroke-width='3'/%3e%3c/svg%3e";
const _sfc_main = {
  name: "PreviewBlock",
  components: {
    SeeAll
  },
  props: {
    big: {
      type: Boolean,
      default: false
    },
    stack: {
      type: Boolean,
      default: false
    },
    post: {
      type: Object,
      required: true
    },
    noPicture: {
      type: Boolean,
      default: false
    },
    blue: {
      type: Boolean,
      default: false
    },
    pink: {
      type: Boolean,
      default: true
    },
    video: {
      type: Boolean,
      default: false
    },
    full: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    overtakeNoPicture() {
      var _a;
      return this.noPicture || !((_a = this.post.picture) == null ? void 0 : _a.picture);
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_SeeAll = resolveComponent("SeeAll");
  _push(ssrRenderComponent(_component_router_link, mergeProps({
    class: ["preview", {
      "preview--full": $props.full,
      "preview--big": $props.big,
      "preview--stack": $props.stack,
      "preview--blue": $props.blue,
      "preview--pink": $props.pink,
      "preview--has_picture": !$options.overtakeNoPicture
    }],
    to: `${$props.post.url}`
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      var _a, _b;
      if (_push2) {
        if ($props.big || $props.full) {
          _push2(`<h3 class="preview-title" data-v-9447bc08${_scopeId}>${ssrInterpolate($props.post.title)}</h3>`);
        } else {
          _push2(`<!---->`);
        }
        if (!$options.overtakeNoPicture && ((_a = $props.post.picture) == null ? void 0 : _a.picture)) {
          _push2(`<div class="preview-picture" data-v-9447bc08${_scopeId}><img class="preview-picture-photo"${ssrRenderAttr("src", $props.post.picture.picture)}${ssrRenderAttr("alt", $props.post.picture.alt || `Picture for ${$props.post.title}`)} data-v-9447bc08${_scopeId}>`);
          if ($props.video) {
            _push2(`<img class="preview-picture-video"${ssrRenderAttr("src", _imports_0)} alt="Play button overlay" data-v-9447bc08${_scopeId}>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="preview-content" data-v-9447bc08${_scopeId}>`);
        if (!$props.big && !$props.full) {
          _push2(`<h3 class="preview-title" data-v-9447bc08${_scopeId}>${ssrInterpolate($props.post.title)}</h3>`);
        } else {
          _push2(`<!---->`);
        }
        if ($props.post.excerpt) {
          _push2(`<p class="preview-excerpt" data-v-9447bc08${_scopeId}>${ssrInterpolate($props.post.excerpt)}</p>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(ssrRenderComponent(_component_SeeAll, {
          href: `${$props.post.url}`,
          blue: $props.blue,
          big: $props.big
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`${ssrInterpolate($props.video ? "Watch now" : "Read more")}`);
            } else {
              return [
                createTextVNode(toDisplayString($props.video ? "Watch now" : "Read more"), 1)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          $props.big || $props.full ? (openBlock(), createBlock("h3", {
            key: 0,
            class: "preview-title"
          }, toDisplayString($props.post.title), 1)) : createCommentVNode("", true),
          !$options.overtakeNoPicture && ((_b = $props.post.picture) == null ? void 0 : _b.picture) ? (openBlock(), createBlock("div", {
            key: 1,
            class: "preview-picture"
          }, [
            createVNode("img", {
              class: "preview-picture-photo",
              src: $props.post.picture.picture,
              alt: $props.post.picture.alt || `Picture for ${$props.post.title}`
            }, null, 8, ["src", "alt"]),
            $props.video ? (openBlock(), createBlock("img", {
              key: 0,
              class: "preview-picture-video",
              src: _imports_0,
              alt: "Play button overlay"
            })) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          createVNode("div", { class: "preview-content" }, [
            !$props.big && !$props.full ? (openBlock(), createBlock("h3", {
              key: 0,
              class: "preview-title"
            }, toDisplayString($props.post.title), 1)) : createCommentVNode("", true),
            $props.post.excerpt ? (openBlock(), createBlock("p", {
              key: 1,
              class: "preview-excerpt"
            }, toDisplayString($props.post.excerpt), 1)) : createCommentVNode("", true),
            createVNode(_component_SeeAll, {
              href: `${$props.post.url}`,
              blue: $props.blue,
              big: $props.big
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString($props.video ? "Watch now" : "Read more"), 1)
              ]),
              _: 1
            }, 8, ["href", "blue", "big"])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("elements/Preview.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Preview = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-9447bc08"]]);

export { Preview as P, SeeAll as S };
//# sourceMappingURL=Preview-DfjQjWy_.mjs.map
