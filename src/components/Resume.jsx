import React from "react"
import {
	Grid,
	TextField,
	Radio,
	RadioGroup,
	FormControl,
	FormControlLabel,
	FormLabel,
} from "@material-ui/core"

export default _ => {
	const [genderValue, setGenderValue] = React.useState()
	const handleChange = event => {
		setGenderValue(event.target.value)
	}
	return (
		<div className="Resume">
			<Grid container direction="column" justify="center" spacing={3}>
				<TextField label="Name" />
				<Grid container direction="row" spacing={3}>
					<Grid item>
						<TextField label="Email id" />
					</Grid>
					<Grid item>
						<TextField label="Phone" />
					</Grid>
				</Grid>
				<FormControl>
					<FormLabel>Gender</FormLabel>
					<RadioGroup>
						<Grid container direction="row">
							<FormControlLabel
								value="Male"
								control={<Radio />}
								label="Male"
								checked={genderValue === "Male"}
								onChange={handleChange}
							/>
							<FormControlLabel
								value="Female"
								control={<Radio />}
								label="Female"
								checked={genderValue === "Female"}
								onChange={handleChange}
							/>
							<FormControlLabel
								value="Other"
								control={<Radio />}
								label="Other"
								checked={genderValue === "Other"}
								onChange={handleChange}
							/>
						</Grid>
					</RadioGroup>
				</FormControl>
				<TextField
					id="DOB"
					type="date"
					label="DOB"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField label="University" />
			</Grid>
		</div>
	)
}
