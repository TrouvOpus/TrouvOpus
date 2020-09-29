import React from "react"
import FirebaseContext from "../contexts/FirebaseContext"
import { firestore } from "firebase"

export type User = firestore.DocumentData | undefined | null

/**
 * A hook that handles user data.
 * @param uid The user's unique identification key.
 * @param listen A boolean value that determines if the hook should listen for changes in the Firestore.
 * @param create A boolean value that determines if the user should be created in the Firestore if it doesn't already exist.
 * @returns An object with the currently logged in user and a function to set the user.
 */

export function useUser(
	uid: string,
	listen: boolean = false,
	create: boolean = false
): {
	user: User
	getUser: () => void
	updateUser: (updates: firestore.UpdateData) => void
} {
	const { Firestore } = React.useContext(FirebaseContext)
	const [user, setUser] = React.useState<User>(null)

	/**
	 * To get the user's data from the Cloud Firestore
	 */

	const getUser = React.useCallback(async () => {
		let u
		try {
			if (!uid) {
				return
			}
			let doc = await Firestore.collection("users").doc(uid).get()
			u = doc.data()
			setUser(u)
		} catch (err) {
			console.error(err)
		}
	}, [Firestore, uid])

	/**
	 * To create the user's document in the Cloud Firestore if it doesn't already exist
	 */

	const createUserDoc = React.useCallback(async () => {
		try {
			if (!uid) {
				return
			}
			const u = await Firestore.collection("users").doc(uid).get()
			if (!u.exists)
				await Firestore.collection("users")
					.doc(uid)
					.set({ createdAt: firestore.Timestamp.now() })
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
			if (!uid) {
				return
			}
			await Firestore.collection("users").doc(uid).update(updates)
		} catch (err) {
			console.error(err)
		}
	}

	/**
	 * An effect to create a user if it doesn't already exist
	 */

	React.useEffect(() => {
		if (create) createUserDoc()
	}, [create, createUserDoc, uid])

	/**
	 * An effect to get the user's data and/or listen for changes.
	 */
	React.useEffect(
		uid
			? listen
				? () =>
						Firestore.collection("users")
							.doc(uid)
							.onSnapshot(snapshot => setUser(snapshot.data()))
				: () => {
						getUser()
				  }
			: () => {},
		[listen, Firestore, uid]
	)

	return { user, getUser, updateUser }
}
