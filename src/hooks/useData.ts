import React from "react"
import FirebaseContext from "../contexts/FirebaseContext"

export const useData = () => {
	const { Firestore } = React.useContext(FirebaseContext)

	const getAllItems = React.useCallback(
		async function (
			collection: "users" | "jobs"
		): Promise<{
			[id: string]: firebase.firestore.DocumentData
		}> {
			let items: { [id: string]: firebase.firestore.DocumentData } = {}
			try {
				const snap = await Firestore.collection(collection).get()
				snap.forEach(doc => {
					items[doc.id] = doc.data()
				})
			} catch (error) {
				console.error(error)
			}
			return items
		},
		[Firestore]
	)

	return { getAllItems }
}
