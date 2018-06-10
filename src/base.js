import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDH2tWT1zeRzt6u-WYyRg9SsC5frYoSVXs",
  authDomain: "catch-of-the-day-78346.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-78346.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
