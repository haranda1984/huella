"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// plugins/public/node_modules/unicode-substring/index.js
var require_unicode_substring = __commonJS({
  "plugins/public/node_modules/unicode-substring/index.js"(exports, module2) {
    function charAt(string, index) {
      var first = string.charCodeAt(index);
      var second;
      if (first >= 55296 && first <= 56319 && string.length > index + 1) {
        second = string.charCodeAt(index + 1);
        if (second >= 56320 && second <= 57343) {
          return string.substring(index, index + 2);
        }
      }
      return string[index];
    }
    function slice(string, start, end) {
      var accumulator = "";
      var character;
      var stringIndex = 0;
      var unicodeIndex = 0;
      var length = string.length;
      while (stringIndex < length) {
        character = charAt(string, stringIndex);
        if (unicodeIndex >= start && unicodeIndex < end) {
          accumulator += character;
        }
        stringIndex += character.length;
        unicodeIndex += 1;
      }
      return accumulator;
    }
    function toNumber(value, fallback) {
      if (value === void 0) {
        return fallback;
      } else {
        return Number(value);
      }
    }
    module2.exports = function(string, start, end) {
      var realStart = toNumber(start, 0);
      var realEnd = toNumber(end, string.length);
      if (realEnd == realStart) {
        return "";
      } else if (realEnd > realStart) {
        return slice(string, realStart, realEnd);
      } else {
        return slice(string, realEnd, realStart);
      }
    };
  }
});

// plugins/public/crash_reporter/index.tsx
var crash_reporter_exports = {};
__export(crash_reporter_exports, {
  Component: () => Crashes,
  devicePlugin: () => devicePlugin
});
module.exports = __toCommonJS(crash_reporter_exports);
var import_flipper_plugin2 = require("flipper-plugin");

// plugins/public/crash_reporter/crash-utils.tsx
var import_unicode_substring = __toESM(require_unicode_substring());
var UNKNOWN_CRASH_REASON = "Unknown";
function truncate(baseString, numOfChars) {
  if (baseString.length <= numOfChars) {
    return baseString;
  }
  const truncated_string = (0, import_unicode_substring.default)(baseString, 0, numOfChars - 1);
  return `${truncated_string}\u2026`;
}
function trimCallStackIfPossible(callstack) {
  const regex = /Application Specific Information:/;
  const query = regex.exec(callstack);
  return query ? callstack.substring(0, query.index) : callstack;
}
function showCrashNotification(client, crash) {
  const ignore = !crash.name && !crash.reason;
  const unknownCrashCause = crash.reason === UNKNOWN_CRASH_REASON;
  if (ignore || unknownCrashCause) {
    console.warn("Ignored the notification for the crash", crash);
    return;
  }
  let title = `CRASH: ${truncate(crash.name || crash.reason, 50)}`;
  title = `${crash.name == crash.reason ? title : `${title}Reason: ${truncate(crash.reason, 50)}`}`;
  const callstack = crash.callstack ? trimCallStackIfPossible(crash.callstack) : "No callstack available";
  const msg = `Callstack: ${truncate(callstack, 200)}`;
  client.showNotification({
    id: crash.notificationID,
    message: msg,
    severity: "error",
    title,
    action: crash.notificationID,
    category: crash.reason || "Unknown reason"
  });
}

