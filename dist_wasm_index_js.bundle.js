"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkksink_perlin_web_gui"] = self["webpackChunkksink_perlin_web_gui"] || []).push([["dist_wasm_index_js"],{

/***/ "./dist/wasm/index.js":
/*!****************************!*\
  !*** ./dist/wasm/index.js ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__wbg_alert_ae96ff5ec8205f58\": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_alert_ae96ff5ec8205f58),\n/* harmony export */   \"greet\": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.greet),\n/* harmony export */   \"ksink\": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.ksink)\n/* harmony export */ });\n/* harmony import */ var _index_bg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index_bg.js */ \"./dist/wasm/index_bg.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_index_bg_js__WEBPACK_IMPORTED_MODULE_0__]);\n_index_bg_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://ksink-perlin-web-gui/./dist/wasm/index.js?");

/***/ }),

/***/ "./dist/wasm/index_bg.js":
/*!*******************************!*\
  !*** ./dist/wasm/index_bg.js ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__wbg_alert_ae96ff5ec8205f58\": () => (/* binding */ __wbg_alert_ae96ff5ec8205f58),\n/* harmony export */   \"greet\": () => (/* binding */ greet),\n/* harmony export */   \"ksink\": () => (/* binding */ ksink)\n/* harmony export */ });\n/* harmony import */ var _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index_bg.wasm */ \"./dist/wasm/index_bg.wasm\");\n/* module decorator */ module = __webpack_require__.hmd(module);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__]);\n_index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nconst u32CvtShim = new Uint32Array(2);\n\nconst uint64CvtShim = new BigUint64Array(u32CvtShim.buffer);\n\nlet cachedInt32Memory0 = new Int32Array();\n\nfunction getInt32Memory0() {\n    if (cachedInt32Memory0.byteLength === 0) {\n        cachedInt32Memory0 = new Int32Array(_index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);\n    }\n    return cachedInt32Memory0;\n}\n/**\n* @param {bigint} x\n* @param {bigint} c\n* @returns {bigint}\n*/\nfunction ksink(x, c) {\n    try {\n        const retptr = _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(-16);\n        uint64CvtShim[0] = x;\n        const low0 = u32CvtShim[0];\n        const high0 = u32CvtShim[1];\n        uint64CvtShim[0] = c;\n        const low1 = u32CvtShim[0];\n        const high1 = u32CvtShim[1];\n        _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.ksink(retptr, low0, high0, low1, high1);\n        var r0 = getInt32Memory0()[retptr / 4 + 0];\n        var r1 = getInt32Memory0()[retptr / 4 + 1];\n        u32CvtShim[0] = r0;\n        u32CvtShim[1] = r1;\n        const n2 = uint64CvtShim[0];\n        return n2;\n    } finally {\n        _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(16);\n    }\n}\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachedUint8Memory0 = new Uint8Array();\n\nfunction getUint8Memory0() {\n    if (cachedUint8Memory0.byteLength === 0) {\n        cachedUint8Memory0 = new Uint8Array(_index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);\n    }\n    return cachedUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nfunction logError(f, args) {\n    try {\n        return f.apply(this, args);\n    } catch (e) {\n        let error = (function () {\n            try {\n                return e instanceof Error ? `${e.message}\\n\\nStack:\\n${e.stack}` : e.toString();\n            } catch(_) {\n                return \"<failed to stringify thrown value>\";\n            }\n        }());\n        console.error(\"wasm-bindgen: imported JS function that was not marked as `catch` threw an error:\", error);\n        throw e;\n    }\n}\n/**\n*/\nfunction greet() {\n    _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.greet();\n}\n\nfunction __wbg_alert_ae96ff5ec8205f58() { return logError(function (arg0, arg1) {\n    alert(getStringFromWasm0(arg0, arg1));\n}, arguments) };\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://ksink-perlin-web-gui/./dist/wasm/index_bg.js?");

/***/ }),

/***/ "./dist/wasm/index_bg.wasm":
/*!*********************************!*\
  !*** ./dist/wasm/index_bg.wasm ***!
  \*********************************/
/***/ ((module, exports, __webpack_require__) => {

eval("var __webpack_instantiate__ = ([WEBPACK_IMPORTED_MODULE_0]) => {\n\treturn __webpack_require__.v(exports, module.id, \"8e02d9e3bd9d74159aa7\", {\n\t\t\"./index_bg.js\": {\n\t\t\t\"__wbg_alert_ae96ff5ec8205f58\": WEBPACK_IMPORTED_MODULE_0.__wbg_alert_ae96ff5ec8205f58\n\t\t}\n\t});\n}\n__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => {\n\ttry {\n\t/* harmony import */ var WEBPACK_IMPORTED_MODULE_0 = __webpack_require__(/*! ./index_bg.js */ \"./dist/wasm/index_bg.js\");\n\tvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([WEBPACK_IMPORTED_MODULE_0]);\n\tvar [WEBPACK_IMPORTED_MODULE_0] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__;\n\tawait __webpack_require__.v(exports, module.id, \"8e02d9e3bd9d74159aa7\", {\n\t\t\"./index_bg.js\": {\n\t\t\t\"__wbg_alert_ae96ff5ec8205f58\": WEBPACK_IMPORTED_MODULE_0.__wbg_alert_ae96ff5ec8205f58\n\t\t}\n\t});\n\t__webpack_async_result__();\n\t} catch(e) { __webpack_async_result__(e); }\n}, 1);\n\n//# sourceURL=webpack://ksink-perlin-web-gui/./dist/wasm/index_bg.wasm?");

/***/ })

}]);