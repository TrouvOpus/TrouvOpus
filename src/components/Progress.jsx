import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"

const useStylesFacebook = makeStyles(theme => ({
	root: {
		position: "relative",
	},
	bottom: {
		color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
	},
	top: {
		color: theme.palette.secondary.main,
		animationDuration: "550ms",
		position: "absolute",
		left: 0,
	},
	circle: {
		strokeLinecap: "round",
	},
}))

export default props => {
	const classes = useStylesFacebook()

	return (
		<div className={classes.root}>
			<CircularProgress
				variant="static"
				className={classes.bottom}
				size={40}
				thickness={4}
				value={100}
			/>
			<CircularProgress
				variant="static"
				disableShrink
				className={classes.top}
				classes={{
					circle: classes.circle,
				}}
				size={40}
				thickness={4}
				value={props.value || 0}
			/>
		</div>
	)
}
