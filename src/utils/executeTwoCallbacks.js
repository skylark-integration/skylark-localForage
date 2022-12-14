define(function () {
    'use strict';
    function executeTwoCallbacks(promise, callback, errorCallback) {
        if (typeof callback === 'function') {
            promise.then(callback);
        }
        if (typeof errorCallback === 'function') {
            promise.catch(errorCallback);
        }
    }
    return executeTwoCallbacks;
});