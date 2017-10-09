(function() {

    'use strict';

    angular
        .module('myGrubApp')
        .factory('authService', ['$q', '$firebaseAuth', '$firebaseObject', '$log', authService]);

    function authService($q, $firebaseAuth, $firebaseObject, $log) {
        var user = null;

        function setCurrentUser(_firebaseUser) {
            $log.info('Current user: ', _firebaseUser);
            user = _firebaseUser;
        }

        function getCurrentUser() {
            return user;
        }

        function isUserAuthenticated() {
            var deferred = $q.defer();
            var authObj = $firebaseAuth();

            authObj.$onAuthStateChanged(function(firebaseUser) {
                    if (firebaseUser) {
                        $log.info('YES, user IS authenticated');
                        deferred.resolve(firebaseUser);
                    }
                    if (!firebaseUser) {
                        $log.warn('NO, user is NOT authenticated');
                        deferred.reject('user not logged in');
                    }
            });

            return deferred.promise;
        }

        return {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            isUserAuthenticated: isUserAuthenticated
        }
    }

})();