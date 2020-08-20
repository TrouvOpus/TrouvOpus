import React, { useState } from "react"
import { Auth } from "../services/firebase"
import Card from "../components/Card"

async function login() {
	let user
	try {
		user = Auth.signInWithEmailAndPassword("rajatjacob@gmail.com", "passworddd")
	} catch (error) {
		console.error(error.code, error.message)
	}
	console.log("Logged in", user || Auth.currentUser)
	return user
}

async function logout() {
	let user
	try {
		user = Auth.signOut()
	} catch (error) {
		console.error(error.code, error.message)
	}
	console.log("Logged out")
	return user
}

export default () => {
	const [user, setUser] = useState()
	console.log(user)
	return (
		<div className="Login Page">
			<Card>
				<h1>Login</h1>
				{user != null ? (
					<button onClick={() => logout().then(u => setUser(u))}>Logout</button>
				) : (
					<button onClick={() => login().then(u => setUser(u))}>Login</button>
				)}
			</Card>
		</div>
	)
}
