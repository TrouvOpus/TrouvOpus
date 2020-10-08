import React from "react"
import FeedCard from "../components/FeedCard"
import { Redirect } from "react-router-dom"
import { Grid, CircularProgress, useTheme } from "@material-ui/core"
import { Pie } from "react-chartjs-2"
import { useFeed, useAuth, useMatchable } from "../hooks"

export default ({ type, uid }) => {
	const { currentUser } = useAuth()
	const theme = useTheme()
	const primaryColor = theme.palette.primary.main
	const secondaryColor = theme.palette.secondary.main
	const feed = useFeed(type, uid)
	const { item, updateItem, getMatches } = useMatchable(
		type === "applicant" ? "user" : type === "recruiter" ? "job" : "",
		uid,
		true
	)
	const [likes, setLikes] = React.useState(0)
	const [matches, setMatches] = React.useState(0)

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

	function getFeed() {
		return Object.keys(feed.items)
			.sort((a, b) => feed.items[b].compatibility - feed.items[a].compatibility)
			.filter(i => feed.items[i]["active"] && !isSelf(i))
	}

	React.useEffect(() => {
		if (item && item.likes) setLikes(item.likes.length || 0)
		getMatches().then(m => {
			if (m && m.length && m.length !== 0 && !matches) setMatches(m.length)
		})
		console.log("likes", likes, "matches", matches)
	}, [item, likes, matches, getMatches])

	const matchData = {
		labels: ["Matches", "Likes"],
		datasets: [
			{
				data: [matches, likes - matches <= 0 ? 0 : likes - matches],
				backgroundColor: [primaryColor, secondaryColor],
			},
		],
	}

	return currentUser === null ? (
		<Redirect to="/login" />
	) : currentUser === undefined ? (
		<CircularProgress />
	) : (
		<Grid container justifyItems="center" direction="column">
			<Grid item>
				<Pie data={matchData} />
			</Grid>
			{getFeed().length === 0
				? type === "applicant"
					? "No jobs available"
					: "No applicants available"
				: getFeed().map(i => {
						return (
							<Grid item xs>
								<FeedCard
									key={i}
									selfItem={item}
									item={{ ...feed.items[i], id: i }}
									liked={item && item.likes && item.likes.includes(i)}
									onLike={() => like(i)}
								/>
							</Grid>
						)
				  })}
		</Grid>
	)
}
