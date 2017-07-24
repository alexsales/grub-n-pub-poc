(function() {

    'use strict';
    
    angular
        .module('myGrubApp')
        .controller('UserProfileCtrl', ['isUserAuthenticated', 'authUserPrvtData', UserProfileCtrl]);

    function UserProfileCtrl(isUserAuthenticated, authUserPrvtData) {
        // console.log(isUserAuthenticated);
        // console.log(authUserPrvtData);

        var vm = this;
        // var uid = isUserAuthenticated.uid;

        vm.controllerName = 'UserProfileCtrl as userProfileVM';
        vm.authenticatedUser = isUserAuthenticated;
        vm.prvtData = authUserPrvtData;
        // vm.privateUserData = dataService.getPrivateData(uid);
        // console.log(vm.privateUserData);

        // vm.userIsValidated = {};



        // vm.userIsValidated = {
        //     userValidatedPblc: userValidatedPblc,
        //     userValidatedPrvt: userValidatedPrvt
        // };
    }

})();