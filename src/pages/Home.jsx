import React from "react"
import { Button, Grid } from "@material-ui/core"
import { Link } from "react-router-dom"
import { useAuth, useData } from "../hooks"

export default () => {
	const { currentUser } = useAuth()
	const { getAllItems } = useData()
	const [users, setUsers] = React.useState([])

	React.useEffect(() => {
		getAllItems("users").then(u => setUsers(u))
	}, [getAllItems])

	return (
		<div className="Home Page">
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
				spacing={2}
			>
				<Grid item>
					<h1>TrouvOpus</h1>
				</Grid>
				{!currentUser && (
					<Grid item>
						<Button
							color="primary"
							variant="contained"
							expand="block"
							component={Link}
							to="/login"
						>
							Login
						</Button>
					</Grid>
				)}
				{users && Object.keys(users).map(u => <div>{u}</div>)}
			</Grid>
		</div>
	)
}
