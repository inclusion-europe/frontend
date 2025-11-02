import { P as Preview, S as SeeAll } from './Preview-DfjQjWy_.mjs';
import { resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
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
  name: "E2R",
  components: {
    Preview,
    SeeAll
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
  const _component_SeeAll = resolveComponent("SeeAll");
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "easy_to_read-section" }, _attrs))} data-v-0e05526a><h2 class="section-title section-title--blue" data-v-0e05526a>Easy-to-read</h2><div class="easy_to_read-section-post_grid" data-v-0e05526a><div class="easy_to_read-section-post_grid-list" data-v-0e05526a><!--[-->`);
  ssrRenderList($props.posts.slice(0, 3), (post, i) => {
    _push(ssrRenderComponent(_component_Preview, {
      key: `e2r_post_${i}`,
      post,
      blue: ""
    }, null, _parent));
  });
  _push(`<!--]--></div>`);
  if ($props.posts.length > 3) {
    _push(`<div class="easy_to_read-section-post_grid-list" data-v-0e05526a><!--[-->`);
    ssrRenderList($props.posts.slice(3, 6), (post, i) => {
      _push(ssrRenderComponent(_component_Preview, {
        key: `e2r_post_${i}`,
        post,
        blue: ""
      }, null, _parent));
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if ($props.posts.length > 6) {
    _push(ssrRenderComponent(_component_SeeAll, {
      href: "/type/e2r",
      blue: "",
      big: ""
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(` See all easy-to-read articles `);
        } else {
          return [
            createTextVNode(" See all easy-to-read articles ")
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/E2R.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const E2R = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0e05526a"]]);

export { E2R as default };
//# sourceMappingURL=E2R-CjIf5ssD.mjs.map
