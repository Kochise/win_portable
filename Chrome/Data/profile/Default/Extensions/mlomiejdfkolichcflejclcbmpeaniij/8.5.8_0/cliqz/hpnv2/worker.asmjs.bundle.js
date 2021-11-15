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
/******/ 	return __webpack_require__(__webpack_require__.s = "../../../../../tmp/broccoli-30101RqA8Zti8yPc/out-40-funnel/modules/hpnv2/worker.asmjs.bundle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../../tmp/broccoli-30101RqA8Zti8yPc/out-40-funnel/modules/hpnv2/worker-common.js":
/*!***********************************************************************************!*\
  !*** /tmp/broccoli-30101RqA8Zti8yPc/out-40-funnel/modules/hpnv2/worker-common.js ***!
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

/***/ "../../../../../tmp/broccoli-30101RqA8Zti8yPc/out-40-funnel/modules/hpnv2/worker.asmjs.bundle.js":
/*!*****************************************************************************************!*\
  !*** /tmp/broccoli-30101RqA8Zti8yPc/out-40-funnel/modules/hpnv2/worker.asmjs.bundle.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _asmjs = _interopRequireDefault(__webpack_require__(/*! anonymous-credentials/lib/asmjs */ "./node_modules/anonymous-credentials/lib/asmjs.js"));

var _workerCommon = _interopRequireDefault(__webpack_require__(/*! ./worker-common */ "../../../../../tmp/broccoli-30101RqA8Zti8yPc/out-40-funnel/modules/hpnv2/worker-common.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * Copyright (c) 2014-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
(0, _workerCommon.default)(self, _asmjs.default);

/***/ }),

/***/ "./node_modules/anonymous-credentials/dist/group-sign-asmjs.js":
/*!*********************************************************************!*\
  !*** ./node_modules/anonymous-credentials/dist/group-sign-asmjs.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, __dirname, Buffer) {
var ModuleAsmjs = (function() {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  return (
function(ModuleAsmjs) {
  ModuleAsmjs = ModuleAsmjs || {};

var Module=typeof ModuleAsmjs!=="undefined"?ModuleAsmjs:{};var BUFFER_SIZE=10*1024;function _arrayToPtr(data,ptr){if(data.length>BUFFER_SIZE){throw new Error("Data size exceeded")}writeArrayToMemory(data,ptr);return ptr}function GroupSigner(){this.buffers=[];this._makeBindings();this.stateSize=Module._GS_getStateSize();var state=_malloc(this.stateSize);Module._GS_initState(state);this._updateState(state);_free(state)}function initStaticMembers(){GroupSigner._version=UTF8ToString(Module._GS_version());GroupSigner._curve=UTF8ToString(Module._GS_curve())}if(Module["calledRun"]){initStaticMembers()}else{var old=Module["onRuntimeInitialized"];Module["onRuntimeInitialized"]=function(){if(old)old();initStaticMembers()}}GroupSigner.prototype._getBuffer=function(){const buffer=_malloc(BUFFER_SIZE);this.buffers.push(buffer);return buffer};GroupSigner.prototype._freeBuffers=function(){this.buffers.forEach(function(buffer){_free(buffer)});this.buffers=[]};GroupSigner.prototype._updateState=function(state){this.state=new Uint8Array(HEAPU8.buffer,state,this.stateSize).slice()};GroupSigner.prototype._makeBindings=function(){var self=this;function _(func,inputs,output,context){inputs=inputs===undefined?0:inputs;output=output===undefined?false:output;context=context===undefined?true:context;return function(){try{var state=_arrayToPtr(self.state,self._getBuffer());var args=Array.prototype.slice.call(arguments);if(args.length!==inputs){throw new Error("expected "+inputs+" arguments")}if(!args.every(function(arg){return arg instanceof Uint8Array})){throw new Error("input data must be uint8array")}var funcArgs=[];if(context){funcArgs.push(state)}for(var i=0;i<inputs;++i){var ptr=_arrayToPtr(args[i],self._getBuffer());funcArgs.push(ptr);funcArgs.push(args[i].length)}if(output==="array"){var ptr=self._getBuffer();setValue(ptr,BUFFER_SIZE-4,"i32");funcArgs.push(ptr+4);funcArgs.push(ptr)}else if(output==="joinstatic"){var ptr=self._getBuffer();setValue(ptr,BUFFER_SIZE-4,"i32");funcArgs.push(ptr+4);funcArgs.push(ptr);var ptr2=self._getBuffer();setValue(ptr2,BUFFER_SIZE-4,"i32");funcArgs.push(ptr2+4);funcArgs.push(ptr2)}var res=Module[func].apply(Module,funcArgs);this._updateState(state);if(output==="boolean"){if(res===Module._GS_success()){return true}else if(res===Module._GS_failure()){return false}}if(res!==Module._GS_success()){throw new Error(UTF8ToString(Module._GS_error(res)))}if(output==="joinstatic"){var ptrjoinmsg=funcArgs[funcArgs.length-1];var ptrgsk=funcArgs[funcArgs.length-3];var gsk=new Uint8Array(HEAPU8.buffer,ptrgsk+4,getValue(ptrgsk,"i32")).slice();var joinmsg=new Uint8Array(HEAPU8.buffer,ptrjoinmsg+4,getValue(ptrjoinmsg,"i32")).slice();return{gsk:gsk,joinmsg:joinmsg}}else if(output){var ptr=funcArgs[funcArgs.length-1];return new Uint8Array(HEAPU8.buffer,ptr+4,getValue(ptr,"i32")).slice()}}finally{this._freeBuffers()}}}this.seed=_("_GS_seed",1);this.setupGroup=_("_GS_setupGroup");this.getGroupPubKey=_("_GS_exportGroupPubKey",0,"array");this.getGroupPrivKey=_("_GS_exportGroupPrivKey",0,"array");this.getUserCredentials=_("_GS_exportUserCredentials",0,"array");this.setGroupPubKey=_("_GS_loadGroupPubKey",1);this.setGroupPrivKey=_("_GS_loadGroupPrivKey",1);this.setUserCredentials=_("_GS_loadUserCredentials",1);this.processJoin=_("_GS_processJoin",2,"array");this.sign=_("_GS_sign",2,"array");this.verify=_("_GS_verify",3,"boolean");this.getSignatureTag=_("_GS_getSignatureTag",1,"array",false);this.startJoin=_("_GS_startJoin",1,"joinstatic");this.finishJoin=_("_GS_finishJoin",3,"array",false)};Module.GroupSigner=GroupSigner;var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}Module["arguments"]=[];Module["thisProgram"]="./this.program";Module["quit"]=function(status,toThrow){throw toThrow};Module["preRun"]=[];Module["postRun"]=[];var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&"function"==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}else{return scriptDirectory+path}}if(ENVIRONMENT_IS_NODE){scriptDirectory=__dirname+"/";var nodeFS;var nodePath;Module["read"]=function shell_read(filename,binary){var ret;ret=tryParseAsDataURI(filename);if(!ret){if(!nodeFS)nodeFS=__webpack_require__(/*! fs */ "./node_modules/node-libs-browser/mock/empty.js");if(!nodePath)nodePath=__webpack_require__(/*! path */ "./node_modules/path-browserify/index.js");filename=nodePath["normalize"](filename);ret=nodeFS["readFileSync"](filename)}return binary?ret:ret.toString()};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}Module["arguments"]=process["argv"].slice(2);process["on"]("uncaughtException",function(ex){if(!(ex instanceof ExitStatus)){throw ex}});process["on"]("unhandledRejection",abort);Module["quit"]=function(status){process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){Module["read"]=function shell_read(f){var data=tryParseAsDataURI(f);if(data){return intArrayToString(data)}return read(f)}}Module["readBinary"]=function readBinary(f){var data;data=tryParseAsDataURI(f);if(data){return data}if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof quit==="function"){Module["quit"]=function(status){quit(status)}}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(document.currentScript){scriptDirectory=document.currentScript.src}if(_scriptDir){scriptDirectory=_scriptDir}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1)}else{scriptDirectory=""}Module["read"]=function shell_read(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){Module["readBinary"]=function readBinary(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}Module["readAsync"]=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)};Module["setWindowTitle"]=function(title){document.title=title}}else{}var out=Module["print"]||(typeof console!=="undefined"?console.log.bind(console):typeof print!=="undefined"?print:null);var err=Module["printErr"]||(typeof printErr!=="undefined"?printErr:typeof console!=="undefined"&&console.warn.bind(console)||out);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=undefined;var STACK_ALIGN=16;function dynamicAlloc(size){var ret=HEAP32[DYNAMICTOP_PTR>>2];var end=ret+size+15&-16;if(end<=_emscripten_get_heap_size()){HEAP32[DYNAMICTOP_PTR>>2]=end}else{return 0}return ret}function getNativeTypeSize(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return 4}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0,"getNativeTypeSize invalid bits "+bits+", type "+type);return bits/8}else{return 0}}}}function warnOnce(text){if(!warnOnce.shown)warnOnce.shown={};if(!warnOnce.shown[text]){warnOnce.shown[text]=1;err(text)}}var jsCallStartIndex=1;var functionPointers=new Array(0);var funcWrappers={};function dynCall(sig,ptr,args){if(args&&args.length){return Module["dynCall_"+sig].apply(null,[ptr].concat(args))}else{return Module["dynCall_"+sig].call(null,ptr)}}var tempRet0=0;var setTempRet0=function(value){tempRet0=value};var getTempRet0=function(){return tempRet0};var GLOBAL_BASE=8;function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for getValue: "+type)}return null}var ABORT=false;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}function getCFunc(ident){var func=Module["_"+ident];assert(func,"Cannot call unknown function "+ident+", make sure it is exported");return func}function ccall(ident,returnType,argTypes,args,opts){var toC={"string":function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=stackAlloc(len);stringToUTF8(str,ret,len)}return ret},"array":function(arr){var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}};function convertReturnValue(ret){if(returnType==="string")return UTF8ToString(ret);if(returnType==="boolean")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);ret=convertReturnValue(ret);if(stack!==0)stackRestore(stack);return ret}function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}var ALLOC_NONE=3;var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(u8Array[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=u8Array[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|u8Array[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}}outU8Array[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127)++len;else if(u<=2047)len+=2;else if(u<=65535)len+=3;else len+=4}return len}var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer>>0]=0}function demangle(func){return func}function demangleAll(text){var regex=/__Z[\w\d_]+/g;return text.replace(regex,function(x){var y=demangle(x);return x===y?x:y+" ["+x+"]"})}function jsStackTrace(){var err=new Error;if(!err.stack){try{throw new Error(0)}catch(e){err=e}if(!err.stack){return"(no stack trace available)"}}return err.stack.toString()}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)}var STACK_BASE=2896,DYNAMIC_BASE=5245776,DYNAMICTOP_PTR=2864;var TOTAL_STACK=5242880;var INITIAL_TOTAL_MEMORY=Module["TOTAL_MEMORY"]||16777216;if(INITIAL_TOTAL_MEMORY<TOTAL_STACK)err("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+INITIAL_TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")");if(Module["buffer"]){buffer=Module["buffer"]}else{{buffer=new ArrayBuffer(INITIAL_TOTAL_MEMORY)}}updateGlobalBufferViews();HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func)}else{Module["dynCall_vi"](func,callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var Math_abs=Math.abs;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_min=Math.min;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};var memoryInitializer=null;var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return String.prototype.startsWith?filename.startsWith(dataURIPrefix):filename.indexOf(dataURIPrefix)===0}memoryInitializer="data:application/octet-stream;base64,AAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANAAAAAAAAAKEQAAAAAIAAn/8HAAAAgABNNLoBAABAAIJkIyUAAAAAAAAAAAAAAAASAAAAAAAAAKcTAAAAAAAAIWEIAAAAgABNNLoBAABAAIJkIyUAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAACAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr+wPIJELuAJENv5hIu4sAZKS27WGMfgCMjesvtp5RALsQGgYAAAAAAAAAAAAAAADzTNXnwTSMAA23hDeua3QATR9bqoJZjACnCjEzeHO6APmqFgUAAAAAAAAAAAAAAACaK82ReODwABm9Cb695goAvSkjgoxplgDgkJpDk69rAKCXGAIAAAAAAAAAAAAAAACbzjpr7BotAIpXyTnX/wYAkLA3jfP1VgBEbY8mFYt8AA4ruw4AAAAAAAAAAAAAAAATAAAAAAAAAKcTAAAAAAAAIWEIAAAAgABNNLoBAABAAIJkIyUAAAAAAAAAAAAAAAASAAAAAAAAAKcTAAAAAAAAIWEIAAAAgABNNLoBAABAAIJkIyUAAAAAAAAAAAAAAAA5fl7/liovADzxlitk6GQARnEMsPcmmQAkzdq05yGDAC56Eh0AAAAAAAAAAAAAAADpbSpvwOZ9AOHCdz9NknQACYU/lUaoUACbSbaMfC4hABl2NxsAAAAAAAAAAAAAAAAqktWQPxmCAMVQiMCybYsAF9zIarlXLwCy6gN1g9EeAGnu6wkAAAAAAAAAAAAAAACYL4pCkUQ3cc/7wLWl27XpW8JWOfER8Vmkgj+S1V4cq5iqB9gBW4MSvoUxJMN9DFV0Xb5y/rHegKcG3Jt08ZvBwWmb5IZHvu/GncEPzKEMJG8s6S2qhHRK3KmwXNqI+XZSUT6YbcYxqMgnA7DHf1m/8wvgxkeRp9VRY8oGZykpFIUKtyc4IRsu/G0sTRMNOFNUcwpluwpqdi7JwoGFLHKSoei/oktmGqhwi0vCo1FsxxnoktEkBpnWhTUO9HCgahAWwaQZCGw3Hkx3SCe1vLA0swwcOUqq2E5Pypxb828uaO6Cj3RvY6V4FHjIhAgCx4z6/76Q62xQpPej+b7yeHHGIq4o15gvikLNZe8jkUQ3cS87TezP+8C1vNuJgaXbtek4tUjzW8JWORnQBbbxEfFZm08Zr6SCP5IYgW3a1V4cq0ICA6OYqgfYvm9wRQFbgxKMsuROvoUxJOK0/9XDfQxVb4l78nRdvnKxlhY7/rHegDUSxyWnBtyblCZpz3Txm8HSSvGewWmb5OMlTziGR77vtdWMi8adwQ9lnKx3zKEMJHUCK1lvLOktg+SmbqqEdErU+0G93KmwXLVTEYPaiPl2q99m7lJRPpgQMrQtbcYxqD8h+5jIJwOw5A7vvsd/Wb/Cj6g98wvgxiWnCpNHkafVb4ID4FFjygZwbg4KZykpFPwv0kaFCrcnJskmXDghGy7tKsRa/G0sTd+zlZ0TDThT3mOvi1RzCmWosnc8uwpqduau7UcuycKBOzWCFIUscpJkA/FMoei/ogEwQrxLZhqokZf40HCLS8IwvlQGo1FsxxhS79YZ6JLREKllVSQGmdYqIHFXhTUO9LjRuzJwoGoQyNDSuBbBpBlTq0FRCGw3Hpnrjt9Md0gnqEib4bW8sDRjWsnFswwcOcuKQeNKqthOc+Njd0/KnFujuLLW828uaPyy713ugo90YC8XQ29jpXhyq/ChFHjIhOw5ZBoIAseMKB5jI/r/vpDpvYLe62xQpBV5xrL3o/m+K1Ny4/J4ccacYSbqzj4nygfCwCHHuIbRHuvgzdZ92up40W7uf0999bpvF3KqZ/AGppjIosV9YwquDfm+BJg/ERtHHBM1C3EbhH0EI/V32yiTJMdAe6vKMry+yRUKvp48TA0QnMRnHUO2Qj7LvtTFTCp+ZfycKX9Z7PrWOqtvy18XWEdKjBlEbAEAAAAAAAAAgoAAAAAAAACKgAAAAAAAgACAAIAAAACAi4AAAAAAAAABAACAAAAAAIGAAIAAAACACYAAAAAAAICKAAAAAAAAAIgAAAAAAAAACYAAgAAAAAAKAACAAAAAAIuAAIAAAAAAiwAAAAAAAICJgAAAAAAAgAOAAAAAAACAAoAAAAAAAICAAAAAAAAAgAqAAAAAAAAACgAAgAAAAICBgACAAAAAgICAAAAAAACAAQAAgAAAAAAIgACAAAAAgOU1lNdQXkMAAQAAAAIAAAAxLjAAQk4yNTQAa28Ab2sAc2VlZCB0b28gc21hbGwAbm90IHNlZWRlZABpbnZhbGlkIGdyb3VwIHByaXZhdGUga2V5AGludmFsaWQgZ3JvdXAgcHVibGljIGtleQBvdXRwdXQgYnVmZmVyIHRvbyBzbWFsbABpbnZhbGlkIHVzZXIgcHJpdmF0ZSBrZXkAaW52YWxpZCBqb2luIHJlc3BvbnNlAGludmFsaWQgdXNlciBjcmVkZW50aWFscwBncm91cCBwcml2YXRlIGtleSBub3Qgc2V0AGdyb3VwIHB1YmxpYyBrZXkgbm90IHNldAB1c2VyIGNyZWRlbnRpYWxzIG5vdCBzZXQAaW52YWxpZCBqb2luIG1lc3NhZ2UAaW52YWxpZCBzaWduYXR1cmUAdW5rbm93biBtZXNzYWdl";var tempDoublePtr=2880;function _emscripten_get_heap_size(){return HEAP8.length}function abortOnCannotGrowMemory(requestedSize){abort("OOM")}function _emscripten_resize_heap(requestedSize){abortOnCannotGrowMemory(requestedSize)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest)}function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}var ASSERTIONS=false;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var decodeBase64=typeof atob==="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE==="boolean"&&ENVIRONMENT_IS_NODE){var buf;try{buf=Buffer.from(s,"base64")}catch(_){buf=new Buffer(s,"base64")}return new Uint8Array(buf.buffer,buf.byteOffset,buf.byteLength)}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmGlobalArg={"Math":Math,"Int8Array":Int8Array,"Int32Array":Int32Array,"Uint8Array":Uint8Array};var asmLibraryArg={"a":abort,"b":setTempRet0,"c":getTempRet0,"d":___setErrNo,"e":_emscripten_get_heap_size,"f":_emscripten_memcpy_big,"g":_emscripten_resize_heap,"h":abortOnCannotGrowMemory,"i":tempDoublePtr,"j":DYNAMICTOP_PTR};// EMSCRIPTEN_START_ASM
var asm=(/** @suppress {uselessCode} */ function(global,env,buffer) {
"use asm";var a=new global.Int8Array(buffer),b=new global.Int32Array(buffer),c=new global.Uint8Array(buffer),d=env.i|0,e=env.j|0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0.0,n=global.Math.imul,o=global.Math.clz32,p=env.a,q=env.b,r=env.c,s=env.d,t=env.e,u=env.f,v=env.g,w=env.h,x=2896,y=5245776,z=0.0;
// EMSCRIPTEN_START_FUNCS
function A(a){a=a|0;var b=0;b=x;x=x+a|0;x=x+15&-16;return b|0}function B(){return x|0}function C(a){a=a|0;x=a}function D(a,b){a=a|0;b=b|0;x=a;y=b}function E(a,c){a=a|0;c=c|0;var d=0,e=0,f=0;e=x;x=x+96|0;f=e+48|0;d=e;ra(d,b[c+8>>2]|0);va(f,496);Na(d,f);do{kb(a,d,0)|0;Ba(d,1);pa(d)|0;r()|0}while(!((eb(a)|0)==0?(lb(a),(eb(a)|0)==0):0));x=e;return}function F(a){a=a|0;b[a+1560>>2]=0;return}function G(a,c,d){a=a|0;c=c|0;d=d|0;if((d|0)<128){d=2;return d|0}dd(a,d,c);d=a+1560|0;b[d>>2]=b[d>>2]|1;d=1;return d|0}function H(a){a=a|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;n=x;x=x+1296|0;c=n+512|0;f=n+1184|0;g=n+480|0;h=n+96|0;i=n+1280|0;j=n+896|0;k=n+48|0;l=n;m=n+608|0;d=a+1560|0;e=b[d>>2]&1;if(!e){m=3;x=n;return m|0}b[d>>2]=e;s=a+128|0;Cc(c,304);Cc(c+48|0,352);Cc(f,400);Cc(f+48|0,448);Za(m,c,f)|0;Va(s,m);q=a+416|0;Va(q,m);e=a+864|0;va(c,64);Sa(e,c,a);o=a+904|0;va(c,64);Sa(o,c,a);cd(s,e);cd(q,o);r=a+704|0;p=a+744|0;va(l,64);va(c,64);Sa(k,c,a);Va(j,m);cd(j,k);b[i>>2]=0;b[i+4>>2]=384;b[i+8>>2]=h;ba(s,i)|0;ba(m,i)|0;ba(j,i)|0;s=b[i>>2]|0;b[c>>2]=s;b[c+4>>2]=s;b[c+8>>2]=h;b[f>>2]=0;b[f+4>>2]=32;b[f+8>>2]=g;Sc(2,32,f,32,c,-1,0);ra(r,g);va(c,64);Na(r,c);Ta(p,r,e,l);Aa(p,p,k);Na(p,l);p=a+784|0;e=a+824|0;va(l,64);va(c,64);Sa(k,c,a);Va(j,m);cd(j,k);b[i>>2]=0;b[i+4>>2]=384;b[i+8>>2]=h;ba(q,i)|0;ba(m,i)|0;ba(j,i)|0;m=b[i>>2]|0;b[c>>2]=m;b[c+4>>2]=m;b[c+8>>2]=h;b[f>>2]=0;b[f+4>>2]=32;b[f+8>>2]=g;Sc(2,32,f,32,c,-1,0);ra(p,g);va(c,64);Na(p,c);Ta(e,p,o,l);Aa(e,e,k);Na(e,l);b[d>>2]=b[d>>2]|6;m=1;x=n;return m|0}function I(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=x;x=x+784|0;i=o+672|0;j=o+576|0;k=o+288|0;l=o;m=o+768|0;n=a+1560|0;b[n>>2]=b[n>>2]&1;b[m>>2]=0;e=m+4|0;b[e>>2]=d;d=m+8|0;b[d>>2]=c;f=a+128|0;if(!(K(m,f)|0)){n=4;x=o;return n|0}g=b[m>>2]|0;h=g+32|0;b[m>>2]=h;c=b[e>>2]|0;if((h|0)>(c|0)){n=4;x=o;return n|0}e=a+864|0;d=b[d>>2]|0;ra(e,d+g|0);g=g+64|0;b[m>>2]=g;if((g|0)>(c|0)){n=4;x=o;return n|0}m=a+904|0;ra(m,d+h|0);Cc(i,304);Cc(i+48|0,352);Cc(j,400);Cc(j+48|0,448);Za(k,i,j)|0;Cc(i,304);Cc(i+48|0,352);Cc(j,400);Cc(j+48|0,448);Za(l,i,j)|0;cd(k,e);cd(l,m);if(!(Wa(k,f)|0)){n=4;x=o;return n|0}if(!(Wa(l,a+416|0)|0)){n=4;x=o;return n|0}b[n>>2]=b[n>>2]|6;n=1;x=o;return n|0}function J(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0;f=x;x=x+16|0;g=f;e=a+1560|0;b[e>>2]=b[e>>2]&1;b[g>>2]=0;b[g+4>>2]=d;b[g+8>>2]=c;if(!(K(g,a+128|0)|0)){g=5;x=f;return g|0}b[e>>2]=b[e>>2]|4;g=1;x=f;return g|0}function K(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=x;x=x+480|0;l=o;m=o+384|0;n=o+96|0;d=b[a>>2]|0;k=d+128|0;b[a>>2]=k;j=a+4|0;if((k|0)>(b[j>>2]|0)){n=0;x=o;return n|0}k=a+8|0;i=(b[k>>2]|0)+d|0;ra(l,i);vc(m,l);ra(l,i+32|0);vc(m+48|0,l);ra(l,i+64|0);vc(n,l);ra(l,i+96|0);vc(n+48|0,l);if(!(Za(c,m,n)|0)){n=0;x=o;return n|0}i=c+288|0;d=b[a>>2]|0;h=d+128|0;b[a>>2]=h;if((h|0)>(b[j>>2]|0)){n=0;x=o;return n|0}h=(b[k>>2]|0)+d|0;ra(l,h);vc(m,l);ra(l,h+32|0);vc(m+48|0,l);ra(l,h+64|0);vc(n,l);ra(l,h+96|0);vc(n+48|0,l);if(!(Za(i,m,n)|0)){n=0;x=o;return n|0}d=b[a>>2]|0;h=d+32|0;b[a>>2]=h;if((h|0)>(b[j>>2]|0)){n=0;x=o;return n|0}h=c+576|0;ra(h,(b[k>>2]|0)+d|0);d=b[a>>2]|0;g=d+32|0;b[a>>2]=g;if((g|0)>(b[j>>2]|0)){n=0;x=o;return n|0}g=c+616|0;ra(g,(b[k>>2]|0)+d|0);d=b[a>>2]|0;f=d+32|0;b[a>>2]=f;if((f|0)>(b[j>>2]|0)){n=0;x=o;return n|0}f=c+656|0;ra(f,(b[k>>2]|0)+d|0);e=b[a>>2]|0;d=e+32|0;b[a>>2]=d;if((d|0)>(b[j>>2]|0)){n=0;x=o;return n|0}d=c+696|0;ra(d,(b[k>>2]|0)+e|0);Cc(l,304);Cc(l+48|0,352);Cc(m,400);Cc(m+48|0,448);Za(n,l,m)|0;if(!(ca(n,c,h,g)|0))d=0;else d=(ca(n,i,f,d)|0)!=0&1;n=d;x=o;return n|0}function L(a,c,d,e,f,g,h){a=a|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;q=x;x=x+1264|0;p=q+128|0;l=q+80|0;m=q+32|0;j=q+1112|0;k=q;n=q+888|0;if(!(b[a+1560>>2]&1)){p=3;x=q;return p|0}va(p,112);va(l,160);jb(j,p,l)|0;fb(n,j);o=q+272+576|0;va(p,64);Sa(o,p,a);bd(n,o);b[p>>2]=d;b[p+4>>2]=d;b[p+8>>2]=c;b[l>>2]=0;b[l+4>>2]=32;b[l+8>>2]=k;Sc(2,32,l,32,p,-1,0);d=n+144|0;i=n+184|0;va(m,64);va(p,64);Sa(l,p,a);fb(p,j);bd(p,l);da(k,n,j,p,d);Ta(i,d,o,m);Aa(i,i,l);Na(i,m);c=b[h>>2]|0;if((((c|0)>=65?(b[p>>2]=0,b[p+4>>2]=c,b[p+8>>2]=g,qb(p,n,0),(c|0)>=97):0)?(oa(g+65|0,d),(c|0)>=129):0)?(oa(g+97|0,i),b[h>>2]=129,(b[f>>2]|0)>=32):0){oa(e,o);b[f>>2]=32;c=1}else c=6;p=c;x=q;return p|0}function M(a,c,d,e,f,g,h,i){a=a|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;w=x;x=x+2528|0;v=w+48|0;p=w;j=w+2240|0;k=w+2096|0;l=w+1360|0;r=w+2512|0;u=w+744|0;m=w+2384|0;n=w+88|0;b[r>>2]=0;b[r+4>>2]=c;b[r+8>>2]=a;if(!(K(r,l)|0)){v=5;x=w;return v|0}if((e|0)<32)a=7;else{r=u+576|0;ra(r,d);dd(m,e,d);do if((((((g|0)>=65?(b[v>>2]=0,b[v+4>>2]=g,b[v+8>>2]=f,!((g|0)<130|(rb(n,v)|0)==0)):0)?(q=n+144|0,b[v>>2]=0,b[v+4>>2]=g+-65,b[v+8>>2]=f+65,!((g|0)<195|(rb(q,v)|0)==0)):0)?(s=n+288|0,b[v>>2]=0,b[v+4>>2]=g+-130,b[v+8>>2]=f+130,!((g|0)<260|(rb(s,v)|0)==0)):0)?(t=n+432|0,b[v>>2]=0,b[v+4>>2]=g+-195,b[v+8>>2]=f+195,!((g|0)<292|(rb(t,v)|0)==0)):0)?(o=n+576|0,ra(o,f+260|0),(g|0)>=324):0){g=n+616|0;ra(g,f+292|0);va(v,112);va(p,160);jb(j,v,p)|0;fb(k,j);bd(k,r);if(ea(j,k,q,t,0,o,g)|0?fa(n,q,s,t,l,l+288|0,m)|0:0){fb(u,n);k=u+144|0;fb(k,q);j=u+288|0;fb(j,s);c=u+432|0;fb(c,t);a=b[i>>2]|0;if((a|0)<65){a=6;break}b[v>>2]=0;b[v+4>>2]=a;b[v+8>>2]=h;qb(v,u,0);if((a|0)<130){a=6;break}b[v>>2]=0;b[v+4>>2]=a+-65;b[v+8>>2]=h+65;qb(v,k,0);if((a|0)<195){a=6;break}b[v>>2]=0;b[v+4>>2]=a+-130;b[v+8>>2]=h+130;qb(v,j,0);if((a|0)<260){a=6;break}b[v>>2]=0;b[v+4>>2]=a+-195;b[v+8>>2]=h+195;qb(v,c,0);if((a|0)<292){a=6;break}oa(h+260|0,r);b[i>>2]=292;a=1;break}a=8}else a=8;while(0)}v=a;x=w;return v|0}function N(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0;g=x;x=x+16|0;e=g;f=a+1560|0;b[f>>2]=b[f>>2]&-9;if((d|0)<65){f=9;x=g;return f|0}b[e>>2]=0;b[e+4>>2]=d;b[e+8>>2]=c;if((d|0)<130|(rb(a+944|0,e)|0)==0){f=9;x=g;return f|0}b[e>>2]=0;b[e+4>>2]=d+-65;b[e+8>>2]=c+65;if((d|0)<195|(rb(a+1088|0,e)|0)==0){f=9;x=g;return f|0}b[e>>2]=0;b[e+4>>2]=d+-130;b[e+8>>2]=c+130;if((d|0)<260|(rb(a+1232|0,e)|0)==0){f=9;x=g;return f|0}b[e>>2]=0;b[e+4>>2]=d+-195;b[e+8>>2]=c+195;if((d|0)<292|(rb(a+1376|0,e)|0)==0){f=9;x=g;return f|0}ra(a+1520|0,c+260|0);b[f>>2]=b[f>>2]|8;f=1;x=g;return f|0}function O(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;m=x;x=x+16|0;k=m;if(!(b[a+1560>>2]&2)){l=10;x=m;return l|0}b[k>>2]=0;l=k+4|0;b[l>>2]=b[d>>2];e=k+8|0;b[e>>2]=c;if(((Q(a+128|0,k)|0)!=0?(f=b[k>>2]|0,g=f+32|0,b[k>>2]=g,h=b[l>>2]|0,(g|0)<=(h|0)):0)?(i=b[e>>2]|0,oa(i+f|0,a+864|0),j=f+64|0,b[k>>2]=j,(j|0)<=(h|0)):0){oa(i+g|0,a+904|0);b[d>>2]=j;a=1}else a=6;l=a;x=m;return l|0}function P(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0;f=x;x=x+16|0;e=f;if(!(b[a+1560>>2]&4)){e=11;x=f;return e|0}b[e>>2]=0;b[e+4>>2]=b[d>>2];b[e+8>>2]=c;if(!(Q(a+128|0,e)|0))a=6;else{b[d>>2]=b[e>>2];a=1}e=a;x=f;return e|0}function Q(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0;if(!(ba(a,c)|0)){f=0;return f|0}if(!(ba(a+288|0,c)|0)){f=0;return f|0}d=b[c>>2]|0;e=d+32|0;b[c>>2]=e;f=c+4|0;if((e|0)>(b[f>>2]|0)){f=0;return f|0}e=c+8|0;oa((b[e>>2]|0)+d|0,a+576|0);d=b[c>>2]|0;g=d+32|0;b[c>>2]=g;if((g|0)>(b[f>>2]|0)){g=0;return g|0}oa((b[e>>2]|0)+d|0,a+616|0);d=b[c>>2]|0;g=d+32|0;b[c>>2]=g;if((g|0)>(b[f>>2]|0)){g=0;return g|0}oa((b[e>>2]|0)+d|0,a+656|0);d=b[c>>2]|0;g=d+32|0;b[c>>2]=g;if((g|0)>(b[f>>2]|0)){g=0;return g|0}oa((b[e>>2]|0)+d|0,a+696|0);g=1;return g|0}function R(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0;g=x;x=x+16|0;e=g;if(!(b[a+1560>>2]&8)){f=12;x=g;return f|0}f=b[d>>2]|0;if((f|0)<65){f=6;x=g;return f|0}b[e>>2]=0;b[e+4>>2]=f;b[e+8>>2]=c;qb(e,a+944|0,0);if((f|0)<130){f=6;x=g;return f|0}b[e>>2]=0;b[e+4>>2]=f+-65;b[e+8>>2]=c+65;qb(e,a+1088|0,0);if((f|0)<195){f=6;x=g;return f|0}b[e>>2]=0;b[e+4>>2]=f+-130;b[e+8>>2]=c+130;qb(e,a+1232|0,0);if((f|0)<260){f=6;x=g;return f|0}b[e>>2]=0;b[e+4>>2]=f+-195;b[e+8>>2]=c+195;qb(e,a+1376|0,0);if((f|0)<292){f=6;x=g;return f|0}oa(c+260|0,a+1520|0);b[d>>2]=292;f=1;x=g;return f|0}function S(a,c,d,e,f,g,h){a=a|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;v=x;x=x+1536|0;t=v+368|0;u=v+224|0;m=v+176|0;n=v+128|0;j=v+80|0;o=v+32|0;q=v+1392|0;k=v;r=v+1168|0;s=v+512|0;i=b[a+1560>>2]|0;if(!(i&1)){u=3;x=v;return u|0}if(!(i&2)){u=10;x=v;return u|0}p=b[h>>2]|0;do if(((d|0)>=65?(b[t>>2]=0,b[t+4>>2]=d,b[t+8>>2]=c,!((d|0)<97|(rb(r,t)|0)==0)):0)?(l=r+144|0,ra(l,c+65|0),(d|0)>=129):0){d=r+184|0;ra(d,c+97|0);va(o,64);va(n,112);va(j,160);jb(q,n,j)|0;b[t>>2]=f;b[t+4>>2]=f;b[t+8>>2]=e;b[u>>2]=0;b[u+4>>2]=32;b[u+8>>2]=k;Sc(2,32,u,32,t,-1,0);va(j,64);Ua(n,l,j);fb(t,q);fb(u,r);bd(t,d);bd(u,n);ob(t,u);da(k,r,q,t,m);if(La(l,m)|0){i=13;break}j=s+144|0;k=s+288|0;d=s+432|0;va(n,64);Sa(t,n,a);fb(s,q);bd(s,t);fb(j,s);i=a+904|0;bd(j,i);fb(d,r);Ta(u,t,i,o);bd(d,u);fb(k,s);ob(k,d);bd(k,a+864|0);i=s+576|0;c=s+616|0;ha(a,q,r,j,d,u,0,i,c);if((((((p|0)>=65?(b[t>>2]=0,b[t+4>>2]=p,b[t+8>>2]=g,qb(t,s,0),(p|0)>=130):0)?(b[t>>2]=0,b[t+4>>2]=p+-65,b[t+8>>2]=g+65,qb(t,j,0),(p|0)>=195):0)?(b[t>>2]=0,b[t+4>>2]=p+-130,b[t+8>>2]=g+130,qb(t,k,0),(p|0)>=260):0)?(b[t>>2]=0,b[t+4>>2]=p+-195,b[t+8>>2]=g+195,qb(t,d,0),(p|0)>=292):0)?(oa(g+260|0,i),(p|0)>=324):0){oa(g+292|0,c);b[h>>2]=324;i=1}else i=6}else i=13;while(0);u=i;x=v;return u|0}function T(a,c,d,e,f,g,h){a=a|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;u=x;x=x+1152|0;t=u+144|0;k=u+1128|0;l=u+80|0;n=u+48|0;j=u;o=u+984|0;s=u+184|0;i=b[a+1560>>2]|0;if(!(i&1)){t=3;x=u;return t|0}if(!(i&8)){t=12;x=u;return t|0}fb(s,a+944|0);p=s+144|0;fb(p,a+1088|0);q=s+288|0;fb(q,a+1232|0);r=s+432|0;fb(r,a+1376|0);va(t,64);Sa(j,t,a);bd(s,j);bd(p,j);bd(q,j);bd(r,j);b[t>>2]=f;b[t+4>>2]=f;b[t+8>>2]=e;b[k>>2]=0;b[k+4>>2]=32;b[k+8>>2]=n;Sc(2,32,k,32,t,-1,0);b[t>>2]=32;b[t+4>>2]=32;b[t+8>>2]=n;E(o,t);m=s+576|0;fb(m,o);i=a+1520|0;bd(m,i);b[t>>2]=d;b[t+4>>2]=d;b[t+8>>2]=c;b[k>>2]=0;b[k+4>>2]=32;b[k+8>>2]=l;Sc(2,32,k,32,t,-1,0);b[t>>2]=f;b[t+4>>2]=f;b[t+8>>2]=e;b[k>>2]=0;b[k+4>>2]=32;b[k+8>>2]=l+32;Sc(2,32,k,32,t,-1,0);b[t>>2]=64;b[t+4>>2]=64;b[t+8>>2]=l;b[k>>2]=0;b[k+4>>2]=32;b[k+8>>2]=n;Sc(2,32,k,32,t,-1,0);j=s+720|0;c=s+760|0;ha(a,p,o,r,m,i,n,j,c);i=b[h>>2]|0;if(((((((i|0)>=65?(b[t>>2]=0,b[t+4>>2]=i,b[t+8>>2]=g,qb(t,s,0),(i|0)>=130):0)?(b[t>>2]=0,b[t+4>>2]=i+-65,b[t+8>>2]=g+65,qb(t,p,0),(i|0)>=195):0)?(b[t>>2]=0,b[t+4>>2]=i+-130,b[t+8>>2]=g+130,qb(t,q,0),(i|0)>=260):0)?(b[t>>2]=0,b[t+4>>2]=i+-195,b[t+8>>2]=g+195,qb(t,r,0),(i|0)>=325):0)?(b[t>>2]=0,b[t+4>>2]=i+-260,b[t+8>>2]=g+260,qb(t,m,0),(i|0)>=357):0)?(oa(g+325|0,j),(i|0)>=389):0){oa(g+357|0,c);b[h>>2]=389;i=1}else i=6;t=i;x=u;return t|0}function U(a,c,d,e,f,g,h){a=a|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;p=x;x=x+1088|0;j=p+1064|0;k=p+1052|0;l=p+32|0;m=p;n=p+896|0;o=p+96|0;i=p+1040|0;if(!(b[a+1560>>2]&4)){o=11;x=p;return o|0}b[i>>2]=0;b[i+4>>2]=h;b[i+8>>2]=g;if(!(V(i,o)|0))i=14;else{h=a+128|0;b[j>>2]=f;b[j+4>>2]=f;b[j+8>>2]=e;b[k>>2]=0;b[k+4>>2]=32;b[k+8>>2]=m;Sc(2,32,k,32,j,-1,0);b[j>>2]=32;b[j+4>>2]=32;b[j+8>>2]=m;E(n,j);b[j>>2]=d;b[j+4>>2]=d;b[j+8>>2]=c;b[k>>2]=0;b[k+4>>2]=32;b[k+8>>2]=l;Sc(2,32,k,32,j,-1,0);b[j>>2]=f;b[j+4>>2]=f;b[j+8>>2]=e;b[k>>2]=0;b[k+4>>2]=32;b[k+8>>2]=l+32;Sc(2,32,k,32,j,-1,0);b[j>>2]=64;b[j+4>>2]=64;b[j+8>>2]=l;b[k>>2]=0;b[k+4>>2]=32;b[k+8>>2]=m;Sc(2,32,k,32,j,-1,0);i=o+144|0;g=o+432|0;if(((ea(i,n,g,o+576|0,m,o+720|0,o+760|0)|0)!=0?(eb(o)|0)==0:0)?(eb(i)|0)==0:0)i=(fa(o,i,o+288|0,g,h,a+416|0,a)|0)!=0&1;else i=0}o=i;x=p;return o|0}function V(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=x;x=x+16|0;f=i;e=b[a>>2]|0;g=e+65|0;b[a>>2]=g;h=a+4|0;d=b[h>>2]|0;if((g|0)>(d|0)){h=0;x=i;return h|0}b[f>>2]=0;b[f+4>>2]=d-e;g=a+8|0;b[f+8>>2]=(b[g>>2]|0)+e;if(!(rb(c,f)|0)){h=0;x=i;return h|0}d=b[a>>2]|0;j=d+65|0;b[a>>2]=j;e=b[h>>2]|0;if((j|0)>(e|0)){j=0;x=i;return j|0}b[f>>2]=0;b[f+4>>2]=e-d;b[f+8>>2]=(b[g>>2]|0)+d;if(!(rb(c+144|0,f)|0)){j=0;x=i;return j|0}d=b[a>>2]|0;j=d+65|0;b[a>>2]=j;e=b[h>>2]|0;if((j|0)>(e|0)){j=0;x=i;return j|0}b[f>>2]=0;b[f+4>>2]=e-d;b[f+8>>2]=(b[g>>2]|0)+d;if(!(rb(c+288|0,f)|0)){j=0;x=i;return j|0}d=b[a>>2]|0;j=d+65|0;b[a>>2]=j;e=b[h>>2]|0;if((j|0)>(e|0)){j=0;x=i;return j|0}b[f>>2]=0;b[f+4>>2]=e-d;b[f+8>>2]=(b[g>>2]|0)+d;if(!(rb(c+432|0,f)|0)){j=0;x=i;return j|0}d=b[a>>2]|0;j=d+65|0;b[a>>2]=j;e=b[h>>2]|0;if((j|0)>(e|0)){j=0;x=i;return j|0}b[f>>2]=0;b[f+4>>2]=e-d;b[f+8>>2]=(b[g>>2]|0)+d;if(!(rb(c+576|0,f)|0)){j=0;x=i;return j|0}d=b[a>>2]|0;j=d+32|0;b[a>>2]=j;if((j|0)>(b[h>>2]|0)){j=0;x=i;return j|0}ra(c+720|0,(b[g>>2]|0)+d|0);d=b[a>>2]|0;j=d+32|0;b[a>>2]=j;if((j|0)>(b[h>>2]|0)){j=0;x=i;return j|0}ra(c+760|0,(b[g>>2]|0)+d|0);j=1;x=i;return j|0}function W(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;h=x;x=x+832|0;f=h+812|0;g=h;i=h+800|0;b[i>>2]=0;b[i+4>>2]=c;b[i+8>>2]=a;a=b[e>>2]|0;if(!(V(i,g)|0)){i=14;x=h;return i|0}if((a|0)<65){i=6;x=h;return i|0}b[f>>2]=0;b[f+4>>2]=a;b[f+8>>2]=d;qb(f,g+576|0,0);b[e>>2]=65;i=1;x=h;return i|0}function X(){return 1568}function Y(){return 1840}function Z(){return 1844}function _(){return 1}function $(){return 0}function aa(a){a=a|0;do switch(a|0){case 0:{a=1850;break}case 1:{a=1853;break}case 2:{a=1856;break}case 3:{a=1871;break}case 4:{a=1882;break}case 5:{a=1908;break}case 6:{a=1933;break}case 7:{a=1957;break}case 8:{a=1982;break}case 9:{a=2004;break}case 10:{a=2029;break}case 11:{a=2055;break}case 12:{a=2080;break}case 13:{a=2105;break}case 14:{a=2126;break}default:a=2144}while(0);return a|0}function ba(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;h=x;x=x+240|0;d=h;e=h+136|0;f=h+40|0;g=b[c>>2]|0;i=g+128|0;b[c>>2]=i;if((i|0)>(b[c+4>>2]|0)){i=0;x=h;return i|0}i=(b[c+8>>2]|0)+g|0;Ya(e,f,a)|0;xc(d,e);oa(i,d);xc(d,e+48|0);oa(i+32|0,d);xc(d,f);oa(i+64|0,d);xc(d,f+48|0);oa(i+96|0,d);i=1;x=h;return i|0}function ca(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=x;x=x+1200|0;h=f+560|0;j=f+1188|0;i=f+528|0;k=f+144|0;l=f+1176|0;o=f+96|0;p=f+48|0;m=f+888|0;n=f+600|0;g=f;va(p,64);Ua(o,d,p);Va(m,a);Va(n,c);cd(m,e);cd(n,o);ab(m,n)|0;b[l>>2]=0;b[l+4>>2]=384;b[l+8>>2]=k;ba(c,l)|0;ba(a,l)|0;ba(m,l)|0;e=b[l>>2]|0;b[h>>2]=e;b[h+4>>2]=e;b[h+8>>2]=k;b[j>>2]=0;b[j+4>>2]=32;b[j+8>>2]=i;Sc(2,32,j,32,h,-1,0);ra(g,i);va(h,64);Na(g,h);e=(La(d,g)|0)==0&1;x=f;return e|0}function da(c,d,e,f,g){c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0;n=x;x=x+336|0;j=n+272|0;k=n+312|0;l=n+240|0;m=n;if(!c)c=0;else{i=m;h=i+32|0;do{a[i>>0]=a[c>>0]|0;i=i+1|0;c=c+1|0}while((i|0)<(h|0));c=32}i=c|65;b[j>>2]=0;b[j+4>>2]=227-c;b[j+8>>2]=m+c;qb(j,d,0);b[j>>2]=0;b[j+4>>2]=227-i;b[j+8>>2]=m+i;qb(j,e,0);e=c|195;b[j>>2]=0;b[j+4>>2]=162-i;b[j+8>>2]=m+(i+65);qb(j,f,0);b[j>>2]=e;b[j+4>>2]=e;b[j+8>>2]=m;b[k>>2]=0;b[k+4>>2]=32;b[k+8>>2]=l;Sc(2,32,k,32,j,-1,0);ra(g,l);va(j,64);Na(g,j);x=n;return}function ea(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;h=x;x=x+720|0;n=h+96|0;o=h+48|0;k=h+568|0;m=h+424|0;j=h+280|0;l=h+136|0;i=h;va(o,64);Ua(n,f,o);fb(k,a);fb(m,c);fb(j,b);fb(l,d);bd(k,g);bd(m,n);bd(j,g);bd(l,n);ob(k,m);ob(j,l);ga(e,c,d,a,b,k,j,i);g=(La(f,i)|0)==0&1;x=h;return g|0}function fa(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;u=x;x=x+40768|0;r=u+240|0;s=u+40672|0;t=u+40528|0;h=u+40384|0;i=u+40240|0;j=u+39952|0;k=u+192|0;l=u+144|0;m=u+96|0;n=u+48|0;o=u;p=u+39368|0;q=u+38784|0;if(eb(a)|0){t=0;x=u;return t|0}va(o,64);Cc(r,304);Cc(r+48|0,352);Cc(s,400);Cc(s+48|0,448);Za(j,r,s)|0;va(r,64);Sa(k,r,g);va(r,64);Sa(l,r,g);Ua(m,k,o);Ua(n,l,o);fb(t,a);bd(t,k);fb(h,b);bd(h,m);fb(i,c);bd(i,n);ob(h,i);fb(i,a);ob(i,d);bd(i,l);Wc(r);_c(r,f,t);_c(r,j,h);_c(r,e,i);Xc(p,r);ad(p);tb(q);t=(vb(p,q)|0)!=0&1;x=u;return t|0}function ga(c,d,e,f,g,h,i,j){c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0;q=x;x=x+528|0;o=q+464|0;p=q+504|0;m=q+432|0;n=q;if(!c)c=0;else{l=n;k=l+32|0;do{a[l>>0]=a[c>>0]|0;l=l+1|0;c=c+1|0}while((l|0)<(k|0));c=32}l=c|65;b[o>>2]=0;b[o+4>>2]=422-c;b[o+8>>2]=n+c;qb(o,d,0);b[o>>2]=0;b[o+4>>2]=422-l;b[o+8>>2]=n+l;qb(o,e,0);e=c|195;b[o>>2]=0;b[o+4>>2]=357-l;b[o+8>>2]=n+(l+65);qb(o,f,0);b[o>>2]=0;b[o+4>>2]=422-e;b[o+8>>2]=n+e;qb(o,g,0);b[o>>2]=0;b[o+4>>2]=357-e;b[o+8>>2]=n+(e+65);qb(o,h,0);h=e+195|0;b[o>>2]=0;b[o+4>>2]=292-e;b[o+8>>2]=n+(e+130);qb(o,i,0);b[o>>2]=h;b[o+4>>2]=h;b[o+8>>2]=n;b[p>>2]=0;b[p+4>>2]=32;b[p+8>>2]=m;Sc(2,32,p,32,o,-1,0);ra(j,m);va(o,64);Na(j,o);x=q;return}function ha(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0;j=x;x=x+384|0;n=j+96|0;l=j+48|0;k=j;m=j+240|0;va(k,64);va(n,64);Sa(l,n,a);fb(n,b);fb(m,c);bd(n,l);bd(m,l);ga(g,d,e,b,c,n,m,h);Ta(i,h,f,k);Aa(i,i,l);Na(i,k);x=j;return}function ia(a){a=a|0;var c=0,d=0,e=0,f=0;c=a;d=a+8|0;e=a+16|0;f=a+24|0;a=a+32|0;a=yd(b[a>>2]|(b[f>>2]|(b[e>>2]|(b[d>>2]|b[c>>2])))|0,b[a+4>>2]|(b[f+4>>2]|(b[e+4>>2]|(b[d+4>>2]|b[c+4>>2])))|0,-1,33554431)|0;a=Id(a|0,r()|0,56)|0;r()|0;return a&1|0}function ja(a){a=a|0;var c=0,d=0,e=0,f=0;c=a+8|0;d=a+16|0;e=a+24|0;f=a+32|0;c=yd(b[f>>2]|(b[e>>2]|(b[d>>2]|b[c>>2]))|0,b[f+4>>2]|(b[e+4>>2]|(b[d+4>>2]|b[c+4>>2]))|0,-1,33554431)|0;c=Id(c|0,r()|0,56)|0;r()|0;a=yd(b[a>>2]^1|0,b[a+4>>2]|0,-1,-1)|0;a=Hd(a|0,r()|0,56)|0;r()|0;return c&1&a|0}function ka(a){a=a|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0;p=x;x=x+48|0;c=p;e=a;k=b[e>>2]|0;e=b[e+4>>2]|0;g=a+8|0;f=b[g>>2]|0;g=b[g+4>>2]|0;m=c+8|0;i=a+16|0;h=b[i>>2]|0;i=b[i+4>>2]|0;n=c+16|0;l=a+24|0;j=b[l>>2]|0;l=b[l+4>>2]|0;o=c+24|0;d=a+32|0;q=b[d>>2]|0;d=b[d+4>>2]|0;a=e&16777215;s=c;b[s>>2]=k;b[s+4>>2]=a;e=Hd(k|0,e|0,56)|0;e=yd(f|0,g|0,e|0,r()|0)|0;g=r()|0;f=g&16777215;s=m;b[s>>2]=e;b[s+4>>2]=f;g=Hd(e|0,g|0,56)|0;g=yd(h|0,i|0,g|0,r()|0)|0;i=r()|0;h=i&16777215;s=n;b[s>>2]=g;b[s+4>>2]=h;i=Hd(g|0,i|0,56)|0;i=yd(j|0,l|0,i|0,r()|0)|0;l=r()|0;j=l&16777215;s=o;b[s>>2]=i;b[s+4>>2]=j;l=Hd(i|0,l|0,56)|0;l=yd(q|0,d|0,l|0,r()|0)|0;d=r()|0;q=c+32|0;b[q>>2]=l;b[q+4>>2]=d;if((l|0)==0&(d|0)==0){if((i|0)==0&(j|0)==0)if((g|0)==0&(h|0)==0)if((e|0)==0&(f|0)==0)if((k|0)==0&(a|0)==0){s=0;x=p;return s|0}else a=0;else{a=56;c=m}else{a=112;c=n}else{a=168;c=o}d=c;c=b[d>>2]|0;d=b[d+4>>2]|0;if((c|0)==0&(d|0)==0){s=a;x=p;return s|0}}else{a=224;c=l}do{q=c;c=Cd(c|0,d|0,2,0)|0;s=d;d=r()|0;a=a+1|0;s=yd(q|0,s|0,1,0)|0;q=r()|0}while(!(q>>>0<0|(q|0)==0&s>>>0<3));x=p;return a|0}function la(a,c){a=a|0;c=c|0;var d=0,e=0,f=0;e=c;d=b[e+4>>2]|0;f=a;b[f>>2]=b[e>>2];b[f+4>>2]=d;f=c+8|0;d=b[f+4>>2]|0;e=a+8|0;b[e>>2]=b[f>>2];b[e+4>>2]=d;e=c+16|0;d=b[e+4>>2]|0;f=a+16|0;b[f>>2]=b[e>>2];b[f+4>>2]=d;f=c+24|0;d=b[f+4>>2]|0;e=a+24|0;b[e>>2]=b[f>>2];b[e+4>>2]=d;e=c+32|0;d=b[e+4>>2]|0;c=a+32|0;b[c>>2]=b[e>>2];b[c+4>>2]=d;return}function ma(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;e=(c|0)/56|0;f=c-(e*56|0)|0;g=5-e|0;h=g+-1|0;if((g|0)>1){i=56-f|0;d=0;do{m=d+e|0;l=a+(m<<3)|0;l=Hd(b[l>>2]|0,b[l+4>>2]|0,f|0)|0;k=r()|0;m=a+(m+1<<3)|0;m=Jd(b[m>>2]|0,b[m+4>>2]|0,i|0)|0;k=(r()|0)&16777215|k;j=a+(d<<3)|0;b[j>>2]=m|l;b[j+4>>2]=k;d=d+1|0}while((d|0)<(h|0))}if((c|0)<280?(k=a+32|0,k=Hd(b[k>>2]|0,b[k+4>>2]|0,f|0)|0,l=r()|0,m=a+(h<<3)|0,b[m>>2]=k,b[m+4>>2]=l,(c|0)<=55):0)return;Ld(a+(g<<3)|0,0,(e+((g|0)>4?g:4)<<3)+-32|0)|0;return}function na(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=0-d|0;h=((e|0)<0)<<31>>31;g=a;f=b[g>>2]|0;g=b[g+4>>2]|0;i=c;g=(b[i+4>>2]^g)&h^g;d=a;b[d>>2]=(b[i>>2]^f)&e^f;b[d+4>>2]=g;d=a+8|0;g=d;f=b[g>>2]|0;g=b[g+4>>2]|0;i=c+8|0;g=(b[i+4>>2]^g)&h^g;b[d>>2]=(b[i>>2]^f)&e^f;b[d+4>>2]=g;d=a+16|0;g=d;f=b[g>>2]|0;g=b[g+4>>2]|0;i=c+16|0;g=(b[i+4>>2]^g)&h^g;b[d>>2]=(b[i>>2]^f)&e^f;b[d+4>>2]=g;d=a+24|0;g=d;f=b[g>>2]|0;g=b[g+4>>2]|0;i=c+24|0;g=(b[i+4>>2]^g)&h^g;b[d>>2]=(b[i>>2]^f)&e^f;b[d+4>>2]=g;d=a+32|0;g=d;a=b[g>>2]|0;g=b[g+4>>2]|0;f=c+32|0;c=(b[f+4>>2]^g)&h^g;b[d>>2]=(b[f>>2]^a)&e^a;b[d+4>>2]=c;return}function oa(c,d){c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;f=d;e=b[f>>2]|0;f=b[f+4>>2]|0;h=d+8|0;n=b[h>>2]|0;h=b[h+4>>2]|0;i=d+16|0;j=b[i>>2]|0;i=b[i+4>>2]|0;k=d+24|0;l=b[k>>2]|0;k=b[k+4>>2]|0;m=d+32|0;d=b[m>>2]|0;m=b[m+4>>2]|0;g=Hd(e|0,f|0,56)|0;g=yd(n|0,h|0,g|0,r()|0)|0;h=r()|0;n=Hd(g|0,h|0,56)|0;i=yd(n|0,r()|0,j|0,i|0)|0;j=r()|0;n=Hd(i|0,j|0,56)|0;k=yd(n|0,r()|0,l|0,k|0)|0;l=r()|0;n=Hd(k|0,l|0,56)|0;m=yd(n|0,r()|0,d|0,m|0)|0;d=31;f=f&16777215;h=h&16777215;j=j&16777215;l=l&16777215;n=r()|0;while(1){a[c+d>>0]=e;e=Hd(e|0,f|0,8)|0;o=r()|0;Jd(g|0,h|0,48)|0;f=(r()|0)&16711680|o;g=Hd(g|0,h|0,8)|0;o=r()|0;Jd(i|0,j|0,48)|0;h=(r()|0)&16711680|o;i=Hd(i|0,j|0,8)|0;o=r()|0;Jd(k|0,l|0,48)|0;j=(r()|0)&16711680|o;k=Hd(k|0,l|0,8)|0;o=r()|0;Jd(m|0,n|0,48)|0;l=(r()|0)&16711680|o;m=Hd(m|0,n|0,8)|0;n=r()|0;if(!d)break;else d=d+-1|0}return}function pa(a){a=a|0;var c=0,d=0,e=0,f=0;e=a;c=b[e>>2]|0;e=b[e+4>>2]|0;d=a;b[d>>2]=c;b[d+4>>2]=e&16777215;e=Hd(c|0,e|0,56)|0;c=r()|0;d=a+8|0;f=d;c=yd(b[f>>2]|0,b[f+4>>2]|0,e|0,c|0)|0;e=r()|0;b[d>>2]=c;b[d+4>>2]=e&16777215;e=Hd(c|0,e|0,56)|0;c=r()|0;d=a+16|0;f=d;c=yd(b[f>>2]|0,b[f+4>>2]|0,e|0,c|0)|0;e=r()|0;b[d>>2]=c;b[d+4>>2]=e&16777215;e=Hd(c|0,e|0,56)|0;c=r()|0;d=a+24|0;f=d;c=yd(b[f>>2]|0,b[f+4>>2]|0,e|0,c|0)|0;e=r()|0;b[d>>2]=c;b[d+4>>2]=e&16777215;e=Hd(c|0,e|0,56)|0;c=r()|0;d=a+32|0;a=d;c=yd(b[a>>2]|0,b[a+4>>2]|0,e|0,c|0)|0;a=r()|0;b[d>>2]=c;b[d+4>>2]=a;a=Hd(c|0,a|0,32)|0;q(r()|0);return a|0}function qa(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;i=a;e=b[i>>2]|0;i=b[i+4>>2]|0;d=Jd(1,0,c|0)|0;d=yd(d|0,r()|0,-1,0)|0;h=r()|0;m=56-c|0;f=Hd(e|0,i|0,c|0)|0;n=r()|0;j=a+8|0;k=j;l=b[k>>2]|0;k=b[k+4>>2]|0;o=Jd(l|0,k|0,m|0)|0;n=(r()|0)&16777215|n;g=a;b[g>>2]=o|f;b[g+4>>2]=n;k=Hd(l|0,k|0,c|0)|0;l=r()|0;g=a+16|0;n=g;f=b[n>>2]|0;n=b[n+4>>2]|0;o=Jd(f|0,n|0,m|0)|0;l=(r()|0)&16777215|l;b[j>>2]=o|k;b[j+4>>2]=l;n=Hd(f|0,n|0,c|0)|0;f=r()|0;j=a+24|0;l=j;k=b[l>>2]|0;l=b[l+4>>2]|0;o=Jd(k|0,l|0,m|0)|0;f=(r()|0)&16777215|f;b[g>>2]=o|n;b[g+4>>2]=f;l=Hd(k|0,l|0,c|0)|0;k=r()|0;g=a+32|0;f=g;a=b[f>>2]|0;f=b[f+4>>2]|0;m=Jd(a|0,f|0,m|0)|0;k=(r()|0)&16777215|k;b[j>>2]=m|l;b[j+4>>2]=k;f=Hd(a|0,f|0,c|0)|0;a=r()|0;c=g;b[c>>2]=f;b[c+4>>2]=a;return e&d|0}function ra(a,d){a=a|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0;e=a;f=e+40|0;do{b[e>>2]=0;e=e+4|0}while((e|0)<(f|0));h=a+32|0;k=a+24|0;n=a+16|0;o=a+8|0;e=0;f=0;g=0;i=0;j=0;l=0;m=0;p=0;q=0;s=0;t=0;do{u=Jd(s|0,t|0,8)|0;v=r()|0;w=Hd(f|0,g|0,48)|0;s=w|u;t=r()|0|v;v=h;b[v>>2]=s;b[v+4>>2]=t;v=Jd(f|0,g|0,8)|0;u=(r()|0)&16777215;w=Hd(i|0,j|0,48)|0;f=w|v&-256;g=r()|0|u;u=k;b[u>>2]=f;b[u+4>>2]=g;u=Jd(i|0,j|0,8)|0;v=(r()|0)&16777215;w=Hd(l|0,m|0,48)|0;i=w|u&-256;j=r()|0|v;v=n;b[v>>2]=i;b[v+4>>2]=j;v=Jd(l|0,m|0,8)|0;u=(r()|0)&16777215;w=Hd(p|0,q|0,48)|0;l=w|v&-256;m=r()|0|u;u=o;b[u>>2]=l;b[u+4>>2]=m;u=Jd(p|0,q|0,8)|0;u=u&-256;q=(r()|0)&16777215;v=a;b[v>>2]=u;b[v+4>>2]=q;p=u|(c[d+e>>0]|0);u=a;b[u>>2]=p;b[u+4>>2]=q;e=e+1|0}while((e|0)!=32);return}function sa(a){a=a|0;var c=0;c=a+40|0;do{b[a>>2]=0;a=a+4|0}while((a|0)<(c|0));return}function ta(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;f=a+32|0;l=f;l=Jd(b[l>>2]|0,b[l+4>>2]|0,c|0)|0;d=r()|0;g=a+24|0;k=g;j=b[k>>2]|0;k=b[k+4>>2]|0;i=56-c|0;e=Hd(j|0,k|0,i|0)|0;d=r()|0|d;b[f>>2]=e|l;b[f+4>>2]=d;k=Jd(j|0,k|0,c|0)|0;j=(r()|0)&16777215;f=a+16|0;l=f;e=b[l>>2]|0;l=b[l+4>>2]|0;h=Hd(e|0,l|0,i|0)|0;j=j|(r()|0);b[g>>2]=k|h;b[g+4>>2]=j;l=Jd(e|0,l|0,c|0)|0;e=(r()|0)&16777215;g=a+8|0;j=g;h=b[j>>2]|0;j=b[j+4>>2]|0;k=Hd(h|0,j|0,i|0)|0;e=e|(r()|0);b[f>>2]=l|k;b[f+4>>2]=e;j=Jd(h|0,j|0,c|0)|0;h=(r()|0)&16777215;f=a;e=b[f>>2]|0;f=b[f+4>>2]|0;i=Hd(e|0,f|0,i|0)|0;h=h|(r()|0);b[g>>2]=j|i;b[g+4>>2]=h;f=Jd(e|0,f|0,c|0)|0;e=(r()|0)&16777215;c=a;b[c>>2]=f;b[c+4>>2]=e;return d|0}function ua(a){a=a|0;var c=0,d=0,e=0,f=0;c=a;d=b[c>>2]|0;c=b[c+4>>2]|0;e=a;b[e>>2]=d;b[e+4>>2]=c&16777215;c=Hd(d|0,c|0,56)|0;d=r()|0;e=a+8|0;f=e;d=yd(b[f>>2]|0,b[f+4>>2]|0,c|0,d|0)|0;c=r()|0;b[e>>2]=d;b[e+4>>2]=c&16777215;c=Hd(d|0,c|0,56)|0;d=r()|0;e=a+16|0;f=e;d=yd(b[f>>2]|0,b[f+4>>2]|0,c|0,d|0)|0;c=r()|0;b[e>>2]=d;b[e+4>>2]=c&16777215;c=Hd(d|0,c|0,56)|0;d=r()|0;e=a+24|0;f=e;d=yd(b[f>>2]|0,b[f+4>>2]|0,c|0,d|0)|0;c=r()|0;b[e>>2]=d;b[e+4>>2]=c&16777215;c=Hd(d|0,c|0,56)|0;d=r()|0;e=a+32|0;f=e;d=yd(b[f>>2]|0,b[f+4>>2]|0,c|0,d|0)|0;c=r()|0;b[e>>2]=d;b[e+4>>2]=c&16777215;c=Hd(d|0,c|0,56)|0;d=r()|0;e=a+40|0;f=e;d=yd(b[f>>2]|0,b[f+4>>2]|0,c|0,d|0)|0;c=r()|0;b[e>>2]=d;b[e+4>>2]=c&16777215;c=Hd(d|0,c|0,56)|0;d=r()|0;e=a+48|0;f=e;d=yd(b[f>>2]|0,b[f+4>>2]|0,c|0,d|0)|0;c=r()|0;b[e>>2]=d;b[e+4>>2]=c&16777215;c=Hd(d|0,c|0,56)|0;d=r()|0;e=a+56|0;f=e;d=yd(b[f>>2]|0,b[f+4>>2]|0,c|0,d|0)|0;c=r()|0;b[e>>2]=d;b[e+4>>2]=c&16777215;c=Hd(d|0,c|0,56)|0;d=r()|0;e=a+64|0;f=e;d=yd(b[f>>2]|0,b[f+4>>2]|0,c|0,d|0)|0;c=r()|0;b[e>>2]=d;b[e+4>>2]=c&16777215;c=Hd(d|0,c|0,56)|0;d=r()|0;a=a+72|0;e=a;d=yd(b[e>>2]|0,b[e+4>>2]|0,c|0,d|0)|0;c=r()|0;b[a>>2]=d;b[a+4>>2]=c;return}function va(a,c){a=a|0;c=c|0;var d=0,e=0,f=0;e=c;d=b[e+4>>2]|0;f=a;b[f>>2]=b[e>>2];b[f+4>>2]=d;f=c+8|0;d=b[f+4>>2]|0;e=a+8|0;b[e>>2]=b[f>>2];b[e+4>>2]=d;e=c+16|0;d=b[e+4>>2]|0;f=a+16|0;b[f>>2]=b[e>>2];b[f+4>>2]=d;f=c+24|0;d=b[f+4>>2]|0;e=a+24|0;b[e>>2]=b[f>>2];b[e+4>>2]=d;e=c+32|0;d=b[e+4>>2]|0;c=a+32|0;b[c>>2]=b[e>>2];b[c+4>>2]=d;return}function wa(a,c){a=a|0;c=c|0;var d=0,e=0,f=0;e=c;f=b[e+4>>2]|0;d=a;b[d>>2]=b[e>>2];b[d+4>>2]=f;d=c+8|0;f=b[d+4>>2]|0;e=a+8|0;b[e>>2]=b[d>>2];b[e+4>>2]=f;e=c+16|0;f=b[e+4>>2]|0;d=a+16|0;b[d>>2]=b[e>>2];b[d+4>>2]=f;d=c+24|0;f=b[d+4>>2]|0;e=a+24|0;b[e>>2]=b[d>>2];b[e+4>>2]=f;e=c+32|0;f=e;c=b[f+4>>2]&16777215;d=a+32|0;b[d>>2]=b[f>>2];b[d+4>>2]=c;e=Hd(b[e>>2]|0,b[e+4>>2]|0,56)|0;d=r()|0;c=a+40|0;b[c>>2]=e;b[c+4>>2]=d;c=a+48|0;b[c>>2]=0;b[c+4>>2]=0;b[c+8>>2]=0;b[c+12>>2]=0;b[c+16>>2]=0;b[c+20>>2]=0;b[c+24>>2]=0;b[c+28>>2]=0;return}function xa(a,c){a=a|0;c=c|0;var d=0,e=0,f=0;d=a;e=d+40|0;do{b[d>>2]=0;d=d+4|0}while((d|0)<(e|0));d=c;e=b[d+4>>2]|0;f=a+40|0;b[f>>2]=b[d>>2];b[f+4>>2]=e;f=c+8|0;e=b[f+4>>2]|0;d=a+48|0;b[d>>2]=b[f>>2];b[d+4>>2]=e;d=c+16|0;e=b[d+4>>2]|0;f=a+56|0;b[f>>2]=b[d>>2];b[f+4>>2]=e;f=c+24|0;e=b[f+4>>2]|0;d=a+64|0;b[d>>2]=b[f>>2];b[d+4>>2]=e;c=c+32|0;d=b[c+4>>2]|0;e=a+72|0;b[e>>2]=b[c>>2];b[e+4>>2]=d;return}function ya(a){a=a|0;var c=0;c=a+80|0;do{b[a>>2]=0;a=a+4|0}while((a|0)<(c|0));return}function za(a){a=a|0;var c=0;c=a;b[c>>2]=1;b[c+4>>2]=0;a=a+8|0;b[a>>2]=0;b[a+4>>2]=0;b[a+8>>2]=0;b[a+12>>2]=0;b[a+16>>2]=0;b[a+20>>2]=0;b[a+24>>2]=0;b[a+28>>2]=0;return}function Aa(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0;e=c;f=d;e=yd(b[f>>2]|0,b[f+4>>2]|0,b[e>>2]|0,b[e+4>>2]|0)|0;f=r()|0;g=a;b[g>>2]=e;b[g+4>>2]=f;g=c+8|0;f=d+8|0;g=yd(b[f>>2]|0,b[f+4>>2]|0,b[g>>2]|0,b[g+4>>2]|0)|0;f=r()|0;e=a+8|0;b[e>>2]=g;b[e+4>>2]=f;e=c+16|0;f=d+16|0;e=yd(b[f>>2]|0,b[f+4>>2]|0,b[e>>2]|0,b[e+4>>2]|0)|0;f=r()|0;g=a+16|0;b[g>>2]=e;b[g+4>>2]=f;g=c+24|0;f=d+24|0;g=yd(b[f>>2]|0,b[f+4>>2]|0,b[g>>2]|0,b[g+4>>2]|0)|0;f=r()|0;e=a+24|0;b[e>>2]=g;b[e+4>>2]=f;e=c+32|0;c=d+32|0;e=yd(b[c>>2]|0,b[c+4>>2]|0,b[e>>2]|0,b[e+4>>2]|0)|0;c=r()|0;d=a+32|0;b[d>>2]=e;b[d+4>>2]=c;return}function Ba(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;e=a;d=b[e>>2]|0;e=b[e+4>>2]|0;g=Hd(d|0,e|0,56)|0;h=r()|0;f=a+8|0;i=f;h=yd(b[i>>2]|0,b[i+4>>2]|0,g|0,h|0)|0;g=r()|0;b[f>>2]=h;b[f+4>>2]=g&16777215;g=Hd(h|0,g|0,56)|0;h=r()|0;f=a+16|0;i=f;h=yd(b[i>>2]|0,b[i+4>>2]|0,g|0,h|0)|0;g=r()|0;b[f>>2]=h;b[f+4>>2]=g&16777215;g=Hd(h|0,g|0,56)|0;h=r()|0;f=a+24|0;i=f;h=yd(b[i>>2]|0,b[i+4>>2]|0,g|0,h|0)|0;g=r()|0;b[f>>2]=h;b[f+4>>2]=g&16777215;g=Hd(h|0,g|0,56)|0;h=r()|0;f=a+32|0;i=f;h=yd(b[i>>2]|0,b[i+4>>2]|0,g|0,h|0)|0;g=r()|0;b[f>>2]=h;b[f+4>>2]=g;e=yd(d|0,e&16777215|0,c|0,((c|0)<0)<<31>>31|0)|0;d=r()|0;c=a;b[c>>2]=e;b[c+4>>2]=d;return}function Ca(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0;f=c;g=d;g=zd(b[f>>2]|0,b[f+4>>2]|0,b[g>>2]|0,b[g+4>>2]|0)|0;f=r()|0;e=a;b[e>>2]=g;b[e+4>>2]=f;e=c+8|0;f=d+8|0;f=zd(b[e>>2]|0,b[e+4>>2]|0,b[f>>2]|0,b[f+4>>2]|0)|0;e=r()|0;g=a+8|0;b[g>>2]=f;b[g+4>>2]=e;g=c+16|0;e=d+16|0;e=zd(b[g>>2]|0,b[g+4>>2]|0,b[e>>2]|0,b[e+4>>2]|0)|0;g=r()|0;f=a+16|0;b[f>>2]=e;b[f+4>>2]=g;f=c+24|0;g=d+24|0;g=zd(b[f>>2]|0,b[f+4>>2]|0,b[g>>2]|0,b[g+4>>2]|0)|0;f=r()|0;e=a+24|0;b[e>>2]=g;b[e+4>>2]=f;c=c+32|0;e=d+32|0;e=zd(b[c>>2]|0,b[c+4>>2]|0,b[e>>2]|0,b[e+4>>2]|0)|0;c=r()|0;d=a+32|0;b[d>>2]=e;b[d+4>>2]=c;return}function Da(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0;e=c;f=d;f=zd(b[e>>2]|0,b[e+4>>2]|0,b[f>>2]|0,b[f+4>>2]|0)|0;e=r()|0;g=a;b[g>>2]=f;b[g+4>>2]=e;g=c+8|0;e=d+8|0;e=zd(b[g>>2]|0,b[g+4>>2]|0,b[e>>2]|0,b[e+4>>2]|0)|0;g=r()|0;f=a+8|0;b[f>>2]=e;b[f+4>>2]=g;f=c+16|0;g=d+16|0;g=zd(b[f>>2]|0,b[f+4>>2]|0,b[g>>2]|0,b[g+4>>2]|0)|0;f=r()|0;e=a+16|0;b[e>>2]=g;b[e+4>>2]=f;e=c+24|0;f=d+24|0;f=zd(b[e>>2]|0,b[e+4>>2]|0,b[f>>2]|0,b[f+4>>2]|0)|0;e=r()|0;g=a+24|0;b[g>>2]=f;b[g+4>>2]=e;g=c+32|0;e=d+32|0;e=zd(b[g>>2]|0,b[g+4>>2]|0,b[e>>2]|0,b[e+4>>2]|0)|0;g=r()|0;f=a+32|0;b[f>>2]=e;b[f+4>>2]=g;f=c+40|0;g=d+40|0;g=zd(b[f>>2]|0,b[f+4>>2]|0,b[g>>2]|0,b[g+4>>2]|0)|0;f=r()|0;e=a+40|0;b[e>>2]=g;b[e+4>>2]=f;e=c+48|0;f=d+48|0;f=zd(b[e>>2]|0,b[e+4>>2]|0,b[f>>2]|0,b[f+4>>2]|0)|0;e=r()|0;g=a+48|0;b[g>>2]=f;b[g+4>>2]=e;g=c+56|0;e=d+56|0;e=zd(b[g>>2]|0,b[g+4>>2]|0,b[e>>2]|0,b[e+4>>2]|0)|0;g=r()|0;f=a+56|0;b[f>>2]=e;b[f+4>>2]=g;f=c+64|0;g=d+64|0;g=zd(b[f>>2]|0,b[f+4>>2]|0,b[g>>2]|0,b[g+4>>2]|0)|0;f=r()|0;e=a+64|0;b[e>>2]=g;b[e+4>>2]=f;c=c+72|0;e=d+72|0;e=zd(b[c>>2]|0,b[c+4>>2]|0,b[e>>2]|0,b[e+4>>2]|0)|0;c=r()|0;d=a+72|0;b[d>>2]=e;b[d+4>>2]=c;return}function Ea(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0;g=c;f=d;g=yd(b[f>>2]|0,b[f+4>>2]|0,b[g>>2]|0,b[g+4>>2]|0)|0;f=r()|0;e=a;b[e>>2]=g;b[e+4>>2]=f;e=c+8|0;f=d+8|0;e=yd(b[f>>2]|0,b[f+4>>2]|0,b[e>>2]|0,b[e+4>>2]|0)|0;f=r()|0;g=a+8|0;b[g>>2]=e;b[g+4>>2]=f;g=c+16|0;f=d+16|0;g=yd(b[f>>2]|0,b[f+4>>2]|0,b[g>>2]|0,b[g+4>>2]|0)|0;f=r()|0;e=a+16|0;b[e>>2]=g;b[e+4>>2]=f;e=c+24|0;f=d+24|0;e=yd(b[f>>2]|0,b[f+4>>2]|0,b[e>>2]|0,b[e+4>>2]|0)|0;f=r()|0;g=a+24|0;b[g>>2]=e;b[g+4>>2]=f;g=c+32|0;f=d+32|0;g=yd(b[f>>2]|0,b[f+4>>2]|0,b[g>>2]|0,b[g+4>>2]|0)|0;f=r()|0;e=a+32|0;b[e>>2]=g;b[e+4>>2]=f;e=c+40|0;f=d+40|0;e=yd(b[f>>2]|0,b[f+4>>2]|0,b[e>>2]|0,b[e+4>>2]|0)|0;f=r()|0;g=a+40|0;b[g>>2]=e;b[g+4>>2]=f;g=c+48|0;f=d+48|0;g=yd(b[f>>2]|0,b[f+4>>2]|0,b[g>>2]|0,b[g+4>>2]|0)|0;f=r()|0;e=a+48|0;b[e>>2]=g;b[e+4>>2]=f;e=c+56|0;f=d+56|0;e=yd(b[f>>2]|0,b[f+4>>2]|0,b[e>>2]|0,b[e+4>>2]|0)|0;f=r()|0;g=a+56|0;b[g>>2]=e;b[g+4>>2]=f;g=c+64|0;f=d+64|0;g=yd(b[f>>2]|0,b[f+4>>2]|0,b[g>>2]|0,b[g+4>>2]|0)|0;f=r()|0;e=a+64|0;b[e>>2]=g;b[e+4>>2]=f;e=c+72|0;c=d+72|0;e=yd(b[c>>2]|0,b[c+4>>2]|0,b[e>>2]|0,b[e+4>>2]|0)|0;c=r()|0;d=a+72|0;b[d>>2]=e;b[d+4>>2]=c;return}function Fa(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;e=a;d=b[e>>2]|0;e=b[e+4>>2]|0;g=Hd(d|0,e|0,56)|0;h=r()|0;f=a+8|0;i=f;h=yd(b[i>>2]|0,b[i+4>>2]|0,g|0,h|0)|0;g=r()|0;b[f>>2]=h;b[f+4>>2]=g&16777215;g=Hd(h|0,g|0,56)|0;h=r()|0;f=a+16|0;i=f;h=yd(b[i>>2]|0,b[i+4>>2]|0,g|0,h|0)|0;g=r()|0;b[f>>2]=h;b[f+4>>2]=g&16777215;g=Hd(h|0,g|0,56)|0;h=r()|0;f=a+24|0;i=f;h=yd(b[i>>2]|0,b[i+4>>2]|0,g|0,h|0)|0;g=r()|0;b[f>>2]=h;b[f+4>>2]=g&16777215;g=Hd(h|0,g|0,56)|0;h=r()|0;f=a+32|0;i=f;h=yd(b[i>>2]|0,b[i+4>>2]|0,g|0,h|0)|0;g=r()|0;b[f>>2]=h;b[f+4>>2]=g;e=zd(d|0,e&16777215|0,c|0,((c|0)<0)<<31>>31|0)|0;d=r()|0;c=a;b[c>>2]=e;b[c+4>>2]=d;return}function Ga(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=d&268435455;e=Hd(d|0,((d|0)<0)<<31>>31|0,28)|0;h=r()|0;k=c;o=b[k>>2]|0;n=o&268435455;k=Hd(o|0,b[k+4>>2]|0,28)|0;o=r()|0;j=Ed(n|0,0,f|0,0)|0;p=r()|0;m=Ed(k|0,o|0,e|0,h|0)|0;i=r()|0;n=Ed(n|0,0,e|0,h|0)|0;d=r()|0;o=Ed(k|0,o|0,f|0,0)|0;o=yd(n|0,d|0,o|0,r()|0)|0;d=r()|0;n=Hd(o|0,d|0,28)|0;k=r()|0;d=Jd(o|0,d|0,28)|0;d=yd(j|0,p|0,d&-268435456|0,(r()|0)&16777215|0)|0;p=r()|0;i=yd(n|0,k|0,m|0,i|0)|0;m=r()|0;k=Id(d|0,p|0,56)|0;k=yd(i|0,m|0,k|0,r()|0)|0;m=r()|0;i=a;b[i>>2]=d;b[i+4>>2]=p&16777215;i=c+8|0;p=b[i>>2]|0;d=p&268435455;i=Hd(p|0,b[i+4>>2]|0,28)|0;p=r()|0;n=Ed(d|0,0,f|0,0)|0;j=r()|0;o=Ed(i|0,p|0,e|0,h|0)|0;g=r()|0;d=Ed(d|0,0,e|0,h|0)|0;l=r()|0;p=Ed(i|0,p|0,f|0,0)|0;p=yd(d|0,l|0,p|0,r()|0)|0;l=r()|0;d=Hd(p|0,l|0,28)|0;i=r()|0;l=Jd(p|0,l|0,28)|0;p=(r()|0)&16777215;m=yd(n|0,j|0,k|0,m|0)|0;p=yd(m|0,r()|0,l&-268435456|0,p|0)|0;l=r()|0;g=yd(d|0,i|0,o|0,g|0)|0;o=r()|0;i=Hd(p|0,l|0,56)|0;i=yd(g|0,o|0,i|0,r()|0)|0;o=r()|0;g=a+8|0;b[g>>2]=p;b[g+4>>2]=l&16777215;g=c+16|0;l=b[g>>2]|0;p=l&268435455;g=Hd(l|0,b[g+4>>2]|0,28)|0;l=r()|0;d=Ed(p|0,0,f|0,0)|0;m=r()|0;k=Ed(g|0,l|0,e|0,h|0)|0;j=r()|0;p=Ed(p|0,0,e|0,h|0)|0;n=r()|0;l=Ed(g|0,l|0,f|0,0)|0;l=yd(p|0,n|0,l|0,r()|0)|0;n=r()|0;p=Hd(l|0,n|0,28)|0;g=r()|0;n=Jd(l|0,n|0,28)|0;l=(r()|0)&16777215;o=yd(d|0,m|0,i|0,o|0)|0;l=yd(o|0,r()|0,n&-268435456|0,l|0)|0;n=r()|0;j=yd(p|0,g|0,k|0,j|0)|0;k=r()|0;g=Hd(l|0,n|0,56)|0;g=yd(j|0,k|0,g|0,r()|0)|0;k=r()|0;j=a+16|0;b[j>>2]=l;b[j+4>>2]=n&16777215;j=c+24|0;n=b[j>>2]|0;l=n&268435455;j=Hd(n|0,b[j+4>>2]|0,28)|0;n=r()|0;p=Ed(l|0,0,f|0,0)|0;o=r()|0;i=Ed(j|0,n|0,e|0,h|0)|0;m=r()|0;l=Ed(l|0,0,e|0,h|0)|0;d=r()|0;n=Ed(j|0,n|0,f|0,0)|0;n=yd(l|0,d|0,n|0,r()|0)|0;d=r()|0;l=Hd(n|0,d|0,28)|0;j=r()|0;d=Jd(n|0,d|0,28)|0;n=(r()|0)&16777215;k=yd(p|0,o|0,g|0,k|0)|0;n=yd(k|0,r()|0,d&-268435456|0,n|0)|0;d=r()|0;m=yd(l|0,j|0,i|0,m|0)|0;i=r()|0;j=Hd(n|0,d|0,56)|0;j=yd(m|0,i|0,j|0,r()|0)|0;i=r()|0;m=a+24|0;b[m>>2]=n;b[m+4>>2]=d&16777215;m=c+32|0;d=b[m>>2]|0;n=d&268435455;m=Hd(d|0,b[m+4>>2]|0,28)|0;d=r()|0;l=Ed(n|0,0,f|0,0)|0;k=r()|0;c=Ed(m|0,d|0,e|0,h|0)|0;g=r()|0;h=Ed(n|0,0,e|0,h|0)|0;e=r()|0;f=Ed(m|0,d|0,f|0,0)|0;f=yd(h|0,e|0,f|0,r()|0)|0;e=r()|0;h=Hd(f|0,e|0,28)|0;d=r()|0;e=Jd(f|0,e|0,28)|0;f=(r()|0)&16777215;i=yd(l|0,k|0,j|0,i|0)|0;f=yd(i|0,r()|0,e&-268435456|0,f|0)|0;e=r()|0;g=yd(h|0,d|0,c|0,g|0)|0;c=r()|0;d=Hd(f|0,e|0,56)|0;d=yd(g|0,c|0,d|0,r()|0)|0;c=r()|0;a=a+32|0;b[a>>2]=f;b[a+4>>2]=e&16777215;q(c|0);return d|0}function Ha(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;e=a;f=e+80|0;do{b[e>>2]=0;e=e+4|0}while((e|0)<(f|0));h=d+8|0;i=d+16|0;j=d+24|0;k=d+32|0;g=0;e=0;f=0;while(1){m=c+(g<<3)|0;q=m;t=b[q>>2]|0;w=d;n=b[w>>2]|0;w=b[w+4>>2]|0;z=t&268435455;q=Hd(t|0,b[q+4>>2]|0,28)|0;t=r()|0;p=n&268435455;w=Hd(n|0,w|0,28)|0;n=r()|0;s=Ed(p|0,0,z|0,0)|0;o=r()|0;v=Ed(w|0,n|0,q|0,t|0)|0;x=r()|0;z=Ed(w|0,n|0,z|0,0)|0;n=r()|0;t=Ed(p|0,0,q|0,t|0)|0;t=yd(z|0,n|0,t|0,r()|0)|0;n=r()|0;z=Hd(t|0,n|0,28)|0;q=r()|0;n=Jd(t|0,n|0,28)|0;t=(r()|0)&16777215;e=yd(e|0,f|0,s|0,o|0)|0;t=yd(e|0,r()|0,n&-268435456|0,t|0)|0;n=r()|0;x=yd(z|0,q|0,v|0,x|0)|0;v=r()|0;q=Hd(t|0,n|0,56)|0;q=yd(x|0,v|0,q|0,r()|0)|0;v=r()|0;x=a+(g<<3)|0;b[x>>2]=t;b[x+4>>2]=n&16777215;x=m;n=b[x>>2]|0;t=h;z=b[t>>2]|0;t=b[t+4>>2]|0;e=g+1|0;f=a+(e<<3)|0;o=n&268435455;x=Hd(n|0,b[x+4>>2]|0,28)|0;n=r()|0;s=z&268435455;t=Hd(z|0,t|0,28)|0;z=r()|0;p=Ed(s|0,0,o|0,0)|0;w=r()|0;u=Ed(t|0,z|0,x|0,n|0)|0;l=r()|0;o=Ed(t|0,z|0,o|0,0)|0;z=r()|0;n=Ed(s|0,0,x|0,n|0)|0;n=yd(o|0,z|0,n|0,r()|0)|0;z=r()|0;o=Hd(n|0,z|0,28)|0;x=r()|0;z=Jd(n|0,z|0,28)|0;n=(r()|0)&16777215;s=f;v=yd(b[s>>2]|0,b[s+4>>2]|0,q|0,v|0)|0;w=yd(v|0,r()|0,p|0,w|0)|0;n=yd(w|0,r()|0,z&-268435456|0,n|0)|0;z=r()|0;l=yd(o|0,x|0,u|0,l|0)|0;u=r()|0;x=Hd(n|0,z|0,56)|0;x=yd(l|0,u|0,x|0,r()|0)|0;u=r()|0;l=f;b[l>>2]=n;b[l+4>>2]=z&16777215;l=m;z=b[l>>2]|0;n=i;o=b[n>>2]|0;n=b[n+4>>2]|0;w=a+(g+2<<3)|0;p=z&268435455;l=Hd(z|0,b[l+4>>2]|0,28)|0;z=r()|0;v=o&268435455;n=Hd(o|0,n|0,28)|0;o=r()|0;q=Ed(v|0,0,p|0,0)|0;s=r()|0;t=Ed(n|0,o|0,l|0,z|0)|0;y=r()|0;p=Ed(n|0,o|0,p|0,0)|0;o=r()|0;z=Ed(v|0,0,l|0,z|0)|0;z=yd(p|0,o|0,z|0,r()|0)|0;o=r()|0;p=Hd(z|0,o|0,28)|0;l=r()|0;o=Jd(z|0,o|0,28)|0;z=(r()|0)&16777215;v=w;u=yd(b[v>>2]|0,b[v+4>>2]|0,x|0,u|0)|0;s=yd(u|0,r()|0,q|0,s|0)|0;z=yd(s|0,r()|0,o&-268435456|0,z|0)|0;o=r()|0;y=yd(p|0,l|0,t|0,y|0)|0;t=r()|0;l=Hd(z|0,o|0,56)|0;l=yd(y|0,t|0,l|0,r()|0)|0;t=r()|0;b[w>>2]=z;b[w+4>>2]=o&16777215;w=m;o=b[w>>2]|0;z=j;y=b[z>>2]|0;z=b[z+4>>2]|0;p=a+(g+3<<3)|0;s=o&268435455;w=Hd(o|0,b[w+4>>2]|0,28)|0;o=r()|0;q=y&268435455;z=Hd(y|0,z|0,28)|0;y=r()|0;u=Ed(q|0,0,s|0,0)|0;x=r()|0;v=Ed(z|0,y|0,w|0,o|0)|0;n=r()|0;s=Ed(z|0,y|0,s|0,0)|0;y=r()|0;o=Ed(q|0,0,w|0,o|0)|0;o=yd(s|0,y|0,o|0,r()|0)|0;y=r()|0;s=Hd(o|0,y|0,28)|0;w=r()|0;y=Jd(o|0,y|0,28)|0;o=(r()|0)&16777215;q=p;t=yd(b[q>>2]|0,b[q+4>>2]|0,l|0,t|0)|0;x=yd(t|0,r()|0,u|0,x|0)|0;o=yd(x|0,r()|0,y&-268435456|0,o|0)|0;y=r()|0;n=yd(s|0,w|0,v|0,n|0)|0;v=r()|0;w=Hd(o|0,y|0,56)|0;w=yd(n|0,v|0,w|0,r()|0)|0;v=r()|0;b[p>>2]=o;b[p+4>>2]=y&16777215;p=b[m>>2]|0;y=k;o=b[y>>2]|0;y=b[y+4>>2]|0;n=a+(g+4<<3)|0;s=p&268435455;m=Hd(p|0,b[m+4>>2]|0,28)|0;p=r()|0;x=o&268435455;y=Hd(o|0,y|0,28)|0;o=r()|0;u=Ed(x|0,0,s|0,0)|0;t=r()|0;l=Ed(y|0,o|0,m|0,p|0)|0;q=r()|0;s=Ed(y|0,o|0,s|0,0)|0;o=r()|0;p=Ed(x|0,0,m|0,p|0)|0;p=yd(s|0,o|0,p|0,r()|0)|0;o=r()|0;s=Hd(p|0,o|0,28)|0;m=r()|0;o=Jd(p|0,o|0,28)|0;p=(r()|0)&16777215;x=n;v=yd(b[x>>2]|0,b[x+4>>2]|0,w|0,v|0)|0;t=yd(v|0,r()|0,u|0,t|0)|0;p=yd(t|0,r()|0,o&-268435456|0,p|0)|0;o=r()|0;q=yd(s|0,m|0,l|0,q|0)|0;l=r()|0;m=Hd(p|0,o|0,56)|0;m=yd(q|0,l|0,m|0,r()|0)|0;l=r()|0;b[n>>2]=p;b[n+4>>2]=o&16777215;g=a+(g+5<<3)|0;b[g>>2]=m;b[g+4>>2]=l;if((e|0)==5)break;g=e;e=b[f>>2]|0;f=b[f+4>>2]|0}return}function Ia(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;d=a;e=d+80|0;do{b[d>>2]=0;d=d+4|0}while((d|0)<(e|0));i=1;f=0;g=0;e=0;d=0;while(1){k=c;m=b[k>>2]|0;s=c+(i<<3)|0;n=b[s>>2]|0;s=b[s+4>>2]|0;l=m&268435455;k=Hd(m|0,b[k+4>>2]|0,28)|0;m=r()|0;q=n&268435455;s=Hd(n|0,s|0,28)|0;n=r()|0;p=Ed(q|0,0,l|0,0)|0;o=r()|0;j=Ed(s|0,n|0,k|0,m|0)|0;h=r()|0;l=Ed(s|0,n|0,l|0,0)|0;n=r()|0;m=Ed(q|0,0,k|0,m|0)|0;m=yd(l|0,n|0,m|0,r()|0)|0;n=r()|0;l=Hd(m|0,n|0,28)|0;k=r()|0;n=Jd(m|0,n|0,28)|0;m=(r()|0)&16777215;f=yd(f|0,g|0,e|0,d|0)|0;f=yd(f|0,r()|0,p|0,o|0)|0;f=yd(f|0,r()|0,n&-268435456|0,m|0)|0;g=r()|0;d=yd(l|0,k|0,j|0,h|0)|0;h=r()|0;e=Hd(f|0,g|0,56)|0;e=yd(d|0,h|0,e|0,r()|0)|0;h=r()|0;d=a+(i<<3)|0;b[d>>2]=f;b[d+4>>2]=g&16777215;d=i+1|0;if(i>>>0>=4)break;g=a+(d<<3)|0;i=d;f=b[g>>2]|0;g=b[g+4>>2]|0;d=h}f=a+40|0;i=f;b[i>>2]=e;b[i+4>>2]=h;i=c+8|0;o=i;K=b[o>>2]|0;H=c+16|0;q=b[H>>2]|0;H=b[H+4>>2]|0;t=a+24|0;m=K&268435455;o=Hd(K|0,b[o+4>>2]|0,28)|0;K=r()|0;J=q&268435455;H=Hd(q|0,H|0,28)|0;q=r()|0;l=Ed(J|0,0,m|0,0)|0;k=r()|0;I=Ed(H|0,q|0,o|0,K|0)|0;j=r()|0;m=Ed(H|0,q|0,m|0,0)|0;q=r()|0;K=Ed(J|0,0,o|0,K|0)|0;K=yd(m|0,q|0,K|0,r()|0)|0;q=r()|0;m=Hd(K|0,q|0,28)|0;o=r()|0;q=Jd(K|0,q|0,28)|0;K=(r()|0)&16777215;J=t;k=yd(b[J>>2]|0,b[J+4>>2]|0,l|0,k|0)|0;K=yd(k|0,r()|0,q&-268435456|0,K|0)|0;q=r()|0;j=yd(m|0,o|0,I|0,j|0)|0;I=r()|0;o=Hd(K|0,q|0,56)|0;o=yd(j|0,I|0,o|0,r()|0)|0;I=r()|0;b[t>>2]=K;b[t+4>>2]=q&16777215;t=i;q=b[t>>2]|0;K=c+24|0;j=b[K>>2]|0;K=b[K+4>>2]|0;m=a+32|0;k=q&268435455;t=Hd(q|0,b[t+4>>2]|0,28)|0;q=r()|0;l=j&268435455;K=Hd(j|0,K|0,28)|0;j=r()|0;J=Ed(l|0,0,k|0,0)|0;H=r()|0;p=Ed(K|0,j|0,t|0,q|0)|0;h=r()|0;k=Ed(K|0,j|0,k|0,0)|0;j=r()|0;q=Ed(l|0,0,t|0,q|0)|0;q=yd(k|0,j|0,q|0,r()|0)|0;j=r()|0;k=Hd(q|0,j|0,28)|0;t=r()|0;j=Jd(q|0,j|0,28)|0;q=(r()|0)&16777215;l=m;I=yd(b[l>>2]|0,b[l+4>>2]|0,o|0,I|0)|0;H=yd(I|0,r()|0,J|0,H|0)|0;q=yd(H|0,r()|0,j&-268435456|0,q|0)|0;j=r()|0;h=yd(k|0,t|0,p|0,h|0)|0;p=r()|0;t=Hd(q|0,j|0,56)|0;t=yd(h|0,p|0,t|0,r()|0)|0;p=r()|0;b[m>>2]=q;b[m+4>>2]=j&16777215;m=b[i>>2]|0;j=c+32|0;q=b[j>>2]|0;j=b[j+4>>2]|0;h=a+40|0;k=m&268435455;i=Hd(m|0,b[i+4>>2]|0,28)|0;m=r()|0;H=q&268435455;j=Hd(q|0,j|0,28)|0;q=r()|0;J=Ed(H|0,0,k|0,0)|0;I=r()|0;o=Ed(j|0,q|0,i|0,m|0)|0;l=r()|0;k=Ed(j|0,q|0,k|0,0)|0;q=r()|0;m=Ed(H|0,0,i|0,m|0)|0;m=yd(k|0,q|0,m|0,r()|0)|0;q=r()|0;k=Hd(m|0,q|0,28)|0;i=r()|0;q=Jd(m|0,q|0,28)|0;m=(r()|0)&16777215;H=h;p=yd(b[H>>2]|0,b[H+4>>2]|0,t|0,p|0)|0;I=yd(p|0,r()|0,J|0,I|0)|0;m=yd(I|0,r()|0,q&-268435456|0,m|0)|0;q=r()|0;l=yd(k|0,i|0,o|0,l|0)|0;o=r()|0;i=Hd(m|0,q|0,56)|0;i=yd(l|0,o|0,i|0,r()|0)|0;o=r()|0;b[h>>2]=m;b[h+4>>2]=q&16777215;h=a+48|0;q=h;b[q>>2]=i;b[q+4>>2]=o;q=c+16|0;o=q;i=b[o>>2]|0;m=c+24|0;l=b[m>>2]|0;m=b[m+4>>2]|0;k=a+40|0;I=i&268435455;o=Hd(i|0,b[o+4>>2]|0,28)|0;i=r()|0;J=l&268435455;m=Hd(l|0,m|0,28)|0;l=r()|0;p=Ed(J|0,0,I|0,0)|0;t=r()|0;H=Ed(m|0,l|0,o|0,i|0)|0;j=r()|0;I=Ed(m|0,l|0,I|0,0)|0;l=r()|0;i=Ed(J|0,0,o|0,i|0)|0;i=yd(I|0,l|0,i|0,r()|0)|0;l=r()|0;I=Hd(i|0,l|0,28)|0;o=r()|0;l=Jd(i|0,l|0,28)|0;i=(r()|0)&16777215;J=k;t=yd(b[J>>2]|0,b[J+4>>2]|0,p|0,t|0)|0;i=yd(t|0,r()|0,l&-268435456|0,i|0)|0;l=r()|0;j=yd(I|0,o|0,H|0,j|0)|0;H=r()|0;o=Hd(i|0,l|0,56)|0;o=yd(j|0,H|0,o|0,r()|0)|0;H=r()|0;b[k>>2]=i;b[k+4>>2]=l&16777215;k=b[q>>2]|0;l=c+32|0;i=b[l>>2]|0;l=b[l+4>>2]|0;j=a+48|0;I=k&268435455;q=Hd(k|0,b[q+4>>2]|0,28)|0;k=r()|0;t=i&268435455;l=Hd(i|0,l|0,28)|0;i=r()|0;p=Ed(t|0,0,I|0,0)|0;J=r()|0;m=Ed(l|0,i|0,q|0,k|0)|0;K=r()|0;I=Ed(l|0,i|0,I|0,0)|0;i=r()|0;k=Ed(t|0,0,q|0,k|0)|0;k=yd(I|0,i|0,k|0,r()|0)|0;i=r()|0;I=Hd(k|0,i|0,28)|0;q=r()|0;i=Jd(k|0,i|0,28)|0;k=(r()|0)&16777215;t=j;H=yd(b[t>>2]|0,b[t+4>>2]|0,o|0,H|0)|0;J=yd(H|0,r()|0,p|0,J|0)|0;k=yd(J|0,r()|0,i&-268435456|0,k|0)|0;i=r()|0;K=yd(I|0,q|0,m|0,K|0)|0;m=r()|0;q=Hd(k|0,i|0,56)|0;q=yd(K|0,m|0,q|0,r()|0)|0;m=r()|0;b[j>>2]=k;b[j+4>>2]=i&16777215;j=a+56|0;i=j;b[i>>2]=q;b[i+4>>2]=m;i=c+24|0;m=b[i>>2]|0;q=c+32|0;k=b[q>>2]|0;q=b[q+4>>2]|0;K=a+56|0;I=m&268435455;i=Hd(m|0,b[i+4>>2]|0,28)|0;m=r()|0;J=k&268435455;q=Hd(k|0,q|0,28)|0;k=r()|0;p=Ed(J|0,0,I|0,0)|0;H=r()|0;I=Ed(q|0,k|0,I|0,0)|0;o=r()|0;J=Ed(J|0,0,i|0,m|0)|0;J=yd(I|0,o|0,J|0,r()|0)|0;o=r()|0;I=Jd(J|0,o|0,28)|0;t=(r()|0)&16777215;l=K;H=yd(b[l>>2]|0,b[l+4>>2]|0,p|0,H|0)|0;t=yd(H|0,r()|0,I&-268435456|0,t|0)|0;I=r()|0;b[K>>2]=t;b[K+4>>2]=I&16777215;o=Hd(J|0,o|0,28)|0;J=r()|0;m=Ed(q|0,k|0,i|0,m|0)|0;m=yd(o|0,J|0,m|0,r()|0)|0;J=r()|0;I=Hd(t|0,I|0,56)|0;I=yd(m|0,J|0,I|0,r()|0)|0;J=r()|0;m=a+64|0;t=a+32|0;o=t;i=f;k=b[i>>2]|0;i=b[i+4>>2]|0;q=h;K=b[q>>2]|0;q=b[q+4>>2]|0;H=j;p=b[H>>2]|0;H=b[H+4>>2]|0;o=Jd(b[o>>2]|0,b[o+4>>2]|0,1)|0;l=r()|0;i=Jd(k|0,i|0,1)|0;k=r()|0;q=Jd(K|0,q|0,1)|0;K=r()|0;H=Jd(p|0,H|0,1)|0;p=r()|0;s=a+72|0;e=a;e=Jd(b[e>>2]|0,b[e+4>>2]|0,1)|0;M=r()|0;E=a;b[E>>2]=e;b[E+4>>2]=M;E=a+8|0;y=E;y=Jd(b[y>>2]|0,b[y+4>>2]|0,1)|0;A=r()|0;z=E;b[z>>2]=y;b[z+4>>2]=A;z=a+16|0;n=z;n=Jd(b[n>>2]|0,b[n+4>>2]|0,1)|0;L=r()|0;w=z;b[w>>2]=n;b[w+4>>2]=L;w=a+24|0;d=w;d=Jd(b[d>>2]|0,b[d+4>>2]|0,1)|0;u=r()|0;F=w;b[F>>2]=d;b[F+4>>2]=u;F=t;b[F>>2]=o;b[F+4>>2]=l;F=f;b[F>>2]=i;b[F+4>>2]=k;F=h;b[F>>2]=q;b[F+4>>2]=K;F=j;b[F>>2]=H;b[F+4>>2]=p;J=Jd(I|0,J|0,1)|0;I=r()|0;F=m;b[F>>2]=J;b[F+4>>2]=I;F=s;b[F>>2]=0;b[F+4>>2]=0;F=c;D=b[F>>2]|0;C=D&268435455;F=Hd(D|0,b[F+4>>2]|0,28)|0;D=r()|0;B=Ed(C|0,0,C|0,0)|0;g=r()|0;x=Ed(F|0,D|0,F|0,D|0)|0;v=r()|0;C=Ed(F|0,D|0,C|0,0)|0;D=r()|0;F=Jd(C|0,D|0,29)|0;G=r()|0;D=Hd(C|0,D|0,27)|0;C=r()|0;M=yd(B|0,g|0,e|0,M|0)|0;G=yd(M|0,r()|0,F&-536870912|0,G&16777215|0)|0;F=r()|0;v=yd(D|0,C|0,x|0,v|0)|0;x=r()|0;C=Hd(G|0,F|0,56)|0;D=r()|0;F=F&16777215;M=a;b[M>>2]=G;b[M+4>>2]=F;A=yd(v|0,x|0,y|0,A|0)|0;D=yd(A|0,r()|0,C|0,D|0)|0;C=r()|0;A=E;b[A>>2]=D;b[A+4>>2]=C;A=c+8|0;y=b[A>>2]|0;x=y&268435455;A=Hd(y|0,b[A+4>>2]|0,28)|0;y=r()|0;v=Ed(x|0,0,x|0,0)|0;M=r()|0;e=Ed(A|0,y|0,A|0,y|0)|0;g=r()|0;x=Ed(A|0,y|0,x|0,0)|0;y=r()|0;A=Jd(x|0,y|0,29)|0;B=r()|0;y=Hd(x|0,y|0,27)|0;x=r()|0;L=yd(v|0,M|0,n|0,L|0)|0;B=yd(L|0,r()|0,A&-536870912|0,B&16777215|0)|0;A=r()|0;g=yd(y|0,x|0,e|0,g|0)|0;e=r()|0;x=Hd(B|0,A|0,56)|0;y=r()|0;A=A&16777215;L=z;b[L>>2]=B;b[L+4>>2]=A;u=yd(g|0,e|0,d|0,u|0)|0;y=yd(u|0,r()|0,x|0,y|0)|0;x=r()|0;u=w;b[u>>2]=y;b[u+4>>2]=x;u=c+16|0;d=b[u>>2]|0;e=d&268435455;u=Hd(d|0,b[u+4>>2]|0,28)|0;d=r()|0;g=Ed(e|0,0,e|0,0)|0;L=r()|0;n=Ed(u|0,d|0,u|0,d|0)|0;M=r()|0;e=Ed(u|0,d|0,e|0,0)|0;d=r()|0;u=Jd(e|0,d|0,29)|0;v=r()|0;d=Hd(e|0,d|0,27)|0;e=r()|0;l=yd(g|0,L|0,o|0,l|0)|0;v=yd(l|0,r()|0,u&-536870912|0,v&16777215|0)|0;u=r()|0;M=yd(d|0,e|0,n|0,M|0)|0;n=r()|0;e=Hd(v|0,u|0,56)|0;d=r()|0;u=u&16777215;l=t;b[l>>2]=v;b[l+4>>2]=u;k=yd(M|0,n|0,i|0,k|0)|0;d=yd(k|0,r()|0,e|0,d|0)|0;e=r()|0;k=f;b[k>>2]=d;b[k+4>>2]=e;k=c+24|0;i=b[k>>2]|0;n=i&268435455;k=Hd(i|0,b[k+4>>2]|0,28)|0;i=r()|0;M=Ed(n|0,0,n|0,0)|0;l=r()|0;o=Ed(k|0,i|0,k|0,i|0)|0;L=r()|0;n=Ed(k|0,i|0,n|0,0)|0;i=r()|0;k=Jd(n|0,i|0,29)|0;g=r()|0;i=Hd(n|0,i|0,27)|0;n=r()|0;K=yd(M|0,l|0,q|0,K|0)|0;g=yd(K|0,r()|0,k&-536870912|0,g&16777215|0)|0;k=r()|0;L=yd(i|0,n|0,o|0,L|0)|0;o=r()|0;n=Hd(g|0,k|0,56)|0;i=r()|0;k=k&16777215;K=h;b[K>>2]=g;b[K+4>>2]=k;p=yd(L|0,o|0,H|0,p|0)|0;i=yd(p|0,r()|0,n|0,i|0)|0;n=r()|0;p=j;b[p>>2]=i;b[p+4>>2]=n;p=c+32|0;H=b[p>>2]|0;o=H&268435455;p=Hd(H|0,b[p+4>>2]|0,28)|0;H=r()|0;L=Ed(o|0,0,o|0,0)|0;K=r()|0;q=Ed(p|0,H|0,p|0,H|0)|0;c=r()|0;o=Ed(p|0,H|0,o|0,0)|0;H=r()|0;p=Jd(o|0,H|0,29)|0;l=r()|0;H=Hd(o|0,H|0,27)|0;o=r()|0;I=yd(L|0,K|0,J|0,I|0)|0;l=yd(I|0,r()|0,p&-536870912|0,l&16777215|0)|0;p=r()|0;c=yd(H|0,o|0,q|0,c|0)|0;q=r()|0;o=Hd(l|0,p|0,56)|0;o=yd(c|0,q|0,o|0,r()|0)|0;q=r()|0;c=a;b[c>>2]=G;b[c+4>>2]=F;c=E;b[c>>2]=D;b[c+4>>2]=C&16777215;c=Hd(D|0,C|0,56)|0;c=yd(B|0,A|0,c|0,r()|0)|0;a=r()|0;b[z>>2]=c;b[z+4>>2]=a&16777215;a=Hd(c|0,a|0,56)|0;a=yd(y|0,x|0,a|0,r()|0)|0;c=r()|0;b[w>>2]=a;b[w+4>>2]=c&16777215;c=Hd(a|0,c|0,56)|0;c=yd(v|0,u|0,c|0,r()|0)|0;a=r()|0;b[t>>2]=c;b[t+4>>2]=a&16777215;a=Hd(c|0,a|0,56)|0;a=yd(d|0,e|0,a|0,r()|0)|0;c=r()|0;b[f>>2]=a;b[f+4>>2]=c&16777215;c=Hd(a|0,c|0,56)|0;c=yd(g|0,k|0,c|0,r()|0)|0;k=r()|0;a=h;b[a>>2]=c;b[a+4>>2]=k&16777215;k=Hd(c|0,k|0,56)|0;k=yd(i|0,n|0,k|0,r()|0)|0;n=r()|0;b[j>>2]=k;b[j+4>>2]=n&16777215;n=Hd(k|0,n|0,56)|0;n=yd(l|0,p&16777215|0,n|0,r()|0)|0;p=r()|0;b[m>>2]=n;b[m+4>>2]=p&16777215;p=Hd(n|0,p|0,56)|0;p=yd(o|0,q|0,p|0,r()|0)|0;q=r()|0;b[s>>2]=p;b[s+4>>2]=q;return}function Ja(a,c,d,e,f){a=a|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0;if((d|0)==-1&(e|0)==-1){k=c+8|0;l=c+16|0;d=c+24|0;h=c+32|0;j=f+32|0;g=0;i=b[j>>2]|0;j=b[j+4>>2]|0;do{o=f+(g<<3)|0;u=o;x=b[u>>2]|0;u=b[u+4>>2]|0;q=zd(0,0,x|0,u|0)|0;s=q&268435455;q=Id(q|0,r()|0,28)|0;r()|0;q=q&268435455;v=c;p=b[v>>2]|0;n=p&268435455;v=Hd(p|0,b[v+4>>2]|0,28)|0;p=r()|0;m=Ed(n|0,0,s|0,0)|0;y=r()|0;e=Ed(v|0,p|0,q|0,0)|0;t=r()|0;p=Ed(v|0,p|0,s|0,0)|0;v=r()|0;n=Ed(n|0,0,q|0,0)|0;n=yd(p|0,v|0,n|0,r()|0)|0;v=r()|0;p=Hd(n|0,v|0,28)|0;z=r()|0;v=Jd(n|0,v|0,28)|0;n=(r()|0)&16777215;y=yd(x|0,u|0,m|0,y|0)|0;n=yd(y|0,r()|0,v&-268435456|0,n|0)|0;v=r()|0;t=yd(p|0,z|0,e|0,t|0)|0;e=r()|0;z=Hd(n|0,v|0,56)|0;z=yd(t|0,e|0,z|0,r()|0)|0;e=r()|0;b[o>>2]=n;b[o+4>>2]=v&16777215;o=k;v=b[o>>2]|0;n=g;g=g+1|0;t=f+(g<<3)|0;p=v&268435455;o=Hd(v|0,b[o+4>>2]|0,28)|0;v=r()|0;y=Ed(p|0,0,s|0,0)|0;m=r()|0;u=Ed(o|0,v|0,q|0,0)|0;x=r()|0;v=Ed(o|0,v|0,s|0,0)|0;o=r()|0;p=Ed(p|0,0,q|0,0)|0;p=yd(v|0,o|0,p|0,r()|0)|0;o=r()|0;v=Hd(p|0,o|0,28)|0;w=r()|0;o=Jd(p|0,o|0,28)|0;p=(r()|0)&16777215;A=t;e=yd(b[A>>2]|0,b[A+4>>2]|0,z|0,e|0)|0;m=yd(e|0,r()|0,y|0,m|0)|0;p=yd(m|0,r()|0,o&-268435456|0,p|0)|0;o=r()|0;x=yd(v|0,w|0,u|0,x|0)|0;u=r()|0;w=Hd(p|0,o|0,56)|0;w=yd(x|0,u|0,w|0,r()|0)|0;u=r()|0;b[t>>2]=p;b[t+4>>2]=o&16777215;t=l;o=b[t>>2]|0;p=f+(n+2<<3)|0;x=o&268435455;t=Hd(o|0,b[t+4>>2]|0,28)|0;o=r()|0;v=Ed(x|0,0,s|0,0)|0;m=r()|0;y=Ed(t|0,o|0,q|0,0)|0;e=r()|0;o=Ed(t|0,o|0,s|0,0)|0;t=r()|0;x=Ed(x|0,0,q|0,0)|0;x=yd(o|0,t|0,x|0,r()|0)|0;t=r()|0;o=Hd(x|0,t|0,28)|0;z=r()|0;t=Jd(x|0,t|0,28)|0;x=(r()|0)&16777215;A=p;u=yd(b[A>>2]|0,b[A+4>>2]|0,w|0,u|0)|0;m=yd(u|0,r()|0,v|0,m|0)|0;x=yd(m|0,r()|0,t&-268435456|0,x|0)|0;t=r()|0;e=yd(o|0,z|0,y|0,e|0)|0;y=r()|0;z=Hd(x|0,t|0,56)|0;z=yd(e|0,y|0,z|0,r()|0)|0;y=r()|0;b[p>>2]=x;b[p+4>>2]=t&16777215;p=d;t=b[p>>2]|0;x=f+(n+3<<3)|0;e=t&268435455;p=Hd(t|0,b[p+4>>2]|0,28)|0;t=r()|0;o=Ed(e|0,0,s|0,0)|0;m=r()|0;v=Ed(p|0,t|0,q|0,0)|0;u=r()|0;t=Ed(p|0,t|0,s|0,0)|0;p=r()|0;e=Ed(e|0,0,q|0,0)|0;e=yd(t|0,p|0,e|0,r()|0)|0;p=r()|0;t=Hd(e|0,p|0,28)|0;w=r()|0;p=Jd(e|0,p|0,28)|0;e=(r()|0)&16777215;A=x;y=yd(b[A>>2]|0,b[A+4>>2]|0,z|0,y|0)|0;m=yd(y|0,r()|0,o|0,m|0)|0;e=yd(m|0,r()|0,p&-268435456|0,e|0)|0;p=r()|0;u=yd(t|0,w|0,v|0,u|0)|0;v=r()|0;w=Hd(e|0,p|0,56)|0;w=yd(u|0,v|0,w|0,r()|0)|0;v=r()|0;b[x>>2]=e;b[x+4>>2]=p&16777215;x=h;p=b[x>>2]|0;e=p&268435455;x=Hd(p|0,b[x+4>>2]|0,28)|0;p=r()|0;u=Ed(e|0,0,s|0,0)|0;t=r()|0;m=Ed(x|0,p|0,q|0,0)|0;o=r()|0;s=Ed(x|0,p|0,s|0,0)|0;p=r()|0;q=Ed(e|0,0,q|0,0)|0;q=yd(s|0,p|0,q|0,r()|0)|0;p=r()|0;s=Hd(q|0,p|0,28)|0;e=r()|0;p=Jd(q|0,p|0,28)|0;q=(r()|0)&16777215;v=yd(i|0,j|0,w|0,v|0)|0;t=yd(v|0,r()|0,u|0,t|0)|0;q=yd(t|0,r()|0,p&-268435456|0,q|0)|0;p=r()|0;o=yd(s|0,e|0,m|0,o|0)|0;m=r()|0;e=Hd(q|0,p|0,56)|0;e=yd(o|0,m|0,e|0,r()|0)|0;m=r()|0;o=f+(n+4<<3)|0;b[o>>2]=q;b[o+4>>2]=p&16777215;n=f+(n+5<<3)|0;o=n;i=yd(b[o>>2]|0,b[o+4>>2]|0,e|0,m|0)|0;j=r()|0;b[n>>2]=i;b[n+4>>2]=j}while((g|0)!=5);z=f+40|0;x=z;x=b[x>>2]|0;z=z+4|0;z=b[z>>2]|0;c=a;n=c;b[n>>2]=x;c=c+4|0;b[c>>2]=z;c=f+48|0;n=c;n=b[n>>2]|0;c=c+4|0;c=b[c>>2]|0;o=a+8|0;q=o;p=q;b[p>>2]=n;q=q+4|0;b[q>>2]=c;q=f+56|0;p=q;p=b[p>>2]|0;q=q+4|0;q=b[q>>2]|0;s=a+16|0;u=s;t=u;b[t>>2]=p;u=u+4|0;b[u>>2]=q;u=f+64|0;t=u;t=b[t>>2]|0;u=u+4|0;u=b[u>>2]|0;v=a+24|0;y=v;w=y;b[w>>2]=t;y=y+4|0;b[y>>2]=u;y=f+72|0;w=y;w=b[w>>2]|0;y=y+4|0;y=b[y>>2]|0;A=a+32|0;m=z&16777215;f=a;a=f;b[a>>2]=x;f=f+4|0;b[f>>2]=m;z=Hd(x|0,z|0,56)|0;x=r()|0;x=yd(n|0,c|0,z|0,x|0)|0;z=r()|0;f=z&16777215;c=o;b[c>>2]=x;o=o+4|0;b[o>>2]=f;z=Hd(x|0,z|0,56)|0;x=r()|0;x=yd(p|0,q|0,z|0,x|0)|0;z=r()|0;q=z&16777215;p=s;b[p>>2]=x;s=s+4|0;b[s>>2]=q;z=Hd(x|0,z|0,56)|0;x=r()|0;x=yd(t|0,u|0,z|0,x|0)|0;z=r()|0;u=z&16777215;t=v;b[t>>2]=x;v=v+4|0;b[v>>2]=u;z=Hd(x|0,z|0,56)|0;x=r()|0;x=yd(w|0,y|0,z|0,x|0)|0;z=r()|0;y=A;b[y>>2]=x;A=A+4|0;b[A>>2]=z;return}else{h=(d|0)==1&(e|0)==0;i=c+8|0;j=c+16|0;k=c+24|0;l=c+32|0;n=f+32|0;g=0;m=b[n>>2]|0;n=b[n+4>>2]|0;do{x=f+(g<<3)|0;s=x;B=b[s>>2]|0;s=b[s+4>>2]|0;v=Ed(B|0,s|0,d|0,e|0)|0;y=(r()|0)&16777215;v=h?B:v;u=v&268435455;y=Hd(v|0,(h?s:y)|0,28)|0;v=r()|0;q=c;w=b[q>>2]|0;A=w&268435455;q=Hd(w|0,b[q+4>>2]|0,28)|0;w=r()|0;z=Ed(A|0,0,u|0,0)|0;C=r()|0;o=Ed(q|0,w|0,y|0,v|0)|0;t=r()|0;w=Ed(q|0,w|0,u|0,0)|0;q=r()|0;A=Ed(A|0,0,y|0,v|0)|0;A=yd(w|0,q|0,A|0,r()|0)|0;q=r()|0;w=Hd(A|0,q|0,28)|0;D=r()|0;q=Jd(A|0,q|0,28)|0;A=(r()|0)&16777215;C=yd(B|0,s|0,z|0,C|0)|0;A=yd(C|0,r()|0,q&-268435456|0,A|0)|0;q=r()|0;t=yd(w|0,D|0,o|0,t|0)|0;o=r()|0;D=Hd(A|0,q|0,56)|0;D=yd(t|0,o|0,D|0,r()|0)|0;o=r()|0;b[x>>2]=A;b[x+4>>2]=q&16777215;x=i;q=b[x>>2]|0;A=g;g=g+1|0;t=f+(g<<3)|0;w=q&268435455;x=Hd(q|0,b[x+4>>2]|0,28)|0;q=r()|0;C=Ed(w|0,0,u|0,0)|0;z=r()|0;s=Ed(x|0,q|0,y|0,v|0)|0;B=r()|0;q=Ed(x|0,q|0,u|0,0)|0;x=r()|0;w=Ed(w|0,0,y|0,v|0)|0;w=yd(q|0,x|0,w|0,r()|0)|0;x=r()|0;q=Hd(w|0,x|0,28)|0;p=r()|0;x=Jd(w|0,x|0,28)|0;w=(r()|0)&16777215;E=t;o=yd(b[E>>2]|0,b[E+4>>2]|0,D|0,o|0)|0;z=yd(o|0,r()|0,C|0,z|0)|0;w=yd(z|0,r()|0,x&-268435456|0,w|0)|0;x=r()|0;B=yd(q|0,p|0,s|0,B|0)|0;s=r()|0;p=Hd(w|0,x|0,56)|0;p=yd(B|0,s|0,p|0,r()|0)|0;s=r()|0;b[t>>2]=w;b[t+4>>2]=x&16777215;t=j;x=b[t>>2]|0;w=f+(A+2<<3)|0;B=x&268435455;t=Hd(x|0,b[t+4>>2]|0,28)|0;x=r()|0;q=Ed(B|0,0,u|0,0)|0;z=r()|0;C=Ed(t|0,x|0,y|0,v|0)|0;o=r()|0;x=Ed(t|0,x|0,u|0,0)|0;t=r()|0;B=Ed(B|0,0,y|0,v|0)|0;B=yd(x|0,t|0,B|0,r()|0)|0;t=r()|0;x=Hd(B|0,t|0,28)|0;D=r()|0;t=Jd(B|0,t|0,28)|0;B=(r()|0)&16777215;E=w;s=yd(b[E>>2]|0,b[E+4>>2]|0,p|0,s|0)|0;z=yd(s|0,r()|0,q|0,z|0)|0;B=yd(z|0,r()|0,t&-268435456|0,B|0)|0;t=r()|0;o=yd(x|0,D|0,C|0,o|0)|0;C=r()|0;D=Hd(B|0,t|0,56)|0;D=yd(o|0,C|0,D|0,r()|0)|0;C=r()|0;b[w>>2]=B;b[w+4>>2]=t&16777215;w=k;t=b[w>>2]|0;B=f+(A+3<<3)|0;o=t&268435455;w=Hd(t|0,b[w+4>>2]|0,28)|0;t=r()|0;x=Ed(o|0,0,u|0,0)|0;z=r()|0;q=Ed(w|0,t|0,y|0,v|0)|0;s=r()|0;t=Ed(w|0,t|0,u|0,0)|0;w=r()|0;o=Ed(o|0,0,y|0,v|0)|0;o=yd(t|0,w|0,o|0,r()|0)|0;w=r()|0;t=Hd(o|0,w|0,28)|0;p=r()|0;w=Jd(o|0,w|0,28)|0;o=(r()|0)&16777215;E=B;C=yd(b[E>>2]|0,b[E+4>>2]|0,D|0,C|0)|0;z=yd(C|0,r()|0,x|0,z|0)|0;o=yd(z|0,r()|0,w&-268435456|0,o|0)|0;w=r()|0;s=yd(t|0,p|0,q|0,s|0)|0;q=r()|0;p=Hd(o|0,w|0,56)|0;p=yd(s|0,q|0,p|0,r()|0)|0;q=r()|0;b[B>>2]=o;b[B+4>>2]=w&16777215;B=l;w=b[B>>2]|0;o=w&268435455;B=Hd(w|0,b[B+4>>2]|0,28)|0;w=r()|0;s=Ed(o|0,0,u|0,0)|0;t=r()|0;z=Ed(B|0,w|0,y|0,v|0)|0;x=r()|0;u=Ed(B|0,w|0,u|0,0)|0;w=r()|0;v=Ed(o|0,0,y|0,v|0)|0;v=yd(u|0,w|0,v|0,r()|0)|0;w=r()|0;u=Hd(v|0,w|0,28)|0;y=r()|0;w=Jd(v|0,w|0,28)|0;v=(r()|0)&16777215;q=yd(m|0,n|0,p|0,q|0)|0;t=yd(q|0,r()|0,s|0,t|0)|0;v=yd(t|0,r()|0,w&-268435456|0,v|0)|0;w=r()|0;x=yd(u|0,y|0,z|0,x|0)|0;z=r()|0;y=Hd(v|0,w|0,56)|0;y=yd(x|0,z|0,y|0,r()|0)|0;z=r()|0;x=f+(A+4<<3)|0;b[x>>2]=v;b[x+4>>2]=w&16777215;A=f+(A+5<<3)|0;x=A;m=yd(b[x>>2]|0,b[x+4>>2]|0,y|0,z|0)|0;n=r()|0;b[A>>2]=m;b[A+4>>2]=n}while((g|0)!=5);D=f+40|0;B=D;B=b[B>>2]|0;D=D+4|0;D=b[D>>2]|0;s=a;q=s;b[q>>2]=B;s=s+4|0;b[s>>2]=D;s=f+48|0;q=s;q=b[q>>2]|0;s=s+4|0;s=b[s>>2]|0;t=a+8|0;v=t;u=v;b[u>>2]=q;v=v+4|0;b[v>>2]=s;v=f+56|0;u=v;u=b[u>>2]|0;v=v+4|0;v=b[v>>2]|0;w=a+16|0;y=w;x=y;b[x>>2]=u;y=y+4|0;b[y>>2]=v;y=f+64|0;x=y;x=b[x>>2]|0;y=y+4|0;y=b[y>>2]|0;z=a+24|0;C=z;A=C;b[A>>2]=x;C=C+4|0;b[C>>2]=y;C=f+72|0;A=C;A=b[A>>2]|0;C=C+4|0;C=b[C>>2]|0;E=a+32|0;o=D&16777215;p=a;f=p;b[f>>2]=B;p=p+4|0;b[p>>2]=o;D=Hd(B|0,D|0,56)|0;B=r()|0;B=yd(q|0,s|0,D|0,B|0)|0;D=r()|0;s=D&16777215;q=t;b[q>>2]=B;t=t+4|0;b[t>>2]=s;D=Hd(B|0,D|0,56)|0;B=r()|0;B=yd(u|0,v|0,D|0,B|0)|0;D=r()|0;v=D&16777215;u=w;b[u>>2]=B;w=w+4|0;b[w>>2]=v;D=Hd(B|0,D|0,56)|0;B=r()|0;B=yd(x|0,y|0,D|0,B|0)|0;D=r()|0;y=D&16777215;x=z;b[x>>2]=B;z=z+4|0;b[z>>2]=y;D=Hd(B|0,D|0,56)|0;B=r()|0;B=yd(A|0,C|0,D|0,B|0)|0;D=r()|0;C=E;b[C>>2]=B;E=E+4|0;b[E>>2]=D;return}}function Ka(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;g=d;g=Hd(b[g>>2]|0,b[g+4>>2]|0,1)|0;e=r()|0;i=d+8|0;f=i;Jd(b[f>>2]|0,b[f+4>>2]|0,55)|0;e=(r()|0)&8388608|e;f=d;b[f>>2]=g;b[f+4>>2]=e;f=c;e=zd(b[f>>2]|0,b[f+4>>2]|0,g|0,e|0)|0;g=r()|0;f=a;b[f>>2]=e;b[f+4>>2]=g&16777215;g=Hd(e|0,g|0,56)|0;e=r()|0;f=i;f=Hd(b[f>>2]|0,b[f+4>>2]|0,1)|0;j=r()|0;h=d+16|0;k=h;Jd(b[k>>2]|0,b[k+4>>2]|0,55)|0;j=(r()|0)&8388608|j;b[i>>2]=f;b[i+4>>2]=j;i=c+8|0;j=zd(b[i>>2]|0,b[i+4>>2]|0,f|0,j|0)|0;e=yd(j|0,r()|0,g|0,e|0)|0;g=r()|0;j=a+8|0;b[j>>2]=e;b[j+4>>2]=g&16777215;g=Hd(e|0,g|0,56)|0;e=r()|0;j=h;j=Hd(b[j>>2]|0,b[j+4>>2]|0,1)|0;f=r()|0;i=d+24|0;k=i;Jd(b[k>>2]|0,b[k+4>>2]|0,55)|0;f=(r()|0)&8388608|f;b[h>>2]=j;b[h+4>>2]=f;h=c+16|0;f=zd(b[h>>2]|0,b[h+4>>2]|0,j|0,f|0)|0;e=yd(f|0,r()|0,g|0,e|0)|0;g=r()|0;f=a+16|0;b[f>>2]=e;b[f+4>>2]=g&16777215;g=Hd(e|0,g|0,56)|0;e=r()|0;f=i;f=Hd(b[f>>2]|0,b[f+4>>2]|0,1)|0;j=r()|0;h=d+32|0;d=h;Jd(b[d>>2]|0,b[d+4>>2]|0,55)|0;d=(r()|0)&8388608|j;b[i>>2]=f;b[i+4>>2]=d;i=c+24|0;d=zd(b[i>>2]|0,b[i+4>>2]|0,f|0,d|0)|0;d=yd(d|0,r()|0,g|0,e|0)|0;e=r()|0;g=a+24|0;b[g>>2]=d;b[g+4>>2]=e&16777215;e=Hd(d|0,e|0,56)|0;d=r()|0;g=h;g=Hd(b[g>>2]|0,b[g+4>>2]|0,1)|0;f=r()|0;b[h>>2]=g;b[h+4>>2]=f;c=c+32|0;c=zd(b[c>>2]|0,b[c+4>>2]|0,g|0,f|0)|0;c=yd(c|0,r()|0,e|0,d|0)|0;d=r()|0;a=a+32|0;b[a>>2]=c;b[a+4>>2]=d;d=Id(c|0,d|0,63)|0;r()|0;return d|0}function La(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;f=c+32|0;l=b[f>>2]|0;f=b[f+4>>2]|0;h=a+32|0;j=b[h>>2]|0;h=b[h+4>>2]|0;e=zd(l|0,f|0,j|0,h|0)|0;e=Id(e|0,r()|0,56)|0;r()|0;f=yd(j^l|0,h^f|0,-1,33554431)|0;f=Id(f|0,r()|0,56)|0;r()|0;f=f&1;h=c+24|0;l=b[h>>2]|0;h=b[h+4>>2]|0;j=a+24|0;d=b[j>>2]|0;j=b[j+4>>2]|0;g=zd(l|0,h|0,d|0,j|0)|0;g=Id(g|0,r()|0,56)|0;r()|0;h=yd(d^l|0,j^h|0,-1,33554431)|0;h=Id(h|0,r()|0,56)|0;r()|0;h=h&f;j=c+16|0;l=b[j>>2]|0;j=b[j+4>>2]|0;d=a+16|0;m=b[d>>2]|0;d=b[d+4>>2]|0;i=zd(l|0,j|0,m|0,d|0)|0;i=Id(i|0,r()|0,56)|0;r()|0;j=yd(m^l|0,d^j|0,-1,33554431)|0;j=Id(j|0,r()|0,56)|0;r()|0;j=j&h;d=c+8|0;l=b[d>>2]|0;d=b[d+4>>2]|0;m=a+8|0;n=b[m>>2]|0;m=b[m+4>>2]|0;k=zd(l|0,d|0,n|0,m|0)|0;k=Id(k|0,r()|0,56)|0;r()|0;d=yd(n^l|0,m^d|0,-1,33554431)|0;d=Id(d|0,r()|0,56)|0;r()|0;d=d&j;m=b[c>>2]|0;c=b[c+4>>2]|0;l=a;n=b[l>>2]|0;l=b[l+4>>2]|0;a=zd(m|0,c|0,n|0,l|0)|0;a=Id(a|0,r()|0,56)|0;r()|0;c=yd(n^m|0,l^c|0,-1,33554431)|0;c=Id(c|0,r()|0,56)|0;r()|0;a=Jd(a&d|(k&j|(i&h|(g&f|e&1)))|0,0,1)|0;r()|0;return (a|c&d)+-1|0}function Ma(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;f=c+72|0;w=b[f>>2]|0;f=b[f+4>>2]|0;h=a+72|0;j=b[h>>2]|0;h=b[h+4>>2]|0;e=zd(w|0,f|0,j|0,h|0)|0;e=Id(e|0,r()|0,56)|0;r()|0;f=yd(j^w|0,h^f|0,-1,33554431)|0;f=Id(f|0,r()|0,56)|0;r()|0;f=f&1;h=c+64|0;w=b[h>>2]|0;h=b[h+4>>2]|0;j=a+64|0;l=b[j>>2]|0;j=b[j+4>>2]|0;g=zd(w|0,h|0,l|0,j|0)|0;g=Id(g|0,r()|0,56)|0;r()|0;h=yd(l^w|0,j^h|0,-1,33554431)|0;h=Id(h|0,r()|0,56)|0;r()|0;h=h&f;j=c+56|0;w=b[j>>2]|0;j=b[j+4>>2]|0;l=a+56|0;n=b[l>>2]|0;l=b[l+4>>2]|0;i=zd(w|0,j|0,n|0,l|0)|0;i=Id(i|0,r()|0,56)|0;r()|0;j=yd(n^w|0,l^j|0,-1,33554431)|0;j=Id(j|0,r()|0,56)|0;r()|0;j=j&h;l=c+48|0;w=b[l>>2]|0;l=b[l+4>>2]|0;n=a+48|0;p=b[n>>2]|0;n=b[n+4>>2]|0;k=zd(w|0,l|0,p|0,n|0)|0;k=Id(k|0,r()|0,56)|0;r()|0;l=yd(p^w|0,n^l|0,-1,33554431)|0;l=Id(l|0,r()|0,56)|0;r()|0;l=l&j;n=c+40|0;w=b[n>>2]|0;n=b[n+4>>2]|0;p=a+40|0;s=b[p>>2]|0;p=b[p+4>>2]|0;m=zd(w|0,n|0,s|0,p|0)|0;m=Id(m|0,r()|0,56)|0;r()|0;n=yd(s^w|0,p^n|0,-1,33554431)|0;n=Id(n|0,r()|0,56)|0;r()|0;n=n&l;p=c+32|0;w=b[p>>2]|0;p=b[p+4>>2]|0;s=a+32|0;u=b[s>>2]|0;s=b[s+4>>2]|0;o=zd(w|0,p|0,u|0,s|0)|0;o=Id(o|0,r()|0,56)|0;r()|0;p=yd(u^w|0,s^p|0,-1,33554431)|0;p=Id(p|0,r()|0,56)|0;r()|0;p=p&n;s=c+24|0;w=b[s>>2]|0;s=b[s+4>>2]|0;u=a+24|0;d=b[u>>2]|0;u=b[u+4>>2]|0;q=zd(w|0,s|0,d|0,u|0)|0;q=Id(q|0,r()|0,56)|0;r()|0;s=yd(d^w|0,u^s|0,-1,-1)|0;s=Id(s|0,r()|0,56)|0;r()|0;s=s&p;u=c+16|0;w=b[u>>2]|0;u=b[u+4>>2]|0;d=a+16|0;x=b[d>>2]|0;d=b[d+4>>2]|0;t=zd(w|0,u|0,x|0,d|0)|0;t=Id(t|0,r()|0,56)|0;r()|0;u=yd(x^w|0,d^u|0,-1,-1)|0;u=Id(u|0,r()|0,56)|0;r()|0;u=u&s;d=c+8|0;w=b[d>>2]|0;d=b[d+4>>2]|0;x=a+8|0;y=b[x>>2]|0;x=b[x+4>>2]|0;v=zd(w|0,d|0,y|0,x|0)|0;v=Id(v|0,r()|0,56)|0;r()|0;d=yd(y^w|0,x^d|0,-1,-1)|0;d=Id(d|0,r()|0,56)|0;r()|0;d=d&u;x=b[c>>2]|0;c=b[c+4>>2]|0;w=a;y=b[w>>2]|0;w=b[w+4>>2]|0;a=zd(x|0,c|0,y|0,w|0)|0;a=Id(a|0,r()|0,56)|0;r()|0;c=yd(y^x|0,w^c|0,-1,-1)|0;c=Id(c|0,r()|0,56)|0;r()|0;a=Jd(a&d|(v&u|(t&s|(q&p|(o&n|(m&l|(k&j|(i&h|(g&f|e&1))))))))|0,0,1)|0;c=yd(a|0,r()|0,c&d|0,0)|0;r()|0;return c+-1|0}function Na(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;h=c;g=b[h>>2]|0;h=b[h+4>>2]|0;q=c+8|0;p=b[q>>2]|0;q=b[q+4>>2]|0;s=c+16|0;n=b[s>>2]|0;s=b[s+4>>2]|0;l=c+24|0;j=b[l>>2]|0;l=b[l+4>>2]|0;f=c+32|0;c=b[f>>2]|0;f=b[f+4>>2]|0;d=a;w=b[d>>2]|0;d=b[d+4>>2]|0;v=d&16777215;u=a;b[u>>2]=w;b[u+4>>2]=v;d=Hd(w|0,d|0,56)|0;u=r()|0;y=a+8|0;t=y;u=yd(b[t>>2]|0,b[t+4>>2]|0,d|0,u|0)|0;d=r()|0;t=d&16777215;o=y;b[o>>2]=u;b[o+4>>2]=t;d=Hd(u|0,d|0,56)|0;o=r()|0;z=a+16|0;m=z;o=yd(b[m>>2]|0,b[m+4>>2]|0,d|0,o|0)|0;d=r()|0;m=d&16777215;k=z;b[k>>2]=o;b[k+4>>2]=m;d=Hd(o|0,d|0,56)|0;k=r()|0;A=a+24|0;i=A;k=yd(b[i>>2]|0,b[i+4>>2]|0,d|0,k|0)|0;d=r()|0;i=d&16777215;e=A;b[e>>2]=k;b[e+4>>2]=i;d=Hd(k|0,d|0,56)|0;e=r()|0;B=a+32|0;I=B;e=yd(b[I>>2]|0,b[I+4>>2]|0,d|0,e|0)|0;d=r()|0;I=B;b[I>>2]=e;b[I+4>>2]=d;I=zd(c|0,f|0,e|0,d|0)|0;I=Id(I|0,r()|0,56)|0;r()|0;K=yd(e^c|0,d^f|0,-1,33554431)|0;K=Id(K|0,r()|0,56)|0;r()|0;K=K&1;J=zd(j|0,l|0,k|0,i|0)|0;J=Id(J|0,r()|0,56)|0;r()|0;H=yd(k^j|0,i^l|0,-1,33554431)|0;H=Id(H|0,r()|0,56)|0;r()|0;H=K&H;G=zd(n|0,s|0,o|0,m|0)|0;G=Id(G|0,r()|0,56)|0;r()|0;F=yd(o^n|0,m^s|0,-1,33554431)|0;F=Id(F|0,r()|0,56)|0;r()|0;F=H&F;E=zd(p|0,q|0,u|0,t|0)|0;E=Id(E|0,r()|0,56)|0;r()|0;C=yd(u^p|0,t^q|0,-1,33554431)|0;C=Id(C|0,r()|0,56)|0;r()|0;C=F&C;D=zd(g|0,h|0,w|0,v|0)|0;D=Id(D|0,r()|0,56)|0;r()|0;x=yd(w^g|0,v^h|0,-1,33554431)|0;x=Id(x|0,r()|0,56)|0;r()|0;D=Jd(K&J|I&1|H&G|F&E|C&D|0,0,1)|0;r()|0;if(((D|C&x)+-1|0)<0)return;x=0;do{L=Jd(c|0,f|0,1)|0;D=r()|0;C=Hd(j|0,l|0,55)|0;c=C|L;f=r()|0|D;D=Jd(j|0,l|0,1)|0;L=(r()|0)&16777215;C=Hd(n|0,s|0,55)|0;j=D&-2|C;l=L|(r()|0);L=Jd(n|0,s|0,1)|0;C=(r()|0)&16777215;D=Hd(p|0,q|0,55)|0;n=L&-2|D;s=C|(r()|0);C=Jd(p|0,q|0,1)|0;D=(r()|0)&16777215;L=Hd(g|0,h|0,55)|0;p=C&-2|L;q=D|(r()|0);D=Jd(g|0,h|0,1)|0;g=D&-2;h=(r()|0)&16777215;x=x+1|0;D=zd(c|0,f|0,e|0,d|0)|0;D=Id(D|0,r()|0,56)|0;r()|0;L=yd(c^e|0,f^d|0,-1,33554431)|0;L=Id(L|0,r()|0,56)|0;r()|0;L=L&1;C=zd(j|0,l|0,k|0,i|0)|0;C=Id(C|0,r()|0,56)|0;r()|0;E=yd(j^k|0,l^i|0,-1,33554431)|0;E=Id(E|0,r()|0,56)|0;r()|0;E=E&L;F=zd(n|0,s|0,o|0,m|0)|0;F=Id(F|0,r()|0,56)|0;r()|0;G=yd(n^o|0,s^m|0,-1,33554431)|0;G=Id(G|0,r()|0,56)|0;r()|0;G=G&E;H=zd(p|0,q|0,u|0,t|0)|0;H=Id(H|0,r()|0,56)|0;r()|0;J=yd(p^u|0,q^t|0,-1,33554431)|0;J=Id(J|0,r()|0,56)|0;r()|0;J=J&G;I=zd(g|0,h|0,w|0,v|0)|0;I=Id(I|0,r()|0,56)|0;r()|0;K=yd(g^w|0,h^v|0,-1,33554431)|0;K=Id(K|0,r()|0,56)|0;r()|0;I=Jd(L&C|D&1|E&F|G&H|J&I|0,0,1)|0;r()|0}while(((I|J&K)+-1|0)>-1);while(1){g=Hd(g|0,h|0,1)|0;N=r()|0;Jd(p|0,q|0,55)|0;h=(r()|0)&8388608|N;p=Hd(p|0,q|0,1)|0;N=r()|0;Jd(n|0,s|0,55)|0;q=(r()|0)&8388608|N;n=Hd(n|0,s|0,1)|0;N=r()|0;Jd(j|0,l|0,55)|0;s=(r()|0)&8388608|N;j=Hd(j|0,l|0,1)|0;N=r()|0;Jd(c|0,f|0,55)|0;l=(r()|0)&8388608|N;c=Hd(c|0,f|0,1)|0;f=r()|0;N=zd(w|0,v|0,g|0,h|0)|0;M=r()|0;J=zd(u|0,t|0,p|0,q|0)|0;D=r()|0;F=zd(o|0,m|0,n|0,s|0)|0;E=r()|0;H=zd(k|0,i|0,j|0,l|0)|0;G=r()|0;K=zd(e|0,d|0,c|0,f|0)|0;I=r()|0;C=Hd(N|0,M|0,56)|0;C=yd(J|0,D|0,C|0,r()|0)|0;D=r()|0;J=Hd(C|0,D|0,56)|0;E=yd(J|0,r()|0,F|0,E|0)|0;F=r()|0;J=Hd(E|0,F|0,56)|0;G=yd(J|0,r()|0,H|0,G|0)|0;H=r()|0;J=Hd(G|0,H|0,56)|0;I=yd(J|0,r()|0,K|0,I|0)|0;K=r()|0;J=Id(I|0,K|0,63)|0;r()|0;J=0-(J^1)|0;L=((J|0)<0)<<31>>31;w=(N^w)&J^w;v=(M&16777215^v)&L^v;u=(C^u)&J^u;t=(D&16777215^t)&L^t;o=(E^o)&J^o;m=(F&16777215^m)&L^m;k=(G^k)&J^k;i=(H&16777215^i)&L^i;e=(I^e)&J^e;d=(K^d)&L^d;if((x|0)<=1)break;else x=x+-1|0}N=a;b[N>>2]=w;b[N+4>>2]=v;N=y;b[N>>2]=u;b[N+4>>2]=t;N=z;b[N>>2]=o;b[N+4>>2]=m;N=A;b[N>>2]=k;b[N+4>>2]=i;N=B;b[N>>2]=e;b[N+4>>2]=d;return}function Oa(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0;ma=x;x=x+80|0;ga=ma;e=c;L=b[e>>2]|0;e=b[e+4>>2]|0;K=e&16777215;J=c;b[J>>2]=L;b[J+4>>2]=K;e=Hd(L|0,e|0,56)|0;J=r()|0;ca=c+8|0;I=ca;J=yd(b[I>>2]|0,b[I+4>>2]|0,e|0,J|0)|0;e=r()|0;I=e&16777215;H=ca;b[H>>2]=J;b[H+4>>2]=I;e=Hd(J|0,e|0,56)|0;H=r()|0;ha=c+16|0;G=ha;H=yd(b[G>>2]|0,b[G+4>>2]|0,e|0,H|0)|0;e=r()|0;G=e&16777215;F=ha;b[F>>2]=H;b[F+4>>2]=G;e=Hd(H|0,e|0,56)|0;F=r()|0;ia=c+24|0;V=ia;F=yd(b[V>>2]|0,b[V+4>>2]|0,e|0,F|0)|0;e=r()|0;V=e&16777215;C=ia;b[C>>2]=F;b[C+4>>2]=V;e=Hd(F|0,e|0,56)|0;C=r()|0;ja=c+32|0;B=ja;C=yd(b[B>>2]|0,b[B+4>>2]|0,e|0,C|0)|0;e=r()|0;B=e&16777215;A=ja;b[A>>2]=C;b[A+4>>2]=B;e=Hd(C|0,e|0,56)|0;A=r()|0;ka=c+40|0;z=ka;A=yd(b[z>>2]|0,b[z+4>>2]|0,e|0,A|0)|0;e=r()|0;z=e&16777215;w=ka;b[w>>2]=A;b[w+4>>2]=z;e=Hd(A|0,e|0,56)|0;w=r()|0;la=c+48|0;s=la;w=yd(b[s>>2]|0,b[s+4>>2]|0,e|0,w|0)|0;e=r()|0;s=e&16777215;p=la;b[p>>2]=w;b[p+4>>2]=s;e=Hd(w|0,e|0,56)|0;p=r()|0;$=c+56|0;n=$;p=yd(b[n>>2]|0,b[n+4>>2]|0,e|0,p|0)|0;e=r()|0;n=e&16777215;m=$;b[m>>2]=p;b[m+4>>2]=n;e=Hd(p|0,e|0,56)|0;m=r()|0;aa=c+64|0;i=aa;m=yd(b[i>>2]|0,b[i+4>>2]|0,e|0,m|0)|0;e=r()|0;i=e&16777215;g=aa;b[g>>2]=m;b[g+4>>2]=i;e=Hd(m|0,e|0,56)|0;g=r()|0;ba=c+72|0;l=ba;g=yd(b[l>>2]|0,b[l+4>>2]|0,e|0,g|0)|0;e=r()|0;l=ba;b[l>>2]=g;b[l+4>>2]=e;l=d;k=b[l>>2]|0;l=b[l+4>>2]|0;v=ga;b[v>>2]=k;b[v+4>>2]=l;v=d+8|0;u=b[v>>2]|0;v=b[v+4>>2]|0;da=ga+8|0;y=da;b[y>>2]=u;b[y+4>>2]=v;y=d+16|0;t=b[y>>2]|0;y=b[y+4>>2]|0;ea=ga+16|0;q=ea;b[q>>2]=t;b[q+4>>2]=y;q=d+24|0;o=b[q>>2]|0;q=b[q+4>>2]|0;fa=ga+24|0;h=fa;b[h>>2]=o;b[h+4>>2]=q;d=d+32|0;h=b[d>>2]|0;d=b[d+4>>2]|0;j=d&16777215;W=ga+32|0;f=W;b[f>>2]=h;b[f+4>>2]=j;d=Hd(h|0,d|0,56)|0;f=r()|0;X=ga+40|0;_=X;b[_>>2]=d;b[_+4>>2]=f;_=ga+48|0;b[_>>2]=0;b[_+4>>2]=0;b[_+8>>2]=0;b[_+12>>2]=0;b[_+16>>2]=0;b[_+20>>2]=0;b[_+24>>2]=0;b[_+28>>2]=0;if((Ma(c,ga)|0)<0){la=L;fa=K;ga=a;ka=ga;b[ka>>2]=la;ga=ga+4|0;b[ga>>2]=fa;ga=ca;fa=ga;fa=b[fa>>2]|0;ga=ga+4|0;ga=b[ga>>2]|0;ka=a+8|0;la=ka;b[la>>2]=fa;ka=ka+4|0;b[ka>>2]=ga;ka=ha;ga=ka;ga=b[ga>>2]|0;ka=ka+4|0;ka=b[ka>>2]|0;ha=a+16|0;la=ha;b[la>>2]=ga;ha=ha+4|0;b[ha>>2]=ka;ha=ia;ha=b[ha>>2]|0;ia=ia+4|0;ia=b[ia>>2]|0;ka=a+24|0;la=ka;b[la>>2]=ha;ka=ka+4|0;b[ka>>2]=ia;ka=ja;ia=ka;ia=b[ia>>2]|0;ka=ka+4|0;ka=b[ka>>2]|0;la=a+32|0;ja=la;b[ja>>2]=ia;la=la+4|0;b[la>>2]=ka;x=ma;return}Y=ga+72|0;Z=ga+64|0;D=ga+56|0;E=0;N=0;M=0;P=0;O=0;R=0;Q=0;S=0;T=0;do{oa=Jd(N|0,M|0,1)|0;na=r()|0;U=Hd(P|0,O|0,55)|0;N=U|oa;M=r()|0|na;na=Y;b[na>>2]=N;b[na+4>>2]=M;na=Jd(P|0,O|0,1)|0;oa=(r()|0)&16777215;U=Hd(R|0,Q|0,55)|0;P=na&-2|U;O=oa|(r()|0);oa=Z;b[oa>>2]=P;b[oa+4>>2]=O;oa=Jd(R|0,Q|0,1)|0;U=(r()|0)&16777215;na=Hd(S|0,T|0,55)|0;R=oa&-2|na;Q=U|(r()|0);U=D;b[U>>2]=R;b[U+4>>2]=Q;U=Jd(S|0,T|0,1)|0;na=(r()|0)&16777215;oa=Hd(d|0,f|0,55)|0;S=U&-2|oa;T=na|(r()|0);na=_;b[na>>2]=S;b[na+4>>2]=T;na=Jd(d|0,f|0,1)|0;oa=(r()|0)&16777215;U=Hd(h|0,j|0,55)|0;d=na&-2|U;f=oa|(r()|0);oa=X;b[oa>>2]=d;b[oa+4>>2]=f;oa=Jd(h|0,j|0,1)|0;U=(r()|0)&16777215;na=Hd(o|0,q|0,55)|0;h=oa&-2|na;j=U|(r()|0);U=W;b[U>>2]=h;b[U+4>>2]=j;U=Jd(o|0,q|0,1)|0;na=(r()|0)&16777215;oa=Hd(t|0,y|0,55)|0;o=U&-2|oa;q=na|(r()|0);na=fa;b[na>>2]=o;b[na+4>>2]=q;na=Jd(t|0,y|0,1)|0;oa=(r()|0)&16777215;U=Hd(u|0,v|0,55)|0;t=na&-2|U;y=oa|(r()|0);oa=ea;b[oa>>2]=t;b[oa+4>>2]=y;oa=Jd(u|0,v|0,1)|0;U=(r()|0)&16777215;na=Hd(k|0,l|0,55)|0;u=oa&-2|na;v=U|(r()|0);U=da;b[U>>2]=u;b[U+4>>2]=v;U=Jd(k|0,l|0,1)|0;k=U&-2;l=(r()|0)&16777215;U=ga;b[U>>2]=k;b[U+4>>2]=l;E=E+1|0}while((Ma(c,ga)|0)>-1);U=ga+56|0;D=V;while(1){k=Hd(k|0,l|0,1)|0;Ha=r()|0;Jd(u|0,v|0,55)|0;l=(r()|0)&8388608|Ha;u=Hd(u|0,v|0,1)|0;Ha=r()|0;Jd(t|0,y|0,55)|0;v=(r()|0)&8388608|Ha;t=Hd(t|0,y|0,1)|0;Ha=r()|0;Jd(o|0,q|0,55)|0;y=(r()|0)&8388608|Ha;o=Hd(o|0,q|0,1)|0;Ha=r()|0;Jd(h|0,j|0,55)|0;q=(r()|0)&8388608|Ha;h=Hd(h|0,j|0,1)|0;Ha=r()|0;Jd(d|0,f|0,55)|0;j=(r()|0)&8388608|Ha;d=Hd(d|0,f|0,1)|0;Ha=r()|0;Jd(S|0,T|0,55)|0;f=(r()|0)&8388608|Ha;S=Hd(S|0,T|0,1)|0;Ha=r()|0;Jd(R|0,Q|0,55)|0;T=(r()|0)&8388608|Ha;R=Hd(R|0,Q|0,1)|0;Ha=r()|0;Jd(P|0,O|0,55)|0;Q=(r()|0)&8388608|Ha;P=Hd(P|0,O|0,1)|0;Ha=r()|0;Jd(N|0,M|0,55)|0;O=(r()|0)&8388608|Ha;N=Hd(N|0,M|0,1)|0;M=r()|0;Ha=zd(L|0,K|0,k|0,l|0)|0;Ga=r()|0;Da=zd(J|0,I|0,u|0,v|0)|0;Ea=r()|0;Ba=zd(H|0,G|0,t|0,y|0)|0;Ca=r()|0;za=zd(F|0,D|0,o|0,q|0)|0;Aa=r()|0;xa=zd(C|0,B|0,h|0,j|0)|0;ya=r()|0;va=zd(A|0,z|0,d|0,f|0)|0;wa=r()|0;ta=zd(w|0,s|0,S|0,T|0)|0;ua=r()|0;ra=zd(p|0,n|0,R|0,Q|0)|0;sa=r()|0;V=zd(m|0,i|0,P|0,O|0)|0;qa=r()|0;na=zd(g|0,e|0,N|0,M|0)|0;pa=r()|0;Fa=Hd(Ha|0,Ga|0,56)|0;Fa=yd(Da|0,Ea|0,Fa|0,r()|0)|0;Ea=r()|0;Da=Hd(Fa|0,Ea|0,56)|0;Da=yd(Ba|0,Ca|0,Da|0,r()|0)|0;Ca=r()|0;Ba=Hd(Da|0,Ca|0,56)|0;Ba=yd(za|0,Aa|0,Ba|0,r()|0)|0;Aa=r()|0;za=Hd(Ba|0,Aa|0,56)|0;za=yd(xa|0,ya|0,za|0,r()|0)|0;ya=r()|0;xa=Hd(za|0,ya|0,56)|0;xa=yd(va|0,wa|0,xa|0,r()|0)|0;wa=r()|0;va=Hd(xa|0,wa|0,56)|0;va=yd(ta|0,ua|0,va|0,r()|0)|0;ua=r()|0;ta=Hd(va|0,ua|0,56)|0;ta=yd(ra|0,sa|0,ta|0,r()|0)|0;sa=r()|0;ra=Hd(ta|0,sa|0,56)|0;ra=yd(V|0,qa|0,ra|0,r()|0)|0;qa=r()|0;V=Hd(ra|0,qa|0,56)|0;pa=yd(V|0,r()|0,na|0,pa|0)|0;na=r()|0;V=Id(pa|0,na|0,63)|0;r()|0;V=0-(V^1)|0;oa=((V|0)<0)<<31>>31;L=(Ha^L)&V^L;K=(Ga&16777215^K)&oa^K;J=(Fa^J)&V^J;I=(Ea&16777215^I)&oa^I;H=(Da^H)&V^H;G=(Ca&16777215^G)&oa^G;F=(Ba^F)&V^F;D=(Aa&16777215^D)&oa^D;C=(za^C)&V^C;B=(ya&16777215^B)&oa^B;A=(xa^A)&V^A;z=(wa&16777215^z)&oa^z;w=(va^w)&V^w;s=(ua&16777215^s)&oa^s;p=(ta^p)&V^p;n=(sa&16777215^n)&oa^n;m=(ra^m)&V^m;i=(qa&16777215^i)&oa^i;g=(pa^g)&V^g;e=(na^e)&oa^e;if((E|0)<=1)break;else E=E+-1|0}Ea=ga;b[Ea>>2]=k;b[Ea+4>>2]=l;Ea=da;b[Ea>>2]=u;b[Ea+4>>2]=v;Ea=ea;b[Ea>>2]=t;b[Ea+4>>2]=y;Ea=fa;b[Ea>>2]=o;b[Ea+4>>2]=q;Ea=W;b[Ea>>2]=h;b[Ea+4>>2]=j;Ea=X;b[Ea>>2]=d;b[Ea+4>>2]=f;Ea=_;b[Ea>>2]=S;b[Ea+4>>2]=T;Ea=U;b[Ea>>2]=R;b[Ea+4>>2]=Q;Ea=Z;b[Ea>>2]=P;b[Ea+4>>2]=O;Ea=Y;b[Ea>>2]=N;b[Ea+4>>2]=M;Ea=c;b[Ea>>2]=L;b[Ea+4>>2]=K;Ea=ca;b[Ea>>2]=J;b[Ea+4>>2]=I;Ea=ha;b[Ea>>2]=H;b[Ea+4>>2]=G;Ea=ia;b[Ea>>2]=F;b[Ea+4>>2]=D;Ea=ja;b[Ea>>2]=C;b[Ea+4>>2]=B;Ea=ka;b[Ea>>2]=A;b[Ea+4>>2]=z;Ea=la;b[Ea>>2]=w;b[Ea+4>>2]=s;Ea=$;b[Ea>>2]=p;b[Ea+4>>2]=n;Ea=aa;b[Ea>>2]=m;b[Ea+4>>2]=i;Ea=ba;b[Ea>>2]=g;b[Ea+4>>2]=e;Ea=L;Ga=K;Ha=a;Fa=Ha;b[Fa>>2]=Ea;Ha=Ha+4|0;b[Ha>>2]=Ga;Ha=ca;Ga=Ha;Ga=b[Ga>>2]|0;Ha=Ha+4|0;Ha=b[Ha>>2]|0;Fa=a+8|0;Ea=Fa;b[Ea>>2]=Ga;Fa=Fa+4|0;b[Fa>>2]=Ha;Fa=ha;Ha=Fa;Ha=b[Ha>>2]|0;Fa=Fa+4|0;Fa=b[Fa>>2]|0;Ea=a+16|0;Ga=Ea;b[Ga>>2]=Ha;Ea=Ea+4|0;b[Ea>>2]=Fa;Ea=ia;Fa=Ea;Fa=b[Fa>>2]|0;Ea=Ea+4|0;Ea=b[Ea>>2]|0;Ga=a+24|0;Ha=Ga;b[Ha>>2]=Fa;Ga=Ga+4|0;b[Ga>>2]=Ea;Ga=ja;Ea=Ga;Ea=b[Ea>>2]|0;Ga=Ga+4|0;Ga=b[Ga>>2]|0;Ha=a+32|0;Fa=Ha;b[Fa>>2]=Ea;Ha=Ha+4|0;b[Ha>>2]=Ga;x=ma;return}function Pa(a){a=a|0;a=Fd(b[a>>2]|0,b[a+4>>2]|0,2,0)|0;r()|0;return a|0}function Qa(a,c){a=a|0;c=c|0;var d=0,e=0;e=(c|0)/56|0;a=a+(e<<3)|0;d=b[a>>2]|0;a=b[a+4>>2]|0;c=Jd(1,0,c-(e*56|0)|0)|0;return ((d&c|0)!=0|(a&(r()|0)|0)!=0)&1|0}function Ra(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;e=a;d=b[e>>2]|0;e=b[e+4>>2]|0;f=a;b[f>>2]=d;b[f+4>>2]=e&16777215;e=Hd(d|0,e|0,56)|0;f=r()|0;g=a+8|0;h=g;f=yd(b[h>>2]|0,b[h+4>>2]|0,e|0,f|0)|0;e=r()|0;b[g>>2]=f;b[g+4>>2]=e&16777215;e=Hd(f|0,e|0,56)|0;f=r()|0;g=a+16|0;h=g;f=yd(b[h>>2]|0,b[h+4>>2]|0,e|0,f|0)|0;e=r()|0;b[g>>2]=f;b[g+4>>2]=e&16777215;e=Hd(f|0,e|0,56)|0;f=r()|0;g=a+24|0;h=g;f=yd(b[h>>2]|0,b[h+4>>2]|0,e|0,f|0)|0;e=r()|0;b[g>>2]=f;b[g+4>>2]=e&16777215;e=Hd(f|0,e|0,56)|0;f=r()|0;a=a+32|0;g=a;f=yd(b[g>>2]|0,b[g+4>>2]|0,e|0,f|0)|0;e=r()|0;b[a>>2]=f;b[a+4>>2]=e;return (1<<c)+-1&d|0}function Sa(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0;ba=x;x=x+80|0;$=ba;e=$;f=e+80|0;do{b[e>>2]=0;e=e+4|0}while((e|0)<(f|0));U=c+8|0;V=c+16|0;W=c+24|0;X=c+32|0;Y=$+72|0;Z=$+64|0;t=$+56|0;y=$+48|0;B=$+40|0;C=$+32|0;F=$+24|0;I=$+16|0;K=$+8|0;e=0;q=0;s=0;u=0;v=0;w=0;z=0;A=0;D=0;E=0;G=0;H=0;J=0;L=0;M=0;N=0;O=0;P=0;Q=0;R=0;S=0;T=0;_=0;while(1){i=c;h=b[i>>2]|0;i=b[i+4>>2]|0;n=U;m=b[n>>2]|0;n=b[n+4>>2]|0;j=V;o=b[j>>2]|0;j=b[j+4>>2]|0;k=W;f=b[k>>2]|0;k=b[k+4>>2]|0;l=X;p=b[l>>2]|0;l=b[l+4>>2]|0;g=i&16777215;i=Hd(h|0,i|0,56)|0;i=yd(m|0,n|0,i|0,r()|0)|0;n=r()|0;m=n&16777215;n=Hd(i|0,n|0,56)|0;j=yd(n|0,r()|0,o|0,j|0)|0;o=r()|0;n=o&16777215;o=Hd(j|0,o|0,56)|0;k=yd(o|0,r()|0,f|0,k|0)|0;f=r()|0;o=f&16777215;f=Hd(k|0,f|0,56)|0;l=yd(f|0,r()|0,p|0,l|0)|0;p=r()|0;if((l|0)==0&(p|0)==0)if((k|0)==0&(o|0)==0)if((j|0)==0&(n|0)==0)if((i|0)==0&(m|0)==0)if((h|0)==0&(g|0)==0)f=0;else{f=0;aa=4}else{f=56;h=i;g=m;aa=4}else{f=112;h=j;g=n;aa=4}else{f=168;h=k;g=o;aa=4}else{f=224;h=l;g=p;aa=4}if((aa|0)==4){aa=0;do{o=h;h=Cd(h|0,g|0,2,0)|0;p=g;g=r()|0;f=f+1|0;p=yd(o|0,p|0,1,0)|0;o=r()|0}while(!(o>>>0<0|(o|0)==0&p>>>0<3))}if((s|0)>=(f<<1|0))break;if(!q)e=ed(d)|0;else e=e>>1;p=Jd(_|0,u|0,1)|0;ka=r()|0;n=Hd(v|0,w|0,55)|0;p=n|p;ka=r()|0|ka;n=Y;b[n>>2]=p;b[n+4>>2]=ka;n=Jd(v|0,w|0,1)|0;ia=(r()|0)&16777215;ja=Hd(z|0,A|0,55)|0;ja=n&-2|ja;ia=ia|(r()|0);n=Z;b[n>>2]=ja;b[n+4>>2]=ia;n=Jd(z|0,A|0,1)|0;ga=(r()|0)&16777215;ha=Hd(D|0,E|0,55)|0;ha=n&-2|ha;ga=ga|(r()|0);n=t;b[n>>2]=ha;b[n+4>>2]=ga;n=Jd(D|0,E|0,1)|0;ea=(r()|0)&16777215;fa=Hd(G|0,H|0,55)|0;fa=n&-2|fa;ea=ea|(r()|0);n=y;b[n>>2]=fa;b[n+4>>2]=ea;n=Jd(G|0,H|0,1)|0;ca=(r()|0)&16777215;da=Hd(J|0,L|0,55)|0;da=n&-2|da;ca=ca|(r()|0);n=B;b[n>>2]=da;b[n+4>>2]=ca;n=Jd(J|0,L|0,1)|0;g=(r()|0)&16777215;f=Hd(M|0,N|0,55)|0;f=n&-2|f;g=g|(r()|0);n=C;b[n>>2]=f;b[n+4>>2]=g;n=Jd(M|0,N|0,1)|0;i=(r()|0)&16777215;h=Hd(O|0,P|0,55)|0;h=n&-2|h;i=i|(r()|0);n=F;b[n>>2]=h;b[n+4>>2]=i;n=Jd(O|0,P|0,1)|0;k=(r()|0)&16777215;j=Hd(Q|0,R|0,55)|0;j=n&-2|j;k=k|(r()|0);n=I;b[n>>2]=j;b[n+4>>2]=k;n=Jd(Q|0,R|0,1)|0;m=(r()|0)&16777215;l=Hd(S|0,T|0,55)|0;l=n&-2|l;m=m|(r()|0);n=K;b[n>>2]=l;b[n+4>>2]=m;n=Jd(S|0,T|0,1)|0;o=(r()|0)&16777215;n=n&-2|e&1;la=$;b[la>>2]=n;b[la+4>>2]=o;q=q+1&7;s=s+1|0;u=ka;v=ja;w=ia;z=ha;A=ga;D=fa;E=ea;G=da;H=ca;J=f;L=g;M=h;N=i;O=j;P=k;Q=l;R=m;S=n;T=o;_=p}Oa(a,$,c);x=ba;return}function Ta(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0;f=x;x=x+176|0;g=f+96|0;i=f+48|0;h=f;k=c;j=b[k+4>>2]|0;l=i;b[l>>2]=b[k>>2];b[l+4>>2]=j;l=c+8|0;j=b[l+4>>2]|0;k=i+8|0;b[k>>2]=b[l>>2];b[k+4>>2]=j;k=c+16|0;j=b[k+4>>2]|0;l=i+16|0;b[l>>2]=b[k>>2];b[l+4>>2]=j;l=c+24|0;j=b[l+4>>2]|0;k=i+24|0;b[k>>2]=b[l>>2];b[k+4>>2]=j;k=c+32|0;c=b[k+4>>2]|0;j=i+32|0;b[j>>2]=b[k>>2];b[j+4>>2]=c;j=d;c=b[j+4>>2]|0;k=h;b[k>>2]=b[j>>2];b[k+4>>2]=c;k=d+8|0;c=b[k+4>>2]|0;j=h+8|0;b[j>>2]=b[k>>2];b[j+4>>2]=c;j=d+16|0;c=b[j+4>>2]|0;k=h+16|0;b[k>>2]=b[j>>2];b[k+4>>2]=c;k=d+24|0;c=b[k+4>>2]|0;j=h+24|0;b[j>>2]=b[k>>2];b[j+4>>2]=c;j=d+32|0;c=b[j+4>>2]|0;d=h+32|0;b[d>>2]=b[j>>2];b[d+4>>2]=c;Na(i,e);Na(h,e);Ha(g,i,h);Oa(a,g,e);x=f;return}function Ua(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=x;x=x+48|0;k=e;j=c;g=b[j+4>>2]|0;i=k;b[i>>2]=b[j>>2];b[i+4>>2]=g;i=c+8|0;g=b[i+4>>2]|0;j=k+8|0;h=j;b[h>>2]=b[i>>2];b[h+4>>2]=g;h=c+16|0;g=b[h+4>>2]|0;i=k+16|0;f=i;b[f>>2]=b[h>>2];b[f+4>>2]=g;f=c+24|0;g=b[f+4>>2]|0;h=k+24|0;l=h;b[l>>2]=b[f>>2];b[l+4>>2]=g;l=c+32|0;c=b[l+4>>2]|0;g=k+32|0;f=g;b[f>>2]=b[l>>2];b[f+4>>2]=c;Na(k,d);f=d;k=zd(b[f>>2]|0,b[f+4>>2]|0,b[k>>2]|0,b[k+4>>2]|0)|0;f=r()|0;c=a;b[c>>2]=k;b[c+4>>2]=f;c=d+8|0;j=zd(b[c>>2]|0,b[c+4>>2]|0,b[j>>2]|0,b[j+4>>2]|0)|0;c=r()|0;f=a+8|0;b[f>>2]=j;b[f+4>>2]=c;f=d+16|0;i=zd(b[f>>2]|0,b[f+4>>2]|0,b[i>>2]|0,b[i+4>>2]|0)|0;f=r()|0;c=a+16|0;b[c>>2]=i;b[c+4>>2]=f;c=d+24|0;h=zd(b[c>>2]|0,b[c+4>>2]|0,b[h>>2]|0,b[h+4>>2]|0)|0;c=r()|0;f=a+24|0;b[f>>2]=h;b[f+4>>2]=c;f=d+32|0;g=zd(b[f>>2]|0,b[f+4>>2]|0,b[g>>2]|0,b[g+4>>2]|0)|0;f=r()|0;c=a+32|0;b[c>>2]=g;b[c+4>>2]=f;Na(a,d);x=e;return}function Va(a,b){a=a|0;b=b|0;Ob(a,b);Ob(a+96|0,b+96|0);Ob(a+192|0,b+192|0);return}function Wa(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;g=x;x=x+192|0;c=g+96|0;d=g;e=b+192|0;Yb(c,a,e);f=a+192|0;Yb(d,b,f);if(!(Lb(c,d)|0)){f=0;x=g;return f|0}Yb(c,a+96|0,e);Yb(d,b+96|0,f);f=(Lb(c,d)|0)!=0&1;x=g;return f|0}function Xa(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;e=x;x=x+192|0;b=e+96|0;c=e;f=Hb(a)|0;d=a+192|0;if((Hb(d)|0)&f|0){x=e;return}Qb(b);if(!(Jb(d)|0)){Zb(c,d);Yb(a,a,c);f=a+96|0;Yb(f,f,c);Kb(a);Kb(f);Ob(d,b);x=e;return}else{Kb(a);Kb(a+96|0);x=e;return}}function Ya(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;f=x;x=x+288|0;d=f;Ob(d,c);e=d+96|0;Ob(e,c+96|0);g=d+192|0;Ob(g,c+192|0);Xa(d);c=Hb(d)|0;if((Hb(g)|0)&c|0){g=-1;x=f;return g|0}Ob(b,e);Ob(a,d);g=0;x=f;return g|0}function Za(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=x;x=x+336|0;g=d+232|0;h=d;e=d+136|0;f=d+40|0;Xb(f,c);Xb(g,b);Yb(e,g,b);va(h,16);Nb(g,h);ac(g);Tb(e,g,e);Kb(e);if(!(Lb(f,e)|0)){Pb(a);Qb(a+96|0);Pb(a+192|0);h=0;x=d;return h|0}else{Ob(a,b);Ob(a+96|0,c);Qb(a+192|0);h=1;x=d;return h|0}return 0}function _a(a){a=a|0;a=a+96|0;_b(a);Rb(a,a);_b(a);return}function $a(a){a=a|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;c=x;x=x+576|0;f=c+480|0;e=c+384|0;j=c+288|0;g=c+192|0;h=c+96|0;i=c;d=a+96|0;Ob(g,d);$b(g);_b(g);Xb(f,d);$b(f);k=a+192|0;Yb(e,g,k);Xb(j,k);Tb(k,f,f);_b(k);Tb(k,k,k);Tb(k,k,k);_b(k);Wb(j,j,(b[459]|0)*3|0);Yb(h,j,k);Tb(i,f,j);_b(i);Yb(k,k,e);Tb(e,j,j);Tb(j,j,e);_b(j);Ub(f,f,j);_b(f);Yb(i,i,f);Tb(d,i,h);Yb(e,a,g);_b(f);Yb(a,f,e);Tb(a,a,a);_b(a);_b(d);x=c;return 1}function ab(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=x;x=x+768|0;g=d+672|0;k=d+576|0;n=d+480|0;j=d+384|0;i=d+288|0;m=d+192|0;l=d+96|0;h=d;o=(b[459]|0)*3|0;Yb(g,a,c);f=a+96|0;q=c+96|0;Yb(k,f,q);e=a+192|0;p=c+192|0;Yb(n,e,p);Tb(j,a,f);_b(j);Tb(i,c,q);_b(i);Yb(j,j,i);Tb(i,g,k);Ub(j,j,i);_b(j);$b(j);_b(j);Tb(i,f,e);_b(i);Tb(m,q,p);_b(m);Yb(i,i,m);Tb(m,k,n);Ub(i,i,m);_b(i);$b(i);_b(i);Tb(m,a,e);_b(m);Tb(l,c,p);_b(l);Yb(m,m,l);Tb(l,g,n);Ub(l,m,l);_b(l);$b(g);_b(g);$b(k);_b(k);Tb(m,g,g);Tb(g,g,m);_b(g);Wb(n,n,o);Tb(h,k,n);_b(h);Ub(k,k,n);_b(k);Wb(l,l,o);Yb(m,l,i);Yb(n,j,k);Ub(a,n,m);Yb(l,l,g);Yb(k,k,h);Tb(f,l,k);Yb(g,g,j);Yb(h,h,i);Tb(e,h,g);_b(a);_b(f);_b(e);x=d;return 0}function bb(b,c){b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0;s=x;x=x+3344|0;m=s+3048|0;d=s+2432|0;h=s+2384|0;n=s+2760|0;o=s+80|0;p=s+2472|0;q=s;l=Hb(b)|0;k=b+192|0;if((Hb(k)|0)&l|0){x=s;return}Ob(n,b);j=n+96|0;l=b+96|0;Ob(j,l);f=n+192|0;Ob(f,k);$a(n)|0;Ob(o,b);e=o+96|0;Ob(e,l);g=o+192|0;Ob(g,k);i=o+288|0;Ob(i,o);t=o+384|0;Ob(t,e);e=o+480|0;Ob(e,g);ab(i,n)|0;i=o+576|0;Ob(i,o+288|0);g=o+672|0;Ob(g,t);t=o+768|0;Ob(t,e);ab(i,n)|0;i=o+864|0;Ob(i,o+576|0);e=o+960|0;Ob(e,g);g=o+1056|0;Ob(g,t);ab(i,n)|0;i=o+1152|0;Ob(i,o+864|0);t=o+1248|0;Ob(t,e);e=o+1344|0;Ob(e,g);ab(i,n)|0;i=o+1440|0;Ob(i,o+1152|0);g=o+1536|0;Ob(g,t);t=o+1632|0;Ob(t,e);ab(i,n)|0;i=o+1728|0;Ob(i,o+1440|0);e=o+1824|0;Ob(e,g);g=o+1920|0;Ob(g,t);ab(i,n)|0;i=o+2016|0;Ob(i,o+1728|0);Ob(o+2112|0,e);Ob(o+2208|0,g);ab(i,n)|0;la(h,c);c=Pa(h)|0;Ba(h,1);pa(h)|0;r()|0;i=Pa(h)|0;la(d,h);Ba(d,1);pa(d)|0;r()|0;na(h,d,c);Ib(n,b,i);Ib(j,l,i);Ib(f,k,i);Ob(p,n);i=p+96|0;Ob(i,j);j=p+192|0;Ob(j,f);f=ka(h)|0;c=(f+3|0)/4|0;g=c+1|0;d=Ra(h,5)|0;if((f|0)>=-6){e=0;while(1){d=d+240|0;a[q+e>>0]=d;Fa(h,d<<24>>24);pa(h)|0;r()|0;qa(h,4)|0;d=Ra(h,5)|0;if((e|0)<(c|0))e=e+1|0;else break}}a[q+g>>0]=d;t=((d<<24>>24)+-1|0)/2|0;Ob(b,o+(t*288|0)|0);Ob(l,o+(t*288|0)+96|0);Ob(k,o+(t*288|0)+192|0);if((f|0)>-7)while(1){cb(n,o,a[q+c>>0]|0);$a(b)|0;$a(b)|0;$a(b)|0;$a(b)|0;ab(b,n)|0;if((c|0)>0)c=c+-1|0;else break}Ob(m,p);t=m+96|0;Ob(t,i);Ob(m+192|0,j);_b(t);Rb(t,t);_b(t);ab(b,m)|0;Xa(b);x=s;return}function cb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;d=x;x=x+288|0;h=d;i=c>>31;f=((c>>>31)+-1+(i^c)|0)/2|0;c=(f+-1|0)>>>31;Ib(a,b,c);g=a+96|0;Ib(g,b+96|0,c);e=a+192|0;Ib(e,b+192|0,c);c=((f^1)+-1|0)>>>31;Ib(a,b+288|0,c);Ib(g,b+384|0,c);Ib(e,b+480|0,c);c=((f^2)+-1|0)>>>31;Ib(a,b+576|0,c);Ib(g,b+672|0,c);Ib(e,b+768|0,c);c=((f^3)+-1|0)>>>31;Ib(a,b+864|0,c);Ib(g,b+960|0,c);Ib(e,b+1056|0,c);c=((f^4)+-1|0)>>>31;Ib(a,b+1152|0,c);Ib(g,b+1248|0,c);Ib(e,b+1344|0,c);c=((f^5)+-1|0)>>>31;Ib(a,b+1440|0,c);Ib(g,b+1536|0,c);Ib(e,b+1632|0,c);c=((f^6)+-1|0)>>>31;Ib(a,b+1728|0,c);Ib(g,b+1824|0,c);Ib(e,b+1920|0,c);f=((f^7)+-1|0)>>>31;Ib(a,b+2016|0,f);Ib(g,b+2112|0,f);Ib(e,b+2208|0,f);Ob(h,a);f=h+96|0;Ob(f,g);b=h+192|0;Ob(b,e);_b(f);Rb(f,f);_b(f);c=i&1;Ib(a,h,c);Ib(g,f,c);Ib(e,b,c);x=d;return}function db(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=x;x=x+96|0;e=c;Xb(e,b);Sb(a,a);d=a+96|0;Sb(d,d);f=a+192|0;Sb(f,f);Kb(f);Yb(a,e,a);Yb(d,e,d);Yb(d,b,d);x=c;return}function eb(a){a=a|0;if(!(zc(a)|0)){a=0;return a|0}a=(zc(a+96|0)|0)!=0&1;return a|0}function fb(a,b){a=a|0;b=b|0;Bc(a,b);Bc(a+48|0,b+48|0);Bc(a+96|0,b+96|0);return}function gb(a,c){a=a|0;c=c|0;var d=0,e=0;e=x;x=x+48|0;d=e;Kc(d,c);Gc(d,d,c);if((b[540]|0)==-3){Ic(a,c);Jc(a);Hc(a,a,3);Jc(a);Lc(a,d,a)}else Bc(a,d);Cc(d,16);Lc(a,d,a);Ac(a);x=e;return}function hb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;g=x;x=x+144|0;d=g;Bc(d,c);e=d+48|0;Bc(e,c+48|0);f=d+96|0;Bc(f,c+96|0);ib(d);if(zc(d)|0?zc(f)|0:0){f=-1;x=g;return f|0}xc(b,e);f=Pa(b)|0;xc(a,d);x=g;return f|0}function ib(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;e=x;x=x+96|0;c=e+48|0;d=e;b=a+96|0;if(zc(a)|0?zc(b)|0:0){x=e;return}Oc(c);if(Fc(b,c)|0){x=e;return}Qc(d,b);Gc(a,a,d);f=a+48|0;Gc(f,f,d);Ac(f);Ac(a);Bc(b,c);x=e;return}function jb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=x;x=x+96|0;e=d+48|0;f=d;vc(f,c);Kc(f,f);Ac(f);vc(e,b);gb(e,e);if(!(Fc(f,e)|0)){Ec(a);Oc(a+48|0);Ec(a+96|0);f=0;x=d;return f|0}else{vc(a,b);vc(a+48|0,c);Oc(a+96|0);f=1;x=d;return f|0}return 0}function kb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;g=x;x=x+144|0;d=g+88|0;e=g+40|0;f=g;vc(d,b);gb(d,d);if(!(Pc(d,e)|0)){Ec(a);Oc(a+48|0);Ec(a+96|0);f=0;x=g;return f|0}vc(a,b);b=a+48|0;Rc(b,d,e);xc(f,b);if((Pa(f)|0)!=(c|0))Ic(b,b);Ac(b);Oc(a+96|0);f=1;x=g;return f|0}function lb(a){a=a|0;var c=0,d=0;d=x;x=x+48|0;c=d;switch(b[458]|0){case 1:break;case 4:{mb(a);mb(a);break}case 8:{mb(a);mb(a);mb(a);break}default:{va(c,256);nb(a,c)}}x=d;return}function mb(a){a=a|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=x;x=x+384|0;c=o+336|0;h=o+288|0;i=o+240|0;j=o+192|0;k=o+144|0;l=o+96|0;m=o+48|0;n=o;if(!(b[540]|0)){n=a+48|0;Kc(c,n);m=a+96|0;Gc(h,n,m);Kc(i,m);Lc(m,c,c);Jc(m);Lc(m,m,m);Lc(m,m,m);Jc(m);Hc(i,i,(b[459]|0)*3|0);Gc(k,i,m);Lc(l,c,i);Jc(l);Gc(m,m,h);Lc(h,i,i);Lc(i,i,h);Mc(c,c,i);Jc(c);Gc(l,l,c);Lc(l,l,k);Gc(h,a,n);Jc(c);Gc(a,c,h);Lc(a,a,a);Jc(a);Bc(n,l);Jc(n);x=o;return}d=b[459]|0;e=(d|0)==0;if(e)Cc(n,16);Kc(c,a);f=a+48|0;Kc(h,f);g=a+96|0;Kc(i,g);Gc(j,a,f);Lc(j,j,j);Jc(j);Gc(m,g,a);Lc(m,m,m);Jc(m);if(e)Gc(l,i,n);else Hc(l,i,d);Mc(l,l,m);Lc(k,l,l);Jc(k);Lc(l,l,k);Mc(k,h,l);Jc(k);Lc(l,l,h);Jc(l);Gc(l,l,k);Gc(k,k,j);Lc(j,i,i);Lc(i,i,j);if(e)Gc(m,m,n);else Hc(m,m,d);Mc(m,m,i);Mc(m,m,c);Jc(m);Lc(j,m,m);Lc(m,m,j);Jc(m);Lc(j,c,c);Lc(c,c,j);Mc(c,c,i);Jc(c);Gc(c,c,m);Lc(l,l,c);Gc(c,f,g);Lc(c,c,c);Jc(c);Gc(m,m,c);Mc(a,k,m);Lc(c,c,c);Jc(c);Lc(h,h,h);Jc(h);Gc(g,c,h);Jc(a);Bc(f,l);Jc(f);Jc(g);x=o;return}function nb(b,c){b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0;s=x;x=x+1760|0;m=s+1608|0;d=s+1280|0;h=s+1232|0;n=s+1464|0;o=s+80|0;p=s+1320|0;q=s;if(zc(b)|0?zc(b+96|0)|0:0){x=s;return}if(ia(c)|0){Ec(b);Oc(b+48|0);Ec(b+96|0);x=s;return}ib(b);Bc(n,b);j=n+48|0;k=b+48|0;Bc(j,k);f=n+96|0;l=b+96|0;Bc(f,l);mb(n);Bc(o,b);e=o+48|0;Bc(e,k);g=o+96|0;Bc(g,l);i=o+144|0;Bc(i,o);t=o+192|0;Bc(t,e);e=o+240|0;Bc(e,g);ob(i,n);i=o+288|0;Bc(i,o+144|0);g=o+336|0;Bc(g,t);t=o+384|0;Bc(t,e);ob(i,n);i=o+432|0;Bc(i,o+288|0);e=o+480|0;Bc(e,g);g=o+528|0;Bc(g,t);ob(i,n);i=o+576|0;Bc(i,o+432|0);t=o+624|0;Bc(t,e);e=o+672|0;Bc(e,g);ob(i,n);i=o+720|0;Bc(i,o+576|0);g=o+768|0;Bc(g,t);t=o+816|0;Bc(t,e);ob(i,n);i=o+864|0;Bc(i,o+720|0);e=o+912|0;Bc(e,g);g=o+960|0;Bc(g,t);ob(i,n);i=o+1008|0;Bc(i,o+864|0);Bc(o+1056|0,e);Bc(o+1104|0,g);ob(i,n);la(h,c);c=Pa(h)|0;Ba(h,1);pa(h)|0;r()|0;i=Pa(h)|0;la(d,h);Ba(d,1);pa(d)|0;r()|0;na(h,d,c);Dc(n,b,i);Dc(j,k,i);Dc(f,l,i);Bc(p,n);i=p+48|0;Bc(i,j);j=p+96|0;Bc(j,f);f=ka(h)|0;c=(f+3|0)/4|0;g=c+1|0;d=Ra(h,5)|0;if((f|0)>=-6){e=0;while(1){d=d+240|0;a[q+e>>0]=d;Fa(h,d<<24>>24);pa(h)|0;r()|0;qa(h,4)|0;d=Ra(h,5)|0;if((e|0)<(c|0))e=e+1|0;else break}}a[q+g>>0]=d;t=((d<<24>>24)+-1|0)/2|0;Bc(b,o+(t*144|0)|0);Bc(k,o+(t*144|0)+48|0);Bc(l,o+(t*144|0)+96|0);if((f|0)>-7)while(1){pb(n,o,a[q+c>>0]|0);mb(b);mb(b);mb(b);mb(b);ob(b,n);if((c|0)>0)c=c+-1|0;else break}Bc(m,p);t=m+48|0;Bc(t,i);Bc(m+96|0,j);Ic(t,t);Jc(t);ob(b,m);ib(b);x=s;return}function ob(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;q=x;x=x+432|0;g=q+384|0;j=q+336|0;k=q+288|0;l=q+240|0;m=q+192|0;n=q+144|0;o=q+96|0;p=q+48|0;d=q;e=b[459]|0;if(!(b[540]|0)){f=e*3|0;Gc(g,a,c);h=a+48|0;d=c+48|0;Gc(j,h,d);i=a+96|0;e=c+96|0;Gc(k,i,e);Lc(l,a,h);Jc(l);Lc(m,c,d);Jc(m);Gc(l,l,m);Lc(m,g,j);Mc(l,l,m);Jc(l);Lc(m,h,i);Jc(m);Lc(n,d,e);Jc(n);Gc(m,m,n);Lc(n,j,k);Mc(m,m,n);Jc(m);Lc(n,a,i);Jc(n);Lc(o,c,e);Jc(o);Gc(n,n,o);Lc(o,g,k);Mc(o,n,o);Jc(o);Lc(n,g,g);Lc(g,g,n);Jc(g);Hc(k,k,f);Lc(p,j,k);Jc(p);Mc(j,j,k);Jc(j);Hc(o,o,f);Gc(n,o,m);Gc(k,l,j);Mc(a,k,n);Gc(o,o,g);Gc(j,j,p);Lc(h,o,j);Gc(g,g,l);Gc(p,p,m);Lc(i,p,g);Jc(a);Jc(h);Jc(i);x=q;return}f=(e|0)==0;if(f)Cc(d,16);Gc(g,a,c);h=a+48|0;s=c+48|0;Gc(j,h,s);i=a+96|0;r=c+96|0;Gc(k,i,r);Lc(l,a,h);Jc(l);Lc(m,c,s);Jc(m);Gc(l,l,m);Lc(m,g,j);Mc(l,l,m);Jc(l);Lc(m,h,i);Jc(m);Lc(n,s,r);Jc(n);Gc(m,m,n);Lc(n,j,k);Mc(m,m,n);Jc(m);Lc(n,a,i);Jc(n);Lc(o,c,r);Jc(o);Gc(n,n,o);Lc(o,g,k);Mc(o,n,o);Jc(o);if(f)Gc(p,k,d);else Hc(p,k,e);Mc(n,o,p);Jc(n);Lc(p,n,n);Lc(n,n,p);Mc(p,j,n);Jc(p);Lc(n,n,j);Jc(n);if(f)Gc(o,o,d);else Hc(o,o,e);Lc(j,k,k);Lc(k,k,j);Mc(o,o,k);Mc(o,o,g);Jc(o);Lc(j,o,o);Lc(o,o,j);Jc(o);Lc(j,g,g);Lc(g,g,j);Mc(g,g,k);Jc(g);Gc(j,m,o);Gc(k,g,o);Gc(o,n,p);Lc(h,o,k);Gc(n,n,l);Mc(a,n,j);Gc(p,p,m);Gc(j,l,g);Lc(i,p,j);Jc(a);Jc(h);Jc(i);x=q;return}function pb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;d=x;x=x+144|0;h=d;i=c>>31;f=((c>>>31)+-1+(i^c)|0)/2|0;c=(f+-1|0)>>>31;Dc(a,b,c);g=a+48|0;Dc(g,b+48|0,c);e=a+96|0;Dc(e,b+96|0,c);c=((f^1)+-1|0)>>>31;Dc(a,b+144|0,c);Dc(g,b+192|0,c);Dc(e,b+240|0,c);c=((f^2)+-1|0)>>>31;Dc(a,b+288|0,c);Dc(g,b+336|0,c);Dc(e,b+384|0,c);c=((f^3)+-1|0)>>>31;Dc(a,b+432|0,c);Dc(g,b+480|0,c);Dc(e,b+528|0,c);c=((f^4)+-1|0)>>>31;Dc(a,b+576|0,c);Dc(g,b+624|0,c);Dc(e,b+672|0,c);c=((f^5)+-1|0)>>>31;Dc(a,b+720|0,c);Dc(g,b+768|0,c);Dc(e,b+816|0,c);c=((f^6)+-1|0)>>>31;Dc(a,b+864|0,c);Dc(g,b+912|0,c);Dc(e,b+960|0,c);f=((f^7)+-1|0)>>>31;Dc(a,b+1008|0,f);Dc(g,b+1056|0,f);Dc(e,b+1104|0,f);Bc(h,a);f=h+48|0;Bc(f,g);b=h+96|0;Bc(b,e);Ic(f,f);Jc(f);c=i&1;Dc(a,h,c);Dc(g,f,c);Dc(e,b,c);x=d;return}function qb(c,d,e){c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;i=x;x=x+96|0;g=i+48|0;h=i;hb(g,h,d)|0;d=c+8|0;f=b[d>>2]|0;if(!e){a[f>>0]=4;b[c>>2]=65;oa((b[d>>2]|0)+1|0,g);oa((b[d>>2]|0)+33|0,h);x=i;return}a[f>>0]=2;if((Pa(h)|0)==1)a[b[d>>2]>>0]=3;b[c>>2]=33;oa((b[d>>2]|0)+1|0,g);x=i;return}function rb(c,d){c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;h=x;x=x+96|0;f=h+48|0;g=h;d=d+8|0;i=b[d>>2]|0;e=a[i>>0]|0;ra(f,i+1|0);if(e<<24>>24==4){ra(g,(b[d>>2]|0)+33|0);if(jb(c,f,g)|0){i=1;x=h;return i|0}}else if((e|1)<<24>>24==3?kb(c,f,e&1)|0:0){i=1;x=h;return i|0}i=0;x=h;return i|0}function sb(a,c){a=a|0;c=c|0;if((c|0)==(a|0))return;ec(a,c);ec(a+192|0,c+192|0);ec(a+384|0,c+384|0);b[a+576>>2]=b[c+576>>2];return}function tb(a){a=a|0;gc(a);fc(a+192|0);fc(a+384|0);b[a+576>>2]=1;return}function ub(a){a=a|0;fc(a);fc(a+192|0);fc(a+384|0);b[a+576>>2]=0;return}function vb(a,b){a=a|0;b=b|0;if((bc(a,b)|0?bc(a+192|0,b+192|0)|0:0)?bc(a+384|0,b+384|0)|0:0){b=1;return b|0}b=0;return b|0}function wb(a,c){a=a|0;c=c|0;var d=0,e=0;if((c|0)==(a|0)){c=a+384|0;d=a+192|0}else{ec(a,c);d=a+192|0;ec(d,c+192|0);e=a+384|0;ec(e,c+384|0);b[a+576>>2]=b[c+576>>2];c=e}jc(a,a);kc(d,d);jc(c,c);return}function xb(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;ec(a,c);ec(a+192|0,d);ec(a+384|0,e);b[a+576>>2]=5;return}function yb(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=x;x=x+768|0;h=d+576|0;g=d+384|0;f=d+192|0;e=d;ec(h,c);qc(a,c);lc(e,a,a);lc(a,e,a);ic(a);kc(h,h);lc(h,h,h);lc(a,a,h);h=c+384|0;qc(g,h);tc(g);lc(e,g,g);lc(g,g,e);ic(g);c=c+192|0;qc(f,c);lc(e,f,f);lc(f,f,e);ic(f);e=a+192|0;jc(e,c);lc(e,e,e);c=a+384|0;kc(c,h);lc(c,c,c);lc(e,g,e);lc(c,f,c);b[a+576>>2]=5;nc(a);nc(e);nc(c);x=d;return}function zb(a){a=a|0;nc(a);nc(a+192|0);nc(a+384|0);return}function Ab(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;i=x;x=x+768|0;d=i+576|0;e=i+384|0;f=i+192|0;g=i;h=c+576|0;if((b[h>>2]|0)>=2){qc(d,c);k=c+192|0;l=c+384|0;rc(e,k,l);lc(e,e,e);ic(e);qc(f,l);rc(g,c,k);lc(g,g,g);j=a+384|0;lc(j,c,l);lc(j,k,j);ic(j);qc(j,j);ec(a,d);lc(d,d,e);ic(d);lc(d,d,f);lc(d,d,g);ic(d);hc(d,d);tc(e);tc(f);lc(a,a,e);e=a+192|0;lc(e,f,g);lc(j,j,d);b[a+576>>2]=(b[h>>2]&-2|0)==2?4:5;ic(a);ic(e);ic(j);x=i;return}if((c|0)==(a|0)){x=i;return}ec(a,c);ec(a+192|0,c+192|0);ec(a+384|0,c+384|0);b[a+576>>2]=b[h>>2];x=i;return}function Bb(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;d=x;x=x+1152|0;h=d+960|0;m=d+768|0;k=d+576|0;g=d+384|0;i=d+192|0;j=d;rc(h,a,c);f=a+192|0;n=c+192|0;rc(k,f,n);lc(i,a,f);lc(j,c,n);ic(i);ic(j);rc(m,i,j);e=a+384|0;lc(i,f,e);l=c+384|0;lc(j,n,l);ic(i);ic(j);rc(g,i,j);hc(i,h);hc(j,k);lc(m,m,i);lc(f,m,j);lc(g,g,j);lc(k,k,i);lc(i,a,e);lc(j,c,l);ic(i);ic(j);rc(i,j,i);lc(k,k,i);rc(i,e,l);hc(j,i);lc(e,k,j);lc(g,g,j);tc(i);lc(f,f,i);ic(g);tc(g);lc(a,h,g);b[a+576>>2]=5;ic(a);ic(f);ic(e);x=d;return}function Cb(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;o=x;x=x+1152|0;i=o+960|0;f=o+768|0;j=o+576|0;k=o+384|0;l=o+192|0;m=o;n=a+576|0;e=b[n>>2]|0;if((e|0)==1){if((c|0)==(a|0)){x=o;return}ec(a,c);ec(a+192|0,c+192|0);ec(a+384|0,c+384|0);b[n>>2]=b[c+576>>2];x=o;return}h=c+576|0;d=b[h>>2]|0;if((d|0)==1){x=o;return}if((d|0)>3){rc(i,a,c);e=a+192|0;p=c+192|0;rc(j,e,p);lc(l,a,e);lc(m,c,p);ic(l);ic(m);rc(f,l,m);d=a+384|0;lc(l,e,d);g=c+384|0;lc(m,p,g);ic(l);ic(m);rc(k,l,m);hc(l,i);hc(m,j);lc(f,f,l);lc(e,f,m);lc(k,k,m);lc(j,j,l);lc(l,a,d);lc(m,c,g);ic(l);ic(m);rc(l,m,l);lc(j,j,l);if((b[h>>2]|0)!=4?(b[n>>2]|0)!=4:0)rc(l,d,g);else{Yb(l,d,g);f=l+96|0;Pb(f);if((b[h>>2]|0)!=4)Yb(f,d,c+480|0);if((b[n>>2]|0)!=4)Yb(f,a+480|0,g)}hc(m,l);lc(d,j,m);lc(k,k,m);tc(l);lc(e,e,l);ic(k);tc(k);lc(a,i,k)}else{if((e&-2|0)==2){Db(a,c);x=o;return}e=a+192|0;ec(k,e);rc(i,a,c);f=c+192|0;if((b[h>>2]|0)==2)pc(j,e,f);else oc(j,e,f);lc(e,a,e);ec(m,c);Tb(m,m,f);ic(m);ic(e);rc(e,e,m);d=a+384|0;lc(k,k,d);ic(k);if((b[h>>2]|0)==2)pc(k,k,f);else oc(k,k,f);hc(l,i);hc(m,j);lc(e,e,l);lc(e,e,m);lc(k,k,m);lc(j,j,l);lc(l,a,d);ic(l);ic(k);rc(l,c,l);lc(d,j,l);tc(k);lc(a,i,k)}b[n>>2]=5;ic(a);ic(e);ic(d);x=o;return}function Db(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;r=x;x=x+864|0;i=r+768|0;j=r+672|0;k=r+576|0;l=r+480|0;m=r+384|0;n=r+288|0;o=r+192|0;p=r+96|0;d=r;Yb(i,a,c);e=a+96|0;f=c+96|0;Yb(j,e,f);g=a+576|0;h=(b[g>>2]|0)==2;do if((b[c+576>>2]|0)==2)if(h){Gc(k,a+192|0,c+192|0);Ec(k+48|0)}else q=6;else if(h){Vb(k,c+192|0,a+192|0);if((b[g>>2]|0)==2)break;else{q=6;break}}else{Yb(k,a+192|0,c+192|0);break}while(0);if((q|0)==6)Vb(k,a+192|0,c+192|0);Tb(l,a,e);Tb(m,c,f);_b(l);_b(m);Yb(n,l,m);Tb(d,i,j);Rb(d,d);Tb(n,n,d);q=a+192|0;Tb(l,a,q);h=c+192|0;Tb(m,c,h);_b(l);_b(m);Yb(o,l,m);Tb(d,i,k);Rb(d,d);Tb(o,o,d);Tb(l,e,q);Tb(m,f,h);_b(l);_b(m);Yb(p,l,m);Tb(d,j,k);Rb(d,d);Tb(p,p,d);$b(j);Tb(i,i,j);cc(a,i,n);cc(q,o,p);dc(a+384|0,k);ic(a);ic(q);b[g>>2]=4;x=r;return}function Eb(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;d=x;x=x+768|0;h=d+576|0;g=d+384|0;f=d+192|0;e=d;qc(h,c);j=c+192|0;i=c+384|0;rc(g,j,i);tc(g);mc(h,h,g);ic(h);qc(g,i);tc(g);rc(f,c,j);mc(g,g,f);ic(g);qc(f,j);rc(e,c,i);mc(f,f,e);ic(f);rc(e,j,f);tc(e);rc(a,h,c);lc(e,a,e);c=a+384|0;rc(c,g,i);tc(c);lc(e,c,e);ic(e);sc(e,e);rc(a,h,e);rc(a+192|0,g,e);rc(c,f,e);b[a+576>>2]=5;x=d;return}function Fb(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=x;x=x+192|0;e=d+96|0;h=d;Xb(e,c);Yb(h,e,c);uc(a,h);g=a+192|0;uc(g,h);f=a+384|0;uc(f,h);oc(g,g,c);oc(f,f,e);b[a+576>>2]=5;x=d;return}function Gb(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;m=x;x=x+1264|0;i=m+672|0;j=m+88|0;k=m+48|0;l=m;la(k,d);pa(k)|0;r()|0;Ga(l,k,3)|0;r()|0;pa(l)|0;r()|0;if((j|0)==(c|0)){d=j+192|0;e=j+384|0;c=j+576|0}else{ec(j,c);d=j+192|0;ec(d,c+192|0);e=j+384|0;ec(e,c+384|0);h=j+576|0;b[h>>2]=b[c+576>>2];c=h}ic(j);ic(d);ic(e);ec(i,j);f=i+192|0;ec(f,d);g=i+384|0;ec(g,e);h=i+576|0;b[h>>2]=b[c>>2];c=ka(l)|0;a:do if((c|0)>2){c=c+-2|0;while(1){yb(i,i);n=Qa(l,c)|0;switch(n-(Qa(k,c)|0)|0){case 1:{Bb(i,j);break}case -1:{jc(j,j);kc(d,d);jc(e,e);Bb(i,j);jc(j,j);kc(d,d);jc(e,e);break}default:{}}if((c|0)>1)c=c+-1|0;else break a}}while(0);if((i|0)==(a|0)){l=a+192|0;n=a+384|0;nc(a);nc(l);nc(n);x=m;return}else{ec(a,i);l=a+192|0;ec(l,f);n=a+384|0;ec(n,g);b[a+576>>2]=b[h>>2];nc(a);nc(l);nc(n);x=m;return}}function Hb(a){a=a|0;if(zc(a)|0?zc(a+48|0)|0:0){a=1;return a|0}a=0;return a|0}function Ib(a,b,c){a=a|0;b=b|0;c=c|0;Dc(a,b,c);Dc(a+48|0,b+48|0,c);return}function Jb(a){a=a|0;var b=0,c=0;b=x;x=x+48|0;c=b;Oc(c);if(Fc(a,c)|0?zc(a+48|0)|0:0){c=1;x=b;return c|0}c=0;x=b;return c|0}function Kb(a){a=a|0;Ac(a);Ac(a+48|0);return}function Lb(a,b){a=a|0;b=b|0;if(Fc(a,b)|0?Fc(a+48|0,b+48|0)|0:0){b=1;return b|0}b=0;return b|0}function Mb(a,b,c){a=a|0;b=b|0;c=c|0;Bc(a,b);Bc(a+48|0,c);return}function Nb(a,b){a=a|0;b=b|0;vc(a,b);Ec(a+48|0);return}function Ob(a,b){a=a|0;b=b|0;if((a|0)==(b|0))return;Bc(a,b);Bc(a+48|0,b+48|0);return}function Pb(a){a=a|0;Ec(a);Ec(a+48|0);return}function Qb(a){a=a|0;var b=0,c=0;b=x;x=x+48|0;c=b;Oc(c);Bc(a,c);Ec(a+48|0);x=b;return}function Rb(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=x;x=x+96|0;e=c+48|0;d=c;f=b+48|0;Lc(e,b,f);Ic(e,e);Lc(d,e,f);Lc(a+48|0,e,b);Bc(a,d);x=c;return}function Sb(a,b){a=a|0;b=b|0;Bc(a,b);a=a+48|0;Ic(a,b+48|0);Jc(a);return}function Tb(a,b,c){a=a|0;b=b|0;c=c|0;Lc(a,b,c);Lc(a+48|0,b+48|0,c+48|0);return}function Ub(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=x;x=x+192|0;h=d+144|0;g=d+96|0;f=d;e=c+48|0;Lc(h,c,e);Ic(h,h);Lc(g,h,e);e=f+48|0;Lc(e,h,c);Bc(f,g);Lc(a,b,f);Lc(a+48|0,b+48|0,e);x=d;return}function Vb(a,b,c){a=a|0;b=b|0;c=c|0;Gc(a,b,c);Gc(a+48|0,b+48|0,c);return}function Wb(a,b,c){a=a|0;b=b|0;c=c|0;Hc(a,b,c);Hc(a+48|0,b+48|0,c);return}function Xb(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=x;x=x+144|0;d=c+96|0;g=c+48|0;e=c;f=b+48|0;Lc(d,b,f);Ic(e,f);Lc(g,b,b);Jc(g);Gc(a+48|0,g,f);Lc(a,b,e);Jc(d);Jc(a);Gc(a,d,a);x=c;return}function Yb(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0;p=x;x=x+544|0;i=p+464|0;j=p+384|0;k=p+304|0;l=p+224|0;m=p+144|0;n=p+96|0;o=p+48|0;f=p;va(f,496);xa(m,f);f=b[c+40>>2]|0;h=c+48|0;g=c+88|0;e=b[g>>2]|0;q=e+f|0;s=(b[d+88>>2]|0)+(b[d+40>>2]|0)|0;q=Ed(s|0,((s|0)<0)<<31>>31|0,q|0,((q|0)<0)<<31>>31|0)|0;s=r()|0;if((s|0)>0|(s|0)==0&q>>>0>67108863){if((f|0)>1){Ac(c);e=b[g>>2]|0}if((e|0)>1)Ac(h)}Ha(i,c,d);s=d+48|0;Ha(j,h,s);Aa(n,c,h);pa(n)|0;r()|0;Aa(o,d,s);pa(o)|0;r()|0;Ha(k,n,o);Ea(l,i,j);Da(j,m,j);Ea(i,i,j);Da(k,k,l);ua(i);wc(a,i);b[a+40>>2]=3;ua(k);wc(a+48|0,k);b[a+88>>2]=2;x=p;return}function Zb(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=x;x=x+96|0;d=c+48|0;f=c;Jc(b);e=b+48|0;Jc(e);Kc(d,b);Kc(f,e);Lc(d,d,f);Qc(d,d);Gc(a,b,d);Ic(d,d);Jc(d);Gc(a+48|0,e,d);x=c;return}function _b(a){a=a|0;Jc(a);Jc(a+48|0);return}function $b(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;f=x;x=x+144|0;e=f+96|0;b=f;if((b|0)==(a|0)){c=b+48|0;d=a+48|0}else{Bc(b,a);c=b+48|0;d=a+48|0;Bc(c,d)}Bc(e,a);Ic(a,d);Bc(d,e);Lc(a,b,a);Lc(d,c,d);x=f;return}function ac(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;b=x;x=x+192|0;d=b+144|0;f=b+96|0;c=b;Jc(a);Jc(a+48|0);yc(d,1);yc(f,1);Bc(c,d);e=c+48|0;Bc(e,f);Jc(c);Jc(e);Kc(d,c);Kc(f,e);Lc(d,d,f);Qc(d,d);Gc(c,c,d);Ic(d,d);Jc(d);Gc(e,e,d);Yb(a,c,a);x=b;return}function bc(a,b){a=a|0;b=b|0;if(Lb(a,b)|0?Lb(a+96|0,b+96|0)|0:0){b=1;return b|0}b=0;return b|0}function cc(a,b,c){a=a|0;b=b|0;c=c|0;Ob(a,b);Ob(a+96|0,c);return}function dc(a,b){a=a|0;b=b|0;Ob(a,b);Pb(a+96|0);return}function ec(a,b){a=a|0;b=b|0;if((a|0)==(b|0))return;Ob(a,b);Ob(a+96|0,b+96|0);return}function fc(a){a=a|0;Pb(a);Pb(a+96|0);return}function gc(a){a=a|0;Qb(a);Pb(a+96|0);return}function hc(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=x;x=x+192|0;f=c+96|0;e=c;_b(b);d=b+96|0;_b(d);Tb(f,b,d);Rb(f,f);Tb(e,f,d);d=a+96|0;Tb(d,f,b);Ob(a,e);_b(a);_b(d);x=c;return}function ic(a){a=a|0;_b(a);_b(a+96|0);return}function jc(a,b){a=a|0;b=b|0;var c=0;Ob(a,b);c=a+96|0;Rb(c,b+96|0);_b(a);_b(c);return}function kc(a,b){a=a|0;b=b|0;var c=0;c=a+96|0;Ob(c,b+96|0);Rb(a,b);_b(a);_b(c);return}function lc(a,b,c){a=a|0;b=b|0;c=c|0;Tb(a,b,c);Tb(a+96|0,b+96|0,c+96|0);return}function mc(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=x;x=x+384|0;h=d+288|0;g=d+192|0;f=d;_b(c);e=c+96|0;_b(e);Tb(h,c,e);Rb(h,h);Tb(g,h,e);e=f+96|0;Tb(e,h,c);Ob(f,g);_b(f);_b(e);Tb(a,b,f);Tb(a+96|0,b+96|0,e);x=d;return}function nc(a){a=a|0;Kb(a);Kb(a+96|0);return}function oc(a,b,c){a=a|0;b=b|0;c=c|0;Yb(a,b,c);Yb(a+96|0,b+96|0,c);return}function pc(a,b,c){a=a|0;b=b|0;c=c|0;Vb(a,b,c);Vb(a+96|0,b+96|0,c);return}function qc(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=x;x=x+288|0;f=c+192|0;e=c+96|0;d=c;g=b+96|0;Yb(d,b,g);Ob(e,g);Tb(f,b,g);$b(e);Tb(e,b,e);_b(f);_b(e);Yb(a,f,e);Ob(e,d);$b(e);Tb(e,e,d);_b(e);Rb(e,e);Tb(a,a,e);b=a+96|0;Tb(b,d,d);_b(a);_b(b);x=c;return}function rc(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;d=x;x=x+384|0;e=d+288|0;f=d+192|0;g=d+96|0;h=d;Yb(e,b,c);i=b+96|0;j=c+96|0;Yb(f,i,j);Tb(g,j,c);Tb(h,i,b);_b(h);_b(g);Yb(h,h,g);Rb(g,e);Tb(h,h,g);_b(h);Rb(g,f);c=a+96|0;Tb(c,h,g);$b(f);Tb(a,f,e);_b(a);_b(c);x=d;return}function sc(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=x;x=x+192|0;e=c+96|0;f=c;Xb(e,b);d=b+96|0;Xb(f,d);$b(f);_b(f);Ub(e,e,f);Zb(e,e);Yb(a,e,b);Rb(e,e);_b(e);Yb(a+96|0,e,d);x=c;return}function tc(a){a=a|0;var b=0,c=0,d=0;b=x;x=x+96|0;d=b;c=a+96|0;Ob(d,c);Ob(c,a);$b(d);Ob(a,d);_b(a);_b(c);x=b;return}function uc(a,b){a=a|0;b=b|0;Sb(a,a);a=a+96|0;Sb(a,a);Yb(a,b,a);return}function vc(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0;d=x;x=x+176|0;f=d+128|0;e=d+48|0;g=d;va(g,592);Ha(e,c,g);va(f,496);c=1824;Ja(a,f,b[c>>2]|0,b[c+4>>2]|0,e);b[a+40>>2]=2;x=d;return}function wc(a,c){a=a|0;c=c|0;var d=0,e=0,f=0;d=x;x=x+48|0;f=d;va(f,496);e=1824;Ja(a,f,b[e>>2]|0,b[e+4>>2]|0,c);x=d;return}function xc(a,c){a=a|0;c=c|0;var d=0,e=0,f=0;d=x;x=x+128|0;f=d+80|0;e=d;ya(e);wa(e,c);va(f,496);c=1824;Ja(a,f,b[c>>2]|0,b[c+4>>2]|0,e);x=d;return}function yc(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;h=x;x=x+224|0;d=h+176|0;e=h+96|0;f=h+48|0;g=h;if((c|0)<0)va(g,496);else sa(g);Ba(g,c);pa(g)|0;r()|0;va(f,592);Ha(e,g,f);va(d,496);g=1824;Ja(a,d,b[g>>2]|0,b[g+4>>2]|0,e);b[a+40>>2]=2;x=h;return}function zc(a){a=a|0;var b=0,c=0,d=0;b=x;x=x+96|0;d=b+48|0;c=b;va(d,496);la(c,a);Na(c,d);a=ia(c)|0;x=b;return a|0}function Ac(a){a=a|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,o=0;g=x;x=x+96|0;d=g+48|0;e=g;va(d,496);pa(a)|0;r()|0;f=a+40|0;c=b[f>>2]|0;if((c|0)<=16){c=c+-1|0;c=c>>>1|c;c=c>>>2|c;c=c>>>4|c;c=c>>>8|c;c=c>>>16|c;c=c-(c>>>1&1431655765)|0;c=(c>>>2&858993459)+(c&858993459)|0;c=(n((c>>>4)+c&252645135,16843009)|0)>>>24;ta(d,c)|0;if(!c){b[f>>2]=1;x=g;return}}else{c=a+24|0;m=b[c>>2]|0;c=b[c+4>>2]|0;j=a+32|0;i=b[j>>2]|0;j=b[j+4>>2]|0;k=d+24|0;o=b[k>>2]|0;k=b[k+4>>2]|0;l=d+32|0;l=Jd(b[l>>2]|0,b[l+4>>2]|0,2)|0;h=r()|0;k=Hd(o|0,k|0,54)|0;h=h|(r()|0);j=Jd(i|0,j|0,2)|0;i=r()|0;c=Hd(m|0,c|0,54)|0;i=i|(r()|0);h=yd(l|k|0,h|0,1,0)|0;h=Cd(j|c|0,i|0,h|0,r()|0)|0;r()|0;h=Ga(e,d,h)|0;h=Jd(h|0,r()|0,56)|0;i=r()|0;c=e+32|0;j=c;i=yd(b[j>>2]|0,b[j+4>>2]|0,h|0,i|0)|0;h=r()|0;b[c>>2]=i;b[c+4>>2]=h;Ca(a,a,e);pa(a)|0;r()|0;ta(d,2)|0;c=2}while(1){na(a,e,1-(Ka(e,a,d)|0)|0);if((c|0)>1)c=c+-1|0;else break}b[f>>2]=1;x=g;return}function Bc(a,c){a=a|0;c=c|0;la(a,c);b[a+40>>2]=b[c+40>>2];return}function Cc(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=x;x=x+224|0;f=d+176|0;e=d+96|0;g=d+48|0;h=d;va(h,c);va(g,592);Ha(e,h,g);va(f,496);c=1824;Ja(a,f,b[c>>2]|0,b[c+4>>2]|0,e);b[a+40>>2]=2;x=d;return}function Dc(a,c,d){a=a|0;c=c|0;d=d|0;var e=0;na(a,c,d);a=a+40|0;e=b[a>>2]|0;b[a>>2]=(b[c+40>>2]^e)&0-d^e;return}function Ec(a){a=a|0;sa(a);b[a+40>>2]=1;return}function Fc(a,c){a=a|0;c=c|0;var d=0,e=0,f=0;d=x;x=x+96|0;f=d+48|0;e=d;la(f,a);b[f+40>>2]=b[a+40>>2];la(e,c);b[e+40>>2]=b[c+40>>2];Ac(f);Ac(e);c=(La(f,e)|0)==0&1;x=d;return c|0}function Gc(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;g=x;x=x+128|0;e=g+80|0;f=g;h=b[c+40>>2]|0;i=b[d+40>>2]|0;h=Ed(i|0,((i|0)<0)<<31>>31|0,h|0,((h|0)<0)<<31>>31|0)|0;i=r()|0;if((i|0)>0|(i|0)==0&h>>>0>67108863)Ac(c);Ha(f,c,d);va(e,496);i=1824;Ja(a,e,b[i>>2]|0,b[i+4>>2]|0,f);b[a+40>>2]=2;x=g;return}function Hc(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;l=x;x=x+272|0;i=l+176|0;j=l+96|0;e=l+48|0;f=l;k=l+216|0;g=(d|0)<0?0-d|0:d;h=c+40|0;if((n(b[h>>2]|0,g)|0)<67108864){Ga(a,c,g)|0;r()|0;b[a+40>>2]=n(b[h>>2]|0,g)|0}else{sa(f);Ba(f,g);pa(f)|0;r()|0;va(e,592);Ha(j,f,e);va(i,496);f=1824;e=b[f>>2]|0;f=b[f+4>>2]|0;Ja(k,i,e,f,j);b[k+40>>2]=2;if((b[h>>2]|0)>33554431)Ac(c);Ha(j,c,k);va(i,496);Ja(a,i,e,f,j);b[a+40>>2]=2}if((d|0)>-1){x=l;return}Ic(a,a);pa(a)|0;r()|0;x=l;return}function Ic(a,c){a=a|0;c=c|0;var d=0,e=0,f=0;d=x;x=x+48|0;f=d;va(f,496);e=(b[c+40>>2]|0)+-1|0;e=e>>>1|e;e=e>>>2|e;e=e>>>4|e;e=e>>>8|e;e=e>>>16|e;e=e-(e>>>1&1431655765)|0;e=(e>>>2&858993459)+(e&858993459)|0;e=(n((e>>>4)+e&252645135,16843009)|0)>>>24;ta(f,e)|0;Ca(a,f,c);c=1<<e;b[a+40>>2]=c+1;if((c|0)<=67108862){x=d;return}Ac(a);x=d;return}function Jc(a){a=a|0;pa(a)|0;r()|0;return}function Kc(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;f=x;x=x+128|0;d=f+80|0;e=f;h=b[c+40>>2]|0;g=((h|0)<0)<<31>>31;g=Ed(h|0,g|0,h|0,g|0)|0;h=r()|0;if(h>>>0>0|(h|0)==0&g>>>0>67108863)Ac(c);Ia(e,c);va(d,496);h=1824;Ja(a,d,b[h>>2]|0,b[h+4>>2]|0,e);b[a+40>>2]=2;x=f;return}function Lc(a,c,d){a=a|0;c=c|0;d=d|0;Aa(a,c,d);d=(b[d+40>>2]|0)+(b[c+40>>2]|0)|0;b[a+40>>2]=d;if((d|0)<=67108863)return;Ac(a);return}function Mc(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0;e=x;x=x+48|0;f=e;Ic(f,d);Aa(a,c,f);d=(b[f+40>>2]|0)+(b[c+40>>2]|0)|0;b[a+40>>2]=d;if((d|0)<=67108863){x=e;return}Ac(a);x=e;return}function Nc(c,d,e){c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0;s=x;x=x+1120|0;n=s+1072|0;o=s+992|0;f=s+944|0;g=s+896|0;p=s+816|0;q=s+48|0;h=s;la(c,d);m=c+40|0;b[m>>2]=b[d+40>>2];pa(c)|0;r()|0;la(h,e);pa(h)|0;r()|0;l=ka(h)|0;i=(l+3|0)/4|0;if((l|0)>=-6){d=0;while(1){k=Ra(h,4)|0;a[p+d>>0]=k;Fa(h,k<<24>>24);pa(h)|0;r()|0;qa(h,4)|0;if((d|0)<(i|0))d=d+1|0;else break}}za(g);va(f,592);Ha(o,g,f);va(n,496);k=1824;j=b[k>>2]|0;k=b[k+4>>2]|0;Ja(q,n,j,k,o);b[q+40>>2]=2;la(q+48|0,c);h=b[m>>2]|0;b[q+88>>2]=h;d=2;f=h;g=h;h=((h|0)<0)<<31>>31;while(1){e=q+((d+-1|0)*48|0)|0;h=Ed(g|0,h|0,f|0,((f|0)<0)<<31>>31|0)|0;g=r()|0;if((g|0)>0|(g|0)==0&h>>>0>67108863)Ac(e);Ha(o,e,c);va(n,496);Ja(q+(d*48|0)|0,n,j,k,o);b[q+(d*48|0)+40>>2]=2;d=d+1|0;if((d|0)==16)break;f=b[m>>2]|0;g=2;h=0}e=a[p+i>>0]|0;la(c,q+(e*48|0)|0);e=b[q+(e*48|0)+40>>2]|0;b[m>>2]=e;if((l|0)<=0){Ac(c);x=s;return}h=((e|0)<0)<<31>>31;d=i+-1|0;i=Ed(e|0,h|0,e|0,h|0)|0;h=r()|0;if(h>>>0>0|(h|0)==0&i>>>0>67108863)Ac(c);Ia(o,c);va(n,496);Ja(c,n,j,k,o);b[m>>2]=2;Ia(o,c);va(n,496);Ja(c,n,j,k,o);b[m>>2]=2;Ia(o,c);va(n,496);Ja(c,n,j,k,o);b[m>>2]=2;Ia(o,c);va(n,496);Ja(c,n,j,k,o);b[m>>2]=2;e=a[p+d>>0]|0;if((b[q+(e*48|0)+40>>2]|0)>33554431)Ac(c);Ha(o,c,q+(e*48|0)|0);va(n,496);Ja(c,n,j,k,o);b[m>>2]=2;if((l|0)<=4){Ac(c);x=s;return}do{e=d;d=d+-1|0;Ia(o,c);va(n,496);Ja(c,n,j,k,o);b[m>>2]=2;Ia(o,c);va(n,496);Ja(c,n,j,k,o);b[m>>2]=2;Ia(o,c);va(n,496);Ja(c,n,j,k,o);b[m>>2]=2;Ia(o,c);va(n,496);Ja(c,n,j,k,o);b[m>>2]=2;f=a[p+d>>0]|0;if((b[q+(f*48|0)+40>>2]|0)>33554431)Ac(c);Ha(o,c,q+(f*48|0)|0);va(n,496);Ja(c,n,j,k,o);b[m>>2]=2}while((e|0)>1);Ac(c);x=s;return}function Oc(a){a=a|0;var c=0,d=0,e=0,f=0,g=0;c=x;x=x+224|0;f=c+176|0;d=c+96|0;e=c+48|0;g=c;za(g);va(e,592);Ha(d,g,e);va(f,496);e=1824;Ja(a,f,b[e>>2]|0,b[e+4>>2]|0,d);b[a+40>>2]=2;x=c;return}function Pc(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;k=x;x=x+272|0;f=k+128|0;g=k+216|0;h=k+48|0;i=k;j=k+168|0;va(i,496);Fa(i,1);ma(i,1);Fa(i,1);qa(i,1)|0;Nc(j,a,i);if(!c){c=j+40|0;e=c;c=b[c>>2]|0}else{la(c,j);e=j+40|0;d=b[e>>2]|0;b[c+40>>2]=d;c=d}d=((c|0)<0)<<31>>31;d=Ed(c|0,d|0,c|0,d|0)|0;c=r()|0;if(c>>>0>0|(c|0)==0&d>>>0>67108863)Ac(j);Ia(h,j);va(i,496);d=1824;c=b[d>>2]|0;d=b[d+4>>2]|0;Ja(j,i,c,d,h);b[e>>2]=2;if((b[a+40>>2]|0)>33554431)Ac(a);Ha(h,a,j);va(i,496);Ja(j,i,c,d,h);b[e>>2]=2;la(g,j);b[g+40>>2]=b[e>>2];Ac(g);ya(h);wa(h,g);va(i,496);Ja(f,i,c,d,h);j=ja(f)|0;x=k;return j|0}function Qc(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;k=x;x=x+224|0;f=k+48|0;g=k;h=k+176|0;i=k+128|0;pa(c)|0;r()|0;la(h,c);j=h+40|0;b[j>>2]=b[c+40>>2];va(g,496);Fa(g,1);ma(g,1);Fa(g,1);qa(g,1)|0;Nc(i,c,g);c=i+40|0;m=b[c>>2]|0;e=1824;d=b[e>>2]|0;e=b[e+4>>2]|0;l=((m|0)<0)<<31>>31;l=Ed(m|0,l|0,m|0,l|0)|0;m=r()|0;if(m>>>0>0|(m|0)==0&l>>>0>67108863)Ac(i);Ia(f,i);va(g,496);Ja(i,g,d,e,f);b[c>>2]=2;Ia(f,i);va(g,496);Ja(i,g,d,e,f);b[c>>2]=2;if((b[j>>2]|0)<=33554431){Ha(f,i,h);va(g,496);Ja(a,g,d,e,f);m=a+40|0;b[m>>2]=2;Ac(a);x=k;return}Ac(i);Ha(f,i,h);va(g,496);Ja(a,g,d,e,f);m=a+40|0;b[m>>2]=2;Ac(a);x=k;return}function Rc(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=x;x=x+416|0;k=o+144|0;g=o+96|0;e=o+48|0;j=o+368|0;l=o+320|0;m=o+272|0;n=o+224|0;f=o;if(!d){va(e,496);Fa(e,1);ma(e,1);Fa(e,1);qa(e,1)|0;Nc(l,c,e);i=l+40|0}else{la(l,d);i=l+40|0;b[i>>2]=b[d+40>>2]}va(f,544);va(g,592);Ha(k,f,g);va(e,496);h=1824;g=b[h>>2]|0;h=b[h+4>>2]|0;Ja(j,e,g,h,k);b[j+40>>2]=2;f=b[i>>2]|0;j=((f|0)<0)<<31>>31;j=Ed(f|0,j|0,f|0,j|0)|0;f=r()|0;if(f>>>0>0|(f|0)==0&j>>>0>67108863)Ac(l);Ia(k,l);va(e,496);Ja(m,e,g,h,k);d=m+40|0;b[d>>2]=2;f=c+40|0;if((b[f>>2]|0)>33554431)Ac(m);Ha(k,m,c);va(e,496);Ja(m,e,g,h,k);b[d>>2]=2;j=b[i>>2]|0;i=b[f>>2]|0;j=Ed(i|0,((i|0)<0)<<31>>31|0,j|0,((j|0)<0)<<31>>31|0)|0;i=r()|0;if(!((i|0)>0|(i|0)==0&j>>>0>67108863)){Ha(k,l,c);va(e,496);Ja(a,e,g,h,k);l=a+40|0;b[l>>2]=2;la(n,m);x=o;return}Ac(l);Ha(k,l,c);va(e,496);Ja(a,e,g,h,k);l=a+40|0;b[l>>2]=2;la(n,m);x=o;return}function Sc(c,d,e,f,g,h,i){c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;q=x;x=x+2128|0;k=q+1752|0;l=q+1024|0;m=q+296|0;j=q+80|0;n=q+64|0;p=q;o=(h|0)>-1;if(o){b[n>>2]=h>>>24;b[n+4>>2]=h>>>16&255;b[n+8>>2]=h>>>8&255;b[n+12>>2]=h&255}a:do switch(c|0){case 2:switch(d|0){case 32:{fd(k);if(g|0?(b[g>>2]|0)>0:0){h=g+8|0;c=0;do{gd(k,a[(b[h>>2]|0)+c>>0]|0);c=c+1|0}while((c|0)<(b[g>>2]|0))}if(o){gd(k,b[n>>2]|0);gd(k,b[n+4>>2]|0);gd(k,b[n+8>>2]|0);gd(k,b[n+12>>2]|0)}if(i|0?(b[i>>2]|0)>0:0){h=i+8|0;c=0;do{gd(k,a[(b[h>>2]|0)+c>>0]|0);c=c+1|0}while((c|0)<(b[i>>2]|0))}id(k,p);break a}case 48:{jd(l);if(g|0?(b[g>>2]|0)>0:0){h=g+8|0;c=0;do{kd(l,a[(b[h>>2]|0)+c>>0]|0);c=c+1|0}while((c|0)<(b[g>>2]|0))}if(o){kd(l,b[n>>2]|0);kd(l,b[n+4>>2]|0);kd(l,b[n+8>>2]|0);kd(l,b[n+12>>2]|0)}if(i|0?(b[i>>2]|0)>0:0){h=i+8|0;c=0;do{kd(l,a[(b[h>>2]|0)+c>>0]|0);c=c+1|0}while((c|0)<(b[i>>2]|0))}nd(l,p);break a}case 64:{pd(m);if(g|0?(b[g>>2]|0)>0:0){h=g+8|0;c=0;do{md(m,a[(b[h>>2]|0)+c>>0]|0);c=c+1|0}while((c|0)<(b[g>>2]|0))}if(o){md(m,b[n>>2]|0);md(m,b[n+4>>2]|0);md(m,b[n+8>>2]|0);md(m,b[n+12>>2]|0)}if(i|0?(b[i>>2]|0)>0:0){h=i+8|0;c=0;do{md(m,a[(b[h>>2]|0)+c>>0]|0);c=c+1|0}while((c|0)<(b[i>>2]|0))}od(m,p);break a}default:break a}case 3:{qd(j,d);if(g|0?b[g>>2]|0:0){h=g+8|0;c=0;while(1){rd(j,a[(b[h>>2]|0)+c>>0]|0);if(!(b[g>>2]|0))break;else c=c+1|0}}if(o){rd(j,b[n>>2]|0);rd(j,b[n+4>>2]|0);rd(j,b[n+8>>2]|0);rd(j,b[n+12>>2]|0)}if(i|0?b[i>>2]|0:0){h=i+8|0;c=0;while(1){rd(j,a[(b[h>>2]|0)+c>>0]|0);if(!(b[i>>2]|0))break;else c=c+1|0}}ud(j,p);break}default:{x=q;return}}while(0);Vc(e);if(!f){Tc(e,p,d);x=q;return}if((f|0)>(d|0)){Uc(e,0,f-d|0);Tc(e,p,d);x=q;return}else{Tc(e,p,f);x=q;return}}function Tc(c,d,e){c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;h=c+4|0;if((e|0)<=0)return;i=c+8|0;f=b[c>>2]|0;g=0;while(1){if((f|0)>=(b[h>>2]|0)){f=5;break}a[(b[i>>2]|0)+f>>0]=a[d+g>>0]|0;b[c>>2]=(b[c>>2]|0)+1;g=g+1|0;if((g|0)>=(e|0)){f=5;break}else f=f+1|0}if((f|0)==5)return}function Uc(c,d,e){c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;i=c+4|0;if((e|0)<=0)return;g=d&255;h=c+8|0;d=b[c>>2]|0;f=0;while(1){if((d|0)>=(b[i>>2]|0)){d=5;break}a[(b[h>>2]|0)+d>>0]=g;b[c>>2]=(b[c>>2]|0)+1;f=f+1|0;if((f|0)>=(e|0)){d=5;break}else d=d+1|0}if((d|0)==5)return}function Vc(a){a=a|0;b[a>>2]=0;return}function Wc(a){a=a|0;tb(a+37960|0);tb(a+37376|0);tb(a+36792|0);tb(a+36208|0);tb(a+35624|0);tb(a+35040|0);tb(a+34456|0);tb(a+33872|0);tb(a+33288|0);tb(a+32704|0);tb(a+32120|0);tb(a+31536|0);tb(a+30952|0);tb(a+30368|0);tb(a+29784|0);tb(a+29200|0);tb(a+28616|0);tb(a+28032|0);tb(a+27448|0);tb(a+26864|0);tb(a+26280|0);tb(a+25696|0);tb(a+25112|0);tb(a+24528|0);tb(a+23944|0);tb(a+23360|0);tb(a+22776|0);tb(a+22192|0);tb(a+21608|0);tb(a+21024|0);tb(a+20440|0);tb(a+19856|0);tb(a+19272|0);tb(a+18688|0);tb(a+18104|0);tb(a+17520|0);tb(a+16936|0);tb(a+16352|0);tb(a+15768|0);tb(a+15184|0);tb(a+14600|0);tb(a+14016|0);tb(a+13432|0);tb(a+12848|0);tb(a+12264|0);tb(a+11680|0);tb(a+11096|0);tb(a+10512|0);tb(a+9928|0);tb(a+9344|0);tb(a+8760|0);tb(a+8176|0);tb(a+7592|0);tb(a+7008|0);tb(a+6424|0);tb(a+5840|0);tb(a+5256|0);tb(a+4672|0);tb(a+4088|0);tb(a+3504|0);tb(a+2920|0);tb(a+2336|0);tb(a+1752|0);tb(a+1168|0);tb(a+584|0);tb(a);return}function Xc(a,b){a=a|0;b=b|0;var c=0,d=0;tb(a);c=65;while(1){Ab(a,a);d=b+(c*584|0)|0;Cb(a,d);ub(d);if(c>>>0>1)c=c+-1|0;else break}wb(a,a);Cb(a,b);ub(b);return}function Yc(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=x;x=x+96|0;g=f;Ob(e,a);Ob(g,a+96|0);Ob(d,a+192|0);Ob(c,g);Yb(c,c,d);Xb(e,e);Xb(g,g);Xb(d,d);Tb(c,c,c);Rb(c,c);_b(c);$b(c);_b(c);Wb(d,d,(b[459]|0)*3|0);Wb(e,e,3);$b(g);_b(g);$b(e);_b(e);Ub(d,d,g);_b(d);$a(a)|0;x=f;return}function Zc(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=x;x=x+96|0;g=f;Ob(c,a);Ob(e,a+96|0);Ob(g,a+192|0);Ob(d,g);h=b+96|0;Yb(g,g,h);Yb(d,d,b);Ub(c,c,d);_b(c);Ub(e,e,g);_b(e);Ob(g,c);Yb(g,g,h);Ob(d,e);Yb(d,d,b);Ub(d,d,g);_b(d);Rb(e,e);_b(e);ab(a,b)|0;x=f;return}function _c(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,y=0,z=0;z=x;x=x+3616|0;q=z+96|0;s=z+3520|0;t=z+3424|0;u=z+3232|0;v=z+3040|0;w=z+2848|0;y=z+48|0;g=z;h=z+2264|0;i=z+1680|0;j=z+1392|0;k=z+1104|0;l=z+816|0;e=z+672|0;m=z+624|0;n=z+576|0;o=z+288|0;p=z+192|0;Cc(m,640);Cc(n,688);Mb(p,m,n);if(eb(d)|0){x=z;return}va(q,208);Ga(y,q,6)|0;r()|0;Fa(y,2);pa(y)|0;r()|0;Ga(g,y,3)|0;r()|0;pa(g)|0;r()|0;f=ka(g)|0;Va(l,c);fb(e,d);Xa(l);ib(e);Bc(m,e);Bc(n,e+48|0);Va(j,l);Va(k,l);_a(k);a:do if((f|0)>2){e=h+576|0;c=f+-2|0;while(1){Yc(j,q,s,t);Vb(t,t,m);Vb(q,q,n);cc(u,q,s);dc(v,t);fc(w);xb(h,u,v,w);b[e>>2]=3;f=Qa(g,c)|0;switch(f-(Qa(y,c)|0)|0){case 1:{$c(i,j,l,m,n);Db(h,i);break}case -1:{$c(i,j,k,m,n);Db(h,i);break}default:{}}Cb(a+(c*584|0)|0,h);if((c|0)>1)c=c+-1|0;else break a}}while(0);_a(j);Va(o,l);db(o,p);$c(h,j,o,m,n);db(o,p);_a(o);$c(i,j,o,m,n);Db(h,i);Cb(a,h);x=z;return}function $c(a,c,d,e,f){a=a|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0;m=x;x=x+864|0;h=m+768|0;i=m+672|0;j=m+576|0;k=m+384|0;l=m+192|0;g=m;if((c|0)==(d|0))Yc(c,h,i,j);else Zc(c,d,h,i,j);Vb(j,j,e);Vb(h,h,f);cc(k,h,i);dc(l,j);fc(g);xb(a,k,l,g);b[a+576>>2]=3;x=m;return}function ad(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;b=x;x=x+3152|0;g=b+3056|0;i=b;k=b+3008|0;j=b+2960|0;h=b+2376|0;e=b+1792|0;d=b+1208|0;f=b+624|0;c=b+40|0;va(i,208);Cc(k,640);Cc(j,688);Mb(g,k,j);Eb(h,a);wb(a,a);Bb(a,h);sb(h,a);Fb(a,g);Fb(a,g);Bb(a,h);Gb(h,a,i);yb(c,h);sb(e,h);Bb(e,c);sb(f,c);Fb(f,g);Bb(f,c);yb(f,f);Bb(f,c);Gb(h,e,i);wb(e,a);sb(d,h);Fb(d,g);Fb(d,g);Bb(d,e);wb(h,h);sb(c,h);Fb(c,g);Bb(c,h);yb(h,h);Bb(d,h);Gb(h,c,i);yb(h,h);wb(h,h);Bb(c,h);Fb(a,g);sb(e,a);Fb(a,g);Bb(e,a);Fb(a,g);Bb(e,a);yb(a,c);Bb(a,f);sb(c,a);Bb(c,e);Bb(a,d);yb(a,a);Bb(a,c);zb(a);x=b;return}function bd(a,b){a=a|0;b=b|0;nb(a,b);return}function cd(a,b){a=a|0;b=b|0;bb(a,b);return}function dd(d,e,f){d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;L=x;x=x+768|0;J=L+396|0;I=L;i=L+32|0;K=d+92|0;b[K>>2]=0;g=d;h=g+84|0;do{b[g>>2]=0;g=g+4|0}while((g|0)<(h|0));if((e|0)>0){fd(i);g=0;do{gd(i,a[f+g>>0]|0);g=g+1|0}while((g|0)!=(e|0));id(i,I);l=d+88|0;k=d+84|0;n=d+32|0;o=d+64|0;p=d+12|0;q=d+44|0;r=d+76|0;s=d+24|0;t=d+56|0;u=d+4|0;v=d+36|0;w=d+68|0;y=d+16|0;z=d+48|0;A=d+80|0;B=d+28|0;C=d+60|0;D=d+8|0;E=d+40|0;F=d+72|0;G=d+20|0;H=d+52|0;m=0;do{g=m<<2;g=c[I+(g|1)>>0]<<8|c[I+g>>0]|c[I+(g|2)>>0]<<16|c[I+(g|3)>>0]<<24;b[l>>2]=0;b[k>>2]=0;b[d>>2]=g^b[d>>2];b[n>>2]=b[n>>2]^1;h=g+-1|0;b[o>>2]=b[o>>2]^h;g=2-g|0;b[p>>2]=b[p>>2]^g;h=h-g|0;b[q>>2]=b[q>>2]^h;g=g-h|0;b[r>>2]=b[r>>2]^g;h=h-g|0;b[s>>2]=b[s>>2]^h;g=g-h|0;b[t>>2]=b[t>>2]^g;h=h-g|0;b[u>>2]=b[u>>2]^h;g=g-h|0;b[v>>2]=b[v>>2]^g;h=h-g|0;b[w>>2]=b[w>>2]^h;g=g-h|0;b[y>>2]=b[y>>2]^g;h=h-g|0;b[z>>2]=b[z>>2]^h;g=g-h|0;b[A>>2]=b[A>>2]^g;h=h-g|0;b[B>>2]=b[B>>2]^h;g=g-h|0;b[C>>2]=b[C>>2]^g;h=h-g|0;b[D>>2]=b[D>>2]^h;g=g-h|0;b[E>>2]=b[E>>2]^g;h=h-g|0;b[F>>2]=b[F>>2]^h;g=g-h|0;b[G>>2]=b[G>>2]^g;b[H>>2]=b[H>>2]^h-g;g=0;h=0;while(1){b[k>>2]=h+1;if((h|0)>=20){b[k>>2]=0;j=0;h=15;while(1){i=(h|0)==21?0:h;h=b[d+(i<<2)>>2]|0;e=d+(j<<2)|0;f=h-(b[e>>2]|0)-(b[l>>2]|0)|0;if((f|0)!=(h|0))b[l>>2]=f>>>0>h>>>0&1;b[e>>2]=f;j=j+1|0;if((j|0)==21)break;else h=i+1|0}}g=g+1|0;if((g|0)==1e4)break;h=b[k>>2]|0}m=m+1|0}while((m|0)!=8);m=d}else{l=d+88|0;m=d;k=d+84|0}fd(J);j=0;do{I=b[k>>2]|0;g=I+1|0;b[k>>2]=g;if((I|0)<20)g=d+(g<<2)|0;else{b[k>>2]=0;i=0;g=15;while(1){f=(g|0)==21?0:g;g=b[d+(f<<2)>>2]|0;h=d+(i<<2)|0;e=g-(b[h>>2]|0)-(b[l>>2]|0)|0;if((e|0)!=(g|0))b[l>>2]=e>>>0>g>>>0&1;b[h>>2]=e;i=i+1|0;if((i|0)==21){g=m;break}else g=f+1|0}}gd(J,b[g>>2]|0);j=j+1|0}while((j|0)!=128);id(J,d+96|0);b[K>>2]=0;x=L;return}function ed(a){a=a|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=x;x=x+368|0;j=o;l=a+92|0;n=b[l>>2]|0;b[l>>2]=n+1;m=c[a+96+n>>0]|0;if((n|0)<=30){x=o;return m|0}fd(j);n=a+84|0;k=a+88|0;i=0;do{h=b[n>>2]|0;d=h+1|0;b[n>>2]=d;if((h|0)<20)d=a+(d<<2)|0;else{b[n>>2]=0;h=0;d=15;while(1){g=(d|0)==21?0:d;d=b[a+(g<<2)>>2]|0;e=a+(h<<2)|0;f=d-(b[e>>2]|0)-(b[k>>2]|0)|0;if((f|0)!=(d|0))b[k>>2]=f>>>0>d>>>0&1;b[e>>2]=f;h=h+1|0;if((h|0)==21){d=a;break}else d=g+1|0}}gd(j,b[d>>2]|0);i=i+1|0}while((i|0)!=128);id(j,a+96|0);b[l>>2]=0;x=o;return m|0}function fd(a){a=a|0;Ld(a+40|0,0,256)|0;b[a+4>>2]=0;b[a>>2]=0;b[a+8>>2]=1779033703;b[a+12>>2]=-1150833019;b[a+16>>2]=1013904242;b[a+20>>2]=-1521486534;b[a+24>>2]=1359893119;b[a+28>>2]=-1694144372;b[a+32>>2]=528734635;b[a+36>>2]=1541459225;b[a+360>>2]=32;return}function gd(a,c){a=a|0;c=c|0;var d=0,e=0;d=b[a>>2]|0;e=a+40+((d>>>5&15)<<2)|0;b[e>>2]=b[e>>2]<<8|c&255;c=d+8|0;b[a>>2]=c;if(c){if(c&511|0)return}else{e=a+4|0;b[e>>2]=(b[e>>2]|0)+1;b[a>>2]=0}hd(a);return}function hd(a){a=a|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;c=16;d=b[a+40>>2]|0;do{A=b[a+40+(c+-2<<2)>>2]|0;z=d;d=b[a+40+(c+-15<<2)>>2]|0;b[a+40+(c<<2)>>2]=z+(b[a+40+(c+-7<<2)>>2]|0)+((A>>>19|A<<13)^A>>>10^(A>>>17|A<<15))+((d>>>18|d<<14)^d>>>3^(d>>>7|d<<25));c=c+1|0}while((c|0)!=64);l=a+8|0;m=b[l>>2]|0;n=a+12|0;o=b[n>>2]|0;p=a+16|0;q=b[p>>2]|0;r=a+20|0;s=b[r>>2]|0;t=a+24|0;u=b[t>>2]|0;v=a+28|0;w=b[v>>2]|0;x=a+32|0;y=b[x>>2]|0;z=a+36|0;A=b[z>>2]|0;e=m;f=o;c=A;g=y;h=w;i=u;d=s;j=q;k=0;while(1){B=((i>>>6|i<<26)^(i>>>11|i<<21)^(i>>>25|i<<7))+c+(g&~i^h&i)+(b[736+(k<<2)>>2]|0)+(b[a+40+(k<<2)>>2]|0)|0;c=B+d|0;d=((e>>>2|e<<30)^(e>>>13|e<<19)^(e>>>22|e<<10))+(e&(f^j)^f&j)+B|0;k=k+1|0;if((k|0)==64)break;else{F=j;E=i;D=h;C=g;B=e;e=d;i=c;j=f;d=F;h=E;g=D;c=C;f=B}}b[l>>2]=d+m;b[n>>2]=e+o;b[p>>2]=f+q;b[r>>2]=j+s;b[t>>2]=c+u;b[v>>2]=i+w;b[x>>2]=h+y;b[z>>2]=g+A;return}function id(c,d){c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0;g=b[c>>2]|0;j=c+4|0;h=b[j>>2]|0;e=c+40+((g>>>5&15)<<2)|0;b[e>>2]=b[e>>2]<<8|128;e=g+8|0;b[c>>2]=e;if(e){f=e&511;if(!f)i=4}else{b[j>>2]=h+1;b[c>>2]=0;i=4}if((i|0)==4){hd(c);e=b[c>>2]|0;f=e&511}if((f|0)!=448)do{f=c+40+((e>>>5&15)<<2)|0;b[f>>2]=b[f>>2]<<8;e=e+8|0;b[c>>2]=e;if(e){if(!(e&511))i=10}else{b[j>>2]=(b[j>>2]|0)+1;b[c>>2]=0;i=10}if((i|0)==10){i=0;hd(c);e=b[c>>2]|0}}while((e&511|0)!=448);b[c+96>>2]=h;b[c+100>>2]=g;hd(c);f=c+360|0;if((b[f>>2]|0)>0){e=0;do{a[d+e>>0]=(b[c+8+(e>>>2<<2)>>2]|0)>>>(e<<3&24^24);e=e+1|0}while((e|0)<(b[f>>2]|0))}Ld(c+40|0,0,256)|0;b[j>>2]=0;b[c>>2]=0;b[c+8>>2]=1779033703;b[c+12>>2]=-1150833019;b[c+16>>2]=1013904242;b[c+20>>2]=-1521486534;b[c+24>>2]=1359893119;b[c+28>>2]=-1694144372;b[c+32>>2]=528734635;b[c+36>>2]=1541459225;b[f>>2]=32;return}function jd(a){a=a|0;var c=0;Ld(a+80|0,0,640)|0;b[a>>2]=0;b[a+4>>2]=0;b[a+8>>2]=0;b[a+12>>2]=0;c=a+16|0;b[c>>2]=-1056596264;b[c+4>>2]=-876896931;c=a+24|0;b[c>>2]=914150663;b[c+4>>2]=1654270250;c=a+32|0;b[c>>2]=812702999;b[c+4>>2]=-1856437926;c=a+40|0;b[c>>2]=-150054599;b[c+4>>2]=355462360;c=a+48|0;b[c>>2]=-4191439;b[c+4>>2]=1731405415;c=a+56|0;b[c>>2]=1750603025;b[c+4>>2]=-1900787065;c=a+64|0;b[c>>2]=1694076839;b[c+4>>2]=-619958771;c=a+72|0;b[c>>2]=-1090891868;b[c+4>>2]=1203062813;b[a+720>>2]=48;return}function kd(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=a;e=b[d>>2]|0;d=b[d+4>>2]|0;f=Id(e|0,d|0,6)|0;r()|0;f=a+80+((f&15)<<3)|0;h=f;h=Jd(b[h>>2]|0,b[h+4>>2]|0,8)|0;g=r()|0;b[f>>2]=h|c&255;b[f+4>>2]=g;c=yd(e|0,d|0,8,0)|0;d=r()|0;e=a;b[e>>2]=c;b[e+4>>2]=d;if(!((c|0)==0&(d|0)==0)){if(!((c&1023|0)==0&0==0))return}else{h=a+8|0;f=h;f=yd(b[f>>2]|0,b[f+4>>2]|0,1,0)|0;g=r()|0;b[h>>2]=f;b[h+4>>2]=g;h=a;b[h>>2]=0;b[h+4>>2]=0}ld(a);return}function ld(a){a=a|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0;e=a+80|0;c=16;d=b[e>>2]|0;e=b[e+4>>2]|0;do{I=a+80+(c+-2<<3)|0;E=b[I>>2]|0;I=b[I+4>>2]|0;J=Id(E|0,I|0,19)|0;L=r()|0;K=Jd(E|0,I|0,45)|0;L=L|(r()|0);G=Id(E|0,I|0,61)|0;F=r()|0;H=Jd(E|0,I|0,3)|0;F=F|(r()|0);I=Id(E|0,I|0,6)|0;L=F^(r()|0)^L;F=a+80+(c+-7<<3)|0;E=b[F>>2]|0;F=b[F+4>>2]|0;R=a+80+(c+-15<<3)|0;C=d;d=b[R>>2]|0;D=e;e=b[R+4>>2]|0;R=Id(d|0,e|0,1)|0;P=r()|0;Q=Jd(d|0,e|0,63)|0;P=P|(r()|0);M=Id(d|0,e|0,8)|0;B=r()|0;N=Jd(d|0,e|0,56)|0;B=B|(r()|0);O=Id(d|0,e|0,7)|0;P=B^(r()|0)^P;F=yd(C|0,D|0,E|0,F|0)|0;L=yd(F|0,r()|0,(G|H)^I^(J|K)|0,L|0)|0;P=yd(L|0,r()|0,(M|N)^O^(R|Q)|0,P|0)|0;Q=r()|0;R=a+80+(c<<3)|0;b[R>>2]=P;b[R+4>>2]=Q;c=c+1|0}while((c|0)!=80);K=a+16|0;M=K;L=b[M>>2]|0;M=b[M+4>>2]|0;N=a+24|0;P=N;O=b[P>>2]|0;P=b[P+4>>2]|0;Q=a+32|0;h=Q;R=b[h>>2]|0;h=b[h+4>>2]|0;i=a+40|0;k=i;j=b[k>>2]|0;k=b[k+4>>2]|0;l=a+48|0;n=l;m=b[n>>2]|0;n=b[n+4>>2]|0;o=a+56|0;q=o;p=b[q>>2]|0;q=b[q+4>>2]|0;s=a+64|0;u=s;t=b[u>>2]|0;u=b[u+4>>2]|0;v=a+72|0;x=v;w=b[x>>2]|0;x=b[x+4>>2]|0;g=0;y=m;z=n;c=w;d=x;A=p;B=q;C=t;D=u;E=L;F=M;G=R;H=O;I=h;J=P;e=j;f=k;while(1){V=Id(y|0,z|0,14)|0;Y=r()|0;W=Jd(y|0,z|0,50)|0;Y=Y|(r()|0);U=Id(y|0,z|0,18)|0;S=r()|0;X=Jd(y|0,z|0,46)|0;S=Y^(S|(r()|0));Y=Id(y|0,z|0,41)|0;T=r()|0;Z=Jd(y|0,z|0,23)|0;T=yd((V|W)^(U|X)^(Y|Z)|0,S^(T|(r()|0))|0,c|0,d|0)|0;T=yd(T|0,r()|0,C&~y^A&y|0,D&~z^B&z|0)|0;S=r()|0;Z=992+(g<<3)|0;Z=yd(T|0,S|0,b[Z>>2]|0,b[Z+4>>2]|0)|0;S=r()|0;T=a+80+(g<<3)|0;T=yd(Z|0,S|0,b[T>>2]|0,b[T+4>>2]|0)|0;S=r()|0;Z=Id(E|0,F|0,28)|0;d=r()|0;Y=Jd(E|0,F|0,36)|0;d=d|(r()|0);X=Id(E|0,F|0,34)|0;U=r()|0;W=Jd(E|0,F|0,30)|0;U=d^(U|(r()|0));d=Id(E|0,F|0,39)|0;V=r()|0;c=Jd(E|0,F|0,25)|0;V=yd((Z|Y)^(X|W)^(d|c)|0,U^(V|(r()|0))|0,E&(H^G)^H&G|0,F&(J^I)^J&I|0)|0;U=r()|0;c=yd(T|0,S|0,e|0,f|0)|0;d=r()|0;e=yd(V|0,U|0,T|0,S|0)|0;f=r()|0;g=g+1|0;if((g|0)==80)break;else{S=F;T=J;U=E;V=H;W=z;X=y;Y=D;Z=C;y=c;z=d;E=e;F=f;f=I;e=G;J=S;I=T;H=U;G=V;D=B;C=A;B=W;A=X;d=Y;c=Z}}Z=yd(e|0,f|0,L|0,M|0)|0;Y=r()|0;X=K;b[X>>2]=Z;b[X+4>>2]=Y;X=yd(E|0,F|0,O|0,P|0)|0;Y=r()|0;Z=N;b[Z>>2]=X;b[Z+4>>2]=Y;Z=yd(H|0,J|0,R|0,h|0)|0;Y=r()|0;X=Q;b[X>>2]=Z;b[X+4>>2]=Y;X=yd(G|0,I|0,j|0,k|0)|0;Y=r()|0;Z=i;b[Z>>2]=X;b[Z+4>>2]=Y;Z=yd(c|0,d|0,m|0,n|0)|0;Y=r()|0;X=l;b[X>>2]=Z;b[X+4>>2]=Y;X=yd(y|0,z|0,p|0,q|0)|0;Y=r()|0;Z=o;b[Z>>2]=X;b[Z+4>>2]=Y;Z=yd(A|0,B|0,t|0,u|0)|0;Y=r()|0;X=s;b[X>>2]=Z;b[X+4>>2]=Y;X=yd(C|0,D|0,w|0,x|0)|0;Y=r()|0;Z=v;b[Z>>2]=X;b[Z+4>>2]=Y;return}function md(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=a;e=b[d>>2]|0;d=b[d+4>>2]|0;f=Id(e|0,d|0,6)|0;r()|0;f=a+80+((f&15)<<3)|0;h=f;h=Jd(b[h>>2]|0,b[h+4>>2]|0,8)|0;g=r()|0;b[f>>2]=h|c&255;b[f+4>>2]=g;c=yd(e|0,d|0,8,0)|0;d=r()|0;e=a;b[e>>2]=c;b[e+4>>2]=d;if(!((c|0)==0&(d|0)==0)){if(!((c&1023|0)==0&0==0))return}else{h=a+8|0;f=h;f=yd(b[f>>2]|0,b[f+4>>2]|0,1,0)|0;g=r()|0;b[h>>2]=f;b[h+4>>2]=g;h=a;b[h>>2]=0;b[h+4>>2]=0}ld(a);return}function nd(a,b){a=a|0;b=b|0;od(a,b);return}function od(c,d){c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;l=c;k=b[l>>2]|0;l=b[l+4>>2]|0;m=c+8|0;j=m;i=b[j>>2]|0;j=b[j+4>>2]|0;f=Id(k|0,l|0,6)|0;r()|0;f=c+80+((f&15)<<3)|0;h=f;h=Jd(b[h>>2]|0,b[h+4>>2]|0,8)|0;e=r()|0;b[f>>2]=h|128;b[f+4>>2]=e;f=yd(k|0,l|0,8,0)|0;e=r()|0;h=c;b[h>>2]=f;b[h+4>>2]=e;if(!((f|0)==0&(e|0)==0)){g=f&1023;if((g|0)==0&0==0)n=4;else h=0}else{g=yd(i|0,j|0,1,0)|0;h=r()|0;n=m;b[n>>2]=g;b[n+4>>2]=h;n=c;b[n>>2]=0;b[n+4>>2]=0;n=4}if((n|0)==4){ld(c);e=c;g=b[e>>2]|0;f=g;e=b[e+4>>2]|0;g=g&1023;h=0}if(!((g|0)==896&(h|0)==0))do{h=Id(f|0,e|0,6)|0;r()|0;h=c+80+((h&15)<<3)|0;o=h;o=Jd(b[o>>2]|0,b[o+4>>2]|0,8)|0;g=r()|0;b[h>>2]=o;b[h+4>>2]=g;f=yd(f|0,e|0,8,0)|0;e=r()|0;h=c;b[h>>2]=f;b[h+4>>2]=e;if(!((f|0)==0&(e|0)==0)){if((f&1023|0)==0&0==0)n=10}else{h=m;h=yd(b[h>>2]|0,b[h+4>>2]|0,1,0)|0;o=r()|0;n=m;b[n>>2]=h;b[n+4>>2]=o;n=c;b[n>>2]=0;b[n+4>>2]=0;n=10}if((n|0)==10){n=0;ld(c);e=c;f=b[e>>2]|0;e=b[e+4>>2]|0}}while(!((f&1023|0)==896&0==0));f=c+192|0;b[f>>2]=i;b[f+4>>2]=j;f=c+200|0;b[f>>2]=k;b[f+4>>2]=l;ld(c);f=c+720|0;if((b[f>>2]|0)>0){e=0;do{o=c+16+(e>>>3<<3)|0;o=Id(b[o>>2]|0,b[o+4>>2]|0,e<<3&56^56|0)|0;r()|0;a[d+e>>0]=o;e=e+1|0}while((e|0)<(b[f>>2]|0))}Ld(c+80|0,0,640)|0;b[c>>2]=0;b[c+4>>2]=0;b[c+8>>2]=0;b[c+12>>2]=0;o=c+16|0;b[o>>2]=-205731576;b[o+4>>2]=1779033703;o=c+24|0;b[o>>2]=-2067093701;b[o+4>>2]=-1150833019;o=c+32|0;b[o>>2]=-23791573;b[o+4>>2]=1013904242;o=c+40|0;b[o>>2]=1595750129;b[o+4>>2]=-1521486534;o=c+48|0;b[o>>2]=-1377402159;b[o+4>>2]=1359893119;o=c+56|0;b[o>>2]=725511199;b[o+4>>2]=-1694144372;o=c+64|0;b[o>>2]=-79577749;b[o+4>>2]=528734635;o=c+72|0;b[o>>2]=327033209;b[o+4>>2]=1541459225;b[f>>2]=64;return}function pd(a){a=a|0;var c=0;Ld(a+80|0,0,640)|0;b[a>>2]=0;b[a+4>>2]=0;b[a+8>>2]=0;b[a+12>>2]=0;c=a+16|0;b[c>>2]=-205731576;b[c+4>>2]=1779033703;c=a+24|0;b[c>>2]=-2067093701;b[c+4>>2]=-1150833019;c=a+32|0;b[c>>2]=-23791573;b[c+4>>2]=1013904242;c=a+40|0;b[c>>2]=1595750129;b[c+4>>2]=-1521486534;c=a+48|0;b[c>>2]=-1377402159;b[c+4>>2]=1359893119;c=a+56|0;b[c>>2]=725511199;b[c+4>>2]=-1694144372;c=a+64|0;b[c>>2]=-79577749;b[c+4>>2]=528734635;c=a+72|0;b[c>>2]=327033209;b[c+4>>2]=1541459225;b[a+720>>2]=64;return}function qd(a,c){a=a|0;c=c|0;Ld(a|0,0,208)|0;b[a+212>>2]=c;b[a+208>>2]=200-(c<<1);return}function rd(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;f=a;e=b[a+208>>2]|0;d=((e|0)<0)<<31>>31;f=Gd(b[f>>2]|0,b[f+4>>2]|0,e|0,d|0)|0;r()|0;g=(f|0)/8|0;h=Jd(c|0,((c|0)<0)<<31>>31|0,f-(g<<3)<<3|0)|0;c=r()|0;f=a+8+(((g|0)%5|0)*40|0)+(((f|0)/40|0)<<3)|0;g=f;c=c^b[g+4>>2];b[f>>2]=h^b[g>>2];b[f+4>>2]=c;f=a;f=yd(b[f>>2]|0,b[f+4>>2]|0,1,0)|0;c=r()|0;g=a;b[g>>2]=f;b[g+4>>2]=c;c=Gd(f|0,c|0,e|0,d|0)|0;if(!((c|0)==0&(r()|0)==0))return;sd(a);return}function sd(a){a=a|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0;Ia=a+8|0;Ta=a+16|0;Za=a+24|0;_a=a+32|0;$a=a+40|0;ab=a+48|0;bb=a+56|0;cb=a+64|0;db=a+72|0;Ja=a+80|0;Ka=a+88|0;La=a+96|0;Ma=a+104|0;Na=a+112|0;Oa=a+120|0;Pa=a+128|0;Qa=a+136|0;Ra=a+144|0;Sa=a+152|0;Ua=a+160|0;Va=a+168|0;Wa=a+176|0;Xa=a+184|0;Ya=a+192|0;Ha=a+200|0;e=Ia;N=Qa;P=Ra;R=Sa;T=Ua;W=Va;X=Wa;Z=Xa;$=Ya;ba=Ha;p=bb;s=cb;qa=db;oa=Ja;la=Ka;ka=La;ia=Ma;ga=Na;ea=Oa;M=Pa;f=Ta;h=Za;j=_a;l=$a;o=ab;K=Qa;I=Ra;G=Sa;E=Ua;C=Va;A=Wa;y=Xa;w=Ya;u=Ha;a=0;c=b[e>>2]|0;d=b[f>>2]|0;e=b[e+4>>2]|0;f=b[f+4>>2]|0;g=b[h>>2]|0;h=b[h+4>>2]|0;i=b[j>>2]|0;j=b[j+4>>2]|0;k=b[l>>2]|0;l=b[l+4>>2]|0;m=b[o>>2]|0;n=b[p>>2]|0;o=b[o+4>>2]|0;p=b[p+4>>2]|0;q=b[s>>2]|0;s=b[s+4>>2]|0;t=b[qa>>2]|0;qa=b[qa+4>>2]|0;pa=b[oa>>2]|0;oa=b[oa+4>>2]|0;na=b[la>>2]|0;ma=b[ka>>2]|0;la=b[la+4>>2]|0;ka=b[ka+4>>2]|0;ja=b[ia>>2]|0;ia=b[ia+4>>2]|0;ha=b[ga>>2]|0;ga=b[ga+4>>2]|0;fa=b[ea>>2]|0;ea=b[ea+4>>2]|0;ca=b[M>>2]|0;da=b[N>>2]|0;M=b[M+4>>2]|0;N=b[N+4>>2]|0;O=b[P>>2]|0;P=b[P+4>>2]|0;Q=b[R>>2]|0;R=b[R+4>>2]|0;S=b[T>>2]|0;T=b[T+4>>2]|0;U=b[W>>2]|0;V=b[X>>2]|0;W=b[W+4>>2]|0;X=b[X+4>>2]|0;Y=b[Z>>2]|0;Z=b[Z+4>>2]|0;_=b[$>>2]|0;$=b[$+4>>2]|0;aa=b[ba>>2]|0;ba=b[ba+4>>2]|0;L=b[K>>2]|0;K=b[K+4>>2]|0;J=b[I>>2]|0;I=b[I+4>>2]|0;H=b[G>>2]|0;G=b[G+4>>2]|0;F=b[E>>2]|0;E=b[E+4>>2]|0;D=b[C>>2]|0;C=b[C+4>>2]|0;B=b[A>>2]|0;A=b[A+4>>2]|0;z=b[y>>2]|0;y=b[y+4>>2]|0;x=b[w>>2]|0;w=b[w+4>>2]|0;v=b[u>>2]|0;u=b[u+4>>2]|0;while(1){va=d^c^g^i^k;Ca=f^e^h^j^l;Ga=n^m^q^t^pa;za=p^o^s^qa^oa;xa=ma^na^ja^ha^fa;Da=ka^la^ia^ga^ea;wa=da^ca^O^Q^S;da=N^M^P^R^T;U=V^U^Y^_^aa;$=X^W^Z^$^ba;T=Jd(Ga|0,za|0,1)|0;Ba=r()|0;W=Id(Ga|0,za|0,63)|0;W=U^(T|W);Ba=$^(Ba|(r()|0));T=Jd(xa|0,Da|0,1)|0;Fa=r()|0;ba=Id(xa|0,Da|0,63)|0;ba=(T|ba)^va;Fa=(Fa|(r()|0))^Ca;T=Jd(wa|0,da|0,1)|0;S=r()|0;aa=Id(wa|0,da|0,63)|0;aa=(T|aa)^Ga;za=(S|(r()|0))^za;S=Jd(U|0,$|0,1)|0;T=r()|0;$=Id(U|0,$|0,63)|0;$=(S|$)^xa;Da=(T|(r()|0))^Da;T=Jd(va|0,Ca|0,1)|0;xa=r()|0;S=Id(va|0,Ca|0,63)|0;S=wa^(T|S);xa=da^(xa|(r()|0));c=c^W;da=e^Ba;T=d^W;U=f^Ba;V=g^W;wa=h^Ba;Ca=i^W;va=j^Ba;W=k^W;Ba=l^Ba;X=m^ba;Y=o^Fa;o=n^ba;m=p^Fa;l=q^ba;k=s^Fa;j=t^ba;Ga=qa^Fa;e=pa^ba;Fa=oa^Fa;i=na^aa;la=la^za;pa=ma^aa;ba=ka^za;ua=ja^aa;na=ia^za;Aa=ha^aa;ta=ga^za;aa=fa^aa;za=ea^za;ma=ca^$;_=M^Da;h=L^$;ka=K^Da;g=J^$;I=I^Da;Ea=H^$;H=G^Da;ja=F^$;Da=E^Da;$=D^S;ha=C^xa;G=B^S;Z=A^xa;sa=z^S;F=y^xa;ya=x^S;ra=w^xa;f=v^S;xa=u^xa;d=Jd(T|0,U|0,36)|0;ia=r()|0;ga=Id(T|0,U|0,28)|0;ga=d|ga;ia=ia|(r()|0);d=Jd(V|0,wa|0,3)|0;A=r()|0;y=Id(V|0,wa|0,61)|0;y=d|y;A=A|(r()|0);d=Jd(Ca|0,va|0,41)|0;wa=r()|0;va=Id(Ca|0,va|0,23)|0;va=d|va;wa=wa|(r()|0);d=Jd(W|0,Ba|0,18)|0;Ca=r()|0;Ba=Id(W|0,Ba|0,46)|0;Ba=d|Ba;Ca=Ca|(r()|0);d=Jd(X|0,Y|0,1)|0;fa=r()|0;ca=Id(X|0,Y|0,63)|0;ca=d|ca;fa=fa|(r()|0);d=Jd(o|0,m|0,44)|0;qa=r()|0;oa=Id(o|0,m|0,20)|0;oa=d|oa;qa=qa|(r()|0);d=Jd(l|0,k|0,10)|0;E=r()|0;D=Id(l|0,k|0,54)|0;D=d|D;E=E|(r()|0);d=Jd(j|0,Ga|0,45)|0;K=r()|0;J=Id(j|0,Ga|0,19)|0;J=d|J;K=K|(r()|0);d=Jd(e|0,Fa|0,2)|0;Ga=r()|0;Fa=Id(e|0,Fa|0,62)|0;Fa=d|Fa;Ga=Ga|(r()|0);d=Jd(i|0,la|0,62)|0;e=r()|0;la=Id(i|0,la|0,2)|0;la=d|la;e=e|(r()|0);d=Jd(pa|0,ba|0,6)|0;ea=r()|0;ba=Id(pa|0,ba|0,58)|0;ba=d|ba;ea=ea|(r()|0);d=Jd(ua|0,na|0,43)|0;pa=r()|0;na=Id(ua|0,na|0,21)|0;na=d|na;pa=pa|(r()|0);d=Jd(Aa|0,ta|0,15)|0;ua=r()|0;ta=Id(Aa|0,ta|0,49)|0;ta=d|ta;ua=ua|(r()|0);d=Jd(aa|0,za|0,61)|0;Aa=r()|0;za=Id(aa|0,za|0,3)|0;za=d|za;Aa=Aa|(r()|0);d=Jd(ma|0,_|0,28)|0;aa=r()|0;_=Id(ma|0,_|0,36)|0;_=d|_;aa=aa|(r()|0);d=Jd(h|0,ka|0,55)|0;ma=r()|0;ka=Id(h|0,ka|0,9)|0;ka=d|ka;ma=ma|(r()|0);d=Jd(g|0,I|0,25)|0;C=r()|0;B=Id(g|0,I|0,39)|0;B=d|B;C=C|(r()|0);d=Jd(Ea|0,H|0,21)|0;I=r()|0;H=Id(Ea|0,H|0,43)|0;H=d|H;I=I|(r()|0);d=Jd(ja|0,Da|0,56)|0;Ea=r()|0;Da=Id(ja|0,Da|0,8)|0;Da=d|Da;Ea=Ea|(r()|0);d=Jd($|0,ha|0,27)|0;ja=r()|0;ha=Id($|0,ha|0,37)|0;ha=d|ha;ja=ja|(r()|0);d=Jd(G|0,Z|0,20)|0;$=r()|0;Z=Id(G|0,Z|0,44)|0;Z=d|Z;$=$|(r()|0);d=Jd(sa|0,F|0,39)|0;G=r()|0;F=Id(sa|0,F|0,25)|0;F=d|F;G=G|(r()|0);d=Jd(ya|0,ra|0,8)|0;sa=r()|0;ra=Id(ya|0,ra|0,56)|0;ra=d|ra;sa=sa|(r()|0);d=Jd(f|0,xa|0,14)|0;ya=r()|0;xa=Id(f|0,xa|0,50)|0;xa=d|xa;ya=ya|(r()|0);d=y&~Z^_;f=A&~$^aa;g=B&~ba^ca;h=C&~ea^fa;i=D&~ga^ha;j=E&~ia^ja;k=F&~ka^la;l=G&~ma^e;m=H&~na^oa;o=I&~pa^qa;n=J&~y^Z;p=K&~A^$;q=ra&~B^ba;s=sa&~C^ea;t=ta&~D^ga;u=ua&~E^ia;v=va&~F^ka;w=wa&~G^ma;x=xa&~H^na;z=ya&~I^pa;y=za&~J^y;A=Aa&~K^A;B=Ba&~ra^B;C=Ca&~sa^C;D=Da&~ta^D;E=Ea&~ua^E;F=Fa&~va^F;G=Ga&~wa^G;H=c&~xa^H;I=da&~ya^I;J=_&~za^J;K=aa&~Aa^K;ra=ca&~Ba^ra;sa=fa&~Ca^sa;ta=ha&~Da^ta;ua=ja&~Ea^ua;va=la&~Fa^va;wa=e&~Ga^wa;xa=oa&~c^xa;ya=qa&~da^ya;za=Z&~_^za;Aa=$&~aa^Aa;Ba=ba&~ca^Ba;Ca=ea&~fa^Ca;Da=ga&~ha^Da;Ea=ia&~ja^Ea;Fa=ka&~la^Fa;Ga=ma&~e^Ga;e=1632+(a<<3)|0;c=na&~oa^c^b[e>>2];e=pa&~qa^da^b[e+4>>2];a=a+1|0;if((a|0)==24)break;else{qa=u;pa=v;oa=w;na=x;ma=y;la=z;ka=A;ja=B;ia=C;ha=D;ga=E;fa=F;ea=G;ca=H;da=J;M=I;N=K;O=ra;P=sa;Q=ta;R=ua;S=va;T=wa;U=xa;V=za;W=ya;X=Aa;Y=Ba;Z=Ca;_=Da;$=Ea;aa=Fa;ba=Ga;L=J;J=ra;I=sa;H=ta;G=ua;F=va;E=wa;D=xa;C=ya;B=za;A=Aa;z=Ba;y=Ca;x=Da;w=Ea;v=Fa;u=Ga}}b[Ta>>2]=d;b[Ta+4>>2]=f;b[Za>>2]=g;b[Za+4>>2]=h;b[_a>>2]=i;b[_a+4>>2]=j;b[$a>>2]=k;b[$a+4>>2]=l;b[ab>>2]=m;b[ab+4>>2]=o;ab=Ia;b[ab>>2]=c;b[ab+4>>2]=e;b[bb>>2]=n;b[bb+4>>2]=p;b[cb>>2]=q;b[cb+4>>2]=s;b[db>>2]=t;b[db+4>>2]=u;db=Ja;b[db>>2]=v;b[db+4>>2]=w;db=Ka;b[db>>2]=x;b[db+4>>2]=z;db=La;b[db>>2]=y;b[db+4>>2]=A;db=Ma;b[db>>2]=B;b[db+4>>2]=C;db=Na;b[db>>2]=D;b[db+4>>2]=E;db=Oa;b[db>>2]=F;b[db+4>>2]=G;db=Pa;b[db>>2]=H;b[db+4>>2]=I;db=Qa;b[db>>2]=J;b[db+4>>2]=K;db=Ra;b[db>>2]=ra;b[db+4>>2]=sa;db=Sa;b[db>>2]=ta;b[db+4>>2]=ua;db=Ua;b[db>>2]=va;b[db+4>>2]=wa;db=Va;b[db>>2]=xa;b[db+4>>2]=ya;db=Wa;b[db>>2]=za;b[db+4>>2]=Aa;db=Xa;b[db>>2]=Ba;b[db+4>>2]=Ca;db=Ya;b[db>>2]=Da;b[db+4>>2]=Ea;db=Ha;b[db>>2]=Fa;b[db+4>>2]=Ga;return}function td(c,d,e){c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;m=c+208|0;g=0;f=0;while(1){l=0;while(1){j=c+8+(l*40|0)+(g<<3)|0;k=b[j>>2]|0;j=b[j+4>>2]|0;h=f+1|0;a[d+f>>0]=k;if((h|0)>=(e|0)){f=h;h=8;break}if(!((h|0)%(b[m>>2]|0)|0)){f=h;h=8;break}n=Id(k|0,j|0,8)|0;r()|0;i=f+2|0;a[d+h>>0]=n;if((i|0)>=(e|0)){f=i;h=8;break}if(!((i|0)%(b[m>>2]|0)|0)){f=i;h=8;break}n=Id(k|0,j|0,16)|0;r()|0;h=f+3|0;a[d+i>>0]=n;if((h|0)>=(e|0)){f=h;h=8;break}if(!((h|0)%(b[m>>2]|0)|0)){f=h;h=8;break}n=Id(k|0,j|0,24)|0;r()|0;i=f+4|0;a[d+h>>0]=n;if((i|0)>=(e|0)){f=i;h=8;break}if(!((i|0)%(b[m>>2]|0)|0)){f=i;h=8;break}h=f+5|0;a[d+i>>0]=j;if((h|0)>=(e|0)){f=h;h=8;break}if(!((h|0)%(b[m>>2]|0)|0)){f=h;h=8;break}n=Id(k|0,j|0,40)|0;r()|0;i=f+6|0;a[d+h>>0]=n;if((i|0)>=(e|0)){f=i;h=8;break}if(!((i|0)%(b[m>>2]|0)|0)){f=i;h=8;break}n=Id(k|0,j|0,48)|0;r()|0;h=f+7|0;a[d+i>>0]=n;if((h|0)>=(e|0)){f=h;h=8;break}if(!((h|0)%(b[m>>2]|0)|0)){f=h;h=8;break}n=Id(k|0,j|0,56)|0;r()|0;f=f+8|0;a[d+h>>0]=n;if((f|0)>=(e|0)){h=8;break}if(!((f|0)%(b[m>>2]|0)|0)){h=8;break}l=l+1|0;if(l>>>0>=5){h=6;break}}if((h|0)==6){h=0;g=g+1|0;if(g>>>0>=5)h=8}if((h|0)==8){if((f|0)>=(e|0))break;sd(c);g=0}}return}function ud(a,c){a=a|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;k=a+208|0;i=b[k>>2]|0;d=((i|0)<0)<<31>>31;j=a;j=Gd(b[j>>2]|0,b[j+4>>2]|0,i|0,d|0)|0;r()|0;g=(j|0)/8|0;e=(g|0)%5|0;f=(j|0)/40|0;g=j-(g<<3)<<3;if((i-j|0)==1){h=Jd(134,0,g|0)|0;k=r()|0;j=a+8+(e*40|0)+(f<<3)|0;g=j;k=b[g+4>>2]^k;b[j>>2]=b[g>>2]^h;b[j+4>>2]=k;j=a;j=yd(b[j>>2]|0,b[j+4>>2]|0,1,0)|0;k=r()|0;h=a;b[h>>2]=j;b[h+4>>2]=k;k=Gd(j|0,k|0,i|0,d|0)|0;if(!((k|0)==0&(r()|0)==0)){k=a+212|0;k=b[k>>2]|0;td(a,c,k);return}sd(a);k=a+212|0;k=b[k>>2]|0;td(a,c,k);return}j=Jd(6,0,g|0)|0;g=r()|0;f=a+8+(e*40|0)+(f<<3)|0;e=f;g=b[e+4>>2]^g;b[f>>2]=b[e>>2]^j;b[f+4>>2]=g;f=a;f=yd(b[f>>2]|0,b[f+4>>2]|0,1,0)|0;g=r()|0;e=a;b[e>>2]=f;b[e+4>>2]=g;e=Gd(f|0,g|0,i|0,d|0)|0;if((e|0)==0&(r()|0)==0){sd(a);g=a;f=b[g>>2]|0;g=b[g+4>>2]|0;e=b[k>>2]|0;d=((e|0)<0)<<31>>31;h=Gd(f|0,g|0,e|0,d|0)|0;r()|0;j=e}else{h=e;j=i;e=i}if(((f|0)%(e|0)|0|0)==(e+-1|0)){f=h;e=j}else{h=j;while(1){f=yd(f|0,g|0,1,0)|0;g=r()|0;j=a;b[j>>2]=f;b[j+4>>2]=g;j=Gd(f|0,g|0,h|0,d|0)|0;if((j|0)==0&(r()|0)==0){sd(a);g=a;e=b[k>>2]|0;f=b[g>>2]|0;g=b[g+4>>2]|0}d=((e|0)<0)<<31>>31;if(((f|0)%(e|0)|0|0)==(e+-1|0))break;else h=e}f=Gd(f|0,g|0,e|0,d|0)|0;r()|0}j=(f|0)/8|0;i=Jd(128,0,f-(j<<3)<<3|0)|0;k=r()|0;j=a+8+(((j|0)%5|0)*40|0)+(((f|0)/40|0)<<3)|0;h=j;k=b[h+4>>2]^k;b[j>>2]=b[h>>2]^i;b[j+4>>2]=k;j=a;j=yd(b[j>>2]|0,b[j+4>>2]|0,1,0)|0;k=r()|0;i=a;b[i>>2]=j;b[i+4>>2]=k;k=Gd(j|0,k|0,e|0,d|0)|0;if(!((k|0)==0&(r()|0)==0)){k=a+212|0;k=b[k>>2]|0;td(a,c,k);return}sd(a);k=a+212|0;k=b[k>>2]|0;td(a,c,k);return}
function vd(a){a=a|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;w=x;x=x+16|0;n=w;do if(a>>>0<245){k=a>>>0<11?16:a+11&-8;a=k>>>3;m=b[541]|0;d=m>>>a;if(d&3|0){c=(d&1^1)+a|0;a=2204+(c<<1<<2)|0;d=a+8|0;e=b[d>>2]|0;f=e+8|0;g=b[f>>2]|0;if((g|0)==(a|0))b[541]=m&~(1<<c);else{b[g+12>>2]=a;b[d>>2]=g}v=c<<3;b[e+4>>2]=v|3;v=e+v+4|0;b[v>>2]=b[v>>2]|1;v=f;x=w;return v|0}l=b[543]|0;if(k>>>0>l>>>0){if(d|0){c=2<<a;c=d<<a&(c|0-c);c=(c&0-c)+-1|0;i=c>>>12&16;c=c>>>i;d=c>>>5&8;c=c>>>d;g=c>>>2&4;c=c>>>g;a=c>>>1&2;c=c>>>a;e=c>>>1&1;e=(d|i|g|a|e)+(c>>>e)|0;c=2204+(e<<1<<2)|0;a=c+8|0;g=b[a>>2]|0;i=g+8|0;d=b[i>>2]|0;if((d|0)==(c|0)){a=m&~(1<<e);b[541]=a}else{b[d+12>>2]=c;b[a>>2]=d;a=m}v=e<<3;h=v-k|0;b[g+4>>2]=k|3;f=g+k|0;b[f+4>>2]=h|1;b[g+v>>2]=h;if(l|0){e=b[546]|0;c=l>>>3;d=2204+(c<<1<<2)|0;c=1<<c;if(!(a&c)){b[541]=a|c;c=d;a=d+8|0}else{a=d+8|0;c=b[a>>2]|0}b[a>>2]=e;b[c+12>>2]=e;b[e+8>>2]=c;b[e+12>>2]=d}b[543]=h;b[546]=f;v=i;x=w;return v|0}g=b[542]|0;if(g){d=(g&0-g)+-1|0;f=d>>>12&16;d=d>>>f;e=d>>>5&8;d=d>>>e;h=d>>>2&4;d=d>>>h;i=d>>>1&2;d=d>>>i;j=d>>>1&1;j=b[2468+((e|f|h|i|j)+(d>>>j)<<2)>>2]|0;d=j;i=j;j=(b[j+4>>2]&-8)-k|0;while(1){a=b[d+16>>2]|0;if(!a){a=b[d+20>>2]|0;if(!a)break}h=(b[a+4>>2]&-8)-k|0;f=h>>>0<j>>>0;d=a;i=f?a:i;j=f?h:j}h=i+k|0;if(h>>>0>i>>>0){f=b[i+24>>2]|0;c=b[i+12>>2]|0;do if((c|0)==(i|0)){a=i+20|0;c=b[a>>2]|0;if(!c){a=i+16|0;c=b[a>>2]|0;if(!c){d=0;break}}while(1){e=c+20|0;d=b[e>>2]|0;if(!d){e=c+16|0;d=b[e>>2]|0;if(!d)break;else{c=d;a=e}}else{c=d;a=e}}b[a>>2]=0;d=c}else{d=b[i+8>>2]|0;b[d+12>>2]=c;b[c+8>>2]=d;d=c}while(0);do if(f|0){c=b[i+28>>2]|0;a=2468+(c<<2)|0;if((i|0)==(b[a>>2]|0)){b[a>>2]=d;if(!d){b[542]=g&~(1<<c);break}}else{v=f+16|0;b[((b[v>>2]|0)==(i|0)?v:f+20|0)>>2]=d;if(!d)break}b[d+24>>2]=f;c=b[i+16>>2]|0;if(c|0){b[d+16>>2]=c;b[c+24>>2]=d}c=b[i+20>>2]|0;if(c|0){b[d+20>>2]=c;b[c+24>>2]=d}}while(0);if(j>>>0<16){v=j+k|0;b[i+4>>2]=v|3;v=i+v+4|0;b[v>>2]=b[v>>2]|1}else{b[i+4>>2]=k|3;b[h+4>>2]=j|1;b[h+j>>2]=j;if(l|0){e=b[546]|0;c=l>>>3;d=2204+(c<<1<<2)|0;c=1<<c;if(!(c&m)){b[541]=c|m;c=d;a=d+8|0}else{a=d+8|0;c=b[a>>2]|0}b[a>>2]=e;b[c+12>>2]=e;b[e+8>>2]=c;b[e+12>>2]=d}b[543]=j;b[546]=h}v=i+8|0;x=w;return v|0}else m=k}else m=k}else m=k}else if(a>>>0<=4294967231){a=a+11|0;k=a&-8;e=b[542]|0;if(e){f=0-k|0;a=a>>>8;if(a)if(k>>>0>16777215)j=31;else{m=(a+1048320|0)>>>16&8;q=a<<m;i=(q+520192|0)>>>16&4;q=q<<i;j=(q+245760|0)>>>16&2;j=14-(i|m|j)+(q<<j>>>15)|0;j=k>>>(j+7|0)&1|j<<1}else j=0;d=b[2468+(j<<2)>>2]|0;a:do if(!d){d=0;a=0;q=61}else{a=0;i=k<<((j|0)==31?0:25-(j>>>1)|0);g=0;while(1){h=(b[d+4>>2]&-8)-k|0;if(h>>>0<f>>>0)if(!h){a=d;f=0;q=65;break a}else{a=d;f=h}q=b[d+20>>2]|0;d=b[d+16+(i>>>31<<2)>>2]|0;g=(q|0)==0|(q|0)==(d|0)?g:q;if(!d){d=g;q=61;break}else i=i<<1}}while(0);if((q|0)==61){if((d|0)==0&(a|0)==0){a=2<<j;a=(a|0-a)&e;if(!a){m=k;break}m=(a&0-a)+-1|0;h=m>>>12&16;m=m>>>h;g=m>>>5&8;m=m>>>g;i=m>>>2&4;m=m>>>i;j=m>>>1&2;m=m>>>j;d=m>>>1&1;a=0;d=b[2468+((g|h|i|j|d)+(m>>>d)<<2)>>2]|0}if(!d){i=a;h=f}else q=65}if((q|0)==65){g=d;while(1){m=(b[g+4>>2]&-8)-k|0;d=m>>>0<f>>>0;f=d?m:f;a=d?g:a;d=b[g+16>>2]|0;if(!d)d=b[g+20>>2]|0;if(!d){i=a;h=f;break}else g=d}}if(((i|0)!=0?h>>>0<((b[543]|0)-k|0)>>>0:0)?(l=i+k|0,l>>>0>i>>>0):0){g=b[i+24>>2]|0;c=b[i+12>>2]|0;do if((c|0)==(i|0)){a=i+20|0;c=b[a>>2]|0;if(!c){a=i+16|0;c=b[a>>2]|0;if(!c){c=0;break}}while(1){f=c+20|0;d=b[f>>2]|0;if(!d){f=c+16|0;d=b[f>>2]|0;if(!d)break;else{c=d;a=f}}else{c=d;a=f}}b[a>>2]=0}else{v=b[i+8>>2]|0;b[v+12>>2]=c;b[c+8>>2]=v}while(0);do if(g){a=b[i+28>>2]|0;d=2468+(a<<2)|0;if((i|0)==(b[d>>2]|0)){b[d>>2]=c;if(!c){e=e&~(1<<a);b[542]=e;break}}else{v=g+16|0;b[((b[v>>2]|0)==(i|0)?v:g+20|0)>>2]=c;if(!c)break}b[c+24>>2]=g;a=b[i+16>>2]|0;if(a|0){b[c+16>>2]=a;b[a+24>>2]=c}a=b[i+20>>2]|0;if(a){b[c+20>>2]=a;b[a+24>>2]=c}}while(0);b:do if(h>>>0<16){v=h+k|0;b[i+4>>2]=v|3;v=i+v+4|0;b[v>>2]=b[v>>2]|1}else{b[i+4>>2]=k|3;b[l+4>>2]=h|1;b[l+h>>2]=h;c=h>>>3;if(h>>>0<256){d=2204+(c<<1<<2)|0;a=b[541]|0;c=1<<c;if(!(a&c)){b[541]=a|c;c=d;a=d+8|0}else{a=d+8|0;c=b[a>>2]|0}b[a>>2]=l;b[c+12>>2]=l;b[l+8>>2]=c;b[l+12>>2]=d;break}c=h>>>8;if(c)if(h>>>0>16777215)d=31;else{u=(c+1048320|0)>>>16&8;v=c<<u;t=(v+520192|0)>>>16&4;v=v<<t;d=(v+245760|0)>>>16&2;d=14-(t|u|d)+(v<<d>>>15)|0;d=h>>>(d+7|0)&1|d<<1}else d=0;c=2468+(d<<2)|0;b[l+28>>2]=d;a=l+16|0;b[a+4>>2]=0;b[a>>2]=0;a=1<<d;if(!(e&a)){b[542]=e|a;b[c>>2]=l;b[l+24>>2]=c;b[l+12>>2]=l;b[l+8>>2]=l;break}c=b[c>>2]|0;c:do if((b[c+4>>2]&-8|0)!=(h|0)){e=h<<((d|0)==31?0:25-(d>>>1)|0);while(1){d=c+16+(e>>>31<<2)|0;a=b[d>>2]|0;if(!a)break;if((b[a+4>>2]&-8|0)==(h|0)){c=a;break c}else{e=e<<1;c=a}}b[d>>2]=l;b[l+24>>2]=c;b[l+12>>2]=l;b[l+8>>2]=l;break b}while(0);u=c+8|0;v=b[u>>2]|0;b[v+12>>2]=l;b[u>>2]=l;b[l+8>>2]=v;b[l+12>>2]=c;b[l+24>>2]=0}while(0);v=i+8|0;x=w;return v|0}else m=k}else m=k}else m=-1;while(0);d=b[543]|0;if(d>>>0>=m>>>0){c=d-m|0;a=b[546]|0;if(c>>>0>15){v=a+m|0;b[546]=v;b[543]=c;b[v+4>>2]=c|1;b[a+d>>2]=c;b[a+4>>2]=m|3}else{b[543]=0;b[546]=0;b[a+4>>2]=d|3;v=a+d+4|0;b[v>>2]=b[v>>2]|1}v=a+8|0;x=w;return v|0}h=b[544]|0;if(h>>>0>m>>>0){t=h-m|0;b[544]=t;v=b[547]|0;u=v+m|0;b[547]=u;b[u+4>>2]=t|1;b[v+4>>2]=m|3;v=v+8|0;x=w;return v|0}if(!(b[659]|0)){b[661]=4096;b[660]=4096;b[662]=-1;b[663]=-1;b[664]=0;b[652]=0;b[659]=n&-16^1431655768;a=4096}else a=b[661]|0;i=m+48|0;j=m+47|0;g=a+j|0;f=0-a|0;k=g&f;if(k>>>0<=m>>>0){v=0;x=w;return v|0}a=b[651]|0;if(a|0?(l=b[649]|0,n=l+k|0,n>>>0<=l>>>0|n>>>0>a>>>0):0){v=0;x=w;return v|0}d:do if(!(b[652]&4)){d=b[547]|0;e:do if(d){e=2612;while(1){n=b[e>>2]|0;if(n>>>0<=d>>>0?(n+(b[e+4>>2]|0)|0)>>>0>d>>>0:0)break;a=b[e+8>>2]|0;if(!a){q=128;break e}else e=a}c=g-h&f;if(c>>>0<2147483647){a=Md(c|0)|0;if((a|0)==((b[e>>2]|0)+(b[e+4>>2]|0)|0)){if((a|0)!=(-1|0)){h=c;g=a;q=145;break d}}else{e=a;q=136}}else c=0}else q=128;while(0);do if((q|0)==128){d=Md(0)|0;if((d|0)!=(-1|0)?(c=d,o=b[660]|0,p=o+-1|0,c=((p&c|0)==0?0:(p+c&0-o)-c|0)+k|0,o=b[649]|0,p=c+o|0,c>>>0>m>>>0&c>>>0<2147483647):0){n=b[651]|0;if(n|0?p>>>0<=o>>>0|p>>>0>n>>>0:0){c=0;break}a=Md(c|0)|0;if((a|0)==(d|0)){h=c;g=d;q=145;break d}else{e=a;q=136}}else c=0}while(0);do if((q|0)==136){d=0-c|0;if(!(i>>>0>c>>>0&(c>>>0<2147483647&(e|0)!=(-1|0))))if((e|0)==(-1|0)){c=0;break}else{h=c;g=e;q=145;break d}a=b[661]|0;a=j-c+a&0-a;if(a>>>0>=2147483647){h=c;g=e;q=145;break d}if((Md(a|0)|0)==(-1|0)){Md(d|0)|0;c=0;break}else{h=a+c|0;g=e;q=145;break d}}while(0);b[652]=b[652]|4;q=143}else{c=0;q=143}while(0);if(((q|0)==143?k>>>0<2147483647:0)?(t=Md(k|0)|0,p=Md(0)|0,r=p-t|0,s=r>>>0>(m+40|0)>>>0,!((t|0)==(-1|0)|s^1|t>>>0<p>>>0&((t|0)!=(-1|0)&(p|0)!=(-1|0))^1)):0){h=s?r:c;g=t;q=145}if((q|0)==145){c=(b[649]|0)+h|0;b[649]=c;if(c>>>0>(b[650]|0)>>>0)b[650]=c;j=b[547]|0;f:do if(j){c=2612;while(1){a=b[c>>2]|0;d=b[c+4>>2]|0;if((g|0)==(a+d|0)){q=154;break}e=b[c+8>>2]|0;if(!e)break;else c=e}if(((q|0)==154?(u=c+4|0,(b[c+12>>2]&8|0)==0):0)?g>>>0>j>>>0&a>>>0<=j>>>0:0){b[u>>2]=d+h;v=(b[544]|0)+h|0;t=j+8|0;t=(t&7|0)==0?0:0-t&7;u=j+t|0;t=v-t|0;b[547]=u;b[544]=t;b[u+4>>2]=t|1;b[j+v+4>>2]=40;b[548]=b[663];break}if(g>>>0<(b[545]|0)>>>0)b[545]=g;d=g+h|0;c=2612;while(1){if((b[c>>2]|0)==(d|0)){q=162;break}a=b[c+8>>2]|0;if(!a)break;else c=a}if((q|0)==162?(b[c+12>>2]&8|0)==0:0){b[c>>2]=g;l=c+4|0;b[l>>2]=(b[l>>2]|0)+h;l=g+8|0;l=g+((l&7|0)==0?0:0-l&7)|0;c=d+8|0;c=d+((c&7|0)==0?0:0-c&7)|0;k=l+m|0;i=c-l-m|0;b[l+4>>2]=m|3;g:do if((j|0)==(c|0)){v=(b[544]|0)+i|0;b[544]=v;b[547]=k;b[k+4>>2]=v|1}else{if((b[546]|0)==(c|0)){v=(b[543]|0)+i|0;b[543]=v;b[546]=k;b[k+4>>2]=v|1;b[k+v>>2]=v;break}a=b[c+4>>2]|0;if((a&3|0)==1){h=a&-8;e=a>>>3;h:do if(a>>>0<256){a=b[c+8>>2]|0;d=b[c+12>>2]|0;if((d|0)==(a|0)){b[541]=b[541]&~(1<<e);break}else{b[a+12>>2]=d;b[d+8>>2]=a;break}}else{g=b[c+24>>2]|0;a=b[c+12>>2]|0;do if((a|0)==(c|0)){d=c+16|0;e=d+4|0;a=b[e>>2]|0;if(!a){a=b[d>>2]|0;if(!a){a=0;break}}else d=e;while(1){f=a+20|0;e=b[f>>2]|0;if(!e){f=a+16|0;e=b[f>>2]|0;if(!e)break;else{a=e;d=f}}else{a=e;d=f}}b[d>>2]=0}else{v=b[c+8>>2]|0;b[v+12>>2]=a;b[a+8>>2]=v}while(0);if(!g)break;d=b[c+28>>2]|0;e=2468+(d<<2)|0;do if((b[e>>2]|0)!=(c|0)){v=g+16|0;b[((b[v>>2]|0)==(c|0)?v:g+20|0)>>2]=a;if(!a)break h}else{b[e>>2]=a;if(a|0)break;b[542]=b[542]&~(1<<d);break h}while(0);b[a+24>>2]=g;d=c+16|0;e=b[d>>2]|0;if(e|0){b[a+16>>2]=e;b[e+24>>2]=a}d=b[d+4>>2]|0;if(!d)break;b[a+20>>2]=d;b[d+24>>2]=a}while(0);c=c+h|0;f=h+i|0}else f=i;c=c+4|0;b[c>>2]=b[c>>2]&-2;b[k+4>>2]=f|1;b[k+f>>2]=f;c=f>>>3;if(f>>>0<256){d=2204+(c<<1<<2)|0;a=b[541]|0;c=1<<c;if(!(a&c)){b[541]=a|c;c=d;a=d+8|0}else{a=d+8|0;c=b[a>>2]|0}b[a>>2]=k;b[c+12>>2]=k;b[k+8>>2]=c;b[k+12>>2]=d;break}c=f>>>8;do if(!c)e=0;else{if(f>>>0>16777215){e=31;break}u=(c+1048320|0)>>>16&8;v=c<<u;t=(v+520192|0)>>>16&4;v=v<<t;e=(v+245760|0)>>>16&2;e=14-(t|u|e)+(v<<e>>>15)|0;e=f>>>(e+7|0)&1|e<<1}while(0);c=2468+(e<<2)|0;b[k+28>>2]=e;a=k+16|0;b[a+4>>2]=0;b[a>>2]=0;a=b[542]|0;d=1<<e;if(!(a&d)){b[542]=a|d;b[c>>2]=k;b[k+24>>2]=c;b[k+12>>2]=k;b[k+8>>2]=k;break}c=b[c>>2]|0;i:do if((b[c+4>>2]&-8|0)!=(f|0)){e=f<<((e|0)==31?0:25-(e>>>1)|0);while(1){d=c+16+(e>>>31<<2)|0;a=b[d>>2]|0;if(!a)break;if((b[a+4>>2]&-8|0)==(f|0)){c=a;break i}else{e=e<<1;c=a}}b[d>>2]=k;b[k+24>>2]=c;b[k+12>>2]=k;b[k+8>>2]=k;break g}while(0);u=c+8|0;v=b[u>>2]|0;b[v+12>>2]=k;b[u>>2]=k;b[k+8>>2]=v;b[k+12>>2]=c;b[k+24>>2]=0}while(0);v=l+8|0;x=w;return v|0}c=2612;while(1){a=b[c>>2]|0;if(a>>>0<=j>>>0?(v=a+(b[c+4>>2]|0)|0,v>>>0>j>>>0):0)break;c=b[c+8>>2]|0}f=v+-47|0;a=f+8|0;a=f+((a&7|0)==0?0:0-a&7)|0;f=j+16|0;a=a>>>0<f>>>0?j:a;c=a+8|0;d=h+-40|0;t=g+8|0;t=(t&7|0)==0?0:0-t&7;u=g+t|0;t=d-t|0;b[547]=u;b[544]=t;b[u+4>>2]=t|1;b[g+d+4>>2]=40;b[548]=b[663];d=a+4|0;b[d>>2]=27;b[c>>2]=b[653];b[c+4>>2]=b[654];b[c+8>>2]=b[655];b[c+12>>2]=b[656];b[653]=g;b[654]=h;b[656]=0;b[655]=c;c=a+24|0;do{u=c;c=c+4|0;b[c>>2]=7}while((u+8|0)>>>0<v>>>0);if((a|0)!=(j|0)){g=a-j|0;b[d>>2]=b[d>>2]&-2;b[j+4>>2]=g|1;b[a>>2]=g;c=g>>>3;if(g>>>0<256){d=2204+(c<<1<<2)|0;a=b[541]|0;c=1<<c;if(!(a&c)){b[541]=a|c;c=d;a=d+8|0}else{a=d+8|0;c=b[a>>2]|0}b[a>>2]=j;b[c+12>>2]=j;b[j+8>>2]=c;b[j+12>>2]=d;break}c=g>>>8;if(c)if(g>>>0>16777215)e=31;else{u=(c+1048320|0)>>>16&8;v=c<<u;t=(v+520192|0)>>>16&4;v=v<<t;e=(v+245760|0)>>>16&2;e=14-(t|u|e)+(v<<e>>>15)|0;e=g>>>(e+7|0)&1|e<<1}else e=0;d=2468+(e<<2)|0;b[j+28>>2]=e;b[j+20>>2]=0;b[f>>2]=0;c=b[542]|0;a=1<<e;if(!(c&a)){b[542]=c|a;b[d>>2]=j;b[j+24>>2]=d;b[j+12>>2]=j;b[j+8>>2]=j;break}c=b[d>>2]|0;j:do if((b[c+4>>2]&-8|0)!=(g|0)){e=g<<((e|0)==31?0:25-(e>>>1)|0);while(1){d=c+16+(e>>>31<<2)|0;a=b[d>>2]|0;if(!a)break;if((b[a+4>>2]&-8|0)==(g|0)){c=a;break j}else{e=e<<1;c=a}}b[d>>2]=j;b[j+24>>2]=c;b[j+12>>2]=j;b[j+8>>2]=j;break f}while(0);u=c+8|0;v=b[u>>2]|0;b[v+12>>2]=j;b[u>>2]=j;b[j+8>>2]=v;b[j+12>>2]=c;b[j+24>>2]=0}}else{v=b[545]|0;if((v|0)==0|g>>>0<v>>>0)b[545]=g;b[653]=g;b[654]=h;b[656]=0;b[550]=b[659];b[549]=-1;b[554]=2204;b[553]=2204;b[556]=2212;b[555]=2212;b[558]=2220;b[557]=2220;b[560]=2228;b[559]=2228;b[562]=2236;b[561]=2236;b[564]=2244;b[563]=2244;b[566]=2252;b[565]=2252;b[568]=2260;b[567]=2260;b[570]=2268;b[569]=2268;b[572]=2276;b[571]=2276;b[574]=2284;b[573]=2284;b[576]=2292;b[575]=2292;b[578]=2300;b[577]=2300;b[580]=2308;b[579]=2308;b[582]=2316;b[581]=2316;b[584]=2324;b[583]=2324;b[586]=2332;b[585]=2332;b[588]=2340;b[587]=2340;b[590]=2348;b[589]=2348;b[592]=2356;b[591]=2356;b[594]=2364;b[593]=2364;b[596]=2372;b[595]=2372;b[598]=2380;b[597]=2380;b[600]=2388;b[599]=2388;b[602]=2396;b[601]=2396;b[604]=2404;b[603]=2404;b[606]=2412;b[605]=2412;b[608]=2420;b[607]=2420;b[610]=2428;b[609]=2428;b[612]=2436;b[611]=2436;b[614]=2444;b[613]=2444;b[616]=2452;b[615]=2452;v=h+-40|0;t=g+8|0;t=(t&7|0)==0?0:0-t&7;u=g+t|0;t=v-t|0;b[547]=u;b[544]=t;b[u+4>>2]=t|1;b[g+v+4>>2]=40;b[548]=b[663]}while(0);c=b[544]|0;if(c>>>0>m>>>0){t=c-m|0;b[544]=t;v=b[547]|0;u=v+m|0;b[547]=u;b[u+4>>2]=t|1;b[v+4>>2]=m|3;v=v+8|0;x=w;return v|0}}b[(xd()|0)>>2]=12;v=0;x=w;return v|0}function wd(a){a=a|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;if(!a)return;d=a+-8|0;f=b[545]|0;a=b[a+-4>>2]|0;c=a&-8;j=d+c|0;do if(!(a&1)){e=b[d>>2]|0;if(!(a&3))return;h=d+(0-e)|0;g=e+c|0;if(h>>>0<f>>>0)return;if((b[546]|0)==(h|0)){a=j+4|0;c=b[a>>2]|0;if((c&3|0)!=3){i=h;c=g;break}b[543]=g;b[a>>2]=c&-2;b[h+4>>2]=g|1;b[h+g>>2]=g;return}d=e>>>3;if(e>>>0<256){a=b[h+8>>2]|0;c=b[h+12>>2]|0;if((c|0)==(a|0)){b[541]=b[541]&~(1<<d);i=h;c=g;break}else{b[a+12>>2]=c;b[c+8>>2]=a;i=h;c=g;break}}f=b[h+24>>2]|0;a=b[h+12>>2]|0;do if((a|0)==(h|0)){c=h+16|0;d=c+4|0;a=b[d>>2]|0;if(!a){a=b[c>>2]|0;if(!a){a=0;break}}else c=d;while(1){e=a+20|0;d=b[e>>2]|0;if(!d){e=a+16|0;d=b[e>>2]|0;if(!d)break;else{a=d;c=e}}else{a=d;c=e}}b[c>>2]=0}else{i=b[h+8>>2]|0;b[i+12>>2]=a;b[a+8>>2]=i}while(0);if(f){c=b[h+28>>2]|0;d=2468+(c<<2)|0;if((b[d>>2]|0)==(h|0)){b[d>>2]=a;if(!a){b[542]=b[542]&~(1<<c);i=h;c=g;break}}else{i=f+16|0;b[((b[i>>2]|0)==(h|0)?i:f+20|0)>>2]=a;if(!a){i=h;c=g;break}}b[a+24>>2]=f;c=h+16|0;d=b[c>>2]|0;if(d|0){b[a+16>>2]=d;b[d+24>>2]=a}c=b[c+4>>2]|0;if(c){b[a+20>>2]=c;b[c+24>>2]=a;i=h;c=g}else{i=h;c=g}}else{i=h;c=g}}else{i=d;h=d}while(0);if(h>>>0>=j>>>0)return;a=j+4|0;e=b[a>>2]|0;if(!(e&1))return;if(!(e&2)){if((b[547]|0)==(j|0)){j=(b[544]|0)+c|0;b[544]=j;b[547]=i;b[i+4>>2]=j|1;if((i|0)!=(b[546]|0))return;b[546]=0;b[543]=0;return}if((b[546]|0)==(j|0)){j=(b[543]|0)+c|0;b[543]=j;b[546]=h;b[i+4>>2]=j|1;b[h+j>>2]=j;return}f=(e&-8)+c|0;d=e>>>3;do if(e>>>0<256){c=b[j+8>>2]|0;a=b[j+12>>2]|0;if((a|0)==(c|0)){b[541]=b[541]&~(1<<d);break}else{b[c+12>>2]=a;b[a+8>>2]=c;break}}else{g=b[j+24>>2]|0;a=b[j+12>>2]|0;do if((a|0)==(j|0)){c=j+16|0;d=c+4|0;a=b[d>>2]|0;if(!a){a=b[c>>2]|0;if(!a){d=0;break}}else c=d;while(1){e=a+20|0;d=b[e>>2]|0;if(!d){e=a+16|0;d=b[e>>2]|0;if(!d)break;else{a=d;c=e}}else{a=d;c=e}}b[c>>2]=0;d=a}else{d=b[j+8>>2]|0;b[d+12>>2]=a;b[a+8>>2]=d;d=a}while(0);if(g|0){a=b[j+28>>2]|0;c=2468+(a<<2)|0;if((b[c>>2]|0)==(j|0)){b[c>>2]=d;if(!d){b[542]=b[542]&~(1<<a);break}}else{e=g+16|0;b[((b[e>>2]|0)==(j|0)?e:g+20|0)>>2]=d;if(!d)break}b[d+24>>2]=g;a=j+16|0;c=b[a>>2]|0;if(c|0){b[d+16>>2]=c;b[c+24>>2]=d}a=b[a+4>>2]|0;if(a|0){b[d+20>>2]=a;b[a+24>>2]=d}}}while(0);b[i+4>>2]=f|1;b[h+f>>2]=f;if((i|0)==(b[546]|0)){b[543]=f;return}}else{b[a>>2]=e&-2;b[i+4>>2]=c|1;b[h+c>>2]=c;f=c}a=f>>>3;if(f>>>0<256){d=2204+(a<<1<<2)|0;c=b[541]|0;a=1<<a;if(!(c&a)){b[541]=c|a;a=d;c=d+8|0}else{c=d+8|0;a=b[c>>2]|0}b[c>>2]=i;b[a+12>>2]=i;b[i+8>>2]=a;b[i+12>>2]=d;return}a=f>>>8;if(a)if(f>>>0>16777215)e=31;else{h=(a+1048320|0)>>>16&8;j=a<<h;g=(j+520192|0)>>>16&4;j=j<<g;e=(j+245760|0)>>>16&2;e=14-(g|h|e)+(j<<e>>>15)|0;e=f>>>(e+7|0)&1|e<<1}else e=0;a=2468+(e<<2)|0;b[i+28>>2]=e;b[i+20>>2]=0;b[i+16>>2]=0;c=b[542]|0;d=1<<e;a:do if(!(c&d)){b[542]=c|d;b[a>>2]=i;b[i+24>>2]=a;b[i+12>>2]=i;b[i+8>>2]=i}else{a=b[a>>2]|0;b:do if((b[a+4>>2]&-8|0)!=(f|0)){e=f<<((e|0)==31?0:25-(e>>>1)|0);while(1){d=a+16+(e>>>31<<2)|0;c=b[d>>2]|0;if(!c)break;if((b[c+4>>2]&-8|0)==(f|0)){a=c;break b}else{e=e<<1;a=c}}b[d>>2]=i;b[i+24>>2]=a;b[i+12>>2]=i;b[i+8>>2]=i;break a}while(0);h=a+8|0;j=b[h>>2]|0;b[j+12>>2]=i;b[h>>2]=i;b[i+8>>2]=j;b[i+12>>2]=a;b[i+24>>2]=0}while(0);j=(b[549]|0)+-1|0;b[549]=j;if(j|0)return;a=2620;while(1){a=b[a>>2]|0;if(!a)break;else a=a+8|0}b[549]=-1;return}function xd(){return 2660}function yd(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;c=a+c>>>0;return (q(b+d+(c>>>0<a>>>0|0)>>>0|0),c|0)|0}function zd(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=b-d-(c>>>0>a>>>0|0)>>>0;return (q(d|0),a-c>>>0|0)|0}function Ad(a){a=a|0;return (a?31-(o(a^a-1)|0)|0:32)|0}function Bd(a,c,d,e,f){a=a|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,p=0,s=0;l=a;j=c;k=j;h=d;n=e;i=n;if(!k){g=(f|0)!=0;if(!i){if(g){b[f>>2]=(l>>>0)%(h>>>0);b[f+4>>2]=0}n=0;f=(l>>>0)/(h>>>0)>>>0;return (q(n|0),f)|0}else{if(!g){n=0;f=0;return (q(n|0),f)|0}b[f>>2]=a|0;b[f+4>>2]=c&0;n=0;f=0;return (q(n|0),f)|0}}g=(i|0)==0;do if(h){if(!g){g=(o(i|0)|0)-(o(k|0)|0)|0;if(g>>>0<=31){m=g+1|0;i=31-g|0;c=g-31>>31;h=m;a=l>>>(m>>>0)&c|k<<i;c=k>>>(m>>>0)&c;g=0;i=l<<i;break}if(!f){n=0;f=0;return (q(n|0),f)|0}b[f>>2]=a|0;b[f+4>>2]=j|c&0;n=0;f=0;return (q(n|0),f)|0}g=h-1|0;if(g&h|0){i=(o(h|0)|0)+33-(o(k|0)|0)|0;s=64-i|0;m=32-i|0;j=m>>31;p=i-32|0;c=p>>31;h=i;a=m-1>>31&k>>>(p>>>0)|(k<<m|l>>>(i>>>0))&c;c=c&k>>>(i>>>0);g=l<<s&j;i=(k<<s|l>>>(p>>>0))&j|l<<m&i-33>>31;break}if(f|0){b[f>>2]=g&l;b[f+4>>2]=0}if((h|0)==1){p=j|c&0;s=a|0|0;return (q(p|0),s)|0}else{s=Ad(h|0)|0;p=k>>>(s>>>0)|0;s=k<<32-s|l>>>(s>>>0)|0;return (q(p|0),s)|0}}else{if(g){if(f|0){b[f>>2]=(k>>>0)%(h>>>0);b[f+4>>2]=0}p=0;s=(k>>>0)/(h>>>0)>>>0;return (q(p|0),s)|0}if(!l){if(f|0){b[f>>2]=0;b[f+4>>2]=(k>>>0)%(i>>>0)}p=0;s=(k>>>0)/(i>>>0)>>>0;return (q(p|0),s)|0}g=i-1|0;if(!(g&i)){if(f|0){b[f>>2]=a|0;b[f+4>>2]=g&k|c&0}p=0;s=k>>>((Ad(i|0)|0)>>>0);return (q(p|0),s)|0}g=(o(i|0)|0)-(o(k|0)|0)|0;if(g>>>0<=30){c=g+1|0;i=31-g|0;h=c;a=k<<i|l>>>(c>>>0);c=k>>>(c>>>0);g=0;i=l<<i;break}if(!f){p=0;s=0;return (q(p|0),s)|0}b[f>>2]=a|0;b[f+4>>2]=j|c&0;p=0;s=0;return (q(p|0),s)|0}while(0);if(!h){k=i;j=0;i=0}else{m=d|0|0;l=n|e&0;k=yd(m|0,l|0,-1,-1)|0;d=r()|0;j=i;i=0;do{e=j;j=g>>>31|j<<1;g=i|g<<1;e=a<<1|e>>>31|0;n=a>>>31|c<<1|0;zd(k|0,d|0,e|0,n|0)|0;s=r()|0;p=s>>31|((s|0)<0?-1:0)<<1;i=p&1;a=zd(e|0,n|0,p&m|0,(((s|0)<0?-1:0)>>31|((s|0)<0?-1:0)<<1)&l|0)|0;c=r()|0;h=h-1|0}while((h|0)!=0);k=j;j=0}h=0;if(f|0){b[f>>2]=a;b[f+4>>2]=c}p=(g|0)>>>31|(k|h)<<1|(h<<1|g>>>31)&0|j;s=(g<<1|0>>>31)&-2|i;return (q(p|0),s)|0}function Cd(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0;j=b>>31|((b|0)<0?-1:0)<<1;i=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;f=d>>31|((d|0)<0?-1:0)<<1;e=((d|0)<0?-1:0)>>31|((d|0)<0?-1:0)<<1;h=zd(j^a|0,i^b|0,j|0,i|0)|0;g=r()|0;a=f^j;b=e^i;return zd((Bd(h,g,zd(f^c|0,e^d|0,f|0,e|0)|0,r()|0,0)|0)^a|0,(r()|0)^b|0,a|0,b|0)|0}function Dd(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;f=a&65535;e=b&65535;c=n(e,f)|0;d=a>>>16;a=(c>>>16)+(n(e,d)|0)|0;e=b>>>16;b=n(e,f)|0;return (q((a>>>16)+(n(e,d)|0)+(((a&65535)+b|0)>>>16)|0),a+b<<16|c&65535|0)|0}function Ed(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=a;f=c;c=Dd(e,f)|0;a=r()|0;return (q((n(b,f)|0)+(n(d,e)|0)+a|a&0|0),c|0|0)|0}function Fd(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;f=x;x=x+16|0;i=f|0;h=c>>31|((c|0)<0?-1:0)<<1;g=((c|0)<0?-1:0)>>31|((c|0)<0?-1:0)<<1;k=e>>31|((e|0)<0?-1:0)<<1;j=((e|0)<0?-1:0)>>31|((e|0)<0?-1:0)<<1;a=zd(h^a|0,g^c|0,h|0,g|0)|0;c=r()|0;Bd(a,c,zd(k^d|0,j^e|0,k|0,j|0)|0,r()|0,i)|0;e=zd(b[i>>2]^h|0,b[i+4>>2]^g|0,h|0,g|0)|0;d=r()|0;x=f;return (q(d|0),e)|0}function Gd(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;g=x;x=x+16|0;f=g|0;Bd(a,c,d,e,f)|0;x=g;return (q(b[f+4>>2]|0),b[f>>2]|0)|0}function Hd(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){q(b>>c|0);return a>>>c|(b&(1<<c)-1)<<32-c}q(((b|0)<0?-1:0)|0);return b>>c-32|0}function Id(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){q(b>>>c|0);return a>>>c|(b&(1<<c)-1)<<32-c}q(0);return b>>>c-32|0}function Jd(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){q(b<<c|(a&(1<<c)-1<<32-c)>>>32-c|0);return a<<c}q(a<<c-32|0);return 0}function Kd(c,d,e){c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((e|0)>=8192){u(c|0,d|0,e|0)|0;return c|0}h=c|0;g=c+e|0;if((c&3)==(d&3)){while(c&3){if(!e)return h|0;a[c>>0]=a[d>>0]|0;c=c+1|0;d=d+1|0;e=e-1|0}e=g&-4|0;f=e-64|0;while((c|0)<=(f|0)){b[c>>2]=b[d>>2];b[c+4>>2]=b[d+4>>2];b[c+8>>2]=b[d+8>>2];b[c+12>>2]=b[d+12>>2];b[c+16>>2]=b[d+16>>2];b[c+20>>2]=b[d+20>>2];b[c+24>>2]=b[d+24>>2];b[c+28>>2]=b[d+28>>2];b[c+32>>2]=b[d+32>>2];b[c+36>>2]=b[d+36>>2];b[c+40>>2]=b[d+40>>2];b[c+44>>2]=b[d+44>>2];b[c+48>>2]=b[d+48>>2];b[c+52>>2]=b[d+52>>2];b[c+56>>2]=b[d+56>>2];b[c+60>>2]=b[d+60>>2];c=c+64|0;d=d+64|0}while((c|0)<(e|0)){b[c>>2]=b[d>>2];c=c+4|0;d=d+4|0}}else{e=g-4|0;while((c|0)<(e|0)){a[c>>0]=a[d>>0]|0;a[c+1>>0]=a[d+1>>0]|0;a[c+2>>0]=a[d+2>>0]|0;a[c+3>>0]=a[d+3>>0]|0;c=c+4|0;d=d+4|0}}while((c|0)<(g|0)){a[c>>0]=a[d>>0]|0;c=c+1|0;d=d+1|0}return h|0}function Ld(c,d,e){c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;h=c+e|0;d=d&255;if((e|0)>=67){while(c&3){a[c>>0]=d;c=c+1|0}f=h&-4|0;i=d|d<<8|d<<16|d<<24;g=f-64|0;while((c|0)<=(g|0)){b[c>>2]=i;b[c+4>>2]=i;b[c+8>>2]=i;b[c+12>>2]=i;b[c+16>>2]=i;b[c+20>>2]=i;b[c+24>>2]=i;b[c+28>>2]=i;b[c+32>>2]=i;b[c+36>>2]=i;b[c+40>>2]=i;b[c+44>>2]=i;b[c+48>>2]=i;b[c+52>>2]=i;b[c+56>>2]=i;b[c+60>>2]=i;c=c+64|0}while((c|0)<(f|0)){b[c>>2]=i;c=c+4|0}}while((c|0)<(h|0)){a[c>>0]=d;c=c+1|0}return h-e|0}function Md(a){a=a|0;var c=0,d=0,f=0;f=t()|0;d=b[e>>2]|0;c=d+a|0;if((a|0)>0&(c|0)<(d|0)|(c|0)<0){w(c|0)|0;s(12);return -1}if((c|0)>(f|0))if(!(v(c|0)|0)){s(12);return -1}b[e>>2]=c;return d|0}

// EMSCRIPTEN_END_FUNCS
return{_GS_curve:Z,_GS_error:aa,_GS_exportGroupPrivKey:O,_GS_exportGroupPubKey:P,_GS_exportUserCredentials:R,_GS_failure:$,_GS_finishJoin:M,_GS_getSignatureTag:W,_GS_getStateSize:X,_GS_initState:F,_GS_loadGroupPrivKey:I,_GS_loadGroupPubKey:J,_GS_loadUserCredentials:N,_GS_processJoin:S,_GS_seed:G,_GS_setupGroup:H,_GS_sign:T,_GS_startJoin:L,_GS_success:_,_GS_verify:U,_GS_version:Y,___divdi3:Cd,___errno_location:xd,___muldi3:Ed,___remdi3:Fd,___uremdi3:Gd,_bitshift64Ashr:Hd,_bitshift64Lshr:Id,_bitshift64Shl:Jd,_free:wd,_i64Add:yd,_i64Subtract:zd,_malloc:vd,_memcpy:Kd,_memset:Ld,_sbrk:Md,establishStackSpace:D,stackAlloc:A,stackRestore:C,stackSave:B}})


// EMSCRIPTEN_END_ASM
(asmGlobalArg,asmLibraryArg,buffer);var _GS_curve=Module["_GS_curve"]=asm["_GS_curve"];var _GS_error=Module["_GS_error"]=asm["_GS_error"];var _GS_exportGroupPrivKey=Module["_GS_exportGroupPrivKey"]=asm["_GS_exportGroupPrivKey"];var _GS_exportGroupPubKey=Module["_GS_exportGroupPubKey"]=asm["_GS_exportGroupPubKey"];var _GS_exportUserCredentials=Module["_GS_exportUserCredentials"]=asm["_GS_exportUserCredentials"];var _GS_failure=Module["_GS_failure"]=asm["_GS_failure"];var _GS_finishJoin=Module["_GS_finishJoin"]=asm["_GS_finishJoin"];var _GS_getSignatureTag=Module["_GS_getSignatureTag"]=asm["_GS_getSignatureTag"];var _GS_getStateSize=Module["_GS_getStateSize"]=asm["_GS_getStateSize"];var _GS_initState=Module["_GS_initState"]=asm["_GS_initState"];var _GS_loadGroupPrivKey=Module["_GS_loadGroupPrivKey"]=asm["_GS_loadGroupPrivKey"];var _GS_loadGroupPubKey=Module["_GS_loadGroupPubKey"]=asm["_GS_loadGroupPubKey"];var _GS_loadUserCredentials=Module["_GS_loadUserCredentials"]=asm["_GS_loadUserCredentials"];var _GS_processJoin=Module["_GS_processJoin"]=asm["_GS_processJoin"];var _GS_seed=Module["_GS_seed"]=asm["_GS_seed"];var _GS_setupGroup=Module["_GS_setupGroup"]=asm["_GS_setupGroup"];var _GS_sign=Module["_GS_sign"]=asm["_GS_sign"];var _GS_startJoin=Module["_GS_startJoin"]=asm["_GS_startJoin"];var _GS_success=Module["_GS_success"]=asm["_GS_success"];var _GS_verify=Module["_GS_verify"]=asm["_GS_verify"];var _GS_version=Module["_GS_version"]=asm["_GS_version"];var ___divdi3=Module["___divdi3"]=asm["___divdi3"];var ___errno_location=Module["___errno_location"]=asm["___errno_location"];var ___muldi3=Module["___muldi3"]=asm["___muldi3"];var ___remdi3=Module["___remdi3"]=asm["___remdi3"];var ___uremdi3=Module["___uremdi3"]=asm["___uremdi3"];var _bitshift64Ashr=Module["_bitshift64Ashr"]=asm["_bitshift64Ashr"];var _bitshift64Lshr=Module["_bitshift64Lshr"]=asm["_bitshift64Lshr"];var _bitshift64Shl=Module["_bitshift64Shl"]=asm["_bitshift64Shl"];var _free=Module["_free"]=asm["_free"];var _i64Add=Module["_i64Add"]=asm["_i64Add"];var _i64Subtract=Module["_i64Subtract"]=asm["_i64Subtract"];var _malloc=Module["_malloc"]=asm["_malloc"];var _memcpy=Module["_memcpy"]=asm["_memcpy"];var _memset=Module["_memset"]=asm["_memset"];var _sbrk=Module["_sbrk"]=asm["_sbrk"];var establishStackSpace=Module["establishStackSpace"]=asm["establishStackSpace"];var stackAlloc=Module["stackAlloc"]=asm["stackAlloc"];var stackRestore=Module["stackRestore"]=asm["stackRestore"];var stackSave=Module["stackSave"]=asm["stackSave"];Module["asm"]=asm;if(memoryInitializer){if(!isDataURI(memoryInitializer)){memoryInitializer=locateFile(memoryInitializer)}if(ENVIRONMENT_IS_NODE||ENVIRONMENT_IS_SHELL){var data=Module["readBinary"](memoryInitializer);HEAPU8.set(data,GLOBAL_BASE)}else{addRunDependency("memory initializer");var applyMemoryInitializer=function(data){if(data.byteLength)data=new Uint8Array(data);HEAPU8.set(data,GLOBAL_BASE);if(Module["memoryInitializerRequest"])delete Module["memoryInitializerRequest"].response;removeRunDependency("memory initializer")};var doBrowserLoad=function(){Module["readAsync"](memoryInitializer,applyMemoryInitializer,function(){throw"could not load memory initializer "+memoryInitializer})};var memoryInitializerBytes=tryParseAsDataURI(memoryInitializer);if(memoryInitializerBytes){applyMemoryInitializer(memoryInitializerBytes.buffer)}else if(Module["memoryInitializerRequest"]){var useRequest=function(){var request=Module["memoryInitializerRequest"];var response=request.response;if(request.status!==200&&request.status!==0){var data=tryParseAsDataURI(Module["memoryInitializerRequestURL"]);if(data){response=data.buffer}else{console.warn("a problem seems to have happened with Module.memoryInitializerRequest, status: "+request.status+", retrying "+memoryInitializer);doBrowserLoad();return}}applyMemoryInitializer(response)};if(Module["memoryInitializerRequest"].response){setTimeout(useRequest,0)}else{Module["memoryInitializerRequest"].addEventListener("load",useRequest)}}else{doBrowserLoad()}}}Module["then"]=function(func){if(Module["calledRun"]){func(Module)}else{var old=Module["onRuntimeInitialized"];Module["onRuntimeInitialized"]=function(){if(old)old();func(Module)}}return Module};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller};function run(args){args=args||Module["arguments"];if(runDependencies>0){return}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}if(what!==undefined){out(what);err(what);what=JSON.stringify(what)}else{what=""}ABORT=true;EXITSTATUS=1;throw"abort("+what+"). Build with -s ASSERTIONS=1 for more info."}Module["abort"]=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}Module["noExitRuntime"]=true;run();



  return ModuleAsmjs
}
);
})();
if (true)
      module.exports = ModuleAsmjs;
    else {}
    
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), "/", __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/anonymous-credentials/lib/asmjs.js":
/*!*********************************************************!*\
  !*** ./node_modules/anonymous-credentials/lib/asmjs.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const { initModule } = __webpack_require__(/*! ./util */ "./node_modules/anonymous-credentials/lib/util.js");

let initPromise;
module.exports = () => {
  if (!initPromise) {
    initPromise = initModule(__webpack_require__(/*! ../dist/group-sign-asmjs */ "./node_modules/anonymous-credentials/dist/group-sign-asmjs.js"));
  }
  return initPromise;
};


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

/******/ });//# sourceMappingURL=http://localhost:4300/modules/hpnv2/worker.asmjs.bundle.js.map