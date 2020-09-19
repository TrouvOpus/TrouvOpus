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
import { Redirect } from "react-router-dom"
import { Autocomplete, Rating } from "@material-ui/lab"
import { Add, Delete } from "@material-ui/icons"
import FirebaseContext from "../contexts/FirebaseContext"
import { useUser, useAuth } from "../hooks"

const skillReducer = (state, action) => {
	switch (action.type) {
		case "ADD":
			return [
				...state,
				{
					id: Math.random(),
					title: action.title || "",
					rating: action.rating || 0,
				},
			]
		case "EDIT":
			let copy = [...state]
			if (action.key && action.value)
				copy[copy.findIndex(x => x.id === action.id)][action.key] = action.value
			return copy
		case "REMOVE":
			return action.id ? state.filter(s => s.id !== action.id) : state
		case "CLEAR":
			return []
		default:
			return state
	}
}

export default withSnackbar(({ enqueueSnackbar }) => {
	const { currentUser } = useAuth()

	const { user, updateUser } = useUser(currentUser && currentUser.uid, true)

	const [name, setName] = React.useState()
	const [phone, setPhone] = React.useState()
	const [gender, setGender] = React.useState("male")
	const [dob, setDOB] = React.useState()
	const [skill, dispatchSkill] = React.useReducer(skillReducer, [])
	const skillSet = ["React", "JavaScript", "CSS", "SQL", "PHP"]

	const { Auth } = React.useContext(FirebaseContext)

	const [isLoading, setIsLoading] = React.useState(false)

	React.useEffect(() => {
		setIsLoading(!user)
		if (user) {
			setName(user.name)
			setGender(user.gender)
			setPhone(user.phone)
			setDOB(user.dob)
			if (user.skills) {
				clearSkills()
				Object.keys(user.skills).forEach(s => {
					addSkill(s, user.skills[s])
				})
			}
		}
	}, [setIsLoading, user])

	function addSkill(title = "", rating = 0) {
		dispatchSkill({ type: "ADD", title: title, rating: rating })
	}

	function editSkill(id, key, value) {
		dispatchSkill({ type: "EDIT", id: id, key: key, value: value })
	}

	function removeSkill(id) {
		dispatchSkill({ type: "REMOVE", id: id })
	}

	function clearSkills() {
		dispatchSkill({ type: "CLEAR" })
	}

	function filterSkill() {
		let chosenSkill = skill.map(s => s.title)
		return skillSet.filter(s => chosenSkill.indexOf(s) === -1)
	}

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
									{skill.map(s => (
										<Grid item key={s.id}>
											<Grid container direction="row" spacing={3}>
												<Grid item>
													<Autocomplete
														disableClearable
														options={filterSkill()}
														getOptionSelected={o => o || null}
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
															name={s.title}
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
										disabled={filterSkill().length === 0}
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
