import React from "react";
import Post from "../Post/Post";
import "./posts.css";

export default function Posts({ posts }) {
	return (
		<div className="posts">
			{posts.map((post, key) => {
				return <Post key={key} post={post} />;
			})}
		</div>
	);
}
