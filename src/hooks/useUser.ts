import React from "react"
import FirebaseContext from "../contexts/FirebaseContext"
import { firestore } from "firebase"

export type User = firestore.DocumentData | undefined | null

/**
 * A hook that handles user data.
 * @returns An object with the currently logged in user and a function to set the user.
 */

export function useUser(
	uid: string,
	listen: boolean = false
): {
	user: User
	getUser: () => void
	updateUser: (updates: firestore.UpdateData) => void
} {
	const { Firestore } = React.useContext(FirebaseContext)
	const [user, setUser] = React.useState<User>()

	/**
	 * To get the user's data from the Cloud Firestore
	 */

	const getUser = React.useCallback(async () => {
		let u
		try {
			u = await (await Firestore.collection("users").doc(uid).get()).data()
			setUser(u)
		} catch (err) {
			console.error(err)
		}
	}, [Firestore, uid])

	/**
	 * To update a user's data in the Cloud Firestore
	 * @param updates
	 */

	async function updateUser(updates: firestore.UpdateData) {
		try {
			await Firestore.collection("users").doc(uid).update(updates)
		} catch (err) {
			console.error(err)
		}
	}

	/**
	 * An effect to get the user's data and/or listen for changes.
	 */
	React.useEffect(
		listen
			? () =>
					Firestore.collection("users")
						.doc(uid)
						.onSnapshot(snapshot => setUser(snapshot.data()))
			: () => {
					getUser()
			  },
		[listen, Firestore, uid]
	)

	return { user, getUser, updateUser }
}
