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
            // transclude: 'element',
            templateUrl: 'app/directives/loginLogout/loginLogoutView.html',
            // link: function(scope, elem, attrs, ctrl, transclude) {
            //     console.log(scope);
            //     console.log(attrs);

            // },
            restrict: 'EA'
        };
    }


})();