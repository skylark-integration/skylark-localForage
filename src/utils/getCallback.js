define(function () {
    'use strict';
    return function getCallback() {
        if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
            return arguments[arguments.length - 1];
        }
    };
});