import React from "react"
import {
	CircularProgress,
	Grid,
	TextField,
	Button,
	Radio,
	RadioGroup,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	FormGroup,
} from "@material-ui/core"
import { useUser, useAuth } from "../hooks"

export default _ => {
	const { currentUser } = useAuth()
	const { user, updateUser } = useUser(currentUser && currentUser.uid, true)

	const [name, setName] = React.useState()
	const [email, setEmail] = React.useState()
	const [phone, setPhone] = React.useState()
	const [gender, setGender] = React.useState("male")
	const [dob, setDOB] = React.useState()
	const [jobPref, setJobPref] = React.useState({
		job: true,
		internship: false,
		project: false,
	})
	const [isLoading, setIsLoading] = React.useState(false)

	React.useEffect(() => {
		setIsLoading(!user)
		if (user) {
			setName(user.name)
			setGender(user.gender)
			setEmail(user.email)
			setPhone(user.phone)
			setDOB(user.DOB)
			setJobPref(user.jobPref)
		}
	}, [user])

	const formData = { name, gender, email, phone, dob, jobPref }

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
						<Grid item>
							<TextField
								label="Name"
								value={name}
								onChange={e => {
									setName(e.target.value)
								}}
							/>
						</Grid>
						<Grid item>
							<TextField
								label="E-mail Address"
								value={email}
								onChange={e => {
									setEmail(e.target.value)
								}}
							/>
						</Grid>

						<Grid item>
							<TextField
								label="Phone"
								value={phone}
								onChange={e => {
									setPhone(e.target.value)
								}}
							/>
						</Grid>
						<FormControl>
							<FormLabel>Gender</FormLabel>
							<RadioGroup
								value={gender}
								onChange={e => setGender(e.target.value)}
							>
								<Grid container direction="row" spacing={1}>
									<FormControlLabel
										value="male"
										control={<Radio />}
										label="Male"
									/>
									<FormControlLabel
										value="female"
										control={<Radio />}
										label="Female"
									/>
									<FormControlLabel
										value="other"
										control={<Radio />}
										label="Other"
									/>
								</Grid>
							</RadioGroup>
						</FormControl>
						<Grid item>
							<TextField
								type="date"
								label="DOB"
								value={dob}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={e => {
									setDOB(e.target.value)
								}}
							/>
						</Grid>
						<FormControl>
							<FormLabel>Preferences: </FormLabel>
							<FormGroup
								onChange={e =>
									setJobPref({ ...jobPref, [e.target.name]: e.target.checked })
								}
							>
								<Grid container direction="row">
									<FormControlLabel
										control={<Checkbox name="job" checked={jobPref.job} />}
										label="Job"
									/>
									<FormControlLabel
										control={
											<Checkbox
												name="internship"
												checked={jobPref.internship}
											/>
										}
										label="Internship"
									/>
									<FormControlLabel
										control={
											<Checkbox name="project" checked={jobPref.project} />
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
