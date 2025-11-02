import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, I as IeButton } from './server.mjs';
import Highlights from './Highlights-BSyNZF1r.mjs';
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
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';
import 'vue3-toastify';
import '@iconify/utils/lib/css/icon';
import './Preview-DfjQjWy_.mjs';

const _imports_0 = "" + buildAssetsURL("hero-tagline.RdKlw5VN.png");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  props: {
    highlights: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "hero" }, _attrs))} data-v-ca89c6b7>`);
      _push(ssrRenderComponent(Highlights, { posts: __props.highlights }, null, _parent));
      _push(`<div class="hero-static" data-v-ca89c6b7><section class="hero-static-tagline" data-v-ca89c6b7><img${ssrRenderAttr("src", _imports_0)} alt="Ambitions. Rights. Belongings." class="hero-static-tagline-title" data-v-ca89c6b7></section><div class="donate-block" data-v-ca89c6b7><h3 data-v-ca89c6b7>Support our work</h3>`);
      _push(ssrRenderComponent(IeButton, {
        type: "link",
        href: "/donate",
        boxed: "",
        blue: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Donate here `);
          } else {
            return [
              createTextVNode(" Donate here ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/Hero/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Hero = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ca89c6b7"]]);

export { Hero as default };
//# sourceMappingURL=index-DCwW_-4o.mjs.map
