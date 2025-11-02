import { ref, computed, withAsyncContext, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { P as PostList } from './PostList-DxBpMc4E.mjs';
import { f as useRoute, g as useSeoMeta, c as useRuntimeConfig, J as useMyFetch, b as utils } from './server.mjs';
import './Preview-DfjQjWy_.mjs';
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
  __name: "[search]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const config = useRuntimeConfig();
    const posts = ref([]);
    const searchTerm = computed(() => route.params.search);
    const pageTitle = computed(
      () => `Search results for "${searchTerm.value}" | ${config.public.defaultTitle}`
    );
    const pageDescription = computed(
      () => `Search results for "${searchTerm.value}" on Inclusion Europe. Find articles, publications, and content about intellectual disabilities and inclusion.`
    );
    const pageUrl = computed(() => `https://www.inclusion.eu${route.path}`);
    useSeoMeta({
      title: pageTitle,
      description: pageDescription,
      ogTitle: pageTitle,
      ogDescription: pageDescription,
      ogImage: "https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg",
      ogUrl: pageUrl,
      ogType: "website",
      twitterCard: "summary_large_image",
      twitterTitle: pageTitle,
      twitterDescription: pageDescription,
      twitterImage: "https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg",
      robots: "noindex"
      // Prevent indexing search result pages
    });
    const loadPosts = async () => {
      try {
        const res = await useMyFetch(`/posts/search/${route.params.search}`);
        posts.value = utils.treatPosts(res);
      } catch (error) {
        console.error("Failed to load search results:", error);
        posts.value = [];
      }
    };
    [__temp, __restore] = withAsyncContext(() => loadPosts()), await __temp, __restore();
    watch(() => route.params.search, loadPosts);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(PostList, mergeProps({ posts: unref(posts) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search/[search].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_search_-CiwN1KHL.mjs.map
