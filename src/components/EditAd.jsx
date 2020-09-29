import React from "react"
import { useJob } from "../hooks"
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
} from "@material-ui/core"
import { useMetadata } from "../hooks"
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
	const { job, updateJob } = useJob(uid, true, true)
	const [title, setTitle] = React.useState()
	const [description, setDescription] = React.useState()
	const [isLoading, setIsLoading] = React.useState(false)
	const [skill, dispatchSkill] = React.useReducer(skillReducer, [])

	React.useEffect(() => {
		setIsLoading(!job)
		if (job) {
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
			console.log(d, formData[d])
			if (formData[d]) data[d] = formData[d]
		})
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

	async function save() {
		setIsLoading(true)
		try {
			await updateJob(getUpdatedData())
			onClose && onClose()
			enqueueSnackbar("Saved!", { variant: "success" })
		} catch (err) {
			console.error(err)
			enqueueSnackbar(err.message || err, { variant: "error" })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				save()
			}}
		>
			<Dialog
				open={open}
				onClose={onClose}
				fullScreen={fullScreen}
				scroll="paper"
			>
				<DialogTitle>Edit Job</DialogTitle>
				<DialogContent dividers>
					{isLoading ? (
						<CircularProgress />
					) : (
						<Grid container direction="column" spacing={2}>
							<Grid item>
								<TextField
									label="Title"
									value={title}
									onChange={e => setTitle(e.target.value)}
								/>
							</Grid>
							<Grid item>
								<TextField
									label="Description"
									value={description}
									multiline
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
			</Dialog>
		</form>
	)
})
