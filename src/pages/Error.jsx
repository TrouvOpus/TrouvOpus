import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { Card, Container, Box, Link } from "@material-ui/core"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import { Button } from "@material-ui/core"

const action = (
	<Button color="secondary" size="small" href="Feed">
		See the matches
	</Button>
)

const action2 = (
	<Button color="secondary" size="small" href="EditProfile">
		Add Skills
	</Button>
)
export default () => (
	<div className="Error">
		<Card>
			<Container>
				<Box p={2}>
					<SnackbarContent
						message="There are 3 matches available for you"
						action={action}
					/>
				</Box>
				<Box p={2}>
					<SnackbarContent
						message="Do you still have some skills to showcase?"
						action={action2}
					/>
				</Box>
			</Container>
		</Card>
	</div>
)
