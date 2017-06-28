(function() {

    'use strict';

    angular.module('myGrub', [])
        
        .controller('MyGrubCtrl', MyGrubCtrl);   

    // controllers
    function MyGrubCtrl() {
        var vm = this;
        vm.hi = 'howdy';
    }

})();