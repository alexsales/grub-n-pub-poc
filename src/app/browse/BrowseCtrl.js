(function() {

    'use strict';

    angular
        .module('myGrubApp')
        .controller('BrowseCtrl', ['publicData', BrowseCtrl]);


    function BrowseCtrl(publicData) {

        var vm = this;

        vm.hi = 'howdy browseCtrl';
        // vm.data = null;
        // vm.portrait = null;
        vm.usersList = publicData;
        console.log(vm.usersList);

        
    }

})();