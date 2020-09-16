import React from "react"
import { Grid, Card, Box, TextField, Button, Tab } from "@material-ui/core"
import { TabList, TabPanel, TabContext } from "@material-ui/lab"
import { useAuth } from "../hooks"

export default () => {
	const [tab, setTab] = React.useState("login")
	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")

	const {
		currentUser,
		signInWithEmailAndPassword,
		signUpWithEmailAndPassword,
		signOut,
	} = useAuth()

	function clearForm() {
		setEmail("")
		setPassword("")
	}

	return (
		<div className="Login">
			{currentUser ? (
				<Card>
					<Box p={2}>
						<Grid
							container
							direction="column"
							justify="center"
							alignItems="center"
							spacing={2}
						>
							<Grid item>{currentUser && currentUser.email} is logged in!</Grid>
							<Grid item>
								<Button
									color="primary"
									variant="contained"
									expand="block"
									type="submit"
									onClick={() => signOut()}
								>
									Logout
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Card>
			) : (
				<Card>
					<TabContext value={tab}>
						<TabList
							onChange={(e, n) => {
								setTab(n)
								clearForm()
							}}
							variant="fullWidth"
						>
							<Tab value="login" label="Login" />
							<Tab value="signup" label="Sign Up" />
						</TabList>
						<TabPanel value="login">
							<form
								onSubmit={async e => {
									e.preventDefault()
									await signInWithEmailAndPassword(email, password)
									clearForm()
								}}
							>
								<Grid
									container
									direction="column"
									justify="center"
									alignItems="center"
									spacing={2}
								>
									<Grid item>
										<TextField
											label="E-mail Address"
											value={email}
											onChange={e => setEmail(e.target.value)}
										/>
									</Grid>
									<Grid item>
										<TextField
											label="Password"
											type="password"
											value={password}
											onChange={e => setPassword(e.target.value)}
										/>
									</Grid>
									<Grid item>
										<Button
											color="primary"
											variant="contained"
											expand="block"
											type="submit"
										>
											Login
										</Button>
									</Grid>
								</Grid>
							</form>
						</TabPanel>
						<TabPanel value="signup">
							<form
								onSubmit={async e => {
									e.preventDefault()
									await signUpWithEmailAndPassword(email, password)
									clearForm()
								}}
							>
								<Grid
									container
									direction="column"
									justify="center"
									alignItems="center"
									spacing={2}
								>
									<Grid item>
										<TextField
											label="E-mail Address"
											value={email}
											onChange={e => setEmail(e.target.value)}
										/>
									</Grid>
									<Grid item>
										<TextField
											label="Password"
											type="password"
											value={password}
											onChange={e => setPassword(e.target.value)}
										/>
									</Grid>
									<Grid item>
										<Button
											color="primary"
											variant="contained"
											expand="block"
											type="submit"
										>
											Create an Account
										</Button>
									</Grid>
								</Grid>
							</form>
						</TabPanel>
					</TabContext>
				</Card>
			)}
		</div>
	)
}
