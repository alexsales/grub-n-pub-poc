(function() {

    'use strict';
    
    angular
        .module('myGrubApp')
        .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl() {
        var vm = this;
        vm.hi = 'howdy3';        
    }

})();