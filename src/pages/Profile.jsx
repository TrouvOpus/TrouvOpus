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
}))

export default withSnackbar(({ enqueueSnackbar }) => {
	const landscape = useMediaQuery("(orientation:landscape)")
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

	const layout = landscape && getSkills().length !== 0
	const [open, setOpen] = React.useState(false)

	console.log("Profile just got rendered!")

	return currentUser === null ? (
		<Redirect to="/login" />
	) : currentUser === undefined ? (
		<CircularProgress />
	) : (
		<div className="Profile">
			<Button component={Link} to="/ads">
				My Ads
			</Button>
			<Grid container direction="column" spacing={2}>
				<Grid item>
					<Card>
						<Grid container direction={layout ? "row" : "column"}>
							<Grid item xs={layout ? "6" : "0"}>
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
							</Grid>
							{getSkills().length !== 0 && (
								<Grid item xs={layout ? "6" : "0"}>
									<Box px={4} py={2}>
										<Box py={2}>
											<Typography variant="h5" component="h5">
												Skill set:
											</Typography>
										</Box>
										<SkillSelector skills={getSkills()} />
									</Box>
								</Grid>
							)}
						</Grid>
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
