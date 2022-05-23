import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./singlePost.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";

export default function SinglePost() {
	const [post, setPost] = useState("");
	const location = useLocation();
	const path = location.pathname.split("/")[2];
	const PF = "http://localhost:5001/images/";
	const { user } = useContext(Context);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [updateMode, setUpdateMode] = useState(false);

	const handleDelete = async () => {
		try {
			await axios.delete(`/post/${post._id}`, {
				data: { username: user.username },
			});
			window.location.replace("/");
		} catch (error) {}
	};

	const handleUpdate = async () => {
		try {
			await axios.put(`/post/${post._id}`, {
				username: post.username,
				title,
				desc,
			});
			setUpdateMode(false);
		} catch (error) {}
	};

	useEffect(() => {
		const getPost = async () => {
			const res = await axios.get("/post/" + path);
			setPost(res.data);
			setTitle(res.data.title);
			setDesc(res.data.desc);
		};
		getPost();
	}, [path]);
	return (
		<div className="singlePost">
			<div className="singlePostWrapper">
				{post.photo && (
					<img src={PF + post.photo} alt="" className="singlePostImg" />
				)}
				{updateMode ? (
					<input
						type="text"
						value={title}
						className="singlePostTitleInput"
						onChange={(e) => setTitle(e.target.value)}
					/>
				) : (
					<h1 className="singlePostTitle">
						{post.title}
						{post.username === user?.username && (
							<div className="singlePostEdit">
								<i
									className="singlePostIcon far fa-edit"
									onClick={() => setUpdateMode(true)}
								></i>
								<i
									className="singlePostIcon far fa-trash-alt"
									onClick={handleDelete}
								></i>
							</div>
						)}
					</h1>
				)}

				<div className="singlePostInfo">
					<span className="singlePostAuthor">
						Author:
						<Link
							to={`/?user=${post.username}`}
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<b>{post.username}</b>
						</Link>
					</span>
					<span className="singlePostDate">
						Date: <b>{new Date(post.createdAt).toDateString()}</b>
					</span>
				</div>
				{updateMode ? (
					<textarea
						value={desc}
						className="singlePostDescInput"
						onChange={(e) => setDesc(e.target.value)}
					/>
				) : (
					<p className="singlePostDesc">{desc}</p>
				)}
				{updateMode && (
					<button className="singlePostButton" onClick={handleUpdate}>
						Update
					</button>
				)}
			</div>
		</div>
	);
}
