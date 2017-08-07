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
                    console.log(snapshot);
                    return snapshot;             
                }, function(err) {
                    console.log('Error within dataService.getPrivateData(): ' + err);
                });
        }

        // function getAndAddPublicUserImageData(usersList) {
        //     console.log(usersList);

        //     var deferred = $q.defer();
        //     var modifiedUsersList = [];
        //     var usersListLength = usersList.length;

        //     function modifyUserObj() {
        //         for (var i = 0; i < usersListLength; i++) {
        //             var portraitImgDownloadURL = null;
        //             var landscapeImgDownloadURL = null;
        //             var userObj = usersList[i];
        //             // console.log(firebase.storage());

        //             var landscapePath = userObj.userImg_landscape.slice(30);
        //             var portraitPath = userObj.userImg_portrait.slice(30);

        //             // // console.log(userObj.userImg_landscape.toString());
        //             // var gsReferenceLandscape = firebase.storage().refFromURL(userObj.userImg_landscape);
        //             // // console.log(gsReferenceLandscape.fullPath);
        //             // var gsReferencePortrait = firebase.storage().refFromURL(userObj.userImg_portrait);

        //             var landscapeRef = firebase.storage().ref(landscapePath);
        //             var portraitRef = firebase.storage().ref(portraitPath);

        //             // landscapeImgDownloadURL = gsReferenceLandscape.getDownloadURL()
        //             //     .then(function(url) {
        //             //         console.log(url);
        //             //         return url;
        //             //     });
        //             // portraitImgDownloadURL = gsReferencePortrait.getDownloadURL()
        //             //     .then(function(url) {
        //             //         console.log(url);
        //             //         return url;
        //             //     });

        //             landscapeImgDownloadURL = $firebaseStorage(landscapeRef).$getDownloadURL()
        //                 .then(function(url) {
        //                     // console.log(url);
        //                     return url;
        //                 });
        //             portraitImgDownloadURL = $firebaseStorage(portraitRef).$getDownloadURL()
        //                 .then(function(url) {
        //                     // console.log(url);
        //                     return url;
        //                 });

        //             userObj.landscapeImgDownloadURL = landscapeImgDownloadURL;
        //             userObj.portraitImgDownloadURL = portraitImgDownloadURL;
        //             console.log(userObj);

        //             modifiedUsersList.push(userObj);
        //         }

        //         deferred.resolve(modifiedUsersList);
        //     }

        //     modifyUserObj();

        //     return deferred.promise;


        //     // returns array containing
        //     // user's 2 main image files
        //     // [ (portrait image), (landscape image) ]
        //     // return true;
        // }


        return {
            getPublicData: getPublicData,
            getPrivateData: getPrivateData
        };

        
        // return {
        //     getPublicData: getPublicData,
        //     getPrivateData: getPrivateData,
        //     getAndAddPublicUserImageData: getAndAddPublicUserImageData
        // };

        // function getPublicStorageData() {
        //     var imageArr = [];
        //     var publicStorageDataPromise = null;
        //     var storageRef = firebase.storage().ref('dev-hacklabs/b_pblc/');

        //     // var deferred = $q.defer();
        //     // console.log('inside storage data');
        //     // call getPublicData to get all users and uid for public images
        //     return getPublicData()
        //         .then(function(usersList) {
        //             console.log('inside then');
        //             // console.log(usersList);
        //             var usersListLen = usersList.length;
        //             // console.log(usersListLen);

        //             for (var i = 0; i < usersListLen; i++) {
        //                 var user = usersList[1];
        //                 var userObj = {};
        //                 var uid = user.$id;
        //                 var portraitStorageRef = null;
        //                 var landscapeStorageRef = null;
        //                 var portraitStorage = null;
        //                 var landscapeStorage = null;

        //                 var publicPortraitPath = uid + '/portrait-225x300.jpg';
        //                 var publicLandscapePath = uid + '/landscape-300x225.jpg'; 

        //                 // create the storage references to each image
        //                 portraitStorageRef = storageRef.child(publicPortraitPath);
        //                 console.log(portraitStorageRef);
        //                 landscapeStorageRef = storageRef.child(publicLandscapePath);
        //                 console.log(landscapeStorageRef);

        //                 // pass references to the $firebaseStorage services
        //                 portraitStorage = $firebaseStorage(portraitStorageRef);
        //                 landscapeStorage = $firebaseStorage(landscapeStorageRef);

        //                 // create userObj
        //                 userObj.uid = uid;
        //                 userObj.userPortrait = portraitStorage.$getDownloadURL()
        //                     .then(function(url) {
        //                         return url;
        //                     });
        //                 userObj.userLandscape = landscapeStorage.$getDownloadURL()
        //                     .then(function(url) {
        //                         return url;
        //                     });

        //                 // push userObj to imageArr
        //                 imageArr.push(userObj);                       
        //             }

        //             return imageArr;
        //         });
        // }

        // return {
        //     getPublicData: getPublicData,
        //     getPrivateData: getPrivateData,
        //     getPublicStorageData: getPublicStorageData
        // };
    };

})();