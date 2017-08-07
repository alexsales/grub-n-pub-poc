(function() {

    'use strict';

    describe('BrowseCtrl', function() {

        var $controller = null,
            $location = null,
            publicData = null,
            browseVM = null;

        beforeEach(function() {

            module('myGrubApp');

            inject(function(_$controller_) {
                $controller = _$controller_;
            });

        });

        it('should contain variables bound via this/browseVM', function() {
            publicData = jasmine.createSpy('publicData');

            // inject instance of actual HomeCtrl;
            // uses the controllerAs syntax via 'this' keyword;
            // controllerAs homeVM
            browseVM = $controller('BrowseCtrl', {
                publicData: publicData
            });

            // publicData();
            // publicStorageData();

            expect(publicData).toBeDefined();
            // expect(publicData).toHaveBeenCalled();
            // expect(publicStorageData).toHaveBeenCalled();
            expect(browseVM.hi).toEqual('howdy browseCtrl');
        });

    });

})();