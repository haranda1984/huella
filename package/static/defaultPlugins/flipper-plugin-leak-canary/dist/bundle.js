"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// plugins/public/leak_canary/index.tsx
var leak_canary_exports = {};
__export(leak_canary_exports, {
  default: () => LeakCanary
});
module.exports = __toCommonJS(leak_canary_exports);
var import_react = __toESM(require("react"));
var import_flipper = require("flipper");

// plugins/public/leak_canary/processLeakString.tsx
function safeAddChildElementId(childElementId, elementId, elements) {
  const element = elements.get(elementId);
  if (element && element.children) {
    element.children.push(childElementId);
  }
}
function toObjectMap(dict, deep = false) {
  const result = {};
  for (let [key, value] of dict.entries()) {
    if (deep && value instanceof Map) {
      value = toObjectMap(value, true);
    }
    result[String(key)] = value;
  }
  return result;
}
function getElementSimple(str, id) {
  const match = str.match(
    /\* (GC ROOT )?(\u21B3 )?([a-z]* )?([^A-Z]*.)?([A-Z].*)/
  );
  let name = "N/A";
  if (match) {
    name = match[5];
  }
  return {
    id,
    name,
    expanded: true,
    children: [],
    attributes: [],
    data: {},
    decoration: "",
    extraInfo: {}
  };
}
var BEGIN_DETAILS_SECTION_INDICATOR = "* Details:";
var END_DETAILS_SECTION_INDICATOR = "* Excluded Refs:";
var STATIC_PREFIX = "static ";
var LEAK_BEGIN_INDICATOR = "has leaked:";
var RETAINED_SIZE_INDICATOR = "* Retaining: ";
function generateFieldsList(lines, i) {
  const staticFields = /* @__PURE__ */ new Map();
  const instanceFields = /* @__PURE__ */ new Map();
  let staticValues = /* @__PURE__ */ new Map();
  let instanceValues = /* @__PURE__ */ new Map();
  let elementId = -1;
  let elementIdStr = "";
  const packages = /* @__PURE__ */ new Map();
  while (i < lines.length && !lines[i].startsWith(END_DETAILS_SECTION_INDICATOR)) {
    const line = lines[i];
    if (line.startsWith("*")) {
      if (elementId != -1) {
        staticFields.set(elementIdStr, staticValues);
        instanceFields.set(elementIdStr, instanceValues);
        staticValues = /* @__PURE__ */ new Map();
        instanceValues = /* @__PURE__ */ new Map();
      }
      elementId++;
      elementIdStr = String(elementId);
      let pkg = "unknown";
      const match = line.match(/\* (.*)(of|Class) (.*)/);
      if (match) {
        pkg = match[3];
      }
      packages.set(elementIdStr, pkg);
    } else {
      const match = line.match(/\|\s+(.*) = (.*)/);
      if (match) {
        const fieldName = match[1];
        const fieldValue = match[2];
        if (fieldName.startsWith(STATIC_PREFIX)) {
          const strippedFieldName = fieldName.substr(7);
          staticValues.set(strippedFieldName, fieldValue);
        } else {
          instanceValues.set(fieldName, fieldValue);
        }
      }
    }
    i++;
  }
  staticFields.set(elementIdStr, staticValues);
  instanceFields.set(elementIdStr, instanceValues);
  return { staticFields, instanceFields, packages };
}
function processLeak(output, leakInfo) {
  const lines = leakInfo.split("\n");
  const elements = /* @__PURE__ */ new Map();
  const elementsSimple = /* @__PURE__ */ new Map();
  let rootElementId = "";
  let i = 0;
  while (i < lines.length && !lines[i].endsWith(LEAK_BEGIN_INDICATOR)) {
    i++;
  }
  i++;
  if (i >= lines.length) {
    return output;
  }
  let elementId = 0;
  let elementIdStr = String(elementId);
  let leakedObjName = "";
  while (i < lines.length && lines[i].startsWith("*")) {
    const line = lines[i];
    const prevElementIdStr = String(elementId - 1);
    if (elementId !== 0) {
      safeAddChildElementId(elementIdStr, prevElementIdStr, elements);
      safeAddChildElementId(elementIdStr, prevElementIdStr, elementsSimple);
    } else {
      rootElementId = elementIdStr;
    }
    const element = getElementSimple(line, elementIdStr);
    leakedObjName = element.name;
    elements.set(elementIdStr, element);
    elementsSimple.set(elementIdStr, element);
    i++;
    elementId++;
    elementIdStr = String(elementId);
  }
  while (i < lines.length && !lines[i].startsWith(RETAINED_SIZE_INDICATOR) && !lines[i].startsWith(BEGIN_DETAILS_SECTION_INDICATOR)) {
    i++;
  }
  let retainedSize = "unknown size";
  if (lines[i].startsWith(RETAINED_SIZE_INDICATOR)) {
    const match = lines[i].match(/\* Retaining: (.*)./);
    if (match) {
      retainedSize = match[1];
    }
  }
  while (i < lines.length && !lines[i].startsWith(BEGIN_DETAILS_SECTION_INDICATOR)) {
    i++;
  }
  i++;
  const { staticFields, instanceFields, packages } = generateFieldsList(lines, i);
  for (const [elementId2, pkg] of packages.entries()) {
    const element = elements.get(elementId2);
    if (!element) {
      continue;
    }
    const match = element.name.match(/([^\. ]*)(.*)/);
    if (match && match.length === 3) {
      element.name = pkg + match[2];
    }
  }
  output.push({
    title: leakedObjName,
    root: rootElementId,
    elements: toObjectMap(elements),
    elementsSimple: toObjectMap(elementsSimple),
    staticFields: toObjectMap(staticFields, true),
    instanceFields: toObjectMap(instanceFields, true),
    retainedSize
  });
  return output;
}
function processLeaks(leakInfos) {
  const newLeaks = leakInfos.reduce(processLeak, []);
  return newLeaks;
}

