import React from "react"
import { Switch, Route } from "react-router-dom"

import Error from "./pages/Error.jsx"
import Login from "./pages/Login.jsx"

export default () => (
	<div className="Routes">
		<Switch>
			<Route exact path="/">
				<h1>TrouvOpus</h1>
			</Route>
			<Route path="/login" component={Login} />
			<Route component={Error} />
		</Switch>
	</div>
)
