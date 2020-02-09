import firebase from 'firebase/app'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyCBB8ai6zlSz80L-mFIL5XAEqklK6Eg-lY',
	authDomain: 'expenses-app-60b9d.firebaseapp.com',
	databaseURL: 'https://expenses-app-60b9d.firebaseio.com',
	projectId: 'expenses-app-60b9d',
	storageBucket: 'expenses-app-60b9d.appspot.com',
	messagingSenderId: '994755085959',
	appId: '1:994755085959:web:c9f7e2b28953f2460c1a22'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
