(function() {

    'use strict';

    angular
        .module('myGrubApp')
        .controller('LoginRegistrationCtrl', [LoginRegistrationCtrl]);

    function LoginRegistrationCtrl() {

        // this year - 14 years
        var date = new Date();
        date.setFullYear(date.getFullYear() - 14);       

        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 75, // Creates a dropdown of 15 years to control year,
            today: false,
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: true, // Close upon selecting a date,
            max: date
        });

    }

})();