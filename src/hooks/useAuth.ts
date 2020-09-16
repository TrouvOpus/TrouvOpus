import React from "react"
import FirebaseContext from "../contexts/FirebaseContext"

export function useAuth(): {
	currentUser: firebase.User | null
	signInWithEmailAndPassword: (
		email: string,
		password: string
	) => Promise<firebase.auth.UserCredential | undefined>
	signUpWithEmailAndPassword: (
		email: string,
		password: string
	) => Promise<firebase.auth.UserCredential | undefined>
	signOut: () => Promise<void>
} {
	const [currentUser, setCurrentUser] = React.useState<firebase.User | null>(
		null
	)

	const { Auth } = React.useContext(FirebaseContext)

	React.useEffect(() => {
		Auth.onAuthStateChanged(user => {
			setCurrentUser(user)
		})
	}, [Auth])

	async function signInWithEmailAndPassword(email: string, password: string) {
		let u
		try {
			u = await Auth.signInWithEmailAndPassword(email, password)
			console.log("Logged in", u)
		} catch (error) {
			console.error(error.code, error.message)
		}
		return u
	}

	async function signUpWithEmailAndPassword(email: string, password: string) {
		let u
		try {
			u = await Auth.createUserWithEmailAndPassword(email, password)
			console.log("Created user", u)
		} catch (error) {
			console.error(error.code, error.message)
		}
		return u
	}

	async function signOut() {
		try {
			await Auth.signOut()
		} catch (error) {
			console.error(error.code, error.message)
		}
	}

	return {
		currentUser,
		signInWithEmailAndPassword,
		signUpWithEmailAndPassword,
		signOut,
	}
}
