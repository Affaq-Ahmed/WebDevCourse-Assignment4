import "./settings.css";
import React, { useContext, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import { Context } from "../../Context/Context";
import axios from "axios";

export default function Settings() {
	const [file, setFile] = useState(null);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState(false);

	const { user, dispatch } = useContext(Context);

	const PF = "http://localhost:5001/images/";

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "UPDATE_START" });
		console.log(user);
		const updatedUser = {
			userId: user._id,
			username,
			email,
			password,
		};
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);
			updatedUser.profilePic = filename;
			try {
				await axios.post("/upload", data);
			} catch (error) {
				dispatch({ type: "UPDATE_FAILURE" });
			}
		}
		try {
			const res = await axios.put("/user/" + user._id, updatedUser);
			console.log(res);
			setSuccess(true);
			dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
		} catch (error) {
			dispatch({ type: "UPDATE_FAILURE" });
		}
	};

	return (
		<div className="settings">
			<div className="settingsWrapper">
				<div className="settingsTitle">
					<span className="settingsUpdateTitle">Update Your Account</span>
					<span className="settingsDeleteTitle">Delete Your Account</span>
				</div>
				<form onSubmit={handleSubmit} className="settingsForm">
					<label htmlFor="">Profile Picture</label>
					<div className="settignsPP">
						<img
							src={file ? URL.createObjectURL(file) : PF + user.profilePic}
							alt=""
							className="settingsImg"
						/>
						<label htmlFor="fileInput">
							<i className="settingsPPIcon far fa-user-circle"></i>
						</label>
						<input
							type="file"
							id="fileInput"
							onChange={(e) => setFile(e.target.files[0])}
							style={{ display: "none" }}
						/>
					</div>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						onChange={(e) => setUsername(e.target.value)}
						placeholder={user.username}
					/>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
						placeholder={user.email}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type="submit" className="settingsSubmit">
						Update
					</button>
					{success && (
						<span
							style={{ color: "green", textAlign: "center", marginTop: "20px" }}
						>
							Your Profile has been Updated...
						</span>
					)}
				</form>
			</div>
			<SideBar />
		</div>
	);
}
