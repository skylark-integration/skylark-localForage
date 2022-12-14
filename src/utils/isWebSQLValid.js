define(function () {
    'use strict';
    function isWebSQLValid() {
        return typeof openDatabase === 'function';
    }
    return isWebSQLValid;
});