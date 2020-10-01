import React from "react"
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import { makeStyles } from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"

const messages = [
	{
		id: 1,
		primary: "You are matched with a prestigious company",
		secondary: "Hindustan Pvt Ltd has liked your profile.",
		company: "",
	},
	{
		id: 2,
		primary: "You have new job profiles to browse",
		secondary:
			"New Companies like Infosys and Intel have joined TrouvOpus. Take a look now!",
		company: "",
	},
	{
		id: 3,
		primary: "New Company has selected you",
		secondary: "Microsoft India has liked your profile",
		company: "",
	},
	{
		id: 4,
		primary: "Any Skills to share?",
		secondary: "Update your profile to get the maximum matching percentage",
		company: "",
	},
	{
		id: 5,
		primary: "You have new job profiles to browse",
		secondary: "Take a look now",
		company: "",
	},
]

const useStyles = makeStyles(theme => ({
	text: {
		padding: theme.spacing(2, 2, 0),
	},
	paper: {
		paddingBottom: 50,
	},
	list: {
		marginBottom: theme.spacing(2),
	},
	subheader: {
		backgroundColor: theme.palette.background.paper,
	},
	appBar: {
		top: "auto",
		bottom: 0,
	},
	grow: {
		flexGrow: 1,
	},
	fabButton: {
		position: "absolute",
		zIndex: 1,
		top: -30,
		left: 0,
		right: 0,
		margin: "0 auto",
	},
}))
export default () => {
	const classes = useStyles()

	return (
		<React.Fragment>
			<Paper square className={classes.paper}>
				<Typography className={classes.text} variant="h5" gutterBottom>
					Notifications
				</Typography>
				<List className={classes.list}>
					{messages.map(({ id, primary, secondary, company }) => (
						<React.Fragment key={id}>
							{id === 1 && (
								<ListSubheader className={classes.subheader}>
									Today
								</ListSubheader>
							)}
							{id === 3 && (
								<ListSubheader className={classes.subheader}>
									Yesterday
								</ListSubheader>
							)}
							<ListItem button>
								<ListItemAvatar>
									<Avatar alt="Profile Picture" src={company} />
								</ListItemAvatar>
								<ListItemText primary={primary} secondary={secondary} />
							</ListItem>
						</React.Fragment>
					))}
				</List>
			</Paper>
		</React.Fragment>
	)
}
