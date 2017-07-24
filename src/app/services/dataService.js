(function() {

    'use strict';

    angular
        .module('myGrubApp')
        .factory('dataService', ['$firebaseObject', '$firebaseArray', dataService]);
    
    function dataService($firebaseObject, $firebaseArray) {
        function getPublicData() {
            var publicDataPromise = null;
            var dataRef = firebase.database().ref().child('b_pblc');
            var profilesList = $firebaseArray(dataRef);
            // console.log(profilesList);

            publicDataPromise = profilesList.$loaded();
            return publicDataPromise.then(function(snapshot) {
                console.log(snapshot);

                // snapshot is an array containing data, properties and methods
                // since we're only interested in the data being sent back to
                // the caller, setup logic to .slice() the data only
                var snapshotDataLength = snapshot.length;
                var sliced = null;
                
                sliced = snapshot.slice(0, snapshotDataLength);
                // console.log(sliced);
                
                // data only array sent back
                return sliced;
            }, function() {

            });
        }

        function getPrivateData(uid) {
            console.log(uid);

            var privateDataPromise = null;
            // var uid = authUserObj.uid;
            var dataRef = firebase.database().ref('c_prvt/' + uid);
            var userPrvtData = $firebaseObject(dataRef);

            privateDataPromise = userPrvtData.$loaded();
            return privateDataPromise.then(function(snapshot) {
                console.log(snapshot);
                return snapshot;
                // // snapshot is an array containing data, properties and methods
                // // since we're only interested in the data being sent back to
                // // the caller, setup logic to .slice() the data only
                // var snapshotDataLength = snapshot.length;
                // var sliced = null;
                
                // sliced = snapshot.slice(0, snapshotDataLength);
                // // console.log(sliced);
                
                // // data only array sent back
                // return sliced;                
            }, function() {

            });
        }

        return {
            getPublicData: getPublicData,
            getPrivateData: getPrivateData
        };
    };

})();