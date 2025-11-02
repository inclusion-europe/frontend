import * as e$1 from 'vue';
import { defineComponent, toRef, inject, computed, ref, useId, provide, useSSRContext, onMounted, onUnmounted, unref, watch, h, Fragment, nextTick, mergeProps, withCtx, createTextVNode, isRef, createVNode, toDisplayString, openBlock, createBlock, renderList, createCommentVNode, createSlots, resolveComponent } from 'vue';
import { m as mergeConfig, l as appConfig, n as useUI, p as __nuxt_component_0$2, o as useFormGroup, t as twMerge, w as textarea, _ as _export_sfc, e as useRouter, f as useRoute, y as useNuxtApp, I as IeButton, x as looseToNumber, c as useRuntimeConfig, b as utils, z as __nuxt_component_2, q as __nuxt_component_0$1 } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { i, A, k, d as d$1, s, o as o$2, f as f$1, E as E$1, u as u$1, T, a as s$1, b as o$1, p, _ as __nuxt_component_4$1 } from './description-Co2y63bt.mjs';
import { twJoin } from 'tailwind-merge';
import { t as defu } from '../runtime.mjs';
import { MdEditor } from 'md-editor-v3';
import { V as VueMarkdown } from '../_/VueMarkdown.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';
import 'vue-router';
import '@vueuse/core';
import '@iconify/vue';
import 'vue3-toastify';
import '@iconify/utils/lib/css/icon';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import '@iconify/utils';
import 'consola/core';
import 'markdown-it';

var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : "undefined" !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

const require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(e$1);

var vue=require$$0;function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof commonjsGlobal$1 !== 'undefined' ? commonjsGlobal$1 : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}var vClickOutside_umd = createCommonjsModule(function (module, exports) {
!function(e,n){module.exports=n();}(commonjsGlobal,function(){var e="__v-click-outside",n="undefined"!="undefined",r=["click"],i=function(e){var n=e.event,t=e.handler;(0, e.middleware)(n)&&t(n);},a=function(n,t){var a=function(e){var n="function"==typeof e;if(!n&&"object"!=typeof e)throw new Error("v-click-outside: Binding value must be a function or an object");return {handler:n?e:e.handler,middleware:e.middleware||function(e){return e},events:e.events||r,isActive:!(!1===e.isActive),detectIframe:!(!1===e.detectIframe),capture:Boolean(e.capture)}}(t.value),o=a.handler,d=a.middleware,c=a.detectIframe,u=a.capture;if(a.isActive){if(n[e]=a.events.map(function(e){return {event:e,srcTarget:document.documentElement,handler:function(e){return function(e){var n=e.el,t=e.event,r=e.handler,a=e.middleware,o=t.path||t.composedPath&&t.composedPath();(o?o.indexOf(n)<0:!n.contains(t.target))&&i({event:t,handler:r,middleware:a});}({el:n,event:e,handler:o,middleware:d})},capture:u}}),c){var l={event:"blur",srcTarget:window,handler:function(e){return function(e){var n=e.el,t=e.event,r=e.handler,a=e.middleware;setTimeout(function(){var e=document.activeElement;e&&"IFRAME"===e.tagName&&!n.contains(e)&&i({event:t,handler:r,middleware:a});},0);}({el:n,event:e,handler:o,middleware:d})},capture:u};n[e]=[].concat(n[e],[l]);}n[e].forEach(function(t){var r=t.event,i=t.srcTarget,a=t.handler;return setTimeout(function(){n[e]&&i.addEventListener(r,a,u);},0)});}},o=function(n){(n[e]||[]).forEach(function(e){return e.srcTarget.removeEventListener(e.event,e.handler,e.capture)}),delete n[e];},d=n?{beforeMount:a,updated:function(e,n){var t=n.value,r=n.oldValue;JSON.stringify(t)!==JSON.stringify(r)&&(o(e),a(e,{value:t}));},unmounted:o}:{};return {install:function(e){e.directive("click-outside",d);},directive:d}});

});

var vClickOutside = vClickOutside_umd;var _hoisted_1$1 = {
  class: "v3ti-loader-wrapper"
};

var _hoisted_2$1 = /*#__PURE__*/vue.createElementVNode("div", {
  class: "v3ti-loader"
}, null, -1);

var _hoisted_3$1 = /*#__PURE__*/vue.createElementVNode("span", null, "Loading", -1);

var _hoisted_4$1 = [_hoisted_2$1, _hoisted_3$1];
function render$1(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, _hoisted_4$1);
}function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}var css_248z$1 = ".v3ti-loader-wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #112B3C;\n}\n.v3ti-loader-wrapper .v3ti-loader {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  display: inline-block;\n  border-top: 2px solid #112B3C;\n  border-right: 2px solid transparent;\n  box-sizing: border-box;\n  animation: rotation 0.8s linear infinite;\n  margin-right: 8px;\n}\n@keyframes rotation {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}";
styleInject(css_248z$1);var script$1 = {};
script$1.render = render$1;
var Loading = script$1;var script = {
  name: "Vue3TagsInput",
  emits: ['update:modelValue', 'update:tags', 'on-limit', 'on-tags-changed', 'on-remove', 'on-error', 'on-focus', 'on-blur', 'on-select', 'on-select-duplicate-tag', 'on-new-tag'],
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ''
    },
    validate: {
      type: [String, Function, Object],
      default: ""
    },
    addTagOnKeys: {
      type: Array,
      default: function _default() {
        return [13, // Enter
        ',', // Comma ','
        32 // Space
        ];
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    tags: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: -1
    },
    allowDuplicates: {
      type: Boolean,
      default: false
    },
    addTagOnBlur: {
      type: Boolean,
      default: false
    },
    selectItems: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    select: {
      type: Boolean,
      default: false
    },
    duplicateSelectItem: {
      type: Boolean,
      default: true
    },
    uniqueSelectField: {
      type: String,
      default: 'id'
    },
    addTagOnKeysWhenSelect: {
      type: Boolean,
      default: false
    },
    isShowNoData: {
      type: Boolean,
      default: true
    } // multiple: {
    //   type: Boolean,
    //   default: false
    // },

  },
  components: {
    Loading: Loading
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data: function data() {
    return {
      isInputActive: false,
      isError: false,
      newTag: '',
      innerTags: [],
      multiple: false
    };
  },
  computed: {
    isLimit: function isLimit() {
      var isLimit = this.limit > 0 && Number(this.limit) === this.innerTags.length;

      if (isLimit) {
        this.$emit('on-limit');
      }

      return isLimit;
    },
    selectedItemsIds: function selectedItemsIds() {
      var _this = this;

      if (!this.duplicateSelectItem) {
        return this.tags.map(function (o) {
          return o[_this.uniqueSelectField] || '';
        });
      }

      return [];
    }
  },
  watch: {
    error: function error() {
      this.isError = this.error;
    },
    modelValue: {
      immediate: true,
      handler: function handler(value) {
        this.newTag = value;
      }
    },
    tags: {
      deep: true,
      immediate: true,
      handler: function handler(tags) {
        this.innerTags = _toConsumableArray(tags);
      }
    }
  },
  methods: {
    isShot: function isShot(name) {
      return !!this.$slots[name];
    },
    makeItNormal: function makeItNormal(event) {
      this.$emit('update:modelValue', event.target.value);
      this.$refs.inputTag.className = 'v3ti-new-tag';
      this.$refs.inputTag.style.textDecoration = "none";
    },
    resetData: function resetData() {
      this.innerTags = [];
    },
    resetInputValue: function resetInputValue() {
      this.newTag = '';
      this.$emit('update:modelValue', '');
    },
    setPosition: function setPosition() {
      var el = this.$refs.inputBox;
      var menu = this.$refs.contextMenu;

      if (el && menu) {
        menu.style.display = "block"; // menu.style.position = 'fixed';

        var ELEMENT_HEIGHT = el.clientHeight || 32;
        var BORDER_HEIGHT = 3;
        menu.style.top = ELEMENT_HEIGHT + BORDER_HEIGHT + "px";
      }
    },
    closeContextMenu: function closeContextMenu() {
      if (this.$refs.contextMenu) {
        this.$refs.contextMenu.style = {
          display: 'none'
        };
      }
    },
    handleSelect: function handleSelect(tagData) {
      var _this2 = this;

      if (this.isShowCheckmark(tagData)) {
        var tags = this.tags.filter(function (o) {
          return tagData.id !== o.id;
        });
        this.$emit('update:tags', tags);
        this.$emit('on-select-duplicate-tag', tagData);
        this.resetInputValue();
      } else {
        this.$emit('on-select', tagData);
      }

      this.$nextTick(function () {
        _this2.closeContextMenu();
      });
    },
    isShowCheckmark: function isShowCheckmark(tag) {
      if (!this.duplicateSelectItem) {
        return this.selectedItemsIds.includes(tag[this.uniqueSelectField]);
      }

      return false;
    },
    focusNewTag: function focusNewTag() {
      if (this.select && !this.disabled) {
        this.setPosition();
      }

      if (this.readOnly || !this.$el.querySelector(".v3ti-new-tag")) {
        return;
      }

      this.$el.querySelector(".v3ti-new-tag").focus();
    },
    handleInputFocus: function handleInputFocus(event) {
      this.isInputActive = true;
      this.$emit('on-focus', event);
    },
    handleInputBlur: function handleInputBlur(e) {
      this.isInputActive = false;
      this.addNew(e);
      this.$emit('on-blur', e);
    },
    addNew: function addNew(e) {
      if (this.select && !this.addTagOnKeysWhenSelect) {
        return;
      }

      var keyShouldAddTag = e ? this.addTagOnKeys.indexOf(e.keyCode) !== -1 || this.addTagOnKeys.indexOf(e.key) !== -1 : true;
      var typeIsNotBlur = e && e.type !== "blur";

      if (!keyShouldAddTag && (typeIsNotBlur || !this.addTagOnBlur) || this.isLimit) {
        return;
      }

      if (this.newTag && (this.allowDuplicates || this.innerTags.indexOf(this.newTag) === -1) && this.validateIfNeeded(this.newTag)) {
        this.innerTags.push(this.newTag);

        if (this.addTagOnKeysWhenSelect) {
          this.$emit('on-new-tag', this.newTag);
          this.updatePositionContextMenu();
        }

        this.resetInputValue();
        this.tagChange();
        e && e.preventDefault();
      } else {
        if (this.validateIfNeeded(this.newTag)) {
          this.makeItError(true);
        } else {
          this.makeItError(false);
        }

        e && e.preventDefault();
      }
    },
    updatePositionContextMenu: function updatePositionContextMenu() {
      var _this3 = this;

      this.$nextTick(function () {
        _this3.setPosition();
      });
    },
    makeItError: function makeItError(isDuplicatedOrMaxLength) {
      if (this.newTag !== '') {
        this.$refs.inputTag.className = 'v3ti-new-tag v3ti-new-tag--error';
        this.$refs.inputTag.style.textDecoration = "underline";
        this.$emit('on-error', isDuplicatedOrMaxLength);
      }
    },
    validateIfNeeded: function validateIfNeeded(tagValue) {
      if (this.validate === "" || this.validate === undefined) {
        return true;
      }

      if (typeof this.validate === "function") {
        return this.validate(tagValue);
      }

      return true;
    },
    removeLastTag: function removeLastTag() {
      if (this.newTag) {
        return;
      }

      this.innerTags.pop();
      this.tagChange();
      this.updatePositionContextMenu();
    },
    remove: function remove(index) {
      this.innerTags.splice(index, 1);
      this.tagChange();
      this.$emit("on-remove", index);
      this.updatePositionContextMenu();
    },
    tagChange: function tagChange() {
      this.$emit("on-tags-changed", this.innerTags);
    }
  }
};var _hoisted_1 = {
  key: 1,
  class: "v3ti-tag-content"
};
var _hoisted_2 = ["onClick"];
var _hoisted_3 = ["placeholder", "disabled"];
var _hoisted_4 = {
  key: 0,
  class: "v3ti-loading"
};
var _hoisted_5 = {
  key: 1,
  class: "v3ti-no-data"
};
var _hoisted_6 = {
  key: 1
};
var _hoisted_7 = {
  key: 2
};
var _hoisted_8 = ["onClick"];
var _hoisted_9 = {
  class: "v3ti-context-item--label"
};
var _hoisted_10 = {
  key: 0,
  class: "v3ti-icon-selected-tag",
  width: "44",
  height: "44",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  fill: "none",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};

