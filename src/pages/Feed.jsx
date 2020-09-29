import React from "react"
import FeedCard from "../components/FeedCard"
import { Redirect } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"
import { Grid } from "@material-ui/core"
import { useFeed, useAuth, useMatchable } from "../hooks"

export default ({ type, uid }) => {
	const { currentUser } = useAuth()
	const feed = useFeed(type, uid)
	const { item: user, updateItem: updateUser } = useMatchable(
		"user",
		currentUser && currentUser.uid,
		true
	)

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
			{Object.keys(feed.items)
				.sort(
					(a, b) => feed.items[b].compatibility - feed.items[a].compatibility
				)
				.map(i => {
					return (
						<Grid item xs>
							<FeedCard
								key={i}
								item={{ ...feed.items[i], id: i }}
								liked={user && user.likes && user.likes.includes(i)}
								onLike={() => like(i)}
							/>
						</Grid>
					)
				})}
		</Grid>
	)
}
