import React from "react"
import { Redirect } from "react-router-dom"
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
	Chip,
	Grid,
	useMediaQuery,
} from "@material-ui/core"
import { Edit, AccountCircle, PhoneIphone } from "@material-ui/icons"
import { useAuth, useMatchable } from "../hooks"
import { withSnackbar } from "notistack"
import FirebaseContext from "../contexts/FirebaseContext"
import SkillSelector from "../components/SkillSelector"
import EditProfile from "../components/EditProfile"
import UserStats from "../components/UserStats"

const useStyles = makeStyles(theme => ({
	fab: {
		float: "right",
		margin: theme.spacing(2),
	},
	logout: {
		float: "right",
		margin: theme.spacing(2),
	},
}))

export default withSnackbar(({ enqueueSnackbar }) => {
	const { currentUser } = useAuth()
	const { Auth } = React.useContext(FirebaseContext)
	const { item: user } = useMatchable(
		"user",
		currentUser && currentUser.uid,
		true,
		true
	)

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
			<Box my={2} className={classes.logout}>
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
			<Grid container direction="column" spacing={2}>
				<Grid item>
					<Card>
						<Box px={4} py={2}>
							<Box py={2}>
								<Typography variant="h4" component="h4">
									{user && user.name}
								</Typography>
							</Box>
							<Grid container direction="row" spacing={2}>
								<Grid item>
									<Chip
										icon={<AccountCircle />}
										label={currentUser && currentUser.email}
										variant="outlined"
									/>
								</Grid>
								<Grid item>
									<Chip
										icon={<PhoneIphone />}
										label={user && user.phone}
										variant="outlined"
									/>
								</Grid>
							</Grid>
							<Box py={3}>
								<Typography py={2} fullWidth>
									{user && user.objective}
								</Typography>
							</Box>
						</Box>
						<Fab
							className={classes.fab}
							color="primary"
							onClick={() => setOpen(true)}
						>
							<Edit />
						</Fab>
					</Card>
				</Grid>
				<Grid item>
					<UserStats />
				</Grid>
			</Grid>

			<Dialog open={open} onClose={() => setOpen(!open)}>
				<EditProfile onSave={() => setOpen(false)} />
			</Dialog>
		</div>
	)
})
