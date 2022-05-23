import "./register.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError(false);
			const res = await axios.post("/auth/register", {
				username,
				email,
				password,
			});
			console.log(res);
			res.data && window.location.replace("/login");
		} catch (error) {
			setError(true);
		}
	};

	return (
		<div className="register">
			<span className="registerTitle">Register</span>
			<form onSubmit={handleSubmit} className="registerForm">
				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					id="username"
					placeholder="Enter your username..."
					onChange={(e) => setUsername(e.target.value)}
					autoFocus={true}
					required
				/>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Enter your email..."
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="Enter your password..."
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit" className="registerSubmit">
					Register
				</button>
				<hr className="w-100" />
			</form>
			<button className="registerLoginButton">
				<Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
					Login
				</Link>
			</button>
			{error && (
				<span style={{ color: "red", fontSize: "30px" }}>
					Something went wrong!
				</span>
			)}
		</div>
	);
}
