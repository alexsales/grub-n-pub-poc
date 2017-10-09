(function() {

    'use strict';

    angular
        .module('myGrubApp')
        .controller('LoginLogoutCtrl', ['$scope', '$firebaseAuth', '$state', 'authService', LoginLogoutCtrl]);

    function LoginLogoutCtrl($scope, $firebaseAuth, $state, authService) {
        $('.modal').modal({
            dismissible: true,
            opacity: .5,
            inDuration: 300,
            outDuration: 200,
            startingTop: '4%',
            endingTop: '10%',
            ready: function(modal, trigger) { 
                alert("Ready");
                console.log(modal, trigger);
            },
            complete: function() {
                alert('Closed');
            }
        });

        var vm = this;
        // console.log(vm);
        vm.login = function() {
            $firebaseAuth().$signInWithEmailAndPassword('jennikins813@yahoo.com', 'abc123jen')
                .then(function(user) {
                        console.log('signed in: ', user);
                        vm.loggedIn = true;
                        // console.log(vm.loggedIn);

                        // trigger for logged-in-modal
                        $('#logged-in-modal').modal('open');
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
                        console.log('signed out user: ', uid);
                        vm.loggedIn = false;
                        // console.log(vm.loggedIn);
                })
                .catch(function(error) {
                    console.log('Logout failed: ', error);
                });
        };
    }

})();