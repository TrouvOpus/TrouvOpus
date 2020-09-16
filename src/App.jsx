import React from "react"
import "./App.scss"

import {
	ThemeProvider,
	createMuiTheme,
	CssBaseline,
	// useMediaQuery,
} from "@material-ui/core"
import { blueGrey, amber } from "@material-ui/core/colors"

import Routes from "./Routes"
import Navigation from "./components/Navigation"

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

	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routes />
				<Navigation />
			</ThemeProvider>
		</div>
	)
}
