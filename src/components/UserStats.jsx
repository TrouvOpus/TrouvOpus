import React from "react"
import { Card, CardHeader, CardContent, useTheme } from "@material-ui/core"
import { Doughnut } from "react-chartjs-2"
import FirebaseContext from "../contexts/FirebaseContext"
import { useAuth } from "../hooks"

export default () => {
	const theme = useTheme()
	const { Firestore } = React.useContext(FirebaseContext)
	const { currentUser } = useAuth()
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
	return (
		<div>
			<Card>
				<CardHeader title="My Ads" />
				<CardContent>
					<Doughnut data={adDetails} />
				</CardContent>
			</Card>
		</div>
	)
}
