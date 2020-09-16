import React from "react"

import {
	ThemeProvider,
	createMuiTheme,
	CssBaseline,
	Container,
	makeStyles,
	// useMediaQuery,
} from "@material-ui/core"
import { blueGrey, amber } from "@material-ui/core/colors"
import { SnackbarProvider } from "notistack"

import Routes from "./Routes"
import Navigation from "./components/Navigation"
import { useAuth } from "./hooks"

const useStyles = makeStyles({
	container: {
		marginTop: 25,
	},
})

export default _ => {
	// const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
	const theme = createMuiTheme({
		palette: {
			// type: prefersDarkMode ? "dark" : "light",
			primary: {
				main: blueGrey[700],
				contrastText: "#fff",
			},
			secondary: {
				main: amber[700],
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
						vertical: "top",
						horizontal: "right",
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
