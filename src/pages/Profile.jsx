import React from "react"
import Card from "../components/Card"
import "./Profile.scss"
import { Link } from "react-router-dom"

export default () => {
	return (
		<div className="Profile Page">
			<Card>
				<h1>Profile</h1>
				<div className="Sub">
					<Link to="/">Resume</Link>
					<Link to="/">My Ads</Link>
					<Link to="/">Settings</Link>
				</div>
			</Card>
		</div>
	)
}
