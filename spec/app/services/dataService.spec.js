(function() {

    'use strict';

    describe('data service', function() {
        var $firebaseArray = null;
        var $firebaseStorage = null;
        var $q = null;
        var $rootScope = null;
        var $templateCache = null;
        var dataService = {};
        var resolvedValuePblcData = null;
        var resolvedValuePblcStorageData = null;

        // var mockUsersList = [{
        //     "about_me": "Looking to get out of the house and find new things to do solo and with family. Got any ideas on cheap family getaways or staycations? Maybe we can share parenting advice or have a friendly debate on child-rearing. Or we can just talk about the newest and coolest restaurants in our neighborhood. I'm all ears!",
        //     "age": 37,
        //     "city": "Los Angeles",
        //     "first_name": "Alex",
        //     "grub_zip1": 90004,
        //     "grub_zip2": 90032,
        //     "interest1": "zumba",
        //     "interest2": "web development",
        //     "interest3": "kids",
        //     "interest4": "ux design",
        //     "interest5": "kid-friendly things to do",
        //     "interest6": "deals/bargains",
        //     "motto": "The SEE-food diet doesn't work!",
        //     "profile_name": "asales",
        //     "state": "CA",
        //     "userImg_portrait": "gs://dev-hacklabs.appspot.com/dev-hacklabs/b_pblc/e4RaOJSqluaVxaqNDlUqBJIzxhF2/portrait-225x300.jpg",
        //     "userImg_landscape": "gs://dev-hacklabs.appspot.com/dev-hacklabs/b_pblc/e4RaOJSqluaVxaqNDlUqBJIzxhF2/landscape-300x225.jpg"
        // }, {
        //     "about_me": "I'm all ears when it comes to food and cooking. Let's trade recipes or cooking tips. I also know a bit about blogging and social media.",
        //     "age": 39,
        //     "city": "Culver City",
        //     "first_name": "Jen",
        //     "grub_zip1": 90034,
        //     "grub_zip2": 90210,
        //     "interest1": "tennis",
        //     "interest2": "cooking",
        //     "interest3": "blogging",
        //     "interest4": "web",
        //     "interest5": "social media",
        //     "interest6": "zumba",
        //     "motto": "Georgetown Cupcakes can take my money any day!",
        //     "profile_name": "jennikins",
        //     "state": "CA",
        //     "userImg_portrait": "gs://dev-hacklabs.appspot.com/dev-hacklabs/b_pblc/phiNVMv6k8fFhib9WAdHKgFi7Q33/portrait-225x300.jpg",
        //     "userImg_landscape": "gs://dev-hacklabs.appspot.com/dev-hacklabs/b_pblc/phiNVMv6k8fFhib9WAdHKgFi7Q33/landscape-300x225.jpg"
        // }];

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
            //     $provide.factory('dataService', function($q, $firebaseArray, $firebaseStorage) {
            //         function getPublicData() {
            //             var publicDataPromise = null;

            //             // $q service only used when basic-prototyping dataService
            //             // var deferred = $q.defer();

            //             var dataRef = firebase.database().ref().child('profiles');
            //             var profilesList = $firebaseArray(dataRef);

            //             publicDataPromise = profilesList.$loaded();
            //             return publicDataPromise;
            //         }

            //         function getPublicStorageData() {
            //             var deferred = $q.defer();
            //             var publicStorageDataPromise = deferred.promise;

            //             var storageRef = firebase.storage().ref().child('dev-hacklabs/b_pblc/e4RaOJSqluaVxaqNDlUqBJIzxhF2/portrait1-225x300.jpg');
            //             var publicStorage = $firebaseStorage(storageRef);
            //             // console.log(publicStorage);

            //             publicStorageDataPromise = publicStorage.$getDownloadURL().then(function(url) {
            //                 deferred.resolve(url);
            //             });
            //             return publicStorageDataPromise;

            //             // $q service only used when basic-prototyping dataService
            //             // var deferred = $q.defer();
            //             // return deferred.promise;                      
            //         }

            //         return {
            //             getPublicData: getPublicData,
            //             getPublicStorageData: getPublicStorageData
            //         };
            //     });
            // });
        });

        beforeEach(inject(function(_$firebaseArray_, _$firebaseStorage_, _$q_, _$rootScope_, _$templateCache_, _dataService_) {
            $firebaseArray = _$firebaseArray_;
            $firebaseStorage = _$firebaseStorage_;
            $q = _$q_;
            $rootScope = _$rootScope_;
            $templateCache = _$templateCache_;
            dataService = _dataService_;
        }));

        beforeEach(function() {
            $templateCache.put('app/home/homeView.html', 'some template content');
        });

        it('getPublicData should exist and be defined', function() {
            var deferred = $q.defer();
            expect(dataService.getPublicData()).toEqual(deferred.promise);
            expect(typeof dataService.getPublicData).toEqual('function');
            expect(typeof dataService.getPublicData()).toEqual('object');
        });

        it('getPublicData should resolve', function() {
            var deferred = $q.defer();
            spyOn(dataService, 'getPublicData').and.returnValue(deferred.promise);

            dataService.getPublicData().then(function(val) {
                resolvedValuePblcData = val;
            });

            expect(dataService.getPublicData).toBeDefined();
            expect(dataService.getPublicData).toHaveBeenCalled();
            expect(resolvedValuePblcData).toEqual(null);

            // manually resolved, but .$apply() not yet called
            // should still make resolvedValue === null
            deferred.resolve('123');
            expect(resolvedValuePblcData).toEqual(null);

            // after forcing a digest cycle via .$apply()
            // resolvedValue === 123
            $rootScope.$apply();
            expect(resolvedValuePblcData).toEqual('123');
        });
    });

})();