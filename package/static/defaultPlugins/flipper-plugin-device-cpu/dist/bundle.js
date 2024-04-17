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

// plugins/public/cpu/index.tsx
var cpu_exports = {};
__export(cpu_exports, {
  Component: () => Component2,
  devicePlugin: () => devicePlugin
});
module.exports = __toCommonJS(cpu_exports);
var import_flipper_plugin = require("flipper-plugin");

// plugins/public/cpu/TemperatureTable.tsx
var import_flipper = require("flipper");
var import_react = __toESM(require("react"));
var ColumnSizes = {
  thermal_zone: "flex",
  temperature: "flex",
  path: "flex"
};
var Columns = {
  thermal_zone: {
    value: "Thermal Zone",
    resizable: true
  },
  temperature: {
    value: "Temperature",
    resizable: true
  },
  path: {
    value: "Path",
    resizable: true
  }
};
var TemperatureTable = class extends import_flipper.Component {
  constructor() {
    super(...arguments);
    this.buildRow = (tz, tempInfo) => {
      return {
        columns: {
          thermal_zone: { value: /* @__PURE__ */ import_react.default.createElement(import_flipper.Text, null, tz) },
          temperature: {
            value: /* @__PURE__ */ import_react.default.createElement(import_flipper.Text, null, tempInfo.temp.toString())
          },
          path: {
            value: /* @__PURE__ */ import_react.default.createElement(import_flipper.Text, null, tempInfo.path)
          }
        },
        key: tz
      };
    };
    this.buildRows = () => {
      const rows = [];
      for (const tz of Object.keys(this.props.temperatureMap).sort()) {
        rows.push(this.buildRow(tz, this.props.temperatureMap[tz]));
      }
      return rows;
    };
  }
  render() {
    return /* @__PURE__ */ import_react.default.createElement(
      import_flipper.SearchableTable,
      {
        multiline: true,
        autoHeight: true,
        floating: false,
        zebra: true,
        columnSizes: ColumnSizes,
        columns: Columns,
        rows: this.buildRows(),
        grow: true
      }
    );
  }
};

