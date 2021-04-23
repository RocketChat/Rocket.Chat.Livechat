(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{135:function(e,t,r){"use strict";
/*!
 * css-vars-ponyfill
 * v2.4.3
 * https://jhildenbiddle.github.io/css-vars-ponyfill/
 * (c) 2018-2021 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */
function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}
/*!
 * get-css-data
 * v2.0.0
 * https://github.com/jhildenbiddle/get-css-data
 * (c) 2018-2021 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */function o(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={mimeType:t.mimeType||null,onBeforeSend:t.onBeforeSend||Function.prototype,onSuccess:t.onSuccess||Function.prototype,onError:t.onError||Function.prototype,onComplete:t.onComplete||Function.prototype},n=Array.isArray(e)?e:[e],o=Array.apply(null,Array(n.length)).map((function(e){return null}));function s(e){var t=e&&"<"===e.trim().charAt(0);return e&&!t}function a(e,t){r.onError(e,n[t],t)}function c(e,t){var s=r.onSuccess(e,n[t],t);e=!1===s?"":s||e,o[t]=e,-1===o.indexOf(null)&&r.onComplete(o)}var i=document.createElement("a");n.forEach((function(e,t){if(i.setAttribute("href",e),i.href=String(i.href),Boolean(document.all&&!window.atob)&&i.host.split(":")[0]!==location.host.split(":")[0]){if(i.protocol===location.protocol){var n=new XDomainRequest;n.open("GET",e),n.timeout=0,n.onprogress=Function.prototype,n.ontimeout=Function.prototype,n.onload=function(){s(n.responseText)?c(n.responseText,t):a(n,t)},n.onerror=function(e){a(n,t)},setTimeout((function(){n.send()}),0)}else console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(e,")")),a(null,t)}else{var o=new XMLHttpRequest;o.open("GET",e),r.mimeType&&o.overrideMimeType&&o.overrideMimeType(r.mimeType),r.onBeforeSend(o,e,t),o.onreadystatechange=function(){4===o.readyState&&(o.status<400&&s(o.responseText)||0===o.status&&s(o.responseText)?c(o.responseText,t):a(o,t))},o.send()}}))}
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
 */function s(e){var t=/\/\*[\s\S]+?\*\//g,r=/(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g,n={rootElement:e.rootElement||document,include:e.include||'style,link[rel="stylesheet"]',exclude:e.exclude||null,filter:e.filter||null,skipDisabled:!1!==e.skipDisabled,useCSSOM:e.useCSSOM||!1,onBeforeSend:e.onBeforeSend||Function.prototype,onSuccess:e.onSuccess||Function.prototype,onError:e.onError||Function.prototype,onComplete:e.onComplete||Function.prototype},s=Array.apply(null,n.rootElement.querySelectorAll(n.include)).filter((function(e){return t=e,r=n.exclude,!(t.matches||t.matchesSelector||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector).call(t,r);var t,r})),c=Array.apply(null,Array(s.length)).map((function(e){return null}));function i(){if(-1===c.indexOf(null)){c.reduce((function(e,t,r){return""===t&&e.push(r),e}),[]).reverse().forEach((function(e){return[s,c].forEach((function(t){return t.splice(e,1)}))}));var e=c.join("");n.onComplete(e,c,s)}}function u(e,t,r,s){var a=n.onSuccess(e,r,s);(function e(t,r,s,a){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[],i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:[],u=l(t,s,i);u.rules.length?o(u.absoluteUrls,{onBeforeSend:function(e,t,o){n.onBeforeSend(e,r,t)},onSuccess:function(e,t,o){var s=n.onSuccess(e,r,t),a=l(e=!1===s?"":s||e,t,i);return a.rules.forEach((function(t,r){e=e.replace(t,a.absoluteRules[r])})),e},onError:function(n,o,l){c.push({xhr:n,url:o}),i.push(u.rules[l]),e(t,r,s,a,c,i)},onComplete:function(n){n.forEach((function(e,r){t=t.replace(u.rules[r],e)})),e(t,r,s,a,c,i)}}):a(t,c)})(e=void 0!==a&&!1===Boolean(a)?"":a||e,r,s,(function(e,o){null===c[t]&&(o.forEach((function(e){return n.onError(e.xhr,r,e.url)})),!n.filter||n.filter.test(e)?c[t]=e:c[t]="",i())}))}function l(e,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],s={};return s.rules=(e.replace(t,"").match(r)||[]).filter((function(e){return-1===o.indexOf(e)})),s.urls=s.rules.map((function(e){return e.replace(r,"$1")})),s.absoluteUrls=s.urls.map((function(e){return a(e,n)})),s.absoluteRules=s.rules.map((function(e,t){var r=s.urls[t],o=a(s.absoluteUrls[t],n);return e.replace(r,o)})),s}s.length?s.forEach((function(e,t){var r=e.getAttribute("href"),s=e.getAttribute("rel"),l="link"===e.nodeName.toLowerCase()&&r&&s&&-1!==s.toLowerCase().indexOf("stylesheet"),f=!1!==n.skipDisabled&&e.disabled,d="style"===e.nodeName.toLowerCase();if(l&&!f)o(r,{mimeType:"text/css",onBeforeSend:function(t,r,o){n.onBeforeSend(t,e,r)},onSuccess:function(n,o,s){var c=a(r);u(n,t,e,c)},onError:function(r,o,s){c[t]="",n.onError(r,e,o),i()}});else if(d&&!f){var p=e.textContent;n.useCSSOM&&(p=Array.apply(null,e.sheet.cssRules).map((function(e){return e.cssText})).join("")),u(p,t,e,location.href)}else c[t]="",i()})):n.onComplete("",[])}function a(e,t){var r=document.implementation.createHTMLDocument(""),n=r.createElement("base"),o=r.createElement("a");return r.head.appendChild(n),r.body.appendChild(o),n.href=t||document.baseURI||(document.querySelector("base")||{}).href||location.href,o.href=e,o.href}r.r(t);var c=i;function i(e,t,r){e instanceof RegExp&&(e=u(e,r)),t instanceof RegExp&&(t=u(t,r));var n=l(e,t,r);return n&&{start:n[0],end:n[1],pre:r.slice(0,n[0]),body:r.slice(n[0]+e.length,n[1]),post:r.slice(n[1]+t.length)}}function u(e,t){var r=t.match(e);return r?r[0]:null}function l(e,t,r){var n,o,s,a,c,i=r.indexOf(e),u=r.indexOf(t,i+1),l=i;if(i>=0&&u>0){for(n=[],s=r.length;l>=0&&!c;)l==i?(n.push(l),i=r.indexOf(e,l+1)):1==n.length?c=[n.pop(),u]:((o=n.pop())<s&&(s=o,a=u),u=r.indexOf(t,l+1)),l=i<u&&i>=0?i:u;n.length&&(c=[s,a])}return c}function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={preserveStatic:!0,removeComments:!1},o=n({},r,t),s=[];function a(e){throw new Error("CSS parse error: ".concat(e))}function i(t){var r=t.exec(e);if(r)return e=e.slice(r[0].length),r}function u(){return i(/^{\s*/)}function l(){return i(/^}/)}function f(){i(/^\s*/)}function d(){if(f(),"/"===e[0]&&"*"===e[1]){for(var t=2;e[t]&&("*"!==e[t]||"/"!==e[t+1]);)t++;if(!e[t])return a("end of comment is missing");var r=e.slice(2,t);return e=e.slice(t+2),{type:"comment",comment:r}}}function p(){for(var e,t=[];e=d();)t.push(e);return o.removeComments?[]:t}function m(){for(f();"}"===e[0];)a("extra closing bracket");var t=i(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);if(t)return t[0].trim().replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g,"").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g,(function(e){return e.replace(/,/g,"‌")})).split(/\s*(?![^(]*\)),\s*/).map((function(e){return e.replace(/\u200C/g,",")}))}function v(){if("@"===e[0])return _();i(/^([;\s]*)+/);var t=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=i(/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);if(r){if(r=r[0].trim(),!i(/^:\s*/))return a("property missing ':'");var n=i(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/),o={type:"declaration",property:r.replace(t,""),value:n?n[0].replace(t,"").trim():""};return i(/^[;\s]*/),o}}function h(){if(!u())return a("missing '{'");for(var e,t=p();e=v();)t.push(e),t=t.concat(p());return l()?t:a("missing '}'")}function y(){f();for(var e,t=[];e=i(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);)t.push(e[1]),i(/^,\s*/);if(t.length)return{type:"keyframe",values:t,declarations:h()}}function g(){var e=i(/^@([-\w]+)?keyframes\s*/);if(e){var t=e[1];if(!(e=i(/^([-\w]+)\s*/)))return a("@keyframes missing name");var r,n=e[1];if(!u())return a("@keyframes missing '{'");for(var o=p();r=y();)o.push(r),o=o.concat(p());return l()?{type:"keyframes",name:n,vendor:t,keyframes:o}:a("@keyframes missing '}'")}}function b(){if(i(/^@page */))return{type:"page",selectors:m()||[],declarations:h()}}function S(){var e=i(/@(top|bottom|left|right)-(left|center|right|top|middle|bottom)-?(corner)?\s*/);if(e)return{type:"page-margin-box",name:"".concat(e[1],"-").concat(e[2])+(e[3]?"-".concat(e[3]):""),declarations:h()}}function E(){if(i(/^@font-face\s*/))return{type:"font-face",declarations:h()}}function w(){var e=i(/^@supports *([^{]+)/);if(e)return{type:"supports",supports:e[1].trim(),rules:L()}}function C(){if(i(/^@host\s*/))return{type:"host",rules:L()}}function x(){var e=i(/^@media([^{]+)*/);if(e)return{type:"media",media:(e[1]||"").trim(),rules:L()}}function A(){var e=i(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);if(e)return{type:"custom-media",name:e[1].trim(),media:e[2].trim()}}function O(){var e=i(/^@([-\w]+)?document *([^{]+)/);if(e)return{type:"document",document:e[2].trim(),vendor:e[1]?e[1].trim():null,rules:L()}}function k(){var e=i(/^@(import|charset|namespace)\s*([^;]+);/);if(e)return{type:e[1],name:e[2].trim()}}function _(){if(f(),"@"===e[0]){var t=k()||E()||x()||g()||w()||O()||A()||C()||b()||S();if(t&&!o.preserveStatic){var r=!1;if(t.declarations)r=t.declarations.some((function(e){return/var\(/.test(e.value)}));else r=(t.keyframes||t.rules||[]).some((function(e){return(e.declarations||[]).some((function(e){return/var\(/.test(e.value)}))}));return r?t:{}}return t}}function j(){if(!o.preserveStatic){var t=c("{","}",e);if(t){var r=/:(?:root|host)(?![.:#(])/.test(t.pre)&&/--\S*\s*:/.test(t.body),n=/var\(/.test(t.body);if(!r&&!n)return e=e.slice(t.end+1),{}}}var s=m()||[],i=o.preserveStatic?h():h().filter((function(e){var t=s.some((function(e){return/:(?:root|host)(?![.:#(])/.test(e)}))&&/^--\S/.test(e.property),r=/var\(/.test(e.value);return t||r}));return s.length||a("selector missing"),{type:"rule",selectors:s,declarations:i}}function L(t){if(!t&&!u())return a("missing '{'");for(var r,n=p();e.length&&(t||"}"!==e[0])&&(r=_()||j());)r.type&&n.push(r),n=n.concat(p());return t||l()?n:a("missing '}'")}return{type:"stylesheet",stylesheet:{rules:L(!0),errors:s}}}function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={parseHost:!1,store:{},onWarning:function(){}},o=n({},r,t),s=new RegExp(":".concat(o.parseHost?"host":"root","$"));return"string"==typeof e&&(e=f(e,o)),e.stylesheet.rules.forEach((function(e){"rule"===e.type&&e.selectors.some((function(e){return s.test(e)}))&&e.declarations.forEach((function(e,t){var r=e.property,n=e.value;r&&0===r.indexOf("--")&&(o.store[r]=n)}))})),o.store}function p(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2?arguments[2]:void 0,n={charset:function(e){return"@charset "+e.name+";"},comment:function(e){return 0===e.comment.indexOf("__CSSVARSPONYFILL")?"/*"+e.comment+"*/":""},"custom-media":function(e){return"@custom-media "+e.name+" "+e.media+";"},declaration:function(e){return e.property+":"+e.value+";"},document:function(e){return"@"+(e.vendor||"")+"document "+e.document+"{"+o(e.rules)+"}"},"font-face":function(e){return"@font-face{"+o(e.declarations)+"}"},host:function(e){return"@host{"+o(e.rules)+"}"},import:function(e){return"@import "+e.name+";"},keyframe:function(e){return e.values.join(",")+"{"+o(e.declarations)+"}"},keyframes:function(e){return"@"+(e.vendor||"")+"keyframes "+e.name+"{"+o(e.keyframes)+"}"},media:function(e){return"@media "+e.media+"{"+o(e.rules)+"}"},namespace:function(e){return"@namespace "+e.name+";"},page:function(e){return"@page "+(e.selectors.length?e.selectors.join(", "):"")+"{"+o(e.declarations)+"}"},"page-margin-box":function(e){return"@"+e.name+"{"+o(e.declarations)+"}"},rule:function(e){var t=e.declarations;if(t.length)return e.selectors.join(",")+"{"+o(t)+"}"},supports:function(e){return"@supports "+e.supports+"{"+o(e.rules)+"}"}};function o(e){for(var o="",s=0;s<e.length;s++){var a=e[s];r&&r(a);var c=n[a.type](a);c&&(o+=c,c.length&&a.selectors&&(o+=t))}return o}return o(e.stylesheet.rules)}function m(e,t){e.rules.forEach((function(r){r.rules?m(r,t):r.keyframes?r.keyframes.forEach((function(e){"keyframe"===e.type&&t(e.declarations,r)})):r.declarations&&t(r.declarations,e)}))}i.range=l;function v(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={preserveStatic:!0,preserveVars:!1,variables:{},onWarning:function(){}},o=n({},r,t);return"string"==typeof e&&(e=f(e,o)),m(e.stylesheet,(function(e,t){for(var r=0;r<e.length;r++){var n=e[r],s=n.type,a=n.property,c=n.value;if("declaration"===s)if(o.preserveVars||!a||0!==a.indexOf("--")){if(-1!==c.indexOf("var(")){var i=y(c,o);i!==n.value&&(i=h(i),o.preserveVars?(e.splice(r,0,{type:s,property:a,value:i}),r++):n.value=i)}}else e.splice(r,1),r--}})),p(e)}function h(e){return(e.match(/calc\(([^)]+)\)/g)||[]).forEach((function(t){var r="calc".concat(t.split("calc").join(""));e=e.replace(t,r)})),e}function y(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2?arguments[2]:void 0;if(-1===e.indexOf("var("))return e;var n=c("(",")",e);function o(e){var n=e.split(",")[0].replace(/[\s\n\t]/g,""),o=(e.match(/(?:\s*,\s*){1}(.*)?/)||[])[1],s=Object.prototype.hasOwnProperty.call(t.variables,n)?String(t.variables[n]):void 0,a=s||(o?String(o):void 0),c=r||e;return s||t.onWarning('variable "'.concat(n,'" is undefined')),a&&"undefined"!==a&&a.length>0?y(a,t,c):"var(".concat(c,")")}if(n){if("var"===n.pre.slice(-3)){var s=0===n.body.trim().length;return s?(t.onWarning("var() must contain a non-whitespace string"),e):n.pre.slice(0,-3)+o(n.body)+y(n.post,t)}return n.pre+"(".concat(y(n.body,t),")")+y(n.post,t)}return-1!==e.indexOf("var(")&&t.onWarning('missing closing ")" in the value "'.concat(e,'"')),e}var g="undefined"!=typeof window,b=g&&window.CSS&&window.CSS.supports&&window.CSS.supports("(--a: 0)"),S={group:0,job:0},E={rootElement:g?document:null,shadowDOM:!1,include:"style,link[rel=stylesheet]",exclude:"",variables:{},onlyLegacy:!0,preserveStatic:!0,preserveVars:!1,silent:!1,updateDOM:!0,updateURLs:!0,watch:null,onBeforeSend:function(){},onError:function(){},onWarning:function(){},onSuccess:function(){},onComplete:function(){},onFinally:function(){}},w={cssComments:/\/\*[\s\S]+?\*\//g,cssKeyframes:/@(?:-\w*-)?keyframes/,cssMediaQueries:/@media[^{]+\{([\s\S]+?})\s*}/g,cssUrls:/url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,cssVarDeclRules:/(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^}]*})/g,cssVarDecls:/(?:[\s;]*)(-{2}\w[\w-]*)(?:\s*:\s*)([^;]*);/g,cssVarFunc:/var\(\s*--[\w-]/,cssVars:/(?:(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/},C={dom:{},job:{},user:{}},x=!1,A=null,O=0,k=null,_=!1;
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
function j(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t="cssVars(): ",r=n({},E,e);function o(e,n,o,s){!r.silent&&window.console&&console.error("".concat(t).concat(e,"\n"),n),r.onError(e,n,o,s)}function a(e){!r.silent&&window.console&&console.warn("".concat(t).concat(e)),r.onWarning(e)}function c(e){r.onFinally(Boolean(e),b,N()-r.__benchmark)}if(g){if(r.watch)return r.watch=E.watch,L(r),void j(r);if(!1===r.watch&&A&&(A.disconnect(),A=null),!r.__benchmark){if(x===r.rootElement)return void M(e);var i=Array.apply(null,r.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])'));if(r.__benchmark=N(),r.exclude=[A?'[data-cssvars]:not([data-cssvars=""])':'[data-cssvars="out"]',"link[disabled]:not([data-cssvars])",r.exclude].filter((function(e){return e})).join(","),r.variables=T(r.variables),i.forEach((function(e){var t="style"===e.nodeName.toLowerCase()&&e.__cssVars.text,r=t&&e.textContent!==e.__cssVars.text;t&&r&&(e.sheet&&(e.sheet.disabled=!1),e.setAttribute("data-cssvars",""))})),!A){var u=Array.apply(null,r.rootElement.querySelectorAll('[data-cssvars="out"]'));u.forEach((function(e){var t=e.getAttribute("data-cssvars-group");(t?r.rootElement.querySelector('[data-cssvars="src"][data-cssvars-group="'.concat(t,'"]')):null)||e.parentNode.removeChild(e)})),O&&i.length<O&&(O=i.length,C.dom={})}}if("loading"!==document.readyState)if(b&&r.onlyLegacy){var l=!1;if(r.updateDOM){var m=r.rootElement.host||(r.rootElement===document?document.documentElement:r.rootElement);Object.keys(r.variables).forEach((function(e){var t=r.variables[e];l=l||t!==getComputedStyle(m).getPropertyValue(e),m.style.setProperty(e,t)}))}c(l)}else!_&&(r.shadowDOM||r.rootElement.shadowRoot||r.rootElement.host)?s({rootElement:E.rootElement,include:E.include,exclude:r.exclude,skipDisabled:!1,onSuccess:function(e,t,r){return!((t.sheet||{}).disabled&&!t.__cssVars)&&((e=((e=e.replace(w.cssComments,"").replace(w.cssMediaQueries,"")).match(w.cssVarDeclRules)||[]).join(""))||!1)},onComplete:function(e,t,n){d(e,{store:C.dom,onWarning:a}),_=!0,j(r)}}):(x=r.rootElement,s({rootElement:r.rootElement,include:r.include,exclude:r.exclude,skipDisabled:!1,onBeforeSend:r.onBeforeSend,onError:function(e,t,r){var n=e.responseURL||D(r,location.href),s=e.statusText?"(".concat(e.statusText,")"):"Unspecified Error"+(0===e.status?" (possibly CORS related)":"");o("CSS XHR Error: ".concat(n," ").concat(e.status," ").concat(s),t,e,n)},onSuccess:function(e,t,n){if((t.sheet||{}).disabled&&!t.__cssVars)return!1;var o="link"===t.nodeName.toLowerCase(),s="style"===t.nodeName.toLowerCase()&&e!==t.textContent,a=r.onSuccess(e,t,n);return e=void 0!==a&&!1===Boolean(a)?"":a||e,r.updateURLs&&(o||s)&&(e=R(e,n)),e},onComplete:function(e,t){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],i=n({},C.dom,C.user);if(C.job={},s.forEach((function(e,n){var s=t[n];if(e.__cssVars=e.__cssVars||{},e.__cssVars.text=s,w.cssVars.test(s))try{var c=f(s,{preserveStatic:r.preserveStatic,removeComments:!0});d(c,{parseHost:Boolean(r.rootElement.host),store:C.dom,onWarning:a}),e.__cssVars.tree=c}catch(t){o(t.message,e)}})),n(C.job,C.dom),r.updateDOM?(n(C.user,r.variables),n(C.job,C.user)):(n(C.job,C.user,r.variables),n(i,r.variables)),S.job>0&&Boolean(Object.keys(C.job).length>Object.keys(i).length||Boolean(Object.keys(i).length&&Object.keys(C.job).some((function(e){return C.job[e]!==i[e]})))))B(r.rootElement),j(r);else{var u=[],l=[],m=!1;if(r.updateDOM&&S.job++,s.forEach((function(e,s){var c=!e.__cssVars.tree;if(e.__cssVars.tree)try{v(e.__cssVars.tree,n({},r,{variables:C.job,onWarning:a}));var i=p(e.__cssVars.tree);if(r.updateDOM){var f=t[s],d=w.cssVarFunc.test(f);if(e.getAttribute("data-cssvars")||e.setAttribute("data-cssvars","src"),i.length&&d){var h=e.getAttribute("data-cssvars-group")||++S.group,y=i.replace(/\s/g,""),g=r.rootElement.querySelector('[data-cssvars="out"][data-cssvars-group="'.concat(h,'"]'))||document.createElement("style");m=m||w.cssKeyframes.test(i),r.preserveStatic&&e.sheet&&(e.sheet.disabled=!0),g.hasAttribute("data-cssvars")||g.setAttribute("data-cssvars","out"),y===e.textContent.replace(/\s/g,"")?(c=!0,g&&g.parentNode&&(e.removeAttribute("data-cssvars-group"),g.parentNode.removeChild(g))):y!==g.textContent.replace(/\s/g,"")&&([e,g].forEach((function(e){e.setAttribute("data-cssvars-job",S.job),e.setAttribute("data-cssvars-group",h)})),g.textContent=i,u.push(i),l.push(g),g.parentNode||e.parentNode.insertBefore(g,e.nextSibling))}}else e.textContent.replace(/\s/g,"")!==i&&u.push(i)}catch(t){o(t.message,e)}c&&e.setAttribute("data-cssvars","skip"),e.hasAttribute("data-cssvars-job")||e.setAttribute("data-cssvars-job",S.job)})),O=r.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])').length,r.shadowDOM)for(var h,y=[].concat(r.rootElement).concat(Array.apply(null,r.rootElement.querySelectorAll("*"))),g=0;h=y[g];++g)if(h.shadowRoot&&h.shadowRoot.querySelector("style")){var b=n({},r,{rootElement:h.shadowRoot});j(b)}r.updateDOM&&m&&V(r.rootElement),x=!1,r.onComplete(u.join(""),l,JSON.parse(JSON.stringify(C.job)),N()-r.__benchmark),c(l.length)}}}));else document.addEventListener("DOMContentLoaded",(function t(r){j(e),document.removeEventListener("DOMContentLoaded",t)}))}}function L(e){function t(e){var t=r(e)&&e.hasAttribute("disabled"),n=(e.sheet||{}).disabled;return t||n}function r(e){return"link"===e.nodeName.toLowerCase()&&-1!==(e.getAttribute("rel")||"").indexOf("stylesheet")}function n(e){return"style"===e.nodeName.toLowerCase()}window.MutationObserver&&(A&&(A.disconnect(),A=null),(A=new MutationObserver((function(o){o.some((function(o){return function(n){var o=!1;if("attributes"===n.type&&r(n.target)&&!t(n.target)){var s="disabled"===n.attributeName,a="href"===n.attributeName,c="skip"===n.target.getAttribute("data-cssvars"),i="src"===n.target.getAttribute("data-cssvars");s?o=!c&&!i:a&&(c?n.target.setAttribute("data-cssvars",""):i&&B(e.rootElement,!0),o=!0)}return o}(o)||function(e){var t=!1;if("childList"===e.type){var r=n(e.target),o="out"===e.target.getAttribute("data-cssvars");t=r&&!o}return t}(o)||function(e){var o=!1;return"childList"===e.type&&(o=Array.apply(null,e.addedNodes).some((function(e){var o=1===e.nodeType&&e.hasAttribute("data-cssvars"),s=n(e)&&w.cssVars.test(e.textContent);return!o&&(r(e)||s)&&!t(e)}))),o}(o)||function(t){var r=!1;return"childList"===t.type&&(r=Array.apply(null,t.removedNodes).some((function(t){var r=1===t.nodeType,n=r&&"out"===t.getAttribute("data-cssvars"),o=r&&"src"===t.getAttribute("data-cssvars"),s=o;if(o||n){var a=t.getAttribute("data-cssvars-group"),c=e.rootElement.querySelector('[data-cssvars-group="'.concat(a,'"]'));o&&B(e.rootElement,!0),c&&c.parentNode.removeChild(c)}return s}))),r}(o)}))&&j(e)}))).observe(document.documentElement,{attributes:!0,attributeFilter:["disabled","href"],childList:!0,subtree:!0}))}function M(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;clearTimeout(k),k=setTimeout((function(){e.__benchmark=null,j(e)}),t)}function V(e){var t=["animation-name","-moz-animation-name","-webkit-animation-name"].filter((function(e){return getComputedStyle(document.body)[e]}))[0];if(t){for(var r=e.getElementsByTagName("*"),n=[],o=0,s=r.length;o<s;o++){var a=r[o];"none"!==getComputedStyle(a)[t]&&(a.style[t]+="__CSSVARSPONYFILL-KEYFRAMES__",n.push(a))}document.body.offsetHeight;for(var c=0,i=n.length;c<i;c++){var u=n[c].style;u[t]=u[t].replace("__CSSVARSPONYFILL-KEYFRAMES__","")}}}function R(e,t){return(e.replace(w.cssComments,"").match(w.cssUrls)||[]).forEach((function(r){var n=r.replace(w.cssUrls,"$1"),o=D(n,t);e=e.replace(r,r.replace(n,o))})),e}function T(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=/^-{2}/;return Object.keys(e).reduce((function(r,n){return r[t.test(n)?n:"--".concat(n.replace(/^-+/,""))]=e[n],r}),{})}function D(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:location.href,r=document.implementation.createHTMLDocument(""),n=r.createElement("base"),o=r.createElement("a");return r.head.appendChild(n),r.body.appendChild(o),n.href=t,o.href=e,o.href}function N(){return g&&(window.performance||{}).now?window.performance.now():(new Date).getTime()}function B(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=Array.apply(null,e.querySelectorAll('[data-cssvars="skip"],[data-cssvars="src"]'));r.forEach((function(e){return e.setAttribute("data-cssvars","")})),t&&(C.dom={})}j.reset=function(){for(var e in S.job=0,S.group=0,x=!1,A&&(A.disconnect(),A=null),O=0,k=null,_=!1,C)C[e]={}},t.default=j}}]);
//# sourceMappingURL=0.chunk.9bd17.js.map