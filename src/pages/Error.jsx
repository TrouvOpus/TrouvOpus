import React from "react"
import { Link } from "react-router-dom"

export default () => (
	<div className="Error">
		<h1>Ummm.</h1>
		<p>Something went wrong.</p>
		<Link to="/">Go home</Link>
	</div>
)
