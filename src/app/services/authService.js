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

            if (user !== null) {
                $log.info('YES, user IS authenticated');
                deferred.resolve(user);
            } else {
                $log.warn('NO, user is NOT authenticated');
                deferred.reject('user not logged in');
            }

            return deferred.promise;
        }

        // function isValidatedRW() {
        //     var deferred = $q.defer();

        //     // access all of user's private paths
        //     if (user !== null) {
        //         var aUserRef = firebase.database().ref('a_users/' + user.uid);
        //         var aUserObj = $firebaseObject(aUserRef);

        //         console.log(aUserObj);
        //         deferred.resolve(aUserObj);
        //     }

        //     return deferred.promise;
        // }

        return {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            isUserAuthenticated: isUserAuthenticated
            // isValidatedRW: isValidatedRW
        }
    }

})();