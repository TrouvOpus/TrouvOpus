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
	IconButton,
} from "@material-ui/core"
import { withSnackbar } from "notistack"
import { Autocomplete, Rating } from "@material-ui/lab"
import { Add, Delete } from "@material-ui/icons"
import FirebaseContext from "../contexts/FirebaseContext"
import { useUser, useAuth } from "../hooks"

export default withSnackbar(({ enqueueSnackbar }) => {
	const { currentUser } = useAuth()

	const { user, updateUser } = useUser(currentUser && currentUser.uid, true)

	const [name, setName] = React.useState()
	const [phone, setPhone] = React.useState()
	const [gender, setGender] = React.useState("male")
	const [dob, setDOB] = React.useState()
	const [skill, setSkill] = React.useState([])
	const skillSet = ["React", "JavaScript", "CSS"]

	const { Auth } = React.useContext(FirebaseContext)

	const [isLoading, setIsLoading] = React.useState(false)

	React.useEffect(() => {
		setIsLoading(!user)
		if (user) {
			setName(user.name || name)
			setGender(user.gender || gender)
			setPhone(user.phone || phone)
			setDOB(user.dob || dob)
		}
	}, [setIsLoading, user])

	const formData = { name, gender, phone, dob }

	function editSkill(id, key, value) {
		let skillCopy = [...skill]
		skillCopy[skillCopy.findIndex(x => x.id === id)][key] = value
		setSkill(skillCopy)
	}

	function addSkill() {
		setSkill([...skill, { id: Date.now(), title: "", rating: 0 }])
	}

	function removeSkill(id) {
		setSkill(skill.filter(s => s.id !== id))
	}

	function filterSkill() {
		let chosenSkill = skill.map(s => s.title)
		return skillSet.filter(s => chosenSkill.indexOf(s) === -1)
	}

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
		<div className="Profile">
			<Card>
				<Box px={4} py={2}>
					{isLoading ? (
						<CircularProgress color="secondary" />
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
									{skill.map(s => (
										<Grid item>
											<Grid container direction="row" spacing={3}>
												<Grid item>
													<Autocomplete
														disableClearable
														options={filterSkill()}
														style={{ width: 200 }}
														renderInput={skills => (
															<TextField {...skills} label="Skill set" />
														)}
														value={s.title}
														onChange={(event, newValue) =>
															editSkill(s.id, "title", newValue)
														}
													/>
												</Grid>
												<Grid item>
													<Box p={3} borderColor="transparent">
														<Rating
															value={s.rating}
															onChange={(event, newValue) => {
																editSkill(s.id, "rating", newValue)
															}}
															precision={0.5}
														/>
													</Box>
												</Grid>
												<Grid item>
													<Box p={1} borderColor="transparent">
														<IconButton
															aria-label="delete"
															onClick={() => removeSkill(s.id)}
														>
															<Delete />
														</IconButton>
													</Box>
												</Grid>
											</Grid>
										</Grid>
									))}
									<Button
										color="primary"
										expand="block"
										startIcon={<Add />}
										onClick={addSkill}
									>
										Add skill
									</Button>
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
