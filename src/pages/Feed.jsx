import { Grid } from "@material-ui/core"
import React from "react"
import FeedCard from "../components/FeedCard"
import { Redirect } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"
import { useApplicantFeed, useAuth } from "../hooks"

export default () => {
	const { currentUser } = useAuth()
	const { jobs } = useApplicantFeed(currentUser && currentUser.uid)

	return currentUser === null ? (
		<Redirect to="/login" />
	) : currentUser === undefined ? (
		<CircularProgress />
	) : (
		<div className="Feed Page">
			<Grid container spacing={2}>
				{Object.keys(jobs)
					.sort((a, b) => jobs[b].compatibility - jobs[a].compatibility)
					.map(j => {
						return (
							<Grid item key={j}>
								<FeedCard job={{ ...jobs[j], id: j }} />
							</Grid>
						)
					})}
			</Grid>
		</div>
	)
}
