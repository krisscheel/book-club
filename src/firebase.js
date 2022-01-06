// firebase.js
import {initializeApp} from 'firebase/app'

// Initialize Firebase
// *** USE YOUR CONFIG OBJECT ***
const config = {
  apiKey: 'YOUR-API-KET',
  authDomain: 'bookshelf-8d68a.firebaseapp.com',
  databaseURL: 'https://bookshelf-8d68a.firebaseio.com',
  projectId: 'bookshelf-8d68a',
  storageBucket: 'bookshelf-8d68a.appspot.com',
  messagingSenderId: '548100999451',
}

// setting a variable that initializes our application
const firebase = initializeApp(config)
// this exports the CONFIGURED version of firebase
export default firebase
