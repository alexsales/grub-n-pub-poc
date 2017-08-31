(function() {

    'use strict';

    angular
        .module('myGrubApp')
        .controller('BrowseCtrl', ['$state', 'publicData', 'storageService', BrowseCtrl]);


    function BrowseCtrl($state, publicData, storageService) {
        var vm = this;

        vm.hi = 'howdy browseCtrl';
        vm.usersList = publicData;
        console.log(vm.usersList);

        vm.viewProfile = function(uid) {
            console.log(uid);
            storageService.cacheServe.put('userPublicUID', uid);
            console.log(storageService.cacheServe);

            storageService.sessionServe.uid = uid;
            console.log(storageService.sessionServe);

            $state.go('userProfile');

            // TODO .. actually look into $cacheFactory
            // set userPublicUID on dataService
            // set userPublicUID on rootScope
            // navigate to userPublicProfile, passing uid as paramater
        }

        // function genBrick() {
        //     var height = ~~(Math.random() * 500) + 100;
        //     var id = ~~(Math.random() * 10000);
        //     return {
        //         src: 'http://lorempixel.com/g/280/' + height + '/?' + id
        //     };
        // }

        // vm.bricks = [
        //     genBrick(),
        //     genBrick(),
        //     genBrick(),
        //     genBrick(),
        //     genBrick()
        // ];
        // vm.add = function add() {
        //     $scope.bricks.push(genBrick());
        // };
        // vm.remove = function remove() {
        //     $scope.bricks.splice(
        //         ~~(Math.random() * $scope.bricks.length),
        //         1
        //     )
        // };      
    }

})();