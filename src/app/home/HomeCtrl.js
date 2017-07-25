(function() {

    'use strict';
    
    angular
        .module('myGrubApp')
        .controller('HomeCtrl', ['dataService', HomeCtrl]);

    function HomeCtrl(dataService) {     
        var vm = this;
        vm.hi = 'howdy homeCtrl';
        vm.data = null;

        vm.controllerName = 'HomeCtrl as homeVM';
        
        dataService.getPublicData().then(function(res) {
            vm.data = res;
            console.log(vm.data);
        });
    }

})();