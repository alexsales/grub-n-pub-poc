(function() {

    'use strict';

    describe('HomeCtrl', function() {

        var $controller = null,
            $location = null,
            homeVM = null;

        beforeEach(function() {

            module('myGrubApp');

            inject(function(_$controller_) {
                $controller = _$controller_;

                // inject instance of actual HomeCtrl;
                // uses the controllerAs syntax via 'this' keyword;
                // controllerAs homeVM
                homeVM = $controller('HomeCtrl');
            });

        });

        it('should contain variables bound via this/homeVM', function() {
            expect(homeVM.controllerName).toEqual('HomeCtrl as homeVM');
        });

    });

})();