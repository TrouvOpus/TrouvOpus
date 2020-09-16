import React from "react"
import {
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

export default _ => {
	const [name, setName] = React.useState()
	const [email, setEmail] = React.useState()
	const [phone, setPhone] = React.useState()
	const [gender, setGender] = React.useState("male")
	const [dob, setDOB] = React.useState()
	const [types, setTypes] = React.useState({
		Job: true,
		Internship: false,
		Project: false,
	})

	return (
		<div className="Resume">
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
				<Grid container direction="row" spacing={2}>
					<Grid item>
						<TextField
							label="E-mail Address"
							value={email}
							type="email"
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
				</Grid>
				<Grid item>
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
					<FormControl>
						<FormLabel>Preferences: </FormLabel>
						<FormGroup
							onChange={e =>
								setTypes({ ...types, [e.target.name]: e.target.checked })
							}
						>
							<Grid container direction="row">
								<FormControlLabel
									control={<Checkbox name="Job" checked={types.Job} />}
									label="Job"
								/>
								<FormControlLabel
									control={
										<Checkbox name="Internship" checked={types.Internship} />
									}
									label="Internship"
								/>
								<FormControlLabel
									control={<Checkbox name="Project" checked={types.Project} />}
									label="Project"
								/>
							</Grid>
						</FormGroup>
					</FormControl>
				</Grid>
				<Grid item>
					<Button variant="contained" color="primary">
						Save
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}
