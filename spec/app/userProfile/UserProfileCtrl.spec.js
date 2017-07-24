(function() {

    'use strict';

    describe('UserProfileCtrl', function() {

        var $q = null,
            $rootScope = null,
            $controller = null,
            $location = null,
            $templateCache = null,
            userProfileVM = null,
            isUserAuthenticated = null,
            authUserPrvtData = null,
            deferred = null,
            passPromise = null;


        beforeEach(function() {

            module('myGrubApp');

            // isUserAuthenticated in ui-state's resolve is async
            // therefore need to create a mock object of the service
            // since it's injected into the controller's declaration
            // module(function($provide) {
            //     $provide.factory('isUserAuthenticated', [function() {
            //         deferred = $q.defer();

            //         if (passPromise) {
            //             return $q.resolve();
            //         } else {
            //             return $q.reject();
            //         }

            //         return deferred.promise;
            //     }]);
            // });

            inject(function(_$q_, _$rootScope_, _$controller_, _$templateCache_) {
                $q = _$q_;
                $rootScope = _$rootScope_;
                $controller = _$controller_;
                $templateCache = _$templateCache_;
            });

        });

        beforeEach(function() {
            $templateCache.put('app/home/homeView.html', 'some template content');
        });

        it('should contain variables bound via this/userProfileVM', function() {
            // var isUserAuthenticated = null;
            // var authUserPrvtData = null;

            isUserAuthenticated = jasmine.createSpy('isUserAuthenticated');
            authUserPrvtData = jasmine.createSpy('authUserPrvtData');

            // inject instance of actual UserProfileCtrl;
            // uses the controllerAs syntax via 'this' keyword;
            // controllerAs userProfileVM;
            // 2nd argument is the locals object containing
            // dependencies injected into the controller
            userProfileVM = $controller('UserProfileCtrl', {
                isUserAuthenticated: isUserAuthenticated,
                authUserPrvtData: authUserPrvtData
            });

            isUserAuthenticated();
            authUserPrvtData();

            expect(isUserAuthenticated).toBeDefined();
            expect(isUserAuthenticated).toHaveBeenCalled(); 
            expect(userProfileVM.controllerName).toEqual('UserProfileCtrl as userProfileVM');

            expect(authUserPrvtData).toBeDefined();
            expect(authUserPrvtData).toHaveBeenCalled(); 
            expect(userProfileVM.controllerName).toEqual('UserProfileCtrl as userProfileVM');            

        });

        it('should contain resolved value(s) in isUserAuthenticated', function() {
            // var isUserAuthenticated = null;
            var resolvedValue = null;
            
            deferred = $q.defer();


            isUserAuthenticated = jasmine.createSpy('isUserAuthenticated');
            authUserPrvtData = jasmine.createSpy('authUserPrvtData');

            isUserAuthenticated.and.returnValue(deferred.promise);
            authUserPrvtData.and.returnValue(deferred.promise);

            isUserAuthenticated().then(function(val) {
                resolvedValue = val;
            });

            authUserPrvtData().then(function(val) {
                resolvedValue = val;
            });

            // inject instance of actual UserProfileCtrl;
            // uses the controllerAs syntax via 'this' keyword;
            // controllerAs userProfileVM;
            // 2nd argument is the locals object containing
            // dependencies injected into the controller
            userProfileVM = $controller('UserProfileCtrl', {
                isUserAuthenticated: isUserAuthenticated,
                authUserPrvtData: authUserPrvtData
            });

            expect(userProfileVM.authenticatedUser).toBeDefined();
            expect(userProfileVM.authenticatedUser).not.toEqual('is authenticated');

            // manually resolved, but .$apply() not yet called
            // should still make resolvedValue === null
            deferred.resolve('is authenticated');
            expect(resolvedValue).toEqual(null);

            // after forcing a digest cycle via .$apply()
            // resolvedValue === 123;
            // when resolved, value returned by isUserAuthenticated should
            // be successfully stored in the authenticatedUser variable
            // of the controller's scope
            $rootScope.$apply();
            expect(resolvedValue).toEqual('is authenticated');
            expect(userProfileVM.authenticatedUser).toEqual(isUserAuthenticated);


            expect(userProfileVM.prvtData).toBeDefined();
            expect(userProfileVM.prvtData).not.toEqual('is authenticated');            
        });

    });

})();