// firebase.js
import {initializeApp} from 'firebase/app'

// Initialize Firebase
// *** USE YOUR CONFIG OBJECT ***
const config = {
  apiKey: 'AIzaSyDZgV44OFyL-ng628IajCtz3PE_9YmlBGI',
  authDomain: 'book-club-60bdf.firebaseapp.com',
  databaseURL: 'https://book-club-60bdf-default-rtdb.firebaseio.com/',
  projectId: 'book-club-60bdf',
  storageBucket: 'book-club-60bdf.appspot.com',
  messagingSenderId: '524384886920',
}

// setting a variable that initializes our application
const firebase = initializeApp(config)
// this exports the CONFIGURED version of firebase
export default firebase
