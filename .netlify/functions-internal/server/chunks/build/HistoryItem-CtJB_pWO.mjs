import { V as VueMarkdown } from '../_/VueMarkdown.mjs';
import { resolveComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import 'markdown-it';
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
  name: "HistoryItem",
  components: {
    VueMarkdown
  },
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_vue_markdown = resolveComponent("vue-markdown");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "history_item" }, _attrs))} data-v-3e9303e5><h1 class="item_title" data-v-3e9303e5>${ssrInterpolate($props.title)}</h1>`);
  _push(ssrRenderComponent(_component_vue_markdown, {
    source: $props.content,
    options: { html: true }
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/History/HistoryItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HistoryItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-3e9303e5"]]);

export { HistoryItem as default };
//# sourceMappingURL=HistoryItem-CtJB_pWO.mjs.map
