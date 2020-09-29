import React from "react"
import {
	Box,
	Card,
	CardContent,
	CardActionArea,
	Collapse,
	Typography,
	IconButton,
	useTheme,
	Grid,
} from "@material-ui/core"

import { Favorite, ExpandMore } from "@material-ui/icons"
import SkillSelector from "../components/SkillSelector"
import Progress from "../components/Progress"

export default ({ item, onLike = () => {}, liked = false, type = "job" }) => {
	const [open, setOpen] = React.useState(false)
	const theme = useTheme()

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
						<Grid container direction="row" spacing={2} justify="space-between">
							<Grid item>
								<Typography variant="h6" component="h6">
									{type === "job" && item.title}
								</Typography>
								<Typography color="textSecondary" gutterBottom>
									{~~(item.compatibility * 100) + "% match"}
								</Typography>
							</Grid>
							<Grid item>
								<Progress
									value={item && item.compatibility * 100}
									variant="static"
									style={{
										bottom:
											theme.palette.grey[
												theme.palette.type === "light" ? 200 : 700
											],
									}}
								/>
							</Grid>
						</Grid>
						<SkillSelector skills={getSkills()} />
					</CardContent>
					<Collapse in={open}>
						<CardContent>Details</CardContent>
					</Collapse>
					<CardActionArea>
						<IconButton
							onClick={onLike}
							color={liked ? "secondary" : "default"}
						>
							<Favorite />
						</IconButton>
						<IconButton onClick={() => setOpen(!open)}>
							<ExpandMore />
						</IconButton>
					</CardActionArea>
				</Card>
			</Box>
		)
	)
}
