import React from "react"
import { Switch, Route } from "react-router-dom"

import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Error from "./pages/Error.jsx"
import Profile from "./pages/Profile.jsx"

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
