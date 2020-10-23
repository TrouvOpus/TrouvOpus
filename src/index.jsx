import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter as Router } from "react-router-dom"
import chat from "./components/chat"

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
		<Router>
			<chat />
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
)

serviceWorker.register()
