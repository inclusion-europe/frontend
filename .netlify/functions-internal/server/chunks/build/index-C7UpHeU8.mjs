import { ref, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, d as useMainStore, h as _imports_0$2, c as useRuntimeConfig } from './server.mjs';
import Hero from './index-DCwW_-4o.mjs';
import E2R from './E2R-CjIf5ssD.mjs';
import Articles from './Articles-Buw_VQRe.mjs';
import Publications from './Publications-CPcbnvTy.mjs';
import Events from './Events-D_KPNoh-.mjs';
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
import './Highlights-BSyNZF1r.mjs';
import './Preview-DfjQjWy_.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useMainStore();
    const config = useRuntimeConfig();
    const notLive = config.public.notlive;
    const isHydrated = ref(false);
    computed(() => store.isLoading);
    const posts = computed(() => store.getPosts);
    const e2r_articles = computed(() => {
      return posts.value.filter(
        (post) => {
          var _a, _b;
          return ["e2r_article"].includes(post.article_type) || ((_a = post.tags) == null ? void 0 : _a.includes("easy to read")) || ((_b = post.tags) == null ? void 0 : _b.includes("easy-to-read"));
        }
      ).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
    const highlights = computed(() => {
      return posts.value.filter((post) => post.highlighted).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ).slice(0, 3);
    });
    const publications = computed(() => {
      return posts.value.filter((post) => ["report"].includes(post.article_type)).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
    const articles = computed(() => {
      return posts.value.filter((post) => ["news", "blogpost"].includes(post.article_type)).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
    const events = computed(() => {
      return posts.value.filter((post) => ["event"].includes(post.article_type)).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-41a9b25b>`);
      if (!unref(isHydrated) || _ctx.pending && !unref(notLive)) {
        _push(`<div class="loading" data-v-41a9b25b><img${ssrRenderAttr("src", _imports_0$2)} data-v-41a9b25b></div>`);
      } else if (!unref(notLive)) {
        _push(`<!--[-->`);
        if (unref(highlights).length) {
          _push(ssrRenderComponent(unref(Hero), { highlights: unref(highlights) }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(e2r_articles).length) {
          _push(ssrRenderComponent(unref(E2R), { posts: unref(e2r_articles) }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        {
          _push(`<!---->`);
        }
        if (unref(articles).length) {
          _push(ssrRenderComponent(unref(Articles), { posts: unref(articles) }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(events).length) {
          _push(ssrRenderComponent(Events, { posts: unref(events) }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(publications).length) {
          _push(ssrRenderComponent(unref(Publications), { posts: unref(publications) }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<h1 class="maint" data-v-41a9b25b> The website is currently under maintenance, check back soon! </h1>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-41a9b25b"]]);

export { index as default };
//# sourceMappingURL=index-C7UpHeU8.mjs.map
