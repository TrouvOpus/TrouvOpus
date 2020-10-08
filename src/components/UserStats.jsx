import React from "react"
import {
	Grid,
	Card,
	CardHeader,
	CardContent,
	useTheme,
} from "@material-ui/core"
import { Bar, Chart, Doughnut } from "react-chartjs-2"
import FirebaseContext from "../contexts/FirebaseContext"
import { useAuth, useMatchable } from "../hooks"

export default () => {
	const theme = useTheme()
	const { Firestore } = React.useContext(FirebaseContext)
	const { currentUser } = useAuth()
	const { item: user } = useMatchable(
		"user",
		currentUser && currentUser.uid,
		true
	)
	const [jobs, setJobs] = React.useState(0)
	const [activeJobs, setActiveJobs] = React.useState(0)
	const primaryColor = theme.palette.primary.main
	const secondaryColor = theme.palette.secondary.main

	React.useEffect(() => {
		if (currentUser)
			Firestore.collection("jobs")
				.where("createdBy", "==", currentUser && currentUser.uid)
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
	}, [Firestore, currentUser])

	const adDetails = {
		labels: ["Active", "Inactive"],
		datasets: [
			{
				data: [activeJobs, jobs - activeJobs],
				backgroundColor: [primaryColor, secondaryColor],
			},
		],
	}

	const sortedSkills =
		user &&
		user.skills &&
		Object.keys(user.skills).sort((a, b) =>
			user.skills ? user.skills[b] - user.skills[a] : 0
		)

	const topSkills = {
		labels: sortedSkills,
		datasets: [
			{
				label: "My Skills",
				backgroundColor: secondaryColor,
				borderColor: primaryColor,
				borderWidth: 1,
				barPercentage: 1,
				hoverBackgroundColor: primaryColor,
				hoverBorderColor: secondaryColor,
				data: sortedSkills && sortedSkills.map(s => user.skills[s]),
			},
		],
	}

	Chart.scaleService.updateScaleDefaults("linear", {
		ticks: {
			min: 0,
			max: 10,
			stepSize: 2,
		},
	})

	return (
		<Grid container direction="row" spacing={2}>
			<Grid item xs="4">
				<Card>
					<CardHeader title="My Ads" />
					<CardContent>
						<Doughnut data={adDetails} />
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs="8">
				<Card>
					<CardHeader title="My Skills" />
					<CardContent>
						<Bar data={topSkills} />
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	)
}
