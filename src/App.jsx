import React from "react"

import {
	ThemeProvider,
	createMuiTheme,
	CssBaseline,
	Container,
	makeStyles,
	useMediaQuery,
} from "@material-ui/core"
import { cyan, amber } from "@material-ui/core/colors"
import { SnackbarProvider } from "notistack"

import Routes from "./Routes"
import Navigation from "./components/Navigation"
import { useAuth } from "./hooks"

const useStyles = makeStyles({
	container: {
		marginTop: 25,
		marginBottom: 75,
	},
})

export default _ => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)") && false
	const theme = createMuiTheme({
		palette: {
			type: prefersDarkMode ? "dark" : "light",
			primary: {
				main: "#2D4059",
				contrastText: "#fff",
			},
			secondary: {
				main: "#EA5455",
			},
		},
	})

	const classes = useStyles()

	const { currentUser } = useAuth()

	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<SnackbarProvider
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left",
					}}
				>
					<CssBaseline />
					<Container maxWidth="md" className={classes.container}>
						<Routes />
					</Container>
					{currentUser && <Navigation />}
				</SnackbarProvider>
			</ThemeProvider>
		</div>
	)
}
