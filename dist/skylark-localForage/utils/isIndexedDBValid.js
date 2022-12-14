/**
 * skylark-localForage - A skylark wrapper for localForage.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./idb"],function(e){"use strict";return function(){try{if(!e||!e.open)return!1;var t="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),n="function"==typeof fetch&&-1!==fetch.toString().indexOf("[native code");return(!t||n)&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange}catch(e){return!1}}});
//# sourceMappingURL=../sourcemaps/utils/isIndexedDBValid.js.map
