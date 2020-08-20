import React from "react"
import "./Card.scss"

export default ({ children, noContainer = false }) => (
	<div className="Card container">
		{noContainer ? { children } : <div className="container">{children}</div>}
	</div>
)
