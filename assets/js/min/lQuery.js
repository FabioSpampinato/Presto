!function(e,t,n){"use strict";var r=t.documentElement,i,s=r.matches||r.matchesSelector||r.webkitMatchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector,o=getComputedStyle,a={cellpadding:"cellPadding",cellspacing:"cellSpacing","class":"className",colspan:"colSpan",contenteditable:"contentEditable","for":"htmlFor",frameborder:"frameBorder",maxlength:"maxLength",readonly:"readOnly",rowspan:"rowSpan",tabindex:"tabIndex",usemap:"useMap"},u=["column-count","columns","font-weight","line-height","opacity","z-index","zoom"],h=function(e,t){return 3-(6&e.compareDocumentPosition(t))},f=function(e,t){for(var n,r=t||0,i=e.length;i>r;r++){if(n=e.charCodeAt(r),122>=n&&n>=48){if(n>=97)continue;if(90>=n){if(57>=n)continue;if(n>=65)continue;if(95===n)continue;if(45===n)continue}}return!1}return!0},d=function(e,t){var n;return"."===e[0]?v.makeArray(f(e,1)?t.getElementsByClassName(e.slice(1)):t.querySelectorAll(e)):"#"===e[0]?f(e,1)?(n=t.getElementById(e.slice(1)))?[n]:[]:v.makeArray(t.querySelectorAll(e)):v.makeArray(f(e)?t.getElementsByTagName(e):t.querySelectorAll(e))},l=function(e){var n=t.createDocumentFragment(),r=n.appendChild(t.createElement("div"));return r.innerHTML=e,r},c=function(e,t){return _.isNaN(t)||-1!==u.indexOf(e)?t:t+"px"},p=function(e){try{return e?"true"==e?!0:"false"==e?!1:"null"==e?null:+e+""==e?+e:/^[\[\{]/.test(e)?JSON.parse(e):e:e}catch(t){return e}},v=function(e,t){return _.isFunction(e)?v.ready(e):new v.fn.init(e,t)},g=function(e){return new v.fn.init_node(e)},m=function(e,t){return new v.fn.init_arr(e,t)};v.guid=function(e){return e.guid||(e.guid=_.uniqueId())},v.Event=function(e,n){_.isString(e)||(n=e,e=n.type);var r=t.createEvent(v.event.specialEvents[e]||"Events"),i=!0;if(n)for(var s in n)"bubbles"===s?i=!!n[s]:r[s]=n[s];return r.initEvent(e,i,!0),v.event.compatible(r)},v.event={focusinSupported:"onfocusin"in e,focus:{focus:"focusin",blur:"focusout"},hover:{mouseenter:"mouseover",mouseleave:"mouseout"},ignoreProperties:/^([A-Z]|returnValue$|layer[XY]$)/,specialEvents:{click:"MouseEvents",mousedown:"MouseEvents",mouseup:"MouseEvents",mousemove:"MouseEvents"},eventMethods:{preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"},parse:function(e){var t=(""+e).split(".");return{event:t[0],namespace:t.slice(1).sort().join(" ")}},matcherFor:function(e){return new RegExp("(?:^| )"+e.replace(" "," .* ?")+"(?: |$)")},eventCapture:function(e,t){return e.delegator&&!this.focusinSupported&&e.event in this.focus||!!t},realEvent:function(e){return this.hover[e]||this.focusinSupported&&this.focus[e]||e},createProxy:function(e){var t,n={originalEvent:e};for(t in e)this.ignoreProperties.test(t)||_.isUndefined(e[t])||(n[t]=e[t]);return this.compatible(n,e)},compatible:function(e,t){if(t||!e.isDefaultPrevented){_.isUndefined(t)&&(t=e);for(var n in this.eventMethods){var r=t[n];e[n]=function(){return this[v.event.eventMethods[n]]=v["true"],r&&r.apply(t,arguments)},e[v.event.eventMethods[n]]=v["false"]}(_.isUndefined(t.defaultPrevented)?"returnValue"in t?t.returnValue===!1:t.getPreventDefault&&t.getPreventDefault():t.defaultPrevented)&&(e.isDefaultPrevented=v["true"])}return e},handlers:{},findHandlers:function(e,t,n,r){if(t=this.parse(t),t.namespace)var i=this.matcherFor(t.namespace);return(this.handlers[v.guid(e)]||[]).filter(function(e){return!(!e||t.event&&e.event!=t.event||t.namespace&&!i.test(e.namespace)||n&&v.guid(e.callback)!==v.guid(n)||r&&e.selector!==r)})},add:function(e,t,n,r,i,s,o){var a=v.guid(e),u=this.handlers[a]||(this.handlers[a]=[]);"ready"===t&&v.ready(n);var h=this.parse(t);h.callback=n,h.selector=i,h.delegator=s;var f=s||n;h.proxy=function(t){if(t=v.event.compatible(t),!t.isImmediatePropagationStopped()){t.data=r;var n=f.apply(e,_.isUndefined(t._args)?[t]:[t].concat(t._args));return n===!1&&(t.preventDefault(),t.stopPropagation()),n}},h.id=u.length,u.push(h),e.addEventListener(this.realEvent(h.event),h.proxy,this.eventCapture(h,o))},remove:function(e,t,n,r,i){for(var s=v.guid(e),o=this.findHandlers(e,t,n,r),a=0,u=o.length;u>a;a++)delete this.handlers[s][o[a].id],e.removeEventListener(this.realEvent(o[a].event),o[a].proxy,this.eventCapture(o[a],i))}},v.ready=function(e){"complete"===t.readyState?e():t.addEventListener("DOMContentLoaded",e)},v.noop=_.noop,v["true"]=function(){return!0},v["false"]=function(){return!1},v.makeArray=_.toArray,v.unique=function(e,t){for(var n=t?e:e.sort(h),r,i=n.length-1;i>=0;i--)n[i]===r?n.splice(i,1):r=n[i];return n},v.camelCase=function(e){return e.replace(/(^-+|-+$)/g,"").replace(/-+(.)?/g,function(e,t){return t.toUpperCase()})},v.data=function(e,t,n){return _.isUndefined(e.lQuery_data)&&(e.lQuery_data={}),_.isUndefined(n)?e.lQuery_data[t]:void(e.lQuery_data[t]=n)},v.extend=_.extend,v.defer=function(e,t){r.offsetHeight,setTimeout(e,t||0)},v.ajax=function(e){var t=new XMLHttpRequest;t.open(e.type,e.url,!0),t.setRequestHeader("X-Requested-With","XMLHttpRequest"),t.onload=function(){t.status>=200&&t.status<400?e.success&&e.success(e.json?JSON.parse(t.responseText):t.responseText):e.error&&e.error(e.json?JSON.parse(t.responseText):t.responseText)},e.error&&(t.onerror=function(){e.error(e.json?JSON.parse(t.responseText):t.responseText)}),e.before&&e.before(),t.send(e.data),e.after&&e.after()},v.parseHTML=function(e){var n=/^<(\w+)\s*\/?>(?:<\/\1>|)$/.exec(e);return n?[t.createElement(n[1])]:(n=l(e),v.makeArray(n.childNodes))},v.eventXY=function(e){var t={X:0,Y:0};return _.isUndefined(e.originalEvent)&&(e=e.originalEvent),_.isUndefined(e.touches)&&_.isUndefined(e.touches[0])?(t.X=e.touches[0].pageX,t.Y=e.touches[0].pageY):_.isUndefined(e.changedTouches)&&_.isUndefined(e.changedTouches[0])?(t.X=e.changedTouches[0].pageX,t.Y=e.changedTouches[0].pageY):_.isUndefined(e.pageX)&&(t.X=e.pageX,t.Y=e.pageY),t},v.matches=function(e,t,n){return"string"==typeof t?s?s.call(e,t):-1!==d(t,e.parentNode).indexOf(e):t instanceof Function?t.call(e,n,e):t instanceof v?t.nodes[0]===e:t===e},v.offset=function(t){var n=t.getBoundingClientRect();return{top:n.top+e.pageYOffset-r.clientTop,left:n.left+e.pageXOffset-r.clientLeft,width:n.width,height:n.height}},v.fn=v.prototype={init:function(e,n){return this.nodes="string"==typeof e?"<"===e[0]&&">"===e[e.length-1]&&e.length>=3?v.parseHTML(e):d(e,n&&n instanceof v?v.nodes[0]||t:t):e instanceof v?e.nodes:e instanceof Node||e instanceof Window?[e]:e instanceof NodeList||e instanceof HTMLCollection?n?v.makeArray(e):v.unique(v.makeArray(e)):e instanceof Array?n?e:v.unique(e):[],this.length=this.nodes.length,this},init_node:function(e){return this.nodes=[e],this.length=1,this},init_arr:function(e,t){return this.nodes=t?e:v.unique(e),this.length=this.nodes.length,this},attr:function(e,t){if(_.isPlainObject(e)){for(var r in e)this.attr(r,e[r]);return this}if(_.isUndefined(t))return this.nodes[0]?this.nodes[0].getAttribute(e):n;for(var i=0,s=this.length;s>i;i++)this.nodes[i].setAttribute(e,t);return this},removeAttr:function(e){for(var t=0,n=this.length;n>t;t++)this.nodes[t].removeAttribute(e);return this},data:function(e,t){if(_.isUndefined(t)){var r=this.attr("data-"+e.toLowerCase());return r?p(r):n}return this.attr("data-"+e.toLowerCase(),t)},removeData:function(e){return this.removeAttr("data-"+e.toLowerCase())},prop:function(e,t){if(_.isUndefined(t))return this.nodes[0]?this.nodes[0][e]:n;for(var r=0,i=this.length;i>r;r++)this.nodes[r][e]=t;return this},removeProp:function(e){e=a[e]||e;for(var t=0,n=this.length;n>t;t++)delete this.nodes[t][e];return this},val:function(e){if(_.isUndefined(e)){if(!this.nodes[0])return;if(this.nodes[0].multiple){for(var t=[],n=0,r=this.options.length;r>n;n++)this.options[n].selected&&t.push(this.options[n].value);return t}return this.nodes[0].value}for(var n=0,r=this.length;r>n;n++)this.nodes[n].value=e;return this},css:function(e,t){if(_.isPlainObject(e)){for(var r in e)this.css(r,e[r]);return this}if(t=c(e,t),e=v.camelCase(e),_.isUndefined(t))return this.nodes[0]?o(this.nodes[0])[e]:n;for(var i=0,s=this.length;s>i;i++)this.nodes[i].style[e]=t;return this},addClass:function(e){e=e.split(" ");for(var t=e.length,n=0,r=this.length;r>n;n++)for(var i=0;t>i;i++)this.nodes[n].classList.add(e[i]);return this},removeClass:function(e){e=e.split(" ");for(var t=e.length,n=0,r=this.length;r>n;n++)for(var i=0;t>i;i++)this.nodes[n].classList.remove(e[i]);return this},hasClass:function(e){e=e.split(" ");for(var t=e.length,n=0,r=this.length;r>n;n++){for(var i=0;t>i;i++)this.nodes[n].classList.contains(e[i])||(i=100);if(i===t)return!0}return!1},toggleClass:function(e,t){if(_.isUndefined(t)){e=e.split(" ");for(var n=e.length,r=0,i=this.length;i>r;r++)for(var s=0;n>s;s++)this.nodes[r].classList.toggle(e[s]);return this}return t?this.addClass(e):this.removeClass(e)},width:function(n){if(!_.isUndefined(n))return this.css("width",n);var i=this.nodes[0];return i?i===e?i.innerWidth:i===t?r.scrollWidth:v.offset(i).width:null},height:function(n){if(!_.isUndefined(n))return this.css("height",n);var i=this.nodes[0];return i?i===e?i.innerHeight:i===t?r.scrollHeight:v.offset(i).height:null},show:function(){return this.css("display","")},hide:function(){return this.css("display","none")},toggle:function(e){for(var t=_.isBoolean(e)?e?"":"none":n,r=0,i=this.length;i>r;r++)this.nodes[r].style.display=_.isUndefined(t)?"none"!==o(this.nodes[r]).display?"none":"":t;return this},slideDown:function(){},slideUp:function(){},slideToggle:function(e){},on:function(e,t,r,i,s){var o,a,u=this;if(_.isPlainObject(e)){for(var h in e)this.on(h,t,r,e[h],s);return this}_.isString(t)||_.isFunction(i)||i===!1||(i=r,r=t,t=n),(_.isFunction(r)||r===!1)&&(i=r,r=n),i===!1&&(i=v["false"]);for(var f=e.split(" "),d=f.length,l=0,c=this.length;c>l;l++)for(var p=0;d>p;p++){if(s)var o=function(e){return function(t){return v.event.remove(e,t.type,i),i.apply(e,arguments)}}(u.nodes[l]);if(t)var a=function(e,n){return function(r){for(var s=v(e).find(t),o=s.length-1;o>=0;o--)if(-1!==r.path.indexOf(s.nodes[o])){var a=_.extend(v.event.createProxy(r),{currentTarget:r.target,liveFired:e});(n||i).apply(s.nodes[o],[a].concat(Array.prototype.slice.call(arguments,1)))}}}(u.nodes[l],o);v.event.add(this.nodes[l],f[p],i,r,t,a||o)}return this},off:function(e,t,r){if(_.isPlainObject(e)){for(var i in e)this.off(i,t,e[i]);return this}_.isString(t)||_.isFunction(r)||r===!1||(r=t,t=n),r===!1&&(r=v["false"]);for(var s=e.split(" "),o=s.length,a=0,u=this.length;u>a;a++)for(var h=0;o>h;h++)v.event.remove(this.nodes[a],s[h],r,t);return this},one:function(e,t,n,r){return this.on(e,t,n,r,1)},trigger:function(e,t){e=_.isString(e)||_.isPlainObject(e)?v.Event(e):v.event.compatible(e),e._args=t;for(var n=0,r=this.length;r>n;n++)e.type in focus&&_.isFunction(this.nodes[n][e.type])?this.nodes[n][e.type]():this.nodes[n].dispatchEvent(e)},triggerHandler:function(e,t){for(var n=0,r=this.length;r>n;n++){var i=v.event.createProxy(_.isString(e)?v.Event(e):e);i._args=t,i.target=this.nodes[n];for(var s=v.event.findHandlers(this.nodes[n],e.type||e),o=0,a=s.length;a>o&&(s[n].proxy(i),!i.isImmediatePropagationStopped());o++);}return this},ready:function(e){return v.ready(e),this},hover:function(e,t){return this.mouseenter(e).mouseleave(t)},filter:function(e){for(var t=[],n=0,r=this.length;r>n;n++)v.matches(this.nodes[n],e,n)&&t.push(this.nodes[n]);return m(t,!0)},is:function(e){for(var t=0,n=this.length;n>t;t++)if(v.matches(this.nodes[t],e))return!0;return!1},not:function(e){return this.filter(function(t){return!v.matches(this,e,t)})},first:function(){var e=this.nodes[0];return m(e?[e]:[],!0)},last:function(){var e=this.nodes[this.length-1];return m(e?[e]:[],!0)},eq:function(e){var t=this.get(e);return m(t?[t]:[],!0)},slice:function(e,t){return m(this.nodes.slice(e,t),!0)},serializeArray:function(){var e=this.nodes[0],t=[];if(e&&"FORM"===e.nodeName){for(var n=0,r=e.elements.length;r>n;n++){var i=e.elements[n];i.name&&"FIELDSET"!==i.nodeName&&!i.disabled&&"submit"!==i.type&&"reset"!==i.type&&"button"!==i.type&&"file"!==i.type&&("radio"!==i.type&&"checkbox"!==i.type||i.checked)&&t.push({name:i.name,value:g(i).val()})}return t}},serialize:function(){for(var e=this.serializeArray(),t=[],n=0,r=e.length;r>n;n++)t.push(encodeURIComponent(e[n].name)+"="+encodeURIComponent(e[n].value));return t.join("&")},before:function(e){for(var t=v(e).nodes,n=0,r=this.length;r>n;n++)for(var i=0,s=t.length;s>i;i++)this.nodes[n].parentNode.insertBefore(t[i].cloneNode(!0),this.nodes[n]);return this},after:function(e){for(var t=v(e).nodes,n=0,r=this.length;r>n;n++)for(var i=0,s=t.length;s>i;i++)this.nodes[n].parentNode.insertBefore(t[i].cloneNode(!0),this.nodes[n].nextSibling);return this},prepend:function(e){for(var t=v(e).nodes,n=0,r=this.length;r>n;n++)for(var i=0,s=t.length;s>i;i++)this.nodes[n].insertBefore(t[i].cloneNode(!0),this.nodes[n].firstChild);return this},append:function(e){for(var t=v(e).nodes,n=0,r=this.length;r>n;n++)for(var i=0,s=t.length;s>i;i++)this.nodes[n].insertBefore(t[i].cloneNode(!0),null);return this},insertBefore:function(e){return v(e).before(this),this},insertAfter:function(e){return v(e).after(this),this},prependTo:function(e){return v(e).prepend(this),this},appendTo:function(e){return v(e).append(this),this},text:function(){return this.prop("textContent")},html:function(e){return this.prop("innerHTML",e)},replaceWith:function(e){return this.prop("outerHTML",e)},empty:function(){for(var e=0,t=this.length;t>e;e++)for(;this.nodes[e].hasChildNodes();)this.nodes[e].removeChild(this.nodes[e].lastChild);return this},remove:function(){for(var e=0,t=this.length;t>e;e++)this.nodes[e].parentNode&&this.nodes[e].parentNode.removeChild(this.nodes[e]);return this},detach:function(){return this.remove()},clone:function(){for(var e=new Array(this.length),t=0,n=this.length;n>t;t++)e[t]=this.nodes[t].cloneNode(!0);return m(e,!0)},get:function(e){return this.nodes[0>e?this.length+e:e]},index:function(e){return this.nodes[0]?e?this.nodes.indexOf(v(e).get(0)):v.makeArray(this.nodes[0].parentNode.childNodes).indexOf(this.nodes[0]):-1},size:function(){return this.length},toArray:function(){return this.nodes.slice()},offset:function(){return this.nodes[0]?v.offset(this.nodes[0]):n},offsetParent:function(){if(!this.nodes[0])return this;for(var e=this.nodes[0].offsetParent||r;e&&e!==r&&"static"===o(e).position;)e=e.offsetParent;return g(e||r)},position:function(){if(!this.nodes[0])return n;var e={top:0,left:0};if("fixed"===this.nodes[0].position)var t=this.nodes[0].getBoundingClientRect();else{var i=this.offsetParent(),t=this.offset();i.get(0)!==r&&(e=i.offset()),e.top+=parseFloat(o(i.get(0)).borderTopWidth),e.left+=parseFloat(o(i.get(0)).borderLeftWidth)}return{top:t.top-e.top-parseFloat(o(this.nodes[0]).marginTop),left:t.left-e.left-parseFloat(o(this.nodes[0]).marginLeft)}},scrollTop:function(e){return this.prop("scrollTop",e)},scrollBottom:function(e){if(_.isUndefined(e))return this.nodes[0]?this.nodes[0].scrollHeight-this.nodes[0].scrollTop-this.nodes[0].clientHeight:n;for(var t=0,r=this.length;r>t;t++)this.nodes[t].scrollTop=this.nodes[t].scrollHeight-this.nodes[t].clientHeight-e;return this},scrollLeft:function(e){return this.prop("scrollLeft",e)},scrollRight:function(e){if(_.isUndefined(e))return this.nodes[0]?this.nodes[0].scrollWidth-this.nodes[0].scrollLeft-this.nodes[0].clientWidth:n;for(var t=0,r=this.length;r>t;t++)this.nodes[t].scrollLeft=this.nodes[t].scrollWidth-this.nodes[t].clientWidth-e;return this},add:function(e){var t=v(e).nodes;return m(this.nodes.concat(t),0===this.length||0===t.length)},parents:function(e,n){for(var r=[],i=0,s=this.length;s>i;i++)for(var o=0,a=this.nodes[i].parentNode;(_.isUndefined(n)||n>o)&&a!==t;)(e&&v.matches(a,e)||!e)&&(r.push(a),o++),a=a.parentNode;return m(r,this.length<2)},parent:function(e){var t=this.parents(n,1);return e?t.filter(e):t},closest:function(e){return this.parents(e,1)},children:function(e,t){for(var n=[],r=0,i=0,s=this.length;s>i;i++){for(var o=!1,a=this.nodes[i].childNodes,u=0,h=a.length;h>u;u++)(t===!1||1===a[u].nodeType)&&(n.push(a[u]),o=!0);o&&r++}var f=m(n,2>r);return e?f.filter(e):f},contents:function(){return this.children(n,!1)},siblings:function(e){for(var t=[],n=0,r=0,i=this.length;i>r;r++){for(var s=!1,o=this.nodes[r].parentNode.childNodes,a=0,u=o.length;u>a;a++)1===o[a].nodeType&&o[a]!==this.nodes[r]&&(t.push(o[a]),s=!0);s&&n++}var h=m(t,2>n);return e?h.filter(e):h},find:function(e){for(var t=[],n=0,r=0,i=this.length;i>r;r++){var s=d(e,this.nodes[r]);s.length>0&&(t=t.concat(s),n++)}return m(t,2>n)},prev:function(e){for(var t=[],n,r=0,i=this.length;i>r;r++)n=this.nodes[0].previousElementSibling,n&&t.push(n);var s=m(t,!0);return e?s.filter(e):s},next:function(e){for(var t=[],n,r=0,i=this.length;i>r;r++)n=this.nodes[0].nextElementSibling,n&&t.push(n);var s=m(t,!0);return e?s.filter(e):s},each:function(e){for(var t=0,n=this.length;n>t&&e.call(this.nodes[t],t,this.nodes[t])!==!1;t++);return this},map:function(e){for(var t=[],n,r=0,i=this.length;i>r;r++)n=e.call(this.nodes[r],r,this.nodes[r]),n&&(n instanceof Node||selector instanceof Window?t.push(n):selector instanceof Array&&(t=t.concat(n)));return m(t,t.length<2)},defer:function(e,t){r.offsetHeight;var n=this;return setTimeout(function(){e.apply(n)},t||0),this}},["blur","change","click","contextmenu","dblclick","error","focus","focusin","focusout","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","resize","scroll","select","submit","unload"].forEach(function(e){v.fn[e]=function(t){return t?this.on(e,t):this.trigger(e)}}),v.fn.init.prototype=v.fn.init_node.prototype=v.fn.init_arr.prototype=v.fn,e.lQuery=v,e.lQuery_node=g,e.lQuery_arr=m,_.isUndefined(e.$)&&(e.$=v,e.$_node=g,e.$_arr=m),v.ready(function(){i=t.body,e.$window=g(e),e.$document=g(t),e.$html=g(t.documentElement),e.$body=g(t.body)})}(window,document);