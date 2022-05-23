import "./write.css";
import React, { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";

export default function Write() {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [file, setFile] = useState(null);
	const { user } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(user);
		const newPost = {
			username: user.username,
			title,
			desc,
		};
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);
			newPost.photo = filename;
			try {
				await axios.post("/upload", data);
			} catch (error) {}
		}
		try {
			const res = await axios.post("/post", newPost);
			window.location.replace("/post/" + res.data._id);
		} catch (error) {}
	};

	return (
		<div className="write">
			{file && (
				<img src={URL.createObjectURL(file)} alt="" className="writeImg" />
			)}

			<form className="writeForm" onSubmit={handleSubmit}>
				<div className="writeFormGroup">
					<label htmlFor="fileInput">
						<i className="writeIcon fas fa-plus"></i>
					</label>
					<input
						type="file"
						name="fileInput"
						id="fileInput"
						onChange={(e) => setFile(e.target.files[0])}
						style={{ display: "none" }}
					/>
					<input
						type="text"
						name="title"
						id="title"
						placeholder="Title"
						className="writeInput"
						onChange={(e) => setTitle(e.target.value)}
						autoFocus={true}
					/>
				</div>
				<div className="writeFormGroup">
					<textarea
						placeholder="Tell your Story..."
						className="writeInput writeText"
						onChange={(e) => setDesc(e.target.value)}
						name="desc"
						id="desc"
						cols="30"
						rows="10"
					></textarea>
				</div>
				<button type="submit" className="writeSubmit">
					Publish
				</button>
			</form>
		</div>
	);
}
