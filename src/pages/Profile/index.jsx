import React from "react"
import {
	CircularProgress,
	Grid,
	Button,
	TextField,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Container,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@material-ui/core"

import { useUser, useAuth } from "../../hooks"

import Preferences from "./Preferences"

export default _ => {
	const [active, setActive] = React.useState("Profile")
	const { currentUser } = useAuth()

	const { user, updateUser } = useUser(currentUser && currentUser.uid, true)

	const [name, setName] = React.useState()
	const [email, setEmail] = React.useState()
	const [phone, setPhone] = React.useState()
	const [gender, setGender] = React.useState("male")
	const [dob, setDOB] = React.useState()

	const [isLoading, setIsLoading] = React.useState(false)

	React.useEffect(() => {
		setIsLoading(!user)
		if (user) {
			setName(user.name || name)
			setGender(user.gender || gender)
			setEmail(user.email || email)
			setPhone(user.phone || phone)
			setDOB(user.dob || dob)
		}
	}, [setIsLoading, user])

	const formData = { name, gender, email, phone, dob }

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
			{!currentUser ? (
				"TODO: Redirect to Login"
			) : (
				<>
					<Accordion
						expanded={active === "Profile"}
						onChange={() => setActive("Profile")}
					>
						<AccordionSummary>
							<h1>{name}</h1>
						</AccordionSummary>
						<Container>
							<AccordionDetails>
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
															label="E-mail Address"
															value={email}
															onChange={e => {
																setEmail(e.target.value)
															}}
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
											<Grid item>
												<Button
													type="submit"
													variant="contained"
													color="primary"
												>
													Save
												</Button>
											</Grid>
										</Grid>
									</form>
								)}
							</AccordionDetails>
						</Container>
					</Accordion>
					<Accordion
						expanded={active === "Resume"}
						onChange={() => setActive("Resume")}
					>
						<AccordionSummary>
							<h1>Resume</h1>
						</AccordionSummary>
						<AccordionDetails>
							<Container>
								<Preferences />
							</Container>
						</AccordionDetails>
					</Accordion>
				</>
			)}
		</div>
	)
}
