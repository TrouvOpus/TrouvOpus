import React, { createContext, useReducer, useContext, useEffect } from "react"
import FirebaseContext from "./FirebaseContext"

const AuthContext = createContext()

export const actionType = {
	SET_USER: "SET_USER",
}

export const AuthContextProvider = ({ children }) => {
	const { Auth } = useContext(FirebaseContext)

	const initalState = Auth.currentUser

	const UserReducer = (state, action) => {
		switch (action.type) {
			case actionType.SET_USER:
				return action.user || Auth.currentUser
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(UserReducer, initalState)

	useEffect(
		() =>
			Auth.onAuthStateChanged(u =>
				dispatch({ type: actionType.SET_USER, user: u })
			),
		[Auth, dispatch]
	)

	return (
		<AuthContext.Provider value={[state, dispatch]}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext
