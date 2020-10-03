import React from "react"
import FirebaseContext from "../contexts/FirebaseContext"
import { useMatchable } from "."

/**
 * To return the compatibility ratios of an object with respect to another object.
 * @param x The object to be compared
 * @param y The object to be compared against
 */
function getCompatibilityRatios(
	x: { [key: string]: number },
	y: { [key: string]: number }
): { [key: string]: number } {
	if (!x || !y) return {}
	const ratios: { [key: string]: number } = {}
	Object.keys(y).forEach(i => {
		const r = (x[i] || 0.0) / y[i]
		ratios[i] = r > 1 ? 1 : r
	})
	return ratios
}

/**
 * A hook to get all applicable jobs for the given user, along with the compatibility index of the user with respect to each job.
 * @param id The ID of the user whose feed must be fetched.
 */
export function useFeed(type: "applicant" | "recruiter", id: string) {
	const { Firestore } = React.useContext(FirebaseContext)
	const { item } = useMatchable(type === "applicant" ? "user" : "job", id)
	const [items, setItems] = React.useState<{
		[id: string]: firebase.firestore.DocumentData
	}>({})

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

	const getJobCompatibility = React.useCallback(
		function () {
			getAllItems(type === "applicant" ? "jobs" : "users").then(items => {
				Object.keys(items).forEach(i => {
					const ratios =
						type === "applicant"
							? getCompatibilityRatios(item && item.skills, items[i].skills)
							: getCompatibilityRatios(items[i].skills, item && item.skills)
					items[i]["ratios"] = ratios
					items[i]["compatibility"] =
						Object.values(ratios).reduce((a, b) => a + b, 0) /
							Object.values(ratios).length || 0.0
				})
				setItems(items)
			})
		},
		[item, type, getAllItems]
	)

	React.useEffect(() => getJobCompatibility(), [item, getJobCompatibility])

	return { items }
}
