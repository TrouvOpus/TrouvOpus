import React from "react"
import { Link } from "react-router-dom"
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core"
import { Person, Inbox, Message } from "@material-ui/icons"
import "./Navigation.scss"

export default () => {
	const [active, setActive] = React.useState("profile")
	return (
		<div className="Navigation">
			<BottomNavigation value={active} onChange={(e, n) => setActive(n)}>
				<BottomNavigationAction
					component={Link}
					to="/profile"
					value="profile"
					label="Profile"
					icon={<Person />}
				/>
				<BottomNavigationAction
					component={Link}
					to="/feed"
					value="feed"
					label="Feed"
					icon={<Inbox />}
				/>
				<BottomNavigationAction
					component={Link}
					to="/activity"
					value="activity"
					label="Activity"
					icon={<Message />}
				/>
			</BottomNavigation>
		</div>
	)
}
