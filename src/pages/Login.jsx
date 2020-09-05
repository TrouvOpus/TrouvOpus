import React from "react"
import FirebaseContext from "../contexts/FirebaseContext"
import {
	Grid,
	Card,
	TextField,
	Button,
	Tab,
	CircularProgress,
	Backdrop,
	Snackbar,
} from "@material-ui/core"
import { TabList, TabPanel, TabContext, Alert } from "@material-ui/lab"

export default () => {
	const [tab, setTab] = React.useState("login")
	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")
	const [isLoading, setIsLoading] = React.useState(false)
	const [successMsg, setSuccessMsg] = React.useState()
	const [errorMsg, setErrorMsg] = React.useState()

	const { Auth } = React.useContext(FirebaseContext)

	function clearForm() {
		setEmail("")
		setPassword("")
	}

	async function login() {
		let user
		try {
			setIsLoading(true)
			user = await Auth.signInWithEmailAndPassword(email, password)
			console.log("Logged in", user || Auth.currentUser)
			setSuccessMsg("Logged in!")
			clearForm()
		} catch (error) {
			console.error(error.code, error.message)
			setErrorMsg(error.message)
		} finally {
			setIsLoading(false)
		}
		return user
	}

	async function signup() {
		let user
		try {
			setIsLoading(true)
			user = await Auth.createUserWithEmailAndPassword(email, password)
			console.log("Created user", user || Auth.currentUser)
			setSuccessMsg("User created!")
			clearForm()
		} catch (error) {
			console.error(error.code, error.message)
			setErrorMsg(error.message)
		} finally {
			setIsLoading(false)
			console.log("Auth", Auth.currentUser)
		}
		return user
	}

	return (
		<div className="Login">
			<Backdrop open={isLoading}>
				<CircularProgress color="secondary" />
			</Backdrop>
			<Snackbar
				open={successMsg}
				autoHideDuration={5000}
				onClose={() => setSuccessMsg(undefined)}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Alert severity="success">{successMsg}</Alert>
			</Snackbar>
			<Snackbar
				open={errorMsg}
				autoHideDuration={5000}
				onClose={() => setErrorMsg(undefined)}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Alert severity="error">{errorMsg}</Alert>
			</Snackbar>
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
							onSubmit={e => {
								e.preventDefault()
								login()
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
							onSubmit={e => {
								e.preventDefault()
								signup(email, password)
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
		</div>
	)
}
