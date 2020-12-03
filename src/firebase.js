import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyA_IpylUK8RHzRlrTzROAC3JXWe933HJsI",
    authDomain: "reactwt-1dd93.firebaseapp.com",
    databaseURL: "https://reactwt-1dd93.firebaseio.com",
    projectId: "reactwt-1dd93"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;