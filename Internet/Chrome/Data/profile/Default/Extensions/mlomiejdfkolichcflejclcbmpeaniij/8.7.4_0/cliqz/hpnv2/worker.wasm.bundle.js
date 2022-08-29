/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../../../../../tmp/broccoli-2032UxB1x57hJgGm/out-40-funnel/modules/hpnv2/worker.wasm.bundle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../../tmp/broccoli-2032UxB1x57hJgGm/out-40-funnel/modules/hpnv2/worker-common.js":
/*!***********************************************************************************!*\
  !*** /tmp/broccoli-2032UxB1x57hJgGm/out-40-funnel/modules/hpnv2/worker-common.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeWorker;

/*!
 * Copyright (c) 2014-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
function makeWorker(_self, getCredentialManager) {
  const self = _self;
  const console = {
    log: (...args) => self.postMessage({
      logMessage: {
        type: 'log',
        args
      }
    }),
    error: (...args) => self.postMessage({
      logMessage: {
        type: 'error',
        args
      }
    })
  };

  function wrapError(e) {
    return `Worker error: '${e && e.message}', stack: <<< ${e && e.stack} >>>`;
  } // Assuming there are no two concurrent messages being handled (caller
  // waits for response before sending another message)


  let signer;

  self.onmessage = async ({
    data: {
      id,
      fn,
      args
    }
  }) => {
    if (!signer) {
      const CredentialManager = await getCredentialManager();
      signer = new CredentialManager();
    }

    const now = performance.now();

    try {
      const data = signer[fn](...args);
      console.log('[hpnv2-worker]', fn, performance.now() - now, 'ms');
      self.postMessage({
        id,
        data
      });
    } catch (e) {
      const error = wrapError(e);
      console.error('[hpnv2-worker]', error);
      self.postMessage({
        id,
        error
      });
    }
  };
}

/***/ }),

/***/ "../../../../../tmp/broccoli-2032UxB1x57hJgGm/out-40-funnel/modules/hpnv2/worker.wasm.bundle.js":
/*!****************************************************************************************!*\
  !*** /tmp/broccoli-2032UxB1x57hJgGm/out-40-funnel/modules/hpnv2/worker.wasm.bundle.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _wasm = _interopRequireDefault(__webpack_require__(/*! anonymous-credentials/lib/wasm */ "./node_modules/anonymous-credentials/lib/wasm.js"));

var _workerCommon = _interopRequireDefault(__webpack_require__(/*! ./worker-common */ "../../../../../tmp/broccoli-2032UxB1x57hJgGm/out-40-funnel/modules/hpnv2/worker-common.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * Copyright (c) 2014-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
(0, _workerCommon.default)(self, _wasm.default);

/***/ }),

