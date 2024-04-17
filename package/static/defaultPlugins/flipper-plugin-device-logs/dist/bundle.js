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

// plugins/public/logs/index.tsx
var logs_exports = {};
__export(logs_exports, {
  Component: () => Component,
  devicePlugin: () => devicePlugin
});
module.exports = __toCommonJS(logs_exports);
var import_flipper_plugin2 = require("flipper-plugin");
var import_icons2 = require("@ant-design/icons");
var import_react2 = __toESM(require("react"));
var import_antd = require("antd");

// plugins/public/logs/logTypes.tsx
var import_flipper_plugin = require("flipper-plugin");
var import_icons = require("@ant-design/icons");
var import_react = __toESM(require("react"));
var iconStyle = {
  fontSize: "16px"
};
var baseRowStyle = {
  ...import_flipper_plugin.theme.monospace
};
var logTypes = {
  verbose: {
    label: "Verbose",
    style: {
      ...baseRowStyle,
      color: import_flipper_plugin.theme.textColorSecondary
    },
    enabled: false
  },
  debug: {
    label: "Debug",
    style: {
      ...baseRowStyle,
      color: import_flipper_plugin.theme.textColorSecondary
    },
    enabled: true
  },
  info: {
    label: "Info",
    enabled: true
  },
  warn: {
    label: "Warn",
    style: {
      ...baseRowStyle,
      color: import_flipper_plugin.theme.warningColor
    },
    icon: /* @__PURE__ */ import_react.default.createElement(import_icons.WarningFilled, { style: iconStyle }),
    enabled: true
  },
  error: {
    label: "Error",
    style: {
      ...baseRowStyle,
      color: import_flipper_plugin.theme.errorColor
    },
    icon: /* @__PURE__ */ import_react.default.createElement(import_icons.CloseCircleFilled, { style: iconStyle }),
    enabled: true
  },
  fatal: {
    label: "Fatal",
    style: {
      ...baseRowStyle,
      background: import_flipper_plugin.theme.errorColor,
      color: import_flipper_plugin.theme.white
    },
    icon: /* @__PURE__ */ import_react.default.createElement(import_icons.CloseCircleFilled, { style: iconStyle }),
    enabled: true
  }
};

