import React from "react"
import { Switch, Route } from "react-router-dom"

import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Dashboard from "./pages/Dashboard"
import Feed from "./pages/Feed"
import Ads from "./pages/Ads"
import Activity from "./pages/Activity"
import Home from "./pages/Home"
import Error from "./pages/Error"
import CustomerSupport from "./pages/CustomerSupport"
import Chat from "./components/chat"

import { useAuth } from "./hooks"

export default () => {
	const { currentUser } = useAuth()
	return (
		<div className="Routes">
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/profile" component={Profile} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/feed">
					<Feed type="applicant" uid={currentUser && currentUser.uid} />
				</Route>
				<Route path="/ads" component={Ads} />
				<Route path="/activity" component={Activity} />
				<Route path="/chat" component={Chat} />
				<Route path="/cs">
					<CustomerSupport></CustomerSupport>
				</Route>
				<Route exact path="/" component={Home} />
				<Route component={Error} />s
			</Switch>
		</div>
	)
}
