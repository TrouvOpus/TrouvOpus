import React from "react"
import {
	Avatar,
	Box,
	Button,
	Card,
	CardHeader,
	CardContent,
	Grid,
	List,
	ListSubheader,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@material-ui/core"
import { useAuth, useMatchable } from "../hooks"
import { Link } from "react-router-dom"
import FirebaseContext from "../contexts/FirebaseContext"

function MatchList({ type, uid }) {
	const { item, getMatches } = useMatchable(type, uid, true)

	const [matches, setMatches] = React.useState()

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

	const { Firestore } = React.useContext(FirebaseContext)
	const [jobs, setJobs] = React.useState([])

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
		<Grid container direction="column">
			<Grid item>
				<Box py={2}>
					<Button color="primary" variant="contained" component={Link} to="/">
						Home
					</Button>
				</Box>
			</Grid>
			<Grid item>
				<Card>
					<CardHeader title="Notifications" />
					<CardContent>
						<List>
							<ListSubheader>Jobs</ListSubheader>
							<MatchList type="user" uid={uid} />
							<ListSubheader>Applicants</ListSubheader>
							{jobs.map(j => (
								<MatchList key={j} type="job" uid={j} />
							))}
						</List>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	)
}