// plugins/public/crash_reporter/Crashes.tsx
var import_react = __toESM(require("react"));
var import_antd = require("antd");
var import_icons = require("@ant-design/icons");
var import_flipper_plugin = require("flipper-plugin");
var { Text } = import_antd.Typography;
function Crashes() {
  const plugin = (0, import_flipper_plugin.usePlugin)(devicePlugin);
  const crashes = (0, import_flipper_plugin.useValue)(plugin.crashes);
  const selectedCrashId = (0, import_flipper_plugin.useValue)(plugin.selectedCrash);
  const selectedCrash = crashes.find(
    (c) => c.notificationID === selectedCrashId
  );
  return /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.Layout.Left, { resizable: true, width: 400 }, /* @__PURE__ */ import_react.default.createElement(
    import_flipper_plugin.DataList,
    {
      items: crashes.map((crash) => ({
        id: crash.notificationID,
        title: crash.reason ?? crash.name,
        description: `${new Date(crash.date).toLocaleString()} - ${crash.name}`
      })),
      selection: selectedCrashId,
      onSelect: (id) => {
        plugin.selectedCrash.set(id);
      },
      onRenderEmpty: null
    }
  ), selectedCrash ? /* @__PURE__ */ import_react.default.createElement(CrashDetails, { crash: selectedCrash }) : /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.Layout.Horizontal, { center: true, grow: true }, /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.Layout.Container, { center: true, grow: true, gap: true }, /* @__PURE__ */ import_react.default.createElement(import_icons.CoffeeOutlined, null), /* @__PURE__ */ import_react.default.createElement(Text, { type: "secondary" }, crashes.length === 0 ? "No crashes detected so far!" : "No crash selected"))));
}
function CrashDetails({ crash }) {
  const plugin = (0, import_flipper_plugin.usePlugin)(devicePlugin);
  return /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.Layout.Top, null, /* @__PURE__ */ import_react.default.createElement(
    import_flipper_plugin.Toolbar,
    {
      wash: true,
      right: /* @__PURE__ */ import_react.default.createElement(
        import_antd.Button,
        {
          onClick: () => {
            plugin.clearCrashes();
          },
          title: "Clear all crashes",
          danger: true
        },
        /* @__PURE__ */ import_react.default.createElement(import_icons.DeleteOutlined, null)
      )
    },
    /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        onClick: () => {
          plugin.copyCrashToClipboard(crash.callstack);
        }
      },
      /* @__PURE__ */ import_react.default.createElement(import_icons.CopyOutlined, null)
    ),
    plugin.isFB ? /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        onClick: () => {
          plugin.createPaste(crash.callstack).then((x) => {
            if (x) {
              import_antd.notification.success({
                message: "Created paste",
                description: /* @__PURE__ */ import_react.default.createElement("span", null, "Created a paste P", x.number)
              });
            }
          }).catch((e) => {
            import_antd.notification.error({
              message: "Failed to create paste",
              description: /* @__PURE__ */ import_react.default.createElement("span", null, e.toString())
            });
          });
        }
      },
      "Create paste"
    ) : null,
    /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        disabled: !crash.callstack,
        onClick: () => {
          plugin.openInLogs(crash.callstack);
        }
      },
      "Open In Logs"
    )
  ), /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.Layout.ScrollContainer, { pad: true, vertical: true }, /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.CodeBlock, null, /* @__PURE__ */ import_react.default.createElement(Text, { strong: true }, crash.name), /* @__PURE__ */ import_react.default.createElement("br", null), /* @__PURE__ */ import_react.default.createElement("br", null), /* @__PURE__ */ import_react.default.createElement(Text, { strong: true }, crash.reason), /* @__PURE__ */ import_react.default.createElement("br", null), /* @__PURE__ */ import_react.default.createElement("br", null), crash.callstack)));
}

