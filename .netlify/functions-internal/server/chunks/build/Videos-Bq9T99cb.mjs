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
  name: "VideosSection",
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
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "videos-section" }, _attrs))} data-v-1459cf48><h2 class="section-title section-title--pink" data-v-1459cf48>Videos</h2><div class="videos-section-video_grid" data-v-1459cf48><!--[-->`);
  ssrRenderList(_ctx.videos, (video, i) => {
    _push(ssrRenderComponent(_component_Preview, {
      key: `videos_article_${i}`,
      post: video,
      video: ""
    }, null, _parent));
  });
  _push(`<!--]-->`);
  _push(ssrRenderComponent(_component_SeeAll, {
    href: "#",
    big: ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` See all videos `);
      } else {
        return [
          createTextVNode(" See all videos ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/Videos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Videos = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-1459cf48"]]);

export { Videos as default };
//# sourceMappingURL=Videos-Bq9T99cb.mjs.map
