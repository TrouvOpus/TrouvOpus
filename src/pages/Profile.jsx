import React from "react"
import {
	Card,
	Box,
	Grid,
	Button,
	TextField,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	CircularProgress,
} from "@material-ui/core"
import { withSnackbar } from "notistack"
import { Redirect } from "react-router-dom"
import FirebaseContext from "../contexts/FirebaseContext"
import { useUser, useAuth, useApplicantFeed, useRecruiterFeed } from "../hooks"
import SkillSelector, {
	skillReducer,
	skillSet,
	clearSkills,
	addSkill,
} from "../components/SkillSelector"

export default withSnackbar(({ enqueueSnackbar }) => {
	const { currentUser } = useAuth()

	const { user, updateUser } = useUser(currentUser && currentUser.uid, true)

	const [name, setName] = React.useState()
	const [phone, setPhone] = React.useState()
	const [gender, setGender] = React.useState("male")
	const [dob, setDOB] = React.useState()
	const [skill, dispatchSkill] = React.useReducer(skillReducer, [])

	const { Auth } = React.useContext(FirebaseContext)

	const { jobs } = useApplicantFeed(currentUser && currentUser.uid)
	const { users } = useRecruiterFeed("2zGkzfAEJryWkoexYiTA")
	React.useEffect(() => console.log("Jobs", jobs), [jobs])
	React.useEffect(() => console.log("Users", users), [users])

	const [isLoading, setIsLoading] = React.useState(false)

	React.useEffect(() => {
		setIsLoading(!user)
		if (user) {
			setName(user.name)
			setGender(user.gender)
			setPhone(user.phone)
			setDOB(user.dob)
			if (user.skills) {
				dispatchSkill(clearSkills())
				Object.keys(user.skills).forEach(s => {
					dispatchSkill(addSkill(s, user.skills[s]))
				})
			}
		}
	}, [setIsLoading, user])

	const formData = { name, gender, phone, dob }

	function getUpdatedData() {
		let data = {}
		Object.keys(formData).forEach(d => {
			if (formData[d]) data[d] = formData[d]
		})
		data["skills"] = {}
		skill.forEach(s => {
			if (skillSet.includes(s.title) && s.rating !== 0)
				data["skills"][s.title] = s.rating
		})
		return data
	}

	async function save() {
		try {
			await updateUser(getUpdatedData())
			enqueueSnackbar("Saved!", { variant: "success" })
		} catch (err) {
			console.error(err)
			enqueueSnackbar(err.message || err, { variant: "error" })
		}
	}

	return (
		<div className="Profile">
			<Card>
				<Box px={4} py={2}>
					{isLoading || currentUser === 0 ? (
						<CircularProgress color="secondary" />
					) : !currentUser ? (
						<Redirect to="/login" />
					) : (
						<form
							onSubmit={e => {
								e.preventDefault()
								save()
							}}
						>
							<Grid container direction="column" spacing={2}>
								<Grid item>
									<Grid item>
										<h1>Profile</h1>
									</Grid>
									<Grid container direction="row" spacing={1}>
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
												disabled
												label="E-mail Address"
												value={currentUser && currentUser.email}
											/>
										</Grid>
									</Grid>
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
								<Grid item>
									<FormControl>
										<FormLabel>Gender</FormLabel>
										<RadioGroup
											value={gender}
											onChange={e => setGender(e.target.value)}
										>
											<Grid container direction="row" spacing={1}>
												<Grid item>
													<FormControlLabel
														value="male"
														control={<Radio />}
														label="Male"
													/>
												</Grid>
												<Grid item>
													<FormControlLabel
														value="female"
														control={<Radio />}
														label="Female"
													/>
												</Grid>
												<Grid item>
													<FormControlLabel
														value="other"
														control={<Radio />}
														label="Other"
													/>
												</Grid>
											</Grid>
										</RadioGroup>
									</FormControl>
								</Grid>
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
								<Grid item>
									<SkillSelector skill={skill} dispatch={dispatchSkill} />
								</Grid>
								<Grid item>
									<Grid container direction="row" spacing={1}>
										<Grid item>
											<Button type="submit" variant="contained" color="primary">
												Save
											</Button>
										</Grid>
										<Grid item>
											<Button
												variant="outlined"
												color="secondary"
												onClick={async () => {
													try {
														await Auth.signOut()
														enqueueSnackbar("Logged out")
													} catch (error) {
														enqueueSnackbar(error.message, { variant: "error" })
													}
												}}
											>
												Log Out
											</Button>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</form>
					)}
				</Box>
			</Card>
		</div>
	)
})
