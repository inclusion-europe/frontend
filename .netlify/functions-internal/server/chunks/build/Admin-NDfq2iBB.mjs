import { _ as _export_sfc, f as useRoute, s as useCookie, v as __nuxt_component_0$4 } from './server.mjs';
import { ref, unref, mergeProps, useSSRContext } from 'vue';
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
  __name: "Admin",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useCookie("im_auth_token", {
      maxAge: 2 * 60 * 60 * 1e3
    });
    useCookie("im_auth_state");
    const pageReady = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0$4;
      if (unref(pageReady)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin" }, _attrs))} data-v-56465971>`);
        _push(ssrRenderComponent(_component_NuxtPage, {
          "page-key": (route2) => route2.fullPath
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-56465971"]]);

export { Admin as default };
//# sourceMappingURL=Admin-NDfq2iBB.mjs.map
