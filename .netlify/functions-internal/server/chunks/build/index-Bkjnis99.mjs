import { useSSRContext, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main$1 = {
  __name: "StaffMember",
  __ssrInlineRender: true,
  props: {
    member: Object,
    big: Boolean,
    row: Boolean
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["staff_member", {
          "staff_member--big": props.big,
          "staff_member--no_pic": !props.member.image,
          "staff_member--row": props.row
        }]
      }, _attrs))} data-v-9f9858fa>`);
      if (props.member.image) {
        _push(`<div class="staff_member__image" data-v-9f9858fa><img${ssrRenderAttr("src", `/assets/staff/${props.member.image}`)}${ssrRenderAttr("alt", props.member.name)} data-v-9f9858fa></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="staff_member__info" data-v-9f9858fa>`);
      if (props.member.copy) {
        _push(`<p data-v-9f9858fa>${(_a = props.member.copy) != null ? _a : ""}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="staff_member__links" data-v-9f9858fa>`);
      if (props.member.email) {
        _push(`<a${ssrRenderAttr("href", `mailto:${props.member.email}`)} data-v-9f9858fa><span data-v-9f9858fa>${ssrInterpolate(props.member.email)}</span></a>`);
      } else {
        _push(`<!---->`);
      }
      if (props.member.linkedin) {
        _push(`<a${ssrRenderAttr("href", props.member.linkedin)} data-v-9f9858fa><span data-v-9f9858fa>Follow ${ssrInterpolate(props.member.name.split(" ")[0])} on LinkedIn</span></a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("elements/StaffMember.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const StaffMember = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-9f9858fa"]]);
