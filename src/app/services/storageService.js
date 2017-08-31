(function() {

    'use strict';

    angular
        .module('myGrubApp')
        .factory('storageService', ['$cacheFactory', '$localStorage', '$sessionStorage', storageService]);

    function storageService($cacheFactory, $localStorage, $sessionStorage) {
        function cacheServe() {
            return $cacheFactory('cacheServe');
        }

        function localServe() {
            return $localStorage;
        }

        function sessionServe() {
            return $sessionStorage;
        }

        return {
            cacheServe: cacheServe(),
            localServe: localServe(),
            sessionServe: sessionServe()
        };
    }

})();