var _hoisted_11 = /*#__PURE__*/vue.createElementVNode("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1);

var _hoisted_12 = /*#__PURE__*/vue.createElementVNode("path", {
  d: "M5 12l5 5l10 -10"
}, null, -1);

var _hoisted_13 = [_hoisted_11, _hoisted_12];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Loading = vue.resolveComponent("Loading");

  var _directive_click_outside = vue.resolveDirective("click-outside");

  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
    onClick: _cache[6] || (_cache[6] = function ($event) {
      return $options.focusNewTag();
    }),
    class: vue.normalizeClass([{
      'v3ti--focus': $data.isInputActive,
      'v3ti--error': $data.isError
    }, "v3ti"])
  }, [vue.createElementVNode("div", {
    class: vue.normalizeClass(["v3ti-content", {
      'v3ti-content--select': $props.select
    }]),
    ref: "inputBox"
  }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.innerTags, function (tag, index) {
    return vue.openBlock(), vue.createElementBlock("span", {
      key: index,
      class: "v3ti-tag"
    }, [$options.isShot('item') ? vue.renderSlot(_ctx.$slots, "item", vue.normalizeProps(vue.mergeProps({
      key: 0
    }, {
      name: tag,
      index: index,
      tag: tag
    }))) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_1, vue.toDisplayString(tag), 1)), !$props.readOnly ? (vue.openBlock(), vue.createElementBlock("a", {
      key: 2,
      onClick: vue.withModifiers(function ($event) {
        return $options.remove(index);
      }, ["prevent", "stop"]),
      class: "v3ti-remove-tag"
    }, null, 8, _hoisted_2)) : vue.createCommentVNode("", true)]);
  }), 128)), vue.withDirectives(vue.createElementVNode("input", {
    ref: "inputTag",
    placeholder: $props.placeholder,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.newTag = $event;
    }),
    onKeydown: [_cache[1] || (_cache[1] = vue.withKeys(vue.withModifiers(function () {
      return $options.removeLastTag && $options.removeLastTag.apply($options, arguments);
    }, ["stop"]), ["delete"])), _cache[2] || (_cache[2] = function () {
      return $options.addNew && $options.addNew.apply($options, arguments);
    })],
    onBlur: _cache[3] || (_cache[3] = function () {
      return $options.handleInputBlur && $options.handleInputBlur.apply($options, arguments);
    }),
    onFocus: _cache[4] || (_cache[4] = function () {
      return $options.handleInputFocus && $options.handleInputFocus.apply($options, arguments);
    }),
    onInput: _cache[5] || (_cache[5] = function () {
      return $options.makeItNormal && $options.makeItNormal.apply($options, arguments);
    }),
    class: "v3ti-new-tag",
    disabled: $props.readOnly
  }, null, 40, _hoisted_3), [[vue.vModelText, $data.newTag]])], 2), $props.select ? (vue.openBlock(), vue.createElementBlock("section", {
    key: 0,
    class: vue.normalizeClass(["v3ti-context-menu", {
      'v3ti-context-menu-no-data': !$props.isShowNoData && $props.selectItems.length === 0
    }]),
    ref: "contextMenu"
  }, [$props.loading ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4, [$options.isShot('loading') ? vue.renderSlot(_ctx.$slots, "default", {
    key: 0
  }) : (vue.openBlock(), vue.createBlock(_component_Loading, {
    key: 1
  }))])) : vue.createCommentVNode("", true), !$props.loading && $props.selectItems.length === 0 && $props.isShowNoData ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, [$options.isShot('no-data') ? vue.renderSlot(_ctx.$slots, "no-data", {
    key: 0
  }) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_6, " No data "))])) : vue.createCommentVNode("", true), !$props.loading && $props.selectItems.length > 0 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.selectItems, function (item, index) {
    return vue.openBlock(), vue.createElementBlock("div", {
      key: index,
      class: vue.normalizeClass(["v3ti-context-item", {
        'v3ti-context-item--active': $options.isShowCheckmark(item)
      }]),
      onClick: vue.withModifiers(function ($event) {
        return $options.handleSelect(item, index);
      }, ["stop"])
    }, [vue.createElementVNode("div", _hoisted_9, [vue.renderSlot(_ctx.$slots, "select-item", vue.normalizeProps(vue.guardReactiveProps(item)))]), $options.isShowCheckmark(item) ? (vue.openBlock(), vue.createElementBlock("svg", _hoisted_10, _hoisted_13)) : vue.createCommentVNode("", true)], 10, _hoisted_8);
  }), 128))])) : vue.createCommentVNode("", true)], 2)) : vue.createCommentVNode("", true)], 2)), [[_directive_click_outside, $options.closeContextMenu]]);
}var css_248z = ".v3ti {\n  border-radius: 5px;\n  min-height: 32px;\n  line-height: 1.4;\n  background-color: #fff;\n  border: 1px solid #9ca3af;\n  cursor: text;\n  text-align: left;\n  -webkit-appearance: textfield;\n  display: flex;\n  flex-wrap: wrap;\n  position: relative;\n}\n.v3ti .v3ti-icon-selected-tag {\n  stroke: #19be6b;\n  width: 1rem;\n  height: 1rem;\n  margin-left: 4px;\n}\n.v3ti--focus {\n  outline: 0;\n  border-color: #000000;\n  box-shadow: 0 0 0 1px #000000;\n}\n.v3ti--error {\n  border-color: #F56C6C;\n}\n.v3ti .v3ti-no-data {\n  color: #d8d8d8;\n  text-align: center;\n  padding: 4px 7px;\n}\n.v3ti .v3ti-loading {\n  padding: 4px 7px;\n  text-align: center;\n}\n.v3ti .v3ti-context-menu {\n  max-height: 150px;\n  min-width: 150px;\n  overflow: auto;\n  display: none;\n  outline: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  margin: 0;\n  padding: 5px 0;\n  background: #ffffff;\n  z-index: 1050;\n  color: #475569;\n  box-shadow: 0 3px 8px 2px rgba(0, 0, 0, 0.1);\n  border-radius: 0 0 6px 6px;\n}\n.v3ti .v3ti-context-menu .v3ti-context-item {\n  padding: 4px 7px;\n  display: flex;\n  align-items: center;\n}\n.v3ti .v3ti-context-menu .v3ti-context-item:hover {\n  background: #e8e8e8;\n  cursor: pointer;\n}\n.v3ti .v3ti-context-menu .v3ti-context-item--label {\n  flex: 1;\n  min-width: 1px;\n}\n.v3ti .v3ti-context-menu .v3ti-context-item--active {\n  color: #317CAF;\n}\n.v3ti .v3ti-context-menu-no-data {\n  padding: 0;\n}\n.v3ti .v3ti-content {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n}\n.v3ti .v3ti-content--select {\n  padding-right: 30px;\n}\n.v3ti .v3ti-tag {\n  display: flex;\n  font-weight: 400;\n  margin: 3px;\n  padding: 0 5px;\n  background: #317CAF;\n  color: #ffffff;\n  height: 27px;\n  border-radius: 5px;\n  align-items: center;\n  max-width: calc(100% - 16px);\n}\n.v3ti .v3ti-tag .v3ti-tag-content {\n  flex: 1;\n  min-width: 1px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.v3ti .v3ti-tag .v3ti-remove-tag {\n  color: #ffffff;\n  transition: opacity 0.3s ease;\n  opacity: 0.5;\n  cursor: pointer;\n  padding: 0 5px 0 7px;\n}\n.v3ti .v3ti-tag .v3ti-remove-tag::before {\n  content: \"x\";\n}\n.v3ti .v3ti-tag .v3ti-remove-tag:hover {\n  opacity: 1;\n}\n.v3ti .v3ti-new-tag {\n  background: transparent;\n  border: 0;\n  font-weight: 400;\n  margin: 3px;\n  outline: none;\n  padding: 0 4px;\n  flex: 1;\n  min-width: 60px;\n  height: 27px;\n}\n.v3ti .v3ti-new-tag--error {\n  color: #F56C6C;\n}";
styleInject(css_248z);script.render = render;// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = script; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.component('Vue3TagsInput', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});var vue3TagsInput_ssr=component;

