import React from "react"
import {
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
	Switch,
} from "@material-ui/core"
import { withSnackbar } from "notistack"
import { useMatchable, useAuth, useMetadata } from "../hooks"
import SkillSelector, {
	skillReducer,
	clearSkills,
	addSkill,
} from "../components/SkillSelector"

export default withSnackbar(({ enqueueSnackbar, onSave }) => {
	const { currentUser } = useAuth()

	const { item: user, updateItem: updateUser } = useMatchable(
		"user",
		currentUser && currentUser.uid,
		true
	)
	const skillSet = useMetadata("skillSet")

	const [active, setActive] = React.useState(false)
	const [name, setName] = React.useState()
	const [phone, setPhone] = React.useState()
	const [objective, setObjective] = React.useState()
	const [gender, setGender] = React.useState("male")
	const [dob, setDOB] = React.useState()
	const [skill, dispatchSkill] = React.useReducer(skillReducer, [])

	const [isLoading, setIsLoading] = React.useState(false)

	React.useEffect(() => {
		setIsLoading(!user)
		if (user) {
			setActive(user.active)
			setName(user.name)
			setGender(user.gender)
			setPhone(user.phone)
			setObjective(user.objective)
			setDOB(user.dob)
			if (user.skills) {
				dispatchSkill(clearSkills())
				Object.keys(user.skills).forEach(s => {
					dispatchSkill(addSkill(s, user.skills[s]))
				})
			}
		}
	}, [setIsLoading, user])

	const formData = { name, gender, phone, objective, dob }

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

	async function save() {
		setIsLoading(true)
		try {
			await updateUser(getUpdatedData())
			onSave()
			enqueueSnackbar("Saved!", { variant: "success" })
		} catch (err) {
			console.error(err)
			enqueueSnackbar(err.message || err, { variant: "error" })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="EditProfile">
			<Box px={4} py={2}>
				{isLoading || currentUser === 0 ? (
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
								<Grid item>
									<FormControl>
										<FormControlLabel
											control={
												<Switch
													checked={active}
													onChange={() => setActive(!active)}
												/>
											}
											label="Actively Looking"
										/>
									</FormControl>
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
									id="standard-textarea"
									label="Objective"
									fullWidth
									value={objective}
									multiline
									onChange={e => setObjective(e.target.value)}
								/>
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
								<SkillSelector skills={skill} dispatch={dispatchSkill} />
							</Grid>
							<Grid item right>
								<Button type="submit" variant="contained" color="primary">
									Save
								</Button>
							</Grid>
						</Grid>
					</form>
				)}
			</Box>
		</div>
	)
})
