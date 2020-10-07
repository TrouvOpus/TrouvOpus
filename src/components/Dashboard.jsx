import React from "react"
import {
	Grid,
	Card,
	CardHeader,
	CardContent,
	useTheme,
} from "@material-ui/core"
import { Pie, Line } from "react-chartjs-2"
import FirebaseContext from "../contexts/FirebaseContext"
import { useMetadata } from "../hooks"
import { DashboardRounded } from "@material-ui/icons"

export default () => {
	const theme = useTheme()
	const { Firestore } = React.useContext(FirebaseContext)
	const [users, setUsers] = React.useState([])
	const activeUsers = (users && users.filter(u => u.active)) || []

	const [jobs, setJobs] = React.useState(0)
	const activeJobs = (jobs && jobs.filter(j => j.active)) || []

	const skills = useMetadata("skillSet")

	const [userSkills, setUserSkills] = React.useState({})
	const [jobSkills, setJobSkills] = React.useState({})

	const primaryColor = theme.palette.primary.main
	const secondaryColor = theme.palette.secondary.main

	React.useEffect(() => {
		Firestore.collection("users")
			.get()
			.then(snapshot => {
				let u = []
				snapshot.forEach(doc => {
					u.push({ ...doc.data(), id: doc.id })
				})
				setUsers(u)
			})
	}, [Firestore])

	React.useEffect(() => {
		Firestore.collection("jobs")
			.get()
			.then(snapshot => {
				let j = []
				snapshot.forEach(doc => {
					j.push({ ...doc.data(), id: doc.id })
				})
				setJobs(j)
			})
	}, [Firestore])

	const jobSeeker = {
		labels: ["Active", "Inactive"],
		datasets: [
			{
				data: [activeUsers.length, users.length - activeUsers.length],
				backgroundColor: [primaryColor, secondaryColor],
			},
		],
	}

	const adStatus = {
		labels: ["Active", "Inactive"],
		datasets: [
			{
				data: [activeJobs.length, jobs.length - activeJobs.length],
				backgroundColor: [primaryColor, secondaryColor],
			},
		],
	}

	const data = {
		labels: skills && skills.options && skills.options.sort(),
		datasets: [
			{
				label: "Resume",
				data: [33, 53, 85, 41, 44, 65],
				fill: true,
				borderColor: primaryColor,
			},
			{
				label: "Ads",
				data: [33, 25, 35, 51, 54, 76],
				fill: false,
				borderColor: secondaryColor,
			},
		],
	}

	return (
		<div>
			<Grid container direction="row" spacing={2}>
				<Grid item>
					<Card>
						<CardHeader title="Job Seekers" />
						<CardContent>
							<Pie data={jobSeeker} />
						</CardContent>
					</Card>
				</Grid>
				<Grid item>
					<Card>
						<CardHeader title="Ad Status" />
						<CardContent>
							<Pie data={adStatus} />
						</CardContent>
					</Card>
				</Grid>
				<Grid item>
					<Card>
						<CardHeader title="Market demand" />
						<CardContent>
							<Line data={data} />
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	)
}
