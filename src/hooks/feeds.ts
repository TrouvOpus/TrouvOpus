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
	const sum = Object.values(ratios).reduce((a, b) => a + b)
	const ysum = Object.values(y).reduce((a, b) => a + b)
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
		async function (): Promise<void> {
			let j: { [id: string]: firebase.firestore.DocumentData } = {}
			try {
				const snap = await Firestore.collection("jobs").get()
				snap.forEach(doc => {
					j[doc.id] = doc.data()
				})
			} catch (error) {
				console.error(error)
			}
			setJobs(j)
		},
		[Firestore]
	)

	const getJobCompatibility = React.useCallback(
		function () {
			let c = jobs
			Object.keys(c).forEach(
				j =>
					(c[j]["compatibility"] =
						getCompatibility(user && user.skills, jobs[j].skills) || 0.0)
			)
			setJobs(c)
		},
		[jobs, user]
	)

	React.useEffect(() => getJobCompatibility(), [
		user,
		jobs,
		getJobCompatibility,
	])

	React.useEffect(() => {
		getAllJobs()
	}, [getAllJobs])

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
