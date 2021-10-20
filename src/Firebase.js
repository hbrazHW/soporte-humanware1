import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyDCES7JNIoX5XkX6xqEvoh_EPoZ3FR8qEI",
  authDomain: "soporte-humanware.firebaseapp.com",
  projectId: "soporte-humanware",
  storageBucket: "soporte-humanware.appspot.com",
  messagingSenderId: "135830861864",
  appId: "1:135830861864:web:e1b83b4e187d8123741d1d"
};

app.initializeApp(firebaseConfig);

const firebase = app.firestore()
const auth = app.auth()

export {firebase, auth}