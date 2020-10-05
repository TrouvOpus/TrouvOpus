import React from "react"
import { Grid, useTheme } from "@material-ui/core"
import { Pie } from "react-chartjs-2"
import FirebaseContext from "../contexts/FirebaseContext"

export default () => {
	const theme = useTheme()
	const { Firestore } = React.useContext(FirebaseContext)
	const [users, setUsers] = React.useState(0)
	const [activeUsers, setActiveUsers] = React.useState(0)

	const [jobs, setJobs] = React.useState(0)
	const [activeJobs, setActiveJobs] = React.useState(0)

	const primaryColor = theme.palette.primary.main
	const secondaryColor = theme.palette.secondary.main

	React.useEffect(() => {
		Firestore.collection("users")
			.get()
			.then(snapshot => {
				let u = 0
				let a = 0
				snapshot.forEach(doc => {
					u++
					if (doc.data().active) a++
				})
				setUsers(u)
				setActiveUsers(a)
			})
	}, [Firestore])

	React.useEffect(() => {
		Firestore.collection("jobs")
			.get()
			.then(snapshot => {
				let j = 0
				let a = 0
				snapshot.forEach(doc => {
					j++
					if (doc.data().active) a++
				})
				setJobs(j)
				setActiveJobs(a)
			})
	}, [Firestore])

	const jobSeeker = {
		labels: ["Active", "Non-active"],
		datasets: [
			{
				data: [activeUsers, users - activeUsers],
				backgroundColor: [primaryColor, secondaryColor],
			},
		],
	}

	const adStatus = {
		labels: ["Active", "Non-active"],
		datasets: [
			{
				data: [activeJobs, jobs - activeJobs],
				backgroundColor: [primaryColor, secondaryColor],
			},
		],
	}

	return (
		<div>
			<h2>User data</h2>
			<Grid container direction="row">
				<Grid item>
					<h3>Job Seekers</h3>
					<Pie data={jobSeeker} />
				</Grid>
				<Grid item>
					<h3>Ad Status</h3>
					<Pie data={adStatus} />
				</Grid>
			</Grid>
		</div>
	)
}
