import { P as Preview } from './Preview-DfjQjWy_.mjs';
import { resolveComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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
  name: "HeroHighlights",
  components: {
    Preview
  },
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Preview = resolveComponent("Preview");
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "hero-highlights" }, _attrs))} data-v-a8ba1e7a><!--[-->`);
  ssrRenderList($props.posts, (post, i) => {
    _push(ssrRenderComponent(_component_Preview, {
      key: `highlight_post_${i}`,
      post
    }, null, _parent));
  });
  _push(`<!--]--></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/Hero/Highlights.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Highlights = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a8ba1e7a"]]);

export { Highlights as default };
//# sourceMappingURL=Highlights-BSyNZF1r.mjs.map
