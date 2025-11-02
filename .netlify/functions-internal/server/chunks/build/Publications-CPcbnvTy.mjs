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
  name: "PublicationsSection",
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
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "publications-section" }, _attrs))} data-v-73fa450c><h2 class="section-title section-title--pink" data-v-73fa450c>Reports</h2><div class="publications-section-publication_grid" data-v-73fa450c><div class="publications-section-publication_grid-list" data-v-73fa450c><!--[-->`);
  ssrRenderList($props.posts.slice(0, 3), (publication, i) => {
    _push(ssrRenderComponent(_component_Preview, {
      key: `publications_publication_${i}`,
      post: publication,
      pink: ""
    }, null, _parent));
  });
  _push(`<!--]--></div>`);
  if ($props.posts.length > 3) {
    _push(`<div class="publications-section-publication_grid-list" data-v-73fa450c><!--[-->`);
    ssrRenderList($props.posts.slice(3, 6), (publication, i) => {
      _push(ssrRenderComponent(_component_Preview, {
        key: `publications_publication_${i}`,
        post: publication,
        "no-picture": "",
        pink: ""
      }, null, _parent));
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if ($props.posts.length > 6) {
    _push(ssrRenderComponent(_component_SeeAll, {
      href: "/type/reports",
      big: ""
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(` See all reports `);
        } else {
          return [
            createTextVNode(" See all reports ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/Publications.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Publications = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-73fa450c"]]);

export { Publications as default };
//# sourceMappingURL=Publications-CPcbnvTy.mjs.map
