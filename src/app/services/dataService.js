(function() {

    'use strict';

    angular
        .module('myGrubApp')
        .factory('dataService', ['$q', '$firebaseObject', '$firebaseArray', '$firebaseStorage', dataService]);
    
    function dataService($q, $firebaseObject, $firebaseArray, $firebaseStorage) {
        function getPublicData() {
            var publicDataPromise = null;
            var dataRef = firebase.database().ref().child('b_pblc');
            var profilesList = $firebaseArray(dataRef);
            // console.log(profilesList);

            publicDataPromise = profilesList.$loaded();
            return publicDataPromise
                .then(function(snapshot) {
                    console.log(snapshot);

                    // snapshot is an array containing data, properties and methods
                    // since we're only interested in the data being sent back to
                    // the caller, setup logic to .slice() the data only
                    var snapshotDataLength = snapshot.length;
                    var sliced = null;
                    
                    sliced = snapshot.slice(0, snapshotDataLength);
                    
                    // array containing only the data we want is sent back
                    return sliced;
                }, function(err) {
                    console.log('Error within dataService.getPublicData(): ' + err);
                });
        }

        function getPrivateData(uid) {
            console.log(uid);

            var privateDataPromise = null;
            // var uid = authUserObj.uid;
            var dataRef = firebase.database().ref('c_prvt/' + uid);
            var userPrvtData = $firebaseObject(dataRef);

            privateDataPromise = userPrvtData.$loaded();
            return privateDataPromise
                .then(function(snapshot) {
                    // TODO: .slice() snapshot to return array of data only
                    // (not inherited methods/properties)
                    console.log(snapshot);
                    return snapshot;             
                }, function(err) {
                    console.log('Error within dataService.getPrivateData(): ' + err);
                });
        }

        return {
            getPublicData: getPublicData,
            getPrivateData: getPrivateData
        };
    };

})();