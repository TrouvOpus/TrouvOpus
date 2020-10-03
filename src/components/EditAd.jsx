import React from "react"
import {
	Grid,
	Dialog,
	DialogActions,
	Button,
	DialogTitle,
	DialogContent,
	TextField,
	useTheme,
	useMediaQuery,
	CircularProgress,
	Switch,
	FormControl,
	FormControlLabel,
	IconButton,
} from "@material-ui/core"
import { Delete } from "@material-ui/icons"
import { useMetadata, useMatchable } from "../hooks"
import SkillSelector, {
	skillReducer,
	clearSkills,
	addSkill,
} from "../components/SkillSelector"
import { withSnackbar } from "notistack"

export default withSnackbar(({ enqueueSnackbar, open, onClose, uid }) => {
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))
	const skillSet = useMetadata("skillSet")
	const {
		item: job,
		updateItem: updateJob,
		deleteItem: deleteJob,
	} = useMatchable("job", uid, true, true)
	const [active, setActive] = React.useState(false)
	const [title, setTitle] = React.useState()
	const [description, setDescription] = React.useState()
	const [isLoading, setIsLoading] = React.useState(false)
	const [skill, dispatchSkill] = React.useReducer(skillReducer, [])

	React.useEffect(() => {
		setIsLoading(!job)
		if (job) {
			setActive(job.active)
			setTitle(job.title)
			setDescription(job.description)
			if (job.skills) {
				dispatchSkill(clearSkills())
				Object.keys(job.skills).forEach(s => {
					dispatchSkill(addSkill(s, job.skills[s]))
				})
			}
		}
	}, [job])

	const formData = { title, description }

	function getUpdatedData() {
		let data = {}
		Object.keys(formData).forEach(d => {
			if (formData[d]) data[d] = formData[d]
		})
		data["active"] = active
		data["skills"] = {}
		skill.forEach(s => {
			if (
				skillSet &&
				skillSet.options &&
				skillSet.options.includes(s.title) &&
				s.rating !== 0
			)
				data["skills"][s.title] = s.rating
		})
		return data
	}

	function save() {
		setIsLoading(true)
		updateJob(getUpdatedData())
		enqueueSnackbar("Saved!", { variant: "success" })
		onClose && onClose()
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullScreen={fullScreen}
			scroll="paper"
		>
			<form
				onSubmit={event => {
					event.preventDefault()
					save()
				}}
			>
				<DialogTitle>
					<Grid container justify="space-between" alignItems="center">
						<Grid item>Edit Job</Grid>
						<Grid item>
							<IconButton
								onClick={() => {
									deleteJob().then(() =>
										enqueueSnackbar("Deleted!", { variant: "success" })
									)
									onClose && onClose()
								}}
							>
								<Delete />
							</IconButton>
						</Grid>
					</Grid>
				</DialogTitle>
				<DialogContent dividers>
					{isLoading ? (
						<CircularProgress />
					) : (
						<Grid container direction="column" spacing={2}>
							<Grid item>
								<FormControl>
									<FormControlLabel
										control={
											<Switch
												checked={active}
												onChange={() => setActive(!active)}
											/>
										}
										label="Actively Recruiting"
									/>
								</FormControl>
							</Grid>
							<Grid item>
								<TextField
									label="Title"
									value={title}
									fullWidth
									onChange={e => setTitle(e.target.value)}
								/>
							</Grid>
							<Grid item>
								<TextField
									label="Description"
									value={description}
									multiline
									fullWidth
									onChange={e => setDescription(e.target.value)}
								/>
							</Grid>
							<Grid item>
								<SkillSelector skills={skill} dispatch={dispatchSkill} />
							</Grid>
						</Grid>
					)}
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							onClose && onClose()
						}}
					>
						Cancel
					</Button>
					<Button type="submit" variant="contained" color="primary">
						Save
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
})
