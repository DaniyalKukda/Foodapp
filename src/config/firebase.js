import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDCLevg6B-rTM9yzZeLnYfnv6Lg-F8DV2s",
    authDomain: "foodapp-1997.firebaseapp.com",
    databaseURL: "https://foodapp-1997.firebaseio.com",
    projectId: "foodapp-1997",
    storageBucket: "foodapp-1997.appspot.com",
    messagingSenderId: "412601827445",
    appId: "1:412601827445:web:11eae3d78c8272e6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase