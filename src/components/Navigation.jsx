import React from "react"
import { Link, useLocation } from "react-router-dom"
import {
	BottomNavigation,
	BottomNavigationAction,
	makeStyles,
} from "@material-ui/core"
import { Person, Inbox, Message, Home, PostAdd } from "@material-ui/icons"

const useStyles = makeStyles({
	root: {
		position: "fixed",
		bottom: 0,
		left: 0,
		right: 0,
	},
})

const links = [
	{
		to: "/",
		name: "Home",
		icon: <Home />,
	},
	{
		to: "/profile",
		name: "Profile",
		icon: <Person />,
	},
	{
		to: "/feed",
		name: "Feed",
		icon: <Inbox />,
	},
	{
		to: "/ads",
		name: "My Ads",
		icon: <PostAdd />,
	},
	{
		to: "/activity",
		name: "Activity",
		icon: <Message />,
	},
]

export default () => {
	const classes = useStyles()
	const location = useLocation()

	return (
		<div className="Navigation">
			<BottomNavigation value={location.pathname} className={classes.root}>
				{links.map(link => (
					<BottomNavigationAction
						component={Link}
						key={link.to}
						to={link.to}
						value={link.to}
						label={link.name}
						icon={link.icon}
					/>
				))}
			</BottomNavigation>
		</div>
	)
}
