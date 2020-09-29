import React from "react"
import FeedCard from "../components/FeedCard"
import { Redirect } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"
import { Grid } from "@material-ui/core"
import { useFeed, useAuth, useUser } from "../hooks"

export default () => {
	const { currentUser } = useAuth()
	const applicant = useFeed("applicant", currentUser && currentUser.uid)
	const { user, updateUser } = useUser(currentUser && currentUser.uid, true)

	async function like(uid) {
		const likes = (user && user.likes) || []
		updateUser(
			likes.includes(uid)
				? { likes: likes.filter(x => x !== uid) }
				: { likes: [...likes, uid] }
		)
	}

	return currentUser === null ? (
		<Redirect to="/login" />
	) : currentUser === undefined ? (
		<CircularProgress />
	) : (
		<Grid container justifyItems="center" direction="column">
			{Object.keys(applicant.items)
				.sort(
					(a, b) =>
						applicant.items[b].compatibility - applicant.items[a].compatibility
				)
				.map(i => {
					return (
						<Grid item xs>
							<FeedCard
								key={i}
								item={{ ...applicant.items[i], id: i }}
								liked={user && user.likes && user.likes.includes(i)}
								onLike={() => like(i)}
							/>
						</Grid>
					)
				})}
		</Grid>
	)
}
