(function() {

    'use strict';

    describe('auth service', function() {
        var user = {
            email: "jennikins813@yahoo.com",
            emailVerified: false,
            uid: "phiNVMv6k8fFhib9WAdHKgFi7Q33"
        };
        var authService = {};
        var $httpBackend;

        // load main angular app module
        beforeEach(module('myGrubApp'));

        // load instances of individual components
        beforeEach(inject(function(_$httpBackend_, _authService_) {
            $httpBackend = _$httpBackend_;
            authService = _authService_;
        }));

        it('should detect if the current user is authenticated (if current user is logged in)', function() {
            // var response = null;
            // var service = {};
            authService.setCurrentUser(user);
            expect(authService.getCurrentUser().uid).toEqual(user.uid);
        });
    
    });

})();