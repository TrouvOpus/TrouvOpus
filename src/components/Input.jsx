import React from "react"
import "./Input.scss"

export default ({
	type = "text",
	title,
	autoComplete,
	value = "",
	onChange,
}) => {
	return (
		<div className="Input">
			<label>{title}</label>
			<input
				type={type}
				autoComplete={autoComplete}
				value={value}
				onChange={onChange}
			></input>
		</div>
	)
}
