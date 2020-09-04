import React from "react"
import "./App.scss"

import Routes from "./Routes"
import Navigation from "./components/Navigation"

export default _ => (
	<div className="App">
		<Routes />
		<Navigation />
	</div>
)
