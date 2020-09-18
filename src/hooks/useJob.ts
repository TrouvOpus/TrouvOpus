import React from "react"
import FirebaseContext from "../contexts/FirebaseContext"
import { firestore } from "firebase"

export type Job = firestore.DocumentData | undefined | null

/**
 * A hook that handles job data.
 * @param uid The job's unique identification key.
 * @param listen A boolean value that determines if the hook should listen for changes in the Firestore.
 * @returns An object with the currently logged in user and a function to set the user.
 */

export function useJob(
	uid: string,
	listen: boolean = false,
	create: boolean = false
): {
	job: Job
	getJob: () => void
	updateJob: (updates: firestore.UpdateData) => void
} {
	const { Firestore } = React.useContext(FirebaseContext)
	const [job, setJob] = React.useState<Job>(null)
	const [exists, setExists] = React.useState(false)

	/**
	 * To get the job's data from the Cloud Firestore
	 */

	const getJob = React.useCallback(async () => {
		let j
		try {
			if (!uid) {
				return
			}
			let doc = await Firestore.collection("jobs").doc(uid).get()
			setExists(doc.exists)
			j = doc.data()
			setJob(j)
		} catch (err) {
			console.error(err)
		}
	}, [Firestore, uid])

	/**
	 * To create the job's document in the Cloud Firestore if it doesn't already exist
	 */

	const createJobDoc = React.useCallback(async () => {
		try {
			if (!uid) {
				return
			}
			await getJob()
			if (!exists) await Firestore.collection("jobs").doc(uid).set({})
		} catch (err) {
			console.error(err)
		}
	}, [getJob, exists, Firestore, uid])

	/**
	 * To update a job's data in the Cloud Firestore
	 * @param updates
	 */

	async function updateJob(updates: firestore.UpdateData) {
		try {
			if (!uid) {
				return
			}
			await Firestore.collection("jobs").doc(uid).update(updates)
		} catch (err) {
			console.error(err)
		}
	}

	/**
	 * An effect to create a job if it doesn't already exist
	 */

	React.useEffect(() => {
		if (create) createJobDoc()
	}, [create, createJobDoc, uid])

	/**
	 * An effect to get the job's data and/or listen for changes.
	 */
	React.useEffect(
		uid
			? listen
				? () =>
						Firestore.collection("users")
							.doc(uid)
							.onSnapshot(snapshot => setJob(snapshot.data()))
				: () => {
						getJob()
				  }
			: () => {},
		[listen, Firestore, uid]
	)

	return { job, getJob, updateJob }
}
