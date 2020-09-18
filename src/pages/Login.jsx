import React from "react"
import {
	Grid,
	CircularProgress,
	Card,
	Box,
	TextField,
	Button,
	Tab,
} from "@material-ui/core"
import { TabList, TabPanel, TabContext } from "@material-ui/lab"
import { Redirect } from "react-router-dom"
import { useAuth } from "../hooks"
import { useSnackbar } from "notistack"
import FirebaseContext from "../contexts/FirebaseContext"

export default () => {
	const [isLoading, setIsLoading] = React.useState(false)
	const [tab, setTab] = React.useState("login")
	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")

	const { enqueueSnackbar } = useSnackbar()

	const { currentUser } = useAuth()
	const { Auth } = React.useContext(FirebaseContext)

	async function signIn(e) {
		e.preventDefault()
		setIsLoading(true)
		try {
			await Auth.signInWithEmailAndPassword(email, password)
			enqueueSnackbar("Logged in!", { variant: "success" })
		} catch (error) {
			enqueueSnackbar(error.message, {
				variant: "error",
			})
		}
		setIsLoading(false)
		clearForm()
	}

	async function signUp(e) {
		e.preventDefault()
		setIsLoading(true)
		try {
			await Auth.createUserWithEmailAndPassword(email, password)
			enqueueSnackbar("User created!", { variant: "success" })
		} catch (error) {
			enqueueSnackbar(error.message, {
				variant: "error",
			})
		}
		setIsLoading(false)
		clearForm()
	}

	async function signOut(e) {
		e.preventDefault()
		setIsLoading(true)
		try {
			await Auth.signOut()
			enqueueSnackbar("Logged out")
		} catch (error) {
			enqueueSnackbar(error.message, {
				variant: "error",
			})
		}
		setIsLoading(false)
		clearForm()
	}

	function clearForm() {
		setEmail("")
		setPassword("")
	}

	return (
		<div className="Login">
			{isLoading || currentUser === 0 ? (
				<Grid container alignItems="center" justify="center">
					<Grid item>
						<CircularProgress color="secondary" />
					</Grid>
				</Grid>
			) : currentUser ? (
				<Redirect to="/profile" />
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
							<form onSubmit={signIn}>
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
											type="email"
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
							<form onSubmit={signUp}>
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
											type="email"
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
