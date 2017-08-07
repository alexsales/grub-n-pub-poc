(function() {

    'use strict';

    angular
        .module('myGrubApp', ['ui.router', 'firebase'])
        .controller('MyGrubAppCtrl', ['$firebaseAuth', MyGrubAppCtrl])
        .config(['$stateProvider', '$urlServiceProvider', '$qProvider', '$logProvider', uiRouterConfig])
        .run(['$rootScope', '$state', '$transitions', '$firebaseAuth', 'authService', runConfig]);  

    // myGrubAppCtrl controller
    function MyGrubAppCtrl($firebaseAuth) {
        var vm = this;
        vm.login = function() {
            $firebaseAuth().$signInWithEmailAndPassword('jennikins813@yahoo.com', 'abc123jen')
                .catch(function(error) {
                    console.log('Authentication failed: ', error);
                });
        };
        vm.logout = function() {
            var uid = $firebaseAuth().$getAuth().uid;
            var dataRef = firebase.database().ref('c_prvt/' + uid);

            dataRef.off();
            $firebaseAuth().$signOut();
            console.log($firebaseAuth().$getAuth());
        };
    }

    // state configurations
    function uiRouterConfig($stateProvider, $urlServiceProvider, $qProvider, $logProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/home/homeView.html',
                controller: 'HomeCtrl',
                controllerAs: 'homeVM'
            })
            .state('browse', {
                url: '/browse',
                templateUrl: 'app/browse/browseView.html',
                controller: 'BrowseCtrl',
                controllerAs: 'browseVM',
                resolve: {
                    publicData: ['dataService' , function(dataService) {
                        return dataService.getPublicData();
                            // .then(function(res) {
                            //     console.log('publicData resolve ' + res);
                            //     return res;
                            //     // vm.publicData = res;
                            //     // console.log(vm.data);
                            // });
                    }]
                    // publicDataWithImages: ['dataService', 'publicData', function(dataService, publicData) {
                    //     return dataService.getAndAddPublicUserImageData(publicData)
                    //         .then(function(modifiedUsersList) {
                    //             console.log(modifiedUsersList);

                    //             // var usersList = [];
                    //             // modifiedUsersList.forEach(function(user) {
                    //             //     user.landscapeImgDownloadURL
                    //             //         .then(function(url) {
                    //             //             // console.log(url);
                    //             //             user.landscapeImgDownloadURL = url;
                    //             //         });
                    //             //     user.portraitImgDownloadURL
                    //             //         .then(function(url) {
                    //             //             // console.log(url);
                    //             //             user.portraitImgDownloadURL = url;
                    //             //         });
                    //             //     console.log(user);
                    //             //     usersList.push(user);
                    //             //     // $scope.$apply();
                    //             // });
                    //             // console.log(usersList);
                    //             // return usersList;
                    //             return modifiedUsersList;
                    //         });
                    // }]
                }
            })
            .state('userProfile', {
                url: '/userProfile',
                templateUrl: 'app/userProfile/userProfileView.html',
                controller: 'UserProfileCtrl',
                controllerAs: 'userProfileVM',
                resolve: {
                    isUserAuthenticated: ['$q', '$state', '$location', 'authService', function($q, $state, $location, authService) {

                        return authService.isUserAuthenticated()
                            .then(function(usr) {
                                // console.log('resolved isUserAuthenticated: ', usr);
                                return usr;
                            })
                            .catch(function(err) {
                                // console.log('rejected isUserAuthenticated: ', err);
                                $location.url('/home');
                                $state.go('home');
                            });

                    }],
                    authUserPrvtData: ['isUserAuthenticated', 'dataService', function(isUserAuthenticated, dataService) {

                        if (isUserAuthenticated) {
                            var uid = isUserAuthenticated.uid;
                            var userDataPromise = dataService.getPrivateData(uid);
                            console.log(userDataPromise);

                            userDataPromise.then(function(snapshot) {
                                console.log(snapshot);
                                return snapshot;
                            });

                            return userDataPromise;
                        }

                    }]
                }
            });

        $urlServiceProvider
            .rules
                .otherwise({ state: 'home' });

        $qProvider.errorOnUnhandledRejections(false);
        $logProvider.debugEnabled(true);

    }

    // run method configuration
    function runConfig($rootScope, $state, $transitions, $firebaseAuth, authService) {
        
        // set user, if user exists, when user first visits application
        $rootScope.authObj = $firebaseAuth();
        $rootScope.authObj.$onAuthStateChanged(function(firebaseUser) {
            authService.setCurrentUser(firebaseUser);
            // if (firebaseUser === null) {

            //     $state.go('home');
            // }
        });

    }

})();