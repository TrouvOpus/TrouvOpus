import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Slide from "@material-ui/core/Slide"
import FavoriteIcon from "@material-ui/icons/Favorite"
import IconButton from "@material-ui/core/IconButton"
import { Rating } from "@material-ui/lab"
import Box from "@material-ui/core/Box"

const Skill = ({ name, rating }) => (
	<>
		<Box p={1}>{name}</Box>
		<Rating name="read-only" value={rating} readOnly></Rating>
	</>
)

const Company = ({ cname }) => (
	<>
		<Box p={1}>{cname}</Box>
	</>
)
const Details = ({ details }) => (
	<>
		<Box p={1}>{details}</Box>
	</>
)
const Work = ({ work }) => (
	<>
		<Box p={1}>{work}</Box>
	</>
)
const Time = ({ time }) => (
	<>
		<Box p={1}>{time}</Box>
	</>
)
const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
})
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

export default function OutlinedCard() {
	const classes = useStyles()
	const bull = <span className={classes.bullet}>•</span>
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}
	return (
		<Card className={classes.root} variant="outlined">
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					Required Skills
				</Typography>
				<Skill name="C Programming" rating={4} />
				<Skill name="Java" rating={2} />
				<Skill name="React" rating={3} />
			</CardContent>
			<CardActions>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<Button color="primary" onClick={handleClickOpen}>
					More Details
				</Button>
				<Dialog
					open={open}
					TransitionComponent={Transition}
					keepMounted
					onClose={handleClose}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle id="alert-dialog-slide-title">
						{"Application Details"}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-slide-description">
							<Typography>
								Company Name:<Company cname="Infosys"></Company>
								Company Details:
								<Details details="A well renowned IT Company. Apply to get in touch with the employer if you have the specific skills."></Details>
								Type of Work:
								<Work work="Work From Home"></Work>
								Duration:
								<Time time="6 Months"></Time>
							</Typography>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							{"Exit"}
						</Button>
					</DialogActions>
				</Dialog>
			</CardActions>
		</Card>
	)
}
