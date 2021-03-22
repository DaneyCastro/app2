import firebase from 'firebase'

import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCSGCPeh_3uhfCzNBmSIcjzDdw35EjYYeQ",
    authDomain: "app2-1c749.firebaseapp.com",
    databaseURL:"https://app2-1c749.firebaseio.com",
    projectId: "app2-1c749",
    storageBucket: "app2-1c749.appspot.com",
    messagingSenderId: "152593416363",
    appId: "1:152593416363:web:62cd52ac0a83074e3d37ee"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export default {
      firebase,
      db
  };