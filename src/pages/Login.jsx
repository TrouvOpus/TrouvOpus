import React from "react"
import Card from "../components/Card"
import FirebaseContext from "../contexts/FirebaseContext"
import AuthContext from "../contexts/AuthContext"
import { useContext } from "react"
import { Link } from "react-router-dom"

export default () => {
	const { Auth } = useContext(FirebaseContext)

	async function login() {
		let user
		try {
			user = await Auth.signInWithEmailAndPassword(
				"rajatjacob@gmail.com",
				"passworddd"
			)
		} catch (error) {
			console.error(error.code, error.message)
		}
		console.log("Logged in", user || Auth.currentUser)
		return user
	}

	async function logout() {
		let user
		try {
			user = await Auth.signOut()
		} catch (error) {
			console.error(error.code, error.message)
		}
		console.log("Logged out")
		return user
	}

	const [user] = useContext(AuthContext)

	return (
		<div className="Login Page">
			<Card>
				<h1>Login</h1>
				{user ? (
					<button onClick={() => logout()}>Logout</button>
				) : (
					<button onClick={() => login()}>Login</button>
				)}
				<Link to="/">Home</Link>
			</Card>
		</div>
	)
}
