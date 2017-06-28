(function() {

    if (!firebase.apps.length) {

        var config = {
            apiKey: "AIzaSyBFgMuZeQrOphfRjxg1s5TkCws8DRlzyZE",
            authDomain: "dev-hacklabs.firebaseapp.com",
            databaseURL: "https://dev-hacklabs.firebaseio.com",
            projectId: "dev-hacklabs",
            storageBucket: "dev-hacklabs.appspot.com",
            messagingSenderId: "777010732157"
        };

        firebase.initializeApp(config);

    }

})();
