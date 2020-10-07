import React from "react"
import {
	Button,
	Card,
	CardContent,
	CardMedia,
	Grid,
	makeStyles,
} from "@material-ui/core"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks"
import Title from "../assets/images/trouvopus.png"
import StressImg from "../assets/images/stress.png"
import Match from "../assets/images/match.png"

//import Dashboard from "../components/Dashboard"

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 345,
		display: "flex",
		flexDirection: "column",
	},
	cover: {
		width: "100%",
	},
}))

export default () => {
	const classes = useStyles()
	const { currentUser } = useAuth()

	return (
		<div className="Home Page">
			<CardMedia component="img" image={Title} />
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
				spacing={2}
			>
				{!currentUser && (
					<Grid item>
						<Button
							color="primary"
							variant="contained"
							expand="block"
							component={Link}
							to="/login"
						>
							Login
						</Button>
					</Grid>
				)}
				<Grid container direction="row" justify="space-between">
					<Grid item>
						<Card className={classes.card}>
							<CardContent>
								Worried about finding a job? TrouvOpus makes your life easier.
							</CardContent>
							<CardMedia component="img" image={StressImg} />
						</Card>
					</Grid>
					<Grid item>
						<Card className={classes.card}>
							<CardContent>Find your dream job.</CardContent>
							<CardMedia component="img" image={Match} />
						</Card>
					</Grid>
				</Grid>
				{/*
					<Grid item>
						<Dashboard />
					</Grid>
				*/}
			</Grid>
		</div>
	)
}
