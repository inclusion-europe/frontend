import { m as mergeConfig, A as select, l as appConfig, p as __nuxt_component_0$2, n as useUI, B as useInjectButtonGroup, o as useFormGroup, t as twMerge, r as get, _ as _export_sfc } from './server.mjs';
import * as e$1 from 'vue';
import { defineComponent, toRef, computed, useSSRContext, ref, onMounted, watchEffect, cloneVNode, h, Fragment, provide, onUnmounted, unref, inject, mergeProps } from 'vue';
import { twJoin } from 'tailwind-merge';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass, ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';

const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.select, select);
const _sfc_main = defineComponent({
  components: {
    UIcon: __nuxt_component_0$2
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Object],
      default: ""
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    loadingIcon: {
      type: String,
      default: () => config.default.loadingIcon
    },
    leadingIcon: {
      type: String,
      default: null
    },
    trailingIcon: {
      type: String,
      default: () => config.default.trailingIcon
    },
    trailing: {
      type: Boolean,
      default: false
    },
    leading: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    padded: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: null,
      validator(value) {
        return Object.keys(config.size).includes(value);
      }
    },
    color: {
      type: String,
      default: () => config.default.color,
      validator(value) {
        return [...appConfig.ui.colors, ...Object.keys(config.color)].includes(value);
      }
    },
    variant: {
      type: String,
      default: () => config.default.variant,
      validator(value) {
        return [
          ...Object.keys(config.variant),
          ...Object.values(config.color).flatMap((value2) => Object.keys(value2))
        ].includes(value);
      }
    },
    optionAttribute: {
      type: String,
      default: "label"
    },
    valueAttribute: {
      type: String,
      default: "value"
    },
    selectClass: {
      type: String,
      default: null
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit, slots }) {
    const { ui, attrs } = useUI("select", toRef(props, "ui"), config, toRef(props, "class"));
    const { size: sizeButtonGroup, rounded } = useInjectButtonGroup({ ui, props });
    const { emitFormChange, inputId, color, size: sizeFormGroup, name } = useFormGroup(props, config);
    const size = computed(() => {
      var _a;
      return (_a = sizeButtonGroup.value) != null ? _a : sizeFormGroup.value;
    });
    const onInput = (event) => {
      emit("update:modelValue", event.target.value);
    };
    const onChange = (event) => {
      emit("change", event.target.value);
      emitFormChange();
    };
    const guessOptionValue = (option) => {
      return get(option, props.valueAttribute, "");
    };
    const guessOptionText = (option) => {
      return get(option, props.optionAttribute, "");
    };
    const normalizeOption = (option) => {
      if (["string", "number", "boolean"].includes(typeof option)) {
        return {
          [props.valueAttribute]: option,
          [props.optionAttribute]: option
        };
      }
      return {
        ...option,
        [props.valueAttribute]: guessOptionValue(option),
        [props.optionAttribute]: guessOptionText(option)
      };
    };
    const normalizedOptions = computed(() => {
      return props.options.map((option) => normalizeOption(option));
    });
    const normalizedOptionsWithPlaceholder = computed(() => {
      if (!props.placeholder) {
        return normalizedOptions.value;
      }
      return [
        {
          [props.valueAttribute]: "",
          [props.optionAttribute]: props.placeholder,
          disabled: true
        },
        ...normalizedOptions.value
      ];
    });
    const normalizedValue = computed(() => {
      const normalizeModelValue = normalizeOption(props.modelValue);
      const foundOption = normalizedOptionsWithPlaceholder.value.find((option) => option[props.valueAttribute] === normalizeModelValue[props.valueAttribute]);
      if (!foundOption) {
        return "";
      }
      return foundOption[props.valueAttribute];
    });
    const selectClass = computed(() => {
      var _a, _b;
      const variant = ((_b = (_a = ui.value.color) == null ? void 0 : _a[color.value]) == null ? void 0 : _b[props.variant]) || ui.value.variant[props.variant];
      return twMerge(twJoin(
        ui.value.base,
        ui.value.form,
        rounded.value,
        ui.value.size[size.value],
        props.padded ? ui.value.padding[size.value] : "p-0",
        variant == null ? void 0 : variant.replaceAll("{color}", color.value),
        (isLeading.value || slots.leading) && ui.value.leading.padding[size.value],
        (isTrailing.value || slots.trailing) && ui.value.trailing.padding[size.value]
      ), props.placeholder && !props.modelValue && ui.value.placeholder, props.selectClass);
    });
    const isLeading = computed(() => {
      return props.icon && props.leading || props.icon && !props.trailing || props.loading && !props.trailing || props.leadingIcon;
    });
    const isTrailing = computed(() => {
      return props.icon && props.trailing || props.loading && props.trailing || props.trailingIcon;
    });
    const leadingIconName = computed(() => {
      if (props.loading) {
        return props.loadingIcon;
      }
      return props.leadingIcon || props.icon;
    });
    const trailingIconName = computed(() => {
      if (props.loading && !isLeading.value) {
        return props.loadingIcon;
      }
      return props.trailingIcon || props.icon;
    });
    const leadingWrapperIconClass = computed(() => {
      return twJoin(
        ui.value.icon.leading.wrapper,
        ui.value.icon.leading.pointer,
        ui.value.icon.leading.padding[size.value]
      );
    });
    const leadingIconClass = computed(() => {
      return twJoin(
        ui.value.icon.base,
        color.value && appConfig.ui.colors.includes(color.value) && ui.value.icon.color.replaceAll("{color}", color.value),
        ui.value.icon.size[size.value],
        props.loading && ui.value.icon.loading
      );
    });
    const trailingWrapperIconClass = computed(() => {
      return twJoin(
        ui.value.icon.trailing.wrapper,
        ui.value.icon.trailing.pointer,
        ui.value.icon.trailing.padding[size.value]
      );
    });
    const trailingIconClass = computed(() => {
      return twJoin(
        ui.value.icon.base,
        color.value && appConfig.ui.colors.includes(color.value) && ui.value.icon.color.replaceAll("{color}", color.value),
        ui.value.icon.size[size.value],
        props.loading && !isLeading.value && ui.value.icon.loading
      );
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      inputId,
      normalizedOptionsWithPlaceholder,
      normalizedValue,
      isLeading,
      isTrailing,
      // eslint-disable-next-line vue/no-dupe-keys
      selectClass,
      leadingIconName,
      leadingIconClass,
      leadingWrapperIconClass,
      trailingIconName,
      trailingIconClass,
      trailingWrapperIconClass,
      onInput,
      onChange
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UIcon = __nuxt_component_0$2;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _attrs))} data-v-db8f1118><select${ssrRenderAttrs(mergeProps({
    id: _ctx.inputId,
    name: _ctx.name,
    value: _ctx.modelValue,
    required: _ctx.required,
    disabled: _ctx.disabled,
    class: _ctx.selectClass
  }, _ctx.attrs))} data-v-db8f1118><!--[-->`);
  ssrRenderList(_ctx.normalizedOptionsWithPlaceholder, (option, index) => {
    _push(`<!--[-->`);
    if (option.children) {
      _push(`<optgroup${ssrRenderAttr("value", option[_ctx.valueAttribute])}${ssrRenderAttr("label", option[_ctx.optionAttribute])} data-v-db8f1118><!--[-->`);
      ssrRenderList(option.children, (childOption, index2) => {
        _push(`<option${ssrRenderAttr("value", childOption[_ctx.valueAttribute])}${ssrIncludeBooleanAttr(childOption[_ctx.valueAttribute] === _ctx.normalizedValue) ? " selected" : ""}${ssrIncludeBooleanAttr(childOption.disabled) ? " disabled" : ""} data-v-db8f1118>${ssrInterpolate(childOption[_ctx.optionAttribute])}</option>`);
      });
      _push(`<!--]--></optgroup>`);
    } else {
      _push(`<option${ssrRenderAttr("value", option[_ctx.valueAttribute])}${ssrIncludeBooleanAttr(option[_ctx.valueAttribute] === _ctx.normalizedValue) ? " selected" : ""}${ssrIncludeBooleanAttr(option.disabled) ? " disabled" : ""} data-v-db8f1118>${ssrInterpolate(option[_ctx.optionAttribute])}</option>`);
    }
    _push(`<!--]-->`);
  });
  _push(`<!--]--></select>`);
  if (_ctx.isLeading && _ctx.leadingIconName || _ctx.$slots.leading) {
    _push(`<span class="${ssrRenderClass(_ctx.leadingWrapperIconClass)}" data-v-db8f1118>`);
    ssrRenderSlot(_ctx.$slots, "leading", {
      disabled: _ctx.disabled,
      loading: _ctx.loading
    }, () => {
      _push(ssrRenderComponent(_component_UIcon, {
        name: _ctx.leadingIconName,
        class: _ctx.leadingIconClass
      }, null, _parent));
    }, _push, _parent);
    _push(`</span>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.isTrailing && _ctx.trailingIconName || _ctx.$slots.trailing) {
    _push(`<span class="${ssrRenderClass(_ctx.trailingWrapperIconClass)}" data-v-db8f1118>`);
    ssrRenderSlot(_ctx.$slots, "trailing", {
      disabled: _ctx.disabled,
      loading: _ctx.loading
    }, () => {
      _push(ssrRenderComponent(_component_UIcon, {
        name: _ctx.trailingIconName,
        class: _ctx.trailingIconClass,
        "aria-hidden": "true"
      }, null, _parent));
    }, _push, _parent);
    _push(`</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Select.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-db8f1118"]]);
function d(u2, e2, r2) {
  let i2 = ref(r2 == null ? void 0 : r2.value), f2 = computed(() => u2.value !== void 0);
  return [computed(() => f2.value ? u2.value : i2.value), function(t) {
    return f2.value || (i2.value = t), e2 == null ? void 0 : e2(t);
  }];
}
var r$1;
let n = Symbol("headlessui.useid"), o$3 = 0;
const i = (r$1 = e$1.useId) != null ? r$1 : function() {
  return e$1.inject(n, () => `${++o$3}`)();
};
function s$1(t) {
  e$1.provide(n, t);
}
function o$2(e2) {
  var l;
  if (e2 == null || e2.value == null)
    return null;
  let n2 = (l = e2.value.$el) != null ? l : e2.value;
  return n2 instanceof Node ? n2 : null;
}
function u$2(r2, n2, ...a) {
  if (r2 in n2) {
    let e2 = n2[r2];
    return typeof e2 == "function" ? e2(...a) : e2;
  }
  let t = new Error(`Tried to handle "${r2}" but there is no handler defined. Only defined handlers are: ${Object.keys(n2).map((e2) => `"${e2}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t, u$2), t;
}
function r(t, e2) {
  if (t)
    return t;
  let n2 = e2 != null ? e2 : "button";
  if (typeof n2 == "string" && n2.toLowerCase() === "button")
    return "button";
}
function s(t, e2) {
  let n2 = ref(r(t.value.type, t.value.as));
  return onMounted(() => {
    n2.value = r(t.value.type, t.value.as);
  }), watchEffect(() => {
    var u2;
    n2.value || o$2(e2) && o$2(e2) instanceof HTMLButtonElement && !((u2 = o$2(e2)) != null && u2.hasAttribute("type")) && (n2.value = "button");
  }), n2;
}
var N = ((o2) => (o2[o2.None = 0] = "None", o2[o2.RenderStrategy = 1] = "RenderStrategy", o2[o2.Static = 2] = "Static", o2))(N || {}), S = ((e2) => (e2[e2.Unmount = 0] = "Unmount", e2[e2.Hidden = 1] = "Hidden", e2))(S || {});
function A({ visible: r2 = true, features: t = 0, ourProps: e2, theirProps: o2, ...i2 }) {
  var a;
  let n2 = j(o2, e2), l = Object.assign(i2, { props: n2 });
  if (r2 || t & 2 && n2.static)
    return y(l);
  if (t & 1) {
    let d2 = (a = n2.unmount) == null || a ? 0 : 1;
    return u$2(d2, { [0]() {
      return null;
    }, [1]() {
      return y({ ...i2, props: { ...n2, hidden: true, style: { display: "none" } } });
    } });
  }
  return y(l);
}
function y({ props: r2, attrs: t, slots: e2, slot: o2, name: i2 }) {
  var m, h$1;
  let { as: n2, ...l } = T(r2, ["unmount", "static"]), a = (m = e2.default) == null ? void 0 : m.call(e2, o2), d2 = {};
  if (o2) {
    let u2 = false, c = [];
    for (let [p2, f2] of Object.entries(o2))
      typeof f2 == "boolean" && (u2 = true), f2 === true && c.push(p2);
    u2 && (d2["data-headlessui-state"] = c.join(" "));
  }
  if (n2 === "template") {
    if (a = b(a != null ? a : []), Object.keys(l).length > 0 || Object.keys(t).length > 0) {
      let [u2, ...c] = a != null ? a : [];
      if (!v(u2) || c.length > 0)
        throw new Error(['Passing props on "template"!', "", `The current component <${i2} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(l).concat(Object.keys(t)).map((s2) => s2.trim()).filter((s2, g, R) => R.indexOf(s2) === g).sort((s2, g) => s2.localeCompare(g)).map((s2) => `  - ${s2}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((s2) => `  - ${s2}`).join(`
`)].join(`
`));
      let p2 = j((h$1 = u2.props) != null ? h$1 : {}, l, d2), f2 = cloneVNode(u2, p2, true);
      for (let s2 in p2)
        s2.startsWith("on") && (f2.props || (f2.props = {}), f2.props[s2] = p2[s2]);
      return f2;
    }
    return Array.isArray(a) && a.length === 1 ? a[0] : a;
  }
  return h(n2, Object.assign({}, l, d2), { default: () => a });
}
function b(r2) {
  return r2.flatMap((t) => t.type === Fragment ? b(t.children) : [t]);
}
function j(...r2) {
  if (r2.length === 0)
    return {};
  if (r2.length === 1)
    return r2[0];
  let t = {}, e2 = {};
  for (let i2 of r2)
    for (let n2 in i2)
      n2.startsWith("on") && typeof i2[n2] == "function" ? (e2[n2] != null || (e2[n2] = []), e2[n2].push(i2[n2])) : t[n2] = i2[n2];
  if (t.disabled || t["aria-disabled"])
    return Object.assign(t, Object.fromEntries(Object.keys(e2).map((i2) => [i2, void 0])));
  for (let i2 in e2)
    Object.assign(t, { [i2](n2, ...l) {
      let a = e2[i2];
      for (let d2 of a) {
        if (n2 instanceof Event && n2.defaultPrevented)
          return;
        d2(n2, ...l);
      }
    } });
  return t;
}
function E(r2) {
  let t = Object.assign({}, r2);
  for (let e2 in t)
    t[e2] === void 0 && delete t[e2];
  return t;
}
function T(r2, t = []) {
  let e2 = Object.assign({}, r2);
  for (let o2 of t)
    o2 in e2 && delete e2[o2];
  return e2;
}
function v(r2) {
  return r2 == null ? false : typeof r2.type == "string" || typeof r2.type == "object" || typeof r2.type == "function";
}
var u$1 = ((e2) => (e2[e2.None = 1] = "None", e2[e2.Focusable = 2] = "Focusable", e2[e2.Hidden = 4] = "Hidden", e2))(u$1 || {});
let f$1 = defineComponent({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(t, { slots: n2, attrs: i2 }) {
  return () => {
    var r2;
    let { features: e2, ...d2 } = t, o2 = { "aria-hidden": (e2 & 2) === 2 ? true : (r2 = d2["aria-hidden"]) != null ? r2 : void 0, hidden: (e2 & 4) === 4 ? true : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(e2 & 4) === 4 && (e2 & 2) !== 2 && { display: "none" } } };
    return A({ ourProps: o2, theirProps: d2, slot: {}, attrs: i2, slots: n2, name: "Hidden" });
  };
} });
var o$1 = ((r2) => (r2.Space = " ", r2.Enter = "Enter", r2.Escape = "Escape", r2.Backspace = "Backspace", r2.Delete = "Delete", r2.ArrowLeft = "ArrowLeft", r2.ArrowUp = "ArrowUp", r2.ArrowRight = "ArrowRight", r2.ArrowDown = "ArrowDown", r2.Home = "Home", r2.End = "End", r2.PageUp = "PageUp", r2.PageDown = "PageDown", r2.Tab = "Tab", r2))(o$1 || {});
function e(i2 = {}, s2 = null, t = []) {
  for (let [r2, n2] of Object.entries(i2))
    o(t, f(s2, r2), n2);
  return t;
}
function f(i2, s2) {
  return i2 ? i2 + "[" + s2 + "]" : s2;
}
function o(i2, s2, t) {
  if (Array.isArray(t))
    for (let [r2, n2] of t.entries())
      o(i2, f(s2, r2.toString()), n2);
  else
    t instanceof Date ? i2.push([s2, t.toISOString()]) : typeof t == "boolean" ? i2.push([s2, t ? "1" : "0"]) : typeof t == "string" ? i2.push([s2, t]) : typeof t == "number" ? i2.push([s2, `${t}`]) : t == null ? i2.push([s2, ""]) : e(t, s2, i2);
}
function p(i2) {
  var t, r2;
  let s2 = (t = i2 == null ? void 0 : i2.form) != null ? t : i2.closest("form");
  if (s2) {
    for (let n2 of s2.elements)
      if (n2 !== i2 && (n2.tagName === "INPUT" && n2.type === "submit" || n2.tagName === "BUTTON" && n2.type === "submit" || n2.nodeName === "INPUT" && n2.type === "image")) {
        n2.click();
        return;
      }
    (r2 = s2.requestSubmit) == null || r2.call(s2);
  }
}
let u = Symbol("DescriptionContext");
function w() {
  let t = inject(u, null);
  if (t === null)
    throw new Error("Missing parent");
  return t;
}
function k({ slot: t = ref({}), name: o2 = "Description", props: s2 = {} } = {}) {
  let e2 = ref([]);
  function r2(n2) {
    return e2.value.push(n2), () => {
      let i2 = e2.value.indexOf(n2);
      i2 !== -1 && e2.value.splice(i2, 1);
    };
  }
  return provide(u, { register: r2, slot: t, name: o2, props: s2 }), computed(() => e2.value.length > 0 ? e2.value.join(" ") : void 0);
}
defineComponent({ name: "Description", props: { as: { type: [Object, String], default: "p" }, id: { type: String, default: null } }, setup(t, { attrs: o2, slots: s2 }) {
  var n2;
  let e2 = (n2 = t.id) != null ? n2 : `headlessui-description-${i()}`, r2 = w();
  return onMounted(() => onUnmounted(r2.register(e2))), () => {
    let { name: i2 = "Description", slot: l = ref({}), props: d2 = {} } = r2, { ...c } = t, f2 = { ...Object.entries(d2).reduce((a, [g, m]) => Object.assign(a, { [g]: unref(m) }), {}), id: e2 };
    return A({ ourProps: f2, theirProps: c, slot: l.value, attrs: o2, slots: s2, name: i2 });
  };
} });

export { A, E, N, S, T, __nuxt_component_4 as _, s$1 as a, o$1 as b, u$2 as c, d, e, f$1 as f, i, k, o$2 as o, p, s, u$1 as u };
//# sourceMappingURL=description-Co2y63bt.mjs.map
