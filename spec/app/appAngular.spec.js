(function() {

    'use strict';

    // unit test: home
    describe('home state', function() {
        var $state = null;
        var $log = null;
        var homeState = null;

        beforeEach(function() {
            module('myGrubApp');
            inject(function(_$state_, _$log_) {
                $state = _$state_;
                $log = _$log_;
                homeState = $state.get('home');
            });
        });

        it('should allow me to successfully navigate to it', function() {
            expect(homeState.url).toEqual('/home');
            expect(homeState.templateUrl).toEqual('app/home/homeView.html');
            expect(homeState.controller).toEqual('HomeCtrl');   
        });
    });

    // unit test: userProfile state when authenticated
    describe('userProfile state when user is logged in', function() {
        var $rootScope = null,
            $state = null,
            $injector = null,
            $httpBackend = null,
            $q = null,
            $location = null,
            $templateCache = null,
            $log = null,
            authService = null,
            authServiceMock = null,
            state = null;

        beforeEach(function() {
            module('myGrubApp');
            inject(function(_$rootScope_, _$state_, _$injector_, _$httpBackend_, _$q_, _$location_, _$templateCache_, _$log_, _authService_) {
                $rootScope = _$rootScope_;
                $state = _$state_;
                $injector = _$injector_;
                $httpBackend = _$httpBackend_;
                $q = _$q_;
                $templateCache = _$templateCache_;
                $log = _$log_;
                authService = _authService_;
            });
        });

        it('should respond to URL', function() {
            state = 'userProfile';
            spyOn($state, 'go');
            $state.go(state);

            expect($state.go).toHaveBeenCalled();
            expect($state.href(state)).toEqual('#!/userProfile');
        });

        it('should resolve data with user', function() {
            var promiseData = null;
            var user = {
                email: 'jennikins813@yahoo.com',
                emailVerified: false,
                uid: 'phiNVMv6k8fFhib9WAdHKgFi7Q33'
            };

            // test authService using mock user data;
            // authService is used in the resolve property
            // of userProfile's state configuration object
            authService.setCurrentUser(user);
            promiseData = authService.isUserAuthenticated();

            expect(authService.getCurrentUser().email).toEqual('jennikins813@yahoo.com');
            expect(promiseData.$$state.value.email).toEqual('jennikins813@yahoo.com');
            console.log('test - userProfile IS resolved: ' + angular.mock.dump($log.info.logs));
        });
    });

    // unit test: userProfile state when NOT logged-in/authenticated
    describe('userProfile state when user is NOT logged in', function() {
        var $rootScope = null,
            $state = null,
            $injector = null,
            $httpBackend = null,
            $q = null,
            $location = null,
            $templateCache = null,
            $log = null,
            authService = null,
            authServiceMock = null,
            state = null;

        beforeEach(function() {
            module('myGrubApp', ['$logProvider', function($logProvider) {
                $logProvider.debugEnabled(true);
            }]);
            inject(function(_$rootScope_, _$state_, _$injector_, _$httpBackend_, _$q_, _$location_, _$templateCache_, _$log_, _authService_) {
                $rootScope = _$rootScope_;
                $state = _$state_;
                $injector = _$injector_;
                $httpBackend = _$httpBackend_;
                $q = _$q_;
                $templateCache = _$templateCache_;
                $log = _$log_;
                authService = _authService_;
            });
        });

        it('should respond to URL', function() {
            state = 'userProfile';
            spyOn($state, 'go');
            $state.go(state);

            expect($state.go).toHaveBeenCalled();
            expect($state.href(state)).toEqual('#!/userProfile');
        });

        it('should NOT resolve data with user === null', function() {
            var promiseData = null;
            var user = null;

            // test authService using mock user data;
            // authService is used in the resolve property
            // of userProfile's state configuration object
            authService.setCurrentUser(user);
            promiseData = authService.isUserAuthenticated();
            expect(authService.getCurrentUser()).toEqual(null);
            expect(promiseData.$$state.value.email).toEqual(undefined);
            console.log('test - userProfile IS NOT resolved: ' + angular.mock.dump($log.info.logs));
        });
    });

})();