const Vue3TagsInput = /*@__PURE__*/getDefaultExportFromCjs(vue3TagsInput_ssr);

const formGroup = {
  wrapper: "",
  inner: "",
  label: {
    wrapper: "flex content-center items-center justify-between",
    base: "block font-medium text-gray-700 dark:text-gray-200",
    required: `after:content-['*'] after:ms-0.5 after:text-red-500 dark:after:text-red-400`
  },
  size: {
    "2xs": "text-xs",
    "xs": "text-xs",
    "sm": "text-sm",
    "md": "text-sm",
    "lg": "text-sm",
    "xl": "text-base"
  },
  container: "mt-1 relative",
  description: "text-gray-500 dark:text-gray-400",
  hint: "text-gray-500 dark:text-gray-400",
  help: "mt-2 text-gray-500 dark:text-gray-400",
  error: "mt-2 text-red-500 dark:text-red-400",
  default: {
    size: "sm"
  }
};
const toggle = {
  base: "relative inline-flex flex-shrink-0 border-2 border-transparent disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
  rounded: "rounded-full",
  ring: "focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
  active: "bg-{color}-500 dark:bg-{color}-400",
  inactive: "bg-gray-200 dark:bg-gray-700",
  size: {
    "2xs": "h-3 w-5",
    "xs": "h-3.5 w-6",
    "sm": "h-4 w-7",
    "md": "h-5 w-9",
    "lg": "h-6 w-11",
    "xl": "h-7 w-[3.25rem]",
    "2xl": "h-8 w-[3.75rem]"
  },
  container: {
    base: "pointer-events-none relative inline-block rounded-full bg-white dark:bg-gray-900 shadow transform ring-0 transition ease-in-out duration-200",
    active: {
      "2xs": "translate-x-2 rtl:-translate-x-2",
      "xs": "translate-x-2.5 rtl:-translate-x-2.5",
      "sm": "translate-x-3 rtl:-translate-x-3",
      "md": "translate-x-4 rtl:-translate-x-4",
      "lg": "translate-x-5 rtl:-translate-x-5",
      "xl": "translate-x-6 rtl:-translate-x-6",
      "2xl": "translate-x-7 rtl:-translate-x-7"
    },
    inactive: "translate-x-0 rtl:-translate-x-0",
    size: {
      "2xs": "h-2 w-2",
      "xs": "h-2.5 w-2.5",
      "sm": "h-3 w-3",
      "md": "h-4 w-4",
      "lg": "h-5 w-5",
      "xl": "h-6 w-6",
      "2xl": "h-7 w-7"
    }
  },
  icon: {
    base: "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity",
    active: "opacity-100 ease-in duration-200",
    inactive: "opacity-0 ease-out duration-100",
    size: {
      "2xs": "h-2 w-2",
      "xs": "h-2 w-2",
      "sm": "h-2 w-2",
      "md": "h-3 w-3",
      "lg": "h-4 w-4",
      "xl": "h-5 w-5",
      "2xl": "h-6 w-6"
    },
    on: "text-{color}-500 dark:text-{color}-400",
    off: "text-gray-400 dark:text-gray-500",
    loading: "animate-spin text-{color}-500 dark:text-{color}-400"
  },
  default: {
    onIcon: null,
    offIcon: null,
    loadingIcon: "i-heroicons-arrow-path-20-solid",
    color: "primary",
    size: "md"
  }
};
const config$2 = mergeConfig(appConfig.ui.strategy, appConfig.ui.formGroup, formGroup);
const _sfc_main$5 = defineComponent({
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null,
      validator(value) {
        return Object.keys(config$2.size).includes(value);
      }
    },
    label: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    help: {
      type: String,
      default: null
    },
    error: {
      type: [String, Boolean],
      default: null
    },
    hint: {
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
    },
    eagerValidation: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { ui, attrs } = useUI("formGroup", toRef(props, "ui"), config$2, toRef(props, "class"));
    const formErrors = inject("form-errors", null);
    const error = computed(() => {
      var _a, _b;
      return props.error && typeof props.error === "string" || typeof props.error === "boolean" ? props.error : (_b = (_a = formErrors == null ? void 0 : formErrors.value) == null ? void 0 : _a.find((error2) => error2.path === props.name)) == null ? void 0 : _b.message;
    });
    const size = computed(() => {
      var _a;
      return ui.value.size[(_a = props.size) != null ? _a : config$2.default.size];
    });
    const inputId = ref(useId("$K7dDJpdOWE"));
    provide("form-group", {
      error,
      inputId,
      name: computed(() => props.name),
      size: computed(() => props.size),
      eagerValidation: computed(() => props.eagerValidation)
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      inputId,
      // eslint-disable-next-line vue/no-dupe-keys
      size,
      // eslint-disable-next-line vue/no-dupe-keys
      error
    };
  }
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _ctx.attrs, _attrs))}><div class="${ssrRenderClass(_ctx.ui.inner)}">`);
  if (_ctx.label || _ctx.$slots.label) {
    _push(`<div class="${ssrRenderClass([_ctx.ui.label.wrapper, _ctx.size])}"><label${ssrRenderAttr("for", _ctx.inputId)} class="${ssrRenderClass([_ctx.ui.label.base, _ctx.required ? _ctx.ui.label.required : ""])}">`);
    if (_ctx.$slots.label) {
      ssrRenderSlot(_ctx.$slots, "label", { error: _ctx.error, label: _ctx.label, name: _ctx.name, hint: _ctx.hint, description: _ctx.description, help: _ctx.help }, null, _push, _parent);
    } else {
      _push(`<!--[-->${ssrInterpolate(_ctx.label)}<!--]-->`);
    }
    _push(`</label>`);
    if (_ctx.hint || _ctx.$slots.hint) {
      _push(`<span class="${ssrRenderClass([_ctx.ui.hint])}">`);
      if (_ctx.$slots.hint) {
        ssrRenderSlot(_ctx.$slots, "hint", { error: _ctx.error, label: _ctx.label, name: _ctx.name, hint: _ctx.hint, description: _ctx.description, help: _ctx.help }, null, _push, _parent);
      } else {
        _push(`<!--[-->${ssrInterpolate(_ctx.hint)}<!--]-->`);
      }
      _push(`</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.description || _ctx.$slots.description) {
    _push(`<p class="${ssrRenderClass([_ctx.ui.description, _ctx.size])}">`);
    if (_ctx.$slots.description) {
      ssrRenderSlot(_ctx.$slots, "description", { error: _ctx.error, label: _ctx.label, name: _ctx.name, hint: _ctx.hint, description: _ctx.description, help: _ctx.help }, null, _push, _parent);
    } else {
      _push(`<!--[-->${ssrInterpolate(_ctx.description)}<!--]-->`);
    }
    _push(`</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="${ssrRenderClass([_ctx.label ? _ctx.ui.container : ""])}">`);
  ssrRenderSlot(_ctx.$slots, "default", { error: _ctx.error }, null, _push, _parent);
  if (typeof _ctx.error === "string" && _ctx.error) {
    _push(`<p class="${ssrRenderClass([_ctx.ui.error, _ctx.size])}">`);
    if (_ctx.$slots.error) {
      ssrRenderSlot(_ctx.$slots, "error", { error: _ctx.error, label: _ctx.label, name: _ctx.name, hint: _ctx.hint, description: _ctx.description, help: _ctx.help }, null, _push, _parent);
    } else {
      _push(`<!--[-->${ssrInterpolate(_ctx.error)}<!--]-->`);
    }
    _push(`</p>`);
  } else if (_ctx.help || _ctx.$slots.help) {
    _push(`<p class="${ssrRenderClass([_ctx.ui.help, _ctx.size])}">`);
    if (_ctx.$slots.help) {
      ssrRenderSlot(_ctx.$slots, "help", { error: _ctx.error, label: _ctx.label, name: _ctx.name, hint: _ctx.hint, description: _ctx.description, help: _ctx.help }, null, _push, _parent);
    } else {
      _push(`<!--[-->${ssrInterpolate(_ctx.help)}<!--]-->`);
    }
    _push(`</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/FormGroup.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$3]]);
let a = Symbol("LabelContext");
function d() {
  let t = inject(a, null);
  if (t === null) {
    let n = new Error("You used a <Label /> component, but it is not inside a parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(n, d), n;
  }
  return t;
}
function E({ slot: t = {}, name: n = "Label", props: i2 = {} } = {}) {
  let e = ref([]);
  function o2(r) {
    return e.value.push(r), () => {
      let l = e.value.indexOf(r);
      l !== -1 && e.value.splice(l, 1);
    };
  }
  return provide(a, { register: o2, slot: t, name: n, props: i2 }), computed(() => e.value.length > 0 ? e.value.join(" ") : void 0);
}
defineComponent({ name: "Label", props: { as: { type: [Object, String], default: "label" }, passive: { type: [Boolean], default: false }, id: { type: String, default: null } }, setup(t, { slots: n, attrs: i$1 }) {
  var r;
  let e = (r = t.id) != null ? r : `headlessui-label-${i()}`, o2 = d();
  return onMounted(() => onUnmounted(o2.register(e))), () => {
    let { name: l = "Label", slot: p2 = {}, props: c = {} } = o2, { passive: f2, ...s2 } = t, u2 = { ...Object.entries(c).reduce((b, [g, m]) => Object.assign(b, { [g]: unref(m) }), {}), id: e };
    return f2 && (delete u2.onClick, delete u2.htmlFor, delete s2.onClick), A({ ourProps: u2, theirProps: s2, slot: p2, attrs: i$1, slots: n, name: l });
  };
} });
let C = Symbol("GroupContext");
defineComponent({ name: "SwitchGroup", props: { as: { type: [Object, String], default: "template" } }, setup(l, { slots: c, attrs: i2 }) {
  let r = ref(null), f2 = E({ name: "SwitchLabel", props: { htmlFor: computed(() => {
    var t;
    return (t = r.value) == null ? void 0 : t.id;
  }), onClick(t) {
    r.value && (t.currentTarget.tagName === "LABEL" && t.preventDefault(), r.value.click(), r.value.focus({ preventScroll: true }));
  } } }), p2 = k({ name: "SwitchDescription" });
  return provide(C, { switchRef: r, labelledby: f2, describedby: p2 }), () => A({ theirProps: l, ourProps: {}, slot: {}, slots: c, attrs: i2, name: "SwitchGroup" });
} });
let ue = defineComponent({ name: "Switch", emits: { "update:modelValue": (l) => true }, props: { as: { type: [Object, String], default: "button" }, modelValue: { type: Boolean, default: void 0 }, defaultChecked: { type: Boolean, optional: true }, form: { type: String, optional: true }, name: { type: String, optional: true }, value: { type: String, optional: true }, id: { type: String, default: null }, disabled: { type: Boolean, default: false }, tabIndex: { type: Number, default: 0 } }, inheritAttrs: false, setup(l, { emit: c, attrs: i$1, slots: r, expose: f$1$1 }) {
  var h$1;
  let p$1 = (h$1 = l.id) != null ? h$1 : `headlessui-switch-${i()}`, n = inject(C, null), [t, s$12] = d$1(computed(() => l.modelValue), (e) => c("update:modelValue", e), computed(() => l.defaultChecked));
  function m() {
    s$12(!t.value);
  }
  let E2 = ref(null), o$2$1 = n === null ? E2 : n.switchRef, L = s(computed(() => ({ as: l.as, type: i$1.type })), o$2$1);
  f$1$1({ el: o$2$1, $el: o$2$1 });
  function D(e) {
    e.preventDefault(), m();
  }
  function R(e) {
    e.key === o$1.Space ? (e.preventDefault(), m()) : e.key === o$1.Enter && p(e.currentTarget);
  }
  function x(e) {
    e.preventDefault();
  }
  let d2 = computed(() => {
    var e, a2;
    return (a2 = (e = o$2(o$2$1)) == null ? void 0 : e.closest) == null ? void 0 : a2.call(e, "form");
  });
  return onMounted(() => {
    watch([d2], () => {
      if (!d2.value || l.defaultChecked === void 0)
        return;
      function e() {
        s$12(l.defaultChecked);
      }
      return d2.value.addEventListener("reset", e), () => {
        var a2;
        (a2 = d2.value) == null || a2.removeEventListener("reset", e);
      };
    }, { immediate: true });
  }), () => {
    let { name: e, value: a2, form: K, tabIndex: y, ...b } = l, T$1 = { checked: t.value }, B = { id: p$1, ref: o$2$1, role: "switch", type: L.value, tabIndex: y === -1 ? 0 : y, "aria-checked": t.value, "aria-labelledby": n == null ? void 0 : n.labelledby.value, "aria-describedby": n == null ? void 0 : n.describedby.value, onClick: D, onKeyup: R, onKeypress: x };
    return h(Fragment, [e != null && t.value != null ? h(f$1, E$1({ features: u$1.Hidden, as: "input", type: "checkbox", hidden: true, readOnly: true, checked: t.value, form: K, disabled: b.disabled, name: e, value: a2 })) : null, A({ ourProps: B, theirProps: { ...i$1, ...T(b, ["modelValue", "defaultChecked"]) }, slot: T$1, attrs: i$1, slots: r, name: "Switch" })]);
  };
} });
const config$1 = mergeConfig(appConfig.ui.strategy, appConfig.ui.toggle, toggle);
const _sfc_main$4 = defineComponent({
  components: {
    HSwitch: ue,
    UIcon: __nuxt_component_0$2
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    onIcon: {
      type: String,
      default: () => config$1.default.onIcon
    },
    offIcon: {
      type: String,
      default: () => config$1.default.offIcon
    },
    loadingIcon: {
      type: String,
      default: () => config$1.default.loadingIcon
    },
    color: {
      type: String,
      default: () => config$1.default.color,
      validator(value) {
        return appConfig.ui.colors.includes(value);
      }
    },
    size: {
      type: String,
      default: () => config$1.default.size,
      validator(value) {
        return Object.keys(config$1.size).includes(value);
      }
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
  setup(props, { emit }) {
    const { ui, attrs } = useUI("toggle", toRef(props, "ui"), config$1);
    const { emitFormChange, color, inputId, name } = useFormGroup(props);
    const active = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
        emit("change", value);
        emitFormChange();
      }
    });
    const switchClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.size[props.size],
        ui.value.rounded,
        color.value && ui.value.ring.replaceAll("{color}", color.value),
        color.value && (active.value ? ui.value.active : ui.value.inactive).replaceAll("{color}", color.value)
      ), props.class);
    });
    const containerClass = computed(() => {
      return twJoin(
        ui.value.container.base,
        ui.value.container.size[props.size],
        active.value ? ui.value.container.active[props.size] : ui.value.container.inactive
      );
    });
    const onIconClass = computed(() => {
      return twJoin(
        ui.value.icon.size[props.size],
        color.value && ui.value.icon.on.replaceAll("{color}", color.value)
      );
    });
    const offIconClass = computed(() => {
      return twJoin(
        ui.value.icon.size[props.size],
        color.value && ui.value.icon.off.replaceAll("{color}", color.value)
      );
    });
    const loadingIconClass = computed(() => {
      return twJoin(
        ui.value.icon.size[props.size],
        color.value && ui.value.icon.loading.replaceAll("{color}", color.value)
      );
    });
    s$1(() => useId("$mRW6KdlcYH"));
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      inputId,
      active,
      switchClass,
      containerClass,
      onIconClass,
      offIconClass,
      loadingIconClass
    };
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HSwitch = resolveComponent("HSwitch");
  const _component_UIcon = __nuxt_component_0$2;
  _push(ssrRenderComponent(_component_HSwitch, mergeProps({
    id: _ctx.inputId,
    modelValue: _ctx.active,
    "onUpdate:modelValue": ($event) => _ctx.active = $event,
    name: _ctx.name,
    disabled: _ctx.disabled || _ctx.loading,
    class: _ctx.switchClass
  }, _ctx.attrs, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="${ssrRenderClass(_ctx.containerClass)}"${_scopeId}>`);
        if (_ctx.loading) {
          _push2(`<span class="${ssrRenderClass([_ctx.ui.icon.active, _ctx.ui.icon.base])}" aria-hidden="true"${_scopeId}>`);
          _push2(ssrRenderComponent(_component_UIcon, {
            name: _ctx.loadingIcon,
            class: _ctx.loadingIconClass
          }, null, _parent2, _scopeId));
          _push2(`</span>`);
        } else {
          _push2(`<!---->`);
        }
        if (!_ctx.loading && _ctx.onIcon) {
          _push2(`<span class="${ssrRenderClass([_ctx.active ? _ctx.ui.icon.active : _ctx.ui.icon.inactive, _ctx.ui.icon.base])}" aria-hidden="true"${_scopeId}>`);
          _push2(ssrRenderComponent(_component_UIcon, {
            name: _ctx.onIcon,
            class: _ctx.onIconClass
          }, null, _parent2, _scopeId));
          _push2(`</span>`);
        } else {
          _push2(`<!---->`);
        }
        if (!_ctx.loading && _ctx.offIcon) {
          _push2(`<span class="${ssrRenderClass([_ctx.active ? _ctx.ui.icon.inactive : _ctx.ui.icon.active, _ctx.ui.icon.base])}" aria-hidden="true"${_scopeId}>`);
          _push2(ssrRenderComponent(_component_UIcon, {
            name: _ctx.offIcon,
            class: _ctx.offIconClass
          }, null, _parent2, _scopeId));
          _push2(`</span>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</span>`);
      } else {
        return [
          createVNode("span", { class: _ctx.containerClass }, [
            _ctx.loading ? (openBlock(), createBlock("span", {
              key: 0,
              class: [_ctx.ui.icon.active, _ctx.ui.icon.base],
              "aria-hidden": "true"
            }, [
              createVNode(_component_UIcon, {
                name: _ctx.loadingIcon,
                class: _ctx.loadingIconClass
              }, null, 8, ["name", "class"])
            ], 2)) : createCommentVNode("", true),
            !_ctx.loading && _ctx.onIcon ? (openBlock(), createBlock("span", {
              key: 1,
              class: [_ctx.active ? _ctx.ui.icon.active : _ctx.ui.icon.inactive, _ctx.ui.icon.base],
              "aria-hidden": "true"
            }, [
              createVNode(_component_UIcon, {
                name: _ctx.onIcon,
                class: _ctx.onIconClass
              }, null, 8, ["name", "class"])
            ], 2)) : createCommentVNode("", true),
            !_ctx.loading && _ctx.offIcon ? (openBlock(), createBlock("span", {
              key: 2,
              class: [_ctx.active ? _ctx.ui.icon.inactive : _ctx.ui.icon.active, _ctx.ui.icon.base],
              "aria-hidden": "true"
            }, [
              createVNode(_component_UIcon, {
                name: _ctx.offIcon,
                class: _ctx.offIconClass
              }, null, 8, ["name", "class"])
            ], 2)) : createCommentVNode("", true)
          ], 2)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Toggle.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]);
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.textarea, textarea);
const _sfc_main$3 = defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
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
    rows: {
      type: Number,
      default: 3
    },
    maxrows: {
      type: Number,
      default: 0
    },
    autoresize: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    autofocusDelay: {
      type: Number,
      default: 100
    },
    resize: {
      type: Boolean,
      default: false
    },
    padded: {
      type: Boolean,
      default: true
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
    textareaClass: {
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
    },
    modelModifiers: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("textarea", toRef(props, "ui"), config, toRef(props, "class"));
    const { emitFormBlur, emitFormInput, inputId, color, size, name } = useFormGroup(props, config);
    const modelModifiers = ref(defu({}, props.modelModifiers, { trim: false, lazy: false, number: false, nullify: false }));
    const textarea2 = ref(null);
    const autoResize = () => {
      if (props.autoresize) {
        if (!textarea2.value) {
          return;
        }
        textarea2.value.rows = props.rows;
        const overflow = textarea2.value.style.overflow;
        textarea2.value.style.overflow = "hidden";
        const styles = (void 0).getComputedStyle(textarea2.value);
        const paddingTop = Number.parseInt(styles.paddingTop);
        const paddingBottom = Number.parseInt(styles.paddingBottom);
        const padding = paddingTop + paddingBottom;
        const lineHeight = Number.parseInt(styles.lineHeight);
        const { scrollHeight } = textarea2.value;
        const newRows = (scrollHeight - padding) / lineHeight;
        if (newRows > props.rows) {
          textarea2.value.rows = props.maxrows ? Math.min(newRows, props.maxrows) : newRows;
        }
        textarea2.value.style.overflow = overflow;
      }
    };
    const updateInput = (value) => {
      if (modelModifiers.value.trim) {
        value = value.trim();
      }
      if (modelModifiers.value.number) {
        value = looseToNumber(value);
      }
      if (modelModifiers.value.nullify) {
        value || (value = null);
      }
      emit("update:modelValue", value);
      emitFormInput();
    };
    const onInput = (event) => {
      autoResize();
      if (!modelModifiers.value.lazy) {
        updateInput(event.target.value);
      }
    };
    const onChange = (event) => {
      const value = event.target.value;
      emit("change", value);
      if (modelModifiers.value.lazy) {
        updateInput(value);
      }
      if (modelModifiers.value.trim) {
        event.target.value = value.trim();
      }
    };
    const onBlur = (event) => {
      emit("blur", event);
      emitFormBlur();
    };
    watch(() => props.modelValue, () => {
      nextTick(autoResize);
    });
    const textareaClass = computed(() => {
      var _a, _b;
      const variant = ((_b = (_a = ui.value.color) == null ? void 0 : _a[color.value]) == null ? void 0 : _b[props.variant]) || ui.value.variant[props.variant];
      return twMerge(twJoin(
        ui.value.base,
        ui.value.form,
        ui.value.rounded,
        ui.value.placeholder,
        ui.value.size[size.value],
        props.padded ? ui.value.padding[size.value] : "p-0",
        variant == null ? void 0 : variant.replaceAll("{color}", color.value),
        !props.resize && "resize-none"
      ), props.textareaClass);
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      inputId,
      textarea: textarea2,
      // eslint-disable-next-line vue/no-dupe-keys
      textareaClass,
      onInput,
      onChange,
      onBlur
    };
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  let _temp0;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _attrs))}><textarea${ssrRenderAttrs(_temp0 = mergeProps({
    id: _ctx.inputId,
    ref: "textarea",
    value: _ctx.modelValue,
    name: _ctx.name,
    rows: _ctx.rows,
    required: _ctx.required,
    disabled: _ctx.disabled,
    placeholder: _ctx.placeholder,
    class: _ctx.textareaClass
  }, _ctx.attrs), "textarea")}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Textarea.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
