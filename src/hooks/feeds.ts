import React from "react"
import FirestoreContext from "../contexts/FirebaseContext"
import { useUser, useJob } from "."

/**
 * To return the compatibility of an object with respect to another object.
 * @param x The object to be compared
 * @param y The object to be compared against
 */
function getCompatibility(
	x: { [key: string]: number },
	y: { [key: string]: number }
): number {
	if (!x || !y) return -1
	let ratios: { [key: string]: number } = {}
	Object.keys(x)
		.filter(i => Object.keys(y).includes(i))
		.forEach(i => {
			ratios[i] = x[i] / y[i]
			if (ratios[i] >= 1) ratios[i] = 1
		})
	let sum = 0.0
	Object.keys(ratios).forEach(i => (sum += ratios[i]))
	let ysum = 0.0
	Object.keys(y).forEach(i => (ysum += y[i]))
	return sum / ysum
}

/**
 * A hook to get all applicable jobs for the given user, along with the compatibility index of the user with respect to each job.
 * @param id The ID of the user whose feed must be fetched.
 */
export function useApplicantFeed(id: string) {
	const { Firestore } = React.useContext(FirestoreContext)
	const { user } = useUser(id)
	const [jobs, setJobs] = React.useState<{
		[id: string]: firebase.firestore.DocumentData
	}>({})

	const getAllJobs = React.useCallback(
		async function (): Promise<{
			[id: string]: firebase.firestore.DocumentData
		}> {
			let j: { [id: string]: firebase.firestore.DocumentData } = {}
			try {
				const snap = await Firestore.collection("jobs").get()
				snap.forEach(doc => {
					j[doc.id] = doc.data()
				})
			} catch (error) {
				console.error(error)
			}
			return j
		},
		[Firestore]
	)

	const getJobCompatibility = React.useCallback(
		function () {
			getAllJobs().then(jobs => {
				Object.keys(jobs).forEach(
					j =>
						(jobs[j]["compatibility"] =
							getCompatibility(user && user.skills, jobs[j].skills) || 0.0)
				)
				setJobs(jobs)
			})
		},
		[user, getAllJobs]
	)

	React.useEffect(() => getJobCompatibility(), [user, getJobCompatibility])

	return { jobs }
}

/**
 * A hook to get all qualified jobs for the given job, along with the compatibility index of each user with respect to the job.
 * @param id The ID of the job whose qualified applicants must be fetched.
 */
export function useRecruiterFeed(id: string) {
	const { Firestore } = React.useContext(FirestoreContext)
	const { job } = useJob(id)
	const [users, setUsers] = React.useState<{
		[id: string]: firebase.firestore.DocumentData
	}>({})

	const getAllUsers = React.useCallback(
		async function (): Promise<void> {
			let u: { [id: string]: firebase.firestore.DocumentData } = {}
			try {
				const snap = await Firestore.collection("users").get()
				snap.forEach(doc => {
					u[doc.id] = doc.data()
				})
			} catch (error) {
				console.error(error)
			}
			setUsers(u)
		},
		[Firestore]
	)

	const getJobCompatibility = React.useCallback(
		function () {
			let c = users
			Object.keys(c).forEach(
				u =>
					(c[u]["compatibility"] =
						getCompatibility(users[u].skills, job && job.skills) || 0.0)
			)
			setUsers(c)
		},
		[job, users]
	)

	React.useEffect(() => getJobCompatibility(), [
		job,
		users,
		getJobCompatibility,
	])

	React.useEffect(() => {
		getAllUsers()
	}, [getAllUsers])

	return { users }
}