const staff = [
  {
    name: "Jyrki Pinomaa",
    title: "President",
    email: "jyrki@inclusion.eu",
    copy: "<b>Jyrki Pinomaa</b> is the President of Inclusion Europe.\nJyrki has two sons with severe disabilities. Jyrki had been the president for Inclusion Finland, and worked for an association providing housing and services to people with intellectual disabilities.",
    image: "jyrki-pinomaa.jpg",
    inBoard: true,
    executive: true
  },
  {
    name: "L\xE1szl\xF3 Bercse",
    title: "Vice-President",
    copy: "<b>L\xE1szl\xF3 Bercse</b> is the Vice-President of Inclusion Europe, and chair of the European Platform of Self-Advocates.\nL\xE1szl\xF3 is also the co-chair of EFOESZ, Hungary.",
    image: "laszlo-bercse.jpg",
    inBoard: true,
    executive: true
  },
  {
    name: "Mateja de Reya",
    title: "Vice-President",
    copy: "<b>Mateja de Reya</b> is the Vice-President of Inclusion Europe representing family members.\nMateja is also the director of Zveza Sozitje, Slovenia.",
    image: "mateja-de-reya.jpg",
    inBoard: true,
    executive: true
  },
  {
    name: "Guillaume Jacquinot",
    title: "Secretary-General",
    copy: "<b>Guillaume Jacquinot</b> is a brother to his sister with intellectual disabilities. Guillaume was nominated to the Board by Inclusion Ireland.",
    image: "guillaume-jacquinot.jpg",
    inBoard: true,
    executive: true
  },
  {
    name: "Jeanne Nicklas-Faust",
    title: "Treasurer",
    copy: "<b>Jeanne Nicklas-Faust</b> is a mother of her daughter with intellectual disabiliteis. Jeanne is also Secretary-General of Lebenshilfe, Germany.",
    image: "jeanne-nicklas-faust.jpg",
    inBoard: true,
    executive: true
  },
  {
    name: "Andreas Zehetner",
    title: "Board Member",
    copy: "<b>Andreas Zehetner</b>,self-advocate with Lebenshilfe Austria.",
    inBoard: true
  },
  {
    name: "Camille Latimier",
    title: "Board Member",
    copy: "<b>Camille Latimier</b>, director of Inclusion Czechia.",
    inBoard: true
  },
  {
    name: "Cristina Schiratti",
    title: "Board Member",
    copy: "<b>Cristina Schiratti</b>, a mother to her daughter with intellectual disabilities. Board member of Anffas, Italy.",
    inBoard: true
  },
  {
    name: "Dana Migaliova",
    title: "Board Member",
    copy: "<b>Dana Migaliova</b>, a mother to her son with intellectual disabilities. President of Viltis, Lithuania.",
    inBoard: true
  },
  {
    name: "Oswald F\xF6llerer",
    title: "Board Member",
    copy: "<b>Oswald F\xF6llerer</b>, self-advocate with Self-Advocacy Centre in Vienna, Austria.",
    inBoard: true
  },
  {
    name: "Tania Damianova-Sabir",
    title: "Board Member",
    copy: "<b>Tania Damianova-Sabir</b>, a mother to her daughter with disabilities. Co-opted Board member.",
    inBoard: true
  },
  {
    name: "Milan \u0160ve\u0159epa",
    title: "Director",
    copy: "<b>Milan \u0160ve\u0159epa</b> is director of Inclusion Europe.\nBefore joining Inclusion Europe Milan worked on deinstitutionalisation in Czechia and in other countries in Central and Eastern Europe.",
    image: "milan-sverepa.jpg",
    email: "milan@inclusion.eu",
    linkedin: "https://www.linkedin.com/in/milan-sverepa"
  },
  {
    name: "Soufiane El Amrani",
    title: "Self-Advocate and Accessibility Expert",
    copy: "<b>Soufiane El Amrani</b> is self-advocate, and accessibility expert of Inclusion Europe.\nSoufiane has been working with the European Platform of Self-Advocates for many years.\nSoufiane is at Council of Inclusion International since November 2020.",
    email: "soufiane@inclusion.eu",
    image: "soufiane-el-amrani.jpg",
    linkedin: "https://www.linkedin.com/in/soufiane-el-amrani-90623a81/"
  },
  {
    name: "Freddy Jussien",
    title: "Advocacy Lead",
    copy: "<b>Freddy Jussien</b> is advocacy lead of Inclusion Europe. Before starting at Inclusion Europe, Freddy used to work at European Association of Service Providers for Persons with Disabilities.",
    email: "freddy@inclusion.eu",
    image: "freddy-jussien.jpg",
    linkedin: "https://www.linkedin.com/in/freddy-jussien-332467169/"
  },
  {
    name: "Sandra Marques",
    title: "Self-Advocacy Expert",
    copy: "<b>Sandra Marques</b> is the self-advocacy expert of Inclusion Europe.\nSandra supports the European Platform of Self-Advocates.",
    email: "sandra@inclusion.eu",
    image: "sandra-marques.jpg",
    linkedin: "https://www.linkedin.com/in/sandra-marques-13689019/"
  },
  {
    name: "Inge Volleberg",
    title: "Coordinator and Researcher",
    copy: "<b>Inge Volleberg</b> is coordinator and researcher, responsible for Inclusion indicators reports.",
    email: "inge@inclusion.eu",
    image: "inge-volleberg.jpg",
    linkedin: "https://www.linkedin.com/in/inge-volleberg-213864191/"
  },
  {
    name: "Helena Lambsdorff",
    title: "Coordinator",
    copy: '<b>Helena Lambsdorff</b> is communication officer.\n Helena is also the coordinator of the <a href="https://deinstitutionalisation.com/" target="_blank">EEG</a> (<a href="mailto:coordinator@deinstitutionalisation.com">coordinator@deinstitutionalisation.com</a>).',
    email: "helena@inclusion.eu",
    image: "helena-lambsdorff.jpg",
    linkedin: "https://www.linkedin.com/in/helena-lambsdorff-85bbba339/"
  },
  {
    name: "Nina Vertot",
    title: "Finance Officer",
    copy: "<b>Nina Vertot</b> is finance officer of Inclusion Europe.",
    email: "nina@inclusion.eu",
    image: "nina-vertot.jpg"
  }
];
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const execBoard = staff.filter((member) => member.inBoard && member.executive);
    const nonExecBoard = staff.filter(
      (member) => member.inBoard && !member.executive
    );
    const staffMembers = staff.filter((member) => !member.inBoard);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "board_page post_page" }, _attrs))} data-v-28634317><article data-v-28634317><header data-v-28634317><div class="header_texts" data-v-28634317><h1 data-v-28634317>Board and staff</h1></div></header><section data-v-28634317><h2 class="section-title section-title--blue" data-v-28634317>Board</h2><p data-v-28634317> The Board is elected by Inclusion Europe members to represent their interests and to lead the work of the organisation. <br data-v-28634317> The Board is composed, as minimum: </p><ul data-v-28634317><li data-v-28634317> 3 self-advocates, appointed by the European Platform of Self-Advocates </li><li data-v-28634317>3 family members of people with intellectual disabilities</li><li data-v-28634317>Other advocates representing our members.</li></ul><div class="staff-grid" data-v-28634317><!--[-->`);
      ssrRenderList(unref(execBoard), (member, i) => {
        _push(ssrRenderComponent(StaffMember, {
          key: `exec_board_${i}`,
          member,
          big: ""
        }, null, _parent));
      });
      _push(`<!--]--></div><h3 class="section-subtitle section-subtitle--blue" data-v-28634317> Non-executive Board members </h3><div class="staff-list" data-v-28634317><!--[-->`);
      ssrRenderList(unref(nonExecBoard), (member, i) => {
        _push(ssrRenderComponent(StaffMember, {
          key: `non_exec_board_${i}`,
          member
        }, null, _parent));
      });
      _push(`<!--]--></div></section><section data-v-28634317><h2 class="section-title section-title--blue" data-v-28634317>Staff</h2><div class="staff-list" data-v-28634317><!--[-->`);
      ssrRenderList(unref(staffMembers), (member, i) => {
        _push(ssrRenderComponent(StaffMember, {
          key: `staff_member_${i}`,
          member,
          row: ""
        }, null, _parent));
      });
      _push(`<!--]--></div></section></article></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Staff/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-28634317"]]);

export { index as default };
//# sourceMappingURL=index-Bkjnis99.mjs.map
