(function() {

    'use strict';

    angular
        .module('myGrubApp')
        .controller('BrowseCtrl', ['publicData', BrowseCtrl]);


    function BrowseCtrl(publicData) {
        var vm = this;

        vm.hi = 'howdy browseCtrl';
        vm.usersList = publicData;
        console.log(vm.usersList);  

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