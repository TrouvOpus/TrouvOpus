import React from "react"
import { Switch, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Error from "./pages/Error"
import Profile from "./pages/Profile"
import Feed from "./pages/Feed"
import Ads from "./pages/Ads"
import { useAuth } from "./hooks"

export default () => {
	const { currentUser } = useAuth()
	return (
		<div className="Routes">
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/profile" component={Profile} />
				<Route path="/feed">
					<Feed type="applicant" uid={currentUser && currentUser.uid} />
				</Route>
				<Route path="/ads" component={Ads} />
				<Route exact path="/" component={Home} />
				<Route component={Error} />
			</Switch>
		</div>
	)
}
