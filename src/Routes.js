import React from "react"
import { Switch, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Error from "./pages/Error"
import Profile from "./pages/Profile"
import Feed from "./pages/Feed"
import Ads from "./pages/Ads"

export default () => (
	<div className="Routes">
		<Switch>
			<Route path="/login" component={Login} />
			<Route path="/profile" component={Profile} />
			<Route path="/feed" component={Feed} />
			<Route path="/ads" component={Ads} />
			<Route exact path="/" component={Home} />
			<Route component={Error} />
		</Switch>
	</div>
)
