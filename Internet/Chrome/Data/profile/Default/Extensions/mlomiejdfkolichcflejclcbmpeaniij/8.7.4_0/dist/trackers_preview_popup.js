"undefined"!=typeof browser&&(chrome=browser),function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1396)}({137:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"b",(function(){return s}));var o=n(55);const r={advertising:"#cb55cd",audio_video_player:"#ef671e",cdn:"#43b7c5",customer_interaction:"#fdc257",essential:"#fc9734",misc:"#ecafc2",site_analytics:"#87d7ef",social_media:"#388ee8",hosting:"#e8e8e8",pornvertising:"#fb5b8b",extensions:"#e2e781",comments:"#b0a8ff",unknown:"#959595",default:"#ffffff30",no_tracker:"#94c59e"},i=["advertising","site_analytics","cdn","audio_video_player","misc","essential","social_media","hosting","customer_interaction","pornvertising","extensions","comments","unknown"],s={get advertising(){return o.c`Advertising | Ghostery organizes tags by category. This is one of several tag categories.`},get audio_video_player(){return o.c`Audio/Video Player | Ghostery organizes tags by category. This is one of several tag categories.`},get cdn(){return o.c`CDN | Ghostery organizes tags by category. This is one of several tag categories.`},get comments(){return o.c`Comments | Ghostery organizes tags by category. This is one of several tag categories.`},get customer_interaction(){return o.c`Customer Interaction | Ghostery organizes tags by category. This is one of several tag categories.`},get email(){return o.c`Email | Ghostery organizes tags by category. This is one of several tag categories.`},get essential(){return o.c`Essential | Ghostery organizes tags by category. This is one of several tag categories.`},get extensions(){return o.c`Extensions | Ghostery organizes tags by category. This is one of several tag categories.`},get hosting(){return o.c`Hosting | Ghostery organizes tags by category. This is one of several tag categories.`},get misc(){return o.c`Miscellaneous | Ghostery organizes tags by category. This is one of several tag categories.`},get pornvertising(){return o.c`Adult Advertising | Ghostery organizes tags by category. This is one of several tag categories.`},get site_analytics(){return o.c`Site Analytics | Ghostery organizes tags by category. This is one of several tag categories.`},get social_media(){return o.c`Social Media | Ghostery organizes tags by category. This is one of several tag categories.`},get unknown(){return o.c`Unknown | Ghostery organizes tags by category. This is one of several tag categories.`}}},1396:function(e,t,n){e.exports=n(1421)},1421:function(e,t,n){"use strict";n.r(t);var o={};n.r(o),n.d(o,"set",(function(){return D})),n.d(o,"resolve",(function(){return B}));var r=n(18);const i=new WeakMap,s=new Set;function a(){try{s.forEach(e=>{try{i.get(e)(),s.delete(e)}catch(t){throw s.delete(e),t}})}catch(e){throw s.size&&a(),e}}function c(e){i.has(e)&&(s.size||r.a.requestAnimationFrame(a),s.add(e))}const l=new WeakMap,d=new WeakSet;function u(e,t){let n=l.get(e);n||(n=new Map,l.set(e,n));let o=n.get(t);return o||(o={target:e,key:t,value:void 0,lastValue:void 0,contexts:new Set,deps:new Set,state:0,depState:0,resolved:!1},n.set(t,o)),o}function g(e){e.contexts.forEach(t=>{d.has(t.target)&&(Object.assign(t,{depState:0,resolved:!1}),e.contexts.delete(t),g(t))})}function f(e){e.resolved=!1,d.has(e.target)||c(e),g(e),e.contexts.forEach(f)}let h=null;const p=new Set;function b(e,t,n){const o=u(e,t);if(h&&!d.has(h.target)&&(h.deps.add(o),o.contexts.add(h)),!d.has(e)){if(g(o),o.resolved)return o.value;if(o.depState>o.state){let e=o.state;for(const t of o.deps){if(t.target[t.key],!t.resolved){e=!1;break}e+=t.state}if(e&&e===o.depState)return o.resolved=!0,o.value}}const r=h;try{if(p.has(o))throw Error(`Circular get invocation is forbidden: '${t}'`);o.deps.forEach(e=>{e.contexts.delete(o)}),o.deps.clear(),h=o,p.add(o);const i=n(e,o.value);h=r,i!==o.value&&(o.value=i,o.state+=1);let s=o.state;o.deps.forEach(e=>{s+=e.state}),o.depState=s,o.resolved=!d.has(e),p.delete(o)}catch(e){throw h=r,p.delete(o),o.resolved=!1,h&&!d.has(h)&&(h.deps.delete(o),o.contexts.delete(h)),e}return o.value}const m=new Set;function w(e,t){e.depState=0,f(e),t.clearValue&&(e.value=void 0,e.lastValue=void 0),t.deleteEntry&&function(e){m.size||r.a.requestAnimationFrame(()=>{m.forEach(e=>{if(0===e.contexts.size){e.deps.forEach(t=>{t.contexts.delete(e)});l.get(e.target).delete(e.key)}}),m.clear()}),m.add(e)}(e),t.force&&(e.state+=1)}function v(e,t,n={}){if(p.size)throw Error(`Invalidating property in chain of get calls is forbidden: '${t}'`);w(u(e,t),n)}function y(e,t,n,o){const r=u(e,t);return function(e,t){return i.set(e,t),c(e),function(){s.delete(e),i.delete(e)}}(r,()=>{const i=b(e,t,n);i!==r.lastValue&&(o(e,i,r.lastValue),r.lastValue=i)})}function x(e){d.add(e)}var k=n(72);const j=new WeakMap,E=new WeakMap,N=new WeakMap;class $ extends r.a.HTMLElement{constructor(){super();const e=j.get(this.constructor);for(let t=0;t<e.length;t+=1){const n=e[t];if(hasOwnProperty.call(this,n)){const e=this[n];delete this[n],this[n]=e}}x(this)}connectedCallback(){var e;e=this,d.delete(e);const t=N.get(this.constructor),n=[];for(let e=0;e<t.length;e+=1){const o=t[e](this);o&&n.push(o)}E.set(this,n)}disconnectedCallback(){x(this);const e=E.get(this);for(let t=0;t<e.length;t+=1)e[t]()}}function M(e,t){return{get:t?t=>{const n=e(t),o=t.shadowRoot||t.attachShadow({mode:"open",delegatesFocus:e.delegatesFocus||!1});return()=>(n(t,o),o)}:t=>{const n=e(t);return()=>(n(t,t),t)},observe(e,t){t()}}}const O={string:String,number:Number,boolean:Boolean,undefined:e=>e};function S(e,t){if(t){if(e===t.hybrids)return t;j.get(t).forEach(e=>{delete t.prototype[e]})}else t=class extends ${};t.hybrids=e;const n=[],o=Object.keys(e);return N.set(t,n),j.set(t,o),o.forEach(o=>{if("tag"===o)return;let r=e[o];const i=typeof r;if("function"===i)r="render"===o?M(r,!0):"content"===o?M(r):{get:r};else if("object"!==i||null===r)r={value:r};else if(r.set){const e=Object(k.a)(o),t=r.get||((e,t)=>t);r.get=(n,o)=>(void 0===o&&(o=r.set(n,n.getAttribute(e)||o)),t(n,o))}if(hasOwnProperty.call(r,"value"))r=function(e,t){const n=typeof t.value,o=O[n];if(!o)throw TypeError(`Invalid default value for '${e}' property - it must be a string, number, boolean or undefined: ${n}`);const r=t.value,i=Object(k.a)(e),s=(e,t)=>(!t&&0!==t||"object"==typeof t&&void 0===t.toString()?e.removeAttribute(i):e.setAttribute(i,"boolean"===n?"":t),t);return{get:(e,t)=>{if(void 0===t){if(!e.hasAttribute(i))return r;t=o("boolean"===n||e.getAttribute(i))}return t},set:"undefined"!==n?(e,t)=>s(e,o(t)):(e,t)=>t,connect:"undefined"!==n?(n,o,a)=>(n.hasAttribute(i)||n[e]!==r||s(n,r),t.connect&&t.connect(n,o,a)):t.connect,observe:t.observe}}(o,r);else if(!r.get)throw TypeError(`Invalid descriptor for '${o}' property - it must contain 'value' or 'get' option`);Object.defineProperty(t.prototype,o,{get:function(){return b(this,o,r.get)},set:r.set&&function(e){!function(e,t,n,o){const r=u(e,t),i=n(e,o,r.value);i!==r.value&&(r.value=i,r.state+=1,r.depState=0,f(r))}(this,o,r.set,e)},enumerable:!0,configurable:!0}),r.observe&&n.unshift(e=>y(e,o,r.get,r.observe)),r.connect&&n.push(e=>r.connect(e,o,(function(t){v(e,o,{force:"object"==typeof t&&!0===t.force})})))}),t}const T=new Map;var C=Object.freeze(Object.assign((function(e){if(!e.tag)throw TypeError("Error while defining hybrids: 'tag' property with dashed tag name is required");const t=r.a.customElements.get(e.tag);if(t){if(t.hybrids)return function(e){T.size||k.b.then(()=>{Object(k.f)(r.a.document.body,e=>{if(T.has(e.constructor)){const t=T.get(e.constructor),n=e.constructor.hybrids;e.disconnectedCallback(),Object.keys(n).forEach(o=>{const r=typeof n[o],i="object"!==r&&"function"!==r&&n[o]!==t[o];v(e,o,{clearValue:i})}),e.connectedCallback()}}),T.clear()}),T.set(e,e.hybrids)}(t),S(e,t),Object.freeze(e);throw TypeError(`Custom element with '${e.tag}' tag name already defined outside of the hybrids context`)}return r.a.customElements.define(e.tag,S(e)),Object.freeze(e)}),{compile:e=>S(e)})),z=n(203),F=n(30),_=n(205);function A({target:e,detail:t},n){let o;switch(e.type){case"radio":case"checkbox":o=e.checked&&e.value;break;case"file":o=e.files;break;default:o=t&&hasOwnProperty.call(t,"value")?t.value:e.value}n(o)}function P(e,t){return e.split(".").reverse().reduce((e,n)=>e?{[n]:e}:{[n]:t},null)}const W=new Map,L=new WeakMap;function D(e,t){if(!e)throw Error("The first argument must be a property name or an object instance: "+e);if("object"==typeof e){if(void 0===t)throw Error("For model instance property the second argument must be defined");const n=k.d.get(e);if(!n)throw Error("Provided object must be a model instance of the store");return null===t?()=>{n.set(e,null)}:(o,i)=>{A(i,o=>{const i=L.get(e);i||r.a.requestAnimationFrame(()=>{const t=L.get(e);L.delete(e),n.set(e,t).catch(()=>{})}),L.set(e,{...i,...P(t,o)})})}}if(2===arguments.length)return n=>{n[e]=t};let n=W.get(e);return n||(n=(t,n)=>{A(n,n=>{t[e]=n})},W.set(e,n)),n}const V=new WeakMap;function B(e,t,n=200){return(o,i)=>{let s;t&&(s=setTimeout(()=>{s=void 0,r.a.requestAnimationFrame(()=>{t(o,i)})},n)),V.set(i,e),e.then(t=>{s&&clearTimeout(s),V.get(i)===e&&(Object(_.a)(o,i,t),V.set(i,null))})}}const H=Object(F.b)(),R=Object(F.b)("svg"),G=/@import/,I=new Map,q=new WeakMap,X={key(e){return this.id=e,this},style(...e){return q.set(this,(q.get(this)||[]).concat(e.filter(e=>e))),this},css(e,...t){return q.set(this,(q.get(this)||[]).concat(e.reduce((e,n,o)=>`${e}${n}${t[o]||""}`,""))),this}};function Z(e,t,n){const o=(r,i=r)=>{const s=q.get(o);let a,c=e.join(H);if(s){const e=s.join(H);a=!!i.adoptedStyleSheets&&!G.test(e),a||(c+=e)}n&&(c+=R);let l=I.get(c);l||(l=Object(z.a)(e,n,!a&&s),I.set(c,l)),l(r,i,t,a&&s)};return Object.assign(o,X)}function U(e,...t){return Z(e,t)}Object.assign(U,o),Object.assign((function(e,...t){return Z(e,t,!0)}),o);var Q=n(137);C({tag:"ui-category-bullet",category:"unknown",size:0,render:({category:e,size:t})=>{const n=t+"px";return U`
      <span
        style=${{width:n,height:n,backgroundColor:Q.a[e],borderRadius:n,display:"inline-block"}}
      ></span>
    `}});const J={ads:U`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M10.9572 4H21.0429L28.1808 11.1379V21.2236L21.0429 28.3616H10.9572L3.81921 21.2236V11.1379L10.9572 4Z" stroke="currentColor" stroke-width="2.40816" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.69495 7.87573L24.3051 24.4859" stroke="currentColor" stroke-width="2.41"/>
    </svg>
  `,annoyances:U`
    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
      <path d="M11.6679 8.13889H4V27.7445H25.3518V23.9963V18.5183" stroke="currentColor" stroke-width="2.41" stroke-linejoin="round"/>
      <rect x="10.6499" y="4.25563" width="18.3501" height="15.4681" stroke="currentColor" stroke-width="2.41" stroke-linejoin="round" stroke-dasharray="2.41 1.41"/>
    </svg>
  `,"chevron-right":U`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>`,"chevron-left":U`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>`,"chevron-down":U`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>`,close:U`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
      <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>`,"external-link":U`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>`,logo:U`
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
      <g fill="none" fill-rule="evenodd">
        <path d="M16.415 9.158c0 3.493-2.94 6.325-6.566 6.325-3.627 0-6.567-2.832-6.567-6.325 0-3.494 2.94-6.326 6.566-6.326 3.625 0 6.565 2.832 6.565 6.326" fill="#FFF"/>
        <path d="M18.65 17.774c-.91-1.995-1.067-3.686-1.09-4.35V7.96C17.56 3.783 13.992.4 9.594.4 5.195.4 1.63 3.783 1.63 7.96v5.543c-.034.715-.213 2.354-1.087 4.27-1.176 2.578-.203 2.27.668 2.06.873-.212 2.818-1.04 3.426-.02.608 1.018 1.115 1.903 2.533 1.326s2.086-.77 2.29-.77h.274c.202 0 .87.193 2.29.77 1.418.576 1.925-.31 2.533-1.328.607-1.02 2.553-.19 3.424.02.873.212 1.845.52.67-2.058" fill="#FFF"/>
        <path d="M7.136 4.52c.858 0 1.554 1.046 1.554 2.335 0 1.288-.696 2.333-1.554 2.333-.857 0-1.553-1.045-1.553-2.333 0-1.29.696-2.334 1.553-2.334M9.595 13.847c-1.89 0-3.482-1.765-3.96-3.73.925 1.208 2.354 1.985 3.96 1.985 1.605 0 3.035-.777 3.96-1.985-.48 1.965-2.07 3.73-3.96 3.73M12.053 9.188c-.858 0-1.553-1.045-1.553-2.333 0-1.29.695-2.334 1.553-2.334.86 0 1.553 1.046 1.553 2.335 0 1.288-.694 2.333-1.553 2.333" fill="#00AEF0"/>
      </g>
    </svg>
  `,settings:U`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>`,tracking:U`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M15.9999 29.0097C15.9999 29.0097 27.0027 23.682 27.0027 15.6905V6.36707L15.9999 2.37132L4.99713 6.36707V15.6905C4.99713 23.682 15.9999 29.0097 15.9999 29.0097Z" stroke="currentColor" stroke-width="2.40816" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `};C({tag:"ui-icon",name:"",render:({name:e})=>(J[e]||U``).css`
    :host { display: inline-flex; justify-content: center; align-items: center }
    :host([hidden]) { display: none; }

    svg {
      max-width: 100%;
      max-height: 100%;
    }
   `}),C({tag:"ui-header",domain:"",render:({domain:e})=>U`
    <a target="_blank" href="https://www.ghostery.com">
      <ui-icon name="logo"></ui-icon>
    </a>
    <span class="domain-name">${e}</span>
    <slot></slot>
    <div class="notch"></div>
  `.css`
     :host {
       flex-shrink: 0;
       background-color: var(--ui-ghostery);
       color: white;
       display: flex;
       flex-direction: row;
       align-items: center;
       padding: 9px 12px;
       position: relative;
       overflow: hidden;
     }
 
     .notch {
       background-color: #F8F6F6;
       border-radius: 3px;
       transform: rotate(45deg);
       width: 18px;
       height: 18px;
       bottom: -12px;
       position: absolute;
       left: calc(50% - 10px);
     }
 
     a {
       display: flex;
       align-items: center;
       justify-content: center;
       text-decoration: none;
     }
 
     .domain-name {
       text-overflow: ellipsis;
       white-space: nowrap;
       overflow: hidden;
       flex-grow: 1;
       font-size: 15px;
       text-align: center;
     }
 
     ::slotted(a) {
       color: white;
     }
   `}),C({tag:"ui-page-load",loadTime:{get:(e,t=0)=>t,set:(e,t)=>Math.round(t)},color:({loadTime:e})=>e<100?"#779D3E":e<500?"#BB9556":"#8D4144",render:({loadTime:e,color:t})=>U`
    <div class="info">Page Load:</div>
    <div class="circle">
      <svg
        width="73"
        height="72"
        viewBox="0 0 73 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="36.5003"
          cy="36.2249"
          r="30.7273"
          stroke="currentColor"
          stroke-width="10"
          stroke-dasharray="1 3"
        />
      </svg>
      <strong>${e}</strong>
    </div>
    <div></div>
  `.css`
     :host {
       display: grid;
       grid-template-columns: 1fr 1fr 1fr;
       margin-top: 13px;
     }
 
     .info {
       display: flex;
       align-items: center;
       justify-content: center;
       text-transform: uppercase;
       color: var(--ui-black);
       font-size: 13px;
     }
 
     .circle {
       display: flex;
       position: relative;
       align-items: center;
       justify-content: center;
     }
 
     .circle {
       color: ${0!==e?t:"var(--ui-text)"};
     }
 
     .circle::after {
       content: 'ms';
       display: block;
       position: absolute;
       top: calc(50% - 7px);
       font-size: 13px;
       line-height: 13px;
       right: -6px;
       color: var(--ui-black);
     }
 
     strong {
       display: block;
       position: absolute;
       top: calc(50% - 12px);
       color: var(--ui-black);
       font-size: 18px;
       line-height: 25px;
       font-weight: 600;
       text-align: center;
     }
   `}),C({tag:"ui-stats",categories:void 0,entries:({categories:e})=>Object.entries((e||[]).reduce((e,t)=>({...e,[t]:(e[t]||0)+1}),{})).sort((e,t)=>Q.c.indexOf(e[0])-Q.c.indexOf(t[0])),render:({categories:e,entries:t})=>U`
    <ui-tracker-wheel categories="${e}"></ui-tracker-wheel>

    <ul>
      ${t.map(([e,t])=>U`
          <li class="category">
            <ui-category-bullet
              category="${e}"
              size="7"
            ></ui-category-bullet>
            <span>${Q.b[e]}</span>
            <strong>${t}</strong>
          </li>
        `)}
    </ul>
  `.css`
     :host {
       display: grid;
       grid-template-columns: 1fr 1fr;
       column-gap: 10px;
       padding: 10px 0px;
     }
 
     ul {
       display: flex;
       flex-direction: column;
       justify-content: center;
       margin: 0;
       padding: 0;
       list-style-type: none;
       list-style: none none inside;
     }
 
     .category {
       display: grid;
       grid-template-columns: min-content max-content 1fr;
       grid-gap: 5px;
       margin-bottom: 5px;
     }
 
     .category span {
       font-size: 13px;
       line-height: 16px;
     }
 
     .category strong {
       color: var(--ui-black);
       font-size: 13px;
       font-weight: 500;
       line-height: 16px;
     }
    `});var K=n(55),Y=(C({tag:"ui-toggle-switch",name:"",label:"",disabled:!1,render:({name:e,label:t,disabled:n})=>U`
    <button class=${{disabled:n}}>
      <ui-icon name="${e}"></ui-icon>
      ${t}
    </button>
  `.css`
    button {
      box-sizing: border-box;
      background-color: white;
      border-radius: 10px;
      padding: 7px 8px;
      border: 0px;
      cursor: pointer;
      height: 100%;
      width: 100%;
      font-family: inherit;
      font-size: inherit;
      text-align: left;
      white-space: wrap;
      box-shadow: -2px -4px 6px rgba(255, 255, 255, 0.64), 0px 2px 4px rgba(0, 0, 0, 0.1);
      border: 0.5px solid #D0D0D0;
      color: var(--ui-black);
      display: flex;
      flex-direction: column;
      position: relative;
    }

    button::before {
      content: '${K.c`On`}';
      display: block;
      text-transform: uppercase;
      color: var(--ui-deep-blue);
      position: absolute;
      top: 10px;
      right: 8px;
    }

    button ui-icon {
      color: var(--ui-deep-blue);
      margin-bottom: 5px;
    }

    button.disabled ui-icon {
      color: #C1C1C1;
    }

    button.disabled {
      background: #F8F8F8;
      border: 0.5px solid #D0D0D0;
      color: #808080;
      box-shadow: none;
    }

    button.disabled::before {
      color: #C1C1C1;
      content: '${K.c`Off`}';
    }
  `}),n(284));C({tag:"ui-tracker-wheel",categories:void 0,size:150,canvas:({categories:e,size:t})=>{if(!e)return null;const n=document.createElement("canvas"),o=n.getContext("2d");return o.imageSmoothingQuality="high",Object(Y.a)(o,t,0===e.length?["unknown"]:e),n},render:({categories:e,canvas:t,size:n})=>U`
    ${t}
    <strong>${e&&e.length}</strong>
  `.css`
     :host {
       align-self: center;
       position: relative;
       display: flex;
       width: ${n}px;
       height: ${n}px;
       flex-shrink: 0;
       justify-content: center;
       align-items: center;
     }
 
     canvas {
       position: absolute;
       top: 0px;
       left: 0px;
 
       /* all four are needed to support the most browsers */
       image-rendering: -moz-crisp-edges;
       image-rendering: -webkit-crisp-edges;
       image-rendering: pixelated;
       image-rendering: crisp-edges;
     }
 
     strong {
       color: var(--ui-black);
       font-weight: 500;
       font-size: 40px;
     }
   `});"object"==typeof chrome&&chrome.i18n&&Object(K.b)(chrome.i18n.getMessage.bind(chrome.i18n),{format:"chrome.i18n"});const ee=new URLSearchParams(window.location.search).get("domain"),te=new Promise((e,t)=>{chrome.runtime.sendMessage({action:"getWTMReport",links:["https://"+ee]},n=>{chrome.runtime.lastError?t(chrome.runtime.lastError):e(n.wtmStats[0])})});function ne(){window.parent.postMessage("WTMReportClosePopups","*")}function oe(){window.parent.postMessage("WTMReportDisable","*")}const re=C({tag:"wtm-trackers-preview",confirmDisabled:!1,render:({confirmDisabled:e})=>U`
    <ui-header domain=${ee}>
      <button class="svg-button" onclick="${ne}">
        <ui-icon name="close"></ui-icon>
      </button>
    </ui-header>

    <main>
      <h1>Trackers Preview</h1>

      ${U.resolve(te.then(e=>U`<ui-stats categories=${e.stats}></ui-stats>`))}

      <section class="buttons">
        <a target="_blank" href="https://whotracks.me/websites/${ee}.html">
          Statistical Report <ui-icon name="external-link"></ui-icon>
        </a>
      </section>
    </main>
    <footer>
      ${e?U`
            <span>Are you sure?</span>
            <button onclick="${oe}">Disable Trackers Preview</button>
            <button onclick="${U.set("confirmDisabled",!1)}">
              Cancel
            </button>
          `:U`
            <button onclick="${U.set("confirmDisabled",!0)}">
              Disable Trackers Preview
            </button>
          `}
    </footer>
  `.css`
    :host {
      height: 100%;
      display: block;
      margin: 0 auto;
      background-color: #F8F8F8;
    }

    panel-header {
      position: fixed;
      top: 0px;
      width: 100%;
      box-sizing: border-box;
    }

    main {
      padding: 12px;
      background-color: #F8F8F8;
    }

    h1 {
      font-size: 16px;
      text-align: center;
      color: var(--ui-black);
      white-space: nowrap;
      font-weight: 600;
      margin: 6px 0;
    }

    .svg-button {
      padding: 0;
      color: white;
      background: none;
      border: 0;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 22px;
      width: 22px;
    }

    .svg-button ui-icon {
      height: 16px;
      width: 16px;
    }

    .buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 10px;
      margin-top: 10px;
    }

    .buttons a {
      color: var(--ui-deep-blue);
      padding: 10px 17px;
      flex: 1;
      text-align: center;
      cursor: pointer;
      text-decoration: none;
      background: #FFFFFF;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.05);
      border-radius: 7.4px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
    }

    .buttons a ui-icon {
      width: 10px;
      height: 10px;
      margin-left: 3px;
    }

    footer {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 9px 6px;
    }

    footer button, footer span {
      background: none;
      border: none;
      color: var(--ui-text);
      padding: 0;
      margin: 0;
      font-size: 11.5px;
      white-space: nowrap;
      margin: 0 3px;
      padding: 0 3px;
    }

    footer button {
      cursor: pointer;
    }

    footer button:hover {
      text-decoration: underline;
    }

    footer button svg {
      width: 10px;
      height: 10px;
    }
  `});!function(){let e=0;new ResizeObserver(()=>{if(e>0){const e=document.body.clientHeight;window.parent.postMessage("WTMReportResize:"+e,"*")}e+=1}).observe(document.querySelector(re.tag),{box:"border-box"})}()},18:function(e,t,n){"use strict";var o;t.a="object"==typeof window?window:(o=globalThis,"requestAnimationFrame"in(o=Object.create(o))||Object.defineProperty(o,"requestAnimationFrame",{value:function(e){return setTimeout(e,0)}}),"HTMLElement"in o||Object.defineProperty(o,"HTMLElement",{value:class{constructor(){throw Error("Current context does not support defining custom elements")}}}),o)},203:function(e,t,n){"use strict";n.d(t,"a",(function(){return x}));var o=n(18),r=n(72),i=n(55),s=n(30),a=n(205);const c=new WeakMap;const l=new WeakMap;function d(e,t,n){const o=l.get(t)||new Set,r=function(e,t=new Set){return Array.isArray(e)?e.forEach(e=>t.add(e)):null!==e&&"object"==typeof e?Object.keys(e).forEach(n=>e[n]&&t.add(n)):t.add(e),t}(n);l.set(t,r),r.forEach(e=>{t.classList.add(e),o.delete(e)}),o.forEach(e=>{t.classList.remove(e)})}const u=new WeakMap;function g(e,t,n){if(null===n||"object"!=typeof n)throw TypeError(`Style value must be an object in ${Object(r.e)(t)}:`,n);const o=u.get(t)||new Map,i=Object.keys(n).reduce((e,i)=>{const s=Object(r.a)(i),a=n[i];return a||0===a?t.style.setProperty(s,a):t.style.removeProperty(s),e.set(s,a),o.delete(s),e},new Map);o.forEach((e,n)=>{t.style[n]=""}),u.set(t,i)}function f(e,t,n){if("on"===t.substr(0,2)){return function(e){return(t,n,o,r)=>{if(r){const t=c.get(n);t&&n.removeEventListener(e,t.get(r),void 0!==r.options&&r.options)}if(o){if("function"!=typeof o)throw Error("Event listener must be a function: "+typeof o);let r=c.get(n);r||(r=new WeakMap,c.set(n,r));const i=o.bind(null,t);r.set(o,i),n.addEventListener(e,i,void 0!==o.options&&o.options)}}}(t.substr(2))}switch(e){case"class":return d;case"style":return g;default:{let r=!1;return(i,s,a)=>{if(r=r||!n&&!(s instanceof o.a.SVGElement)&&t in s,r)s[t]=a;else if(!1===a||null==a)s.removeAttribute(e);else{const t=!0===a?"":String(a);s.setAttribute(e,t)}}}}}const h=Object(s.b)("(\\d+)"),p=new RegExp(`^${h}$`),b=new RegExp(h,"g"),m=/^[${}0-9 \t\n\f\r]+$/;function w(e){return o.a.document.createTreeWalker(e,o.a.NodeFilter.SHOW_ELEMENT|o.a.NodeFilter.SHOW_TEXT,null,!1)}const v=new Map;function y(e,t){const n=Object(s.b)(t);return""+function(e,t=0){let n=(e=e.replace(/(^[\n\s\t ]+)|([\n\s\t ]+$)+/g,"")).indexOf("\n");if(n>-1){let o=0-t-2;for(n+=1;" "===e[n]&&n<e.length;n+=1)o+=1;return e.replace(/\n +/g,e=>e.substr(0,Math.max(e.length-o,1)))}return e}(e).split("\n").filter(e=>e).map(e=>{const t=e.indexOf(n);return t>-1?`| ${e}\n--${"-".repeat(t)}${"^".repeat(6)}`:"| "+e}).join("\n").replace(b,"${...}")}function x(e,t,n,c=!0){const l=o.a.document.createElement("template"),d=[],u=function(e,t){let n=e.reduce((t,n,o)=>0===o?n:e.slice(o).join("").match(/^\s*<\/\s*(table|tr|thead|tbody|tfoot|colgroup)>/)?`${t}\x3c!--${Object(s.b)(o-1)}--\x3e${n}`:t+Object(s.b)(o-1)+n,"");return t&&(n+=`<style>\n${t.join("\n/*------*/\n")}\n</style>`),n}(e,n);if(l.innerHTML=t?`<svg>${u}</svg>`:u,t){const e=l.content.firstChild;l.content.removeChild(e),Array.from(e.childNodes).forEach(e=>l.content.appendChild(e))}!function(e){const t=o.a.document.createNodeIterator(e,o.a.NodeFilter.SHOW_COMMENT,null,!1);let n;for(;n=t.nextNode();)p.test(n.textContent)&&(n.parentNode.insertBefore(o.a.document.createTextNode(n.textContent),n),n.parentNode.removeChild(n))}(l.content);const g=w(l.content),h=[];let x=0,k=null;for(;g.nextNode();){const n=g.currentNode;if(k&&!k.contains(n)&&(k=null),n.nodeType===o.a.Node.TEXT_NODE){let e=n.textContent;if(e.match(p)){const e=n.textContent.match(p);e&&(n.textContent="",d[e[1]]=[x,a.a])}else{if(c&&!k&&!e.match(/^\s*$/)){let t=-1;const r=e.trim(),a=r.replace(b,(e,n)=>(-1===t&&(t=Number(n)),`\${${Number(n)-t}}`));if(!a.match(m)){let c=n.previousSibling&&n.previousSibling.nodeType===o.a.Node.COMMENT_NODE?n.previousSibling:"";c&&(c.parentNode.removeChild(c),c=(c.textContent.split("|")[1]||"").trim());const l=Object(i.a)(a,c).replace(/\${(\d+)}/g,(e,n)=>Object(s.b)(Number(n)+t));e=e.replace(r,l),n.textContent=e}}const t=e.match(b);if(t){let r=n;t.reduce((e,t)=>{const[n,o]=e.pop().split(t);return n&&e.push(n),e.push(t),o&&e.push(o),e},[e]).forEach((e,t)=>{0===t?r.textContent=e:(r=r.parentNode.insertBefore(o.a.document.createTextNode(e),r.nextSibling),g.currentNode=r,x+=1);const n=r.textContent.match(p);n&&(r.textContent="",d[n[1]]=[x,a.a])})}}}else if(n.nodeType===o.a.Node.ELEMENT_NODE){if(k||"no"!==n.getAttribute("translate")&&"script"!==n.tagName.toLowerCase()&&"style"!==n.tagName.toLowerCase()||(k=n),r.c){const e=n.tagName.toLowerCase();!e.match(/.+-.+/)||o.a.customElements.get(e)||h.includes(e)||h.push(e)}Array.from(n.attributes).forEach(r=>{const i=r.value.trim(),a=r.name,c=i.match(p);if(c){const o=e[c[1]].replace(/\s*=\s*['"]*$/g,"").split(/\s+/).pop();d[c[1]]=[x,f(a,o,t)],n.removeAttribute(r.name)}else{const e=i.match(b);if(e){const n="attr__"+a;e.forEach((r,c)=>{const[,l]=r.match(p);let u=!1;d[l]=[x,(l,d,g)=>{const f=s.a.get(d,{});f[n]=(f[n]||i).replace(r,null==g?"":g),1!==e.length&&c+1!==e.length||(u=u||!t&&!(d instanceof o.a.SVGElement)&&a in d,u?d[a]=f[n]:d.setAttribute(a,f[n]),f[n]=void 0)}]}),r.value=""}}})}x+=1}return r.c&&h.length&&console.warn(`Not defined ${h.map(e=>`<${e}>`).join(", ")} element${h.length>1?"s":""} found in the template:\n${y(u,-1)}`),function(e,t,n,i){const a=s.a.get(t,{type:"function"});if(l!==a.template){(a.template||t.nodeType!==o.a.Node.TEXT_NODE)&&Object(s.d)(t),a.prevArgs=null;const e=o.a.document.importNode(l.content,!0),n=w(e),r=d.slice(0);let i=0,c=r.shift();const u=[];for(a.template=l,a.markers=u;n.nextNode();){const e=n.currentNode;for(;c&&c[0]===i;)u.push([e,c[1]]),c=r.shift();i+=1}if(t.nodeType===o.a.Node.TEXT_NODE){a.startNode=e.childNodes[0],a.endNode=e.childNodes[e.childNodes.length-1];let n=t,o=e.childNodes[0];for(;o;)t.parentNode.insertBefore(o,n.nextSibling),n=o,o=e.childNodes[0]}else t.appendChild(e)}const c=t.adoptedStyleSheets;if(i){let e=!1;if((i=i.map(e=>{if(e instanceof o.a.CSSStyleSheet)return e;let t=v.get(e);return t||(t=new o.a.CSSStyleSheet,t.replaceSync(e),v.set(e,t)),t})).length===c.length){e=!0;for(let t=0;t<i.length;t+=1)if(i[t]!==c[t]){e=!1;break}}e||(t.adoptedStyleSheets=i)}else c&&c.length&&(t.adoptedStyleSheets=[]);const g=a.prevArgs;a.prevArgs=n;for(let t=0;t<a.markers.length;t+=1){if(g&&g[t]===n[t])continue;const[o,i]=a.markers[t];try{i(e,o,n[t],g&&g[t])}catch(n){throw console.error(`Following error was thrown when updating a template expression in ${Object(r.e)(e)}\n${y(u,t)}`),n}}}}},205:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var o=n(18),r=n(30);const i=new WeakMap;function s(e,t){const n=r.a.get(e),o=n.startNode,i=Object(r.c)(n.endNode);t.parentNode.insertBefore(e,t.nextSibling);let s=e,a=o;for(;a;){const e=a.nextSibling;s.parentNode.insertBefore(a,s.nextSibling),s=a,a=e!==i.nextSibling&&e}}function a(e,t,n,c){let l=typeof n;Array.isArray(n)?l="array":n instanceof o.a.Node&&(l="node");let d=r.a.get(t,{});switch(d.type!==l&&(Object(r.d)(t),"array"===l&&i.delete(t),d=r.a.set(t,{type:l}),""!==t.textContent&&(t.textContent="")),l){case"function":n(e,t);break;case"array":!function(e,t,n,a){let c=i.get(t);const l=n.map((e,t)=>({id:hasOwnProperty.call(e,"id")?e.id:t,value:e,placeholder:null,available:!0}));if(i.set(t,l),c){const e=new Set;l.forEach(t=>e.add(t.id)),c=c.filter(t=>!!e.has(t.id)||(Object(r.d)(t.placeholder),t.placeholder.parentNode.removeChild(t.placeholder),!1))}let d=t;const u=n.length-1,g=r.a.get(t);for(let t=0;t<l.length;t+=1){const n=l[t];let i;if(c)for(let e=0;e<c.length;e+=1)if(c[e].available&&c[e].id===n.id){i=c[e];break}i?(i.available=!1,n.placeholder=i.placeholder,n.placeholder.previousSibling!==d&&s(n.placeholder,d),i.value!==n.value&&a(e,n.placeholder,n.value,i.value)):(n.placeholder=o.a.document.createTextNode(""),d.parentNode.insertBefore(n.placeholder,d.nextSibling),a(e,n.placeholder,n.value)),d=Object(r.c)(r.a.get(n.placeholder).endNode||n.placeholder),0===t&&(g.startNode=n.placeholder),t===u&&(g.endNode=d)}c&&c.forEach(e=>{e.available&&(Object(r.d)(e.placeholder),e.placeholder.parentNode.removeChild(e.placeholder))})}(e,t,n,a);break;case"node":!function(e,t,n,o){const i=r.a.get(t,{});o&&o.parentNode.removeChild(o),i.startNode=n,i.endNode=n,t.parentNode.insertBefore(n,t.nextSibling)}(0,t,n,c);break;default:t.textContent="number"===l||n?n:""}}},284:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return s}));var o=n(137);function r(e){return e*(Math.PI/180)}function i(e,t,n){const i={};o.c.forEach(e=>i[e]=0),n.forEach(e=>i[e]+=1);const s=t/2,a=360/n.length;e.lineWidth=.95*Math.floor(.14*t);const c=t/2-e.lineWidth;e.strokeStyle="blue",e.beginPath(),e.arc(s,s,Math.floor(c),0,2*Math.PI),e.stroke(),e.lineWidth=.14*t;let l=-90;for(const[t,n]of Object.entries(i))if(n>0){const i=l+n*a,d=o.a[t];e.strokeStyle=d,e.beginPath(),e.arc(s,s,c,r(l),Math.min(r(i+1),2*Math.PI)),e.stroke(),l=i}}function s(e,t){const{canvas:n}=e;n.style.width=t+"px",n.style.height=t+"px";const o=window.devicePixelRatio;n.width=Math.floor(t*o),n.height=Math.floor(t*o),e.scale(o,o)}},30:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"c",(function(){return s})),n.d(t,"d",(function(){return a})),n.d(t,"b",(function(){return l}));var o=n(18);const r=new WeakMap,i={get(e,t){const n=r.get(e);return n||(t&&r.set(e,t),t)},set:(e,t)=>(r.set(e,t),t)};function s(e){let t;for(;e&&(t=i.get(e))&&t.endNode;)e=t.endNode;return e}function a(e){if(e.nodeType!==o.a.Node.TEXT_NODE){let t=e.childNodes[0];for(;t;)e.removeChild(t),t=e.childNodes[0]}else{const t=i.get(e);if(t.startNode){const e=s(t.endNode);let n=t.startNode;const o=e.nextSibling;for(;n;){const e=n.nextSibling;n.parentNode.removeChild(n),n=e!==o&&e}}}}const c=Date.now(),l=(e=0)=>`H-${c}-${e}`},55:function(e,t,n){"use strict";n.d(t,"a",(function(){return g})),n.d(t,"b",(function(){return f})),n.d(t,"c",(function(){return m}));var o=n(203),r=n(30),i=n(18),s=n(72);const a=new Map,c=new Map;let l=null;const d=(()=>{let e;try{e=i.a.navigator.languages||[i.a.navigator.language]}catch(t){e=[]}return e.reduce((e,t)=>{const n=t.split("-")[0];return e.add(t),t!==n&&e.add(n),e},new Set)})();const u=new Map;function g(e,t,n=[]){const o=`${e=e.trim()} | ${t=t.trim()}`;let r=c.get(o);if(!r){if(a.size)for(const t of d){const n=a.get(t);if(n&&(r=n[o]||n[e],r)){if(r=r.message,"object"==typeof r){let e=u.get(t);e||(e=new Intl.PluralRules(t),u.set(t,e));const n=r;r=t=>0===t&&n.zero||n[e.select(t)]||n.other||""}break}}r||(l&&(r=l(e,t)),r||(r=e,(a.size||l)&&s.c&&console.warn(`Missing translation: "${e}"${t?` [${t}]`:""}`))),c.set(o,r)}return"function"==typeof r?r(n[0]):r}function f(e,t){switch(typeof e){case"function":if("chrome.i18n"===(t||{}).format){const t=new Map;l=(n,o)=>{n=o?`${n} | ${o}`:n;let r=t.get(n);return r||(r=function(e){return e.replace("$","@").replace(/[^a-zA-Z0-9_@]/g,"_").toLowerCase()}(n),t.set(n,r)),e(r,o)}}else l=e;break;case"string":{if(!t||"object"!=typeof t)throw TypeError("Messages must be an object");"default"===e&&d.add("default");const n=a.get(e)||{};a.set(e,{...n,...t});break}default:throw TypeError("The first argument must be a string or a function")}}function h(e,t){const n=e.reduce((e,t,n)=>`${e}\${${n-1}}${t}`),[o,,r=""]=n.split("|");return g(o,r,t)}Object.defineProperty(f,"languages",{get:()=>Array.from(d)});const p=/\$\{(\d+)\}/g,b=Object(r.b)("svg");function m(e,...t){return h(e,t).replace(p,(e,n)=>t[n])}const w=new Map;m.html=function(e,...t){const n=h(e,t);return(e,r=e)=>{let i=w.get(n);i||(i=Object(o.a)(n.split(p),!1,!1,!1),w.set(n,i)),i(e,r,t)}},m.svg=function(e,...t){const n=h(e,t);return(e,r=e)=>{const i=n+b;let s=w.get(i);s||(s=Object(o.a)(n.split(p),!0,!1,!1),w.set(i,s)),s(e,r,t)}}},72:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"e",(function(){return s})),n.d(t,"f",(function(){return a})),n.d(t,"b",(function(){return c})),n.d(t,"d",(function(){return l})),n.d(t,"c",(function(){return d}));var o=n(18);const r=new Map;function i(e){let t=r.get(e);return void 0===t&&(t=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),r.set(e,t)),t}function s(e){return`<${String(e.tagName).toLowerCase()}>`}function a(e,t){e.nodeType===o.a.Node.ELEMENT_NODE&&(t(e),e.shadowRoot&&a(e.shadowRoot,t));const n=o.a.document.createTreeWalker(e,o.a.NodeFilter.SHOW_ELEMENT,null,!1);for(;n.nextNode();){const e=n.currentNode;t(e),e.shadowRoot&&a(e.shadowRoot,t)}}const c=Promise.resolve(),l=new WeakMap,d="walkInShadow"===a.name}});