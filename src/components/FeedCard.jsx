import React from "react"
import {
	Box,
	Card,
	CardContent,
	CardActionArea,
	Button,
	Typography,
	Dialog,
	IconButton,
	CircularProgress,
	DialogTitle,
	makeStyles,
} from "@material-ui/core"

import FavoriteIcon from "@material-ui/icons/Favorite"
import SkillSelector from "../components/SkillSelector"

const useStyles = makeStyles({
	CircularProgress: {
		float: "right",
	},
})

export default ({ item, type = "job" }) => {
	const [open, setOpen] = React.useState(false)
	const classes = useStyles()

	function getSkills() {
		let sk = []
		Object.keys((item && item.skills) || {}).forEach(i =>
			sk.push({ id: Math.random(), title: i, rating: item.skills[i] })
		)
		return sk
	}

	return (
		item &&
		item.compatibility >= 0 && (
			<Box m={2}>
				<Card>
					<CardContent>
						<Typography variant="h6" component="h6">
							{type === "job" && item.title}
						</Typography>
						<CircularProgress
							className={classes.CircularProgress}
							value={item && item.compatibility * 100}
							variant="static"
						/>
						<Typography color="textSecondary" gutterBottom>
							{~~(item.compatibility * 100) + "% match"}
						</Typography>
						<SkillSelector skills={getSkills().slice(0, 3)} />
					</CardContent>
					<CardActionArea>
						<IconButton>
							<FavoriteIcon />
						</IconButton>
						<Button color="primary" onClick={() => setOpen(true)}>
							More Details
						</Button>
						<Dialog open={open} keepMounted onClose={() => setOpen(false)}>
							<DialogTitle>
								This dialog will soon have information in it.
							</DialogTitle>
						</Dialog>
					</CardActionArea>
				</Card>
			</Box>
		)
	)
}
