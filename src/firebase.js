import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDuF43_eHt-jCcK5Qv_koxPIi0XYn6ek4A",
  authDomain: "adminportal-90b6e.firebaseapp.com",
  databaseURL: "https://adminportal-90b6e.firebaseio.com",
  projectId: "adminportal-90b6e",
  storageBucket: "adminportal-90b6e.appspot.com",
  messagingSenderId: "726676360131"
};

export const firebaseApp = firebase.initializeApp(config);
