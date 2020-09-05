import React from "react"
import { Switch, Route } from "react-router-dom"

import Login from "./pages/Login.jsx"
import Error from "./pages/Error.jsx"
import Profile from "./pages/Profile.jsx"

export default () => (
	<div className="Routes">
		<Switch>
			<Route path="/login" component={Login} />
			<Route exact path="/">
				<h1>TrouvOpus</h1>
			</Route>
			<Route path="/profile" component={Profile} />
			<Route component={Error} />
		</Switch>
	</div>
)
