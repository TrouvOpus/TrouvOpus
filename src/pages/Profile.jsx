import React from "react"
import { Redirect, Link } from "react-router-dom"
import {
	Card,
	Box,
	Fab,
	Dialog,
	Button,
	makeStyles,
	useTheme,
	CircularProgress,
	Typography,
} from "@material-ui/core"
import { Edit } from "@material-ui/icons"
import { useAuth, useUser } from "../hooks"
import { withSnackbar } from "notistack"
import FirebaseContext from "../contexts/FirebaseContext"
import SkillSelector from "../components/SkillSelector"
import EditProfile from "../components/EditProfile"

const useStyles = makeStyles(theme => ({
	fab: {
		float: "right",
		margin: theme.spacing(2),
	},
}))

export default withSnackbar(({ enqueueSnackbar }) => {
	const { currentUser } = useAuth()
	const { Auth } = React.useContext(FirebaseContext)
	const { user } = useUser(currentUser && currentUser.uid, true, true)
	const theme = useTheme()
	const classes = useStyles(theme)

	function getSkills() {
		let sk = []
		Object.keys((user && user.skills) || {}).forEach(i =>
			sk.push({ id: Math.random(), title: i, rating: user.skills[i] })
		)
		return sk
	}

	const [open, setOpen] = React.useState(false)
	return currentUser === null ? (
		<Redirect to="/login" />
	) : currentUser === undefined ? (
		<CircularProgress />
	) : (
		<div className="Profile">
			<Button component={Link} to="/ads">
				My Ads
			</Button>
			<Card>
				<Box px={4} py={2}>
					<Typography variant="h4" component="h4">
						{user && user.name}
					</Typography>
					{currentUser && currentUser.email}
					<SkillSelector skills={getSkills()} />
				</Box>
				<Fab
					className={classes.fab}
					color="secondary"
					onClick={() => setOpen(true)}
				>
					<Edit />
				</Fab>
			</Card>
			<Box my={2}>
				<Button
					variant="outlined"
					color="secondary"
					onClick={async () => {
						try {
							await Auth.signOut()
							enqueueSnackbar("Logged out")
						} catch (error) {
							enqueueSnackbar(error.message, {
								variant: "error",
							})
						}
					}}
				>
					Log Out
				</Button>
			</Box>
			<Dialog open={open} onClose={() => setOpen(!open)}>
				<EditProfile onSave={() => setOpen(false)} />
			</Dialog>
		</div>
	)
})