/***/ "./node_modules/anonymous-credentials/dist/group-sign-wasm.js":
/*!********************************************************************!*\
  !*** ./node_modules/anonymous-credentials/dist/group-sign-wasm.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, __dirname, Buffer) {
var ModuleWasm = (function() {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  return (
function(ModuleWasm) {
  ModuleWasm = ModuleWasm || {};

var Module=typeof ModuleWasm!=="undefined"?ModuleWasm:{};var BUFFER_SIZE=10*1024;function _arrayToPtr(data,ptr){if(data.length>BUFFER_SIZE){throw new Error("Data size exceeded")}writeArrayToMemory(data,ptr);return ptr}function GroupSigner(){this.buffers=[];this._makeBindings();this.stateSize=Module._GS_getStateSize();var state=_malloc(this.stateSize);Module._GS_initState(state);this._updateState(state);_free(state)}function initStaticMembers(){GroupSigner._version=UTF8ToString(Module._GS_version());GroupSigner._curve=UTF8ToString(Module._GS_curve())}if(Module["calledRun"]){initStaticMembers()}else{var old=Module["onRuntimeInitialized"];Module["onRuntimeInitialized"]=function(){if(old)old();initStaticMembers()}}GroupSigner.prototype._getBuffer=function(){const buffer=_malloc(BUFFER_SIZE);this.buffers.push(buffer);return buffer};GroupSigner.prototype._freeBuffers=function(){this.buffers.forEach(function(buffer){_free(buffer)});this.buffers=[]};GroupSigner.prototype._updateState=function(state){this.state=new Uint8Array(HEAPU8.buffer,state,this.stateSize).slice()};GroupSigner.prototype._makeBindings=function(){var self=this;function _(func,inputs,output,context){inputs=inputs===undefined?0:inputs;output=output===undefined?false:output;context=context===undefined?true:context;return function(){try{var state=_arrayToPtr(self.state,self._getBuffer());var args=Array.prototype.slice.call(arguments);if(args.length!==inputs){throw new Error("expected "+inputs+" arguments")}if(!args.every(function(arg){return arg instanceof Uint8Array})){throw new Error("input data must be uint8array")}var funcArgs=[];if(context){funcArgs.push(state)}for(var i=0;i<inputs;++i){var ptr=_arrayToPtr(args[i],self._getBuffer());funcArgs.push(ptr);funcArgs.push(args[i].length)}if(output==="array"){var ptr=self._getBuffer();setValue(ptr,BUFFER_SIZE-4,"i32");funcArgs.push(ptr+4);funcArgs.push(ptr)}else if(output==="joinstatic"){var ptr=self._getBuffer();setValue(ptr,BUFFER_SIZE-4,"i32");funcArgs.push(ptr+4);funcArgs.push(ptr);var ptr2=self._getBuffer();setValue(ptr2,BUFFER_SIZE-4,"i32");funcArgs.push(ptr2+4);funcArgs.push(ptr2)}var res=Module[func].apply(Module,funcArgs);this._updateState(state);if(output==="boolean"){if(res===Module._GS_success()){return true}else if(res===Module._GS_failure()){return false}}if(res!==Module._GS_success()){throw new Error(UTF8ToString(Module._GS_error(res)))}if(output==="joinstatic"){var ptrjoinmsg=funcArgs[funcArgs.length-1];var ptrgsk=funcArgs[funcArgs.length-3];var gsk=new Uint8Array(HEAPU8.buffer,ptrgsk+4,getValue(ptrgsk,"i32")).slice();var joinmsg=new Uint8Array(HEAPU8.buffer,ptrjoinmsg+4,getValue(ptrjoinmsg,"i32")).slice();return{gsk:gsk,joinmsg:joinmsg}}else if(output){var ptr=funcArgs[funcArgs.length-1];return new Uint8Array(HEAPU8.buffer,ptr+4,getValue(ptr,"i32")).slice()}}finally{this._freeBuffers()}}}this.seed=_("_GS_seed",1);this.setupGroup=_("_GS_setupGroup");this.getGroupPubKey=_("_GS_exportGroupPubKey",0,"array");this.getGroupPrivKey=_("_GS_exportGroupPrivKey",0,"array");this.getUserCredentials=_("_GS_exportUserCredentials",0,"array");this.setGroupPubKey=_("_GS_loadGroupPubKey",1);this.setGroupPrivKey=_("_GS_loadGroupPrivKey",1);this.setUserCredentials=_("_GS_loadUserCredentials",1);this.processJoin=_("_GS_processJoin",2,"array");this.sign=_("_GS_sign",2,"array");this.verify=_("_GS_verify",3,"boolean");this.getSignatureTag=_("_GS_getSignatureTag",1,"array",false);this.startJoin=_("_GS_startJoin",1,"joinstatic");this.finishJoin=_("_GS_finishJoin",3,"array",false)};Module.GroupSigner=GroupSigner;var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}Module["arguments"]=[];Module["thisProgram"]="./this.program";Module["quit"]=function(status,toThrow){throw toThrow};Module["preRun"]=[];Module["postRun"]=[];var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&"function"==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}else{return scriptDirectory+path}}if(ENVIRONMENT_IS_NODE){scriptDirectory=__dirname+"/";var nodeFS;var nodePath;Module["read"]=function shell_read(filename,binary){var ret;ret=tryParseAsDataURI(filename);if(!ret){if(!nodeFS)nodeFS=__webpack_require__(/*! fs */ "./node_modules/node-libs-browser/mock/empty.js");if(!nodePath)nodePath=__webpack_require__(/*! path */ "./node_modules/path-browserify/index.js");filename=nodePath["normalize"](filename);ret=nodeFS["readFileSync"](filename)}return binary?ret:ret.toString()};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}Module["arguments"]=process["argv"].slice(2);process["on"]("uncaughtException",function(ex){if(!(ex instanceof ExitStatus)){throw ex}});process["on"]("unhandledRejection",abort);Module["quit"]=function(status){process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){Module["read"]=function shell_read(f){var data=tryParseAsDataURI(f);if(data){return intArrayToString(data)}return read(f)}}Module["readBinary"]=function readBinary(f){var data;data=tryParseAsDataURI(f);if(data){return data}if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof quit==="function"){Module["quit"]=function(status){quit(status)}}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(document.currentScript){scriptDirectory=document.currentScript.src}if(_scriptDir){scriptDirectory=_scriptDir}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1)}else{scriptDirectory=""}Module["read"]=function shell_read(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){Module["readBinary"]=function readBinary(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}Module["readAsync"]=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)};Module["setWindowTitle"]=function(title){document.title=title}}else{}var out=Module["print"]||(typeof console!=="undefined"?console.log.bind(console):typeof print!=="undefined"?print:null);var err=Module["printErr"]||(typeof printErr!=="undefined"?printErr:typeof console!=="undefined"&&console.warn.bind(console)||out);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=undefined;var asm2wasmImports={"f64-rem":function(x,y){return x%y},"debugger":function(){debugger}};var functionPointers=new Array(0);if(typeof WebAssembly!=="object"){err("no native wasm support detected")}function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for getValue: "+type)}return null}var wasmMemory;var wasmTable;var ABORT=false;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=1?tempDouble>0?(Math_min(+Math_floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(u8Array[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=u8Array[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|u8Array[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}var WASM_PAGE_SIZE=65536;var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)}var DYNAMIC_BASE=70448,DYNAMICTOP_PTR=4880;var TOTAL_STACK=65536;var INITIAL_TOTAL_MEMORY=Module["TOTAL_MEMORY"]||131072;if(INITIAL_TOTAL_MEMORY<TOTAL_STACK)err("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+INITIAL_TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")");if(Module["buffer"]){buffer=Module["buffer"]}else{if(typeof WebAssembly==="object"&&typeof WebAssembly.Memory==="function"){wasmMemory=new WebAssembly.Memory({"initial":INITIAL_TOTAL_MEMORY/WASM_PAGE_SIZE,"maximum":INITIAL_TOTAL_MEMORY/WASM_PAGE_SIZE});buffer=wasmMemory.buffer}else{buffer=new ArrayBuffer(INITIAL_TOTAL_MEMORY)}}updateGlobalBufferViews();HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func)}else{Module["dynCall_vi"](func,callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var Math_abs=Math.abs;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_min=Math.min;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return String.prototype.startsWith?filename.startsWith(dataURIPrefix):filename.indexOf(dataURIPrefix)===0}var wasmBinaryFile="data:application/octet-stream;base64,AGFzbQEAAAABeRBgAX8AYAABf2ADf39/AX9gAX8Bf2ACf38AYAJ/fwF/YAd/f39/f39/AX9gCH9/f39/f39/AX9gBH9/f38Bf2AFf39/f38AYAh/f39/f39/fwBgCX9/f39/f39/fwBgA39/fwBgA39/fwF+YAR/f35/AGAEf39/fwACOQYDZW52AWIAAANlbnYBYwADA2VudgFkAAMDZW52AWUAAQNlbnYBYQN/AANlbnYGbWVtb3J5AgECAgO+AbwBBAAADAQABAwMDAwADgAMBAwEBAQEDAQMBAwEBAQEBAQABQQEAAQMBQQDAAQMAAQEDAQEBAwEAAwABAIEAwQEAAAEAwAEAwQMDwUNAwUEDAQFAgAFDAQABAAJDAwABAQAAAQADAQMBAwEBQwFAAQCBAQFDAUMDAwABAAEAwsKBgYJCAUCDA8FAAQMBAwPBQwCAAwCDAQMAwICAAQDAwEBAQEBCAYGAQADAwYACQQABAIMBQIEAgIABwMGBAQGBwF/AUGwJgsHeRgBZgCjAQFnAKABAWgAuAEBaQC2AQFqALMBAWsAoQEBbAC7AQFtAKYBAW4ApQEBbwCdAQFwAJYBAXEAkwEBcgC5AQFzAK0BAXQAnAEBdQCaAQF2AKgBAXcAvQEBeACiAQF5AKcBAXoApAEBQQCpAQFCAKoBAUMAqwEK5IcDvAE0ACAAIAEpAwA3AwAgACABKQMINwMIIAAgASkDEDcDECAAIAEpAxg3AxggACABKQMgNwMgC4IBAQF+IAAgACkDACIBQv//////////AIM3AwAgACAAKQMIIAFCOId8IgFC//////////8AgzcDCCAAIAApAxAgAUI4h3wiAUL//////////wCDNwMQIAAgACkDGCABQjiHfCIBQv//////////AIM3AxggACAAKQMgIAFCOId8NwMgCw0AIAAQBSAAQTBqEAULLAAgACABIAIQOCAAIAEoAiggAigCKGoiATYCKCABQf///x9MBEAPCyAAEBELHQAgACABRgRADwsgACABEAogAEEwaiABQTBqEAoLJgAgABBgIABB4ABqEEQgAEHAAWoQQyAAQYADahBDIABBATYCwAQLEgAgACABEAQgACABKAIoNgIoCx4AIAAgASACEAwgAEHgAGogAUHgAGogAkHgAGoQDAsbACAAIAEgAhAHIABBMGogAUEwaiACQTBqEAcLWAEBfyMBIQMjAUGAAWokASACKAIorCABKAIorH5C////H1UEQCABEBELIAMgASACEBsgA0HQAGoiAUHgCxAEIAAgAUGQFikDACADEBAgAEECNgIoIAMkAQuTAgEHfyMBIQMjAUGgBGokASADQeALEAQgA0GQAWoiCCADEJ4BIAFBMGohBSABKAIoIgYgASgCWCIEaqwgAigCKCACKAJYaqx+Qv///x9VBEAgBkEBSgRAIAEQESABKAJYIQQLIARBAUoEQCAFEBELCyADQdADaiIEIAEgAhAbIANBgANqIgYgBSACQTBqIgkQGyADQeAAaiIHIAEgBRA4IAcQBSADQTBqIgUgAiAJEDggBRAFIANBsAJqIgEgByAFEBsgA0HgAWoiAiAEIAYQeCAGIAggBhB5IAQgBCAGEHggASABIAIQeSAEEH0gACAEEIwBIABBAzYCKCABEH0gAEEwaiABEIwBIABBAjYCWCADJAELDgAgABAGIABB4ABqEAYLkgsCBH8JfiACQn9RBEAgAykDICECA0BCACAEQQN0IANqIgUpAwAiCH0iCkL/////AIMhDCABKQMAIgtC/////wCDIQkgBSAIIAkgDH58IAwgC0IchyILfiAKQhyIQv////8AgyIKIAl+fCINQhyGQoCAgID/////AIN8IghC//////////8AgzcDACABKQMIIg5C/////wCDIQkgBEEBaiIFQQN0IANqIgYpAwAgCiALfiANQhyHfCAIQjiHfHwgCSAMfnwgDCAOQhyHIg5+IAkgCn58Ig9CHIZCgICAgP////8Ag3whCSAGIAlC//////////8AgzcDACABKQMQIgtC/////wCDIQggBEECakEDdCADaiIGKQMAIAogDn4gD0Ich3wgCUI4h3x8IAggDH58IAwgC0IchyILfiAIIAp+fCINQhyGQoCAgID/////AIN8IQkgBiAJQv//////////AIM3AwAgASkDGCIOQv////8AgyEIIARBA2pBA3QgA2oiBikDACAKIAt+IA1CHId8IAlCOId8fCAIIAx+fCAMIA5CHIciDn4gCCAKfnwiD0IchkKAgICA/////wCDfCEJIAYgCUL//////////wCDNwMAIAEpAyAiC0L/////AIMhCCAEQQRqQQN0IANqIAogDn4gD0Ich3wgCUI4h3wgAnwgCCAMfnwgDCALQhyHIgt+IAggCn58Ig1CHIZCgICAgP////8Ag3wiAkL//////////wCDNwMAIARBBWpBA3QgA2oiBCkDACAKIAt+IA1CHId8IAJCOId8fCECIAQgAjcDACAFQQVHBEAgBSEEDAELCwUgAkIBUSEGIAMpAyAhDANAIARBA3QgA2oiBSkDACIIIAIgCH5C//////////8AgyAGGyIJQv////8AgyEKIAEpAwAiDUL/////AIMhCyAFIAggCiALfnwgCiANQhyHIg1+IAlCHIciCSALfnwiDkIchkKAgICA/////wCDfCILQv//////////AIM3AwAgASkDCCIPQv////8AgyEIIARBAWoiBUEDdCADaiIHKQMAIAkgDX4gDkIch3wgC0I4h3x8IAggCn58IAogD0IchyIPfiAIIAl+fCIQQhyGQoCAgID/////AIN8IQggByAIQv//////////AIM3AwAgASkDECINQv////8AgyELIARBAmpBA3QgA2oiBykDACAJIA9+IBBCHId8IAhCOId8fCAKIAt+fCAKIA1CHIciDX4gCSALfnwiDkIchkKAgICA/////wCDfCEIIAcgCEL//////////wCDNwMAIAEpAxgiD0L/////AIMhCyAEQQNqQQN0IANqIgcpAwAgCSANfiAOQhyHfCAIQjiHfHwgCiALfnwgCiAPQhyHIg9+IAkgC358IhBCHIZCgICAgP////8Ag3whCCAHIAhC//////////8AgzcDACABKQMgIg1C/////wCDIQsgBEEEakEDdCADaiAJIA9+IBBCHId8IAhCOId8IAx8IAogC358IAogDUIchyINfiAJIAt+fCIOQhyGQoCAgID/////AIN8IgxC//////////8AgzcDACAEQQVqQQN0IANqIgQpAwAgCSANfiAOQhyHfCAMQjiHfHwhDCAEIAw3AwAgBUEFRwRAIAUhBAwBCwsLIAAgAykDKCICNwMAIAAgAykDMCIMNwMIIAAgAykDOCIKNwMQIAAgA0FAaykDACIJNwMYIAMpA0ghCCAAIAJC//////////8AgzcDACAAIAwgAkI4h3wiAkL//////////wCDNwMIIAAgCiACQjiHfCICQv//////////AIM3AxAgACAJIAJCOId8IgJC//////////8AgzcDGCAAIAggAkI4h3w3AyALtgIBBH8jASECIwFB4ABqJAEgAkEwaiIDQeALEAQgABAFIAAoAigiAUEQSgRAIAIgAiADIAApAyBCAoYgACkDGEI2h4QgAykDIEIChiADKQMYQjaHhEIBfH+nEE5COIYgAikDIHw3AyAgACAAIAIQeiAAEAUgA0ECEGVBAiEBBSADIAFBf2oiASABQQF2ciIBIAFBAnZyIgEgAUEEdnIiASABQQh2ciIBIAFBEHZyIgEgAUEBdkHVqtWqBXFrIgFBs+bMmQNxIAFBAnZBs+bMmQNxaiIBIAFBBHZqQY+evPgAcUGBgoQIbEEYdiIBEGUgAUUEQCAAQQE2AiggAiQBDwsLA0AgACACQQEgAiAAIAMQmwFrEFggAUF/aiEEIAFBAUoEQCAEIQEMAQsLIABBATYCKCACJAELJQAgACABIAIQWCAAIAAoAigiAEEAIAJrIAAgASgCKHNxczYCKAvLAQIBfwV+IABCADcDACAAQgA3AwggAEIANwMQIABCADcDGCAAQgA3AyADQCAAIAdCCIYgBkIwh4QiBzcDICAAIAZCCIZCgP7///////8AgyAEQjCHhCIGNwMYIAAgBEIIhkKA/v///////wCDIAVCMIeEIgQ3AxAgACAFQgiGQoD+////////AIMgA0Iwh4QiBTcDCCAAIANCCIZCgP7///////8AgyIDNwMAIAAgAyABIAJqLQAArYQiAzcDACACQQFqIgJBIEcNAAsLGAAgACABIAIQEiAAQTBqIAFBMGogAhASCyIAIAAgARAKIABBMGogAUEwahAKIABB4ABqIAFB4ABqEAoLTAECfyMBIQIjAUHgAGokASACQTBqIgMgAiABEJUBIAAoAghBBDoAACAAQcEANgIAIAAoAghBAWogAxAcIAAoAghBIWogAhAcIAIkAQsfACAAIAFGBEAPCyAAIAEQCCAAQeAAaiABQeAAahAIC1YBAn8jASECIwFB4AFqJAEgAiABEAQgAkEwaiIBQcAMEAQgAkHgAGoiAyACIAEQGyACQbABaiIBQeALEAQgACABQZAWKQMAIAMQECAAQQI2AiggAiQBC5wBAQZ/IwEhAyMBQYADaiQBIANBoAJqIgYgASACEA4gA0HAAWoiBSABQeAAaiIHIAJB4ABqIggQDiADQeAAaiIEIAggAhAMIAMgByABEAwgAxAGIAQQBiADIAMgBBAOIAQgBhAfIAMgAyAEEAwgAxAGIAQgBRAfIABB4ABqIgEgAyAEEAwgBRAkIAAgBSAGEAwgABAGIAEQBiADJAELCAAgACABEHEL9AUCBX8LfiAAQgA3AwAgAEIANwMIIABCADcDECAAQgA3AxggAEIANwMgIABCADcDKCAAQgA3AzAgAEIANwM4IABBQGtCADcDACAAQgA3A0gDQCACKQMAIgtC/////wCDIQggA0EDdCAAaiADQQN0IAFqIgUpAwAiCUL/////AIMiCiALQhyHIg1+IAlCHIciDyAIfnwiEEIchkKAgICA/////wCDIAggCn4gDnx8IghC//////////8AgzcDACACKQMIIgtC/////wCDIQwgBSkDACIJQv////8AgyIKIAtCHIciEX4gCUIchyISIAx+fCIOQhyGQoCAgID/////AIMgA0EBaiIGQQN0IABqIgcpAwAgDSAPfiAQQhyHfCAIQjiHfHwgCiAMfnx8IQwgByAMQv//////////AIM3AwAgAikDECILQv////8AgyENIAUpAwAiCUL/////AIMiCiALQhyHIg9+IAlCHIciECANfnwiCEIchkKAgICA/////wCDIANBAmpBA3QgAGoiBCkDACARIBJ+IA5CHId8IAxCOId8fCAKIA1+fHwhDCAEIAxC//////////8AgzcDACACKQMYIgtC/////wCDIQ0gBSkDACIJQv////8AgyIKIAtCHIciEX4gCUIchyISIA1+fCIOQhyGQoCAgID/////AIMgA0EDakEDdCAAaiIEKQMAIA8gEH4gCEIch3wgDEI4h3x8IAogDX58fCEPIAQgD0L//////////wCDNwMAIAIpAyAiCUL/////AIMhECAFKQMAIgpC/////wCDIgggCUIchyILfiAKQhyHIgkgEH58IgpCHIZCgICAgP////8AgyADQQRqQQN0IABqIgQpAwAgESASfiAOQhyHfCAPQjiHfHwgCCAQfnx8IQggBCAIQv//////////AIM3AwAgA0EFakEDdCAAaiAJIAt+IApCHId8IAhCOId8NwMAIAZBBUcEQCAGIQMgBykDACEODAELCwuBAgIBfwZ+IAEpAxggASkDECABKQMIIAEpAwAiA0I4h3wiBEI4h3wiBUI4h3whCEEfIQIgA0L//////////wCDIQYgBUL//////////wCDIQcgCEL//////////wCDIQMgASkDICAIQjiHfCEFIARC//////////8AgyEEA0AgACACaiAGPAAAIARCMIZCgICAgICAwP8AgyAGQgiHhCEGIAdCMIZCgICAgICAwP8AgyAEQgiHhCEEIANCMIZCgICAgICAwP8AgyAHQgiHhCEHIAVCMIZCgICAgICAwP8AgyADQgiHhCEDIAVCCIchBSACQX9qIQEgAgRAIAEhAgwBCwsLRwEBfyMBIQMjAUEwaiQBIAMgAhAnIAAgASADEDggACABKAIoIAMoAihqIgE2AiggAUH///8fTARAIAMkAQ8LIAAQESADJAELvAIBCX8jASECIwFBgAlqJAEgAkHAB2oiCSAAIAEQGSACQcAEaiIFIABBwAFqIgYgAUHAAWoiBBAZIAJBwAFqIgMgACAGEAsgAiABIAQQCyADEA8gAhAPIAJBgAZqIgggAyACEBkgAyAGIABBgANqIgcQCyACIAQgAUGAA2oiChALIAMQDyACEA8gAkGAA2oiBCADIAIQGSADIAkQNiACIAUQNiAIIAggAxALIAYgCCACEAsgBCAEIAIQCyAFIAUgAxALIAMgACAHEAsgAiABIAoQCyADEA8gAhAPIAMgAiADEBkgBSAFIAMQCyADIAcgChAZIAIgAxA2IAcgBSACEAsgBCAEIAIQCyADEC4gBiAGIAMQCyAEEA8gBBAuIAAgCSAEEAsgAEEFNgLABCAAEA8gBhAPIAcQDyACJAELRQEDfyMBIQIjAUHgAGokASACQTBqIgMgASABQTBqIgQQByADIAMQJyACIAMgBBAHIABBMGogAyABEAcgACACEAogAiQBC6oHAQ9/IwEhCiMBQbADaiQBIApBgANqIQYgCkHQAmohBSAKQaACaiEHIApB8AFqIQggCkHAAWohBCAKQZABaiEDIApB4ABqIQIgCkEwaiEJQZwWKAIAIQ9B4BgoAgBFBEAgBiAAIAEQDSAFIABBMGoiCyABQTBqIg0QDSAHIABB4ABqIgwgAUHgAGoiDhANIAggACALEAcgCBAFIAQgASANEAcgBBAFIAggCCAEEA0gBCAGIAUQByAIIAggBBAdIAgQBSAEIAsgDBAHIAQQBSADIA0gDhAHIAMQBSAEIAQgAxANIAMgBSAHEAcgBCAEIAMQHSAEEAUgAyAAIAwQByADEAUgAiABIA4QByACEAUgAyADIAIQDSACIAYgBxAHIAIgAyACEB0gAhAFIAMgBiAGEAcgBiAGIAMQByAGEAUgByAHIA9BA2wiARA0IAkgBSAHEAcgCRAFIAUgBSAHEB0gBRAFIAIgAiABEDQgAyACIAQQDSAHIAggBRANIAAgByADEB0gAiACIAYQDSAFIAUgCRANIAsgAiAFEAcgBiAGIAgQDSAJIAkgBBANIAwgCSAGEAcgABAFIAsQBSAMEAUgCiQBDwsgD0UiDQRAIApBgAgQGAsgBiAAIAEQDSAFIABBMGoiCyABQTBqIg4QDSAHIABB4ABqIgwgAUHgAGoiEBANIAggACALEAcgCBAFIAQgASAOEAcgBBAFIAggCCAEEA0gBCAGIAUQByAIIAggBBAdIAgQBSAEIAsgDBAHIAQQBSADIA4gEBAHIAMQBSAEIAQgAxANIAMgBSAHEAcgBCAEIAMQHSAEEAUgAyAAIAwQByADEAUgAiABIBAQByACEAUgAyADIAIQDSACIAYgBxAHIAIgAyACEB0gAhAFIA0EQCAJIAcgChANBSAJIAcgDxA0CyADIAIgCRAdIAMQBSAJIAMgAxAHIAMgAyAJEAcgCSAFIAMQHSAJEAUgAyADIAUQByADEAUgDQRAIAIgAiAKEA0FIAIgAiAPEDQLIAUgByAHEAcgByAHIAUQByACIAIgBxAdIAIgAiAGEB0gAhAFIAUgAiACEAcgAiACIAUQByACEAUgBSAGIAYQByAGIAYgBRAHIAYgBiAHEB0gBhAFIAUgBCACEA0gByAGIAIQDSACIAMgCRANIAsgAiAHEAcgAyADIAgQDSAAIAMgBRAdIAkgCSAEEA0gBSAIIAYQDSAMIAkgBRAHIAAQBSALEAUgDBAFIAokAQvsBwIBfxB+IAEpAwAhBCABKQMIIQUgASkDECEGIAEpAxghByABKQMgIQggACAAKQMAIgNC//////////8AgyIJNwMAIAAgACkDCCADQjiHfCIDQv//////////AIMiCjcDCCAAIAApAxAgA0I4h3wiA0L//////////wCDIgs3AxAgACAAKQMYIANCOId8IgNC//////////8AgyIMNwMYIAAgACkDICADQjiHfCINNwMgIAggDYVC//////////8BfEI4iEIBgyIOIAcgDIVC//////////8BfEI4iIMiDyAGIAuFQv//////////AXxCOIiDIhAgBSAKhUL//////////wF8QjiIgyIDIAQgCYVC//////////8BfEI4iIMgAyAEIAl9QjiIgyAQIAUgCn1COIiDIA8gBiALfUI4iIMgCCANfUI4iEIBgyAOIAcgDH1COIiDhISEhEIBhoSnQX9qQQBIBEAPC0EAIQEDQCABQQFqIQEgDSAIQgGGIAdCN4eEIgOFQv//////////AXxCOIhCAYMiEiAMIAdCAYZC/v////////8AgyAGQjeHhCIHhUL//////////wF8QjiIgyIOIAsgBkIBhkL+/////////wCDIAVCN4eEIgaFQv//////////AXxCOIiDIg8gCiAFQgGGQv7/////////AIMgBEI3h4QiBYVC//////////8BfEI4iIMiECAJIARCAYZC/v////////8AgyIIhUL//////////wF8QjiIgyAQIAggCX1COIiDIA8gBSAKfUI4iIMgDiAGIAt9QjiIgyASIAcgDH1COIiDIAMgDX1COIhCAYOEhISEQgGGhKdBf2pBf0oEQCAIIQQgAyEIDAELCyANIQQDQCAJQQAgBCADQgGHIhB9IAwgA0I3hkKAgICAgICAwACDIAdCAYeEIg19IAsgB0I3hkKAgICAgICAwACDIAZCAYeEIgd9IAogBkI3hkKAgICAgICAwACDIAVCAYeEIgN9IAkgBUI3hkKAgICAgICAwACDIAhCAYeEIgh9IhJCOId8Ig5COId8Ig9COId8IgVCOId8IgZCP4inQQFza6wiESAJIBJC//////////8Ag4WDhSEJIAogESAKIA5C//////////8Ag4WDhSEKIAsgESALIA9C//////////8Ag4WDhSELIAwgESAMIAVC//////////8Ag4WDhSEMIAQgESAEIAaFg4UhBCABQX9qIQIgAUEBSgRAIAIhASADIQUgByEGIA0hByAQIQMMAQsLIAAgCTcDACAAIAo3AwggACALNwMQIAAgDDcDGCAAIAQ3AyALYwEDfyMBIQIjAUHQEGokASACQdgNaiIDEFwgAQRAIAEoAgBBAEoEQANAIAMgBCABKAIIaiwAABBbIARBAWoiBCABKAIASA0ACwsLIAMgAhBZIABBADYCACAAIAIQsgEgAiQBC0oBAn8jASECIwFBsAFqJAEgAkHADBAEIAJBMGoiAyABIAIQGyACQYABaiIBQeALEAQgACABQZAWKQMAIAMQECAAQQI2AiggAiQBC2sBBX8jASEDIwFBkAFqJAEgACADIgJGBEAgAkEwaiEEIABBMGohAQUgAiAAEAogAkEwaiIEIABBMGoiARAKCyADQeAAaiIFIAAQCiAAIAEQJyABIAUQCiAAIAIgABAHIAEgBCABEAcgAyQBC3sBBH8jASECIwFB4ABqJAEgASgCCCIFLAAAIQMgAkEwaiIEIAVBAWoQEyADQQRGBEAgAiABKAIIQSFqEBMgACAEIAIQVQRAIAIkAUEBDwsFIANBAXJB/wFxQQNGBEAgACAEIANBAXEQcgRAIAIkAUEBDwsLCyACJAFBAAv3DQICfw9+IABCADcDACAAQgA3AwggAEIANwMQIABCADcDGCAAQgA3AyAgAEIANwMoIABCADcDMCAAQgA3AzggAEFAa0IANwMAIABCADcDSEEBIQIDQCACQQN0IAFqKQMAIgZC/////wCDIQogASkDACIFQv////8AgyIIIAZCHIciB34gBUIchyIGIAp+fCIFQhyGQoCAgID/////AIMgBCAJfCAIIAp+fHwhCCAGIAd+IAVCHId8IAhCOId8IQQgAkEDdCAAaiAIQv//////////AIM3AwAgAkEBaiEDIAJBBEkEQCADIgJBA3QgAGopAwAhCQwBCwsgACAENwMoIAEpAxAiBkL/////AIMhByAAIAEpAwgiBUL/////AIMiBCAGQhyHIg9+IAVCHIciDCAHfnwiCEIchkKAgICA/////wCDIAApAxggBCAHfnx8IgdC//////////8AgzcDGCABKQMYIgZC/////wCDIQ4gACABKQMIIgVC/////wCDIgQgBkIchyILfiAFQhyHIgkgDn58IgpCHIZCgICAgP////8AgyAAKQMgIAwgD34gCEIch3wgB0I4h3x8IAQgDn58fCIIQv//////////AIM3AyAgASkDICIGQv////8AgyEMIAAgASkDCCIFQv////8AgyIEIAZCHIciB34gBUIchyIGIAx+fCIFQhyGQoCAgID/////AIMgACkDKCAJIAt+IApCHId8IAhCOId8fCAEIAx+fHwiBEL//////////wCDNwMoIAAgBiAHfiAFQhyHfCAEQjiHfDcDMCABKQMYIgZC/////wCDIQcgACABKQMQIgVC/////wCDIgQgBkIchyILfiAFQhyHIgkgB358IgpCHIZCgICAgP////8AgyAAKQMoIAQgB358fCIIQv//////////AIM3AyggASkDICIGQv////8AgyEMIAAgASkDECIFQv////8AgyIEIAZCHIciB34gBUIchyIGIAx+fCIFQhyGQoCAgID/////AIMgACkDMCAJIAt+IApCHId8IAhCOId8fCAEIAx+fHwiBEL//////////wCDNwMwIAAgBiAHfiAFQhyHfCAEQjiHfDcDOCABKQMgIgZC/////wCDIQcgACABKQMYIgVC/////wCDIgQgBkIchyILfiAFQhyHIgkgB358IgVCHIZCgICAgP////8AgyAAKQM4IAQgB358fCIEQv//////////AIM3AzggACkDIEIBhiEQIAApAyhCAYYhESAAKQMwQgGGIRIgACkDOEIBhiENIAAgACkDAEIBhiIKNwMAIAAgACkDCEIBhiIINwMIIAAgACkDEEIBhiIHNwMQIAAgACkDGEIBhiIGNwMYIAAgEDcDICAAIBE3AyggACASNwMwIAAgDTcDOCAAQUBrIgMgCSALfiAFQhyHfCAEQjiHfEIBhiIPNwMAIABCADcDSCAAIAEpAwAiBEL/////AIMiCyAEQhyHIgl+IgVCHYZCgICAgP7///8AgyAKIAsgC358fCIEQv//////////AIMiDDcDACAAIAggCSAJfiAFQhuHfHwgBEI4h3wiDjcDCCAAIAEpAwgiBEL/////AIMiCiAEQhyHIgh+IgVCHYZCgICAgP7///8AgyAHIAogCn58fCIEQv//////////AIMiCzcDECAAIAYgCCAIfiAFQhuHfHwgBEI4h3wiCTcDGCAAIAEpAxAiBEL/////AIMiByAEQhyHIgZ+IgVCHYZCgICAgP7///8AgyAHIAd+IBB8fCIEQv//////////AIMiCjcDICAAIAYgBn4gBUIbh3wgEXwgBEI4h3wiCDcDKCAAIAEpAxgiBEL/////AIMiByAEQhyHIgZ+IgVCHYZCgICAgP7///8AgyAHIAd+IBJ8fCIEQv//////////AIMiBzcDMCAAIAYgBn4gBUIbh3wgDXwgBEI4h3wiBjcDOCABKQMgIgVC/////wCDIQ0gACAMNwMAIAAgDkL//////////wCDNwMIIAAgCyAOQjiHfCIEQv//////////AIM3AxAgACAJIARCOId8IgRC//////////8AgzcDGCAAIAogBEI4h3wiBEL//////////wCDNwMgIAAgCCAEQjiHfCIEQv//////////AIM3AyggACAHIARCOId8IgRC//////////8AgzcDMCAAIAYgBEI4h3wiBEL//////////wCDNwM4IAMgDyANIA1+fCANIAVCHIciB34iBkIdhkKAgICA/v///wCDfCIFQv//////////AIMgBEI4h3wiBEL//////////wCDNwMAIAAgByAHfiAGQhuHfCAFQjiHfCAEQjiHfDcDSAu4AQECfyMBIQMjAUEwaiQBIANB4AsQBCADIAEoAihBf2oiAiACQQF2ciICIAJBAnZyIgJBBHYgAnIiAiACQQh2ciICIAJBEHZyIgIgAkEBdkHVqtWqBXFrIgJBs+bMmQNxIAJBAnZBs+bMmQNxaiICIAJBBHZqQY+evPgAcUGBgoQIbEEYdiICEGUgACADIAEQeiAAQQEgAnQiAUEBajYCKCABQf7//x9MBEAgAyQBDwsgABARIAMkAQsOACAAEDwgAEHgAGoQPAvFAwEMfyMBIQQjAUGABmokAUGcFigCAEEDbCEMIARBoAVqIgUgACABEA4gBEHABGoiByAAQeAAaiIKIAFB4ABqIgIQDiAEQeADaiIJIABBwAFqIgsgAUHAAWoiDRAOIARBgANqIgggACAKEAwgCBAGIARBoAJqIgMgASACEAwgAxAGIAggCCADEA4gAyAFIAcQDCAIIAggAxAwIAgQBiAIECQgCBAGIAMgCiALEAwgAxAGIARBwAFqIgYgAiANEAwgBhAGIAMgAyAGEA4gBiAHIAkQDCADIAMgBhAwIAMQBiADECQgAxAGIAYgACALEAwgBhAGIARB4ABqIgIgASANEAwgAhAGIAYgBiACEA4gAiAFIAkQDCACIAYgAhAwIAIQBiAFECQgBRAGIAcQJCAHEAYgBiAFIAUQDCAFIAUgBhAMIAUQBiAJIAkgDBBSIAQgByAJEAwgBBAGIAcgByAJEDAgBxAGIAIgAiAMEFIgBiACIAMQDiAJIAggBxAOIAAgCSAGEDAgAiACIAUQDiAHIAcgBBAOIAogAiAHEAwgBSAFIAgQDiAEIAQgAxAOIAsgBCAFEAwgABAGIAoQBiALEAYgBCQBC7YFAgZ/D34jASEDIwFB0ABqJAEgA0IANwMAIANCADcDCCADQgA3AxAgA0IANwMYIANCADcDICADQgA3AyggA0IANwMwIANCADcDOCADQUBrQgA3AwAgA0IANwNIIANBQGshCANAIAEpAwAiCkL//////////wCDIQkgASkDCCAKQjiHfCILQv//////////AIMhCiABKQMQIAtCOId8IgxC//////////8AgyELIAEpAxggDEI4h3wiFkL//////////wCDIQwCQAJAIAEpAyAgFkI4h3wiFkIAUQR/IAxCAFEEfyALQgBRBH8gCkIAUQR/IAlCAFEEf0EABUEAIQQMBQsFQTghBCAKIQkMBAsFQfAAIQQgCyEJDAMLBUGoASEEIAwhCQwCCwVB4AEhBCAWIQkMAQshBAwBCwNAIAlCAn8hCiAEQQFqIQQgCUIBfEIDWgRAIAohCQwBCwsLIAYgBEEBdEgEQCAFBH8gB0EBdQUgAhCsAQshBCADIBdCAYYgDUI3h4QiFzcDSCAIIA1CAYZC/v////////8AgyAOQjeHhCINNwMAIAMgDkIBhkL+/////////wCDIA9CN4eEIg43AzggAyAPQgGGQv7/////////AIMgEEI3h4QiDzcDMCADIBBCAYZC/v////////8AgyARQjeHhCIQNwMoIAMgEUIBhkL+/////////wCDIBJCN4eEIhE3AyAgAyASQgGGQv7/////////AIMgE0I3h4QiEjcDGCADIBNCAYZC/v////////8AgyAUQjeHhCITNwMQIAMgFEIBhkL+/////////wCDIBVCN4eEIhQ3AwggAyAEQQFxrSAVQgGGQv7/////////AIOEIhU3AwAgBCEHIAVBAWpBB3EhBSAGQQFqIQYMAQsLIAAgAyABEHYgAyQBC5gBAQN/IwEhAiMBQfABaiQBIAEgASgCACIDQYABaiIENgIAIAQgASgCBEoEQCACJAFBAA8LIAEoAgggA2ohAyACQYgBaiIEIAJBKGoiASAAEJkBIAIgBBBBIAMgAhAcIAIgBEEwahBBIANBIGogAhAcIAIgARBBIANBQGsgAhAcIAIgAUEwahBBIANB4ABqIAIQHCACJAFBAQtWAgF/AX4jASECIwFBgAFqJAEgASgCKKwiAyADfkL///8fVgRAIAEQEQsgAiABECYgAkHQAGoiAUHgCxAEIAAgAUGQFikDACACEBAgAEECNgIoIAIkAQs0AQN/IwEhASMBQeAAaiQBIAFBMGoiAkHgCxAEIAEgABAEIAEgAhAhIAEQfyEDIAEkASADCzgBAn8jASEBIwFB4ABqJAEgASAAQeAAaiICEAggAiAAEAggARAkIAAgARAIIAAQBiACEAYgASQBC2EBBH8jASECIwFBkAFqJAEgAkHgAGoiAyABIAFBMGoiBBAHIAIgBBAnIAJBMGoiBSABIAEQByAFEAUgAEEwaiAFIAQQDSAAIAEgAhAHIAMQBSAAEAUgACADIAAQDSACJAELZAEEfyMBIQMjAUHAAWokASADQZABaiIEIAIgAkEwaiIFEAcgBCAEECcgA0HgAGoiBiAEIAUQByADQTBqIgUgBCACEAcgAyAGEAogACABIAMQByAAQTBqIAFBMGogBRAHIAMkAQuaBQEMfyMBIQcjAUGAA2okASAHQdACaiECIAdBoAJqIQYgB0HwAWohBCAHQZABaiEIIAdB4ABqIQNB4BgoAgBFBEAgAiAAQTBqIgUQLCAGIAUgAEHgAGoiARANIAQgARAsIAEgAiACEAcgARAFIAEgASABEAcgASABIAEQByABEAUgBCAEQZwWKAIAQQNsEDQgCCAEIAEQDSADIAIgBBAHIAMQBSABIAEgBhANIAYgBCAEEAcgBCAEIAYQByACIAIgBBAdIAIQBSADIAMgAhANIAMgAyAIEAcgBiAAIAUQDSACEAUgACACIAYQDSAAIAAgABAHIAAQBSAFIAMQCiAFEAUgByQBDwtBnBYoAgAiC0UiDARAIAdBgAgQGAsgAiAAECwgBiAAQTBqIgkQLCAEIABB4ABqIgoQLCAHQcABaiIFIAAgCRANIAUgBSAFEAcgBRAFIAdBMGoiASAKIAAQDSABIAEgARAHIAEQBSAMBEAgAyAEIAcQDQUgAyAEIAsQNAsgAyADIAEQHSAIIAMgAxAHIAgQBSADIAMgCBAHIAggBiADEB0gCBAFIAMgAyAGEAcgAxAFIAMgAyAIEA0gCCAIIAUQDSAFIAQgBBAHIAQgBCAFEAcgDARAIAEgASAHEA0FIAEgASALEDQLIAEgASAEEB0gASABIAIQHSABEAUgBSABIAEQByABIAEgBRAHIAEQBSAFIAIgAhAHIAIgAiAFEAcgAiACIAQQHSACEAUgAiACIAEQDSADIAMgAhAHIAIgCSAKEA0gAiACIAIQByACEAUgASABIAIQDSAAIAggARAdIAIgAiACEAcgAhAFIAYgBiAGEAcgBhAFIAogAiAGEA0gABAFIAkgAxAKIAkQBSAKEAUgByQBCyQAIAAgARAIIABB4ABqIAFB4ABqEAggAEHAAWogAUHAAWoQCAuGAQECfiAAIAApAwggACkDACIDQjiHfCICQv//////////AIM3AwggACAAKQMQIAJCOId8IgJC//////////8AgzcDECAAIAApAxggAkI4h3wiAkL//////////wCDNwMYIAAgACkDICACQjiHfDcDICAAIANC//////////8AgyABrH03AwALjQICBn8BfiMBIQMjAUGQAmokASADQbABaiEEIANB4ABqIQUgA0EwaiEIIANB2AFqIQZBACACayACIAJBAEgbIgcgASgCKGxBgICAIEgEQCAAIAEgBxBOGiAAIAEoAiggB2w2AigFIANCADcDACADQgA3AwggA0IANwMQIANCADcDGCADQgA3AyAgAyAHED8gAxAFIAhBwAwQBCAFIAMgCBAbIARB4AsQBCAGIARBkBYpAwAiCSAFEBAgBkECNgIoIAEoAihB////D0oEQCABEBELIAUgASAGEBsgBEHgCxAEIAAgBCAJIAUQECAAQQI2AigLIAJBf0oEQCADJAEPCyAAIAAQJyAAEAUgAyQBC5IBAQR/IwEhAyMBQaACaiQBIAMgASABQeAAaiIEEA4gA0HgAGoiAiAEEAggA0HAAWoiBSABIAQQDCACECQgAiABIAIQDCAFEAYgAhAGIAAgBSACEA4gAiADEAggAhAkIAIgAiADEAwgAhAGIAIgAhAfIAAgACACEAwgAEHgAGoiASADIAMQDCAAEAYgARAGIAMkAQtaAQN/IwEhAiMBQcABaiQBIAEQBiABQeAAaiIDEAYgAkHgAGoiBCABIAMQDCAEIAQQHyACIAQgAxAMIABB4ABqIgMgBCABEAwgACACEAggABAGIAMQBiACJAELXgEEfyMBIQIjAUHAAWokASACQeAAaiIDIAEQLyACIAMgARAOIAAgAhBqIABBwAFqIgQgAhBqIABBgANqIgUgAhBqIAQgBCABEF4gBSAFIAMQXiAAQQU2AsAEIAIkAQtSACAAIAEpAwAgAikDAHw3AwAgACABKQMIIAIpAwh8NwMIIAAgASkDECACKQMQfDcDECAAIAEpAxggAikDGHw3AxggACABKQMgIAIpAyB8NwMgCwkAIAAgARCYAQtzAQN/IwEhASMBQeABaiQBIAFCATcDACABQgA3AwggAUIANwMQIAFCADcDGCABQgA3AyAgAUEwaiICQcAMEAQgAUHgAGoiAyABIAIQGyABQbABaiICQeALEAQgACACQZAWKQMAIAMQECAAQQI2AiggASQBCxgAIAAgASACEA0gAEEwaiABQTBqIAIQDQsNACAAEBEgAEEwahARCzkAIAAgAUYEQA8LIAAgARAXIABBwAFqIAFBwAFqEBcgAEGAA2ogAUGAA2oQFyAAIAEoAsAENgLABAu/AQEEfyMBIQQjAUHQAmokASAEQShqIgYgAhAvIARB6AFqIgMgARAvIARBiAFqIgUgAyABEA4gBEGACBAEIAMgBBAjIANCADcDMCADQgA3AzggA0IANwNAIANCADcDSCADQgA3A1AgA0EBNgJYIAMQugEgBSADIAUQDCAFEDwgBiAFEFQEfyAAIAEQCCAAQeAAaiACEAggAEHAAWoQYCAEJAFBAQUgABBEIABB4ABqEGAgAEHAAWoQRCAEJAFBAAsLhgEBAn4gACAAKQMIIAApAwAiA0I4h3wiAkL//////////wCDNwMIIAAgACkDECACQjiHfCICQv//////////AIM3AxAgACAAKQMYIAJCOId8IgJC//////////8AgzcDGCAAIAApAyAgAkI4h3w3AyAgACABrCADQv//////////AIN8NwMAC1IBA38QAyEDIAAjACgCACICaiIBIAJIIABBAEpxIAFBAEhyBEAgARABGkEMEABBfw8LIAEgA0oEQCABEAJFBEBBDBAAQX8PCwsjACABNgIAIAILOQEBfyMBIQIjAUGAAWokASACEHsgAiABEHwgAkHQAGoiAUHgCxAEIAAgAUGQFikDACACEBAgAiQBCyIBAX8gACABEAggAEHgAGoiAiABQeAAahAfIAAQBiACEAYLDgAgABBEIABB4ABqEEQLVgAgAEIANwMAIABCADcDCCAAQgA3AxAgAEIANwMYIABCADcDICAAQQE2AiggAEIANwMwIABCADcDOCAAQgA3A0AgAEIANwNIIABCADcDUCAAQQE2AlgL7AEBBX8jASEDIwFBgAZqJAEgA0HABGoiAiABEBcgACABEDUgAyAAIAAQCyAAIAMgABALIAAQDyACIAIQUSACIAIgAhALIAAgACACEAsgA0GAA2oiAiABQYADaiIGEDUgAhAuIAMgAiACEAsgAiACIAMQCyACEA8gA0HAAWoiBSABQcABaiIEEDUgAyAFIAUQCyAFIAUgAxALIAUQDyAAQcABaiIBIAQQQiABIAEgARALIABBgANqIgQgBhBRIAQgBCAEEAsgASACIAEQCyAEIAUgBBALIABBBTYCwAQgABAoIAEQKCAEECggAyQBCxgAIAAQLUUEQEEADwsgAEHgAGoQLUEARwuDAgEIfyMBIQIjAUHABGokASACQcABaiIGIABB4ABqIgcQCCAGECQgBhAGIAJB4ANqIgMgBxAvIAMQJCACQYADaiIFIAYgAEHAAWoiARAOIAJBoAJqIgQgARAvIAEgAyADEAwgARAGIAEgASABEAwgASABIAEQDCABEAYgBCAEQZwWKAIAQQNsEFIgAkHgAGoiCCAEIAEQDiACIAMgBBAMIAIQBiABIAEgBRAOIAUgBCAEEAwgBCAEIAUQDCAEEAYgAyADIAQQMCADEAYgAiACIAMQDiAHIAIgCBAMIAUgACAGEA4gAxAGIAAgAyAFEA4gACAAIAAQDCAAEAYgBxAGIAIkAQuaAQEEfiAAIAApAwgiA0E4IAFrrSIEhkL//////////wCDIAApAwAgAa0iAoeENwMAIAAgACkDECIFIASGQv//////////AIMgAyACh4Q3AwggACAAKQMYIgMgBIZC//////////8AgyAFIAKHhDcDECAAIAApAyAiBSAEhkL//////////wCDIAMgAoeENwMYIAAgBSAChzcDIAsYACAAEC0EQCAAQTBqEC0EQEEBDwsLQQALYQECfyAAIAFGBEAgAEGAA2ohAiAAQcABaiEDBSAAIAEQFyAAQcABaiIDIAFBwAFqEBcgAEGAA2oiAiABQYADahAXIAAgASgCwAQ2AsAECyAAIAAQQiADIAMQUSACIAIQQguhAQEBfyMBIQMjAUEwaiQBIAMgASkDADcDACADIAEpAwg3AwggAyABKQMQNwMQIAMgASkDGDcDGCADIAEpAyA3AyAgAyACECEgACACKQMAIAMpAwB9NwMAIAAgAikDCCADKQMIfTcDCCAAIAIpAxAgAykDEH03AxAgACACKQMYIAMpAxh9NwMYIAAgAikDICADKQMgfTcDICAAIAIQISADJAELnwEBAn8jASEEIwFBsAFqJAEgBEEwaiIFIAEpAwA3AwAgBSABKQMINwMIIAUgASkDEDcDECAFIAEpAxg3AxggBSABKQMgNwMgIAQgAikDADcDACAEIAIpAwg3AwggBCACKQMQNwMQIAQgAikDGDcDGCAEIAIpAyA3AyAgBSADECEgBCADECEgBEHgAGoiASAFIAQQGyAAIAEgAxB2IAQkAQuOAQECfiAAIAApAwAiA0L//////////wCDNwMAIAAgACkDCCADQjiHfCICQv//////////AIM3AwggACAAKQMQIAJCOId8IgJC//////////8AgzcDECAAIAApAxggAkI4h3wiAkL//////////wCDNwMYIAAgACkDICACQjiHfDcDICADp0EBIAF0QX9qcQvOAwEIfiACrCIEQv////8AgyEDIAAgBEIchyIEIAEpAwAiBkL/////AIMiBX4gAyAGQhyHIgZ+fCIHQhyGQoCAgID/////AIMgAyAFfnwiBUL//////////wCDNwMAIAAgASkDCCIIQv////8AgyIJIAR+IAhCHIciCCADfnwiCkIchkKAgICA/////wCDIAQgBn4gB0Ich3wgBUI4iHwgAyAJfnx8IgZC//////////8AgzcDCCAAIAEpAxAiBUL/////AIMiByAEfiADIAVCHIciBX58IglCHIZCgICAgP////8AgyAEIAh+IApCHId8IAZCOId8IAMgB358fCIGQv//////////AIM3AxAgACAEIAEpAxgiB0L/////AIMiCH4gAyAHQhyHIgd+fCIKQhyGQoCAgID/////AIMgBCAFfiAJQhyHfCAGQjiHfCADIAh+fHwiBkL//////////wCDNwMYIAAgBCABKQMgIgVC/////wCDIgh+IAMgBUIchyIFfnwiCUIchkKAgICA/////wCDIAQgB34gCkIch3wgBkI4h3wgAyAIfnx8IgNC//////////8AgzcDICAEIAV+IAlCHId8IANCOId8C8oCAgV/Bn4jASEDIwFBMGokASAAKQMIIQggAyIBQQhqIQQgACkDECEJIAApAxghByAAKQMgIQogASAAKQMAIgZC//////////8AgyILNwMAIAQgBkI4hyAIfCIGQv//////////AIMiCDcDACABQRBqIgUgBkI4hyAJfCIGQv//////////AIMiCTcDACABQRhqIgAgByAGQjiHfCIGQv//////////AIMiBzcDACABIAogBkI4h3wiBjcDICAGQgBRBH8gB0IAUQRAIAlCAFEEfyAIQgBRBH8gC0IAUQR/IAMkAUEADwUgAQsFQTghAiAECwVB8AAhAiAFCyEABUGoASECCyAAKQMAIgZCAFEEfyADJAEgAg8FIAILBUHgAQshAANAIAZCAn8hByAAQQFqIQAgBkIBfEIDWgRAIAchBgwBCwsgAyQBIAALTAEDfyMBIQIjAUHgAGokASACQTBqIgMgABAEIAMgACgCKDYCKCACIAEQBCACIAEoAig2AiggAxARIAIQESADIAIQV0UhBCACJAEgBAsiAQF/IABB4ABqIgIgAUHgAGoQCCAAIAEQHyAAEAYgAhAGCxgAIAAgASACEDQgAEEwaiABQTBqIAIQNAsaACAAIAEQCiAAQTBqIgAgAUEwahAnIAAQBQsfACAAIAEQUARAIABBMGogAUEwahBQBEBBAQ8LC0EAC7sBAQJ/IwEhAyMBQeAAaiQBIAMgAhAjIAMgAxAsIAMQESADQTBqIgQgARAjIAQgBBBzIAMgBBBQBH8gACABECMgAEEwaiACECMgAEHgAGoQOiADJAFBAQUgAEIANwMAIABCADcDCCAAQgA3AxAgAEIANwMYIABCADcDICAAQQE2AiggAEEwahA6IABCADcDYCAAQgA3A2ggAEIANwNwIABCADcDeCAAQgA3A4ABIABBATYCiAEgAyQBQQALC28BBH8jASEBIwFB4ABqJAEgAEHgAGohAiAAEC0EQCACEC0EQCABJAEPCwsgAUEwaiIDEDogAiADEFAEQCABJAEPCyABIAIQaCAAIAAgARANIABBMGoiBCAEIAEQDSAEEBEgABARIAIgAxAKIAEkAQvnAQEOfiABKQMgIgIgACkDICIDhUL//////////wF8QjiIQgGDIgQgASkDGCIFIAApAxgiBoVC////////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4ANqEA4LIAAoAsAEQQRHBEAgByAAQeADaiALEA4LCyADIAIQNiAGIAggAxALIAQgBCADEAsgAhAuIAUgBSACEAsgBBAPBSAHQX5xQQJGBEAgACABEGEgAyQBDwsgBCAAQcABaiIFEBcgCSAAIAEQGSABQcABaiEHIAEoAsAEQQJGBEAgCCAFIAcQjQEFIAggBSAHEF4LIAUgACAFEAsgAyABEBcgAyADIAcQDCADEA8gBRAPIAUgBSADEBkgBCAEIABBgANqIgYQCyAEEA8gASgCwARBAkYEQCAEIAQgBxCNAQUgBCAEIAcQXgsgAiAJEDYgAyAIEDYgBSAFIAIQCyAFIAUgAxALIAQgBCADEAsgCCAIIAIQCyACIAAgBhALIAIQDyAEEA8gAiABIAIQGSAGIAggAhALCyAEEC4gACAJIAQQCwJ/IAAhDCAAQQU2AsAEIAwLEA8gBRAPIAYQDyADJAELFgAgAEHgAGoiABAGIAAgABAfIAAQBgt1AQR/IwEhASMBQcABaiQBIAAQSSAAQcABaiICEElxBEAgASQBDwsgAUHgAGoiBBBgIAIQvAEEQCAAEDwgAEHgAGoQPAUgASACEI4BIAAgACABEA4gAEHgAGoiAyADIAEQDiAAEDwgAxA8IAIgBBAICyABJAELmgEBA34gACAAKQMgIAGtIgOGIAApAxgiAkE4IAFrrSIEh4Q3AyAgACACIAOGQv//////////AIMgACkDECICIASHhDcDGCAAIAIgA4ZC//////////8AgyAAKQMIIgIgBIeENwMQIAAgAiADhkL//////////wCDIAApAwAiAiAEh4Q3AwggACACIAOGQv//////////AIM3AwALVgEBfwNAIAFBA3QgAGogAUEBakEDdCAAaikDAEI3hkL//////////wCDIAFBA3QgAGopAwBCAYeENwMAIAFBAWoiAUEESA0ACyAAIAApAyBCAYc3AyALtQQBEX8jASEDIwFBoBxqJAEgA0HwBGoiBUHwDBAYIANBwARqIgZBoA0QGCADQcABaiINIAUgBhCPASACEEYEQCADJAEPCyADQcAbaiEOIANB4BpqIQsgA0GgGWohDyADQeAXaiEQIANBoBZqIREgA0HYEWohBCADQZANaiEHIANB4ABqIglBwAkQBCADQTBqIgwgCUEGEE4aIAxBAhAz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BEAgCiEDDAELCwsgCUEBaiAHaiABOgAAIAAgAUEYdEEYdUF/akECbSIBQZABbCACahAKIAsgAUGQAWwgAmpBMGoQCiAMIAFBkAFsIAJqQeAAahAKIAhBeUoEQCAJIQEDQCAGIAIgASAHaiwAABCSASAAEDEgABAxIAAQMSAAEDEgACAGECAgAUF/aiEDIAFBAEoEQCADIQEMAQsLCyAHQcgMaiIBIAUQCiABQTBqIgMgDRAKIAFB4ABqIA4QCiADIAMQJyADEAUgACABECAgABBWIAckAQvXAQEDfyMBIQMjAUGQAWokASADQdgAaiIEIAEQIyAEIAQQcyAEIANBKGoiBRC1AUUEQCAAQgA3AwAgAEIANwMIIABCADcDECAAQgA3AxggAEIANwMgIABBATYCKCAAQTBqEDogAEIANwNgIABCADcDaCAAQgA3A3AgAEIANwN4IABCADcDgAEgAEEBNgKIASADJAFBAA8LIAAgARAjIABBMGoiASAEIAUQtAEgAyABEEEgAiADKQMAQgKBp0cEQCABIAEQJwsgARARIABB4ABqEDogAyQBQQELZQEBfyMBIQIjAUEwaiQBIAIgARAsIAIgAiABEA1B4BgoAgBBfUYEQCAAIAEQJyAAEAUgACAAQQMQNCAAEAUgACACIAAQBwUgACACEAoLIAJBgAgQGCAAIAIgABAHIAAQESACJAELVAEDfyMBIQMjAUHgAGokASADIAEQLyAAIAAQUyAAQeAAaiICIAIQUyAAQcABaiIEIAQQUyAEEDwgACADIAAQDiACIAMgAhAOIAIgASACEA4gAyQBC2wBBX8jASECIwFBwAFqJAEgAkHgAGoiAyAAIAFBwAFqIgQQDiACIAEgAEHAAWoiBRAOIAMgAhBURQRAIAIkAUEADwsgAyAAQeAAaiAEEA4gAiABQeAAaiAFEA4gAyACEFRBAEchBiACJAEgBgvDDAIFfx9+An8jASEHIwFB0ABqJAEgASABKQMAIghC//////////8AgyITNwMAIAEgASkDCCAIQjiHfCIIQv//////////AIMiFTcDCCABIAEpAxAgCEI4h3wiCEL//////////wCDIhY3AxAgASABKQMYIAhCOId8IghC//////////8AgyIXNwMYIAEgASkDICAIQjiHfCIIQv//////////AIMiGDcDICABIAEpAyggCEI4h3wiCEL//////////wCDIhk3AyggASABKQMwIAhCOId8IghC//////////8AgyIaNwMwIAEgASkDOCAIQjiHfCIIQv//////////AIMiGzcDOCABQUBrIgUpAwAgCEI4h3wiCEL//////////wCDIRQgBSAUNwMAIAEgASkDSCAIQjiHfCIcNwNIIAcLIgMgAikDACIINwMAIAMgAikDCCIRNwMIIAMgAikDECIKNwMQIAMgAikDGCILNwMYIAMgAikDICIJQv//////////AIMiDDcDICADIAlCOIciCTcDKCADQgA3AzAgA0IANwM4IANCADcDQCADQgA3A0ggASADEHdBAEgEQCAAIBM3AwAgACABKQMINwMIIAAgASkDEDcDECAAIAEpAxg3AxggACABKQMgNwMgIAMkAQ8LIANBQGshBkEAIQIDQCADIBJCAYYgDUI3h4QiEjcDSCAGIA1CAYZC/v////////8AgyAOQjeHhCINNwMAIAMgDkIBhkL+/////////wCDIA9CN4eEIg43AzggAyAPQgGGQv7/////////AIMgCUI3h4QiDzcDMCADIAlCAYZC/v////////8AgyAMQjeHhCIJNwMoIAMgDEIBhkL+/////////wCDIAtCN4eEIgw3AyAgAyALQgGGQv7/////////AIMgCkI3h4QiCzcDGCADIApCAYZC/v////////8AgyARQjeHhCIKNwMQIAMgEUIBhkL+/////////wCDIAhCN4eEIhE3AwggAyAIQgGGQv7/////////AIMiCDcDACACQQFqIQIgASADEHdBf0oNAAsDQCATQQAgHCASQgGHIh19IBQgEkI3hkKAgICAgICAwACDIA1CAYeEIhJ9IBsgDUI3hkKAgICAgICAwACDIA5CAYeEIg19IBogDkI3hkKAgICAgICAwACDIA9CAYeEIg59IBkgD0I3hkKAgICAgICAwACDIAlCAYeEIg99IBggCUI3hkKAgICAgICAwACDIAxCAYeEIgl9IBcgDEI3hkKAgICAgICAwACDIAtCAYeEIgx9IBYgC0I3hkKAgICAgICAwACDIApCAYeEIgt9IBUgCkI3hkKAgICAgICAwACDIBFCAYeEIgp9IBMgEUI3hkKAgICAgICAwACDIAhCAYeEIgh9Ih5COId8Ih9COId8IiBCOId8IiFCOId8IiJCOId8IiNCOId8IiRCOId8IiVCOId8IiZCOId8IhFCP4inQQFza6wiECATIB5C//////////8Ag4WDhSETIBUgECAVIB9C//////////8Ag4WDhSEVIBYgECAWICBC//////////8Ag4WDhSEWIBcgECAXICFC//////////8Ag4WDhSEXIBggECAYICJC//////////8Ag4WDhSEYIBkgECAZICNC//////////8Ag4WDhSEZIBogECAaICRC//////////8Ag4WDhSEaIBsgECAbICVC//////////8Ag4WDhSEbIBQgECAUICZC//////////8Ag4WDhSEUIBwgECARIByFg4UhHCACQX9qIQQgAkEBSgRAIAQhAiAKIREgCyEKIAwhCyAJIQwgDyEJIA4hDyANIQ4gEiENIB0hEgwBCwsgAyAINwMAIAMgCjcDCCADIAs3AxAgAyAMNwMYIAMgCTcDICADIA83AyggAyAONwMwIAMgDTcDOCAGIBI3AwAgAyAdNwNIIAEgEzcDACABIBU3AwggASAWNwMQIAEgFzcDGCABIBg3AyAgASAZNwMoIAEgGjcDMCABIBs3AzggBSAUNwMAIAEgHDcDSCAAIBM3AwAgACABKQMINwMIIAAgASkDEDcDECAAIAEpAxg3AxggACABKQMgNwMgIAMkAQupAwEdfiABKQNIIgQgACkDSCIFhUL//////////wF8QjiIQgGDIgYgAUFAaykDACIHIABBQGspAwAiCIVC//////////8BfEI4iIMiCSABKQM4IgogACkDOCILhUL//////////wF8QjiIgyIMIAEpAzAiDSAAKQMwIg6FQv//////////AXxCOIiDIg8gASkDKCIQIAApAygiEYVC//////////8BfEI4iIMiEiABKQMgIhMgACkDICIUhUL//////////wF8QjiIgyIVIAEpAxgiFiAAKQMYIheFQn98QjiIgyIYIAEpAxAiGSAAKQMQIhqFQn98QjiIgyIbIAApAwgiAiABKQMIIgOFQn98QjiIgyIcIAEpAwAiHSAAKQMAIh6FQn98QjiIgyAcIB0gHn1COIiDIAMgAn1COIggG4MgGCAZIBp9QjiIgyAVIBYgF31COIiDIBIgEyAUfUI4iIMgDyAQIBF9QjiIgyAMIA0gDn1COIiDIAkgCiALfUI4iIMgBiAHIAh9QjiIgyAEIAV9QjiIQgGDhISEhISEhISEQgGGfKdBf2oLqwEAIAAgASkDACACKQMAfDcDACAAIAEpAwggAikDCHw3AwggACABKQMQIAIpAxB8NwMQIAAgASkDGCACKQMYfDcDGCAAIAEpAyAgAikDIHw3AyAgACABKQMoIAIpAyh8NwMoIAAgASkDMCACKQMwfDcDMCAAIAEpAzggAikDOHw3AzggAEFAayABQUBrKQMAIAJBQGspAwB8NwMAIAAgASkDSCACKQNIfDcDSAurAQAgACABKQMAIAIpAwB9NwMAIAAgASkDCCACKQMIfTcDCCAAIAEpAxAgAikDEH03AxAgACABKQMYIAIpAxh9NwMYIAAgASkDICACKQMgfTcDICAAIAEpAyggAikDKH03AyggACABKQMwIAIpAzB9NwMwIAAgASkDOCACKQM4fTcDOCAAQUBrIAFBQGspAwAgAkFAaykDAH03AwAgACABKQNIIAIpA0h9NwNIC1IAIAAgASkDACACKQMAfTcDACAAIAEpAwggAikDCH03AwggACABKQMQIAIpAxB9NwMQIAAgASkDGCACKQMYfTcDGCAAIAEpAyAgAikDIH03AyALSwAgAEIANwMAIABCADcDCCAAQgA3AxAgAEIANwMYIABCADcDICAAQgA3AyggAEIANwMwIABCADcDOCAAQUBrQgA3AwAgAEIANwNIC2gAIAAgASkDADcDACAAIAEpAwg3AwggACABKQMQNwMQIAAgASkDGDcDGCAAIAEpAyBC//////////8AgzcDICAAIAEpAyBCOIc3AyggAEIANwMwIABCADcDOCAAQgA3A0AgAEIANwNIC5wCAgF/AX4gACAAKQMAIgJC//////////8AgzcDACAAIAApAwggAkI4h3wiAkL//////////wCDNwMIIAAgACkDECACQjiHfCICQv//////////AIM3AxAgACAAKQMYIAJCOId8IgJC//////////8AgzcDGCAAIAApAyAgAkI4h3wiAkL//////////wCDNwMgIAAgACkDKCACQjiHfCICQv//////////AIM3AyggACAAKQMwIAJCOId8IgJC//////////8AgzcDMCAAIAApAzggAkI4h3wiAkL//////////wCDNwM4IABBQGsiASkDACACQjiHfCECIAEgAkL//////////wCDNwMAIAAgACkDSCACQjiHfDcDSAteAQF/IwEhAiMBQeAAaiQBIAIgASgCCBATIAJBMGoiAUHgCxAEIAIgARAhA0ACQCAAIAJBABByGiACQQEQPyACEAUgABBGRQRAIAAQlAEgABBGRQ0BCwwBCwsgAiQBCzEAIAApAyAgACkDGCAAKQMQIAApAwAgACkDCISEhIRC//////////8BfEI4iKdBAXELfgEDfyMBIQkjAUGAA2okASAJQbAIEAQgCUHgAGoiCkGwCBAEIAlBMGoiCyAKIAAQKiAKIAEQFSAJQfABaiIAIAIQFSAKIAsQGiAAIAsQGiAGIAMgBCABIAIgCiAAIAcQgQEgCCAHIAUgCRBMIAggCCALEDggCCAJECEgCSQBC4cDAQJ/IwEhCCMBQZAEaiQBIAAEfyAIIAApAAA3AAAgCCAAKQAINwAIIAggACkAEDcAECAIIAApABg3ABhBIAVBAAshCSAIQdADaiIAQQA2AgAgAEGmAyAJazYCBCAAIAggCWo2AgggACABEBYgAEEANgIAIABBpgMgCUHBAHIiAWs2AgQgACABIAhqNgIIIAAgAhAWIABBADYCACAAQeUCIAFrNgIEIAAgCCABQcEAamo2AgggACADEBYgAEEANgIAIABBpgMgCUHDAXIiAWs2AgQgACABIAhqNgIIIAAgBBAWIABBADYCACAAQeUCIAFrNgIEIAAgCCABQcEAamo2AgggACAFEBYgAEEANgIAIABBpAIgAWs2AgQgACAIIAFBggFqajYCCCAAIAYQFiAAIAFBwwFqIgE2AgAgACABNgIEIAAgCDYCCCAIQfgDaiIBQQA2AgAgAUEgNgIEIAEgCEGwA2oiAjYCCCABIAAQIiAHIAIQEyAAQbAIEAQgByAAECEgCCQBC8gCAQh/IwEhByMBQcC+AmokASAAEEYEQCAHJAFBAA8LIAdBsAgQBCAHQfABaiIIQaAKEBggCEEwakHQChAYIAdB4L0CaiIKQYALEBggCkEwakGwCxAYIAdBkLgCaiINIAggChA+GiAIQbAIEAQgB0HAAWoiCSAIIAYQKiAIQbAIEAQgB0GQAWoiCyAIIAYQKiAHQeAAaiIKIAkgBxBLIAdBMGoiBiALIAcQSyAHQdC8AmoiDCAAEBUgDCAJEBogB0HAuwJqIgkgARAVIAkgChAaIAdBsLoCaiIBIAIQFSABIAYQGiAJIAEQICABIAAQFSABIAMQICABIAsQGiAIELEBIAggBSAMEGcgCCANIAkQZyAIIAQgARBnIAdByLMCaiIBIAgQsAEgARCuASAHQYCvAmoiABAJIAEgABCRAUEARyEOIAckASAOC6ABAQd/IwEhByMBQdAFaiQBIAdBMGoiCEGwCBAEIAdB4ABqIgogBSAIEEsgB0G4BGoiCCAAEBUgB0GoA2oiCyACEBUgB0GYAmoiCSABEBUgB0GIAWoiDCADEBUgCCAGEBogCyAKEBogCSAGEBogDCAKEBogCCALECAgCSAMECAgBCACIAMgACABIAggCSAHEIEBIAUgBxBXRSENIAckASANC5MCAQJ/IwEhBSMBQdACaiQBIAAEfyAFIAApAAA3AAAgBSAAKQAINwAIIAUgACkAEDcAECAFIAApABg3ABhBIAVBAAshBiAFQZACaiIAQQA2AgAgAEHjASAGazYCBCAAIAUgBmo2AgggACABEBYgAEEANgIAIABB4wEgBkHBAHIiAWs2AgQgACABIAVqNgIIIAAgAhAWIABBADYCACAAQaIBIAFrNgIEIAAgAUHBAGogBWo2AgggACADEBYgACAGQcMBciIBNgIAIAAgATYCBCAAIAU2AgggBUG4AmoiAUEANgIAIAFBIDYCBCABIAVB8AFqIgI2AgggASAAECIgBCACEBMgAEGwCBAEIAQgABAhIAUkAQv0AQEFfyMBIQQjAUGwCWokASAEQTBqIgVBsAgQBCAEQeAAaiIHIAIgBRBLIARB+AZqIgUgABAyIARB2ARqIgYgARAyIAUgAxA5IAYgBxA5IAUgBhApIARBmAlqIgNBADYCACADQYADNgIEIAMgBEGQAWoiBjYCCCABIAMQKxogACADECsaIAUgAxArGiAEQbAEaiIAIAMoAgAiATYCACAAIAE2AgQgACAGNgIIIARBpAlqIgFBADYCACABQSA2AgQgASAEQZAEaiIDNgIIIAEgABAiIAQgAxATIABBsAgQBCAEIAAQISACIAQQV0UhCCAEJAEgCAveAwEDfyMBIQIjAUEQaiQBIAAgACgCACIEQcEAaiIDNgIAAkAgAyAAKAIEIgNKDQAgAkEANgIAIAIgAyAEazYCBCACIAAoAgggBGo2AgggASACECVFDQAgACAAKAIAIgRBwQBqIgM2AgAgAyAAKAIEIgNKDQAgAkEANgIAIAIgAyAEazYCBCACIAQgACgCCGo2AgggAUGQAWogAhAlRQ0AIAAgACgCACIEQcEAaiIDNgIAIAMgACgCBCIDSg0AIAJBADYCACACIAMgBGs2AgQgAiAEIAAoAghqNgIIIAFBoAJqIAIQJUUNACAAIAAoAgAiBEHBAGoiAzYCACADIAAoAgQiA0oNACACQQA2AgAgAiADIARrNgIEIAIgBCAAKAIIajYCCCABQbADaiACECVFDQAgACAAKAIAIgRBwQBqIgM2AgAgAyAAKAIEIgNKDQAgAkEANgIAIAIgAyAEazYCBCACIAQgACgCCGo2AgggAUHABGogAhAlRQ0AIAAgACgCACIEQSBqIgM2AgAgAyAAKAIESg0AIAFB0AVqIAQgACgCCGoQEyAAIAAoAgAiBEEgaiIDNgIAIAMgACgCBEoNACABQfgFaiAEIAAoAghqEBMgAiQBQQEPCyACJAFBAAuYAgEEfyAAIAJqIQQgAUH/AXEhAyACQcMATgRAA0AgAEEDcQRAIAAgAzoAACAAQQFqIQAMAQsLIANBCHQgA3IgA0EQdHIgA0EYdHIhASAEQXxxIgVBQGohBgNAIAAgBkwEQCAAIAE2AgAgACABNgIEIAAgATYCCCAAIAE2AgwgACABNgIQIAAgATYCFCAAIAE2AhggACABNgIcIAAgATYCICAAIAE2AiQgACABNgIoIAAgATYCLCAAIAE2AjAgACABNgI0IAAgATYCOCAAIAE2AjwgAEFAayEADAELCwNAIAAgBUgEQCAAIAE2AgAgAEEEaiEADAELCwsDQCAAIARIBEAgACADOgAAIABBAWohAAwBCwsgBCACawv9BwEJfyMBIQUjAUGABmokASAFQSBqIQQgAEEANgJcIABCADcCACAAQgA3AgggAEIANwIQIABCADcCGCAAQgA3AiAgAEIANwIoIABCADcCMCAAQgA3AjggAEFAa0IANwIAIABCADcCSCAAQQA2AlAgAUEASgR/IAQQXANAIAQgAiADaiwAABBbIANBAWoiAyABRw0ACyAEIAUQWSAAQdgAaiEHIABB1ABqIQYgAEFAayEIQQAhAQN/IAUgAUECdCICQQNyai0AAEEYdCACIAVqLQAAIAJBAXIgBWotAABBCHRyIAUgAkECcmotAABBEHRyciECIAdBADYCACAGQQA2AgAgACACIAAoAgBzNgIAIAAgACgCIEEBczYCICAIIAJBf2oiAyAIKAIAczYCACAAQQIgAmsiAiAAKAIMczYCDCAAIAMgAmsiAyAAKAIsczYCLCAAIAIgA2siAiAAKAJMczYCTCAAIAMgAmsiAyAAKAIYczYCGCAAIAIgA2siAiAAKAI4czYCOCAAIAMgAmsiAyAAKAIEczYCBCAAIAIgA2siAiAAKAIkczYCJCAAIAMgAmsiAyAAKAJEczYCRCAAIAIgA2siAiAAKAIQczYCECAAIAMgAmsiAyAAKAIwczYCMCAAIAIgA2siAiAAKAJQczYCUCAAIAMgAmsiAyAAKAIcczYCHCAAIAIgA2siAiAAKAI8czYCPCAAIAMgAmsiAyAAKAIIczYCCCAAIAIgA2siAiAAKAIoczYCKCAAIAMgAmsiAyAAKAJIczYCSCAAIAIgA2siAiAAKAIUczYCFCAAIAAoAjQgAyACa3M2AjRBACEEQQAhAgNAIAYgAkEBajYCACACQRROBEAgBkEANgIAQQAhAkEPIQMDQEEAIAMgA0EVRhsiCkECdCAAaigCACIJIAJBAnQgAGoiCygCAGsgBygCAGshAyADIAlHBEAgByADIAlLNgIACyALIAM2AgAgCkEBaiEDIAJBAWoiAkEVRw0ACwsgBEEBaiIEQZDOAEcEQCAGKAIAIQIMAQsLIAFBAWoiAUEIRw0AIAALBSAAQdgAaiEHIABB1ABqIQYgAAshASAFQYwDaiIIEFxBACEEA0AgBiAGKAIAIgJBAWoiAzYCACAIIAJBFEgEfyADQQJ0IABqBSAGQQA2AgBBACECQQ8hAwN/QQAgAyADQRVGGyIKQQJ0IABqKAIAIgkgAkECdCAAaiILKAIAayAHKAIAayEDIAMgCUcEQCAHIAMgCUs2AgALIAsgAzYCACAKQQFqIQMgAkEBaiICQRVHDQAgAQsLKAIAEFsgBEEBaiIEQYABRw0ACyAIIABB4ABqEFkgAEEANgJcIAUkAQufAQEBfyMBIQQjAUHgAGokASADIAAQCCAEIABB4ABqEAggAiAAQcABahAIIAEgBBAIIAEgASACEA4gAyADEC8gBCAEEC8gAiACEC8gASABIAEQDCABIAEQHyABEAYgARAkIAEQBiACIAJBnBYoAgBBA2wQUiADIANBAxBSIAQQJCAEEAYgAxAkIAMQBiACIAIgBBAwIAIQBiAAEEcgBCQBC84BAQJ/AkAgACABECtFDQAgAEGgAmogARArRQ0AIAEgASgCACICQSBqIgM2AgAgAyABKAIESg0AIAEoAgggAmogAEHABGoQHCABIAEoAgAiAkEgaiIDNgIAIAMgASgCBEoNACACIAEoAghqIABB6ARqEBwgASABKAIAIgJBIGoiAzYCACADIAEoAgRKDQAgAiABKAIIaiAAQZAFahAcIAEgASgCACICQSBqIgM2AgAgAyABKAIESg0AIAIgASgCCGogAEG4BWoQHEEBDwtBAAt9AQN/IwEhASMBQeABaiQBIAFCADcDACABQgA3AwggAUIANwMQIAFCADcDGCABQgA3AyAgAUEBED8gARAFIAFBMGoiAkHADBAEIAFB4ABqIgMgASACEBsgAUGwAWoiAkHgCxAEIAAgAkGQFikDACADEBAgAEECNgIoIAEkAQsoAQF/IwEhAiMBQTBqJAEgAkHgCxAEIAAgAkGQFikDACABEBAgAiQBCxoAIAAgASACEDsgAEHgAGogAUHgAGogAhA7C10BA38jASEDIwFB4ABqJAEgARAFIAFBMGoiBBAFIANBMGoiAiABECwgAyAEECwgAiACIAMQByACIAIQaCAAIAEgAhANIAIgAhAnIAIQBSAAQTBqIAQgAhANIAMkAQsRACAAIAEQCiAAQTBqIAIQCgskACAAIAEQFyAAQcABaiACEBcgAEGAA2ogAxAXIABBBTYCwAQLMgAgACABEG0EQCAAQcABaiABQcABahBtBEAgAEGAA2ogAUGAA2oQbQRAQQEPCwsLQQAL6QMBBX8jASEGIwFBkAFqJAEgACABIAJBH3ZBf2ogAiACQR91IgdzakECbSIEQX9qQR92IgMQEiAAQTBqIgIgAUEwaiADEBIgAEHgAGoiBSABQeAAaiADEBIgACABQZABaiAEQQFzQX9qQR92IgMQEiACIAFBwAFqIAMQEiAFIAFB8AFqIAMQEiAAIAFBoAJqIARBAnNBf2pBH3YiAxASIAIgAUHQAmogAxASIAUgAUGAA2ogAxASIAAgAUGwA2ogBEEDc0F/akEfdiIDEBIgAiABQeADaiAD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IANB4ANqIgU2AgggBCABECIgAEHABWoiDyAFEBMgAUGwCBAEIA8gARAhIABB6AVqIgsgDyANIAMQTCALIAsgBxA4IAsgAxAhIANBsAgQBCABQbAIEAQgByABIAAQKiAIIAYQMiAIIAcQOSACQQA2AgAgAkGAAzYCBCACIAo2AgggDCACECsaIAYgAhArGiAIIAIQKxogASACKAIAIgI2AgAgASACNgIEIAEgCjYCCCAEQQA2AgAgBEEgNgIEIAQgBTYCCCAEIAEQIiAAQZAGaiICIAUQEyABQbAIEAQgAiABECEgAEG4BmoiACACIA4gAxBMIAAgACAHEDggACADECEgCSAJKAIAQQZyNgIAIAMkAUEBC7QCAQJ+IAIgAikDCEI3hkKAgICAgICAwACDIAIpAwBCAYeEIgM3AwAgACABKQMAIAN9IgNC//////////8AgzcDACACIAIpAxBCN4ZCgICAgICAgMAAgyACKQMIQgGHhCIENwMIIAAgASkDCCAEfSADQjiHfCIDQv//////////AIM3AwggAiACKQMYQjeGQoCAgICAgIDAAIMgAikDEEIBh4QiBDcDECAAIAEpAxAgBH0gA0I4h3wiA0L//////////wCDNwMQIAIgAikDIEI3hkKAgICAgICAwACDIAIpAxhCAYeEIgQ3AxggACABKQMYIAR9IANCOId8IgNC//////////8AgzcDGCACIAIpAyBCAYciBDcDICAAIAEpAyAgBH0gA0I4h3wiAzcDICADQj+IpwssACACQYABSARAQQIPCyAAIAIgARCIASAAQZgMaiIAIAAoAgBBAXI2AgBBAQsNACAAQZgMakEANgIAC1oAIABCADcDACAAQgA3AwggAEIANwMQIABCADcDGCAAQgA3AyAgACABKQMANwMoIAAgASkDCDcDMCAAIAEpAxA3AzggAEFAayABKQMYNwMAIAAgASkDIDcDSAs6ACAAKQMgIAApAxggACkDCCAAKQMQhISEQv//////////AXxCOIhCAYMgACkDAEIBhUJ/fEI4h4OnC5cBAAJ/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAA4PAAECAwQFBgcICQoLDA0ODwtBqhYMDwtBrRYMDgtBsBYMDQtBvxYMDAtByhYMCwtB5BYMCgtB/RYMCQtBlRcM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8BdqIgQgASACEI8BIANByBJqIgEgABC+ASAAIAAQSiAAIAEQHiABIAAQPSAAIAQQNyAAIAQQNyAAIAEQHiABIAAgAxBuIANBKGoiAiABEEUgA0GADmoiBSABED0gBSACEB4gA0HwBGoiBiACED0gBiAEEDcgBiACEB4gBiAGEEUgBiACEB4gASAFIAMQbiAFIAAQSiADQbgJaiIHIAEQPSAHIAQQNyAHIAQQNyAHIAUQHiABIAEQSiACIAEQPSACIAQQNyACIAEQHiABIAEQRSAHIAEQHiABIAIgAxBuIAEgARBFIAEgARBKIAIgARAeIAAgBBA3IAUgABA9IAAgBBA3IAUgABAeIAAgBBA3IAUgABAeIAAgAhBFIAAgBhAeIAIgABA9IAIgBRAeIAAgBxAeIAAgABBFIAAgAhAeIAAQKCAAQcABahAoIABBgANqECggAyQBC5oBAQJ/IwEhBSMBQeAAaiQBIAIgABAIIAQgAEHgAGoQCCAFIABBwAFqEAggAyAFEAggBSAFIAFB4ABqIgYQDiADIAMgARAOIAIgAiADEDAgAhAGIAQgBCAFEDAgBBAGIAUgAhAIIAUgBSAGEA4gAyAEEAggAyADIAEQDiADIAMgBRAwIAMQBiAEIAQQHyAEEAYgACABECkgBSQBC08BAn8gABAJQcEAIQIDQCAAIAAQvwEgACACQcgEbCABaiIDEGIgAxBwIAJBf2ohAyACQQFLBEAgAyECDAELCyAAIAAQSiAAIAEQYiABEHALwQQAIABByKgCahAJIABBgKQCahAJIABBuJ8CahAJIABB8JoCahAJIABBqJYCahAJIABB4JECahAJIABBmI0CahAJIABB0IgCahAJIABBiIQCahAJIABBwP8BahAJIABB+PoBahAJIABBsPYBahAJIABB6PEBahAJIABBoO0BahAJIABB2OgBahAJIABBkOQBahAJIABByN8BahAJIABBgNsBahAJIABBuNYBahAJIABB8NEBahAJIABBqM0BahAJIABB4MgBahAJIABBmMQBahAJIABB0L8BahAJIABBiLsBahAJIABBwLYBahAJIABB+LEBahAJIABBsK0BahAJIABB6KgBahAJIABBoKQBahAJIABB2J8BahAJIABBkJsBahAJIABByJYBahAJIABBgJIBahAJIABBuI0BahAJIABB8IgBahAJIABBqIQBahAJIABB4P8AahAJIABBmPsAahAJIABB0PYAahAJIABBiPIAahAJIABBwO0AahAJIABB+OgAahAJIABBsOQAahAJIABB6N8AahAJIABBoNsAahAJIABB2NYAahAJIABBkNIAahAJIABByM0AahAJIABBgMkAahAJIABBuMQAahAJIABB8D9qEAkgAEGoO2oQCSAAQeA2ahAJIABBmDJqEAkgAEHQLWoQCSAAQYgpahAJIABBwCRqEAkgAEH4H2oQCSAAQbAbahAJIABB6BZqEAkgAEGgEmoQCSAAQdgNahAJIABBkAlqEAkgAEHIBGoQCSAAEAkLTAECfyAAKAIAIQIDQCACIAAoAgRIBEAgAiAAKAIIaiABIANqLAAAOgAAIAAgACgCAEEBajYCACACQQFqIQIgA0EBaiIDQSBIDQELCwuNAgECfyMBIQMjAUEQaiQBIABBmAxqKAIAQQhxRQRAIAMkAUEMDwsCQCACKAIAIgRBwQBIDQAgA0EANgIAIAMgBDYCBCADIAE2AgggAyAAQbAHahAWIARBggFIDQAgA0EANgIAIAMgBEG/f2o2AgQgAyABQcEAajYCCCADIABBwAhqEBYgBEHDAUgNACADQQA2AgAgAyAEQf5+ajYCBCADIAFBggFqNgIIIAMgAEHQCWoQFiAEQYQCSA0AIANBADYCACADIARBvX5qNgIEIAMgAUHDAWo2AgggAyAAQeAKahAWIARBpAJIDQAgAUGEAmogAEHwC2oQHCACQaQCNgIAIAMkAUEBDwsgAyQBQQYLkwMCBn8CfiMBIQQjAUGgA2okASAEQTBqIQMgBEHAAmohBSACBEAgBSACEAQgBUEoaiIIIAIoAig2AgAFIANB4AsQBCADQQEQMyADEGYgA0EBEDMgA0EBEEggBSABIAMQaSAFQShqIQgLIARBkAwQBCAEQeAAaiICQcAMEAQgBEGQAWoiBiAEIAIQGyADQeALEAQgBEHwAmoiAiADQZAWKQMAIgkgBhAQIAJBAjYCKCAIKAIArCIKIAp+Qv///x9WBEAgBRARCyAGIAUQJiADQeALEAQgBEGQAmoiByADIAkgBhAQIAdBAjYCKCABKAIoQf///w9KBEAgBxARCyAEQeABaiECIAYgByABEBsgA0HgCxAEIAcgAyAJIAYQECAHQQI2Aigg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ZykpFIUKtyc4IRsu/G0sTRMNOFNUcwpluwpqdi7JwoGFLHKSoei/oktmGqhwi0vCo1FsxxnoktEkBpnWhTUO9HCgahAWwaQZCGw3Hkx3SCe1vLA0swwcOUqq2E5Pypxb828uaO6Cj3RvY6V4FHjIhAgCx4z6/76Q62xQpPej+b7yeHHGIq4o15gvikLNZe8jkUQ3cS87TezP+8C1vNuJgaXbtek4tUjzW8JWORnQBbbxEfFZm08Zr6SCP5IYgW3a1V4cq0ICA6OYqgfYvm9wRQFbgxKMsuROvoUxJOK0/9XDfQxVb4l78nRdvnKxlhY7/rHegDUSxyWnBtyblCZpz3Txm8HSSvGewWmb5OMlTziGR77vtdWMi8adwQ9lnKx3zKEMJHUCK1lvLOktg+SmbqqEdErU+0G93KmwXLVTEYPaiPl2q99m7lJRPpgQMrQtbcYxqD8h+5jIJwOw5A7vvsd/Wb/Cj6g98wvgxiWnCpNHkafVb4ID4FFjygZwbg4KZykpFPwv0kaFCrcnJskmXDghGy7tKsRa/G0sTd+zlZ0TDThT3mOvi1RzCmWosnc8uwpqduau7UcuycKBOzWCFIUscpJkA/FMoei/ogEwQrxLZhqokZf40HCLS8IwvlQGo1FsxxhS79YZ6JLREKllVSQGmdYqIHFXhTUO9LjRuzJwoGoQyNDSuBbBpBlTq0FRCGw3Hpnrjt9Md0gnqEib4bW8sDRjWsnFswwcOcuKQeNKqthOc+Njd0/KnFujuLLW828uaPyy713ugo90YC8XQ29jpXhyq/ChFHjIhOw5ZBoIAseMKB5jI/r/vpDpvYLe62xQpBV5xrL3o/m+K1Ny4/J4ccacYSbqzj4nygfCwCHHuIbRHuvgzdZ92up40W7uf0999bpvF3KqZ/AGppjIosV9YwquDfm+BJg/ERtHHBM1C3EbhH0EI/V32yiTJMdAe6vKMry+yRUKvp48TA0QnMRnHUO2Qj7LvtTFTCp+ZfycKX9Z7PrWOqtvy18XWEdKjBlEbAEAAAAAAAAAgoAAAAAAAACKgAAAAAAAgACAAIAAAACAi4AAAAAAAAABAACAAAAAAIGAAIAAAACACYAAAAAAAICKAAAAAAAAAIgAAAAAAAAACYAAgAAAAAAKAACAAAAAAIuAAIAAAAAAiwAAAAAAAICJgAAAAAAAgAOAAAAAAACAAoAAAAAAAICAAAAAAAAAgAqAAAAAAAAACgAAgAAAAICBgACAAAAAgICAAAAAAACAAQAAgAAAAAAIgACAAAAAgOU1lNdQXkMAAQAAAAIAAAAxLjAAQk4yNTQAa28Ab2sAc2VlZCB0b28gc21hbGwAbm90IHNlZWRlZABpbnZhbGlkIGdyb3VwIHByaXZhdGUga2V5AGludmFsaWQgZ3JvdXAgcHVibGljIGtleQBvdXRwdXQgYnVmZmVyIHRvbyBzbWFsbABpbnZhbGlkIHVzZXIgcHJpdmF0ZSBrZXkAaW52YWxpZCBqb2luIHJlc3BvbnNlAGludmFsaWQgdXNlciBjcmVkZW50aWFscwBncm91cCBwcml2YXRlIGtleSBub3Qgc2V0AGdyb3VwIHB1YmxpYyBrZXkgbm90IHNldAB1c2VyIGNyZWRlbnRpYWxzIG5vdCBzZXQAaW52YWxpZCBqb2luIG1lc3NhZ2UAaW52YWxpZCBzaWduYXR1cmUAdW5rbm93biBtZXNzYWdl";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(){try{if(Module["wasmBinary"]){return new Uint8Array(Module["wasmBinary"])}var binary=tryParseAsDataURI(wasmBinaryFile);if(binary){return binary}if(Module["readBinary"]){return Module["readBinary"](wasmBinaryFile)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!Module["wasmBinary"]&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch==="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary()})}return new Promise(function(resolve,reject){resolve(getBinary())})}function createWasm(env){var info={"env":env,"global":{"NaN":NaN,Infinity:Infinity},"global.Math":Math,"asm2wasm":asm2wasmImports};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}function receiveInstantiatedSource(output){receiveInstance(output["instance"])}function instantiateArrayBuffer(receiver){getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}if(!Module["wasmBinary"]&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&typeof fetch==="function"){WebAssembly.instantiateStreaming(fetch(wasmBinaryFile,{credentials:"same-origin"}),info).then(receiveInstantiatedSource,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");instantiateArrayBuffer(receiveInstantiatedSource)})}else{instantiateArrayBuffer(receiveInstantiatedSource)}return{}}Module["asm"]=function(global,env,providedBuffer){env["memory"]=wasmMemory;env["table"]=wasmTable=new WebAssembly.Table({"initial":0,"maximum":0,"element":"anyfunc"});env["__memory_base"]=1024;env["__table_base"]=0;var exports=createWasm(env);return exports};function _emscripten_get_heap_size(){return HEAP8.length}function abortOnCannotGrowMemory(requestedSize){abort("OOM")}function _emscripten_resize_heap(requestedSize){abortOnCannotGrowMemory(requestedSize)}function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}var ASSERTIONS=false;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var decodeBase64=typeof atob==="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE==="boolean"&&ENVIRONMENT_IS_NODE){var buf;try{buf=Buffer.from(s,"base64")}catch(_){buf=new Buffer(s,"base64")}return new Uint8Array(buf.buffer,buf.byteOffset,buf.byteLength)}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmGlobalArg={};var asmLibraryArg={"b":___setErrNo,"e":_emscripten_get_heap_size,"d":_emscripten_resize_heap,"c":abortOnCannotGrowMemory,"a":DYNAMICTOP_PTR};var asm=Module["asm"](asmGlobalArg,asmLibraryArg,buffer);Module["asm"]=asm;var _GS_curve=Module["_GS_curve"]=function(){return Module["asm"]["f"].apply(null,arguments)};var _GS_error=Module["_GS_error"]=function(){return Module["asm"]["g"].apply(null,arguments)};var _GS_exportGroupPrivKey=Module["_GS_exportGroupPrivKey"]=function(){return Module["asm"]["h"].apply(null,arguments)};var _GS_exportGroupPubKey=Module["_GS_exportGroupPubKey"]=function(){return Module["asm"]["i"].apply(null,arguments)};var _GS_exportUserCredentials=Module["_GS_exportUserCredentials"]=function(){return Module["asm"]["j"].apply(null,arguments)};var _GS_failure=Module["_GS_failure"]=function(){return Module["asm"]["k"].apply(null,arguments)};var _GS_finishJoin=Module["_GS_finishJoin"]=function(){return Module["asm"]["l"].apply(null,arguments)};var _GS_getSignatureTag=Module["_GS_getSignatureTag"]=function(){return Module["asm"]["m"].apply(null,arguments)};var _GS_getStateSize=Module["_GS_getStateSize"]=function(){return Module["asm"]["n"].apply(null,arguments)};var _GS_initState=Module["_GS_initState"]=function(){return Module["asm"]["o"].apply(null,arguments)};var _GS_loadGroupPrivKey=Module["_GS_loadGroupPrivKey"]=function(){return Module["asm"]["p"].apply(null,arguments)};var _GS_loadGroupPubKey=Module["_GS_loadGroupPubKey"]=function(){return Module["asm"]["q"].apply(null,arguments)};var _GS_loadUserCredentials=Module["_GS_loadUserCredentials"]=function(){return Module["asm"]["r"].apply(null,arguments)};var _GS_processJoin=Module["_GS_processJoin"]=function(){return Module["asm"]["s"].apply(null,arguments)};var _GS_seed=Module["_GS_seed"]=function(){return Module["asm"]["t"].apply(null,arguments)};var _GS_setupGroup=Module["_GS_setupGroup"]=function(){return Module["asm"]["u"].apply(null,arguments)};var _GS_sign=Module["_GS_sign"]=function(){return Module["asm"]["v"].apply(null,arguments)};var _GS_startJoin=Module["_GS_startJoin"]=function(){return Module["asm"]["w"].apply(null,arguments)};var _GS_success=Module["_GS_success"]=function(){return Module["asm"]["x"].apply(null,arguments)};var _GS_verify=Module["_GS_verify"]=function(){return Module["asm"]["y"].apply(null,arguments)};var _GS_version=Module["_GS_version"]=function(){return Module["asm"]["z"].apply(null,arguments)};var ___errno_location=Module["___errno_location"]=function(){return Module["asm"]["A"].apply(null,arguments)};var _free=Module["_free"]=function(){return Module["asm"]["B"].apply(null,arguments)};var _malloc=Module["_malloc"]=function(){return Module["asm"]["C"].apply(null,arguments)};Module["asm"]=asm;Module["then"]=function(func){if(Module["calledRun"]){func(Module)}else{var old=Module["onRuntimeInitialized"];Module["onRuntimeInitialized"]=function(){if(old)old();func(Module)}}return Module};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller};function run(args){args=args||Module["arguments"];if(runDependencies>0){return}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}if(what!==undefined){out(what);err(what);what=JSON.stringify(what)}else{what=""}ABORT=true;EXITSTATUS=1;throw"abort("+what+"). Build with -s ASSERTIONS=1 for more info."}Module["abort"]=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}Module["noExitRuntime"]=true;run();


  return ModuleWasm
}
);
})();
if (true)
      module.exports = ModuleWasm;
    else {}
    
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), "/", __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/anonymous-credentials/lib/util.js":
/*!********************************************************!*\
  !*** ./node_modules/anonymous-credentials/lib/util.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = {
  initModule(makeModule) {
    return new Promise((resolve, reject) => {
      try {
        makeModule().then(({ GroupSigner }) => resolve(GroupSigner));
      } catch (e) {
        reject(e);
      }
    });
  }
};


/***/ }),

/***/ "./node_modules/anonymous-credentials/lib/wasm.js":
/*!********************************************************!*\
  !*** ./node_modules/anonymous-credentials/lib/wasm.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const { initModule } = __webpack_require__(/*! ./util */ "./node_modules/anonymous-credentials/lib/util.js");

let initPromise;
module.exports = () => {
  if (!initPromise) {
    initPromise = initModule(__webpack_require__(/*! ../dist/group-sign-wasm */ "./node_modules/anonymous-credentials/dist/group-sign-wasm.js"));
  }
  return initPromise;
};


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/node-libs-browser/mock/empty.js":
/*!******************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/empty.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/path-browserify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });//# sourceMappingURL=http://localhost:4300/modules/hpnv2/worker.wasm.bundle.js.map