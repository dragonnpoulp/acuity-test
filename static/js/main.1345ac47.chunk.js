(this.webpackJsonpacuity=this.webpackJsonpacuity||[]).push([[0],{22:function(t,e,a){},23:function(t,e,a){},27:function(t,e,a){"use strict";a.r(e);var r=a(1),n=a.n(r),c=a(14),s=a.n(c),i=(a(22),a(23),a(3)),o=a(2),u=a.n(o),d=a(4),l=a(15),b=a(6),j=a(7),h=a(5),f=a(10),O=a(9),v=a(16),p=a.n(v),m=a(17),k=a(8),y=a.n(k),x=new TextDecoder,w=function(t){Object(f.a)(a,t);var e=Object(O.a)(a);function a(){var t;Object(b.a)(this,a),(t=e.call(this)).socket=void 0,t.ready=void 0;var r=new p.a("wss://real.okex.com:8443/ws/v3");return r.binaryType="arraybuffer",t.ready=new Promise((function(t){r.onopen=function(){t()}})),r.onmessage=t._handleMessage.bind(Object(h.a)(t)),t.socket=r,t}return Object(j.a)(a,[{key:"_handleMessage",value:function(){var t=Object(d.a)(u.a.mark((function t(e){var a;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=this._decodeMessage(e),this.emit("data",a);case 2:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"_decodeMessage",value:function(t){var e=new Uint8Array(t.data),a=m.a(e),r=x.decode(a);return JSON.parse(r)}},{key:"send",value:function(t){this.socket.send(JSON.stringify(t))}}]),a}(y.a),g=function(t){Object(f.a)(a,t);var e=Object(O.a)(a);function a(t,r,n){var c;return Object(b.a)(this,a),(c=e.call(this)).socket=t,c.instrumentId=n,c.data=void 0,c.table=void 0,c.data={bids:new Map,asks:new Map},c.table="".concat(r,"/depth_l2_tbt"),t.on("data",c._handleData.bind(Object(h.a)(c))),c}return Object(j.a)(a,[{key:"_handleData",value:function(t){var e=this,a=this.table,r=this.instrumentId,n=this.data,c=n.asks,s=n.bids;t.table===a&&t.data.forEach((function(a){a.instrument_id===r&&("partial"!==t.action&&"update"!==t.action||(a.asks.forEach((function(t){var e=parseFloat(t[0]),a=parseFloat(t[1]);"0"===t[1]?c.delete(e):c.set(e,a)})),a.bids.forEach((function(t){var e=parseFloat(t[0]),a=parseFloat(t[1]);"0"===t[1]?s.delete(e):s.set(e,a)})),e.emit("data",n)))}))}},{key:"subscribe",value:function(){var t=Object(d.a)(u.a.mark((function t(){var e,a,r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=this.table,a=this.instrumentId,r={op:"subscribe",args:["".concat(e,":").concat(a)]},this.socket.send(r);case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()}]),a}(y.a),_=function(t){Object(f.a)(a,t);var e=Object(O.a)(a);function a(t,r,n){var c;return Object(b.a)(this,a),(c=e.call(this)).socket=t,c.instrumentId=n,c.table=void 0,c.table="".concat(r,"/ticker"),t.on("data",c._handleData.bind(Object(h.a)(c))),c}return Object(j.a)(a,[{key:"_handleData",value:function(t){var e=this,a=this.table,r=this.instrumentId;t.table===a&&t.data.forEach((function(t){t.instrument_id===r&&e.emit("data",{last:parseFloat(t.last)})}))}},{key:"subscribe",value:function(){var t=Object(d.a)(u.a.mark((function t(){var e,a,r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=this.table,a=this.instrumentId,r={op:"subscribe",args:["".concat(e,":").concat(a)]},this.socket.send(r);case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()}]),a}(y.a),C=a(29),I=a(30),M=a(31),E=function(t){Object(f.a)(a,t);var e=Object(O.a)(a);function a(t,r,n){var c;return Object(b.a)(this,a),(c=e.call(this)).socket=t,c.instrumentId=n,c.table=void 0,c.table="".concat(r,"/mark_price"),t.on("data",c._handleData.bind(Object(h.a)(c))),c}return Object(j.a)(a,[{key:"_handleData",value:function(t){var e=this,a=this.table,r=this.instrumentId;t.table===a&&t.data.forEach((function(t){t.instrument_id===r&&e.emit("data",{mark:parseFloat(t.mark_price)})}))}},{key:"subscribe",value:function(){var t=Object(d.a)(u.a.mark((function t(){var e,a,r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=this.table,a=this.instrumentId,r={op:"subscribe",args:["".concat(e,":").concat(a)]},this.socket.send(r);case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()}]),a}(y.a);function N(t,e,a){var r,n=new Map,c=Object(l.a)(t);try{for(c.s();!(r=c.n()).done;){var s=Object(i.a)(r.value,2),o=s[0],u=s[1],d=e(o/a)*a;n.set(d,(n.get(d)||0)+u)}}catch(b){c.e(b)}finally{c.f()}return Array.from(n.entries())}function S(t,e){var a=0;return t.map((function(t){var r=Object(i.a)(t,2),n=r[0],c=r[1];return[n,c,a+=c,100*a/e]}))}var D=function(t,e,a){var n=Object(r.useState)({bids:[],asks:[]}),c=Object(i.a)(n,2),s=c[0],o=c[1],l=Object(C.a)({last:0,mark:0}),b=Object(i.a)(l,2),j=b[0],h=b[1],f=Object(I.a)((function(t,e){var a=N(t.asks,Math.ceil,e).slice(0,6),r=N(t.bids,Math.floor,e).slice(-6),n=t.asks.reduce((function(t,e){return t+Object(i.a)(e,2)[1]}),0),c=t.asks.reduce((function(t,e){return t+Object(i.a)(e,2)[1]}),0);return{asks:S(a,n).reverse(),bids:S(r.reverse(),c)}}),250,[s,a]),O=Object(M.a)(j,10);return Object(r.useEffect)((function(){Object(d.a)(u.a.mark((function a(){var r,n,c,s;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r=new w,n=new g(r,t,e),c=new _(r,t,e),s=new E(r,t,e),a.next=6,r.ready;case 6:n.on("data",(function(t){o({asks:Array.from(t.asks.entries()).sort(),bids:Array.from(t.bids.entries()).sort()})})),n.subscribe(),s.on("data",(function(t){return h({mark:t.mark})})),s.subscribe(),c.on("data",(function(t){return h({last:t.last})})),c.subscribe();case 12:case"end":return a.stop()}}),a)})))()}),[t,e,o,h]),{orders:f,market:O}};function F(){return(F=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t}).apply(this,arguments)}function A(t,e){if(null==t)return{};var a,r,n=function(t,e){if(null==t)return{};var a,r,n={},c=Object.keys(t);for(r=0;r<c.length;r++)a=c[r],e.indexOf(a)>=0||(n[a]=t[a]);return n}(t,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(r=0;r<c.length;r++)a=c[r],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}var V=r.createElement("path",{fill:"currentColor",d:"M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3M7,7.25V11.5C7,11.5 9,10 11,10C13,10 14,12 16,12C18,12 18,11 18,11V7.5C18,7.5 17,8 16,8C14,8 13,6 11,6C9,6 7,7.25 7,7.25Z"});function P(t,e){var a=t.title,n=t.titleId,c=A(t,["title","titleId"]);return r.createElement("svg",F({viewBox:"0 0 24 24",ref:e,"aria-labelledby":n},c),a?r.createElement("title",{id:n},a):null,V)}var J=r.forwardRef(P),T=(a.p,a(0)),B=[.5,1,2,5],U=function(){var t=Object(r.useState)(.5),e=Object(i.a)(t,2),a=e[0],n=e[1],c=D("futures","BTC-USD-210625",a),s=c.market,o=c.orders||{asks:[],bids:[]},u=o.asks,d=o.bids,l=s.last,b=s.mark;return Object(T.jsxs)("div",{className:"order-book",children:[Object(T.jsxs)("div",{className:"title",children:[Object(T.jsx)("h5",{children:"Order book"}),Object(T.jsxs)("div",{className:"depth",children:[Object(T.jsx)("label",{htmlFor:"depth",children:"Depth"}),Object(T.jsx)("select",{name:"depth",value:a,onChange:function(t){return n(parseFloat(t.target.value))},children:B.map((function(t){return Object(T.jsx)("option",{value:t,children:t},t.toString())}))})]})]}),Object(T.jsxs)("table",{children:[Object(T.jsx)("thead",{children:Object(T.jsxs)("tr",{children:[Object(T.jsx)("th",{children:"Price"}),Object(T.jsx)("th",{children:"Qty"}),Object(T.jsx)("th",{children:"Total"})]})}),Object(T.jsx)("tbody",{className:"asks",children:u.map((function(t){var e=Object(i.a)(t,4),a=e[0],r=e[1],n=e[2],c=e[3];return Object(T.jsxs)("tr",{children:[Object(T.jsx)("td",{children:a}),Object(T.jsx)("td",{children:r}),Object(T.jsxs)("td",{className:"progress",children:[Object(T.jsx)("div",{style:{width:"".concat(c,"%")}}),n]})]},a.toString())}))}),Object(T.jsx)("tbody",{className:"market",children:Object(T.jsxs)("tr",{children:[Object(T.jsx)("td",{children:l}),Object(T.jsxs)("td",{className:"mark",children:[Object(T.jsx)(J,{}),b]}),Object(T.jsx)("td",{})]})}),Object(T.jsx)("tbody",{className:"bids",children:d.map((function(t){var e=Object(i.a)(t,4),a=e[0],r=e[1],n=e[2],c=e[3];return Object(T.jsxs)("tr",{children:[Object(T.jsx)("td",{children:a}),Object(T.jsx)("td",{children:r}),Object(T.jsxs)("td",{className:"progress",children:[Object(T.jsx)("div",{style:{width:"".concat(c,"%")}}),n]})]},a.toString())}))})]})]})};var H=function(){return Object(T.jsx)(U,{})};s.a.render(Object(T.jsx)(n.a.StrictMode,{children:Object(T.jsx)(H,{})}),document.getElementById("root"))}},[[27,1,2]]]);
//# sourceMappingURL=main.1345ac47.chunk.js.map