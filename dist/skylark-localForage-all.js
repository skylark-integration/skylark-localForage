/**
 * skylark-localForage - A skylark wrapper for localForage.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(e,r){var n=r.define,require=r.require,t="function"==typeof n&&n.amd,o=!t&&"undefined"!=typeof exports;if(!t&&!n){var a={};n=r.define=function(e,r,n){"function"==typeof n?(a[e]={factory:n,deps:r.map(function(r){return function(e,r){if("."!==e[0])return e;var n=r.split("/"),t=e.split("/");n.pop();for(var o=0;o<t.length;o++)"."!=t[o]&&(".."==t[o]?n.pop():n.push(t[o]));return n.join("/")}(r,e)}),resolved:!1,exports:null},require(e)):a[e]={factory:null,resolved:!0,exports:n}},require=r.require=function(e){if(!a.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var module=a[e];if(!module.resolved){var n=[];module.deps.forEach(function(e){n.push(require(e))}),module.exports=module.factory.apply(r,n)||null,module.resolved=!0}return module.exports}}if(!n)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,require){e("skylark-langx-ns/_attach",[],function(){return function(e,r,n){"string"==typeof r&&(r=r.split("."));for(var t=r.length,o=e,a=0,i=r[a++];a<t;)o=o[i]=o[i]||{},i=r[a++];if(o[i]){if(n)throw new Error("This namespace already exists:"+r)}else o[i]=n||{};return o[i]}}),e("skylark-langx-ns/ns",["./_attach"],function(e){var r={attach:function(n,t){return e(r,n,t)}};return r}),e("skylark-langx-ns/main",["./ns"],function(e){return e}),e("skylark-langx-ns",["skylark-langx-ns/main"],function(e){return e}),e("skylark-localForage/utils/idb",[],function(){"use strict";var e=function(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(e){return}}();return e}),e("skylark-localForage/utils/isIndexedDBValid",["./idb"],function(e){"use strict";return function(){try{if(!e||!e.open)return!1;var r="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),n="function"==typeof fetch&&-1!==fetch.toString().indexOf("[native code");return(!r||n)&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange}catch(e){return!1}}}),e("skylark-localForage/utils/createBlob",[],function(){"use strict";return function(e,r){e=e||[],r=r||{};try{return new Blob(e,r)}catch(a){if("TypeError"!==a.name)throw a;for(var n="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder,t=new n,o=0;o<e.length;o+=1)t.append(e[o]);return t.getBlob(r.type)}}}),e("skylark-localForage/utils/promise",[],function(){"use strict";return Promise}),e("skylark-localForage/utils/executeCallback",[],function(){"use strict";return function(e,r){r&&e.then(function(e){r(null,e)},function(e){r(e)})}}),e("skylark-localForage/utils/executeTwoCallbacks",[],function(){"use strict";return function(e,r,n){"function"==typeof r&&e.then(r);"function"==typeof n&&e.catch(n)}}),e("skylark-localForage/utils/normalizeKey",[],function(){"use strict";return function(e){return"string"!=typeof e&&(console.warn(`${e} used as a key, but it is not a string.`),e=String(e)),e}}),e("skylark-localForage/utils/getCallback",[],function(){"use strict";return function(){if(arguments.length&&"function"==typeof arguments[arguments.length-1])return arguments[arguments.length-1]}}),e("skylark-localForage/drivers/indexeddb",["../utils/isIndexedDBValid","../utils/createBlob","../utils/idb","../utils/promise","../utils/executeCallback","../utils/executeTwoCallbacks","../utils/normalizeKey","../utils/getCallback"],function(e,r,n,t,o,a,i,c){"use strict";const u="local-forage-detect-blob-support";let s;const f={},l=Object.prototype.toString,d="readonly",v="readwrite";function h(e){return"boolean"==typeof s?t.resolve(s):function(e){return new t(function(n){var t=e.transaction(u,v),o=r([""]);t.objectStore(u).put(o,"key"),t.onabort=function(e){e.preventDefault(),e.stopPropagation(),n(!1)},t.oncomplete=function(){var e=navigator.userAgent.match(/Chrome\/(\d+)/),r=navigator.userAgent.match(/Edge\//);n(r||!e||parseInt(e[1],10)>=43)}}).catch(function(){return!1})}(e).then(function(e){return s=e})}function b(e){var r=f[e.name],n={};n.promise=new t(function(e,r){n.resolve=e,n.reject=r}),r.deferredOperations.push(n),r.dbReady?r.dbReady=r.dbReady.then(function(){return n.promise}):r.dbReady=n.promise}function y(e){var r=f[e.name],n=r.deferredOperations.pop();if(n)return n.resolve(),n.promise}function g(e,r){var n=f[e.name],t=n.deferredOperations.pop();if(t)return t.reject(r),t.promise}function m(e,r){return new t(function(t,o){if(f[e.name]=f[e.name]||{forages:[],db:null,dbReady:null,deferredOperations:[]},e.db){if(!r)return t(e.db);b(e),e.db.close()}var a=[e.name];r&&a.push(e.version);var i=n.open.apply(n,a);r&&(i.onupgradeneeded=function(r){var n=i.result;try{n.createObjectStore(e.storeName),r.oldVersion<=1&&n.createObjectStore(u)}catch(n){if("ConstraintError"!==n.name)throw n;console.warn('The database "'+e.name+'" has been upgraded from version '+r.oldVersion+" to version "+r.newVersion+', but the storage "'+e.storeName+'" already exists.')}}),i.onerror=function(e){e.preventDefault(),o(i.error)},i.onsuccess=function(){var r=i.result;r.onversionchange=function(e){e.target.close()},t(r),y(e)}})}function p(e){return m(e,!1)}function _(e){return m(e,!0)}function I(e,r){if(!e.db)return!0;var n=!e.db.objectStoreNames.contains(e.storeName),t=e.version<e.db.version,o=e.version>e.db.version;if(t&&(e.version!==r&&console.warn('The database "'+e.name+"\" can't be downgraded from version "+e.db.version+" to version "+e.version+"."),e.version=e.db.version),o||n){if(n){var a=e.db.version+1;a>e.version&&(e.version=a)}return!0}return!1}function k(e){var n=function(e){for(var r=e.length,n=new ArrayBuffer(r),t=new Uint8Array(n),o=0;o<r;o++)t[o]=e.charCodeAt(o);return n}(atob(e.data));return r([n],{type:e.type})}function w(e){return e&&e.__local_forage_encoded_blob}function S(e){var r=this,n=r._initReady().then(function(){var e=f[r._dbInfo.name];if(e&&e.dbReady)return e.dbReady});return a(n,e,e),n}function E(e,r,n,o){void 0===o&&(o=1);try{var a=e.db.transaction(e.storeName,r);n(null,a)}catch(a){if(o>0&&(!e.db||"InvalidStateError"===a.name||"NotFoundError"===a.name))return t.resolve().then(()=>{if(!e.db||"NotFoundError"===a.name&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),_(e)}).then(()=>(function(e){b(e);for(var r=f[e.name],n=r.forages,t=0;t<n.length;t++){const e=n[t];e._dbInfo.db&&(e._dbInfo.db.close(),e._dbInfo.db=null)}return e.db=null,p(e).then(r=>(e.db=r,I(e)?_(e):r)).then(t=>{e.db=r.db=t;for(var o=0;o<n.length;o++)n[o]._dbInfo.db=t}).catch(r=>{throw g(e,r),r})})(e).then(function(){E(e,r,n,o-1)})).catch(n);n(a)}}var N={_driver:"asyncStorage",_initStorage:function(e){var r=this,n={db:null};if(e)for(var o in e)n[o]=e[o];var a=f[n.name];a||(a={forages:[],db:null,dbReady:null,deferredOperations:[]},f[n.name]=a);a.forages.push(r),r._initReady||(r._initReady=r.ready,r.ready=S);var i=[];function c(){return t.resolve()}for(var u=0;u<a.forages.length;u++){var s=a.forages[u];s!==r&&i.push(s._initReady().catch(c))}var l=a.forages.slice(0);return t.all(i).then(function(){return n.db=a.db,p(n)}).then(function(e){return n.db=e,I(n,r._defaultConfig.version)?_(n):e}).then(function(e){n.db=a.db=e,r._dbInfo=n;for(var t=0;t<l.length;t++){var o=l[t];o!==r&&(o._dbInfo.db=n.db,o._dbInfo.version=n.version)}})},_support:e(),iterate:function(e,r){var n=this,a=new t(function(r,t){n.ready().then(function(){E(n._dbInfo,d,function(o,a){if(o)return t(o);try{var i=a.objectStore(n._dbInfo.storeName),c=i.openCursor(),u=1;c.onsuccess=function(){var n=c.result;if(n){var t=n.value;w(t)&&(t=k(t));var o=e(t,n.key,u++);void 0!==o?r(o):n.continue()}else r()},c.onerror=function(){t(c.error)}}catch(e){t(e)}})}).catch(t)});return o(a,r),a},getItem:function(e,r){var n=this;e=i(e);var a=new t(function(r,t){n.ready().then(function(){E(n._dbInfo,d,function(o,a){if(o)return t(o);try{var i=a.objectStore(n._dbInfo.storeName),c=i.get(e);c.onsuccess=function(){var e=c.result;void 0===e&&(e=null),w(e)&&(e=k(e)),r(e)},c.onerror=function(){t(c.error)}}catch(e){t(e)}})}).catch(t)});return o(a,r),a},setItem:function(e,r,n){var a=this;e=i(e);var c=new t(function(n,o){var i;a.ready().then(function(){return i=a._dbInfo,"[object Blob]"===l.call(r)?h(i.db).then(function(e){return e?r:(n=r,new t(function(e,r){var t=new FileReader;t.onerror=r,t.onloadend=function(r){var t=btoa(r.target.result||"");e({__local_forage_encoded_blob:!0,data:t,type:n.type})},t.readAsBinaryString(n)}));var n}):r}).then(function(r){E(a._dbInfo,v,function(t,i){if(t)return o(t);try{var c=i.objectStore(a._dbInfo.storeName);null===r&&(r=void 0);var u=c.put(r,e);i.oncomplete=function(){void 0===r&&(r=null),n(r)},i.onabort=i.onerror=function(){var e=u.error?u.error:u.transaction.error;o(e)}}catch(e){o(e)}})}).catch(o)});return o(c,n),c},removeItem:function(e,r){var n=this;e=i(e);var a=new t(function(r,t){n.ready().then(function(){E(n._dbInfo,v,function(o,a){if(o)return t(o);try{var i=a.objectStore(n._dbInfo.storeName),c=i.delete(e);a.oncomplete=function(){r()},a.onerror=function(){t(c.error)},a.onabort=function(){var e=c.error?c.error:c.transaction.error;t(e)}}catch(e){t(e)}})}).catch(t)});return o(a,r),a},clear:function(e){var r=this,n=new t(function(e,n){r.ready().then(function(){E(r._dbInfo,v,function(t,o){if(t)return n(t);try{var a=o.objectStore(r._dbInfo.storeName),i=a.clear();o.oncomplete=function(){e()},o.onabort=o.onerror=function(){var e=i.error?i.error:i.transaction.error;n(e)}}catch(e){n(e)}})}).catch(n)});return o(n,e),n},length:function(e){var r=this,n=new t(function(e,n){r.ready().then(function(){E(r._dbInfo,d,function(t,o){if(t)return n(t);try{var a=o.objectStore(r._dbInfo.storeName),i=a.count();i.onsuccess=function(){e(i.result)},i.onerror=function(){n(i.error)}}catch(e){n(e)}})}).catch(n)});return o(n,e),n},key:function(e,r){var n=this,a=new t(function(r,t){e<0?r(null):n.ready().then(function(){E(n._dbInfo,d,function(o,a){if(o)return t(o);try{var i=a.objectStore(n._dbInfo.storeName),c=!1,u=i.openKeyCursor();u.onsuccess=function(){var n=u.result;n?0===e?r(n.key):c?r(n.key):(c=!0,n.advance(e)):r(null)},u.onerror=function(){t(u.error)}}catch(e){t(e)}})}).catch(t)});return o(a,r),a},keys:function(e){var r=this,n=new t(function(e,n){r.ready().then(function(){E(r._dbInfo,d,function(t,o){if(t)return n(t);try{var a=o.objectStore(r._dbInfo.storeName),i=a.openKeyCursor(),c=[];i.onsuccess=function(){var r=i.result;r?(c.push(r.key),r.continue()):e(c)},i.onerror=function(){n(i.error)}}catch(e){n(e)}})}).catch(n)});return o(n,e),n},dropInstance:function(e,r){r=c.apply(this,arguments);var a=this.config();(e="function"!=typeof e&&e||{}).name||(e.name=e.name||a.name,e.storeName=e.storeName||a.storeName);var i;if(e.name){const r=e.name===a.name&&this._dbInfo.db,o=r?t.resolve(this._dbInfo.db):p(e).then(r=>{const n=f[e.name],t=n.forages;n.db=r;for(var o=0;o<t.length;o++)t[o]._dbInfo.db=r;return r});i=e.storeName?o.then(r=>{if(!r.objectStoreNames.contains(e.storeName))return;const o=r.version+1;b(e);const a=f[e.name],i=a.forages;r.close();for(let e=0;e<i.length;e++){const r=i[e];r._dbInfo.db=null,r._dbInfo.version=o}const c=new t((r,t)=>{const a=n.open(e.name,o);a.onerror=(e=>{const r=a.result;r.close(),t(e)}),a.onupgradeneeded=(()=>{var r=a.result;r.deleteObjectStore(e.storeName)}),a.onsuccess=(()=>{const e=a.result;e.close(),r(e)})});return c.then(e=>{a.db=e;for(let r=0;r<i.length;r++){const n=i[r];n._dbInfo.db=e,y(n._dbInfo)}}).catch(r=>{throw(g(e,r)||t.resolve()).catch(()=>{}),r})}):o.then(r=>{b(e);const o=f[e.name],a=o.forages;r.close();for(var i=0;i<a.length;i++){const e=a[i];e._dbInfo.db=null}const c=new t((r,t)=>{var o=n.deleteDatabase(e.name);o.onerror=(()=>{const e=o.result;e&&e.close(),t(o.error)}),o.onblocked=(()=>{console.warn('dropInstance blocked for database "'+e.name+'" until all open connections are closed')}),o.onsuccess=(()=>{const e=o.result;e&&e.close(),r(e)})});return c.then(e=>{o.db=e;for(var r=0;r<a.length;r++){const e=a[r];y(e._dbInfo)}}).catch(r=>{throw(g(e,r)||t.resolve()).catch(()=>{}),r})})}else i=t.reject("Invalid arguments");return o(i,r),i}};return N}),e("skylark-localForage/utils/isWebSQLValid",[],function(){"use strict";return function(){return"function"==typeof openDatabase}}),e("skylark-localForage/utils/serializer",["./createBlob"],function(e){"use strict";var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n="~~local_forage_type~",t=/^~~local_forage_type~([^~]+)~/,o="__lfsc__:",a=o.length,i="arbf",c="blob",u="si08",s="ui08",f="uic8",l="si16",d="si32",v="ur16",h="ui32",b="fl32",y="fl64",g=a+i.length,m=Object.prototype.toString;function p(e){var n,t,o,a,i,c=.75*e.length,u=e.length,s=0;"="===e[e.length-1]&&(c--,"="===e[e.length-2]&&c--);var f=new ArrayBuffer(c),l=new Uint8Array(f);for(n=0;n<u;n+=4)t=r.indexOf(e[n]),o=r.indexOf(e[n+1]),a=r.indexOf(e[n+2]),i=r.indexOf(e[n+3]),l[s++]=t<<2|o>>4,l[s++]=(15&o)<<4|a>>2,l[s++]=(3&a)<<6|63&i;return f}function _(e){var n,t=new Uint8Array(e),o="";for(n=0;n<t.length;n+=3)o+=r[t[n]>>2],o+=r[(3&t[n])<<4|t[n+1]>>4],o+=r[(15&t[n+1])<<2|t[n+2]>>6],o+=r[63&t[n+2]];return t.length%3==2?o=o.substring(0,o.length-1)+"=":t.length%3==1&&(o=o.substring(0,o.length-2)+"=="),o}var I={serialize:function(e,r){var t="";e&&(t=m.call(e));if(e&&("[object ArrayBuffer]"===t||e.buffer&&"[object ArrayBuffer]"===m.call(e.buffer))){var a,g=o;e instanceof ArrayBuffer?(a=e,g+=i):(a=e.buffer,"[object Int8Array]"===t?g+=u:"[object Uint8Array]"===t?g+=s:"[object Uint8ClampedArray]"===t?g+=f:"[object Int16Array]"===t?g+=l:"[object Uint16Array]"===t?g+=v:"[object Int32Array]"===t?g+=d:"[object Uint32Array]"===t?g+=h:"[object Float32Array]"===t?g+=b:"[object Float64Array]"===t?g+=y:r(new Error("Failed to get type for BinaryArray"))),r(g+_(a))}else if("[object Blob]"===t){var p=new FileReader;p.onload=function(){var t=n+e.type+"~"+_(this.result);r(o+c+t)},p.readAsArrayBuffer(e)}else try{r(JSON.stringify(e))}catch(n){console.error("Couldn't convert value into a JSON string: ",e),r(null,n)}},deserialize:function(r){if(r.substring(0,a)!==o)return JSON.parse(r);var n,m=r.substring(g),_=r.substring(a,g);if(_===c&&t.test(m)){var I=m.match(t);n=I[1],m=m.substring(I[0].length)}var k=p(m);switch(_){case i:return k;case c:return e([k],{type:n});case u:return new Int8Array(k);case s:return new Uint8Array(k);case f:return new Uint8ClampedArray(k);case l:return new Int16Array(k);case v:return new Uint16Array(k);case d:return new Int32Array(k);case h:return new Uint32Array(k);case b:return new Float32Array(k);case y:return new Float64Array(k);default:throw new Error("Unkown type: "+_)}},stringToBuffer:p,bufferToString:_};return I}),e("skylark-localForage/drivers/websql",["../utils/isWebSQLValid","../utils/serializer","../utils/promise","../utils/executeCallback","../utils/normalizeKey","../utils/getCallback"],function(e,r,n,t,o,a){"use strict";function i(e,r,n,t){e.executeSql(`CREATE TABLE IF NOT EXISTS ${r.storeName} `+"(id INTEGER PRIMARY KEY, key unique, value)",[],n,t)}function c(e,r,n,t,o,a){e.executeSql(n,t,o,function(e,c){c.code===c.SYNTAX_ERR?e.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[r.storeName],function(e,u){u.rows.length?a(e,c):i(e,r,function(){e.executeSql(n,t,o,a)},a)},a):a(e,c)},a)}var u={_driver:"webSQLStorage",_initStorage:function(e){var t=this,o={db:null};if(e)for(var a in e)o[a]="string"!=typeof e[a]?e[a].toString():e[a];var c=new n(function(e,r){try{o.db=openDatabase(o.name,String(o.version),o.description,o.size)}catch(e){return r(e)}o.db.transaction(function(n){i(n,o,function(){t._dbInfo=o,e()},function(e,n){r(n)})},r)});return o.serializer=r,c},_support:e(),iterate:function(e,r){var o=this,a=new n(function(r,n){o.ready().then(function(){var t=o._dbInfo;t.db.transaction(function(o){c(o,t,`SELECT * FROM ${t.storeName}`,[],function(n,o){for(var a=o.rows,i=a.length,c=0;c<i;c++){var u=a.item(c),s=u.value;if(s&&(s=t.serializer.deserialize(s)),void 0!==(s=e(s,u.key,c+1)))return void r(s)}r()},function(e,r){n(r)})})}).catch(n)});return t(a,r),a},getItem:function(e,r){var a=this;e=o(e);var i=new n(function(r,n){a.ready().then(function(){var t=a._dbInfo;t.db.transaction(function(o){c(o,t,`SELECT * FROM ${t.storeName} WHERE key = ? LIMIT 1`,[e],function(e,n){var o=n.rows.length?n.rows.item(0).value:null;o&&(o=t.serializer.deserialize(o)),r(o)},function(e,r){n(r)})})}).catch(n)});return t(i,r),i},setItem:function(e,r,a){return function e(r,a,i,u){var s=this;r=o(r);var f=new n(function(n,t){s.ready().then(function(){void 0===a&&(a=null);var o=a,f=s._dbInfo;f.serializer.serialize(a,function(a,l){l?t(l):f.db.transaction(function(e){c(e,f,`INSERT OR REPLACE INTO ${f.storeName} `+"(key, value) VALUES (?, ?)",[r,a],function(){n(o)},function(e,r){t(r)})},function(a){if(a.code===a.QUOTA_ERR){if(u>0)return void n(e.apply(s,[r,o,i,u-1]));t(a)}})})}).catch(t)});t(f,i);return f}.apply(this,[e,r,a,1])},removeItem:function(e,r){var a=this;e=o(e);var i=new n(function(r,n){a.ready().then(function(){var t=a._dbInfo;t.db.transaction(function(o){c(o,t,`DELETE FROM ${t.storeName} WHERE key = ?`,[e],function(){r()},function(e,r){n(r)})})}).catch(n)});return t(i,r),i},clear:function(e){var r=this,o=new n(function(e,n){r.ready().then(function(){var t=r._dbInfo;t.db.transaction(function(r){c(r,t,`DELETE FROM ${t.storeName}`,[],function(){e()},function(e,r){n(r)})})}).catch(n)});return t(o,e),o},length:function(e){var r=this,o=new n(function(e,n){r.ready().then(function(){var t=r._dbInfo;t.db.transaction(function(r){c(r,t,`SELECT COUNT(key) as c FROM ${t.storeName}`,[],function(r,n){var t=n.rows.item(0).c;e(t)},function(e,r){n(r)})})}).catch(n)});return t(o,e),o},key:function(e,r){var o=this,a=new n(function(r,n){o.ready().then(function(){var t=o._dbInfo;t.db.transaction(function(o){c(o,t,`SELECT key FROM ${t.storeName} WHERE id = ? LIMIT 1`,[e+1],function(e,n){var t=n.rows.length?n.rows.item(0).key:null;r(t)},function(e,r){n(r)})})}).catch(n)});return t(a,r),a},keys:function(e){var r=this,o=new n(function(e,n){r.ready().then(function(){var t=r._dbInfo;t.db.transaction(function(r){c(r,t,`SELECT key FROM ${t.storeName}`,[],function(r,n){for(var t=[],o=0;o<n.rows.length;o++)t.push(n.rows.item(o).key);e(t)},function(e,r){n(r)})})}).catch(n)});return t(o,e),o},dropInstance:function(e,r){r=a.apply(this,arguments);var o=this.config();(e="function"!=typeof e&&e||{}).name||(e.name=e.name||o.name,e.storeName=e.storeName||o.storeName);var i,c=this;i=e.name?new n(function(r){var t;t=e.name===o.name?c._dbInfo.db:openDatabase(e.name,"","",0),e.storeName?r({db:t,storeNames:[e.storeName]}):r(function(e){return new n(function(r,n){e.transaction(function(t){t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(n,t){for(var o=[],a=0;a<t.rows.length;a++)o.push(t.rows.item(a).name);r({db:e,storeNames:o})},function(e,r){n(r)})},function(e){n(e)})})}(t))}).then(function(e){return new n(function(r,t){e.db.transaction(function(o){function a(e){return new n(function(r,n){o.executeSql(`DROP TABLE IF EXISTS ${e}`,[],function(){r()},function(e,r){n(r)})})}for(var i=[],c=0,u=e.storeNames.length;c<u;c++)i.push(a(e.storeNames[c]));n.all(i).then(function(){r()}).catch(function(e){t(e)})},function(e){t(e)})})}):n.reject("Invalid arguments");return t(i,r),i}};return u}),e("skylark-localForage/utils/isLocalStorageValid",[],function(){"use strict";return function(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&!!localStorage.setItem}catch(e){return!1}}}),e("skylark-localForage/drivers/localstorage",["../utils/isLocalStorageValid","../utils/serializer","../utils/promise","../utils/executeCallback","../utils/normalizeKey","../utils/getCallback"],function(e,r,n,t,o,a){"use strict";function i(e,r){var n=e.name+"/";return e.storeName!==r.storeName&&(n+=e.storeName+"/"),n}function c(){return!function(){try{return localStorage.setItem("_localforage_support_test",!0),localStorage.removeItem("_localforage_support_test"),!1}catch(e){return!0}}()||localStorage.length>0}var u={_driver:"localStorageWrapper",_initStorage:function(e){var t={};if(e)for(var o in e)t[o]=e[o];if(t.keyPrefix=i(e,this._defaultConfig),!c())return n.reject();return this._dbInfo=t,t.serializer=r,n.resolve()},_support:e(),iterate:function(e,r){var n=this,o=n.ready().then(function(){for(var r=n._dbInfo,t=r.keyPrefix,o=t.length,a=localStorage.length,i=1,c=0;c<a;c++){var u=localStorage.key(c);if(0===u.indexOf(t)){var s=localStorage.getItem(u);if(s&&(s=r.serializer.deserialize(s)),void 0!==(s=e(s,u.substring(o),i++)))return s}}});return t(o,r),o},getItem:function(e,r){var n=this;e=o(e);var a=n.ready().then(function(){var r=n._dbInfo,t=localStorage.getItem(r.keyPrefix+e);return t&&(t=r.serializer.deserialize(t)),t});return t(a,r),a},setItem:function(e,r,a){var i=this;e=o(e);var c=i.ready().then(function(){void 0===r&&(r=null);var t=r;return new n(function(n,o){var a=i._dbInfo;a.serializer.serialize(r,function(r,i){if(i)o(i);else try{localStorage.setItem(a.keyPrefix+e,r),n(t)}catch(e){"QuotaExceededError"!==e.name&&"NS_ERROR_DOM_QUOTA_REACHED"!==e.name||o(e),o(e)}})})});return t(c,a),c},removeItem:function(e,r){var n=this;e=o(e);var a=n.ready().then(function(){var r=n._dbInfo;localStorage.removeItem(r.keyPrefix+e)});return t(a,r),a},clear:function(e){var r=this,n=r.ready().then(function(){for(var e=r._dbInfo.keyPrefix,n=localStorage.length-1;n>=0;n--){var t=localStorage.key(n);0===t.indexOf(e)&&localStorage.removeItem(t)}});return t(n,e),n},length:function(e){var r=this.keys().then(function(e){return e.length});return t(r,e),r},key:function(e,r){var n=this,o=n.ready().then(function(){var r,t=n._dbInfo;try{r=localStorage.key(e)}catch(e){r=null}return r&&(r=r.substring(t.keyPrefix.length)),r});return t(o,r),o},keys:function(e){var r=this,n=r.ready().then(function(){for(var e=r._dbInfo,n=localStorage.length,t=[],o=0;o<n;o++){var a=localStorage.key(o);0===a.indexOf(e.keyPrefix)&&t.push(a.substring(e.keyPrefix.length))}return t});return t(n,e),n},dropInstance:function(e,r){if(r=a.apply(this,arguments),!(e="function"!=typeof e&&e||{}).name){var o=this.config();e.name=e.name||o.name,e.storeName=e.storeName||o.storeName}var c,u=this;c=e.name?new n(function(r){e.storeName?r(i(e,u._defaultConfig)):r(`${e.name}/`)}).then(function(e){for(var r=localStorage.length-1;r>=0;r--){var n=localStorage.key(r);0===n.indexOf(e)&&localStorage.removeItem(n)}}):n.reject("Invalid arguments");return t(c,r),c}};return u}),e("skylark-localForage/utils/includes",[],function(){"use strict";const e=(e,r)=>e===r||"number"==typeof e&&"number"==typeof r&&isNaN(e)&&isNaN(r);return(r,n)=>{const t=r.length;let o=0;for(;o<t;){if(e(r[o],n))return!0;o++}return!1}}),e("skylark-localForage/utils/isArray",[],function(){"use strict";const e=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};return e}),e("skylark-localForage/localforage",["./drivers/indexeddb","./drivers/websql","./drivers/localstorage","./utils/serializer","./utils/promise","./utils/executeCallback","./utils/executeTwoCallbacks","./utils/includes","./utils/isArray"],function(e,r,n,t,o,a,i,c,u){"use strict";const s={},f={},l={INDEXEDDB:e,WEBSQL:r,LOCALSTORAGE:n},d=[l.INDEXEDDB._driver,l.WEBSQL._driver,l.LOCALSTORAGE._driver],v=["dropInstance"],h=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(v),b={description:"",driver:d.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function y(e,r){e[r]=function(){const n=arguments;return e.ready().then(function(){return e[r].apply(e,n)})}}function g(){for(let e=1;e<arguments.length;e++){const r=arguments[e];if(r)for(let e in r)r.hasOwnProperty(e)&&(u(r[e])?arguments[0][e]=r[e].slice():arguments[0][e]=r[e])}return arguments[0]}class m{constructor(e){for(let e in l)if(l.hasOwnProperty(e)){const r=l[e],n=r._driver;this[e]=n,s[n]||this.defineDriver(r)}this._defaultConfig=g({},b),this._config=g({},this._defaultConfig,e),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(()=>{})}config(e){if("object"==typeof e){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(let r in e){if("storeName"===r&&(e[r]=e[r].replace(/\W/g,"_")),"version"===r&&"number"!=typeof e[r])return new Error("Database version must be a number.");this._config[r]=e[r]}return!("driver"in e&&e.driver)||this.setDriver(this._config.driver)}return"string"==typeof e?this._config[e]:this._config}defineDriver(e,r,n){const t=new o(function(r,n){try{const t=e._driver,i=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!e._driver)return void n(i);const u=h.concat("_initStorage");for(let r=0,t=u.length;r<t;r++){const t=u[r],o=!c(v,t);if((o||e[t])&&"function"!=typeof e[t])return void n(i)}const l=function(){const r=function(e){return function(){const r=new Error(`Method ${e} is not implemented by the current driver`),n=o.reject(r);return a(n,arguments[arguments.length-1]),n}};for(let n=0,t=v.length;n<t;n++){const t=v[n];e[t]||(e[t]=r(t))}};l();const d=function(n){s[t]&&console.info(`Redefining LocalForage driver: ${t}`),s[t]=e,f[t]=n,r()};"_support"in e?e._support&&"function"==typeof e._support?e._support().then(d,n):d(!!e._support):d(!0)}catch(e){n(e)}});return i(t,r,n),t}driver(){return this._driver||null}getDriver(e,r,n){const t=s[e]?o.resolve(s[e]):o.reject(new Error("Driver not found."));return i(t,r,n),t}getSerializer(e){const r=o.resolve(t);return i(r,e),r}ready(e){const r=this,n=r._driverSet.then(()=>(null===r._ready&&(r._ready=r._initDriver()),r._ready));return i(n,e,e),n}setDriver(e,r,n){const t=this;u(e)||(e=[e]);const a=this._getSupportedDrivers(e);function c(){t._config.driver=t.driver()}function s(e){return t._extend(e),c(),t._ready=t._initStorage(t._config),t._ready}const f=null!==this._driverSet?this._driverSet.catch(()=>o.resolve()):o.resolve();return this._driverSet=f.then(()=>{const e=a[0];return t._dbInfo=null,t._ready=null,t.getDriver(e).then(e=>{t._driver=e._driver,c(),t._wrapLibraryMethodsWithReady(),t._initDriver=function(e){return function(){let r=0;return function n(){for(;r<e.length;){let o=e[r];return r++,t._dbInfo=null,t._ready=null,t.getDriver(o).then(s).catch(n)}c();const a=new Error("No available storage method found.");t._driverSet=o.reject(a);return t._driverSet}()}}(a)})}).catch(()=>{c();const e=new Error("No available storage method found.");return t._driverSet=o.reject(e),t._driverSet}),i(this._driverSet,r,n),this._driverSet}supports(e){return!!f[e]}_extend(e){g(this,e)}_getSupportedDrivers(e){const r=[];for(let n=0,t=e.length;n<t;n++){const t=e[n];this.supports(t)&&r.push(t)}return r}_wrapLibraryMethodsWithReady(){for(let e=0,r=h.length;e<r;e++)y(this,h[e])}createInstance(e){return new m(e)}}return new m}),e("skylark-localForage/main",["skylark-langx-ns","./localforage"],function(e,r){return e.attach("intg.localforage",r)}),e("skylark-localForage",["skylark-localForage/main"],function(e){return e})}(n),!t){var i=require("skylark-langx-ns");o?module.exports=i:r.skylarkjs=i}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-localForage-all.js.map