import React from "react"
import FeedCard from "../components/FeedCard"
import { Redirect } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"
import { Grid } from "@material-ui/core"
import { useFeed, useAuth, useMatchable } from "../hooks"

export default ({ type, uid }) => {
	const { currentUser } = useAuth()
	const feed = useFeed(type, uid)
	const { item, updateItem } = useMatchable(type, uid, true)

	console.log("Likes", item && item.likes)

	async function like(id) {
		const likes = (type && type.likes) || []
		updateItem(
			likes.includes(id)
				? { likes: likes.filter(x => x !== id) }
				: { likes: [...likes, id] }
		).then(() => console.log(uid + " liked " + id))
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
						feed.items[i]["active"] && (
							<Grid item xs>
								<FeedCard
									key={i}
									item={{ ...feed.items[i], id: i }}
									liked={item && item.likes && item.likes.includes(i)}
									onLike={() => like(i)}
								/>
							</Grid>
						)
					)
				})}
		</Grid>
	)
}
