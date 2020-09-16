import React from "react"
import {
	CircularProgress,
	Grid,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	FormGroup,
} from "@material-ui/core"
import { useUser, useAuth } from "../../hooks"

export default _ => {
	const { currentUser } = useAuth()
	const { user, updateUser } = useUser(currentUser && currentUser.uid, true)

	const [jobType, setJobType] = React.useState({
		job: true,
		internship: false,
		project: false,
	})
	const [isLoading, setIsLoading] = React.useState(false)

	React.useEffect(() => {
		setIsLoading(!user)
		if (user) {
			setJobType(user.jobType || jobType)
		}
	}, [user])

	const formData = { jobType }

	function getUpdatedData() {
		let data = {}
		Object.keys(formData).forEach(d => {
			if (formData[d]) data[d] = formData[d]
		})
		return data
	}

	async function save() {
		try {
			await updateUser(getUpdatedData())
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className="Resume">
			{isLoading ? (
				<CircularProgress color="secondary" />
			) : (
				<form
					onSubmit={e => {
						e.preventDefault()
						save()
					}}
				>
					<Grid container direction="column" spacing={1}>
						<FormControl>
							<FormLabel>Preferences: </FormLabel>
							<FormGroup
								onChange={e =>
									setJobType({ ...jobType, [e.target.name]: e.target.checked })
								}
							>
								<Grid container direction="row">
									<FormControlLabel
										control={<Checkbox name="job" checked={jobType.job} />}
										label="Job"
									/>
									<FormControlLabel
										control={
											<Checkbox
												name="internship"
												checked={jobType.internship}
											/>
										}
										label="Internship"
									/>
									<FormControlLabel
										control={
											<Checkbox name="project" checked={jobType.project} />
										}
										label="Project"
									/>
								</Grid>
							</FormGroup>
						</FormControl>
						<Grid item>
							<Button type="submit" variant="contained" color="primary">
								Save
							</Button>
						</Grid>
					</Grid>
				</form>
			)}
		</div>
	)
}
