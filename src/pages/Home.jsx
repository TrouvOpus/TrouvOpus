import React from "react"
import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Grid,
	makeStyles,
	Typography,
} from "@material-ui/core"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks"
import Title from "../assets/images/trouvopus.png"
import StressImg from "../assets/images/stress.png"
import Match from "../assets/images/match.png"
import Dashboard from "../components/Dashboard"

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 350,
		display: "flex",
		flexDirection: "column",
	},
	cover: {
		width: "100%",
	},
	login: {
		float: "right",
		margin: theme.spacing(1),
	},
}))

export default () => {
	const classes = useStyles()
	const { currentUser } = useAuth()

	return (
		<div className="Home Page">
			{!currentUser && (
				<Button
					color="primary"
					variant="contained"
					className={classes.login}
					component={Link}
					to="/login"
				>
					Login
				</Button>
			)}
			<Box py={2}>
				<CardMedia component="img" image={Title} />
			</Box>

			<Grid
				container
				direction="row"
				spacing={2}
				alignItems="center"
				justify="space-between"
			>
				<Grid item>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="h5" align="center">
								Worried about finding a job? TrouvOpus makes your life easier.
							</Typography>
						</CardContent>
						<CardMedia component="img" image={StressImg} />
					</Card>
				</Grid>
				<Grid item>
					<Card className={classes.card}>
						<CardMedia component="img" image={Match} />
						<CardContent>
							<Typography variant="h5" align="center">
								Find your dream job.
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			<Grid item>
				<Dashboard />
			</Grid>
		</div>
	)
}
