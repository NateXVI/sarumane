import{h as E,e as O,d as D,f as T,b,s as L,a as q,c as y,g as I,i as M,j as k,k as V,l as m}from"./disclose-version.ChtQrqqN.js";import{t as C,q as H,d as W,c as Y,v as B,w as P,x as $,l as j,y as z,h as F,z as G,A as J}from"./runtime.EMU0kWUW.js";const K=new Set,R=new Set;function er(r){if(!E)return;r.onload&&r.removeAttribute("onload"),r.onerror&&r.removeAttribute("onerror");const e=r.__e;e!==void 0&&(r.__e=void 0,queueMicrotask(()=>{r.isConnected&&r.dispatchEvent(e)}))}function Q(r,e,n,o){function a(t){if(o.capture||v.call(e,t),!t.cancelBubble)return n.call(this,t)}return r.startsWith("pointer")||r.startsWith("touch")||r==="wheel"?H(()=>{e.addEventListener(r,a,o)}):e.addEventListener(r,a,o),a}function tr(r,e,n,o,a){var t={capture:o,passive:a},u=Q(r,e,n,t);(e===document.body||e===window||e===document)&&C(()=>{e.removeEventListener(r,u,t)})}function v(r){var S;var e=this,n=e.ownerDocument,o=r.type,a=((S=r.composedPath)==null?void 0:S.call(r))||[],t=a[0]||r.target,u=0,l=r.__root;if(l){var c=a.indexOf(l);if(c!==-1&&(e===document||e===window)){r.__root=e;return}var d=a.indexOf(e);if(d===-1)return;c<=d&&(u=c)}if(t=a[u]||r.target,t!==e){W(r,"currentTarget",{configurable:!0,get(){return t||n}});try{for(var h,i=[];t!==null;){var f=t.parentNode||t.host||null;try{var s=t["__"+o];if(s!==void 0&&!t.disabled)if(Y(s)){var[p,...g]=s;p.apply(t,[r,...g])}else s.call(t,r)}catch(w){h?i.push(w):h=w}if(r.cancelBubble||f===e||f===null)break;t=f}if(h){for(let w of i)queueMicrotask(()=>{throw w});throw h}}finally{r.__root=e,t=e}}}const U=["wheel","touchstart","touchmove","touchend","touchcancel"];function X(r){return U.includes(r)}function ar(r,e){(r.__t??(r.__t=r.nodeValue))!==e&&(r.nodeValue=r.__t=e)}function Z(r,e){const n=e.anchor??e.target.appendChild(O());return N(r,{...e,anchor:n})}function nr(r,e){e.intro=e.intro??!1;const n=e.target,o=E,a=y;try{for(var t=n.firstChild;t&&(t.nodeType!==8||t.data!==D);)t=t.nextSibling;if(!t)throw T;b(!0),L(t),q();const u=N(r,{...e,anchor:t});if(y===null||y.nodeType!==8||y.data!==I)throw M(),T;return b(!1),u}catch(u){if(u===T)return e.recover===!1&&B(),k(),V(n),b(!1),Z(r,e);throw u}finally{b(o),L(a)}}const _=new Map;function N(r,{target:e,anchor:n,props:o={},events:a,context:t,intro:u=!0}){k();var l=new Set,c=i=>{for(var f=0;f<i.length;f++){var s=i[f];if(!l.has(s)){l.add(s);var p=X(s);e.addEventListener(s,v,{passive:p});var g=_.get(s);g===void 0?(document.addEventListener(s,v,{passive:p}),_.set(s,1)):_.set(s,g+1)}}};c(P(K)),R.add(c);var d=void 0,h=$(()=>(j(()=>{if(t){z({});var i=J;i.c=t}a&&(o.$$events=a),E&&m(n,null),d=r(n,o)||{},E&&(F.nodes.end=y),t&&G()}),()=>{for(var i of l){e.removeEventListener(i,v);var f=_.get(i);--f===0?(document.removeEventListener(i,v),_.delete(i)):_.set(i,f)}R.delete(c),A.delete(d)}));return A.set(d,h),d}let A=new WeakMap;function ir(r){const e=A.get(r);e==null||e()}export{tr as e,nr as h,Z as m,er as r,ar as s,ir as u};