// plugins/public/logs/index.tsx
var logLevelEnumLabels = Object.entries(logTypes).reduce(
  (res, [key, { label }]) => {
    res[key] = label;
    return res;
  },
  {}
);
function createColumnConfig(_os) {
  return [
    {
      key: "type",
      title: "Level",
      width: 30,
      onRender(entry) {
        return entry.count > 1 ? /* @__PURE__ */ import_react2.default.createElement(
          import_antd.Badge,
          {
            count: entry.count,
            size: "small",
            style: {
              color: import_flipper_plugin2.theme.white,
              background: logTypes[entry.type]?.style?.color ?? import_flipper_plugin2.theme.textColorSecondary
            }
          }
        ) : logTypes[entry.type]?.icon;
      },
      powerSearchConfig: {
        type: "enum",
        enumLabels: logLevelEnumLabels
      }
    },
    {
      key: "date",
      title: "Time",
      width: 120,
      powerSearchConfig: {
        type: "dateTime"
      }
    },
    {
      key: "pidStr",
      title: "PID",
      width: 60,
      visible: true,
      powerSearchConfig: {
        type: "enum",
        inferEnumOptionsFromData: true
      }
    },
    {
      key: "tid",
      title: "TID",
      width: 60,
      visible: false
    },
    {
      key: "tag",
      title: "Tag",
      width: 160,
      powerSearchConfig: {
        type: "enum",
        inferEnumOptionsFromData: true
      }
    },
    {
      key: "app",
      title: "App",
      width: 160,
      visible: false
    },
    {
      key: "message",
      title: "Message",
      wrap: true,
      formatters: [
        import_flipper_plugin2.DataFormatter.truncate(400),
        import_flipper_plugin2.DataFormatter.prettyPrintJson,
        import_flipper_plugin2.DataFormatter.linkify
      ]
    }
  ];
}
function getRowStyle(entry) {
  return logTypes[entry.type]?.style ?? baseRowStyle;
}
var powerSearchInitialState = [
  {
    field: {
      key: "type",
      label: "Level"
    },
    operator: import_flipper_plugin2.dataTablePowerSearchOperators.enum_set_is_any_of(logLevelEnumLabels),
    searchValue: Object.entries(logTypes).filter(([_, item]) => item.enabled).map(([key]) => key)
  }
];
function devicePlugin(client) {
  const rows = (0, import_flipper_plugin2.createDataSource)([], {
    limit: 2e5,
    persist: "logs",
    indices: [["pidStr"], ["tag"]]
  });
  const isPaused = (0, import_flipper_plugin2.createState)(true);
  const tableManagerRef = (0, import_react2.createRef)();
  client.onDeepLink((payload) => {
    if (typeof payload === "string") {
      tableManagerRef.current?.setSearchExpression(powerSearchInitialState);
      setTimeout(() => {
        let hasMatch = false;
        rows.view.output(0, rows.view.size).forEach((row, index) => {
          if (row.message.includes(payload)) {
            tableManagerRef.current?.selectItem(index, hasMatch);
            hasMatch = true;
          }
        });
      }, 500);
    }
  });
  client.addMenuEntry(
    {
      action: "clear",
      handler: clearLogs,
      accelerator: "ctrl+l"
    },
    {
      action: "createPaste",
      handler: createPaste
    },
    {
      action: "goToBottom",
      handler: goToBottom
    }
  );
  let logDisposer;
  function resumePause() {
    if (isPaused.get() && client.device.isConnected) {
      isPaused.set(false);
      logDisposer = client.onDeviceLogEntry((entry) => {
        const lastIndex = rows.size - 1;
        const previousRow = rows.get(lastIndex);
        if (previousRow && previousRow.message === entry.message && previousRow.tag === entry.tag && previousRow.type === entry.type) {
          rows.update(lastIndex, {
            ...previousRow,
            pidStr: previousRow.pid.toString(),
            count: previousRow.count + 1
          });
        } else {
          rows.append({
            ...entry,
            pidStr: entry.pid.toString(),
            count: 1
          });
        }
      });
    } else {
      logDisposer?.();
      isPaused.set(true);
    }
  }
  async function clearLogs() {
    if (client.device.connected.get()) {
      await client.device.clearLogs();
    }
    rows.clear();
    tableManagerRef.current?.clearSelection();
  }
  function createPaste() {
    let selection = tableManagerRef.current?.getSelectedItems();
    if (!selection?.length) {
      selection = rows.view.output(0, rows.view.size);
    }
    if (selection?.length) {
      client.createPaste(JSON.stringify(selection, null, 2));
    }
  }
  function goToBottom() {
    tableManagerRef?.current?.selectItem(rows.view.size - 1);
  }
  resumePause();
  const columns = createColumnConfig(client.device.os);
  return {
    columns,
    isConnected: client.device.isConnected,
    isPaused,
    tableManagerRef,
    rows,
    clearLogs,
    resumePause
  };
}
function Component() {
  const plugin = (0, import_flipper_plugin2.usePlugin)(devicePlugin);
  const paused = (0, import_flipper_plugin2.useValue)(plugin.isPaused);
  return /* @__PURE__ */ import_react2.default.createElement(
    import_flipper_plugin2.DataTable,
    {
      dataSource: plugin.rows,
      columns: plugin.columns,
      enableAutoScroll: true,
      enableMultiPanels: true,
      onRowStyle: getRowStyle,
      enableHorizontalScroll: false,
      extraActions: plugin.isConnected ? /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement(
        import_antd.Button,
        {
          title: `Click to ${paused ? "resume" : "pause"} the log stream`,
          danger: paused,
          onClick: plugin.resumePause
        },
        paused ? /* @__PURE__ */ import_react2.default.createElement(import_icons2.PlayCircleOutlined, null) : /* @__PURE__ */ import_react2.default.createElement(import_icons2.PauseCircleOutlined, null)
      ), /* @__PURE__ */ import_react2.default.createElement(import_antd.Button, { title: "Clear logs", onClick: plugin.clearLogs }, /* @__PURE__ */ import_react2.default.createElement(import_icons2.DeleteOutlined, null))) : void 0,
      tableManagerRef: plugin.tableManagerRef,
      powerSearchInitialState
    }
  );
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vaW5kZXgudHN4IiwgIi4uL2xvZ1R5cGVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG5pbXBvcnQge1xuICBEZXZpY2VQbHVnaW5DbGllbnQsXG4gIERldmljZUxvZ0VudHJ5LFxuICB1c2VQbHVnaW4sXG4gIGNyZWF0ZURhdGFTb3VyY2UsXG4gIGRhdGFUYWJsZVBvd2VyU2VhcmNoT3BlcmF0b3JzLFxuICBEYXRhVGFibGVDb2x1bW4sXG4gIERhdGFUYWJsZSxcbiAgdGhlbWUsXG4gIERhdGFUYWJsZU1hbmFnZXIsXG4gIGNyZWF0ZVN0YXRlLFxuICB1c2VWYWx1ZSxcbiAgRGF0YUZvcm1hdHRlcixcbiAgRW51bUxhYmVscyxcbiAgU2VhcmNoRXhwcmVzc2lvblRlcm0sXG59IGZyb20gJ2ZsaXBwZXItcGx1Z2luJztcbmltcG9ydCB7XG4gIFBsYXlDaXJjbGVPdXRsaW5lZCxcbiAgUGF1c2VDaXJjbGVPdXRsaW5lZCxcbiAgRGVsZXRlT3V0bGluZWQsXG59IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcbmltcG9ydCBSZWFjdCwge2NyZWF0ZVJlZiwgQ1NTUHJvcGVydGllc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtCYWRnZSwgQnV0dG9ufSBmcm9tICdhbnRkJztcblxuaW1wb3J0IHtiYXNlUm93U3R5bGUsIGxvZ1R5cGVzfSBmcm9tICcuL2xvZ1R5cGVzJztcblxuZXhwb3J0IHR5cGUgRXh0ZW5kZWRMb2dFbnRyeSA9IERldmljZUxvZ0VudHJ5ICYge1xuICBjb3VudDogbnVtYmVyO1xuICBwaWRTdHI6IHN0cmluZzsgLy9mb3IgdGhlIHB1cnBvc2VzIG9mIGluZmVycmluZyAob25seSBzdXBwb3J0cyBzdHJpbmcgdHlwZSlcbn07XG5cbmNvbnN0IGxvZ0xldmVsRW51bUxhYmVscyA9IE9iamVjdC5lbnRyaWVzKGxvZ1R5cGVzKS5yZWR1Y2UoXG4gIChyZXMsIFtrZXksIHtsYWJlbH1dKSA9PiB7XG4gICAgcmVzW2tleV0gPSBsYWJlbDtcbiAgICByZXR1cm4gcmVzO1xuICB9LFxuICB7fSBhcyBFbnVtTGFiZWxzLFxuKTtcblxuZnVuY3Rpb24gY3JlYXRlQ29sdW1uQ29uZmlnKFxuICBfb3M6ICdpT1MnIHwgJ0FuZHJvaWQnIHwgJ01ldHJvJyxcbik6IERhdGFUYWJsZUNvbHVtbjxFeHRlbmRlZExvZ0VudHJ5PltdIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBrZXk6ICd0eXBlJyxcbiAgICAgIHRpdGxlOiAnTGV2ZWwnLFxuICAgICAgd2lkdGg6IDMwLFxuICAgICAgb25SZW5kZXIoZW50cnkpIHtcbiAgICAgICAgcmV0dXJuIGVudHJ5LmNvdW50ID4gMSA/IChcbiAgICAgICAgICA8QmFkZ2VcbiAgICAgICAgICAgIGNvdW50PXtlbnRyeS5jb3VudH1cbiAgICAgICAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBjb2xvcjogdGhlbWUud2hpdGUsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6XG4gICAgICAgICAgICAgICAgKGxvZ1R5cGVzW2VudHJ5LnR5cGVdPy5zdHlsZSBhcyBhbnkpPy5jb2xvciA/P1xuICAgICAgICAgICAgICAgIHRoZW1lLnRleHRDb2xvclNlY29uZGFyeSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICBsb2dUeXBlc1tlbnRyeS50eXBlXT8uaWNvblxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIHBvd2VyU2VhcmNoQ29uZmlnOiB7XG4gICAgICAgIHR5cGU6ICdlbnVtJyxcbiAgICAgICAgZW51bUxhYmVsczogbG9nTGV2ZWxFbnVtTGFiZWxzLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ2RhdGUnLFxuICAgICAgdGl0bGU6ICdUaW1lJyxcbiAgICAgIHdpZHRoOiAxMjAsXG4gICAgICBwb3dlclNlYXJjaENvbmZpZzoge1xuICAgICAgICB0eXBlOiAnZGF0ZVRpbWUnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ3BpZFN0cicsXG4gICAgICB0aXRsZTogJ1BJRCcsXG4gICAgICB3aWR0aDogNjAsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgcG93ZXJTZWFyY2hDb25maWc6IHtcbiAgICAgICAgdHlwZTogJ2VudW0nLFxuICAgICAgICBpbmZlckVudW1PcHRpb25zRnJvbURhdGE6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAndGlkJyxcbiAgICAgIHRpdGxlOiAnVElEJyxcbiAgICAgIHdpZHRoOiA2MCxcbiAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAndGFnJyxcbiAgICAgIHRpdGxlOiAnVGFnJyxcbiAgICAgIHdpZHRoOiAxNjAsXG4gICAgICBwb3dlclNlYXJjaENvbmZpZzoge1xuICAgICAgICB0eXBlOiAnZW51bScsXG4gICAgICAgIGluZmVyRW51bU9wdGlvbnNGcm9tRGF0YTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdhcHAnLFxuICAgICAgdGl0bGU6ICdBcHAnLFxuICAgICAgd2lkdGg6IDE2MCxcbiAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAnbWVzc2FnZScsXG4gICAgICB0aXRsZTogJ01lc3NhZ2UnLFxuICAgICAgd3JhcDogdHJ1ZSxcbiAgICAgIGZvcm1hdHRlcnM6IFtcbiAgICAgICAgRGF0YUZvcm1hdHRlci50cnVuY2F0ZSg0MDApLFxuICAgICAgICBEYXRhRm9ybWF0dGVyLnByZXR0eVByaW50SnNvbixcbiAgICAgICAgRGF0YUZvcm1hdHRlci5saW5raWZ5LFxuICAgICAgXSxcbiAgICB9LFxuICBdO1xufVxuXG5mdW5jdGlvbiBnZXRSb3dTdHlsZShlbnRyeTogRGV2aWNlTG9nRW50cnkpOiBDU1NQcm9wZXJ0aWVzIHwgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIChsb2dUeXBlc1tlbnRyeS50eXBlXT8uc3R5bGUgYXMgYW55KSA/PyBiYXNlUm93U3R5bGU7XG59XG5cbmNvbnN0IHBvd2VyU2VhcmNoSW5pdGlhbFN0YXRlOiBTZWFyY2hFeHByZXNzaW9uVGVybVtdID0gW1xuICB7XG4gICAgZmllbGQ6IHtcbiAgICAgIGtleTogJ3R5cGUnLFxuICAgICAgbGFiZWw6ICdMZXZlbCcsXG4gICAgfSxcbiAgICBvcGVyYXRvcjpcbiAgICAgIGRhdGFUYWJsZVBvd2VyU2VhcmNoT3BlcmF0b3JzLmVudW1fc2V0X2lzX2FueV9vZihsb2dMZXZlbEVudW1MYWJlbHMpLFxuICAgIHNlYXJjaFZhbHVlOiBPYmplY3QuZW50cmllcyhsb2dUeXBlcylcbiAgICAgIC5maWx0ZXIoKFtfLCBpdGVtXSkgPT4gaXRlbS5lbmFibGVkKVxuICAgICAgLm1hcCgoW2tleV0pID0+IGtleSksXG4gIH0sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gZGV2aWNlUGx1Z2luKGNsaWVudDogRGV2aWNlUGx1Z2luQ2xpZW50KSB7XG4gIGNvbnN0IHJvd3MgPSBjcmVhdGVEYXRhU291cmNlPEV4dGVuZGVkTG9nRW50cnk+KFtdLCB7XG4gICAgbGltaXQ6IDIwMDAwMCxcbiAgICBwZXJzaXN0OiAnbG9ncycsXG4gICAgaW5kaWNlczogW1sncGlkU3RyJ10sIFsndGFnJ11dLCAvL3RoZXJlIGFyZSBmb3IgaW5mZXJyaW5nIGVudW0gdHlwZXNcbiAgfSk7XG4gIGNvbnN0IGlzUGF1c2VkID0gY3JlYXRlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IHRhYmxlTWFuYWdlclJlZiA9IGNyZWF0ZVJlZjxcbiAgICB1bmRlZmluZWQgfCBEYXRhVGFibGVNYW5hZ2VyPEV4dGVuZGVkTG9nRW50cnk+XG4gID4oKTtcblxuICBjbGllbnQub25EZWVwTGluaygocGF5bG9hZDogdW5rbm93bikgPT4ge1xuICAgIGlmICh0eXBlb2YgcGF5bG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRhYmxlTWFuYWdlclJlZi5jdXJyZW50Py5zZXRTZWFyY2hFeHByZXNzaW9uKHBvd2VyU2VhcmNoSW5pdGlhbFN0YXRlKTtcbiAgICAgIC8vIHRpbWVvdXQgYXMgd2Ugd2FudCB0byBhd2FpdCByZXN0b3JpbmcgYW55IHByZXZpb3VzIHNjcm9sbCBwb3NpdGluIGZpcnN0LCB0aGVuIHNjcm9sbCB0byB0aGVcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBsZXQgaGFzTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgcm93cy52aWV3Lm91dHB1dCgwLCByb3dzLnZpZXcuc2l6ZSkuZm9yRWFjaCgocm93LCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChyb3cubWVzc2FnZS5pbmNsdWRlcyhwYXlsb2FkKSkge1xuICAgICAgICAgICAgdGFibGVNYW5hZ2VyUmVmLmN1cnJlbnQ/LnNlbGVjdEl0ZW0oaW5kZXgsIGhhc01hdGNoKTtcbiAgICAgICAgICAgIGhhc01hdGNoID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSwgNTAwKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNsaWVudC5hZGRNZW51RW50cnkoXG4gICAge1xuICAgICAgYWN0aW9uOiAnY2xlYXInLFxuICAgICAgaGFuZGxlcjogY2xlYXJMb2dzLFxuICAgICAgYWNjZWxlcmF0b3I6ICdjdHJsK2wnLFxuICAgIH0sXG4gICAge1xuICAgICAgYWN0aW9uOiAnY3JlYXRlUGFzdGUnLFxuICAgICAgaGFuZGxlcjogY3JlYXRlUGFzdGUsXG4gICAgfSxcbiAgICB7XG4gICAgICBhY3Rpb246ICdnb1RvQm90dG9tJyxcbiAgICAgIGhhbmRsZXI6IGdvVG9Cb3R0b20sXG4gICAgfSxcbiAgKTtcblxuICBsZXQgbG9nRGlzcG9zZXI6ICgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZDtcblxuICBmdW5jdGlvbiByZXN1bWVQYXVzZSgpIHtcbiAgICBpZiAoaXNQYXVzZWQuZ2V0KCkgJiYgY2xpZW50LmRldmljZS5pc0Nvbm5lY3RlZCkge1xuICAgICAgLy8gc3RhcnQgbGlzdGVuaW5nIHRvIHRoZSBsb2dzXG4gICAgICBpc1BhdXNlZC5zZXQoZmFsc2UpO1xuICAgICAgbG9nRGlzcG9zZXIgPSBjbGllbnQub25EZXZpY2VMb2dFbnRyeSgoZW50cnk6IERldmljZUxvZ0VudHJ5KSA9PiB7XG4gICAgICAgIGNvbnN0IGxhc3RJbmRleCA9IHJvd3Muc2l6ZSAtIDE7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzUm93ID0gcm93cy5nZXQobGFzdEluZGV4KTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByZXZpb3VzUm93ICYmXG4gICAgICAgICAgcHJldmlvdXNSb3cubWVzc2FnZSA9PT0gZW50cnkubWVzc2FnZSAmJlxuICAgICAgICAgIHByZXZpb3VzUm93LnRhZyA9PT0gZW50cnkudGFnICYmXG4gICAgICAgICAgcHJldmlvdXNSb3cudHlwZSA9PT0gZW50cnkudHlwZVxuICAgICAgICApIHtcbiAgICAgICAgICByb3dzLnVwZGF0ZShsYXN0SW5kZXgsIHtcbiAgICAgICAgICAgIC4uLnByZXZpb3VzUm93LFxuICAgICAgICAgICAgcGlkU3RyOiBwcmV2aW91c1Jvdy5waWQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGNvdW50OiBwcmV2aW91c1Jvdy5jb3VudCArIDEsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm93cy5hcHBlbmQoe1xuICAgICAgICAgICAgLi4uZW50cnksXG4gICAgICAgICAgICBwaWRTdHI6IGVudHJ5LnBpZC50b1N0cmluZygpLFxuICAgICAgICAgICAgY291bnQ6IDEsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dEaXNwb3Nlcj8uKCk7XG4gICAgICBpc1BhdXNlZC5zZXQodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gY2xlYXJMb2dzKCkge1xuICAgIGlmIChjbGllbnQuZGV2aWNlLmNvbm5lY3RlZC5nZXQoKSkge1xuICAgICAgYXdhaXQgY2xpZW50LmRldmljZS5jbGVhckxvZ3MoKTtcbiAgICB9XG4gICAgcm93cy5jbGVhcigpO1xuICAgIHRhYmxlTWFuYWdlclJlZi5jdXJyZW50Py5jbGVhclNlbGVjdGlvbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUGFzdGUoKSB7XG4gICAgbGV0IHNlbGVjdGlvbiA9IHRhYmxlTWFuYWdlclJlZi5jdXJyZW50Py5nZXRTZWxlY3RlZEl0ZW1zKCk7XG4gICAgaWYgKCFzZWxlY3Rpb24/Lmxlbmd0aCkge1xuICAgICAgc2VsZWN0aW9uID0gcm93cy52aWV3Lm91dHB1dCgwLCByb3dzLnZpZXcuc2l6ZSk7XG4gICAgfVxuICAgIGlmIChzZWxlY3Rpb24/Lmxlbmd0aCkge1xuICAgICAgY2xpZW50LmNyZWF0ZVBhc3RlKEpTT04uc3RyaW5naWZ5KHNlbGVjdGlvbiwgbnVsbCwgMikpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdvVG9Cb3R0b20oKSB7XG4gICAgdGFibGVNYW5hZ2VyUmVmPy5jdXJyZW50Py5zZWxlY3RJdGVtKHJvd3Mudmlldy5zaXplIC0gMSk7XG4gIH1cblxuICAvLyBzdGFydCBsaXN0ZW5pbmcgdG8gdGhlIGxvZ3NcbiAgcmVzdW1lUGF1c2UoKTtcblxuICBjb25zdCBjb2x1bW5zID0gY3JlYXRlQ29sdW1uQ29uZmlnKGNsaWVudC5kZXZpY2Uub3MgYXMgYW55KTtcblxuICByZXR1cm4ge1xuICAgIGNvbHVtbnMsXG4gICAgaXNDb25uZWN0ZWQ6IGNsaWVudC5kZXZpY2UuaXNDb25uZWN0ZWQsXG4gICAgaXNQYXVzZWQsXG4gICAgdGFibGVNYW5hZ2VyUmVmLFxuICAgIHJvd3MsXG4gICAgY2xlYXJMb2dzLFxuICAgIHJlc3VtZVBhdXNlLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ29tcG9uZW50KCkge1xuICBjb25zdCBwbHVnaW4gPSB1c2VQbHVnaW4oZGV2aWNlUGx1Z2luKTtcbiAgY29uc3QgcGF1c2VkID0gdXNlVmFsdWUocGx1Z2luLmlzUGF1c2VkKTtcbiAgcmV0dXJuIChcbiAgICA8RGF0YVRhYmxlPEV4dGVuZGVkTG9nRW50cnk+XG4gICAgICBkYXRhU291cmNlPXtwbHVnaW4ucm93c31cbiAgICAgIGNvbHVtbnM9e3BsdWdpbi5jb2x1bW5zfVxuICAgICAgZW5hYmxlQXV0b1Njcm9sbFxuICAgICAgZW5hYmxlTXVsdGlQYW5lbHNcbiAgICAgIG9uUm93U3R5bGU9e2dldFJvd1N0eWxlfVxuICAgICAgZW5hYmxlSG9yaXpvbnRhbFNjcm9sbD17ZmFsc2V9XG4gICAgICBleHRyYUFjdGlvbnM9e1xuICAgICAgICBwbHVnaW4uaXNDb25uZWN0ZWQgPyAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgdGl0bGU9e2BDbGljayB0byAke3BhdXNlZCA/ICdyZXN1bWUnIDogJ3BhdXNlJ30gdGhlIGxvZyBzdHJlYW1gfVxuICAgICAgICAgICAgICBkYW5nZXI9e3BhdXNlZH1cbiAgICAgICAgICAgICAgb25DbGljaz17cGx1Z2luLnJlc3VtZVBhdXNlfT5cbiAgICAgICAgICAgICAge3BhdXNlZCA/IDxQbGF5Q2lyY2xlT3V0bGluZWQgLz4gOiA8UGF1c2VDaXJjbGVPdXRsaW5lZCAvPn1cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvbiB0aXRsZT1cIkNsZWFyIGxvZ3NcIiBvbkNsaWNrPXtwbHVnaW4uY2xlYXJMb2dzfT5cbiAgICAgICAgICAgICAgPERlbGV0ZU91dGxpbmVkIC8+XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKSA6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgICAgdGFibGVNYW5hZ2VyUmVmPXtwbHVnaW4udGFibGVNYW5hZ2VyUmVmfVxuICAgICAgcG93ZXJTZWFyY2hJbml0aWFsU3RhdGU9e3Bvd2VyU2VhcmNoSW5pdGlhbFN0YXRlfVxuICAgIC8+XG4gICk7XG59XG4iLCAiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG5pbXBvcnQge3RoZW1lfSBmcm9tICdmbGlwcGVyLXBsdWdpbic7XG5pbXBvcnQge1dhcm5pbmdGaWxsZWQsIENsb3NlQ2lyY2xlRmlsbGVkfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucyc7XG5pbXBvcnQgUmVhY3QsIHtDU1NQcm9wZXJ0aWVzfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IGljb25TdHlsZSA9IHtcbiAgZm9udFNpemU6ICcxNnB4Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBiYXNlUm93U3R5bGUgPSB7XG4gIC4uLnRoZW1lLm1vbm9zcGFjZSxcbn07XG5cbmV4cG9ydCBjb25zdCBsb2dUeXBlczoge1xuICBbbGV2ZWw6IHN0cmluZ106IHtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGljb24/OiBSZWFjdC5SZWFjdE5vZGU7XG4gICAgc3R5bGU/OiBDU1NQcm9wZXJ0aWVzO1xuICAgIGVuYWJsZWQ6IGJvb2xlYW47XG4gIH07XG59ID0ge1xuICB2ZXJib3NlOiB7XG4gICAgbGFiZWw6ICdWZXJib3NlJyxcbiAgICBzdHlsZToge1xuICAgICAgLi4uYmFzZVJvd1N0eWxlLFxuICAgICAgY29sb3I6IHRoZW1lLnRleHRDb2xvclNlY29uZGFyeSxcbiAgICB9LFxuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICB9LFxuICBkZWJ1Zzoge1xuICAgIGxhYmVsOiAnRGVidWcnLFxuICAgIHN0eWxlOiB7XG4gICAgICAuLi5iYXNlUm93U3R5bGUsXG4gICAgICBjb2xvcjogdGhlbWUudGV4dENvbG9yU2Vjb25kYXJ5LFxuICAgIH0sXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgfSxcbiAgaW5mbzoge1xuICAgIGxhYmVsOiAnSW5mbycsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgfSxcbiAgd2Fybjoge1xuICAgIGxhYmVsOiAnV2FybicsXG4gICAgc3R5bGU6IHtcbiAgICAgIC4uLmJhc2VSb3dTdHlsZSxcbiAgICAgIGNvbG9yOiB0aGVtZS53YXJuaW5nQ29sb3IsXG4gICAgfSxcbiAgICBpY29uOiA8V2FybmluZ0ZpbGxlZCBzdHlsZT17aWNvblN0eWxlfSAvPixcbiAgICBlbmFibGVkOiB0cnVlLFxuICB9LFxuICBlcnJvcjoge1xuICAgIGxhYmVsOiAnRXJyb3InLFxuICAgIHN0eWxlOiB7XG4gICAgICAuLi5iYXNlUm93U3R5bGUsXG4gICAgICBjb2xvcjogdGhlbWUuZXJyb3JDb2xvcixcbiAgICB9LFxuICAgIGljb246IDxDbG9zZUNpcmNsZUZpbGxlZCBzdHlsZT17aWNvblN0eWxlfSAvPixcbiAgICBlbmFibGVkOiB0cnVlLFxuICB9LFxuICBmYXRhbDoge1xuICAgIGxhYmVsOiAnRmF0YWwnLFxuICAgIHN0eWxlOiB7XG4gICAgICAuLi5iYXNlUm93U3R5bGUsXG4gICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5lcnJvckNvbG9yLFxuICAgICAgY29sb3I6IHRoZW1lLndoaXRlLFxuICAgIH0sXG4gICAgaWNvbjogPENsb3NlQ2lyY2xlRmlsbGVkIHN0eWxlPXtpY29uU3R5bGV9IC8+LFxuICAgIGVu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QTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGO0FBRU8sU0FBUyxZQUFZO0FBQzFCLFFBQU0sYUFBUyxrQ0FBVSxZQUFZO0FBQ3JDLFFBQU0sYUFBUyxpQ0FBUyxPQUFPLFFBQVE7QUFDdkMsU0FDRSw4QkFBQUEsUUFBQTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsWUFBWSxPQUFPO0FBQUEsTUFDbkIsU0FBUyxPQUFPO0FBQUEsTUFDaEIsa0JBQWdCO0FBQUEsTUFDaEIsbUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osd0JBQXdCO0FBQUEsTUFDeEIsY0FDRSxPQUFPLGNBQ0wsOEJBQUFBLFFBQUEsNEJBQUFBLFFBQUEsZ0JBQ0UsOEJBQUFBLFFBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU8sWUFBWSxTQUFTLFdBQVc7QUFBQSxVQUN2QyxRQUFRO0FBQUEsVUFDUixTQUFTLE9BQU87QUFBQTtBQUFBLFFBQ2YsU0FBUyw4QkFBQUEsUUFBQSxjQUFDLHNDQUFtQixJQUFLLDhCQUFBQSxRQUFBLGNBQUMsdUNBQW9CO0FBQUEsTUFDMUQsR0FDQSw4QkFBQUEsUUFBQSxjQUFDLHNCQUFPLE9BQU0sY0FBYSxTQUFTLE9BQU8sYUFDekMsOEJBQUFBLFFBQUEsY0FBQyxrQ0FBZSxDQUNsQixDQUNGLElBQ0U7QUFBQSxNQUVOLGlCQUFpQixPQUFPO0FBQUEsTUFDeEI7QUFBQTtBQUFBLEVBQ0Y7QUFFSjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X2ZsaXBwZXJfcGx1Z2luIiwgImltcG9ydF9pY29ucyIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiUmVhY3QiXQp9Cg==
