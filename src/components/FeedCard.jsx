import React from "react"
import {
	Card,
	CardActions,
	CardContent,
	Button,
	Typography,
	Dialog,
	IconButton,
	CircularProgress,
} from "@material-ui/core"

import FavoriteIcon from "@material-ui/icons/Favorite"
import SkillSelector from "../components/SkillSelector"

export default ({ item }) => {
	const [open, setOpen] = React.useState(false)

	function getSkills() {
		let sk = []
		Object.keys((item && item.skills) || {}).forEach(i =>
			sk.push({ id: Math.random(), title: i, rating: item.skills[i] })
		)
		return sk
	}

	return (
		<Card>
			{item && item.compatibility < 0 ? (
				<CircularProgress />
			) : (
				<>
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							{~~(item && item.compatibility * 100) + "% match"}
						</Typography>
						<SkillSelector skills={getSkills()} />
					</CardContent>
					<CardActions>
						<IconButton>
							<FavoriteIcon />
						</IconButton>
						<Button color="primary" onClick={() => setOpen(true)}>
							More Details
						</Button>
						<Dialog
							open={open}
							keepMounted
							onClose={() => setOpen(false)}
						></Dialog>
					</CardActions>
				</>
			)}
		</Card>
	)
}
