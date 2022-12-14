define(function () {
    'use strict';
    const isArray = Array.isArray || function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
    return isArray;
});