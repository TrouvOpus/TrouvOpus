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
import { Radar } from "react-chartjs-2"
import { Favorite, ExpandMore } from "@material-ui/icons"
import SkillSelector from "../components/SkillSelector"
import Progress from "../components/Progress"
import { useMetadata } from "../hooks"

export default ({
	item,
	selfItem,
	onLike = () => {},
	liked = false,
	type = "job",
}) => {
	const [open, setOpen] = React.useState(false)
	const theme = useTheme()
	const skillSet =
		(item &&
			selfItem &&
			item.skills &&
			selfItem.skills && [
				...new Set([
					...Object.keys(item.skills),
					...Object.keys(selfItem.skills),
				]),
			]) ||
		[]
	const expandable = (type === "job" && item.description) || true

	const primaryColor = theme.palette.primary.main
	const secondaryColor = theme.palette.secondary.main

	function getSkills() {
		let sk = []
		selfItem &&
			selfItem.skills &&
			Object.keys((item && item.skills) || {}).forEach(i =>
				sk.push({
					id: Math.random(),
					title: i,
					rating: item.skills[i] || 0.0,
					sRating: selfItem.skills[i] || 0.0,
				})
			)
		return sk
	}

	function getGraphData() {
		return {
			labels: skillSet || [],
			datasets: [
				{
					label: "My Skills",
					data: skillSet && skillSet.map(s => selfItem.skills[s] || 0.0),
					borderColor: primaryColor,
					backgroundColor: primaryColor + "55",
				},
				{
					label: "Required Skills",
					data: skillSet && skillSet.map(s => item.skills[s] || 0.0),
					borderColor: secondaryColor,
					backgroundColor: secondaryColor + "55",
				},
			],
		}
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
					{expandable && (
						<Collapse in={open}>
							<CardContent>{item.description}</CardContent>
							<Radar data={getGraphData()} />
						</Collapse>
					)}
					<CardActionArea>
						<IconButton
							onClick={onLike}
							color={liked ? "secondary" : "default"}
						>
							<Favorite />
						</IconButton>
						{expandable && (
							<IconButton onClick={() => setOpen(!open)}>
								<ExpandMore />
							</IconButton>
						)}
					</CardActionArea>
				</Card>
			</Box>
		)
	)
}
