import { _ as _export_sfc, I as IeButton } from './server.mjs';
import { resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = {
  name: "CurrentHighlights",
  components: {
    IeButton
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_IeButton = resolveComponent("IeButton");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "currently" }, _attrs))} data-v-9b2d9bc2><section class="currently-events" data-v-9b2d9bc2><h2 class="currently-events-title section-title" data-v-9b2d9bc2> Meetings &amp; Conferences </h2><p data-v-9b2d9bc2>No events planned yet.</p></section><section class="currently-campaigns" data-v-9b2d9bc2><h2 class="currently-campaigns-title section-title" data-v-9b2d9bc2>Campaigns</h2><div class="currently-campaigns-grid" data-v-9b2d9bc2>`);
  _push(ssrRenderComponent(_component_IeButton, {
    boxed: "",
    blue: ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` End segregation `);
      } else {
        return [
          createTextVNode(" End segregation ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_IeButton, {
    boxed: "",
    blue: ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Help Ukraine `);
      } else {
        return [
          createTextVNode(" Help Ukraine ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_IeButton, {
    boxed: "",
    pink: "",
    class: "full-grid"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Support our work `);
      } else {
        return [
          createTextVNode(" Support our work ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_IeButton, {
    boxed: "",
    blue: "",
    class: "full-grid"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` All campaigns `);
      } else {
        return [
          createTextVNode(" All campaigns ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></section></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/Hero/Currently.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Currently = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-9b2d9bc2"]]);

export { Currently as default };
//# sourceMappingURL=Currently-DhOvUBIt.mjs.map
