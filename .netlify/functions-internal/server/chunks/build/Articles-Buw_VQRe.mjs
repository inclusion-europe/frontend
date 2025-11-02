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
  name: "ArticlesSection",
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
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "articles-section" }, _attrs))}><h2 class="section-title section-title--pink">News</h2><div class="articles-section-article_grid"><div class="articles-section-article_grid-list"><!--[-->`);
  ssrRenderList($props.posts.slice(0, 3), (article, i) => {
    _push(ssrRenderComponent(_component_Preview, {
      key: `articles_article_${i}`,
      post: article,
      pink: ""
    }, null, _parent));
  });
  _push(`<!--]--></div>`);
  if ($props.posts.length > 3) {
    _push(`<div class="articles-section-article_grid-list"><!--[-->`);
    ssrRenderList($props.posts.slice(3, 6), (article, i) => {
      _push(ssrRenderComponent(_component_Preview, {
        key: `articles_article_${i}`,
        post: article,
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
      href: "/type/articles",
      pink: "",
      big: ""
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(` See all articles `);
        } else {
          return [
            createTextVNode(" See all articles ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/Articles.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Articles = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Articles as default };
//# sourceMappingURL=Articles-Buw_VQRe.mjs.map
