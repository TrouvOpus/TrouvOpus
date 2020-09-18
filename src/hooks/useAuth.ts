import React from "react"
import FirebaseContext from "../contexts/FirebaseContext"

export function useAuth(): {
	currentUser: firebase.User | null | 0
} {
	const [currentUser, setCurrentUser] = React.useState<
		firebase.User | null | 0
	>(0)
	const { Auth } = React.useContext(FirebaseContext)

	React.useEffect(() => {
		Auth.onAuthStateChanged(user => {
			setCurrentUser(user)
		})
	}, [Auth])

	return {
		currentUser,
	}
}