// plugins/public/crash_reporter/index.tsx
function devicePlugin(client) {
  let notificationID = -1;
  const crashes = (0, import_flipper_plugin2.createState)([], { persist: "crashes" });
  const selectedCrash = (0, import_flipper_plugin2.createState)();
  client.onDeepLink((crashId) => {
    selectedCrash.set(crashId);
  });
  function reportCrash(payload) {
    notificationID++;
    const crash = {
      notificationID: notificationID.toString(),
      callstack: payload.callstack,
      name: payload.name,
      reason: payload.reason,
      date: payload.date || Date.now()
    };
    crashes.update((draft) => {
      draft.push(crash);
    });
    showCrashNotification(client, crash);
  }
  if (client.device.isConnected) {
    client.onDeviceCrash(reportCrash);
  }
  return {
    crashes,
    selectedCrash,
    reportCrash,
    openInLogs(callstack) {
      client.selectPlugin("DeviceLogs", callstack);
    },
    os: client.device.os,
    copyCrashToClipboard(callstack) {
      client.writeTextToClipboard(callstack);
    },
    createPaste(callstack) {
      return client.createPaste(callstack);
    },
    isFB: client.isFB,
    clearCrashes() {
      crashes.set([]);
      selectedCrash.set(void 0);
    }
  };
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL3VuaWNvZGUtc3Vic3RyaW5nL2luZGV4LmpzIiwgIi4uL2luZGV4LnRzeCIsICIuLi9jcmFzaC11dGlscy50c3giLCAiLi4vQ3Jhc2hlcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImZ1bmN0aW9uIGNoYXJBdChzdHJpbmcsIGluZGV4KSB7XG4gIHZhciBmaXJzdCA9IHN0cmluZy5jaGFyQ29kZUF0KGluZGV4KTtcbiAgdmFyIHNlY29uZDtcbiAgaWYgKGZpcnN0ID49IDB4RDgwMCAmJiBmaXJzdCA8PSAweERCRkYgJiYgc3RyaW5nLmxlbmd0aCA+IGluZGV4ICsgMSkge1xuICAgIHNlY29uZCA9IHN0cmluZy5jaGFyQ29kZUF0KGluZGV4ICsgMSk7XG4gICAgaWYgKHNlY29uZCA+PSAweERDMDAgJiYgc2Vjb25kIDw9IDB4REZGRikge1xuICAgICAgcmV0dXJuIHN0cmluZy5zdWJzdHJpbmcoaW5kZXgsIGluZGV4ICsgMik7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHJpbmdbaW5kZXhdO1xufVxuXG5mdW5jdGlvbiBzbGljZShzdHJpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGFjY3VtdWxhdG9yID0gXCJcIjtcbiAgdmFyIGNoYXJhY3RlcjtcbiAgdmFyIHN0cmluZ0luZGV4ID0gMDtcbiAgdmFyIHVuaWNvZGVJbmRleCA9IDA7XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuXG4gIHdoaWxlIChzdHJpbmdJbmRleCA8IGxlbmd0aCkge1xuICAgIGNoYXJhY3RlciA9IGNoYXJBdChzdHJpbmcsIHN0cmluZ0luZGV4KTtcbiAgICBpZiAodW5pY29kZUluZGV4ID49IHN0YXJ0ICYmIHVuaWNvZGVJbmRleCA8IGVuZCkge1xuICAgICAgYWNjdW11bGF0b3IgKz0gY2hhcmFjdGVyO1xuICAgIH1cbiAgICBzdHJpbmdJbmRleCArPSBjaGFyYWN0ZXIubGVuZ3RoO1xuICAgIHVuaWNvZGVJbmRleCArPSAxO1xuICB9XG4gIHJldHVybiBhY2N1bXVsYXRvcjtcbn1cblxuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUsIGZhbGxiYWNrKSB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbGxiYWNrO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cmluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgcmVhbFN0YXJ0ID0gdG9OdW1iZXIoc3RhcnQsIDApO1xuICB2YXIgcmVhbEVuZCA9IHRvTnVtYmVyKGVuZCwgc3RyaW5nLmxlbmd0aCk7XG4gIGlmIChyZWFsRW5kID09IHJlYWxTdGFydCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9IGVsc2UgaWYgKHJlYWxFbmQgPiByZWFsU3RhcnQpIHtcbiAgICByZXR1cm4gc2xpY2Uoc3RyaW5nLCByZWFsU3RhcnQsIHJlYWxFbmQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzbGljZShzdHJpbmcsIHJlYWxFbmQsIHJlYWxTdGFydCk7XG4gIH1cbn1cbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB7Y3JlYXRlU3RhdGUsIERldmljZVBsdWdpbkNsaWVudCwgQ3Jhc2hMb2d9IGZyb20gJ2ZsaXBwZXItcGx1Z2luJztcbmltcG9ydCB7c2hvd0NyYXNoTm90aWZpY2F0aW9ufSBmcm9tICcuL2NyYXNoLXV0aWxzJztcblxuZXhwb3J0IHR5cGUgQ3Jhc2ggPSB7XG4gIG5vdGlmaWNhdGlvbklEOiBzdHJpbmc7XG4gIGNhbGxzdGFjaz86IHN0cmluZztcbiAgcmVhc29uOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgZGF0ZTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRldmljZVBsdWdpbihjbGllbnQ6IERldmljZVBsdWdpbkNsaWVudCkge1xuICBsZXQgbm90aWZpY2F0aW9uSUQgPSAtMTtcblxuICBjb25zdCBjcmFzaGVzID0gY3JlYXRlU3RhdGU8Q3Jhc2hbXT4oW10sIHtwZXJzaXN0OiAnY3Jhc2hlcyd9KTtcbiAgY29uc3Qgc2VsZWN0ZWRDcmFzaCA9IGNyZWF0ZVN0YXRlPHN0cmluZyB8IHVuZGVmaW5lZD4oKTtcblxuICBjbGllbnQub25EZWVwTGluaygoY3Jhc2hJZCkgPT4ge1xuICAgIHNlbGVjdGVkQ3Jhc2guc2V0KGNyYXNoSWQgYXMgc3RyaW5nKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcmVwb3J0Q3Jhc2gocGF5bG9hZDogQ3Jhc2hMb2cpIHtcbiAgICBub3RpZmljYXRpb25JRCsrO1xuXG4gICAgY29uc3QgY3Jhc2ggPSB7XG4gICAgICBub3RpZmljYXRpb25JRDogbm90aWZpY2F0aW9uSUQudG9TdHJpbmcoKSxcbiAgICAgIGNhbGxzdGFjazogcGF5bG9hZC5jYWxsc3RhY2ssXG4gICAgICBuYW1lOiBwYXlsb2FkLm5hbWUsXG4gICAgICByZWFzb246IHBheWxvYWQucmVhc29uLFxuICAgICAgZGF0ZTogcGF5bG9hZC5kYXRlIHx8IERhdGUubm93KCksXG4gICAgfTtcblxuICAgIGNyYXNoZXMudXBkYXRlKChkcmFmdCkgPT4ge1xuICAgICAgZHJhZnQucHVzaChjcmFzaCk7XG4gICAgfSk7XG5cbiAgICBzaG93Q3Jhc2hOb3RpZmljYXRpb24oY2xpZW50LCBjcmFzaCk7XG4gIH1cblxuICAvLyBTdGFydHVwIGxvZ2ljIHRvIGVzdGFibGlzaCBsb2cgbW9uaXRvcmluZ1xuICBpZiAoY2xpZW50LmRldmljZS5pc0Nvbm5lY3RlZCkge1xuICAgIGNsaWVudC5vbkRldmljZUNyYXNoKHJlcG9ydENyYXNoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY3Jhc2hlcyxcbiAgICBzZWxlY3RlZENyYXNoLFxuICAgIHJlcG9ydENyYXNoLFxuICAgIG9wZW5JbkxvZ3MoY2FsbHN0YWNrOiBzdHJpbmcpIHtcbiAgICAgIGNsaWVudC5zZWxlY3RQbHVnaW4oJ0RldmljZUxvZ3MnLCBjYWxsc3RhY2spO1xuICAgIH0sXG4gICAgb3M6IGNsaWVudC5kZXZpY2Uub3MsXG4gICAgY29weUNyYXNoVG9DbGlwYm9hcmQoY2FsbHN0YWNrOiBzdHJpbmcpIHtcbiAgICAgIGNsaWVudC53cml0ZVRleHRUb0NsaXBib2FyZChjYWxsc3RhY2spO1xuICAgIH0sXG4gICAgY3JlYXRlUGFzdGUoY2FsbHN0YWNrOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBjbGllbnQuY3JlYXRlUGFzdGUoY2FsbHN0YWNrKTtcbiAgICB9LFxuICAgIGlzRkI6IGNsaWVudC5pc0ZCLFxuICAgIGNsZWFyQ3Jhc2hlcygpIHtcbiAgICAgIGNyYXNoZXMuc2V0KFtdKTtcbiAgICAgIHNlbGVjdGVkQ3Jhc2guc2V0KHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IHtDcmFzaGVzIGFzIENvbXBvbmVudH0gZnJvbSAnLi9DcmFzaGVzJztcbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB1bmljb2RlU3Vic3RyaW5nIGZyb20gJ3VuaWNvZGUtc3Vic3RyaW5nJztcbmltcG9ydCB0eXBlIHtDcmFzaH0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQge0RldmljZVBsdWdpbkNsaWVudH0gZnJvbSAnZmxpcHBlci1wbHVnaW4nO1xuXG5leHBvcnQgY29uc3QgVU5LTk9XTl9DUkFTSF9SRUFTT04gPSAnVW5rbm93bic7XG5cbmZ1bmN0aW9uIHRydW5jYXRlKGJhc2VTdHJpbmc6IHN0cmluZywgbnVtT2ZDaGFyczogbnVtYmVyKTogc3RyaW5nIHtcbiAgaWYgKGJhc2VTdHJpbmcubGVuZ3RoIDw9IG51bU9mQ2hhcnMpIHtcbiAgICByZXR1cm4gYmFzZVN0cmluZztcbiAgfVxuICBjb25zdCB0cnVuY2F0ZWRfc3RyaW5nID0gdW5pY29kZVN1YnN0cmluZyhiYXNlU3RyaW5nLCAwLCBudW1PZkNoYXJzIC0gMSk7XG4gIHJldHVybiBgJHt0cnVuY2F0ZWRfc3RyaW5nfVxcdTIwMjZgO1xufVxuXG5mdW5jdGlvbiB0cmltQ2FsbFN0YWNrSWZQb3NzaWJsZShjYWxsc3RhY2s6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHJlZ2V4ID0gL0FwcGxpY2F0aW9uIFNwZWNpZmljIEluZm9ybWF0aW9uOi87XG4gIGNvbnN0IHF1ZXJ5ID0gcmVnZXguZXhlYyhjYWxsc3RhY2spO1xuICByZXR1cm4gcXVlcnkgPyBjYWxsc3RhY2suc3Vic3RyaW5nKDAsIHF1ZXJ5LmluZGV4KSA6IGNhbGxzdGFjaztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dDcmFzaE5vdGlmaWNhdGlvbihcbiAgY2xpZW50OiBEZXZpY2VQbHVnaW5DbGllbnQsXG4gIGNyYXNoOiBDcmFzaCxcbikge1xuICBjb25zdCBpZ25vcmUgPSAhY3Jhc2gubmFtZSAmJiAhY3Jhc2gucmVhc29uO1xuICBjb25zdCB1bmtub3duQ3Jhc2hDYXVzZSA9IGNyYXNoLnJlYXNvbiA9PT0gVU5LTk9XTl9DUkFTSF9SRUFTT047XG4gIGlmIChpZ25vcmUgfHwgdW5rbm93bkNyYXNoQ2F1c2UpIHtcbiAgICBjb25zb2xlLndhcm4oJ0lnbm9yZWQgdGhlIG5vdGlmaWNhdGlvbiBmb3IgdGhlIGNyYXNoJywgY3Jhc2gpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCB0aXRsZTogc3RyaW5nID0gYENSQVNIOiAke3RydW5jYXRlKGNyYXNoLm5hbWUgfHwgY3Jhc2gucmVhc29uLCA1MCl9YDtcbiAgdGl0bGUgPSBgJHtcbiAgICBjcmFzaC5uYW1lID09IGNyYXNoLnJlYXNvblxuICAgICAgPyB0aXRsZVxuICAgICAgOiBgJHt0aXRsZX1SZWFzb246ICR7dHJ1bmNhdGUoY3Jhc2gucmVhc29uLCA1MCl9YFxuICB9YDtcbiAgY29uc3QgY2FsbHN0YWNrID0gY3Jhc2guY2FsbHN0YWNrXG4gICAgPyB0cmltQ2FsbFN0YWNrSWZQb3NzaWJsZShjcmFzaC5jYWxsc3RhY2spXG4gICAgOiAnTm8gY2FsbHN0YWNrIGF2YWlsYWJsZSc7XG4gIGNvbnN0IG1zZyA9IGBDYWxsc3RhY2s6ICR7dHJ1bmNhdGUoY2FsbHN0YWNrLCAyMDApfWA7XG4gIC8vIFRPRE86IGZpeCBjbGllbnQgaWRcbiAgY2xpZW50LnNob3dOb3RpZmljYXRpb24oe1xuICAgIGlkOiBjcmFzaC5ub3RpZmljYXRpb25JRCxcbiAgICBtZXNzYWdlOiBtc2csXG4gICAgc2V2ZXJpdHk6ICdlcnJvcicsXG4gICAgdGl0bGU6IHRpdGxlLFxuICAgIGFjdGlvbjogY3Jhc2gubm90aWZpY2F0aW9uSUQsXG4gICAgY2F0ZWdvcnk6IGNyYXNoLnJlYXNvbiB8fCAnVW5rbm93biByZWFzb24nLFxuICB9KTtcbn1cbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0J1dHRvbiwgbm90aWZpY2F0aW9uLCBUeXBvZ3JhcGh5fSBmcm9tICdhbnRkJztcbmltcG9ydCB7Q29mZmVlT3V0bGluZWQsIENvcHlPdXRsaW5lZCwgRGVsZXRlT3V0bGluZWR9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcbmltcG9ydCB7XG4gIHVzZVBsdWdpbixcbiAgdXNlVmFsdWUsXG4gIERhdGFMaXN0LFxuICBMYXlvdXQsXG4gIENvZGVCbG9jayxcbiAgVG9vbGJhcixcbn0gZnJvbSAnZmxpcHBlci1wbHVnaW4nO1xuaW1wb3J0IHtDcmFzaCwgZGV2aWNlUGx1Z2lufSBmcm9tICcuL2luZGV4JztcblxuY29uc3Qge1RleHR9ID0gVHlwb2dyYXBoeTtcbmV4cG9ydCBmdW5jdGlvbiBDcmFzaGVzKCkge1xuICBjb25zdCBwbHVnaW4gPSB1c2VQbHVnaW4oZGV2aWNlUGx1Z2luKTtcbiAgY29uc3QgY3Jhc2hlcyA9IHVzZVZhbHVlKHBsdWdpbi5jcmFzaGVzKTtcbiAgY29uc3Qgc2VsZWN0ZWRDcmFzaElkID0gdXNlVmFsdWUocGx1Z2luLnNlbGVjdGVkQ3Jhc2gpO1xuICBjb25zdCBzZWxlY3RlZENyYXNoID0gY3Jhc2hlcy5maW5kKFxuICAgIChjKSA9PiBjLm5vdGlmaWNhdGlvbklEID09PSBzZWxlY3RlZENyYXNoSWQsXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGF5b3V0LkxlZnQgcmVzaXphYmxlIHdpZHRoPXs0MDB9PlxuICAgICAgPERhdGFMaXN0XG4gICAgICAgIGl0ZW1zPXtjcmFzaGVzLm1hcCgoY3Jhc2gpID0+ICh7XG4gICAgICAgICAgaWQ6IGNyYXNoLm5vdGlmaWNhdGlvbklELFxuICAgICAgICAgIHRpdGxlOiBjcmFzaC5yZWFzb24gPz8gY3Jhc2gubmFtZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogYCR7bmV3IERhdGUoY3Jhc2guZGF0ZSkudG9Mb2NhbGVTdHJpbmcoKX0gLSAke1xuICAgICAgICAgICAgY3Jhc2gubmFtZVxuICAgICAgICAgIH1gLFxuICAgICAgICB9KSl9XG4gICAgICAgIHNlbGVjdGlvbj17c2VsZWN0ZWRDcmFzaElkfVxuICAgICAgICBvblNlbGVjdD17KGlkKSA9PiB7XG4gICAgICAgICAgcGx1Z2luLnNlbGVjdGVkQ3Jhc2guc2V0KGlkKTtcbiAgICAgICAgfX1cbiAgICAgICAgb25SZW5kZXJFbXB0eT17bnVsbH1cbiAgICAgIC8+XG4gICAgICB7c2VsZWN0ZWRDcmFzaCA/IChcbiAgICAgICAgPENyYXNoRGV0YWlscyBjcmFzaD17c2VsZWN0ZWRDcmFzaH0gLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxMYXlvdXQuSG9yaXpvbnRhbCBjZW50ZXIgZ3Jvdz5cbiAgICAgICAgICA8TGF5b3V0LkNvbnRhaW5lciBjZW50ZXIgZ3JvdyBnYXA+XG4gICAgICAgICAgICA8Q29mZmVlT3V0bGluZWQgLz5cbiAgICAgICAgICAgIDxUZXh0IHR5cGU9XCJzZWNvbmRhcnlcIj5cbiAgICAgICAgICAgICAge2NyYXNoZXMubGVuZ3RoID09PSAwXG4gICAgICAgICAgICAgICAgPyAnTm8gY3Jhc2hlcyBkZXRlY3RlZCBzbyBmYXIhJ1xuICAgICAgICAgICAgICAgIDogJ05vIGNyYXNoIHNlbGVjdGVkJ31cbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICA8L0xheW91dC5Db250YWluZXI+XG4gICAgICAgIDwvTGF5b3V0Lkhvcml6b250YWw+XG4gICAgICApfVxuICAgIDwvTGF5b3V0LkxlZnQ+XG4gICk7XG59XG5cbmZ1bmN0aW9uIENyYXNoRGV0YWlscyh7Y3Jhc2h9OiB7Y3Jhc2g6IENyYXNofSkge1xuICBjb25zdCBwbHVnaW4gPSB1c2VQbHVnaW4oZGV2aWNlUGx1Z2luKTtcblxuICByZXR1cm4gKFxuICAgIDxMYXlvdXQuVG9wPlxuICAgICAgPFRvb2xiYXJcbiAgICAgICAgd2FzaFxuICAgICAgICByaWdodD17XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBwbHVnaW4uY2xlYXJDcmFzaGVzKCk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgdGl0bGU9XCJDbGVhciBhbGwgY3Jhc2hlc1wiXG4gICAgICAgICAgICBkYW5nZXI+XG4gICAgICAgICAgICA8RGVsZXRlT3V0bGluZWQgLz5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgfT5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIC8vIFRPRE86IEZpeCB0aGlzIHRoZSBuZXh0IHRpbWUgdGhlIGZpbGUgaXMgZWRpdGVkLlxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgIHBsdWdpbi5jb3B5Q3Jhc2hUb0NsaXBib2FyZChjcmFzaC5jYWxsc3RhY2shKTtcbiAgICAgICAgICB9fT5cbiAgICAgICAgICA8Q29weU91dGxpbmVkIC8+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICB7cGx1Z2luLmlzRkIgPyAoXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBwbHVnaW4gLy8gVE9ETzogRml4IHRoaXMgdGhlIG5leHQgdGltZSB0aGUgZmlsZSBpcyBlZGl0ZWQuXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICAgICAuY3JlYXRlUGFzdGUoY3Jhc2guY2FsbHN0YWNrISlcbiAgICAgICAgICAgICAgICAudGhlbigoeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLnN1Y2Nlc3Moe1xuICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdDcmVhdGVkIHBhc3RlJyxcbiAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogPHNwYW4+Q3JlYXRlZCBhIHBhc3RlIFB7eC5udW1iZXJ9PC9zcGFuPixcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5lcnJvcih7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdGYWlsZWQgdG8gY3JlYXRlIHBhc3RlJyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IDxzcGFuPntlLnRvU3RyaW5nKCl9PC9zcGFuPixcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICBDcmVhdGUgcGFzdGVcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBkaXNhYmxlZD17IWNyYXNoLmNhbGxzdGFja31cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAvLyBUT0RPOiBGaXggdGhpcyB0aGUgbmV4dCB0aW1lIHRoZSBmaWxlIGlzIGVkaXRlZC5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgICAgICBwbHVnaW4ub3BlbkluTG9ncyhjcmFzaC5jYWxsc3RhY2shKTtcbiAgICAgICAgICB9fT5cbiAgICAgICAgICBPcGVuIEluIExvZ3NcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L1Rvb2xiYXI+XG4gICAgICA8TGF5b3V0LlNjcm9sbENvbnRhaW5lciBwYWQgdmVydGljYWw+XG4gICAgICAgIDxDb2RlQmxvY2s+XG4gICAgICAgICAgPFRleHQgc3Ryb25nPntjcmFzaC5uYW1lfTwvVGV4dD5cbiAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICA8VGV4dCBzdHJvbmc+e2NyYXNoLnJlYXNvbn08L1RleHQ+XG4gICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgPGJyIC8+XG4gICAgICAgICAge2NyYXNoLmNhbGxzdGFja31cbiAgICAgICAgPC9Db2RlQmxvY2s+XG4gICAgICA8L0xheW91dC5TY3JvbGxDb250YWluZXI+XG4gICAgPC9MYXlvdXQuVG9wPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBLG9FQUFBQSxTQUFBO0FBQUEsYUFBUyxPQUFPLFFBQVEsT0FBTztBQUM3QixVQUFJLFFBQVEsT0FBTyxXQUFXLEtBQUs7QUFDbkMsVUFBSTtBQUNKLFVBQUksU0FBUyxTQUFVLFNBQVMsU0FBVSxPQUFPLFNBQVMsUUFBUSxHQUFHO0FBQ25FLGlCQUFTLE9BQU8sV0FBVyxRQUFRLENBQUM7QUFDcEMsWUFBSSxVQUFVLFNBQVUsVUFBVSxPQUFRO0FBQ3hDLGlCQUFPLE9BQU8sVUFBVSxPQUFPLFFBQVEsQ0FBQztBQUFBLFFBQzFDO0FBQUEsTUFDRjtBQUNBLGFBQU8sT0FBTztBQUFBLElBQ2hCO0FBRUEsYUFBUyxNQUFNLFFBQVEsT0FBTyxLQUFLO0FBQ2pDLFVBQUksY0FBYztBQUNsQixVQUFJO0FBQ0osVUFBSSxjQUFjO0FBQ2xCLFVBQUksZUFBZTtBQUNuQixVQUFJLFNBQVMsT0FBTztBQUVwQixhQUFPLGNBQWMsUUFBUTtBQUMzQixvQkFBWSxPQUFPLFFBQVEsV0FBVztBQUN0QyxZQUFJLGdCQUFnQixTQUFTLGVBQWUsS0FBSztBQUMvQyx5QkFBZTtBQUFBLFFBQ2pCO0FBQ0EsdUJBQWUsVUFBVTtBQUN6Qix3QkFBZ0I7QUFBQSxNQUNsQjtBQUNBLGFBQU87QUFBQSxJQUNUO0FB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QUFDO0FBQzdELFFBQU0sb0JBQWdCLG9DQUFnQztBQUV0RCxTQUFPLFdBQVcsQ0FBQyxZQUFZO0FBQzdCLGtCQUFjLElBQUksT0FBaUI7QUFBQSxFQUNyQyxDQUFDO0FBRUQsV0FBUyxZQUFZLFNBQW1CO0FBQ3RDO0FBRUEsVUFBTSxRQUFRO0FBQUEsTUFDWixnQkFBZ0IsZUFBZSxTQUFTO0FBQUEsTUFDeEMsV0FBVyxRQUFRO0FBQUEsTUFDbkIsTUFBTSxRQUFRO0FBQUEsTUFDZCxRQUFRLFFBQVE7QUFBQSxNQUNoQixNQUFNLFFBQVEsUUFBUSxLQUFLLElBQUk7QUFBQSxJQUNqQztBQUVBLFlBQVEsT0FBTyxDQUFDLFVBQVU7QUFDeEIsWUFBTSxLQUFLLEtBQUs7QUFBQSxJQUNsQixDQUFDO0FBRUQsMEJBQXNCLFFBQVEsS0FBSztBQUFBLEVBQ3JDO0FBR0EsTUFBSSxPQUFPLE9BQU8sYUFBYTtBQUM3QixXQUFPLGNBQWMsV0FBVztBQUFBLEVBQ2xDO0FBRUEsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsV0FBVyxXQUFtQjtBQUM1QixhQUFPLGFBQWEsY0FBYyxTQUFTO0FBQUEsSUFDN0M7QUFBQSxJQUNBLElBQUksT0FBTyxPQUFPO0FBQUEsSUFDbEIscUJBQXFCLFdBQW1CO0FBQ3RDLGFBQU8scUJBQXFCLFNBQVM7QUFBQSxJQUN2QztBQUFBLElBQ0EsWUFBWSxXQUFtQjtBQUM3QixhQUFPLE9BQU8sWUFBWSxTQUFTO0FBQUEsSUFDckM7QUFBQSxJQUNBLE1BQU0sT0FBTztBQUFBLElBQ2IsZUFBZTtBQUNiLGNBQVEsSUFBSSxDQUFDLENBQUM7QUFDZCxvQkFBYyxJQUFJLE1BQVM7QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFsibW9kdWxlIiwgImltcG9ydF9mbGlwcGVyX3BsdWdpbiIsICJ1bmljb2RlU3Vic3RyaW5nIiwgIlJlYWN0Il0KfQo=
