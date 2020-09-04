import firebase from "firebase/app"
import "firebase/firebase-firestore"

const config = {
	apiKey: "AIzaSyDS_VRkXpVXfm6yBSh7XSf48UA-nH8npFU",
	authDomain: "trouvopus.firebaseapp.com",
	databaseURL: "https://trouvopus.firebaseio.com",
	projectId: "trouvopus",
	storageBucket: "trouvopus.appspot.com",
	messagingSenderId: "147699757447",
	appId: "1:147699757447:web:11a332ebc3c50f4aaf6322",
	measurementId: "G-BHKN9VFNWT",
}

firebase.initializeApp(config)

export const Firestore = firebase.firestore()
export const Auth = firebase.auth()
