(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{170:function(e,t,r){"use strict";
/*!
 * css-vars-ponyfill
 * v2.3.2
 * https://jhildenbiddle.github.io/css-vars-ponyfill/
 * (c) 2018-2020 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */
function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function o(e){return function(e){if(Array.isArray(e))return s(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return s(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return s(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}
/*!
 * get-css-data
 * v1.8.0
 * https://github.com/jhildenbiddle/get-css-data
 * (c) 2018-2020 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */()}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={mimeType:t.mimeType||null,onBeforeSend:t.onBeforeSend||Function.prototype,onSuccess:t.onSuccess||Function.prototype,onError:t.onError||Function.prototype,onComplete:t.onComplete||Function.prototype},n=Array.isArray(e)?e:[e],o=Array.apply(null,Array(n.length)).map((function(e){return null}));function s(){return!("<"===(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").trim().charAt(0))}function a(e,t){r.onError(e,n[t],t)}function c(e,t){var s=r.onSuccess(e,n[t],t);e=!1===s?"":s||e,o[t]=e,-1===o.indexOf(null)&&r.onComplete(o)}var i=document.createElement("a");n.forEach((function(e,t){if(i.setAttribute("href",e),i.href=String(i.href),Boolean(document.all&&!window.atob)&&i.host.split(":")[0]!==location.host.split(":")[0]){if(i.protocol===location.protocol){var n=new XDomainRequest;n.open("GET",e),n.timeout=0,n.onprogress=Function.prototype,n.ontimeout=Function.prototype,n.onload=function(){s(n.responseText)?c(n.responseText,t):a(n,t)},n.onerror=function(e){a(n,t)},setTimeout((function(){n.send()}),0)}else console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(e,")")),a(null,t)}else{var o=new XMLHttpRequest;o.open("GET",e),r.mimeType&&o.overrideMimeType&&o.overrideMimeType(r.mimeType),r.onBeforeSend(o,e,t),o.onreadystatechange=function(){4===o.readyState&&(200===o.status&&s(o.responseText)?c(o.responseText,t):a(o,t))},o.send()}}))}
/**
 * Gets CSS data from <style> and <link> nodes (including @imports), then
 * returns data in order processed by DOM. Allows specifying nodes to
 * include/exclude and filtering CSS data using RegEx.
 *
 * @preserve
 * @param {object}   [options] The options object
 * @param {object}   [options.rootElement=document] Root element to traverse for
 *                   <link> and <style> nodes.
 * @param {string}   [options.include] CSS selector matching <link> and <style>
 *                   nodes to include
 * @param {string}   [options.exclude] CSS selector matching <link> and <style>
 *                   nodes to exclude
 * @param {object}   [options.filter] Regular expression used to filter node CSS
 *                   data. Each block of CSS data is tested against the filter,
 *                   and only matching data is included.
 * @param {boolean}  [options.skipDisabled=true] Determines if disabled
 *                   stylesheets will be skipped while collecting CSS data.
 * @param {boolean}  [options.useCSSOM=false] Determines if CSS data will be
 *                   collected from a stylesheet's runtime values instead of its
 *                   text content. This is required to get accurate CSS data
 *                   when a stylesheet has been modified using the deleteRule()
 *                   or insertRule() methods because these modifications will
 *                   not be reflected in the stylesheet's text content.
 * @param {function} [options.onBeforeSend] Callback before XHR is sent. Passes
 *                   1) the XHR object, 2) source node reference, and 3) the
 *                   source URL as arguments.
 * @param {function} [options.onSuccess] Callback on each CSS node read. Passes
 *                   1) CSS text, 2) source node reference, and 3) the source
 *                   URL as arguments.
 * @param {function} [options.onError] Callback on each error. Passes 1) the XHR
 *                   object for inspection, 2) soure node reference, and 3) the
 *                   source URL that failed (either a <link> href or an @import)
 *                   as arguments
 * @param {function} [options.onComplete] Callback after all nodes have been
 *                   processed. Passes 1) concatenated CSS text, 2) an array of
 *                   CSS text in DOM order, and 3) an array of nodes in DOM
 *                   order as arguments.
 *
 * @example
 *
 *   getCssData({
 *     rootElement : document,
 *     include     : 'style,link[rel="stylesheet"]',
 *     exclude     : '[href="skip.css"]',
 *     filter      : /red/,
 *     skipDisabled: true,
 *     useCSSOM    : false,
 *     onBeforeSend(xhr, node, url) {
 *       // ...
 *     }
 *     onSuccess(cssText, node, url) {
 *       // ...
 *     }
 *     onError(xhr, node, url) {
 *       // ...
 *     },
 *     onComplete(cssText, cssArray, nodeArray) {
 *       // ...
 *     }
 *   });
 */function c(e){var t={cssComments:/\/\*[\s\S]+?\*\//g,cssImports:/(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g},r={rootElement:e.rootElement||document,include:e.include||'style,link[rel="stylesheet"]',exclude:e.exclude||null,filter:e.filter||null,skipDisabled:!1!==e.skipDisabled,useCSSOM:e.useCSSOM||!1,onBeforeSend:e.onBeforeSend||Function.prototype,onSuccess:e.onSuccess||Function.prototype,onError:e.onError||Function.prototype,onComplete:e.onComplete||Function.prototype},n=Array.apply(null,r.rootElement.querySelectorAll(r.include)).filter((function(e){return t=e,n=r.exclude,!(t.matches||t.matchesSelector||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector).call(t,n);var t,n})),o=Array.apply(null,Array(n.length)).map((function(e){return null}));function s(){if(-1===o.indexOf(null)){var e=o.join("");r.onComplete(e,o,n)}}function c(e,t,n,c){var i=r.onSuccess(e,n,c);(function e(t,n,o,s){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[],i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:[],l=u(t,o,i);l.rules.length?a(l.absoluteUrls,{onBeforeSend:function(e,t,o){r.onBeforeSend(e,n,t)},onSuccess:function(e,t,o){var s=r.onSuccess(e,n,t),a=u(e=!1===s?"":s||e,t,i);return a.rules.forEach((function(t,r){e=e.replace(t,a.absoluteRules[r])})),e},onError:function(r,a,u){c.push({xhr:r,url:a}),i.push(l.rules[u]),e(t,n,o,s,c,i)},onComplete:function(r){r.forEach((function(e,r){t=t.replace(l.rules[r],e)})),e(t,n,o,s,c,i)}}):s(t,c)})(e=void 0!==i&&!1===Boolean(i)?"":i||e,n,c,(function(e,a){null===o[t]&&(a.forEach((function(e){return r.onError(e.xhr,n,e.url)})),!r.filter||r.filter.test(e)?o[t]=e:o[t]="",s())}))}function u(e,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],o={};return o.rules=(e.replace(t.cssComments,"").match(t.cssImports)||[]).filter((function(e){return-1===n.indexOf(e)})),o.urls=o.rules.map((function(e){return e.replace(t.cssImports,"$1")})),o.absoluteUrls=o.urls.map((function(e){return i(e,r)})),o.absoluteRules=o.rules.map((function(e,t){var n=o.urls[t],s=i(o.absoluteUrls[t],r);return e.replace(n,s)})),o}n.length?n.forEach((function(e,t){var n=e.getAttribute("href"),u=e.getAttribute("rel"),l="LINK"===e.nodeName&&n&&u&&-1!==u.toLowerCase().indexOf("stylesheet"),f=!1!==r.skipDisabled&&e.disabled,p="STYLE"===e.nodeName;if(l&&!f)a(n,{mimeType:"text/css",onBeforeSend:function(t,n,o){r.onBeforeSend(t,e,n)},onSuccess:function(r,o,s){var a=i(n);c(r,t,e,a)},onError:function(n,a,c){o[t]="",r.onError(n,e,a),s()}});else if(p&&!f){var d=e.textContent;r.useCSSOM&&(d=Array.apply(null,e.sheet.cssRules).map((function(e){return e.cssText})).join("")),c(d,t,e,location.href)}else o[t]="",s()})):r.onComplete("",[])}function i(e,t){var r=document.implementation.createHTMLDocument(""),n=r.createElement("base"),o=r.createElement("a");return r.head.appendChild(n),r.body.appendChild(o),n.href=t||document.baseURI||(document.querySelector("base")||{}).href||location.href,o.href=e,o.href}r.r(t);var u=l;function l(e,t,r){e instanceof RegExp&&(e=f(e,r)),t instanceof RegExp&&(t=f(t,r));var n=p(e,t,r);return n&&{start:n[0],end:n[1],pre:r.slice(0,n[0]),body:r.slice(n[0]+e.length,n[1]),post:r.slice(n[1]+t.length)}}function f(e,t){var r=t.match(e);return r?r[0]:null}function p(e,t,r){var n,o,s,a,c,i=r.indexOf(e),u=r.indexOf(t,i+1),l=i;if(i>=0&&u>0){for(n=[],s=r.length;l>=0&&!c;)l==i?(n.push(l),i=r.indexOf(e,l+1)):1==n.length?c=[n.pop(),u]:((o=n.pop())<s&&(s=o,a=u),u=r.indexOf(t,l+1)),l=i<u&&i>=0?i:u;n.length&&(c=[s,a])}return c}function d(e){var t=n({},{preserveStatic:!0,removeComments:!1},arguments.length>1&&void 0!==arguments[1]?arguments[1]:{});function r(e){throw new Error("CSS parse error: ".concat(e))}function o(t){var r=t.exec(e);if(r)return e=e.slice(r[0].length),r}function s(){return o(/^{\s*/)}function a(){return o(/^}/)}function c(){o(/^\s*/)}function i(){if(c(),"/"===e[0]&&"*"===e[1]){for(var t=2;e[t]&&("*"!==e[t]||"/"!==e[t+1]);)t++;if(!e[t])return r("end of comment is missing");var n=e.slice(2,t);return e=e.slice(t+2),{type:"comment",comment:n}}}function l(){for(var e,r=[];e=i();)r.push(e);return t.removeComments?[]:r}function f(){for(c();"}"===e[0];)r("extra closing bracket");var t=o(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);if(t)return t[0].trim().replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g,"").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g,(function(e){return e.replace(/,/g,"‌")})).split(/\s*(?![^(]*\)),\s*/).map((function(e){return e.replace(/\u200C/g,",")}))}function p(){if("@"===e[0])return v();o(/^([;\s]*)+/);var t=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,n=o(/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);if(n){if(n=n[0].trim(),!o(/^:\s*/))return r("property missing ':'");var s=o(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/),a={type:"declaration",property:n.replace(t,""),value:s?s[0].replace(t,"").trim():""};return o(/^[;\s]*/),a}}function d(){if(!s())return r("missing '{'");for(var e,t=l();e=p();)t.push(e),t=t.concat(l());return a()?t:r("missing '}'")}function m(){c();for(var e,t=[];e=o(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);)t.push(e[1]),o(/^,\s*/);if(t.length)return{type:"keyframe",values:t,declarations:d()}}function v(){if(c(),"@"===e[0]){var n=function(){var e=o(/^@(import|charset|namespace)\s*([^;]+);/);if(e)return{type:e[1],name:e[2].trim()}}()||function(){if(o(/^@font-face\s*/))return{type:"font-face",declarations:d()}}()||function(){var e=o(/^@media([^{]+)*/);if(e)return{type:"media",media:(e[1]||"").trim(),rules:y()}}()||function(){var e=o(/^@([-\w]+)?keyframes\s*/);if(e){var t=e[1];if(!(e=o(/^([-\w]+)\s*/)))return r("@keyframes missing name");var n,c=e[1];if(!s())return r("@keyframes missing '{'");for(var i=l();n=m();)i.push(n),i=i.concat(l());return a()?{type:"keyframes",name:c,vendor:t,keyframes:i}:r("@keyframes missing '}'")}}()||function(){var e=o(/^@supports *([^{]+)/);if(e)return{type:"supports",supports:e[1].trim(),rules:y()}}()||function(){var e=o(/^@([-\w]+)?document *([^{]+)/);if(e)return{type:"document",document:e[2].trim(),vendor:e[1]?e[1].trim():null,rules:y()}}()||function(){var e=o(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);if(e)return{type:"custom-media",name:e[1].trim(),media:e[2].trim()}}()||function(){if(o(/^@host\s*/))return{type:"host",rules:y()}}()||function(){if(o(/^@page */))return{type:"page",selectors:f()||[],declarations:d()}}()||function(){var e=o(/@(top|bottom|left|right)-(left|center|right|top|middle|bottom)-?(corner)?\s*/);if(e)return{type:"page-margin-box",name:"".concat(e[1],"-").concat(e[2])+(e[3]?"-".concat(e[3]):""),declarations:d()}}();if(n&&!t.preserveStatic){var i=!1;if(n.declarations)i=n.declarations.some((function(e){return/var\(/.test(e.value)}));else i=(n.keyframes||n.rules||[]).some((function(e){return(e.declarations||[]).some((function(e){return/var\(/.test(e.value)}))}));return i?n:{}}return n}}function h(){if(!t.preserveStatic){var n=u("{","}",e);if(n){var o=/:(?:root|host)(?![.:#(])/.test(n.pre)&&/--\S*\s*:/.test(n.body),s=/var\(/.test(n.body);if(!o&&!s)return e=e.slice(n.end+1),{}}}var a=f()||[],c=t.preserveStatic?d():d().filter((function(e){var t=a.some((function(e){return/:(?:root|host)(?![.:#(])/.test(e)}))&&/^--\S/.test(e.property),r=/var\(/.test(e.value);return t||r}));return a.length||r("selector missing"),{type:"rule",selectors:a,declarations:c}}function y(t){if(!t&&!s())return r("missing '{'");for(var n,o=l();e.length&&(t||"}"!==e[0])&&(n=v()||h());)n.type&&o.push(n),o=o.concat(l());return t||a()?o:r("missing '}'")}return{type:"stylesheet",stylesheet:{rules:y(!0),errors:[]}}}function m(e){var t=n({},{parseHost:!1,store:{},onWarning:function(){}},arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}),r=new RegExp(":".concat(t.parseHost?"host":"root","$"));return"string"==typeof e&&(e=d(e,t)),e.stylesheet.rules.forEach((function(e){"rule"===e.type&&e.selectors.some((function(e){return r.test(e)}))&&e.declarations.forEach((function(e,r){var n=e.property,o=e.value;n&&0===n.indexOf("--")&&(t.store[n]=o)}))})),t.store}function v(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2?arguments[2]:void 0,n={charset:function(e){return"@charset "+e.name+";"},comment:function(e){return 0===e.comment.indexOf("__CSSVARSPONYFILL")?"/*"+e.comment+"*/":""},"custom-media":function(e){return"@custom-media "+e.name+" "+e.media+";"},declaration:function(e){return e.property+":"+e.value+";"},document:function(e){return"@"+(e.vendor||"")+"document "+e.document+"{"+o(e.rules)+"}"},"font-face":function(e){return"@font-face{"+o(e.declarations)+"}"},host:function(e){return"@host{"+o(e.rules)+"}"},import:function(e){return"@import "+e.name+";"},keyframe:function(e){return e.values.join(",")+"{"+o(e.declarations)+"}"},keyframes:function(e){return"@"+(e.vendor||"")+"keyframes "+e.name+"{"+o(e.keyframes)+"}"},media:function(e){return"@media "+e.media+"{"+o(e.rules)+"}"},namespace:function(e){return"@namespace "+e.name+";"},page:function(e){return"@page "+(e.selectors.length?e.selectors.join(", "):"")+"{"+o(e.declarations)+"}"},"page-margin-box":function(e){return"@"+e.name+"{"+o(e.declarations)+"}"},rule:function(e){var t=e.declarations;if(t.length)return e.selectors.join(",")+"{"+o(t)+"}"},supports:function(e){return"@supports "+e.supports+"{"+o(e.rules)+"}"}};function o(e){for(var o="",s=0;s<e.length;s++){var a=e[s];r&&r(a);var c=n[a.type](a);c&&(o+=c,c.length&&a.selectors&&(o+=t))}return o}return o(e.stylesheet.rules)}l.range=p;var h="--",y="var";function g(e){var t=n({},{preserveStatic:!0,preserveVars:!1,variables:{},onWarning:function(){}},arguments.length>1&&void 0!==arguments[1]?arguments[1]:{});return"string"==typeof e&&(e=d(e,t)),function e(t,r){t.rules.forEach((function(n){n.rules?e(n,r):n.keyframes?n.keyframes.forEach((function(e){"keyframe"===e.type&&r(e.declarations,n)})):n.declarations&&r(n.declarations,t)}))}(e.stylesheet,(function(e,r){for(var n=0;n<e.length;n++){var o=e[n],s=o.type,a=o.property,c=o.value;if("declaration"===s)if(t.preserveVars||!a||0!==a.indexOf(h)){if(-1!==c.indexOf(y+"(")){var i=S(c,t);i!==o.value&&(i=b(i),t.preserveVars?(e.splice(n,0,{type:s,property:a,value:i}),n++):o.value=i)}}else e.splice(n,1),n--}})),v(e)}function b(e){return(e.match(/calc\(([^)]+)\)/g)||[]).forEach((function(t){var r="calc".concat(t.split("calc").join(""));e=e.replace(t,r)})),e}function S(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2?arguments[2]:void 0;if(-1===e.indexOf("var("))return e;var n=u("(",")",e);return n?"var"===n.pre.slice(-3)?0===n.body.trim().length?(t.onWarning("var() must contain a non-whitespace string"),e):n.pre.slice(0,-3)+function(e){var n=e.split(",")[0].replace(/[\s\n\t]/g,""),o=(e.match(/(?:\s*,\s*){1}(.*)?/)||[])[1],s=Object.prototype.hasOwnProperty.call(t.variables,n)?String(t.variables[n]):void 0,a=s||(o?String(o):void 0),c=r||e;return s||t.onWarning('variable "'.concat(n,'" is undefined')),a&&"undefined"!==a&&a.length>0?S(a,t,c):"var(".concat(c,")")}(n.body)+S(n.post,t):n.pre+"(".concat(S(n.body,t),")")+S(n.post,t):(-1!==e.indexOf("var(")&&t.onWarning('missing closing ")" in the value "'.concat(e,'"')),e)}var E="undefined"!=typeof window,w=E&&window.CSS&&window.CSS.supports&&window.CSS.supports("(--a: 0)"),C={group:0,job:0},A={rootElement:E?document:null,shadowDOM:!1,include:"style,link[rel=stylesheet]",exclude:"",variables:{},onlyLegacy:!0,preserveStatic:!0,preserveVars:!1,silent:!1,updateDOM:!0,updateURLs:!0,watch:null,onBeforeSend:function(){},onError:function(){},onWarning:function(){},onSuccess:function(){},onComplete:function(){},onFinally:function(){}},O={cssComments:/\/\*[\s\S]+?\*\//g,cssKeyframes:/@(?:-\w*-)?keyframes/,cssMediaQueries:/@media[^{]+\{([\s\S]+?})\s*}/g,cssUrls:/url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,cssVarDeclRules:/(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^}]*})/g,cssVarDecls:/(?:[\s;]*)(-{2}\w[\w-]*)(?:\s*:\s*)([^;]*);/g,cssVarFunc:/var\(\s*--[\w-]/,cssVars:/(?:(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/},x={dom:{},job:{},user:{}},j=!1,k=null,_=0,M=null,T=!1;
/**
 * Fetches, parses, and transforms CSS custom properties from specified
 * <style> and <link> elements into static values, then appends a new <style>
 * element with static values to the DOM to provide CSS custom property
 * compatibility for legacy browsers. Also provides a single interface for
 * live updates of runtime values in both modern and legacy browsers.
 *
 * @preserve
 * @param {object}   [options] Options object
 * @param {object}   [options.rootElement=document] Root element to traverse for
 *                   <link> and <style> nodes
 * @param {boolean}  [options.shadowDOM=false] Determines if shadow DOM <link>
 *                   and <style> nodes will be processed.
 * @param {string}   [options.include="style,link[rel=stylesheet]"] CSS selector
 *                   matching <link re="stylesheet"> and <style> nodes to
 *                   process
 * @param {string}   [options.exclude] CSS selector matching <link
 *                   rel="stylehseet"> and <style> nodes to exclude from those
 *                   matches by options.include
 * @param {object}   [options.variables] A map of custom property name/value
 *                   pairs. Property names can omit or include the leading
 *                   double-hyphen (—), and values specified will override
 *                   previous values
 * @param {boolean}  [options.onlyLegacy=true] Determines if the ponyfill will
 *                   only generate legacy-compatible CSS in browsers that lack
 *                   native support (i.e., legacy browsers)
 * @param {boolean}  [options.preserveStatic=true] Determines if CSS
 *                   declarations that do not reference a custom property will
 *                   be preserved in the transformed CSS
 * @param {boolean}  [options.preserveVars=false] Determines if CSS custom
 *                   property declarations will be preserved in the transformed
 *                   CSS
 * @param {boolean}  [options.silent=false] Determines if warning and error
 *                   messages will be displayed on the console
 * @param {boolean}  [options.updateDOM=true] Determines if the ponyfill will
 *                   update the DOM after processing CSS custom properties
 * @param {boolean}  [options.updateURLs=true] Determines if relative url()
 *                   paths will be converted to absolute urls in external CSS
 * @param {boolean}  [options.watch=false] Determines if a MutationObserver will
 *                   be created that will execute the ponyfill when a <link> or
 *                   <style> DOM mutation is observed
 * @param {function} [options.onBeforeSend] Callback before XHR is sent. Passes
 *                   1) the XHR object, 2) source node reference, and 3) the
 *                   source URL as arguments
 * @param {function} [options.onError] Callback after a CSS parsing error has
 *                   occurred or an XHR request has failed. Passes 1) an error
 *                   message, and 2) source node reference, 3) xhr, and 4 url as
 *                   arguments.
 * @param {function} [options.onWarning] Callback after each CSS parsing warning
 *                   has occurred. Passes 1) a warning message as an argument.
 * @param {function} [options.onSuccess] Callback after CSS data has been
 *                   collected from each node and before CSS custom properties
 *                   have been transformed. Allows modifying the CSS data before
 *                   it is transformed by returning any string value (or false
 *                   to skip). Passes 1) CSS text, 2) source node reference, and
 *                   3) the source URL as arguments.
 * @param {function} [options.onComplete] Callback after all CSS has been
 *                   processed, legacy-compatible CSS has been generated, and
 *                   (optionally) the DOM has been updated. Passes 1) a CSS
 *                   string with CSS variable values resolved, 2) an array of
 *                   output <style> node references that have been appended to
 *                   the DOM, 3) an object containing all custom properies names
 *                   and values, and 4) the ponyfill execution time in
 *                   milliseconds.
 * @param {function} [options.onFinally] Callback in modern and legacy browsers
 *                   after the ponyfill has finished all tasks. Passes 1) a
 *                   boolean indicating if the last ponyfill call resulted in a
 *                   style change, 2) a boolean indicating if the current
 *                   browser provides native support for CSS custom properties,
 *                   and 3) the ponyfill execution time in milliseconds.
 * @example
 *
 *   cssVars({
 *     rootElement   : document,
 *     shadowDOM     : false,
 *     include       : 'style,link[rel="stylesheet"]',
 *     exclude       : '',
 *     variables     : {},
 *     onlyLegacy    : true,
 *     preserveStatic: true,
 *     preserveVars  : false,
 *     silent        : false,
 *     updateDOM     : true,
 *     updateURLs    : true,
 *     watch         : false,
 *     onBeforeSend(xhr, node, url) {},
 *     onError(message, node, xhr, url) {},
 *     onWarning(message) {},
 *     onSuccess(cssText, node, url) {},
 *     onComplete(cssText, styleNode, cssVariables, benchmark) {},
 *     onFinally(hasChanged, hasNativeSupport, benchmark)
 *   });
 */
function L(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t="cssVars(): ",r=n({},A,e);function s(e,n,o,s){!r.silent&&window.console&&console.error("".concat(t).concat(e,"\n"),n),r.onError(e,n,o,s)}function a(e){!r.silent&&window.console&&console.warn("".concat(t).concat(e)),r.onWarning(e)}function i(e){r.onFinally(Boolean(e),w,N()-r.__benchmark)}if(E){if(r.watch)return r.watch=A.watch,function(e){function t(e){var t=e.hasAttribute("disabled"),r=(e.sheet||{}).disabled;return t||r}function r(e){return"LINK"===e.tagName&&-1!==(e.getAttribute("rel")||"").indexOf("stylesheet")&&!t(e)}function n(e){return Array.apply(null,e).some((function(e){var n=1===e.nodeType&&e.hasAttribute("data-cssvars"),o=function(e){return"STYLE"===e.tagName&&!t(e)}(e)&&O.cssVars.test(e.textContent);return!n&&(r(e)||o)}))}if(!window.MutationObserver)return;k&&(k.disconnect(),k=null);(k=new MutationObserver((function(t){t.some((function(t){var o,s=!1;return"attributes"===t.type?s=r(t.target):"childList"===t.type&&(s=n(t.addedNodes)||(o=t.removedNodes,Array.apply(null,o).some((function(t){var r=1===t.nodeType,n=r&&"out"===t.getAttribute("data-cssvars"),o=r&&"src"===t.getAttribute("data-cssvars"),s=o;if(o||n){var a=t.getAttribute("data-cssvars-group"),c=e.rootElement.querySelector('[data-cssvars-group="'.concat(a,'"]'));o&&(V(e.rootElement),x.dom={}),c&&c.parentNode.removeChild(c)}return s})))),s}))&&L(e)}))).observe(document.documentElement,{attributes:!0,attributeFilter:["disabled","href"],childList:!0,subtree:!0})}(r),void L(r);if(!1===r.watch&&k&&(k.disconnect(),k=null),!r.__benchmark){if(j===r.rootElement)return void function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;clearTimeout(M),M=setTimeout((function(){e.__benchmark=null,L(e)}),t)}(e);if(r.__benchmark=N(),r.exclude=[k?'[data-cssvars]:not([data-cssvars=""])':'[data-cssvars="out"]',r.exclude].filter((function(e){return e})).join(","),r.variables=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=/^-{2}/;return Object.keys(e).reduce((function(r,n){return r[t.test(n)?n:"--".concat(n.replace(/^-+/,""))]=e[n],r}),{})}(r.variables),!k)if(Array.apply(null,r.rootElement.querySelectorAll('[data-cssvars="out"]')).forEach((function(e){var t=e.getAttribute("data-cssvars-group");(t?r.rootElement.querySelector('[data-cssvars="src"][data-cssvars-group="'.concat(t,'"]')):null)||e.parentNode.removeChild(e)})),_){var u=r.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])');u.length<_&&(_=u.length,x.dom={})}}if("loading"!==document.readyState)if(w&&r.onlyLegacy){var l=!1;if(r.updateDOM){var f=r.rootElement.host||(r.rootElement===document?document.documentElement:r.rootElement);Object.keys(r.variables).forEach((function(e){var t=r.variables[e];l=l||t!==getComputedStyle(f).getPropertyValue(e),f.style.setProperty(e,t)}))}i(l)}else!T&&(r.shadowDOM||r.rootElement.shadowRoot||r.rootElement.host)?c({rootElement:A.rootElement,include:A.include,exclude:r.exclude,skipDisabled:!1,onSuccess:function(e,t,r){return(e=((e=e.replace(O.cssComments,"").replace(O.cssMediaQueries,"")).match(O.cssVarDeclRules)||[]).join(""))||!1},onComplete:function(e,t,n){m(e,{store:x.dom,onWarning:a}),T=!0,L(r)}}):(j=r.rootElement,c({rootElement:r.rootElement,include:r.include,exclude:r.exclude,skipDisabled:!1,onBeforeSend:r.onBeforeSend,onError:function(e,t,r){var n=e.responseURL||D(r,location.href),o=e.statusText?"(".concat(e.statusText,")"):"Unspecified Error"+(0===e.status?" (possibly CORS related)":"");s("CSS XHR Error: ".concat(n," ").concat(e.status," ").concat(o),t,e,n)},onSuccess:function(e,t,n){var o="LINK"===t.tagName,s="STYLE"===t.tagName&&e!==t.textContent,a=r.onSuccess(e,t,n);return e=void 0!==a&&!1===Boolean(a)?"":a||e,r.updateURLs&&(o||s)&&(e=function(e,t){return(e.replace(O.cssComments,"").match(O.cssUrls)||[]).forEach((function(r){var n=r.replace(O.cssUrls,"$1"),o=D(n,t);e=e.replace(r,r.replace(n,o))})),e}(e,n)),e},onComplete:function(e,t){var c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],u=n({},x.dom,x.user);if(x.job={},c.forEach((function(e,n){var o=t[n];if(O.cssVars.test(o))try{var c=d(o,{preserveStatic:r.preserveStatic,removeComments:!0});m(c,{parseHost:Boolean(r.rootElement.host),store:x.dom,onWarning:a}),e.__cssVars={tree:c}}catch(t){s(t.message,e)}})),n(x.job,x.dom),r.updateDOM?(n(x.user,r.variables),n(x.job,x.user)):(n(x.job,x.user,r.variables),n(u,r.variables)),C.job>0&&Boolean(Object.keys(x.job).length>Object.keys(u).length||Boolean(Object.keys(u).length&&Object.keys(x.job).some((function(e){return x.job[e]!==u[e]})))))V(r.rootElement),L(r);else{var l=[],f=[],p=!1;if(r.updateDOM&&C.job++,c.forEach((function(e,o){var c=!e.__cssVars;if(e.__cssVars)try{g(e.__cssVars.tree,n({},r,{variables:x.job,onWarning:a}));var i=v(e.__cssVars.tree);if(r.updateDOM){var u=t[o],d=O.cssVarFunc.test(u);if(e.getAttribute("data-cssvars")||e.setAttribute("data-cssvars","src"),i.length&&d){var m=e.getAttribute("data-cssvars-group")||++C.group,h=i.replace(/\s/g,""),y=r.rootElement.querySelector('[data-cssvars="out"][data-cssvars-group="'.concat(m,'"]'))||document.createElement("style");p=p||O.cssKeyframes.test(i),r.preserveStatic&&(e.sheet.disabled=!0),y.hasAttribute("data-cssvars")||y.setAttribute("data-cssvars","out"),h===e.textContent.replace(/\s/g,"")?(c=!0,y&&y.parentNode&&(e.removeAttribute("data-cssvars-group"),y.parentNode.removeChild(y))):h!==y.textContent.replace(/\s/g,"")&&([e,y].forEach((function(e){e.setAttribute("data-cssvars-job",C.job),e.setAttribute("data-cssvars-group",m)})),y.textContent=i,l.push(i),f.push(y),y.parentNode||e.parentNode.insertBefore(y,e.nextSibling))}}else e.textContent.replace(/\s/g,"")!==i&&l.push(i)}catch(t){s(t.message,e)}c&&e.setAttribute("data-cssvars","skip"),e.hasAttribute("data-cssvars-job")||e.setAttribute("data-cssvars-job",C.job)})),_=r.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])').length,r.shadowDOM)for(var h,y=[r.rootElement].concat(o(r.rootElement.querySelectorAll("*"))),b=0;h=y[b];++b)if(h.shadowRoot&&h.shadowRoot.querySelector("style")){var S=n({},r,{rootElement:h.shadowRoot});L(S)}r.updateDOM&&p&&R(r.rootElement),j=!1,r.onComplete(l.join(""),f,JSON.parse(JSON.stringify(x.job)),N()-r.__benchmark),i(f.length)}}}));else document.addEventListener("DOMContentLoaded",(function t(r){L(e),document.removeEventListener("DOMContentLoaded",t)}))}}function R(e){var t=["animation-name","-moz-animation-name","-webkit-animation-name"].filter((function(e){return getComputedStyle(document.body)[e]}))[0];if(t){for(var r=e.getElementsByTagName("*"),n=[],o=0,s=r.length;o<s;o++){var a=r[o];"none"!==getComputedStyle(a)[t]&&(a.style[t]+="__CSSVARSPONYFILL-KEYFRAMES__",n.push(a))}document.body.offsetHeight;for(var c=0,i=n.length;c<i;c++){var u=n[c].style;u[t]=u[t].replace("__CSSVARSPONYFILL-KEYFRAMES__","")}}}function D(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:location.href,r=document.implementation.createHTMLDocument(""),n=r.createElement("base"),o=r.createElement("a");return r.head.appendChild(n),r.body.appendChild(o),n.href=t,o.href=e,o.href}function N(){return E&&(window.performance||{}).now?window.performance.now():(new Date).getTime()}function V(e){Array.apply(null,e.querySelectorAll('[data-cssvars="skip"],[data-cssvars="src"]')).forEach((function(e){return e.setAttribute("data-cssvars","")}))}L.reset=function(){for(var e in C.job=0,C.group=0,j=!1,k&&(k.disconnect(),k=null),_=0,M=null,T=!1,x)x[e]={}},t.default=L}}]);
//# sourceMappingURL=0.chunk.16385.js.map