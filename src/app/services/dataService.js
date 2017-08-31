(function() {

    'use strict';

    angular
        .module('myGrubApp')
        .factory('dataService', ['$q', '$log', '$firebaseObject', '$firebaseArray', '$firebaseStorage', 'storageService', dataService]);
    
    function dataService($q, $log, $firebaseObject, $firebaseArray, $firebaseStorage, storageService) {
        // var userPublicUID = null;

        // function setUserPublicUID(uid) {
        //     userPublicUID = uid;
        // }

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

        function doesUserUIDExist() {
            var deferred = $q.defer();
            var uid = storageService.cacheServe.get('userPublicUID');
            console.log('storageService uid: ', uid);

            if (uid) {
                $log.info('YES, userPublicUID exists');
                deferred.resolve();
            } else {
                $log.warn('NO, userPublicUID does not exist');
                deferred.reject();
            }

            return deferred.promise;
        }

        function getUserData(uid) {
            // console.log(storageService.cacheServe.userPublicUID);

            var deferred = $q.defer();
            var userDataPromise = null;
            var dataRef = firebase.database().ref('b_pblc/' + uid);
            var userData = $firebaseObject(dataRef);
            
            userDataPromise = userData.$loaded()
                .then(function(snapshot) {
                    // TODO: .slice() snapshot to return array of data only
                    // (not inherited methods/properties)
                    console.log(snapshot);
                    deferred.resolve(snapshot);
                    // return snapshot;
                });

            return deferred.promise;

            // console.log(userDataPromise);

            // if (userPublicUID === null) {
            //     deferred.reject('Error within dataService.getUserData()');
            // } else {
                // userDataPromise = userData.$loaded()
                //     .then(function(snapshot) {
                //         // TODO: .slice() snapshot to return array of data only
                //         // (not inherited methods/properties)
                //         console.log(snapshot);
                //         deferred.resolve(snapshot);
                //         // return snapshot;
            //         });
            // }

            // return userDataPromise
            //     .then(function(snapshot) {
            //         // TODO: .slice() snapshot to return array of data only
            //         // (not inherited methods/properties)
            //         console.log(snapshot);
            //         return snapshot;             
            //     }, function(err) {
            //         console.log('Error within dataService.getUserData(): ' + err);
            //     });
        }

        return {
            // setUserPublicUID: setUserPublicUID,
            getPublicData: getPublicData,
            getPrivateData: getPrivateData,
            // getUserPublicUID: getUserPublicUID,
            doesUserUIDExist: doesUserUIDExist,
            getUserData: getUserData
        };
    };

})();