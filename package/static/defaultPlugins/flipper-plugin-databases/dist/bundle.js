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

// plugins/public/node_modules/dateformat/lib/dateformat.js
var require_dateformat = __commonJS({
  "plugins/public/node_modules/dateformat/lib/dateformat.js"(exports, module2) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    (function(global2) {
      var _arguments = arguments;
      var dateFormat2 = function() {
        var token = /d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;
        var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
        var timezoneClip = /[^-+\dA-Z]/g;
        return function(date, mask, utc, gmt) {
          if (_arguments.length === 1 && kindOf(date) === "string" && !/\d/.test(date)) {
            mask = date;
            date = void 0;
          }
          date = date || date === 0 ? date : new Date();
          if (!(date instanceof Date)) {
            date = new Date(date);
          }
          if (isNaN(date)) {
            throw TypeError("Invalid date");
          }
          mask = String(dateFormat2.masks[mask] || mask || dateFormat2.masks["default"]);
          var maskSlice = mask.slice(0, 4);
          if (maskSlice === "UTC:" || maskSlice === "GMT:") {
            mask = mask.slice(4);
            utc = true;
            if (maskSlice === "GMT:") {
              gmt = true;
            }
          }
          var _ = function _2() {
            return utc ? "getUTC" : "get";
          };
          var _d = function d() {
            return date[_() + "Date"]();
          };
          var D = function D2() {
            return date[_() + "Day"]();
          };
          var _m = function m() {
            return date[_() + "Month"]();
          };
          var y = function y2() {
            return date[_() + "FullYear"]();
          };
          var _H = function H() {
            return date[_() + "Hours"]();
          };
          var _M = function M() {
            return date[_() + "Minutes"]();
          };
          var _s = function s() {
            return date[_() + "Seconds"]();
          };
          var _L = function L() {
            return date[_() + "Milliseconds"]();
          };
          var _o = function o() {
            return utc ? 0 : date.getTimezoneOffset();
          };
          var _W = function W() {
            return getWeek(date);
          };
          var _N = function N() {
            return getDayOfWeek(date);
          };
          var flags = { d: function d() {
            return _d();
          }, dd: function dd() {
            return pad(_d());
          }, ddd: function ddd() {
            return dateFormat2.i18n.dayNames[D()];
          }, DDD: function DDD() {
            return getDayName({ y: y(), m: _m(), d: _d(), _: _(), dayName: dateFormat2.i18n.dayNames[D()], short: true });
          }, dddd: function dddd() {
            return dateFormat2.i18n.dayNames[D() + 7];
          }, DDDD: function DDDD() {
            return getDayName({ y: y(), m: _m(), d: _d(), _: _(), dayName: dateFormat2.i18n.dayNames[D() + 7] });
          }, m: function m() {
            return _m() + 1;
          }, mm: function mm() {
            return pad(_m() + 1);
          }, mmm: function mmm() {
            return dateFormat2.i18n.monthNames[_m()];
          }, mmmm: function mmmm() {
            return dateFormat2.i18n.monthNames[_m() + 12];
          }, yy: function yy() {
            return String(y()).slice(2);
          }, yyyy: function yyyy() {
            return pad(y(), 4);
          }, h: function h() {
            return _H() % 12 || 12;
          }, hh: function hh() {
            return pad(_H() % 12 || 12);
          }, H: function H() {
            return _H();
          }, HH: function HH() {
            return pad(_H());
          }, M: function M() {
            return _M();
          }, MM: function MM() {
            return pad(_M());
          }, s: function s() {
            return _s();
          }, ss: function ss() {
            return pad(_s());
          }, l: function l() {
            return pad(_L(), 3);
          }, L: function L() {
            return pad(Math.floor(_L() / 10));
          }, t: function t() {
            return _H() < 12 ? dateFormat2.i18n.timeNames[0] : dateFormat2.i18n.timeNames[1];
          }, tt: function tt() {
            return _H() < 12 ? dateFormat2.i18n.timeNames[2] : dateFormat2.i18n.timeNames[3];
          }, T: function T() {
            return _H() < 12 ? dateFormat2.i18n.timeNames[4] : dateFormat2.i18n.timeNames[5];
          }, TT: function TT() {
            return _H() < 12 ? dateFormat2.i18n.timeNames[6] : dateFormat2.i18n.timeNames[7];
          }, Z: function Z() {
            return gmt ? "GMT" : utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, "").replace(/GMT\+0000/g, "UTC");
          }, o: function o() {
            return (_o() > 0 ? "-" : "+") + pad(Math.floor(Math.abs(_o()) / 60) * 100 + Math.abs(_o()) % 60, 4);
          }, p: function p() {
            return (_o() > 0 ? "-" : "+") + pad(Math.floor(Math.abs(_o()) / 60), 2) + ":" + pad(Math.floor(Math.abs(_o()) % 60), 2);
          }, S: function S() {
            return ["th", "st", "nd", "rd"][_d() % 10 > 3 ? 0 : (_d() % 100 - _d() % 10 != 10) * _d() % 10];
          }, W: function W() {
            return _W();
          }, WW: function WW() {
            return pad(_W());
          }, N: function N() {
            return _N();
          } };
          return mask.replace(token, function(match) {
            if (match in flags) {
              return flags[match]();
            }
            return match.slice(1, match.length - 1);
          });
        };
      }();
      dateFormat2.masks = { default: "ddd mmm dd yyyy HH:MM:ss", shortDate: "m/d/yy", paddedShortDate: "mm/dd/yyyy", mediumDate: "mmm d, yyyy", longDate: "mmmm d, yyyy", fullDate: "dddd, mmmm d, yyyy", shortTime: "h:MM TT", mediumTime: "h:MM:ss TT", longTime: "h:MM:ss TT Z", isoDate: "yyyy-mm-dd", isoTime: "HH:MM:ss", isoDateTime: "yyyy-mm-dd'T'HH:MM:sso", isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'", expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z" };
      dateFormat2.i18n = { dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"] };
      var pad = function pad2(val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) {
          val = "0" + val;
        }
        return val;
      };
      var getDayName = function getDayName2(_ref) {
        var y = _ref.y, m = _ref.m, d = _ref.d, _ = _ref._, dayName = _ref.dayName, _ref$short = _ref["short"], _short = _ref$short === void 0 ? false : _ref$short;
        var today = new Date();
        var yesterday = new Date();
        yesterday.setDate(yesterday[_ + "Date"]() - 1);
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow[_ + "Date"]() + 1);
        var today_d = function today_d2() {
          return today[_ + "Date"]();
        };
        var today_m = function today_m2() {
          return today[_ + "Month"]();
        };
        var today_y = function today_y2() {
          return today[_ + "FullYear"]();
        };
        var yesterday_d = function yesterday_d2() {
          return yesterday[_ + "Date"]();
        };
        var yesterday_m = function yesterday_m2() {
          return yesterday[_ + "Month"]();
        };
        var yesterday_y = function yesterday_y2() {
          return yesterday[_ + "FullYear"]();
        };
        var tomorrow_d = function tomorrow_d2() {
          return tomorrow[_ + "Date"]();
        };
        var tomorrow_m = function tomorrow_m2() {
          return tomorrow[_ + "Month"]();
        };
        var tomorrow_y = function tomorrow_y2() {
          return tomorrow[_ + "FullYear"]();
        };
        if (today_y() === y && today_m() === m && today_d() === d) {
          return _short ? "Tdy" : "Today";
        } else if (yesterday_y() === y && yesterday_m() === m && yesterday_d() === d) {
          return _short ? "Ysd" : "Yesterday";
        } else if (tomorrow_y() === y && tomorrow_m() === m && tomorrow_d() === d) {
          return _short ? "Tmw" : "Tomorrow";
        }
        return dayName;
      };
      var getWeek = function getWeek2(date) {
        var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        targetThursday.setDate(targetThursday.getDate() - (targetThursday.getDay() + 6) % 7 + 3);
        var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);
        firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
        var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
        targetThursday.setHours(targetThursday.getHours() - ds);
        var weekDiff = (targetThursday - firstThursday) / (864e5 * 7);
        return 1 + Math.floor(weekDiff);
      };
      var getDayOfWeek = function getDayOfWeek2(date) {
        var dow = date.getDay();
        if (dow === 0) {
          dow = 7;
        }
        return dow;
      };
      var kindOf = function kindOf2(val) {
        if (val === null) {
          return "null";
        }
        if (val === void 0) {
          return "undefined";
        }
        if (_typeof(val) !== "object") {
          return _typeof(val);
        }
        if (Array.isArray(val)) {
          return "array";
        }
        return {}.toString.call(val).slice(8, -1).toLowerCase();
      };
      if (typeof define === "function" && define.amd) {
        define(function() {
          return dateFormat2;
        });
      } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
        module2.exports = dateFormat2;
      } else {
        global2.dateFormat = dateFormat2;
      }
    })(void 0);
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_freeGlobal.js"(exports, module2) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module2.exports = freeGlobal;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_root.js
var require_root = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_root.js"(exports, module2) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module2.exports = root;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_Symbol.js"(exports, module2) {
    var root = require_root();
    var Symbol2 = root.Symbol;
    module2.exports = Symbol2;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_arrayMap.js"(exports, module2) {
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    module2.exports = arrayMap;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isArray.js"(exports, module2) {
    var isArray = Array.isArray;
    module2.exports = isArray;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_getRawTag.js"(exports, module2) {
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module2.exports = getRawTag;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_objectToString.js"(exports, module2) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module2.exports = objectToString;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseGetTag.js"(exports, module2) {
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module2.exports = baseGetTag;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isObjectLike.js"(exports, module2) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module2.exports = isObjectLike;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isSymbol.js"(exports, module2) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module2.exports = isSymbol;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseToString.js"(exports, module2) {
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module2.exports = baseToString;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseSlice.js
var require_baseSlice = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseSlice.js"(exports, module2) {
    function baseSlice(array, start, end) {
      var index = -1, length = array.length;
      if (start < 0) {
        start = -start > length ? 0 : length + start;
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : end - start >>> 0;
      start >>>= 0;
      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }
    module2.exports = baseSlice;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_castSlice.js
var require_castSlice = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_castSlice.js"(exports, module2) {
    var baseSlice = require_baseSlice();
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === void 0 ? length : end;
      return !start && end >= length ? array : baseSlice(array, start, end);
    }
    module2.exports = castSlice;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseFindIndex.js
var require_baseFindIndex = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseFindIndex.js"(exports, module2) {
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    module2.exports = baseFindIndex;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIsNaN.js
var require_baseIsNaN = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIsNaN.js"(exports, module2) {
    function baseIsNaN(value) {
      return value !== value;
    }
    module2.exports = baseIsNaN;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_strictIndexOf.js
var require_strictIndexOf = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_strictIndexOf.js"(exports, module2) {
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    module2.exports = strictIndexOf;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIndexOf.js
var require_baseIndexOf = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIndexOf.js"(exports, module2) {
    var baseFindIndex = require_baseFindIndex();
    var baseIsNaN = require_baseIsNaN();
    var strictIndexOf = require_strictIndexOf();
    function baseIndexOf(array, value, fromIndex) {
      return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    }
    module2.exports = baseIndexOf;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_charsEndIndex.js
var require_charsEndIndex = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_charsEndIndex.js"(exports, module2) {
    var baseIndexOf = require_baseIndexOf();
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;
      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    module2.exports = charsEndIndex;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_asciiToArray.js
var require_asciiToArray = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_asciiToArray.js"(exports, module2) {
    function asciiToArray(string) {
      return string.split("");
    }
    module2.exports = asciiToArray;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_hasUnicode.js
var require_hasUnicode = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_hasUnicode.js"(exports, module2) {
    var rsAstralRange = "\\ud800-\\udfff";
    var rsComboMarksRange = "\\u0300-\\u036f";
    var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    var rsComboSymbolsRange = "\\u20d0-\\u20ff";
    var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsZWJ = "\\u200d";
    var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    module2.exports = hasUnicode;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_unicodeToArray.js
var require_unicodeToArray = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_unicodeToArray.js"(exports, module2) {
    var rsAstralRange = "\\ud800-\\udfff";
    var rsComboMarksRange = "\\u0300-\\u036f";
    var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    var rsComboSymbolsRange = "\\u20d0-\\u20ff";
    var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsAstral = "[" + rsAstralRange + "]";
    var rsCombo = "[" + rsComboRange + "]";
    var rsFitz = "\\ud83c[\\udffb-\\udfff]";
    var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
    var rsNonAstral = "[^" + rsAstralRange + "]";
    var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    var rsZWJ = "\\u200d";
    var reOptMod = rsModifier + "?";
    var rsOptVar = "[" + rsVarRange + "]?";
    var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    module2.exports = unicodeToArray;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_stringToArray.js
var require_stringToArray = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_stringToArray.js"(exports, module2) {
    var asciiToArray = require_asciiToArray();
    var hasUnicode = require_hasUnicode();
    var unicodeToArray = require_unicodeToArray();
    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    module2.exports = stringToArray;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/toString.js
var require_toString = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/toString.js"(exports, module2) {
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module2.exports = toString;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/trimEnd.js
var require_trimEnd = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/trimEnd.js"(exports, module2) {
    var baseToString = require_baseToString();
    var castSlice = require_castSlice();
    var charsEndIndex = require_charsEndIndex();
    var stringToArray = require_stringToArray();
    var toString = require_toString();
    var reTrimEnd = /\s+$/;
    function trimEnd(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === void 0)) {
        return string.replace(reTrimEnd, "");
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
      return castSlice(strSymbols, 0, end).join("");
    }
    module2.exports = trimEnd;
  }
});

// plugins/public/node_modules/sql-formatter/lib/core/tokenTypes.js
var require_tokenTypes = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/core/tokenTypes.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = {
      WHITESPACE: "whitespace",
      WORD: "word",
      STRING: "string",
      RESERVED: "reserved",
      RESERVED_TOPLEVEL: "reserved-toplevel",
      RESERVED_NEWLINE: "reserved-newline",
      OPERATOR: "operator",
      OPEN_PAREN: "open-paren",
      CLOSE_PAREN: "close-paren",
      LINE_COMMENT: "line-comment",
      BLOCK_COMMENT: "block-comment",
      NUMBER: "number",
      PLACEHOLDER: "placeholder"
    };
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseRepeat.js
var require_baseRepeat = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseRepeat.js"(exports, module2) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var nativeFloor = Math.floor;
    function baseRepeat(string, n) {
      var result = "";
      if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
        return result;
      }
      do {
        if (n % 2) {
          result += string;
        }
        n = nativeFloor(n / 2);
        if (n) {
          string += string;
        }
      } while (n);
      return result;
    }
    module2.exports = baseRepeat;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/eq.js
var require_eq = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/eq.js"(exports, module2) {
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module2.exports = eq;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isObject.js"(exports, module2) {
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module2.exports = isObject;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isFunction.js"(exports, module2) {
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module2.exports = isFunction;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isLength.js"(exports, module2) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module2.exports = isLength;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isArrayLike.js
var require_isArrayLike = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isArrayLike.js"(exports, module2) {
    var isFunction = require_isFunction();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    module2.exports = isArrayLike;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_isIndex.js"(exports, module2) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module2.exports = isIndex;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_isIterateeCall.js
var require_isIterateeCall = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_isIterateeCall.js"(exports, module2) {
    var eq = require_eq();
    var isArrayLike = require_isArrayLike();
    var isIndex = require_isIndex();
    var isObject = require_isObject();
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
        return eq(object[index], value);
      }
      return false;
    }
    module2.exports = isIterateeCall;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/toNumber.js
var require_toNumber = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/toNumber.js"(exports, module2) {
    var isObject = require_isObject();
    var isSymbol = require_isSymbol();
    var NAN = 0 / 0;
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module2.exports = toNumber;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/toFinite.js
var require_toFinite = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/toFinite.js"(exports, module2) {
    var toNumber = require_toNumber();
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    module2.exports = toFinite;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/toInteger.js
var require_toInteger = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/toInteger.js"(exports, module2) {
    var toFinite = require_toFinite();
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    module2.exports = toInteger;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/repeat.js
var require_repeat = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/repeat.js"(exports, module2) {
    var baseRepeat = require_baseRepeat();
    var isIterateeCall = require_isIterateeCall();
    var toInteger = require_toInteger();
    var toString = require_toString();
    function repeat(string, n, guard) {
      if (guard ? isIterateeCall(string, n, guard) : n === void 0) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      return baseRepeat(toString(string), n);
    }
    module2.exports = repeat;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/last.js
var require_last = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/last.js"(exports, module2) {
    function last(array) {
      var length = array == null ? 0 : array.length;
      return length ? array[length - 1] : void 0;
    }
    module2.exports = last;
  }
});

// plugins/public/node_modules/sql-formatter/lib/core/Indentation.js
var require_Indentation = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/core/Indentation.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _repeat = require_repeat();
    var _repeat2 = _interopRequireDefault(_repeat);
    var _last = require_last();
    var _last2 = _interopRequireDefault(_last);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var INDENT_TYPE_TOP_LEVEL = "top-level";
    var INDENT_TYPE_BLOCK_LEVEL = "block-level";
    var Indentation = function() {
      function Indentation2(indent) {
        _classCallCheck(this, Indentation2);
        this.indent = indent || "  ";
        this.indentTypes = [];
      }
      Indentation2.prototype.getIndent = function getIndent() {
        return (0, _repeat2["default"])(this.indent, this.indentTypes.length);
      };
      Indentation2.prototype.increaseToplevel = function increaseToplevel() {
        this.indentTypes.push(INDENT_TYPE_TOP_LEVEL);
      };
      Indentation2.prototype.increaseBlockLevel = function increaseBlockLevel() {
        this.indentTypes.push(INDENT_TYPE_BLOCK_LEVEL);
      };
      Indentation2.prototype.decreaseTopLevel = function decreaseTopLevel() {
        if ((0, _last2["default"])(this.indentTypes) === INDENT_TYPE_TOP_LEVEL) {
          this.indentTypes.pop();
        }
      };
      Indentation2.prototype.decreaseBlockLevel = function decreaseBlockLevel() {
        while (this.indentTypes.length > 0) {
          var type = this.indentTypes.pop();
          if (type !== INDENT_TYPE_TOP_LEVEL) {
            break;
          }
        }
      };
      return Indentation2;
    }();
    exports["default"] = Indentation;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/lib/core/InlineBlock.js
var require_InlineBlock = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/core/InlineBlock.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _tokenTypes = require_tokenTypes();
    var _tokenTypes2 = _interopRequireDefault(_tokenTypes);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var INLINE_MAX_LENGTH = 50;
    var InlineBlock = function() {
      function InlineBlock2() {
        _classCallCheck(this, InlineBlock2);
        this.level = 0;
      }
      InlineBlock2.prototype.beginIfPossible = function beginIfPossible(tokens, index) {
        if (this.level === 0 && this.isInlineBlock(tokens, index)) {
          this.level = 1;
        } else if (this.level > 0) {
          this.level++;
        } else {
          this.level = 0;
        }
      };
      InlineBlock2.prototype.end = function end() {
        this.level--;
      };
      InlineBlock2.prototype.isActive = function isActive() {
        return this.level > 0;
      };
      InlineBlock2.prototype.isInlineBlock = function isInlineBlock(tokens, index) {
        var length = 0;
        var level = 0;
        for (var i = index; i < tokens.length; i++) {
          var token = tokens[i];
          length += token.value.length;
          if (length > INLINE_MAX_LENGTH) {
            return false;
          }
          if (token.type === _tokenTypes2["default"].OPEN_PAREN) {
            level++;
          } else if (token.type === _tokenTypes2["default"].CLOSE_PAREN) {
            level--;
            if (level === 0) {
              return true;
            }
          }
          if (this.isForbiddenToken(token)) {
            return false;
          }
        }
        return false;
      };
      InlineBlock2.prototype.isForbiddenToken = function isForbiddenToken(_ref) {
        var type = _ref.type, value = _ref.value;
        return type === _tokenTypes2["default"].RESERVED_TOPLEVEL || type === _tokenTypes2["default"].RESERVED_NEWLINE || type === _tokenTypes2["default"].COMMENT || type === _tokenTypes2["default"].BLOCK_COMMENT || value === ";";
      };
      return InlineBlock2;
    }();
    exports["default"] = InlineBlock;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/lib/core/Params.js
var require_Params = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/core/Params.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Params = function() {
      function Params2(params) {
        _classCallCheck(this, Params2);
        this.params = params;
        this.index = 0;
      }
      Params2.prototype.get = function get(_ref) {
        var key = _ref.key, value = _ref.value;
        if (!this.params) {
          return value;
        }
        if (key) {
          return this.params[key];
        }
        return this.params[this.index++];
      };
      return Params2;
    }();
    exports["default"] = Params;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/lib/core/Formatter.js
var require_Formatter = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/core/Formatter.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _trimEnd = require_trimEnd();
    var _trimEnd2 = _interopRequireDefault(_trimEnd);
    var _tokenTypes = require_tokenTypes();
    var _tokenTypes2 = _interopRequireDefault(_tokenTypes);
    var _Indentation = require_Indentation();
    var _Indentation2 = _interopRequireDefault(_Indentation);
    var _InlineBlock = require_InlineBlock();
    var _InlineBlock2 = _interopRequireDefault(_InlineBlock);
    var _Params = require_Params();
    var _Params2 = _interopRequireDefault(_Params);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Formatter = function() {
      function Formatter2(cfg, tokenizer) {
        _classCallCheck(this, Formatter2);
        this.cfg = cfg || {};
        this.indentation = new _Indentation2["default"](this.cfg.indent);
        this.inlineBlock = new _InlineBlock2["default"]();
        this.params = new _Params2["default"](this.cfg.params);
        this.tokenizer = tokenizer;
        this.previousReservedWord = {};
        this.tokens = [];
        this.index = 0;
      }
      Formatter2.prototype.format = function format(query) {
        this.tokens = this.tokenizer.tokenize(query);
        var formattedQuery = this.getFormattedQueryFromTokens();
        return formattedQuery.trim();
      };
      Formatter2.prototype.getFormattedQueryFromTokens = function getFormattedQueryFromTokens() {
        var _this = this;
        var formattedQuery = "";
        this.tokens.forEach(function(token, index) {
          _this.index = index;
          if (token.type === _tokenTypes2["default"].WHITESPACE) {
          } else if (token.type === _tokenTypes2["default"].LINE_COMMENT) {
            formattedQuery = _this.formatLineComment(token, formattedQuery);
          } else if (token.type === _tokenTypes2["default"].BLOCK_COMMENT) {
            formattedQuery = _this.formatBlockComment(token, formattedQuery);
          } else if (token.type === _tokenTypes2["default"].RESERVED_TOPLEVEL) {
            formattedQuery = _this.formatToplevelReservedWord(token, formattedQuery);
            _this.previousReservedWord = token;
          } else if (token.type === _tokenTypes2["default"].RESERVED_NEWLINE) {
            formattedQuery = _this.formatNewlineReservedWord(token, formattedQuery);
            _this.previousReservedWord = token;
          } else if (token.type === _tokenTypes2["default"].RESERVED) {
            formattedQuery = _this.formatWithSpaces(token, formattedQuery);
            _this.previousReservedWord = token;
          } else if (token.type === _tokenTypes2["default"].OPEN_PAREN) {
            formattedQuery = _this.formatOpeningParentheses(token, formattedQuery);
          } else if (token.type === _tokenTypes2["default"].CLOSE_PAREN) {
            formattedQuery = _this.formatClosingParentheses(token, formattedQuery);
          } else if (token.type === _tokenTypes2["default"].PLACEHOLDER) {
            formattedQuery = _this.formatPlaceholder(token, formattedQuery);
          } else if (token.value === ",") {
            formattedQuery = _this.formatComma(token, formattedQuery);
          } else if (token.value === ":") {
            formattedQuery = _this.formatWithSpaceAfter(token, formattedQuery);
          } else if (token.value === ".") {
            formattedQuery = _this.formatWithoutSpaces(token, formattedQuery);
          } else if (token.value === ";") {
            formattedQuery = _this.formatQuerySeparator(token, formattedQuery);
          } else {
            formattedQuery = _this.formatWithSpaces(token, formattedQuery);
          }
        });
        return formattedQuery;
      };
      Formatter2.prototype.formatLineComment = function formatLineComment(token, query) {
        return this.addNewline(query + token.value);
      };
      Formatter2.prototype.formatBlockComment = function formatBlockComment(token, query) {
        return this.addNewline(this.addNewline(query) + this.indentComment(token.value));
      };
      Formatter2.prototype.indentComment = function indentComment(comment) {
        return comment.replace(/\n/g, "\n" + this.indentation.getIndent());
      };
      Formatter2.prototype.formatToplevelReservedWord = function formatToplevelReservedWord(token, query) {
        this.indentation.decreaseTopLevel();
        query = this.addNewline(query);
        this.indentation.increaseToplevel();
        query += this.equalizeWhitespace(token.value);
        return this.addNewline(query);
      };
      Formatter2.prototype.formatNewlineReservedWord = function formatNewlineReservedWord(token, query) {
        return this.addNewline(query) + this.equalizeWhitespace(token.value) + " ";
      };
      Formatter2.prototype.equalizeWhitespace = function equalizeWhitespace(string) {
        return string.replace(/\s+/g, " ");
      };
      Formatter2.prototype.formatOpeningParentheses = function formatOpeningParentheses(token, query) {
        var preserveWhitespaceFor = [_tokenTypes2["default"].WHITESPACE, _tokenTypes2["default"].OPEN_PAREN, _tokenTypes2["default"].LINE_COMMENT];
        if (!preserveWhitespaceFor.includes(this.previousToken().type)) {
          query = (0, _trimEnd2["default"])(query);
        }
        query += token.value;
        this.inlineBlock.beginIfPossible(this.tokens, this.index);
        if (!this.inlineBlock.isActive()) {
          this.indentation.increaseBlockLevel();
          query = this.addNewline(query);
        }
        return query;
      };
      Formatter2.prototype.formatClosingParentheses = function formatClosingParentheses(token, query) {
        if (this.inlineBlock.isActive()) {
          this.inlineBlock.end();
          return this.formatWithSpaceAfter(token, query);
        } else {
          this.indentation.decreaseBlockLevel();
          return this.formatWithSpaces(token, this.addNewline(query));
        }
      };
      Formatter2.prototype.formatPlaceholder = function formatPlaceholder(token, query) {
        return query + this.params.get(token) + " ";
      };
      Formatter2.prototype.formatComma = function formatComma(token, query) {
        query = this.trimTrailingWhitespace(query) + token.value + " ";
        if (this.inlineBlock.isActive()) {
          return query;
        } else if (/^LIMIT$/i.test(this.previousReservedWord.value)) {
          return query;
        } else {
          return this.addNewline(query);
        }
      };
      Formatter2.prototype.formatWithSpaceAfter = function formatWithSpaceAfter(token, query) {
        return this.trimTrailingWhitespace(query) + token.value + " ";
      };
      Formatter2.prototype.formatWithoutSpaces = function formatWithoutSpaces(token, query) {
        return this.trimTrailingWhitespace(query) + token.value;
      };
      Formatter2.prototype.formatWithSpaces = function formatWithSpaces(token, query) {
        return query + token.value + " ";
      };
      Formatter2.prototype.formatQuerySeparator = function formatQuerySeparator(token, query) {
        return this.trimTrailingWhitespace(query) + token.value + "\n";
      };
      Formatter2.prototype.addNewline = function addNewline(query) {
        return (0, _trimEnd2["default"])(query) + "\n" + this.indentation.getIndent();
      };
      Formatter2.prototype.trimTrailingWhitespace = function trimTrailingWhitespace(query) {
        if (this.previousNonWhitespaceToken().type === _tokenTypes2["default"].LINE_COMMENT) {
          return (0, _trimEnd2["default"])(query) + "\n";
        } else {
          return (0, _trimEnd2["default"])(query);
        }
      };
      Formatter2.prototype.previousNonWhitespaceToken = function previousNonWhitespaceToken() {
        var n = 1;
        while (this.previousToken(n).type === _tokenTypes2["default"].WHITESPACE) {
          n++;
        }
        return this.previousToken(n);
      };
      Formatter2.prototype.previousToken = function previousToken() {
        var offset = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
        return this.tokens[this.index - offset] || {};
      };
      return Formatter2;
    }();
    exports["default"] = Formatter;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_isPrototype.js
var require_isPrototype = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_isPrototype.js"(exports, module2) {
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    module2.exports = isPrototype;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_overArg.js
var require_overArg = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_overArg.js"(exports, module2) {
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    module2.exports = overArg;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_nativeKeys.js
var require_nativeKeys = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_nativeKeys.js"(exports, module2) {
    var overArg = require_overArg();
    var nativeKeys = overArg(Object.keys, Object);
    module2.exports = nativeKeys;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseKeys.js
var require_baseKeys = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseKeys.js"(exports, module2) {
    var isPrototype = require_isPrototype();
    var nativeKeys = require_nativeKeys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    module2.exports = baseKeys;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_coreJsData.js"(exports, module2) {
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module2.exports = coreJsData;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_isMasked.js"(exports, module2) {
    var coreJsData = require_coreJsData();
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module2.exports = isMasked;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_toSource.js"(exports, module2) {
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    module2.exports = toSource;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIsNative.js"(exports, module2) {
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module2.exports = baseIsNative;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_getValue.js"(exports, module2) {
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module2.exports = getValue;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_getNative.js"(exports, module2) {
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module2.exports = getNative;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_DataView.js
var require_DataView = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_DataView.js"(exports, module2) {
    var getNative = require_getNative();
    var root = require_root();
    var DataView = getNative(root, "DataView");
    module2.exports = DataView;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_Map.js"(exports, module2) {
    var getNative = require_getNative();
    var root = require_root();
    var Map = getNative(root, "Map");
    module2.exports = Map;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_Promise.js
var require_Promise = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_Promise.js"(exports, module2) {
    var getNative = require_getNative();
    var root = require_root();
    var Promise2 = getNative(root, "Promise");
    module2.exports = Promise2;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_Set.js
var require_Set = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_Set.js"(exports, module2) {
    var getNative = require_getNative();
    var root = require_root();
    var Set = getNative(root, "Set");
    module2.exports = Set;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_WeakMap.js
var require_WeakMap = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_WeakMap.js"(exports, module2) {
    var getNative = require_getNative();
    var root = require_root();
    var WeakMap = getNative(root, "WeakMap");
    module2.exports = WeakMap;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_getTag.js
var require_getTag = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_getTag.js"(exports, module2) {
    var DataView = require_DataView();
    var Map = require_Map();
    var Promise2 = require_Promise();
    var Set = require_Set();
    var WeakMap = require_WeakMap();
    var baseGetTag = require_baseGetTag();
    var toSource = require_toSource();
    var mapTag = "[object Map]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var setTag = "[object Set]";
    var weakMapTag = "[object WeakMap]";
    var dataViewTag = "[object DataView]";
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set);
    var weakMapCtorString = toSource(WeakMap);
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    module2.exports = getTag;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIsArguments.js"(exports, module2) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module2.exports = baseIsArguments;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isArguments.js"(exports, module2) {
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module2.exports = isArguments;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/stubFalse.js
var require_stubFalse = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/stubFalse.js"(exports, module2) {
    function stubFalse() {
      return false;
    }
    module2.exports = stubFalse;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isBuffer.js
var require_isBuffer = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isBuffer.js"(exports, module2) {
    var root = require_root();
    var stubFalse = require_stubFalse();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    module2.exports = isBuffer;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIsTypedArray.js
var require_baseIsTypedArray = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIsTypedArray.js"(exports, module2) {
    var baseGetTag = require_baseGetTag();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    module2.exports = baseIsTypedArray;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseUnary.js"(exports, module2) {
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module2.exports = baseUnary;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_nodeUtil.js"(exports, module2) {
    var freeGlobal = require_freeGlobal();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    module2.exports = nodeUtil;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isTypedArray.js
var require_isTypedArray = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isTypedArray.js"(exports, module2) {
    var baseIsTypedArray = require_baseIsTypedArray();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module2.exports = isTypedArray;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isEmpty.js
var require_isEmpty = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isEmpty.js"(exports, module2) {
    var baseKeys = require_baseKeys();
    var getTag = require_getTag();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isArrayLike = require_isArrayLike();
    var isBuffer = require_isBuffer();
    var isPrototype = require_isPrototype();
    var isTypedArray = require_isTypedArray();
    var mapTag = "[object Map]";
    var setTag = "[object Set]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
        return !value.length;
      }
      var tag = getTag(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
      if (isPrototype(value)) {
        return !baseKeys(value).length;
      }
      for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }
    module2.exports = isEmpty;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/escapeRegExp.js
var require_escapeRegExp = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/escapeRegExp.js"(exports, module2) {
    var toString = require_toString();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reHasRegExpChar = RegExp(reRegExpChar.source);
    function escapeRegExp(string) {
      string = toString(string);
      return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
    }
    module2.exports = escapeRegExp;
  }
});

// plugins/public/node_modules/sql-formatter/lib/core/Tokenizer.js
var require_Tokenizer = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/core/Tokenizer.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _isEmpty = require_isEmpty();
    var _isEmpty2 = _interopRequireDefault(_isEmpty);
    var _escapeRegExp = require_escapeRegExp();
    var _escapeRegExp2 = _interopRequireDefault(_escapeRegExp);
    var _tokenTypes = require_tokenTypes();
    var _tokenTypes2 = _interopRequireDefault(_tokenTypes);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Tokenizer = function() {
      function Tokenizer2(cfg) {
        _classCallCheck(this, Tokenizer2);
        this.WHITESPACE_REGEX = /^(\s+)/;
        this.NUMBER_REGEX = /^((-\s*)?[0-9]+(\.[0-9]+)?|0x[0-9a-fA-F]+|0b[01]+)\b/;
        this.OPERATOR_REGEX = /^(!=|<>|==|<=|>=|!<|!>|\|\||::|->>|->|~~\*|~~|!~~\*|!~~|~\*|!~\*|!~|.)/;
        this.BLOCK_COMMENT_REGEX = /^(\/\*[^]*?(?:\*\/|$))/;
        this.LINE_COMMENT_REGEX = this.createLineCommentRegex(cfg.lineCommentTypes);
        this.RESERVED_TOPLEVEL_REGEX = this.createReservedWordRegex(cfg.reservedToplevelWords);
        this.RESERVED_NEWLINE_REGEX = this.createReservedWordRegex(cfg.reservedNewlineWords);
        this.RESERVED_PLAIN_REGEX = this.createReservedWordRegex(cfg.reservedWords);
        this.WORD_REGEX = this.createWordRegex(cfg.specialWordChars);
        this.STRING_REGEX = this.createStringRegex(cfg.stringTypes);
        this.OPEN_PAREN_REGEX = this.createParenRegex(cfg.openParens);
        this.CLOSE_PAREN_REGEX = this.createParenRegex(cfg.closeParens);
        this.INDEXED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(cfg.indexedPlaceholderTypes, "[0-9]*");
        this.IDENT_NAMED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(cfg.namedPlaceholderTypes, "[a-zA-Z0-9._$]+");
        this.STRING_NAMED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(cfg.namedPlaceholderTypes, this.createStringPattern(cfg.stringTypes));
      }
      Tokenizer2.prototype.createLineCommentRegex = function createLineCommentRegex(lineCommentTypes) {
        return new RegExp("^((?:" + lineCommentTypes.map(function(c) {
          return (0, _escapeRegExp2["default"])(c);
        }).join("|") + ").*?(?:\n|$))");
      };
      Tokenizer2.prototype.createReservedWordRegex = function createReservedWordRegex(reservedWords) {
        var reservedWordsPattern = reservedWords.join("|").replace(/ /g, "\\s+");
        return new RegExp("^(" + reservedWordsPattern + ")\\b", "i");
      };
      Tokenizer2.prototype.createWordRegex = function createWordRegex() {
        var specialChars = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        return new RegExp("^([\\w" + specialChars.join("") + "]+)");
      };
      Tokenizer2.prototype.createStringRegex = function createStringRegex(stringTypes) {
        return new RegExp("^(" + this.createStringPattern(stringTypes) + ")");
      };
      Tokenizer2.prototype.createStringPattern = function createStringPattern(stringTypes) {
        var patterns = {
          "``": "((`[^`]*($|`))+)",
          "[]": "((\\[[^\\]]*($|\\]))(\\][^\\]]*($|\\]))*)",
          '""': '(("[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
          "''": "(('[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
          "N''": "((N'[^N'\\\\]*(?:\\\\.[^N'\\\\]*)*('|$))+)"
        };
        return stringTypes.map(function(t) {
          return patterns[t];
        }).join("|");
      };
      Tokenizer2.prototype.createParenRegex = function createParenRegex(parens) {
        var _this = this;
        return new RegExp("^(" + parens.map(function(p) {
          return _this.escapeParen(p);
        }).join("|") + ")", "i");
      };
      Tokenizer2.prototype.escapeParen = function escapeParen(paren) {
        if (paren.length === 1) {
          return (0, _escapeRegExp2["default"])(paren);
        } else {
          return "\\b" + paren + "\\b";
        }
      };
      Tokenizer2.prototype.createPlaceholderRegex = function createPlaceholderRegex(types, pattern) {
        if ((0, _isEmpty2["default"])(types)) {
          return false;
        }
        var typesRegex = types.map(_escapeRegExp2["default"]).join("|");
        return new RegExp("^((?:" + typesRegex + ")(?:" + pattern + "))");
      };
      Tokenizer2.prototype.tokenize = function tokenize(input) {
        var tokens = [];
        var token = void 0;
        while (input.length) {
          token = this.getNextToken(input, token);
          input = input.substring(token.value.length);
          tokens.push(token);
        }
        return tokens;
      };
      Tokenizer2.prototype.getNextToken = function getNextToken(input, previousToken) {
        return this.getWhitespaceToken(input) || this.getCommentToken(input) || this.getStringToken(input) || this.getOpenParenToken(input) || this.getCloseParenToken(input) || this.getPlaceholderToken(input) || this.getNumberToken(input) || this.getReservedWordToken(input, previousToken) || this.getWordToken(input) || this.getOperatorToken(input);
      };
      Tokenizer2.prototype.getWhitespaceToken = function getWhitespaceToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].WHITESPACE,
          regex: this.WHITESPACE_REGEX
        });
      };
      Tokenizer2.prototype.getCommentToken = function getCommentToken(input) {
        return this.getLineCommentToken(input) || this.getBlockCommentToken(input);
      };
      Tokenizer2.prototype.getLineCommentToken = function getLineCommentToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].LINE_COMMENT,
          regex: this.LINE_COMMENT_REGEX
        });
      };
      Tokenizer2.prototype.getBlockCommentToken = function getBlockCommentToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].BLOCK_COMMENT,
          regex: this.BLOCK_COMMENT_REGEX
        });
      };
      Tokenizer2.prototype.getStringToken = function getStringToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].STRING,
          regex: this.STRING_REGEX
        });
      };
      Tokenizer2.prototype.getOpenParenToken = function getOpenParenToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].OPEN_PAREN,
          regex: this.OPEN_PAREN_REGEX
        });
      };
      Tokenizer2.prototype.getCloseParenToken = function getCloseParenToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].CLOSE_PAREN,
          regex: this.CLOSE_PAREN_REGEX
        });
      };
      Tokenizer2.prototype.getPlaceholderToken = function getPlaceholderToken(input) {
        return this.getIdentNamedPlaceholderToken(input) || this.getStringNamedPlaceholderToken(input) || this.getIndexedPlaceholderToken(input);
      };
      Tokenizer2.prototype.getIdentNamedPlaceholderToken = function getIdentNamedPlaceholderToken(input) {
        return this.getPlaceholderTokenWithKey({
          input,
          regex: this.IDENT_NAMED_PLACEHOLDER_REGEX,
          parseKey: function parseKey(v) {
            return v.slice(1);
          }
        });
      };
      Tokenizer2.prototype.getStringNamedPlaceholderToken = function getStringNamedPlaceholderToken(input) {
        var _this2 = this;
        return this.getPlaceholderTokenWithKey({
          input,
          regex: this.STRING_NAMED_PLACEHOLDER_REGEX,
          parseKey: function parseKey(v) {
            return _this2.getEscapedPlaceholderKey({ key: v.slice(2, -1), quoteChar: v.slice(-1) });
          }
        });
      };
      Tokenizer2.prototype.getIndexedPlaceholderToken = function getIndexedPlaceholderToken(input) {
        return this.getPlaceholderTokenWithKey({
          input,
          regex: this.INDEXED_PLACEHOLDER_REGEX,
          parseKey: function parseKey(v) {
            return v.slice(1);
          }
        });
      };
      Tokenizer2.prototype.getPlaceholderTokenWithKey = function getPlaceholderTokenWithKey(_ref) {
        var input = _ref.input, regex = _ref.regex, parseKey = _ref.parseKey;
        var token = this.getTokenOnFirstMatch({ input, regex, type: _tokenTypes2["default"].PLACEHOLDER });
        if (token) {
          token.key = parseKey(token.value);
        }
        return token;
      };
      Tokenizer2.prototype.getEscapedPlaceholderKey = function getEscapedPlaceholderKey(_ref2) {
        var key = _ref2.key, quoteChar = _ref2.quoteChar;
        return key.replace(new RegExp((0, _escapeRegExp2["default"])("\\") + quoteChar, "g"), quoteChar);
      };
      Tokenizer2.prototype.getNumberToken = function getNumberToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].NUMBER,
          regex: this.NUMBER_REGEX
        });
      };
      Tokenizer2.prototype.getOperatorToken = function getOperatorToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].OPERATOR,
          regex: this.OPERATOR_REGEX
        });
      };
      Tokenizer2.prototype.getReservedWordToken = function getReservedWordToken(input, previousToken) {
        if (previousToken && previousToken.value && previousToken.value === ".") {
          return;
        }
        return this.getToplevelReservedToken(input) || this.getNewlineReservedToken(input) || this.getPlainReservedToken(input);
      };
      Tokenizer2.prototype.getToplevelReservedToken = function getToplevelReservedToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].RESERVED_TOPLEVEL,
          regex: this.RESERVED_TOPLEVEL_REGEX
        });
      };
      Tokenizer2.prototype.getNewlineReservedToken = function getNewlineReservedToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].RESERVED_NEWLINE,
          regex: this.RESERVED_NEWLINE_REGEX
        });
      };
      Tokenizer2.prototype.getPlainReservedToken = function getPlainReservedToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].RESERVED,
          regex: this.RESERVED_PLAIN_REGEX
        });
      };
      Tokenizer2.prototype.getWordToken = function getWordToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].WORD,
          regex: this.WORD_REGEX
        });
      };
      Tokenizer2.prototype.getTokenOnFirstMatch = function getTokenOnFirstMatch(_ref3) {
        var input = _ref3.input, type = _ref3.type, regex = _ref3.regex;
        var matches = input.match(regex);
        if (matches) {
          return { type, value: matches[1] };
        }
      };
      return Tokenizer2;
    }();
    exports["default"] = Tokenizer;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/lib/languages/Db2Formatter.js
var require_Db2Formatter = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/languages/Db2Formatter.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _Formatter = require_Formatter();
    var _Formatter2 = _interopRequireDefault(_Formatter);
    var _Tokenizer = require_Tokenizer();
    var _Tokenizer2 = _interopRequireDefault(_Tokenizer);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var reservedWords = ["ABS", "ACTIVATE", "ALIAS", "ALL", "ALLOCATE", "ALLOW", "ALTER", "ANY", "ARE", "ARRAY", "AS", "ASC", "ASENSITIVE", "ASSOCIATE", "ASUTIME", "ASYMMETRIC", "AT", "ATOMIC", "ATTRIBUTES", "AUDIT", "AUTHORIZATION", "AUX", "AUXILIARY", "AVG", "BEFORE", "BEGIN", "BETWEEN", "BIGINT", "BINARY", "BLOB", "BOOLEAN", "BOTH", "BUFFERPOOL", "BY", "CACHE", "CALL", "CALLED", "CAPTURE", "CARDINALITY", "CASCADED", "CASE", "CAST", "CCSID", "CEIL", "CEILING", "CHAR", "CHARACTER", "CHARACTER_LENGTH", "CHAR_LENGTH", "CHECK", "CLOB", "CLONE", "CLOSE", "CLUSTER", "COALESCE", "COLLATE", "COLLECT", "COLLECTION", "COLLID", "COLUMN", "COMMENT", "COMMIT", "CONCAT", "CONDITION", "CONNECT", "CONNECTION", "CONSTRAINT", "CONTAINS", "CONTINUE", "CONVERT", "CORR", "CORRESPONDING", "COUNT", "COUNT_BIG", "COVAR_POP", "COVAR_SAMP", "CREATE", "CROSS", "CUBE", "CUME_DIST", "CURRENT", "CURRENT_DATE", "CURRENT_DEFAULT_TRANSFORM_GROUP", "CURRENT_LC_CTYPE", "CURRENT_PATH", "CURRENT_ROLE", "CURRENT_SCHEMA", "CURRENT_SERVER", "CURRENT_TIME", "CURRENT_TIMESTAMP", "CURRENT_TIMEZONE", "CURRENT_TRANSFORM_GROUP_FOR_TYPE", "CURRENT_USER", "CURSOR", "CYCLE", "DATA", "DATABASE", "DATAPARTITIONNAME", "DATAPARTITIONNUM", "DATE", "DAY", "DAYS", "DB2GENERAL", "DB2GENRL", "DB2SQL", "DBINFO", "DBPARTITIONNAME", "DBPARTITIONNUM", "DEALLOCATE", "DEC", "DECIMAL", "DECLARE", "DEFAULT", "DEFAULTS", "DEFINITION", "DELETE", "DENSERANK", "DENSE_RANK", "DEREF", "DESCRIBE", "DESCRIPTOR", "DETERMINISTIC", "DIAGNOSTICS", "DISABLE", "DISALLOW", "DISCONNECT", "DISTINCT", "DO", "DOCUMENT", "DOUBLE", "DROP", "DSSIZE", "DYNAMIC", "EACH", "EDITPROC", "ELEMENT", "ELSE", "ELSEIF", "ENABLE", "ENCODING", "ENCRYPTION", "END", "END-EXEC", "ENDING", "ERASE", "ESCAPE", "EVERY", "EXCEPTION", "EXCLUDING", "EXCLUSIVE", "EXEC", "EXECUTE", "EXISTS", "EXIT", "EXP", "EXPLAIN", "EXTENDED", "EXTERNAL", "EXTRACT", "FALSE", "FENCED", "FETCH", "FIELDPROC", "FILE", "FILTER", "FINAL", "FIRST", "FLOAT", "FLOOR", "FOR", "FOREIGN", "FREE", "FULL", "FUNCTION", "FUSION", "GENERAL", "GENERATED", "GET", "GLOBAL", "GOTO", "GRANT", "GRAPHIC", "GROUP", "GROUPING", "HANDLER", "HASH", "HASHED_VALUE", "HINT", "HOLD", "HOUR", "HOURS", "IDENTITY", "IF", "IMMEDIATE", "IN", "INCLUDING", "INCLUSIVE", "INCREMENT", "INDEX", "INDICATOR", "INDICATORS", "INF", "INFINITY", "INHERIT", "INNER", "INOUT", "INSENSITIVE", "INSERT", "INT", "INTEGER", "INTEGRITY", "INTERSECTION", "INTERVAL", "INTO", "IS", "ISOBID", "ISOLATION", "ITERATE", "JAR", "JAVA", "KEEP", "KEY", "LABEL", "LANGUAGE", "LARGE", "LATERAL", "LC_CTYPE", "LEADING", "LEAVE", "LEFT", "LIKE", "LINKTYPE", "LN", "LOCAL", "LOCALDATE", "LOCALE", "LOCALTIME", "LOCALTIMESTAMP", "LOCATOR", "LOCATORS", "LOCK", "LOCKMAX", "LOCKSIZE", "LONG", "LOOP", "LOWER", "MAINTAINED", "MATCH", "MATERIALIZED", "MAX", "MAXVALUE", "MEMBER", "MERGE", "METHOD", "MICROSECOND", "MICROSECONDS", "MIN", "MINUTE", "MINUTES", "MINVALUE", "MOD", "MODE", "MODIFIES", "MODULE", "MONTH", "MONTHS", "MULTISET", "NAN", "NATIONAL", "NATURAL", "NCHAR", "NCLOB", "NEW", "NEW_TABLE", "NEXTVAL", "NO", "NOCACHE", "NOCYCLE", "NODENAME", "NODENUMBER", "NOMAXVALUE", "NOMINVALUE", "NONE", "NOORDER", "NORMALIZE", "NORMALIZED", "NOT", "NULL", "NULLIF", "NULLS", "NUMERIC", "NUMPARTS", "OBID", "OCTET_LENGTH", "OF", "OFFSET", "OLD", "OLD_TABLE", "ON", "ONLY", "OPEN", "OPTIMIZATION", "OPTIMIZE", "OPTION", "ORDER", "OUT", "OUTER", "OVER", "OVERLAPS", "OVERLAY", "OVERRIDING", "PACKAGE", "PADDED", "PAGESIZE", "PARAMETER", "PART", "PARTITION", "PARTITIONED", "PARTITIONING", "PARTITIONS", "PASSWORD", "PATH", "PERCENTILE_CONT", "PERCENTILE_DISC", "PERCENT_RANK", "PIECESIZE", "PLAN", "POSITION", "POWER", "PRECISION", "PREPARE", "PREVVAL", "PRIMARY", "PRIQTY", "PRIVILEGES", "PROCEDURE", "PROGRAM", "PSID", "PUBLIC", "QUERY", "QUERYNO", "RANGE", "RANK", "READ", "READS", "REAL", "RECOVERY", "RECURSIVE", "REF", "REFERENCES", "REFERENCING", "REFRESH", "REGR_AVGX", "REGR_AVGY", "REGR_COUNT", "REGR_INTERCEPT", "REGR_R2", "REGR_SLOPE", "REGR_SXX", "REGR_SXY", "REGR_SYY", "RELEASE", "RENAME", "REPEAT", "RESET", "RESIGNAL", "RESTART", "RESTRICT", "RESULT", "RESULT_SET_LOCATOR", "RETURN", "RETURNS", "REVOKE", "RIGHT", "ROLE", "ROLLBACK", "ROLLUP", "ROUND_CEILING", "ROUND_DOWN", "ROUND_FLOOR", "ROUND_HALF_DOWN", "ROUND_HALF_EVEN", "ROUND_HALF_UP", "ROUND_UP", "ROUTINE", "ROW", "ROWNUMBER", "ROWS", "ROWSET", "ROW_NUMBER", "RRN", "RUN", "SAVEPOINT", "SCHEMA", "SCOPE", "SCRATCHPAD", "SCROLL", "SEARCH", "SECOND", "SECONDS", "SECQTY", "SECURITY", "SENSITIVE", "SEQUENCE", "SESSION", "SESSION_USER", "SIGNAL", "SIMILAR", "SIMPLE", "SMALLINT", "SNAN", "SOME", "SOURCE", "SPECIFIC", "SPECIFICTYPE", "SQL", "SQLEXCEPTION", "SQLID", "SQLSTATE", "SQLWARNING", "SQRT", "STACKED", "STANDARD", "START", "STARTING", "STATEMENT", "STATIC", "STATMENT", "STAY", "STDDEV_POP", "STDDEV_SAMP", "STOGROUP", "STORES", "STYLE", "SUBMULTISET", "SUBSTRING", "SUM", "SUMMARY", "SYMMETRIC", "SYNONYM", "SYSFUN", "SYSIBM", "SYSPROC", "SYSTEM", "SYSTEM_USER", "TABLE", "TABLESAMPLE", "TABLESPACE", "THEN", "TIME", "TIMESTAMP", "TIMEZONE_HOUR", "TIMEZONE_MINUTE", "TO", "TRAILING", "TRANSACTION", "TRANSLATE", "TRANSLATION", "TREAT", "TRIGGER", "TRIM", "TRUE", "TRUNCATE", "TYPE", "UESCAPE", "UNDO", "UNIQUE", "UNKNOWN", "UNNEST", "UNTIL", "UPPER", "USAGE", "USER", "USING", "VALIDPROC", "VALUE", "VARCHAR", "VARIABLE", "VARIANT", "VARYING", "VAR_POP", "VAR_SAMP", "VCAT", "VERSION", "VIEW", "VOLATILE", "VOLUMES", "WHEN", "WHENEVER", "WHILE", "WIDTH_BUCKET", "WINDOW", "WITH", "WITHIN", "WITHOUT", "WLM", "WRITE", "XMLELEMENT", "XMLEXISTS", "XMLNAMESPACES", "YEAR", "YEARS"];
    var reservedToplevelWords = ["ADD", "AFTER", "ALTER COLUMN", "ALTER TABLE", "DELETE FROM", "EXCEPT", "FETCH FIRST", "FROM", "GROUP BY", "GO", "HAVING", "INSERT INTO", "INTERSECT", "LIMIT", "ORDER BY", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "UNION ALL", "UPDATE", "VALUES", "WHERE"];
    var reservedNewlineWords = ["AND", "CROSS JOIN", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN"];
    var tokenizer = void 0;
    var Db2Formatter = function() {
      function Db2Formatter2(cfg) {
        _classCallCheck(this, Db2Formatter2);
        this.cfg = cfg;
      }
      Db2Formatter2.prototype.format = function format(query) {
        if (!tokenizer) {
          tokenizer = new _Tokenizer2["default"]({
            reservedWords,
            reservedToplevelWords,
            reservedNewlineWords,
            stringTypes: ['""', "''", "``", "[]"],
            openParens: ["("],
            closeParens: [")"],
            indexedPlaceholderTypes: ["?"],
            namedPlaceholderTypes: [":"],
            lineCommentTypes: ["--"],
            specialWordChars: ["#", "@"]
          });
        }
        return new _Formatter2["default"](this.cfg, tokenizer).format(query);
      };
      return Db2Formatter2;
    }();
    exports["default"] = Db2Formatter;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/lib/languages/N1qlFormatter.js
var require_N1qlFormatter = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/languages/N1qlFormatter.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _Formatter = require_Formatter();
    var _Formatter2 = _interopRequireDefault(_Formatter);
    var _Tokenizer = require_Tokenizer();
    var _Tokenizer2 = _interopRequireDefault(_Tokenizer);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var reservedWords = ["ALL", "ALTER", "ANALYZE", "AND", "ANY", "ARRAY", "AS", "ASC", "BEGIN", "BETWEEN", "BINARY", "BOOLEAN", "BREAK", "BUCKET", "BUILD", "BY", "CALL", "CASE", "CAST", "CLUSTER", "COLLATE", "COLLECTION", "COMMIT", "CONNECT", "CONTINUE", "CORRELATE", "COVER", "CREATE", "DATABASE", "DATASET", "DATASTORE", "DECLARE", "DECREMENT", "DELETE", "DERIVED", "DESC", "DESCRIBE", "DISTINCT", "DO", "DROP", "EACH", "ELEMENT", "ELSE", "END", "EVERY", "EXCEPT", "EXCLUDE", "EXECUTE", "EXISTS", "EXPLAIN", "FALSE", "FETCH", "FIRST", "FLATTEN", "FOR", "FORCE", "FROM", "FUNCTION", "GRANT", "GROUP", "GSI", "HAVING", "IF", "IGNORE", "ILIKE", "IN", "INCLUDE", "INCREMENT", "INDEX", "INFER", "INLINE", "INNER", "INSERT", "INTERSECT", "INTO", "IS", "JOIN", "KEY", "KEYS", "KEYSPACE", "KNOWN", "LAST", "LEFT", "LET", "LETTING", "LIKE", "LIMIT", "LSM", "MAP", "MAPPING", "MATCHED", "MATERIALIZED", "MERGE", "MINUS", "MISSING", "NAMESPACE", "NEST", "NOT", "NULL", "NUMBER", "OBJECT", "OFFSET", "ON", "OPTION", "OR", "ORDER", "OUTER", "OVER", "PARSE", "PARTITION", "PASSWORD", "PATH", "POOL", "PREPARE", "PRIMARY", "PRIVATE", "PRIVILEGE", "PROCEDURE", "PUBLIC", "RAW", "REALM", "REDUCE", "RENAME", "RETURN", "RETURNING", "REVOKE", "RIGHT", "ROLE", "ROLLBACK", "SATISFIES", "SCHEMA", "SELECT", "SELF", "SEMI", "SET", "SHOW", "SOME", "START", "STATISTICS", "STRING", "SYSTEM", "THEN", "TO", "TRANSACTION", "TRIGGER", "TRUE", "TRUNCATE", "UNDER", "UNION", "UNIQUE", "UNKNOWN", "UNNEST", "UNSET", "UPDATE", "UPSERT", "USE", "USER", "USING", "VALIDATE", "VALUE", "VALUED", "VALUES", "VIA", "VIEW", "WHEN", "WHERE", "WHILE", "WITH", "WITHIN", "WORK", "XOR"];
    var reservedToplevelWords = ["DELETE FROM", "EXCEPT ALL", "EXCEPT", "EXPLAIN DELETE FROM", "EXPLAIN UPDATE", "EXPLAIN UPSERT", "FROM", "GROUP BY", "HAVING", "INFER", "INSERT INTO", "INTERSECT ALL", "INTERSECT", "LET", "LIMIT", "MERGE", "NEST", "ORDER BY", "PREPARE", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "UNION ALL", "UNION", "UNNEST", "UPDATE", "UPSERT", "USE KEYS", "VALUES", "WHERE"];
    var reservedNewlineWords = ["AND", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN", "XOR"];
    var tokenizer = void 0;
    var N1qlFormatter = function() {
      function N1qlFormatter2(cfg) {
        _classCallCheck(this, N1qlFormatter2);
        this.cfg = cfg;
      }
      N1qlFormatter2.prototype.format = function format(query) {
        if (!tokenizer) {
          tokenizer = new _Tokenizer2["default"]({
            reservedWords,
            reservedToplevelWords,
            reservedNewlineWords,
            stringTypes: ['""', "''", "``"],
            openParens: ["(", "[", "{"],
            closeParens: [")", "]", "}"],
            namedPlaceholderTypes: ["$"],
            lineCommentTypes: ["#", "--"]
          });
        }
        return new _Formatter2["default"](this.cfg, tokenizer).format(query);
      };
      return N1qlFormatter2;
    }();
    exports["default"] = N1qlFormatter;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/lib/languages/PlSqlFormatter.js
var require_PlSqlFormatter = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/languages/PlSqlFormatter.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _Formatter = require_Formatter();
    var _Formatter2 = _interopRequireDefault(_Formatter);
    var _Tokenizer = require_Tokenizer();
    var _Tokenizer2 = _interopRequireDefault(_Tokenizer);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var reservedWords = ["A", "ACCESSIBLE", "AGENT", "AGGREGATE", "ALL", "ALTER", "ANY", "ARRAY", "AS", "ASC", "AT", "ATTRIBUTE", "AUTHID", "AVG", "BETWEEN", "BFILE_BASE", "BINARY_INTEGER", "BINARY", "BLOB_BASE", "BLOCK", "BODY", "BOOLEAN", "BOTH", "BOUND", "BULK", "BY", "BYTE", "C", "CALL", "CALLING", "CASCADE", "CASE", "CHAR_BASE", "CHAR", "CHARACTER", "CHARSET", "CHARSETFORM", "CHARSETID", "CHECK", "CLOB_BASE", "CLONE", "CLOSE", "CLUSTER", "CLUSTERS", "COALESCE", "COLAUTH", "COLLECT", "COLUMNS", "COMMENT", "COMMIT", "COMMITTED", "COMPILED", "COMPRESS", "CONNECT", "CONSTANT", "CONSTRUCTOR", "CONTEXT", "CONTINUE", "CONVERT", "COUNT", "CRASH", "CREATE", "CREDENTIAL", "CURRENT", "CURRVAL", "CURSOR", "CUSTOMDATUM", "DANGLING", "DATA", "DATE_BASE", "DATE", "DAY", "DECIMAL", "DEFAULT", "DEFINE", "DELETE", "DESC", "DETERMINISTIC", "DIRECTORY", "DISTINCT", "DO", "DOUBLE", "DROP", "DURATION", "ELEMENT", "ELSIF", "EMPTY", "ESCAPE", "EXCEPTIONS", "EXCLUSIVE", "EXECUTE", "EXISTS", "EXIT", "EXTENDS", "EXTERNAL", "EXTRACT", "FALSE", "FETCH", "FINAL", "FIRST", "FIXED", "FLOAT", "FOR", "FORALL", "FORCE", "FROM", "FUNCTION", "GENERAL", "GOTO", "GRANT", "GROUP", "HASH", "HEAP", "HIDDEN", "HOUR", "IDENTIFIED", "IF", "IMMEDIATE", "IN", "INCLUDING", "INDEX", "INDEXES", "INDICATOR", "INDICES", "INFINITE", "INSTANTIABLE", "INT", "INTEGER", "INTERFACE", "INTERVAL", "INTO", "INVALIDATE", "IS", "ISOLATION", "JAVA", "LANGUAGE", "LARGE", "LEADING", "LENGTH", "LEVEL", "LIBRARY", "LIKE", "LIKE2", "LIKE4", "LIKEC", "LIMITED", "LOCAL", "LOCK", "LONG", "MAP", "MAX", "MAXLEN", "MEMBER", "MERGE", "MIN", "MINUS", "MINUTE", "MLSLABEL", "MOD", "MODE", "MONTH", "MULTISET", "NAME", "NAN", "NATIONAL", "NATIVE", "NATURAL", "NATURALN", "NCHAR", "NEW", "NEXTVAL", "NOCOMPRESS", "NOCOPY", "NOT", "NOWAIT", "NULL", "NULLIF", "NUMBER_BASE", "NUMBER", "OBJECT", "OCICOLL", "OCIDATE", "OCIDATETIME", "OCIDURATION", "OCIINTERVAL", "OCILOBLOCATOR", "OCINUMBER", "OCIRAW", "OCIREF", "OCIREFCURSOR", "OCIROWID", "OCISTRING", "OCITYPE", "OF", "OLD", "ON", "ONLY", "OPAQUE", "OPEN", "OPERATOR", "OPTION", "ORACLE", "ORADATA", "ORDER", "ORGANIZATION", "ORLANY", "ORLVARY", "OTHERS", "OUT", "OVERLAPS", "OVERRIDING", "PACKAGE", "PARALLEL_ENABLE", "PARAMETER", "PARAMETERS", "PARENT", "PARTITION", "PASCAL", "PCTFREE", "PIPE", "PIPELINED", "PLS_INTEGER", "PLUGGABLE", "POSITIVE", "POSITIVEN", "PRAGMA", "PRECISION", "PRIOR", "PRIVATE", "PROCEDURE", "PUBLIC", "RAISE", "RANGE", "RAW", "READ", "REAL", "RECORD", "REF", "REFERENCE", "RELEASE", "RELIES_ON", "REM", "REMAINDER", "RENAME", "RESOURCE", "RESULT_CACHE", "RESULT", "RETURN", "RETURNING", "REVERSE", "REVOKE", "ROLLBACK", "ROW", "ROWID", "ROWNUM", "ROWTYPE", "SAMPLE", "SAVE", "SAVEPOINT", "SB1", "SB2", "SB4", "SECOND", "SEGMENT", "SELF", "SEPARATE", "SEQUENCE", "SERIALIZABLE", "SHARE", "SHORT", "SIZE_T", "SIZE", "SMALLINT", "SOME", "SPACE", "SPARSE", "SQL", "SQLCODE", "SQLDATA", "SQLERRM", "SQLNAME", "SQLSTATE", "STANDARD", "START", "STATIC", "STDDEV", "STORED", "STRING", "STRUCT", "STYLE", "SUBMULTISET", "SUBPARTITION", "SUBSTITUTABLE", "SUBTYPE", "SUCCESSFUL", "SUM", "SYNONYM", "SYSDATE", "TABAUTH", "TABLE", "TDO", "THE", "THEN", "TIME", "TIMESTAMP", "TIMEZONE_ABBR", "TIMEZONE_HOUR", "TIMEZONE_MINUTE", "TIMEZONE_REGION", "TO", "TRAILING", "TRANSACTION", "TRANSACTIONAL", "TRIGGER", "TRUE", "TRUSTED", "TYPE", "UB1", "UB2", "UB4", "UID", "UNDER", "UNIQUE", "UNPLUG", "UNSIGNED", "UNTRUSTED", "USE", "USER", "USING", "VALIDATE", "VALIST", "VALUE", "VARCHAR", "VARCHAR2", "VARIABLE", "VARIANCE", "VARRAY", "VARYING", "VIEW", "VIEWS", "VOID", "WHENEVER", "WHILE", "WITH", "WORK", "WRAPPED", "WRITE", "YEAR", "ZONE"];
    var reservedToplevelWords = ["ADD", "ALTER COLUMN", "ALTER TABLE", "BEGIN", "CONNECT BY", "DECLARE", "DELETE FROM", "DELETE", "END", "EXCEPT", "EXCEPTION", "FETCH FIRST", "FROM", "GROUP BY", "HAVING", "INSERT INTO", "INSERT", "INTERSECT", "LIMIT", "LOOP", "MODIFY", "ORDER BY", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "START WITH", "UNION ALL", "UNION", "UPDATE", "VALUES", "WHERE"];
    var reservedNewlineWords = ["AND", "CROSS APPLY", "CROSS JOIN", "ELSE", "END", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER APPLY", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN", "WHEN", "XOR"];
    var tokenizer = void 0;
    var PlSqlFormatter = function() {
      function PlSqlFormatter2(cfg) {
        _classCallCheck(this, PlSqlFormatter2);
        this.cfg = cfg;
      }
      PlSqlFormatter2.prototype.format = function format(query) {
        if (!tokenizer) {
          tokenizer = new _Tokenizer2["default"]({
            reservedWords,
            reservedToplevelWords,
            reservedNewlineWords,
            stringTypes: ['""', "N''", "''", "``"],
            openParens: ["(", "CASE"],
            closeParens: [")", "END"],
            indexedPlaceholderTypes: ["?"],
            namedPlaceholderTypes: [":"],
            lineCommentTypes: ["--"],
            specialWordChars: ["_", "$", "#", ".", "@"]
          });
        }
        return new _Formatter2["default"](this.cfg, tokenizer).format(query);
      };
      return PlSqlFormatter2;
    }();
    exports["default"] = PlSqlFormatter;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/lib/languages/StandardSqlFormatter.js
var require_StandardSqlFormatter = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/languages/StandardSqlFormatter.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _Formatter = require_Formatter();
    var _Formatter2 = _interopRequireDefault(_Formatter);
    var _Tokenizer = require_Tokenizer();
    var _Tokenizer2 = _interopRequireDefault(_Tokenizer);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var reservedWords = ["ACCESSIBLE", "ACTION", "AGAINST", "AGGREGATE", "ALGORITHM", "ALL", "ALTER", "ANALYSE", "ANALYZE", "AS", "ASC", "AUTOCOMMIT", "AUTO_INCREMENT", "BACKUP", "BEGIN", "BETWEEN", "BINLOG", "BOTH", "CASCADE", "CASE", "CHANGE", "CHANGED", "CHARACTER SET", "CHARSET", "CHECK", "CHECKSUM", "COLLATE", "COLLATION", "COLUMN", "COLUMNS", "COMMENT", "COMMIT", "COMMITTED", "COMPRESSED", "CONCURRENT", "CONSTRAINT", "CONTAINS", "CONVERT", "CREATE", "CROSS", "CURRENT_TIMESTAMP", "DATABASE", "DATABASES", "DAY", "DAY_HOUR", "DAY_MINUTE", "DAY_SECOND", "DEFAULT", "DEFINER", "DELAYED", "DELETE", "DESC", "DESCRIBE", "DETERMINISTIC", "DISTINCT", "DISTINCTROW", "DIV", "DO", "DROP", "DUMPFILE", "DUPLICATE", "DYNAMIC", "ELSE", "ENCLOSED", "END", "ENGINE", "ENGINES", "ENGINE_TYPE", "ESCAPE", "ESCAPED", "EVENTS", "EXEC", "EXECUTE", "EXISTS", "EXPLAIN", "EXTENDED", "FAST", "FETCH", "FIELDS", "FILE", "FIRST", "FIXED", "FLUSH", "FOR", "FORCE", "FOREIGN", "FULL", "FULLTEXT", "FUNCTION", "GLOBAL", "GRANT", "GRANTS", "GROUP_CONCAT", "HEAP", "HIGH_PRIORITY", "HOSTS", "HOUR", "HOUR_MINUTE", "HOUR_SECOND", "IDENTIFIED", "IF", "IFNULL", "IGNORE", "IN", "INDEX", "INDEXES", "INFILE", "INSERT", "INSERT_ID", "INSERT_METHOD", "INTERVAL", "INTO", "INVOKER", "IS", "ISOLATION", "KEY", "KEYS", "KILL", "LAST_INSERT_ID", "LEADING", "LEVEL", "LIKE", "LINEAR", "LINES", "LOAD", "LOCAL", "LOCK", "LOCKS", "LOGS", "LOW_PRIORITY", "MARIA", "MASTER", "MASTER_CONNECT_RETRY", "MASTER_HOST", "MASTER_LOG_FILE", "MATCH", "MAX_CONNECTIONS_PER_HOUR", "MAX_QUERIES_PER_HOUR", "MAX_ROWS", "MAX_UPDATES_PER_HOUR", "MAX_USER_CONNECTIONS", "MEDIUM", "MERGE", "MINUTE", "MINUTE_SECOND", "MIN_ROWS", "MODE", "MODIFY", "MONTH", "MRG_MYISAM", "MYISAM", "NAMES", "NATURAL", "NOT", "NOW()", "NULL", "OFFSET", "ON DELETE", "ON UPDATE", "ON", "ONLY", "OPEN", "OPTIMIZE", "OPTION", "OPTIONALLY", "OUTFILE", "PACK_KEYS", "PAGE", "PARTIAL", "PARTITION", "PARTITIONS", "PASSWORD", "PRIMARY", "PRIVILEGES", "PROCEDURE", "PROCESS", "PROCESSLIST", "PURGE", "QUICK", "RAID0", "RAID_CHUNKS", "RAID_CHUNKSIZE", "RAID_TYPE", "RANGE", "READ", "READ_ONLY", "READ_WRITE", "REFERENCES", "REGEXP", "RELOAD", "RENAME", "REPAIR", "REPEATABLE", "REPLACE", "REPLICATION", "RESET", "RESTORE", "RESTRICT", "RETURN", "RETURNS", "REVOKE", "RLIKE", "ROLLBACK", "ROW", "ROWS", "ROW_FORMAT", "SECOND", "SECURITY", "SEPARATOR", "SERIALIZABLE", "SESSION", "SHARE", "SHOW", "SHUTDOWN", "SLAVE", "SONAME", "SOUNDS", "SQL", "SQL_AUTO_IS_NULL", "SQL_BIG_RESULT", "SQL_BIG_SELECTS", "SQL_BIG_TABLES", "SQL_BUFFER_RESULT", "SQL_CACHE", "SQL_CALC_FOUND_ROWS", "SQL_LOG_BIN", "SQL_LOG_OFF", "SQL_LOG_UPDATE", "SQL_LOW_PRIORITY_UPDATES", "SQL_MAX_JOIN_SIZE", "SQL_NO_CACHE", "SQL_QUOTE_SHOW_CREATE", "SQL_SAFE_UPDATES", "SQL_SELECT_LIMIT", "SQL_SLAVE_SKIP_COUNTER", "SQL_SMALL_RESULT", "SQL_WARNINGS", "START", "STARTING", "STATUS", "STOP", "STORAGE", "STRAIGHT_JOIN", "STRING", "STRIPED", "SUPER", "TABLE", "TABLES", "TEMPORARY", "TERMINATED", "THEN", "TO", "TRAILING", "TRANSACTIONAL", "TRUE", "TRUNCATE", "TYPE", "TYPES", "UNCOMMITTED", "UNIQUE", "UNLOCK", "UNSIGNED", "USAGE", "USE", "USING", "VARIABLES", "VIEW", "WHEN", "WITH", "WORK", "WRITE", "YEAR_MONTH"];
    var reservedToplevelWords = ["ADD", "AFTER", "ALTER COLUMN", "ALTER TABLE", "DELETE FROM", "EXCEPT", "FETCH FIRST", "FROM", "GROUP BY", "GO", "HAVING", "INSERT INTO", "INSERT", "INTERSECT", "LIMIT", "MODIFY", "ORDER BY", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "UNION ALL", "UNION", "UPDATE", "VALUES", "WHERE"];
    var reservedNewlineWords = ["AND", "CROSS APPLY", "CROSS JOIN", "ELSE", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER APPLY", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN", "WHEN", "XOR"];
    var tokenizer = void 0;
    var StandardSqlFormatter = function() {
      function StandardSqlFormatter2(cfg) {
        _classCallCheck(this, StandardSqlFormatter2);
        this.cfg = cfg;
      }
      StandardSqlFormatter2.prototype.format = function format(query) {
        if (!tokenizer) {
          tokenizer = new _Tokenizer2["default"]({
            reservedWords,
            reservedToplevelWords,
            reservedNewlineWords,
            stringTypes: ['""', "N''", "''", "``", "[]"],
            openParens: ["(", "CASE"],
            closeParens: [")", "END"],
            indexedPlaceholderTypes: ["?"],
            namedPlaceholderTypes: ["@", ":"],
            lineCommentTypes: ["#", "--"]
          });
        }
        return new _Formatter2["default"](this.cfg, tokenizer).format(query);
      };
      return StandardSqlFormatter2;
    }();
    exports["default"] = StandardSqlFormatter;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/lib/sqlFormatter.js
var require_sqlFormatter = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/sqlFormatter.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _Db2Formatter = require_Db2Formatter();
    var _Db2Formatter2 = _interopRequireDefault(_Db2Formatter);
    var _N1qlFormatter = require_N1qlFormatter();
    var _N1qlFormatter2 = _interopRequireDefault(_N1qlFormatter);
    var _PlSqlFormatter = require_PlSqlFormatter();
    var _PlSqlFormatter2 = _interopRequireDefault(_PlSqlFormatter);
    var _StandardSqlFormatter = require_StandardSqlFormatter();
    var _StandardSqlFormatter2 = _interopRequireDefault(_StandardSqlFormatter);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    exports["default"] = {
      format: function format(query, cfg) {
        cfg = cfg || {};
        switch (cfg.language) {
          case "db2":
            return new _Db2Formatter2["default"](cfg).format(query);
          case "n1ql":
            return new _N1qlFormatter2["default"](cfg).format(query);
          case "pl/sql":
            return new _PlSqlFormatter2["default"](cfg).format(query);
          case "sql":
          case void 0:
            return new _StandardSqlFormatter2["default"](cfg).format(query);
          default:
            throw Error("Unsupported SQL dialect: " + cfg.language);
        }
      }
    };
    module2.exports = exports["default"];
  }
});

// plugins/public/databases/index.tsx
var databases_exports = {};
__export(databases_exports, {
  Component: () => Component,
  plugin: () => plugin
});
module.exports = __toCommonJS(databases_exports);
var import_dateformat = __toESM(require_dateformat());
var import_flipper_plugin5 = require("flipper-plugin");

// plugins/public/databases/DatabasesPlugin.tsx
var import_flipper = require("flipper");

// plugins/public/databases/utils.tsx
function getStringFromErrorLike(e) {
  if (Array.isArray(e)) {
    return e.map(getStringFromErrorLike).join(" ");
  } else if (typeof e == "string") {
    return e;
  } else if (e instanceof Error) {
    return e.message || e.toString();
  } else {
    try {
      return JSON.stringify(e);
    } catch (e2) {
      return `${e2}`;
    }
  }
}

// plugins/public/databases/TypeBasedValueRenderer.tsx
var import_flipper_plugin = require("flipper-plugin");
var import_antd = require("antd");
var import_react = __toESM(require("react"));
var { Text } = import_antd.Typography;
var WrappingText = (0, import_flipper_plugin.styled)(Text)({
  wordWrap: "break-word",
  width: "100%",
  lineHeight: "125%",
  padding: "3px 0"
});
WrappingText.displayName = "TypeBasedValueRenderer:WrappingText";
var NonWrappingText = (0, import_flipper_plugin.styled)(Text)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});
NonWrappingText.displayName = "TypeBasedValueRenderer:NonWrappingText";
var BooleanValue = (0, import_flipper_plugin.styled)(NonWrappingText)((props) => ({
  "&::before": {
    content: '""',
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: props.active ? import_flipper_plugin.theme.successColor : import_flipper_plugin.theme.errorColor,
    marginRight: 5,
    marginTop: 1
  }
}));
BooleanValue.displayName = "TypeBasedValueRenderer:BooleanValue";
function valueToNullableString(val) {
  return val.value?.toString() ?? null;
}
function renderValue(val, wordWrap) {
  const TextComponent = wordWrap ? WrappingText : NonWrappingText;
  switch (val.type) {
    case "boolean":
      return /* @__PURE__ */ import_react.default.createElement(BooleanValue, { active: val.value }, val.value.toString());
    case "blob":
    case "string":
      return /* @__PURE__ */ import_react.default.createElement(TextComponent, null, val.value);
    case "integer":
    case "float":
    case "double":
    case "number":
      return /* @__PURE__ */ import_react.default.createElement(TextComponent, null, val.value);
    case "null":
      return /* @__PURE__ */ import_react.default.createElement(TextComponent, null, "NULL");
    default:
      return /* @__PURE__ */ import_react.default.createElement(TextComponent, null);
  }
}

// plugins/public/databases/DatabasesPlugin.tsx
var import_react5 = __toESM(require("react"));

// plugins/public/databases/ButtonNavigation.tsx
var import_antd2 = require("antd");
var import_react2 = __toESM(require("react"));
var import_icons = require("@ant-design/icons");
var ButtonNavigation_default = import_react2.default.memo(
  (props) => {
    return /* @__PURE__ */ import_react2.default.createElement(import_antd2.Radio.Group, { style: { marginLeft: 5, marginRight: 5 } }, /* @__PURE__ */ import_react2.default.createElement(import_antd2.Radio.Button, { disabled: !props.canGoBack, onClick: props.onBack }, /* @__PURE__ */ import_react2.default.createElement(import_icons.LeftOutlined, { size: 16 })), /* @__PURE__ */ import_react2.default.createElement(import_antd2.Radio.Button, { disabled: !props.canGoForward, onClick: props.onForward }, /* @__PURE__ */ import_react2.default.createElement(import_icons.RightOutlined, { size: 16 })));
  }
);

// plugins/public/databases/DatabaseDetailSidebar.tsx
var import_react3 = __toESM(require("react"));
var import_flipper_plugin2 = require("flipper-plugin");
var import_antd3 = require("antd");
var TableDetailRow = import_flipper_plugin2.styled.div({
  borderBottom: `1px solid ${import_flipper_plugin2.theme.dividerColor}`,
  padding: 8
});
var TableDetailRowTitle = import_flipper_plugin2.styled.div({
  fontWeight: "bold",
  marginBottom: 8
});
var TableDetailRowType = import_flipper_plugin2.styled.span({
  color: import_flipper_plugin2.theme.white,
  marginLeft: 8,
  fontWeight: "normal"
});
var TableDetailRowValue = import_flipper_plugin2.styled.div({});
function sidebarRows(labels, values) {
  return labels.map((label, idx) => buildSidebarRow(label, values[idx]));
}
function buildSidebarRow(key, val) {
  let output = renderValue(val, true);
  if ((val.type === "string" || val.type === "blob") && (val.value[0] === "[" || val.value[0] === "{")) {
    try {
      var parsed = JSON.parse(val.value);
    } catch (_error) {
    }
    if (parsed) {
      output = /* @__PURE__ */ import_react3.default.createElement(import_flipper_plugin2.DataInspector, { data: parsed, expandRoot: true, collapsed: true });
    }
  }
  return {
    col: key,
    type: val.type,
    value: output
  };
}
function sidebarEditableRows(labels, values, rowDispatch) {
  return labels.map(
    (label, idx) => buildSidebarEditableRow(
      label,
      values[idx],
      (value) => rowDispatch({ type: "set", key: label, value })
    )
  );
}
function buildSidebarEditableRow(key, val, onUpdateValue) {
  if (val.type === "blob" || !val.type) {
    return buildSidebarRow(key, val);
  }
  return {
    col: key,
    type: val.type,
    value: /* @__PURE__ */ import_react3.default.createElement(
      EditField,
      {
        key,
        initialValue: valueToNullableString(val),
        onUpdateValue
      }
    )
  };
}
var EditField = import_react3.default.memo(
  (props) => {
    const { initialValue, onUpdateValue } = props;
    const [value, setValue] = (0, import_react3.useState)(initialValue);
    (0, import_react3.useEffect)(() => setValue(initialValue), [initialValue]);
    return /* @__PURE__ */ import_react3.default.createElement(
      import_antd3.Input,
      {
        value: value || "",
        onChange: (e) => {
          setValue(e.target.value);
          onUpdateValue(e.target.value);
        },
        placeholder: value === null ? "NULL" : void 0,
        "data-testid": "update-query-input",
        style: { width: "100%" }
      }
    );
  }
);
var rowStateReducer = (0, import_flipper_plugin2.produce)((draftState, action) => {
  switch (action.type) {
    case "set":
      draftState.changes[action.key] = action.value;
      draftState.updated = true;
      return;
    case "reset":
      draftState.changes = {};
      draftState.updated = false;
      return;
  }
});
var DatabaseDetailSidebar_default = import_react3.default.memo(function DatabaseDetailSidebar(props) {
  const [editing, setEditing] = (0, import_react3.useState)(false);
  const [rowState, rowDispatch] = (0, import_react3.useReducer)(rowStateReducer, {
    changes: {},
    updated: false
  });
  const { columnLabels, columnValues, onSave } = props;
  (0, import_react3.useEffect)(() => rowDispatch({ type: "reset" }), [columnLabels, columnValues]);
  const rows = (0, import_react3.useMemo)(
    () => editing ? sidebarEditableRows(columnLabels, columnValues, rowDispatch) : sidebarRows(columnLabels, columnValues),
    [columnLabels, columnValues, editing]
  );
  return /* @__PURE__ */ import_react3.default.createElement(import_flipper_plugin2.DetailSidebar, null, /* @__PURE__ */ import_react3.default.createElement(import_flipper_plugin2.Panel, { title: "Row details", collapsible: true }, onSave ? /* @__PURE__ */ import_react3.default.createElement(import_flipper_plugin2.Layout.Right, { center: true }, /* @__PURE__ */ import_react3.default.createElement("div", null), editing ? /* @__PURE__ */ import_react3.default.createElement(import_flipper_plugin2.Layout.Horizontal, { pad: true, gap: true }, /* @__PURE__ */ import_react3.default.createElement(import_antd3.Button, { onClick: () => setEditing(false) }, "Close"), /* @__PURE__ */ import_react3.default.createElement(
    import_antd3.Button,
    {
      disabled: !rowState.updated,
      type: "primary",
      onClick: () => {
        onSave(rowState.changes);
        setEditing(false);
      }
    },
    "Save"
  )) : /* @__PURE__ */ import_react3.default.createElement(import_flipper_plugin2.Layout.Horizontal, { pad: true }, /* @__PURE__ */ import_react3.default.createElement(import_antd3.Button, { onClick: () => setEditing(true) }, "Edit"))) : null, /* @__PURE__ */ import_react3.default.createElement("div", null, rows.map((row) => /* @__PURE__ */ import_react3.default.createElement(TableDetailRow, { key: row.col }, /* @__PURE__ */ import_react3.default.createElement(TableDetailRowTitle, null, row.col, /* @__PURE__ */ import_react3.default.createElement(TableDetailRowType, null, "(", row.type, ")")), /* @__PURE__ */ import_react3.default.createElement(TableDetailRowValue, null, row.value))))));
});

// plugins/public/databases/DatabaseStructure.tsx
var import_flipper_plugin3 = require("flipper-plugin");
var import_react4 = __toESM(require("react"));
function createRows(columns, rows) {
  return rows.map(
    (values) => values.reduce((acc, cur, i) => {
      acc[columns[i]] = cur;
      return acc;
    }, {})
  );
}
function createColumnConfig(columns) {
  const columnObjs = columns.map(
    (c) => ({
      key: c,
      title: c,
      onRender(row) {
        return renderValue(row[c]);
      }
    })
  );
  return columnObjs;
}
var DatabaseStructure_default = import_react4.default.memo((props) => {
  const { structure } = props;
  const { columns, rows, indexesColumns, indexesValues } = structure;
  const rowObjs = (0, import_flipper_plugin3.useMemoize)(
    (columns2, rows2) => createRows(columns2, rows2),
    [columns, rows]
  );
  const columnObjs = (0, import_flipper_plugin3.useMemoize)(
    (columns2) => createColumnConfig(columns2),
    [columns]
  );
  const indexRowObjs = (0, import_flipper_plugin3.useMemoize)(
    (indexesColumns2, indexesValues2) => createRows(indexesColumns2, indexesValues2),
    [indexesColumns, indexesValues]
  );
  const indexColumnObjs = (0, import_flipper_plugin3.useMemoize)(
    (indexesColumns2) => createColumnConfig(indexesColumns2),
    [indexesColumns]
  );
  return /* @__PURE__ */ import_react4.default.createElement(import_flipper_plugin3.Layout.Top, { resizable: true, height: 400 }, /* @__PURE__ */ import_react4.default.createElement(
    import_flipper_plugin3.DataTable,
    {
      records: rowObjs,
      columns: columnObjs,
      enableSearchbar: false
    }
  ), /* @__PURE__ */ import_react4.default.createElement(
    import_flipper_plugin3.DataTable,
    {
      records: indexRowObjs,
      columns: indexColumnObjs,
      enableSearchbar: false
    }
  ));
});

// plugins/public/databases/UpdateQueryUtil.tsx
var INT_DATA_TYPE = ["INTEGER", "LONG", "INT", "BIGINT"];
var FLOAT_DATA_TYPE = ["REAL", "DOUBLE"];
var BLOB_DATA_TYPE = ["BLOB"];
function convertStringToValue(types, key, value) {
  if (types.hasOwnProperty(key)) {
    const { type, nullable } = types[key];
    value = value === null ? "" : value;
    if (value.length <= 0 && nullable) {
      return { type: "null", value: null };
    }
    if (INT_DATA_TYPE.indexOf(type) >= 0) {
      const converted = parseInt(value, 10);
      return { type: "integer", value: isNaN(converted) ? 0 : converted };
    } else if (FLOAT_DATA_TYPE.indexOf(type) >= 0) {
      const converted = parseFloat(value);
      return { type: "float", value: isNaN(converted) ? 0 : converted };
    } else if (BLOB_DATA_TYPE.indexOf(type) >= 0) {
      return { type: "blob", value };
    } else {
      return { type: "string", value };
    }
  }
  if (value === null || value.length <= 0) {
    return { type: "null", value: null };
  } else {
    return { type: "string", value };
  }
}
function constructQueryClause(values, connector) {
  return Object.entries(values).reduce(
    (clauses, [key, val], idx) => {
      const valueString = val.type === "null" ? "NULL" : val.type === "string" || val.type === "blob" ? `'${val.value.replace(/'/g, "''")}'` : `${val.value}`;
      if (idx <= 0) {
        return `\`${key}\`=${valueString}`;
      } else {
        return `${clauses} ${connector} \`${key}\`=${valueString}`;
      }
    },
    ""
  );
}
function constructUpdateQuery(table, where, change) {
  return `UPDATE \`${table}\`
    SET ${constructQueryClause(change, ",")}
    WHERE ${constructQueryClause(where, "AND")}`;
}
function isUpdatable(columnMeta, columnData) {
  const primaryKeyIdx = columnMeta.indexOf("primary_key");
  return primaryKeyIdx >= 0 && columnData.reduce((acc, column) => {
    const primaryValue = column[primaryKeyIdx];
    return acc || primaryValue.type === "boolean" && primaryValue.value;
  }, false);
}

// plugins/public/databases/DatabasesPlugin.tsx
var import_sql_formatter = __toESM(require_sqlFormatter());
var import_flipper_plugin4 = require("flipper-plugin");
var import_antd4 = require("antd");
var import_icons2 = require("@ant-design/icons");
var { TextArea } = import_antd4.Input;
var { Option } = import_antd4.Select;
var { Text: Text2 } = import_antd4.Typography;
var BoldSpan = import_flipper_plugin4.styled.span({
  fontSize: 12,
  color: "#90949c",
  fontWeight: "bold",
  textTransform: "uppercase"
});
var ErrorBar = import_flipper_plugin4.styled.div({
  backgroundColor: import_flipper_plugin4.theme.errorColor,
  color: import_flipper_plugin4.theme.textColorPrimary,
  lineHeight: "26px",
  textAlign: "center"
});
var PageInfoContainer = (0, import_flipper_plugin4.styled)(import_flipper_plugin4.Layout.Horizontal)({ alignItems: "center" });
function transformRow(columns, row, index) {
  const transformedColumns = {};
  for (let i = 0; i < columns.length; i++) {
    transformedColumns[columns[i]] = { value: renderValue(row[i], true) };
  }
  return { key: String(index), columns: transformedColumns };
}
var QueryHistory = import_react5.default.memo(({ history }) => {
  if (!history || typeof history === "undefined") {
    return null;
  }
  const columns = {
    time: {
      value: "Time",
      resizable: true
    },
    query: {
      value: "Query",
      resizable: true
    }
  };
  const rows = [];
  if (history.length > 0) {
    for (let i = 0; i < history.length; i++) {
      const query = history[i];
      const time = query.time;
      const value = query.value;
      rows.push({
        key: `${i}`,
        columns: { time: { value: time }, query: { value } }
      });
    }
  }
  return /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Horizontal, { grow: true }, /* @__PURE__ */ import_react5.default.createElement(
    import_flipper.ManagedTable,
    {
      floating: false,
      columns,
      columnSizes: { time: 75 },
      zebra: true,
      rows,
      horizontallyScrollable: true
    }
  ));
});
var PageInfo = import_react5.default.memo((props) => {
  const [state, setState] = (0, import_react5.useState)({
    isOpen: false,
    inputValue: String(props.currentRow)
  });
  const onOpen = (0, import_react5.useCallback)(() => {
    setState({ ...state, isOpen: true });
  }, [state]);
  const onInputChanged = (0, import_react5.useCallback)(
    (e) => {
      setState({ ...state, inputValue: e.target.value });
    },
    [state]
  );
  const onSubmit = (0, import_react5.useCallback)(
    (e) => {
      if (e.key === "Enter") {
        const rowNumber = parseInt(state.inputValue, 10);
        props.onChange(rowNumber - 1, props.count);
        setState({ ...state, isOpen: false });
      }
    },
    [props, state]
  );
  return /* @__PURE__ */ import_react5.default.createElement(PageInfoContainer, { grow: true }, /* @__PURE__ */ import_react5.default.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ import_react5.default.createElement(Text2, null, props.count === props.totalRows ? `${props.count} ` : `${props.currentRow + 1}-${props.currentRow + props.count} `, "of ", props.totalRows, " rows"), /* @__PURE__ */ import_react5.default.createElement("div", { style: { flex: 1 } }), state.isOpen ? /* @__PURE__ */ import_react5.default.createElement(
    import_antd4.Input,
    {
      tabIndex: -1,
      placeholder: (props.currentRow + 1).toString(),
      onChange: onInputChanged,
      onKeyDown: onSubmit
    }
  ) : /* @__PURE__ */ import_react5.default.createElement(import_antd4.Button, { style: { textAlign: "center" }, onClick: onOpen }, "Go To Row"));
});
var DataTable2 = import_react5.default.memo(
  ({
    page,
    highlightedRowsChanged,
    sortOrderChanged,
    currentSort,
    currentStructure,
    onRowEdited
  }) => page && page.columns ? /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Horizontal, { grow: true }, /* @__PURE__ */ import_react5.default.createElement(
    import_flipper.ManagedTable,
    {
      tableKey: `databases-${page.databaseId}-${page.table}`,
      floating: false,
      columnOrder: page.columns.map((name) => ({
        key: name,
        visible: true
      })),
      columns: page.columns.reduce(
        (acc, val) => Object.assign({}, acc, {
          [val]: { value: val, resizable: true, sortable: true }
        }),
        {}
      ),
      zebra: true,
      rows: page.rows.map(
        (row, index) => transformRow(page.columns, row, index)
      ),
      horizontallyScrollable: true,
      multiHighlight: true,
      onRowHighlighted: highlightedRowsChanged,
      onSort: sortOrderChanged,
      initialSortOrder: currentSort ?? void 0
    }
  ), page.highlightedRows.length === 1 && /* @__PURE__ */ import_react5.default.createElement(
    DatabaseDetailSidebar_default,
    {
      columnLabels: page.columns,
      columnValues: page.rows[page.highlightedRows[0]],
      onSave: currentStructure && isUpdatable(currentStructure.columns, currentStructure.rows) ? onRowEdited : void 0
    }
  )) : null
);
var QueryTable = import_react5.default.memo(
  ({
    query,
    highlightedRowsChanged
  }) => {
    if (!query || query === null) {
      return null;
    }
    if (query.table && typeof query.table !== "undefined" && query.table !== null) {
      const table = query.table;
      const columns = table.columns;
      const rows = table.rows;
      return /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Container, { grow: true }, /* @__PURE__ */ import_react5.default.createElement(
        import_flipper.ManagedTable,
        {
          floating: false,
          multiline: true,
          columnOrder: columns.map((name) => ({
            key: name,
            visible: true
          })),
          columns: columns.reduce(
            (acc, val) => Object.assign({}, acc, { [val]: { value: val, resizable: true } }),
            {}
          ),
          zebra: true,
          rows: rows.map(
            (row, index) => transformRow(columns, row, index)
          ),
          horizontallyScrollable: true,
          onRowHighlighted: highlightedRowsChanged
        }
      ), table.highlightedRows.length === 1 && /* @__PURE__ */ import_react5.default.createElement(
        DatabaseDetailSidebar_default,
        {
          columnLabels: table.columns,
          columnValues: table.rows[table.highlightedRows[0]]
        }
      ));
    } else if (query.id && query.id !== null) {
      return /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Horizontal, { grow: true, pad: true }, /* @__PURE__ */ import_react5.default.createElement(Text2, null, "Row id: ", query.id));
    } else if (query.count && query.count !== null) {
      return /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Horizontal, { grow: true, pad: true }, /* @__PURE__ */ import_react5.default.createElement(Text2, null, "Rows affected: ", query.count));
    } else {
      return null;
    }
  }
);
var FavoritesMenu = import_react5.default.memo(
  ({
    favorites,
    onClick
  }) => {
    const onMenuClick = (0, import_react5.useCallback)(
      (p) => onClick(p.key),
      [onClick]
    );
    return /* @__PURE__ */ import_react5.default.createElement(import_antd4.Menu, null, favorites.map((q) => /* @__PURE__ */ import_react5.default.createElement(import_antd4.Menu.Item, { key: q, onClick: onMenuClick }, q)));
  }
);
function Component() {
  const instance = (0, import_flipper_plugin4.usePlugin)(plugin);
  const state = (0, import_flipper_plugin4.useValue)(instance.state);
  const favorites = (0, import_flipper_plugin4.useValue)(instance.favoritesState);
  const onViewModeChanged = (0, import_react5.useCallback)(
    (evt) => {
      instance.updateViewMode({ viewMode: evt.target.value ?? "data" });
    },
    [instance]
  );
  const onDataClicked = (0, import_react5.useCallback)(() => {
    instance.updateViewMode({ viewMode: "data" });
  }, [instance]);
  const onStructureClicked = (0, import_react5.useCallback)(() => {
    instance.updateViewMode({ viewMode: "structure" });
  }, [instance]);
  const onSQLClicked = (0, import_react5.useCallback)(() => {
    instance.updateViewMode({ viewMode: "SQL" });
  }, [instance]);
  const onTableInfoClicked = (0, import_react5.useCallback)(() => {
    instance.updateViewMode({ viewMode: "tableInfo" });
  }, [instance]);
  const onQueryHistoryClicked = (0, import_react5.useCallback)(() => {
    instance.updateViewMode({ viewMode: "queryHistory" });
  }, [instance]);
  const onRefreshClicked = (0, import_react5.useCallback)(() => {
    instance.state.update((state2) => {
      state2.error = null;
    });
    instance.refresh();
  }, [instance]);
  const onFavoriteButtonClicked = (0, import_react5.useCallback)(() => {
    if (state.query) {
      instance.addOrRemoveQueryToFavorites(state.query.value);
    }
  }, [instance, state.query]);
  const onDatabaseSelected = (0, import_react5.useCallback)(
    (selected) => {
      const dbId = instance.state.get().databases.find((x) => x.name === selected)?.id || 0;
      instance.updateSelectedDatabase({
        database: dbId
      });
    },
    [instance]
  );
  const onDatabaseTableSelected = (0, import_react5.useCallback)(
    (selected) => {
      instance.updateSelectedDatabaseTable({
        table: selected
      });
    },
    [instance]
  );
  const onNextPageClicked = (0, import_react5.useCallback)(() => {
    instance.nextPage();
  }, [instance]);
  const onPreviousPageClicked = (0, import_react5.useCallback)(() => {
    instance.previousPage();
  }, [instance]);
  const onExecuteClicked = (0, import_react5.useCallback)(() => {
    const query = instance.state.get().query;
    if (query) {
      instance.execute({ query: query.value });
    }
  }, [instance]);
  const onQueryTextareaKeyPress = (0, import_react5.useCallback)(
    (event) => {
      if (event.key === "\n" && event.ctrlKey) {
        event.preventDefault();
        event.stopPropagation();
        onExecuteClicked();
      }
    },
    [onExecuteClicked]
  );
  const onGoToRow = (0, import_react5.useCallback)(
    (row, _count) => {
      instance.goToRow({ row });
    },
    [instance]
  );
  const onQueryChanged = (0, import_react5.useCallback)(
    (selected) => {
      instance.updateQuery({
        value: selected.target.value
      });
    },
    [instance]
  );
  const onFavoriteQuerySelected = (0, import_react5.useCallback)(
    (query) => {
      instance.updateQuery({
        value: query
      });
    },
    [instance]
  );
  const pageHighlightedRowsChanged = (0, import_react5.useCallback)(
    (rows) => {
      instance.pageHighlightedRowsChanged(rows);
    },
    [instance]
  );
  const queryHighlightedRowsChanged = (0, import_react5.useCallback)(
    (rows) => {
      instance.queryHighlightedRowsChanged(rows);
    },
    [instance]
  );
  const sortOrderChanged = (0, import_react5.useCallback)(
    (sortOrder) => {
      instance.sortByChanged({ sortOrder });
    },
    [instance]
  );
  const onRowEdited = (0, import_react5.useCallback)(
    (change) => {
      const { selectedDatabaseTable, currentStructure, viewMode, currentPage } = instance.state.get();
      const highlightedRowIdx = currentPage?.highlightedRows[0] ?? -1;
      const row = highlightedRowIdx >= 0 ? currentPage?.rows[currentPage?.highlightedRows[0]] : void 0;
      const columns = currentPage?.columns;
      if (viewMode !== "data" || selectedDatabaseTable === null || currentStructure === null || currentPage === null || row === void 0 || columns === void 0 || Object.keys(change).length <= 0) {
        return;
      }
      const primaryKeyIdx = currentStructure.columns.indexOf("primary_key");
      const nameKeyIdx = currentStructure.columns.indexOf("column_name");
      const typeIdx = currentStructure.columns.indexOf("data_type");
      const nullableIdx = currentStructure.columns.indexOf("nullable");
      if (primaryKeyIdx < 0 && nameKeyIdx < 0 && typeIdx < 0) {
        console.error(
          "primary_key, column_name, and/or data_type cannot be empty"
        );
        return;
      }
      const primaryColumnIndexes = currentStructure.rows.reduce((acc, row2) => {
        const primary = row2[primaryKeyIdx];
        if (primary.type === "boolean" && primary.value) {
          const name = row2[nameKeyIdx];
          return name.type === "string" ? acc.concat(name.value) : acc;
        } else {
          return acc;
        }
      }, []).map((name) => columns.indexOf(name)).filter((idx) => idx >= 0);
      if (primaryColumnIndexes.length <= 0) {
        return;
      }
      const types = currentStructure.rows.reduce(
        (acc, row2) => {
          const nameValue = row2[nameKeyIdx];
          const name = nameValue.type === "string" ? nameValue.value : null;
          const typeValue = row2[typeIdx];
          const type = typeValue.type === "string" ? typeValue.value : null;
          const nullableValue = nullableIdx < 0 ? { type: "null", value: null } : row2[nullableIdx];
          const nullable = nullableValue.value !== false;
          if (name !== null && type !== null) {
            acc[name] = { type, nullable };
          }
          return acc;
        },
        {}
      );
      const changeValue = Object.entries(change).reduce(
        (acc, [key, value]) => {
          acc[key] = convertStringToValue(types, key, value);
          return acc;
        },
        {}
      );
      instance.execute({
        query: constructUpdateQuery(
          selectedDatabaseTable,
          primaryColumnIndexes.reduce(
            (acc, idx) => {
              acc[columns[idx]] = row[idx];
              return acc;
            },
            {}
          ),
          changeValue
        )
      });
      instance.updatePage({
        ...(0, import_flipper_plugin4.produce)(
          currentPage,
          (draft) => Object.entries(changeValue).forEach(
            ([key, value]) => {
              const columnIdx = draft.columns.indexOf(key);
              if (columnIdx >= 0) {
                draft.rows[highlightedRowIdx][columnIdx] = value;
              }
            }
          )
        )
      });
    },
    [instance]
  );
  const databaseOptions = (0, import_flipper_plugin4.useMemoize)(
    (databases) => databases.map((x) => /* @__PURE__ */ import_react5.default.createElement(Option, { key: x.name, value: x.name, label: x.name }, x.name)),
    [state.databases]
  );
  const selectedDatabaseName = (0, import_flipper_plugin4.useMemoize)(
    (selectedDatabase, databases) => selectedDatabase && databases[state.selectedDatabase - 1] ? databases[selectedDatabase - 1].name : void 0,
    [state.selectedDatabase, state.databases]
  );
  const tableOptions = (0, import_flipper_plugin4.useMemoize)(
    (selectedDatabase, databases) => selectedDatabase && databases[state.selectedDatabase - 1] ? databases[selectedDatabase - 1].tables.map((tableName) => /* @__PURE__ */ import_react5.default.createElement(Option, { key: tableName, value: tableName, label: tableName }, tableName)) : [],
    [state.selectedDatabase, state.databases]
  );
  const selectedTableName = (0, import_flipper_plugin4.useMemoize)(
    (selectedDatabase, databases, selectedDatabaseTable) => selectedDatabase && databases[selectedDatabase - 1] ? databases[selectedDatabase - 1].tables.find(
      (t) => t === selectedDatabaseTable
    ) ?? databases[selectedDatabase - 1].tables[0] : void 0,
    [state.selectedDatabase, state.databases, state.selectedDatabaseTable]
  );
  return /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Container, { grow: true }, /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Toolbar, { position: "top" }, /* @__PURE__ */ import_react5.default.createElement(import_antd4.Radio.Group, { value: state.viewMode, onChange: onViewModeChanged }, /* @__PURE__ */ import_react5.default.createElement(import_antd4.Radio.Button, { value: "data", onClick: onDataClicked }, /* @__PURE__ */ import_react5.default.createElement(import_icons2.TableOutlined, { style: { marginRight: 5 } }), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Typography.Text, null, "Data")), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Radio.Button, { onClick: onStructureClicked, value: "structure" }, /* @__PURE__ */ import_react5.default.createElement(import_icons2.SettingOutlined, { style: { marginRight: 5 } }), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Typography.Text, null, "Structure")), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Radio.Button, { onClick: onSQLClicked, value: "SQL" }, /* @__PURE__ */ import_react5.default.createElement(import_icons2.ConsoleSqlOutlined, { style: { marginRight: 5 } }), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Typography.Text, null, "SQL")), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Radio.Button, { onClick: onTableInfoClicked, value: "tableInfo" }, /* @__PURE__ */ import_react5.default.createElement(import_icons2.DatabaseOutlined, { style: { marginRight: 5 } }), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Typography.Text, null, "Table Info")), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Radio.Button, { onClick: onQueryHistoryClicked, value: "queryHistory" }, /* @__PURE__ */ import_react5.default.createElement(import_icons2.HistoryOutlined, { style: { marginRight: 5 } }), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Typography.Text, null, "Query History")))), state.viewMode === "data" || state.viewMode === "structure" || state.viewMode === "tableInfo" ? /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Toolbar, { position: "top" }, /* @__PURE__ */ import_react5.default.createElement(BoldSpan, null, "Database"), /* @__PURE__ */ import_react5.default.createElement(
    import_antd4.Select,
    {
      showSearch: true,
      value: selectedDatabaseName,
      onChange: onDatabaseSelected,
      style: { flex: 1 },
      dropdownMatchSelectWidth: false
    },
    databaseOptions
  ), /* @__PURE__ */ import_react5.default.createElement(BoldSpan, null, "Table"), /* @__PURE__ */ import_react5.default.createElement(
    import_antd4.Select,
    {
      showSearch: true,
      value: selectedTableName,
      onChange: onDatabaseTableSelected,
      style: { flex: 1 },
      dropdownMatchSelectWidth: false
    },
    tableOptions
  ), /* @__PURE__ */ import_react5.default.createElement("div", null), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Button, { onClick: onRefreshClicked, type: "default" }, "Refresh")) : null, state.viewMode === "SQL" ? /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Container, null, /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Toolbar, { position: "top" }, /* @__PURE__ */ import_react5.default.createElement(BoldSpan, null, "Database"), /* @__PURE__ */ import_react5.default.createElement(
    import_antd4.Select,
    {
      showSearch: true,
      value: selectedDatabaseName,
      onChange: onDatabaseSelected,
      dropdownMatchSelectWidth: false
    },
    databaseOptions
  )), /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Horizontal, { pad: import_flipper_plugin4.theme.space.small, style: { paddingBottom: 0 } }, /* @__PURE__ */ import_react5.default.createElement(
    TextArea,
    {
      onChange: onQueryChanged,
      onKeyPress: onQueryTextareaKeyPress,
      placeholder: "Type query here..",
      value: state.query !== null && typeof state.query !== "undefined" ? state.query.value : void 0
    }
  )), /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Toolbar, { position: "top" }, /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Right, null, /* @__PURE__ */ import_react5.default.createElement("div", null), /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Horizontal, { gap: import_flipper_plugin4.theme.space.small }, /* @__PURE__ */ import_react5.default.createElement(
    import_antd4.Button,
    {
      icon: state.query && favorites.includes(state.query.value) ? /* @__PURE__ */ import_react5.default.createElement(import_icons2.StarFilled, null) : /* @__PURE__ */ import_react5.default.createElement(import_icons2.StarOutlined, null),
      onClick: onFavoriteButtonClicked
    }
  ), /* @__PURE__ */ import_react5.default.createElement(
    import_antd4.Dropdown,
    {
      overlay: /* @__PURE__ */ import_react5.default.createElement(
        FavoritesMenu,
        {
          favorites,
          onClick: onFavoriteQuerySelected
        }
      )
    },
    /* @__PURE__ */ import_react5.default.createElement(import_antd4.Button, { onClick: () => {
    } }, "Choose from previous queries ", /* @__PURE__ */ import_react5.default.createElement(import_icons2.DownOutlined, null))
  ), /* @__PURE__ */ import_react5.default.createElement(
    import_antd4.Button,
    {
      type: "primary",
      onClick: onExecuteClicked,
      title: "Execute SQL [Ctrl+Return]"
    },
    "Execute"
  ))))) : null, /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Container, { grow: true }, state.viewMode === "data" ? /* @__PURE__ */ import_react5.default.createElement(
    DataTable2,
    {
      page: state.currentPage,
      highlightedRowsChanged: pageHighlightedRowsChanged,
      onRowEdited,
      sortOrderChanged,
      currentSort: state.currentSort,
      currentStructure: state.currentStructure
    }
  ) : null, state.viewMode === "structure" && state.currentStructure ? /* @__PURE__ */ import_react5.default.createElement(DatabaseStructure_default, { structure: state.currentStructure }) : null, state.viewMode === "SQL" ? /* @__PURE__ */ import_react5.default.createElement(
    QueryTable,
    {
      query: state.queryResult,
      highlightedRowsChanged: queryHighlightedRowsChanged
    }
  ) : null, state.viewMode === "tableInfo" ? /* @__PURE__ */ import_react5.default.createElement(
    import_flipper_plugin4.Layout.Horizontal,
    {
      grow: true,
      pad: import_flipper_plugin4.theme.space.small,
      style: { paddingBottom: 0 }
    },
    /* @__PURE__ */ import_react5.default.createElement(TextArea, { value: import_sql_formatter.default.format(state.tableInfo), readOnly: true })
  ) : null, state.viewMode === "queryHistory" ? /* @__PURE__ */ import_react5.default.createElement(QueryHistory, { history: state.queryHistory }) : null), /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Toolbar, { position: "bottom", style: { paddingLeft: 8 } }, /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Horizontal, { grow: true }, state.viewMode === "SQL" && state.executionTime !== 0 ? /* @__PURE__ */ import_react5.default.createElement(Text2, null, " ", state.executionTime, " ms ") : null, state.viewMode === "data" && state.currentPage ? /* @__PURE__ */ import_react5.default.createElement(
    PageInfo,
    {
      currentRow: state.currentPage.start,
      count: state.currentPage.count,
      totalRows: state.currentPage.total,
      onChange: onGoToRow
    }
  ) : null, state.viewMode === "data" && state.currentPage ? /* @__PURE__ */ import_react5.default.createElement(
    ButtonNavigation_default,
    {
      canGoBack: state.currentPage.start > 0,
      canGoForward: state.currentPage.start + state.currentPage.count < state.currentPage.total,
      onBack: onPreviousPageClicked,
      onForward: onNextPageClicked
    }
  ) : null)), state.error && /* @__PURE__ */ import_react5.default.createElement(ErrorBar, null, getStringFromErrorLike(state.error)));
}

// plugins/public/databases/index.tsx
var PAGE_SIZE = 50;
var FAVORITES_LOCAL_STORAGE_KEY = "plugin-database-favorites-sql-queries";
function plugin(client) {
  const pluginState = (0, import_flipper_plugin5.createState)({
    selectedDatabase: 0,
    selectedDatabaseTable: null,
    pageRowNumber: 0,
    databases: [],
    outdatedDatabaseList: true,
    viewMode: "data",
    error: null,
    currentPage: null,
    currentStructure: null,
    currentSort: null,
    query: null,
    queryResult: null,
    executionTime: 0,
    tableInfo: "",
    queryHistory: []
  });
  const favoritesState = (0, import_flipper_plugin5.createState)([], { persist: "favorites" });
  favoritesState.subscribe((favorites) => {
    localStorage.setItem(
      FAVORITES_LOCAL_STORAGE_KEY,
      JSON.stringify(favorites)
    );
  });
  const updateDatabases = (event) => {
    const updates = event.databases ?? [];
    const state = pluginState.get();
    const databases = updates.sort((db1, db2) => db1.id - db2.id);
    const selectedDatabase = state.selectedDatabase || (Object.values(databases)[0] ? Object.values(databases)[0].id : 0);
    const selectedTable = state.selectedDatabaseTable && selectedDatabase > 0 && databases.length >= selectedDatabase && databases[selectedDatabase - 1].tables.includes(
      state.selectedDatabaseTable
    ) ? state.selectedDatabaseTable : databases[selectedDatabase - 1].tables[0];
    const sameTableSelected = selectedDatabase === state.selectedDatabase && selectedTable === state.selectedDatabaseTable;
    pluginState.set({
      ...state,
      databases,
      outdatedDatabaseList: false,
      selectedDatabase,
      selectedDatabaseTable: selectedTable,
      pageRowNumber: 0,
      currentPage: sameTableSelected ? state.currentPage : null,
      currentStructure: null,
      currentSort: sameTableSelected ? state.currentSort : null
    });
  };
  const updateSelectedDatabase = (event) => {
    const state = pluginState.get();
    pluginState.set({
      ...state,
      selectedDatabase: event.database,
      selectedDatabaseTable: state.databases[event.database - 1].tables[0] || null,
      pageRowNumber: 0,
      currentPage: null,
      currentStructure: null,
      currentSort: null
    });
  };
  const updateSelectedDatabaseTable = (event) => {
    const state = pluginState.get();
    pluginState.set({
      ...state,
      selectedDatabaseTable: event.table,
      pageRowNumber: 0,
      currentPage: null,
      currentStructure: null,
      currentSort: null
    });
  };
  const updateViewMode = (event) => {
    pluginState.update((state) => {
      state.viewMode = event.viewMode;
      state.error = null;
    });
  };
  const updatePage = (event) => {
    pluginState.update((state) => {
      state.currentPage = event;
    });
  };
  const updateStructure = (event) => {
    pluginState.update((state) => {
      state.currentStructure = {
        databaseId: event.databaseId,
        table: event.table,
        columns: event.columns,
        rows: event.rows,
        indexesColumns: event.indexesColumns,
        indexesValues: event.indexesValues
      };
    });
  };
  const displaySelect = (event) => {
    pluginState.update((state) => {
      state.queryResult = {
        table: {
          columns: event.columns,
          rows: event.values,
          highlightedRows: []
        },
        id: null,
        count: null
      };
    });
  };
  const displayInsert = (event) => {
    const state = pluginState.get();
    pluginState.set({
      ...state,
      queryResult: {
        table: null,
        id: event.id,
        count: null
      }
    });
  };
  const displayUpdateDelete = (event) => {
    pluginState.update((state) => {
      state.queryResult = {
        table: null,
        id: null,
        count: event.count
      };
    });
  };
  const updateTableInfo = (event) => {
    pluginState.update((state) => {
      state.tableInfo = event.tableInfo;
    });
  };
  const nextPage = () => {
    pluginState.update((state) => {
      state.pageRowNumber += PAGE_SIZE;
      state.currentPage = null;
    });
  };
  const previousPage = () => {
    pluginState.update((state) => {
      state.pageRowNumber = Math.max(state.pageRowNumber - PAGE_SIZE, 0);
      state.currentPage = null;
    });
  };
  const execute = (event) => {
    const timeBefore = Date.now();
    const { query } = event;
    client.send("execute", {
      databaseId: pluginState.get().selectedDatabase,
      value: query
    }).then((data) => {
      pluginState.update((state) => {
        state.error = null;
        state.executionTime = Date.now() - timeBefore;
      });
      if (data.type === "select") {
        displaySelect({
          columns: data.columns,
          values: data.values
        });
      } else if (data.type === "insert") {
        displayInsert({
          id: data.insertedId
        });
      } else if (data.type === "update_delete") {
        displayUpdateDelete({
          count: data.affectedCount
        });
      }
    }).catch((e) => {
      pluginState.update((state) => {
        state.error = e;
      });
    });
    let newHistory = pluginState.get().queryHistory;
    const newQuery = pluginState.get().query;
    if (newQuery !== null && typeof newQuery !== "undefined" && newHistory !== null && typeof newHistory !== "undefined") {
      newQuery.time = (0, import_dateformat.default)(new Date(), "hh:MM:ss");
      newHistory = newHistory.concat(newQuery);
    }
    pluginState.update((state) => {
      state.queryHistory = newHistory;
    });
  };
  const goToRow = (event) => {
    const state = pluginState.get();
    if (!state.currentPage) {
      return;
    }
    const destinationRow = event.row < 0 ? 0 : event.row >= state.currentPage.total - PAGE_SIZE ? Math.max(state.currentPage.total - PAGE_SIZE, 0) : event.row;
    pluginState.update((state2) => {
      state2.pageRowNumber = destinationRow;
      state2.currentPage = null;
    });
  };
  const refresh = () => {
    pluginState.update((state) => {
      state.outdatedDatabaseList = true;
      state.currentPage = null;
    });
  };
  const addOrRemoveQueryToFavorites = (query) => {
    favoritesState.update((favorites) => {
      const index = favorites.indexOf(query);
      if (index < 0) {
        favorites.push(query);
      } else {
        favorites.splice(index, 1);
      }
    });
  };
  const sortByChanged = (event) => {
    const state = pluginState.get();
    pluginState.set({
      ...state,
      currentSort: event.sortOrder,
      pageRowNumber: 0,
      currentPage: null
    });
  };
  const updateQuery = (event) => {
    const state = pluginState.get();
    pluginState.set({
      ...state,
      query: {
        value: event.value,
        time: (0, import_dateformat.default)(new Date(), "hh:MM:ss")
      }
    });
  };
  const pageHighlightedRowsChanged = (event) => {
    pluginState.update((draftState) => {
      if (draftState.currentPage !== null) {
        draftState.currentPage.highlightedRows = event.map(parseInt);
      }
    });
  };
  const queryHighlightedRowsChanged = (event) => {
    pluginState.update((state) => {
      if (state.queryResult) {
        if (state.queryResult.table) {
          state.queryResult.table.highlightedRows = event.map(parseInt);
        }
        state.queryResult.id = null;
        state.queryResult.count = null;
      }
    });
  };
  pluginState.subscribe(
    (newState, previousState) => {
      const databaseId = newState.selectedDatabase;
      const table = newState.selectedDatabaseTable;
      if (newState.viewMode === "data" && newState.currentPage === null && databaseId && table) {
        client.send("getTableData", {
          count: PAGE_SIZE,
          databaseId: newState.selectedDatabase,
          order: newState.currentSort?.key,
          reverse: (newState.currentSort?.direction || "up") === "down",
          table,
          start: newState.pageRowNumber
        }).then((data) => {
          updatePage({
            databaseId,
            table,
            columns: data.columns,
            rows: data.values,
            start: data.start,
            count: data.count,
            total: data.total,
            highlightedRows: []
          });
        }).catch((e) => {
          pluginState.update((state) => {
            state.error = e;
          });
        });
      }
      if (newState.currentStructure === null && databaseId && table) {
        client.send("getTableStructure", {
          databaseId,
          table
        }).then((data) => {
          updateStructure({
            databaseId,
            table,
            columns: data.structureColumns,
            rows: data.structureValues,
            indexesColumns: data.indexesColumns,
            indexesValues: data.indexesValues
          });
        }).catch((e) => {
          pluginState.update((state) => {
            state.error = e;
          });
        });
      }
      if (newState.viewMode === "tableInfo" && newState.currentStructure === null && databaseId && table) {
        client.send("getTableInfo", {
          databaseId,
          table
        }).then((data) => {
          updateTableInfo({
            tableInfo: data.definition
          });
        }).catch((e) => {
          pluginState.update((state) => {
            state.error = e;
          });
        });
      }
      if (!previousState.outdatedDatabaseList && newState.outdatedDatabaseList) {
        client.send("databaseList", {}).then((databases) => {
          updateDatabases({
            databases
          });
        }).catch((e) => console.error("databaseList request failed:", e));
      }
    }
  );
  client.onConnect(() => {
    client.send("databaseList", {}).then((databases) => {
      updateDatabases({
        databases
      });
    }).catch((e) => console.error("initial databaseList request failed:", e));
    const loadedFavoritesJson = localStorage.getItem(
      FAVORITES_LOCAL_STORAGE_KEY
    );
    if (loadedFavoritesJson) {
      try {
        favoritesState.set(JSON.parse(loadedFavoritesJson));
      } catch (err) {
        console.error("Failed to load favorite queries from local storage");
      }
    }
  });
  return {
    state: pluginState,
    favoritesState,
    updateDatabases,
    updateSelectedDatabase,
    updateSelectedDatabaseTable,
    updateViewMode,
    updatePage,
    updateStructure,
    displaySelect,
    displayInsert,
    displayUpdateDelete,
    updateTableInfo,
    nextPage,
    previousPage,
    execute,
    goToRow,
    refresh,
    addOrRemoveQueryToFavorites,
    sortByChanged,
    updateQuery,
    pageHighlightedRowsChanged,
    queryHighlightedRowsChanged
  };
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2RhdGVmb3JtYXQvbGliL2RhdGVmb3JtYXQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheU1hcC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0UmF3VGFnLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX29iamVjdFRvU3RyaW5nLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHZXRUYWcuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlVG9TdHJpbmcuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVNsaWNlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Nhc3RTbGljZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRmluZEluZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc05hTi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19zdHJpY3RJbmRleE9mLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJbmRleE9mLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NoYXJzRW5kSW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXNjaWlUb0FycmF5LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc1VuaWNvZGUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fdW5pY29kZVRvQXJyYXkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RyaW5nVG9BcnJheS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL3RvU3RyaW5nLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvdHJpbUVuZC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9saWIvY29yZS90b2tlblR5cGVzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VSZXBlYXQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9lcS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL2lzTGVuZ3RoLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcnJheUxpa2UuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNJbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19pc0l0ZXJhdGVlQ2FsbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL3RvTnVtYmVyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvdG9GaW5pdGUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC90b0ludGVnZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9yZXBlYXQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9sYXN0LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL2xpYi9jb3JlL0luZGVudGF0aW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL2xpYi9jb3JlL0lubGluZUJsb2NrLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL2xpYi9jb3JlL1BhcmFtcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9saWIvY29yZS9Gb3JtYXR0ZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNQcm90b3R5cGUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fb3ZlckFyZy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19uYXRpdmVLZXlzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VLZXlzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvcmVKc0RhdGEuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNNYXNrZWQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fdG9Tb3VyY2UuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzTmF0aXZlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFZhbHVlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldE5hdGl2ZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19EYXRhVmlldy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19NYXAuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fUHJvbWlzZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19TZXQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fV2Vha01hcC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRUYWcuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzQXJndW1lbnRzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcmd1bWVudHMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9zdHViRmFsc2UuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0J1ZmZlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNUeXBlZEFycmF5LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VVbmFyeS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19ub2RlVXRpbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL2lzVHlwZWRBcnJheS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL2lzRW1wdHkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9lc2NhcGVSZWdFeHAuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbGliL2NvcmUvVG9rZW5pemVyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL2xpYi9sYW5ndWFnZXMvRGIyRm9ybWF0dGVyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL2xpYi9sYW5ndWFnZXMvTjFxbEZvcm1hdHRlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9saWIvbGFuZ3VhZ2VzL1BsU3FsRm9ybWF0dGVyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL2xpYi9sYW5ndWFnZXMvU3RhbmRhcmRTcWxGb3JtYXR0ZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbGliL3NxbEZvcm1hdHRlci5qcyIsICIuLi9pbmRleC50c3giLCAiLi4vRGF0YWJhc2VzUGx1Z2luLnRzeCIsICIuLi91dGlscy50c3giLCAiLi4vVHlwZUJhc2VkVmFsdWVSZW5kZXJlci50c3giLCAiLi4vQnV0dG9uTmF2aWdhdGlvbi50c3giLCAiLi4vRGF0YWJhc2VEZXRhaWxTaWRlYmFyLnRzeCIsICIuLi9EYXRhYmFzZVN0cnVjdHVyZS50c3giLCAiLi4vVXBkYXRlUXVlcnlVdGlsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX3R5cGVvZihvYmope1wiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtpZih0eXBlb2YgU3ltYm9sPT09XCJmdW5jdGlvblwiJiZ0eXBlb2YgU3ltYm9sLml0ZXJhdG9yPT09XCJzeW1ib2xcIil7X3R5cGVvZj1mdW5jdGlvbiBfdHlwZW9mKG9iail7cmV0dXJuIHR5cGVvZiBvYmp9fWVsc2V7X3R5cGVvZj1mdW5jdGlvbiBfdHlwZW9mKG9iail7cmV0dXJuIG9iaiYmdHlwZW9mIFN5bWJvbD09PVwiZnVuY3Rpb25cIiYmb2JqLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZvYmohPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIG9ian19cmV0dXJuIF90eXBlb2Yob2JqKX0oZnVuY3Rpb24oZ2xvYmFsKXt2YXIgX2FyZ3VtZW50cz1hcmd1bWVudHM7dmFyIGRhdGVGb3JtYXQ9ZnVuY3Rpb24oKXt2YXIgdG9rZW49L2R7MSw0fXxEezMsNH18bXsxLDR9fHl5KD86eXkpP3woW0hoTXNUdF0pXFwxP3xXezEsMn18W0xsb3BTWk5dfFwiW15cIl0qXCJ8J1teJ10qJy9nO3ZhciB0aW1lem9uZT0vXFxiKD86W1BNQ0VBXVtTRFBdVHwoPzpQYWNpZmljfE1vdW50YWlufENlbnRyYWx8RWFzdGVybnxBdGxhbnRpYykgKD86U3RhbmRhcmR8RGF5bGlnaHR8UHJldmFpbGluZykgVGltZXwoPzpHTVR8VVRDKSg/OlstK11cXGR7NH0pPylcXGIvZzt2YXIgdGltZXpvbmVDbGlwPS9bXi0rXFxkQS1aXS9nO3JldHVybiBmdW5jdGlvbihkYXRlLG1hc2ssdXRjLGdtdCl7aWYoX2FyZ3VtZW50cy5sZW5ndGg9PT0xJiZraW5kT2YoZGF0ZSk9PT1cInN0cmluZ1wiJiYhL1xcZC8udGVzdChkYXRlKSl7bWFzaz1kYXRlO2RhdGU9dW5kZWZpbmVkfWRhdGU9ZGF0ZXx8ZGF0ZT09PTA/ZGF0ZTpuZXcgRGF0ZTtpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSl7ZGF0ZT1uZXcgRGF0ZShkYXRlKX1pZihpc05hTihkYXRlKSl7dGhyb3cgVHlwZUVycm9yKFwiSW52YWxpZCBkYXRlXCIpfW1hc2s9U3RyaW5nKGRhdGVGb3JtYXQubWFza3NbbWFza118fG1hc2t8fGRhdGVGb3JtYXQubWFza3NbXCJkZWZhdWx0XCJdKTt2YXIgbWFza1NsaWNlPW1hc2suc2xpY2UoMCw0KTtpZihtYXNrU2xpY2U9PT1cIlVUQzpcInx8bWFza1NsaWNlPT09XCJHTVQ6XCIpe21hc2s9bWFzay5zbGljZSg0KTt1dGM9dHJ1ZTtpZihtYXNrU2xpY2U9PT1cIkdNVDpcIil7Z210PXRydWV9fXZhciBfPWZ1bmN0aW9uIF8oKXtyZXR1cm4gdXRjP1wiZ2V0VVRDXCI6XCJnZXRcIn07dmFyIF9kPWZ1bmN0aW9uIGQoKXtyZXR1cm4gZGF0ZVtfKCkrXCJEYXRlXCJdKCl9O3ZhciBEPWZ1bmN0aW9uIEQoKXtyZXR1cm4gZGF0ZVtfKCkrXCJEYXlcIl0oKX07dmFyIF9tPWZ1bmN0aW9uIG0oKXtyZXR1cm4gZGF0ZVtfKCkrXCJNb250aFwiXSgpfTt2YXIgeT1mdW5jdGlvbiB5KCl7cmV0dXJuIGRhdGVbXygpK1wiRnVsbFllYXJcIl0oKX07dmFyIF9IPWZ1bmN0aW9uIEgoKXtyZXR1cm4gZGF0ZVtfKCkrXCJIb3Vyc1wiXSgpfTt2YXIgX009ZnVuY3Rpb24gTSgpe3JldHVybiBkYXRlW18oKStcIk1pbnV0ZXNcIl0oKX07dmFyIF9zPWZ1bmN0aW9uIHMoKXtyZXR1cm4gZGF0ZVtfKCkrXCJTZWNvbmRzXCJdKCl9O3ZhciBfTD1mdW5jdGlvbiBMKCl7cmV0dXJuIGRhdGVbXygpK1wiTWlsbGlzZWNvbmRzXCJdKCl9O3ZhciBfbz1mdW5jdGlvbiBvKCl7cmV0dXJuIHV0Yz8wOmRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKX07dmFyIF9XPWZ1bmN0aW9uIFcoKXtyZXR1cm4gZ2V0V2VlayhkYXRlKX07dmFyIF9OPWZ1bmN0aW9uIE4oKXtyZXR1cm4gZ2V0RGF5T2ZXZWVrKGRhdGUpfTt2YXIgZmxhZ3M9e2Q6ZnVuY3Rpb24gZCgpe3JldHVybiBfZCgpfSxkZDpmdW5jdGlvbiBkZCgpe3JldHVybiBwYWQoX2QoKSl9LGRkZDpmdW5jdGlvbiBkZGQoKXtyZXR1cm4gZGF0ZUZvcm1hdC5pMThuLmRheU5hbWVzW0QoKV19LERERDpmdW5jdGlvbiBEREQoKXtyZXR1cm4gZ2V0RGF5TmFtZSh7eTp5KCksbTpfbSgpLGQ6X2QoKSxfOl8oKSxkYXlOYW1lOmRhdGVGb3JtYXQuaTE4bi5kYXlOYW1lc1tEKCldLHNob3J0OnRydWV9KX0sZGRkZDpmdW5jdGlvbiBkZGRkKCl7cmV0dXJuIGRhdGVGb3JtYXQuaTE4bi5kYXlOYW1lc1tEKCkrN119LEREREQ6ZnVuY3Rpb24gRERERCgpe3JldHVybiBnZXREYXlOYW1lKHt5OnkoKSxtOl9tKCksZDpfZCgpLF86XygpLGRheU5hbWU6ZGF0ZUZvcm1hdC5pMThuLmRheU5hbWVzW0QoKSs3XX0pfSxtOmZ1bmN0aW9uIG0oKXtyZXR1cm4gX20oKSsxfSxtbTpmdW5jdGlvbiBtbSgpe3JldHVybiBwYWQoX20oKSsxKX0sbW1tOmZ1bmN0aW9uIG1tbSgpe3JldHVybiBkYXRlRm9ybWF0LmkxOG4ubW9udGhOYW1lc1tfbSgpXX0sbW1tbTpmdW5jdGlvbiBtbW1tKCl7cmV0dXJuIGRhdGVGb3JtYXQuaTE4bi5tb250aE5hbWVzW19tKCkrMTJdfSx5eTpmdW5jdGlvbiB5eSgpe3JldHVybiBTdHJpbmcoeSgpKS5zbGljZSgyKX0seXl5eTpmdW5jdGlvbiB5eXl5KCl7cmV0dXJuIHBhZCh5KCksNCl9LGg6ZnVuY3Rpb24gaCgpe3JldHVybiBfSCgpJTEyfHwxMn0saGg6ZnVuY3Rpb24gaGgoKXtyZXR1cm4gcGFkKF9IKCklMTJ8fDEyKX0sSDpmdW5jdGlvbiBIKCl7cmV0dXJuIF9IKCl9LEhIOmZ1bmN0aW9uIEhIKCl7cmV0dXJuIHBhZChfSCgpKX0sTTpmdW5jdGlvbiBNKCl7cmV0dXJuIF9NKCl9LE1NOmZ1bmN0aW9uIE1NKCl7cmV0dXJuIHBhZChfTSgpKX0sczpmdW5jdGlvbiBzKCl7cmV0dXJuIF9zKCl9LHNzOmZ1bmN0aW9uIHNzKCl7cmV0dXJuIHBhZChfcygpKX0sbDpmdW5jdGlvbiBsKCl7cmV0dXJuIHBhZChfTCgpLDMpfSxMOmZ1bmN0aW9uIEwoKXtyZXR1cm4gcGFkKE1hdGguZmxvb3IoX0woKS8xMCkpfSx0OmZ1bmN0aW9uIHQoKXtyZXR1cm4gX0goKTwxMj9kYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzBdOmRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbMV19LHR0OmZ1bmN0aW9uIHR0KCl7cmV0dXJuIF9IKCk8MTI/ZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1syXTpkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzNdfSxUOmZ1bmN0aW9uIFQoKXtyZXR1cm4gX0goKTwxMj9kYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzRdOmRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbNV19LFRUOmZ1bmN0aW9uIFRUKCl7cmV0dXJuIF9IKCk8MTI/ZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s2XTpkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzddfSxaOmZ1bmN0aW9uIFooKXtyZXR1cm4gZ210P1wiR01UXCI6dXRjP1wiVVRDXCI6KFN0cmluZyhkYXRlKS5tYXRjaCh0aW1lem9uZSl8fFtcIlwiXSkucG9wKCkucmVwbGFjZSh0aW1lem9uZUNsaXAsXCJcIikucmVwbGFjZSgvR01UXFwrMDAwMC9nLFwiVVRDXCIpfSxvOmZ1bmN0aW9uIG8oKXtyZXR1cm4oX28oKT4wP1wiLVwiOlwiK1wiKStwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKS82MCkqMTAwK01hdGguYWJzKF9vKCkpJTYwLDQpfSxwOmZ1bmN0aW9uIHAoKXtyZXR1cm4oX28oKT4wP1wiLVwiOlwiK1wiKStwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKS82MCksMikrXCI6XCIrcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMoX28oKSklNjApLDIpfSxTOmZ1bmN0aW9uIFMoKXtyZXR1cm5bXCJ0aFwiLFwic3RcIixcIm5kXCIsXCJyZFwiXVtfZCgpJTEwPjM/MDooX2QoKSUxMDAtX2QoKSUxMCE9MTApKl9kKCklMTBdfSxXOmZ1bmN0aW9uIFcoKXtyZXR1cm4gX1coKX0sV1c6ZnVuY3Rpb24gV1coKXtyZXR1cm4gcGFkKF9XKCkpfSxOOmZ1bmN0aW9uIE4oKXtyZXR1cm4gX04oKX19O3JldHVybiBtYXNrLnJlcGxhY2UodG9rZW4sZnVuY3Rpb24obWF0Y2gpe2lmKG1hdGNoIGluIGZsYWdzKXtyZXR1cm4gZmxhZ3NbbWF0Y2hdKCl9cmV0dXJuIG1hdGNoLnNsaWNlKDEsbWF0Y2gubGVuZ3RoLTEpfSl9fSgpO2RhdGVGb3JtYXQubWFza3M9e2RlZmF1bHQ6XCJkZGQgbW1tIGRkIHl5eXkgSEg6TU06c3NcIixzaG9ydERhdGU6XCJtL2QveXlcIixwYWRkZWRTaG9ydERhdGU6XCJtbS9kZC95eXl5XCIsbWVkaXVtRGF0ZTpcIm1tbSBkLCB5eXl5XCIsbG9uZ0RhdGU6XCJtbW1tIGQsIHl5eXlcIixmdWxsRGF0ZTpcImRkZGQsIG1tbW0gZCwgeXl5eVwiLHNob3J0VGltZTpcImg6TU0gVFRcIixtZWRpdW1UaW1lOlwiaDpNTTpzcyBUVFwiLGxvbmdUaW1lOlwiaDpNTTpzcyBUVCBaXCIsaXNvRGF0ZTpcInl5eXktbW0tZGRcIixpc29UaW1lOlwiSEg6TU06c3NcIixpc29EYXRlVGltZTpcInl5eXktbW0tZGQnVCdISDpNTTpzc29cIixpc29VdGNEYXRlVGltZTpcIlVUQzp5eXl5LW1tLWRkJ1QnSEg6TU06c3MnWidcIixleHBpcmVzSGVhZGVyRm9ybWF0OlwiZGRkLCBkZCBtbW0geXl5eSBISDpNTTpzcyBaXCJ9O2RhdGVGb3JtYXQuaTE4bj17ZGF5TmFtZXM6W1wiU3VuXCIsXCJNb25cIixcIlR1ZVwiLFwiV2VkXCIsXCJUaHVcIixcIkZyaVwiLFwiU2F0XCIsXCJTdW5kYXlcIixcIk1vbmRheVwiLFwiVHVlc2RheVwiLFwiV2VkbmVzZGF5XCIsXCJUaHVyc2RheVwiLFwiRnJpZGF5XCIsXCJTYXR1cmRheVwiXSxtb250aE5hbWVzOltcIkphblwiLFwiRmViXCIsXCJNYXJcIixcIkFwclwiLFwiTWF5XCIsXCJKdW5cIixcIkp1bFwiLFwiQXVnXCIsXCJTZXBcIixcIk9jdFwiLFwiTm92XCIsXCJEZWNcIixcIkphbnVhcnlcIixcIkZlYnJ1YXJ5XCIsXCJNYXJjaFwiLFwiQXByaWxcIixcIk1heVwiLFwiSnVuZVwiLFwiSnVseVwiLFwiQXVndXN0XCIsXCJTZXB0ZW1iZXJcIixcIk9jdG9iZXJcIixcIk5vdmVtYmVyXCIsXCJEZWNlbWJlclwiXSx0aW1lTmFtZXM6W1wiYVwiLFwicFwiLFwiYW1cIixcInBtXCIsXCJBXCIsXCJQXCIsXCJBTVwiLFwiUE1cIl19O3ZhciBwYWQ9ZnVuY3Rpb24gcGFkKHZhbCxsZW4pe3ZhbD1TdHJpbmcodmFsKTtsZW49bGVufHwyO3doaWxlKHZhbC5sZW5ndGg8bGVuKXt2YWw9XCIwXCIrdmFsfXJldHVybiB2YWx9O3ZhciBnZXREYXlOYW1lPWZ1bmN0aW9uIGdldERheU5hbWUoX3JlZil7dmFyIHk9X3JlZi55LG09X3JlZi5tLGQ9X3JlZi5kLF89X3JlZi5fLGRheU5hbWU9X3JlZi5kYXlOYW1lLF9yZWYkc2hvcnQ9X3JlZltcInNob3J0XCJdLF9zaG9ydD1fcmVmJHNob3J0PT09dm9pZCAwP2ZhbHNlOl9yZWYkc2hvcnQ7dmFyIHRvZGF5PW5ldyBEYXRlO3ZhciB5ZXN0ZXJkYXk9bmV3IERhdGU7eWVzdGVyZGF5LnNldERhdGUoeWVzdGVyZGF5W18rXCJEYXRlXCJdKCktMSk7dmFyIHRvbW9ycm93PW5ldyBEYXRlO3RvbW9ycm93LnNldERhdGUodG9tb3Jyb3dbXytcIkRhdGVcIl0oKSsxKTt2YXIgdG9kYXlfZD1mdW5jdGlvbiB0b2RheV9kKCl7cmV0dXJuIHRvZGF5W18rXCJEYXRlXCJdKCl9O3ZhciB0b2RheV9tPWZ1bmN0aW9uIHRvZGF5X20oKXtyZXR1cm4gdG9kYXlbXytcIk1vbnRoXCJdKCl9O3ZhciB0b2RheV95PWZ1bmN0aW9uIHRvZGF5X3koKXtyZXR1cm4gdG9kYXlbXytcIkZ1bGxZZWFyXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfZD1mdW5jdGlvbiB5ZXN0ZXJkYXlfZCgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIkRhdGVcIl0oKX07dmFyIHllc3RlcmRheV9tPWZ1bmN0aW9uIHllc3RlcmRheV9tKCl7cmV0dXJuIHllc3RlcmRheVtfK1wiTW9udGhcIl0oKX07dmFyIHllc3RlcmRheV95PWZ1bmN0aW9uIHllc3RlcmRheV95KCl7cmV0dXJuIHllc3RlcmRheVtfK1wiRnVsbFllYXJcIl0oKX07dmFyIHRvbW9ycm93X2Q9ZnVuY3Rpb24gdG9tb3Jyb3dfZCgpe3JldHVybiB0b21vcnJvd1tfK1wiRGF0ZVwiXSgpfTt2YXIgdG9tb3Jyb3dfbT1mdW5jdGlvbiB0b21vcnJvd19tKCl7cmV0dXJuIHRvbW9ycm93W18rXCJNb250aFwiXSgpfTt2YXIgdG9tb3Jyb3dfeT1mdW5jdGlvbiB0b21vcnJvd195KCl7cmV0dXJuIHRvbW9ycm93W18rXCJGdWxsWWVhclwiXSgpfTtpZih0b2RheV95KCk9PT15JiZ0b2RheV9tKCk9PT1tJiZ0b2RheV9kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiVGR5XCI6XCJUb2RheVwifWVsc2UgaWYoeWVzdGVyZGF5X3koKT09PXkmJnllc3RlcmRheV9tKCk9PT1tJiZ5ZXN0ZXJkYXlfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIllzZFwiOlwiWWVzdGVyZGF5XCJ9ZWxzZSBpZih0b21vcnJvd195KCk9PT15JiZ0b21vcnJvd19tKCk9PT1tJiZ0b21vcnJvd19kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiVG13XCI6XCJUb21vcnJvd1wifXJldHVybiBkYXlOYW1lfTt2YXIgZ2V0V2Vlaz1mdW5jdGlvbiBnZXRXZWVrKGRhdGUpe3ZhciB0YXJnZXRUaHVyc2RheT1uZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksZGF0ZS5nZXRNb250aCgpLGRhdGUuZ2V0RGF0ZSgpKTt0YXJnZXRUaHVyc2RheS5zZXREYXRlKHRhcmdldFRodXJzZGF5LmdldERhdGUoKS0odGFyZ2V0VGh1cnNkYXkuZ2V0RGF5KCkrNiklNyszKTt2YXIgZmlyc3RUaHVyc2RheT1uZXcgRGF0ZSh0YXJnZXRUaHVyc2RheS5nZXRGdWxsWWVhcigpLDAsNCk7Zmlyc3RUaHVyc2RheS5zZXREYXRlKGZpcnN0VGh1cnNkYXkuZ2V0RGF0ZSgpLShmaXJzdFRodXJzZGF5LmdldERheSgpKzYpJTcrMyk7dmFyIGRzPXRhcmdldFRodXJzZGF5LmdldFRpbWV6b25lT2Zmc2V0KCktZmlyc3RUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpO3RhcmdldFRodXJzZGF5LnNldEhvdXJzKHRhcmdldFRodXJzZGF5LmdldEhvdXJzKCktZHMpO3ZhciB3ZWVrRGlmZj0odGFyZ2V0VGh1cnNkYXktZmlyc3RUaHVyc2RheSkvKDg2NGU1KjcpO3JldHVybiAxK01hdGguZmxvb3Iod2Vla0RpZmYpfTt2YXIgZ2V0RGF5T2ZXZWVrPWZ1bmN0aW9uIGdldERheU9mV2VlayhkYXRlKXt2YXIgZG93PWRhdGUuZ2V0RGF5KCk7aWYoZG93PT09MCl7ZG93PTd9cmV0dXJuIGRvd307dmFyIGtpbmRPZj1mdW5jdGlvbiBraW5kT2YodmFsKXtpZih2YWw9PT1udWxsKXtyZXR1cm5cIm51bGxcIn1pZih2YWw9PT11bmRlZmluZWQpe3JldHVyblwidW5kZWZpbmVkXCJ9aWYoX3R5cGVvZih2YWwpIT09XCJvYmplY3RcIil7cmV0dXJuIF90eXBlb2YodmFsKX1pZihBcnJheS5pc0FycmF5KHZhbCkpe3JldHVyblwiYXJyYXlcIn1yZXR1cm57fS50b1N0cmluZy5jYWxsKHZhbCkuc2xpY2UoOCwtMSkudG9Mb3dlckNhc2UoKX07aWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIGRhdGVGb3JtYXR9KX1lbHNlIGlmKCh0eXBlb2YgZXhwb3J0cz09PVwidW5kZWZpbmVkXCI/XCJ1bmRlZmluZWRcIjpfdHlwZW9mKGV4cG9ydHMpKT09PVwib2JqZWN0XCIpe21vZHVsZS5leHBvcnRzPWRhdGVGb3JtYXR9ZWxzZXtnbG9iYWwuZGF0ZUZvcm1hdD1kYXRlRm9ybWF0fX0pKHZvaWQgMCk7IiwgIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnJlZUdsb2JhbDtcbiIsICJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCAidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsICIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tYXBgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICogc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlNYXAoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5TWFwO1xuIiwgIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG4iLCAidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmF3VGFnO1xuIiwgIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdFRvU3RyaW5nO1xuIiwgInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iLCAiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwgInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N5bWJvbDtcbiIsICJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgYXJyYXlNYXAgPSByZXF1aXJlKCcuL19hcnJheU1hcCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAvLyBSZWN1cnNpdmVseSBjb252ZXJ0IHZhbHVlcyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIHJldHVybiBhcnJheU1hcCh2YWx1ZSwgYmFzZVRvU3RyaW5nKSArICcnO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVG9TdHJpbmc7XG4iLCAiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zbGljZWAgd2l0aG91dCBhbiBpdGVyYXRlZSBjYWxsIGd1YXJkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2xpY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PTBdIFRoZSBzdGFydCBwb3NpdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbZW5kPWFycmF5Lmxlbmd0aF0gVGhlIGVuZCBwb3NpdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgc2xpY2Ugb2YgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYmFzZVNsaWNlKGFycmF5LCBzdGFydCwgZW5kKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IC1zdGFydCA+IGxlbmd0aCA/IDAgOiAobGVuZ3RoICsgc3RhcnQpO1xuICB9XG4gIGVuZCA9IGVuZCA+IGxlbmd0aCA/IGxlbmd0aCA6IGVuZDtcbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuZ3RoO1xuICB9XG4gIGxlbmd0aCA9IHN0YXJ0ID4gZW5kID8gMCA6ICgoZW5kIC0gc3RhcnQpID4+PiAwKTtcbiAgc3RhcnQgPj4+PSAwO1xuXG4gIHZhciByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBhcnJheVtpbmRleCArIHN0YXJ0XTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VTbGljZTtcbiIsICJ2YXIgYmFzZVNsaWNlID0gcmVxdWlyZSgnLi9fYmFzZVNsaWNlJyk7XG5cbi8qKlxuICogQ2FzdHMgYGFycmF5YCB0byBhIHNsaWNlIGlmIGl0J3MgbmVlZGVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBUaGUgc3RhcnQgcG9zaXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gW2VuZD1hcnJheS5sZW5ndGhdIFRoZSBlbmQgcG9zaXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3Qgc2xpY2UuXG4gKi9cbmZ1bmN0aW9uIGNhc3RTbGljZShhcnJheSwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IGVuZDtcbiAgcmV0dXJuICghc3RhcnQgJiYgZW5kID49IGxlbmd0aCkgPyBhcnJheSA6IGJhc2VTbGljZShhcnJheSwgc3RhcnQsIGVuZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FzdFNsaWNlO1xuIiwgIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmluZEluZGV4YCBhbmQgYF8uZmluZExhc3RJbmRleGAgd2l0aG91dFxuICogc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlRmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUsIGZyb21JbmRleCwgZnJvbVJpZ2h0KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IGZyb21JbmRleCArIChmcm9tUmlnaHQgPyAxIDogLTEpO1xuXG4gIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGaW5kSW5kZXg7XG4iLCAiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hTmAgd2l0aG91dCBzdXBwb3J0IGZvciBudW1iZXIgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBgTmFOYCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNOYU47XG4iLCAiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uaW5kZXhPZmAgd2hpY2ggcGVyZm9ybXMgc3RyaWN0IGVxdWFsaXR5XG4gKiBjb21wYXJpc29ucyBvZiB2YWx1ZXMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gc3RyaWN0SW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICB2YXIgaW5kZXggPSBmcm9tSW5kZXggLSAxLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmljdEluZGV4T2Y7XG4iLCAidmFyIGJhc2VGaW5kSW5kZXggPSByZXF1aXJlKCcuL19iYXNlRmluZEluZGV4JyksXG4gICAgYmFzZUlzTmFOID0gcmVxdWlyZSgnLi9fYmFzZUlzTmFOJyksXG4gICAgc3RyaWN0SW5kZXhPZiA9IHJlcXVpcmUoJy4vX3N0cmljdEluZGV4T2YnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbmRleE9mYCB3aXRob3V0IGBmcm9tSW5kZXhgIGJvdW5kcyBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZVxuICAgID8gc3RyaWN0SW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleClcbiAgICA6IGJhc2VGaW5kSW5kZXgoYXJyYXksIGJhc2VJc05hTiwgZnJvbUluZGV4KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSW5kZXhPZjtcbiIsICJ2YXIgYmFzZUluZGV4T2YgPSByZXF1aXJlKCcuL19iYXNlSW5kZXhPZicpO1xuXG4vKipcbiAqIFVzZWQgYnkgYF8udHJpbWAgYW5kIGBfLnRyaW1FbmRgIHRvIGdldCB0aGUgaW5kZXggb2YgdGhlIGxhc3Qgc3RyaW5nIHN5bWJvbFxuICogdGhhdCBpcyBub3QgZm91bmQgaW4gdGhlIGNoYXJhY3RlciBzeW1ib2xzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzdHJTeW1ib2xzIFRoZSBzdHJpbmcgc3ltYm9scyB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtBcnJheX0gY2hyU3ltYm9scyBUaGUgY2hhcmFjdGVyIHN5bWJvbHMgdG8gZmluZC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBsYXN0IHVubWF0Y2hlZCBzdHJpbmcgc3ltYm9sLlxuICovXG5mdW5jdGlvbiBjaGFyc0VuZEluZGV4KHN0clN5bWJvbHMsIGNoclN5bWJvbHMpIHtcbiAgdmFyIGluZGV4ID0gc3RyU3ltYm9scy5sZW5ndGg7XG5cbiAgd2hpbGUgKGluZGV4LS0gJiYgYmFzZUluZGV4T2YoY2hyU3ltYm9scywgc3RyU3ltYm9sc1tpbmRleF0sIDApID4gLTEpIHt9XG4gIHJldHVybiBpbmRleDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGFyc0VuZEluZGV4O1xuIiwgIi8qKlxuICogQ29udmVydHMgYW4gQVNDSUkgYHN0cmluZ2AgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFzY2lpVG9BcnJheShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5zcGxpdCgnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNjaWlUb0FycmF5O1xuIiwgIi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjaGFyYWN0ZXIgY2xhc3Nlcy4gKi9cbnZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnLFxuICAgIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmYnLFxuICAgIHJlQ29tYm9IYWxmTWFya3NSYW5nZSA9ICdcXFxcdWZlMjAtXFxcXHVmZTJmJyxcbiAgICByc0NvbWJvU3ltYm9sc1JhbmdlID0gJ1xcXFx1MjBkMC1cXFxcdTIwZmYnLFxuICAgIHJzQ29tYm9SYW5nZSA9IHJzQ29tYm9NYXJrc1JhbmdlICsgcmVDb21ib0hhbGZNYXJrc1JhbmdlICsgcnNDb21ib1N5bWJvbHNSYW5nZSxcbiAgICByc1ZhclJhbmdlID0gJ1xcXFx1ZmUwZVxcXFx1ZmUwZic7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjYXB0dXJlIGdyb3Vwcy4gKi9cbnZhciByc1pXSiA9ICdcXFxcdTIwMGQnO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgc3RyaW5ncyB3aXRoIFt6ZXJvLXdpZHRoIGpvaW5lcnMgb3IgY29kZSBwb2ludHMgZnJvbSB0aGUgYXN0cmFsIHBsYW5lc10oaHR0cDovL2Vldi5lZS9ibG9nLzIwMTUvMDkvMTIvZGFyay1jb3JuZXJzLW9mLXVuaWNvZGUvKS4gKi9cbnZhciByZUhhc1VuaWNvZGUgPSBSZWdFeHAoJ1snICsgcnNaV0ogKyByc0FzdHJhbFJhbmdlICArIHJzQ29tYm9SYW5nZSArIHJzVmFyUmFuZ2UgKyAnXScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgc3RyaW5nYCBjb250YWlucyBVbmljb2RlIHN5bWJvbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGEgc3ltYm9sIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1VuaWNvZGUoc3RyaW5nKSB7XG4gIHJldHVybiByZUhhc1VuaWNvZGUudGVzdChzdHJpbmcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc1VuaWNvZGU7XG4iLCAiLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNoYXJhY3RlciBjbGFzc2VzLiAqL1xudmFyIHJzQXN0cmFsUmFuZ2UgPSAnXFxcXHVkODAwLVxcXFx1ZGZmZicsXG4gICAgcnNDb21ib01hcmtzUmFuZ2UgPSAnXFxcXHUwMzAwLVxcXFx1MDM2ZicsXG4gICAgcmVDb21ib0hhbGZNYXJrc1JhbmdlID0gJ1xcXFx1ZmUyMC1cXFxcdWZlMmYnLFxuICAgIHJzQ29tYm9TeW1ib2xzUmFuZ2UgPSAnXFxcXHUyMGQwLVxcXFx1MjBmZicsXG4gICAgcnNDb21ib1JhbmdlID0gcnNDb21ib01hcmtzUmFuZ2UgKyByZUNvbWJvSGFsZk1hcmtzUmFuZ2UgKyByc0NvbWJvU3ltYm9sc1JhbmdlLFxuICAgIHJzVmFyUmFuZ2UgPSAnXFxcXHVmZTBlXFxcXHVmZTBmJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNhcHR1cmUgZ3JvdXBzLiAqL1xudmFyIHJzQXN0cmFsID0gJ1snICsgcnNBc3RyYWxSYW5nZSArICddJyxcbiAgICByc0NvbWJvID0gJ1snICsgcnNDb21ib1JhbmdlICsgJ10nLFxuICAgIHJzRml0eiA9ICdcXFxcdWQ4M2NbXFxcXHVkZmZiLVxcXFx1ZGZmZl0nLFxuICAgIHJzTW9kaWZpZXIgPSAnKD86JyArIHJzQ29tYm8gKyAnfCcgKyByc0ZpdHogKyAnKScsXG4gICAgcnNOb25Bc3RyYWwgPSAnW14nICsgcnNBc3RyYWxSYW5nZSArICddJyxcbiAgICByc1JlZ2lvbmFsID0gJyg/OlxcXFx1ZDgzY1tcXFxcdWRkZTYtXFxcXHVkZGZmXSl7Mn0nLFxuICAgIHJzU3VyclBhaXIgPSAnW1xcXFx1ZDgwMC1cXFxcdWRiZmZdW1xcXFx1ZGMwMC1cXFxcdWRmZmZdJyxcbiAgICByc1pXSiA9ICdcXFxcdTIwMGQnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgcmVnZXhlcy4gKi9cbnZhciByZU9wdE1vZCA9IHJzTW9kaWZpZXIgKyAnPycsXG4gICAgcnNPcHRWYXIgPSAnWycgKyByc1ZhclJhbmdlICsgJ10/JyxcbiAgICByc09wdEpvaW4gPSAnKD86JyArIHJzWldKICsgJyg/OicgKyBbcnNOb25Bc3RyYWwsIHJzUmVnaW9uYWwsIHJzU3VyclBhaXJdLmpvaW4oJ3wnKSArICcpJyArIHJzT3B0VmFyICsgcmVPcHRNb2QgKyAnKSonLFxuICAgIHJzU2VxID0gcnNPcHRWYXIgKyByZU9wdE1vZCArIHJzT3B0Sm9pbixcbiAgICByc1N5bWJvbCA9ICcoPzonICsgW3JzTm9uQXN0cmFsICsgcnNDb21ibyArICc/JywgcnNDb21ibywgcnNSZWdpb25hbCwgcnNTdXJyUGFpciwgcnNBc3RyYWxdLmpvaW4oJ3wnKSArICcpJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggW3N0cmluZyBzeW1ib2xzXShodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC11bmljb2RlKS4gKi9cbnZhciByZVVuaWNvZGUgPSBSZWdFeHAocnNGaXR6ICsgJyg/PScgKyByc0ZpdHogKyAnKXwnICsgcnNTeW1ib2wgKyByc1NlcSwgJ2cnKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIFVuaWNvZGUgYHN0cmluZ2AgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHVuaWNvZGVUb0FycmF5KHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLm1hdGNoKHJlVW5pY29kZSkgfHwgW107XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdW5pY29kZVRvQXJyYXk7XG4iLCAidmFyIGFzY2lpVG9BcnJheSA9IHJlcXVpcmUoJy4vX2FzY2lpVG9BcnJheScpLFxuICAgIGhhc1VuaWNvZGUgPSByZXF1aXJlKCcuL19oYXNVbmljb2RlJyksXG4gICAgdW5pY29kZVRvQXJyYXkgPSByZXF1aXJlKCcuL191bmljb2RlVG9BcnJheScpO1xuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBzdHJpbmdUb0FycmF5KHN0cmluZykge1xuICByZXR1cm4gaGFzVW5pY29kZShzdHJpbmcpXG4gICAgPyB1bmljb2RlVG9BcnJheShzdHJpbmcpXG4gICAgOiBhc2NpaVRvQXJyYXkoc3RyaW5nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHJpbmdUb0FycmF5O1xuIiwgInZhciBiYXNlVG9TdHJpbmcgPSByZXF1aXJlKCcuL19iYXNlVG9TdHJpbmcnKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU3RyaW5nO1xuIiwgInZhciBiYXNlVG9TdHJpbmcgPSByZXF1aXJlKCcuL19iYXNlVG9TdHJpbmcnKSxcbiAgICBjYXN0U2xpY2UgPSByZXF1aXJlKCcuL19jYXN0U2xpY2UnKSxcbiAgICBjaGFyc0VuZEluZGV4ID0gcmVxdWlyZSgnLi9fY2hhcnNFbmRJbmRleCcpLFxuICAgIHN0cmluZ1RvQXJyYXkgPSByZXF1aXJlKCcuL19zdHJpbmdUb0FycmF5JyksXG4gICAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltRW5kID0gL1xccyskLztcblxuLyoqXG4gKiBSZW1vdmVzIHRyYWlsaW5nIHdoaXRlc3BhY2Ugb3Igc3BlY2lmaWVkIGNoYXJhY3RlcnMgZnJvbSBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byB0cmltLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjaGFycz13aGl0ZXNwYWNlXSBUaGUgY2hhcmFjdGVycyB0byB0cmltLlxuICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ubWFwYC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHRyaW1tZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRyaW1FbmQoJyAgYWJjICAnKTtcbiAqIC8vID0+ICcgIGFiYydcbiAqXG4gKiBfLnRyaW1FbmQoJy1fLWFiYy1fLScsICdfLScpO1xuICogLy8gPT4gJy1fLWFiYydcbiAqL1xuZnVuY3Rpb24gdHJpbUVuZChzdHJpbmcsIGNoYXJzLCBndWFyZCkge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICBpZiAoc3RyaW5nICYmIChndWFyZCB8fCBjaGFycyA9PT0gdW5kZWZpbmVkKSkge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShyZVRyaW1FbmQsICcnKTtcbiAgfVxuICBpZiAoIXN0cmluZyB8fCAhKGNoYXJzID0gYmFzZVRvU3RyaW5nKGNoYXJzKSkpIHtcbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG4gIHZhciBzdHJTeW1ib2xzID0gc3RyaW5nVG9BcnJheShzdHJpbmcpLFxuICAgICAgZW5kID0gY2hhcnNFbmRJbmRleChzdHJTeW1ib2xzLCBzdHJpbmdUb0FycmF5KGNoYXJzKSkgKyAxO1xuXG4gIHJldHVybiBjYXN0U2xpY2Uoc3RyU3ltYm9scywgMCwgZW5kKS5qb2luKCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0cmltRW5kO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuLyoqXG4gKiBDb25zdGFudHMgZm9yIHRva2VuIHR5cGVzXG4gKi9cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0ge1xuICAgIFdISVRFU1BBQ0U6IFwid2hpdGVzcGFjZVwiLFxuICAgIFdPUkQ6IFwid29yZFwiLFxuICAgIFNUUklORzogXCJzdHJpbmdcIixcbiAgICBSRVNFUlZFRDogXCJyZXNlcnZlZFwiLFxuICAgIFJFU0VSVkVEX1RPUExFVkVMOiBcInJlc2VydmVkLXRvcGxldmVsXCIsXG4gICAgUkVTRVJWRURfTkVXTElORTogXCJyZXNlcnZlZC1uZXdsaW5lXCIsXG4gICAgT1BFUkFUT1I6IFwib3BlcmF0b3JcIixcbiAgICBPUEVOX1BBUkVOOiBcIm9wZW4tcGFyZW5cIixcbiAgICBDTE9TRV9QQVJFTjogXCJjbG9zZS1wYXJlblwiLFxuICAgIExJTkVfQ09NTUVOVDogXCJsaW5lLWNvbW1lbnRcIixcbiAgICBCTE9DS19DT01NRU5UOiBcImJsb2NrLWNvbW1lbnRcIixcbiAgICBOVU1CRVI6IFwibnVtYmVyXCIsXG4gICAgUExBQ0VIT0xERVI6IFwicGxhY2Vob2xkZXJcIlxufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwgIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlRmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJlcGVhdGAgd2hpY2ggZG9lc24ndCBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gcmVwZWF0LlxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgdGhlIHN0cmluZy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJlcGVhdGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlcGVhdChzdHJpbmcsIG4pIHtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBpZiAoIXN0cmluZyB8fCBuIDwgMSB8fCBuID4gTUFYX1NBRkVfSU5URUdFUikge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgLy8gTGV2ZXJhZ2UgdGhlIGV4cG9uZW50aWF0aW9uIGJ5IHNxdWFyaW5nIGFsZ29yaXRobSBmb3IgYSBmYXN0ZXIgcmVwZWF0LlxuICAvLyBTZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRXhwb25lbnRpYXRpb25fYnlfc3F1YXJpbmcgZm9yIG1vcmUgZGV0YWlscy5cbiAgZG8ge1xuICAgIGlmIChuICUgMikge1xuICAgICAgcmVzdWx0ICs9IHN0cmluZztcbiAgICB9XG4gICAgbiA9IG5hdGl2ZUZsb29yKG4gLyAyKTtcbiAgICBpZiAobikge1xuICAgICAgc3RyaW5nICs9IHN0cmluZztcbiAgICB9XG4gIH0gd2hpbGUgKG4pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVJlcGVhdDtcbiIsICIvKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcTtcbiIsICIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsICJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFzeW5jVGFnID0gJ1tvYmplY3QgQXN5bmNGdW5jdGlvbl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgcHJveHlUYWcgPSAnW29iamVjdCBQcm94eV0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXlzIGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBiYXNlR2V0VGFnKHZhbHVlKTtcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWcgfHwgdGFnID09IGFzeW5jVGFnIHx8IHRhZyA9PSBwcm94eVRhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIiwgIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0xlbmd0aDtcbiIsICJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZTtcbiIsICIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcblxuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZSA9PSAnbnVtYmVyJyB8fFxuICAgICAgKHR5cGUgIT0gJ3N5bWJvbCcgJiYgcmVJc1VpbnQudGVzdCh2YWx1ZSkpKSAmJlxuICAgICAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbmRleDtcbiIsICJ2YXIgZXEgPSByZXF1aXJlKCcuL2VxJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vX2lzSW5kZXgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdClcbiAgICAgICkge1xuICAgIHJldHVybiBlcShvYmplY3RbaW5kZXhdLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSXRlcmF0ZWVDYWxsO1xuIiwgInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvTnVtYmVyO1xuIiwgInZhciB0b051bWJlciA9IHJlcXVpcmUoJy4vdG9OdW1iZXInKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMCxcbiAgICBNQVhfSU5URUdFUiA9IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBmaW5pdGUgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMi4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9GaW5pdGUoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9GaW5pdGUoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvRmluaXRlKEluZmluaXR5KTtcbiAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gKlxuICogXy50b0Zpbml0ZSgnMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9GaW5pdGUodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogMDtcbiAgfVxuICB2YWx1ZSA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHZhbHVlID09PSBJTkZJTklUWSB8fCB2YWx1ZSA9PT0gLUlORklOSVRZKSB7XG4gICAgdmFyIHNpZ24gPSAodmFsdWUgPCAwID8gLTEgOiAxKTtcbiAgICByZXR1cm4gc2lnbiAqIE1BWF9JTlRFR0VSO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyB2YWx1ZSA6IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9GaW5pdGU7XG4iLCAidmFyIHRvRmluaXRlID0gcmVxdWlyZSgnLi90b0Zpbml0ZScpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gaW50ZWdlci5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0ludGVnZXJgXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9pbnRlZ2VyKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBpbnRlZ2VyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvSW50ZWdlcigzLjIpO1xuICogLy8gPT4gM1xuICpcbiAqIF8udG9JbnRlZ2VyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gMFxuICpcbiAqIF8udG9JbnRlZ2VyKEluZmluaXR5KTtcbiAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gKlxuICogXy50b0ludGVnZXIoJzMuMicpO1xuICogLy8gPT4gM1xuICovXG5mdW5jdGlvbiB0b0ludGVnZXIodmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IHRvRmluaXRlKHZhbHVlKSxcbiAgICAgIHJlbWFpbmRlciA9IHJlc3VsdCAlIDE7XG5cbiAgcmV0dXJuIHJlc3VsdCA9PT0gcmVzdWx0ID8gKHJlbWFpbmRlciA/IHJlc3VsdCAtIHJlbWFpbmRlciA6IHJlc3VsdCkgOiAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvSW50ZWdlcjtcbiIsICJ2YXIgYmFzZVJlcGVhdCA9IHJlcXVpcmUoJy4vX2Jhc2VSZXBlYXQnKSxcbiAgICBpc0l0ZXJhdGVlQ2FsbCA9IHJlcXVpcmUoJy4vX2lzSXRlcmF0ZWVDYWxsJyksXG4gICAgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi90b0ludGVnZXInKSxcbiAgICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqXG4gKiBSZXBlYXRzIHRoZSBnaXZlbiBzdHJpbmcgYG5gIHRpbWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIHJlcGVhdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbj0xXSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCB0aGUgc3RyaW5nLlxuICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ubWFwYC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJlcGVhdGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5yZXBlYXQoJyonLCAzKTtcbiAqIC8vID0+ICcqKionXG4gKlxuICogXy5yZXBlYXQoJ2FiYycsIDIpO1xuICogLy8gPT4gJ2FiY2FiYydcbiAqXG4gKiBfLnJlcGVhdCgnYWJjJywgMCk7XG4gKiAvLyA9PiAnJ1xuICovXG5mdW5jdGlvbiByZXBlYXQoc3RyaW5nLCBuLCBndWFyZCkge1xuICBpZiAoKGd1YXJkID8gaXNJdGVyYXRlZUNhbGwoc3RyaW5nLCBuLCBndWFyZCkgOiBuID09PSB1bmRlZmluZWQpKSB7XG4gICAgbiA9IDE7XG4gIH0gZWxzZSB7XG4gICAgbiA9IHRvSW50ZWdlcihuKTtcbiAgfVxuICByZXR1cm4gYmFzZVJlcGVhdCh0b1N0cmluZyhzdHJpbmcpLCBuKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXBlYXQ7XG4iLCAiLyoqXG4gKiBHZXRzIHRoZSBsYXN0IGVsZW1lbnQgb2YgYGFycmF5YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBsYXN0IGVsZW1lbnQgb2YgYGFycmF5YC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5sYXN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAzXG4gKi9cbmZ1bmN0aW9uIGxhc3QoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuICByZXR1cm4gbGVuZ3RoID8gYXJyYXlbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGFzdDtcbiIsICJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9yZXBlYXQgPSByZXF1aXJlKFwibG9kYXNoL3JlcGVhdFwiKTtcblxudmFyIF9yZXBlYXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVwZWF0KTtcblxudmFyIF9sYXN0ID0gcmVxdWlyZShcImxvZGFzaC9sYXN0XCIpO1xuXG52YXIgX2xhc3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGFzdCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgSU5ERU5UX1RZUEVfVE9QX0xFVkVMID0gXCJ0b3AtbGV2ZWxcIjtcbnZhciBJTkRFTlRfVFlQRV9CTE9DS19MRVZFTCA9IFwiYmxvY2stbGV2ZWxcIjtcblxuLyoqXG4gKiBNYW5hZ2VzIGluZGVudGF0aW9uIGxldmVscy5cbiAqXG4gKiBUaGVyZSBhcmUgdHdvIHR5cGVzIG9mIGluZGVudGF0aW9uIGxldmVsczpcbiAqXG4gKiAtIEJMT0NLX0xFVkVMIDogaW5jcmVhc2VkIGJ5IG9wZW4tcGFyZW50aGVzaXNcbiAqIC0gVE9QX0xFVkVMIDogaW5jcmVhc2VkIGJ5IFJFU0VSVkVEX1RPUExFVkVMIHdvcmRzXG4gKi9cblxudmFyIEluZGVudGF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbmRlbnQgSW5kZW50IHZhbHVlLCBkZWZhdWx0IGlzIFwiICBcIiAoMiBzcGFjZXMpXG4gICAgICovXG4gICAgZnVuY3Rpb24gSW5kZW50YXRpb24oaW5kZW50KSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBJbmRlbnRhdGlvbik7XG5cbiAgICAgICAgdGhpcy5pbmRlbnQgPSBpbmRlbnQgfHwgXCIgIFwiO1xuICAgICAgICB0aGlzLmluZGVudFR5cGVzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjdXJyZW50IGluZGVudGF0aW9uIHN0cmluZy5cbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG5cblxuICAgIEluZGVudGF0aW9uLnByb3RvdHlwZS5nZXRJbmRlbnQgPSBmdW5jdGlvbiBnZXRJbmRlbnQoKSB7XG4gICAgICAgIHJldHVybiAoMCwgX3JlcGVhdDJbXCJkZWZhdWx0XCJdKSh0aGlzLmluZGVudCwgdGhpcy5pbmRlbnRUeXBlcy5sZW5ndGgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbmNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIHRvcC1sZXZlbCBpbmRlbnQuXG4gICAgICovXG5cblxuICAgIEluZGVudGF0aW9uLnByb3RvdHlwZS5pbmNyZWFzZVRvcGxldmVsID0gZnVuY3Rpb24gaW5jcmVhc2VUb3BsZXZlbCgpIHtcbiAgICAgICAgdGhpcy5pbmRlbnRUeXBlcy5wdXNoKElOREVOVF9UWVBFX1RPUF9MRVZFTCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluY3JlYXNlcyBpbmRlbnRhdGlvbiBieSBvbmUgYmxvY2stbGV2ZWwgaW5kZW50LlxuICAgICAqL1xuXG5cbiAgICBJbmRlbnRhdGlvbi5wcm90b3R5cGUuaW5jcmVhc2VCbG9ja0xldmVsID0gZnVuY3Rpb24gaW5jcmVhc2VCbG9ja0xldmVsKCkge1xuICAgICAgICB0aGlzLmluZGVudFR5cGVzLnB1c2goSU5ERU5UX1RZUEVfQkxPQ0tfTEVWRUwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIHRvcC1sZXZlbCBpbmRlbnQuXG4gICAgICogRG9lcyBub3RoaW5nIHdoZW4gdGhlIHByZXZpb3VzIGluZGVudCBpcyBub3QgdG9wLWxldmVsLlxuICAgICAqL1xuXG5cbiAgICBJbmRlbnRhdGlvbi5wcm90b3R5cGUuZGVjcmVhc2VUb3BMZXZlbCA9IGZ1bmN0aW9uIGRlY3JlYXNlVG9wTGV2ZWwoKSB7XG4gICAgICAgIGlmICgoMCwgX2xhc3QyW1wiZGVmYXVsdFwiXSkodGhpcy5pbmRlbnRUeXBlcykgPT09IElOREVOVF9UWVBFX1RPUF9MRVZFTCkge1xuICAgICAgICAgICAgdGhpcy5pbmRlbnRUeXBlcy5wb3AoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIGJsb2NrLWxldmVsIGluZGVudC5cbiAgICAgKiBJZiB0aGVyZSBhcmUgdG9wLWxldmVsIGluZGVudHMgd2l0aGluIHRoZSBibG9jay1sZXZlbCBpbmRlbnQsXG4gICAgICogdGhyb3dzIGF3YXkgdGhlc2UgYXMgd2VsbC5cbiAgICAgKi9cblxuXG4gICAgSW5kZW50YXRpb24ucHJvdG90eXBlLmRlY3JlYXNlQmxvY2tMZXZlbCA9IGZ1bmN0aW9uIGRlY3JlYXNlQmxvY2tMZXZlbCgpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuaW5kZW50VHlwZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIHR5cGUgPSB0aGlzLmluZGVudFR5cGVzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKHR5cGUgIT09IElOREVOVF9UWVBFX1RPUF9MRVZFTCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBJbmRlbnRhdGlvbjtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBJbmRlbnRhdGlvbjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwgIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3Rva2VuVHlwZXMgPSByZXF1aXJlKFwiLi90b2tlblR5cGVzXCIpO1xuXG52YXIgX3Rva2VuVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdG9rZW5UeXBlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgSU5MSU5FX01BWF9MRU5HVEggPSA1MDtcblxuLyoqXG4gKiBCb29ra2VlcGVyIGZvciBpbmxpbmUgYmxvY2tzLlxuICpcbiAqIElubGluZSBibG9ja3MgYXJlIHBhcmVudGhpemVkIGV4cHJlc3Npb25zIHRoYXQgYXJlIHNob3J0ZXIgdGhhbiBJTkxJTkVfTUFYX0xFTkdUSC5cbiAqIFRoZXNlIGJsb2NrcyBhcmUgZm9ybWF0dGVkIG9uIGEgc2luZ2xlIGxpbmUsIHVubGlrZSBsb25nZXIgcGFyZW50aGl6ZWRcbiAqIGV4cHJlc3Npb25zIHdoZXJlIG9wZW4tcGFyZW50aGVzaXMgY2F1c2VzIG5ld2xpbmUgYW5kIGluY3JlYXNlIG9mIGluZGVudGF0aW9uLlxuICovXG5cbnZhciBJbmxpbmVCbG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJbmxpbmVCbG9jaygpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIElubGluZUJsb2NrKTtcblxuICAgICAgICB0aGlzLmxldmVsID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCZWdpbnMgaW5saW5lIGJsb2NrIHdoZW4gbG9va2FoZWFkIHRocm91Z2ggdXBjb21pbmcgdG9rZW5zIGRldGVybWluZXNcbiAgICAgKiB0aGF0IHRoZSBibG9jayB3b3VsZCBiZSBzbWFsbGVyIHRoYW4gSU5MSU5FX01BWF9MRU5HVEguXG4gICAgICogQHBhcmFtICB7T2JqZWN0W119IHRva2VucyBBcnJheSBvZiBhbGwgdG9rZW5zXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBpbmRleCBDdXJyZW50IHRva2VuIHBvc2l0aW9uXG4gICAgICovXG5cblxuICAgIElubGluZUJsb2NrLnByb3RvdHlwZS5iZWdpbklmUG9zc2libGUgPSBmdW5jdGlvbiBiZWdpbklmUG9zc2libGUodG9rZW5zLCBpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5sZXZlbCA9PT0gMCAmJiB0aGlzLmlzSW5saW5lQmxvY2sodG9rZW5zLCBpbmRleCkpIHtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsID0gMDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGaW5pc2hlcyBjdXJyZW50IGlubGluZSBibG9jay5cbiAgICAgKiBUaGVyZSBtaWdodCBiZSBzZXZlcmFsIG5lc3RlZCBvbmVzLlxuICAgICAqL1xuXG5cbiAgICBJbmxpbmVCbG9jay5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gZW5kKCkge1xuICAgICAgICB0aGlzLmxldmVsLS07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRydWUgd2hlbiBpbnNpZGUgYW4gaW5saW5lIGJsb2NrXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgSW5saW5lQmxvY2sucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxldmVsID4gMDtcbiAgICB9O1xuXG4gICAgLy8gQ2hlY2sgaWYgdGhpcyBzaG91bGQgYmUgYW4gaW5saW5lIHBhcmVudGhlc2VzIGJsb2NrXG4gICAgLy8gRXhhbXBsZXMgYXJlIFwiTk9XKClcIiwgXCJDT1VOVCgqKVwiLCBcImludCgxMClcIiwga2V5KGBzb21lY29sdW1uYCksIERFQ0lNQUwoNywyKVxuXG5cbiAgICBJbmxpbmVCbG9jay5wcm90b3R5cGUuaXNJbmxpbmVCbG9jayA9IGZ1bmN0aW9uIGlzSW5saW5lQmxvY2sodG9rZW5zLCBpbmRleCkge1xuICAgICAgICB2YXIgbGVuZ3RoID0gMDtcbiAgICAgICAgdmFyIGxldmVsID0gMDtcblxuICAgICAgICBmb3IgKHZhciBpID0gaW5kZXg7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIGxlbmd0aCArPSB0b2tlbi52YWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgICAgIC8vIE92ZXJyYW4gbWF4IGxlbmd0aFxuICAgICAgICAgICAgaWYgKGxlbmd0aCA+IElOTElORV9NQVhfTEVOR1RIKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5PUEVOX1BBUkVOKSB7XG4gICAgICAgICAgICAgICAgbGV2ZWwrKztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5DTE9TRV9QQVJFTikge1xuICAgICAgICAgICAgICAgIGxldmVsLS07XG4gICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNGb3JiaWRkZW5Ub2tlbih0b2tlbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvLyBSZXNlcnZlZCB3b3JkcyB0aGF0IGNhdXNlIG5ld2xpbmVzLCBjb21tZW50cyBhbmQgc2VtaWNvbG9uc1xuICAgIC8vIGFyZSBub3QgYWxsb3dlZCBpbnNpZGUgaW5saW5lIHBhcmVudGhlc2VzIGJsb2NrXG5cblxuICAgIElubGluZUJsb2NrLnByb3RvdHlwZS5pc0ZvcmJpZGRlblRva2VuID0gZnVuY3Rpb24gaXNGb3JiaWRkZW5Ub2tlbihfcmVmKSB7XG4gICAgICAgIHZhciB0eXBlID0gX3JlZi50eXBlLFxuICAgICAgICAgICAgdmFsdWUgPSBfcmVmLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0eXBlID09PSBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLlJFU0VSVkVEX1RPUExFVkVMIHx8IHR5cGUgPT09IF90b2tlblR5cGVzMltcImRlZmF1bHRcIl0uUkVTRVJWRURfTkVXTElORSB8fCB0eXBlID09PSBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLkNPTU1FTlQgfHwgdHlwZSA9PT0gX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5CTE9DS19DT01NRU5UIHx8IHZhbHVlID09PSBcIjtcIjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIElubGluZUJsb2NrO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IElubGluZUJsb2NrO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogSGFuZGxlcyBwbGFjZWhvbGRlciByZXBsYWNlbWVudCB3aXRoIGdpdmVuIHBhcmFtcy5cbiAqL1xudmFyIFBhcmFtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAgICovXG4gICAgZnVuY3Rpb24gUGFyYW1zKHBhcmFtcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGFyYW1zKTtcblxuICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBwYXJhbSB2YWx1ZSB0aGF0IG1hdGNoZXMgZ2l2ZW4gcGxhY2Vob2xkZXIgd2l0aCBwYXJhbSBrZXkuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRva2VuXG4gICAgICogICBAcGFyYW0ge1N0cmluZ30gdG9rZW4ua2V5IFBsYWNlaG9sZGVyIGtleVxuICAgICAqICAgQHBhcmFtIHtTdHJpbmd9IHRva2VuLnZhbHVlIFBsYWNlaG9sZGVyIHZhbHVlXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBwYXJhbSBvciB0b2tlbi52YWx1ZSB3aGVuIHBhcmFtcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuXG5cbiAgICBQYXJhbXMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldChfcmVmKSB7XG4gICAgICAgIHZhciBrZXkgPSBfcmVmLmtleSxcbiAgICAgICAgICAgIHZhbHVlID0gX3JlZi52YWx1ZTtcblxuICAgICAgICBpZiAoIXRoaXMucGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyYW1zW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGFyYW1zW3RoaXMuaW5kZXgrK107XG4gICAgfTtcblxuICAgIHJldHVybiBQYXJhbXM7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gUGFyYW1zO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHJpbUVuZCA9IHJlcXVpcmUoXCJsb2Rhc2gvdHJpbUVuZFwiKTtcblxudmFyIF90cmltRW5kMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RyaW1FbmQpO1xuXG52YXIgX3Rva2VuVHlwZXMgPSByZXF1aXJlKFwiLi90b2tlblR5cGVzXCIpO1xuXG52YXIgX3Rva2VuVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdG9rZW5UeXBlcyk7XG5cbnZhciBfSW5kZW50YXRpb24gPSByZXF1aXJlKFwiLi9JbmRlbnRhdGlvblwiKTtcblxudmFyIF9JbmRlbnRhdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9JbmRlbnRhdGlvbik7XG5cbnZhciBfSW5saW5lQmxvY2sgPSByZXF1aXJlKFwiLi9JbmxpbmVCbG9ja1wiKTtcblxudmFyIF9JbmxpbmVCbG9jazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9JbmxpbmVCbG9jayk7XG5cbnZhciBfUGFyYW1zID0gcmVxdWlyZShcIi4vUGFyYW1zXCIpO1xuXG52YXIgX1BhcmFtczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9QYXJhbXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEZvcm1hdHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnXG4gICAgICogICBAcGFyYW0ge09iamVjdH0gY2ZnLmluZGVudFxuICAgICAqICAgQHBhcmFtIHtPYmplY3R9IGNmZy5wYXJhbXNcbiAgICAgKiBAcGFyYW0ge1Rva2VuaXplcn0gdG9rZW5pemVyXG4gICAgICovXG4gICAgZnVuY3Rpb24gRm9ybWF0dGVyKGNmZywgdG9rZW5pemVyKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGb3JtYXR0ZXIpO1xuXG4gICAgICAgIHRoaXMuY2ZnID0gY2ZnIHx8IHt9O1xuICAgICAgICB0aGlzLmluZGVudGF0aW9uID0gbmV3IF9JbmRlbnRhdGlvbjJbXCJkZWZhdWx0XCJdKHRoaXMuY2ZnLmluZGVudCk7XG4gICAgICAgIHRoaXMuaW5saW5lQmxvY2sgPSBuZXcgX0lubGluZUJsb2NrMltcImRlZmF1bHRcIl0oKTtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBuZXcgX1BhcmFtczJbXCJkZWZhdWx0XCJdKHRoaXMuY2ZnLnBhcmFtcyk7XG4gICAgICAgIHRoaXMudG9rZW5pemVyID0gdG9rZW5pemVyO1xuICAgICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRXb3JkID0ge307XG4gICAgICAgIHRoaXMudG9rZW5zID0gW107XG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdHMgd2hpdGVzcGFjZXMgaW4gYSBTUUwgc3RyaW5nIHRvIG1ha2UgaXQgZWFzaWVyIHRvIHJlYWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcXVlcnkgVGhlIFNRTCBxdWVyeSBzdHJpbmdcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZvcm1hdHRlZCBxdWVyeVxuICAgICAqL1xuXG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uIGZvcm1hdChxdWVyeSkge1xuICAgICAgICB0aGlzLnRva2VucyA9IHRoaXMudG9rZW5pemVyLnRva2VuaXplKHF1ZXJ5KTtcbiAgICAgICAgdmFyIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5nZXRGb3JtYXR0ZWRRdWVyeUZyb21Ub2tlbnMoKTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkUXVlcnkudHJpbSgpO1xuICAgIH07XG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmdldEZvcm1hdHRlZFF1ZXJ5RnJvbVRva2VucyA9IGZ1bmN0aW9uIGdldEZvcm1hdHRlZFF1ZXJ5RnJvbVRva2VucygpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICB2YXIgZm9ybWF0dGVkUXVlcnkgPSBcIlwiO1xuXG4gICAgICAgIHRoaXMudG9rZW5zLmZvckVhY2goZnVuY3Rpb24gKHRva2VuLCBpbmRleCkge1xuICAgICAgICAgICAgX3RoaXMuaW5kZXggPSBpbmRleDtcblxuICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IF90b2tlblR5cGVzMltcImRlZmF1bHRcIl0uV0hJVEVTUEFDRSkge1xuICAgICAgICAgICAgICAgIC8vIGlnbm9yZSAod2UgZG8gb3VyIG93biB3aGl0ZXNwYWNlIGZvcm1hdHRpbmcpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IF90b2tlblR5cGVzMltcImRlZmF1bHRcIl0uTElORV9DT01NRU5UKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSBfdGhpcy5mb3JtYXRMaW5lQ29tbWVudCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLkJMT0NLX0NPTU1FTlQpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IF90aGlzLmZvcm1hdEJsb2NrQ29tbWVudCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLlJFU0VSVkVEX1RPUExFVkVMKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSBfdGhpcy5mb3JtYXRUb3BsZXZlbFJlc2VydmVkV29yZCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICAgICAgICAgIF90aGlzLnByZXZpb3VzUmVzZXJ2ZWRXb3JkID0gdG9rZW47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IF90b2tlblR5cGVzMltcImRlZmF1bHRcIl0uUkVTRVJWRURfTkVXTElORSkge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gX3RoaXMuZm9ybWF0TmV3bGluZVJlc2VydmVkV29yZCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICAgICAgICAgIF90aGlzLnByZXZpb3VzUmVzZXJ2ZWRXb3JkID0gdG9rZW47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IF90b2tlblR5cGVzMltcImRlZmF1bHRcIl0uUkVTRVJWRUQpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IF90aGlzLmZvcm1hdFdpdGhTcGFjZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5wcmV2aW91c1Jlc2VydmVkV29yZCA9IHRva2VuO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLk9QRU5fUEFSRU4pIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IF90aGlzLmZvcm1hdE9wZW5pbmdQYXJlbnRoZXNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLkNMT1NFX1BBUkVOKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSBfdGhpcy5mb3JtYXRDbG9zaW5nUGFyZW50aGVzZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5QTEFDRUhPTERFUikge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gX3RoaXMuZm9ybWF0UGxhY2Vob2xkZXIodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09IFwiLFwiKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSBfdGhpcy5mb3JtYXRDb21tYSh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi52YWx1ZSA9PT0gXCI6XCIpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IF90aGlzLmZvcm1hdFdpdGhTcGFjZUFmdGVyKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuLnZhbHVlID09PSBcIi5cIikge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gX3RoaXMuZm9ybWF0V2l0aG91dFNwYWNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi52YWx1ZSA9PT0gXCI7XCIpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IF90aGlzLmZvcm1hdFF1ZXJ5U2VwYXJhdG9yKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gX3RoaXMuZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZFF1ZXJ5O1xuICAgIH07XG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdExpbmVDb21tZW50ID0gZnVuY3Rpb24gZm9ybWF0TGluZUNvbW1lbnQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUocXVlcnkgKyB0b2tlbi52YWx1ZSk7XG4gICAgfTtcblxuICAgIEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0QmxvY2tDb21tZW50ID0gZnVuY3Rpb24gZm9ybWF0QmxvY2tDb21tZW50KHRva2VuLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHRoaXMuYWRkTmV3bGluZShxdWVyeSkgKyB0aGlzLmluZGVudENvbW1lbnQodG9rZW4udmFsdWUpKTtcbiAgICB9O1xuXG4gICAgRm9ybWF0dGVyLnByb3RvdHlwZS5pbmRlbnRDb21tZW50ID0gZnVuY3Rpb24gaW5kZW50Q29tbWVudChjb21tZW50KSB7XG4gICAgICAgIHJldHVybiBjb21tZW50LnJlcGxhY2UoL1xcbi9nLCBcIlxcblwiICsgdGhpcy5pbmRlbnRhdGlvbi5nZXRJbmRlbnQoKSk7XG4gICAgfTtcblxuICAgIEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0VG9wbGV2ZWxSZXNlcnZlZFdvcmQgPSBmdW5jdGlvbiBmb3JtYXRUb3BsZXZlbFJlc2VydmVkV29yZCh0b2tlbiwgcXVlcnkpIHtcbiAgICAgICAgdGhpcy5pbmRlbnRhdGlvbi5kZWNyZWFzZVRvcExldmVsKCk7XG5cbiAgICAgICAgcXVlcnkgPSB0aGlzLmFkZE5ld2xpbmUocXVlcnkpO1xuXG4gICAgICAgIHRoaXMuaW5kZW50YXRpb24uaW5jcmVhc2VUb3BsZXZlbCgpO1xuXG4gICAgICAgIHF1ZXJ5ICs9IHRoaXMuZXF1YWxpemVXaGl0ZXNwYWNlKHRva2VuLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSk7XG4gICAgfTtcblxuICAgIEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0TmV3bGluZVJlc2VydmVkV29yZCA9IGZ1bmN0aW9uIGZvcm1hdE5ld2xpbmVSZXNlcnZlZFdvcmQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUocXVlcnkpICsgdGhpcy5lcXVhbGl6ZVdoaXRlc3BhY2UodG9rZW4udmFsdWUpICsgXCIgXCI7XG4gICAgfTtcblxuICAgIC8vIFJlcGxhY2UgYW55IHNlcXVlbmNlIG9mIHdoaXRlc3BhY2UgY2hhcmFjdGVycyB3aXRoIHNpbmdsZSBzcGFjZVxuXG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmVxdWFsaXplV2hpdGVzcGFjZSA9IGZ1bmN0aW9uIGVxdWFsaXplV2hpdGVzcGFjZShzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKTtcbiAgICB9O1xuXG4gICAgLy8gT3BlbmluZyBwYXJlbnRoZXNlcyBpbmNyZWFzZSB0aGUgYmxvY2sgaW5kZW50IGxldmVsIGFuZCBzdGFydCBhIG5ldyBsaW5lXG5cblxuICAgIEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0T3BlbmluZ1BhcmVudGhlc2VzID0gZnVuY3Rpb24gZm9ybWF0T3BlbmluZ1BhcmVudGhlc2VzKHRva2VuLCBxdWVyeSkge1xuICAgICAgICAvLyBUYWtlIG91dCB0aGUgcHJlY2VkaW5nIHNwYWNlIHVubGVzcyB0aGVyZSB3YXMgd2hpdGVzcGFjZSB0aGVyZSBpbiB0aGUgb3JpZ2luYWwgcXVlcnlcbiAgICAgICAgLy8gb3IgYW5vdGhlciBvcGVuaW5nIHBhcmVucyBvciBsaW5lIGNvbW1lbnRcbiAgICAgICAgdmFyIHByZXNlcnZlV2hpdGVzcGFjZUZvciA9IFtfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLldISVRFU1BBQ0UsIF90b2tlblR5cGVzMltcImRlZmF1bHRcIl0uT1BFTl9QQVJFTiwgX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5MSU5FX0NPTU1FTlRdO1xuICAgICAgICBpZiAoIXByZXNlcnZlV2hpdGVzcGFjZUZvci5pbmNsdWRlcyh0aGlzLnByZXZpb3VzVG9rZW4oKS50eXBlKSkge1xuICAgICAgICAgICAgcXVlcnkgPSAoMCwgX3RyaW1FbmQyW1wiZGVmYXVsdFwiXSkocXVlcnkpO1xuICAgICAgICB9XG4gICAgICAgIHF1ZXJ5ICs9IHRva2VuLnZhbHVlO1xuXG4gICAgICAgIHRoaXMuaW5saW5lQmxvY2suYmVnaW5JZlBvc3NpYmxlKHRoaXMudG9rZW5zLCB0aGlzLmluZGV4KTtcblxuICAgICAgICBpZiAoIXRoaXMuaW5saW5lQmxvY2suaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgdGhpcy5pbmRlbnRhdGlvbi5pbmNyZWFzZUJsb2NrTGV2ZWwoKTtcbiAgICAgICAgICAgIHF1ZXJ5ID0gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgfTtcblxuICAgIC8vIENsb3NpbmcgcGFyZW50aGVzZXMgZGVjcmVhc2UgdGhlIGJsb2NrIGluZGVudCBsZXZlbFxuXG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdENsb3NpbmdQYXJlbnRoZXNlcyA9IGZ1bmN0aW9uIGZvcm1hdENsb3NpbmdQYXJlbnRoZXNlcyh0b2tlbiwgcXVlcnkpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lQmxvY2suaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgdGhpcy5pbmxpbmVCbG9jay5lbmQoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFdpdGhTcGFjZUFmdGVyKHRva2VuLCBxdWVyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluZGVudGF0aW9uLmRlY3JlYXNlQmxvY2tMZXZlbCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRQbGFjZWhvbGRlciA9IGZ1bmN0aW9uIGZvcm1hdFBsYWNlaG9sZGVyKHRva2VuLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gcXVlcnkgKyB0aGlzLnBhcmFtcy5nZXQodG9rZW4pICsgXCIgXCI7XG4gICAgfTtcblxuICAgIC8vIENvbW1hcyBzdGFydCBhIG5ldyBsaW5lICh1bmxlc3Mgd2l0aGluIGlubGluZSBwYXJlbnRoZXNlcyBvciBTUUwgXCJMSU1JVFwiIGNsYXVzZSlcblxuXG4gICAgRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRDb21tYSA9IGZ1bmN0aW9uIGZvcm1hdENvbW1hKHRva2VuLCBxdWVyeSkge1xuICAgICAgICBxdWVyeSA9IHRoaXMudHJpbVRyYWlsaW5nV2hpdGVzcGFjZShxdWVyeSkgKyB0b2tlbi52YWx1ZSArIFwiIFwiO1xuXG4gICAgICAgIGlmICh0aGlzLmlubGluZUJsb2NrLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBxdWVyeTtcbiAgICAgICAgfSBlbHNlIGlmICgvXkxJTUlUJC9pLnRlc3QodGhpcy5wcmV2aW91c1Jlc2VydmVkV29yZC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBxdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUocXVlcnkpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0V2l0aFNwYWNlQWZ0ZXIgPSBmdW5jdGlvbiBmb3JtYXRXaXRoU3BhY2VBZnRlcih0b2tlbiwgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJpbVRyYWlsaW5nV2hpdGVzcGFjZShxdWVyeSkgKyB0b2tlbi52YWx1ZSArIFwiIFwiO1xuICAgIH07XG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdFdpdGhvdXRTcGFjZXMgPSBmdW5jdGlvbiBmb3JtYXRXaXRob3V0U3BhY2VzKHRva2VuLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmltVHJhaWxpbmdXaGl0ZXNwYWNlKHF1ZXJ5KSArIHRva2VuLnZhbHVlO1xuICAgIH07XG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdFdpdGhTcGFjZXMgPSBmdW5jdGlvbiBmb3JtYXRXaXRoU3BhY2VzKHRva2VuLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gcXVlcnkgKyB0b2tlbi52YWx1ZSArIFwiIFwiO1xuICAgIH07XG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdFF1ZXJ5U2VwYXJhdG9yID0gZnVuY3Rpb24gZm9ybWF0UXVlcnlTZXBhcmF0b3IodG9rZW4sIHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyaW1UcmFpbGluZ1doaXRlc3BhY2UocXVlcnkpICsgdG9rZW4udmFsdWUgKyBcIlxcblwiO1xuICAgIH07XG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmFkZE5ld2xpbmUgPSBmdW5jdGlvbiBhZGROZXdsaW5lKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiAoMCwgX3RyaW1FbmQyW1wiZGVmYXVsdFwiXSkocXVlcnkpICsgXCJcXG5cIiArIHRoaXMuaW5kZW50YXRpb24uZ2V0SW5kZW50KCk7XG4gICAgfTtcblxuICAgIEZvcm1hdHRlci5wcm90b3R5cGUudHJpbVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uIHRyaW1UcmFpbGluZ1doaXRlc3BhY2UocXVlcnkpIHtcbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNOb25XaGl0ZXNwYWNlVG9rZW4oKS50eXBlID09PSBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLkxJTkVfQ09NTUVOVCkge1xuICAgICAgICAgICAgcmV0dXJuICgwLCBfdHJpbUVuZDJbXCJkZWZhdWx0XCJdKShxdWVyeSkgKyBcIlxcblwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICgwLCBfdHJpbUVuZDJbXCJkZWZhdWx0XCJdKShxdWVyeSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRm9ybWF0dGVyLnByb3RvdHlwZS5wcmV2aW91c05vbldoaXRlc3BhY2VUb2tlbiA9IGZ1bmN0aW9uIHByZXZpb3VzTm9uV2hpdGVzcGFjZVRva2VuKCkge1xuICAgICAgICB2YXIgbiA9IDE7XG4gICAgICAgIHdoaWxlICh0aGlzLnByZXZpb3VzVG9rZW4obikudHlwZSA9PT0gX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5XSElURVNQQUNFKSB7XG4gICAgICAgICAgICBuKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXNUb2tlbihuKTtcbiAgICB9O1xuXG4gICAgRm9ybWF0dGVyLnByb3RvdHlwZS5wcmV2aW91c1Rva2VuID0gZnVuY3Rpb24gcHJldmlvdXNUb2tlbigpIHtcbiAgICAgICAgdmFyIG9mZnNldCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogMTtcblxuICAgICAgICByZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5pbmRleCAtIG9mZnNldF0gfHwge307XG4gICAgfTtcblxuICAgIHJldHVybiBGb3JtYXR0ZXI7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gRm9ybWF0dGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCAiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUHJvdG90eXBlO1xuIiwgIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG92ZXJBcmc7XG4iLCAidmFyIG92ZXJBcmcgPSByZXF1aXJlKCcuL19vdmVyQXJnJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXRpdmVLZXlzO1xuIiwgInZhciBpc1Byb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2lzUHJvdG90eXBlJyksXG4gICAgbmF0aXZlS2V5cyA9IHJlcXVpcmUoJy4vX25hdGl2ZUtleXMnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VLZXlzO1xuIiwgInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcmVKc0RhdGE7XG4iLCAidmFyIGNvcmVKc0RhdGEgPSByZXF1aXJlKCcuL19jb3JlSnNEYXRhJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNNYXNrZWQ7XG4iLCAiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU291cmNlO1xuIiwgInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNNYXNrZWQgPSByZXF1aXJlKCcuL19pc01hc2tlZCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSBpc0Z1bmN0aW9uKHZhbHVlKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNOYXRpdmU7XG4iLCAiLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VmFsdWU7XG4iLCAidmFyIGJhc2VJc05hdGl2ZSA9IHJlcXVpcmUoJy4vX2Jhc2VJc05hdGl2ZScpLFxuICAgIGdldFZhbHVlID0gcmVxdWlyZSgnLi9fZ2V0VmFsdWUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG4iLCAidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBEYXRhVmlldyA9IGdldE5hdGl2ZShyb290LCAnRGF0YVZpZXcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVmlldztcbiIsICJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwO1xuIiwgInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG4iLCAidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNldDtcbiIsICJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWFrTWFwO1xuIiwgInZhciBEYXRhVmlldyA9IHJlcXVpcmUoJy4vX0RhdGFWaWV3JyksXG4gICAgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyksXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJy4vX1Byb21pc2UnKSxcbiAgICBTZXQgPSByZXF1aXJlKCcuL19TZXQnKSxcbiAgICBXZWFrTWFwID0gcmVxdWlyZSgnLi9fV2Vha01hcCcpLFxuICAgIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgdG9Tb3VyY2UgPSByZXF1aXJlKCcuL190b1NvdXJjZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcyA8IDYuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBiYXNlR2V0VGFnKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6ICcnO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFRhZztcbiIsICJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzQXJndW1lbnRzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBhcmdzVGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0FyZ3VtZW50cztcbiIsICJ2YXIgYmFzZUlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9fYmFzZUlzQXJndW1lbnRzJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJndW1lbnRzID0gYmFzZUlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID8gYmFzZUlzQXJndW1lbnRzIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCAiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0dWJGYWxzZTtcbiIsICJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKSxcbiAgICBzdHViRmFsc2UgPSByZXF1aXJlKCcuL3N0dWJGYWxzZScpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQnVmZmVyID0gQnVmZmVyID8gQnVmZmVyLmlzQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4zLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IEJ1ZmZlcigyKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgVWludDhBcnJheSgyKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNCdWZmZXIgPSBuYXRpdmVJc0J1ZmZlciB8fCBzdHViRmFsc2U7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNCdWZmZXI7XG4iLCAidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNUeXBlZEFycmF5YCB3aXRob3V0IE5vZGUuanMgb3B0aW1pemF0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3NbYmFzZUdldFRhZyh2YWx1ZSldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc1R5cGVkQXJyYXk7XG4iLCAiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmFyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBzdG9yaW5nIG1ldGFkYXRhLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuYXJ5KGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VVbmFyeTtcbiIsICJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHByb2Nlc3NgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlUHJvY2VzcyA9IG1vZHVsZUV4cG9ydHMgJiYgZnJlZUdsb2JhbC5wcm9jZXNzO1xuXG4vKiogVXNlZCB0byBhY2Nlc3MgZmFzdGVyIE5vZGUuanMgaGVscGVycy4gKi9cbnZhciBub2RlVXRpbCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICAvLyBVc2UgYHV0aWwudHlwZXNgIGZvciBOb2RlLmpzIDEwKy5cbiAgICB2YXIgdHlwZXMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUucmVxdWlyZSAmJiBmcmVlTW9kdWxlLnJlcXVpcmUoJ3V0aWwnKS50eXBlcztcblxuICAgIGlmICh0eXBlcykge1xuICAgICAgcmV0dXJuIHR5cGVzO1xuICAgIH1cblxuICAgIC8vIExlZ2FjeSBgcHJvY2Vzcy5iaW5kaW5nKCd1dGlsJylgIGZvciBOb2RlLmpzIDwgMTAuXG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBub2RlVXRpbDtcbiIsICJ2YXIgYmFzZUlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vX2Jhc2VJc1R5cGVkQXJyYXknKSxcbiAgICBiYXNlVW5hcnkgPSByZXF1aXJlKCcuL19iYXNlVW5hcnknKSxcbiAgICBub2RlVXRpbCA9IHJlcXVpcmUoJy4vX25vZGVVdGlsJyk7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzVHlwZWRBcnJheSA9IG5vZGVVdGlsICYmIG5vZGVVdGlsLmlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVHlwZWRBcnJheTtcbiIsICJ2YXIgYmFzZUtleXMgPSByZXF1aXJlKCcuL19iYXNlS2V5cycpLFxuICAgIGdldFRhZyA9IHJlcXVpcmUoJy4vX2dldFRhZycpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc0J1ZmZlciA9IHJlcXVpcmUoJy4vaXNCdWZmZXInKSxcbiAgICBpc1Byb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2lzUHJvdG90eXBlJyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9pc1R5cGVkQXJyYXknKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFuIGVtcHR5IG9iamVjdCwgY29sbGVjdGlvbiwgbWFwLCBvciBzZXQuXG4gKlxuICogT2JqZWN0cyBhcmUgY29uc2lkZXJlZCBlbXB0eSBpZiB0aGV5IGhhdmUgbm8gb3duIGVudW1lcmFibGUgc3RyaW5nIGtleWVkXG4gKiBwcm9wZXJ0aWVzLlxuICpcbiAqIEFycmF5LWxpa2UgdmFsdWVzIHN1Y2ggYXMgYGFyZ3VtZW50c2Agb2JqZWN0cywgYXJyYXlzLCBidWZmZXJzLCBzdHJpbmdzLCBvclxuICogalF1ZXJ5LWxpa2UgY29sbGVjdGlvbnMgYXJlIGNvbnNpZGVyZWQgZW1wdHkgaWYgdGhleSBoYXZlIGEgYGxlbmd0aGAgb2YgYDBgLlxuICogU2ltaWxhcmx5LCBtYXBzIGFuZCBzZXRzIGFyZSBjb25zaWRlcmVkIGVtcHR5IGlmIHRoZXkgaGF2ZSBhIGBzaXplYCBvZiBgMGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZW1wdHksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0VtcHR5KG51bGwpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNFbXB0eSh0cnVlKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRW1wdHkoMSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0VtcHR5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNFbXB0eSh7ICdhJzogMSB9KTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoaXNBcnJheUxpa2UodmFsdWUpICYmXG4gICAgICAoaXNBcnJheSh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZS5zcGxpY2UgPT0gJ2Z1bmN0aW9uJyB8fFxuICAgICAgICBpc0J1ZmZlcih2YWx1ZSkgfHwgaXNUeXBlZEFycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpKSB7XG4gICAgcmV0dXJuICF2YWx1ZS5sZW5ndGg7XG4gIH1cbiAgdmFyIHRhZyA9IGdldFRhZyh2YWx1ZSk7XG4gIGlmICh0YWcgPT0gbWFwVGFnIHx8IHRhZyA9PSBzZXRUYWcpIHtcbiAgICByZXR1cm4gIXZhbHVlLnNpemU7XG4gIH1cbiAgaWYgKGlzUHJvdG90eXBlKHZhbHVlKSkge1xuICAgIHJldHVybiAhYmFzZUtleXModmFsdWUpLmxlbmd0aDtcbiAgfVxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VtcHR5O1xuIiwgInZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXIgPSBSZWdFeHAocmVSZWdFeHBDaGFyLnNvdXJjZSk7XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXlwiLCBcIiRcIiwgXCJcXFwiLCBcIi5cIiwgXCIqXCIsIFwiK1wiLFxuICogXCI/XCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiwgXCJ9XCIsIGFuZCBcInxcIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6Ly9sb2Rhc2hcXC5jb20vXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhci50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVzY2FwZVJlZ0V4cDtcbiIsICJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pc0VtcHR5ID0gcmVxdWlyZShcImxvZGFzaC9pc0VtcHR5XCIpO1xuXG52YXIgX2lzRW1wdHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNFbXB0eSk7XG5cbnZhciBfZXNjYXBlUmVnRXhwID0gcmVxdWlyZShcImxvZGFzaC9lc2NhcGVSZWdFeHBcIik7XG5cbnZhciBfZXNjYXBlUmVnRXhwMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VzY2FwZVJlZ0V4cCk7XG5cbnZhciBfdG9rZW5UeXBlcyA9IHJlcXVpcmUoXCIuL3Rva2VuVHlwZXNcIik7XG5cbnZhciBfdG9rZW5UeXBlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90b2tlblR5cGVzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBUb2tlbml6ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNmZ1xuICAgICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcucmVzZXJ2ZWRXb3JkcyBSZXNlcnZlZCB3b3JkcyBpbiBTUUxcbiAgICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnJlc2VydmVkVG9wbGV2ZWxXb3JkcyBXb3JkcyB0aGF0IGFyZSBzZXQgdG8gbmV3IGxpbmUgc2VwYXJhdGVseVxuICAgICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcucmVzZXJ2ZWROZXdsaW5lV29yZHMgV29yZHMgdGhhdCBhcmUgc2V0IHRvIG5ld2xpbmVcbiAgICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnN0cmluZ1R5cGVzIFN0cmluZyB0eXBlcyB0byBlbmFibGU6IFwiXCIsICcnLCBgYCwgW10sIE4nJ1xuICAgICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcub3BlblBhcmVucyBPcGVuaW5nIHBhcmVudGhlc2VzIHRvIGVuYWJsZSwgbGlrZSAoLCBbXG4gICAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5jbG9zZVBhcmVucyBDbG9zaW5nIHBhcmVudGhlc2VzIHRvIGVuYWJsZSwgbGlrZSApLCBdXG4gICAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5pbmRleGVkUGxhY2Vob2xkZXJUeXBlcyBQcmVmaXhlcyBmb3IgaW5kZXhlZCBwbGFjZWhvbGRlcnMsIGxpa2UgP1xuICAgICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzIFByZWZpeGVzIGZvciBuYW1lZCBwbGFjZWhvbGRlcnMsIGxpa2UgQCBhbmQgOlxuICAgICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcubGluZUNvbW1lbnRUeXBlcyBMaW5lIGNvbW1lbnRzIHRvIGVuYWJsZSwgbGlrZSAjIGFuZCAtLVxuICAgICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcuc3BlY2lhbFdvcmRDaGFycyBTcGVjaWFsIGNoYXJzIHRoYXQgY2FuIGJlIGZvdW5kIGluc2lkZSBvZiB3b3JkcywgbGlrZSBAIGFuZCAjXG4gICAgICovXG4gICAgZnVuY3Rpb24gVG9rZW5pemVyKGNmZykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVG9rZW5pemVyKTtcblxuICAgICAgICB0aGlzLldISVRFU1BBQ0VfUkVHRVggPSAvXihcXHMrKS87XG4gICAgICAgIHRoaXMuTlVNQkVSX1JFR0VYID0gL14oKC1cXHMqKT9bMC05XSsoXFwuWzAtOV0rKT98MHhbMC05YS1mQS1GXSt8MGJbMDFdKylcXGIvO1xuICAgICAgICB0aGlzLk9QRVJBVE9SX1JFR0VYID0gL14oIT18PD58PT18PD18Pj18ITx8IT58XFx8XFx8fDo6fC0+PnwtPnx+flxcKnx+fnwhfn5cXCp8IX5+fH5cXCp8IX5cXCp8IX58LikvO1xuXG4gICAgICAgIHRoaXMuQkxPQ0tfQ09NTUVOVF9SRUdFWCA9IC9eKFxcL1xcKlteXSo/KD86XFwqXFwvfCQpKS87XG4gICAgICAgIHRoaXMuTElORV9DT01NRU5UX1JFR0VYID0gdGhpcy5jcmVhdGVMaW5lQ29tbWVudFJlZ2V4KGNmZy5saW5lQ29tbWVudFR5cGVzKTtcblxuICAgICAgICB0aGlzLlJFU0VSVkVEX1RPUExFVkVMX1JFR0VYID0gdGhpcy5jcmVhdGVSZXNlcnZlZFdvcmRSZWdleChjZmcucmVzZXJ2ZWRUb3BsZXZlbFdvcmRzKTtcbiAgICAgICAgdGhpcy5SRVNFUlZFRF9ORVdMSU5FX1JFR0VYID0gdGhpcy5jcmVhdGVSZXNlcnZlZFdvcmRSZWdleChjZmcucmVzZXJ2ZWROZXdsaW5lV29yZHMpO1xuICAgICAgICB0aGlzLlJFU0VSVkVEX1BMQUlOX1JFR0VYID0gdGhpcy5jcmVhdGVSZXNlcnZlZFdvcmRSZWdleChjZmcucmVzZXJ2ZWRXb3Jkcyk7XG5cbiAgICAgICAgdGhpcy5XT1JEX1JFR0VYID0gdGhpcy5jcmVhdGVXb3JkUmVnZXgoY2ZnLnNwZWNpYWxXb3JkQ2hhcnMpO1xuICAgICAgICB0aGlzLlNUUklOR19SRUdFWCA9IHRoaXMuY3JlYXRlU3RyaW5nUmVnZXgoY2ZnLnN0cmluZ1R5cGVzKTtcblxuICAgICAgICB0aGlzLk9QRU5fUEFSRU5fUkVHRVggPSB0aGlzLmNyZWF0ZVBhcmVuUmVnZXgoY2ZnLm9wZW5QYXJlbnMpO1xuICAgICAgICB0aGlzLkNMT1NFX1BBUkVOX1JFR0VYID0gdGhpcy5jcmVhdGVQYXJlblJlZ2V4KGNmZy5jbG9zZVBhcmVucyk7XG5cbiAgICAgICAgdGhpcy5JTkRFWEVEX1BMQUNFSE9MREVSX1JFR0VYID0gdGhpcy5jcmVhdGVQbGFjZWhvbGRlclJlZ2V4KGNmZy5pbmRleGVkUGxhY2Vob2xkZXJUeXBlcywgXCJbMC05XSpcIik7XG4gICAgICAgIHRoaXMuSURFTlRfTkFNRURfUExBQ0VIT0xERVJfUkVHRVggPSB0aGlzLmNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgoY2ZnLm5hbWVkUGxhY2Vob2xkZXJUeXBlcywgXCJbYS16QS1aMC05Ll8kXStcIik7XG4gICAgICAgIHRoaXMuU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYID0gdGhpcy5jcmVhdGVQbGFjZWhvbGRlclJlZ2V4KGNmZy5uYW1lZFBsYWNlaG9sZGVyVHlwZXMsIHRoaXMuY3JlYXRlU3RyaW5nUGF0dGVybihjZmcuc3RyaW5nVHlwZXMpKTtcbiAgICB9XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmNyZWF0ZUxpbmVDb21tZW50UmVnZXggPSBmdW5jdGlvbiBjcmVhdGVMaW5lQ29tbWVudFJlZ2V4KGxpbmVDb21tZW50VHlwZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKCg/OlwiICsgbGluZUNvbW1lbnRUeXBlcy5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHJldHVybiAoMCwgX2VzY2FwZVJlZ0V4cDJbXCJkZWZhdWx0XCJdKShjKTtcbiAgICAgICAgfSkuam9pbihcInxcIikgKyBcIikuKj8oPzpcXG58JCkpXCIpO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4ID0gZnVuY3Rpb24gY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgocmVzZXJ2ZWRXb3Jkcykge1xuICAgICAgICB2YXIgcmVzZXJ2ZWRXb3Jkc1BhdHRlcm4gPSByZXNlcnZlZFdvcmRzLmpvaW4oXCJ8XCIpLnJlcGxhY2UoLyAvZywgXCJcXFxccytcIik7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXihcIiArIHJlc2VydmVkV29yZHNQYXR0ZXJuICsgXCIpXFxcXGJcIiwgXCJpXCIpO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmNyZWF0ZVdvcmRSZWdleCA9IGZ1bmN0aW9uIGNyZWF0ZVdvcmRSZWdleCgpIHtcbiAgICAgICAgdmFyIHNwZWNpYWxDaGFycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKFtcXFxcd1wiICsgc3BlY2lhbENoYXJzLmpvaW4oXCJcIikgKyBcIl0rKVwiKTtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5jcmVhdGVTdHJpbmdSZWdleCA9IGZ1bmN0aW9uIGNyZWF0ZVN0cmluZ1JlZ2V4KHN0cmluZ1R5cGVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXihcIiArIHRoaXMuY3JlYXRlU3RyaW5nUGF0dGVybihzdHJpbmdUeXBlcykgKyBcIilcIik7XG4gICAgfTtcblxuICAgIC8vIFRoaXMgZW5hYmxlcyB0aGUgZm9sbG93aW5nIHN0cmluZyBwYXR0ZXJuczpcbiAgICAvLyAxLiBiYWNrdGljayBxdW90ZWQgc3RyaW5nIHVzaW5nIGBgIHRvIGVzY2FwZVxuICAgIC8vIDIuIHNxdWFyZSBicmFja2V0IHF1b3RlZCBzdHJpbmcgKFNRTCBTZXJ2ZXIpIHVzaW5nIF1dIHRvIGVzY2FwZVxuICAgIC8vIDMuIGRvdWJsZSBxdW90ZWQgc3RyaW5nIHVzaW5nIFwiXCIgb3IgXFxcIiB0byBlc2NhcGVcbiAgICAvLyA0LiBzaW5nbGUgcXVvdGVkIHN0cmluZyB1c2luZyAnJyBvciBcXCcgdG8gZXNjYXBlXG4gICAgLy8gNS4gbmF0aW9uYWwgY2hhcmFjdGVyIHF1b3RlZCBzdHJpbmcgdXNpbmcgTicnIG9yIE5cXCcgdG8gZXNjYXBlXG5cblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuY3JlYXRlU3RyaW5nUGF0dGVybiA9IGZ1bmN0aW9uIGNyZWF0ZVN0cmluZ1BhdHRlcm4oc3RyaW5nVHlwZXMpIHtcbiAgICAgICAgdmFyIHBhdHRlcm5zID0ge1xuICAgICAgICAgICAgXCJgYFwiOiBcIigoYFteYF0qKCR8YCkpKylcIixcbiAgICAgICAgICAgIFwiW11cIjogXCIoKFxcXFxbW15cXFxcXV0qKCR8XFxcXF0pKShcXFxcXVteXFxcXF1dKigkfFxcXFxdKSkqKVwiLFxuICAgICAgICAgICAgXCJcXFwiXFxcIlwiOiBcIigoXFxcIlteXFxcIlxcXFxcXFxcXSooPzpcXFxcXFxcXC5bXlxcXCJcXFxcXFxcXF0qKSooXFxcInwkKSkrKVwiLFxuICAgICAgICAgICAgXCInJ1wiOiBcIigoJ1teJ1xcXFxcXFxcXSooPzpcXFxcXFxcXC5bXidcXFxcXFxcXF0qKSooJ3wkKSkrKVwiLFxuICAgICAgICAgICAgXCJOJydcIjogXCIoKE4nW15OJ1xcXFxcXFxcXSooPzpcXFxcXFxcXC5bXk4nXFxcXFxcXFxdKikqKCd8JCkpKylcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzdHJpbmdUeXBlcy5tYXAoZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXR0ZXJuc1t0XTtcbiAgICAgICAgfSkuam9pbihcInxcIik7XG4gICAgfTtcblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuY3JlYXRlUGFyZW5SZWdleCA9IGZ1bmN0aW9uIGNyZWF0ZVBhcmVuUmVnZXgocGFyZW5zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKFwiICsgcGFyZW5zLm1hcChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLmVzY2FwZVBhcmVuKHApO1xuICAgICAgICB9KS5qb2luKFwifFwiKSArIFwiKVwiLCBcImlcIik7XG4gICAgfTtcblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuZXNjYXBlUGFyZW4gPSBmdW5jdGlvbiBlc2NhcGVQYXJlbihwYXJlbikge1xuICAgICAgICBpZiAocGFyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAvLyBBIHNpbmdsZSBwdW5jdHVhdGlvbiBjaGFyYWN0ZXJcbiAgICAgICAgICAgIHJldHVybiAoMCwgX2VzY2FwZVJlZ0V4cDJbXCJkZWZhdWx0XCJdKShwYXJlbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBsb25nZXIgd29yZFxuICAgICAgICAgICAgcmV0dXJuIFwiXFxcXGJcIiArIHBhcmVuICsgXCJcXFxcYlwiO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuY3JlYXRlUGxhY2Vob2xkZXJSZWdleCA9IGZ1bmN0aW9uIGNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgodHlwZXMsIHBhdHRlcm4pIHtcbiAgICAgICAgaWYgKCgwLCBfaXNFbXB0eTJbXCJkZWZhdWx0XCJdKSh0eXBlcykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdHlwZXNSZWdleCA9IHR5cGVzLm1hcChfZXNjYXBlUmVnRXhwMltcImRlZmF1bHRcIl0pLmpvaW4oXCJ8XCIpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXigoPzpcIiArIHR5cGVzUmVnZXggKyBcIikoPzpcIiArIHBhdHRlcm4gKyBcIikpXCIpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIFNRTCBzdHJpbmcgYW5kIGJyZWFrcyBpdCBpbnRvIHRva2Vucy5cbiAgICAgKiBFYWNoIHRva2VuIGlzIGFuIG9iamVjdCB3aXRoIHR5cGUgYW5kIHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBTUUwgc3RyaW5nXG4gICAgICogQHJldHVybiB7T2JqZWN0W119IHRva2VucyBBbiBhcnJheSBvZiB0b2tlbnMuXG4gICAgICogIEByZXR1cm4ge1N0cmluZ30gdG9rZW4udHlwZVxuICAgICAqICBAcmV0dXJuIHtTdHJpbmd9IHRva2VuLnZhbHVlXG4gICAgICovXG5cblxuICAgIFRva2VuaXplci5wcm90b3R5cGUudG9rZW5pemUgPSBmdW5jdGlvbiB0b2tlbml6ZShpbnB1dCkge1xuICAgICAgICB2YXIgdG9rZW5zID0gW107XG4gICAgICAgIHZhciB0b2tlbiA9IHZvaWQgMDtcblxuICAgICAgICAvLyBLZWVwIHByb2Nlc3NpbmcgdGhlIHN0cmluZyB1bnRpbCBpdCBpcyBlbXB0eVxuICAgICAgICB3aGlsZSAoaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIG5leHQgdG9rZW4gYW5kIHRoZSB0b2tlbiB0eXBlXG4gICAgICAgICAgICB0b2tlbiA9IHRoaXMuZ2V0TmV4dFRva2VuKGlucHV0LCB0b2tlbik7XG4gICAgICAgICAgICAvLyBBZHZhbmNlIHRoZSBzdHJpbmdcbiAgICAgICAgICAgIGlucHV0ID0gaW5wdXQuc3Vic3RyaW5nKHRva2VuLnZhbHVlLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9rZW5zO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmdldE5leHRUb2tlbiA9IGZ1bmN0aW9uIGdldE5leHRUb2tlbihpbnB1dCwgcHJldmlvdXNUb2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRXaGl0ZXNwYWNlVG9rZW4oaW5wdXQpIHx8IHRoaXMuZ2V0Q29tbWVudFRva2VuKGlucHV0KSB8fCB0aGlzLmdldFN0cmluZ1Rva2VuKGlucHV0KSB8fCB0aGlzLmdldE9wZW5QYXJlblRva2VuKGlucHV0KSB8fCB0aGlzLmdldENsb3NlUGFyZW5Ub2tlbihpbnB1dCkgfHwgdGhpcy5nZXRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB8fCB0aGlzLmdldE51bWJlclRva2VuKGlucHV0KSB8fCB0aGlzLmdldFJlc2VydmVkV29yZFRva2VuKGlucHV0LCBwcmV2aW91c1Rva2VuKSB8fCB0aGlzLmdldFdvcmRUb2tlbihpbnB1dCkgfHwgdGhpcy5nZXRPcGVyYXRvclRva2VuKGlucHV0KTtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXRXaGl0ZXNwYWNlVG9rZW4gPSBmdW5jdGlvbiBnZXRXaGl0ZXNwYWNlVG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgdHlwZTogX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5XSElURVNQQUNFLFxuICAgICAgICAgICAgcmVnZXg6IHRoaXMuV0hJVEVTUEFDRV9SRUdFWFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXRDb21tZW50VG9rZW4gPSBmdW5jdGlvbiBnZXRDb21tZW50VG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGluZUNvbW1lbnRUb2tlbihpbnB1dCkgfHwgdGhpcy5nZXRCbG9ja0NvbW1lbnRUb2tlbihpbnB1dCk7XG4gICAgfTtcblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuZ2V0TGluZUNvbW1lbnRUb2tlbiA9IGZ1bmN0aW9uIGdldExpbmVDb21tZW50VG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgdHlwZTogX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5MSU5FX0NPTU1FTlQsXG4gICAgICAgICAgICByZWdleDogdGhpcy5MSU5FX0NPTU1FTlRfUkVHRVhcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuZ2V0QmxvY2tDb21tZW50VG9rZW4gPSBmdW5jdGlvbiBnZXRCbG9ja0NvbW1lbnRUb2tlbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICAgICAgICBpbnB1dDogaW5wdXQsXG4gICAgICAgICAgICB0eXBlOiBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLkJMT0NLX0NPTU1FTlQsXG4gICAgICAgICAgICByZWdleDogdGhpcy5CTE9DS19DT01NRU5UX1JFR0VYXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmdldFN0cmluZ1Rva2VuID0gZnVuY3Rpb24gZ2V0U3RyaW5nVG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgdHlwZTogX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5TVFJJTkcsXG4gICAgICAgICAgICByZWdleDogdGhpcy5TVFJJTkdfUkVHRVhcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuZ2V0T3BlblBhcmVuVG9rZW4gPSBmdW5jdGlvbiBnZXRPcGVuUGFyZW5Ub2tlbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICAgICAgICBpbnB1dDogaW5wdXQsXG4gICAgICAgICAgICB0eXBlOiBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLk9QRU5fUEFSRU4sXG4gICAgICAgICAgICByZWdleDogdGhpcy5PUEVOX1BBUkVOX1JFR0VYXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmdldENsb3NlUGFyZW5Ub2tlbiA9IGZ1bmN0aW9uIGdldENsb3NlUGFyZW5Ub2tlbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICAgICAgICBpbnB1dDogaW5wdXQsXG4gICAgICAgICAgICB0eXBlOiBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLkNMT1NFX1BBUkVOLFxuICAgICAgICAgICAgcmVnZXg6IHRoaXMuQ0xPU0VfUEFSRU5fUkVHRVhcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuZ2V0UGxhY2Vob2xkZXJUb2tlbiA9IGZ1bmN0aW9uIGdldFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SWRlbnROYW1lZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHx8IHRoaXMuZ2V0U3RyaW5nTmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB8fCB0aGlzLmdldEluZGV4ZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KTtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXRJZGVudE5hbWVkUGxhY2Vob2xkZXJUb2tlbiA9IGZ1bmN0aW9uIGdldElkZW50TmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHtcbiAgICAgICAgICAgIGlucHV0OiBpbnB1dCxcbiAgICAgICAgICAgIHJlZ2V4OiB0aGlzLklERU5UX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYLFxuICAgICAgICAgICAgcGFyc2VLZXk6IGZ1bmN0aW9uIHBhcnNlS2V5KHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdi5zbGljZSgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuZ2V0U3RyaW5nTmFtZWRQbGFjZWhvbGRlclRva2VuID0gZnVuY3Rpb24gZ2V0U3RyaW5nTmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHtcbiAgICAgICAgICAgIGlucHV0OiBpbnB1dCxcbiAgICAgICAgICAgIHJlZ2V4OiB0aGlzLlNUUklOR19OQU1FRF9QTEFDRUhPTERFUl9SRUdFWCxcbiAgICAgICAgICAgIHBhcnNlS2V5OiBmdW5jdGlvbiBwYXJzZUtleSh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5nZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkoeyBrZXk6IHYuc2xpY2UoMiwgLTEpLCBxdW90ZUNoYXI6IHYuc2xpY2UoLTEpIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXRJbmRleGVkUGxhY2Vob2xkZXJUb2tlbiA9IGZ1bmN0aW9uIGdldEluZGV4ZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHtcbiAgICAgICAgICAgIGlucHV0OiBpbnB1dCxcbiAgICAgICAgICAgIHJlZ2V4OiB0aGlzLklOREVYRURfUExBQ0VIT0xERVJfUkVHRVgsXG4gICAgICAgICAgICBwYXJzZUtleTogZnVuY3Rpb24gcGFyc2VLZXkodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2LnNsaWNlKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXRQbGFjZWhvbGRlclRva2VuV2l0aEtleSA9IGZ1bmN0aW9uIGdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KF9yZWYpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gX3JlZi5pbnB1dCxcbiAgICAgICAgICAgIHJlZ2V4ID0gX3JlZi5yZWdleCxcbiAgICAgICAgICAgIHBhcnNlS2V5ID0gX3JlZi5wYXJzZUtleTtcblxuICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHsgaW5wdXQ6IGlucHV0LCByZWdleDogcmVnZXgsIHR5cGU6IF90b2tlblR5cGVzMltcImRlZmF1bHRcIl0uUExBQ0VIT0xERVIgfSk7XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgdG9rZW4ua2V5ID0gcGFyc2VLZXkodG9rZW4udmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkgPSBmdW5jdGlvbiBnZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkoX3JlZjIpIHtcbiAgICAgICAgdmFyIGtleSA9IF9yZWYyLmtleSxcbiAgICAgICAgICAgIHF1b3RlQ2hhciA9IF9yZWYyLnF1b3RlQ2hhcjtcblxuICAgICAgICByZXR1cm4ga2V5LnJlcGxhY2UobmV3IFJlZ0V4cCgoMCwgX2VzY2FwZVJlZ0V4cDJbXCJkZWZhdWx0XCJdKShcIlxcXFxcIikgKyBxdW90ZUNoYXIsIFwiZ1wiKSwgcXVvdGVDaGFyKTtcbiAgICB9O1xuXG4gICAgLy8gRGVjaW1hbCwgYmluYXJ5LCBvciBoZXggbnVtYmVyc1xuXG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmdldE51bWJlclRva2VuID0gZnVuY3Rpb24gZ2V0TnVtYmVyVG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgdHlwZTogX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5OVU1CRVIsXG4gICAgICAgICAgICByZWdleDogdGhpcy5OVU1CRVJfUkVHRVhcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIFB1bmN0dWF0aW9uIGFuZCBzeW1ib2xzXG5cblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuZ2V0T3BlcmF0b3JUb2tlbiA9IGZ1bmN0aW9uIGdldE9wZXJhdG9yVG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgdHlwZTogX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5PUEVSQVRPUixcbiAgICAgICAgICAgIHJlZ2V4OiB0aGlzLk9QRVJBVE9SX1JFR0VYXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmdldFJlc2VydmVkV29yZFRva2VuID0gZnVuY3Rpb24gZ2V0UmVzZXJ2ZWRXb3JkVG9rZW4oaW5wdXQsIHByZXZpb3VzVG9rZW4pIHtcbiAgICAgICAgLy8gQSByZXNlcnZlZCB3b3JkIGNhbm5vdCBiZSBwcmVjZWRlZCBieSBhIFwiLlwiXG4gICAgICAgIC8vIHRoaXMgbWFrZXMgaXQgc28gaW4gXCJteXRhYmxlLmZyb21cIiwgXCJmcm9tXCIgaXMgbm90IGNvbnNpZGVyZWQgYSByZXNlcnZlZCB3b3JkXG4gICAgICAgIGlmIChwcmV2aW91c1Rva2VuICYmIHByZXZpb3VzVG9rZW4udmFsdWUgJiYgcHJldmlvdXNUb2tlbi52YWx1ZSA9PT0gXCIuXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb3BsZXZlbFJlc2VydmVkVG9rZW4oaW5wdXQpIHx8IHRoaXMuZ2V0TmV3bGluZVJlc2VydmVkVG9rZW4oaW5wdXQpIHx8IHRoaXMuZ2V0UGxhaW5SZXNlcnZlZFRva2VuKGlucHV0KTtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXRUb3BsZXZlbFJlc2VydmVkVG9rZW4gPSBmdW5jdGlvbiBnZXRUb3BsZXZlbFJlc2VydmVkVG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgdHlwZTogX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5SRVNFUlZFRF9UT1BMRVZFTCxcbiAgICAgICAgICAgIHJlZ2V4OiB0aGlzLlJFU0VSVkVEX1RPUExFVkVMX1JFR0VYXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmdldE5ld2xpbmVSZXNlcnZlZFRva2VuID0gZnVuY3Rpb24gZ2V0TmV3bGluZVJlc2VydmVkVG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgdHlwZTogX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5SRVNFUlZFRF9ORVdMSU5FLFxuICAgICAgICAgICAgcmVnZXg6IHRoaXMuUkVTRVJWRURfTkVXTElORV9SRUdFWFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXRQbGFpblJlc2VydmVkVG9rZW4gPSBmdW5jdGlvbiBnZXRQbGFpblJlc2VydmVkVG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgdHlwZTogX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5SRVNFUlZFRCxcbiAgICAgICAgICAgIHJlZ2V4OiB0aGlzLlJFU0VSVkVEX1BMQUlOX1JFR0VYXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmdldFdvcmRUb2tlbiA9IGZ1bmN0aW9uIGdldFdvcmRUb2tlbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICAgICAgICBpbnB1dDogaW5wdXQsXG4gICAgICAgICAgICB0eXBlOiBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLldPUkQsXG4gICAgICAgICAgICByZWdleDogdGhpcy5XT1JEX1JFR0VYXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmdldFRva2VuT25GaXJzdE1hdGNoID0gZnVuY3Rpb24gZ2V0VG9rZW5PbkZpcnN0TWF0Y2goX3JlZjMpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gX3JlZjMuaW5wdXQsXG4gICAgICAgICAgICB0eXBlID0gX3JlZjMudHlwZSxcbiAgICAgICAgICAgIHJlZ2V4ID0gX3JlZjMucmVnZXg7XG5cbiAgICAgICAgdmFyIG1hdGNoZXMgPSBpbnB1dC5tYXRjaChyZWdleCk7XG5cbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IHR5cGUsIHZhbHVlOiBtYXRjaGVzWzFdIH07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIFRva2VuaXplcjtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBUb2tlbml6ZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsICJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9Gb3JtYXR0ZXIgPSByZXF1aXJlKFwiLi4vY29yZS9Gb3JtYXR0ZXJcIik7XG5cbnZhciBfRm9ybWF0dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Zvcm1hdHRlcik7XG5cbnZhciBfVG9rZW5pemVyID0gcmVxdWlyZShcIi4uL2NvcmUvVG9rZW5pemVyXCIpO1xuXG52YXIgX1Rva2VuaXplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Ub2tlbml6ZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIHJlc2VydmVkV29yZHMgPSBbXCJBQlNcIiwgXCJBQ1RJVkFURVwiLCBcIkFMSUFTXCIsIFwiQUxMXCIsIFwiQUxMT0NBVEVcIiwgXCJBTExPV1wiLCBcIkFMVEVSXCIsIFwiQU5ZXCIsIFwiQVJFXCIsIFwiQVJSQVlcIiwgXCJBU1wiLCBcIkFTQ1wiLCBcIkFTRU5TSVRJVkVcIiwgXCJBU1NPQ0lBVEVcIiwgXCJBU1VUSU1FXCIsIFwiQVNZTU1FVFJJQ1wiLCBcIkFUXCIsIFwiQVRPTUlDXCIsIFwiQVRUUklCVVRFU1wiLCBcIkFVRElUXCIsIFwiQVVUSE9SSVpBVElPTlwiLCBcIkFVWFwiLCBcIkFVWElMSUFSWVwiLCBcIkFWR1wiLCBcIkJFRk9SRVwiLCBcIkJFR0lOXCIsIFwiQkVUV0VFTlwiLCBcIkJJR0lOVFwiLCBcIkJJTkFSWVwiLCBcIkJMT0JcIiwgXCJCT09MRUFOXCIsIFwiQk9USFwiLCBcIkJVRkZFUlBPT0xcIiwgXCJCWVwiLCBcIkNBQ0hFXCIsIFwiQ0FMTFwiLCBcIkNBTExFRFwiLCBcIkNBUFRVUkVcIiwgXCJDQVJESU5BTElUWVwiLCBcIkNBU0NBREVEXCIsIFwiQ0FTRVwiLCBcIkNBU1RcIiwgXCJDQ1NJRFwiLCBcIkNFSUxcIiwgXCJDRUlMSU5HXCIsIFwiQ0hBUlwiLCBcIkNIQVJBQ1RFUlwiLCBcIkNIQVJBQ1RFUl9MRU5HVEhcIiwgXCJDSEFSX0xFTkdUSFwiLCBcIkNIRUNLXCIsIFwiQ0xPQlwiLCBcIkNMT05FXCIsIFwiQ0xPU0VcIiwgXCJDTFVTVEVSXCIsIFwiQ09BTEVTQ0VcIiwgXCJDT0xMQVRFXCIsIFwiQ09MTEVDVFwiLCBcIkNPTExFQ1RJT05cIiwgXCJDT0xMSURcIiwgXCJDT0xVTU5cIiwgXCJDT01NRU5UXCIsIFwiQ09NTUlUXCIsIFwiQ09OQ0FUXCIsIFwiQ09ORElUSU9OXCIsIFwiQ09OTkVDVFwiLCBcIkNPTk5FQ1RJT05cIiwgXCJDT05TVFJBSU5UXCIsIFwiQ09OVEFJTlNcIiwgXCJDT05USU5VRVwiLCBcIkNPTlZFUlRcIiwgXCJDT1JSXCIsIFwiQ09SUkVTUE9ORElOR1wiLCBcIkNPVU5UXCIsIFwiQ09VTlRfQklHXCIsIFwiQ09WQVJfUE9QXCIsIFwiQ09WQVJfU0FNUFwiLCBcIkNSRUFURVwiLCBcIkNST1NTXCIsIFwiQ1VCRVwiLCBcIkNVTUVfRElTVFwiLCBcIkNVUlJFTlRcIiwgXCJDVVJSRU5UX0RBVEVcIiwgXCJDVVJSRU5UX0RFRkFVTFRfVFJBTlNGT1JNX0dST1VQXCIsIFwiQ1VSUkVOVF9MQ19DVFlQRVwiLCBcIkNVUlJFTlRfUEFUSFwiLCBcIkNVUlJFTlRfUk9MRVwiLCBcIkNVUlJFTlRfU0NIRU1BXCIsIFwiQ1VSUkVOVF9TRVJWRVJcIiwgXCJDVVJSRU5UX1RJTUVcIiwgXCJDVVJSRU5UX1RJTUVTVEFNUFwiLCBcIkNVUlJFTlRfVElNRVpPTkVcIiwgXCJDVVJSRU5UX1RSQU5TRk9STV9HUk9VUF9GT1JfVFlQRVwiLCBcIkNVUlJFTlRfVVNFUlwiLCBcIkNVUlNPUlwiLCBcIkNZQ0xFXCIsIFwiREFUQVwiLCBcIkRBVEFCQVNFXCIsIFwiREFUQVBBUlRJVElPTk5BTUVcIiwgXCJEQVRBUEFSVElUSU9OTlVNXCIsIFwiREFURVwiLCBcIkRBWVwiLCBcIkRBWVNcIiwgXCJEQjJHRU5FUkFMXCIsIFwiREIyR0VOUkxcIiwgXCJEQjJTUUxcIiwgXCJEQklORk9cIiwgXCJEQlBBUlRJVElPTk5BTUVcIiwgXCJEQlBBUlRJVElPTk5VTVwiLCBcIkRFQUxMT0NBVEVcIiwgXCJERUNcIiwgXCJERUNJTUFMXCIsIFwiREVDTEFSRVwiLCBcIkRFRkFVTFRcIiwgXCJERUZBVUxUU1wiLCBcIkRFRklOSVRJT05cIiwgXCJERUxFVEVcIiwgXCJERU5TRVJBTktcIiwgXCJERU5TRV9SQU5LXCIsIFwiREVSRUZcIiwgXCJERVNDUklCRVwiLCBcIkRFU0NSSVBUT1JcIiwgXCJERVRFUk1JTklTVElDXCIsIFwiRElBR05PU1RJQ1NcIiwgXCJESVNBQkxFXCIsIFwiRElTQUxMT1dcIiwgXCJESVNDT05ORUNUXCIsIFwiRElTVElOQ1RcIiwgXCJET1wiLCBcIkRPQ1VNRU5UXCIsIFwiRE9VQkxFXCIsIFwiRFJPUFwiLCBcIkRTU0laRVwiLCBcIkRZTkFNSUNcIiwgXCJFQUNIXCIsIFwiRURJVFBST0NcIiwgXCJFTEVNRU5UXCIsIFwiRUxTRVwiLCBcIkVMU0VJRlwiLCBcIkVOQUJMRVwiLCBcIkVOQ09ESU5HXCIsIFwiRU5DUllQVElPTlwiLCBcIkVORFwiLCBcIkVORC1FWEVDXCIsIFwiRU5ESU5HXCIsIFwiRVJBU0VcIiwgXCJFU0NBUEVcIiwgXCJFVkVSWVwiLCBcIkVYQ0VQVElPTlwiLCBcIkVYQ0xVRElOR1wiLCBcIkVYQ0xVU0lWRVwiLCBcIkVYRUNcIiwgXCJFWEVDVVRFXCIsIFwiRVhJU1RTXCIsIFwiRVhJVFwiLCBcIkVYUFwiLCBcIkVYUExBSU5cIiwgXCJFWFRFTkRFRFwiLCBcIkVYVEVSTkFMXCIsIFwiRVhUUkFDVFwiLCBcIkZBTFNFXCIsIFwiRkVOQ0VEXCIsIFwiRkVUQ0hcIiwgXCJGSUVMRFBST0NcIiwgXCJGSUxFXCIsIFwiRklMVEVSXCIsIFwiRklOQUxcIiwgXCJGSVJTVFwiLCBcIkZMT0FUXCIsIFwiRkxPT1JcIiwgXCJGT1JcIiwgXCJGT1JFSUdOXCIsIFwiRlJFRVwiLCBcIkZVTExcIiwgXCJGVU5DVElPTlwiLCBcIkZVU0lPTlwiLCBcIkdFTkVSQUxcIiwgXCJHRU5FUkFURURcIiwgXCJHRVRcIiwgXCJHTE9CQUxcIiwgXCJHT1RPXCIsIFwiR1JBTlRcIiwgXCJHUkFQSElDXCIsIFwiR1JPVVBcIiwgXCJHUk9VUElOR1wiLCBcIkhBTkRMRVJcIiwgXCJIQVNIXCIsIFwiSEFTSEVEX1ZBTFVFXCIsIFwiSElOVFwiLCBcIkhPTERcIiwgXCJIT1VSXCIsIFwiSE9VUlNcIiwgXCJJREVOVElUWVwiLCBcIklGXCIsIFwiSU1NRURJQVRFXCIsIFwiSU5cIiwgXCJJTkNMVURJTkdcIiwgXCJJTkNMVVNJVkVcIiwgXCJJTkNSRU1FTlRcIiwgXCJJTkRFWFwiLCBcIklORElDQVRPUlwiLCBcIklORElDQVRPUlNcIiwgXCJJTkZcIiwgXCJJTkZJTklUWVwiLCBcIklOSEVSSVRcIiwgXCJJTk5FUlwiLCBcIklOT1VUXCIsIFwiSU5TRU5TSVRJVkVcIiwgXCJJTlNFUlRcIiwgXCJJTlRcIiwgXCJJTlRFR0VSXCIsIFwiSU5URUdSSVRZXCIsIFwiSU5URVJTRUNUSU9OXCIsIFwiSU5URVJWQUxcIiwgXCJJTlRPXCIsIFwiSVNcIiwgXCJJU09CSURcIiwgXCJJU09MQVRJT05cIiwgXCJJVEVSQVRFXCIsIFwiSkFSXCIsIFwiSkFWQVwiLCBcIktFRVBcIiwgXCJLRVlcIiwgXCJMQUJFTFwiLCBcIkxBTkdVQUdFXCIsIFwiTEFSR0VcIiwgXCJMQVRFUkFMXCIsIFwiTENfQ1RZUEVcIiwgXCJMRUFESU5HXCIsIFwiTEVBVkVcIiwgXCJMRUZUXCIsIFwiTElLRVwiLCBcIkxJTktUWVBFXCIsIFwiTE5cIiwgXCJMT0NBTFwiLCBcIkxPQ0FMREFURVwiLCBcIkxPQ0FMRVwiLCBcIkxPQ0FMVElNRVwiLCBcIkxPQ0FMVElNRVNUQU1QXCIsIFwiTE9DQVRPUlwiLCBcIkxPQ0FUT1JTXCIsIFwiTE9DS1wiLCBcIkxPQ0tNQVhcIiwgXCJMT0NLU0laRVwiLCBcIkxPTkdcIiwgXCJMT09QXCIsIFwiTE9XRVJcIiwgXCJNQUlOVEFJTkVEXCIsIFwiTUFUQ0hcIiwgXCJNQVRFUklBTElaRURcIiwgXCJNQVhcIiwgXCJNQVhWQUxVRVwiLCBcIk1FTUJFUlwiLCBcIk1FUkdFXCIsIFwiTUVUSE9EXCIsIFwiTUlDUk9TRUNPTkRcIiwgXCJNSUNST1NFQ09ORFNcIiwgXCJNSU5cIiwgXCJNSU5VVEVcIiwgXCJNSU5VVEVTXCIsIFwiTUlOVkFMVUVcIiwgXCJNT0RcIiwgXCJNT0RFXCIsIFwiTU9ESUZJRVNcIiwgXCJNT0RVTEVcIiwgXCJNT05USFwiLCBcIk1PTlRIU1wiLCBcIk1VTFRJU0VUXCIsIFwiTkFOXCIsIFwiTkFUSU9OQUxcIiwgXCJOQVRVUkFMXCIsIFwiTkNIQVJcIiwgXCJOQ0xPQlwiLCBcIk5FV1wiLCBcIk5FV19UQUJMRVwiLCBcIk5FWFRWQUxcIiwgXCJOT1wiLCBcIk5PQ0FDSEVcIiwgXCJOT0NZQ0xFXCIsIFwiTk9ERU5BTUVcIiwgXCJOT0RFTlVNQkVSXCIsIFwiTk9NQVhWQUxVRVwiLCBcIk5PTUlOVkFMVUVcIiwgXCJOT05FXCIsIFwiTk9PUkRFUlwiLCBcIk5PUk1BTElaRVwiLCBcIk5PUk1BTElaRURcIiwgXCJOT1RcIiwgXCJOVUxMXCIsIFwiTlVMTElGXCIsIFwiTlVMTFNcIiwgXCJOVU1FUklDXCIsIFwiTlVNUEFSVFNcIiwgXCJPQklEXCIsIFwiT0NURVRfTEVOR1RIXCIsIFwiT0ZcIiwgXCJPRkZTRVRcIiwgXCJPTERcIiwgXCJPTERfVEFCTEVcIiwgXCJPTlwiLCBcIk9OTFlcIiwgXCJPUEVOXCIsIFwiT1BUSU1JWkFUSU9OXCIsIFwiT1BUSU1JWkVcIiwgXCJPUFRJT05cIiwgXCJPUkRFUlwiLCBcIk9VVFwiLCBcIk9VVEVSXCIsIFwiT1ZFUlwiLCBcIk9WRVJMQVBTXCIsIFwiT1ZFUkxBWVwiLCBcIk9WRVJSSURJTkdcIiwgXCJQQUNLQUdFXCIsIFwiUEFEREVEXCIsIFwiUEFHRVNJWkVcIiwgXCJQQVJBTUVURVJcIiwgXCJQQVJUXCIsIFwiUEFSVElUSU9OXCIsIFwiUEFSVElUSU9ORURcIiwgXCJQQVJUSVRJT05JTkdcIiwgXCJQQVJUSVRJT05TXCIsIFwiUEFTU1dPUkRcIiwgXCJQQVRIXCIsIFwiUEVSQ0VOVElMRV9DT05UXCIsIFwiUEVSQ0VOVElMRV9ESVNDXCIsIFwiUEVSQ0VOVF9SQU5LXCIsIFwiUElFQ0VTSVpFXCIsIFwiUExBTlwiLCBcIlBPU0lUSU9OXCIsIFwiUE9XRVJcIiwgXCJQUkVDSVNJT05cIiwgXCJQUkVQQVJFXCIsIFwiUFJFVlZBTFwiLCBcIlBSSU1BUllcIiwgXCJQUklRVFlcIiwgXCJQUklWSUxFR0VTXCIsIFwiUFJPQ0VEVVJFXCIsIFwiUFJPR1JBTVwiLCBcIlBTSURcIiwgXCJQVUJMSUNcIiwgXCJRVUVSWVwiLCBcIlFVRVJZTk9cIiwgXCJSQU5HRVwiLCBcIlJBTktcIiwgXCJSRUFEXCIsIFwiUkVBRFNcIiwgXCJSRUFMXCIsIFwiUkVDT1ZFUllcIiwgXCJSRUNVUlNJVkVcIiwgXCJSRUZcIiwgXCJSRUZFUkVOQ0VTXCIsIFwiUkVGRVJFTkNJTkdcIiwgXCJSRUZSRVNIXCIsIFwiUkVHUl9BVkdYXCIsIFwiUkVHUl9BVkdZXCIsIFwiUkVHUl9DT1VOVFwiLCBcIlJFR1JfSU5URVJDRVBUXCIsIFwiUkVHUl9SMlwiLCBcIlJFR1JfU0xPUEVcIiwgXCJSRUdSX1NYWFwiLCBcIlJFR1JfU1hZXCIsIFwiUkVHUl9TWVlcIiwgXCJSRUxFQVNFXCIsIFwiUkVOQU1FXCIsIFwiUkVQRUFUXCIsIFwiUkVTRVRcIiwgXCJSRVNJR05BTFwiLCBcIlJFU1RBUlRcIiwgXCJSRVNUUklDVFwiLCBcIlJFU1VMVFwiLCBcIlJFU1VMVF9TRVRfTE9DQVRPUlwiLCBcIlJFVFVSTlwiLCBcIlJFVFVSTlNcIiwgXCJSRVZPS0VcIiwgXCJSSUdIVFwiLCBcIlJPTEVcIiwgXCJST0xMQkFDS1wiLCBcIlJPTExVUFwiLCBcIlJPVU5EX0NFSUxJTkdcIiwgXCJST1VORF9ET1dOXCIsIFwiUk9VTkRfRkxPT1JcIiwgXCJST1VORF9IQUxGX0RPV05cIiwgXCJST1VORF9IQUxGX0VWRU5cIiwgXCJST1VORF9IQUxGX1VQXCIsIFwiUk9VTkRfVVBcIiwgXCJST1VUSU5FXCIsIFwiUk9XXCIsIFwiUk9XTlVNQkVSXCIsIFwiUk9XU1wiLCBcIlJPV1NFVFwiLCBcIlJPV19OVU1CRVJcIiwgXCJSUk5cIiwgXCJSVU5cIiwgXCJTQVZFUE9JTlRcIiwgXCJTQ0hFTUFcIiwgXCJTQ09QRVwiLCBcIlNDUkFUQ0hQQURcIiwgXCJTQ1JPTExcIiwgXCJTRUFSQ0hcIiwgXCJTRUNPTkRcIiwgXCJTRUNPTkRTXCIsIFwiU0VDUVRZXCIsIFwiU0VDVVJJVFlcIiwgXCJTRU5TSVRJVkVcIiwgXCJTRVFVRU5DRVwiLCBcIlNFU1NJT05cIiwgXCJTRVNTSU9OX1VTRVJcIiwgXCJTSUdOQUxcIiwgXCJTSU1JTEFSXCIsIFwiU0lNUExFXCIsIFwiU01BTExJTlRcIiwgXCJTTkFOXCIsIFwiU09NRVwiLCBcIlNPVVJDRVwiLCBcIlNQRUNJRklDXCIsIFwiU1BFQ0lGSUNUWVBFXCIsIFwiU1FMXCIsIFwiU1FMRVhDRVBUSU9OXCIsIFwiU1FMSURcIiwgXCJTUUxTVEFURVwiLCBcIlNRTFdBUk5JTkdcIiwgXCJTUVJUXCIsIFwiU1RBQ0tFRFwiLCBcIlNUQU5EQVJEXCIsIFwiU1RBUlRcIiwgXCJTVEFSVElOR1wiLCBcIlNUQVRFTUVOVFwiLCBcIlNUQVRJQ1wiLCBcIlNUQVRNRU5UXCIsIFwiU1RBWVwiLCBcIlNURERFVl9QT1BcIiwgXCJTVERERVZfU0FNUFwiLCBcIlNUT0dST1VQXCIsIFwiU1RPUkVTXCIsIFwiU1RZTEVcIiwgXCJTVUJNVUxUSVNFVFwiLCBcIlNVQlNUUklOR1wiLCBcIlNVTVwiLCBcIlNVTU1BUllcIiwgXCJTWU1NRVRSSUNcIiwgXCJTWU5PTllNXCIsIFwiU1lTRlVOXCIsIFwiU1lTSUJNXCIsIFwiU1lTUFJPQ1wiLCBcIlNZU1RFTVwiLCBcIlNZU1RFTV9VU0VSXCIsIFwiVEFCTEVcIiwgXCJUQUJMRVNBTVBMRVwiLCBcIlRBQkxFU1BBQ0VcIiwgXCJUSEVOXCIsIFwiVElNRVwiLCBcIlRJTUVTVEFNUFwiLCBcIlRJTUVaT05FX0hPVVJcIiwgXCJUSU1FWk9ORV9NSU5VVEVcIiwgXCJUT1wiLCBcIlRSQUlMSU5HXCIsIFwiVFJBTlNBQ1RJT05cIiwgXCJUUkFOU0xBVEVcIiwgXCJUUkFOU0xBVElPTlwiLCBcIlRSRUFUXCIsIFwiVFJJR0dFUlwiLCBcIlRSSU1cIiwgXCJUUlVFXCIsIFwiVFJVTkNBVEVcIiwgXCJUWVBFXCIsIFwiVUVTQ0FQRVwiLCBcIlVORE9cIiwgXCJVTklRVUVcIiwgXCJVTktOT1dOXCIsIFwiVU5ORVNUXCIsIFwiVU5USUxcIiwgXCJVUFBFUlwiLCBcIlVTQUdFXCIsIFwiVVNFUlwiLCBcIlVTSU5HXCIsIFwiVkFMSURQUk9DXCIsIFwiVkFMVUVcIiwgXCJWQVJDSEFSXCIsIFwiVkFSSUFCTEVcIiwgXCJWQVJJQU5UXCIsIFwiVkFSWUlOR1wiLCBcIlZBUl9QT1BcIiwgXCJWQVJfU0FNUFwiLCBcIlZDQVRcIiwgXCJWRVJTSU9OXCIsIFwiVklFV1wiLCBcIlZPTEFUSUxFXCIsIFwiVk9MVU1FU1wiLCBcIldIRU5cIiwgXCJXSEVORVZFUlwiLCBcIldISUxFXCIsIFwiV0lEVEhfQlVDS0VUXCIsIFwiV0lORE9XXCIsIFwiV0lUSFwiLCBcIldJVEhJTlwiLCBcIldJVEhPVVRcIiwgXCJXTE1cIiwgXCJXUklURVwiLCBcIlhNTEVMRU1FTlRcIiwgXCJYTUxFWElTVFNcIiwgXCJYTUxOQU1FU1BBQ0VTXCIsIFwiWUVBUlwiLCBcIllFQVJTXCJdO1xuXG52YXIgcmVzZXJ2ZWRUb3BsZXZlbFdvcmRzID0gW1wiQUREXCIsIFwiQUZURVJcIiwgXCJBTFRFUiBDT0xVTU5cIiwgXCJBTFRFUiBUQUJMRVwiLCBcIkRFTEVURSBGUk9NXCIsIFwiRVhDRVBUXCIsIFwiRkVUQ0ggRklSU1RcIiwgXCJGUk9NXCIsIFwiR1JPVVAgQllcIiwgXCJHT1wiLCBcIkhBVklOR1wiLCBcIklOU0VSVCBJTlRPXCIsIFwiSU5URVJTRUNUXCIsIFwiTElNSVRcIiwgXCJPUkRFUiBCWVwiLCBcIlNFTEVDVFwiLCBcIlNFVCBDVVJSRU5UIFNDSEVNQVwiLCBcIlNFVCBTQ0hFTUFcIiwgXCJTRVRcIiwgXCJVTklPTiBBTExcIiwgXCJVUERBVEVcIiwgXCJWQUxVRVNcIiwgXCJXSEVSRVwiXTtcblxudmFyIHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1wiQU5EXCIsIFwiQ1JPU1MgSk9JTlwiLCBcIklOTkVSIEpPSU5cIiwgXCJKT0lOXCIsIFwiTEVGVCBKT0lOXCIsIFwiTEVGVCBPVVRFUiBKT0lOXCIsIFwiT1JcIiwgXCJPVVRFUiBKT0lOXCIsIFwiUklHSFQgSk9JTlwiLCBcIlJJR0hUIE9VVEVSIEpPSU5cIl07XG5cbnZhciB0b2tlbml6ZXIgPSB2b2lkIDA7XG5cbnZhciBEYjJGb3JtYXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyBEaWZmZXJlbnQgc2V0IG9mIGNvbmZpZ3VyYXRpb25zXG4gICAgICovXG4gICAgZnVuY3Rpb24gRGIyRm9ybWF0dGVyKGNmZykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRGIyRm9ybWF0dGVyKTtcblxuICAgICAgICB0aGlzLmNmZyA9IGNmZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3JtYXRzIERCMiBxdWVyeSB0byBtYWtlIGl0IGVhc2llciB0byByZWFkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcXVlcnkgVGhlIERCMiBxdWVyeSBzdHJpbmdcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZvcm1hdHRlZCBzdHJpbmdcbiAgICAgKi9cblxuXG4gICAgRGIyRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiBmb3JtYXQocXVlcnkpIHtcbiAgICAgICAgaWYgKCF0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHRva2VuaXplciA9IG5ldyBfVG9rZW5pemVyMltcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIHJlc2VydmVkV29yZHM6IHJlc2VydmVkV29yZHMsXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWRUb3BsZXZlbFdvcmRzOiByZXNlcnZlZFRvcGxldmVsV29yZHMsXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHM6IHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgICAgICAgICAgIHN0cmluZ1R5cGVzOiBbXCJcXFwiXFxcIlwiLCBcIicnXCIsIFwiYGBcIiwgXCJbXVwiXSxcbiAgICAgICAgICAgICAgICBvcGVuUGFyZW5zOiBbXCIoXCJdLFxuICAgICAgICAgICAgICAgIGNsb3NlUGFyZW5zOiBbXCIpXCJdLFxuICAgICAgICAgICAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbXCI/XCJdLFxuICAgICAgICAgICAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogW1wiOlwiXSxcbiAgICAgICAgICAgICAgICBsaW5lQ29tbWVudFR5cGVzOiBbXCItLVwiXSxcbiAgICAgICAgICAgICAgICBzcGVjaWFsV29yZENoYXJzOiBbXCIjXCIsIFwiQFwiXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBfRm9ybWF0dGVyMltcImRlZmF1bHRcIl0odGhpcy5jZmcsIHRva2VuaXplcikuZm9ybWF0KHF1ZXJ5KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIERiMkZvcm1hdHRlcjtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBEYjJGb3JtYXR0ZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsICJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9Gb3JtYXR0ZXIgPSByZXF1aXJlKFwiLi4vY29yZS9Gb3JtYXR0ZXJcIik7XG5cbnZhciBfRm9ybWF0dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Zvcm1hdHRlcik7XG5cbnZhciBfVG9rZW5pemVyID0gcmVxdWlyZShcIi4uL2NvcmUvVG9rZW5pemVyXCIpO1xuXG52YXIgX1Rva2VuaXplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Ub2tlbml6ZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIHJlc2VydmVkV29yZHMgPSBbXCJBTExcIiwgXCJBTFRFUlwiLCBcIkFOQUxZWkVcIiwgXCJBTkRcIiwgXCJBTllcIiwgXCJBUlJBWVwiLCBcIkFTXCIsIFwiQVNDXCIsIFwiQkVHSU5cIiwgXCJCRVRXRUVOXCIsIFwiQklOQVJZXCIsIFwiQk9PTEVBTlwiLCBcIkJSRUFLXCIsIFwiQlVDS0VUXCIsIFwiQlVJTERcIiwgXCJCWVwiLCBcIkNBTExcIiwgXCJDQVNFXCIsIFwiQ0FTVFwiLCBcIkNMVVNURVJcIiwgXCJDT0xMQVRFXCIsIFwiQ09MTEVDVElPTlwiLCBcIkNPTU1JVFwiLCBcIkNPTk5FQ1RcIiwgXCJDT05USU5VRVwiLCBcIkNPUlJFTEFURVwiLCBcIkNPVkVSXCIsIFwiQ1JFQVRFXCIsIFwiREFUQUJBU0VcIiwgXCJEQVRBU0VUXCIsIFwiREFUQVNUT1JFXCIsIFwiREVDTEFSRVwiLCBcIkRFQ1JFTUVOVFwiLCBcIkRFTEVURVwiLCBcIkRFUklWRURcIiwgXCJERVNDXCIsIFwiREVTQ1JJQkVcIiwgXCJESVNUSU5DVFwiLCBcIkRPXCIsIFwiRFJPUFwiLCBcIkVBQ0hcIiwgXCJFTEVNRU5UXCIsIFwiRUxTRVwiLCBcIkVORFwiLCBcIkVWRVJZXCIsIFwiRVhDRVBUXCIsIFwiRVhDTFVERVwiLCBcIkVYRUNVVEVcIiwgXCJFWElTVFNcIiwgXCJFWFBMQUlOXCIsIFwiRkFMU0VcIiwgXCJGRVRDSFwiLCBcIkZJUlNUXCIsIFwiRkxBVFRFTlwiLCBcIkZPUlwiLCBcIkZPUkNFXCIsIFwiRlJPTVwiLCBcIkZVTkNUSU9OXCIsIFwiR1JBTlRcIiwgXCJHUk9VUFwiLCBcIkdTSVwiLCBcIkhBVklOR1wiLCBcIklGXCIsIFwiSUdOT1JFXCIsIFwiSUxJS0VcIiwgXCJJTlwiLCBcIklOQ0xVREVcIiwgXCJJTkNSRU1FTlRcIiwgXCJJTkRFWFwiLCBcIklORkVSXCIsIFwiSU5MSU5FXCIsIFwiSU5ORVJcIiwgXCJJTlNFUlRcIiwgXCJJTlRFUlNFQ1RcIiwgXCJJTlRPXCIsIFwiSVNcIiwgXCJKT0lOXCIsIFwiS0VZXCIsIFwiS0VZU1wiLCBcIktFWVNQQUNFXCIsIFwiS05PV05cIiwgXCJMQVNUXCIsIFwiTEVGVFwiLCBcIkxFVFwiLCBcIkxFVFRJTkdcIiwgXCJMSUtFXCIsIFwiTElNSVRcIiwgXCJMU01cIiwgXCJNQVBcIiwgXCJNQVBQSU5HXCIsIFwiTUFUQ0hFRFwiLCBcIk1BVEVSSUFMSVpFRFwiLCBcIk1FUkdFXCIsIFwiTUlOVVNcIiwgXCJNSVNTSU5HXCIsIFwiTkFNRVNQQUNFXCIsIFwiTkVTVFwiLCBcIk5PVFwiLCBcIk5VTExcIiwgXCJOVU1CRVJcIiwgXCJPQkpFQ1RcIiwgXCJPRkZTRVRcIiwgXCJPTlwiLCBcIk9QVElPTlwiLCBcIk9SXCIsIFwiT1JERVJcIiwgXCJPVVRFUlwiLCBcIk9WRVJcIiwgXCJQQVJTRVwiLCBcIlBBUlRJVElPTlwiLCBcIlBBU1NXT1JEXCIsIFwiUEFUSFwiLCBcIlBPT0xcIiwgXCJQUkVQQVJFXCIsIFwiUFJJTUFSWVwiLCBcIlBSSVZBVEVcIiwgXCJQUklWSUxFR0VcIiwgXCJQUk9DRURVUkVcIiwgXCJQVUJMSUNcIiwgXCJSQVdcIiwgXCJSRUFMTVwiLCBcIlJFRFVDRVwiLCBcIlJFTkFNRVwiLCBcIlJFVFVSTlwiLCBcIlJFVFVSTklOR1wiLCBcIlJFVk9LRVwiLCBcIlJJR0hUXCIsIFwiUk9MRVwiLCBcIlJPTExCQUNLXCIsIFwiU0FUSVNGSUVTXCIsIFwiU0NIRU1BXCIsIFwiU0VMRUNUXCIsIFwiU0VMRlwiLCBcIlNFTUlcIiwgXCJTRVRcIiwgXCJTSE9XXCIsIFwiU09NRVwiLCBcIlNUQVJUXCIsIFwiU1RBVElTVElDU1wiLCBcIlNUUklOR1wiLCBcIlNZU1RFTVwiLCBcIlRIRU5cIiwgXCJUT1wiLCBcIlRSQU5TQUNUSU9OXCIsIFwiVFJJR0dFUlwiLCBcIlRSVUVcIiwgXCJUUlVOQ0FURVwiLCBcIlVOREVSXCIsIFwiVU5JT05cIiwgXCJVTklRVUVcIiwgXCJVTktOT1dOXCIsIFwiVU5ORVNUXCIsIFwiVU5TRVRcIiwgXCJVUERBVEVcIiwgXCJVUFNFUlRcIiwgXCJVU0VcIiwgXCJVU0VSXCIsIFwiVVNJTkdcIiwgXCJWQUxJREFURVwiLCBcIlZBTFVFXCIsIFwiVkFMVUVEXCIsIFwiVkFMVUVTXCIsIFwiVklBXCIsIFwiVklFV1wiLCBcIldIRU5cIiwgXCJXSEVSRVwiLCBcIldISUxFXCIsIFwiV0lUSFwiLCBcIldJVEhJTlwiLCBcIldPUktcIiwgXCJYT1JcIl07XG5cbnZhciByZXNlcnZlZFRvcGxldmVsV29yZHMgPSBbXCJERUxFVEUgRlJPTVwiLCBcIkVYQ0VQVCBBTExcIiwgXCJFWENFUFRcIiwgXCJFWFBMQUlOIERFTEVURSBGUk9NXCIsIFwiRVhQTEFJTiBVUERBVEVcIiwgXCJFWFBMQUlOIFVQU0VSVFwiLCBcIkZST01cIiwgXCJHUk9VUCBCWVwiLCBcIkhBVklOR1wiLCBcIklORkVSXCIsIFwiSU5TRVJUIElOVE9cIiwgXCJJTlRFUlNFQ1QgQUxMXCIsIFwiSU5URVJTRUNUXCIsIFwiTEVUXCIsIFwiTElNSVRcIiwgXCJNRVJHRVwiLCBcIk5FU1RcIiwgXCJPUkRFUiBCWVwiLCBcIlBSRVBBUkVcIiwgXCJTRUxFQ1RcIiwgXCJTRVQgQ1VSUkVOVCBTQ0hFTUFcIiwgXCJTRVQgU0NIRU1BXCIsIFwiU0VUXCIsIFwiVU5JT04gQUxMXCIsIFwiVU5JT05cIiwgXCJVTk5FU1RcIiwgXCJVUERBVEVcIiwgXCJVUFNFUlRcIiwgXCJVU0UgS0VZU1wiLCBcIlZBTFVFU1wiLCBcIldIRVJFXCJdO1xuXG52YXIgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXCJBTkRcIiwgXCJJTk5FUiBKT0lOXCIsIFwiSk9JTlwiLCBcIkxFRlQgSk9JTlwiLCBcIkxFRlQgT1VURVIgSk9JTlwiLCBcIk9SXCIsIFwiT1VURVIgSk9JTlwiLCBcIlJJR0hUIEpPSU5cIiwgXCJSSUdIVCBPVVRFUiBKT0lOXCIsIFwiWE9SXCJdO1xuXG52YXIgdG9rZW5pemVyID0gdm9pZCAwO1xuXG52YXIgTjFxbEZvcm1hdHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIERpZmZlcmVudCBzZXQgb2YgY29uZmlndXJhdGlvbnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBOMXFsRm9ybWF0dGVyKGNmZykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTjFxbEZvcm1hdHRlcik7XG5cbiAgICAgICAgdGhpcy5jZmcgPSBjZmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9ybWF0IHRoZSB3aGl0ZXNwYWNlIGluIGEgTjFRTCBzdHJpbmcgdG8gbWFrZSBpdCBlYXNpZXIgdG8gcmVhZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBOMVFMIHN0cmluZ1xuICAgICAqIEByZXR1cm4ge1N0cmluZ30gZm9ybWF0dGVkIHN0cmluZ1xuICAgICAqL1xuXG5cbiAgICBOMXFsRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiBmb3JtYXQocXVlcnkpIHtcbiAgICAgICAgaWYgKCF0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHRva2VuaXplciA9IG5ldyBfVG9rZW5pemVyMltcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIHJlc2VydmVkV29yZHM6IHJlc2VydmVkV29yZHMsXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWRUb3BsZXZlbFdvcmRzOiByZXNlcnZlZFRvcGxldmVsV29yZHMsXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHM6IHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgICAgICAgICAgIHN0cmluZ1R5cGVzOiBbXCJcXFwiXFxcIlwiLCBcIicnXCIsIFwiYGBcIl0sXG4gICAgICAgICAgICAgICAgb3BlblBhcmVuczogW1wiKFwiLCBcIltcIiwgXCJ7XCJdLFxuICAgICAgICAgICAgICAgIGNsb3NlUGFyZW5zOiBbXCIpXCIsIFwiXVwiLCBcIn1cIl0sXG4gICAgICAgICAgICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbXCIkXCJdLFxuICAgICAgICAgICAgICAgIGxpbmVDb21tZW50VHlwZXM6IFtcIiNcIiwgXCItLVwiXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBfRm9ybWF0dGVyMltcImRlZmF1bHRcIl0odGhpcy5jZmcsIHRva2VuaXplcikuZm9ybWF0KHF1ZXJ5KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE4xcWxGb3JtYXR0ZXI7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gTjFxbEZvcm1hdHRlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwgIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX0Zvcm1hdHRlciA9IHJlcXVpcmUoXCIuLi9jb3JlL0Zvcm1hdHRlclwiKTtcblxudmFyIF9Gb3JtYXR0ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRm9ybWF0dGVyKTtcblxudmFyIF9Ub2tlbml6ZXIgPSByZXF1aXJlKFwiLi4vY29yZS9Ub2tlbml6ZXJcIik7XG5cbnZhciBfVG9rZW5pemVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Rva2VuaXplcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgcmVzZXJ2ZWRXb3JkcyA9IFtcIkFcIiwgXCJBQ0NFU1NJQkxFXCIsIFwiQUdFTlRcIiwgXCJBR0dSRUdBVEVcIiwgXCJBTExcIiwgXCJBTFRFUlwiLCBcIkFOWVwiLCBcIkFSUkFZXCIsIFwiQVNcIiwgXCJBU0NcIiwgXCJBVFwiLCBcIkFUVFJJQlVURVwiLCBcIkFVVEhJRFwiLCBcIkFWR1wiLCBcIkJFVFdFRU5cIiwgXCJCRklMRV9CQVNFXCIsIFwiQklOQVJZX0lOVEVHRVJcIiwgXCJCSU5BUllcIiwgXCJCTE9CX0JBU0VcIiwgXCJCTE9DS1wiLCBcIkJPRFlcIiwgXCJCT09MRUFOXCIsIFwiQk9USFwiLCBcIkJPVU5EXCIsIFwiQlVMS1wiLCBcIkJZXCIsIFwiQllURVwiLCBcIkNcIiwgXCJDQUxMXCIsIFwiQ0FMTElOR1wiLCBcIkNBU0NBREVcIiwgXCJDQVNFXCIsIFwiQ0hBUl9CQVNFXCIsIFwiQ0hBUlwiLCBcIkNIQVJBQ1RFUlwiLCBcIkNIQVJTRVRcIiwgXCJDSEFSU0VURk9STVwiLCBcIkNIQVJTRVRJRFwiLCBcIkNIRUNLXCIsIFwiQ0xPQl9CQVNFXCIsIFwiQ0xPTkVcIiwgXCJDTE9TRVwiLCBcIkNMVVNURVJcIiwgXCJDTFVTVEVSU1wiLCBcIkNPQUxFU0NFXCIsIFwiQ09MQVVUSFwiLCBcIkNPTExFQ1RcIiwgXCJDT0xVTU5TXCIsIFwiQ09NTUVOVFwiLCBcIkNPTU1JVFwiLCBcIkNPTU1JVFRFRFwiLCBcIkNPTVBJTEVEXCIsIFwiQ09NUFJFU1NcIiwgXCJDT05ORUNUXCIsIFwiQ09OU1RBTlRcIiwgXCJDT05TVFJVQ1RPUlwiLCBcIkNPTlRFWFRcIiwgXCJDT05USU5VRVwiLCBcIkNPTlZFUlRcIiwgXCJDT1VOVFwiLCBcIkNSQVNIXCIsIFwiQ1JFQVRFXCIsIFwiQ1JFREVOVElBTFwiLCBcIkNVUlJFTlRcIiwgXCJDVVJSVkFMXCIsIFwiQ1VSU09SXCIsIFwiQ1VTVE9NREFUVU1cIiwgXCJEQU5HTElOR1wiLCBcIkRBVEFcIiwgXCJEQVRFX0JBU0VcIiwgXCJEQVRFXCIsIFwiREFZXCIsIFwiREVDSU1BTFwiLCBcIkRFRkFVTFRcIiwgXCJERUZJTkVcIiwgXCJERUxFVEVcIiwgXCJERVNDXCIsIFwiREVURVJNSU5JU1RJQ1wiLCBcIkRJUkVDVE9SWVwiLCBcIkRJU1RJTkNUXCIsIFwiRE9cIiwgXCJET1VCTEVcIiwgXCJEUk9QXCIsIFwiRFVSQVRJT05cIiwgXCJFTEVNRU5UXCIsIFwiRUxTSUZcIiwgXCJFTVBUWVwiLCBcIkVTQ0FQRVwiLCBcIkVYQ0VQVElPTlNcIiwgXCJFWENMVVNJVkVcIiwgXCJFWEVDVVRFXCIsIFwiRVhJU1RTXCIsIFwiRVhJVFwiLCBcIkVYVEVORFNcIiwgXCJFWFRFUk5BTFwiLCBcIkVYVFJBQ1RcIiwgXCJGQUxTRVwiLCBcIkZFVENIXCIsIFwiRklOQUxcIiwgXCJGSVJTVFwiLCBcIkZJWEVEXCIsIFwiRkxPQVRcIiwgXCJGT1JcIiwgXCJGT1JBTExcIiwgXCJGT1JDRVwiLCBcIkZST01cIiwgXCJGVU5DVElPTlwiLCBcIkdFTkVSQUxcIiwgXCJHT1RPXCIsIFwiR1JBTlRcIiwgXCJHUk9VUFwiLCBcIkhBU0hcIiwgXCJIRUFQXCIsIFwiSElEREVOXCIsIFwiSE9VUlwiLCBcIklERU5USUZJRURcIiwgXCJJRlwiLCBcIklNTUVESUFURVwiLCBcIklOXCIsIFwiSU5DTFVESU5HXCIsIFwiSU5ERVhcIiwgXCJJTkRFWEVTXCIsIFwiSU5ESUNBVE9SXCIsIFwiSU5ESUNFU1wiLCBcIklORklOSVRFXCIsIFwiSU5TVEFOVElBQkxFXCIsIFwiSU5UXCIsIFwiSU5URUdFUlwiLCBcIklOVEVSRkFDRVwiLCBcIklOVEVSVkFMXCIsIFwiSU5UT1wiLCBcIklOVkFMSURBVEVcIiwgXCJJU1wiLCBcIklTT0xBVElPTlwiLCBcIkpBVkFcIiwgXCJMQU5HVUFHRVwiLCBcIkxBUkdFXCIsIFwiTEVBRElOR1wiLCBcIkxFTkdUSFwiLCBcIkxFVkVMXCIsIFwiTElCUkFSWVwiLCBcIkxJS0VcIiwgXCJMSUtFMlwiLCBcIkxJS0U0XCIsIFwiTElLRUNcIiwgXCJMSU1JVEVEXCIsIFwiTE9DQUxcIiwgXCJMT0NLXCIsIFwiTE9OR1wiLCBcIk1BUFwiLCBcIk1BWFwiLCBcIk1BWExFTlwiLCBcIk1FTUJFUlwiLCBcIk1FUkdFXCIsIFwiTUlOXCIsIFwiTUlOVVNcIiwgXCJNSU5VVEVcIiwgXCJNTFNMQUJFTFwiLCBcIk1PRFwiLCBcIk1PREVcIiwgXCJNT05USFwiLCBcIk1VTFRJU0VUXCIsIFwiTkFNRVwiLCBcIk5BTlwiLCBcIk5BVElPTkFMXCIsIFwiTkFUSVZFXCIsIFwiTkFUVVJBTFwiLCBcIk5BVFVSQUxOXCIsIFwiTkNIQVJcIiwgXCJORVdcIiwgXCJORVhUVkFMXCIsIFwiTk9DT01QUkVTU1wiLCBcIk5PQ09QWVwiLCBcIk5PVFwiLCBcIk5PV0FJVFwiLCBcIk5VTExcIiwgXCJOVUxMSUZcIiwgXCJOVU1CRVJfQkFTRVwiLCBcIk5VTUJFUlwiLCBcIk9CSkVDVFwiLCBcIk9DSUNPTExcIiwgXCJPQ0lEQVRFXCIsIFwiT0NJREFURVRJTUVcIiwgXCJPQ0lEVVJBVElPTlwiLCBcIk9DSUlOVEVSVkFMXCIsIFwiT0NJTE9CTE9DQVRPUlwiLCBcIk9DSU5VTUJFUlwiLCBcIk9DSVJBV1wiLCBcIk9DSVJFRlwiLCBcIk9DSVJFRkNVUlNPUlwiLCBcIk9DSVJPV0lEXCIsIFwiT0NJU1RSSU5HXCIsIFwiT0NJVFlQRVwiLCBcIk9GXCIsIFwiT0xEXCIsIFwiT05cIiwgXCJPTkxZXCIsIFwiT1BBUVVFXCIsIFwiT1BFTlwiLCBcIk9QRVJBVE9SXCIsIFwiT1BUSU9OXCIsIFwiT1JBQ0xFXCIsIFwiT1JBREFUQVwiLCBcIk9SREVSXCIsIFwiT1JHQU5JWkFUSU9OXCIsIFwiT1JMQU5ZXCIsIFwiT1JMVkFSWVwiLCBcIk9USEVSU1wiLCBcIk9VVFwiLCBcIk9WRVJMQVBTXCIsIFwiT1ZFUlJJRElOR1wiLCBcIlBBQ0tBR0VcIiwgXCJQQVJBTExFTF9FTkFCTEVcIiwgXCJQQVJBTUVURVJcIiwgXCJQQVJBTUVURVJTXCIsIFwiUEFSRU5UXCIsIFwiUEFSVElUSU9OXCIsIFwiUEFTQ0FMXCIsIFwiUENURlJFRVwiLCBcIlBJUEVcIiwgXCJQSVBFTElORURcIiwgXCJQTFNfSU5URUdFUlwiLCBcIlBMVUdHQUJMRVwiLCBcIlBPU0lUSVZFXCIsIFwiUE9TSVRJVkVOXCIsIFwiUFJBR01BXCIsIFwiUFJFQ0lTSU9OXCIsIFwiUFJJT1JcIiwgXCJQUklWQVRFXCIsIFwiUFJPQ0VEVVJFXCIsIFwiUFVCTElDXCIsIFwiUkFJU0VcIiwgXCJSQU5HRVwiLCBcIlJBV1wiLCBcIlJFQURcIiwgXCJSRUFMXCIsIFwiUkVDT1JEXCIsIFwiUkVGXCIsIFwiUkVGRVJFTkNFXCIsIFwiUkVMRUFTRVwiLCBcIlJFTElFU19PTlwiLCBcIlJFTVwiLCBcIlJFTUFJTkRFUlwiLCBcIlJFTkFNRVwiLCBcIlJFU09VUkNFXCIsIFwiUkVTVUxUX0NBQ0hFXCIsIFwiUkVTVUxUXCIsIFwiUkVUVVJOXCIsIFwiUkVUVVJOSU5HXCIsIFwiUkVWRVJTRVwiLCBcIlJFVk9LRVwiLCBcIlJPTExCQUNLXCIsIFwiUk9XXCIsIFwiUk9XSURcIiwgXCJST1dOVU1cIiwgXCJST1dUWVBFXCIsIFwiU0FNUExFXCIsIFwiU0FWRVwiLCBcIlNBVkVQT0lOVFwiLCBcIlNCMVwiLCBcIlNCMlwiLCBcIlNCNFwiLCBcIlNFQ09ORFwiLCBcIlNFR01FTlRcIiwgXCJTRUxGXCIsIFwiU0VQQVJBVEVcIiwgXCJTRVFVRU5DRVwiLCBcIlNFUklBTElaQUJMRVwiLCBcIlNIQVJFXCIsIFwiU0hPUlRcIiwgXCJTSVpFX1RcIiwgXCJTSVpFXCIsIFwiU01BTExJTlRcIiwgXCJTT01FXCIsIFwiU1BBQ0VcIiwgXCJTUEFSU0VcIiwgXCJTUUxcIiwgXCJTUUxDT0RFXCIsIFwiU1FMREFUQVwiLCBcIlNRTEVSUk1cIiwgXCJTUUxOQU1FXCIsIFwiU1FMU1RBVEVcIiwgXCJTVEFOREFSRFwiLCBcIlNUQVJUXCIsIFwiU1RBVElDXCIsIFwiU1REREVWXCIsIFwiU1RPUkVEXCIsIFwiU1RSSU5HXCIsIFwiU1RSVUNUXCIsIFwiU1RZTEVcIiwgXCJTVUJNVUxUSVNFVFwiLCBcIlNVQlBBUlRJVElPTlwiLCBcIlNVQlNUSVRVVEFCTEVcIiwgXCJTVUJUWVBFXCIsIFwiU1VDQ0VTU0ZVTFwiLCBcIlNVTVwiLCBcIlNZTk9OWU1cIiwgXCJTWVNEQVRFXCIsIFwiVEFCQVVUSFwiLCBcIlRBQkxFXCIsIFwiVERPXCIsIFwiVEhFXCIsIFwiVEhFTlwiLCBcIlRJTUVcIiwgXCJUSU1FU1RBTVBcIiwgXCJUSU1FWk9ORV9BQkJSXCIsIFwiVElNRVpPTkVfSE9VUlwiLCBcIlRJTUVaT05FX01JTlVURVwiLCBcIlRJTUVaT05FX1JFR0lPTlwiLCBcIlRPXCIsIFwiVFJBSUxJTkdcIiwgXCJUUkFOU0FDVElPTlwiLCBcIlRSQU5TQUNUSU9OQUxcIiwgXCJUUklHR0VSXCIsIFwiVFJVRVwiLCBcIlRSVVNURURcIiwgXCJUWVBFXCIsIFwiVUIxXCIsIFwiVUIyXCIsIFwiVUI0XCIsIFwiVUlEXCIsIFwiVU5ERVJcIiwgXCJVTklRVUVcIiwgXCJVTlBMVUdcIiwgXCJVTlNJR05FRFwiLCBcIlVOVFJVU1RFRFwiLCBcIlVTRVwiLCBcIlVTRVJcIiwgXCJVU0lOR1wiLCBcIlZBTElEQVRFXCIsIFwiVkFMSVNUXCIsIFwiVkFMVUVcIiwgXCJWQVJDSEFSXCIsIFwiVkFSQ0hBUjJcIiwgXCJWQVJJQUJMRVwiLCBcIlZBUklBTkNFXCIsIFwiVkFSUkFZXCIsIFwiVkFSWUlOR1wiLCBcIlZJRVdcIiwgXCJWSUVXU1wiLCBcIlZPSURcIiwgXCJXSEVORVZFUlwiLCBcIldISUxFXCIsIFwiV0lUSFwiLCBcIldPUktcIiwgXCJXUkFQUEVEXCIsIFwiV1JJVEVcIiwgXCJZRUFSXCIsIFwiWk9ORVwiXTtcblxudmFyIHJlc2VydmVkVG9wbGV2ZWxXb3JkcyA9IFtcIkFERFwiLCBcIkFMVEVSIENPTFVNTlwiLCBcIkFMVEVSIFRBQkxFXCIsIFwiQkVHSU5cIiwgXCJDT05ORUNUIEJZXCIsIFwiREVDTEFSRVwiLCBcIkRFTEVURSBGUk9NXCIsIFwiREVMRVRFXCIsIFwiRU5EXCIsIFwiRVhDRVBUXCIsIFwiRVhDRVBUSU9OXCIsIFwiRkVUQ0ggRklSU1RcIiwgXCJGUk9NXCIsIFwiR1JPVVAgQllcIiwgXCJIQVZJTkdcIiwgXCJJTlNFUlQgSU5UT1wiLCBcIklOU0VSVFwiLCBcIklOVEVSU0VDVFwiLCBcIkxJTUlUXCIsIFwiTE9PUFwiLCBcIk1PRElGWVwiLCBcIk9SREVSIEJZXCIsIFwiU0VMRUNUXCIsIFwiU0VUIENVUlJFTlQgU0NIRU1BXCIsIFwiU0VUIFNDSEVNQVwiLCBcIlNFVFwiLCBcIlNUQVJUIFdJVEhcIiwgXCJVTklPTiBBTExcIiwgXCJVTklPTlwiLCBcIlVQREFURVwiLCBcIlZBTFVFU1wiLCBcIldIRVJFXCJdO1xuXG52YXIgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXCJBTkRcIiwgXCJDUk9TUyBBUFBMWVwiLCBcIkNST1NTIEpPSU5cIiwgXCJFTFNFXCIsIFwiRU5EXCIsIFwiSU5ORVIgSk9JTlwiLCBcIkpPSU5cIiwgXCJMRUZUIEpPSU5cIiwgXCJMRUZUIE9VVEVSIEpPSU5cIiwgXCJPUlwiLCBcIk9VVEVSIEFQUExZXCIsIFwiT1VURVIgSk9JTlwiLCBcIlJJR0hUIEpPSU5cIiwgXCJSSUdIVCBPVVRFUiBKT0lOXCIsIFwiV0hFTlwiLCBcIlhPUlwiXTtcblxudmFyIHRva2VuaXplciA9IHZvaWQgMDtcblxudmFyIFBsU3FsRm9ybWF0dGVyID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgRGlmZmVyZW50IHNldCBvZiBjb25maWd1cmF0aW9uc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIFBsU3FsRm9ybWF0dGVyKGNmZykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGxTcWxGb3JtYXR0ZXIpO1xuXG4gICAgICAgIHRoaXMuY2ZnID0gY2ZnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdCB0aGUgd2hpdGVzcGFjZSBpbiBhIFBML1NRTCBzdHJpbmcgdG8gbWFrZSBpdCBlYXNpZXIgdG8gcmVhZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBQTC9TUUwgc3RyaW5nXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBmb3JtYXR0ZWQgc3RyaW5nXG4gICAgICovXG5cblxuICAgIFBsU3FsRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiBmb3JtYXQocXVlcnkpIHtcbiAgICAgICAgaWYgKCF0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHRva2VuaXplciA9IG5ldyBfVG9rZW5pemVyMltcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIHJlc2VydmVkV29yZHM6IHJlc2VydmVkV29yZHMsXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWRUb3BsZXZlbFdvcmRzOiByZXNlcnZlZFRvcGxldmVsV29yZHMsXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHM6IHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgICAgICAgICAgIHN0cmluZ1R5cGVzOiBbXCJcXFwiXFxcIlwiLCBcIk4nJ1wiLCBcIicnXCIsIFwiYGBcIl0sXG4gICAgICAgICAgICAgICAgb3BlblBhcmVuczogW1wiKFwiLCBcIkNBU0VcIl0sXG4gICAgICAgICAgICAgICAgY2xvc2VQYXJlbnM6IFtcIilcIiwgXCJFTkRcIl0sXG4gICAgICAgICAgICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFtcIj9cIl0sXG4gICAgICAgICAgICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbXCI6XCJdLFxuICAgICAgICAgICAgICAgIGxpbmVDb21tZW50VHlwZXM6IFtcIi0tXCJdLFxuICAgICAgICAgICAgICAgIHNwZWNpYWxXb3JkQ2hhcnM6IFtcIl9cIiwgXCIkXCIsIFwiI1wiLCBcIi5cIiwgXCJAXCJdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IF9Gb3JtYXR0ZXIyW1wiZGVmYXVsdFwiXSh0aGlzLmNmZywgdG9rZW5pemVyKS5mb3JtYXQocXVlcnkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gUGxTcWxGb3JtYXR0ZXI7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gUGxTcWxGb3JtYXR0ZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsICJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9Gb3JtYXR0ZXIgPSByZXF1aXJlKFwiLi4vY29yZS9Gb3JtYXR0ZXJcIik7XG5cbnZhciBfRm9ybWF0dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Zvcm1hdHRlcik7XG5cbnZhciBfVG9rZW5pemVyID0gcmVxdWlyZShcIi4uL2NvcmUvVG9rZW5pemVyXCIpO1xuXG52YXIgX1Rva2VuaXplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Ub2tlbml6ZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIHJlc2VydmVkV29yZHMgPSBbXCJBQ0NFU1NJQkxFXCIsIFwiQUNUSU9OXCIsIFwiQUdBSU5TVFwiLCBcIkFHR1JFR0FURVwiLCBcIkFMR09SSVRITVwiLCBcIkFMTFwiLCBcIkFMVEVSXCIsIFwiQU5BTFlTRVwiLCBcIkFOQUxZWkVcIiwgXCJBU1wiLCBcIkFTQ1wiLCBcIkFVVE9DT01NSVRcIiwgXCJBVVRPX0lOQ1JFTUVOVFwiLCBcIkJBQ0tVUFwiLCBcIkJFR0lOXCIsIFwiQkVUV0VFTlwiLCBcIkJJTkxPR1wiLCBcIkJPVEhcIiwgXCJDQVNDQURFXCIsIFwiQ0FTRVwiLCBcIkNIQU5HRVwiLCBcIkNIQU5HRURcIiwgXCJDSEFSQUNURVIgU0VUXCIsIFwiQ0hBUlNFVFwiLCBcIkNIRUNLXCIsIFwiQ0hFQ0tTVU1cIiwgXCJDT0xMQVRFXCIsIFwiQ09MTEFUSU9OXCIsIFwiQ09MVU1OXCIsIFwiQ09MVU1OU1wiLCBcIkNPTU1FTlRcIiwgXCJDT01NSVRcIiwgXCJDT01NSVRURURcIiwgXCJDT01QUkVTU0VEXCIsIFwiQ09OQ1VSUkVOVFwiLCBcIkNPTlNUUkFJTlRcIiwgXCJDT05UQUlOU1wiLCBcIkNPTlZFUlRcIiwgXCJDUkVBVEVcIiwgXCJDUk9TU1wiLCBcIkNVUlJFTlRfVElNRVNUQU1QXCIsIFwiREFUQUJBU0VcIiwgXCJEQVRBQkFTRVNcIiwgXCJEQVlcIiwgXCJEQVlfSE9VUlwiLCBcIkRBWV9NSU5VVEVcIiwgXCJEQVlfU0VDT05EXCIsIFwiREVGQVVMVFwiLCBcIkRFRklORVJcIiwgXCJERUxBWUVEXCIsIFwiREVMRVRFXCIsIFwiREVTQ1wiLCBcIkRFU0NSSUJFXCIsIFwiREVURVJNSU5JU1RJQ1wiLCBcIkRJU1RJTkNUXCIsIFwiRElTVElOQ1RST1dcIiwgXCJESVZcIiwgXCJET1wiLCBcIkRST1BcIiwgXCJEVU1QRklMRVwiLCBcIkRVUExJQ0FURVwiLCBcIkRZTkFNSUNcIiwgXCJFTFNFXCIsIFwiRU5DTE9TRURcIiwgXCJFTkRcIiwgXCJFTkdJTkVcIiwgXCJFTkdJTkVTXCIsIFwiRU5HSU5FX1RZUEVcIiwgXCJFU0NBUEVcIiwgXCJFU0NBUEVEXCIsIFwiRVZFTlRTXCIsIFwiRVhFQ1wiLCBcIkVYRUNVVEVcIiwgXCJFWElTVFNcIiwgXCJFWFBMQUlOXCIsIFwiRVhURU5ERURcIiwgXCJGQVNUXCIsIFwiRkVUQ0hcIiwgXCJGSUVMRFNcIiwgXCJGSUxFXCIsIFwiRklSU1RcIiwgXCJGSVhFRFwiLCBcIkZMVVNIXCIsIFwiRk9SXCIsIFwiRk9SQ0VcIiwgXCJGT1JFSUdOXCIsIFwiRlVMTFwiLCBcIkZVTExURVhUXCIsIFwiRlVOQ1RJT05cIiwgXCJHTE9CQUxcIiwgXCJHUkFOVFwiLCBcIkdSQU5UU1wiLCBcIkdST1VQX0NPTkNBVFwiLCBcIkhFQVBcIiwgXCJISUdIX1BSSU9SSVRZXCIsIFwiSE9TVFNcIiwgXCJIT1VSXCIsIFwiSE9VUl9NSU5VVEVcIiwgXCJIT1VSX1NFQ09ORFwiLCBcIklERU5USUZJRURcIiwgXCJJRlwiLCBcIklGTlVMTFwiLCBcIklHTk9SRVwiLCBcIklOXCIsIFwiSU5ERVhcIiwgXCJJTkRFWEVTXCIsIFwiSU5GSUxFXCIsIFwiSU5TRVJUXCIsIFwiSU5TRVJUX0lEXCIsIFwiSU5TRVJUX01FVEhPRFwiLCBcIklOVEVSVkFMXCIsIFwiSU5UT1wiLCBcIklOVk9LRVJcIiwgXCJJU1wiLCBcIklTT0xBVElPTlwiLCBcIktFWVwiLCBcIktFWVNcIiwgXCJLSUxMXCIsIFwiTEFTVF9JTlNFUlRfSURcIiwgXCJMRUFESU5HXCIsIFwiTEVWRUxcIiwgXCJMSUtFXCIsIFwiTElORUFSXCIsIFwiTElORVNcIiwgXCJMT0FEXCIsIFwiTE9DQUxcIiwgXCJMT0NLXCIsIFwiTE9DS1NcIiwgXCJMT0dTXCIsIFwiTE9XX1BSSU9SSVRZXCIsIFwiTUFSSUFcIiwgXCJNQVNURVJcIiwgXCJNQVNURVJfQ09OTkVDVF9SRVRSWVwiLCBcIk1BU1RFUl9IT1NUXCIsIFwiTUFTVEVSX0xPR19GSUxFXCIsIFwiTUFUQ0hcIiwgXCJNQVhfQ09OTkVDVElPTlNfUEVSX0hPVVJcIiwgXCJNQVhfUVVFUklFU19QRVJfSE9VUlwiLCBcIk1BWF9ST1dTXCIsIFwiTUFYX1VQREFURVNfUEVSX0hPVVJcIiwgXCJNQVhfVVNFUl9DT05ORUNUSU9OU1wiLCBcIk1FRElVTVwiLCBcIk1FUkdFXCIsIFwiTUlOVVRFXCIsIFwiTUlOVVRFX1NFQ09ORFwiLCBcIk1JTl9ST1dTXCIsIFwiTU9ERVwiLCBcIk1PRElGWVwiLCBcIk1PTlRIXCIsIFwiTVJHX01ZSVNBTVwiLCBcIk1ZSVNBTVwiLCBcIk5BTUVTXCIsIFwiTkFUVVJBTFwiLCBcIk5PVFwiLCBcIk5PVygpXCIsIFwiTlVMTFwiLCBcIk9GRlNFVFwiLCBcIk9OIERFTEVURVwiLCBcIk9OIFVQREFURVwiLCBcIk9OXCIsIFwiT05MWVwiLCBcIk9QRU5cIiwgXCJPUFRJTUlaRVwiLCBcIk9QVElPTlwiLCBcIk9QVElPTkFMTFlcIiwgXCJPVVRGSUxFXCIsIFwiUEFDS19LRVlTXCIsIFwiUEFHRVwiLCBcIlBBUlRJQUxcIiwgXCJQQVJUSVRJT05cIiwgXCJQQVJUSVRJT05TXCIsIFwiUEFTU1dPUkRcIiwgXCJQUklNQVJZXCIsIFwiUFJJVklMRUdFU1wiLCBcIlBST0NFRFVSRVwiLCBcIlBST0NFU1NcIiwgXCJQUk9DRVNTTElTVFwiLCBcIlBVUkdFXCIsIFwiUVVJQ0tcIiwgXCJSQUlEMFwiLCBcIlJBSURfQ0hVTktTXCIsIFwiUkFJRF9DSFVOS1NJWkVcIiwgXCJSQUlEX1RZUEVcIiwgXCJSQU5HRVwiLCBcIlJFQURcIiwgXCJSRUFEX09OTFlcIiwgXCJSRUFEX1dSSVRFXCIsIFwiUkVGRVJFTkNFU1wiLCBcIlJFR0VYUFwiLCBcIlJFTE9BRFwiLCBcIlJFTkFNRVwiLCBcIlJFUEFJUlwiLCBcIlJFUEVBVEFCTEVcIiwgXCJSRVBMQUNFXCIsIFwiUkVQTElDQVRJT05cIiwgXCJSRVNFVFwiLCBcIlJFU1RPUkVcIiwgXCJSRVNUUklDVFwiLCBcIlJFVFVSTlwiLCBcIlJFVFVSTlNcIiwgXCJSRVZPS0VcIiwgXCJSTElLRVwiLCBcIlJPTExCQUNLXCIsIFwiUk9XXCIsIFwiUk9XU1wiLCBcIlJPV19GT1JNQVRcIiwgXCJTRUNPTkRcIiwgXCJTRUNVUklUWVwiLCBcIlNFUEFSQVRPUlwiLCBcIlNFUklBTElaQUJMRVwiLCBcIlNFU1NJT05cIiwgXCJTSEFSRVwiLCBcIlNIT1dcIiwgXCJTSFVURE9XTlwiLCBcIlNMQVZFXCIsIFwiU09OQU1FXCIsIFwiU09VTkRTXCIsIFwiU1FMXCIsIFwiU1FMX0FVVE9fSVNfTlVMTFwiLCBcIlNRTF9CSUdfUkVTVUxUXCIsIFwiU1FMX0JJR19TRUxFQ1RTXCIsIFwiU1FMX0JJR19UQUJMRVNcIiwgXCJTUUxfQlVGRkVSX1JFU1VMVFwiLCBcIlNRTF9DQUNIRVwiLCBcIlNRTF9DQUxDX0ZPVU5EX1JPV1NcIiwgXCJTUUxfTE9HX0JJTlwiLCBcIlNRTF9MT0dfT0ZGXCIsIFwiU1FMX0xPR19VUERBVEVcIiwgXCJTUUxfTE9XX1BSSU9SSVRZX1VQREFURVNcIiwgXCJTUUxfTUFYX0pPSU5fU0laRVwiLCBcIlNRTF9OT19DQUNIRVwiLCBcIlNRTF9RVU9URV9TSE9XX0NSRUFURVwiLCBcIlNRTF9TQUZFX1VQREFURVNcIiwgXCJTUUxfU0VMRUNUX0xJTUlUXCIsIFwiU1FMX1NMQVZFX1NLSVBfQ09VTlRFUlwiLCBcIlNRTF9TTUFMTF9SRVNVTFRcIiwgXCJTUUxfV0FSTklOR1NcIiwgXCJTVEFSVFwiLCBcIlNUQVJUSU5HXCIsIFwiU1RBVFVTXCIsIFwiU1RPUFwiLCBcIlNUT1JBR0VcIiwgXCJTVFJBSUdIVF9KT0lOXCIsIFwiU1RSSU5HXCIsIFwiU1RSSVBFRFwiLCBcIlNVUEVSXCIsIFwiVEFCTEVcIiwgXCJUQUJMRVNcIiwgXCJURU1QT1JBUllcIiwgXCJURVJNSU5BVEVEXCIsIFwiVEhFTlwiLCBcIlRPXCIsIFwiVFJBSUxJTkdcIiwgXCJUUkFOU0FDVElPTkFMXCIsIFwiVFJVRVwiLCBcIlRSVU5DQVRFXCIsIFwiVFlQRVwiLCBcIlRZUEVTXCIsIFwiVU5DT01NSVRURURcIiwgXCJVTklRVUVcIiwgXCJVTkxPQ0tcIiwgXCJVTlNJR05FRFwiLCBcIlVTQUdFXCIsIFwiVVNFXCIsIFwiVVNJTkdcIiwgXCJWQVJJQUJMRVNcIiwgXCJWSUVXXCIsIFwiV0hFTlwiLCBcIldJVEhcIiwgXCJXT1JLXCIsIFwiV1JJVEVcIiwgXCJZRUFSX01PTlRIXCJdO1xuXG52YXIgcmVzZXJ2ZWRUb3BsZXZlbFdvcmRzID0gW1wiQUREXCIsIFwiQUZURVJcIiwgXCJBTFRFUiBDT0xVTU5cIiwgXCJBTFRFUiBUQUJMRVwiLCBcIkRFTEVURSBGUk9NXCIsIFwiRVhDRVBUXCIsIFwiRkVUQ0ggRklSU1RcIiwgXCJGUk9NXCIsIFwiR1JPVVAgQllcIiwgXCJHT1wiLCBcIkhBVklOR1wiLCBcIklOU0VSVCBJTlRPXCIsIFwiSU5TRVJUXCIsIFwiSU5URVJTRUNUXCIsIFwiTElNSVRcIiwgXCJNT0RJRllcIiwgXCJPUkRFUiBCWVwiLCBcIlNFTEVDVFwiLCBcIlNFVCBDVVJSRU5UIFNDSEVNQVwiLCBcIlNFVCBTQ0hFTUFcIiwgXCJTRVRcIiwgXCJVTklPTiBBTExcIiwgXCJVTklPTlwiLCBcIlVQREFURVwiLCBcIlZBTFVFU1wiLCBcIldIRVJFXCJdO1xuXG52YXIgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXCJBTkRcIiwgXCJDUk9TUyBBUFBMWVwiLCBcIkNST1NTIEpPSU5cIiwgXCJFTFNFXCIsIFwiSU5ORVIgSk9JTlwiLCBcIkpPSU5cIiwgXCJMRUZUIEpPSU5cIiwgXCJMRUZUIE9VVEVSIEpPSU5cIiwgXCJPUlwiLCBcIk9VVEVSIEFQUExZXCIsIFwiT1VURVIgSk9JTlwiLCBcIlJJR0hUIEpPSU5cIiwgXCJSSUdIVCBPVVRFUiBKT0lOXCIsIFwiV0hFTlwiLCBcIlhPUlwiXTtcblxudmFyIHRva2VuaXplciA9IHZvaWQgMDtcblxudmFyIFN0YW5kYXJkU3FsRm9ybWF0dGVyID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgRGlmZmVyZW50IHNldCBvZiBjb25maWd1cmF0aW9uc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIFN0YW5kYXJkU3FsRm9ybWF0dGVyKGNmZykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3RhbmRhcmRTcWxGb3JtYXR0ZXIpO1xuXG4gICAgICAgIHRoaXMuY2ZnID0gY2ZnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdCB0aGUgd2hpdGVzcGFjZSBpbiBhIFN0YW5kYXJkIFNRTCBzdHJpbmcgdG8gbWFrZSBpdCBlYXNpZXIgdG8gcmVhZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBTdGFuZGFyZCBTUUwgc3RyaW5nXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBmb3JtYXR0ZWQgc3RyaW5nXG4gICAgICovXG5cblxuICAgIFN0YW5kYXJkU3FsRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiBmb3JtYXQocXVlcnkpIHtcbiAgICAgICAgaWYgKCF0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHRva2VuaXplciA9IG5ldyBfVG9rZW5pemVyMltcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIHJlc2VydmVkV29yZHM6IHJlc2VydmVkV29yZHMsXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWRUb3BsZXZlbFdvcmRzOiByZXNlcnZlZFRvcGxldmVsV29yZHMsXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHM6IHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgICAgICAgICAgIHN0cmluZ1R5cGVzOiBbXCJcXFwiXFxcIlwiLCBcIk4nJ1wiLCBcIicnXCIsIFwiYGBcIiwgXCJbXVwiXSxcbiAgICAgICAgICAgICAgICBvcGVuUGFyZW5zOiBbXCIoXCIsIFwiQ0FTRVwiXSxcbiAgICAgICAgICAgICAgICBjbG9zZVBhcmVuczogW1wiKVwiLCBcIkVORFwiXSxcbiAgICAgICAgICAgICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogW1wiP1wiXSxcbiAgICAgICAgICAgICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFtcIkBcIiwgXCI6XCJdLFxuICAgICAgICAgICAgICAgIGxpbmVDb21tZW50VHlwZXM6IFtcIiNcIiwgXCItLVwiXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBfRm9ybWF0dGVyMltcImRlZmF1bHRcIl0odGhpcy5jZmcsIHRva2VuaXplcikuZm9ybWF0KHF1ZXJ5KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFN0YW5kYXJkU3FsRm9ybWF0dGVyO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFN0YW5kYXJkU3FsRm9ybWF0dGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfRGIyRm9ybWF0dGVyID0gcmVxdWlyZShcIi4vbGFuZ3VhZ2VzL0RiMkZvcm1hdHRlclwiKTtcblxudmFyIF9EYjJGb3JtYXR0ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRGIyRm9ybWF0dGVyKTtcblxudmFyIF9OMXFsRm9ybWF0dGVyID0gcmVxdWlyZShcIi4vbGFuZ3VhZ2VzL04xcWxGb3JtYXR0ZXJcIik7XG5cbnZhciBfTjFxbEZvcm1hdHRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9OMXFsRm9ybWF0dGVyKTtcblxudmFyIF9QbFNxbEZvcm1hdHRlciA9IHJlcXVpcmUoXCIuL2xhbmd1YWdlcy9QbFNxbEZvcm1hdHRlclwiKTtcblxudmFyIF9QbFNxbEZvcm1hdHRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9QbFNxbEZvcm1hdHRlcik7XG5cbnZhciBfU3RhbmRhcmRTcWxGb3JtYXR0ZXIgPSByZXF1aXJlKFwiLi9sYW5ndWFnZXMvU3RhbmRhcmRTcWxGb3JtYXR0ZXJcIik7XG5cbnZhciBfU3RhbmRhcmRTcWxGb3JtYXR0ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3RhbmRhcmRTcWxGb3JtYXR0ZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB7XG4gICAgLyoqXG4gICAgICogRm9ybWF0IHdoaXRlc3BhY2VzIGluIGEgcXVlcnkgdG8gbWFrZSBpdCBlYXNpZXIgdG8gcmVhZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmdcbiAgICAgKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5sYW5ndWFnZSBRdWVyeSBsYW5ndWFnZSwgZGVmYXVsdCBpcyBTdGFuZGFyZCBTUUxcbiAgICAgKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5pbmRlbnQgQ2hhcmFjdGVycyB1c2VkIGZvciBpbmRlbnRhdGlvbiwgZGVmYXVsdCBpcyBcIiAgXCIgKDIgc3BhY2VzKVxuICAgICAqICBAcGFyYW0ge09iamVjdH0gY2ZnLnBhcmFtcyBDb2xsZWN0aW9uIG9mIHBhcmFtcyBmb3IgcGxhY2Vob2xkZXIgcmVwbGFjZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZm9ybWF0OiBmdW5jdGlvbiBmb3JtYXQocXVlcnksIGNmZykge1xuICAgICAgICBjZmcgPSBjZmcgfHwge307XG5cbiAgICAgICAgc3dpdGNoIChjZmcubGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgIGNhc2UgXCJkYjJcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IF9EYjJGb3JtYXR0ZXIyW1wiZGVmYXVsdFwiXShjZmcpLmZvcm1hdChxdWVyeSk7XG4gICAgICAgICAgICBjYXNlIFwibjFxbFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgX04xcWxGb3JtYXR0ZXIyW1wiZGVmYXVsdFwiXShjZmcpLmZvcm1hdChxdWVyeSk7XG4gICAgICAgICAgICBjYXNlIFwicGwvc3FsXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBfUGxTcWxGb3JtYXR0ZXIyW1wiZGVmYXVsdFwiXShjZmcpLmZvcm1hdChxdWVyeSk7XG4gICAgICAgICAgICBjYXNlIFwic3FsXCI6XG4gICAgICAgICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IF9TdGFuZGFyZFNxbEZvcm1hdHRlcjJbXCJkZWZhdWx0XCJdKGNmZykuZm9ybWF0KHF1ZXJ5KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJVbnN1cHBvcnRlZCBTUUwgZGlhbGVjdDogXCIgKyBjZmcubGFuZ3VhZ2UpO1xuICAgICAgICB9XG4gICAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuLy8gVE9ETzogRml4IHRoaXMgdGhlIG5leHQgdGltZSB0aGUgZmlsZSBpcyBlZGl0ZWQuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcnVsZXNkaXIvbm8tcmVzdHJpY3RlZC1pbXBvcnRzLWNsb25lXG5pbXBvcnQge1RhYmxlUm93U29ydE9yZGVyLCBUYWJsZUhpZ2hsaWdodGVkUm93c30gZnJvbSAnZmxpcHBlcic7XG5pbXBvcnQge1ZhbHVlfSBmcm9tICcuL1R5cGVCYXNlZFZhbHVlUmVuZGVyZXInO1xuaW1wb3J0IHtNZXRob2RzLCBFdmVudHN9IGZyb20gJy4vQ2xpZW50UHJvdG9jb2wnO1xuaW1wb3J0IGRhdGVGb3JtYXQgZnJvbSAnZGF0ZWZvcm1hdCc7XG5pbXBvcnQge2NyZWF0ZVN0YXRlLCBQbHVnaW5DbGllbnR9IGZyb20gJ2ZsaXBwZXItcGx1Z2luJztcbmV4cG9ydCB7Q29tcG9uZW50fSBmcm9tICcuL0RhdGFiYXNlc1BsdWdpbic7XG5cbmNvbnN0IFBBR0VfU0laRSA9IDUwO1xuY29uc3QgRkFWT1JJVEVTX0xPQ0FMX1NUT1JBR0VfS0VZID0gJ3BsdWdpbi1kYXRhYmFzZS1mYXZvcml0ZXMtc3FsLXF1ZXJpZXMnO1xuXG50eXBlIERhdGFiYXNlc1BsdWdpblN0YXRlID0ge1xuICBzZWxlY3RlZERhdGFiYXNlOiBudW1iZXI7XG4gIHNlbGVjdGVkRGF0YWJhc2VUYWJsZTogc3RyaW5nIHwgbnVsbDtcbiAgcGFnZVJvd051bWJlcjogbnVtYmVyO1xuICBkYXRhYmFzZXM6IEFycmF5PERhdGFiYXNlRW50cnk+O1xuICBvdXRkYXRlZERhdGFiYXNlTGlzdDogYm9vbGVhbjtcbiAgdmlld01vZGU6ICdkYXRhJyB8ICdzdHJ1Y3R1cmUnIHwgJ1NRTCcgfCAndGFibGVJbmZvJyB8ICdxdWVyeUhpc3RvcnknO1xuICBlcnJvcjogbnVsbDtcbiAgY3VycmVudFBhZ2U6IFBhZ2UgfCBudWxsO1xuICBjdXJyZW50U3RydWN0dXJlOiBTdHJ1Y3R1cmUgfCBudWxsO1xuICBjdXJyZW50U29ydDogVGFibGVSb3dTb3J0T3JkZXIgfCBudWxsO1xuICBxdWVyeTogUXVlcnkgfCBudWxsO1xuICBxdWVyeVJlc3VsdDogUXVlcnlSZXN1bHQgfCBudWxsO1xuICBleGVjdXRpb25UaW1lOiBudW1iZXI7XG4gIHRhYmxlSW5mbzogc3RyaW5nO1xuICBxdWVyeUhpc3Rvcnk6IEFycmF5PFF1ZXJ5Pjtcbn07XG5cbmV4cG9ydCB0eXBlIFBhZ2UgPSB7XG4gIGRhdGFiYXNlSWQ6IG51bWJlcjtcbiAgdGFibGU6IHN0cmluZztcbiAgY29sdW1uczogQXJyYXk8c3RyaW5nPjtcbiAgcm93czogQXJyYXk8QXJyYXk8VmFsdWU+PjtcbiAgc3RhcnQ6IG51bWJlcjtcbiAgY291bnQ6IG51bWJlcjtcbiAgdG90YWw6IG51bWJlcjtcbiAgaGlnaGxpZ2h0ZWRSb3dzOiBBcnJheTxudW1iZXI+O1xufTtcblxuZXhwb3J0IHR5cGUgU3RydWN0dXJlID0ge1xuICBkYXRhYmFzZUlkOiBudW1iZXI7XG4gIHRhYmxlOiBzdHJpbmc7XG4gIGNvbHVtbnM6IEFycmF5PHN0cmluZz47XG4gIHJvd3M6IEFycmF5PEFycmF5PFZhbHVlPj47XG4gIGluZGV4ZXNDb2x1bW5zOiBBcnJheTxzdHJpbmc+O1xuICBpbmRleGVzVmFsdWVzOiBBcnJheTxBcnJheTxWYWx1ZT4+O1xufTtcblxuZXhwb3J0IHR5cGUgUXVlcnlSZXN1bHQgPSB7XG4gIHRhYmxlOiBRdWVyaWVkVGFibGUgfCBudWxsO1xuICBpZDogbnVtYmVyIHwgbnVsbDtcbiAgY291bnQ6IG51bWJlciB8IG51bGw7XG59O1xuXG5leHBvcnQgdHlwZSBRdWVyaWVkVGFibGUgPSB7XG4gIGNvbHVtbnM6IEFycmF5PHN0cmluZz47XG4gIHJvd3M6IEFycmF5PEFycmF5PFZhbHVlPj47XG4gIGhpZ2hsaWdodGVkUm93czogQXJyYXk8bnVtYmVyPjtcbn07XG5cbmV4cG9ydCB0eXBlIERhdGFiYXNlRW50cnkgPSB7XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbiAgdGFibGVzOiBBcnJheTxzdHJpbmc+O1xufTtcblxuZXhwb3J0IHR5cGUgUXVlcnkgPSB7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHRpbWU6IHN0cmluZztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwbHVnaW4oY2xpZW50OiBQbHVnaW5DbGllbnQ8RXZlbnRzLCBNZXRob2RzPikge1xuICBjb25zdCBwbHVnaW5TdGF0ZSA9IGNyZWF0ZVN0YXRlPERhdGFiYXNlc1BsdWdpblN0YXRlPih7XG4gICAgc2VsZWN0ZWREYXRhYmFzZTogMCxcbiAgICBzZWxlY3RlZERhdGFiYXNlVGFibGU6IG51bGwsXG4gICAgcGFnZVJvd051bWJlcjogMCxcbiAgICBkYXRhYmFzZXM6IFtdLFxuICAgIG91dGRhdGVkRGF0YWJhc2VMaXN0OiB0cnVlLFxuICAgIHZpZXdNb2RlOiAnZGF0YScsXG4gICAgZXJyb3I6IG51bGwsXG4gICAgY3VycmVudFBhZ2U6IG51bGwsXG4gICAgY3VycmVudFN0cnVjdHVyZTogbnVsbCxcbiAgICBjdXJyZW50U29ydDogbnVsbCxcbiAgICBxdWVyeTogbnVsbCxcbiAgICBxdWVyeVJlc3VsdDogbnVsbCxcbiAgICBleGVjdXRpb25UaW1lOiAwLFxuICAgIHRhYmxlSW5mbzogJycsXG4gICAgcXVlcnlIaXN0b3J5OiBbXSxcbiAgfSk7XG5cbiAgY29uc3QgZmF2b3JpdGVzU3RhdGUgPSBjcmVhdGVTdGF0ZTxzdHJpbmdbXT4oW10sIHtwZXJzaXN0OiAnZmF2b3JpdGVzJ30pO1xuICBmYXZvcml0ZXNTdGF0ZS5zdWJzY3JpYmUoKGZhdm9yaXRlcykgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgRkFWT1JJVEVTX0xPQ0FMX1NUT1JBR0VfS0VZLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoZmF2b3JpdGVzKSxcbiAgICApO1xuICB9KTtcblxuICBjb25zdCB1cGRhdGVEYXRhYmFzZXMgPSAoZXZlbnQ6IHtcbiAgICBkYXRhYmFzZXM6IEFycmF5PHtuYW1lOiBzdHJpbmc7IGlkOiBudW1iZXI7IHRhYmxlczogQXJyYXk8c3RyaW5nPn0+O1xuICB9KSA9PiB7XG4gICAgY29uc3QgdXBkYXRlcyA9IGV2ZW50LmRhdGFiYXNlcyA/PyBbXTtcbiAgICBjb25zdCBzdGF0ZSA9IHBsdWdpblN0YXRlLmdldCgpO1xuICAgIGNvbnN0IGRhdGFiYXNlcyA9IHVwZGF0ZXMuc29ydCgoZGIxLCBkYjIpID0+IGRiMS5pZCAtIGRiMi5pZCk7XG4gICAgY29uc3Qgc2VsZWN0ZWREYXRhYmFzZSA9XG4gICAgICBzdGF0ZS5zZWxlY3RlZERhdGFiYXNlIHx8XG4gICAgICAoT2JqZWN0LnZhbHVlcyhkYXRhYmFzZXMpWzBdID8gT2JqZWN0LnZhbHVlcyhkYXRhYmFzZXMpWzBdLmlkIDogMCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRUYWJsZSA9XG4gICAgICBzdGF0ZS5zZWxlY3RlZERhdGFiYXNlVGFibGUgJiZcbiAgICAgIHNlbGVjdGVkRGF0YWJhc2UgPiAwICYmXG4gICAgICBkYXRhYmFzZXMubGVuZ3RoID49IHNlbGVjdGVkRGF0YWJhc2UgJiZcbiAgICAgIGRhdGFiYXNlc1tzZWxlY3RlZERhdGFiYXNlIC0gMV0udGFibGVzLmluY2x1ZGVzKFxuICAgICAgICBzdGF0ZS5zZWxlY3RlZERhdGFiYXNlVGFibGUsXG4gICAgICApXG4gICAgICAgID8gc3RhdGUuc2VsZWN0ZWREYXRhYmFzZVRhYmxlXG4gICAgICAgIDogZGF0YWJhc2VzW3NlbGVjdGVkRGF0YWJhc2UgLSAxXS50YWJsZXNbMF07XG4gICAgY29uc3Qgc2FtZVRhYmxlU2VsZWN0ZWQgPVxuICAgICAgc2VsZWN0ZWREYXRhYmFzZSA9PT0gc3RhdGUuc2VsZWN0ZWREYXRhYmFzZSAmJlxuICAgICAgc2VsZWN0ZWRUYWJsZSA9PT0gc3RhdGUuc2VsZWN0ZWREYXRhYmFzZVRhYmxlO1xuICAgIHBsdWdpblN0YXRlLnNldCh7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGRhdGFiYXNlcyxcbiAgICAgIG91dGRhdGVkRGF0YWJhc2VMaXN0OiBmYWxzZSxcbiAgICAgIHNlbGVjdGVkRGF0YWJhc2U6IHNlbGVjdGVkRGF0YWJhc2UsXG4gICAgICBzZWxlY3RlZERhdGFiYXNlVGFibGU6IHNlbGVjdGVkVGFibGUsXG4gICAgICBwYWdlUm93TnVtYmVyOiAwLFxuICAgICAgY3VycmVudFBhZ2U6IHNhbWVUYWJsZVNlbGVjdGVkID8gc3RhdGUuY3VycmVudFBhZ2UgOiBudWxsLFxuICAgICAgY3VycmVudFN0cnVjdHVyZTogbnVsbCxcbiAgICAgIGN1cnJlbnRTb3J0OiBzYW1lVGFibGVTZWxlY3RlZCA/IHN0YXRlLmN1cnJlbnRTb3J0IDogbnVsbCxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVTZWxlY3RlZERhdGFiYXNlID0gKGV2ZW50OiB7ZGF0YWJhc2U6IG51bWJlcn0pID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IHBsdWdpblN0YXRlLmdldCgpO1xuICAgIHBsdWdpblN0YXRlLnNldCh7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHNlbGVjdGVkRGF0YWJhc2U6IGV2ZW50LmRhdGFiYXNlLFxuICAgICAgc2VsZWN0ZWREYXRhYmFzZVRhYmxlOlxuICAgICAgICBzdGF0ZS5kYXRhYmFzZXNbZXZlbnQuZGF0YWJhc2UgLSAxXS50YWJsZXNbMF0gfHwgbnVsbCxcbiAgICAgIHBhZ2VSb3dOdW1iZXI6IDAsXG4gICAgICBjdXJyZW50UGFnZTogbnVsbCxcbiAgICAgIGN1cnJlbnRTdHJ1Y3R1cmU6IG51bGwsXG4gICAgICBjdXJyZW50U29ydDogbnVsbCxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVTZWxlY3RlZERhdGFiYXNlVGFibGUgPSAoZXZlbnQ6IHt0YWJsZTogc3RyaW5nfSkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gcGx1Z2luU3RhdGUuZ2V0KCk7XG4gICAgcGx1Z2luU3RhdGUuc2V0KHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgc2VsZWN0ZWREYXRhYmFzZVRhYmxlOiBldmVudC50YWJsZSxcbiAgICAgIHBhZ2VSb3dOdW1iZXI6IDAsXG4gICAgICBjdXJyZW50UGFnZTogbnVsbCxcbiAgICAgIGN1cnJlbnRTdHJ1Y3R1cmU6IG51bGwsXG4gICAgICBjdXJyZW50U29ydDogbnVsbCxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVWaWV3TW9kZSA9IChldmVudDoge1xuICAgIHZpZXdNb2RlOiAnZGF0YScgfCAnc3RydWN0dXJlJyB8ICdTUUwnIHwgJ3RhYmxlSW5mbycgfCAncXVlcnlIaXN0b3J5JztcbiAgfSkgPT4ge1xuICAgIHBsdWdpblN0YXRlLnVwZGF0ZSgoc3RhdGUpID0+IHtcbiAgICAgIHN0YXRlLnZpZXdNb2RlID0gZXZlbnQudmlld01vZGU7XG4gICAgICBzdGF0ZS5lcnJvciA9IG51bGw7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlUGFnZSA9IChldmVudDogUGFnZSkgPT4ge1xuICAgIHBsdWdpblN0YXRlLnVwZGF0ZSgoc3RhdGUpID0+IHtcbiAgICAgIHN0YXRlLmN1cnJlbnRQYWdlID0gZXZlbnQ7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlU3RydWN0dXJlID0gKGV2ZW50OiB7XG4gICAgZGF0YWJhc2VJZDogbnVtYmVyO1xuICAgIHRhYmxlOiBzdHJpbmc7XG4gICAgY29sdW1uczogQXJyYXk8c3RyaW5nPjtcbiAgICByb3dzOiBBcnJheTxBcnJheTxWYWx1ZT4+O1xuICAgIGluZGV4ZXNDb2x1bW5zOiBBcnJheTxzdHJpbmc+O1xuICAgIGluZGV4ZXNWYWx1ZXM6IEFycmF5PEFycmF5PFZhbHVlPj47XG4gIH0pID0+IHtcbiAgICBwbHVnaW5TdGF0ZS51cGRhdGUoKHN0YXRlKSA9PiB7XG4gICAgICBzdGF0ZS5jdXJyZW50U3RydWN0dXJlID0ge1xuICAgICAgICBkYXRhYmFzZUlkOiBldmVudC5kYXRhYmFzZUlkLFxuICAgICAgICB0YWJsZTogZXZlbnQudGFibGUsXG4gICAgICAgIGNvbHVtbnM6IGV2ZW50LmNvbHVtbnMsXG4gICAgICAgIHJvd3M6IGV2ZW50LnJvd3MsXG4gICAgICAgIGluZGV4ZXNDb2x1bW5zOiBldmVudC5pbmRleGVzQ29sdW1ucyxcbiAgICAgICAgaW5kZXhlc1ZhbHVlczogZXZlbnQuaW5kZXhlc1ZhbHVlcyxcbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVNlbGVjdCA9IChldmVudDoge1xuICAgIGNvbHVtbnM6IEFycmF5PHN0cmluZz47XG4gICAgdmFsdWVzOiBBcnJheTxBcnJheTxWYWx1ZT4+O1xuICB9KSA9PiB7XG4gICAgcGx1Z2luU3RhdGUudXBkYXRlKChzdGF0ZSkgPT4ge1xuICAgICAgc3RhdGUucXVlcnlSZXN1bHQgPSB7XG4gICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgY29sdW1uczogZXZlbnQuY29sdW1ucyxcbiAgICAgICAgICByb3dzOiBldmVudC52YWx1ZXMsXG4gICAgICAgICAgaGlnaGxpZ2h0ZWRSb3dzOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgIGNvdW50OiBudWxsLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5SW5zZXJ0ID0gKGV2ZW50OiB7aWQ6IG51bWJlcn0pID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IHBsdWdpblN0YXRlLmdldCgpO1xuICAgIHBsdWdpblN0YXRlLnNldCh7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHF1ZXJ5UmVzdWx0OiB7XG4gICAgICAgIHRhYmxlOiBudWxsLFxuICAgICAgICBpZDogZXZlbnQuaWQsXG4gICAgICAgIGNvdW50OiBudWxsLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5VXBkYXRlRGVsZXRlID0gKGV2ZW50OiB7Y291bnQ6IG51bWJlcn0pID0+IHtcbiAgICBwbHVnaW5TdGF0ZS51cGRhdGUoKHN0YXRlKSA9PiB7XG4gICAgICBzdGF0ZS5xdWVyeVJlc3VsdCA9IHtcbiAgICAgICAgdGFibGU6IG51bGwsXG4gICAgICAgIGlkOiBudWxsLFxuICAgICAgICBjb3VudDogZXZlbnQuY291bnQsXG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZVRhYmxlSW5mbyA9IChldmVudDoge3RhYmxlSW5mbzogc3RyaW5nfSkgPT4ge1xuICAgIHBsdWdpblN0YXRlLnVwZGF0ZSgoc3RhdGUpID0+IHtcbiAgICAgIHN0YXRlLnRhYmxlSW5mbyA9IGV2ZW50LnRhYmxlSW5mbztcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBuZXh0UGFnZSA9ICgpID0+IHtcbiAgICBwbHVnaW5TdGF0ZS51cGRhdGUoKHN0YXRlKSA9PiB7XG4gICAgICBzdGF0ZS5wYWdlUm93TnVtYmVyICs9IFBBR0VfU0laRTtcbiAgICAgIHN0YXRlLmN1cnJlbnRQYWdlID0gbnVsbDtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBwcmV2aW91c1BhZ2UgPSAoKSA9PiB7XG4gICAgcGx1Z2luU3RhdGUudXBkYXRlKChzdGF0ZSkgPT4ge1xuICAgICAgc3RhdGUucGFnZVJvd051bWJlciA9IE1hdGgubWF4KHN0YXRlLnBhZ2VSb3dOdW1iZXIgLSBQQUdFX1NJWkUsIDApO1xuICAgICAgc3RhdGUuY3VycmVudFBhZ2UgPSBudWxsO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGV4ZWN1dGUgPSAoZXZlbnQ6IHtxdWVyeTogc3RyaW5nfSkgPT4ge1xuICAgIGNvbnN0IHRpbWVCZWZvcmUgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHtxdWVyeX0gPSBldmVudDtcbiAgICBjbGllbnRcbiAgICAgIC5zZW5kKCdleGVjdXRlJywge1xuICAgICAgICBkYXRhYmFzZUlkOiBwbHVnaW5TdGF0ZS5nZXQoKS5zZWxlY3RlZERhdGFiYXNlLFxuICAgICAgICB2YWx1ZTogcXVlcnksXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgcGx1Z2luU3RhdGUudXBkYXRlKChzdGF0ZSkgPT4ge1xuICAgICAgICAgIHN0YXRlLmVycm9yID0gbnVsbDtcbiAgICAgICAgICBzdGF0ZS5leGVjdXRpb25UaW1lID0gRGF0ZS5ub3coKSAtIHRpbWVCZWZvcmU7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZGF0YS50eXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgICAgIGRpc3BsYXlTZWxlY3Qoe1xuICAgICAgICAgICAgY29sdW1uczogZGF0YS5jb2x1bW5zLFxuICAgICAgICAgICAgdmFsdWVzOiBkYXRhLnZhbHVlcyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT09ICdpbnNlcnQnKSB7XG4gICAgICAgICAgZGlzcGxheUluc2VydCh7XG4gICAgICAgICAgICBpZDogZGF0YS5pbnNlcnRlZElkLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gJ3VwZGF0ZV9kZWxldGUnKSB7XG4gICAgICAgICAgZGlzcGxheVVwZGF0ZURlbGV0ZSh7XG4gICAgICAgICAgICBjb3VudDogZGF0YS5hZmZlY3RlZENvdW50LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgIHBsdWdpblN0YXRlLnVwZGF0ZSgoc3RhdGUpID0+IHtcbiAgICAgICAgICBzdGF0ZS5lcnJvciA9IGU7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgbGV0IG5ld0hpc3RvcnkgPSBwbHVnaW5TdGF0ZS5nZXQoKS5xdWVyeUhpc3Rvcnk7XG4gICAgY29uc3QgbmV3UXVlcnkgPSBwbHVnaW5TdGF0ZS5nZXQoKS5xdWVyeTtcbiAgICBpZiAoXG4gICAgICBuZXdRdWVyeSAhPT0gbnVsbCAmJlxuICAgICAgdHlwZW9mIG5ld1F1ZXJ5ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgbmV3SGlzdG9yeSAhPT0gbnVsbCAmJlxuICAgICAgdHlwZW9mIG5ld0hpc3RvcnkgIT09ICd1bmRlZmluZWQnXG4gICAgKSB7XG4gICAgICBuZXdRdWVyeS50aW1lID0gZGF0ZUZvcm1hdChuZXcgRGF0ZSgpLCAnaGg6TU06c3MnKTtcbiAgICAgIG5ld0hpc3RvcnkgPSBuZXdIaXN0b3J5LmNvbmNhdChuZXdRdWVyeSk7XG4gICAgfVxuICAgIHBsdWdpblN0YXRlLnVwZGF0ZSgoc3RhdGUpID0+IHtcbiAgICAgIHN0YXRlLnF1ZXJ5SGlzdG9yeSA9IG5ld0hpc3Rvcnk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZ29Ub1JvdyA9IChldmVudDoge3JvdzogbnVtYmVyfSkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gcGx1Z2luU3RhdGUuZ2V0KCk7XG4gICAgaWYgKCFzdGF0ZS5jdXJyZW50UGFnZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBkZXN0aW5hdGlvblJvdyA9XG4gICAgICBldmVudC5yb3cgPCAwXG4gICAgICAgID8gMFxuICAgICAgICA6IGV2ZW50LnJvdyA+PSBzdGF0ZS5jdXJyZW50UGFnZS50b3RhbCAtIFBBR0VfU0laRVxuICAgICAgICAgID8gTWF0aC5tYXgoc3RhdGUuY3VycmVudFBhZ2UudG90YWwgLSBQQUdFX1NJWkUsIDApXG4gICAgICAgICAgOiBldmVudC5yb3c7XG4gICAgcGx1Z2luU3RhdGUudXBkYXRlKChzdGF0ZSkgPT4ge1xuICAgICAgc3RhdGUucGFnZVJvd051bWJlciA9IGRlc3RpbmF0aW9uUm93O1xuICAgICAgc3RhdGUuY3VycmVudFBhZ2UgPSBudWxsO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlZnJlc2ggPSAoKSA9PiB7XG4gICAgcGx1Z2luU3RhdGUudXBkYXRlKChzdGF0ZSkgPT4ge1xuICAgICAgc3RhdGUub3V0ZGF0ZWREYXRhYmFzZUxpc3QgPSB0cnVlO1xuICAgICAgc3RhdGUuY3VycmVudFBhZ2UgPSBudWxsO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZE9yUmVtb3ZlUXVlcnlUb0Zhdm9yaXRlcyA9IChxdWVyeTogc3RyaW5nKSA9PiB7XG4gICAgZmF2b3JpdGVzU3RhdGUudXBkYXRlKChmYXZvcml0ZXMpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gZmF2b3JpdGVzLmluZGV4T2YocXVlcnkpO1xuICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICBmYXZvcml0ZXMucHVzaChxdWVyeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYXZvcml0ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBzb3J0QnlDaGFuZ2VkID0gKGV2ZW50OiB7c29ydE9yZGVyOiBUYWJsZVJvd1NvcnRPcmRlcn0pID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IHBsdWdpblN0YXRlLmdldCgpO1xuICAgIHBsdWdpblN0YXRlLnNldCh7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGN1cnJlbnRTb3J0OiBldmVudC5zb3J0T3JkZXIsXG4gICAgICBwYWdlUm93TnVtYmVyOiAwLFxuICAgICAgY3VycmVudFBhZ2U6IG51bGwsXG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlUXVlcnkgPSAoZXZlbnQ6IHt2YWx1ZTogc3RyaW5nfSkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gcGx1Z2luU3RhdGUuZ2V0KCk7XG4gICAgcGx1Z2luU3RhdGUuc2V0KHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgcXVlcnk6IHtcbiAgICAgICAgdmFsdWU6IGV2ZW50LnZhbHVlLFxuICAgICAgICB0aW1lOiBkYXRlRm9ybWF0KG5ldyBEYXRlKCksICdoaDpNTTpzcycpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBwYWdlSGlnaGxpZ2h0ZWRSb3dzQ2hhbmdlZCA9IChldmVudDogVGFibGVIaWdobGlnaHRlZFJvd3MpID0+IHtcbiAgICBwbHVnaW5TdGF0ZS51cGRhdGUoKGRyYWZ0U3RhdGU6IERhdGFiYXNlc1BsdWdpblN0YXRlKSA9PiB7XG4gICAgICBpZiAoZHJhZnRTdGF0ZS5jdXJyZW50UGFnZSAhPT0gbnVsbCkge1xuICAgICAgICBkcmFmdFN0YXRlLmN1cnJlbnRQYWdlLmhpZ2hsaWdodGVkUm93cyA9IGV2ZW50Lm1hcChwYXJzZUludCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcXVlcnlIaWdobGlnaHRlZFJvd3NDaGFuZ2VkID0gKGV2ZW50OiBUYWJsZUhpZ2hsaWdodGVkUm93cykgPT4ge1xuICAgIHBsdWdpblN0YXRlLnVwZGF0ZSgoc3RhdGUpID0+IHtcbiAgICAgIGlmIChzdGF0ZS5xdWVyeVJlc3VsdCkge1xuICAgICAgICBpZiAoc3RhdGUucXVlcnlSZXN1bHQudGFibGUpIHtcbiAgICAgICAgICBzdGF0ZS5xdWVyeVJlc3VsdC50YWJsZS5oaWdobGlnaHRlZFJvd3MgPSBldmVudC5tYXAocGFyc2VJbnQpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLnF1ZXJ5UmVzdWx0LmlkID0gbnVsbDtcbiAgICAgICAgc3RhdGUucXVlcnlSZXN1bHQuY291bnQgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHBsdWdpblN0YXRlLnN1YnNjcmliZShcbiAgICAobmV3U3RhdGU6IERhdGFiYXNlc1BsdWdpblN0YXRlLCBwcmV2aW91c1N0YXRlOiBEYXRhYmFzZXNQbHVnaW5TdGF0ZSkgPT4ge1xuICAgICAgY29uc3QgZGF0YWJhc2VJZCA9IG5ld1N0YXRlLnNlbGVjdGVkRGF0YWJhc2U7XG4gICAgICBjb25zdCB0YWJsZSA9IG5ld1N0YXRlLnNlbGVjdGVkRGF0YWJhc2VUYWJsZTtcbiAgICAgIGlmIChcbiAgICAgICAgbmV3U3RhdGUudmlld01vZGUgPT09ICdkYXRhJyAmJlxuICAgICAgICBuZXdTdGF0ZS5jdXJyZW50UGFnZSA9PT0gbnVsbCAmJlxuICAgICAgICBkYXRhYmFzZUlkICYmXG4gICAgICAgIHRhYmxlXG4gICAgICApIHtcbiAgICAgICAgY2xpZW50XG4gICAgICAgICAgLnNlbmQoJ2dldFRhYmxlRGF0YScsIHtcbiAgICAgICAgICAgIGNvdW50OiBQQUdFX1NJWkUsXG4gICAgICAgICAgICBkYXRhYmFzZUlkOiBuZXdTdGF0ZS5zZWxlY3RlZERhdGFiYXNlLFxuICAgICAgICAgICAgb3JkZXI6IG5ld1N0YXRlLmN1cnJlbnRTb3J0Py5rZXksXG4gICAgICAgICAgICByZXZlcnNlOiAobmV3U3RhdGUuY3VycmVudFNvcnQ/LmRpcmVjdGlvbiB8fCAndXAnKSA9PT0gJ2Rvd24nLFxuICAgICAgICAgICAgdGFibGU6IHRhYmxlLFxuICAgICAgICAgICAgc3RhcnQ6IG5ld1N0YXRlLnBhZ2VSb3dOdW1iZXIsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlUGFnZSh7XG4gICAgICAgICAgICAgIGRhdGFiYXNlSWQ6IGRhdGFiYXNlSWQsXG4gICAgICAgICAgICAgIHRhYmxlOiB0YWJsZSxcbiAgICAgICAgICAgICAgY29sdW1uczogZGF0YS5jb2x1bW5zLFxuICAgICAgICAgICAgICByb3dzOiBkYXRhLnZhbHVlcyxcbiAgICAgICAgICAgICAgc3RhcnQ6IGRhdGEuc3RhcnQsXG4gICAgICAgICAgICAgIGNvdW50OiBkYXRhLmNvdW50LFxuICAgICAgICAgICAgICB0b3RhbDogZGF0YS50b3RhbCxcbiAgICAgICAgICAgICAgaGlnaGxpZ2h0ZWRSb3dzOiBbXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICBwbHVnaW5TdGF0ZS51cGRhdGUoKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgIHN0YXRlLmVycm9yID0gZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKG5ld1N0YXRlLmN1cnJlbnRTdHJ1Y3R1cmUgPT09IG51bGwgJiYgZGF0YWJhc2VJZCAmJiB0YWJsZSkge1xuICAgICAgICBjbGllbnRcbiAgICAgICAgICAuc2VuZCgnZ2V0VGFibGVTdHJ1Y3R1cmUnLCB7XG4gICAgICAgICAgICBkYXRhYmFzZUlkOiBkYXRhYmFzZUlkLFxuICAgICAgICAgICAgdGFibGU6IHRhYmxlLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZVN0cnVjdHVyZSh7XG4gICAgICAgICAgICAgIGRhdGFiYXNlSWQ6IGRhdGFiYXNlSWQsXG4gICAgICAgICAgICAgIHRhYmxlOiB0YWJsZSxcbiAgICAgICAgICAgICAgY29sdW1uczogZGF0YS5zdHJ1Y3R1cmVDb2x1bW5zLFxuICAgICAgICAgICAgICByb3dzOiBkYXRhLnN0cnVjdHVyZVZhbHVlcyxcbiAgICAgICAgICAgICAgaW5kZXhlc0NvbHVtbnM6IGRhdGEuaW5kZXhlc0NvbHVtbnMsXG4gICAgICAgICAgICAgIGluZGV4ZXNWYWx1ZXM6IGRhdGEuaW5kZXhlc1ZhbHVlcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICBwbHVnaW5TdGF0ZS51cGRhdGUoKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgIHN0YXRlLmVycm9yID0gZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBuZXdTdGF0ZS52aWV3TW9kZSA9PT0gJ3RhYmxlSW5mbycgJiZcbiAgICAgICAgbmV3U3RhdGUuY3VycmVudFN0cnVjdHVyZSA9PT0gbnVsbCAmJlxuICAgICAgICBkYXRhYmFzZUlkICYmXG4gICAgICAgIHRhYmxlXG4gICAgICApIHtcbiAgICAgICAgY2xpZW50XG4gICAgICAgICAgLnNlbmQoJ2dldFRhYmxlSW5mbycsIHtcbiAgICAgICAgICAgIGRhdGFiYXNlSWQ6IGRhdGFiYXNlSWQsXG4gICAgICAgICAgICB0YWJsZTogdGFibGUsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlVGFibGVJbmZvKHtcbiAgICAgICAgICAgICAgdGFibGVJbmZvOiBkYXRhLmRlZmluaXRpb24sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgcGx1Z2luU3RhdGUudXBkYXRlKChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgICBzdGF0ZS5lcnJvciA9IGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICAhcHJldmlvdXNTdGF0ZS5vdXRkYXRlZERhdGFiYXNlTGlzdCAmJlxuICAgICAgICBuZXdTdGF0ZS5vdXRkYXRlZERhdGFiYXNlTGlzdFxuICAgICAgKSB7XG4gICAgICAgIGNsaWVudFxuICAgICAgICAgIC5zZW5kKCdkYXRhYmFzZUxpc3QnLCB7fSlcbiAgICAgICAgICAudGhlbigoZGF0YWJhc2VzKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVEYXRhYmFzZXMoe1xuICAgICAgICAgICAgICBkYXRhYmFzZXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZSkgPT4gY29uc29sZS5lcnJvcignZGF0YWJhc2VMaXN0IHJlcXVlc3QgZmFpbGVkOicsIGUpKTtcbiAgICAgIH1cbiAgICB9LFxuICApO1xuXG4gIGNsaWVudC5vbkNvbm5lY3QoKCkgPT4ge1xuICAgIGNsaWVudFxuICAgICAgLnNlbmQoJ2RhdGFiYXNlTGlzdCcsIHt9KVxuICAgICAgLnRoZW4oKGRhdGFiYXNlcykgPT4ge1xuICAgICAgICB1cGRhdGVEYXRhYmFzZXMoe1xuICAgICAgICAgIGRhdGFiYXNlcyxcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiBjb25zb2xlLmVycm9yKCdpbml0aWFsIGRhdGFiYXNlTGlzdCByZXF1ZXN0IGZhaWxlZDonLCBlKSk7XG4gICAgY29uc3QgbG9hZGVkRmF2b3JpdGVzSnNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFxuICAgICAgRkFWT1JJVEVTX0xPQ0FMX1NUT1JBR0VfS0VZLFxuICAgICk7XG4gICAgaWYgKGxvYWRlZEZhdm9yaXRlc0pzb24pIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZhdm9yaXRlc1N0YXRlLnNldChKU09OLnBhcnNlKGxvYWRlZEZhdm9yaXRlc0pzb24pKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gbG9hZCBmYXZvcml0ZSBxdWVyaWVzIGZyb20gbG9jYWwgc3RvcmFnZScpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzdGF0ZTogcGx1Z2luU3RhdGUsXG4gICAgZmF2b3JpdGVzU3RhdGUsXG4gICAgdXBkYXRlRGF0YWJhc2VzLFxuICAgIHVwZGF0ZVNlbGVjdGVkRGF0YWJhc2UsXG4gICAgdXBkYXRlU2VsZWN0ZWREYXRhYmFzZVRhYmxlLFxuICAgIHVwZGF0ZVZpZXdNb2RlLFxuICAgIHVwZGF0ZVBhZ2UsXG4gICAgdXBkYXRlU3RydWN0dXJlLFxuICAgIGRpc3BsYXlTZWxlY3QsXG4gICAgZGlzcGxheUluc2VydCxcbiAgICBkaXNwbGF5VXBkYXRlRGVsZXRlLFxuICAgIHVwZGF0ZVRhYmxlSW5mbyxcbiAgICBuZXh0UGFnZSxcbiAgICBwcmV2aW91c1BhZ2UsXG4gICAgZXhlY3V0ZSxcbiAgICBnb1RvUm93LFxuICAgIHJlZnJlc2gsXG4gICAgYWRkT3JSZW1vdmVRdWVyeVRvRmF2b3JpdGVzLFxuICAgIHNvcnRCeUNoYW5nZWQsXG4gICAgdXBkYXRlUXVlcnksXG4gICAgcGFnZUhpZ2hsaWdodGVkUm93c0NoYW5nZWQsXG4gICAgcXVlcnlIaWdobGlnaHRlZFJvd3NDaGFuZ2VkLFxuICB9O1xufVxuIiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuLy8gVE9ETzogRml4IHRoaXMgdGhlIG5leHQgdGltZSB0aGUgZmlsZSBpcyBlZGl0ZWQuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcnVsZXNkaXIvbm8tcmVzdHJpY3RlZC1pbXBvcnRzLWNsb25lXG5pbXBvcnQge1xuICBNYW5hZ2VkVGFibGUsXG4gIFRhYmxlQm9keUNvbHVtbixcbiAgVGFibGVSb3dzLFxuICBUYWJsZUJvZHlSb3csXG4gIFRhYmxlUm93U29ydE9yZGVyLFxuICBUYWJsZUhpZ2hsaWdodGVkUm93cyxcbn0gZnJvbSAnZmxpcHBlcic7XG5pbXBvcnQge1xuICBEYXRhYmFzZUVudHJ5LFxuICBQYWdlLFxuICBwbHVnaW4sXG4gIFF1ZXJ5LFxuICBRdWVyeVJlc3VsdCxcbiAgU3RydWN0dXJlLFxufSBmcm9tICcuL2luZGV4JztcbmltcG9ydCB7Z2V0U3RyaW5nRnJvbUVycm9yTGlrZX0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge1ZhbHVlLCByZW5kZXJWYWx1ZX0gZnJvbSAnLi9UeXBlQmFzZWRWYWx1ZVJlbmRlcmVyJztcbmltcG9ydCBSZWFjdCwge0tleWJvYXJkRXZlbnQsIENoYW5nZUV2ZW50LCB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2t9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBCdXR0b25OYXZpZ2F0aW9uIGZyb20gJy4vQnV0dG9uTmF2aWdhdGlvbic7XG5pbXBvcnQgRGF0YWJhc2VEZXRhaWxTaWRlYmFyIGZyb20gJy4vRGF0YWJhc2VEZXRhaWxTaWRlYmFyJztcbmltcG9ydCBEYXRhYmFzZVN0cnVjdHVyZSBmcm9tICcuL0RhdGFiYXNlU3RydWN0dXJlJztcbmltcG9ydCB7XG4gIGNvbnZlcnRTdHJpbmdUb1ZhbHVlLFxuICBjb25zdHJ1Y3RVcGRhdGVRdWVyeSxcbiAgaXNVcGRhdGFibGUsXG59IGZyb20gJy4vVXBkYXRlUXVlcnlVdGlsJztcbmltcG9ydCBzcWxGb3JtYXR0ZXIgZnJvbSAnc3FsLWZvcm1hdHRlcic7XG5pbXBvcnQge1xuICB1c2VQbHVnaW4sXG4gIHVzZVZhbHVlLFxuICBMYXlvdXQsXG4gIHVzZU1lbW9pemUsXG4gIFRvb2xiYXIsXG4gIHRoZW1lLFxuICBzdHlsZWQsXG4gIHByb2R1Y2UsXG59IGZyb20gJ2ZsaXBwZXItcGx1Z2luJztcbmltcG9ydCB7XG4gIFNlbGVjdCxcbiAgUmFkaW8sXG4gIFJhZGlvQ2hhbmdlRXZlbnQsXG4gIFR5cG9ncmFwaHksXG4gIEJ1dHRvbixcbiAgTWVudSxcbiAgRHJvcGRvd24sXG4gIElucHV0LFxufSBmcm9tICdhbnRkJztcbmltcG9ydCB7XG4gIENvbnNvbGVTcWxPdXRsaW5lZCxcbiAgRGF0YWJhc2VPdXRsaW5lZCxcbiAgRG93bk91dGxpbmVkLFxuICBIaXN0b3J5T3V0bGluZWQsXG4gIFNldHRpbmdPdXRsaW5lZCxcbiAgU3RhckZpbGxlZCxcbiAgU3Rhck91dGxpbmVkLFxuICBUYWJsZU91dGxpbmVkLFxufSBmcm9tICdAYW50LWRlc2lnbi9pY29ucyc7XG5cbmNvbnN0IHtUZXh0QXJlYX0gPSBJbnB1dDtcblxuY29uc3Qge09wdGlvbn0gPSBTZWxlY3Q7XG5cbmNvbnN0IHtUZXh0fSA9IFR5cG9ncmFwaHk7XG5cbmNvbnN0IEJvbGRTcGFuID0gc3R5bGVkLnNwYW4oe1xuICBmb250U2l6ZTogMTIsXG4gIGNvbG9yOiAnIzkwOTQ5YycsXG4gIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsXG59KTtcbmNvbnN0IEVycm9yQmFyID0gc3R5bGVkLmRpdih7XG4gIGJhY2tncm91bmRDb2xvcjogdGhlbWUuZXJyb3JDb2xvcixcbiAgY29sb3I6IHRoZW1lLnRleHRDb2xvclByaW1hcnksXG4gIGxpbmVIZWlnaHQ6ICcyNnB4JyxcbiAgdGV4dEFsaWduOiAnY2VudGVyJyxcbn0pO1xuY29uc3QgUGFnZUluZm9Db250YWluZXIgPSBzdHlsZWQoTGF5b3V0Lkhvcml6b250YWwpKHthbGlnbkl0ZW1zOiAnY2VudGVyJ30pO1xuXG5mdW5jdGlvbiB0cmFuc2Zvcm1Sb3coXG4gIGNvbHVtbnM6IEFycmF5PHN0cmluZz4sXG4gIHJvdzogQXJyYXk8VmFsdWU+LFxuICBpbmRleDogbnVtYmVyLFxuKTogVGFibGVCb2R5Um93IHtcbiAgY29uc3QgdHJhbnNmb3JtZWRDb2x1bW5zOiB7W2tleTogc3RyaW5nXTogVGFibGVCb2R5Q29sdW1ufSA9IHt9O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICB0cmFuc2Zvcm1lZENvbHVtbnNbY29sdW1uc1tpXV0gPSB7dmFsdWU6IHJlbmRlclZhbHVlKHJvd1tpXSwgdHJ1ZSl9O1xuICB9XG4gIHJldHVybiB7a2V5OiBTdHJpbmcoaW5kZXgpLCBjb2x1bW5zOiB0cmFuc2Zvcm1lZENvbHVtbnN9O1xufVxuXG5jb25zdCBRdWVyeUhpc3RvcnkgPSBSZWFjdC5tZW1vKCh7aGlzdG9yeX06IHtoaXN0b3J5OiBBcnJheTxRdWVyeT59KSA9PiB7XG4gIGlmICghaGlzdG9yeSB8fCB0eXBlb2YgaGlzdG9yeSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBjb2x1bW5zID0ge1xuICAgIHRpbWU6IHtcbiAgICAgIHZhbHVlOiAnVGltZScsXG4gICAgICByZXNpemFibGU6IHRydWUsXG4gICAgfSxcbiAgICBxdWVyeToge1xuICAgICAgdmFsdWU6ICdRdWVyeScsXG4gICAgICByZXNpemFibGU6IHRydWUsXG4gICAgfSxcbiAgfTtcbiAgY29uc3Qgcm93czogVGFibGVSb3dzID0gW107XG4gIGlmIChoaXN0b3J5Lmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gaGlzdG9yeVtpXTtcbiAgICAgIGNvbnN0IHRpbWUgPSBxdWVyeS50aW1lO1xuICAgICAgY29uc3QgdmFsdWUgPSBxdWVyeS52YWx1ZTtcbiAgICAgIHJvd3MucHVzaCh7XG4gICAgICAgIGtleTogYCR7aX1gLFxuICAgICAgICBjb2x1bW5zOiB7dGltZToge3ZhbHVlOiB0aW1lfSwgcXVlcnk6IHt2YWx1ZTogdmFsdWV9fSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPExheW91dC5Ib3Jpem9udGFsIGdyb3c+XG4gICAgICA8TWFuYWdlZFRhYmxlXG4gICAgICAgIGZsb2F0aW5nPXtmYWxzZX1cbiAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgY29sdW1uU2l6ZXM9e3t0aW1lOiA3NX19XG4gICAgICAgIHplYnJhXG4gICAgICAgIHJvd3M9e3Jvd3N9XG4gICAgICAgIGhvcml6b250YWxseVNjcm9sbGFibGVcbiAgICAgIC8+XG4gICAgPC9MYXlvdXQuSG9yaXpvbnRhbD5cbiAgKTtcbn0pO1xuXG50eXBlIFBhZ2VJbmZvUHJvcHMgPSB7XG4gIGN1cnJlbnRSb3c6IG51bWJlcjtcbiAgY291bnQ6IG51bWJlcjtcbiAgdG90YWxSb3dzOiBudW1iZXI7XG4gIG9uQ2hhbmdlOiAoY3VycmVudFJvdzogbnVtYmVyLCBjb3VudDogbnVtYmVyKSA9PiB2b2lkO1xufTtcblxuY29uc3QgUGFnZUluZm8gPSBSZWFjdC5tZW1vKChwcm9wczogUGFnZUluZm9Qcm9wcykgPT4ge1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKHtcbiAgICBpc09wZW46IGZhbHNlLFxuICAgIGlucHV0VmFsdWU6IFN0cmluZyhwcm9wcy5jdXJyZW50Um93KSxcbiAgfSk7XG5cbiAgY29uc3Qgb25PcGVuID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFN0YXRlKHsuLi5zdGF0ZSwgaXNPcGVuOiB0cnVlfSk7XG4gIH0sIFtzdGF0ZV0pO1xuXG4gIGNvbnN0IG9uSW5wdXRDaGFuZ2VkID0gdXNlQ2FsbGJhY2soXG4gICAgKGU6IENoYW5nZUV2ZW50PGFueT4pID0+IHtcbiAgICAgIHNldFN0YXRlKHsuLi5zdGF0ZSwgaW5wdXRWYWx1ZTogZS50YXJnZXQudmFsdWV9KTtcbiAgICB9LFxuICAgIFtzdGF0ZV0sXG4gICk7XG5cbiAgY29uc3Qgb25TdWJtaXQgPSB1c2VDYWxsYmFjayhcbiAgICAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIGNvbnN0IHJvd051bWJlciA9IHBhcnNlSW50KHN0YXRlLmlucHV0VmFsdWUsIDEwKTtcbiAgICAgICAgcHJvcHMub25DaGFuZ2Uocm93TnVtYmVyIC0gMSwgcHJvcHMuY291bnQpO1xuICAgICAgICBzZXRTdGF0ZSh7Li4uc3RhdGUsIGlzT3BlbjogZmFsc2V9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtwcm9wcywgc3RhdGVdLFxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPFBhZ2VJbmZvQ29udGFpbmVyIGdyb3c+XG4gICAgICA8ZGl2IHN0eWxlPXt7ZmxleDogMX19IC8+XG4gICAgICA8VGV4dD5cbiAgICAgICAge3Byb3BzLmNvdW50ID09PSBwcm9wcy50b3RhbFJvd3NcbiAgICAgICAgICA/IGAke3Byb3BzLmNvdW50fSBgXG4gICAgICAgICAgOiBgJHtwcm9wcy5jdXJyZW50Um93ICsgMX0tJHtwcm9wcy5jdXJyZW50Um93ICsgcHJvcHMuY291bnR9IGB9XG4gICAgICAgIG9mIHtwcm9wcy50b3RhbFJvd3N9IHJvd3NcbiAgICAgIDwvVGV4dD5cbiAgICAgIDxkaXYgc3R5bGU9e3tmbGV4OiAxfX0gLz5cbiAgICAgIHtzdGF0ZS5pc09wZW4gPyAoXG4gICAgICAgIDxJbnB1dFxuICAgICAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17KHByb3BzLmN1cnJlbnRSb3cgKyAxKS50b1N0cmluZygpfVxuICAgICAgICAgIG9uQ2hhbmdlPXtvbklucHV0Q2hhbmdlZH1cbiAgICAgICAgICBvbktleURvd249e29uU3VibWl0fVxuICAgICAgICAvPlxuICAgICAgKSA6IChcbiAgICAgICAgPEJ1dHRvbiBzdHlsZT17e3RleHRBbGlnbjogJ2NlbnRlcid9fSBvbkNsaWNrPXtvbk9wZW59PlxuICAgICAgICAgIEdvIFRvIFJvd1xuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICl9XG4gICAgPC9QYWdlSW5mb0NvbnRhaW5lcj5cbiAgKTtcbn0pO1xuXG5jb25zdCBEYXRhVGFibGUgPSBSZWFjdC5tZW1vKFxuICAoe1xuICAgIHBhZ2UsXG4gICAgaGlnaGxpZ2h0ZWRSb3dzQ2hhbmdlZCxcbiAgICBzb3J0T3JkZXJDaGFuZ2VkLFxuICAgIGN1cnJlbnRTb3J0LFxuICAgIGN1cnJlbnRTdHJ1Y3R1cmUsXG4gICAgb25Sb3dFZGl0ZWQsXG4gIH06IHtcbiAgICBwYWdlOiBQYWdlIHwgbnVsbDtcbiAgICBoaWdobGlnaHRlZFJvd3NDaGFuZ2VkOiAoaGlnaGxpZ2h0ZWRSb3dzOiBUYWJsZUhpZ2hsaWdodGVkUm93cykgPT4gdm9pZDtcbiAgICBzb3J0T3JkZXJDaGFuZ2VkOiAoc29ydE9yZGVyOiBUYWJsZVJvd1NvcnRPcmRlcikgPT4gdm9pZDtcbiAgICBjdXJyZW50U29ydDogVGFibGVSb3dTb3J0T3JkZXIgfCBudWxsO1xuICAgIGN1cnJlbnRTdHJ1Y3R1cmU6IFN0cnVjdHVyZSB8IG51bGw7XG4gICAgb25Sb3dFZGl0ZWQ6IChjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVsbH0pID0+IHZvaWQ7XG4gIH0pID0+XG4gICAgcGFnZSAmJiBwYWdlLmNvbHVtbnMgPyAoXG4gICAgICA8TGF5b3V0Lkhvcml6b250YWwgZ3Jvdz5cbiAgICAgICAgPE1hbmFnZWRUYWJsZVxuICAgICAgICAgIHRhYmxlS2V5PXtgZGF0YWJhc2VzLSR7cGFnZS5kYXRhYmFzZUlkfS0ke3BhZ2UudGFibGV9YH1cbiAgICAgICAgICBmbG9hdGluZz17ZmFsc2V9XG4gICAgICAgICAgY29sdW1uT3JkZXI9e3BhZ2UuY29sdW1ucy5tYXAoKG5hbWUpID0+ICh7XG4gICAgICAgICAgICBrZXk6IG5hbWUsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgIH0pKX1cbiAgICAgICAgICBjb2x1bW5zPXtwYWdlLmNvbHVtbnMucmVkdWNlKFxuICAgICAgICAgICAgKGFjYywgdmFsKSA9PlxuICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBhY2MsIHtcbiAgICAgICAgICAgICAgICBbdmFsXToge3ZhbHVlOiB2YWwsIHJlc2l6YWJsZTogdHJ1ZSwgc29ydGFibGU6IHRydWV9LFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICl9XG4gICAgICAgICAgemVicmFcbiAgICAgICAgICByb3dzPXtwYWdlLnJvd3MubWFwKChyb3c6IEFycmF5PFZhbHVlPiwgaW5kZXg6IG51bWJlcikgPT5cbiAgICAgICAgICAgIHRyYW5zZm9ybVJvdyhwYWdlLmNvbHVtbnMsIHJvdywgaW5kZXgpLFxuICAgICAgICAgICl9XG4gICAgICAgICAgaG9yaXpvbnRhbGx5U2Nyb2xsYWJsZVxuICAgICAgICAgIG11bHRpSGlnaGxpZ2h0XG4gICAgICAgICAgb25Sb3dIaWdobGlnaHRlZD17aGlnaGxpZ2h0ZWRSb3dzQ2hhbmdlZH1cbiAgICAgICAgICBvblNvcnQ9e3NvcnRPcmRlckNoYW5nZWR9XG4gICAgICAgICAgaW5pdGlhbFNvcnRPcmRlcj17Y3VycmVudFNvcnQgPz8gdW5kZWZpbmVkfVxuICAgICAgICAvPlxuICAgICAgICB7cGFnZS5oaWdobGlnaHRlZFJvd3MubGVuZ3RoID09PSAxICYmIChcbiAgICAgICAgICA8RGF0YWJhc2VEZXRhaWxTaWRlYmFyXG4gICAgICAgICAgICBjb2x1bW5MYWJlbHM9e3BhZ2UuY29sdW1uc31cbiAgICAgICAgICAgIGNvbHVtblZhbHVlcz17cGFnZS5yb3dzW3BhZ2UuaGlnaGxpZ2h0ZWRSb3dzWzBdXX1cbiAgICAgICAgICAgIG9uU2F2ZT17XG4gICAgICAgICAgICAgIGN1cnJlbnRTdHJ1Y3R1cmUgJiZcbiAgICAgICAgICAgICAgaXNVcGRhdGFibGUoY3VycmVudFN0cnVjdHVyZS5jb2x1bW5zLCBjdXJyZW50U3RydWN0dXJlLnJvd3MpXG4gICAgICAgICAgICAgICAgPyBvblJvd0VkaXRlZFxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvTGF5b3V0Lkhvcml6b250YWw+XG4gICAgKSA6IG51bGwsXG4pO1xuXG5jb25zdCBRdWVyeVRhYmxlID0gUmVhY3QubWVtbyhcbiAgKHtcbiAgICBxdWVyeSxcbiAgICBoaWdobGlnaHRlZFJvd3NDaGFuZ2VkLFxuICB9OiB7XG4gICAgcXVlcnk6IFF1ZXJ5UmVzdWx0IHwgbnVsbDtcbiAgICBoaWdobGlnaHRlZFJvd3NDaGFuZ2VkOiAoaGlnaGxpZ2h0ZWRSb3dzOiBUYWJsZUhpZ2hsaWdodGVkUm93cykgPT4gdm9pZDtcbiAgfSkgPT4ge1xuICAgIGlmICghcXVlcnkgfHwgcXVlcnkgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBxdWVyeS50YWJsZSAmJlxuICAgICAgdHlwZW9mIHF1ZXJ5LnRhYmxlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgcXVlcnkudGFibGUgIT09IG51bGxcbiAgICApIHtcbiAgICAgIGNvbnN0IHRhYmxlID0gcXVlcnkudGFibGU7XG4gICAgICBjb25zdCBjb2x1bW5zID0gdGFibGUuY29sdW1ucztcbiAgICAgIGNvbnN0IHJvd3MgPSB0YWJsZS5yb3dzO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPExheW91dC5Db250YWluZXIgZ3Jvdz5cbiAgICAgICAgICA8TWFuYWdlZFRhYmxlXG4gICAgICAgICAgICBmbG9hdGluZz17ZmFsc2V9XG4gICAgICAgICAgICBtdWx0aWxpbmVcbiAgICAgICAgICAgIGNvbHVtbk9yZGVyPXtjb2x1bW5zLm1hcCgobmFtZSkgPT4gKHtcbiAgICAgICAgICAgICAga2V5OiBuYW1lLFxuICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSkpfVxuICAgICAgICAgICAgY29sdW1ucz17Y29sdW1ucy5yZWR1Y2UoXG4gICAgICAgICAgICAgIChhY2MsIHZhbCkgPT5cbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBhY2MsIHtbdmFsXToge3ZhbHVlOiB2YWwsIHJlc2l6YWJsZTogdHJ1ZX19KSxcbiAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgemVicmFcbiAgICAgICAgICAgIHJvd3M9e3Jvd3MubWFwKChyb3c6IEFycmF5PFZhbHVlPiwgaW5kZXg6IG51bWJlcikgPT5cbiAgICAgICAgICAgICAgdHJhbnNmb3JtUm93KGNvbHVtbnMsIHJvdywgaW5kZXgpLFxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIGhvcml6b250YWxseVNjcm9sbGFibGVcbiAgICAgICAgICAgIG9uUm93SGlnaGxpZ2h0ZWQ9e2hpZ2hsaWdodGVkUm93c0NoYW5nZWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7dGFibGUuaGlnaGxpZ2h0ZWRSb3dzLmxlbmd0aCA9PT0gMSAmJiAoXG4gICAgICAgICAgICA8RGF0YWJhc2VEZXRhaWxTaWRlYmFyXG4gICAgICAgICAgICAgIGNvbHVtbkxhYmVscz17dGFibGUuY29sdW1uc31cbiAgICAgICAgICAgICAgY29sdW1uVmFsdWVzPXt0YWJsZS5yb3dzW3RhYmxlLmhpZ2hsaWdodGVkUm93c1swXV19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvTGF5b3V0LkNvbnRhaW5lcj5cbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChxdWVyeS5pZCAmJiBxdWVyeS5pZCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPExheW91dC5Ib3Jpem9udGFsIGdyb3cgcGFkPlxuICAgICAgICAgIDxUZXh0PlJvdyBpZDoge3F1ZXJ5LmlkfTwvVGV4dD5cbiAgICAgICAgPC9MYXlvdXQuSG9yaXpvbnRhbD5cbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChxdWVyeS5jb3VudCAmJiBxdWVyeS5jb3VudCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPExheW91dC5Ib3Jpem9udGFsIGdyb3cgcGFkPlxuICAgICAgICAgIDxUZXh0PlJvd3MgYWZmZWN0ZWQ6IHtxdWVyeS5jb3VudH08L1RleHQ+XG4gICAgICAgIDwvTGF5b3V0Lkhvcml6b250YWw+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0sXG4pO1xuXG5jb25zdCBGYXZvcml0ZXNNZW51ID0gUmVhY3QubWVtbyhcbiAgKHtcbiAgICBmYXZvcml0ZXMsXG4gICAgb25DbGljayxcbiAgfToge1xuICAgIGZhdm9yaXRlczogc3RyaW5nW107XG4gICAgb25DbGljazogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIH0pID0+IHtcbiAgICBjb25zdCBvbk1lbnVDbGljayA9IHVzZUNhbGxiYWNrKFxuICAgICAgKHA6IGFueSkgPT4gb25DbGljayhwLmtleSBhcyBzdHJpbmcpLFxuICAgICAgW29uQ2xpY2tdLFxuICAgICk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxNZW51PlxuICAgICAgICB7ZmF2b3JpdGVzLm1hcCgocSkgPT4gKFxuICAgICAgICAgIDxNZW51Lkl0ZW0ga2V5PXtxfSBvbkNsaWNrPXtvbk1lbnVDbGlja30+XG4gICAgICAgICAgICB7cX1cbiAgICAgICAgICA8L01lbnUuSXRlbT5cbiAgICAgICAgKSl9XG4gICAgICA8L01lbnU+XG4gICAgKTtcbiAgfSxcbik7XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21wb25lbnQoKSB7XG4gIGNvbnN0IGluc3RhbmNlID0gdXNlUGx1Z2luKHBsdWdpbik7XG4gIGNvbnN0IHN0YXRlID0gdXNlVmFsdWUoaW5zdGFuY2Uuc3RhdGUpO1xuICBjb25zdCBmYXZvcml0ZXMgPSB1c2VWYWx1ZShpbnN0YW5jZS5mYXZvcml0ZXNTdGF0ZSk7XG5cbiAgY29uc3Qgb25WaWV3TW9kZUNoYW5nZWQgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZ0OiBSYWRpb0NoYW5nZUV2ZW50KSA9PiB7XG4gICAgICBpbnN0YW5jZS51cGRhdGVWaWV3TW9kZSh7dmlld01vZGU6IGV2dC50YXJnZXQudmFsdWUgPz8gJ2RhdGEnfSk7XG4gICAgfSxcbiAgICBbaW5zdGFuY2VdLFxuICApO1xuXG4gIGNvbnN0IG9uRGF0YUNsaWNrZWQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaW5zdGFuY2UudXBkYXRlVmlld01vZGUoe3ZpZXdNb2RlOiAnZGF0YSd9KTtcbiAgfSwgW2luc3RhbmNlXSk7XG5cbiAgY29uc3Qgb25TdHJ1Y3R1cmVDbGlja2VkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGluc3RhbmNlLnVwZGF0ZVZpZXdNb2RlKHt2aWV3TW9kZTogJ3N0cnVjdHVyZSd9KTtcbiAgfSwgW2luc3RhbmNlXSk7XG5cbiAgY29uc3Qgb25TUUxDbGlja2VkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGluc3RhbmNlLnVwZGF0ZVZpZXdNb2RlKHt2aWV3TW9kZTogJ1NRTCd9KTtcbiAgfSwgW2luc3RhbmNlXSk7XG5cbiAgY29uc3Qgb25UYWJsZUluZm9DbGlja2VkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGluc3RhbmNlLnVwZGF0ZVZpZXdNb2RlKHt2aWV3TW9kZTogJ3RhYmxlSW5mbyd9KTtcbiAgfSwgW2luc3RhbmNlXSk7XG5cbiAgY29uc3Qgb25RdWVyeUhpc3RvcnlDbGlja2VkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGluc3RhbmNlLnVwZGF0ZVZpZXdNb2RlKHt2aWV3TW9kZTogJ3F1ZXJ5SGlzdG9yeSd9KTtcbiAgfSwgW2luc3RhbmNlXSk7XG5cbiAgY29uc3Qgb25SZWZyZXNoQ2xpY2tlZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpbnN0YW5jZS5zdGF0ZS51cGRhdGUoKHN0YXRlKSA9PiB7XG4gICAgICBzdGF0ZS5lcnJvciA9IG51bGw7XG4gICAgfSk7XG4gICAgaW5zdGFuY2UucmVmcmVzaCgpO1xuICB9LCBbaW5zdGFuY2VdKTtcblxuICBjb25zdCBvbkZhdm9yaXRlQnV0dG9uQ2xpY2tlZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoc3RhdGUucXVlcnkpIHtcbiAgICAgIGluc3RhbmNlLmFkZE9yUmVtb3ZlUXVlcnlUb0Zhdm9yaXRlcyhzdGF0ZS5xdWVyeS52YWx1ZSk7XG4gICAgfVxuICB9LCBbaW5zdGFuY2UsIHN0YXRlLnF1ZXJ5XSk7XG5cbiAgY29uc3Qgb25EYXRhYmFzZVNlbGVjdGVkID0gdXNlQ2FsbGJhY2soXG4gICAgKHNlbGVjdGVkOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGRiSWQgPVxuICAgICAgICBpbnN0YW5jZS5zdGF0ZS5nZXQoKS5kYXRhYmFzZXMuZmluZCgoeCkgPT4geC5uYW1lID09PSBzZWxlY3RlZCk/LmlkIHx8XG4gICAgICAgIDA7XG4gICAgICBpbnN0YW5jZS51cGRhdGVTZWxlY3RlZERhdGFiYXNlKHtcbiAgICAgICAgZGF0YWJhc2U6IGRiSWQsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtpbnN0YW5jZV0sXG4gICk7XG5cbiAgY29uc3Qgb25EYXRhYmFzZVRhYmxlU2VsZWN0ZWQgPSB1c2VDYWxsYmFjayhcbiAgICAoc2VsZWN0ZWQ6IHN0cmluZykgPT4ge1xuICAgICAgaW5zdGFuY2UudXBkYXRlU2VsZWN0ZWREYXRhYmFzZVRhYmxlKHtcbiAgICAgICAgdGFibGU6IHNlbGVjdGVkLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbaW5zdGFuY2VdLFxuICApO1xuXG4gIGNvbnN0IG9uTmV4dFBhZ2VDbGlja2VkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGluc3RhbmNlLm5leHRQYWdlKCk7XG4gIH0sIFtpbnN0YW5jZV0pO1xuXG4gIGNvbnN0IG9uUHJldmlvdXNQYWdlQ2xpY2tlZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpbnN0YW5jZS5wcmV2aW91c1BhZ2UoKTtcbiAgfSwgW2luc3RhbmNlXSk7XG5cbiAgY29uc3Qgb25FeGVjdXRlQ2xpY2tlZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBxdWVyeSA9IGluc3RhbmNlLnN0YXRlLmdldCgpLnF1ZXJ5O1xuICAgIGlmIChxdWVyeSkge1xuICAgICAgaW5zdGFuY2UuZXhlY3V0ZSh7cXVlcnk6IHF1ZXJ5LnZhbHVlfSk7XG4gICAgfVxuICB9LCBbaW5zdGFuY2VdKTtcblxuICBjb25zdCBvblF1ZXJ5VGV4dGFyZWFLZXlQcmVzcyA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgLy8gSW1wbGVtZW50IGN0cmwrZW50ZXIgYXMgYSBzaG9ydGN1dCBmb3IgY2xpY2tpbmcgJ0V4ZWN1dGUnLlxuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ1xcbicgJiYgZXZlbnQuY3RybEtleSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgb25FeGVjdXRlQ2xpY2tlZCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW29uRXhlY3V0ZUNsaWNrZWRdLFxuICApO1xuXG4gIGNvbnN0IG9uR29Ub1JvdyA9IHVzZUNhbGxiYWNrKFxuICAgIChyb3c6IG51bWJlciwgX2NvdW50OiBudW1iZXIpID0+IHtcbiAgICAgIGluc3RhbmNlLmdvVG9Sb3coe3Jvdzogcm93fSk7XG4gICAgfSxcbiAgICBbaW5zdGFuY2VdLFxuICApO1xuXG4gIGNvbnN0IG9uUXVlcnlDaGFuZ2VkID0gdXNlQ2FsbGJhY2soXG4gICAgKHNlbGVjdGVkOiBhbnkpID0+IHtcbiAgICAgIGluc3RhbmNlLnVwZGF0ZVF1ZXJ5KHtcbiAgICAgICAgdmFsdWU6IHNlbGVjdGVkLnRhcmdldC52YWx1ZSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW2luc3RhbmNlXSxcbiAgKTtcblxuICBjb25zdCBvbkZhdm9yaXRlUXVlcnlTZWxlY3RlZCA9IHVzZUNhbGxiYWNrKFxuICAgIChxdWVyeTogc3RyaW5nKSA9PiB7XG4gICAgICBpbnN0YW5jZS51cGRhdGVRdWVyeSh7XG4gICAgICAgIHZhbHVlOiBxdWVyeSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW2luc3RhbmNlXSxcbiAgKTtcblxuICBjb25zdCBwYWdlSGlnaGxpZ2h0ZWRSb3dzQ2hhbmdlZCA9IHVzZUNhbGxiYWNrKFxuICAgIChyb3dzOiBUYWJsZUhpZ2hsaWdodGVkUm93cykgPT4ge1xuICAgICAgaW5zdGFuY2UucGFnZUhpZ2hsaWdodGVkUm93c0NoYW5nZWQocm93cyk7XG4gICAgfSxcbiAgICBbaW5zdGFuY2VdLFxuICApO1xuXG4gIGNvbnN0IHF1ZXJ5SGlnaGxpZ2h0ZWRSb3dzQ2hhbmdlZCA9IHVzZUNhbGxiYWNrKFxuICAgIChyb3dzOiBUYWJsZUhpZ2hsaWdodGVkUm93cykgPT4ge1xuICAgICAgaW5zdGFuY2UucXVlcnlIaWdobGlnaHRlZFJvd3NDaGFuZ2VkKHJvd3MpO1xuICAgIH0sXG4gICAgW2luc3RhbmNlXSxcbiAgKTtcblxuICBjb25zdCBzb3J0T3JkZXJDaGFuZ2VkID0gdXNlQ2FsbGJhY2soXG4gICAgKHNvcnRPcmRlcjogVGFibGVSb3dTb3J0T3JkZXIpID0+IHtcbiAgICAgIGluc3RhbmNlLnNvcnRCeUNoYW5nZWQoe3NvcnRPcmRlcn0pO1xuICAgIH0sXG4gICAgW2luc3RhbmNlXSxcbiAgKTtcblxuICBjb25zdCBvblJvd0VkaXRlZCA9IHVzZUNhbGxiYWNrKFxuICAgIChjaGFuZ2U6IHtba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudWxsfSkgPT4ge1xuICAgICAgY29uc3Qge3NlbGVjdGVkRGF0YWJhc2VUYWJsZSwgY3VycmVudFN0cnVjdHVyZSwgdmlld01vZGUsIGN1cnJlbnRQYWdlfSA9XG4gICAgICAgIGluc3RhbmNlLnN0YXRlLmdldCgpO1xuICAgICAgY29uc3QgaGlnaGxpZ2h0ZWRSb3dJZHggPSBjdXJyZW50UGFnZT8uaGlnaGxpZ2h0ZWRSb3dzWzBdID8/IC0xO1xuICAgICAgY29uc3Qgcm93ID1cbiAgICAgICAgaGlnaGxpZ2h0ZWRSb3dJZHggPj0gMFxuICAgICAgICAgID8gY3VycmVudFBhZ2U/LnJvd3NbY3VycmVudFBhZ2U/LmhpZ2hsaWdodGVkUm93c1swXV1cbiAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IGNvbHVtbnMgPSBjdXJyZW50UGFnZT8uY29sdW1ucztcbiAgICAgIC8vIGN1cnJlbnRseSBvbmx5IGFsbG93IHRvIGVkaXQgZGF0YSBzaG93biBpbiBEYXRhIHRhYlxuICAgICAgaWYgKFxuICAgICAgICB2aWV3TW9kZSAhPT0gJ2RhdGEnIHx8XG4gICAgICAgIHNlbGVjdGVkRGF0YWJhc2VUYWJsZSA9PT0gbnVsbCB8fFxuICAgICAgICBjdXJyZW50U3RydWN0dXJlID09PSBudWxsIHx8XG4gICAgICAgIGN1cnJlbnRQYWdlID09PSBudWxsIHx8XG4gICAgICAgIHJvdyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIGNvbHVtbnMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAvLyBvbmx5IHRyaWdnZXIgd2hlbiB0aGVyZSBpcyBjaGFuZ2VcbiAgICAgICAgT2JqZWN0LmtleXMoY2hhbmdlKS5sZW5ndGggPD0gMFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGNoZWNrIGlmIHRoZSB0YWJsZSBoYXMgcHJpbWFyeSBrZXkgdG8gdXNlIGZvciBxdWVyeVxuICAgICAgLy8gVGhpcyBpcyBhc3N1bWVkIGRhdGEgYXJlIGluIHRoZSBzYW1lIGZvcm1hdCBhcyBpbiBTcWxpdGVEYXRhYmFzZURyaXZlci5qYXZhXG4gICAgICBjb25zdCBwcmltYXJ5S2V5SWR4ID0gY3VycmVudFN0cnVjdHVyZS5jb2x1bW5zLmluZGV4T2YoJ3ByaW1hcnlfa2V5Jyk7XG4gICAgICBjb25zdCBuYW1lS2V5SWR4ID0gY3VycmVudFN0cnVjdHVyZS5jb2x1bW5zLmluZGV4T2YoJ2NvbHVtbl9uYW1lJyk7XG4gICAgICBjb25zdCB0eXBlSWR4ID0gY3VycmVudFN0cnVjdHVyZS5jb2x1bW5zLmluZGV4T2YoJ2RhdGFfdHlwZScpO1xuICAgICAgY29uc3QgbnVsbGFibGVJZHggPSBjdXJyZW50U3RydWN0dXJlLmNvbHVtbnMuaW5kZXhPZignbnVsbGFibGUnKTtcbiAgICAgIGlmIChwcmltYXJ5S2V5SWR4IDwgMCAmJiBuYW1lS2V5SWR4IDwgMCAmJiB0eXBlSWR4IDwgMCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICdwcmltYXJ5X2tleSwgY29sdW1uX25hbWUsIGFuZC9vciBkYXRhX3R5cGUgY2Fubm90IGJlIGVtcHR5JyxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgcHJpbWFyeUNvbHVtbkluZGV4ZXMgPSBjdXJyZW50U3RydWN0dXJlLnJvd3NcbiAgICAgICAgLnJlZHVjZSgoYWNjLCByb3cpID0+IHtcbiAgICAgICAgICBjb25zdCBwcmltYXJ5ID0gcm93W3ByaW1hcnlLZXlJZHhdO1xuICAgICAgICAgIGlmIChwcmltYXJ5LnR5cGUgPT09ICdib29sZWFuJyAmJiBwcmltYXJ5LnZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gcm93W25hbWVLZXlJZHhdO1xuICAgICAgICAgICAgcmV0dXJuIG5hbWUudHlwZSA9PT0gJ3N0cmluZycgPyBhY2MuY29uY2F0KG5hbWUudmFsdWUpIDogYWNjO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgW10gYXMgQXJyYXk8c3RyaW5nPilcbiAgICAgICAgLm1hcCgobmFtZSkgPT4gY29sdW1ucy5pbmRleE9mKG5hbWUpKVxuICAgICAgICAuZmlsdGVyKChpZHgpID0+IGlkeCA+PSAwKTtcbiAgICAgIC8vIHN0b3AgaWYgbm8gcHJpbWFyeSBrZXkgdG8gZGlzdGluZ3Vpc2ggdW5pcXVlIHF1ZXJ5XG4gICAgICBpZiAocHJpbWFyeUNvbHVtbkluZGV4ZXMubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0eXBlcyA9IGN1cnJlbnRTdHJ1Y3R1cmUucm93cy5yZWR1Y2UoXG4gICAgICAgIChhY2MsIHJvdykgPT4ge1xuICAgICAgICAgIGNvbnN0IG5hbWVWYWx1ZSA9IHJvd1tuYW1lS2V5SWR4XTtcbiAgICAgICAgICBjb25zdCBuYW1lID0gbmFtZVZhbHVlLnR5cGUgPT09ICdzdHJpbmcnID8gbmFtZVZhbHVlLnZhbHVlIDogbnVsbDtcbiAgICAgICAgICBjb25zdCB0eXBlVmFsdWUgPSByb3dbdHlwZUlkeF07XG4gICAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVWYWx1ZS50eXBlID09PSAnc3RyaW5nJyA/IHR5cGVWYWx1ZS52YWx1ZSA6IG51bGw7XG4gICAgICAgICAgY29uc3QgbnVsbGFibGVWYWx1ZSA9XG4gICAgICAgICAgICBudWxsYWJsZUlkeCA8IDAgPyB7dHlwZTogJ251bGwnLCB2YWx1ZTogbnVsbH0gOiByb3dbbnVsbGFibGVJZHhdO1xuICAgICAgICAgIGNvbnN0IG51bGxhYmxlID0gbnVsbGFibGVWYWx1ZS52YWx1ZSAhPT0gZmFsc2U7XG4gICAgICAgICAgaWYgKG5hbWUgIT09IG51bGwgJiYgdHlwZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgYWNjW25hbWVdID0ge3R5cGUsIG51bGxhYmxlfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSxcbiAgICAgICAge30gYXMge1trZXk6IHN0cmluZ106IHt0eXBlOiBzdHJpbmc7IG51bGxhYmxlOiBib29sZWFufX0sXG4gICAgICApO1xuXG4gICAgICBjb25zdCBjaGFuZ2VWYWx1ZSA9IE9iamVjdC5lbnRyaWVzKGNoYW5nZSkucmVkdWNlKFxuICAgICAgICAoYWNjLCBba2V5LCB2YWx1ZV06IFtzdHJpbmcsIHN0cmluZyB8IG51bGxdKSA9PiB7XG4gICAgICAgICAgYWNjW2tleV0gPSBjb252ZXJ0U3RyaW5nVG9WYWx1ZSh0eXBlcywga2V5LCB2YWx1ZSk7XG4gICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSxcbiAgICAgICAge30gYXMge1trZXk6IHN0cmluZ106IFZhbHVlfSxcbiAgICAgICk7XG4gICAgICBpbnN0YW5jZS5leGVjdXRlKHtcbiAgICAgICAgcXVlcnk6IGNvbnN0cnVjdFVwZGF0ZVF1ZXJ5KFxuICAgICAgICAgIHNlbGVjdGVkRGF0YWJhc2VUYWJsZSxcbiAgICAgICAgICBwcmltYXJ5Q29sdW1uSW5kZXhlcy5yZWR1Y2UoXG4gICAgICAgICAgICAoYWNjLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgYWNjW2NvbHVtbnNbaWR4XV0gPSByb3dbaWR4XTtcbiAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7fSBhcyB7W2tleTogc3RyaW5nXTogVmFsdWV9LFxuICAgICAgICAgICksXG4gICAgICAgICAgY2hhbmdlVmFsdWUsXG4gICAgICAgICksXG4gICAgICB9KTtcbiAgICAgIGluc3RhbmNlLnVwZGF0ZVBhZ2Uoe1xuICAgICAgICAuLi5wcm9kdWNlKGN1cnJlbnRQYWdlLCAoZHJhZnQpID0+XG4gICAgICAgICAgT2JqZWN0LmVudHJpZXMoY2hhbmdlVmFsdWUpLmZvckVhY2goXG4gICAgICAgICAgICAoW2tleSwgdmFsdWVdOiBbc3RyaW5nLCBWYWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY29sdW1uSWR4ID0gZHJhZnQuY29sdW1ucy5pbmRleE9mKGtleSk7XG4gICAgICAgICAgICAgIGlmIChjb2x1bW5JZHggPj0gMCkge1xuICAgICAgICAgICAgICAgIGRyYWZ0LnJvd3NbaGlnaGxpZ2h0ZWRSb3dJZHhdW2NvbHVtbklkeF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICApLFxuICAgICAgICApLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbaW5zdGFuY2VdLFxuICApO1xuXG4gIGNvbnN0IGRhdGFiYXNlT3B0aW9ucyA9IHVzZU1lbW9pemUoXG4gICAgKGRhdGFiYXNlcykgPT5cbiAgICAgIGRhdGFiYXNlcy5tYXAoKHgpID0+IChcbiAgICAgICAgPE9wdGlvbiBrZXk9e3gubmFtZX0gdmFsdWU9e3gubmFtZX0gbGFiZWw9e3gubmFtZX0+XG4gICAgICAgICAge3gubmFtZX1cbiAgICAgICAgPC9PcHRpb24+XG4gICAgICApKSxcbiAgICBbc3RhdGUuZGF0YWJhc2VzXSxcbiAgKTtcblxuICBjb25zdCBzZWxlY3RlZERhdGFiYXNlTmFtZSA9IHVzZU1lbW9pemUoXG4gICAgKHNlbGVjdGVkRGF0YWJhc2U6IG51bWJlciwgZGF0YWJhc2VzOiBEYXRhYmFzZUVudHJ5W10pID0+XG4gICAgICBzZWxlY3RlZERhdGFiYXNlICYmIGRhdGFiYXNlc1tzdGF0ZS5zZWxlY3RlZERhdGFiYXNlIC0gMV1cbiAgICAgICAgPyBkYXRhYmFzZXNbc2VsZWN0ZWREYXRhYmFzZSAtIDFdLm5hbWVcbiAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgW3N0YXRlLnNlbGVjdGVkRGF0YWJhc2UsIHN0YXRlLmRhdGFiYXNlc10sXG4gICk7XG5cbiAgY29uc3QgdGFibGVPcHRpb25zID0gdXNlTWVtb2l6ZShcbiAgICAoc2VsZWN0ZWREYXRhYmFzZTogbnVtYmVyLCBkYXRhYmFzZXM6IERhdGFiYXNlRW50cnlbXSkgPT5cbiAgICAgIHNlbGVjdGVkRGF0YWJhc2UgJiYgZGF0YWJhc2VzW3N0YXRlLnNlbGVjdGVkRGF0YWJhc2UgLSAxXVxuICAgICAgICA/IGRhdGFiYXNlc1tzZWxlY3RlZERhdGFiYXNlIC0gMV0udGFibGVzLm1hcCgodGFibGVOYW1lKSA9PiAoXG4gICAgICAgICAgICA8T3B0aW9uIGtleT17dGFibGVOYW1lfSB2YWx1ZT17dGFibGVOYW1lfSBsYWJlbD17dGFibGVOYW1lfT5cbiAgICAgICAgICAgICAge3RhYmxlTmFtZX1cbiAgICAgICAgICAgIDwvT3B0aW9uPlxuICAgICAgICAgICkpXG4gICAgICAgIDogW10sXG4gICAgW3N0YXRlLnNlbGVjdGVkRGF0YWJhc2UsIHN0YXRlLmRhdGFiYXNlc10sXG4gICk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRUYWJsZU5hbWUgPSB1c2VNZW1vaXplKFxuICAgIChcbiAgICAgIHNlbGVjdGVkRGF0YWJhc2U6IG51bWJlcixcbiAgICAgIGRhdGFiYXNlczogRGF0YWJhc2VFbnRyeVtdLFxuICAgICAgc2VsZWN0ZWREYXRhYmFzZVRhYmxlOiBzdHJpbmcgfCBudWxsLFxuICAgICkgPT5cbiAgICAgIHNlbGVjdGVkRGF0YWJhc2UgJiYgZGF0YWJhc2VzW3NlbGVjdGVkRGF0YWJhc2UgLSAxXVxuICAgICAgICA/IGRhdGFiYXNlc1tzZWxlY3RlZERhdGFiYXNlIC0gMV0udGFibGVzLmZpbmQoXG4gICAgICAgICAgICAodCkgPT4gdCA9PT0gc2VsZWN0ZWREYXRhYmFzZVRhYmxlLFxuICAgICAgICAgICkgPz8gZGF0YWJhc2VzW3NlbGVjdGVkRGF0YWJhc2UgLSAxXS50YWJsZXNbMF1cbiAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgW3N0YXRlLnNlbGVjdGVkRGF0YWJhc2UsIHN0YXRlLmRhdGFiYXNlcywgc3RhdGUuc2VsZWN0ZWREYXRhYmFzZVRhYmxlXSxcbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxMYXlvdXQuQ29udGFpbmVyIGdyb3c+XG4gICAgICA8VG9vbGJhciBwb3NpdGlvbj1cInRvcFwiPlxuICAgICAgICA8UmFkaW8uR3JvdXAgdmFsdWU9e3N0YXRlLnZpZXdNb2RlfSBvbkNoYW5nZT17b25WaWV3TW9kZUNoYW5nZWR9PlxuICAgICAgICAgIDxSYWRpby5CdXR0b24gdmFsdWU9XCJkYXRhXCIgb25DbGljaz17b25EYXRhQ2xpY2tlZH0+XG4gICAgICAgICAgICA8VGFibGVPdXRsaW5lZCBzdHlsZT17e21hcmdpblJpZ2h0OiA1fX0gLz5cbiAgICAgICAgICAgIDxUeXBvZ3JhcGh5LlRleHQ+RGF0YTwvVHlwb2dyYXBoeS5UZXh0PlxuICAgICAgICAgIDwvUmFkaW8uQnV0dG9uPlxuICAgICAgICAgIDxSYWRpby5CdXR0b24gb25DbGljaz17b25TdHJ1Y3R1cmVDbGlja2VkfSB2YWx1ZT1cInN0cnVjdHVyZVwiPlxuICAgICAgICAgICAgPFNldHRpbmdPdXRsaW5lZCBzdHlsZT17e21hcmdpblJpZ2h0OiA1fX0gLz5cbiAgICAgICAgICAgIDxUeXBvZ3JhcGh5LlRleHQ+U3RydWN0dXJlPC9UeXBvZ3JhcGh5LlRleHQ+XG4gICAgICAgICAgPC9SYWRpby5CdXR0b24+XG4gICAgICAgICAgPFJhZGlvLkJ1dHRvbiBvbkNsaWNrPXtvblNRTENsaWNrZWR9IHZhbHVlPVwiU1FMXCI+XG4gICAgICAgICAgICA8Q29uc29sZVNxbE91dGxpbmVkIHN0eWxlPXt7bWFyZ2luUmlnaHQ6IDV9fSAvPlxuICAgICAgICAgICAgPFR5cG9ncmFwaHkuVGV4dD5TUUw8L1R5cG9ncmFwaHkuVGV4dD5cbiAgICAgICAgICA8L1JhZGlvLkJ1dHRvbj5cbiAgICAgICAgICA8UmFkaW8uQnV0dG9uIG9uQ2xpY2s9e29uVGFibGVJbmZvQ2xpY2tlZH0gdmFsdWU9XCJ0YWJsZUluZm9cIj5cbiAgICAgICAgICAgIDxEYXRhYmFzZU91dGxpbmVkIHN0eWxlPXt7bWFyZ2luUmlnaHQ6IDV9fSAvPlxuICAgICAgICAgICAgPFR5cG9ncmFwaHkuVGV4dD5UYWJsZSBJbmZvPC9UeXBvZ3JhcGh5LlRleHQ+XG4gICAgICAgICAgPC9SYWRpby5CdXR0b24+XG4gICAgICAgICAgPFJhZGlvLkJ1dHRvbiBvbkNsaWNrPXtvblF1ZXJ5SGlzdG9yeUNsaWNrZWR9IHZhbHVlPVwicXVlcnlIaXN0b3J5XCI+XG4gICAgICAgICAgICA8SGlzdG9yeU91dGxpbmVkIHN0eWxlPXt7bWFyZ2luUmlnaHQ6IDV9fSAvPlxuICAgICAgICAgICAgPFR5cG9ncmFwaHkuVGV4dD5RdWVyeSBIaXN0b3J5PC9UeXBvZ3JhcGh5LlRleHQ+XG4gICAgICAgICAgPC9SYWRpby5CdXR0b24+XG4gICAgICAgIDwvUmFkaW8uR3JvdXA+XG4gICAgICA8L1Rvb2xiYXI+XG4gICAgICB7c3RhdGUudmlld01vZGUgPT09ICdkYXRhJyB8fFxuICAgICAgc3RhdGUudmlld01vZGUgPT09ICdzdHJ1Y3R1cmUnIHx8XG4gICAgICBzdGF0ZS52aWV3TW9kZSA9PT0gJ3RhYmxlSW5mbycgPyAoXG4gICAgICAgIDxUb29sYmFyIHBvc2l0aW9uPVwidG9wXCI+XG4gICAgICAgICAgPEJvbGRTcGFuPkRhdGFiYXNlPC9Cb2xkU3Bhbj5cbiAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICBzaG93U2VhcmNoXG4gICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWREYXRhYmFzZU5hbWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25EYXRhYmFzZVNlbGVjdGVkfVxuICAgICAgICAgICAgc3R5bGU9e3tmbGV4OiAxfX1cbiAgICAgICAgICAgIGRyb3Bkb3duTWF0Y2hTZWxlY3RXaWR0aD17ZmFsc2V9PlxuICAgICAgICAgICAge2RhdGFiYXNlT3B0aW9uc31cbiAgICAgICAgICA8L1NlbGVjdD5cbiAgICAgICAgICA8Qm9sZFNwYW4+VGFibGU8L0JvbGRTcGFuPlxuICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgIHNob3dTZWFyY2hcbiAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZFRhYmxlTmFtZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRhdGFiYXNlVGFibGVTZWxlY3RlZH1cbiAgICAgICAgICAgIHN0eWxlPXt7ZmxleDogMX19XG4gICAgICAgICAgICBkcm9wZG93bk1hdGNoU2VsZWN0V2lkdGg9e2ZhbHNlfT5cbiAgICAgICAgICAgIHt0YWJsZU9wdGlvbnN9XG4gICAgICAgICAgPC9TZWxlY3Q+XG4gICAgICAgICAgPGRpdiAvPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17b25SZWZyZXNoQ2xpY2tlZH0gdHlwZT1cImRlZmF1bHRcIj5cbiAgICAgICAgICAgIFJlZnJlc2hcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Ub29sYmFyPlxuICAgICAgKSA6IG51bGx9XG4gICAgICB7c3RhdGUudmlld01vZGUgPT09ICdTUUwnID8gKFxuICAgICAgICA8TGF5b3V0LkNvbnRhaW5lcj5cbiAgICAgICAgICA8VG9vbGJhciBwb3NpdGlvbj1cInRvcFwiPlxuICAgICAgICAgICAgPEJvbGRTcGFuPkRhdGFiYXNlPC9Cb2xkU3Bhbj5cbiAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgc2hvd1NlYXJjaFxuICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWREYXRhYmFzZU5hbWV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRhdGFiYXNlU2VsZWN0ZWR9XG4gICAgICAgICAgICAgIGRyb3Bkb3duTWF0Y2hTZWxlY3RXaWR0aD17ZmFsc2V9PlxuICAgICAgICAgICAgICB7ZGF0YWJhc2VPcHRpb25zfVxuICAgICAgICAgICAgPC9TZWxlY3Q+XG4gICAgICAgICAgPC9Ub29sYmFyPlxuICAgICAgICAgIDxMYXlvdXQuSG9yaXpvbnRhbCBwYWQ9e3RoZW1lLnNwYWNlLnNtYWxsfSBzdHlsZT17e3BhZGRpbmdCb3R0b206IDB9fT5cbiAgICAgICAgICAgIDxUZXh0QXJlYVxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25RdWVyeUNoYW5nZWR9XG4gICAgICAgICAgICAgIG9uS2V5UHJlc3M9e29uUXVlcnlUZXh0YXJlYUtleVByZXNzfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlR5cGUgcXVlcnkgaGVyZS4uXCJcbiAgICAgICAgICAgICAgdmFsdWU9e1xuICAgICAgICAgICAgICAgIHN0YXRlLnF1ZXJ5ICE9PSBudWxsICYmIHR5cGVvZiBzdGF0ZS5xdWVyeSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICAgID8gc3RhdGUucXVlcnkudmFsdWVcbiAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9MYXlvdXQuSG9yaXpvbnRhbD5cbiAgICAgICAgICA8VG9vbGJhciBwb3NpdGlvbj1cInRvcFwiPlxuICAgICAgICAgICAgPExheW91dC5SaWdodD5cbiAgICAgICAgICAgICAgPGRpdiAvPlxuICAgICAgICAgICAgICA8TGF5b3V0Lkhvcml6b250YWwgZ2FwPXt0aGVtZS5zcGFjZS5zbWFsbH0+XG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgaWNvbj17XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnF1ZXJ5ICYmIGZhdm9yaXRlcy5pbmNsdWRlcyhzdGF0ZS5xdWVyeS52YWx1ZSkgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPFN0YXJGaWxsZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICA8U3Rhck91dGxpbmVkIC8+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uRmF2b3JpdGVCdXR0b25DbGlja2VkfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPERyb3Bkb3duXG4gICAgICAgICAgICAgICAgICBvdmVybGF5PXtcbiAgICAgICAgICAgICAgICAgICAgPEZhdm9yaXRlc01lbnVcbiAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZXM9e2Zhdm9yaXRlc31cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkZhdm9yaXRlUXVlcnlTZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIH0+XG4gICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IHt9fT5cbiAgICAgICAgICAgICAgICAgICAgQ2hvb3NlIGZyb20gcHJldmlvdXMgcXVlcmllcyA8RG93bk91dGxpbmVkIC8+XG4gICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duPlxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uRXhlY3V0ZUNsaWNrZWR9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17J0V4ZWN1dGUgU1FMIFtDdHJsK1JldHVybl0nfT5cbiAgICAgICAgICAgICAgICAgIEV4ZWN1dGVcbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgPC9MYXlvdXQuSG9yaXpvbnRhbD5cbiAgICAgICAgICAgIDwvTGF5b3V0LlJpZ2h0PlxuICAgICAgICAgIDwvVG9vbGJhcj5cbiAgICAgICAgPC9MYXlvdXQuQ29udGFpbmVyPlxuICAgICAgKSA6IG51bGx9XG4gICAgICA8TGF5b3V0LkNvbnRhaW5lciBncm93PlxuICAgICAgICB7c3RhdGUudmlld01vZGUgPT09ICdkYXRhJyA/IChcbiAgICAgICAgICA8RGF0YVRhYmxlXG4gICAgICAgICAgICBwYWdlPXtzdGF0ZS5jdXJyZW50UGFnZX1cbiAgICAgICAgICAgIGhpZ2hsaWdodGVkUm93c0NoYW5nZWQ9e3BhZ2VIaWdobGlnaHRlZFJvd3NDaGFuZ2VkfVxuICAgICAgICAgICAgb25Sb3dFZGl0ZWQ9e29uUm93RWRpdGVkfVxuICAgICAgICAgICAgc29ydE9yZGVyQ2hhbmdlZD17c29ydE9yZGVyQ2hhbmdlZH1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0PXtzdGF0ZS5jdXJyZW50U29ydH1cbiAgICAgICAgICAgIGN1cnJlbnRTdHJ1Y3R1cmU9e3N0YXRlLmN1cnJlbnRTdHJ1Y3R1cmV9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHtzdGF0ZS52aWV3TW9kZSA9PT0gJ3N0cnVjdHVyZScgJiYgc3RhdGUuY3VycmVudFN0cnVjdHVyZSA/IChcbiAgICAgICAgICA8RGF0YWJhc2VTdHJ1Y3R1cmUgc3RydWN0dXJlPXtzdGF0ZS5jdXJyZW50U3RydWN0dXJlfSAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge3N0YXRlLnZpZXdNb2RlID09PSAnU1FMJyA/IChcbiAgICAgICAgICA8UXVlcnlUYWJsZVxuICAgICAgICAgICAgcXVlcnk9e3N0YXRlLnF1ZXJ5UmVzdWx0fVxuICAgICAgICAgICAgaGlnaGxpZ2h0ZWRSb3dzQ2hhbmdlZD17cXVlcnlIaWdobGlnaHRlZFJvd3NDaGFuZ2VkfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7c3RhdGUudmlld01vZGUgPT09ICd0YWJsZUluZm8nID8gKFxuICAgICAgICAgIDxMYXlvdXQuSG9yaXpvbnRhbFxuICAgICAgICAgICAgZ3Jvd1xuICAgICAgICAgICAgcGFkPXt0aGVtZS5zcGFjZS5zbWFsbH1cbiAgICAgICAgICAgIHN0eWxlPXt7cGFkZGluZ0JvdHRvbTogMH19PlxuICAgICAgICAgICAgPFRleHRBcmVhIHZhbHVlPXtzcWxGb3JtYXR0ZXIuZm9ybWF0KHN0YXRlLnRhYmxlSW5mbyl9IHJlYWRPbmx5IC8+XG4gICAgICAgICAgPC9MYXlvdXQuSG9yaXpvbnRhbD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHtzdGF0ZS52aWV3TW9kZSA9PT0gJ3F1ZXJ5SGlzdG9yeScgPyAoXG4gICAgICAgICAgPFF1ZXJ5SGlzdG9yeSBoaXN0b3J5PXtzdGF0ZS5xdWVyeUhpc3Rvcnl9IC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9MYXlvdXQuQ29udGFpbmVyPlxuICAgICAgPFRvb2xiYXIgcG9zaXRpb249XCJib3R0b21cIiBzdHlsZT17e3BhZGRpbmdMZWZ0OiA4fX0+XG4gICAgICAgIDxMYXlvdXQuSG9yaXpvbnRhbCBncm93PlxuICAgICAgICAgIHtzdGF0ZS52aWV3TW9kZSA9PT0gJ1NRTCcgJiYgc3RhdGUuZXhlY3V0aW9uVGltZSAhPT0gMCA/IChcbiAgICAgICAgICAgIDxUZXh0PiB7c3RhdGUuZXhlY3V0aW9uVGltZX0gbXMgPC9UZXh0PlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIHtzdGF0ZS52aWV3TW9kZSA9PT0gJ2RhdGEnICYmIHN0YXRlLmN1cnJlbnRQYWdlID8gKFxuICAgICAgICAgICAgPFBhZ2VJbmZvXG4gICAgICAgICAgICAgIGN1cnJlbnRSb3c9e3N0YXRlLmN1cnJlbnRQYWdlLnN0YXJ0fVxuICAgICAgICAgICAgICBjb3VudD17c3RhdGUuY3VycmVudFBhZ2UuY291bnR9XG4gICAgICAgICAgICAgIHRvdGFsUm93cz17c3RhdGUuY3VycmVudFBhZ2UudG90YWx9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkdvVG9Sb3d9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIHtzdGF0ZS52aWV3TW9kZSA9PT0gJ2RhdGEnICYmIHN0YXRlLmN1cnJlbnRQYWdlID8gKFxuICAgICAgICAgICAgPEJ1dHRvbk5hdmlnYXRpb25cbiAgICAgICAgICAgICAgY2FuR29CYWNrPXtzdGF0ZS5jdXJyZW50UGFnZS5zdGFydCA+IDB9XG4gICAgICAgICAgICAgIGNhbkdvRm9yd2FyZD17XG4gICAgICAgICAgICAgICAgc3RhdGUuY3VycmVudFBhZ2Uuc3RhcnQgKyBzdGF0ZS5jdXJyZW50UGFnZS5jb3VudCA8XG4gICAgICAgICAgICAgICAgc3RhdGUuY3VycmVudFBhZ2UudG90YWxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBvbkJhY2s9e29uUHJldmlvdXNQYWdlQ2xpY2tlZH1cbiAgICAgICAgICAgICAgb25Gb3J3YXJkPXtvbk5leHRQYWdlQ2xpY2tlZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDwvTGF5b3V0Lkhvcml6b250YWw+XG4gICAgICA8L1Rvb2xiYXI+XG4gICAgICB7c3RhdGUuZXJyb3IgJiYgKFxuICAgICAgICA8RXJyb3JCYXI+e2dldFN0cmluZ0Zyb21FcnJvckxpa2Uoc3RhdGUuZXJyb3IpfTwvRXJyb3JCYXI+XG4gICAgICApfVxuICAgIDwvTGF5b3V0LkNvbnRhaW5lcj5cbiAgKTtcbn1cbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHJpbmdGcm9tRXJyb3JMaWtlKGU6IGFueSk6IHN0cmluZyB7XG4gIGlmIChBcnJheS5pc0FycmF5KGUpKSB7XG4gICAgcmV0dXJuIGUubWFwKGdldFN0cmluZ0Zyb21FcnJvckxpa2UpLmpvaW4oJyAnKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBlO1xuICB9IGVsc2UgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIHJldHVybiBlLm1lc3NhZ2UgfHwgZS50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gU3RyaW5naWZ5IG1pZ2h0IGZhaWwgb24gYXJiaXRyYXJ5IHN0cnVjdHVyZXNcbiAgICAgIC8vIExhc3QgcmVzb3J0OiB0b1N0cmluZyBpdC5cbiAgICAgIHJldHVybiBgJHtlfWA7XG4gICAgfVxuICB9XG59XG4iLCAiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG5pbXBvcnQge3RoZW1lLCBzdHlsZWR9IGZyb20gJ2ZsaXBwZXItcGx1Z2luJztcbmltcG9ydCB7VHlwb2dyYXBoeX0gZnJvbSAnYW50ZCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCB7VGV4dH0gPSBUeXBvZ3JhcGh5O1xuXG5leHBvcnQgdHlwZSBWYWx1ZSA9XG4gIHwge1xuICAgICAgdHlwZTogJ3N0cmluZycgfCAnYmxvYic7XG4gICAgICB2YWx1ZTogc3RyaW5nO1xuICAgIH1cbiAgfCB7XG4gICAgICB0eXBlOiAnYm9vbGVhbic7XG4gICAgICB2YWx1ZTogYm9vbGVhbjtcbiAgICB9XG4gIHwge1xuICAgICAgdHlwZTogJ2ludGVnZXInIHwgJ2Zsb2F0JyB8ICdkb3VibGUnIHwgJ251bWJlcic7XG4gICAgICB2YWx1ZTogbnVtYmVyO1xuICAgIH1cbiAgfCB7XG4gICAgICB0eXBlOiAnbnVsbCc7XG4gICAgICB2YWx1ZTogbnVsbDtcbiAgICB9O1xuXG5jb25zdCBXcmFwcGluZ1RleHQgPSBzdHlsZWQoVGV4dCkoe1xuICB3b3JkV3JhcDogJ2JyZWFrLXdvcmQnLFxuICB3aWR0aDogJzEwMCUnLFxuICBsaW5lSGVpZ2h0OiAnMTI1JScsXG4gIHBhZGRpbmc6ICczcHggMCcsXG59KTtcbldyYXBwaW5nVGV4dC5kaXNwbGF5TmFtZSA9ICdUeXBlQmFzZWRWYWx1ZVJlbmRlcmVyOldyYXBwaW5nVGV4dCc7XG5cbmNvbnN0IE5vbldyYXBwaW5nVGV4dCA9IHN0eWxlZChUZXh0KSh7XG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxuICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbn0pO1xuTm9uV3JhcHBpbmdUZXh0LmRpc3BsYXlOYW1lID0gJ1R5cGVCYXNlZFZhbHVlUmVuZGVyZXI6Tm9uV3JhcHBpbmdUZXh0JztcblxuY29uc3QgQm9vbGVhblZhbHVlID0gc3R5bGVkKE5vbldyYXBwaW5nVGV4dCk8e2FjdGl2ZT86IGJvb2xlYW59PigocHJvcHMpID0+ICh7XG4gICcmOjpiZWZvcmUnOiB7XG4gICAgY29udGVudDogJ1wiXCInLFxuICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgIHdpZHRoOiA4LFxuICAgIGhlaWdodDogOCxcbiAgICBib3JkZXJSYWRpdXM6IDQsXG4gICAgYmFja2dyb3VuZENvbG9yOiBwcm9wcy5hY3RpdmUgPyB0aGVtZS5zdWNjZXNzQ29sb3IgOiB0aGVtZS5lcnJvckNvbG9yLFxuICAgIG1hcmdpblJpZ2h0OiA1LFxuICAgIG1hcmdpblRvcDogMSxcbiAgfSxcbn0pKTtcbkJvb2xlYW5WYWx1ZS5kaXNwbGF5TmFtZSA9ICdUeXBlQmFzZWRWYWx1ZVJlbmRlcmVyOkJvb2xlYW5WYWx1ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWx1ZVRvTnVsbGFibGVTdHJpbmcodmFsOiBWYWx1ZSk6IHN0cmluZyB8IG51bGwge1xuICByZXR1cm4gdmFsLnZhbHVlPy50b1N0cmluZygpID8/IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJWYWx1ZSh2YWw6IFZhbHVlLCB3b3JkV3JhcD86IGJvb2xlYW4pIHtcbiAgY29uc3QgVGV4dENvbXBvbmVudCA9IHdvcmRXcmFwID8gV3JhcHBpbmdUZXh0IDogTm9uV3JhcHBpbmdUZXh0O1xuICBzd2l0Y2ggKHZhbC50eXBlKSB7XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Qm9vbGVhblZhbHVlIGFjdGl2ZT17dmFsLnZhbHVlfT57dmFsLnZhbHVlLnRvU3RyaW5nKCl9PC9Cb29sZWFuVmFsdWU+XG4gICAgICApO1xuICAgIGNhc2UgJ2Jsb2InOlxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gPFRleHRDb21wb25lbnQ+e3ZhbC52YWx1ZX08L1RleHRDb21wb25lbnQ+O1xuICAgIGNhc2UgJ2ludGVnZXInOlxuICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICBjYXNlICdkb3VibGUnOlxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gPFRleHRDb21wb25lbnQ+e3ZhbC52YWx1ZX08L1RleHRDb21wb25lbnQ+O1xuICAgIGNhc2UgJ251bGwnOlxuICAgICAgcmV0dXJuIDxUZXh0Q29tcG9uZW50Pk5VTEw8L1RleHRDb21wb25lbnQ+O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gPFRleHRDb21wb25lbnQgLz47XG4gIH1cbn1cbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB7UmFkaW99IGZyb20gJ2FudGQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7TGVmdE91dGxpbmVkLCBSaWdodE91dGxpbmVkfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0Lm1lbW8oXG4gIChwcm9wczoge1xuICAgIC8qKiBCYWNrIGJ1dHRvbiBpcyBlbmFibGVkICovXG4gICAgY2FuR29CYWNrOiBib29sZWFuO1xuICAgIC8qKiBGb3J3YXJkcyBidXR0b24gaXMgZW5hYmxlZCAqL1xuICAgIGNhbkdvRm9yd2FyZDogYm9vbGVhbjtcbiAgICAvKiogQ2FsbGJhY2sgd2hlbiBiYWNrIGJ1dHRvbiBpcyBjbGlja2VkICovXG4gICAgb25CYWNrOiAoKSA9PiB2b2lkO1xuICAgIC8qKiBDYWxsYmFjayB3aGVuIGZvcndhcmRzIGJ1dHRvbiBpcyBjbGlja2VkICovXG4gICAgb25Gb3J3YXJkOiAoKSA9PiB2b2lkO1xuICB9KSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxSYWRpby5Hcm91cCBzdHlsZT17e21hcmdpbkxlZnQ6IDUsIG1hcmdpblJpZ2h0OiA1fX0+XG4gICAgICAgIDxSYWRpby5CdXR0b24gZGlzYWJsZWQ9eyFwcm9wcy5jYW5Hb0JhY2t9IG9uQ2xpY2s9e3Byb3BzLm9uQmFja30+XG4gICAgICAgICAgPExlZnRPdXRsaW5lZCBzaXplPXsxNn0gLz5cbiAgICAgICAgPC9SYWRpby5CdXR0b24+XG4gICAgICAgIDxSYWRpby5CdXR0b24gZGlzYWJsZWQ9eyFwcm9wcy5jYW5Hb0ZvcndhcmR9IG9uQ2xpY2s9e3Byb3BzLm9uRm9yd2FyZH0+XG4gICAgICAgICAgPFJpZ2h0T3V0bGluZWQgc2l6ZT17MTZ9IC8+XG4gICAgICAgIDwvUmFkaW8uQnV0dG9uPlxuICAgICAgPC9SYWRpby5Hcm91cD5cbiAgICApO1xuICB9LFxuKTtcbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCBSZWFjdCwge3VzZU1lbW8sIHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZHVjZXJ9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHtcbiAgUGFuZWwsXG4gIERldGFpbFNpZGViYXIsXG4gIERhdGFJbnNwZWN0b3IgYXMgTWFuYWdlZERhdGFJbnNwZWN0b3IsXG4gIHRoZW1lLFxuICBzdHlsZWQsXG4gIHByb2R1Y2UsXG4gIExheW91dCxcbn0gZnJvbSAnZmxpcHBlci1wbHVnaW4nO1xuXG5pbXBvcnQge1xuICBWYWx1ZSxcbiAgdmFsdWVUb051bGxhYmxlU3RyaW5nLFxuICByZW5kZXJWYWx1ZSxcbn0gZnJvbSAnLi9UeXBlQmFzZWRWYWx1ZVJlbmRlcmVyJztcblxuaW1wb3J0IHtCdXR0b24sIElucHV0fSBmcm9tICdhbnRkJztcblxudHlwZSBUYWJsZVJvdyA9IHtcbiAgY29sOiBzdHJpbmc7XG4gIHR5cGU6IFZhbHVlWyd0eXBlJ107XG4gIHZhbHVlOiBSZWFjdC5SZWFjdEVsZW1lbnQ7XG59O1xuXG50eXBlIERhdGFiYXNlRGV0YWlsU2lkZWJhclByb3BzID0ge1xuICBjb2x1bW5MYWJlbHM6IEFycmF5PHN0cmluZz47XG4gIGNvbHVtblZhbHVlczogQXJyYXk8VmFsdWU+O1xuICBvblNhdmU/OiAoKGNoYW5nZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudWxsfSkgPT4gdm9pZCkgfCB1bmRlZmluZWQ7XG59O1xuXG5jb25zdCBUYWJsZURldGFpbFJvdyA9IHN0eWxlZC5kaXYoe1xuICBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5kaXZpZGVyQ29sb3J9YCxcbiAgcGFkZGluZzogOCxcbn0pO1xuXG5jb25zdCBUYWJsZURldGFpbFJvd1RpdGxlID0gc3R5bGVkLmRpdih7XG4gIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgbWFyZ2luQm90dG9tOiA4LFxufSk7XG5cbmNvbnN0IFRhYmxlRGV0YWlsUm93VHlwZSA9IHN0eWxlZC5zcGFuKHtcbiAgY29sb3I6IHRoZW1lLndoaXRlLFxuICBtYXJnaW5MZWZ0OiA4LFxuICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbn0pO1xuXG5jb25zdCBUYWJsZURldGFpbFJvd1ZhbHVlID0gc3R5bGVkLmRpdih7fSk7XG5cbmZ1bmN0aW9uIHNpZGViYXJSb3dzKGxhYmVsczogQXJyYXk8c3RyaW5nPiwgdmFsdWVzOiBBcnJheTxWYWx1ZT4pOiBUYWJsZVJvd1tdIHtcbiAgcmV0dXJuIGxhYmVscy5tYXAoKGxhYmVsLCBpZHgpID0+IGJ1aWxkU2lkZWJhclJvdyhsYWJlbCwgdmFsdWVzW2lkeF0pKTtcbn1cblxuZnVuY3Rpb24gYnVpbGRTaWRlYmFyUm93KGtleTogc3RyaW5nLCB2YWw6IFZhbHVlKTogVGFibGVSb3cge1xuICBsZXQgb3V0cHV0ID0gcmVuZGVyVmFsdWUodmFsLCB0cnVlKTtcbiAgaWYgKFxuICAgICh2YWwudHlwZSA9PT0gJ3N0cmluZycgfHwgdmFsLnR5cGUgPT09ICdibG9iJykgJiZcbiAgICAodmFsLnZhbHVlWzBdID09PSAnWycgfHwgdmFsLnZhbHVlWzBdID09PSAneycpXG4gICkge1xuICAgIHRyeSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIHZhciBwYXJzZWQgPSBKU09OLnBhcnNlKHZhbC52YWx1ZSk7XG4gICAgfSBjYXRjaCAoX2Vycm9yKSB7fVxuICAgIGlmIChwYXJzZWQpIHtcbiAgICAgIG91dHB1dCA9IDxNYW5hZ2VkRGF0YUluc3BlY3RvciBkYXRhPXtwYXJzZWR9IGV4cGFuZFJvb3QgY29sbGFwc2VkIC8+O1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIGNvbDoga2V5LFxuICAgIHR5cGU6IHZhbC50eXBlLFxuICAgIHZhbHVlOiBvdXRwdXQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIHNpZGViYXJFZGl0YWJsZVJvd3MoXG4gIGxhYmVsczogQXJyYXk8c3RyaW5nPixcbiAgdmFsdWVzOiBBcnJheTxWYWx1ZT4sXG4gIHJvd0Rpc3BhdGNoOiAoYWN0aW9uOiBSb3dBY3Rpb24pID0+IHZvaWQsXG4pOiBUYWJsZVJvd1tdIHtcbiAgcmV0dXJuIGxhYmVscy5tYXAoKGxhYmVsLCBpZHgpID0+XG4gICAgYnVpbGRTaWRlYmFyRWRpdGFibGVSb3cobGFiZWwsIHZhbHVlc1tpZHhdLCAodmFsdWU6IHN0cmluZyB8IG51bGwpID0+XG4gICAgICByb3dEaXNwYXRjaCh7dHlwZTogJ3NldCcsIGtleTogbGFiZWwsIHZhbHVlfSksXG4gICAgKSxcbiAgKTtcbn1cblxuZnVuY3Rpb24gYnVpbGRTaWRlYmFyRWRpdGFibGVSb3coXG4gIGtleTogc3RyaW5nLFxuICB2YWw6IFZhbHVlLFxuICBvblVwZGF0ZVZhbHVlOiAodmFsdWU6IHN0cmluZyB8IG51bGwpID0+IHZvaWQsXG4pOiBUYWJsZVJvdyB7XG4gIGlmICh2YWwudHlwZSA9PT0gJ2Jsb2InIHx8ICF2YWwudHlwZSkge1xuICAgIHJldHVybiBidWlsZFNpZGViYXJSb3coa2V5LCB2YWwpO1xuICB9XG4gIHJldHVybiB7XG4gICAgY29sOiBrZXksXG4gICAgdHlwZTogdmFsLnR5cGUsXG4gICAgdmFsdWU6IChcbiAgICAgIDxFZGl0RmllbGRcbiAgICAgICAga2V5PXtrZXl9XG4gICAgICAgIGluaXRpYWxWYWx1ZT17dmFsdWVUb051bGxhYmxlU3RyaW5nKHZhbCl9XG4gICAgICAgIG9uVXBkYXRlVmFsdWU9e29uVXBkYXRlVmFsdWV9XG4gICAgICAvPlxuICAgICksXG4gIH07XG59XG5cbmNvbnN0IEVkaXRGaWVsZCA9IFJlYWN0Lm1lbW8oXG4gIChwcm9wczoge1xuICAgIGluaXRpYWxWYWx1ZTogc3RyaW5nIHwgbnVsbDtcbiAgICBvblVwZGF0ZVZhbHVlOiAodmFsdWU6IHN0cmluZyB8IG51bGwpID0+IHZvaWQ7XG4gIH0pID0+IHtcbiAgICBjb25zdCB7aW5pdGlhbFZhbHVlLCBvblVwZGF0ZVZhbHVlfSA9IHByb3BzO1xuICAgIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4oaW5pdGlhbFZhbHVlKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4gc2V0VmFsdWUoaW5pdGlhbFZhbHVlKSwgW2luaXRpYWxWYWx1ZV0pO1xuICAgIHJldHVybiAoXG4gICAgICA8SW5wdXRcbiAgICAgICAgdmFsdWU9e3ZhbHVlIHx8ICcnfVxuICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICBzZXRWYWx1ZShlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgb25VcGRhdGVWYWx1ZShlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH19XG4gICAgICAgIHBsYWNlaG9sZGVyPXt2YWx1ZSA9PT0gbnVsbCA/ICdOVUxMJyA6IHVuZGVmaW5lZH1cbiAgICAgICAgZGF0YS10ZXN0aWQ9eyd1cGRhdGUtcXVlcnktaW5wdXQnfVxuICAgICAgICBzdHlsZT17e3dpZHRoOiAnMTAwJSd9fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxudHlwZSBSb3dTdGF0ZSA9IHtjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVsbH07IHVwZGF0ZWQ6IGJvb2xlYW59O1xudHlwZSBSb3dBY3Rpb24gPVxuICB8IHt0eXBlOiAnc2V0Jzsga2V5OiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfCBudWxsfVxuICB8IHt0eXBlOiAncmVzZXQnfTtcblxuY29uc3Qgcm93U3RhdGVSZWR1Y2VyID0gcHJvZHVjZSgoZHJhZnRTdGF0ZTogUm93U3RhdGUsIGFjdGlvbjogUm93QWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdzZXQnOlxuICAgICAgZHJhZnRTdGF0ZS5jaGFuZ2VzW2FjdGlvbi5rZXldID0gYWN0aW9uLnZhbHVlO1xuICAgICAgZHJhZnRTdGF0ZS51cGRhdGVkID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICBjYXNlICdyZXNldCc6XG4gICAgICBkcmFmdFN0YXRlLmNoYW5nZXMgPSB7fTtcbiAgICAgIGRyYWZ0U3RhdGUudXBkYXRlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QubWVtbyhmdW5jdGlvbiBEYXRhYmFzZURldGFpbFNpZGViYXIoXG4gIHByb3BzOiBEYXRhYmFzZURldGFpbFNpZGViYXJQcm9wcyxcbikge1xuICBjb25zdCBbZWRpdGluZywgc2V0RWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtyb3dTdGF0ZSwgcm93RGlzcGF0Y2hdID0gdXNlUmVkdWNlcihyb3dTdGF0ZVJlZHVjZXIsIHtcbiAgICBjaGFuZ2VzOiB7fSxcbiAgICB1cGRhdGVkOiBmYWxzZSxcbiAgfSk7XG4gIGNvbnN0IHtjb2x1bW5MYWJlbHMsIGNvbHVtblZhbHVlcywgb25TYXZlfSA9IHByb3BzO1xuICB1c2VFZmZlY3QoKCkgPT4gcm93RGlzcGF0Y2goe3R5cGU6ICdyZXNldCd9KSwgW2NvbHVtbkxhYmVscywgY29sdW1uVmFsdWVzXSk7XG4gIGNvbnN0IHJvd3MgPSB1c2VNZW1vKFxuICAgICgpID0+XG4gICAgICBlZGl0aW5nXG4gICAgICAgID8gc2lkZWJhckVkaXRhYmxlUm93cyhjb2x1bW5MYWJlbHMsIGNvbHVtblZhbHVlcywgcm93RGlzcGF0Y2gpXG4gICAgICAgIDogc2lkZWJhclJvd3MoY29sdW1uTGFiZWxzLCBjb2x1bW5WYWx1ZXMpLFxuICAgIFtjb2x1bW5MYWJlbHMsIGNvbHVtblZhbHVlcywgZWRpdGluZ10sXG4gICk7XG4gIHJldHVybiAoXG4gICAgPERldGFpbFNpZGViYXI+XG4gICAgICA8UGFuZWwgdGl0bGU9XCJSb3cgZGV0YWlsc1wiIGNvbGxhcHNpYmxlPlxuICAgICAgICB7b25TYXZlID8gKFxuICAgICAgICAgIDxMYXlvdXQuUmlnaHQgY2VudGVyPlxuICAgICAgICAgICAgPGRpdiAvPlxuICAgICAgICAgICAge2VkaXRpbmcgPyAoXG4gICAgICAgICAgICAgIDxMYXlvdXQuSG9yaXpvbnRhbCBwYWQgZ2FwPlxuICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gc2V0RWRpdGluZyhmYWxzZSl9PkNsb3NlPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFyb3dTdGF0ZS51cGRhdGVkfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvblNhdmUocm93U3RhdGUuY2hhbmdlcyk7XG4gICAgICAgICAgICAgICAgICAgIHNldEVkaXRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICBTYXZlXG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDwvTGF5b3V0Lkhvcml6b250YWw+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGF5b3V0Lkhvcml6b250YWwgcGFkPlxuICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gc2V0RWRpdGluZyh0cnVlKX0+RWRpdDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8L0xheW91dC5Ib3Jpem9udGFsPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0xheW91dC5SaWdodD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAge3Jvd3MubWFwKChyb3cpID0+IChcbiAgICAgICAgICAgIDxUYWJsZURldGFpbFJvdyBrZXk9e3Jvdy5jb2x9PlxuICAgICAgICAgICAgICA8VGFibGVEZXRhaWxSb3dUaXRsZT5cbiAgICAgICAgICAgICAgICB7cm93LmNvbH1cbiAgICAgICAgICAgICAgICA8VGFibGVEZXRhaWxSb3dUeXBlPih7cm93LnR5cGV9KTwvVGFibGVEZXRhaWxSb3dUeXBlPlxuICAgICAgICAgICAgICA8L1RhYmxlRGV0YWlsUm93VGl0bGU+XG4gICAgICAgICAgICAgIDxUYWJsZURldGFpbFJvd1ZhbHVlPntyb3cudmFsdWV9PC9UYWJsZURldGFpbFJvd1ZhbHVlPlxuICAgICAgICAgICAgPC9UYWJsZURldGFpbFJvdz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1BhbmVsPlxuICAgIDwvRGV0YWlsU2lkZWJhcj5cbiAgKTtcbn0pO1xuIiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuaW1wb3J0IHtWYWx1ZSwgcmVuZGVyVmFsdWV9IGZyb20gJy4vVHlwZUJhc2VkVmFsdWVSZW5kZXJlcic7XG5pbXBvcnQge0RhdGFUYWJsZSwgRGF0YVRhYmxlQ29sdW1uLCBMYXlvdXQsIHVzZU1lbW9pemV9IGZyb20gJ2ZsaXBwZXItcGx1Z2luJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1N0cnVjdHVyZX0gZnJvbSAnLi9pbmRleCc7XG5cbmZ1bmN0aW9uIGNyZWF0ZVJvd3MoXG4gIGNvbHVtbnM6IHN0cmluZ1tdLFxuICByb3dzOiBWYWx1ZVtdW10sXG4pOiB7W2tleTogc3RyaW5nXTogVmFsdWV9W10ge1xuICByZXR1cm4gcm93cy5tYXAoKHZhbHVlcykgPT5cbiAgICB2YWx1ZXMucmVkdWNlKChhY2M6IHtba2V5OiBzdHJpbmddOiBWYWx1ZX0sIGN1cjogVmFsdWUsIGk6IG51bWJlcikgPT4ge1xuICAgICAgYWNjW2NvbHVtbnNbaV1dID0gY3VyO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSksXG4gICk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbHVtbkNvbmZpZyhjb2x1bW5zOiBzdHJpbmdbXSkge1xuICBjb25zdCBjb2x1bW5PYmpzOiBEYXRhVGFibGVDb2x1bW48e1trZXk6IHN0cmluZ106IFZhbHVlfT5bXSA9IGNvbHVtbnMubWFwKFxuICAgIChjKSA9PiAoe1xuICAgICAga2V5OiBjLFxuICAgICAgdGl0bGU6IGMsXG4gICAgICBvblJlbmRlcihyb3cpIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlclZhbHVlKHJvd1tjXSk7XG4gICAgICB9LFxuICAgIH0pLFxuICApO1xuICByZXR1cm4gY29sdW1uT2Jqcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QubWVtbygocHJvcHM6IHtzdHJ1Y3R1cmU6IFN0cnVjdHVyZX0pID0+IHtcbiAgY29uc3Qge3N0cnVjdHVyZX0gPSBwcm9wcztcbiAgY29uc3Qge2NvbHVtbnMsIHJvd3MsIGluZGV4ZXNDb2x1bW5zLCBpbmRleGVzVmFsdWVzfSA9IHN0cnVjdHVyZTtcbiAgY29uc3Qgcm93T2JqcyA9IHVzZU1lbW9pemUoXG4gICAgKGNvbHVtbnM6IHN0cmluZ1tdLCByb3dzOiBWYWx1ZVtdW10pID0+IGNyZWF0ZVJvd3MoY29sdW1ucywgcm93cyksXG4gICAgW2NvbHVtbnMsIHJvd3NdLFxuICApO1xuICBjb25zdCBjb2x1bW5PYmpzID0gdXNlTWVtb2l6ZShcbiAgICAoY29sdW1uczogc3RyaW5nW10pID0+IGNyZWF0ZUNvbHVtbkNvbmZpZyhjb2x1bW5zKSxcbiAgICBbY29sdW1uc10sXG4gICk7XG4gIGNvbnN0IGluZGV4Um93T2JqcyA9IHVzZU1lbW9pemUoXG4gICAgKGluZGV4ZXNDb2x1bW5zOiBzdHJpbmdbXSwgaW5kZXhlc1ZhbHVlczogVmFsdWVbXVtdKSA9PlxuICAgICAgY3JlYXRlUm93cyhpbmRleGVzQ29sdW1ucywgaW5kZXhlc1ZhbHVlcyksXG4gICAgW2luZGV4ZXNDb2x1bW5zLCBpbmRleGVzVmFsdWVzXSxcbiAgKTtcbiAgY29uc3QgaW5kZXhDb2x1bW5PYmpzID0gdXNlTWVtb2l6ZShcbiAgICAoaW5kZXhlc0NvbHVtbnM6IHN0cmluZ1tdKSA9PiBjcmVhdGVDb2x1bW5Db25maWcoaW5kZXhlc0NvbHVtbnMpLFxuICAgIFtpbmRleGVzQ29sdW1uc10sXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGF5b3V0LlRvcCByZXNpemFibGUgaGVpZ2h0PXs0MDB9PlxuICAgICAgPERhdGFUYWJsZTx7W2tleTogc3RyaW5nXTogVmFsdWV9PlxuICAgICAgICByZWNvcmRzPXtyb3dPYmpzfVxuICAgICAgICBjb2x1bW5zPXtjb2x1bW5PYmpzfVxuICAgICAgICBlbmFibGVTZWFyY2hiYXI9e2ZhbHNlfVxuICAgICAgLz5cbiAgICAgIDxEYXRhVGFibGU8e1trZXk6IHN0cmluZ106IFZhbHVlfT5cbiAgICAgICAgcmVjb3Jkcz17aW5kZXhSb3dPYmpzfVxuICAgICAgICBjb2x1bW5zPXtpbmRleENvbHVtbk9ianN9XG4gICAgICAgIGVuYWJsZVNlYXJjaGJhcj17ZmFsc2V9XG4gICAgICAvPlxuICAgIDwvTGF5b3V0LlRvcD5cbiAgKTtcbn0pO1xuIiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuaW1wb3J0IHtWYWx1ZX0gZnJvbSAnLi9UeXBlQmFzZWRWYWx1ZVJlbmRlcmVyJztcblxuY29uc3QgSU5UX0RBVEFfVFlQRSA9IFsnSU5URUdFUicsICdMT05HJywgJ0lOVCcsICdCSUdJTlQnXTtcbmNvbnN0IEZMT0FUX0RBVEFfVFlQRSA9IFsnUkVBTCcsICdET1VCTEUnXTtcbmNvbnN0IEJMT0JfREFUQV9UWVBFID0gWydCTE9CJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0U3RyaW5nVG9WYWx1ZShcbiAgdHlwZXM6IHtba2V5OiBzdHJpbmddOiB7dHlwZTogc3RyaW5nOyBudWxsYWJsZTogYm9vbGVhbn19LFxuICBrZXk6IHN0cmluZyxcbiAgdmFsdWU6IHN0cmluZyB8IG51bGwsXG4pOiBWYWx1ZSB7XG4gIGlmICh0eXBlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgY29uc3Qge3R5cGUsIG51bGxhYmxlfSA9IHR5cGVzW2tleV07XG4gICAgdmFsdWUgPSB2YWx1ZSA9PT0gbnVsbCA/ICcnIDogdmFsdWU7XG4gICAgaWYgKHZhbHVlLmxlbmd0aCA8PSAwICYmIG51bGxhYmxlKSB7XG4gICAgICByZXR1cm4ge3R5cGU6ICdudWxsJywgdmFsdWU6IG51bGx9O1xuICAgIH1cblxuICAgIGlmIChJTlRfREFUQV9UWVBFLmluZGV4T2YodHlwZSkgPj0gMCkge1xuICAgICAgY29uc3QgY29udmVydGVkID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgIHJldHVybiB7dHlwZTogJ2ludGVnZXInLCB2YWx1ZTogaXNOYU4oY29udmVydGVkKSA/IDAgOiBjb252ZXJ0ZWR9O1xuICAgIH0gZWxzZSBpZiAoRkxPQVRfREFUQV9UWVBFLmluZGV4T2YodHlwZSkgPj0gMCkge1xuICAgICAgY29uc3QgY29udmVydGVkID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICByZXR1cm4ge3R5cGU6ICdmbG9hdCcsIHZhbHVlOiBpc05hTihjb252ZXJ0ZWQpID8gMCA6IGNvbnZlcnRlZH07XG4gICAgfSBlbHNlIGlmIChCTE9CX0RBVEFfVFlQRS5pbmRleE9mKHR5cGUpID49IDApIHtcbiAgICAgIHJldHVybiB7dHlwZTogJ2Jsb2InLCB2YWx1ZX07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7dHlwZTogJ3N0cmluZycsIHZhbHVlfTtcbiAgICB9XG4gIH1cbiAgLy8gaWYgbm8gdHlwZSBmb3VuZCBhc3N1bWUgdHlwZSBpcyBudWxsYWJsZSBzdHJpbmdcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlLmxlbmd0aCA8PSAwKSB7XG4gICAgcmV0dXJuIHt0eXBlOiAnbnVsbCcsIHZhbHVlOiBudWxsfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge3R5cGU6ICdzdHJpbmcnLCB2YWx1ZX07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdFF1ZXJ5Q2xhdXNlKFxuICB2YWx1ZXM6IHtba2V5OiBzdHJpbmddOiBWYWx1ZX0sXG4gIGNvbm5lY3Rvcjogc3RyaW5nLFxuKTogc3RyaW5nIHtcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHZhbHVlcykucmVkdWNlKFxuICAgIChjbGF1c2VzLCBba2V5LCB2YWxdOiBbc3RyaW5nLCBWYWx1ZV0sIGlkeCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWVTdHJpbmcgPVxuICAgICAgICB2YWwudHlwZSA9PT0gJ251bGwnXG4gICAgICAgICAgPyAnTlVMTCdcbiAgICAgICAgICA6IHZhbC50eXBlID09PSAnc3RyaW5nJyB8fCB2YWwudHlwZSA9PT0gJ2Jsb2InXG4gICAgICAgICAgICA/IGAnJHt2YWwudmFsdWUucmVwbGFjZSgvJy9nLCBcIicnXCIpfSdgXG4gICAgICAgICAgICA6IGAke3ZhbC52YWx1ZX1gO1xuICAgICAgaWYgKGlkeCA8PSAwKSB7XG4gICAgICAgIHJldHVybiBgXFxgJHtrZXl9XFxgPSR7dmFsdWVTdHJpbmd9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBgJHtjbGF1c2VzfSAke2Nvbm5lY3Rvcn0gXFxgJHtrZXl9XFxgPSR7dmFsdWVTdHJpbmd9YDtcbiAgICAgIH1cbiAgICB9LFxuICAgICcnLFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0VXBkYXRlUXVlcnkoXG4gIHRhYmxlOiBzdHJpbmcsXG4gIHdoZXJlOiB7W2tleTogc3RyaW5nXTogVmFsdWV9LFxuICBjaGFuZ2U6IHtba2V5OiBzdHJpbmddOiBWYWx1ZX0sXG4pOiBzdHJpbmcge1xuICByZXR1cm4gYFVQREFURSBcXGAke3RhYmxlfVxcYFxuICAgIFNFVCAke2NvbnN0cnVjdFF1ZXJ5Q2xhdXNlKGNoYW5nZSwgJywnKX1cbiAgICBXSEVSRSAke2NvbnN0cnVjdFF1ZXJ5Q2xhdXNlKHdoZXJlLCAnQU5EJyl9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVXBkYXRhYmxlKFxuICBjb2x1bW5NZXRhOiBBcnJheTxzdHJpbmc+LFxuICBjb2x1bW5EYXRhOiBBcnJheTxBcnJheTxWYWx1ZT4+LFxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IHByaW1hcnlLZXlJZHggPSBjb2x1bW5NZXRhLmluZGV4T2YoJ3ByaW1hcnlfa2V5Jyk7XG4gIHJldHVybiAoXG4gICAgcHJpbWFyeUtleUlkeCA+PSAwICYmXG4gICAgY29sdW1uRGF0YS5yZWR1Y2UoKGFjYzogYm9vbGVhbiwgY29sdW1uKSA9PiB7XG4gICAgICBjb25zdCBwcmltYXJ5VmFsdWUgPSBjb2x1bW5bcHJpbWFyeUtleUlkeF07XG4gICAgICByZXR1cm4gYWNjIHx8IChwcmltYXJ5VmFsdWUudHlwZSA9PT0gJ2Jvb2xlYW4nICYmIHByaW1hcnlWYWx1ZS52YWx1ZSk7XG4gICAgfSwgZmFsc2UpXG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUEsc0VBQUFBLFNBQUE7QUFBQTtBQUFhLGFBQVMsUUFBUSxLQUFJO0FBQUM7QUFBMEIsVUFBRyxPQUFPLFdBQVMsY0FBWSxPQUFPLE9BQU8sYUFBVyxVQUFTO0FBQUMsa0JBQVEsU0FBU0MsU0FBUUMsTUFBSTtBQUFDLGlCQUFPLE9BQU9BO0FBQUEsUUFBRztBQUFBLE1BQUMsT0FBSztBQUFDLGtCQUFRLFNBQVNELFNBQVFDLE1BQUk7QUFBQyxpQkFBT0EsUUFBSyxPQUFPLFdBQVMsY0FBWUEsS0FBSSxnQkFBYyxVQUFRQSxTQUFNLE9BQU8sWUFBVSxXQUFTLE9BQU9BO0FBQUEsUUFBRztBQUFBLE1BQUM7QUFBQyxhQUFPLFFBQVEsR0FBRztBQUFBLElBQUM7QUFBQyxLQUFDLFNBQVNDLFNBQU87QUFBQyxVQUFJLGFBQVc7QUFBVSxVQUFJQyxjQUFXLFdBQVU7QUFBQyxZQUFJLFFBQU07QUFBaUYsWUFBSSxXQUFTO0FBQXVJLFlBQUksZUFBYTtBQUFjLGVBQU8sU0FBUyxNQUFLLE1BQUssS0FBSSxLQUFJO0FBQUMsY0FBRyxXQUFXLFdBQVMsS0FBRyxPQUFPLElBQUksTUFBSSxZQUFVLENBQUMsS0FBSyxLQUFLLElBQUksR0FBRTtBQUFDLG1CQUFLO0FBQUssbUJBQUs7QUFBQSxVQUFTO0FBQUMsaUJBQUssUUFBTSxTQUFPLElBQUUsT0FBSyxJQUFJO0FBQUssY0FBRyxFQUFFLGdCQUFnQixPQUFNO0FBQUMsbUJBQUssSUFBSSxLQUFLLElBQUk7QUFBQSxVQUFDO0FBQUMsY0FBRyxNQUFNLElBQUksR0FBRTtBQUFDLGtCQUFNLFVBQVUsY0FBYztBQUFBLFVBQUM7QUFBQyxpQkFBSyxPQUFPQSxZQUFXLE1BQU0sU0FBTyxRQUFNQSxZQUFXLE1BQU0sVUFBVTtBQUFFLGNBQUksWUFBVSxLQUFLLE1BQU0sR0FBRSxDQUFDO0FBQUUsY0FBRyxjQUFZLFVBQVEsY0FBWSxRQUFPO0FBQUMsbUJBQUssS0FBSyxNQUFNLENBQUM7QUFBRSxrQkFBSTtBQUFLLGdCQUFHLGNBQVksUUFBTztBQUFDLG9CQUFJO0FBQUEsWUFBSTtBQUFBLFVBQUM7QUFBQyxjQUFJLElBQUUsU0FBU0MsS0FBRztBQUFDLG1CQUFPLE1BQUksV0FBUztBQUFBLFVBQUs7QUFBRSxjQUFJLEtBQUcsU0FBUyxJQUFHO0FBQUMsbUJBQU8sS0FBSyxFQUFFLElBQUUsUUFBUTtBQUFBLFVBQUM7QUFBRSxjQUFJLElBQUUsU0FBU0MsS0FBRztBQUFDLG1CQUFPLEtBQUssRUFBRSxJQUFFLE9BQU87QUFBQSxVQUFDO0FBQUUsY0FBSSxLQUFHLFNBQVMsSUFBRztBQUFDLG1CQUFPLEtBQUssRUFBRSxJQUFFLFNBQVM7QUFBQSxVQUFDO0FBQUUsY0FBSSxJQUFFLFNBQVNDLEtBQUc7QUFBQyxtQkFBTyxLQUFLLEVBQUUsSUFBRSxZQUFZO0FBQUEsVUFBQztBQUFFLGNBQUksS0FBRyxTQUFTLElBQUc7QUFBQyxtQkFBTyxLQUFLLEVBQUUsSUFBRSxTQUFTO0FBQUEsVUFBQztBQUFFLGNBQUksS0FBRyxTQUFTLElBQUc7QUFBQyxtQkFBTyxLQUFLLEVBQUUsSUFBRSxXQUFXO0FBQUEsVUFBQztBQUFFLGNBQUksS0FBRyxTQUFTLElBQUc7QUFBQyxtQkFBTyxLQUFLLEVBQUUsSUFBRSxXQUFXO0FBQUEsVUFBQztBQUFFLGNBQUksS0FBRyxTQUFTLElBQUc7QUFBQyxtQkFBTyxLQUFLLEVBQUUsSUFBRSxnQkFBZ0I7QUFBQSxVQUFDO0FBQUUsY0FBSSxLQUFHLFNBQVMsSUFBRztBQUFDLG1CQUFPLE1BQUksSUFBRSxLQUFLLGtCQUFrQjtBQUFBLFVBQUM7QUFBRSxjQUFJLEtBQUcsU0FBUyxJQUFHO0FBQUMsbUJBQU8sUUFBUSxJQUFJO0FBQUEsVUFBQztBQUFFLGNBQUksS0FBRyxTQUFTLElBQUc7QUFBQyxtQkFBTyxhQUFhLElBQUk7QUFBQSxVQUFDO0FBQUUsY0FBSSxRQUFNLEVBQUMsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHO0FBQUEsVUFBQyxHQUFFLElBQUcsU0FBUyxLQUFJO0FBQUMsbUJBQU8sSUFBSSxHQUFHLENBQUM7QUFBQSxVQUFDLEdBQUUsS0FBSSxTQUFTLE1BQUs7QUFBQyxtQkFBT0gsWUFBVyxLQUFLLFNBQVMsRUFBRTtBQUFBLFVBQUUsR0FBRSxLQUFJLFNBQVMsTUFBSztBQUFDLG1CQUFPLFdBQVcsRUFBQyxHQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUcsR0FBRSxHQUFFLEdBQUcsR0FBRSxHQUFFLEVBQUUsR0FBRSxTQUFRQSxZQUFXLEtBQUssU0FBUyxFQUFFLElBQUcsT0FBTSxLQUFJLENBQUM7QUFBQSxVQUFDLEdBQUUsTUFBSyxTQUFTLE9BQU07QUFBQyxtQkFBT0EsWUFBVyxLQUFLLFNBQVMsRUFBRSxJQUFFO0FBQUEsVUFBRSxHQUFFLE1BQUssU0FBUyxPQUFNO0FBQUMsbUJBQU8sV0FBVyxFQUFDLEdBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRyxHQUFFLEdBQUUsR0FBRyxHQUFFLEdBQUUsRUFBRSxHQUFFLFNBQVFBLFlBQVcsS0FBSyxTQUFTLEVBQUUsSUFBRSxHQUFFLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHLElBQUU7QUFBQSxVQUFDLEdBQUUsSUFBRyxTQUFTLEtBQUk7QUFBQyxtQkFBTyxJQUFJLEdBQUcsSUFBRSxDQUFDO0FBQUEsVUFBQyxHQUFFLEtBQUksU0FBUyxNQUFLO0FBQUMsbUJBQU9BLFlBQVcsS0FBSyxXQUFXLEdBQUc7QUFBQSxVQUFFLEdBQUUsTUFBSyxTQUFTLE9BQU07QUFBQyxtQkFBT0EsWUFBVyxLQUFLLFdBQVcsR0FBRyxJQUFFO0FBQUEsVUFBRyxHQUFFLElBQUcsU0FBUyxLQUFJO0FBQUMsbUJBQU8sT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUM7QUFBQSxVQUFDLEdBQUUsTUFBSyxTQUFTLE9BQU07QUFBQyxtQkFBTyxJQUFJLEVBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsbUJBQU8sR0FBRyxJQUFFLE1BQUk7QUFBQSxVQUFFLEdBQUUsSUFBRyxTQUFTLEtBQUk7QUFBQyxtQkFBTyxJQUFJLEdBQUcsSUFBRSxNQUFJLEVBQUU7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHO0FBQUEsVUFBQyxHQUFFLElBQUcsU0FBUyxLQUFJO0FBQUMsbUJBQU8sSUFBSSxHQUFHLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHO0FBQUEsVUFBQyxHQUFFLElBQUcsU0FBUyxLQUFJO0FBQUMsbUJBQU8sSUFBSSxHQUFHLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHO0FBQUEsVUFBQyxHQUFFLElBQUcsU0FBUyxLQUFJO0FBQUMsbUJBQU8sSUFBSSxHQUFHLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxJQUFJLEdBQUcsR0FBRSxDQUFDO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsbUJBQU8sSUFBSSxLQUFLLE1BQU0sR0FBRyxJQUFFLEVBQUUsQ0FBQztBQUFBLFVBQUMsR0FBRSxHQUFFLFNBQVMsSUFBRztBQUFDLG1CQUFPLEdBQUcsSUFBRSxLQUFHQSxZQUFXLEtBQUssVUFBVSxLQUFHQSxZQUFXLEtBQUssVUFBVTtBQUFBLFVBQUUsR0FBRSxJQUFHLFNBQVMsS0FBSTtBQUFDLG1CQUFPLEdBQUcsSUFBRSxLQUFHQSxZQUFXLEtBQUssVUFBVSxLQUFHQSxZQUFXLEtBQUssVUFBVTtBQUFBLFVBQUUsR0FBRSxHQUFFLFNBQVMsSUFBRztBQUFDLG1CQUFPLEdBQUcsSUFBRSxLQUFHQSxZQUFXLEtBQUssVUFBVSxLQUFHQSxZQUFXLEtBQUssVUFBVTtBQUFBLFVBQUUsR0FBRSxJQUFHLFNBQVMsS0FBSTtBQUFDLG1CQUFPLEdBQUcsSUFBRSxLQUFHQSxZQUFXLEtBQUssVUFBVSxLQUFHQSxZQUFXLEtBQUssVUFBVTtBQUFBLFVBQUUsR0FBRSxHQUFFLFNBQVMsSUFBRztBQUFDLG1CQUFPLE1BQUksUUFBTSxNQUFJLFNBQU8sT0FBTyxJQUFJLEVBQUUsTUFBTSxRQUFRLEtBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLFFBQVEsY0FBYSxFQUFFLEVBQUUsUUFBUSxjQUFhLEtBQUs7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxvQkFBTyxHQUFHLElBQUUsSUFBRSxNQUFJLE9BQUssSUFBSSxLQUFLLE1BQU0sS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFFLEVBQUUsSUFBRSxNQUFJLEtBQUssSUFBSSxHQUFHLENBQUMsSUFBRSxJQUFHLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxvQkFBTyxHQUFHLElBQUUsSUFBRSxNQUFJLE9BQUssSUFBSSxLQUFLLE1BQU0sS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFFLEVBQUUsR0FBRSxDQUFDLElBQUUsTUFBSSxJQUFJLEtBQUssTUFBTSxLQUFLLElBQUksR0FBRyxDQUFDLElBQUUsRUFBRSxHQUFFLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTSxDQUFDLE1BQUssTUFBSyxNQUFLLElBQUksRUFBRSxHQUFHLElBQUUsS0FBRyxJQUFFLEtBQUcsR0FBRyxJQUFFLE1BQUksR0FBRyxJQUFFLE1BQUksTUFBSSxHQUFHLElBQUU7QUFBQSxVQUFHLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHO0FBQUEsVUFBQyxHQUFFLElBQUcsU0FBUyxLQUFJO0FBQUMsbUJBQU8sSUFBSSxHQUFHLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHO0FBQUEsVUFBQyxFQUFDO0FBQUUsaUJBQU8sS0FBSyxRQUFRLE9BQU0sU0FBUyxPQUFNO0FBQUMsZ0JBQUcsU0FBUyxPQUFNO0FBQUMscUJBQU8sTUFBTSxPQUFPO0FBQUEsWUFBQztBQUFDLG1CQUFPLE1BQU0sTUFBTSxHQUFFLE1BQU0sU0FBTyxDQUFDO0FBQUEsVUFBQyxDQUFDO0FBQUEsUUFBQztBQUFBLE1BQUMsRUFBRTtBQUFFLE1BQUFBLFlBQVcsUUFBTSxFQUFDLFNBQVEsNEJBQTJCLFdBQVUsVUFBUyxpQkFBZ0IsY0FBYSxZQUFXLGVBQWMsVUFBUyxnQkFBZSxVQUFTLHNCQUFxQixXQUFVLFdBQVUsWUFBVyxjQUFhLFVBQVMsZ0JBQWUsU0FBUSxjQUFhLFNBQVEsWUFBVyxhQUFZLDBCQUF5QixnQkFBZSxnQ0FBK0IscUJBQW9CLDhCQUE2QjtBQUFFLE1BQUFBLFlBQVcsT0FBSyxFQUFDLFVBQVMsQ0FBQyxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLFVBQVMsVUFBUyxXQUFVLGFBQVksWUFBVyxVQUFTLFVBQVUsR0FBRSxZQUFXLENBQUMsT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sV0FBVSxZQUFXLFNBQVEsU0FBUSxPQUFNLFFBQU8sUUFBTyxVQUFTLGFBQVksV0FBVSxZQUFXLFVBQVUsR0FBRSxXQUFVLENBQUMsS0FBSSxLQUFJLE1BQUssTUFBSyxLQUFJLEtBQUksTUFBSyxJQUFJLEVBQUM7QUFBRSxVQUFJLE1BQUksU0FBU0ksS0FBSSxLQUFJLEtBQUk7QUFBQyxjQUFJLE9BQU8sR0FBRztBQUFFLGNBQUksT0FBSztBQUFFLGVBQU0sSUFBSSxTQUFPLEtBQUk7QUFBQyxnQkFBSSxNQUFJO0FBQUEsUUFBRztBQUFDLGVBQU87QUFBQSxNQUFHO0FBQUUsVUFBSSxhQUFXLFNBQVNDLFlBQVcsTUFBSztBQUFDLFlBQUksSUFBRSxLQUFLLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxLQUFLLEdBQUUsVUFBUSxLQUFLLFNBQVEsYUFBVyxLQUFLLFVBQVMsU0FBTyxlQUFhLFNBQU8sUUFBTTtBQUFXLFlBQUksUUFBTSxJQUFJO0FBQUssWUFBSSxZQUFVLElBQUk7QUFBSyxrQkFBVSxRQUFRLFVBQVUsSUFBRSxRQUFRLElBQUUsQ0FBQztBQUFFLFlBQUksV0FBUyxJQUFJO0FBQUssaUJBQVMsUUFBUSxTQUFTLElBQUUsUUFBUSxJQUFFLENBQUM7QUFBRSxZQUFJLFVBQVEsU0FBU0MsV0FBUztBQUFDLGlCQUFPLE1BQU0sSUFBRSxRQUFRO0FBQUEsUUFBQztBQUFFLFlBQUksVUFBUSxTQUFTQyxXQUFTO0FBQUMsaUJBQU8sTUFBTSxJQUFFLFNBQVM7QUFBQSxRQUFDO0FBQUUsWUFBSSxVQUFRLFNBQVNDLFdBQVM7QUFBQyxpQkFBTyxNQUFNLElBQUUsWUFBWTtBQUFBLFFBQUM7QUFBRSxZQUFJLGNBQVksU0FBU0MsZUFBYTtBQUFDLGlCQUFPLFVBQVUsSUFBRSxRQUFRO0FBQUEsUUFBQztBQUFFLFlBQUksY0FBWSxTQUFTQyxlQUFhO0FBQUMsaUJBQU8sVUFBVSxJQUFFLFNBQVM7QUFBQSxRQUFDO0FBQUUsWUFBSSxjQUFZLFNBQVNDLGVBQWE7QUFBQyxpQkFBTyxVQUFVLElBQUUsWUFBWTtBQUFBLFFBQUM7QUFBRSxZQUFJLGFBQVcsU0FBU0MsY0FBWTtBQUFDLGlCQUFPLFNBQVMsSUFBRSxRQUFRO0FBQUEsUUFBQztBQUFFLFlBQUksYUFBVyxTQUFTQyxjQUFZO0FBQUMsaUJBQU8sU0FBUyxJQUFFLFNBQVM7QUFBQSxRQUFDO0FBQUUsWUFBSSxhQUFXLFNBQVNDLGNBQVk7QUFBQyxpQkFBTyxTQUFTLElBQUUsWUFBWTtBQUFBLFFBQUM7QUFBRSxZQUFHLFFBQVEsTUFBSSxLQUFHLFFBQVEsTUFBSSxLQUFHLFFBQVEsTUFBSSxHQUFFO0FBQUMsaUJBQU8sU0FBTyxRQUFNO0FBQUEsUUFBTyxXQUFTLFlBQVksTUFBSSxLQUFHLFlBQVksTUFBSSxLQUFHLFlBQVksTUFBSSxHQUFFO0FBQUMsaUJBQU8sU0FBTyxRQUFNO0FBQUEsUUFBVyxXQUFTLFdBQVcsTUFBSSxLQUFHLFdBQVcsTUFBSSxLQUFHLFdBQVcsTUFBSSxHQUFFO0FBQUMsaUJBQU8sU0FBTyxRQUFNO0FBQUEsUUFBVTtBQUFDLGVBQU87QUFBQSxNQUFPO0FBQUUsVUFBSSxVQUFRLFNBQVNDLFNBQVEsTUFBSztBQUFDLFlBQUksaUJBQWUsSUFBSSxLQUFLLEtBQUssWUFBWSxHQUFFLEtBQUssU0FBUyxHQUFFLEtBQUssUUFBUSxDQUFDO0FBQUUsdUJBQWUsUUFBUSxlQUFlLFFBQVEsS0FBRyxlQUFlLE9BQU8sSUFBRSxLQUFHLElBQUUsQ0FBQztBQUFFLFlBQUksZ0JBQWMsSUFBSSxLQUFLLGVBQWUsWUFBWSxHQUFFLEdBQUUsQ0FBQztBQUFFLHNCQUFjLFFBQVEsY0FBYyxRQUFRLEtBQUcsY0FBYyxPQUFPLElBQUUsS0FBRyxJQUFFLENBQUM7QUFBRSxZQUFJLEtBQUcsZUFBZSxrQkFBa0IsSUFBRSxjQUFjLGtCQUFrQjtBQUFFLHVCQUFlLFNBQVMsZUFBZSxTQUFTLElBQUUsRUFBRTtBQUFFLFlBQUksWUFBVSxpQkFBZSxrQkFBZ0IsUUFBTTtBQUFHLGVBQU8sSUFBRSxLQUFLLE1BQU0sUUFBUTtBQUFBLE1BQUM7QUFBRSxVQUFJLGVBQWEsU0FBU0MsY0FBYSxNQUFLO0FBQUMsWUFBSSxNQUFJLEtBQUssT0FBTztBQUFFLFlBQUcsUUFBTSxHQUFFO0FBQUMsZ0JBQUk7QUFBQSxRQUFDO0FBQUMsZUFBTztBQUFBLE1BQUc7QUFBRSxVQUFJLFNBQU8sU0FBU0MsUUFBTyxLQUFJO0FBQUMsWUFBRyxRQUFNLE1BQUs7QUFBQyxpQkFBTTtBQUFBLFFBQU07QUFBQyxZQUFHLFFBQU0sUUFBVTtBQUFDLGlCQUFNO0FBQUEsUUFBVztBQUFDLFlBQUcsUUFBUSxHQUFHLE1BQUksVUFBUztBQUFDLGlCQUFPLFFBQVEsR0FBRztBQUFBLFFBQUM7QUFBQyxZQUFHLE1BQU0sUUFBUSxHQUFHLEdBQUU7QUFBQyxpQkFBTTtBQUFBLFFBQU87QUFBQyxlQUFNLENBQUMsRUFBRSxTQUFTLEtBQUssR0FBRyxFQUFFLE1BQU0sR0FBRSxFQUFFLEVBQUUsWUFBWTtBQUFBLE1BQUM7QUFBRSxVQUFHLE9BQU8sV0FBUyxjQUFZLE9BQU8sS0FBSTtBQUFDLGVBQU8sV0FBVTtBQUFDLGlCQUFPakI7QUFBQSxRQUFVLENBQUM7QUFBQSxNQUFDLFlBQVUsT0FBTyxZQUFVLGNBQVksY0FBWSxRQUFRLE9BQU8sT0FBSyxVQUFTO0FBQUMsUUFBQUosUUFBTyxVQUFRSTtBQUFBLE1BQVUsT0FBSztBQUFDLFFBQUFELFFBQU8sYUFBV0M7QUFBQSxNQUFVO0FBQUEsSUFBQyxHQUFHLE1BQU07QUFBQTtBQUFBOzs7QUNBbjJOO0FBQUEsMEZBQUFrQixTQUFBO0FBQ0EsUUFBSSxhQUFhLE9BQU8sVUFBVSxZQUFZLFVBQVUsT0FBTyxXQUFXLFVBQVU7QUFFcEYsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDSGpCO0FBQUEsb0ZBQUFDLFNBQUE7QUFBQSxRQUFJLGFBQWE7QUFHakIsUUFBSSxXQUFXLE9BQU8sUUFBUSxZQUFZLFFBQVEsS0FBSyxXQUFXLFVBQVU7QUFHNUUsUUFBSSxPQUFPLGNBQWMsWUFBWSxTQUFTLGFBQWEsRUFBRTtBQUU3RCxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNSakI7QUFBQSxzRkFBQUMsU0FBQTtBQUFBLFFBQUksT0FBTztBQUdYLFFBQUlDLFVBQVMsS0FBSztBQUVsQixJQUFBRCxRQUFPLFVBQVVDO0FBQUE7QUFBQTs7O0FDTGpCO0FBQUEsd0ZBQUFDLFNBQUE7QUFTQSxhQUFTLFNBQVMsT0FBTyxVQUFVO0FBQ2pDLFVBQUksUUFBUSxJQUNSLFNBQVMsU0FBUyxPQUFPLElBQUksTUFBTSxRQUNuQyxTQUFTLE1BQU0sTUFBTTtBQUV6QixhQUFPLEVBQUUsUUFBUSxRQUFRO0FBQ3ZCLGVBQU8sU0FBUyxTQUFTLE1BQU0sUUFBUSxPQUFPLEtBQUs7QUFBQSxNQUNyRDtBQUNBLGFBQU87QUFBQSxJQUNUO0FBRUEsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDcEJqQjtBQUFBLHNGQUFBQyxTQUFBO0FBdUJBLFFBQUksVUFBVSxNQUFNO0FBRXBCLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ3pCakI7QUFBQSx5RkFBQUMsU0FBQTtBQUFBLFFBQUlDLFVBQVM7QUFHYixRQUFJLGNBQWMsT0FBTztBQUd6QixRQUFJLGlCQUFpQixZQUFZO0FBT2pDLFFBQUksdUJBQXVCLFlBQVk7QUFHdkMsUUFBSSxpQkFBaUJBLFVBQVNBLFFBQU8sY0FBYztBQVNuRCxhQUFTLFVBQVUsT0FBTztBQUN4QixVQUFJLFFBQVEsZUFBZSxLQUFLLE9BQU8sY0FBYyxHQUNqRCxNQUFNLE1BQU07QUFFaEIsVUFBSTtBQUNGLGNBQU0sa0JBQWtCO0FBQ3hCLFlBQUksV0FBVztBQUFBLE1BQ2pCLFNBQVMsR0FBUDtBQUFBLE1BQVc7QUFFYixVQUFJLFNBQVMscUJBQXFCLEtBQUssS0FBSztBQUM1QyxVQUFJLFVBQVU7QUFDWixZQUFJLE9BQU87QUFDVCxnQkFBTSxrQkFBa0I7QUFBQSxRQUMxQixPQUFPO0FBQ0wsaUJBQU8sTUFBTTtBQUFBLFFBQ2Y7QUFBQSxNQUNGO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFQSxJQUFBRCxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUM3Q2pCO0FBQUEsOEZBQUFFLFNBQUE7QUFDQSxRQUFJLGNBQWMsT0FBTztBQU96QixRQUFJLHVCQUF1QixZQUFZO0FBU3ZDLGFBQVMsZUFBZSxPQUFPO0FBQzdCLGFBQU8scUJBQXFCLEtBQUssS0FBSztBQUFBLElBQ3hDO0FBRUEsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDckJqQjtBQUFBLDBGQUFBQyxTQUFBO0FBQUEsUUFBSUMsVUFBUztBQUFiLFFBQ0ksWUFBWTtBQURoQixRQUVJLGlCQUFpQjtBQUdyQixRQUFJLFVBQVU7QUFBZCxRQUNJLGVBQWU7QUFHbkIsUUFBSSxpQkFBaUJBLFVBQVNBLFFBQU8sY0FBYztBQVNuRCxhQUFTLFdBQVcsT0FBTztBQUN6QixVQUFJLFNBQVMsTUFBTTtBQUNqQixlQUFPLFVBQVUsU0FBWSxlQUFlO0FBQUEsTUFDOUM7QUFDQSxhQUFRLGtCQUFrQixrQkFBa0IsT0FBTyxLQUFLLElBQ3BELFVBQVUsS0FBSyxJQUNmLGVBQWUsS0FBSztBQUFBLElBQzFCO0FBRUEsSUFBQUQsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDM0JqQjtBQUFBLDJGQUFBRSxTQUFBO0FBd0JBLGFBQVMsYUFBYSxPQUFPO0FBQzNCLGFBQU8sU0FBUyxRQUFRLE9BQU8sU0FBUztBQUFBLElBQzFDO0FBRUEsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDNUJqQjtBQUFBLHVGQUFBQyxTQUFBO0FBQUEsUUFBSSxhQUFhO0FBQWpCLFFBQ0ksZUFBZTtBQUduQixRQUFJLFlBQVk7QUFtQmhCLGFBQVMsU0FBUyxPQUFPO0FBQ3ZCLGFBQU8sT0FBTyxTQUFTLFlBQ3BCLGFBQWEsS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLO0FBQUEsSUFDakQ7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUM1QmpCO0FBQUEsNEZBQUFDLFNBQUE7QUFBQSxRQUFJQyxVQUFTO0FBQWIsUUFDSSxXQUFXO0FBRGYsUUFFSSxVQUFVO0FBRmQsUUFHSSxXQUFXO0FBR2YsUUFBSSxXQUFXLElBQUk7QUFHbkIsUUFBSSxjQUFjQSxVQUFTQSxRQUFPLFlBQVk7QUFBOUMsUUFDSSxpQkFBaUIsY0FBYyxZQUFZLFdBQVc7QUFVMUQsYUFBUyxhQUFhLE9BQU87QUFFM0IsVUFBSSxPQUFPLFNBQVMsVUFBVTtBQUM1QixlQUFPO0FBQUEsTUFDVDtBQUNBLFVBQUksUUFBUSxLQUFLLEdBQUc7QUFFbEIsZUFBTyxTQUFTLE9BQU8sWUFBWSxJQUFJO0FBQUEsTUFDekM7QUFDQSxVQUFJLFNBQVMsS0FBSyxHQUFHO0FBQ25CLGVBQU8saUJBQWlCLGVBQWUsS0FBSyxLQUFLLElBQUk7QUFBQSxNQUN2RDtBQUNBLFVBQUksU0FBVSxRQUFRO0FBQ3RCLGFBQVEsVUFBVSxPQUFRLElBQUksU0FBVSxDQUFDLFdBQVksT0FBTztBQUFBLElBQzlEO0FBRUEsSUFBQUQsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDcENqQjtBQUFBLHlGQUFBRSxTQUFBO0FBU0EsYUFBUyxVQUFVLE9BQU8sT0FBTyxLQUFLO0FBQ3BDLFVBQUksUUFBUSxJQUNSLFNBQVMsTUFBTTtBQUVuQixVQUFJLFFBQVEsR0FBRztBQUNiLGdCQUFRLENBQUMsUUFBUSxTQUFTLElBQUssU0FBUztBQUFBLE1BQzFDO0FBQ0EsWUFBTSxNQUFNLFNBQVMsU0FBUztBQUM5QixVQUFJLE1BQU0sR0FBRztBQUNYLGVBQU87QUFBQSxNQUNUO0FBQ0EsZUFBUyxRQUFRLE1BQU0sSUFBTSxNQUFNLFVBQVc7QUFDOUMsaUJBQVc7QUFFWCxVQUFJLFNBQVMsTUFBTSxNQUFNO0FBQ3pCLGFBQU8sRUFBRSxRQUFRLFFBQVE7QUFDdkIsZUFBTyxTQUFTLE1BQU0sUUFBUTtBQUFBLE1BQ2hDO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUM5QmpCO0FBQUEseUZBQUFDLFNBQUE7QUFBQSxRQUFJLFlBQVk7QUFXaEIsYUFBUyxVQUFVLE9BQU8sT0FBTyxLQUFLO0FBQ3BDLFVBQUksU0FBUyxNQUFNO0FBQ25CLFlBQU0sUUFBUSxTQUFZLFNBQVM7QUFDbkMsYUFBUSxDQUFDLFNBQVMsT0FBTyxTQUFVLFFBQVEsVUFBVSxPQUFPLE9BQU8sR0FBRztBQUFBLElBQ3hFO0FBRUEsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDakJqQjtBQUFBLDZGQUFBQyxTQUFBO0FBV0EsYUFBUyxjQUFjLE9BQU8sV0FBVyxXQUFXLFdBQVc7QUFDN0QsVUFBSSxTQUFTLE1BQU0sUUFDZixRQUFRLGFBQWEsWUFBWSxJQUFJO0FBRXpDLGFBQVEsWUFBWSxVQUFVLEVBQUUsUUFBUSxRQUFTO0FBQy9DLFlBQUksVUFBVSxNQUFNLFFBQVEsT0FBTyxLQUFLLEdBQUc7QUFDekMsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBRUEsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDdkJqQjtBQUFBLHlGQUFBQyxTQUFBO0FBT0EsYUFBUyxVQUFVLE9BQU87QUFDeEIsYUFBTyxVQUFVO0FBQUEsSUFDbkI7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNYakI7QUFBQSw2RkFBQUMsU0FBQTtBQVVBLGFBQVMsY0FBYyxPQUFPLE9BQU8sV0FBVztBQUM5QyxVQUFJLFFBQVEsWUFBWSxHQUNwQixTQUFTLE1BQU07QUFFbkIsYUFBTyxFQUFFLFFBQVEsUUFBUTtBQUN2QixZQUFJLE1BQU0sV0FBVyxPQUFPO0FBQzFCLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ3RCakI7QUFBQSwyRkFBQUMsU0FBQTtBQUFBLFFBQUksZ0JBQWdCO0FBQXBCLFFBQ0ksWUFBWTtBQURoQixRQUVJLGdCQUFnQjtBQVdwQixhQUFTLFlBQVksT0FBTyxPQUFPLFdBQVc7QUFDNUMsYUFBTyxVQUFVLFFBQ2IsY0FBYyxPQUFPLE9BQU8sU0FBUyxJQUNyQyxjQUFjLE9BQU8sV0FBVyxTQUFTO0FBQUEsSUFDL0M7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNuQmpCO0FBQUEsNkZBQUFDLFNBQUE7QUFBQSxRQUFJLGNBQWM7QUFXbEIsYUFBUyxjQUFjLFlBQVksWUFBWTtBQUM3QyxVQUFJLFFBQVEsV0FBVztBQUV2QixhQUFPLFdBQVcsWUFBWSxZQUFZLFdBQVcsUUFBUSxDQUFDLElBQUksSUFBSTtBQUFBLE1BQUM7QUFDdkUsYUFBTztBQUFBLElBQ1Q7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNsQmpCO0FBQUEsNEZBQUFDLFNBQUE7QUFPQSxhQUFTLGFBQWEsUUFBUTtBQUM1QixhQUFPLE9BQU8sTUFBTSxFQUFFO0FBQUEsSUFDeEI7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNYakI7QUFBQSwwRkFBQUMsU0FBQTtBQUNBLFFBQUksZ0JBQWdCO0FBQXBCLFFBQ0ksb0JBQW9CO0FBRHhCLFFBRUksd0JBQXdCO0FBRjVCLFFBR0ksc0JBQXNCO0FBSDFCLFFBSUksZUFBZSxvQkFBb0Isd0JBQXdCO0FBSi9ELFFBS0ksYUFBYTtBQUdqQixRQUFJLFFBQVE7QUFHWixRQUFJLGVBQWUsT0FBTyxNQUFNLFFBQVEsZ0JBQWlCLGVBQWUsYUFBYSxHQUFHO0FBU3hGLGFBQVMsV0FBVyxRQUFRO0FBQzFCLGFBQU8sYUFBYSxLQUFLLE1BQU07QUFBQSxJQUNqQztBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ3pCakI7QUFBQSw4RkFBQUMsU0FBQTtBQUNBLFFBQUksZ0JBQWdCO0FBQXBCLFFBQ0ksb0JBQW9CO0FBRHhCLFFBRUksd0JBQXdCO0FBRjVCLFFBR0ksc0JBQXNCO0FBSDFCLFFBSUksZUFBZSxvQkFBb0Isd0JBQXdCO0FBSi9ELFFBS0ksYUFBYTtBQUdqQixRQUFJLFdBQVcsTUFBTSxnQkFBZ0I7QUFBckMsUUFDSSxVQUFVLE1BQU0sZUFBZTtBQURuQyxRQUVJLFNBQVM7QUFGYixRQUdJLGFBQWEsUUFBUSxVQUFVLE1BQU0sU0FBUztBQUhsRCxRQUlJLGNBQWMsT0FBTyxnQkFBZ0I7QUFKekMsUUFLSSxhQUFhO0FBTGpCLFFBTUksYUFBYTtBQU5qQixRQU9JLFFBQVE7QUFHWixRQUFJLFdBQVcsYUFBYTtBQUE1QixRQUNJLFdBQVcsTUFBTSxhQUFhO0FBRGxDLFFBRUksWUFBWSxRQUFRLFFBQVEsUUFBUSxDQUFDLGFBQWEsWUFBWSxVQUFVLEVBQUUsS0FBSyxHQUFHLElBQUksTUFBTSxXQUFXLFdBQVc7QUFGdEgsUUFHSSxRQUFRLFdBQVcsV0FBVztBQUhsQyxRQUlJLFdBQVcsUUFBUSxDQUFDLGNBQWMsVUFBVSxLQUFLLFNBQVMsWUFBWSxZQUFZLFFBQVEsRUFBRSxLQUFLLEdBQUcsSUFBSTtBQUc1RyxRQUFJLFlBQVksT0FBTyxTQUFTLFFBQVEsU0FBUyxPQUFPLFdBQVcsT0FBTyxHQUFHO0FBUzdFLGFBQVMsZUFBZSxRQUFRO0FBQzlCLGFBQU8sT0FBTyxNQUFNLFNBQVMsS0FBSyxDQUFDO0FBQUEsSUFDckM7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUN2Q2pCO0FBQUEsNkZBQUFDLFNBQUE7QUFBQSxRQUFJLGVBQWU7QUFBbkIsUUFDSSxhQUFhO0FBRGpCLFFBRUksaUJBQWlCO0FBU3JCLGFBQVMsY0FBYyxRQUFRO0FBQzdCLGFBQU8sV0FBVyxNQUFNLElBQ3BCLGVBQWUsTUFBTSxJQUNyQixhQUFhLE1BQU07QUFBQSxJQUN6QjtBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ2pCakI7QUFBQSx1RkFBQUMsU0FBQTtBQUFBLFFBQUksZUFBZTtBQXVCbkIsYUFBUyxTQUFTLE9BQU87QUFDdkIsYUFBTyxTQUFTLE9BQU8sS0FBSyxhQUFhLEtBQUs7QUFBQSxJQUNoRDtBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQzNCakI7QUFBQSxzRkFBQUMsU0FBQTtBQUFBLFFBQUksZUFBZTtBQUFuQixRQUNJLFlBQVk7QUFEaEIsUUFFSSxnQkFBZ0I7QUFGcEIsUUFHSSxnQkFBZ0I7QUFIcEIsUUFJSSxXQUFXO0FBR2YsUUFBSSxZQUFZO0FBcUJoQixhQUFTLFFBQVEsUUFBUSxPQUFPLE9BQU87QUFDckMsZUFBUyxTQUFTLE1BQU07QUFDeEIsVUFBSSxXQUFXLFNBQVMsVUFBVSxTQUFZO0FBQzVDLGVBQU8sT0FBTyxRQUFRLFdBQVcsRUFBRTtBQUFBLE1BQ3JDO0FBQ0EsVUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLGFBQWEsS0FBSyxJQUFJO0FBQzdDLGVBQU87QUFBQSxNQUNUO0FBQ0EsVUFBSSxhQUFhLGNBQWMsTUFBTSxHQUNqQyxNQUFNLGNBQWMsWUFBWSxjQUFjLEtBQUssQ0FBQyxJQUFJO0FBRTVELGFBQU8sVUFBVSxZQUFZLEdBQUcsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUFBLElBQzlDO0FBRUEsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDMUNqQjtBQUFBLDhFQUFBQyxTQUFBO0FBQUE7QUFFQSxZQUFRLGFBQWE7QUFJckIsWUFBUSxhQUFhO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsbUJBQW1CO0FBQUEsTUFDbkIsa0JBQWtCO0FBQUEsTUFDbEIsVUFBVTtBQUFBLE1BQ1YsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsUUFBUTtBQUFBLE1BQ1IsYUFBYTtBQUFBLElBQ2pCO0FBQ0EsSUFBQUEsUUFBTyxVQUFVLFFBQVE7QUFBQTtBQUFBOzs7QUNyQnpCO0FBQUEsMEZBQUFDLFNBQUE7QUFDQSxRQUFJLG1CQUFtQjtBQUd2QixRQUFJLGNBQWMsS0FBSztBQVV2QixhQUFTLFdBQVcsUUFBUSxHQUFHO0FBQzdCLFVBQUksU0FBUztBQUNiLFVBQUksQ0FBQyxVQUFVLElBQUksS0FBSyxJQUFJLGtCQUFrQjtBQUM1QyxlQUFPO0FBQUEsTUFDVDtBQUdBLFNBQUc7QUFDRCxZQUFJLElBQUksR0FBRztBQUNULG9CQUFVO0FBQUEsUUFDWjtBQUNBLFlBQUksWUFBWSxJQUFJLENBQUM7QUFDckIsWUFBSSxHQUFHO0FBQ0wsb0JBQVU7QUFBQSxRQUNaO0FBQUEsTUFDRixTQUFTO0FBRVQsYUFBTztBQUFBLElBQ1Q7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNsQ2pCO0FBQUEsaUZBQUFDLFNBQUE7QUFnQ0EsYUFBUyxHQUFHLE9BQU8sT0FBTztBQUN4QixhQUFPLFVBQVUsU0FBVSxVQUFVLFNBQVMsVUFBVTtBQUFBLElBQzFEO0FBRUEsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDcENqQjtBQUFBLHVGQUFBQyxTQUFBO0FBeUJBLGFBQVMsU0FBUyxPQUFPO0FBQ3ZCLFVBQUksT0FBTyxPQUFPO0FBQ2xCLGFBQU8sU0FBUyxTQUFTLFFBQVEsWUFBWSxRQUFRO0FBQUEsSUFDdkQ7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUM5QmpCO0FBQUEseUZBQUFDLFNBQUE7QUFBQSxRQUFJLGFBQWE7QUFBakIsUUFDSSxXQUFXO0FBR2YsUUFBSSxXQUFXO0FBQWYsUUFDSSxVQUFVO0FBRGQsUUFFSSxTQUFTO0FBRmIsUUFHSSxXQUFXO0FBbUJmLGFBQVMsV0FBVyxPQUFPO0FBQ3pCLFVBQUksQ0FBQyxTQUFTLEtBQUssR0FBRztBQUNwQixlQUFPO0FBQUEsTUFDVDtBQUdBLFVBQUksTUFBTSxXQUFXLEtBQUs7QUFDMUIsYUFBTyxPQUFPLFdBQVcsT0FBTyxVQUFVLE9BQU8sWUFBWSxPQUFPO0FBQUEsSUFDdEU7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNwQ2pCO0FBQUEsdUZBQUFDLFNBQUE7QUFDQSxRQUFJLG1CQUFtQjtBQTRCdkIsYUFBUyxTQUFTLE9BQU87QUFDdkIsYUFBTyxPQUFPLFNBQVMsWUFDckIsUUFBUSxNQUFNLFFBQVEsS0FBSyxLQUFLLFNBQVM7QUFBQSxJQUM3QztBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ2xDakI7QUFBQSwwRkFBQUMsU0FBQTtBQUFBLFFBQUksYUFBYTtBQUFqQixRQUNJLFdBQVc7QUEyQmYsYUFBUyxZQUFZLE9BQU87QUFDMUIsYUFBTyxTQUFTLFFBQVEsU0FBUyxNQUFNLE1BQU0sS0FBSyxDQUFDLFdBQVcsS0FBSztBQUFBLElBQ3JFO0FBRUEsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDaENqQjtBQUFBLHVGQUFBQyxTQUFBO0FBQ0EsUUFBSSxtQkFBbUI7QUFHdkIsUUFBSSxXQUFXO0FBVWYsYUFBUyxRQUFRLE9BQU8sUUFBUTtBQUM5QixVQUFJLE9BQU8sT0FBTztBQUNsQixlQUFTLFVBQVUsT0FBTyxtQkFBbUI7QUFFN0MsYUFBTyxDQUFDLENBQUMsV0FDTixRQUFRLFlBQ04sUUFBUSxZQUFZLFNBQVMsS0FBSyxLQUFLLE9BQ3JDLFFBQVEsTUFBTSxRQUFRLEtBQUssS0FBSyxRQUFRO0FBQUEsSUFDakQ7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUN4QmpCO0FBQUEsOEZBQUFDLFNBQUE7QUFBQSxRQUFJLEtBQUs7QUFBVCxRQUNJLGNBQWM7QUFEbEIsUUFFSSxVQUFVO0FBRmQsUUFHSSxXQUFXO0FBWWYsYUFBUyxlQUFlLE9BQU8sT0FBTyxRQUFRO0FBQzVDLFVBQUksQ0FBQyxTQUFTLE1BQU0sR0FBRztBQUNyQixlQUFPO0FBQUEsTUFDVDtBQUNBLFVBQUksT0FBTyxPQUFPO0FBQ2xCLFVBQUksUUFBUSxXQUNILFlBQVksTUFBTSxLQUFLLFFBQVEsT0FBTyxPQUFPLE1BQU0sSUFDbkQsUUFBUSxZQUFZLFNBQVMsUUFDaEM7QUFDSixlQUFPLEdBQUcsT0FBTyxRQUFRLEtBQUs7QUFBQSxNQUNoQztBQUNBLGFBQU87QUFBQSxJQUNUO0FBRUEsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDN0JqQjtBQUFBLHVGQUFBQyxTQUFBO0FBQUEsUUFBSSxXQUFXO0FBQWYsUUFDSSxXQUFXO0FBR2YsUUFBSSxNQUFNLElBQUk7QUFHZCxRQUFJLFNBQVM7QUFHYixRQUFJLGFBQWE7QUFHakIsUUFBSSxhQUFhO0FBR2pCLFFBQUksWUFBWTtBQUdoQixRQUFJLGVBQWU7QUF5Qm5CLGFBQVMsU0FBUyxPQUFPO0FBQ3ZCLFVBQUksT0FBTyxTQUFTLFVBQVU7QUFDNUIsZUFBTztBQUFBLE1BQ1Q7QUFDQSxVQUFJLFNBQVMsS0FBSyxHQUFHO0FBQ25CLGVBQU87QUFBQSxNQUNUO0FBQ0EsVUFBSSxTQUFTLEtBQUssR0FBRztBQUNuQixZQUFJLFFBQVEsT0FBTyxNQUFNLFdBQVcsYUFBYSxNQUFNLFFBQVEsSUFBSTtBQUNuRSxnQkFBUSxTQUFTLEtBQUssSUFBSyxRQUFRLEtBQU07QUFBQSxNQUMzQztBQUNBLFVBQUksT0FBTyxTQUFTLFVBQVU7QUFDNUIsZUFBTyxVQUFVLElBQUksUUFBUSxDQUFDO0FBQUEsTUFDaEM7QUFDQSxjQUFRLE1BQU0sUUFBUSxRQUFRLEVBQUU7QUFDaEMsVUFBSSxXQUFXLFdBQVcsS0FBSyxLQUFLO0FBQ3BDLGFBQVEsWUFBWSxVQUFVLEtBQUssS0FBSyxJQUNwQyxhQUFhLE1BQU0sTUFBTSxDQUFDLEdBQUcsV0FBVyxJQUFJLENBQUMsSUFDNUMsV0FBVyxLQUFLLEtBQUssSUFBSSxNQUFNLENBQUM7QUFBQSxJQUN2QztBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ2pFakI7QUFBQSx1RkFBQUMsU0FBQTtBQUFBLFFBQUksV0FBVztBQUdmLFFBQUksV0FBVyxJQUFJO0FBQW5CLFFBQ0ksY0FBYztBQXlCbEIsYUFBUyxTQUFTLE9BQU87QUFDdkIsVUFBSSxDQUFDLE9BQU87QUFDVixlQUFPLFVBQVUsSUFBSSxRQUFRO0FBQUEsTUFDL0I7QUFDQSxjQUFRLFNBQVMsS0FBSztBQUN0QixVQUFJLFVBQVUsWUFBWSxVQUFVLENBQUMsVUFBVTtBQUM3QyxZQUFJLE9BQVEsUUFBUSxJQUFJLEtBQUs7QUFDN0IsZUFBTyxPQUFPO0FBQUEsTUFDaEI7QUFDQSxhQUFPLFVBQVUsUUFBUSxRQUFRO0FBQUEsSUFDbkM7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUN6Q2pCO0FBQUEsd0ZBQUFDLFNBQUE7QUFBQSxRQUFJLFdBQVc7QUE0QmYsYUFBUyxVQUFVLE9BQU87QUFDeEIsVUFBSSxTQUFTLFNBQVMsS0FBSyxHQUN2QixZQUFZLFNBQVM7QUFFekIsYUFBTyxXQUFXLFNBQVUsWUFBWSxTQUFTLFlBQVksU0FBVTtBQUFBLElBQ3pFO0FBRUEsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDbkNqQjtBQUFBLHFGQUFBQyxTQUFBO0FBQUEsUUFBSSxhQUFhO0FBQWpCLFFBQ0ksaUJBQWlCO0FBRHJCLFFBRUksWUFBWTtBQUZoQixRQUdJLFdBQVc7QUF3QmYsYUFBUyxPQUFPLFFBQVEsR0FBRyxPQUFPO0FBQ2hDLFVBQUssUUFBUSxlQUFlLFFBQVEsR0FBRyxLQUFLLElBQUksTUFBTSxRQUFZO0FBQ2hFLFlBQUk7QUFBQSxNQUNOLE9BQU87QUFDTCxZQUFJLFVBQVUsQ0FBQztBQUFBLE1BQ2pCO0FBQ0EsYUFBTyxXQUFXLFNBQVMsTUFBTSxHQUFHLENBQUM7QUFBQSxJQUN2QztBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ3BDakI7QUFBQSxtRkFBQUMsU0FBQTtBQWNBLGFBQVMsS0FBSyxPQUFPO0FBQ25CLFVBQUksU0FBUyxTQUFTLE9BQU8sSUFBSSxNQUFNO0FBQ3ZDLGFBQU8sU0FBUyxNQUFNLFNBQVMsS0FBSztBQUFBLElBQ3RDO0FBRUEsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDbkJqQjtBQUFBLCtFQUFBQyxTQUFBO0FBQUE7QUFFQSxZQUFRLGFBQWE7QUFFckIsUUFBSSxVQUFVO0FBRWQsUUFBSSxXQUFXLHVCQUF1QixPQUFPO0FBRTdDLFFBQUksUUFBUTtBQUVaLFFBQUksU0FBUyx1QkFBdUIsS0FBSztBQUV6QyxhQUFTLHVCQUF1QixLQUFLO0FBQUUsYUFBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsV0FBVyxJQUFJO0FBQUEsSUFBRztBQUVoRyxhQUFTLGdCQUFnQixVQUFVLGFBQWE7QUFBRSxVQUFJLEVBQUUsb0JBQW9CLGNBQWM7QUFBRSxjQUFNLElBQUksVUFBVSxtQ0FBbUM7QUFBQSxNQUFHO0FBQUEsSUFBRTtBQUV4SixRQUFJLHdCQUF3QjtBQUM1QixRQUFJLDBCQUEwQjtBQVc5QixRQUFJLGNBQWMsV0FBWTtBQUkxQixlQUFTQyxhQUFZLFFBQVE7QUFDekIsd0JBQWdCLE1BQU1BLFlBQVc7QUFFakMsYUFBSyxTQUFTLFVBQVU7QUFDeEIsYUFBSyxjQUFjLENBQUM7QUFBQSxNQUN4QjtBQVFBLE1BQUFBLGFBQVksVUFBVSxZQUFZLFNBQVMsWUFBWTtBQUNuRCxnQkFBUSxHQUFHLFNBQVMsWUFBWSxLQUFLLFFBQVEsS0FBSyxZQUFZLE1BQU07QUFBQSxNQUN4RTtBQU9BLE1BQUFBLGFBQVksVUFBVSxtQkFBbUIsU0FBUyxtQkFBbUI7QUFDakUsYUFBSyxZQUFZLEtBQUsscUJBQXFCO0FBQUEsTUFDL0M7QUFPQSxNQUFBQSxhQUFZLFVBQVUscUJBQXFCLFNBQVMscUJBQXFCO0FBQ3JFLGFBQUssWUFBWSxLQUFLLHVCQUF1QjtBQUFBLE1BQ2pEO0FBUUEsTUFBQUEsYUFBWSxVQUFVLG1CQUFtQixTQUFTLG1CQUFtQjtBQUNqRSxhQUFLLEdBQUcsT0FBTyxZQUFZLEtBQUssV0FBVyxNQUFNLHVCQUF1QjtBQUNwRSxlQUFLLFlBQVksSUFBSTtBQUFBLFFBQ3pCO0FBQUEsTUFDSjtBQVNBLE1BQUFBLGFBQVksVUFBVSxxQkFBcUIsU0FBUyxxQkFBcUI7QUFDckUsZUFBTyxLQUFLLFlBQVksU0FBUyxHQUFHO0FBQ2hDLGNBQUksT0FBTyxLQUFLLFlBQVksSUFBSTtBQUNoQyxjQUFJLFNBQVMsdUJBQXVCO0FBQ2hDO0FBQUEsVUFDSjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBRUEsYUFBT0E7QUFBQSxJQUNYLEVBQUU7QUFFRixZQUFRLGFBQWE7QUFDckIsSUFBQUQsUUFBTyxVQUFVLFFBQVE7QUFBQTtBQUFBOzs7QUNuR3pCO0FBQUEsK0VBQUFFLFNBQUE7QUFBQTtBQUVBLFlBQVEsYUFBYTtBQUVyQixRQUFJLGNBQWM7QUFFbEIsUUFBSSxlQUFlLHVCQUF1QixXQUFXO0FBRXJELGFBQVMsdUJBQXVCLEtBQUs7QUFBRSxhQUFPLE9BQU8sSUFBSSxhQUFhLE1BQU0sRUFBRSxXQUFXLElBQUk7QUFBQSxJQUFHO0FBRWhHLGFBQVMsZ0JBQWdCLFVBQVUsYUFBYTtBQUFFLFVBQUksRUFBRSxvQkFBb0IsY0FBYztBQUFFLGNBQU0sSUFBSSxVQUFVLG1DQUFtQztBQUFBLE1BQUc7QUFBQSxJQUFFO0FBRXhKLFFBQUksb0JBQW9CO0FBVXhCLFFBQUksY0FBYyxXQUFZO0FBQzFCLGVBQVNDLGVBQWM7QUFDbkIsd0JBQWdCLE1BQU1BLFlBQVc7QUFFakMsYUFBSyxRQUFRO0FBQUEsTUFDakI7QUFVQSxNQUFBQSxhQUFZLFVBQVUsa0JBQWtCLFNBQVMsZ0JBQWdCLFFBQVEsT0FBTztBQUM1RSxZQUFJLEtBQUssVUFBVSxLQUFLLEtBQUssY0FBYyxRQUFRLEtBQUssR0FBRztBQUN2RCxlQUFLLFFBQVE7QUFBQSxRQUNqQixXQUFXLEtBQUssUUFBUSxHQUFHO0FBQ3ZCLGVBQUs7QUFBQSxRQUNULE9BQU87QUFDSCxlQUFLLFFBQVE7QUFBQSxRQUNqQjtBQUFBLE1BQ0o7QUFRQSxNQUFBQSxhQUFZLFVBQVUsTUFBTSxTQUFTLE1BQU07QUFDdkMsYUFBSztBQUFBLE1BQ1Q7QUFRQSxNQUFBQSxhQUFZLFVBQVUsV0FBVyxTQUFTLFdBQVc7QUFDakQsZUFBTyxLQUFLLFFBQVE7QUFBQSxNQUN4QjtBQU1BLE1BQUFBLGFBQVksVUFBVSxnQkFBZ0IsU0FBUyxjQUFjLFFBQVEsT0FBTztBQUN4RSxZQUFJLFNBQVM7QUFDYixZQUFJLFFBQVE7QUFFWixpQkFBUyxJQUFJLE9BQU8sSUFBSSxPQUFPLFFBQVEsS0FBSztBQUN4QyxjQUFJLFFBQVEsT0FBTztBQUNuQixvQkFBVSxNQUFNLE1BQU07QUFHdEIsY0FBSSxTQUFTLG1CQUFtQjtBQUM1QixtQkFBTztBQUFBLFVBQ1g7QUFFQSxjQUFJLE1BQU0sU0FBUyxhQUFhLFdBQVcsWUFBWTtBQUNuRDtBQUFBLFVBQ0osV0FBVyxNQUFNLFNBQVMsYUFBYSxXQUFXLGFBQWE7QUFDM0Q7QUFDQSxnQkFBSSxVQUFVLEdBQUc7QUFDYixxQkFBTztBQUFBLFlBQ1g7QUFBQSxVQUNKO0FBRUEsY0FBSSxLQUFLLGlCQUFpQixLQUFLLEdBQUc7QUFDOUIsbUJBQU87QUFBQSxVQUNYO0FBQUEsUUFDSjtBQUNBLGVBQU87QUFBQSxNQUNYO0FBTUEsTUFBQUEsYUFBWSxVQUFVLG1CQUFtQixTQUFTLGlCQUFpQixNQUFNO0FBQ3JFLFlBQUksT0FBTyxLQUFLLE1BQ1osUUFBUSxLQUFLO0FBRWpCLGVBQU8sU0FBUyxhQUFhLFdBQVcscUJBQXFCLFNBQVMsYUFBYSxXQUFXLG9CQUFvQixTQUFTLGFBQWEsV0FBVyxXQUFXLFNBQVMsYUFBYSxXQUFXLGlCQUFpQixVQUFVO0FBQUEsTUFDOU47QUFFQSxhQUFPQTtBQUFBLElBQ1gsRUFBRTtBQUVGLFlBQVEsYUFBYTtBQUNyQixJQUFBRCxRQUFPLFVBQVUsUUFBUTtBQUFBO0FBQUE7OztBQ25IekI7QUFBQSwwRUFBQUUsU0FBQTtBQUFBO0FBRUEsWUFBUSxhQUFhO0FBRXJCLGFBQVMsZ0JBQWdCLFVBQVUsYUFBYTtBQUFFLFVBQUksRUFBRSxvQkFBb0IsY0FBYztBQUFFLGNBQU0sSUFBSSxVQUFVLG1DQUFtQztBQUFBLE1BQUc7QUFBQSxJQUFFO0FBS3hKLFFBQUksU0FBUyxXQUFZO0FBSXJCLGVBQVNDLFFBQU8sUUFBUTtBQUNwQix3QkFBZ0IsTUFBTUEsT0FBTTtBQUU1QixhQUFLLFNBQVM7QUFDZCxhQUFLLFFBQVE7QUFBQSxNQUNqQjtBQVdBLE1BQUFBLFFBQU8sVUFBVSxNQUFNLFNBQVMsSUFBSSxNQUFNO0FBQ3RDLFlBQUksTUFBTSxLQUFLLEtBQ1gsUUFBUSxLQUFLO0FBRWpCLFlBQUksQ0FBQyxLQUFLLFFBQVE7QUFDZCxpQkFBTztBQUFBLFFBQ1g7QUFDQSxZQUFJLEtBQUs7QUFDTCxpQkFBTyxLQUFLLE9BQU87QUFBQSxRQUN2QjtBQUNBLGVBQU8sS0FBSyxPQUFPLEtBQUs7QUFBQSxNQUM1QjtBQUVBLGFBQU9BO0FBQUEsSUFDWCxFQUFFO0FBRUYsWUFBUSxhQUFhO0FBQ3JCLElBQUFELFFBQU8sVUFBVSxRQUFRO0FBQUE7QUFBQTs7O0FDOUN6QjtBQUFBLDZFQUFBRSxTQUFBO0FBQUE7QUFFQSxZQUFRLGFBQWE7QUFFckIsUUFBSSxXQUFXO0FBRWYsUUFBSSxZQUFZLHVCQUF1QixRQUFRO0FBRS9DLFFBQUksY0FBYztBQUVsQixRQUFJLGVBQWUsdUJBQXVCLFdBQVc7QUFFckQsUUFBSSxlQUFlO0FBRW5CLFFBQUksZ0JBQWdCLHVCQUF1QixZQUFZO0FBRXZELFFBQUksZUFBZTtBQUVuQixRQUFJLGdCQUFnQix1QkFBdUIsWUFBWTtBQUV2RCxRQUFJLFVBQVU7QUFFZCxRQUFJLFdBQVcsdUJBQXVCLE9BQU87QUFFN0MsYUFBUyx1QkFBdUIsS0FBSztBQUFFLGFBQU8sT0FBTyxJQUFJLGFBQWEsTUFBTSxFQUFFLFdBQVcsSUFBSTtBQUFBLElBQUc7QUFFaEcsYUFBUyxnQkFBZ0IsVUFBVSxhQUFhO0FBQUUsVUFBSSxFQUFFLG9CQUFvQixjQUFjO0FBQUUsY0FBTSxJQUFJLFVBQVUsbUNBQW1DO0FBQUEsTUFBRztBQUFBLElBQUU7QUFFeEosUUFBSSxZQUFZLFdBQVk7QUFPeEIsZUFBU0MsV0FBVSxLQUFLLFdBQVc7QUFDL0Isd0JBQWdCLE1BQU1BLFVBQVM7QUFFL0IsYUFBSyxNQUFNLE9BQU8sQ0FBQztBQUNuQixhQUFLLGNBQWMsSUFBSSxjQUFjLFdBQVcsS0FBSyxJQUFJLE1BQU07QUFDL0QsYUFBSyxjQUFjLElBQUksY0FBYyxXQUFXO0FBQ2hELGFBQUssU0FBUyxJQUFJLFNBQVMsV0FBVyxLQUFLLElBQUksTUFBTTtBQUNyRCxhQUFLLFlBQVk7QUFDakIsYUFBSyx1QkFBdUIsQ0FBQztBQUM3QixhQUFLLFNBQVMsQ0FBQztBQUNmLGFBQUssUUFBUTtBQUFBLE1BQ2pCO0FBVUEsTUFBQUEsV0FBVSxVQUFVLFNBQVMsU0FBUyxPQUFPLE9BQU87QUFDaEQsYUFBSyxTQUFTLEtBQUssVUFBVSxTQUFTLEtBQUs7QUFDM0MsWUFBSSxpQkFBaUIsS0FBSyw0QkFBNEI7QUFFdEQsZUFBTyxlQUFlLEtBQUs7QUFBQSxNQUMvQjtBQUVBLE1BQUFBLFdBQVUsVUFBVSw4QkFBOEIsU0FBUyw4QkFBOEI7QUFDckYsWUFBSSxRQUFRO0FBRVosWUFBSSxpQkFBaUI7QUFFckIsYUFBSyxPQUFPLFFBQVEsU0FBVSxPQUFPLE9BQU87QUFDeEMsZ0JBQU0sUUFBUTtBQUVkLGNBQUksTUFBTSxTQUFTLGFBQWEsV0FBVyxZQUFZO0FBQUEsVUFFdkQsV0FBVyxNQUFNLFNBQVMsYUFBYSxXQUFXLGNBQWM7QUFDNUQsNkJBQWlCLE1BQU0sa0JBQWtCLE9BQU8sY0FBYztBQUFBLFVBQ2xFLFdBQVcsTUFBTSxTQUFTLGFBQWEsV0FBVyxlQUFlO0FBQzdELDZCQUFpQixNQUFNLG1CQUFtQixPQUFPLGNBQWM7QUFBQSxVQUNuRSxXQUFXLE1BQU0sU0FBUyxhQUFhLFdBQVcsbUJBQW1CO0FBQ2pFLDZCQUFpQixNQUFNLDJCQUEyQixPQUFPLGNBQWM7QUFDdkUsa0JBQU0sdUJBQXVCO0FBQUEsVUFDakMsV0FBVyxNQUFNLFNBQVMsYUFBYSxXQUFXLGtCQUFrQjtBQUNoRSw2QkFBaUIsTUFBTSwwQkFBMEIsT0FBTyxjQUFjO0FBQ3RFLGtCQUFNLHVCQUF1QjtBQUFBLFVBQ2pDLFdBQVcsTUFBTSxTQUFTLGFBQWEsV0FBVyxVQUFVO0FBQ3hELDZCQUFpQixNQUFNLGlCQUFpQixPQUFPLGNBQWM7QUFDN0Qsa0JBQU0sdUJBQXVCO0FBQUEsVUFDakMsV0FBVyxNQUFNLFNBQVMsYUFBYSxXQUFXLFlBQVk7QUFDMUQsNkJBQWlCLE1BQU0seUJBQXlCLE9BQU8sY0FBYztBQUFBLFVBQ3pFLFdBQVcsTUFBTSxTQUFTLGFBQWEsV0FBVyxhQUFhO0FBQzNELDZCQUFpQixNQUFNLHlCQUF5QixPQUFPLGNBQWM7QUFBQSxVQUN6RSxXQUFXLE1BQU0sU0FBUyxhQUFhLFdBQVcsYUFBYTtBQUMzRCw2QkFBaUIsTUFBTSxrQkFBa0IsT0FBTyxjQUFjO0FBQUEsVUFDbEUsV0FBVyxNQUFNLFVBQVUsS0FBSztBQUM1Qiw2QkFBaUIsTUFBTSxZQUFZLE9BQU8sY0FBYztBQUFBLFVBQzVELFdBQVcsTUFBTSxVQUFVLEtBQUs7QUFDNUIsNkJBQWlCLE1BQU0scUJBQXFCLE9BQU8sY0FBYztBQUFBLFVBQ3JFLFdBQVcsTUFBTSxVQUFVLEtBQUs7QUFDNUIsNkJBQWlCLE1BQU0sb0JBQW9CLE9BQU8sY0FBYztBQUFBLFVBQ3BFLFdBQVcsTUFBTSxVQUFVLEtBQUs7QUFDNUIsNkJBQWlCLE1BQU0scUJBQXFCLE9BQU8sY0FBYztBQUFBLFVBQ3JFLE9BQU87QUFDSCw2QkFBaUIsTUFBTSxpQkFBaUIsT0FBTyxjQUFjO0FBQUEsVUFDakU7QUFBQSxRQUNKLENBQUM7QUFDRCxlQUFPO0FBQUEsTUFDWDtBQUVBLE1BQUFBLFdBQVUsVUFBVSxvQkFBb0IsU0FBUyxrQkFBa0IsT0FBTyxPQUFPO0FBQzdFLGVBQU8sS0FBSyxXQUFXLFFBQVEsTUFBTSxLQUFLO0FBQUEsTUFDOUM7QUFFQSxNQUFBQSxXQUFVLFVBQVUscUJBQXFCLFNBQVMsbUJBQW1CLE9BQU8sT0FBTztBQUMvRSxlQUFPLEtBQUssV0FBVyxLQUFLLFdBQVcsS0FBSyxJQUFJLEtBQUssY0FBYyxNQUFNLEtBQUssQ0FBQztBQUFBLE1BQ25GO0FBRUEsTUFBQUEsV0FBVSxVQUFVLGdCQUFnQixTQUFTLGNBQWMsU0FBUztBQUNoRSxlQUFPLFFBQVEsUUFBUSxPQUFPLE9BQU8sS0FBSyxZQUFZLFVBQVUsQ0FBQztBQUFBLE1BQ3JFO0FBRUEsTUFBQUEsV0FBVSxVQUFVLDZCQUE2QixTQUFTLDJCQUEyQixPQUFPLE9BQU87QUFDL0YsYUFBSyxZQUFZLGlCQUFpQjtBQUVsQyxnQkFBUSxLQUFLLFdBQVcsS0FBSztBQUU3QixhQUFLLFlBQVksaUJBQWlCO0FBRWxDLGlCQUFTLEtBQUssbUJBQW1CLE1BQU0sS0FBSztBQUM1QyxlQUFPLEtBQUssV0FBVyxLQUFLO0FBQUEsTUFDaEM7QUFFQSxNQUFBQSxXQUFVLFVBQVUsNEJBQTRCLFNBQVMsMEJBQTBCLE9BQU8sT0FBTztBQUM3RixlQUFPLEtBQUssV0FBVyxLQUFLLElBQUksS0FBSyxtQkFBbUIsTUFBTSxLQUFLLElBQUk7QUFBQSxNQUMzRTtBQUtBLE1BQUFBLFdBQVUsVUFBVSxxQkFBcUIsU0FBUyxtQkFBbUIsUUFBUTtBQUN6RSxlQUFPLE9BQU8sUUFBUSxRQUFRLEdBQUc7QUFBQSxNQUNyQztBQUtBLE1BQUFBLFdBQVUsVUFBVSwyQkFBMkIsU0FBUyx5QkFBeUIsT0FBTyxPQUFPO0FBRzNGLFlBQUksd0JBQXdCLENBQUMsYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVk7QUFDekksWUFBSSxDQUFDLHNCQUFzQixTQUFTLEtBQUssY0FBYyxFQUFFLElBQUksR0FBRztBQUM1RCxtQkFBUyxHQUFHLFVBQVUsWUFBWSxLQUFLO0FBQUEsUUFDM0M7QUFDQSxpQkFBUyxNQUFNO0FBRWYsYUFBSyxZQUFZLGdCQUFnQixLQUFLLFFBQVEsS0FBSyxLQUFLO0FBRXhELFlBQUksQ0FBQyxLQUFLLFlBQVksU0FBUyxHQUFHO0FBQzlCLGVBQUssWUFBWSxtQkFBbUI7QUFDcEMsa0JBQVEsS0FBSyxXQUFXLEtBQUs7QUFBQSxRQUNqQztBQUNBLGVBQU87QUFBQSxNQUNYO0FBS0EsTUFBQUEsV0FBVSxVQUFVLDJCQUEyQixTQUFTLHlCQUF5QixPQUFPLE9BQU87QUFDM0YsWUFBSSxLQUFLLFlBQVksU0FBUyxHQUFHO0FBQzdCLGVBQUssWUFBWSxJQUFJO0FBQ3JCLGlCQUFPLEtBQUsscUJBQXFCLE9BQU8sS0FBSztBQUFBLFFBQ2pELE9BQU87QUFDSCxlQUFLLFlBQVksbUJBQW1CO0FBQ3BDLGlCQUFPLEtBQUssaUJBQWlCLE9BQU8sS0FBSyxXQUFXLEtBQUssQ0FBQztBQUFBLFFBQzlEO0FBQUEsTUFDSjtBQUVBLE1BQUFBLFdBQVUsVUFBVSxvQkFBb0IsU0FBUyxrQkFBa0IsT0FBTyxPQUFPO0FBQzdFLGVBQU8sUUFBUSxLQUFLLE9BQU8sSUFBSSxLQUFLLElBQUk7QUFBQSxNQUM1QztBQUtBLE1BQUFBLFdBQVUsVUFBVSxjQUFjLFNBQVMsWUFBWSxPQUFPLE9BQU87QUFDakUsZ0JBQVEsS0FBSyx1QkFBdUIsS0FBSyxJQUFJLE1BQU0sUUFBUTtBQUUzRCxZQUFJLEtBQUssWUFBWSxTQUFTLEdBQUc7QUFDN0IsaUJBQU87QUFBQSxRQUNYLFdBQVcsV0FBVyxLQUFLLEtBQUsscUJBQXFCLEtBQUssR0FBRztBQUN6RCxpQkFBTztBQUFBLFFBQ1gsT0FBTztBQUNILGlCQUFPLEtBQUssV0FBVyxLQUFLO0FBQUEsUUFDaEM7QUFBQSxNQUNKO0FBRUEsTUFBQUEsV0FBVSxVQUFVLHVCQUF1QixTQUFTLHFCQUFxQixPQUFPLE9BQU87QUFDbkYsZUFBTyxLQUFLLHVCQUF1QixLQUFLLElBQUksTUFBTSxRQUFRO0FBQUEsTUFDOUQ7QUFFQSxNQUFBQSxXQUFVLFVBQVUsc0JBQXNCLFNBQVMsb0JBQW9CLE9BQU8sT0FBTztBQUNqRixlQUFPLEtBQUssdUJBQXVCLEtBQUssSUFBSSxNQUFNO0FBQUEsTUFDdEQ7QUFFQSxNQUFBQSxXQUFVLFVBQVUsbUJBQW1CLFNBQVMsaUJBQWlCLE9BQU8sT0FBTztBQUMzRSxlQUFPLFFBQVEsTUFBTSxRQUFRO0FBQUEsTUFDakM7QUFFQSxNQUFBQSxXQUFVLFVBQVUsdUJBQXVCLFNBQVMscUJBQXFCLE9BQU8sT0FBTztBQUNuRixlQUFPLEtBQUssdUJBQXVCLEtBQUssSUFBSSxNQUFNLFFBQVE7QUFBQSxNQUM5RDtBQUVBLE1BQUFBLFdBQVUsVUFBVSxhQUFhLFNBQVMsV0FBVyxPQUFPO0FBQ3hELGdCQUFRLEdBQUcsVUFBVSxZQUFZLEtBQUssSUFBSSxPQUFPLEtBQUssWUFBWSxVQUFVO0FBQUEsTUFDaEY7QUFFQSxNQUFBQSxXQUFVLFVBQVUseUJBQXlCLFNBQVMsdUJBQXVCLE9BQU87QUFDaEYsWUFBSSxLQUFLLDJCQUEyQixFQUFFLFNBQVMsYUFBYSxXQUFXLGNBQWM7QUFDakYsa0JBQVEsR0FBRyxVQUFVLFlBQVksS0FBSyxJQUFJO0FBQUEsUUFDOUMsT0FBTztBQUNILGtCQUFRLEdBQUcsVUFBVSxZQUFZLEtBQUs7QUFBQSxRQUMxQztBQUFBLE1BQ0o7QUFFQSxNQUFBQSxXQUFVLFVBQVUsNkJBQTZCLFNBQVMsNkJBQTZCO0FBQ25GLFlBQUksSUFBSTtBQUNSLGVBQU8sS0FBSyxjQUFjLENBQUMsRUFBRSxTQUFTLGFBQWEsV0FBVyxZQUFZO0FBQ3RFO0FBQUEsUUFDSjtBQUNBLGVBQU8sS0FBSyxjQUFjLENBQUM7QUFBQSxNQUMvQjtBQUVBLE1BQUFBLFdBQVUsVUFBVSxnQkFBZ0IsU0FBUyxnQkFBZ0I7QUFDekQsWUFBSSxTQUFTLFVBQVUsU0FBUyxLQUFLLFVBQVUsT0FBTyxTQUFZLFVBQVUsS0FBSztBQUVqRixlQUFPLEtBQUssT0FBTyxLQUFLLFFBQVEsV0FBVyxDQUFDO0FBQUEsTUFDaEQ7QUFFQSxhQUFPQTtBQUFBLElBQ1gsRUFBRTtBQUVGLFlBQVEsYUFBYTtBQUNyQixJQUFBRCxRQUFPLFVBQVUsUUFBUTtBQUFBO0FBQUE7OztBQ2hQekI7QUFBQSwyRkFBQUUsU0FBQTtBQUNBLFFBQUksY0FBYyxPQUFPO0FBU3pCLGFBQVMsWUFBWSxPQUFPO0FBQzFCLFVBQUksT0FBTyxTQUFTLE1BQU0sYUFDdEIsUUFBUyxPQUFPLFFBQVEsY0FBYyxLQUFLLGFBQWM7QUFFN0QsYUFBTyxVQUFVO0FBQUEsSUFDbkI7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNqQmpCO0FBQUEsdUZBQUFDLFNBQUE7QUFRQSxhQUFTLFFBQVEsTUFBTSxXQUFXO0FBQ2hDLGFBQU8sU0FBUyxLQUFLO0FBQ25CLGVBQU8sS0FBSyxVQUFVLEdBQUcsQ0FBQztBQUFBLE1BQzVCO0FBQUEsSUFDRjtBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ2RqQjtBQUFBLDBGQUFBQyxTQUFBO0FBQUEsUUFBSSxVQUFVO0FBR2QsUUFBSSxhQUFhLFFBQVEsT0FBTyxNQUFNLE1BQU07QUFFNUMsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDTGpCO0FBQUEsd0ZBQUFDLFNBQUE7QUFBQSxRQUFJLGNBQWM7QUFBbEIsUUFDSSxhQUFhO0FBR2pCLFFBQUksY0FBYyxPQUFPO0FBR3pCLFFBQUksaUJBQWlCLFlBQVk7QUFTakMsYUFBUyxTQUFTLFFBQVE7QUFDeEIsVUFBSSxDQUFDLFlBQVksTUFBTSxHQUFHO0FBQ3hCLGVBQU8sV0FBVyxNQUFNO0FBQUEsTUFDMUI7QUFDQSxVQUFJLFNBQVMsQ0FBQztBQUNkLGVBQVMsT0FBTyxPQUFPLE1BQU0sR0FBRztBQUM5QixZQUFJLGVBQWUsS0FBSyxRQUFRLEdBQUcsS0FBSyxPQUFPLGVBQWU7QUFDNUQsaUJBQU8sS0FBSyxHQUFHO0FBQUEsUUFDakI7QUFBQSxNQUNGO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUM3QmpCO0FBQUEsMEZBQUFDLFNBQUE7QUFBQSxRQUFJLE9BQU87QUFHWCxRQUFJLGFBQWEsS0FBSztBQUV0QixJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNMakI7QUFBQSx3RkFBQUMsU0FBQTtBQUFBLFFBQUksYUFBYTtBQUdqQixRQUFJLGFBQWMsV0FBVztBQUMzQixVQUFJLE1BQU0sU0FBUyxLQUFLLGNBQWMsV0FBVyxRQUFRLFdBQVcsS0FBSyxZQUFZLEVBQUU7QUFDdkYsYUFBTyxNQUFPLG1CQUFtQixNQUFPO0FBQUEsSUFDMUMsRUFBRTtBQVNGLGFBQVMsU0FBUyxNQUFNO0FBQ3RCLGFBQU8sQ0FBQyxDQUFDLGNBQWUsY0FBYztBQUFBLElBQ3hDO0FBRUEsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDbkJqQjtBQUFBLHdGQUFBQyxTQUFBO0FBQ0EsUUFBSSxZQUFZLFNBQVM7QUFHekIsUUFBSSxlQUFlLFVBQVU7QUFTN0IsYUFBUyxTQUFTLE1BQU07QUFDdEIsVUFBSSxRQUFRLE1BQU07QUFDaEIsWUFBSTtBQUNGLGlCQUFPLGFBQWEsS0FBSyxJQUFJO0FBQUEsUUFDL0IsU0FBUyxHQUFQO0FBQUEsUUFBVztBQUNiLFlBQUk7QUFDRixpQkFBUSxPQUFPO0FBQUEsUUFDakIsU0FBUyxHQUFQO0FBQUEsUUFBVztBQUFBLE1BQ2Y7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ3pCakI7QUFBQSw0RkFBQUMsU0FBQTtBQUFBLFFBQUksYUFBYTtBQUFqQixRQUNJLFdBQVc7QUFEZixRQUVJLFdBQVc7QUFGZixRQUdJLFdBQVc7QUFNZixRQUFJLGVBQWU7QUFHbkIsUUFBSSxlQUFlO0FBR25CLFFBQUksWUFBWSxTQUFTO0FBQXpCLFFBQ0ksY0FBYyxPQUFPO0FBR3pCLFFBQUksZUFBZSxVQUFVO0FBRzdCLFFBQUksaUJBQWlCLFlBQVk7QUFHakMsUUFBSSxhQUFhO0FBQUEsTUFBTyxNQUN0QixhQUFhLEtBQUssY0FBYyxFQUFFLFFBQVEsY0FBYyxNQUFNLEVBQzdELFFBQVEsMERBQTBELE9BQU8sSUFBSTtBQUFBLElBQ2hGO0FBVUEsYUFBUyxhQUFhLE9BQU87QUFDM0IsVUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLFNBQVMsS0FBSyxHQUFHO0FBQ3ZDLGVBQU87QUFBQSxNQUNUO0FBQ0EsVUFBSSxVQUFVLFdBQVcsS0FBSyxJQUFJLGFBQWE7QUFDL0MsYUFBTyxRQUFRLEtBQUssU0FBUyxLQUFLLENBQUM7QUFBQSxJQUNyQztBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQzlDakI7QUFBQSx3RkFBQUMsU0FBQTtBQVFBLGFBQVMsU0FBUyxRQUFRLEtBQUs7QUFDN0IsYUFBTyxVQUFVLE9BQU8sU0FBWSxPQUFPO0FBQUEsSUFDN0M7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNaakI7QUFBQSx5RkFBQUMsU0FBQTtBQUFBLFFBQUksZUFBZTtBQUFuQixRQUNJLFdBQVc7QUFVZixhQUFTLFVBQVUsUUFBUSxLQUFLO0FBQzlCLFVBQUksUUFBUSxTQUFTLFFBQVEsR0FBRztBQUNoQyxhQUFPLGFBQWEsS0FBSyxJQUFJLFFBQVE7QUFBQSxJQUN2QztBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ2hCakI7QUFBQSx3RkFBQUMsU0FBQTtBQUFBLFFBQUksWUFBWTtBQUFoQixRQUNJLE9BQU87QUFHWCxRQUFJLFdBQVcsVUFBVSxNQUFNLFVBQVU7QUFFekMsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDTmpCO0FBQUEsbUZBQUFDLFNBQUE7QUFBQSxRQUFJLFlBQVk7QUFBaEIsUUFDSSxPQUFPO0FBR1gsUUFBSSxNQUFNLFVBQVUsTUFBTSxLQUFLO0FBRS9CLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ05qQjtBQUFBLHVGQUFBQyxTQUFBO0FBQUEsUUFBSSxZQUFZO0FBQWhCLFFBQ0ksT0FBTztBQUdYLFFBQUlDLFdBQVUsVUFBVSxNQUFNLFNBQVM7QUFFdkMsSUFBQUQsUUFBTyxVQUFVQztBQUFBO0FBQUE7OztBQ05qQjtBQUFBLG1GQUFBQyxTQUFBO0FBQUEsUUFBSSxZQUFZO0FBQWhCLFFBQ0ksT0FBTztBQUdYLFFBQUksTUFBTSxVQUFVLE1BQU0sS0FBSztBQUUvQixJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNOakI7QUFBQSx1RkFBQUMsU0FBQTtBQUFBLFFBQUksWUFBWTtBQUFoQixRQUNJLE9BQU87QUFHWCxRQUFJLFVBQVUsVUFBVSxNQUFNLFNBQVM7QUFFdkMsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDTmpCO0FBQUEsc0ZBQUFDLFNBQUE7QUFBQSxRQUFJLFdBQVc7QUFBZixRQUNJLE1BQU07QUFEVixRQUVJQyxXQUFVO0FBRmQsUUFHSSxNQUFNO0FBSFYsUUFJSSxVQUFVO0FBSmQsUUFLSSxhQUFhO0FBTGpCLFFBTUksV0FBVztBQUdmLFFBQUksU0FBUztBQUFiLFFBQ0ksWUFBWTtBQURoQixRQUVJLGFBQWE7QUFGakIsUUFHSSxTQUFTO0FBSGIsUUFJSSxhQUFhO0FBRWpCLFFBQUksY0FBYztBQUdsQixRQUFJLHFCQUFxQixTQUFTLFFBQVE7QUFBMUMsUUFDSSxnQkFBZ0IsU0FBUyxHQUFHO0FBRGhDLFFBRUksb0JBQW9CLFNBQVNBLFFBQU87QUFGeEMsUUFHSSxnQkFBZ0IsU0FBUyxHQUFHO0FBSGhDLFFBSUksb0JBQW9CLFNBQVMsT0FBTztBQVN4QyxRQUFJLFNBQVM7QUFHYixRQUFLLFlBQVksT0FBTyxJQUFJLFNBQVMsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssZUFDeEQsT0FBTyxPQUFPLElBQUksS0FBRyxLQUFLLFVBQzFCQSxZQUFXLE9BQU9BLFNBQVEsUUFBUSxDQUFDLEtBQUssY0FDeEMsT0FBTyxPQUFPLElBQUksS0FBRyxLQUFLLFVBQzFCLFdBQVcsT0FBTyxJQUFJLFNBQU8sS0FBSyxZQUFhO0FBQ2xELGVBQVMsU0FBUyxPQUFPO0FBQ3ZCLFlBQUksU0FBUyxXQUFXLEtBQUssR0FDekIsT0FBTyxVQUFVLFlBQVksTUFBTSxjQUFjLFFBQ2pELGFBQWEsT0FBTyxTQUFTLElBQUksSUFBSTtBQUV6QyxZQUFJLFlBQVk7QUFDZCxrQkFBUSxZQUFZO0FBQUEsWUFDbEIsS0FBSztBQUFvQixxQkFBTztBQUFBLFlBQ2hDLEtBQUs7QUFBZSxxQkFBTztBQUFBLFlBQzNCLEtBQUs7QUFBbUIscUJBQU87QUFBQSxZQUMvQixLQUFLO0FBQWUscUJBQU87QUFBQSxZQUMzQixLQUFLO0FBQW1CLHFCQUFPO0FBQUEsVUFDakM7QUFBQSxRQUNGO0FBQ0EsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBRUEsSUFBQUQsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDekRqQjtBQUFBLCtGQUFBRSxTQUFBO0FBQUEsUUFBSSxhQUFhO0FBQWpCLFFBQ0ksZUFBZTtBQUduQixRQUFJLFVBQVU7QUFTZCxhQUFTLGdCQUFnQixPQUFPO0FBQzlCLGFBQU8sYUFBYSxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUs7QUFBQSxJQUNyRDtBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ2pCakI7QUFBQSwwRkFBQUMsU0FBQTtBQUFBLFFBQUksa0JBQWtCO0FBQXRCLFFBQ0ksZUFBZTtBQUduQixRQUFJLGNBQWMsT0FBTztBQUd6QixRQUFJLGlCQUFpQixZQUFZO0FBR2pDLFFBQUksdUJBQXVCLFlBQVk7QUFvQnZDLFFBQUksY0FBYyxnQkFBZ0IsV0FBVztBQUFFLGFBQU87QUFBQSxJQUFXLEVBQUUsQ0FBQyxJQUFJLGtCQUFrQixTQUFTLE9BQU87QUFDeEcsYUFBTyxhQUFhLEtBQUssS0FBSyxlQUFlLEtBQUssT0FBTyxRQUFRLEtBQy9ELENBQUMscUJBQXFCLEtBQUssT0FBTyxRQUFRO0FBQUEsSUFDOUM7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNuQ2pCO0FBQUEsd0ZBQUFDLFNBQUE7QUFhQSxhQUFTLFlBQVk7QUFDbkIsYUFBTztBQUFBLElBQ1Q7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNqQmpCO0FBQUEsdUZBQUFDLFNBQUE7QUFBQSxRQUFJLE9BQU87QUFBWCxRQUNJLFlBQVk7QUFHaEIsUUFBSSxjQUFjLE9BQU8sV0FBVyxZQUFZLFdBQVcsQ0FBQyxRQUFRLFlBQVk7QUFHaEYsUUFBSSxhQUFhLGVBQWUsT0FBT0EsV0FBVSxZQUFZQSxXQUFVLENBQUNBLFFBQU8sWUFBWUE7QUFHM0YsUUFBSSxnQkFBZ0IsY0FBYyxXQUFXLFlBQVk7QUFHekQsUUFBSUMsVUFBUyxnQkFBZ0IsS0FBSyxTQUFTO0FBRzNDLFFBQUksaUJBQWlCQSxVQUFTQSxRQUFPLFdBQVc7QUFtQmhELFFBQUksV0FBVyxrQkFBa0I7QUFFakMsSUFBQUQsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDckNqQjtBQUFBLGdHQUFBRSxTQUFBO0FBQUEsUUFBSSxhQUFhO0FBQWpCLFFBQ0ksV0FBVztBQURmLFFBRUksZUFBZTtBQUduQixRQUFJLFVBQVU7QUFBZCxRQUNJLFdBQVc7QUFEZixRQUVJLFVBQVU7QUFGZCxRQUdJLFVBQVU7QUFIZCxRQUlJLFdBQVc7QUFKZixRQUtJLFVBQVU7QUFMZCxRQU1JLFNBQVM7QUFOYixRQU9JLFlBQVk7QUFQaEIsUUFRSSxZQUFZO0FBUmhCLFFBU0ksWUFBWTtBQVRoQixRQVVJLFNBQVM7QUFWYixRQVdJLFlBQVk7QUFYaEIsUUFZSSxhQUFhO0FBRWpCLFFBQUksaUJBQWlCO0FBQXJCLFFBQ0ksY0FBYztBQURsQixRQUVJLGFBQWE7QUFGakIsUUFHSSxhQUFhO0FBSGpCLFFBSUksVUFBVTtBQUpkLFFBS0ksV0FBVztBQUxmLFFBTUksV0FBVztBQU5mLFFBT0ksV0FBVztBQVBmLFFBUUksa0JBQWtCO0FBUnRCLFFBU0ksWUFBWTtBQVRoQixRQVVJLFlBQVk7QUFHaEIsUUFBSSxpQkFBaUIsQ0FBQztBQUN0QixtQkFBZSxjQUFjLGVBQWUsY0FDNUMsZUFBZSxXQUFXLGVBQWUsWUFDekMsZUFBZSxZQUFZLGVBQWUsWUFDMUMsZUFBZSxtQkFBbUIsZUFBZSxhQUNqRCxlQUFlLGFBQWE7QUFDNUIsbUJBQWUsV0FBVyxlQUFlLFlBQ3pDLGVBQWUsa0JBQWtCLGVBQWUsV0FDaEQsZUFBZSxlQUFlLGVBQWUsV0FDN0MsZUFBZSxZQUFZLGVBQWUsV0FDMUMsZUFBZSxVQUFVLGVBQWUsYUFDeEMsZUFBZSxhQUFhLGVBQWUsYUFDM0MsZUFBZSxVQUFVLGVBQWUsYUFDeEMsZUFBZSxjQUFjO0FBUzdCLGFBQVMsaUJBQWlCLE9BQU87QUFDL0IsYUFBTyxhQUFhLEtBQUssS0FDdkIsU0FBUyxNQUFNLE1BQU0sS0FBSyxDQUFDLENBQUMsZUFBZSxXQUFXLEtBQUs7QUFBQSxJQUMvRDtBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQzNEakI7QUFBQSx5RkFBQUMsU0FBQTtBQU9BLGFBQVMsVUFBVSxNQUFNO0FBQ3ZCLGFBQU8sU0FBUyxPQUFPO0FBQ3JCLGVBQU8sS0FBSyxLQUFLO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBRUEsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDYmpCO0FBQUEsd0ZBQUFDLFNBQUE7QUFBQSxRQUFJLGFBQWE7QUFHakIsUUFBSSxjQUFjLE9BQU8sV0FBVyxZQUFZLFdBQVcsQ0FBQyxRQUFRLFlBQVk7QUFHaEYsUUFBSSxhQUFhLGVBQWUsT0FBT0EsV0FBVSxZQUFZQSxXQUFVLENBQUNBLFFBQU8sWUFBWUE7QUFHM0YsUUFBSSxnQkFBZ0IsY0FBYyxXQUFXLFlBQVk7QUFHekQsUUFBSSxjQUFjLGlCQUFpQixXQUFXO0FBRzlDLFFBQUksV0FBWSxXQUFXO0FBQ3pCLFVBQUk7QUFFRixZQUFJLFFBQVEsY0FBYyxXQUFXLFdBQVcsV0FBVyxRQUFRLE1BQU0sRUFBRTtBQUUzRSxZQUFJLE9BQU87QUFDVCxpQkFBTztBQUFBLFFBQ1Q7QUFHQSxlQUFPLGVBQWUsWUFBWSxXQUFXLFlBQVksUUFBUSxNQUFNO0FBQUEsTUFDekUsU0FBUyxHQUFQO0FBQUEsTUFBVztBQUFBLElBQ2YsRUFBRTtBQUVGLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQzdCakI7QUFBQSwyRkFBQUMsU0FBQTtBQUFBLFFBQUksbUJBQW1CO0FBQXZCLFFBQ0ksWUFBWTtBQURoQixRQUVJLFdBQVc7QUFHZixRQUFJLG1CQUFtQixZQUFZLFNBQVM7QUFtQjVDLFFBQUksZUFBZSxtQkFBbUIsVUFBVSxnQkFBZ0IsSUFBSTtBQUVwRSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUMxQmpCO0FBQUEsc0ZBQUFDLFNBQUE7QUFBQSxRQUFJLFdBQVc7QUFBZixRQUNJLFNBQVM7QUFEYixRQUVJLGNBQWM7QUFGbEIsUUFHSSxVQUFVO0FBSGQsUUFJSSxjQUFjO0FBSmxCLFFBS0ksV0FBVztBQUxmLFFBTUksY0FBYztBQU5sQixRQU9JLGVBQWU7QUFHbkIsUUFBSSxTQUFTO0FBQWIsUUFDSSxTQUFTO0FBR2IsUUFBSSxjQUFjLE9BQU87QUFHekIsUUFBSSxpQkFBaUIsWUFBWTtBQW1DakMsYUFBUyxRQUFRLE9BQU87QUFDdEIsVUFBSSxTQUFTLE1BQU07QUFDakIsZUFBTztBQUFBLE1BQ1Q7QUFDQSxVQUFJLFlBQVksS0FBSyxNQUNoQixRQUFRLEtBQUssS0FBSyxPQUFPLFNBQVMsWUFBWSxPQUFPLE1BQU0sVUFBVSxjQUNwRSxTQUFTLEtBQUssS0FBSyxhQUFhLEtBQUssS0FBSyxZQUFZLEtBQUssSUFBSTtBQUNuRSxlQUFPLENBQUMsTUFBTTtBQUFBLE1BQ2hCO0FBQ0EsVUFBSSxNQUFNLE9BQU8sS0FBSztBQUN0QixVQUFJLE9BQU8sVUFBVSxPQUFPLFFBQVE7QUFDbEMsZUFBTyxDQUFDLE1BQU07QUFBQSxNQUNoQjtBQUNBLFVBQUksWUFBWSxLQUFLLEdBQUc7QUFDdEIsZUFBTyxDQUFDLFNBQVMsS0FBSyxFQUFFO0FBQUEsTUFDMUI7QUFDQSxlQUFTLE9BQU8sT0FBTztBQUNyQixZQUFJLGVBQWUsS0FBSyxPQUFPLEdBQUcsR0FBRztBQUNuQyxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUM1RWpCO0FBQUEsMkZBQUFDLFNBQUE7QUFBQSxRQUFJLFdBQVc7QUFNZixRQUFJLGVBQWU7QUFBbkIsUUFDSSxrQkFBa0IsT0FBTyxhQUFhLE1BQU07QUFpQmhELGFBQVMsYUFBYSxRQUFRO0FBQzVCLGVBQVMsU0FBUyxNQUFNO0FBQ3hCLGFBQVEsVUFBVSxnQkFBZ0IsS0FBSyxNQUFNLElBQ3pDLE9BQU8sUUFBUSxjQUFjLE1BQU0sSUFDbkM7QUFBQSxJQUNOO0FBRUEsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDL0JqQjtBQUFBLDZFQUFBQyxTQUFBO0FBQUE7QUFFQSxZQUFRLGFBQWE7QUFFckIsUUFBSSxXQUFXO0FBRWYsUUFBSSxZQUFZLHVCQUF1QixRQUFRO0FBRS9DLFFBQUksZ0JBQWdCO0FBRXBCLFFBQUksaUJBQWlCLHVCQUF1QixhQUFhO0FBRXpELFFBQUksY0FBYztBQUVsQixRQUFJLGVBQWUsdUJBQXVCLFdBQVc7QUFFckQsYUFBUyx1QkFBdUIsS0FBSztBQUFFLGFBQU8sT0FBTyxJQUFJLGFBQWEsTUFBTSxFQUFFLFdBQVcsSUFBSTtBQUFBLElBQUc7QUFFaEcsYUFBUyxnQkFBZ0IsVUFBVSxhQUFhO0FBQUUsVUFBSSxFQUFFLG9CQUFvQixjQUFjO0FBQUUsY0FBTSxJQUFJLFVBQVUsbUNBQW1DO0FBQUEsTUFBRztBQUFBLElBQUU7QUFFeEosUUFBSSxZQUFZLFdBQVk7QUFjeEIsZUFBU0MsV0FBVSxLQUFLO0FBQ3BCLHdCQUFnQixNQUFNQSxVQUFTO0FBRS9CLGFBQUssbUJBQW1CO0FBQ3hCLGFBQUssZUFBZTtBQUNwQixhQUFLLGlCQUFpQjtBQUV0QixhQUFLLHNCQUFzQjtBQUMzQixhQUFLLHFCQUFxQixLQUFLLHVCQUF1QixJQUFJLGdCQUFnQjtBQUUxRSxhQUFLLDBCQUEwQixLQUFLLHdCQUF3QixJQUFJLHFCQUFxQjtBQUNyRixhQUFLLHlCQUF5QixLQUFLLHdCQUF3QixJQUFJLG9CQUFvQjtBQUNuRixhQUFLLHVCQUF1QixLQUFLLHdCQUF3QixJQUFJLGFBQWE7QUFFMUUsYUFBSyxhQUFhLEtBQUssZ0JBQWdCLElBQUksZ0JBQWdCO0FBQzNELGFBQUssZUFBZSxLQUFLLGtCQUFrQixJQUFJLFdBQVc7QUFFMUQsYUFBSyxtQkFBbUIsS0FBSyxpQkFBaUIsSUFBSSxVQUFVO0FBQzVELGFBQUssb0JBQW9CLEtBQUssaUJBQWlCLElBQUksV0FBVztBQUU5RCxhQUFLLDRCQUE0QixLQUFLLHVCQUF1QixJQUFJLHlCQUF5QixRQUFRO0FBQ2xHLGFBQUssZ0NBQWdDLEtBQUssdUJBQXVCLElBQUksdUJBQXVCLGlCQUFpQjtBQUM3RyxhQUFLLGlDQUFpQyxLQUFLLHVCQUF1QixJQUFJLHVCQUF1QixLQUFLLG9CQUFvQixJQUFJLFdBQVcsQ0FBQztBQUFBLE1BQzFJO0FBRUEsTUFBQUEsV0FBVSxVQUFVLHlCQUF5QixTQUFTLHVCQUF1QixrQkFBa0I7QUFDM0YsZUFBTyxJQUFJLE9BQU8sVUFBVSxpQkFBaUIsSUFBSSxTQUFVLEdBQUc7QUFDMUQsa0JBQVEsR0FBRyxlQUFlLFlBQVksQ0FBQztBQUFBLFFBQzNDLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxlQUFlO0FBQUEsTUFDbEM7QUFFQSxNQUFBQSxXQUFVLFVBQVUsMEJBQTBCLFNBQVMsd0JBQXdCLGVBQWU7QUFDMUYsWUFBSSx1QkFBdUIsY0FBYyxLQUFLLEdBQUcsRUFBRSxRQUFRLE1BQU0sTUFBTTtBQUN2RSxlQUFPLElBQUksT0FBTyxPQUFPLHVCQUF1QixRQUFRLEdBQUc7QUFBQSxNQUMvRDtBQUVBLE1BQUFBLFdBQVUsVUFBVSxrQkFBa0IsU0FBUyxrQkFBa0I7QUFDN0QsWUFBSSxlQUFlLFVBQVUsU0FBUyxLQUFLLFVBQVUsT0FBTyxTQUFZLFVBQVUsS0FBSyxDQUFDO0FBRXhGLGVBQU8sSUFBSSxPQUFPLFdBQVcsYUFBYSxLQUFLLEVBQUUsSUFBSSxLQUFLO0FBQUEsTUFDOUQ7QUFFQSxNQUFBQSxXQUFVLFVBQVUsb0JBQW9CLFNBQVMsa0JBQWtCLGFBQWE7QUFDNUUsZUFBTyxJQUFJLE9BQU8sT0FBTyxLQUFLLG9CQUFvQixXQUFXLElBQUksR0FBRztBQUFBLE1BQ3hFO0FBVUEsTUFBQUEsV0FBVSxVQUFVLHNCQUFzQixTQUFTLG9CQUFvQixhQUFhO0FBQ2hGLFlBQUksV0FBVztBQUFBLFVBQ1gsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFVBQ04sTUFBUTtBQUFBLFVBQ1IsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFFBQ1g7QUFFQSxlQUFPLFlBQVksSUFBSSxTQUFVLEdBQUc7QUFDaEMsaUJBQU8sU0FBUztBQUFBLFFBQ3BCLENBQUMsRUFBRSxLQUFLLEdBQUc7QUFBQSxNQUNmO0FBRUEsTUFBQUEsV0FBVSxVQUFVLG1CQUFtQixTQUFTLGlCQUFpQixRQUFRO0FBQ3JFLFlBQUksUUFBUTtBQUVaLGVBQU8sSUFBSSxPQUFPLE9BQU8sT0FBTyxJQUFJLFNBQVUsR0FBRztBQUM3QyxpQkFBTyxNQUFNLFlBQVksQ0FBQztBQUFBLFFBQzlCLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxLQUFLLEdBQUc7QUFBQSxNQUMzQjtBQUVBLE1BQUFBLFdBQVUsVUFBVSxjQUFjLFNBQVMsWUFBWSxPQUFPO0FBQzFELFlBQUksTUFBTSxXQUFXLEdBQUc7QUFFcEIsa0JBQVEsR0FBRyxlQUFlLFlBQVksS0FBSztBQUFBLFFBQy9DLE9BQU87QUFFSCxpQkFBTyxRQUFRLFFBQVE7QUFBQSxRQUMzQjtBQUFBLE1BQ0o7QUFFQSxNQUFBQSxXQUFVLFVBQVUseUJBQXlCLFNBQVMsdUJBQXVCLE9BQU8sU0FBUztBQUN6RixhQUFLLEdBQUcsVUFBVSxZQUFZLEtBQUssR0FBRztBQUNsQyxpQkFBTztBQUFBLFFBQ1g7QUFDQSxZQUFJLGFBQWEsTUFBTSxJQUFJLGVBQWUsVUFBVSxFQUFFLEtBQUssR0FBRztBQUU5RCxlQUFPLElBQUksT0FBTyxVQUFVLGFBQWEsU0FBUyxVQUFVLElBQUk7QUFBQSxNQUNwRTtBQWFBLE1BQUFBLFdBQVUsVUFBVSxXQUFXLFNBQVMsU0FBUyxPQUFPO0FBQ3BELFlBQUksU0FBUyxDQUFDO0FBQ2QsWUFBSSxRQUFRO0FBR1osZUFBTyxNQUFNLFFBQVE7QUFFakIsa0JBQVEsS0FBSyxhQUFhLE9BQU8sS0FBSztBQUV0QyxrQkFBUSxNQUFNLFVBQVUsTUFBTSxNQUFNLE1BQU07QUFFMUMsaUJBQU8sS0FBSyxLQUFLO0FBQUEsUUFDckI7QUFDQSxlQUFPO0FBQUEsTUFDWDtBQUVBLE1BQUFBLFdBQVUsVUFBVSxlQUFlLFNBQVMsYUFBYSxPQUFPLGVBQWU7QUFDM0UsZUFBTyxLQUFLLG1CQUFtQixLQUFLLEtBQUssS0FBSyxnQkFBZ0IsS0FBSyxLQUFLLEtBQUssZUFBZSxLQUFLLEtBQUssS0FBSyxrQkFBa0IsS0FBSyxLQUFLLEtBQUssbUJBQW1CLEtBQUssS0FBSyxLQUFLLG9CQUFvQixLQUFLLEtBQUssS0FBSyxlQUFlLEtBQUssS0FBSyxLQUFLLHFCQUFxQixPQUFPLGFBQWEsS0FBSyxLQUFLLGFBQWEsS0FBSyxLQUFLLEtBQUssaUJBQWlCLEtBQUs7QUFBQSxNQUN4VjtBQUVBLE1BQUFBLFdBQVUsVUFBVSxxQkFBcUIsU0FBUyxtQkFBbUIsT0FBTztBQUN4RSxlQUFPLEtBQUsscUJBQXFCO0FBQUEsVUFDN0I7QUFBQSxVQUNBLE1BQU0sYUFBYSxXQUFXO0FBQUEsVUFDOUIsT0FBTyxLQUFLO0FBQUEsUUFDaEIsQ0FBQztBQUFBLE1BQ0w7QUFFQSxNQUFBQSxXQUFVLFVBQVUsa0JBQWtCLFNBQVMsZ0JBQWdCLE9BQU87QUFDbEUsZUFBTyxLQUFLLG9CQUFvQixLQUFLLEtBQUssS0FBSyxxQkFBcUIsS0FBSztBQUFBLE1BQzdFO0FBRUEsTUFBQUEsV0FBVSxVQUFVLHNCQUFzQixTQUFTLG9CQUFvQixPQUFPO0FBQzFFLGVBQU8sS0FBSyxxQkFBcUI7QUFBQSxVQUM3QjtBQUFBLFVBQ0EsTUFBTSxhQUFhLFdBQVc7QUFBQSxVQUM5QixPQUFPLEtBQUs7QUFBQSxRQUNoQixDQUFDO0FBQUEsTUFDTDtBQUVBLE1BQUFBLFdBQVUsVUFBVSx1QkFBdUIsU0FBUyxxQkFBcUIsT0FBTztBQUM1RSxlQUFPLEtBQUsscUJBQXFCO0FBQUEsVUFDN0I7QUFBQSxVQUNBLE1BQU0sYUFBYSxXQUFXO0FBQUEsVUFDOUIsT0FBTyxLQUFLO0FBQUEsUUFDaEIsQ0FBQztBQUFBLE1BQ0w7QUFFQSxNQUFBQSxXQUFVLFVBQVUsaUJBQWlCLFNBQVMsZUFBZSxPQUFPO0FBQ2hFLGVBQU8sS0FBSyxxQkFBcUI7QUFBQSxVQUM3QjtBQUFBLFVBQ0EsTUFBTSxhQUFhLFdBQVc7QUFBQSxVQUM5QixPQUFPLEtBQUs7QUFBQSxRQUNoQixDQUFDO0FBQUEsTUFDTDtBQUVBLE1BQUFBLFdBQVUsVUFBVSxvQkFBb0IsU0FBUyxrQkFBa0IsT0FBTztBQUN0RSxlQUFPLEtBQUsscUJBQXFCO0FBQUEsVUFDN0I7QUFBQSxVQUNBLE1BQU0sYUFBYSxXQUFXO0FBQUEsVUFDOUIsT0FBTyxLQUFLO0FBQUEsUUFDaEIsQ0FBQztBQUFBLE1BQ0w7QUFFQSxNQUFBQSxXQUFVLFVBQVUscUJBQXFCLFNBQVMsbUJBQW1CLE9BQU87QUFDeEUsZUFBTyxLQUFLLHFCQUFxQjtBQUFBLFVBQzdCO0FBQUEsVUFDQSxNQUFNLGFBQWEsV0FBVztBQUFBLFVBQzlCLE9BQU8sS0FBSztBQUFBLFFBQ2hCLENBQUM7QUFBQSxNQUNMO0FBRUEsTUFBQUEsV0FBVSxVQUFVLHNCQUFzQixTQUFTLG9CQUFvQixPQUFPO0FBQzFFLGVBQU8sS0FBSyw4QkFBOEIsS0FBSyxLQUFLLEtBQUssK0JBQStCLEtBQUssS0FBSyxLQUFLLDJCQUEyQixLQUFLO0FBQUEsTUFDM0k7QUFFQSxNQUFBQSxXQUFVLFVBQVUsZ0NBQWdDLFNBQVMsOEJBQThCLE9BQU87QUFDOUYsZUFBTyxLQUFLLDJCQUEyQjtBQUFBLFVBQ25DO0FBQUEsVUFDQSxPQUFPLEtBQUs7QUFBQSxVQUNaLFVBQVUsU0FBUyxTQUFTLEdBQUc7QUFDM0IsbUJBQU8sRUFBRSxNQUFNLENBQUM7QUFBQSxVQUNwQjtBQUFBLFFBQ0osQ0FBQztBQUFBLE1BQ0w7QUFFQSxNQUFBQSxXQUFVLFVBQVUsaUNBQWlDLFNBQVMsK0JBQStCLE9BQU87QUFDaEcsWUFBSSxTQUFTO0FBRWIsZUFBTyxLQUFLLDJCQUEyQjtBQUFBLFVBQ25DO0FBQUEsVUFDQSxPQUFPLEtBQUs7QUFBQSxVQUNaLFVBQVUsU0FBUyxTQUFTLEdBQUc7QUFDM0IsbUJBQU8sT0FBTyx5QkFBeUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxHQUFHLEVBQUUsR0FBRyxXQUFXLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQztBQUFBLFVBQzFGO0FBQUEsUUFDSixDQUFDO0FBQUEsTUFDTDtBQUVBLE1BQUFBLFdBQVUsVUFBVSw2QkFBNkIsU0FBUywyQkFBMkIsT0FBTztBQUN4RixlQUFPLEtBQUssMkJBQTJCO0FBQUEsVUFDbkM7QUFBQSxVQUNBLE9BQU8sS0FBSztBQUFBLFVBQ1osVUFBVSxTQUFTLFNBQVMsR0FBRztBQUMzQixtQkFBTyxFQUFFLE1BQU0sQ0FBQztBQUFBLFVBQ3BCO0FBQUEsUUFDSixDQUFDO0FBQUEsTUFDTDtBQUVBLE1BQUFBLFdBQVUsVUFBVSw2QkFBNkIsU0FBUywyQkFBMkIsTUFBTTtBQUN2RixZQUFJLFFBQVEsS0FBSyxPQUNiLFFBQVEsS0FBSyxPQUNiLFdBQVcsS0FBSztBQUVwQixZQUFJLFFBQVEsS0FBSyxxQkFBcUIsRUFBRSxPQUFjLE9BQWMsTUFBTSxhQUFhLFdBQVcsWUFBWSxDQUFDO0FBQy9HLFlBQUksT0FBTztBQUNQLGdCQUFNLE1BQU0sU0FBUyxNQUFNLEtBQUs7QUFBQSxRQUNwQztBQUNBLGVBQU87QUFBQSxNQUNYO0FBRUEsTUFBQUEsV0FBVSxVQUFVLDJCQUEyQixTQUFTLHlCQUF5QixPQUFPO0FBQ3BGLFlBQUksTUFBTSxNQUFNLEtBQ1osWUFBWSxNQUFNO0FBRXRCLGVBQU8sSUFBSSxRQUFRLElBQUksUUFBUSxHQUFHLGVBQWUsWUFBWSxJQUFJLElBQUksV0FBVyxHQUFHLEdBQUcsU0FBUztBQUFBLE1BQ25HO0FBS0EsTUFBQUEsV0FBVSxVQUFVLGlCQUFpQixTQUFTLGVBQWUsT0FBTztBQUNoRSxlQUFPLEtBQUsscUJBQXFCO0FBQUEsVUFDN0I7QUFBQSxVQUNBLE1BQU0sYUFBYSxXQUFXO0FBQUEsVUFDOUIsT0FBTyxLQUFLO0FBQUEsUUFDaEIsQ0FBQztBQUFBLE1BQ0w7QUFLQSxNQUFBQSxXQUFVLFVBQVUsbUJBQW1CLFNBQVMsaUJBQWlCLE9BQU87QUFDcEUsZUFBTyxLQUFLLHFCQUFxQjtBQUFBLFVBQzdCO0FBQUEsVUFDQSxNQUFNLGFBQWEsV0FBVztBQUFBLFVBQzlCLE9BQU8sS0FBSztBQUFBLFFBQ2hCLENBQUM7QUFBQSxNQUNMO0FBRUEsTUFBQUEsV0FBVSxVQUFVLHVCQUF1QixTQUFTLHFCQUFxQixPQUFPLGVBQWU7QUFHM0YsWUFBSSxpQkFBaUIsY0FBYyxTQUFTLGNBQWMsVUFBVSxLQUFLO0FBQ3JFO0FBQUEsUUFDSjtBQUNBLGVBQU8sS0FBSyx5QkFBeUIsS0FBSyxLQUFLLEtBQUssd0JBQXdCLEtBQUssS0FBSyxLQUFLLHNCQUFzQixLQUFLO0FBQUEsTUFDMUg7QUFFQSxNQUFBQSxXQUFVLFVBQVUsMkJBQTJCLFNBQVMseUJBQXlCLE9BQU87QUFDcEYsZUFBTyxLQUFLLHFCQUFxQjtBQUFBLFVBQzdCO0FBQUEsVUFDQSxNQUFNLGFBQWEsV0FBVztBQUFBLFVBQzlCLE9BQU8sS0FBSztBQUFBLFFBQ2hCLENBQUM7QUFBQSxNQUNMO0FBRUEsTUFBQUEsV0FBVSxVQUFVLDBCQUEwQixTQUFTLHdCQUF3QixPQUFPO0FBQ2xGLGVBQU8sS0FBSyxxQkFBcUI7QUFBQSxVQUM3QjtBQUFBLFVBQ0EsTUFBTSxhQUFhLFdBQVc7QUFBQSxVQUM5QixPQUFPLEtBQUs7QUFBQSxRQUNoQixDQUFDO0FBQUEsTUFDTDtBQUVBLE1BQUFBLFdBQVUsVUFBVSx3QkFBd0IsU0FBUyxzQkFBc0IsT0FBTztBQUM5RSxlQUFPLEtBQUsscUJBQXFCO0FBQUEsVUFDN0I7QUFBQSxVQUNBLE1BQU0sYUFBYSxXQUFXO0FBQUEsVUFDOUIsT0FBTyxLQUFLO0FBQUEsUUFDaEIsQ0FBQztBQUFBLE1BQ0w7QUFFQSxNQUFBQSxXQUFVLFVBQVUsZUFBZSxTQUFTLGFBQWEsT0FBTztBQUM1RCxlQUFPLEtBQUsscUJBQXFCO0FBQUEsVUFDN0I7QUFBQSxVQUNBLE1BQU0sYUFBYSxXQUFXO0FBQUEsVUFDOUIsT0FBTyxLQUFLO0FBQUEsUUFDaEIsQ0FBQztBQUFBLE1BQ0w7QUFFQSxNQUFBQSxXQUFVLFVBQVUsdUJBQXVCLFNBQVMscUJBQXFCLE9BQU87QUFDNUUsWUFBSSxRQUFRLE1BQU0sT0FDZCxPQUFPLE1BQU0sTUFDYixRQUFRLE1BQU07QUFFbEIsWUFBSSxVQUFVLE1BQU0sTUFBTSxLQUFLO0FBRS9CLFlBQUksU0FBUztBQUNULGlCQUFPLEVBQUUsTUFBWSxPQUFPLFFBQVEsR0FBRztBQUFBLFFBQzNDO0FBQUEsTUFDSjtBQUVBLGFBQU9BO0FBQUEsSUFDWCxFQUFFO0FBRUYsWUFBUSxhQUFhO0FBQ3JCLElBQUFELFFBQU8sVUFBVSxRQUFRO0FBQUE7QUFBQTs7O0FDMVZ6QjtBQUFBLHFGQUFBRSxTQUFBO0FBQUE7QUFFQSxZQUFRLGFBQWE7QUFFckIsUUFBSSxhQUFhO0FBRWpCLFFBQUksY0FBYyx1QkFBdUIsVUFBVTtBQUVuRCxRQUFJLGFBQWE7QUFFakIsUUFBSSxjQUFjLHVCQUF1QixVQUFVO0FBRW5ELGFBQVMsdUJBQXVCLEtBQUs7QUFBRSxhQUFPLE9BQU8sSUFBSSxhQUFhLE1BQU0sRUFBRSxXQUFXLElBQUk7QUFBQSxJQUFHO0FBRWhHLGFBQVMsZ0JBQWdCLFVBQVUsYUFBYTtBQUFFLFVBQUksRUFBRSxvQkFBb0IsY0FBYztBQUFFLGNBQU0sSUFBSSxVQUFVLG1DQUFtQztBQUFBLE1BQUc7QUFBQSxJQUFFO0FBRXhKLFFBQUksZ0JBQWdCLENBQUMsT0FBTyxZQUFZLFNBQVMsT0FBTyxZQUFZLFNBQVMsU0FBUyxPQUFPLE9BQU8sU0FBUyxNQUFNLE9BQU8sY0FBYyxhQUFhLFdBQVcsY0FBYyxNQUFNLFVBQVUsY0FBYyxTQUFTLGlCQUFpQixPQUFPLGFBQWEsT0FBTyxVQUFVLFNBQVMsV0FBVyxVQUFVLFVBQVUsUUFBUSxXQUFXLFFBQVEsY0FBYyxNQUFNLFNBQVMsUUFBUSxVQUFVLFdBQVcsZUFBZSxZQUFZLFFBQVEsUUFBUSxTQUFTLFFBQVEsV0FBVyxRQUFRLGFBQWEsb0JBQW9CLGVBQWUsU0FBUyxRQUFRLFNBQVMsU0FBUyxXQUFXLFlBQVksV0FBVyxXQUFXLGNBQWMsVUFBVSxVQUFVLFdBQVcsVUFBVSxVQUFVLGFBQWEsV0FBVyxjQUFjLGNBQWMsWUFBWSxZQUFZLFdBQVcsUUFBUSxpQkFBaUIsU0FBUyxhQUFhLGFBQWEsY0FBYyxVQUFVLFNBQVMsUUFBUSxhQUFhLFdBQVcsZ0JBQWdCLG1DQUFtQyxvQkFBb0IsZ0JBQWdCLGdCQUFnQixrQkFBa0Isa0JBQWtCLGdCQUFnQixxQkFBcUIsb0JBQW9CLG9DQUFvQyxnQkFBZ0IsVUFBVSxTQUFTLFFBQVEsWUFBWSxxQkFBcUIsb0JBQW9CLFFBQVEsT0FBTyxRQUFRLGNBQWMsWUFBWSxVQUFVLFVBQVUsbUJBQW1CLGtCQUFrQixjQUFjLE9BQU8sV0FBVyxXQUFXLFdBQVcsWUFBWSxjQUFjLFVBQVUsYUFBYSxjQUFjLFNBQVMsWUFBWSxjQUFjLGlCQUFpQixlQUFlLFdBQVcsWUFBWSxjQUFjLFlBQVksTUFBTSxZQUFZLFVBQVUsUUFBUSxVQUFVLFdBQVcsUUFBUSxZQUFZLFdBQVcsUUFBUSxVQUFVLFVBQVUsWUFBWSxjQUFjLE9BQU8sWUFBWSxVQUFVLFNBQVMsVUFBVSxTQUFTLGFBQWEsYUFBYSxhQUFhLFFBQVEsV0FBVyxVQUFVLFFBQVEsT0FBTyxXQUFXLFlBQVksWUFBWSxXQUFXLFNBQVMsVUFBVSxTQUFTLGFBQWEsUUFBUSxVQUFVLFNBQVMsU0FBUyxTQUFTLFNBQVMsT0FBTyxXQUFXLFFBQVEsUUFBUSxZQUFZLFVBQVUsV0FBVyxhQUFhLE9BQU8sVUFBVSxRQUFRLFNBQVMsV0FBVyxTQUFTLFlBQVksV0FBVyxRQUFRLGdCQUFnQixRQUFRLFFBQVEsUUFBUSxTQUFTLFlBQVksTUFBTSxhQUFhLE1BQU0sYUFBYSxhQUFhLGFBQWEsU0FBUyxhQUFhLGNBQWMsT0FBTyxZQUFZLFdBQVcsU0FBUyxTQUFTLGVBQWUsVUFBVSxPQUFPLFdBQVcsYUFBYSxnQkFBZ0IsWUFBWSxRQUFRLE1BQU0sVUFBVSxhQUFhLFdBQVcsT0FBTyxRQUFRLFFBQVEsT0FBTyxTQUFTLFlBQVksU0FBUyxXQUFXLFlBQVksV0FBVyxTQUFTLFFBQVEsUUFBUSxZQUFZLE1BQU0sU0FBUyxhQUFhLFVBQVUsYUFBYSxrQkFBa0IsV0FBVyxZQUFZLFFBQVEsV0FBVyxZQUFZLFFBQVEsUUFBUSxTQUFTLGNBQWMsU0FBUyxnQkFBZ0IsT0FBTyxZQUFZLFVBQVUsU0FBUyxVQUFVLGVBQWUsZ0JBQWdCLE9BQU8sVUFBVSxXQUFXLFlBQVksT0FBTyxRQUFRLFlBQVksVUFBVSxTQUFTLFVBQVUsWUFBWSxPQUFPLFlBQVksV0FBVyxTQUFTLFNBQVMsT0FBTyxhQUFhLFdBQVcsTUFBTSxXQUFXLFdBQVcsWUFBWSxjQUFjLGNBQWMsY0FBYyxRQUFRLFdBQVcsYUFBYSxjQUFjLE9BQU8sUUFBUSxVQUFVLFNBQVMsV0FBVyxZQUFZLFFBQVEsZ0JBQWdCLE1BQU0sVUFBVSxPQUFPLGFBQWEsTUFBTSxRQUFRLFFBQVEsZ0JBQWdCLFlBQVksVUFBVSxTQUFTLE9BQU8sU0FBUyxRQUFRLFlBQVksV0FBVyxjQUFjLFdBQVcsVUFBVSxZQUFZLGFBQWEs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QVksUUFBUSxhQUFhLFFBQVEsT0FBTyxXQUFXLFdBQVcsVUFBVSxVQUFVLFFBQVEsaUJBQWlCLGFBQWEsWUFBWSxNQUFNLFVBQVUsUUFBUSxZQUFZLFdBQVcsU0FBUyxTQUFTLFVBQVUsY0FBYyxhQUFhLFdBQVcsVUFBVSxRQUFRLFdBQVcsWUFBWSxXQUFXLFNBQVMsU0FBUyxTQUFTLFNBQVMsU0FBUyxTQUFTLE9BQU8sVUFBVSxTQUFTLFFBQVEsWUFBWSxXQUFXLFFBQVEsU0FBUyxTQUFTLFFBQVEsUUFBUSxVQUFVLFFBQVEsY0FBYyxNQUFNLGFBQWEsTUFBTSxhQUFhLFNBQVMsV0FBVyxhQUFhLFdBQVcsWUFBWSxnQkFBZ0IsT0FBTyxXQUFXLGFBQWEsWUFBWSxRQUFRLGNBQWMsTUFBTSxhQUFhLFFBQVEsWUFBWSxTQUFTLFdBQVcsVUFBVSxTQUFTLFdBQVcsUUFBUSxTQUFTLFNBQVMsU0FBUyxXQUFXLFNBQVMsUUFBUSxRQUFRLE9BQU8sT0FBTyxVQUFVLFVBQVUsU0FBUyxPQUFPLFNBQVMsVUFBVSxZQUFZLE9BQU8sUUFBUSxTQUFTLFlBQVksUUFBUSxPQUFPLFlBQVksVUFBVSxXQUFXLFlBQVksU0FBUyxPQUFPLFdBQVcsY0FBYyxVQUFVLE9BQU8sVUFBVSxRQUFRLFVBQVUsZUFBZSxVQUFVLFVBQVUsV0FBVyxXQUFXLGVBQWUsZUFBZSxlQUFlLGlCQUFpQixhQUFhLFVBQVUsVUFBVSxnQkFBZ0IsWUFBWSxhQUFhLFdBQVcsTUFBTSxPQUFPLE1BQU0sUUFBUSxVQUFVLFFBQVEsWUFBWSxVQUFVLFVBQVUsV0FBVyxTQUFTLGdCQUFnQixVQUFVLFdBQVcsVUFBVSxPQUFPLFlBQVksY0FBYyxXQUFXLG1CQUFtQixhQUFhLGNBQWMsVUFBVSxhQUFhLFVBQVUsV0FBVyxRQUFRLGFBQWEsZUFBZSxhQUFhLFlBQVksYUFBYSxVQUFVLGFBQWEsU0FBUyxXQUFXLGFBQWEsVUFBVSxTQUFTLFNBQVMsT0FBTyxRQUFRLFFBQVEsVUFBVSxPQUFPLGFBQWEsV0FBVyxhQUFhLE9BQU8sYUFBYSxVQUFVLFlBQVks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Q1Q7QUFDQSxlQUNHLEtBQUssZ0JBQWdCLENBQUMsQ0FBQyxFQUN2QixLQUFLLENBQUMsY0FBYztBQUNuQiwwQkFBZ0I7QUFBQSxZQUNkO0FBQUEsVUFDRixDQUFDO0FBQUEsUUFDSCxDQUFDLEVBQ0EsTUFBTSxDQUFDLE1BQU0sUUFBUSxNQUFNLGdDQUFnQyxDQUFDLENBQUM7QUFBQSxNQUNsRTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsU0FBTyxVQUFVLE1BQU07QUFDckIsV0FDRyxLQUFLLGdCQUFnQixDQUFDLENBQUMsRUFDdkIsS0FBSyxDQUFDLGNBQWM7QUFDbkIsc0JBQWdCO0FBQUEsUUFDZDtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsQ0FBQyxFQUNBLE1BQU0sQ0FBQyxNQUFNLFFBQVEsTUFBTSx3Q0FBd0MsQ0FBQyxDQUFDO0FBQ3hFLFVBQU0sc0JBQXNCLGFBQWE7QUFBQSxNQUN2QztBQUFBLElBQ0Y7QUFDQSxRQUFJLHFCQUFxQjtBQUN2QixVQUFJO0FBQ0YsdUJBQWUsSUFBSSxLQUFLLE1BQU0sbUJBQW1CLENBQUM7QUFBQSxNQUNwRCxTQUFTLEtBQVA7QUFDQSxnQkFBUSxNQUFNLG9EQUFvRDtBQUFBLE1BQ3BFO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU87QUFBQSxJQUNMLE9BQU87QUFBQSxJQUNQO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbIm1vZHVsZSIsICJfdHlwZW9mIiwgIm9iaiIsICJnbG9iYWwiLCAiZGF0ZUZvcm1hdCIsICJfIiwgIkQiLCAieSIsICJwYWQiLCAiZ2V0RGF5TmFtZSIsICJ0b2RheV9kIiwgInRvZGF5X20iLCAidG9kYXlfeSIsICJ5ZXN0ZXJkYXlfZCIsICJ5ZXN0ZXJkYXlfbSIsICJ5ZXN0ZXJkYXlfeSIsICJ0b21vcnJvd19kIiwgInRvbW9ycm93X20iLCAidG9tb3Jyb3dfeSIsICJnZXRXZWVrIiwgImdldERheU9mV2VlayIsICJraW5kT2YiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAiU3ltYm9sIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIlN5bWJvbCIsICJtb2R1bGUiLCAibW9kdWxlIiwgIlN5bWJvbCIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJTeW1ib2wiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIkluZGVudGF0aW9uIiwgIm1vZHVsZSIsICJJbmxpbmVCbG9jayIsICJtb2R1bGUiLCAiUGFyYW1zIiwgIm1vZHVsZSIsICJGb3JtYXR0ZXIiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIlByb21pc2UiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAiUHJvbWlzZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAiQnVmZmVyIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJUb2tlbml6ZXIiLCAibW9kdWxlIiwgIkRiMkZvcm1hdHRlciIsICJtb2R1bGUiLCAiTjFxbEZvcm1hdHRlciIsICJtb2R1bGUiLCAiUGxTcWxGb3JtYXR0ZXIiLCAibW9kdWxlIiwgIlN0YW5kYXJkU3FsRm9ybWF0dGVyIiwgIm1vZHVsZSIsICJpbXBvcnRfZmxpcHBlcl9wbHVnaW4iLCAiZSIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2FudGQiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfZmxpcHBlcl9wbHVnaW4iLCAiaW1wb3J0X2FudGQiLCAiUmVhY3QiLCAiTWFuYWdlZERhdGFJbnNwZWN0b3IiLCAiaW1wb3J0X2ZsaXBwZXJfcGx1Z2luIiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJjb2x1bW5zIiwgInJvd3MiLCAiaW5kZXhlc0NvbHVtbnMiLCAiaW5kZXhlc1ZhbHVlcyIsICJpbXBvcnRfZmxpcHBlcl9wbHVnaW4iLCAiaW1wb3J0X2FudGQiLCAiaW1wb3J0X2ljb25zIiwgIlRleHQiLCAiUmVhY3QiLCAiRGF0YVRhYmxlIiwgInN0YXRlIiwgInJvdyIsICJzcWxGb3JtYXR0ZXIiLCAiZGF0ZUZvcm1hdCIsICJzdGF0ZSJdCn0K
