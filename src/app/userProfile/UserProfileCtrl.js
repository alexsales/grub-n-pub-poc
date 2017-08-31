(function() {

    'use strict';

    // isUserAuthenticated passes usr data if ui-state resolves;
    // otherwise, it passes null and still navigates to the state
    angular
        .module('myGrubApp')
        .controller('UserProfileCtrl', ['$scope', '$timeout', '$transition$', 'isUserAuthenticated', 'userProfileData', UserProfileCtrl]);

    function UserProfileCtrl($scope, $timeout, $transition$, isUserAuthenticated, userProfileData) {
        // console.log('$transition$: ', $transition$.params());
        // console.log('isUserAuthenticated: ', isUserAuthenticated);
        // console.log('userProfileData: ', userProfileData);

        $(document).ready(function() {
            $('.slider').slider({
                height: 300
            });
            // $('.slider').slider('pause');
        });

        var vm = this;
        var isLoggedIn = isUserAuthenticated ? true : false;
        var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var timesInDay = ['Breakfast', 'Brunch', 'Lunch', 'Happy Hour', 'Dinner'];
        console.log('isLoggedIn: ', isLoggedIn);

        vm.controllerName = 'UserProfileCtrl as userProfileVM';
        vm.userData = userProfileData;
        vm.userHobbies = [];
        vm.daysTimesAvailable = [];

        for(var i = 1; i <= 6; i++) {
            var hobbyName = 'interest' + i;
            vm.userHobbies.push(vm.userData[hobbyName]);
        }

        for(var i = 0; i <= 6; i++) {
            var dayOfWeekPropName = 'availability_' + i;
            var dayOfWeekDayName = daysOfWeek[i];
            var timesAvailable = {};
            var timesInDayString = '';

            timesAvailable[dayOfWeekDayName] = vm.userData[dayOfWeekPropName].map(function(timeInDay, indx, arr) {
                if (timeInDay === false) {
                    return null;
                } else {
                    return timesInDay[indx];
                }
            }).filter(function(timeOfDay) {
                return timeOfDay !== null;
            });

            timesInDayString = timesAvailable[dayOfWeekDayName].toString();
            timesAvailable[dayOfWeekDayName] = timesInDayString;
            // console.log(timesAvailable);
            // console.log(timesAvailable[dayOfWeekDayName]);
            vm.daysTimesAvailable.push(timesAvailable);
        }
        console.log(vm.daysTimesAvailable);
        // then use key/value in View of vm.daysTimesAvailable object


        // vm.authenticatedUser = isUserAuthenticated;
        // vm.userData = getUserProfileData;
    }

})();