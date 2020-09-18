import React from "react"
import FirestoreContext from "../contexts/FirebaseContext"
import { useUser, useJob } from "."

function getCompatibility(
	x: { [key: string]: number },
	y: { [key: string]: number }
): number {
	if (!x || !y) return -1
	const xk = Object.keys(x)
	const yk = Object.keys(y)
	const common = xk.filter(x => yk.includes(x))
	let ratios: { [key: string]: number } = {}
	for (let c in common) {
		let i = common[c]
		ratios[i] = x[i] / y[i]
		if (ratios[i] >= 1) ratios[i] = 1
	}
	let sum: number = 0.0
	for (let r in ratios) {
		sum += ratios[r]
	}
	let ysum: number = 0.0
	for (let i in y) {
		ysum += y[i]
	}
	console.log(
		"x",
		x,
		"\ny",
		y,
		"\ncommon",
		common,
		"\nsum",
		sum,
		"\nysum",
		ysum,
		"\rcompat",
		sum / ysum
	)
	return sum / ysum
}

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
						getCompatibility(job && job.skills, users[u].skills) || 0.0)
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
