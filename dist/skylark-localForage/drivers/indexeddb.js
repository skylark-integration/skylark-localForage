/**
 * skylark-localForage - A skylark wrapper for localForage.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../utils/isIndexedDBValid","../utils/createBlob","../utils/idb","../utils/promise","../utils/executeCallback","../utils/executeTwoCallbacks","../utils/normalizeKey","../utils/getCallback"],function(e,n,r,t,o,a,c,i){"use strict";const u="local-forage-detect-blob-support";let s;const f={},d=Object.prototype.toString,l="readonly",b="readwrite";function v(e){return"boolean"==typeof s?t.resolve(s):function(e){return new t(function(r){var t=e.transaction(u,b),o=n([""]);t.objectStore(u).put(o,"key"),t.onabort=function(e){e.preventDefault(),e.stopPropagation(),r(!1)},t.oncomplete=function(){var e=navigator.userAgent.match(/Chrome\/(\d+)/),n=navigator.userAgent.match(/Edge\//);r(n||!e||parseInt(e[1],10)>=43)}}).catch(function(){return!1})}(e).then(function(e){return s=e})}function h(e){var n=f[e.name],r={};r.promise=new t(function(e,n){r.resolve=e,r.reject=n}),n.deferredOperations.push(r),n.dbReady?n.dbReady=n.dbReady.then(function(){return r.promise}):n.dbReady=r.promise}function m(e){var n=f[e.name].deferredOperations.pop();if(n)return n.resolve(),n.promise}function p(e,n){var r=f[e.name].deferredOperations.pop();if(r)return r.reject(n),r.promise}function y(e,n){return new t(function(t,o){if(f[e.name]=f[e.name]||{forages:[],db:null,dbReady:null,deferredOperations:[]},e.db){if(!n)return t(e.db);h(e),e.db.close()}var a=[e.name];n&&a.push(e.version);var c=r.open.apply(r,a);n&&(c.onupgradeneeded=function(n){var r=c.result;try{r.createObjectStore(e.storeName),n.oldVersion<=1&&r.createObjectStore(u)}catch(r){if("ConstraintError"!==r.name)throw r;console.warn('The database "'+e.name+'" has been upgraded from version '+n.oldVersion+" to version "+n.newVersion+', but the storage "'+e.storeName+'" already exists.')}}),c.onerror=function(e){e.preventDefault(),o(c.error)},c.onsuccess=function(){var n=c.result;n.onversionchange=function(e){e.target.close()},t(n),m(e)}})}function _(e){return y(e,!1)}function g(e){return y(e,!0)}function I(e,n){if(!e.db)return!0;var r=!e.db.objectStoreNames.contains(e.storeName),t=e.version<e.db.version,o=e.version>e.db.version;if(t&&(e.version!==n&&console.warn('The database "'+e.name+"\" can't be downgraded from version "+e.db.version+" to version "+e.version+"."),e.version=e.db.version),o||r){if(r){var a=e.db.version+1;a>e.version&&(e.version=a)}return!0}return!1}function w(e){var r=function(e){for(var n=e.length,r=new ArrayBuffer(n),t=new Uint8Array(r),o=0;o<n;o++)t[o]=e.charCodeAt(o);return r}(atob(e.data));return n([r],{type:e.type})}function N(e){return e&&e.__local_forage_encoded_blob}function j(e){var n=this,r=n._initReady().then(function(){var e=f[n._dbInfo.name];if(e&&e.dbReady)return e.dbReady});return a(r,e,e),r}function S(e,n,r,o){void 0===o&&(o=1);try{var a=e.db.transaction(e.storeName,n);r(null,a)}catch(a){if(o>0&&(!e.db||"InvalidStateError"===a.name||"NotFoundError"===a.name))return t.resolve().then(()=>{if(!e.db||"NotFoundError"===a.name&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),g(e)}).then(()=>(function(e){h(e);for(var n=f[e.name],r=n.forages,t=0;t<r.length;t++){const e=r[t];e._dbInfo.db&&(e._dbInfo.db.close(),e._dbInfo.db=null)}return e.db=null,_(e).then(n=>(e.db=n,I(e)?g(e):n)).then(t=>{e.db=n.db=t;for(var o=0;o<r.length;o++)r[o]._dbInfo.db=t}).catch(n=>{throw p(e,n),n})})(e).then(function(){S(e,n,r,o-1)})).catch(r);r(a)}}return{_driver:"asyncStorage",_initStorage:function(e){var n=this,r={db:null};if(e)for(var o in e)r[o]=e[o];var a=f[r.name];a||(a={forages:[],db:null,dbReady:null,deferredOperations:[]},f[r.name]=a),a.forages.push(n),n._initReady||(n._initReady=n.ready,n.ready=j);var c=[];function i(){return t.resolve()}for(var u=0;u<a.forages.length;u++){var s=a.forages[u];s!==n&&c.push(s._initReady().catch(i))}var d=a.forages.slice(0);return t.all(c).then(function(){return r.db=a.db,_(r)}).then(function(e){return r.db=e,I(r,n._defaultConfig.version)?g(r):e}).then(function(e){r.db=a.db=e,n._dbInfo=r;for(var t=0;t<d.length;t++){var o=d[t];o!==n&&(o._dbInfo.db=r.db,o._dbInfo.version=r.version)}})},_support:e(),iterate:function(e,n){var r=this,a=new t(function(n,t){r.ready().then(function(){S(r._dbInfo,l,function(o,a){if(o)return t(o);try{var c=a.objectStore(r._dbInfo.storeName).openCursor(),i=1;c.onsuccess=function(){var r=c.result;if(r){var t=r.value;N(t)&&(t=w(t));var o=e(t,r.key,i++);void 0!==o?n(o):r.continue()}else n()},c.onerror=function(){t(c.error)}}catch(e){t(e)}})}).catch(t)});return o(a,n),a},getItem:function(e,n){var r=this;e=c(e);var a=new t(function(n,t){r.ready().then(function(){S(r._dbInfo,l,function(o,a){if(o)return t(o);try{var c=a.objectStore(r._dbInfo.storeName).get(e);c.onsuccess=function(){var e=c.result;void 0===e&&(e=null),N(e)&&(e=w(e)),n(e)},c.onerror=function(){t(c.error)}}catch(e){t(e)}})}).catch(t)});return o(a,n),a},setItem:function(e,n,r){var a=this;e=c(e);var i=new t(function(r,o){var c;a.ready().then(function(){return c=a._dbInfo,"[object Blob]"===d.call(n)?v(c.db).then(function(e){return e?n:(r=n,new t(function(e,n){var t=new FileReader;t.onerror=n,t.onloadend=function(n){var t=btoa(n.target.result||"");e({__local_forage_encoded_blob:!0,data:t,type:r.type})},t.readAsBinaryString(r)}));var r}):n}).then(function(n){S(a._dbInfo,b,function(t,c){if(t)return o(t);try{var i=c.objectStore(a._dbInfo.storeName);null===n&&(n=void 0);var u=i.put(n,e);c.oncomplete=function(){void 0===n&&(n=null),r(n)},c.onabort=c.onerror=function(){var e=u.error?u.error:u.transaction.error;o(e)}}catch(e){o(e)}})}).catch(o)});return o(i,r),i},removeItem:function(e,n){var r=this;e=c(e);var a=new t(function(n,t){r.ready().then(function(){S(r._dbInfo,b,function(o,a){if(o)return t(o);try{var c=a.objectStore(r._dbInfo.storeName).delete(e);a.oncomplete=function(){n()},a.onerror=function(){t(c.error)},a.onabort=function(){var e=c.error?c.error:c.transaction.error;t(e)}}catch(e){t(e)}})}).catch(t)});return o(a,n),a},clear:function(e){var n=this,r=new t(function(e,r){n.ready().then(function(){S(n._dbInfo,b,function(t,o){if(t)return r(t);try{var a=o.objectStore(n._dbInfo.storeName).clear();o.oncomplete=function(){e()},o.onabort=o.onerror=function(){var e=a.error?a.error:a.transaction.error;r(e)}}catch(e){r(e)}})}).catch(r)});return o(r,e),r},length:function(e){var n=this,r=new t(function(e,r){n.ready().then(function(){S(n._dbInfo,l,function(t,o){if(t)return r(t);try{var a=o.objectStore(n._dbInfo.storeName).count();a.onsuccess=function(){e(a.result)},a.onerror=function(){r(a.error)}}catch(e){r(e)}})}).catch(r)});return o(r,e),r},key:function(e,n){var r=this,a=new t(function(n,t){e<0?n(null):r.ready().then(function(){S(r._dbInfo,l,function(o,a){if(o)return t(o);try{var c=a.objectStore(r._dbInfo.storeName),i=!1,u=c.openKeyCursor();u.onsuccess=function(){var r=u.result;r?0===e?n(r.key):i?n(r.key):(i=!0,r.advance(e)):n(null)},u.onerror=function(){t(u.error)}}catch(e){t(e)}})}).catch(t)});return o(a,n),a},keys:function(e){var n=this,r=new t(function(e,r){n.ready().then(function(){S(n._dbInfo,l,function(t,o){if(t)return r(t);try{var a=o.objectStore(n._dbInfo.storeName).openKeyCursor(),c=[];a.onsuccess=function(){var n=a.result;n?(c.push(n.key),n.continue()):e(c)},a.onerror=function(){r(a.error)}}catch(e){r(e)}})}).catch(r)});return o(r,e),r},dropInstance:function(e,n){n=i.apply(this,arguments);var a,c=this.config();if((e="function"!=typeof e&&e||{}).name||(e.name=e.name||c.name,e.storeName=e.storeName||c.storeName),e.name){const n=e.name===c.name&&this._dbInfo.db?t.resolve(this._dbInfo.db):_(e).then(n=>{const r=f[e.name],t=r.forages;r.db=n;for(var o=0;o<t.length;o++)t[o]._dbInfo.db=n;return n});a=e.storeName?n.then(n=>{if(!n.objectStoreNames.contains(e.storeName))return;const o=n.version+1;h(e);const a=f[e.name],c=a.forages;n.close();for(let e=0;e<c.length;e++){const n=c[e];n._dbInfo.db=null,n._dbInfo.version=o}return new t((n,t)=>{const a=r.open(e.name,o);a.onerror=(e=>{a.result.close(),t(e)}),a.onupgradeneeded=(()=>{a.result.deleteObjectStore(e.storeName)}),a.onsuccess=(()=>{const e=a.result;e.close(),n(e)})}).then(e=>{a.db=e;for(let n=0;n<c.length;n++){const r=c[n];r._dbInfo.db=e,m(r._dbInfo)}}).catch(n=>{throw(p(e,n)||t.resolve()).catch(()=>{}),n})}):n.then(n=>{h(e);const o=f[e.name],a=o.forages;n.close();for(var c=0;c<a.length;c++)a[c]._dbInfo.db=null;return new t((n,t)=>{var o=r.deleteDatabase(e.name);o.onerror=(()=>{const e=o.result;e&&e.close(),t(o.error)}),o.onblocked=(()=>{console.warn('dropInstance blocked for database "'+e.name+'" until all open connections are closed')}),o.onsuccess=(()=>{const e=o.result;e&&e.close(),n(e)})}).then(e=>{o.db=e;for(var n=0;n<a.length;n++)m(a[n]._dbInfo)}).catch(n=>{throw(p(e,n)||t.resolve()).catch(()=>{}),n})})}else a=t.reject("Invalid arguments");return o(a,n),a}}});
//# sourceMappingURL=../sourcemaps/drivers/indexeddb.js.map
