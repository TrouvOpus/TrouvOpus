import React from "react"
import Months from "../components/Months"
import {
	Grid,
	TextField,
	Select,
	InputLabel,
	MenuItem,
} from "@material-ui/core"

export default _ => {
	return (
		<div className="Ads">
			<Grid container direction="column" justify="center" spacing={3}>
				<TextField label="Advertisement Tagline" />
				<Grid container direction="row" spacing={1}>
					<Grid item>
						<InputLabel id="label">Category</InputLabel>
						<Select labelId="label" id="select" direction="row" spacing={3}>
							<MenuItem value="1">Software</MenuItem>
							<MenuItem value="2">Marketing</MenuItem>
							<MenuItem value="3">Business</MenuItem>
							<MenuItem value="4">Technology</MenuItem>
							<MenuItem value="5">Hardware</MenuItem>
							<MenuItem value="6">Health</MenuItem>
							<MenuItem value="7">Law</MenuItem>
							<MenuItem value="8">Civil Services</MenuItem>
							<MenuItem value="9">Other</MenuItem>
						</Select>
					</Grid>
					<Grid item>
						<TextField label="Company Name" />
					</Grid>
					<Grid container direction="row" spacing={3}>
						<Grid item>
							<TextField label="Job Title/Designation" />
						</Grid>
					</Grid>
					<Grid item>
						<Months></Months>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}
