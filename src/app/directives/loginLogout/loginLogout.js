(function() {

    'use strict';

    angular
        .module('myGrubApp')
        .directive('gpLoginLogout', ['$q', 'authService', loginLogout]);

    function loginLogout($q, authService) {
        return {
            scope: {
            },
            controller: 'LoginLogoutCtrl',
            controllerAs: 'loginLogoutVM',
            bindToController: {
                loggedIn: '='
            },
            templateUrl: 'app/directives/loginLogout/loginLogoutView.html',
            restrict: 'EA'
        };
    }


})();