import React from "react"
import EditAd from "../components/EditAd"
import FirebaseContext from "../contexts/FirebaseContext"
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Container,
	Dialog,
	Fab,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
	Toolbar,
} from "@material-ui/core"
import { Edit, NavigateNext, Close, Add } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks"
import Feed from "./Feed"
import { firestore } from "firebase"

const useStyles = makeStyles({ fab: { marginLeft: "auto" } })

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
	const classes = useStyles()

	async function createAd() {
		try {
			if (!currentUser) throw new Error("Please log in")
			const ref = await Firestore.collection("jobs").add({
				title: "New Ad",
				createdAt: firestore.Timestamp.now(),
				createdBy: currentUser && currentUser.uid,
			})
			return ref.id
		} catch (error) {
			console.error(error)
		}
	}

	React.useEffect(() => {
		if (!currentUser) return
		return Firestore.collection("jobs")
			.where("createdBy", "==", currentUser && currentUser.uid)
			.orderBy("createdAt", "desc")
			.onSnapshot(snapshot => {
				let a = []
				snapshot.forEach(doc => {
					a.push({ ...doc.data(), id: doc.id })
				})
				setAds(a)
			})
	}, [currentUser, Firestore])

	return (
		<div className="Ads Page">
			<Box py={2}>
				<Button color="primary" variant="contained" component={Link} to="/">
					Home
				</Button>
			</Box>
			<Card>
				<CardHeader title="My Ads" />
				<CardContent>
					<List>
						{ads.map(a => (
							<Ad id={a.id} title={a.title} description={a.description} />
						))}
					</List>
				</CardContent>
				<CardActions>
					<Fab
						color="primary"
						className={classes.fab}
						onClick={() => createAd()}
					>
						<Add />
					</Fab>
				</CardActions>
			</Card>
		</div>
	)
}
