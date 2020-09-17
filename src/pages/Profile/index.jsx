import React from "react"
import {
	Container,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Button,
} from "@material-ui/core"
import { ExpandMore, AccountCircle, Settings } from "@material-ui/icons"

import { withSnackbar } from "notistack"

import { useAuth } from "../../hooks"
import FirebaseContext from "../../contexts/FirebaseContext"

import Preferences from "./Preferences"
import Profile from "./Profile"

export default withSnackbar(({ enqueueSnackbar }) => {
	const [active, setActive] = React.useState("Profile")
	const { currentUser } = useAuth()
	const { Auth } = React.useContext(FirebaseContext)

	return (
		<div className="Profile">
			{!currentUser ? (
				"TODO: Redirect to Login"
			) : (
				<>
					<Accordion
						expanded={active === "Profile"}
						onChange={() => setActive("Profile")}
					>
						<AccordionSummary expandIcon={<ExpandMore />}>
							<h1>
								<AccountCircle color="primary" fontSize="large" />
							</h1>
							<h1>Profile</h1>
						</AccordionSummary>
						<Container>
							<AccordionDetails>
								<Profile />
							</AccordionDetails>
						</Container>
					</Accordion>
					<Accordion
						expanded={active === "Preferences"}
						onChange={() => setActive("Preferences")}
					>
						<AccordionSummary expandIcon={<ExpandMore />}>
							<h1>
								<Settings color="primary" fontSize="large" />
							</h1>
							<h1>Preferences</h1>
						</AccordionSummary>
						<AccordionDetails>
							<Container>
								<Preferences />
							</Container>
						</AccordionDetails>
					</Accordion>
					<Box my={2}>
						<Button
							variant="outlined"
							color="secondary"
							onClick={async () => {
								try {
									await Auth.signOut()
									enqueueSnackbar("Logged out")
								} catch (error) {
									enqueueSnackbar(error.message, { variant: "error" })
								}
							}}
						>
							Log Out
						</Button>
					</Box>
				</>
			)}
		</div>
	)
})
