import React from "react"
import { Box, Grid, Button, TextField, IconButton } from "@material-ui/core"
import { Autocomplete, Rating } from "@material-ui/lab"
import { Add, Delete } from "@material-ui/icons"

export const skillReducer = (state, action) => {
	switch (action.type) {
		case "ADD":
			return [
				...state,
				{
					id: Math.random(),
					title: action.title || "",
					rating: action.rating || 0,
				},
			]
		case "EDIT":
			let copy = [...state]
			if (action.key && action.value)
				copy[copy.findIndex(x => x.id === action.id)][action.key] = action.value
			return copy
		case "REMOVE":
			return action.id ? state.filter(s => s.id !== action.id) : state
		case "CLEAR":
			return []
		default:
			return state
	}
}

export const skillSet = ["React", "JavaScript", "CSS", "SQL", "PHP"]

export function addSkill(title = "", rating = 0) {
	return { type: "ADD", title: title, rating: rating }
}

export function editSkill(id, key, value) {
	return { type: "EDIT", id: id, key: key, value: value }
}

export function removeSkill(id) {
	return { type: "REMOVE", id: id }
}

export function clearSkills() {
	return { type: "CLEAR" }
}

const SCALE = 10.0 / 5.0 // dataScale / uiScale

export default ({ skills, dispatch }) => {
	function filterSkill() {
		let chosenSkill = skills.map(s => s.title)
		return skillSet.filter(s => chosenSkill.indexOf(s) === -1)
	}

	return (
		<Box p={2}>
			{skills.map(s => (
				<Grid item key={s.id}>
					<Grid container direction="row" spacing={3}>
						<Grid item>
							{dispatch ? (
								<Autocomplete
									disableClearable
									options={filterSkill()}
									getOptionSelected={o => o || null}
									style={{ width: 200 }}
									renderInput={skills => (
										<TextField {...skills} label="Skill set" />
									)}
									value={s.title}
									onChange={(event, newValue) =>
										dispatch(editSkill(s.id, "title", newValue))
									}
								/>
							) : (
								s.title
							)}
						</Grid>
						<Grid item>
							<Box p={dispatch ? 3 : 0}>
								<Rating
									name={s.title}
									value={s.rating / SCALE}
									readOnly={!dispatch}
									onChange={
										dispatch
											? (event, newValue) => {
													dispatch(editSkill(s.id, "rating", newValue * SCALE))
											  }
											: null
									}
									precision={0.5}
								/>
							</Box>
						</Grid>
						{dispatch ? (
							<Grid item>
								<Box p={1} borderColor="transparent">
									<IconButton
										aria-label="delete"
										onClick={() => dispatch(removeSkill(s.id))}
									>
										<Delete />
									</IconButton>
								</Box>
							</Grid>
						) : null}
					</Grid>
				</Grid>
			))}
			{dispatch ? (
				<Button
					color="primary"
					expand="block"
					startIcon={<Add />}
					onClick={() => dispatch(addSkill())}
					disabled={filterSkill().length === 0}
				>
					Add skill
				</Button>
			) : null}
		</Box>
	)
}
