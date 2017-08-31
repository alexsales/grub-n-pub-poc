(function() {

    'use strict';

    // isUserAuthenticated passes usr data if ui-state resolves;
    // otherwise, it passes null and still navigates to the state
    angular
        .module('myGrubApp')
        .controller('UserProfileCtrl', ['isUserAuthenticated', 'authUserPrvtData', UserProfileCtrl]);

    function UserProfileCtrl(isUserAuthenticated, authUserPrvtData) {
        console.log('isUserAuthenticated: ', isUserAuthenticated);
        console.log('authUserPrvtData: ', authUserPrvtData  );

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