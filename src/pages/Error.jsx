import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { Card, Box, Link } from "@material-ui/core"

export default () => (
	<div className="Error">
		<Card>
			<Box p={2}>
				<h1>Ummm.</h1>
				<p>Something went wrong.</p>
				<Link to="/" component={RouterLink}>
					Go home
				</Link>
			</Box>
		</Card>
	</div>
)