const _imports_0 = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.8.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20123.2%20100'%20style='enable-background:new%200%200%20123.2%20100;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{opacity:0.5;}%20.st1{fill:%2300AAB5;}%20%3c/style%3e%3cg%20class='st0'%3e%3cpath%20class='st1'%20d='M114,8V92h-5.2L72.3,55.4l-2.1-2.1L68,55.4L48.4,75.1L42,68.7l-2.1-2.1l-2.1,2.1L14.4,92H9.2V8H114%20M117,5H6.2%20V95h9.5l24.1-24.2l8.5,8.5l21.8-21.8L107.5,95h9.5V5L117,5z'/%3e%3c/g%3e%3cg%20class='st0'%3e%3cpath%20class='st1'%20d='M27,16.1c4.5,0,8.2,3.7,8.2,8.2s-3.7,8.2-8.2,8.2s-8.2-3.7-8.2-8.2S22.5,16.1,27,16.1%20M27,13.1%20c-6.2,0-11.2,5-11.2,11.2s5,11.2,11.2,11.2s11.2-5,11.2-11.2S33.2,13.1,27,13.1L27,13.1z'/%3e%3c/g%3e%3c/svg%3e";
const _sfc_main$2 = {
  name: "FileUpload",
  props: {
    picture: {
      type: String,
      default: null
    },
    inputName: {
      type: String,
      default: null
    }
  },
  methods: {
    drop(e) {
      e.preventDefault();
      this.$emit("uploadPicture", e.dataTransfer.files[0]);
      this.isDragging = false;
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    updatePicture(e) {
      this.$emit("uploadPicture", e.target.files[0]);
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["picture_upload", { "picture_upload--active": _ctx.isDragging }]
  }, _attrs))} data-v-ef7b192a><input type="file" multiple${ssrRenderAttr("name", $props.inputName || "file")}${ssrRenderAttr("id", $props.inputName || "fileInput")} class="hidden-input" accept=".pdf,.jpg,.jpeg,.png" data-v-ef7b192a><label${ssrRenderAttr("for", $props.inputName || "fileInput")} class="file-label" data-v-ef7b192a>`);
  if ($props.picture) {
    _push(`<img${ssrRenderAttr("src", $props.picture)} class="picture_preview" data-v-ef7b192a>`);
  } else {
    _push(`<img${ssrRenderAttr("src", _imports_0)} class="picture_preview" data-v-ef7b192a>`);
  }
  if (_ctx.isDragging) {
    _push(`<div data-v-ef7b192a>Release to drop files here.</div>`);
  } else {
    _push(`<div data-v-ef7b192a>Drop files here or <u data-v-ef7b192a>click here</u> to upload.</div>`);
  }
  _push(`</label></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("elements/FileUpload.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const FileUpload = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ef7b192a"]]);
