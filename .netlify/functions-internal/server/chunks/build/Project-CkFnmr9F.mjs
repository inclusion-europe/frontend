import { ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { V as VueMarkdown } from '../_/VueMarkdown.mjs';
import { P as Preview, S as SeeAll } from './Preview-DfjQjWy_.mjs';
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
  __name: "Project",
  __ssrInlineRender: true,
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const articles = ref([]);
    const publications = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "post-content" }, _attrs))} data-v-f20eb853><h3 class="section-title" data-v-f20eb853>${ssrInterpolate(__props.project.name)}</h3><p data-v-f20eb853>`);
      _push(ssrRenderComponent(unref(VueMarkdown), {
        source: __props.project.content,
        options: { html: true }
      }, null, _parent));
      _push(`</p><section class="section__low-spacing deinst_videos-section" data-v-f20eb853>`);
      if ((_b = (_a = __props.project) == null ? void 0 : _a.videos) == null ? void 0 : _b.length) {
        _push(`<div class="videos-grid" data-v-f20eb853><!--[-->`);
        ssrRenderList(__props.project.videos, (video, i) => {
          _push(`<iframe width="640" height="360"${ssrRenderAttr("src", `https://www.youtube.com/embed/${video}`)} data-v-f20eb853></iframe>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
      if ((_d = (_c = __props.project) == null ? void 0 : _c.articles) == null ? void 0 : _d.length) {
        _push(`<section class="section__low-spacing grid-section" data-v-f20eb853><h4 class="section-title" data-v-f20eb853>Articles</h4><div class="article_grid" data-v-f20eb853><!--[-->`);
        ssrRenderList(unref(articles), (article) => {
          _push(ssrRenderComponent(Preview, {
            key: `article_${article.idx}`,
            post: article,
            blue: ""
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
        _push(ssrRenderComponent(SeeAll, {
          href: `/tag/${__props.project.seeAll.tag}`,
          blue: "",
          big: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` See all articles about ${ssrInterpolate(__props.project.seeAll.linkCopy)}`);
            } else {
              return [
                createTextVNode(" See all articles about " + toDisplayString(__props.project.seeAll.linkCopy), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      if ((_f = (_e = __props.project) == null ? void 0 : _e.publications) == null ? void 0 : _f.length) {
        _push(`<section class="section__low-spacing grid-section" data-v-f20eb853><h4 class="section-title" data-v-f20eb853>Publications</h4><div class="article_grid" data-v-f20eb853><!--[-->`);
        ssrRenderList(unref(publications), (article) => {
          _push(ssrRenderComponent(Preview, {
            key: `article_${article.idx}`,
            post: article,
            blue: "",
            noPicture: ""
          }, null, _parent));
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Projects/Project.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Project = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f20eb853"]]);

export { Project as default };
//# sourceMappingURL=Project-CkFnmr9F.mjs.map
