import React from "react"
import { Switch, Route } from "react-router-dom"

import Card from "./components/Card"

import Error from "./pages/Error.jsx"
import Login from "./pages/Login.jsx"

export default () => (
	<div className="Routes">
		<Switch>
			<Route exact path="/">
				<Card>
					<h1>TrouvOpus.</h1>
				</Card>
			</Route>
			<Route path="/login" component={Login} />
			<Route component={Error} />
		</Switch>
	</div>
)
