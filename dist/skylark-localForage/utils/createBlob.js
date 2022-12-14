/**
 * skylark-localForage - A skylark wrapper for localForage.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(function(){"use strict";return function(e,r){e=e||[],r=r||{};try{return new Blob(e,r)}catch(l){if("TypeError"!==l.name)throw l;for(var n=new("undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder),o=0;o<e.length;o+=1)n.append(e[o]);return n.getBlob(r.type)}}});
//# sourceMappingURL=../sourcemaps/utils/createBlob.js.map
