import React from "react"
import EditAd from "../components/EditAd"
import FirebaseContext from "../contexts/FirebaseContext"
import {
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	IconButton,
	Dialog,
	Card,
	Container,
	Toolbar,
} from "@material-ui/core"
import { Edit, NavigateNext, Close } from "@material-ui/icons"
import { useAuth } from "../hooks"
import Feed from "./Feed"

const Ad = ({ id, title, description }) => {
	const [editOpen, setEditOpen] = React.useState(false)
	const [feedOpen, setFeedOpen] = React.useState(false)

	return (
		<ListItem key={id}>
			<ListItemText primary={title} secondary={description} />
			<ListItemSecondaryAction>
				<IconButton onClick={() => setEditOpen(true)}>
					<Edit />
				</IconButton>
				<IconButton onClick={() => setFeedOpen(true)}>
					<NavigateNext />
				</IconButton>
			</ListItemSecondaryAction>
			<EditAd open={editOpen} uid={id} onClose={() => setEditOpen(false)} />
			<Dialog fullScreen open={feedOpen} onClose={() => setFeedOpen(false)}>
				<Toolbar>
					<IconButton onClick={() => setFeedOpen(false)}>
						<Close />
					</IconButton>
				</Toolbar>
				<Container maxWidth="md">
					<Feed type="recruiter" uid={id} />
				</Container>
			</Dialog>
		</ListItem>
	)
}

export default () => {
	const { currentUser } = useAuth()
	const { Firestore } = React.useContext(FirebaseContext)
	const [ads, setAds] = React.useState([])

	React.useEffect(() => {
		if (!currentUser) return
		return Firestore.collection("jobs")
			.where("createdBy", "==", currentUser && currentUser.uid)
			.onSnapshot(snapshot => {
				let a = []
				snapshot.forEach(doc => {
					a.push({ ...doc.data(), id: doc.id })
				})
				setAds(a)
			})
	}, [currentUser, Firestore])

	console.log("Ads", ads)

	return (
		<div className="Ads Page">
			<Card>
				<List>
					{ads.map(a => (
						<Ad id={a.id} title={a.title} description={a.description} />
					))}
				</List>
			</Card>
		</div>
	)
}
