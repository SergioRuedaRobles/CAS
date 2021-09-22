import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const url = "https://us-central1-cas-ofi.cloudfunctions.net/expressApi/"

  //configuramos la conexion de la base de datos mediante API
  const firebaseConfig = {
    apiKey: "AIzaSyBtApXxr0sVPQp3rJ5ZpaVjnTRoY8cLj-E",
    authDomain: "cas-ofi.firebaseapp.com",
    projectId: "cas-ofi",
    storageBucket: "cas-ofi.appspot.com",
    messagingSenderId: "501713199929",
    appId: "1:501713199929:web:cf06958a1414a228267ee8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


const db = firebase.firestore()
const auth = firebase.auth()

export {db, auth, url}