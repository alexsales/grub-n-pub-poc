(function() {

    'use strict';

    describe('data service', function() {
        var $firebaseArray = null;
        var $q = null;
        var $rootScope = null;
        var $templateCache = null;
        var dataService = {};
        var resolvedValue = null;

        // mockData only used when basic-prototyping dataService
        // var mockPublicDataJSON = {
        //     "about_me": "Looking to get out of the house and find new things to do solo and with family. Got any ideas on cheap family getaways or staycations? Maybe we can share parenting advice or have a friendly debate on child-rearing. Or we can just talk about the newest and coolest restaurants in our neighborhood. I'm all ears!",
        //     "age": 37,
        //     "city": "Los Angeles",
        //     "profile_name": "asales",
        //     "first_name": "Alex",
        //     "interest1": "zumba",
        //     "interest2": "web development",
        //     "interest3": "kids",
        //     "interest4": "ux design",
        //     "interest5": "kid-friendly things to do",
        //     "interest6": "deals/bargains",
        //     "motto": "The SEE-food diet doesn't work!",
        //     "state": "CA",
        //     "grub_zip1": 90004,
        //     "grub_zip2": 90032
        // };

        beforeEach(function() {
            module('myGrubApp');

            // dataService hard-coded when basic-prototyping
            // module(function($provide) {
            //     $provide.factory('dataService', function($q, $firebaseArray) {
            //         function getPublicData() {
            //             var publicDataPromise = null;

            //             // $q service only used when basic-prototyping dataService
            //             // var deferred = $q.defer();

            //             var dataRef = firebase.database().ref().child('profiles');
            //             var profilesList = $firebaseArray(dataRef);

            //             publicDataPromise = profilesList.$loaded();
            //             return publicDataPromise;
            //         }

            //         return {
            //             getPublicData: getPublicData
            //         };
            //     });
            // });
        });

        beforeEach(inject(function(_$firebaseArray_, _$q_, _$rootScope_, _$templateCache_, _dataService_) {
            $firebaseArray = _$firebaseArray_;
            $q = _$q_;
            $rootScope = _$rootScope_;
            $templateCache = _$templateCache_;
            dataService = _dataService_;
        }));

        beforeEach(function() {
            $templateCache.put('app/home/homeView.html', 'some template content');
        });

        it('should exist and be defined', function() {
            expect(dataService.getPublicData()).toEqual($q.defer().promise);
            expect(typeof dataService.getPublicData).toEqual('function');
            expect(typeof dataService.getPublicData()).toEqual('object');
        });

        it('should resolve', function() {
            var deferred = $q.defer();
            spyOn(dataService, 'getPublicData').and.returnValue(deferred.promise);

            dataService.getPublicData().then(function(val) {
                resolvedValue = val;
            });

            expect(dataService.getPublicData).toBeDefined();
            expect(dataService.getPublicData).toHaveBeenCalled();
            expect(resolvedValue).toEqual(null);

            // manually resolved, but .$apply() not yet called
            // should still make resolvedValue === null
            deferred.resolve('123');
            expect(resolvedValue).toEqual(null);

            // after forcing a digest cycle via .$apply()
            // resolvedValue === 123
            $rootScope.$apply();
            expect(resolvedValue).toEqual('123');
        });
    });

})();