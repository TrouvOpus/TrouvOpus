import React from "react"
import { Switch, Route } from "react-router-dom"

import Card from "./components/Card"

import Error from "./pages/Error.jsx"
import Login from "./pages/Login.jsx"
import Profile from "./pages/Profile.jsx"

export default () => (
	<div className="Routes">
		<Switch>
			<Route exact path="/">
				<Card>
					<h1>TrouvOpus.</h1>
				</Card>
			</Route>
			<Route path="/login" component={Login} />
			<Route path="/profile" component={Profile} />
			<Route component={Error} />
		</Switch>
	</div>
)
