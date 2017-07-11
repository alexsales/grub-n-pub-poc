(function() {

    'use strict';
    
    angular
        .module('myGrubApp')
        .controller('UserProfileCtrl', ['isUserAuthenticated', UserProfileCtrl]);

    function UserProfileCtrl(isUserAuthenticated) {
        var vm = this;
        vm.hi = 'howdy userProfile';
        console.log('isUserAuthenticated: ', isUserAuthenticated);
    }

})();