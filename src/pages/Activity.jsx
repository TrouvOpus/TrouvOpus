import React from "react"
import {
	Card,
	CardHeader,
	CardContent,
	List,
	ListSubheader,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
} from "@material-ui/core"
import { useAuth, useMatchable } from "../hooks"
import FirebaseContext from "../contexts/FirebaseContext"

function MatchList({ type, uid }) {
	const { item, getMatches } = useMatchable(type, uid, true)

	const [matches, setMatches] = React.useState()

	console.log("Matches", uid, type, matches)

	React.useEffect(() => {
		getMatches().then(m => {
			if (m && m.length && m.length !== 0 && !matches) setMatches(m)
		})
	}, [matches, getMatches])

	return (
		<>
			{matches &&
				matches.map(({ id, title, name }) => (
					<ListItem button key={id}>
						<ListItemAvatar>
							<Avatar />
						</ListItemAvatar>
						<ListItemText primary={title || name} secondary={item.title} />
					</ListItem>
				))}
		</>
	)
}

export default () => {
	const { currentUser } = useAuth()
	const uid = currentUser && currentUser.uid
	// const { item: user } = useMatchable("user", uid, true)
	const { Firestore } = React.useContext(FirebaseContext)
	const [jobs, setJobs] = React.useState([])
	console.log("Jobs", jobs)

	React.useEffect(() => {
		if (uid)
			Firestore.collection("jobs")
				.where("createdBy", "==", uid)
				.get()
				.then(snapshot => {
					let j = []
					snapshot.forEach(doc => {
						j.push(doc.id)
					})
					setJobs(j)
				})
	}, [Firestore, uid])

	return (
		<Card>
			<CardHeader title="Notifications" />
			<CardContent>
				<List>
					<ListSubheader>Jobs</ListSubheader>
					<MatchList type="user" uid={uid} />
					<ListSubheader>Applicants</ListSubheader>
					{jobs.map(j => (
						<MatchList type="job" uid={j} />
					))}
				</List>
			</CardContent>
		</Card>
	)
}
