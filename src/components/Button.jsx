import React from "react"
import "./Button.scss"

export default ({ children, type, onClick, disabled }) => (
	<button
		className={"Button" + (disabled ? " disabled" : "")}
		type={type}
		onClick={onClick}
	>
		{children}
	</button>
)
