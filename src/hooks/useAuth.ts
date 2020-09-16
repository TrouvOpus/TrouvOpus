import React from "react"
import FirebaseContext from "../contexts/FirebaseContext"

export function useAuth(): {
	currentUser: firebase.User | null
} {
	const [currentUser, setCurrentUser] = React.useState<firebase.User | null>(
		null
	)
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