// plugins/public/cpu/index.tsx
var import_antd = require("antd");
var import_icons = require("@ant-design/icons");
var import_react2 = __toESM(require("react"));
function isNormalInteger(str) {
  const n = Math.floor(Number(str));
  return String(n) === str && n >= 0;
}
function formatFrequency(freq) {
  if (freq == -1) {
    return "N/A";
  } else if (freq == -2) {
    return "off";
  } else if (freq > 1e3 * 1e3) {
    return `${(freq / 1e3 / 1e3).toFixed(2)} GHz`;
  } else {
    return `${freq / 1e3} MHz`;
  }
}
function devicePlugin(client) {
  const device = client.device;
  const executeShell = async (command) => device.executeShell(command);
  let intervalID = null;
  const cpuState = (0, import_flipper_plugin.createState)({
    cpuCount: 0,
    cpuFreq: [],
    monitoring: false,
    hardwareInfo: "",
    temperatureMap: {},
    thermalAccessible: true,
    displayThermalInfo: false,
    displayCPUDetail: true
  });
  const updateCoreFrequency = async (core, type) => {
    const output = await executeShell(
      `cat /sys/devices/system/cpu/cpu${core}/cpufreq/${type}`
    );
    cpuState.update((draft) => {
      const newFreq = isNormalInteger(output) ? parseInt(output, 10) : -1;
      if (draft.cpuFreq[core][type] != newFreq) {
        draft.cpuFreq[core][type] = newFreq;
        if (type == "scaling_cur_freq" && draft.cpuFreq[core][type] < 0) {
          draft.cpuFreq[core][type] = -2;
        }
      }
    });
  };
  const updateAvailableFrequencies = async (core) => {
    const output = await executeShell(
      `cat /sys/devices/system/cpu/cpu${core}/cpufreq/scaling_available_frequencies`
    );
    cpuState.update((draft) => {
      const freqs = output.split(" ").map((num) => {
        return parseInt(num, 10);
      });
      draft.cpuFreq[core].scaling_available_freqs = freqs;
      const maxFreq = draft.cpuFreq[core].scaling_max_freq;
      if (maxFreq > 0 && freqs.indexOf(maxFreq) == -1) {
        freqs.push(maxFreq);
      }
    });
  };
  const updateCoreGovernor = async (core) => {
    const output = await executeShell(
      `cat /sys/devices/system/cpu/cpu${core}/cpufreq/scaling_governor`
    );
    cpuState.update((draft) => {
      if (output.toLowerCase().includes("no such file")) {
        draft.cpuFreq[core].scaling_governor = "N/A";
      } else {
        draft.cpuFreq[core].scaling_governor = output;
      }
    });
  };
  const readAvailableGovernors = async (core) => {
    const output = await executeShell(
      `cat /sys/devices/system/cpu/cpu${core}/cpufreq/scaling_available_governors`
    );
    return output.split(" ");
  };
  const readCoreFrequency = async (core) => {
    const freq = cpuState.get().cpuFreq[core];
    const promises = [];
    if (freq.cpuinfo_max_freq < 0) {
      promises.push(updateCoreFrequency(core, "cpuinfo_max_freq"));
    }
    if (freq.cpuinfo_min_freq < 0) {
      promises.push(updateCoreFrequency(core, "cpuinfo_min_freq"));
    }
    promises.push(updateCoreFrequency(core, "scaling_cur_freq"));
    promises.push(updateCoreFrequency(core, "scaling_min_freq"));
    promises.push(updateCoreFrequency(core, "scaling_max_freq"));
    return Promise.all(promises).then(() => {
    });
  };
  const updateHardwareInfo = async () => {
    const output = await executeShell("getprop ro.board.platform");
    let hwInfo = "";
    if (output.startsWith("msm") || output.startsWith("apq") || output.startsWith("sdm")) {
      hwInfo = `QUALCOMM ${output.toUpperCase()}`;
    } else if (output.startsWith("exynos")) {
      const chipname = await executeShell("getprop ro.chipname");
      if (chipname != null) {
        cpuState.update((draft) => {
          draft.hardwareInfo = `SAMSUMG ${chipname.toUpperCase()}`;
        });
      }
      return;
    } else if (output.startsWith("mt")) {
      hwInfo = `MEDIATEK ${output.toUpperCase()}`;
    } else if (output.startsWith("sc")) {
      hwInfo = `SPREADTRUM ${output.toUpperCase()}`;
    } else if (output.startsWith("hi") || output.startsWith("kirin")) {
      hwInfo = `HISILICON ${output.toUpperCase()}`;
    } else if (output.startsWith("rk")) {
      hwInfo = `ROCKCHIP ${output.toUpperCase()}`;
    } else if (output.startsWith("bcm")) {
      hwInfo = `BROADCOM ${output.toUpperCase()}`;
    }
    cpuState.update((draft) => {
      draft.hardwareInfo = hwInfo;
    });
  };
  const readThermalZones = async () => {
    const thermal_dir = "/sys/class/thermal/";
    const map = {};
    const output = await executeShell(`ls ${thermal_dir}`);
    if (output.toLowerCase().includes("permission denied")) {
      cpuState.update((draft) => {
        draft.thermalAccessible = false;
      });
      return;
    }
    const dirs = output.split(/\s/);
    const promises = [];
    for (let d of dirs) {
      d = d.trim();
      if (d.length == 0) {
        continue;
      }
      const path = thermal_dir + d;
      promises.push(readThermalZone(path, d, map));
    }
    await Promise.all(promises);
    cpuState.update((draft) => {
      draft.temperatureMap = map;
      draft.thermalAccessible = true;
    });
    if (cpuState.get().displayThermalInfo) {
      setTimeout(readThermalZones, 1e3);
    }
  };
  const readThermalZone = async (path, dir, map) => {
    const type = await executeShell(`cat ${path}/type`);
    if (type.length == 0) {
      return;
    }
    const temp = await executeShell(`cat ${path}/temp`);
    if (Number.isNaN(Number(temp))) {
      return;
    }
    map[type] = {
      path: dir,
      temp: parseInt(temp, 10)
    };
  };
  const onStartMonitor = () => {
    if (cpuState.get().monitoring) {
      return;
    }
    cpuState.update((draft) => {
      draft.monitoring = true;
    });
    for (let i = 0; i < cpuState.get().cpuCount; ++i) {
      readAvailableGovernors(i).then((output) => {
        cpuState.update((draft) => {
          draft.cpuFreq[i].scaling_available_governors = output;
        });
      }).catch((e) => {
        console.error("Failed to read CPU governors:", e);
      });
    }
    const update = async () => {
      if (!cpuState.get().monitoring) {
        return;
      }
      const promises = [];
      for (let i = 0; i < cpuState.get().cpuCount; ++i) {
        promises.push(readCoreFrequency(i));
        promises.push(updateCoreGovernor(i));
        promises.push(updateAvailableFrequencies(i));
      }
      await Promise.all(promises);
      intervalID = setTimeout(update, 500);
    };
    intervalID = setTimeout(update, 500);
  };
  const onStopMonitor = () => {
    intervalID && clearInterval(intervalID);
    intervalID = null;
    cpuState.update((draft) => {
      draft.monitoring = false;
    });
  };
  const cleanup = () => {
    onStopMonitor();
    cpuState.update((draft) => {
      for (let i = 0; i < draft.cpuCount; ++i) {
        draft.cpuFreq[i].scaling_cur_freq = -1;
        draft.cpuFreq[i].scaling_min_freq = -1;
        draft.cpuFreq[i].scaling_max_freq = -1;
        draft.cpuFreq[i].scaling_available_freqs = [];
        draft.cpuFreq[i].scaling_governor = "N/A";
      }
    });
  };
  const toggleThermalSidebar = () => {
    if (!cpuState.get().displayThermalInfo) {
      readThermalZones();
    }
    cpuState.update((draft) => {
      draft.displayThermalInfo = !draft.displayThermalInfo;
      draft.displayCPUDetail = false;
    });
  };
  const toggleCPUSidebar = () => {
    cpuState.update((draft) => {
      draft.displayCPUDetail = !draft.displayCPUDetail;
      draft.displayThermalInfo = false;
    });
  };
  executeShell("cat /sys/devices/system/cpu/possible").then((output) => {
    const idx = output.indexOf("-");
    const cpuFreq = [];
    const count = parseInt(output.substring(idx + 1), 10) + 1;
    for (let i = 0; i < count; ++i) {
      cpuFreq[i] = {
        cpu_id: i,
        scaling_cur_freq: -1,
        scaling_min_freq: -1,
        scaling_max_freq: -1,
        cpuinfo_min_freq: -1,
        cpuinfo_max_freq: -1,
        scaling_available_freqs: [],
        scaling_governor: "N/A",
        scaling_available_governors: []
      };
    }
    cpuState.set({
      cpuCount: count,
      cpuFreq,
      monitoring: false,
      hardwareInfo: "",
      temperatureMap: {},
      thermalAccessible: true,
      displayThermalInfo: false,
      displayCPUDetail: true
    });
  }).catch((e) => {
    console.error("Failed to read CPU cores:", e);
  });
  client.onDeactivate(() => cleanup());
  client.onActivate(() => {
    updateHardwareInfo();
    readThermalZones();
  });
  return {
    executeShell,
    cpuState,
    onStartMonitor,
    onStopMonitor,
    toggleCPUSidebar,
    toggleThermalSidebar
  };
}
var columns = [
  { key: "cpu_id", title: "CPU ID" },
  { key: "scaling_cur_freq", title: "Current Frequency" },
  { key: "scaling_min_freq", title: "Scaling min" },
  { key: "scaling_max_freq", title: "Scaling max" },
  { key: "cpuinfo_min_freq", title: "CPU min" },
  { key: "cpuinfo_max_freq", title: "CPU max" },
  { key: "scaling_governor", title: "Scaling governor" }
];
var cpuSidebarColumns = [
  {
    key: "key",
    title: "key",
    wrap: true
  },
  {
    key: "value",
    title: "value",
    wrap: true
  }
];
function Component2() {
  const instance = (0, import_flipper_plugin.usePlugin)(devicePlugin);
  const {
    onStartMonitor,
    onStopMonitor,
    toggleCPUSidebar,
    toggleThermalSidebar
  } = instance;
  const cpuState = (0, import_flipper_plugin.useValue)(instance.cpuState);
  const [selectedIds, setSelectedIds] = (0, import_react2.useState)([]);
  const sidebarRows = (id) => {
    let availableFreqTitle = "Scaling Available Frequencies";
    const selected = cpuState.cpuFreq[id];
    if (selected.scaling_available_freqs.length > 0) {
      availableFreqTitle += ` (${selected.scaling_available_freqs.length.toString()})`;
    }
    const keys = [availableFreqTitle, "Scaling Available Governors"];
    const vals = [
      buildAvailableFreqList(selected),
      buildAvailableGovList(selected)
    ];
    return keys.map((key, idx) => {
      return buildSidebarRow(key, vals[idx]);
    });
  };
  const renderCPUSidebar = () => {
    if (!cpuState.displayCPUDetail || selectedIds.length == 0) {
      return null;
    }
    const id = selectedIds[0];
    return /* @__PURE__ */ import_react2.default.createElement(import_flipper_plugin.DetailSidebar, { width: 500 }, /* @__PURE__ */ import_react2.default.createElement(import_flipper_plugin.Layout.Container, { pad: true }, /* @__PURE__ */ import_react2.default.createElement(import_antd.Typography.Title, null, "CPU Details: CPU_", id), /* @__PURE__ */ import_react2.default.createElement(
      import_flipper_plugin.DataTable,
      {
        records: sidebarRows(id),
        columns: cpuSidebarColumns,
        scrollable: false,
        enableSearchbar: false
      }
    )));
  };
  const renderThermalSidebar = () => {
    if (!cpuState.displayThermalInfo) {
      return null;
    }
    return /* @__PURE__ */ import_react2.default.createElement(import_flipper_plugin.DetailSidebar, { width: 500 }, /* @__PURE__ */ import_react2.default.createElement(
      import_flipper_plugin.Panel,
      {
        pad: import_flipper_plugin.theme.space.small,
        title: "Thermal Information",
        collapsible: false
      },
      cpuState.thermalAccessible ? /* @__PURE__ */ import_react2.default.createElement(TemperatureTable, { temperatureMap: cpuState.temperatureMap }) : "Temperature information not accessible on this device."
    ));
  };
  const setSelected = (0, import_react2.useCallback)((selected) => {
    setSelectedIds(selected ? [selected.core] : []);
  }, []);
  return /* @__PURE__ */ import_react2.default.createElement(import_flipper_plugin.Layout.Container, { pad: true }, /* @__PURE__ */ import_react2.default.createElement(import_antd.Typography.Title, null, "CPU Info"), /* @__PURE__ */ import_react2.default.createElement(import_flipper_plugin.Toolbar, null, cpuState.monitoring ? /* @__PURE__ */ import_react2.default.createElement(import_antd.Button, { onClick: onStopMonitor, icon: /* @__PURE__ */ import_react2.default.createElement(import_icons.PauseCircleOutlined, null) }, "Pause") : /* @__PURE__ */ import_react2.default.createElement(import_antd.Button, { onClick: onStartMonitor, icon: /* @__PURE__ */ import_react2.default.createElement(import_icons.PlayCircleOutlined, null) }, "Start"), "\xA0 ", cpuState.hardwareInfo, /* @__PURE__ */ import_react2.default.createElement(
    import_antd.Switch,
    {
      checked: cpuState.displayThermalInfo,
      onClick: toggleThermalSidebar
    }
  ), "Thermal Information", /* @__PURE__ */ import_react2.default.createElement(
    import_antd.Switch,
    {
      onClick: toggleCPUSidebar,
      checked: cpuState.displayCPUDetail
    }
  ), "CPU Details", cpuState.displayCPUDetail && selectedIds.length == 0 && " (Please select a core in the table below)"), /* @__PURE__ */ import_react2.default.createElement(
    import_flipper_plugin.DataTable,
    {
      records: frequencyRows(cpuState.cpuFreq),
      columns,
      scrollable: false,
      onSelect: setSelected,
      onRowStyle: getRowStyle,
      enableSearchbar: false
    }
  ), renderCPUSidebar(), renderThermalSidebar());
}
function buildAvailableGovList(freq) {
  if (freq.scaling_available_governors.length == 0) {
    return "N/A";
  }
  return freq.scaling_available_governors.join(", ");
}
function buildSidebarRow(key, val) {
  return {
    key,
    value: val
  };
}
function buildRow(freq) {
  return {
    core: freq.cpu_id,
    cpu_id: `CPU_${freq.cpu_id}`,
    scaling_cur_freq: formatFrequency(freq.scaling_cur_freq),
    scaling_min_freq: formatFrequency(freq.scaling_min_freq),
    scaling_max_freq: formatFrequency(freq.scaling_max_freq),
    cpuinfo_min_freq: formatFrequency(freq.cpuinfo_min_freq),
    cpuinfo_max_freq: formatFrequency(freq.cpuinfo_max_freq),
    scaling_governor: freq.scaling_governor
  };
}
function frequencyRows(cpuFreqs) {
  return cpuFreqs.map(buildRow);
}
function getRowStyle(freq) {
  if (freq.scaling_cur_freq == -2) {
    return {
      backgroundColor: import_flipper_plugin.theme.backgroundWash,
      color: import_flipper_plugin.theme.textColorPrimary,
      fontWeight: 700
    };
  } else if (freq.scaling_min_freq != freq.cpuinfo_min_freq && freq.scaling_min_freq > 0 && freq.cpuinfo_min_freq > 0) {
    return {
      backgroundColor: import_flipper_plugin.theme.warningColor,
      color: import_flipper_plugin.theme.textColorPrimary,
      fontWeight: 700
    };
  } else if (freq.scaling_max_freq != freq.cpuinfo_max_freq && freq.scaling_max_freq > 0 && freq.cpuinfo_max_freq > 0) {
    return {
      backgroundColor: import_flipper_plugin.theme.backgroundWash,
      color: import_flipper_plugin.theme.textColorSecondary,
      fontWeight: 700
    };
  }
}
function buildAvailableFreqList(freq) {
  if (freq.scaling_available_freqs.length == 0) {
    return /* @__PURE__ */ import_react2.default.createElement(import_antd.Typography.Text, null, "N/A");
  }
  const info = freq;
  return /* @__PURE__ */ import_react2.default.createElement(import_antd.Typography.Text, null, freq.scaling_available_freqs.map((freq2, idx) => {
    const bold = freq2 == info.scaling_cur_freq || freq2 == info.scaling_min_freq || freq2 == info.scaling_max_freq;
    return /* @__PURE__ */ import_react2.default.createElement(import_antd.Typography.Text, { key: idx, strong: bold }, formatFrequency(freq2), freq2 == info.scaling_cur_freq && /* @__PURE__ */ import_react2.default.createElement(import_antd.Typography.Text, { strong: bold }, " ", "(scaling current)"), freq2 == info.scaling_min_freq && /* @__PURE__ */ import_react2.default.createElement(import_antd.Typography.Text, { strong: bold }, " (scaling min)"), freq2 == info.scaling_max_freq && /* @__PURE__ */ import_react2.default.createElement(import_antd.Typography.Text, { strong: bold }, " (scaling max)"), /* @__PURE__ */ import_react2.default.createElement("br", null));
  }));
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vaW5kZXgudHN4IiwgIi4uL1RlbXBlcmF0dXJlVGFibGUudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB7XG4gIGNyZWF0ZVN0YXRlLFxuICBQbHVnaW5DbGllbnQsXG4gIHVzZVBsdWdpbixcbiAgdXNlVmFsdWUsXG4gIFBhbmVsLFxuICB0aGVtZSxcbiAgTGF5b3V0LFxuICBEZXRhaWxTaWRlYmFyLFxuICBEYXRhVGFibGUsXG4gIERhdGFUYWJsZUNvbHVtbixcbiAgVG9vbGJhcixcbn0gZnJvbSAnZmxpcHBlci1wbHVnaW4nO1xuaW1wb3J0IFRlbXBlcmF0dXJlVGFibGUgZnJvbSAnLi9UZW1wZXJhdHVyZVRhYmxlJztcbmltcG9ydCB7QnV0dG9uLCBUeXBvZ3JhcGh5LCBTd2l0Y2h9IGZyb20gJ2FudGQnO1xuaW1wb3J0IHtQbGF5Q2lyY2xlT3V0bGluZWQsIFBhdXNlQ2lyY2xlT3V0bGluZWR9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcblxuaW1wb3J0IFJlYWN0LCB7dXNlQ2FsbGJhY2ssIHVzZVN0YXRlfSBmcm9tICdyZWFjdCc7XG5cbi8vIHdlIGtlZXAgdmFpcmFibGUgbmFtZSB3aXRoIHVuZGVybGluZSBmb3IgdG8gcGh5c2ljYWwgcGF0aCBtYXBwaW5ncyBvbiBkZXZpY2VcbnR5cGUgQ1BVRnJlcXVlbmN5ID0ge1xuICBbaW5kZXg6IHN0cmluZ106IG51bWJlciB8IEFycmF5PG51bWJlcj4gfCBzdHJpbmcgfCBBcnJheTxzdHJpbmc+O1xuICBjcHVfaWQ6IG51bWJlcjtcbiAgc2NhbGluZ19jdXJfZnJlcTogbnVtYmVyO1xuICBzY2FsaW5nX21pbl9mcmVxOiBudW1iZXI7XG4gIHNjYWxpbmdfbWF4X2ZyZXE6IG51bWJlcjtcbiAgc2NhbGluZ19hdmFpbGFibGVfZnJlcXM6IEFycmF5PG51bWJlcj47XG4gIHNjYWxpbmdfZ292ZXJub3I6IHN0cmluZztcbiAgc2NhbGluZ19hdmFpbGFibGVfZ292ZXJub3JzOiBBcnJheTxzdHJpbmc+O1xuICBjcHVpbmZvX21heF9mcmVxOiBudW1iZXI7XG4gIGNwdWluZm9fbWluX2ZyZXE6IG51bWJlcjtcbn07XG5cbnR5cGUgQ1BVU3RhdGUgPSB7XG4gIGNwdUZyZXE6IEFycmF5PENQVUZyZXF1ZW5jeT47XG4gIGNwdUNvdW50OiBudW1iZXI7XG4gIG1vbml0b3Jpbmc6IGJvb2xlYW47XG4gIGhhcmR3YXJlSW5mbzogc3RyaW5nO1xuICB0ZW1wZXJhdHVyZU1hcDogYW55O1xuICB0aGVybWFsQWNjZXNzaWJsZTogYm9vbGVhbjtcbiAgZGlzcGxheVRoZXJtYWxJbmZvOiBib29sZWFuO1xuICBkaXNwbGF5Q1BVRGV0YWlsOiBib29sZWFuO1xufTtcblxuLy8gY2hlY2sgaWYgc3RyIGlzIGEgbnVtYmVyXG5mdW5jdGlvbiBpc05vcm1hbEludGVnZXIoc3RyOiBzdHJpbmcpIHtcbiAgY29uc3QgbiA9IE1hdGguZmxvb3IoTnVtYmVyKHN0cikpO1xuICByZXR1cm4gU3RyaW5nKG4pID09PSBzdHIgJiYgbiA+PSAwO1xufVxuXG4vLyBmb3JtYXQgZnJlcXVlbmN5IHRvIE1IeiwgR0h6XG5mdW5jdGlvbiBmb3JtYXRGcmVxdWVuY3koZnJlcTogbnVtYmVyKSB7XG4gIGlmIChmcmVxID09IC0xKSB7XG4gICAgcmV0dXJuICdOL0EnO1xuICB9IGVsc2UgaWYgKGZyZXEgPT0gLTIpIHtcbiAgICByZXR1cm4gJ29mZic7XG4gIH0gZWxzZSBpZiAoZnJlcSA+IDEwMDAgKiAxMDAwKSB7XG4gICAgcmV0dXJuIGAkeyhmcmVxIC8gMTAwMCAvIDEwMDApLnRvRml4ZWQoMil9IEdIemA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGAke2ZyZXEgLyAxMDAwfSBNSHpgO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXZpY2VQbHVnaW4oY2xpZW50OiBQbHVnaW5DbGllbnQ8e30sIHt9Pikge1xuICBjb25zdCBkZXZpY2UgPSBjbGllbnQuZGV2aWNlO1xuXG4gIGNvbnN0IGV4ZWN1dGVTaGVsbCA9IGFzeW5jIChjb21tYW5kOiBzdHJpbmcpID0+IGRldmljZS5leGVjdXRlU2hlbGwoY29tbWFuZCk7XG5cbiAgbGV0IGludGVydmFsSUQ6IE5vZGVKUy5UaW1lciB8IG51bGwgPSBudWxsO1xuICBjb25zdCBjcHVTdGF0ZSA9IGNyZWF0ZVN0YXRlPENQVVN0YXRlPih7XG4gICAgY3B1Q291bnQ6IDAsXG4gICAgY3B1RnJlcTogW10sXG4gICAgbW9uaXRvcmluZzogZmFsc2UsXG4gICAgaGFyZHdhcmVJbmZvOiAnJyxcbiAgICB0ZW1wZXJhdHVyZU1hcDoge30sXG4gICAgdGhlcm1hbEFjY2Vzc2libGU6IHRydWUsXG4gICAgZGlzcGxheVRoZXJtYWxJbmZvOiBmYWxzZSxcbiAgICBkaXNwbGF5Q1BVRGV0YWlsOiB0cnVlLFxuICB9KTtcblxuICBjb25zdCB1cGRhdGVDb3JlRnJlcXVlbmN5OiAoXG4gICAgY29yZTogbnVtYmVyLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgKSA9PiBQcm9taXNlPHZvaWQ+ID0gYXN5bmMgKGNvcmU6IG51bWJlciwgdHlwZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgZXhlY3V0ZVNoZWxsKFxuICAgICAgYGNhdCAvc3lzL2RldmljZXMvc3lzdGVtL2NwdS9jcHUke2NvcmV9L2NwdWZyZXEvJHt0eXBlfWAsXG4gICAgKTtcbiAgICBjcHVTdGF0ZS51cGRhdGUoKGRyYWZ0KSA9PiB7XG4gICAgICBjb25zdCBuZXdGcmVxID0gaXNOb3JtYWxJbnRlZ2VyKG91dHB1dCkgPyBwYXJzZUludChvdXRwdXQsIDEwKSA6IC0xO1xuICAgICAgLy8gdXBkYXRlIHRhYmxlIG9ubHkgaWYgZnJlcXVlbmN5IGNoYW5nZWRcbiAgICAgIGlmIChkcmFmdC5jcHVGcmVxW2NvcmVdW3R5cGVdICE9IG5ld0ZyZXEpIHtcbiAgICAgICAgZHJhZnQuY3B1RnJlcVtjb3JlXVt0eXBlXSA9IG5ld0ZyZXE7XG4gICAgICAgIGlmICh0eXBlID09ICdzY2FsaW5nX2N1cl9mcmVxJyAmJiBkcmFmdC5jcHVGcmVxW2NvcmVdW3R5cGVdIDwgMCkge1xuICAgICAgICAgIC8vIGNhbm5vdCBmaW5kIGN1cnJlbnQgZnJlcSBtZWFucyBvZmZsaW5lXG4gICAgICAgICAgZHJhZnQuY3B1RnJlcVtjb3JlXVt0eXBlXSA9IC0yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlQXZhaWxhYmxlRnJlcXVlbmNpZXM6IChjb3JlOiBudW1iZXIpID0+IFByb21pc2U8dm9pZD4gPSBhc3luYyAoXG4gICAgY29yZTogbnVtYmVyLFxuICApID0+IHtcbiAgICBjb25zdCBvdXRwdXQgPSBhd2FpdCBleGVjdXRlU2hlbGwoXG4gICAgICBgY2F0IC9zeXMvZGV2aWNlcy9zeXN0ZW0vY3B1L2NwdSR7Y29yZX0vY3B1ZnJlcS9zY2FsaW5nX2F2YWlsYWJsZV9mcmVxdWVuY2llc2AsXG4gICAgKTtcbiAgICBjcHVTdGF0ZS51cGRhdGUoKGRyYWZ0KSA9PiB7XG4gICAgICBjb25zdCBmcmVxcyA9IG91dHB1dC5zcGxpdCgnICcpLm1hcCgobnVtOiBzdHJpbmcpID0+IHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KG51bSwgMTApO1xuICAgICAgfSk7XG4gICAgICBkcmFmdC5jcHVGcmVxW2NvcmVdLnNjYWxpbmdfYXZhaWxhYmxlX2ZyZXFzID0gZnJlcXM7XG4gICAgICBjb25zdCBtYXhGcmVxID0gZHJhZnQuY3B1RnJlcVtjb3JlXS5zY2FsaW5nX21heF9mcmVxO1xuICAgICAgaWYgKG1heEZyZXEgPiAwICYmIGZyZXFzLmluZGV4T2YobWF4RnJlcSkgPT0gLTEpIHtcbiAgICAgICAgZnJlcXMucHVzaChtYXhGcmVxKTsgLy8gYWx3YXlzIGFkZCBzY2FsaW5nIG1heCB0byBhdmFpbGFibGUgZnJlcXVlbmNpZXNcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVDb3JlR292ZXJub3I6IChjb3JlOiBudW1iZXIpID0+IFByb21pc2U8dm9pZD4gPSBhc3luYyAoXG4gICAgY29yZTogbnVtYmVyLFxuICApID0+IHtcbiAgICBjb25zdCBvdXRwdXQgPSBhd2FpdCBleGVjdXRlU2hlbGwoXG4gICAgICBgY2F0IC9zeXMvZGV2aWNlcy9zeXN0ZW0vY3B1L2NwdSR7Y29yZX0vY3B1ZnJlcS9zY2FsaW5nX2dvdmVybm9yYCxcbiAgICApO1xuICAgIGNwdVN0YXRlLnVwZGF0ZSgoZHJhZnQpID0+IHtcbiAgICAgIGlmIChvdXRwdXQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnbm8gc3VjaCBmaWxlJykpIHtcbiAgICAgICAgZHJhZnQuY3B1RnJlcVtjb3JlXS5zY2FsaW5nX2dvdmVybm9yID0gJ04vQSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkcmFmdC5jcHVGcmVxW2NvcmVdLnNjYWxpbmdfZ292ZXJub3IgPSBvdXRwdXQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcmVhZEF2YWlsYWJsZUdvdmVybm9yczogKGNvcmU6IG51bWJlcikgPT4gUHJvbWlzZTxzdHJpbmdbXT4gPSBhc3luYyAoXG4gICAgY29yZTogbnVtYmVyLFxuICApID0+IHtcbiAgICBjb25zdCBvdXRwdXQgPSBhd2FpdCBleGVjdXRlU2hlbGwoXG4gICAgICBgY2F0IC9zeXMvZGV2aWNlcy9zeXN0ZW0vY3B1L2NwdSR7Y29yZX0vY3B1ZnJlcS9zY2FsaW5nX2F2YWlsYWJsZV9nb3Zlcm5vcnNgLFxuICAgICk7XG4gICAgcmV0dXJuIG91dHB1dC5zcGxpdCgnICcpO1xuICB9O1xuXG4gIGNvbnN0IHJlYWRDb3JlRnJlcXVlbmN5ID0gYXN5bmMgKGNvcmU6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IGZyZXEgPSBjcHVTdGF0ZS5nZXQoKS5jcHVGcmVxW2NvcmVdO1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgaWYgKGZyZXEuY3B1aW5mb19tYXhfZnJlcSA8IDApIHtcbiAgICAgIHByb21pc2VzLnB1c2godXBkYXRlQ29yZUZyZXF1ZW5jeShjb3JlLCAnY3B1aW5mb19tYXhfZnJlcScpKTtcbiAgICB9XG4gICAgaWYgKGZyZXEuY3B1aW5mb19taW5fZnJlcSA8IDApIHtcbiAgICAgIHByb21pc2VzLnB1c2godXBkYXRlQ29yZUZyZXF1ZW5jeShjb3JlLCAnY3B1aW5mb19taW5fZnJlcScpKTtcbiAgICB9XG4gICAgcHJvbWlzZXMucHVzaCh1cGRhdGVDb3JlRnJlcXVlbmN5KGNvcmUsICdzY2FsaW5nX2N1cl9mcmVxJykpO1xuICAgIHByb21pc2VzLnB1c2godXBkYXRlQ29yZUZyZXF1ZW5jeShjb3JlLCAnc2NhbGluZ19taW5fZnJlcScpKTtcbiAgICBwcm9taXNlcy5wdXNoKHVwZGF0ZUNvcmVGcmVxdWVuY3koY29yZSwgJ3NjYWxpbmdfbWF4X2ZyZXEnKSk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHt9KTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVIYXJkd2FyZUluZm8gPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgZXhlY3V0ZVNoZWxsKCdnZXRwcm9wIHJvLmJvYXJkLnBsYXRmb3JtJyk7XG4gICAgbGV0IGh3SW5mbyA9ICcnO1xuICAgIGlmIChcbiAgICAgIG91dHB1dC5zdGFydHNXaXRoKCdtc20nKSB8fFxuICAgICAgb3V0cHV0LnN0YXJ0c1dpdGgoJ2FwcScpIHx8XG4gICAgICBvdXRwdXQuc3RhcnRzV2l0aCgnc2RtJylcbiAgICApIHtcbiAgICAgIGh3SW5mbyA9IGBRVUFMQ09NTSAke291dHB1dC50b1VwcGVyQ2FzZSgpfWA7XG4gICAgfSBlbHNlIGlmIChvdXRwdXQuc3RhcnRzV2l0aCgnZXh5bm9zJykpIHtcbiAgICAgIGNvbnN0IGNoaXBuYW1lID0gYXdhaXQgZXhlY3V0ZVNoZWxsKCdnZXRwcm9wIHJvLmNoaXBuYW1lJyk7XG4gICAgICBpZiAoY2hpcG5hbWUgIT0gbnVsbCkge1xuICAgICAgICBjcHVTdGF0ZS51cGRhdGUoKGRyYWZ0KSA9PiB7XG4gICAgICAgICAgZHJhZnQuaGFyZHdhcmVJbmZvID0gYFNBTVNVTUcgJHtjaGlwbmFtZS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAob3V0cHV0LnN0YXJ0c1dpdGgoJ210JykpIHtcbiAgICAgIGh3SW5mbyA9IGBNRURJQVRFSyAke291dHB1dC50b1VwcGVyQ2FzZSgpfWA7XG4gICAgfSBlbHNlIGlmIChvdXRwdXQuc3RhcnRzV2l0aCgnc2MnKSkge1xuICAgICAgaHdJbmZvID0gYFNQUkVBRFRSVU0gJHtvdXRwdXQudG9VcHBlckNhc2UoKX1gO1xuICAgIH0gZWxzZSBpZiAob3V0cHV0LnN0YXJ0c1dpdGgoJ2hpJykgfHwgb3V0cHV0LnN0YXJ0c1dpdGgoJ2tpcmluJykpIHtcbiAgICAgIGh3SW5mbyA9IGBISVNJTElDT04gJHtvdXRwdXQudG9VcHBlckNhc2UoKX1gO1xuICAgIH0gZWxzZSBpZiAob3V0cHV0LnN0YXJ0c1dpdGgoJ3JrJykpIHtcbiAgICAgIGh3SW5mbyA9IGBST0NLQ0hJUCAke291dHB1dC50b1VwcGVyQ2FzZSgpfWA7XG4gICAgfSBlbHNlIGlmIChvdXRwdXQuc3RhcnRzV2l0aCgnYmNtJykpIHtcbiAgICAgIGh3SW5mbyA9IGBCUk9BRENPTSAke291dHB1dC50b1VwcGVyQ2FzZSgpfWA7XG4gICAgfVxuICAgIGNwdVN0YXRlLnVwZGF0ZSgoZHJhZnQpID0+IHtcbiAgICAgIGRyYWZ0LmhhcmR3YXJlSW5mbyA9IGh3SW5mbztcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCByZWFkVGhlcm1hbFpvbmVzID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHRoZXJtYWxfZGlyID0gJy9zeXMvY2xhc3MvdGhlcm1hbC8nO1xuICAgIGNvbnN0IG1hcCA9IHt9O1xuICAgIGNvbnN0IG91dHB1dCA9IGF3YWl0IGV4ZWN1dGVTaGVsbChgbHMgJHt0aGVybWFsX2Rpcn1gKTtcbiAgICBpZiAob3V0cHV0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3Blcm1pc3Npb24gZGVuaWVkJykpIHtcbiAgICAgIGNwdVN0YXRlLnVwZGF0ZSgoZHJhZnQpID0+IHtcbiAgICAgICAgZHJhZnQudGhlcm1hbEFjY2Vzc2libGUgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBkaXJzID0gb3V0cHV0LnNwbGl0KC9cXHMvKTtcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgIGZvciAobGV0IGQgb2YgZGlycykge1xuICAgICAgZCA9IGQudHJpbSgpO1xuICAgICAgaWYgKGQubGVuZ3RoID09IDApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCBwYXRoID0gdGhlcm1hbF9kaXIgKyBkO1xuICAgICAgcHJvbWlzZXMucHVzaChyZWFkVGhlcm1hbFpvbmUocGF0aCwgZCwgbWFwKSk7XG4gICAgfVxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICBjcHVTdGF0ZS51cGRhdGUoKGRyYWZ0KSA9PiB7XG4gICAgICBkcmFmdC50ZW1wZXJhdHVyZU1hcCA9IG1hcDtcbiAgICAgIGRyYWZ0LnRoZXJtYWxBY2Nlc3NpYmxlID0gdHJ1ZTtcbiAgICB9KTtcbiAgICBpZiAoY3B1U3RhdGUuZ2V0KCkuZGlzcGxheVRoZXJtYWxJbmZvKSB7XG4gICAgICBzZXRUaW1lb3V0KHJlYWRUaGVybWFsWm9uZXMsIDEwMDApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWFkVGhlcm1hbFpvbmUgPSBhc3luYyAocGF0aDogc3RyaW5nLCBkaXI6IHN0cmluZywgbWFwOiBhbnkpID0+IHtcbiAgICBjb25zdCB0eXBlID0gYXdhaXQgZXhlY3V0ZVNoZWxsKGBjYXQgJHtwYXRofS90eXBlYCk7XG4gICAgaWYgKHR5cGUubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdGVtcCA9IGF3YWl0IGV4ZWN1dGVTaGVsbChgY2F0ICR7cGF0aH0vdGVtcGApO1xuICAgIGlmIChOdW1iZXIuaXNOYU4oTnVtYmVyKHRlbXApKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBtYXBbdHlwZV0gPSB7XG4gICAgICBwYXRoOiBkaXIsXG4gICAgICB0ZW1wOiBwYXJzZUludCh0ZW1wLCAxMCksXG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBvblN0YXJ0TW9uaXRvciA9ICgpID0+IHtcbiAgICBpZiAoY3B1U3RhdGUuZ2V0KCkubW9uaXRvcmluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNwdVN0YXRlLnVwZGF0ZSgoZHJhZnQpID0+IHtcbiAgICAgIGRyYWZ0Lm1vbml0b3JpbmcgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjcHVTdGF0ZS5nZXQoKS5jcHVDb3VudDsgKytpKSB7XG4gICAgICByZWFkQXZhaWxhYmxlR292ZXJub3JzKGkpXG4gICAgICAgIC50aGVuKChvdXRwdXQpID0+IHtcbiAgICAgICAgICBjcHVTdGF0ZS51cGRhdGUoKGRyYWZ0KSA9PiB7XG4gICAgICAgICAgICBkcmFmdC5jcHVGcmVxW2ldLnNjYWxpbmdfYXZhaWxhYmxlX2dvdmVybm9ycyA9IG91dHB1dDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHJlYWQgQ1BVIGdvdmVybm9yczonLCBlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCFjcHVTdGF0ZS5nZXQoKS5tb25pdG9yaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNwdVN0YXRlLmdldCgpLmNwdUNvdW50OyArK2kpIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChyZWFkQ29yZUZyZXF1ZW5jeShpKSk7XG4gICAgICAgIHByb21pc2VzLnB1c2godXBkYXRlQ29yZUdvdmVybm9yKGkpKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaCh1cGRhdGVBdmFpbGFibGVGcmVxdWVuY2llcyhpKSk7IC8vIHNjYWxpbmcgbWF4IG1pZ2h0IGNoYW5nZSwgc28gd2UgYWxzbyB1cGRhdGUgdGhpc1xuICAgICAgfVxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgICAgaW50ZXJ2YWxJRCA9IHNldFRpbWVvdXQodXBkYXRlLCA1MDApO1xuICAgIH07XG5cbiAgICBpbnRlcnZhbElEID0gc2V0VGltZW91dCh1cGRhdGUsIDUwMCk7XG4gIH07XG5cbiAgY29uc3Qgb25TdG9wTW9uaXRvciA9ICgpID0+IHtcbiAgICBpbnRlcnZhbElEICYmIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XG4gICAgaW50ZXJ2YWxJRCA9IG51bGw7XG4gICAgY3B1U3RhdGUudXBkYXRlKChkcmFmdCkgPT4ge1xuICAgICAgZHJhZnQubW9uaXRvcmluZyA9IGZhbHNlO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFudXAgPSAoKSA9PiB7XG4gICAgb25TdG9wTW9uaXRvcigpO1xuICAgIGNwdVN0YXRlLnVwZGF0ZSgoZHJhZnQpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHJhZnQuY3B1Q291bnQ7ICsraSkge1xuICAgICAgICBkcmFmdC5jcHVGcmVxW2ldLnNjYWxpbmdfY3VyX2ZyZXEgPSAtMTtcbiAgICAgICAgZHJhZnQuY3B1RnJlcVtpXS5zY2FsaW5nX21pbl9mcmVxID0gLTE7XG4gICAgICAgIGRyYWZ0LmNwdUZyZXFbaV0uc2NhbGluZ19tYXhfZnJlcSA9IC0xO1xuICAgICAgICBkcmFmdC5jcHVGcmVxW2ldLnNjYWxpbmdfYXZhaWxhYmxlX2ZyZXFzID0gW107XG4gICAgICAgIGRyYWZ0LmNwdUZyZXFbaV0uc2NhbGluZ19nb3Zlcm5vciA9ICdOL0EnO1xuICAgICAgICAvLyB3ZSBkb24ndCBjbGVhbnVwIGNwdWluZm9fbWluX2ZyZXEsIGNwdWluZm9fbWF4X2ZyZXFcbiAgICAgICAgLy8gYmVjYXVzZSB1c3VhbGx5IHRoZXkgYXJlIGZpeGVkIChoYXJkd2FyZSlcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCB0b2dnbGVUaGVybWFsU2lkZWJhciA9ICgpID0+IHtcbiAgICBpZiAoIWNwdVN0YXRlLmdldCgpLmRpc3BsYXlUaGVybWFsSW5mbykge1xuICAgICAgcmVhZFRoZXJtYWxab25lcygpO1xuICAgIH1cbiAgICBjcHVTdGF0ZS51cGRhdGUoKGRyYWZ0KSA9PiB7XG4gICAgICBkcmFmdC5kaXNwbGF5VGhlcm1hbEluZm8gPSAhZHJhZnQuZGlzcGxheVRoZXJtYWxJbmZvO1xuICAgICAgZHJhZnQuZGlzcGxheUNQVURldGFpbCA9IGZhbHNlO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZUNQVVNpZGViYXIgPSAoKSA9PiB7XG4gICAgY3B1U3RhdGUudXBkYXRlKChkcmFmdCkgPT4ge1xuICAgICAgZHJhZnQuZGlzcGxheUNQVURldGFpbCA9ICFkcmFmdC5kaXNwbGF5Q1BVRGV0YWlsO1xuICAgICAgZHJhZnQuZGlzcGxheVRoZXJtYWxJbmZvID0gZmFsc2U7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gY2hlY2sgaG93IG1hbnkgY29yZXMgd2UgaGF2ZSBvbiB0aGlzIGRldmljZVxuICBleGVjdXRlU2hlbGwoJ2NhdCAvc3lzL2RldmljZXMvc3lzdGVtL2NwdS9wb3NzaWJsZScpXG4gICAgLnRoZW4oKG91dHB1dCkgPT4ge1xuICAgICAgY29uc3QgaWR4ID0gb3V0cHV0LmluZGV4T2YoJy0nKTtcbiAgICAgIGNvbnN0IGNwdUZyZXEgPSBbXTtcbiAgICAgIGNvbnN0IGNvdW50ID0gcGFyc2VJbnQob3V0cHV0LnN1YnN0cmluZyhpZHggKyAxKSwgMTApICsgMTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xuICAgICAgICBjcHVGcmVxW2ldID0ge1xuICAgICAgICAgIGNwdV9pZDogaSxcbiAgICAgICAgICBzY2FsaW5nX2N1cl9mcmVxOiAtMSxcbiAgICAgICAgICBzY2FsaW5nX21pbl9mcmVxOiAtMSxcbiAgICAgICAgICBzY2FsaW5nX21heF9mcmVxOiAtMSxcbiAgICAgICAgICBjcHVpbmZvX21pbl9mcmVxOiAtMSxcbiAgICAgICAgICBjcHVpbmZvX21heF9mcmVxOiAtMSxcbiAgICAgICAgICBzY2FsaW5nX2F2YWlsYWJsZV9mcmVxczogW10sXG4gICAgICAgICAgc2NhbGluZ19nb3Zlcm5vcjogJ04vQScsXG4gICAgICAgICAgc2NhbGluZ19hdmFpbGFibGVfZ292ZXJub3JzOiBbXSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGNwdVN0YXRlLnNldCh7XG4gICAgICAgIGNwdUNvdW50OiBjb3VudCxcbiAgICAgICAgY3B1RnJlcTogY3B1RnJlcSxcbiAgICAgICAgbW9uaXRvcmluZzogZmFsc2UsXG4gICAgICAgIGhhcmR3YXJlSW5mbzogJycsXG4gICAgICAgIHRlbXBlcmF0dXJlTWFwOiB7fSxcbiAgICAgICAgdGhlcm1hbEFjY2Vzc2libGU6IHRydWUsXG4gICAgICAgIGRpc3BsYXlUaGVybWFsSW5mbzogZmFsc2UsXG4gICAgICAgIGRpc3BsYXlDUFVEZXRhaWw6IHRydWUsXG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHJlYWQgQ1BVIGNvcmVzOicsIGUpO1xuICAgIH0pO1xuXG4gIGNsaWVudC5vbkRlYWN0aXZhdGUoKCkgPT4gY2xlYW51cCgpKTtcbiAgY2xpZW50Lm9uQWN0aXZhdGUoKCkgPT4ge1xuICAgIHVwZGF0ZUhhcmR3YXJlSW5mbygpO1xuICAgIHJlYWRUaGVybWFsWm9uZXMoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBleGVjdXRlU2hlbGwsXG4gICAgY3B1U3RhdGUsXG4gICAgb25TdGFydE1vbml0b3IsXG4gICAgb25TdG9wTW9uaXRvcixcbiAgICB0b2dnbGVDUFVTaWRlYmFyLFxuICAgIHRvZ2dsZVRoZXJtYWxTaWRlYmFyLFxuICB9O1xufVxuXG5jb25zdCBjb2x1bW5zOiBEYXRhVGFibGVDb2x1bW5bXSA9IFtcbiAge2tleTogJ2NwdV9pZCcsIHRpdGxlOiAnQ1BVIElEJ30sXG4gIHtrZXk6ICdzY2FsaW5nX2N1cl9mcmVxJywgdGl0bGU6ICdDdXJyZW50IEZyZXF1ZW5jeSd9LFxuICB7a2V5OiAnc2NhbGluZ19taW5fZnJlcScsIHRpdGxlOiAnU2NhbGluZyBtaW4nfSxcbiAge2tleTogJ3NjYWxpbmdfbWF4X2ZyZXEnLCB0aXRsZTogJ1NjYWxpbmcgbWF4J30sXG4gIHtrZXk6ICdjcHVpbmZvX21pbl9mcmVxJywgdGl0bGU6ICdDUFUgbWluJ30sXG4gIHtrZXk6ICdjcHVpbmZvX21heF9mcmVxJywgdGl0bGU6ICdDUFUgbWF4J30sXG4gIHtrZXk6ICdzY2FsaW5nX2dvdmVybm9yJywgdGl0bGU6ICdTY2FsaW5nIGdvdmVybm9yJ30sXG5dO1xuXG5jb25zdCBjcHVTaWRlYmFyQ29sdW1uczogRGF0YVRhYmxlQ29sdW1uW10gPSBbXG4gIHtcbiAgICBrZXk6ICdrZXknLFxuICAgIHRpdGxlOiAna2V5JyxcbiAgICB3cmFwOiB0cnVlLFxuICB9LFxuICB7XG4gICAga2V5OiAndmFsdWUnLFxuICAgIHRpdGxlOiAndmFsdWUnLFxuICAgIHdyYXA6IHRydWUsXG4gIH0sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gQ29tcG9uZW50KCkge1xuICBjb25zdCBpbnN0YW5jZSA9IHVzZVBsdWdpbihkZXZpY2VQbHVnaW4pO1xuICBjb25zdCB7XG4gICAgb25TdGFydE1vbml0b3IsXG4gICAgb25TdG9wTW9uaXRvcixcbiAgICB0b2dnbGVDUFVTaWRlYmFyLFxuICAgIHRvZ2dsZVRoZXJtYWxTaWRlYmFyLFxuICB9ID0gaW5zdGFuY2U7XG5cbiAgY29uc3QgY3B1U3RhdGUgPSB1c2VWYWx1ZShpbnN0YW5jZS5jcHVTdGF0ZSk7XG5cbiAgY29uc3QgW3NlbGVjdGVkSWRzLCBzZXRTZWxlY3RlZElkc10gPSB1c2VTdGF0ZTxudW1iZXJbXT4oW10pO1xuXG4gIGNvbnN0IHNpZGViYXJSb3dzID0gKGlkOiBudW1iZXIpID0+IHtcbiAgICBsZXQgYXZhaWxhYmxlRnJlcVRpdGxlID0gJ1NjYWxpbmcgQXZhaWxhYmxlIEZyZXF1ZW5jaWVzJztcbiAgICBjb25zdCBzZWxlY3RlZCA9IGNwdVN0YXRlLmNwdUZyZXFbaWRdO1xuICAgIGlmIChzZWxlY3RlZC5zY2FsaW5nX2F2YWlsYWJsZV9mcmVxcy5sZW5ndGggPiAwKSB7XG4gICAgICBhdmFpbGFibGVGcmVxVGl0bGUgKz0gYCAoJHtzZWxlY3RlZC5zY2FsaW5nX2F2YWlsYWJsZV9mcmVxcy5sZW5ndGgudG9TdHJpbmcoKX0pYDtcbiAgICB9XG5cbiAgICBjb25zdCBrZXlzID0gW2F2YWlsYWJsZUZyZXFUaXRsZSwgJ1NjYWxpbmcgQXZhaWxhYmxlIEdvdmVybm9ycyddO1xuXG4gICAgY29uc3QgdmFscyA9IFtcbiAgICAgIGJ1aWxkQXZhaWxhYmxlRnJlcUxpc3Qoc2VsZWN0ZWQpLFxuICAgICAgYnVpbGRBdmFpbGFibGVHb3ZMaXN0KHNlbGVjdGVkKSxcbiAgICBdO1xuICAgIHJldHVybiBrZXlzLm1hcDxhbnk+KChrZXksIGlkeCkgPT4ge1xuICAgICAgcmV0dXJuIGJ1aWxkU2lkZWJhclJvdyhrZXksIHZhbHNbaWR4XSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyQ1BVU2lkZWJhciA9ICgpID0+IHtcbiAgICBpZiAoIWNwdVN0YXRlLmRpc3BsYXlDUFVEZXRhaWwgfHwgc2VsZWN0ZWRJZHMubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBpZCA9IHNlbGVjdGVkSWRzWzBdO1xuICAgIHJldHVybiAoXG4gICAgICA8RGV0YWlsU2lkZWJhciB3aWR0aD17NTAwfT5cbiAgICAgICAgPExheW91dC5Db250YWluZXIgcGFkPlxuICAgICAgICAgIDxUeXBvZ3JhcGh5LlRpdGxlPkNQVSBEZXRhaWxzOiBDUFVfe2lkfTwvVHlwb2dyYXBoeS5UaXRsZT5cbiAgICAgICAgICA8RGF0YVRhYmxlXG4gICAgICAgICAgICByZWNvcmRzPXtzaWRlYmFyUm93cyhpZCl9XG4gICAgICAgICAgICBjb2x1bW5zPXtjcHVTaWRlYmFyQ29sdW1uc31cbiAgICAgICAgICAgIHNjcm9sbGFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgZW5hYmxlU2VhcmNoYmFyPXtmYWxzZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0xheW91dC5Db250YWluZXI+XG4gICAgICA8L0RldGFpbFNpZGViYXI+XG4gICAgKTtcbiAgfTtcblxuICBjb25zdCByZW5kZXJUaGVybWFsU2lkZWJhciA9ICgpID0+IHtcbiAgICBpZiAoIWNwdVN0YXRlLmRpc3BsYXlUaGVybWFsSW5mbykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8RGV0YWlsU2lkZWJhciB3aWR0aD17NTAwfT5cbiAgICAgICAgPFBhbmVsXG4gICAgICAgICAgcGFkPXt0aGVtZS5zcGFjZS5zbWFsbH1cbiAgICAgICAgICB0aXRsZT1cIlRoZXJtYWwgSW5mb3JtYXRpb25cIlxuICAgICAgICAgIGNvbGxhcHNpYmxlPXtmYWxzZX0+XG4gICAgICAgICAge2NwdVN0YXRlLnRoZXJtYWxBY2Nlc3NpYmxlID8gKFxuICAgICAgICAgICAgPFRlbXBlcmF0dXJlVGFibGUgdGVtcGVyYXR1cmVNYXA9e2NwdVN0YXRlLnRlbXBlcmF0dXJlTWFwfSAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAnVGVtcGVyYXR1cmUgaW5mb3JtYXRpb24gbm90IGFjY2Vzc2libGUgb24gdGhpcyBkZXZpY2UuJ1xuICAgICAgICAgICl9XG4gICAgICAgIDwvUGFuZWw+XG4gICAgICA8L0RldGFpbFNpZGViYXI+XG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBzZXRTZWxlY3RlZCA9IHVzZUNhbGxiYWNrKChzZWxlY3RlZDogYW55KSA9PiB7XG4gICAgc2V0U2VsZWN0ZWRJZHMoc2VsZWN0ZWQgPyBbc2VsZWN0ZWQuY29yZV0gOiBbXSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxMYXlvdXQuQ29udGFpbmVyIHBhZD5cbiAgICAgIDxUeXBvZ3JhcGh5LlRpdGxlPkNQVSBJbmZvPC9UeXBvZ3JhcGh5LlRpdGxlPlxuICAgICAgPFRvb2xiYXI+XG4gICAgICAgIHtjcHVTdGF0ZS5tb25pdG9yaW5nID8gKFxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17b25TdG9wTW9uaXRvcn0gaWNvbj17PFBhdXNlQ2lyY2xlT3V0bGluZWQgLz59PlxuICAgICAgICAgICAgUGF1c2VcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uU3RhcnRNb25pdG9yfSBpY29uPXs8UGxheUNpcmNsZU91dGxpbmVkIC8+fT5cbiAgICAgICAgICAgIFN0YXJ0XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICl9XG4gICAgICAgICZuYnNwOyB7Y3B1U3RhdGUuaGFyZHdhcmVJbmZvfVxuICAgICAgICA8U3dpdGNoXG4gICAgICAgICAgY2hlY2tlZD17Y3B1U3RhdGUuZGlzcGxheVRoZXJtYWxJbmZvfVxuICAgICAgICAgIG9uQ2xpY2s9e3RvZ2dsZVRoZXJtYWxTaWRlYmFyfVxuICAgICAgICAvPlxuICAgICAgICBUaGVybWFsIEluZm9ybWF0aW9uXG4gICAgICAgIDxTd2l0Y2hcbiAgICAgICAgICBvbkNsaWNrPXt0b2dnbGVDUFVTaWRlYmFyfVxuICAgICAgICAgIGNoZWNrZWQ9e2NwdVN0YXRlLmRpc3BsYXlDUFVEZXRhaWx9XG4gICAgICAgIC8+XG4gICAgICAgIENQVSBEZXRhaWxzXG4gICAgICAgIHtjcHVTdGF0ZS5kaXNwbGF5Q1BVRGV0YWlsICYmXG4gICAgICAgICAgc2VsZWN0ZWRJZHMubGVuZ3RoID09IDAgJiZcbiAgICAgICAgICAnIChQbGVhc2Ugc2VsZWN0IGEgY29yZSBpbiB0aGUgdGFibGUgYmVsb3cpJ31cbiAgICAgIDwvVG9vbGJhcj5cblxuICAgICAgPERhdGFUYWJsZVxuICAgICAgICByZWNvcmRzPXtmcmVxdWVuY3lSb3dzKGNwdVN0YXRlLmNwdUZyZXEpfVxuICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICBzY3JvbGxhYmxlPXtmYWxzZX1cbiAgICAgICAgb25TZWxlY3Q9e3NldFNlbGVjdGVkfVxuICAgICAgICBvblJvd1N0eWxlPXtnZXRSb3dTdHlsZX1cbiAgICAgICAgZW5hYmxlU2VhcmNoYmFyPXtmYWxzZX1cbiAgICAgIC8+XG4gICAgICB7cmVuZGVyQ1BVU2lkZWJhcigpfVxuICAgICAge3JlbmRlclRoZXJtYWxTaWRlYmFyKCl9XG4gICAgPC9MYXlvdXQuQ29udGFpbmVyPlxuICApO1xufVxuXG5mdW5jdGlvbiBidWlsZEF2YWlsYWJsZUdvdkxpc3QoZnJlcTogQ1BVRnJlcXVlbmN5KTogc3RyaW5nIHtcbiAgaWYgKGZyZXEuc2NhbGluZ19hdmFpbGFibGVfZ292ZXJub3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgcmV0dXJuICdOL0EnO1xuICB9XG4gIHJldHVybiBmcmVxLnNjYWxpbmdfYXZhaWxhYmxlX2dvdmVybm9ycy5qb2luKCcsICcpO1xufVxuXG5mdW5jdGlvbiBidWlsZFNpZGViYXJSb3coa2V5OiBzdHJpbmcsIHZhbDogYW55KSB7XG4gIHJldHVybiB7XG4gICAga2V5OiBrZXksXG4gICAgdmFsdWU6IHZhbCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gYnVpbGRSb3coZnJlcTogQ1BVRnJlcXVlbmN5KSB7XG4gIHJldHVybiB7XG4gICAgY29yZTogZnJlcS5jcHVfaWQsXG4gICAgY3B1X2lkOiBgQ1BVXyR7ZnJlcS5jcHVfaWR9YCxcbiAgICBzY2FsaW5nX2N1cl9mcmVxOiBmb3JtYXRGcmVxdWVuY3koZnJlcS5zY2FsaW5nX2N1cl9mcmVxKSxcbiAgICBzY2FsaW5nX21pbl9mcmVxOiBmb3JtYXRGcmVxdWVuY3koZnJlcS5zY2FsaW5nX21pbl9mcmVxKSxcbiAgICBzY2FsaW5nX21heF9mcmVxOiBmb3JtYXRGcmVxdWVuY3koZnJlcS5zY2FsaW5nX21heF9mcmVxKSxcbiAgICBjcHVpbmZvX21pbl9mcmVxOiBmb3JtYXRGcmVxdWVuY3koZnJlcS5jcHVpbmZvX21pbl9mcmVxKSxcbiAgICBjcHVpbmZvX21heF9mcmVxOiBmb3JtYXRGcmVxdWVuY3koZnJlcS5jcHVpbmZvX21heF9mcmVxKSxcbiAgICBzY2FsaW5nX2dvdmVybm9yOiBmcmVxLnNjYWxpbmdfZ292ZXJub3IsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGZyZXF1ZW5jeVJvd3MoY3B1RnJlcXM6IEFycmF5PENQVUZyZXF1ZW5jeT4pIHtcbiAgcmV0dXJuIGNwdUZyZXFzLm1hcChidWlsZFJvdyk7XG59XG5cbmZ1bmN0aW9uIGdldFJvd1N0eWxlKGZyZXE6IENQVUZyZXF1ZW5jeSkge1xuICBpZiAoZnJlcS5zY2FsaW5nX2N1cl9mcmVxID09IC0yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWUuYmFja2dyb3VuZFdhc2gsXG4gICAgICBjb2xvcjogdGhlbWUudGV4dENvbG9yUHJpbWFyeSxcbiAgICAgIGZvbnRXZWlnaHQ6IDcwMCxcbiAgICB9O1xuICB9IGVsc2UgaWYgKFxuICAgIGZyZXEuc2NhbGluZ19taW5fZnJlcSAhPSBmcmVxLmNwdWluZm9fbWluX2ZyZXEgJiZcbiAgICBmcmVxLnNjYWxpbmdfbWluX2ZyZXEgPiAwICYmXG4gICAgZnJlcS5jcHVpbmZvX21pbl9mcmVxID4gMFxuICApIHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS53YXJuaW5nQ29sb3IsXG4gICAgICBjb2xvcjogdGhlbWUudGV4dENvbG9yUHJpbWFyeSxcbiAgICAgIGZvbnRXZWlnaHQ6IDcwMCxcbiAgICB9O1xuICB9IGVsc2UgaWYgKFxuICAgIGZyZXEuc2NhbGluZ19tYXhfZnJlcSAhPSBmcmVxLmNwdWluZm9fbWF4X2ZyZXEgJiZcbiAgICBmcmVxLnNjYWxpbmdfbWF4X2ZyZXEgPiAwICYmXG4gICAgZnJlcS5jcHVpbmZvX21heF9mcmVxID4gMFxuICApIHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5iYWNrZ3JvdW5kV2FzaCxcbiAgICAgIGNvbG9yOiB0aGVtZS50ZXh0Q29sb3JTZWNvbmRhcnksXG4gICAgICBmb250V2VpZ2h0OiA3MDAsXG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBidWlsZEF2YWlsYWJsZUZyZXFMaXN0KGZyZXE6IENQVUZyZXF1ZW5jeSkge1xuICBpZiAoZnJlcS5zY2FsaW5nX2F2YWlsYWJsZV9mcmVxcy5sZW5ndGggPT0gMCkge1xuICAgIHJldHVybiA8VHlwb2dyYXBoeS5UZXh0Pk4vQTwvVHlwb2dyYXBoeS5UZXh0PjtcbiAgfVxuICBjb25zdCBpbmZvID0gZnJlcTtcbiAgcmV0dXJuIChcbiAgICA8VHlwb2dyYXBoeS5UZXh0PlxuICAgICAge2ZyZXEuc2NhbGluZ19hdmFpbGFibGVfZnJlcXMubWFwKChmcmVxLCBpZHgpID0+IHtcbiAgICAgICAgY29uc3QgYm9sZCA9XG4gICAgICAgICAgZnJlcSA9PSBpbmZvLnNjYWxpbmdfY3VyX2ZyZXEgfHxcbiAgICAgICAgICBmcmVxID09IGluZm8uc2NhbGluZ19taW5fZnJlcSB8fFxuICAgICAgICAgIGZyZXEgPT0gaW5mby5zY2FsaW5nX21heF9mcmVxO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxUeXBvZ3JhcGh5LlRleHQga2V5PXtpZHh9IHN0cm9uZz17Ym9sZH0+XG4gICAgICAgICAgICB7Zm9ybWF0RnJlcXVlbmN5KGZyZXEpfVxuICAgICAgICAgICAge2ZyZXEgPT0gaW5mby5zY2FsaW5nX2N1cl9mcmVxICYmIChcbiAgICAgICAgICAgICAgPFR5cG9ncmFwaHkuVGV4dCBzdHJvbmc9e2JvbGR9PlxuICAgICAgICAgICAgICAgIHsnICd9XG4gICAgICAgICAgICAgICAgKHNjYWxpbmcgY3VycmVudClcbiAgICAgICAgICAgICAgPC9UeXBvZ3JhcGh5LlRleHQ+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2ZyZXEgPT0gaW5mby5zY2FsaW5nX21pbl9mcmVxICYmIChcbiAgICAgICAgICAgICAgPFR5cG9ncmFwaHkuVGV4dCBzdHJvbmc9e2JvbGR9PiAoc2NhbGluZyBtaW4pPC9UeXBvZ3JhcGh5LlRleHQ+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2ZyZXEgPT0gaW5mby5zY2FsaW5nX21heF9mcmVxICYmIChcbiAgICAgICAgICAgICAgPFR5cG9ncmFwaHkuVGV4dCBzdHJvbmc9e2JvbGR9PiAoc2NhbGluZyBtYXgpPC9UeXBvZ3JhcGh5LlRleHQ+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgPC9UeXBvZ3JhcGh5LlRleHQ+XG4gICAgICAgICk7XG4gICAgICB9KX1cbiAgICA8L1R5cG9ncmFwaHkuVGV4dD5cbiAgKTtcbn1cbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbi8vIFRPRE86IEZpeCB0aGlzIHRoZSBuZXh0IHRpbWUgdGhlIGZpbGUgaXMgZWRpdGVkLlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJ1bGVzZGlyL25vLXJlc3RyaWN0ZWQtaW1wb3J0cy1jbG9uZVxuaW1wb3J0IHtDb21wb25lbnQsIFRleHQsIFNlYXJjaGFibGVUYWJsZX0gZnJvbSAnZmxpcHBlcic7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBDb2x1bW5TaXplcyA9IHtcbiAgdGhlcm1hbF96b25lOiAnZmxleCcsXG4gIHRlbXBlcmF0dXJlOiAnZmxleCcsXG4gIHBhdGg6ICdmbGV4Jyxcbn07XG5cbmNvbnN0IENvbHVtbnMgPSB7XG4gIHRoZXJtYWxfem9uZToge1xuICAgIHZhbHVlOiAnVGhlcm1hbCBab25lJyxcbiAgICByZXNpemFibGU6IHRydWUsXG4gIH0sXG4gIHRlbXBlcmF0dXJlOiB7XG4gICAgdmFsdWU6ICdUZW1wZXJhdHVyZScsXG4gICAgcmVzaXphYmxlOiB0cnVlLFxuICB9LFxuICBwYXRoOiB7XG4gICAgdmFsdWU6ICdQYXRoJyxcbiAgICByZXNpemFibGU6IHRydWUsXG4gIH0sXG59O1xuXG50eXBlIFRlbXBlcmF0dXJlVGFibGVQcm9wcyA9IHtcbiAgdGVtcGVyYXR1cmVNYXA6IGFueTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlbXBlcmF0dXJlVGFibGUgZXh0ZW5kcyBDb21wb25lbnQ8VGVtcGVyYXR1cmVUYWJsZVByb3BzPiB7XG4gIGJ1aWxkUm93ID0gKHR6OiBzdHJpbmcsIHRlbXBJbmZvOiBhbnkpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sdW1uczoge1xuICAgICAgICB0aGVybWFsX3pvbmU6IHt2YWx1ZTogPFRleHQ+e3R6fTwvVGV4dD59LFxuICAgICAgICB0ZW1wZXJhdHVyZToge1xuICAgICAgICAgIHZhbHVlOiA8VGV4dD57dGVtcEluZm8udGVtcC50b1N0cmluZygpfTwvVGV4dD4sXG4gICAgICAgIH0sXG4gICAgICAgIHBhdGg6IHtcbiAgICAgICAgICB2YWx1ZTogPFRleHQ+e3RlbXBJbmZvLnBhdGh9PC9UZXh0PixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBrZXk6IHR6LFxuICAgIH07XG4gIH07XG5cbiAgYnVpbGRSb3dzID0gKCkgPT4ge1xuICAgIGNvbnN0IHJvd3MgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHR6IG9mIE9iamVjdC5rZXlzKHRoaXMucHJvcHMudGVtcGVyYXR1cmVNYXApLnNvcnQoKSkge1xuICAgICAgcm93cy5wdXNoKHRoaXMuYnVpbGRSb3codHosIHRoaXMucHJvcHMudGVtcGVyYXR1cmVNYXBbdHpdKSk7XG4gICAgfVxuICAgIHJldHVybiByb3dzO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFNlYXJjaGFibGVUYWJsZVxuICAgICAgICBtdWx0aWxpbmVcbiAgICAgICAgYXV0b0hlaWdodFxuICAgICAgICBmbG9hdGluZz17ZmFsc2V9XG4gICAgICAgIHplYnJhXG4gICAgICAgIGNvbHVtblNpemVzPXtDb2x1bW5TaXplc31cbiAgICAgICAgY29sdW1ucz17Q29sdW1uc31cbiAgICAgICAgcm93cz17dGhpcy5idWlsZFJvd3MoKX1cbiAgICAgICAgZ3Jvd1xuICAgICAgLz5cbiAgICApO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQSxtQkFBQUE7QUFBQSxFQUFBO0FBQUE7QUFBQTtBQVNBLDRCQVlPOzs7QUNWUCxxQkFBK0M7QUFDL0MsbUJBQWtCO0FBRWxCLElBQU0sY0FBYztBQUFBLEVBQ2xCLGNBQWM7QUFBQSxFQUNkLGFBQWE7QUFBQSxFQUNiLE1BQU07QUFDUjtBQUVBLElB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QixnQkFBZ0IsS0FBSyxnQkFBZ0I7QUFBQSxJQUN2RCxrQkFBa0IsS0FBSztBQUFBLEVBQ3pCO0FBQ0Y7QUFFQSxTQUFTLGNBQWMsVUFBK0I7QUFDcEQsU0FBTyxTQUFTLElBQUksUUFBUTtBQUM5QjtBQUVBLFNBQVMsWUFBWSxNQUFvQjtBQUN2QyxNQUFJLEtBQUssb0JBQW9CLElBQUk7QUFDL0IsV0FBTztBQUFBLE1BQ0wsaUJBQWlCLDRCQUFNO0FBQUEsTUFDdkIsT0FBTyw0QkFBTTtBQUFBLE1BQ2IsWUFBWTtBQUFBLElBQ2Q7QUFBQSxFQUNGLFdBQ0UsS0FBSyxvQkFBb0IsS0FBSyxvQkFDOUIsS0FBSyxtQkFBbUIsS0FDeEIsS0FBSyxtQkFBbUIsR0FDeEI7QUFDQSxXQUFPO0FBQUEsTUFDTCxpQkFBaUIsNEJBQU07QUFBQSxNQUN2QixPQUFPLDRCQUFNO0FBQUEsTUFDYixZQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0YsV0FDRSxLQUFLLG9CQUFvQixLQUFLLG9CQUM5QixLQUFLLG1CQUFtQixLQUN4QixLQUFLLG1CQUFtQixHQUN4QjtBQUNBLFdBQU87QUFBQSxNQUNMLGlCQUFpQiw0QkFBTTtBQUFBLE1BQ3ZCLE9BQU8sNEJBQU07QUFBQSxNQUNiLFlBQVk7QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUNGO0FBRUEsU0FBUyx1QkFBdUIsTUFBb0I7QUFDbEQsTUFBSSxLQUFLLHdCQUF3QixVQUFVLEdBQUc7QUFDNUMsV0FBTyw4QkFBQUEsUUFBQSxjQUFDLHVCQUFXLE1BQVgsTUFBZ0IsS0FBRztBQUFBLEVBQzdCO0FBQ0EsUUFBTSxPQUFPO0FBQ2IsU0FDRSw4QkFBQUEsUUFBQSxjQUFDLHVCQUFXLE1BQVgsTUFDRSxLQUFLLHdCQUF3QixJQUFJLENBQUNDLE9BQU0sUUFBUTtBQUMvQyxVQUFNLE9BQ0pBLFNBQVEsS0FBSyxvQkFDYkEsU0FBUSxLQUFLLG9CQUNiQSxTQUFRLEtBQUs7QUFDZixXQUNFLDhCQUFBRCxRQUFBLGNBQUMsdUJBQVcsTUFBWCxFQUFnQixLQUFLLEtBQUssUUFBUSxRQUNoQyxnQkFBZ0JDLEtBQUksR0FDcEJBLFNBQVEsS0FBSyxvQkFDWiw4QkFBQUQsUUFBQSxjQUFDLHVCQUFXLE1BQVgsRUFBZ0IsUUFBUSxRQUN0QixLQUFJLG1CQUVQLEdBRURDLFNBQVEsS0FBSyxvQkFDWiw4QkFBQUQsUUFBQSxjQUFDLHVCQUFXLE1BQVgsRUFBZ0IsUUFBUSxRQUFNLGdCQUFjLEdBRTlDQyxTQUFRLEtBQUssb0JBQ1osOEJBQUFELFFBQUEsY0FBQyx1QkFBVyxNQUFYLEVBQWdCLFFBQVEsUUFBTSxnQkFBYyxHQUUvQyw4QkFBQUEsUUFBQSxjQUFDLFVBQUcsQ0FDTjtBQUFBLEVBRUosQ0FBQyxDQUNIO0FBRUo7IiwKICAibmFtZXMiOiBbIkNvbXBvbmVudCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiQ29tcG9uZW50IiwgIlJlYWN0IiwgImZyZXEiXQp9Cg==
