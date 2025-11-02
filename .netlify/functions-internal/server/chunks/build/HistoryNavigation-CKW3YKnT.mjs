import { _ as _export_sfc, I as IeButton } from './server.mjs';
import { resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
  name: "HistoryNavigation",
  components: {
    IeButton
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    selected: {
      type: Number,
      default: -1
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ie_button = resolveComponent("ie-button");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "history_navigation" }, _attrs))} data-v-fd3466ea><!--[-->`);
  ssrRenderList($props.items, (item, i) => {
    _push(ssrRenderComponent(_component_ie_button, {
      key: "history_nav-" + i,
      onClick: ($event) => _ctx.$emit("showItem", i),
      boxed: "",
      small: "",
      white: $props.selected !== i,
      pink: $props.selected === i
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(item.title)}`);
        } else {
          return [
            createTextVNode(toDisplayString(item.title), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/History/HistoryNavigation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HistoryNavigation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-fd3466ea"]]);

export { HistoryNavigation as default };
//# sourceMappingURL=HistoryNavigation-CKW3YKnT.mjs.map
