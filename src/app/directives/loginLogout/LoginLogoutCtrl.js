(function() {

    'use strict';

    angular
        .module('myGrubApp')
        .controller('LoginLogoutCtrl', ['$firebaseAuth', '$state', 'authService', LoginLogoutCtrl]);

    function LoginLogoutCtrl($firebaseAuth, $state, authService) {
        var user = null;
        var vm = this;

        vm.userLoggedIn = null;
        vm.login = function() {
            $firebaseAuth().$signInWithEmailAndPassword('jennikins813@yahoo.com', 'abc123jen')
                .then(function(user) {
                        // console.log('signed in: ', user);
                        vm.userLoggedIn = true;
                        Materialize.toast('You are now logged in!', 2000);
                })
                .catch(function(error) {
                    console.log('Authentication failed: ', error);
                });
        };
        vm.logout = function() {
            $state.go('browse');
            if ($firebaseAuth().$getAuth() === null) {
                console.log('already logged out');
                return false;
            }

            var uid = $firebaseAuth().$getAuth().uid;
            var dataRef = firebase.database().ref('c_prvt/' + uid);

            dataRef.off();
            $firebaseAuth().$signOut()
                .then(function() {
                        // console.log('signed out user: ', uid);
                        vm.userLoggedIn = false;
                })
                .catch(function(error) {
                    console.log('Logout failed: ', error);
                });
        };

        // initial userLoggedIn check
        user = authService.isUserAuthenticated()
            .then(function() {
                console.log('yes');
                vm.userLoggedIn = true;
            }, function() {
                console.log('no');
                vm.userLoggedIn = false;
            });
    }

})();