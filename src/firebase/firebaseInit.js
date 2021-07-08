import firebase from "firebase/app";
import "firebase/firestore";


var firebaseConfig = {
    apiKey: "AIzaSyBCdOE1pLL1TJ6PSTYb9jlx2a0YmcjvJNk",
    authDomain: "fireblogsyt-5fb63.firebaseapp.com",
    projectId: "fireblogsyt-5fb63",
    storageBucket: "fireblogsyt-5fb63.appspot.com",
    messagingSenderId: "226041646035",
    appId: "1:226041646035:web:fbd3fcb06c8bb2f6fe7d26"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
