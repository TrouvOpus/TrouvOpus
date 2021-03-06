import React from "react"
import {
	Grid,
	Card,
	CardHeader,
	CardContent,
	Typography,
	useTheme,
	useMediaQuery,
} from "@material-ui/core"
import { FindInPage, People, WorkOutline } from "@material-ui/icons"
import { Chart, Line, Pie } from "react-chartjs-2"
import FirebaseContext from "../contexts/FirebaseContext"
import { useMetadata } from "../hooks"

export default () => {
	const theme = useTheme()
	const landscape = useMediaQuery("(orientation: landscape)")
	const { Firestore } = React.useContext(FirebaseContext)
	const [users, setUsers] = React.useState([])
	const activeUsers = (users && users.filter(u => u.active)) || []

	const [jobs, setJobs] = React.useState([])
	const activeJobs = (jobs && jobs.filter(j => j.active)) || []

	const skills = useMetadata("skillSet")
	const skillSet = skills && skills.options && skills.options.sort()

	const [userSkills, setUserSkills] = React.useState([])
	const [jobSkills, setJobSkills] = React.useState([])

	const [applicants, setApplicants] = React.useState([])

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
				const app = u.filter(u => u.active)
				setUsers(u)
				setApplicants(app)
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

	React.useEffect(() => {
		let uSk = {}
		if (users)
			users.forEach(
				u =>
					u.skills &&
					Object.keys(u.skills).forEach(s => {
						if (!uSk[s]) uSk[s] = 0.0
						uSk[s] += u.skills[s]
					})
			)
		setUserSkills(uSk)
		let jSk = {}
		if (jobs)
			jobs.forEach(
				j =>
					j.skills &&
					Object.keys(j.skills).forEach(s => {
						if (!jSk[s]) jSk[s] = 0.0
						jSk[s] += j.skills[s]
					})
			)
		setJobSkills(jSk)
	}, [users, jobs, skillSet])

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
		labels: skillSet,
		datasets: [
			{
				label: "Resume",
				data: skillSet && skillSet.map(s => userSkills[s]),
				borderColor: primaryColor,
				backgroundColor: primaryColor + "55",
			},
			{
				label: "Ads",
				data: skillSet && skillSet.map(s => jobSkills[s]),
				borderColor: secondaryColor,
				backgroundColor: secondaryColor + "55",
			},
		],
	}

	Chart.scaleService.updateScaleDefaults("linear", {
		ticks: {
			min: 0,
		},
	})

	return (
		<Grid container direction="row" spacing={3}>
			<Grid item xs={landscape ? "6" : "12"}>
				<Card>
					<CardHeader title="Job Seekers" />
					<CardContent>
						<Pie data={jobSeeker} />
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={landscape ? "6" : "12"}>
				<Card>
					<CardHeader title="Ad Status" />
					<CardContent>
						<Pie data={adStatus} />
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={landscape ? "4" : "6"}>
				<Card>
					<CardContent>
						<Grid container direction="row" spacing={2}>
							<Grid item>
								<People color="secondary" />
							</Grid>
							<Grid item>
								<Typography variant="h5" component="h5" text-center>
									{users.length}
								</Typography>
								<Typography color="textSecondary">Total Users</Typography>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={landscape ? "4" : "6"}>
				<Card>
					<CardContent>
						<Grid container direction="row" spacing={2}>
							<Grid item>
								<WorkOutline color="secondary" />
							</Grid>
							<Grid item>
								<Typography variant="h5" component="h5">
									{jobs.length}
								</Typography>
								<Typography color="textSecondary">Total Jobs</Typography>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={landscape ? "4" : "12"}>
				<Card>
					<CardContent>
						<Grid container direction="row" spacing={2}>
							<Grid item>
								<FindInPage color="secondary" />
							</Grid>
							<Grid item>
								<Typography variant="h5" component="h5">
									{applicants.length}
								</Typography>
								<Typography color="textSecondary">Total Applicants</Typography>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs="12">
				<Card>
					<CardHeader title="Market Demand" center />
					<CardContent>
						<Line data={data} />
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	)
}
