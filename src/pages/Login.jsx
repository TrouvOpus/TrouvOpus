import React, { useState, useContext } from "react"
import Card from "../components/Card"
import FirebaseContext from "../contexts/FirebaseContext"
import AuthContext from "../contexts/AuthContext"
import Input from "../components/Input"
import Button from "../components/Button"

export default () => {
	const { Auth } = useContext(FirebaseContext)

	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [isLoading, setIsLoading] = useState(false)

	async function login(email, password) {
		let user
		try {
			setIsLoading(true)
			user = await Auth.signInWithEmailAndPassword(email, password)
		} catch (error) {
			console.error(error.code, error.message)
		} finally {
			setIsLoading(false)
		}
		console.log("Logged in", user || Auth.currentUser)
		return user
	}

	async function logout() {
		let user
		try {
			setIsLoading(true)
			user = await Auth.signOut()
		} catch (error) {
			console.error(error.code, error.message)
		} finally {
			setIsLoading(false)
		}
		console.log("Logged out", user || Auth.currentUser)
		return user
	}

	const [user] = useContext(AuthContext)

	return (
		<div className="Login Page">
			<Card>
				{user ? (
					<>
						Welcome {user.email}!
						<Button onClick={() => logout()}>Sign Out</Button>
					</>
				) : (
					<>
						<h1>Login</h1>
						<form
							onSubmit={e => {
								e.preventDefault()
								login(email, password)
							}}
						>
							<Input
								title="E-mail Address"
								value={email}
								autoComplete="username"
								onChange={e => setEmail(e.target.value)}
							/>
							<Input
								title="Password"
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<Button type="submit">
								{isLoading ? "Signing in" : "Sign In"}
							</Button>
						</form>
					</>
				)}
			</Card>
		</div>
	)
}
