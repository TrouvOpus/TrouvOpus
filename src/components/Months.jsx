import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Slider from "@material-ui/core/Slider"

const useStyles = makeStyles(theme => ({
	root: {
		width: 250,
	},
	margin: {
		height: theme.spacing(3),
	},
}))

const marks = [
	{
		value: 10,
		label: "1 Months",
	},
	{
		value: 35,
		label: "3 Months",
	},
	{
		value: 65,
		label: "6 Months",
	},
	{
		value: 100,
		label: "12 Months",
	},
]

function valuetext(value) {
	return `${value}°C`
}

export default function TrackFalseSlider() {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Typography id="track-false-slider" gutterBottom>
				Month Duration
			</Typography>
			<Slider
				track={false}
				aria-labelledby="track-false-slider"
				getAriaValueText={valuetext}
				defaultValue={30}
				marks={marks}
			/>
			<div className={classes.margin} />
		</div>
	)
}
