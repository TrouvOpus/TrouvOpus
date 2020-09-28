import { Box, makeStyles, useMediaQuery } from "@material-ui/core"
import React from "react"
import FeedCard from "../components/FeedCard"
import { Redirect } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"
import { useFeed, useAuth } from "../hooks"

const useStyles = makeStyles({
	grid: {
		display: "grid",
		gridTemplateColumns: ({ landscape }) => (landscape ? "1fr 1fr 1fr" : "1fr"),
	},
})

export default () => {
	const { currentUser } = useAuth()
	const applicant = useFeed("applicant", currentUser && currentUser.uid)
	const landscape = useMediaQuery("(orientation: landscape)")
	const classes = useStyles({ landscape })

	return currentUser === null ? (
		<Redirect to="/login" />
	) : currentUser === undefined ? (
		<CircularProgress />
	) : (
		<Box className={classes.grid}>
			{Object.keys(applicant.items)
				.sort(
					(a, b) =>
						applicant.items[b].compatibility - applicant.items[a].compatibility
				)
				.map(i => {
					return <FeedCard key={i} item={{ ...applicant.items[i], id: i }} />
				})}
		</Box>
	)
}
