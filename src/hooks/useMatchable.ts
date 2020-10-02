import React from "react"
import FirebaseContext from "../contexts/FirebaseContext"
import { firestore } from "firebase"

export type Item = firestore.DocumentData | undefined | null

/**
 * A hook that handles user or job data.
 * @param uid The item's unique identification key.
 * @param listen A boolean value that determines if the hook should listen for changes in the Firestore.
 * @param create A boolean value that determines if the Item should be created in the Firestore if it doesn't already exist.
 * @returns The matchable item, a function to fetch the item and a function to update the item in the Firestore.
 */

export function useMatchable(
	type: "user" | "job",
	uid: string,
	listen: boolean = false,
	create: boolean = false
): {
	item: Item
	getItem: () => void
	updateItem: (updates: firestore.UpdateData) => void
	deleteItem: () => void
	getMatches: () => Promise<Item[]>
} {
	const { Firestore } = React.useContext(FirebaseContext)
	const [item, setItem] = React.useState<Item>(null)
	const collection = type + "s"

	/**
	 * To get the matchable item's data from the Cloud Firestore
	 */

	const getItem = React.useCallback(async () => {
		let i
		try {
			if (!uid) {
				return
			}
			let doc = await Firestore.collection(collection).doc(uid).get()
			i = doc.data()
			setItem(i)
		} catch (err) {
			console.error(err)
		}
	}, [Firestore, collection, uid])

	/**
	 * To get the matches
	 */

	async function getMatches(): Promise<Item[]> {
		try {
			let matches: Item[] = []
			if (!uid || !item) return []
			const snapshot = await Firestore.collection(
				type === "user" ? "jobs" : "users"
			)
				.where("likes", "array-contains", uid)
				.get()
			snapshot.forEach(doc => {
				if (item && item.likes.includes(doc.id))
					matches.push({ ...doc.data(), id: doc.id })
			})
			return matches
		} catch (error) {
			console.error(error)
		}
		return []
	}

	/**
	 * To create the item's document in the Cloud Firestore if it doesn't already exist
	 */

	const createItemDoc = React.useCallback(async () => {
		try {
			if (!uid) return
			const i = await Firestore.collection(collection).doc(uid).get()
			if (!i.exists)
				await Firestore.collection(collection)
					.doc(uid)
					.set({ createdAt: firestore.Timestamp.now(), active: true })
		} catch (err) {
			console.error(err)
		}
	}, [Firestore, collection, uid])

	/**
	 * To update the item's data in the Cloud Firestore
	 * @param updates
	 */

	async function updateItem(updates: firestore.UpdateData) {
		try {
			if (!uid) return
			await Firestore.collection(collection).doc(uid).update(updates)
		} catch (err) {
			console.error(err)
		}
	}

	/**
	 * To delete the item from the Firestore
	 */

	async function deleteItem() {
		try {
			await Firestore.collection(collection).doc(uid).delete()
		} catch (error) {
			console.error(error)
		}
	}

	/**
	 * An effect to create the item if it doesn't already exist
	 */

	React.useEffect(() => {
		if (create) createItemDoc()
	}, [create, createItemDoc, uid])

	/**
	 * An effect to get the item's data and/or listen for changes.
	 */

	React.useEffect(
		uid
			? listen
				? () =>
						Firestore.collection(collection)
							.doc(uid)
							.onSnapshot(snapshot => setItem(snapshot.data()))
				: () => {
						getItem()
				  }
			: () => {},
		[listen, Firestore, uid]
	)

	return { item, getItem, updateItem, deleteItem, getMatches }
}
