import "./login.css";
import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import axios from "axios";

export default function Login() {
	const userRef = useRef();
	const passRef = useRef();
	const { dispatch, isFetching } = useContext(Context);
	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "LOGIN_START" });
		try {
			const res = await axios.post("/auth/login", {
				username: userRef.current.value,
				password: passRef.current.value,
			});
			dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
		} catch (error) {
			dispatch({ type: "LOGIN_FAILURE" });
		}
	};

	return (
		<div className="login">
			<span className="loginTitle">Login</span>
			<form onSubmit={handleSubmit} className="loginForm">
				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					id="username"
					placeholder="Enter your username..."
					ref={userRef}
					autoFocus={true}
					required
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="Enter your password"
					ref={passRef}
					required
				/>
				<button type="submit" className="loginSubmit" disabled={isFetching}>
					Login
				</button>
				<hr className="w-100" />
			</form>

			<button className="loginRegisterButton">
				<Link
					to="/register"
					style={{ textDecoration: "none", color: "inherit" }}
				>
					Register
				</Link>
			</button>
		</div>
	);
}
