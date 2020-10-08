import React from "react"
import FeedCard from "../components/FeedCard"
import { Redirect, Link } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"
import { Box, Button, Grid } from "@material-ui/core"
import { useFeed, useAuth, useMatchable } from "../hooks"

export default ({ type, uid }) => {
	const { currentUser } = useAuth()
	const feed = useFeed(type, uid)
	const { item, updateItem } = useMatchable(
		type === "applicant" ? "user" : type === "recruiter" ? "job" : "",
		uid,
		true
	)

	function like(id) {
		const likes = (item && item.likes) || []
		const newDoc = likes.includes(id)
			? { likes: likes.filter(x => x !== id) }
			: { likes: [...likes, id] }
		updateItem({ ...newDoc })
	}

	function isSelf(id) {
		return type === "applicant"
			? currentUser && currentUser.uid === feed.items[id]["createdBy"]
			: currentUser && currentUser.uid === id
	}

	return currentUser === null ? (
		<Redirect to="/login" />
	) : currentUser === undefined ? (
		<CircularProgress />
	) : (
		<Grid container justifyItems="center" direction="column">
			<Box py={2}>
				<Button color="primary" variant="contained" component={Link} to="/">
					Home
				</Button>
			</Box>
			{Object.keys(feed.items)
				.sort(
					(a, b) => feed.items[b].compatibility - feed.items[a].compatibility
				)
				.map(i => {
					return (
						feed.items[i]["active"] &&
						!isSelf(i) && (
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
