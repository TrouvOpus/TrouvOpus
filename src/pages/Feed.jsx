import { Grid } from "@material-ui/core"
import React from "react"
import FeedCard from "../components/FeedCard"
import { Redirect } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"
import { useFeed, useAuth } from "../hooks"

export default () => {
	const { currentUser } = useAuth()
	const applicant = useFeed("applicant", currentUser && currentUser.uid)

	return currentUser === null ? (
		<Redirect to="/login" />
	) : currentUser === undefined ? (
		<CircularProgress />
	) : (
		<div className="Feed Page">
			<Grid container spacing={2}>
				{Object.keys(applicant.items)
					.sort(
						(a, b) =>
							applicant.items[b].compatibility -
							applicant.items[a].compatibility
					)
					.map(i => {
						return (
							<Grid item key={i}>
								<FeedCard item={{ ...applicant.items[i], id: i }} />
							</Grid>
						)
					})}
			</Grid>
		</div>
	)
}
