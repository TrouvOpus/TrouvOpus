import React from "react"
import {
	Grid,
	Dialog,
	DialogActions,
	Button,
	DialogTitle,
	DialogContent,
	FormControlLabel,
	Radio,
	FormLabel,
	RadioGroup,
	TextField,
	useTheme,
	useMediaQuery,
	CircularProgress,
} from "@material-ui/core"
import { withSnackbar } from "notistack"

export default withSnackbar(({ enqueueSnackbar, open, onClose, uid }) => {
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))
	const [reportdetails, setreportdetails] = React.useState()
	const [isLoading, setIsLoading] = React.useState(false)

	function submit() {
		setIsLoading(true)
		enqueueSnackbar("Your report has been submitted.", { variant: "success" })
		onClose && onClose()
	}

	return (
		<Dialog
			open={true}
			onClose={onClose}
			fullScreen={fullScreen}
			scroll="paper"
		>
			<form
				onSubmit={event => {
					event.preventDefault()
					submit()
				}}
			>
				<DialogTitle>
					<Grid container justify="space-between" alignItems="center">
						<Grid item>Customer Support Page</Grid>
					</Grid>
				</DialogTitle>
				<DialogContent dividers>
					{isLoading ? (
						<CircularProgress />
					) : (
						<Grid item>
							<Grid container direction="row" spacing={1}>
								<Grid item>
									<FormLabel>Why do you want to report this ad?</FormLabel>
									<RadioGroup>
										<Grid item>
											<FormControlLabel
												value="exp"
												control={<Radio />}
												label="Inappropriate/Explicit Content"
											/>
										</Grid>
										<Grid item>
											<FormControlLabel
												value="spam"
												control={<Radio />}
												label="Spam"
											/>
										</Grid>
										<Grid item>
											<FormControlLabel
												value="other"
												control={<Radio />}
												label="Other"
											/>
										</Grid>
									</RadioGroup>
									<Grid></Grid>
									<Grid item>
										<TextField
											label="If other, please specify:"
											value={reportdetails}
											multiline
											fullWidth
											onChange={e => setreportdetails(e.target.value)}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					)}
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							onClose && onClose()
						}}
					>
						Cancel
					</Button>
					<Button type="submit" variant="contained" color="primary">
						Submit
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
})
