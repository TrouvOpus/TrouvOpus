import React from "react"
import {
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

import { useUser, useAuth } from "../../hooks"

export default _ => {
	const { currentUser } = useAuth()

	const { user, updateUser } = useUser(currentUser && currentUser.uid, true)

	const [name, setName] = React.useState()
	const [phone, setPhone] = React.useState()
	const [gender, setGender] = React.useState("male")
	const [dob, setDOB] = React.useState()

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