// plugins/public/leak_canary/index.tsx
var Window = (0, import_flipper.styled)(import_flipper.FlexRow)({
  height: "100%",
  flex: 1
});
var ToolbarItem = (0, import_flipper.styled)(import_flipper.FlexRow)({
  alignItems: "center",
  marginLeft: "8px"
});
var LeakCanary = class extends import_flipper.FlipperPlugin {
  constructor() {
    super(...arguments);
    this.state = {
      leaks: [],
      selectedIdx: null,
      selectedEid: null,
      showFullClassPaths: false,
      leaksCount: 0
    };
    this._addNewLeaks = (incomingLeaks) => {
      const newLeaks = incomingLeaks.slice(this.state.leaksCount);
      const leaks = this.state.leaks;
      for (let i = 0; i < newLeaks.length; i++) {
        leaks.push(newLeaks[i]);
      }
      this.setState({
        leaks,
        leaksCount: leaks.length
      });
    };
    this._adaptLeak2 = (leak) => {
      return {
        title: leak.title,
        root: leak.root,
        elements: leak.elements,
        elementsSimple: leak.elements,
        staticFields: {},
        instanceFields: {},
        retainedSize: leak.retainedSize,
        details: leak.details
      };
    };
    this._clearLeaks = () => {
      this.setState({
        leaks: [],
        leaksCount: 0,
        selectedIdx: null,
        selectedEid: null
      });
      this.client.call("clear").catch((e) => {
        console.warn("[LeakCanary] clear failed with error", e);
      });
    };
    this._selectElement = (leakIdx, eid) => {
      this.setState({
        selectedIdx: leakIdx,
        selectedEid: eid
      });
    };
    this._toggleElement = (leakIdx, eid) => {
      const { leaks } = this.state;
      const leak = leaks[leakIdx];
      const element = leak.elements[eid];
      const elementSimple = leak.elementsSimple[eid];
      if (!element || !elementSimple) {
        return;
      }
      element.expanded = !element.expanded;
      elementSimple.expanded = !elementSimple.expanded;
      this.setState({
        leaks
      });
    };
  }
  init() {
    this.client.subscribe("reportLeak", (results) => {
      this._addNewLeaks(processLeaks(results.leaks));
    });
    this.client.subscribe("reportLeak2", (results) => {
      this._addNewLeaks(results.leaks.map(this._adaptLeak2));
    });
  }
  _extractValue(value, _) {
    if (!isNaN(value)) {
      return { mutable: false, type: "number", value };
    } else if (value == "true" || value == "false") {
      return { mutable: false, type: "boolean", value };
    } else if (value == "null") {
      return { mutable: false, type: "null", value };
    }
    return { mutable: false, type: "enum", value };
  }
  renderSidebar() {
    const { selectedIdx, selectedEid, leaks } = this.state;
    if (selectedIdx == null || selectedEid == null) {
      return null;
    }
    const leak = leaks[selectedIdx];
    const staticFields = leak.staticFields[selectedEid];
    const instanceFields = leak.instanceFields[selectedEid];
    return /* @__PURE__ */ import_react.default.createElement(import_flipper.Sidebar, { position: "right", width: 600, minWidth: 300, maxWidth: 900 }, instanceFields && /* @__PURE__ */ import_react.default.createElement(import_flipper.Panel, { heading: "Instance", floating: false, grow: false }, /* @__PURE__ */ import_react.default.createElement(
      import_flipper.ManagedDataInspector,
      {
        data: instanceFields,
        expandRoot: true,
        extractValue: this._extractValue
      }
    )), staticFields && /* @__PURE__ */ import_react.default.createElement(import_flipper.Panel, { heading: "Static", floating: false, grow: false }, /* @__PURE__ */ import_react.default.createElement(
      import_flipper.ManagedDataInspector,
      {
        data: staticFields,
        expandRoot: true,
        extractValue: this._extractValue
      }
    )), leak.details && /* @__PURE__ */ import_react.default.createElement(import_flipper.Panel, { heading: "Details", floating: false, grow: false }, /* @__PURE__ */ import_react.default.createElement("pre", null, leak.details)));
  }
  render() {
    const { selectedIdx, selectedEid, showFullClassPaths } = this.state;
    const sidebar = this.renderSidebar();
    return /* @__PURE__ */ import_react.default.createElement(Window, null, /* @__PURE__ */ import_react.default.createElement(import_flipper.FlexColumn, { grow: true }, /* @__PURE__ */ import_react.default.createElement(import_flipper.FlexColumn, { grow: true, scrollable: true }, this.state.leaks.map((leak, idx) => {
      const elements = showFullClassPaths ? leak.elements : leak.elementsSimple;
      const selected = selectedIdx == idx ? selectedEid : null;
      return /* @__PURE__ */ import_react.default.createElement(
        import_flipper.Panel,
        {
          key: idx,
          collapsable: true,
          padded: false,
          heading: leak.title,
          floating: true,
          accessory: leak.retainedSize
        },
        /* @__PURE__ */ import_react.default.createElement(
          import_flipper.ElementsInspector,
          {
            onElementSelected: (eid) => {
              this._selectElement(idx, eid);
            },
            onElementHovered: () => {
            },
            onElementExpanded: (eid) => {
              this._toggleElement(idx, eid);
            },
            selected,
            searchResults: null,
            root: leak.root,
            elements,
            scrollable: false
          }
        )
      );
    })), /* @__PURE__ */ import_react.default.createElement(import_flipper.Toolbar, null, /* @__PURE__ */ import_react.default.createElement(ToolbarItem, null, /* @__PURE__ */ import_react.default.createElement(import_flipper.Button, { onClick: this._clearLeaks }, "Clear")), /* @__PURE__ */ import_react.default.createElement(ToolbarItem, null, /* @__PURE__ */ import_react.default.createElement(
      import_flipper.Checkbox,
      {
        checked: showFullClassPaths,
        onChange: (checked) => {
          this.setState({ showFullClassPaths: checked });
        }
      }
    ), "Show full class path"))), sidebar);
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vaW5kZXgudHN4IiwgIi4uL3Byb2Nlc3NMZWFrU3RyaW5nLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuLy8gVE9ETzogRml4IHRoaXMgdGhlIG5leHQgdGltZSB0aGUgZmlsZSBpcyBlZGl0ZWQuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcnVsZXNkaXIvbm8tcmVzdHJpY3RlZC1pbXBvcnRzLWNsb25lXG5pbXBvcnQge1xuICBQYW5lbCxcbiAgRmxleFJvdyxcbiAgRWxlbWVudHNJbnNwZWN0b3IsXG4gIEZsZXhDb2x1bW4sXG4gIE1hbmFnZWREYXRhSW5zcGVjdG9yLFxuICBTaWRlYmFyLFxuICBUb29sYmFyLFxuICBDaGVja2JveCxcbiAgRmxpcHBlclBsdWdpbixcbiAgQnV0dG9uLFxuICBzdHlsZWQsXG4gIERhdGFEZXNjcmlwdGlvblR5cGUsXG59IGZyb20gJ2ZsaXBwZXInO1xuLy8gVE9ETzogRml4IHRoaXMgdGhlIG5leHQgdGltZSB0aGUgZmlsZSBpcyBlZGl0ZWQuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcnVsZXNkaXIvbm8tcmVzdHJpY3RlZC1pbXBvcnRzLWNsb25lXG5pbXBvcnQge0VsZW1lbnR9IGZyb20gJ2ZsaXBwZXInO1xuaW1wb3J0IHtwcm9jZXNzTGVha3N9IGZyb20gJy4vcHJvY2Vzc0xlYWtTdHJpbmcnO1xuXG50eXBlIFN0YXRlID0ge1xuICBsZWFrczogTGVha1tdO1xuICBzZWxlY3RlZElkeDogbnVtYmVyIHwgbnVsbDtcbiAgc2VsZWN0ZWRFaWQ6IHN0cmluZyB8IG51bGw7XG4gIHNob3dGdWxsQ2xhc3NQYXRoczogYm9vbGVhbjtcbiAgbGVha3NDb3VudDogbnVtYmVyO1xufTtcblxudHlwZSBMZWFrUmVwb3J0ID0ge1xuICBsZWFrczogc3RyaW5nW107XG59O1xuXG50eXBlIExlYWtDYW5hcnkyUmVwb3J0ID0ge1xuICBsZWFrczogTGVhazJbXTtcbn07XG5cbmV4cG9ydCB0eXBlIEZpZWxkcyA9IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuZXhwb3J0IHR5cGUgTGVhayA9IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgcm9vdDogc3RyaW5nO1xuICBlbGVtZW50czoge1trZXk6IHN0cmluZ106IEVsZW1lbnR9O1xuICBlbGVtZW50c1NpbXBsZToge1trZXk6IHN0cmluZ106IEVsZW1lbnR9O1xuICBpbnN0YW5jZUZpZWxkczoge1trZXk6IHN0cmluZ106IEZpZWxkc307XG4gIHN0YXRpY0ZpZWxkczoge1trZXk6IHN0cmluZ106IEZpZWxkc307XG4gIHJldGFpbmVkU2l6ZTogc3RyaW5nO1xuICBkZXRhaWxzPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgTGVhazIgPSB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHJvb3Q6IHN0cmluZztcbiAgZWxlbWVudHM6IHtba2V5OiBzdHJpbmddOiBFbGVtZW50fTtcbiAgcmV0YWluZWRTaXplOiBzdHJpbmc7XG4gIGRldGFpbHM6IHN0cmluZztcbn07XG5cbmNvbnN0IFdpbmRvdyA9IHN0eWxlZChGbGV4Um93KSh7XG4gIGhlaWdodDogJzEwMCUnLFxuICBmbGV4OiAxLFxufSk7XG5cbmNvbnN0IFRvb2xiYXJJdGVtID0gc3R5bGVkKEZsZXhSb3cpKHtcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIG1hcmdpbkxlZnQ6ICc4cHgnLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExlYWtDYW5hcnk8UGVyc2lzdGVkU3RhdGU+IGV4dGVuZHMgRmxpcHBlclBsdWdpbjxcbiAgU3RhdGUsXG4gIHt0eXBlOiAnTGVha0NhbmFyeSd9LFxuICBQZXJzaXN0ZWRTdGF0ZVxuPiB7XG4gIHN0YXRlOiBTdGF0ZSA9IHtcbiAgICBsZWFrczogW10sXG4gICAgc2VsZWN0ZWRJZHg6IG51bGwsXG4gICAgc2VsZWN0ZWRFaWQ6IG51bGwsXG4gICAgc2hvd0Z1bGxDbGFzc1BhdGhzOiBmYWxzZSxcbiAgICBsZWFrc0NvdW50OiAwLFxuICB9O1xuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jbGllbnQuc3Vic2NyaWJlKCdyZXBvcnRMZWFrJywgKHJlc3VsdHM6IExlYWtSZXBvcnQpID0+IHtcbiAgICAgIHRoaXMuX2FkZE5ld0xlYWtzKHByb2Nlc3NMZWFrcyhyZXN1bHRzLmxlYWtzKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNsaWVudC5zdWJzY3JpYmUoJ3JlcG9ydExlYWsyJywgKHJlc3VsdHM6IExlYWtDYW5hcnkyUmVwb3J0KSA9PiB7XG4gICAgICB0aGlzLl9hZGROZXdMZWFrcyhyZXN1bHRzLmxlYWtzLm1hcCh0aGlzLl9hZGFwdExlYWsyKSk7XG4gICAgfSk7XG4gIH1cblxuICBfYWRkTmV3TGVha3MgPSAoaW5jb21pbmdMZWFrczogTGVha1tdKSA9PiB7XG4gICAgLy8gV2Ugb25seSBwcm9jZXNzIG5ldyBsZWFrcyBpbnN0ZWFkIG9mIHJlcGxhY2luZyB0aGUgd2hvbGUgbGlzdCBpbiBvcmRlclxuICAgIC8vIHRvIGJvdGggYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgYW5kIHRvIHByZXNlcnZlIHRoZSBleHBhbmRlZC9cbiAgICAvLyBjb2xsYXBzZWQgc3RhdGUgb2YgdGhlIHRyZWUgdmlld1xuICAgIGNvbnN0IG5ld0xlYWtzID0gaW5jb21pbmdMZWFrcy5zbGljZSh0aGlzLnN0YXRlLmxlYWtzQ291bnQpO1xuICAgIGNvbnN0IGxlYWtzID0gdGhpcy5zdGF0ZS5sZWFrcztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0xlYWtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZWFrcy5wdXNoKG5ld0xlYWtzW2ldKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGxlYWtzOiBsZWFrcyxcbiAgICAgIGxlYWtzQ291bnQ6IGxlYWtzLmxlbmd0aCxcbiAgICB9KTtcbiAgfTtcblxuICBfYWRhcHRMZWFrMiA9IChsZWFrOiBMZWFrMik6IExlYWsgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogbGVhay50aXRsZSxcbiAgICAgIHJvb3Q6IGxlYWsucm9vdCxcbiAgICAgIGVsZW1lbnRzOiBsZWFrLmVsZW1lbnRzLFxuICAgICAgZWxlbWVudHNTaW1wbGU6IGxlYWsuZWxlbWVudHMsXG4gICAgICBzdGF0aWNGaWVsZHM6IHt9LFxuICAgICAgaW5zdGFuY2VGaWVsZHM6IHt9LFxuICAgICAgcmV0YWluZWRTaXplOiBsZWFrLnJldGFpbmVkU2l6ZSxcbiAgICAgIGRldGFpbHM6IGxlYWsuZGV0YWlscyxcbiAgICB9O1xuICB9O1xuXG4gIF9jbGVhckxlYWtzID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbGVha3M6IFtdLFxuICAgICAgbGVha3NDb3VudDogMCxcbiAgICAgIHNlbGVjdGVkSWR4OiBudWxsLFxuICAgICAgc2VsZWN0ZWRFaWQ6IG51bGwsXG4gICAgfSk7XG4gICAgdGhpcy5jbGllbnQuY2FsbCgnY2xlYXInKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgY29uc29sZS53YXJuKCdbTGVha0NhbmFyeV0gY2xlYXIgZmFpbGVkIHdpdGggZXJyb3InLCBlKTtcbiAgICB9KTtcbiAgfTtcblxuICBfc2VsZWN0RWxlbWVudCA9IChsZWFrSWR4OiBudW1iZXIsIGVpZDogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZElkeDogbGVha0lkeCxcbiAgICAgIHNlbGVjdGVkRWlkOiBlaWQsXG4gICAgfSk7XG4gIH07XG5cbiAgX3RvZ2dsZUVsZW1lbnQgPSAobGVha0lkeDogbnVtYmVyLCBlaWQ6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHtsZWFrc30gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGxlYWsgPSBsZWFrc1tsZWFrSWR4XTtcblxuICAgIGNvbnN0IGVsZW1lbnQgPSBsZWFrLmVsZW1lbnRzW2VpZF07XG4gICAgY29uc3QgZWxlbWVudFNpbXBsZSA9IGxlYWsuZWxlbWVudHNTaW1wbGVbZWlkXTtcbiAgICBpZiAoIWVsZW1lbnQgfHwgIWVsZW1lbnRTaW1wbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxlbWVudC5leHBhbmRlZCA9ICFlbGVtZW50LmV4cGFuZGVkO1xuICAgIGVsZW1lbnRTaW1wbGUuZXhwYW5kZWQgPSAhZWxlbWVudFNpbXBsZS5leHBhbmRlZDtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbGVha3M6IGxlYWtzLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHaXZlbiBhIHNwZWNpZmljIHN0cmluZyB2YWx1ZSwgZGV0ZXJtaW5lcyB3aGF0IERhdGFJbnNwZWN0b3IgdHlwZSB0byB0cmVhdFxuICAgKiBpdCBhcy4gRW5zdXJlcyB0aGF0IG51bWJlcnMsIGJvb2xzLCBldGMgcmVuZGVyIGNvcnJlY3RseS5cbiAgICovXG4gIF9leHRyYWN0VmFsdWUoXG4gICAgdmFsdWU6IGFueSxcbiAgICBfOiBudW1iZXIsIC8vIGRlcHRoXG4gICk6IHttdXRhYmxlOiBib29sZWFuOyB0eXBlOiBEYXRhRGVzY3JpcHRpb25UeXBlOyB2YWx1ZTogYW55fSB7XG4gICAgaWYgKCFpc05hTih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB7bXV0YWJsZTogZmFsc2UsIHR5cGU6ICdudW1iZXInLCB2YWx1ZTogdmFsdWV9O1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gJ3RydWUnIHx8IHZhbHVlID09ICdmYWxzZScpIHtcbiAgICAgIHJldHVybiB7bXV0YWJsZTogZmFsc2UsIHR5cGU6ICdib29sZWFuJywgdmFsdWU6IHZhbHVlfTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09ICdudWxsJykge1xuICAgICAgcmV0dXJuIHttdXRhYmxlOiBmYWxzZSwgdHlwZTogJ251bGwnLCB2YWx1ZTogdmFsdWV9O1xuICAgIH1cbiAgICByZXR1cm4ge211dGFibGU6IGZhbHNlLCB0eXBlOiAnZW51bScsIHZhbHVlOiB2YWx1ZX07XG4gIH1cblxuICByZW5kZXJTaWRlYmFyKCkge1xuICAgIGNvbnN0IHtzZWxlY3RlZElkeCwgc2VsZWN0ZWRFaWQsIGxlYWtzfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBpZiAoc2VsZWN0ZWRJZHggPT0gbnVsbCB8fCBzZWxlY3RlZEVpZCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBsZWFrID0gbGVha3Nbc2VsZWN0ZWRJZHhdO1xuICAgIGNvbnN0IHN0YXRpY0ZpZWxkcyA9IGxlYWsuc3RhdGljRmllbGRzW3NlbGVjdGVkRWlkXTtcbiAgICBjb25zdCBpbnN0YW5jZUZpZWxkcyA9IGxlYWsuaW5zdGFuY2VGaWVsZHNbc2VsZWN0ZWRFaWRdO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTaWRlYmFyIHBvc2l0aW9uPVwicmlnaHRcIiB3aWR0aD17NjAwfSBtaW5XaWR0aD17MzAwfSBtYXhXaWR0aD17OTAwfT5cbiAgICAgICAge2luc3RhbmNlRmllbGRzICYmIChcbiAgICAgICAgICA8UGFuZWwgaGVhZGluZz17J0luc3RhbmNlJ30gZmxvYXRpbmc9e2ZhbHNlfSBncm93PXtmYWxzZX0+XG4gICAgICAgICAgICA8TWFuYWdlZERhdGFJbnNwZWN0b3JcbiAgICAgICAgICAgICAgZGF0YT17aW5zdGFuY2VGaWVsZHN9XG4gICAgICAgICAgICAgIGV4cGFuZFJvb3RcbiAgICAgICAgICAgICAgZXh0cmFjdFZhbHVlPXt0aGlzLl9leHRyYWN0VmFsdWV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvUGFuZWw+XG4gICAgICAgICl9XG4gICAgICAgIHtzdGF0aWNGaWVsZHMgJiYgKFxuICAgICAgICAgIDxQYW5lbCBoZWFkaW5nPXsnU3RhdGljJ30gZmxvYXRpbmc9e2ZhbHNlfSBncm93PXtmYWxzZX0+XG4gICAgICAgICAgICA8TWFuYWdlZERhdGFJbnNwZWN0b3JcbiAgICAgICAgICAgICAgZGF0YT17c3RhdGljRmllbGRzfVxuICAgICAgICAgICAgICBleHBhbmRSb290XG4gICAgICAgICAgICAgIGV4dHJhY3RWYWx1ZT17dGhpcy5fZXh0cmFjdFZhbHVlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L1BhbmVsPlxuICAgICAgICApfVxuICAgICAgICB7bGVhay5kZXRhaWxzICYmIChcbiAgICAgICAgICA8UGFuZWwgaGVhZGluZz17J0RldGFpbHMnfSBmbG9hdGluZz17ZmFsc2V9IGdyb3c9e2ZhbHNlfT5cbiAgICAgICAgICAgIDxwcmU+e2xlYWsuZGV0YWlsc308L3ByZT5cbiAgICAgICAgICA8L1BhbmVsPlxuICAgICAgICApfVxuICAgICAgPC9TaWRlYmFyPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3NlbGVjdGVkSWR4LCBzZWxlY3RlZEVpZCwgc2hvd0Z1bGxDbGFzc1BhdGhzfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qgc2lkZWJhciA9IHRoaXMucmVuZGVyU2lkZWJhcigpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxXaW5kb3c+XG4gICAgICAgIDxGbGV4Q29sdW1uIGdyb3c+XG4gICAgICAgICAgPEZsZXhDb2x1bW4gZ3JvdyBzY3JvbGxhYmxlPlxuICAgICAgICAgICAge3RoaXMuc3RhdGUubGVha3MubWFwKChsZWFrOiBMZWFrLCBpZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IHNob3dGdWxsQ2xhc3NQYXRoc1xuICAgICAgICAgICAgICAgID8gbGVhay5lbGVtZW50c1xuICAgICAgICAgICAgICAgIDogbGVhay5lbGVtZW50c1NpbXBsZTtcblxuICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHNlbGVjdGVkSWR4ID09IGlkeCA/IHNlbGVjdGVkRWlkIDogbnVsbDtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8UGFuZWxcbiAgICAgICAgICAgICAgICAgIGtleT17aWR4fVxuICAgICAgICAgICAgICAgICAgY29sbGFwc2FibGVcbiAgICAgICAgICAgICAgICAgIHBhZGRlZD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICBoZWFkaW5nPXtsZWFrLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgZmxvYXRpbmdcbiAgICAgICAgICAgICAgICAgIGFjY2Vzc29yeT17bGVhay5yZXRhaW5lZFNpemV9PlxuICAgICAgICAgICAgICAgICAgPEVsZW1lbnRzSW5zcGVjdG9yXG4gICAgICAgICAgICAgICAgICAgIG9uRWxlbWVudFNlbGVjdGVkPXsoZWlkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0RWxlbWVudChpZHgsIGVpZCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIG9uRWxlbWVudEhvdmVyZWQ9eygpID0+IHt9fVxuICAgICAgICAgICAgICAgICAgICBvbkVsZW1lbnRFeHBhbmRlZD17KGVpZCAvKiwgZGVlcCovKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9nZ2xlRWxlbWVudChpZHgsIGVpZCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cz17bnVsbH1cbiAgICAgICAgICAgICAgICAgICAgcm9vdD17bGVhay5yb290fVxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50cz17ZWxlbWVudHN9XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbGFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L1BhbmVsPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9GbGV4Q29sdW1uPlxuICAgICAgICAgIDxUb29sYmFyPlxuICAgICAgICAgICAgPFRvb2xiYXJJdGVtPlxuICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuX2NsZWFyTGVha3N9PkNsZWFyPC9CdXR0b24+XG4gICAgICAgICAgICA8L1Rvb2xiYXJJdGVtPlxuICAgICAgICAgICAgPFRvb2xiYXJJdGVtPlxuICAgICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICBjaGVja2VkPXtzaG93RnVsbENsYXNzUGF0aHN9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhjaGVja2VkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93RnVsbENsYXNzUGF0aHM6IGNoZWNrZWR9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICBTaG93IGZ1bGwgY2xhc3MgcGF0aFxuICAgICAgICAgICAgPC9Ub29sYmFySXRlbT5cbiAgICAgICAgICA8L1Rvb2xiYXI+XG4gICAgICAgIDwvRmxleENvbHVtbj5cbiAgICAgICAge3NpZGViYXJ9XG4gICAgICA8L1dpbmRvdz5cbiAgICApO1xuICB9XG59XG4iLCAiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG5pbXBvcnQge0xlYWt9IGZyb20gJy4vaW5kZXgnO1xuLy8gVE9ETzogRml4IHRoaXMgdGhlIG5leHQgdGltZSB0aGUgZmlsZSBpcyBlZGl0ZWQuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcnVsZXNkaXIvbm8tcmVzdHJpY3RlZC1pbXBvcnRzLWNsb25lXG5pbXBvcnQge0VsZW1lbnR9IGZyb20gJ2ZsaXBwZXInO1xuXG4vKipcbiAqIFV0aWxpdHkgRnVuY3Rpb24gdG8gYWRkIGEgY2hpbGQgZWxlbWVudFxuICogQHBhcmFtIGNoaWxkRWxlbWVudElkXG4gKiBAcGFyYW0gZWxlbWVudElkXG4gKiBAcGFyYW0gZWxlbWVudHNcbiAqL1xuZnVuY3Rpb24gc2FmZUFkZENoaWxkRWxlbWVudElkKFxuICBjaGlsZEVsZW1lbnRJZDogc3RyaW5nLFxuICBlbGVtZW50SWQ6IHN0cmluZyxcbiAgZWxlbWVudHM6IE1hcDxzdHJpbmcsIEVsZW1lbnQ+LFxuKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50cy5nZXQoZWxlbWVudElkKTtcbiAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5jaGlsZHJlbikge1xuICAgIGVsZW1lbnQuY2hpbGRyZW4ucHVzaChjaGlsZEVsZW1lbnRJZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdG9PYmplY3RNYXAoXG4gIGRpY3Q6IE1hcDxhbnksIGFueT4sXG4gIGRlZXA6IGJvb2xlYW4gPSBmYWxzZSxcbik6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgY29uc3QgcmVzdWx0OiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgZGljdC5lbnRyaWVzKCkpIHtcbiAgICBpZiAoZGVlcCAmJiB2YWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgdmFsdWUgPSB0b09iamVjdE1hcCh2YWx1ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIHJlc3VsdFtTdHJpbmcoa2V5KV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gRWxlbWVudCAoZm9yIEVsZW1lbnRzSW5zcGVjdG9yKSByZXByZXNlbnRpbmcgYSBzaW5nbGUgT2JqZWN0IGluXG4gKiB0aGUgcGF0aCB0byBHQyByb290IHZpZXcuXG4gKi9cbmZ1bmN0aW9uIGdldEVsZW1lbnRTaW1wbGUoc3RyOiBzdHJpbmcsIGlkOiBzdHJpbmcpOiBFbGVtZW50IHtcbiAgLy8gQmVsb3cgcmVnZXggY2FuIGhhbmRsZSBib3RoIG9sZGVyIGFuZCBuZXdlciB2ZXJzaW9ucyBvZiBMZWFrQ2FuYXJ5XG4gIGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKFxuICAgIC9cXCogKEdDIFJPT1QgKT8oXFx1MjFCMyApPyhbYS16XSogKT8oW15BLVpdKi4pPyhbQS1aXS4qKS8sXG4gICk7XG4gIGxldCBuYW1lID0gJ04vQSc7XG4gIGlmIChtYXRjaCkge1xuICAgIG5hbWUgPSBtYXRjaFs1XTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGlkLFxuICAgIG5hbWUsXG4gICAgZXhwYW5kZWQ6IHRydWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIGF0dHJpYnV0ZXM6IFtdLFxuICAgIGRhdGE6IHt9LFxuICAgIGRlY29yYXRpb246ICcnLFxuICAgIGV4dHJhSW5mbzoge30sXG4gIH07XG59XG5cbi8vIExpbmUgbWFya2luZyB0aGUgc3RhcnQgb2YgRGV0YWlscyBzZWN0aW9uXG5jb25zdCBCRUdJTl9ERVRBSUxTX1NFQ1RJT05fSU5ESUNBVE9SID0gJyogRGV0YWlsczonO1xuLy8gTGluZSBmb2xsb3dpbmcgdGhlIGVuZCBvZiB0aGUgRGV0YWlscyBzZWN0aW9uXG5jb25zdCBFTkRfREVUQUlMU19TRUNUSU9OX0lORElDQVRPUiA9ICcqIEV4Y2x1ZGVkIFJlZnM6JztcbmNvbnN0IFNUQVRJQ19QUkVGSVggPSAnc3RhdGljICc7XG4vLyBUZXh0IHRoYXQgYmVnaW5zIHRoZSBsaW5lIG9mIHRoZSBPYmplY3QgYXQgR0Mgcm9vdFxuY29uc3QgTEVBS19CRUdJTl9JTkRJQ0FUT1IgPSAnaGFzIGxlYWtlZDonO1xuY29uc3QgUkVUQUlORURfU0laRV9JTkRJQ0FUT1IgPSAnKiBSZXRhaW5pbmc6ICc7XG5cbi8qKlxuICogUGFyc2VzIHRoZSBsaW5lcyBnaXZlbiAoYXQgdGhlIGdpdmVuIGluZGV4KSB0byBleHRyYWN0IGluZm9ybWF0aW9uIGFib3V0IGJvdGhcbiAqIHN0YXRpYyBhbmQgaW5zdGFuY2UgZmllbGRzIG9mIGVhY2ggY2xhc3MgaW4gdGhlIHBhdGggdG8gR0Mgcm9vdC4gUmV0dXJucyB0aHJlZVxuICogb2JqZWN0cywgZWFjaCBvbmUgbWFwcGluZyB0aGUgZWxlbWVudCBJRCBvZiBhIHNwZWNpZmljIGVsZW1lbnQgdG8gdGhlXG4gKiBjb3JyZXNwb25kaW5nIHN0YXRpYyBmaWVsZHMsIGluc3RhbmNlIGZpZWxkcywgb3IgcGFja2FnZSBuYW1lIG9mIHRoZSBjbGFzc1xuICovXG5mdW5jdGlvbiBnZW5lcmF0ZUZpZWxkc0xpc3QoXG4gIGxpbmVzOiBzdHJpbmdbXSxcbiAgaTogbnVtYmVyLFxuKToge1xuICBzdGF0aWNGaWVsZHM6IE1hcDxzdHJpbmcsIE1hcDxzdHJpbmcsIHN0cmluZz4+O1xuICBpbnN0YW5jZUZpZWxkczogTWFwPHN0cmluZywgTWFwPHN0cmluZywgc3RyaW5nPj47XG4gIHBhY2thZ2VzOiBNYXA8c3RyaW5nLCBzdHJpbmc+O1xufSB7XG4gIGNvbnN0IHN0YXRpY0ZpZWxkcyA9IG5ldyBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBzdHJpbmc+PigpO1xuICBjb25zdCBpbnN0YW5jZUZpZWxkcyA9IG5ldyBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBzdHJpbmc+PigpO1xuXG4gIGxldCBzdGF0aWNWYWx1ZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBsZXQgaW5zdGFuY2VWYWx1ZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuXG4gIGxldCBlbGVtZW50SWQgPSAtMTtcbiAgbGV0IGVsZW1lbnRJZFN0ciA9ICcnO1xuXG4gIGNvbnN0IHBhY2thZ2VzID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuICAvLyBQcm9jZXNzIGV2ZXJ5dGhpbmcgYmV0d2VlbiBEZXRhaWxzIGFuZCBFeGNsdWRlZCBSZWZzXG4gIHdoaWxlIChcbiAgICBpIDwgbGluZXMubGVuZ3RoICYmXG4gICAgIWxpbmVzW2ldLnN0YXJ0c1dpdGgoRU5EX0RFVEFJTFNfU0VDVElPTl9JTkRJQ0FUT1IpXG4gICkge1xuICAgIGNvbnN0IGxpbmUgPSBsaW5lc1tpXTtcbiAgICBpZiAobGluZS5zdGFydHNXaXRoKCcqJykpIHtcbiAgICAgIGlmIChlbGVtZW50SWQgIT0gLTEpIHtcbiAgICAgICAgc3RhdGljRmllbGRzLnNldChlbGVtZW50SWRTdHIsIHN0YXRpY1ZhbHVlcyk7XG4gICAgICAgIGluc3RhbmNlRmllbGRzLnNldChlbGVtZW50SWRTdHIsIGluc3RhbmNlVmFsdWVzKTtcbiAgICAgICAgc3RhdGljVmFsdWVzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICAgICAgaW5zdGFuY2VWYWx1ZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICAgICAgfVxuICAgICAgZWxlbWVudElkKys7XG4gICAgICBlbGVtZW50SWRTdHIgPSBTdHJpbmcoZWxlbWVudElkKTtcblxuICAgICAgLy8gRXh0cmFjdCBwYWNrYWdlIGZvciBlYWNoIGNsYXNzXG4gICAgICBsZXQgcGtnID0gJ3Vua25vd24nO1xuICAgICAgY29uc3QgbWF0Y2ggPSBsaW5lLm1hdGNoKC9cXCogKC4qKShvZnxDbGFzcykgKC4qKS8pO1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHBrZyA9IG1hdGNoWzNdO1xuICAgICAgfVxuICAgICAgcGFja2FnZXMuc2V0KGVsZW1lbnRJZFN0ciwgcGtnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRmllbGQvdmFsdWUgcGFpcnMgcmVwcmVzZW50ZWQgaW4gaW5wdXQgbGluZXMgYXNcbiAgICAgIC8vIHwgZmllbGROYW1lID0gdmFsdWVcbiAgICAgIGNvbnN0IG1hdGNoID0gbGluZS5tYXRjaCgvXFx8XFxzKyguKikgPSAoLiopLyk7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgY29uc3QgZmllbGROYW1lID0gbWF0Y2hbMV07XG4gICAgICAgIGNvbnN0IGZpZWxkVmFsdWUgPSBtYXRjaFsyXTtcblxuICAgICAgICBpZiAoZmllbGROYW1lLnN0YXJ0c1dpdGgoU1RBVElDX1BSRUZJWCkpIHtcbiAgICAgICAgICBjb25zdCBzdHJpcHBlZEZpZWxkTmFtZSA9IGZpZWxkTmFtZS5zdWJzdHIoNyk7XG4gICAgICAgICAgc3RhdGljVmFsdWVzLnNldChzdHJpcHBlZEZpZWxkTmFtZSwgZmllbGRWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5zdGFuY2VWYWx1ZXMuc2V0KGZpZWxkTmFtZSwgZmllbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaSsrO1xuICB9XG4gIHN0YXRpY0ZpZWxkcy5zZXQoZWxlbWVudElkU3RyLCBzdGF0aWNWYWx1ZXMpO1xuICBpbnN0YW5jZUZpZWxkcy5zZXQoZWxlbWVudElkU3RyLCBpbnN0YW5jZVZhbHVlcyk7XG5cbiAgcmV0dXJuIHtzdGF0aWNGaWVsZHMsIGluc3RhbmNlRmllbGRzLCBwYWNrYWdlc307XG59XG5cbi8qKlxuICogUHJvY2Vzc2VzIGEgTGVha0NhbmFyeSBzdHJpbmcgY29udGFpbmluZyBkYXRhIGZyb20gYSBzaW5nbGUgbGVhay4gSWYgdGhlXG4gKiBzdHJpbmcgcmVwcmVzZW50cyBhIHZhbGlkIGxlYWssIHRoZSBmdW5jdGlvbiBhcHBlbmRzIHBhcnNlZCBkYXRhIHRvIHRoZSBnaXZlblxuICogb3V0cHV0IGxpc3QuIElmIG5vdCwgdGhlIGxpc3QgaXMgcmV0dXJuZWQgYXMtaXMuIFRoaXMgcGFyc2VkIGRhdGEgY29udGFpbnNcbiAqIHRoZSBwYXRoIHRvIEdDIHJvb3QsIHN0YXRpYy9pbnN0YW5jZSBmaWVsZHMgZm9yIGVhY2ggT2JqZWN0IGluIHRoZSBwYXRoLCB0aGVcbiAqIGxlYWsncyByZXRhaW5lZCBzaXplLCBhbmQgYSB0aXRsZSBmb3IgdGhlIGxlYWsuXG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3NMZWFrKG91dHB1dDogTGVha1tdLCBsZWFrSW5mbzogc3RyaW5nKTogTGVha1tdIHtcbiAgY29uc3QgbGluZXMgPSBsZWFrSW5mby5zcGxpdCgnXFxuJyk7XG5cbiAgLy8gRWxlbWVudHMgc2hvd3MgYSBPYmplY3QncyBjbGFzc25hbWUgYW5kIHBhY2thZ2UsIHdoZXJhcyBlbGVtZW50c1NpbXBsZSBzaG93c1xuICAvLyBqdXN0IGl0cyBjbGFzc25hbWVcbiAgY29uc3QgZWxlbWVudHMgPSBuZXcgTWFwPHN0cmluZywgRWxlbWVudD4oKTtcbiAgY29uc3QgZWxlbWVudHNTaW1wbGUgPSBuZXcgTWFwPHN0cmluZywgRWxlbWVudD4oKTtcblxuICBsZXQgcm9vdEVsZW1lbnRJZCA9ICcnO1xuXG4gIGxldCBpID0gMDtcbiAgd2hpbGUgKGkgPCBsaW5lcy5sZW5ndGggJiYgIWxpbmVzW2ldLmVuZHNXaXRoKExFQUtfQkVHSU5fSU5ESUNBVE9SKSkge1xuICAgIGkrKztcbiAgfVxuICBpKys7XG5cbiAgaWYgKGkgPj0gbGluZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIGxldCBlbGVtZW50SWQgPSAwO1xuICBsZXQgZWxlbWVudElkU3RyID0gU3RyaW5nKGVsZW1lbnRJZCk7XG4gIC8vIExhc3QgZWxlbWVudCBpcyBsZWFrZWQgb2JqZWN0XG4gIGxldCBsZWFrZWRPYmpOYW1lID0gJyc7XG4gIHdoaWxlIChpIDwgbGluZXMubGVuZ3RoICYmIGxpbmVzW2ldLnN0YXJ0c1dpdGgoJyonKSkge1xuICAgIGNvbnN0IGxpbmUgPSBsaW5lc1tpXTtcblxuICAgIGNvbnN0IHByZXZFbGVtZW50SWRTdHIgPSBTdHJpbmcoZWxlbWVudElkIC0gMSk7XG4gICAgaWYgKGVsZW1lbnRJZCAhPT0gMCkge1xuICAgICAgLy8gQWRkIGVsZW1lbnQgdG8gcHJldmlvdXMgZWxlbWVudCdzIGNoaWxkcmVuXG4gICAgICBzYWZlQWRkQ2hpbGRFbGVtZW50SWQoZWxlbWVudElkU3RyLCBwcmV2RWxlbWVudElkU3RyLCBlbGVtZW50cyk7XG4gICAgICBzYWZlQWRkQ2hpbGRFbGVtZW50SWQoZWxlbWVudElkU3RyLCBwcmV2RWxlbWVudElkU3RyLCBlbGVtZW50c1NpbXBsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3RFbGVtZW50SWQgPSBlbGVtZW50SWRTdHI7XG4gICAgfVxuICAgIGNvbnN0IGVsZW1lbnQgPSBnZXRFbGVtZW50U2ltcGxlKGxpbmUsIGVsZW1lbnRJZFN0cik7XG4gICAgbGVha2VkT2JqTmFtZSA9IGVsZW1lbnQubmFtZTtcbiAgICBlbGVtZW50cy5zZXQoZWxlbWVudElkU3RyLCBlbGVtZW50KTtcbiAgICBlbGVtZW50c1NpbXBsZS5zZXQoZWxlbWVudElkU3RyLCBlbGVtZW50KTtcblxuICAgIGkrKztcbiAgICBlbGVtZW50SWQrKztcbiAgICBlbGVtZW50SWRTdHIgPSBTdHJpbmcoZWxlbWVudElkKTtcbiAgfVxuXG4gIHdoaWxlIChcbiAgICBpIDwgbGluZXMubGVuZ3RoICYmXG4gICAgIWxpbmVzW2ldLnN0YXJ0c1dpdGgoUkVUQUlORURfU0laRV9JTkRJQ0FUT1IpICYmXG4gICAgIWxpbmVzW2ldLnN0YXJ0c1dpdGgoQkVHSU5fREVUQUlMU19TRUNUSU9OX0lORElDQVRPUilcbiAgKSB7XG4gICAgaSsrO1xuICB9XG5cbiAgbGV0IHJldGFpbmVkU2l6ZSA9ICd1bmtub3duIHNpemUnO1xuXG4gIGlmIChsaW5lc1tpXS5zdGFydHNXaXRoKFJFVEFJTkVEX1NJWkVfSU5ESUNBVE9SKSkge1xuICAgIGNvbnN0IG1hdGNoID0gbGluZXNbaV0ubWF0Y2goL1xcKiBSZXRhaW5pbmc6ICguKikuLyk7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICByZXRhaW5lZFNpemUgPSBtYXRjaFsxXTtcbiAgICB9XG4gIH1cblxuICB3aGlsZSAoXG4gICAgaSA8IGxpbmVzLmxlbmd0aCAmJlxuICAgICFsaW5lc1tpXS5zdGFydHNXaXRoKEJFR0lOX0RFVEFJTFNfU0VDVElPTl9JTkRJQ0FUT1IpXG4gICkge1xuICAgIGkrKztcbiAgfVxuICBpKys7XG5cbiAgLy8gUGFyc2UgaW5mb3JtYXRpb24gb24gZWFjaCBvYmplY3QncyBmaWVsZHMsIHBhY2thZ2VcbiAgY29uc3Qge3N0YXRpY0ZpZWxkcywgaW5zdGFuY2VGaWVsZHMsIHBhY2thZ2VzfSA9IGdlbmVyYXRlRmllbGRzTGlzdChsaW5lcywgaSk7XG5cbiAgLy8gV2hpbGUgZWxlbWVudHNTaW1wbGUgcmVtYWlucyBhcy1pcywgZWxlbWVudHMgaGFzIHRoZSBwYWNrYWdlIG9mIGVhY2ggY2xhc3NcbiAgLy8gaW5zZXJ0ZWQsIGluIG9yZGVyIHRvIGVuYWJsZSAnU2hvdyBmdWxsIGNsYXNzIHBhdGgnXG4gIGZvciAoY29uc3QgW2VsZW1lbnRJZCwgcGtnXSBvZiBwYWNrYWdlcy5lbnRyaWVzKCkpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHMuZ2V0KGVsZW1lbnRJZCk7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgLy8gR2V0cyBldmVyeXRoaW5nIGJlZm9yZSB0aGUgZmllbGQgbmFtZSwgd2hpY2ggaXMgcmVwbGFjZWQgYnkgdGhlIHBhY2thZ2VcbiAgICBjb25zdCBtYXRjaCA9IGVsZW1lbnQubmFtZS5tYXRjaCgvKFteXFwuIF0qKSguKikvKTtcbiAgICBpZiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID09PSAzKSB7XG4gICAgICBlbGVtZW50Lm5hbWUgPSBwa2cgKyBtYXRjaFsyXTtcbiAgICB9XG4gIH1cblxuICBvdXRwdXQucHVzaCh7XG4gICAgdGl0bGU6IGxlYWtlZE9iak5hbWUsXG4gICAgcm9vdDogcm9vdEVsZW1lbnRJZCxcbiAgICBlbGVtZW50czogdG9PYmplY3RNYXAoZWxlbWVudHMpLFxuICAgIGVsZW1lbnRzU2ltcGxlOiB0b09iamVjdE1hcChlbGVtZW50c1NpbXBsZSksXG4gICAgc3RhdGljRmllbGRzOiB0b09iamVjdE1hcChzdGF0aWNGaWVsZHMsIHRydWUpLFxuICAgIGluc3RhbmNlRmllbGRzOiB0b09iamVjdE1hcChpbnN0YW5jZUZpZWxkcywgdHJ1ZSksXG4gICAgcmV0YWluZWRTaXplOiByZXRhaW5lZFNpemUsXG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG4vKipcbiAqIFByb2Nlc3NlcyBhIHNldCBvZiBMZWFrQ2FuYXJ5IHN0cmluZ3MsIGlnbm9yaW5nIG5vbi1sZWFrcyAtIHNlZSBwcm9jZXNzTGVhayBhYm92ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NMZWFrcyhsZWFrSW5mb3M6IHN0cmluZ1tdKTogTGVha1tdIHtcbiAgY29uc3QgbmV3TGVha3MgPSBsZWFrSW5mb3MucmVkdWNlKHByb2Nlc3NMZWFrLCBbXSk7XG4gIHJldHVybiBuZXdMZWFrcztcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBLG1CQUFrQjtBQUdsQixxQkFhTzs7O0FDTFAsU0FBUyxzQkFDUCxnQkFDQSxXQUNBLFVBQ0E7QUFDQSxRQUFNLFVBQVUsU0FBUyxJQUFJLFNBQVM7QUFDdEMsTUFBSSxXQUFXLFFBQVEsVUFBVTtBQUMvQixZQUFRLFNBQVMsS0FBSyxjQUFjO0FBQUEsRUFDdEM7QUFDRjtBQUVBLFNBQVMsWUFDUCxNQUNBLE9BQWdCLE9BQ007QUFDdEIsUUFBTSxTQUErQixDQUFDO0FBQ3RDLFdBQVMsQ0FBQyxLQUFLLEtBQUssS0FBSyxLQUFLLFFBQVEsR0FBRztBQUN2QyxRQUFJLFFBQVEsaUJBQWlCLEtBQUs7QUFDaEMsY0FBUSxZQUFZLE9BQU8sSUFBSTtBQUFBLElBQ2pDO0FBQ0EsV0FBTyxPQUFPLEdBQUcsS0FBSztBQUFBLEVBQ3hCO0FB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LEdBRUQsS0FBSyxXQUNKLDZCQUFBQSxRQUFBLGNBQUMsd0JBQU0sU0FBUyxXQUFXLFVBQVUsT0FBTyxNQUFNLFNBQ2hELDZCQUFBQSxRQUFBLGNBQUMsYUFBSyxLQUFLLE9BQVEsQ0FDckIsQ0FFSjtBQUFBLEVBRUo7QUFBQSxFQUVBLFNBQVM7QUFDUCxVQUFNLEVBQUMsYUFBYSxhQUFhLG1CQUFrQixJQUFJLEtBQUs7QUFDNUQsVUFBTSxVQUFVLEtBQUssY0FBYztBQUVuQyxXQUNFLDZCQUFBQSxRQUFBLGNBQUMsY0FDQyw2QkFBQUEsUUFBQSxjQUFDLDZCQUFXLE1BQUksUUFDZCw2QkFBQUEsUUFBQSxjQUFDLDZCQUFXLE1BQUksTUFBQyxZQUFVLFFBQ3hCLEtBQUssTUFBTSxNQUFNLElBQUksQ0FBQyxNQUFZLFFBQWdCO0FBQ2pELFlBQU0sV0FBVyxxQkFDYixLQUFLLFdBQ0wsS0FBSztBQUVULFlBQU0sV0FBVyxlQUFlLE1BQU0sY0FBYztBQUNwRCxhQUNFLDZCQUFBQSxRQUFBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxLQUFLO0FBQUEsVUFDTCxhQUFXO0FBQUEsVUFDWCxRQUFRO0FBQUEsVUFDUixTQUFTLEtBQUs7QUFBQSxVQUNkLFVBQVE7QUFBQSxVQUNSLFdBQVcsS0FBSztBQUFBO0FBQUEsUUFDaEIsNkJBQUFBLFFBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLG1CQUFtQixDQUFDLFFBQVE7QUFDMUIsbUJBQUssZUFBZSxLQUFLLEdBQUc7QUFBQSxZQUM5QjtBQUFBLFlBQ0Esa0JBQWtCLE1BQU07QUFBQSxZQUFDO0FBQUEsWUFDekIsbUJBQW1CLENBQUMsUUFBbUI7QUFDckMsbUJBQUssZUFBZSxLQUFLLEdBQUc7QUFBQSxZQUM5QjtBQUFBLFlBQ0E7QUFBQSxZQUNBLGVBQWU7QUFBQSxZQUNmLE1BQU0sS0FBSztBQUFBLFlBQ1g7QUFBQSxZQUNBLFlBQVk7QUFBQTtBQUFBLFFBQ2Q7QUFBQSxNQUNGO0FBQUEsSUFFSixDQUFDLENBQ0gsR0FDQSw2QkFBQUEsUUFBQSxjQUFDLDhCQUNDLDZCQUFBQSxRQUFBLGNBQUMsbUJBQ0MsNkJBQUFBLFFBQUEsY0FBQyx5QkFBTyxTQUFTLEtBQUssZUFBYSxPQUFLLENBQzFDLEdBQ0EsNkJBQUFBLFFBQUEsY0FBQyxtQkFDQyw2QkFBQUEsUUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsU0FBUztBQUFBLFFBQ1QsVUFBVSxDQUFDLFlBQXFCO0FBQzlCLGVBQUssU0FBUyxFQUFDLG9CQUFvQixRQUFPLENBQUM7QUFBQSxRQUM3QztBQUFBO0FBQUEsSUFDRixHQUFFLHNCQUVKLENBQ0YsQ0FDRixHQUNDLE9BQ0g7QUFBQSxFQUVKO0FBQ0Y7IiwKICAibmFtZXMiOiBbImVsZW1lbnRJZCIsICJSZWFjdCJdCn0K
