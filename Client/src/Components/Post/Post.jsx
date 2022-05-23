import "./post.css";
import React from "react";
import post from "../../images/post.jpg";
import { Link } from "react-router-dom";

export default function Post({ post }) {
	const PF = "http://localhost:5001/images/";
	return (
		<div className="post">
			{post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
			<div className="postInfo">
				<div className="postCats">
					{post.categories.map((category, key) => {
						return (
							<span key={key} className="postCat">
								{category}
							</span>
						);
					})}
				</div>
				<Link
					to={`/post/${post._id}`}
					style={{ textDecoration: "none", color: "inherit" }}
				>
					<span className="postTitle">{post.title}</span>
				</Link>
				<span className="postDate">
					{new Date(post.createdAt).toDateString()}
				</span>
			</div>
			<p className="postDesc">{post.description}</p>
		</div>
	);
}
