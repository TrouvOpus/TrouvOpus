import React from "react"
import { Switch, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Error from "./pages/Error"
import Profile from "./pages/Profile"

export default () => (
	<div className="Routes">
		<Switch>
			<Route path="/login" component={Login} />
			<Route path="/profile" component={Profile} />
			<Route exact path="/" component={Home} />
			<Route component={Error} />
		</Switch>
	</div>
)
