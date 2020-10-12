import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import Typography from "@material-ui/core/Typography"
import { Box, Grid } from "@material-ui/core"

const work = ["Work From Home", "Internship", "Full Time", "Part Time"]

function SimpleDialog(props) {
	const { onClose, selectedValue, open } = props

	const handleClose = () => {
		onClose(selectedValue)
	}

	const handleListItemClick = value => {
		onClose(value)
	}

	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="simple-dialog-title"
			open={open}
		>
			<DialogTitle id="simple-dialog-title">Select Work Type</DialogTitle>
			<List>
				{work.map(wk => (
					<ListItem button onClick={() => handleListItemClick(wk)} key={wk}>
						<ListItemText primary={wk} />
					</ListItem>
				))}
			</List>
		</Dialog>
	)
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
}

export default function () {
	const [open, setOpen] = React.useState(false)
	const [selectedValue, setSelectedValue] = React.useState(work[1])

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = value => {
		setOpen(false)
		setSelectedValue(value)
	}

	return (
		<Box p={4} width="100%">
			<Grid container direction="row" spacing={3}>
				<Grid container direction="row" spacing={3}>
					<Grid item>
						<Typography variant="subtitle1"> {selectedValue}</Typography>
						<Box width={150}></Box>
					</Grid>
					<Grid item>
						<Box p={1} borderColor="transparent">
							<Button
								variant="outlined"
								color="primary"
								size="small"
								onClick={handleClickOpen}
							>
								Select
							</Button>
							<SimpleDialog
								selectedValue={selectedValue}
								open={open}
								onClose={handleClose}
							/>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
}
