import Project from './Project-CkFnmr9F.mjs';
import { _ as _export_sfc, I as IeButton } from './server.mjs';
import { resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import '../_/VueMarkdown.mjs';
import 'markdown-it';
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

const projectsData = [
  {
    name: "Deinstitutionalization",
    videos: [
      "DjVy3lenHOc",
      "JI5wzJICbmA"
    ],
    articles: [
      15,
      84
    ],
    seeAll: {
      tag: "deinstitutionalisation",
      linkCopy: "deinstitutionalisation"
    },
    content: "Inclusion Europe reports on issues linked to institutionalisation of people with intellectual disabilities and raises awareness of solutions for more humane, person- centred and individualised support. Inclusion Europe advocates for inclusive policies and practices that foster community integration for people with intellectual disabilities. This includes advocating for the closure of institutions and the transition to community-based support."
  },
  {
    name: "Right to vote and decide",
    videos: [
      "JHJvLWqhFx4"
    ],
    articles: [
      17,
      47
    ],
    seeAll: {
      tag: "legal%20capacity",
      linkCopy: "the right to vote"
    },
    content: "Inclusion Europe develops advocacy campaigns about the right to vote of people with intellectual disabilities, especially those under guardianship, raising more awareness about lack of representation and restrictions to vote and to stand for elections in several EU countries."
  },
  {
    name: "Self-advocacy",
    articles: [
      77,
      50
    ],
    seeAll: {
      tag: "self-advocacy",
      linkCopy: "self-advocacy"
    },
    publications: [
      40,
      87
    ],
    content: "Inclusion Europe provides opportunities through various platforms for self-advocates to share their personal stories of success, resilience, and empowerment. Inclusion Europe set up the [European Platform of Self-Advocates](/about) (EPSA). EPSA helps make the self-advocacy movement in all European countries stronger. The platform represents self-advocacy groups in Europe. Being a member of EPSA teaches self-advocates how they can speak for themselves and advocate for the respect of their rights. Inclusion Europe produces easy to read and understand magazine called [Europe for us](/europe-for-us-magazine). It is published four times per year in English, French, German, Spanish, Romanian, Hungarian, Dutch and Italian."
  }
];
const _sfc_main = {
  name: "ProjectsPage",
  components: {
    Project,
    IeButton
  },
  computed: {
    projects() {
      return [...projectsData];
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_IeButton = resolveComponent("IeButton");
  const _component_Project = resolveComponent("Project");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "projects_page post_page" }, _attrs))} data-v-7d80cb52><article data-v-7d80cb52><header data-v-7d80cb52><div class="header_texts" data-v-7d80cb52><h1 data-v-7d80cb52>Projects</h1></div></header><section class="section__low-spacing projects-section" data-v-7d80cb52><div class="projects_buttons" data-v-7d80cb52>`);
  _push(ssrRenderComponent(_component_IeButton, {
    type: "link",
    href: "/together-plus-project",
    boxed: "",
    blue: ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Together + `);
      } else {
        return [
          createTextVNode(" Together + ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_IeButton, {
    type: "link",
    href: "/supporting-rights-and-inclusion-of-people-with-intellectual-disabilities-and-their-families-in-ukraine",
    boxed: "",
    blue: ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Ukraine support `);
      } else {
        return [
          createTextVNode(" Ukraine support ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_IeButton, {
    type: "link",
    href: "/judy-project",
    boxed: "",
    blue: ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` JUDY Project `);
      } else {
        return [
          createTextVNode(" JUDY Project ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_IeButton, {
    type: "link",
    href: "/unity",
    boxed: "",
    blue: ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Unity`);
      } else {
        return [
          createTextVNode("Unity")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_IeButton, {
    type: "link",
    href: "/self-determination-academy",
    boxed: "",
    blue: ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Self Determination Academy `);
      } else {
        return [
          createTextVNode(" Self Determination Academy ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></section><!--[-->`);
  ssrRenderList($options.projects, (project, i) => {
    _push(ssrRenderComponent(_component_Project, {
      key: `project_${i}`,
      project
    }, null, _parent));
  });
  _push(`<!--]--></article></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Projects/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-7d80cb52"]]);

export { index as default };
//# sourceMappingURL=index-B8HOZFuu.mjs.map