const _sfc_main$1 = {
  __name: "E2REditor",
  __ssrInlineRender: true,
  props: {
    content: {
      type: Array,
      required: true
    },
    editOnInit: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const entries = ref([]);
    const currently_editing = ref(-1);
    const props = __props;
    const emit = __emit;
    watch(entries, (val) => {
      emit("update", val);
    });
    watch(props.editOnInit, (val) => {
      if (val)
        currently_editing.value = 0;
    });
    const addEntry = () => {
      entries.value.push({
        pic: null,
        text: ""
      });
      currently_editing.value = entries.value.length - 1;
    };
    const removeEntry = (index) => {
      entries.value.splice(index, 1);
    };
    const update = () => {
      emit("update", entries.value);
    };
    const addPic = (file, i2) => {
      utils.uploadFile(file).then((res) => {
        entries.value[i2].pic = res.file.filepath;
      });
      update();
    };
    const startEditing = (i2) => {
      currently_editing.value = i2;
    };
    const stopEditing = () => {
      currently_editing.value = -1;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 gap-4" }, _attrs))} data-v-db159fe2><div class="grid grid-cols-1 gap-4" data-v-db159fe2><!--[-->`);
      ssrRenderList(unref(entries), (entry, i2) => {
        _push(`<div class="e2r-entry flex gap-4" data-v-db159fe2>`);
        if (unref(currently_editing) === i2) {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(FileUpload, {
            picture: entry.pic,
            onUploadPicture: (f2) => addPic(f2, i2),
            "input-name": `entry_${i2}_pic`
          }, null, _parent));
          _push(ssrRenderComponent(unref(MdEditor), {
            modelValue: unref(entries)[i2].text,
            "onUpdate:modelValue": ($event) => unref(entries)[i2].text = $event,
            key: `entry_${i2}_editor`,
            toolbars: [
              "bold",
              "italic",
              "-",
              "title",
              "unorderedList",
              "orderedList",
              "table",
              "link",
              "=",
              "preview"
            ],
            preview: false,
            style: { "height": "300px" },
            language: "en-US"
          }, null, _parent));
          _push(`<!--]-->`);
        } else {
          _push(`<!--[-->`);
          if (entry.pic) {
            _push(`<img${ssrRenderAttr("src", entry.pic)} class="preview-pic" data-v-db159fe2>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="grow e2r-content-preview" data-v-db159fe2>`);
          _push(ssrRenderComponent(unref(VueMarkdown), {
            source: entry.text
          }, null, _parent));
          _push(`</div><!--]-->`);
        }
        _push(`<div class="flex flex-col gap-2 items-stretch justify-start" data-v-db159fe2>`);
        if (unref(currently_editing) === i2) {
          _push(ssrRenderComponent(_component_UButton, {
            block: "",
            onClick: stopEditing
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Save `);
              } else {
                return [
                  createTextVNode(" Save ")
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(ssrRenderComponent(_component_UButton, {
            block: "",
            onClick: ($event) => startEditing(i2)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Edit `);
              } else {
                return [
                  createTextVNode(" Edit ")
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        if (unref(entries).length > 1) {
          _push(ssrRenderComponent(_component_UButton, {
            block: "",
            onClick: ($event) => removeEntry(i2),
            class: _ctx.remove_entry_button,
            boxed: ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Remove `);
              } else {
                return [
                  createTextVNode(" Remove ")
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        boxed: "",
        class: "e2r-add-row",
        onClick: addEntry
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Add entry `);
          } else {
            return [
              createTextVNode(" Add entry ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("elements/E2REditor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const E2REditor = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-db159fe2"]]);
const _sfc_main = {
  __name: "Editor",
  __ssrInlineRender: true,
  setup(__props) {
    const articleTypes = [
      { value: "news", label: "News" },
      { value: "blogpost", label: "Blogpost" },
      { value: "e2r_article", label: "E2R Article" },
      { value: "event", label: "Event" },
      { value: "report", label: "Report" },
      { value: "podcast", label: "Podcast" },
      { value: "static_page", label: "Static page" }
    ];
    const router = useRouter();
    useRoute();
    const config2 = useRuntimeConfig();
    const articleType = ref(null);
    const contentRef = ref("");
    const content_type = ref("plain");
    const menuParent = ref(null);
    const menuPosition = ref(null);
    const titleRef = ref("");
    const authorRef = ref(0);
    const tagsRef = ref([]);
    const excerptRef = ref("");
    const pictureRef = ref(null);
    const picture_alt = ref("");
    const e2rContent = ref([]);
    const copied_id = ref(null);
    const urlRef = ref("");
    const users = ref([]);
    const autoTags = ref([]);
    const menu_items = ref([]);
    const has_other_content = ref(false);
    const pageReady = ref(false);
    ref(false);
    const tag = ref("");
    const isPublished = ref(false);
    const isHighlighted = ref(false);
    const last_uploads = ref([]);
    const videoLink = ref("");
    const isEditing = ref(-1);
    const startEditingE2R = ref(false);
    config2.app.baseURL;
    const generatedUrl = computed(() => {
      return `/${encodeURIComponent(
        titleRef.value.trim().replace(/\s+/g, "-").replaceAll(",", "").toLowerCase()
      )}`;
    });
    const filteredAutoTags = computed(() => {
      return autoTags.value.filter(
        (i2) => i2.toLowerCase().indexOf(tag.value) !== -1 && !tagsRef.value.includes(i2)
      );
    });
    const showAutocomplete = computed(() => {
      return tag.value.length && filteredAutoTags.value.length;
    });
    const authors = computed(() => {
      const returnee = [{ value: 0, label: "Leave blank" }];
      returnee.push(
        ...users.value.map((i2) => {
          return {
            value: i2.email,
            label: i2.first_name + " " + i2.last_name
          };
        })
      );
      return returnee;
    });
    const availableFiles = computed(
      () => last_uploads.value.map((i2, idx) => ({ index: idx, ...i2 }))
    );
    watch(content_type, (val) => {
      if (val === "e2r") {
        initE2R();
      }
    });
    watch(copied_id, (val) => {
      if (val !== null) {
        copyFileUrl(val);
      }
    });
    watch(articleType, (val) => {
      if (val === "e2r_article") {
        content_type.value = "e2r";
      }
    });
    watch(has_other_content, (val) => {
      if (val && content_type.value === "plain") {
        initE2R();
        return;
      }
      if (!val) {
        switch (content_type.value) {
          case "plain":
            e2rContent.value = [];
            break;
          case "e2r":
            contentRef.value = "";
            break;
        }
      }
    });
    watch(isPublished, (val) => {
      if (!val) {
        isHighlighted.value = false;
      }
    });
    const goBack = () => {
      router.back();
    };
    const toggleOtherContent = () => {
      has_other_content.value = !has_other_content.value;
    };
    const initE2R = () => {
      if (!Array.isArray(e2rContent.value) || !e2rContent.value.length) {
        e2rContent.value = [
          {
            pic: null,
            text: ""
          }
        ];
        startEditingE2R.value = true;
      }
    };
    const uploadPicToText = async (files, callback) => {
      const res = await Promise.all(files.map((file) => utils.uploadFile(file)));
      callback(res.map((item) => item.file.filepath));
    };
    const uploadDocument = async (files) => {
      if (files.length === 0)
        return;
      const res = await Promise.all(
        Array.from(files).map((file) => utils.uploadFile(file))
      );
      res.map((item) => {
        last_uploads.value.push(item.file);
      });
    };
    const copyFileUrl = (index) => {
      (void 0).navigator.clipboard.writeText(
        `[${availableFiles.value[index].originalFilename}](${availableFiles.value[index].filepath})`
      ).then(() => {
        useNuxtApp().$toast("Link copied to clipboard");
      });
    };
    const updatePicture = (file) => {
      utils.uploadFile(file).then((res) => {
        pictureRef.value = res.file.filepath;
      });
    };
    const updateE2R = (entries) => {
      e2rContent.value = entries;
    };
    const handleChangeTag = (input) => {
      tagsRef.value = input;
    };
    const selectAutoTag = (selectedTag) => {
      tagsRef.value.push(selectedTag);
      tag.value = "";
    };
    const resetPicture = () => {
      pictureRef.value = null;
      picture_alt.value = "";
    };
    const addYoutubeLink = () => {
      const videoKey = utils.youtubeParser(videoLink.value);
      if (videoKey) {
        contentRef.value += `

<iframe width="640" height="360" src="https://www.youtube.com/embed/${videoKey}"></iframe>`;
        videoLink.value = "";
      } else {
        useNuxtApp().$toast("Invalid youtube link");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFormGroup = __nuxt_component_0;
      const _component_USelect = __nuxt_component_4$1;
      const _component_UInput = __nuxt_component_2;
      const _component_UToggle = __nuxt_component_3;
      const _component_UTextarea = __nuxt_component_4;
      const _component_UButton = __nuxt_component_0$1;
      if (unref(pageReady)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "new-post" }, _attrs))} data-v-fb883bf4>`);
        _push(ssrRenderComponent(IeButton, { onClick: goBack }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Go Back `);
            } else {
              return [
                createTextVNode(" Go Back ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<h1 class="section-title" data-v-fb883bf4>${ssrInterpolate(unref(isEditing) > -1 ? "Editing post" : "New post")}</h1><form class="new_post-form-- grid grid-cols-2 gap-4" data-v-fb883bf4>`);
        _push(ssrRenderComponent(_component_UFormGroup, { label: "Post type" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_USelect, {
                modelValue: unref(articleType),
                "onUpdate:modelValue": ($event) => isRef(articleType) ? articleType.value = $event : null,
                class: "short",
                options: articleTypes,
                size: "md"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_USelect, {
                  modelValue: unref(articleType),
                  "onUpdate:modelValue": ($event) => isRef(articleType) ? articleType.value = $event : null,
                  class: "short",
                  options: articleTypes,
                  size: "md"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UFormGroup, { label: "Author" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_USelect, {
                modelValue: unref(authorRef),
                "onUpdate:modelValue": ($event) => isRef(authorRef) ? authorRef.value = $event : null,
                class: "short",
                options: unref(authors),
                size: "md"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_USelect, {
                  modelValue: unref(authorRef),
                  "onUpdate:modelValue": ($event) => isRef(authorRef) ? authorRef.value = $event : null,
                  class: "short",
                  options: unref(authors),
                  size: "md"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(articleType) === "static_page") {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_UFormGroup, { label: "Parent menu item" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_USelect, {
                  modelValue: unref(menuParent),
                  "onUpdate:modelValue": ($event) => isRef(menuParent) ? menuParent.value = $event : null,
                  name: "menu_parent",
                  class: "short",
                  "option-attribute": "name",
                  valueAttribute: "id",
                  options: unref(menu_items)
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_USelect, {
                    modelValue: unref(menuParent),
                    "onUpdate:modelValue": ($event) => isRef(menuParent) ? menuParent.value = $event : null,
                    name: "menu_parent",
                    class: "short",
                    "option-attribute": "name",
                    valueAttribute: "id",
                    options: unref(menu_items)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_UFormGroup, { label: "Position in dropdown" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UInput, {
                  type: "number",
                  disabled: !unref(menuParent),
                  modelValue: unref(menuPosition),
                  "onUpdate:modelValue": ($event) => isRef(menuPosition) ? menuPosition.value = $event : null
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UInput, {
                    type: "number",
                    disabled: !unref(menuParent),
                    modelValue: unref(menuPosition),
                    "onUpdate:modelValue": ($event) => isRef(menuPosition) ? menuPosition.value = $event : null
                  }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue"])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_UFormGroup, {
          label: "Title",
          class: "col-span-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(titleRef),
                "onUpdate:modelValue": ($event) => isRef(titleRef) ? titleRef.value = $event : null,
                size: "md",
                class: "grow"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  modelValue: unref(titleRef),
                  "onUpdate:modelValue": ($event) => isRef(titleRef) ? titleRef.value = $event : null,
                  size: "md",
                  class: "grow"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="col-span-2 flex gap-4" data-v-fb883bf4>`);
        _push(ssrRenderComponent(_component_UFormGroup, {
          label: "Post-url",
          class: "flex-grow"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(urlRef),
                "onUpdate:modelValue": ($event) => isRef(urlRef) ? urlRef.value = $event : null,
                placeholder: unref(generatedUrl),
                size: "md",
                class: "grow"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  modelValue: unref(urlRef),
                  "onUpdate:modelValue": ($event) => isRef(urlRef) ? urlRef.value = $event : null,
                  placeholder: unref(generatedUrl),
                  size: "md",
                  class: "grow"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UFormGroup, { label: "Published" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UToggle, {
                modelValue: unref(isPublished),
                "onUpdate:modelValue": ($event) => isRef(isPublished) ? isPublished.value = $event : null,
                class: "short",
                size: "lg"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UToggle, {
                  modelValue: unref(isPublished),
                  "onUpdate:modelValue": ($event) => isRef(isPublished) ? isPublished.value = $event : null,
                  class: "short",
                  size: "lg"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UFormGroup, { label: "Highlighted" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UToggle, {
                modelValue: unref(isHighlighted),
                "onUpdate:modelValue": ($event) => isRef(isHighlighted) ? isHighlighted.value = $event : null,
                class: "short",
                disabled: !unref(isPublished),
                size: "lg"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UToggle, {
                  modelValue: unref(isHighlighted),
                  "onUpdate:modelValue": ($event) => isRef(isHighlighted) ? isHighlighted.value = $event : null,
                  class: "short",
                  disabled: !unref(isPublished),
                  size: "lg"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_UFormGroup, {
          label: "Tags",
          class: "col-span-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="tags" data-v-fb883bf4${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Vue3TagsInput), {
                modelValue: unref(tag),
                "onUpdate:modelValue": ($event) => isRef(tag) ? tag.value = $event : null,
                tags: unref(tagsRef),
                placeholder: "",
                onOnTagsChanged: handleChangeTag,
                "add-tag-on-keys": [13, 188]
              }, null, _parent2, _scopeId));
              if (unref(showAutocomplete)) {
                _push2(`<div class="tags-autocomplete" data-v-fb883bf4${_scopeId}><!--[-->`);
                ssrRenderList(unref(filteredAutoTags), (t, i2) => {
                  _push2(ssrRenderComponent(IeButton, {
                    key: `autotag_${i2}`,
                    class: "autotag",
                    onClick: ($event) => selectAutoTag(t)
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(t)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(t), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "tags" }, [
                  createVNode(unref(Vue3TagsInput), {
                    modelValue: unref(tag),
                    "onUpdate:modelValue": ($event) => isRef(tag) ? tag.value = $event : null,
                    tags: unref(tagsRef),
                    placeholder: "",
                    onOnTagsChanged: handleChangeTag,
                    "add-tag-on-keys": [13, 188]
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "tags"]),
                  unref(showAutocomplete) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "tags-autocomplete"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredAutoTags), (t, i2) => {
                      return openBlock(), createBlock(IeButton, {
                        key: `autotag_${i2}`,
                        class: "autotag",
                        onClick: ($event) => selectAutoTag(t)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(t), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]);
                    }), 128))
                  ])) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UFormGroup, {
          label: "Excerpt",
          class: "col-span-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UTextarea, {
                name: "excerpt",
                rows: "3",
                modelValue: unref(excerptRef),
                "onUpdate:modelValue": ($event) => isRef(excerptRef) ? excerptRef.value = $event : null
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UTextarea, {
                  name: "excerpt",
                  rows: "3",
                  modelValue: unref(excerptRef),
                  "onUpdate:modelValue": ($event) => isRef(excerptRef) ? excerptRef.value = $event : null
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UFormGroup, {
          label: "Preview picture",
          class: "col-span-2"
        }, {
          hint: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(pictureRef)) {
                _push2(ssrRenderComponent(_component_UButton, {
                  onClick: resetPicture,
                  size: "xs"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Remove picture `);
                    } else {
                      return [
                        createTextVNode(" Remove picture ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(pictureRef) ? (openBlock(), createBlock(_component_UButton, {
                  key: 0,
                  onClick: resetPicture,
                  size: "xs"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Remove picture ")
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(FileUpload, {
                picture: unref(pictureRef),
                onUploadPicture: updatePicture
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(FileUpload, {
                  picture: unref(pictureRef),
                  onUploadPicture: updatePicture
                }, null, 8, ["picture"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UFormGroup, {
          label: "Picture alt text",
          class: "col-span-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                type: "text",
                name: "picture_alt",
                modelValue: unref(picture_alt),
                "onUpdate:modelValue": ($event) => isRef(picture_alt) ? picture_alt.value = $event : null
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  type: "text",
                  name: "picture_alt",
                  modelValue: unref(picture_alt),
                  "onUpdate:modelValue": ($event) => isRef(picture_alt) ? picture_alt.value = $event : null
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<h3 class="col-span-2" data-v-fb883bf4>Post content</h3>`);
        _push(ssrRenderComponent(_component_UFormGroup, {
          label: "Default-view",
          class: "col-span-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_USelect, {
                modelValue: unref(content_type),
                "onUpdate:modelValue": ($event) => isRef(content_type) ? content_type.value = $event : null,
                name: "default-content-type",
                options: [
                  { value: "plain", label: "Plain text" },
                  { value: "e2r", label: "Easy-to-read" }
                ]
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_USelect, {
                  modelValue: unref(content_type),
                  "onUpdate:modelValue": ($event) => isRef(content_type) ? content_type.value = $event : null,
                  name: "default-content-type",
                  options: [
                    { value: "plain", label: "Plain text" },
                    { value: "e2r", label: "Easy-to-read" }
                  ]
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UFormGroup, { label: "Upload a PDF" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                type: "file",
                accept: ".pdf",
                class: "short",
                onChange: uploadDocument,
                multiple: ""
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  type: "file",
                  accept: ".pdf",
                  class: "short",
                  onChange: uploadDocument,
                  multiple: ""
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UFormGroup, {
          label: `Select to copy (${unref(last_uploads).length} file${unref(last_uploads).length != 1 ? "s" : ""} uploaded)`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_USelect, {
                name: "uploaded_files",
                modelValue: unref(copied_id),
                "onUpdate:modelValue": ($event) => isRef(copied_id) ? copied_id.value = $event : null,
                class: "short",
                disabled: !unref(availableFiles).length,
                placeholder: "\u2B05\uFE0F Upload a file to activate",
                options: unref(availableFiles),
                "option-attribute": "originalFilename",
                "value-attribute": "index"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_USelect, {
                  name: "uploaded_files",
                  modelValue: unref(copied_id),
                  "onUpdate:modelValue": ($event) => isRef(copied_id) ? copied_id.value = $event : null,
                  class: "short",
                  disabled: !unref(availableFiles).length,
                  placeholder: "\u2B05\uFE0F Upload a file to activate",
                  options: unref(availableFiles),
                  "option-attribute": "originalFilename",
                  "value-attribute": "index"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "options"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UFormGroup, {
          label: "Add youtube video",
          class: "col-span-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="col-span-2 flex gap-4" data-v-fb883bf4${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UInput, {
                type: "text",
                modelValue: unref(videoLink),
                "onUpdate:modelValue": ($event) => isRef(videoLink) ? videoLink.value = $event : null,
                placeholder: "Paste youtube link here",
                class: "flex-grow"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: addYoutubeLink,
                size: "xs"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Add `);
                  } else {
                    return [
                      createTextVNode(" Add ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "col-span-2 flex gap-4" }, [
                  createVNode(_component_UInput, {
                    type: "text",
                    modelValue: unref(videoLink),
                    "onUpdate:modelValue": ($event) => isRef(videoLink) ? videoLink.value = $event : null,
                    placeholder: "Paste youtube link here",
                    class: "flex-grow"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_UButton, {
                    onClick: addYoutubeLink,
                    size: "xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Add ")
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(content_type) === "plain") {
          _push(ssrRenderComponent(_component_UFormGroup, {
            label: "Content",
            class: "col-span-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(MdEditor), {
                  modelValue: unref(contentRef),
                  "onUpdate:modelValue": ($event) => isRef(contentRef) ? contentRef.value = $event : null,
                  height: "400px",
                  toolbars: [
                    "bold",
                    "italic",
                    "-",
                    "title",
                    "unorderedList",
                    "orderedList",
                    "table",
                    "link",
                    "-",
                    "image",
                    "=",
                    "preview",
                    "catalog",
                    "fullscreen"
                  ],
                  onOnUploadImg: uploadPicToText,
                  language: "en-US"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(MdEditor), {
                    modelValue: unref(contentRef),
                    "onUpdate:modelValue": ($event) => isRef(contentRef) ? contentRef.value = $event : null,
                    height: "400px",
                    toolbars: [
                      "bold",
                      "italic",
                      "-",
                      "title",
                      "unorderedList",
                      "orderedList",
                      "table",
                      "link",
                      "-",
                      "image",
                      "=",
                      "preview",
                      "catalog",
                      "fullscreen"
                    ],
                    onOnUploadImg: uploadPicToText,
                    language: "en-US"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(content_type) === "e2r") {
          _push(ssrRenderComponent(_component_UFormGroup, {
            label: "E2R Content",
            class: "col-span-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(E2REditor, {
                  onUpdate: ($event) => updateE2R($event),
                  content: unref(e2rContent),
                  "edit-on-init": unref(startEditingE2R)
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(E2REditor, {
                    onUpdate: ($event) => updateE2R($event),
                    content: unref(e2rContent),
                    "edit-on-init": unref(startEditingE2R)
                  }, null, 8, ["onUpdate", "content", "edit-on-init"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(has_other_content)) {
          _push(`<!--[-->`);
          if (unref(content_type) === "e2r") {
            _push(ssrRenderComponent(_component_UFormGroup, {
              label: "Content",
              class: "col-span-2"
            }, createSlots({
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(MdEditor), {
                    modelValue: unref(contentRef),
                    "onUpdate:modelValue": ($event) => isRef(contentRef) ? contentRef.value = $event : null,
                    height: "400px",
                    toolbars: [
                      "bold",
                      "italic",
                      "-",
                      "title",
                      "unorderedList",
                      "orderedList",
                      "table",
                      "link",
                      "-",
                      "image",
                      "=",
                      "preview",
                      "catalog",
                      "fullscreen"
                    ],
                    onOnUploadImg: uploadPicToText,
                    language: "en-US"
                  }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(MdEditor), {
                      modelValue: unref(contentRef),
                      "onUpdate:modelValue": ($event) => isRef(contentRef) ? contentRef.value = $event : null,
                      height: "400px",
                      toolbars: [
                        "bold",
                        "italic",
                        "-",
                        "title",
                        "unorderedList",
                        "orderedList",
                        "table",
                        "link",
                        "-",
                        "image",
                        "=",
                        "preview",
                        "catalog",
                        "fullscreen"
                      ],
                      onOnUploadImg: uploadPicToText,
                      language: "en-US"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 2
            }, [
              unref(has_other_content) ? {
                name: "label",
                fn: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(` Content `);
                    _push2(ssrRenderComponent(_component_UButton, {
                      onClick: toggleOtherContent,
                      size: "xs"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(` Remove plain text content `);
                        } else {
                          return [
                            createTextVNode(" Remove plain text content ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent2, _scopeId));
                  } else {
                    return [
                      createTextVNode(" Content "),
                      createVNode(_component_UButton, {
                        onClick: toggleOtherContent,
                        size: "xs"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Remove plain text content ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                key: "0"
              } : void 0
            ]), _parent));
          } else {
            _push(`<!---->`);
          }
          if (unref(content_type) === "plain") {
            _push(ssrRenderComponent(_component_UFormGroup, {
              label: "E2R Content",
              class: "col-span-2"
            }, createSlots({
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(E2REditor, {
                    onUpdate: ($event) => updateE2R($event),
                    content: unref(e2rContent),
                    "edit-on-init": unref(startEditingE2R)
                  }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(E2REditor, {
                      onUpdate: ($event) => updateE2R($event),
                      content: unref(e2rContent),
                      "edit-on-init": unref(startEditingE2R)
                    }, null, 8, ["onUpdate", "content", "edit-on-init"])
                  ];
                }
              }),
              _: 2
            }, [
              unref(has_other_content) ? {
                name: "label",
                fn: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(` E2R Content `);
                    _push2(ssrRenderComponent(_component_UButton, {
                      onClick: toggleOtherContent,
                      size: "xs"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(` Remove easy-to-read content `);
                        } else {
                          return [
                            createTextVNode(" Remove easy-to-read content ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent2, _scopeId));
                  } else {
                    return [
                      createTextVNode(" E2R Content "),
                      createVNode(_component_UButton, {
                        onClick: toggleOtherContent,
                        size: "xs"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Remove easy-to-read content ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                key: "0"
              } : void 0
            ]), _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="other_content_row col-span-2 flex flex-center" data-v-fb883bf4>`);
        if (!unref(has_other_content)) {
          _push(ssrRenderComponent(_component_UButton, {
            onClick: toggleOtherContent,
            size: "xl"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(`Add ${unref(content_type) === "e2r" ? "plain text" : "easy-to-read"} content`)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(`Add ${unref(content_type) === "e2r" ? "plain text" : "easy-to-read"} content`), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        _push(ssrRenderComponent(_component_UButton, {
          class: "submit_button col-span-2",
          block: "",
          type: "submit",
          size: "xl"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Submit `);
            } else {
              return [
                createTextVNode(" Submit ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</form></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Admin/Editor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Editor = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fb883bf4"]]);

export { Editor as default };
//# sourceMappingURL=Editor-DZjK_tjL.mjs.map
