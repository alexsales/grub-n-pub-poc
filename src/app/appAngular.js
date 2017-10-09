(function() {

    'use strict';

    angular
        .module('myGrubApp', ['ui.router', 'firebase', 'wu.masonry', 'ngStorage'])
        .controller('MyGrubAppCtrl', ['$rootScope', MyGrubAppCtrl])
        .config(['$stateProvider', '$urlServiceProvider', '$qProvider', '$logProvider', uiRouterConfig])
        .run(['$q', '$rootScope', '$state', '$transitions', '$firebaseAuth', 'authService', 'dataService', 'storageService', runConfig]);  

    // myGrubAppCtrl controller
    function MyGrubAppCtrl($rootScope) {
        var vm = this;
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
                    }]
                }
            })
            .state('myProfile', {
                url: '/myProfile/{personId}',
                templateUrl: 'app/myProfile/myProfileView.html',
                controller: 'MyProfileCtrl',
                controllerAs: 'MyProfileVM',
                resolve: {
                    isUserAuthenticated: ['$q', '$state', '$location', 'authService', function($q, $state, $location, authService) {

                        return authService.isUserAuthenticated()
                            .then(function(usr) {
                                return usr;
                            })
                            .catch(function(err) {
                                // TODO: redirect to login/registration view
                                console.log('rejected: ', err);
                                return null;
                                // $location.url('/loginRegistration');
                                // $state.go('loginRegistration');
                            });
                    }],
                    authUserPrvtData: ['isUserAuthenticated', 'dataService', function(isUserAuthenticated, dataService) {

                        if (isUserAuthenticated) {
                            var uid = isUserAuthenticated.uid;
                            var myDataPromise = dataService.getPrivateData(uid);
                            console.log(myDataPromise);

                            myDataPromise.then(function(snapshot) {
                                console.log(snapshot);
                                return snapshot;
                            });

                            return myDataPromise;
                        }
                    }]
                }
            })
            .state('userProfile', {
                url: '/userProfile',
                templateUrl: 'app/userProfile/userProfileView.html',
                controller: 'UserProfileCtrl',
                controllerAs: 'userProfileVM',
                // params: {
                //     userId: null
                // },
                resolve: {
                    isUserAuthenticated: ['$q', '$state', '$location', 'authService', function($q, $state, $location, authService) {
                        return authService.isUserAuthenticated()
                            .then(function(usr) {
                                return usr;
                            })
                            .catch(function(warning) {
                                // TODO: redirect to login/registration view
                                console.log('warning on isUserAuthenticated; will still navigate to userProfile: ', warning);
                                return null;
                                // $location.url('/loginRegistration');
                                // $state.go('loginRegistration');
                            });
                    }],
                    userProfileData: ['storageService', 'dataService', function(storageService, dataService) {
                        var uid = storageService.sessionServe.uid;

                        return dataService.getUserData(uid);
                    }]
                    // setUserProfileUID: ['$transition$', 'dataService', function($transition$, dataService) {
                    //     var uid = $transition$.params().userId;

                    //     dataService.setUserPublicUID(uid);
                    //     return true;
                    // }],
                    // getUserProfileData: ['$transition$', '$location', '$state', 'dataService', 'cacheService', function($transition$, $location, $state, dataService, cacheService) {

                    //     return dataService.getUserData()
                    //         .then(function(res) {
                    //             console.log(res);
                    //             return res;
                    //         });
                    //         // .catch(function(err) {
                    //         //     console.log('Error within dataService.getUserData(): ' + err);
                    //         //     // return $state.target('browse');
                    //         // });
                    // }]
                }
            })
            .state('loginRegistration', {
                url: '/loginRegistration',
                templateUrl: 'app/loginRegistration/loginRegistrationView.html',
                controller: 'LoginRegistrationCtrl',
                controllerAs: 'loginRegistrationVM'
            });

        $urlServiceProvider
            .rules
                .otherwise({ state: 'home' });

        $qProvider.errorOnUnhandledRejections(false);
        $logProvider.debugEnabled(true);

    }

    // run method configuration
    function runConfig($q, $rootScope, $state, $transitions, $firebaseAuth, authService, dataService, storageService) {
        
        // set user, if user exists, when user first visits application
        $rootScope.authObj = $firebaseAuth();
        $rootScope.authObj.$onAuthStateChanged(function(firebaseUser) {
            authService.setCurrentUser(firebaseUser);
        });
        
        $transitions.onStart({ to: 'userProfile' }, function(trans) {
            console.log(trans);

            if (!storageService.sessionServe.uid) {
                return $state.target('browse');
            }
        });

        // setup so that an unauthenticated user navigating to /userProfile
        // is redirected to the login/registration state without a
        // Transition Rejection error in the console
        // $transitions.onStart({ to: 'userProfile' }, function(trans) {
        //     console.log(trans);
        //     // console.log(firebaseUser);

        //     return authService.isUserAuthenticated()
        //         .catch(function() {
        //             return $state.target('loginRegistration');
        //         });
        // });

        // $transitions.onStart({ to: 'userProfile' }, function(trans) {
        //     console.log('userProfile onStart: ', trans);
        //     console.log('userProfile onStart params: ', trans.params());
        //     var uid = null;
        //     var uidRemote = trans.params().userId;
        //     if (uidRemote !== null) {
        //         uid = uidRemote;
        //         console.log(uid);
        //         return true;
        //     }

        //     return dataService.getUserPublicUID()
        //         .then(function(res) {
        //             console.log(res);
        //         })
        //         .catch(function(errRes) {
        //             console.log(errRes);
        //             return $state.target('browse');
        //         });
        //     // if (uid === null) {
        //     //     // return $state.target('browse');
        //     //     uid = dataService.getUserPublicUID();
        //     //     console.log(uid);
        //     //     if (uid === null) {
        //     //         return $state.target('browse');
        //     //     }
        //     // }
        // });
    }

})();