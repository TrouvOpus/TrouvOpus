import React from "react"
import { Switch, Route } from "react-router-dom"

import Error from "./pages/Error.jsx"

export default () => (
	<div className="Routes">
		<Switch>
			<Route exact path="/">
				<h1>TrouvOpus</h1>
			</Route>
			<Route component={Error} />
		</Switch>
	</div>
)
