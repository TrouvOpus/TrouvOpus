import React from "react"
import {
	Box,
	Grid,
	Button,
	Slider,
	TextField,
	IconButton,
} from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { Add, Delete } from "@material-ui/icons"
import { useMetadata } from "../hooks"

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

export default ({ skills, dispatch }) => {
	const skillSet = useMetadata("skillSet")

	function filterSkill() {
		let chosenSkill = skills && skills.map(s => s.title)
		return (
			(skillSet &&
				skillSet.options &&
				skillSet.options.sort().filter(s => chosenSkill.indexOf(s) === -1)) ||
			[]
		)
	}

	return (
		<Box p={2} width="100%">
			<Grid container direction="row" spacing={3}>
				{(dispatch ? skills : skills.sort((a, b) => b.rating - a.rating)).map(
					s => (
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
										<Box width={150}>{s.title}</Box>
									)}
									<Slider
										name={s.title}
										value={s.rating}
										min={0}
										max={10.0}
										onChange={
											dispatch
												? (event, newValue) => {
														dispatch(editSkill(s.id, "rating", newValue))
												  }
												: null
										}
										precision={0.5}
										valueLabelDisplay="auto"
									/>
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
					)
				)}
			</Grid>
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
