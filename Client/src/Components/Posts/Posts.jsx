import React, { useState } from "react";
import Post from "../Post/Post";
import "./posts.css";

export default function Posts({ posts, pages, setPageNumber, previousPage, nextPage }) {
	console.log(posts);
	return (
		<>
			<div className="posts">
				{posts.map((post, key) => {
					return <Post key={key} post={post} />;
				})}
			</div>
			<div className="pagination">
				<button onClick={previousPage}>previous</button>
				{pages.map((pageIndex, key) => {
					return (
						<button key={key} onClick={() => setPageNumber(pageIndex)}>
							{pageIndex + 1}
						</button>
					);
				})}
				<button onClick={nextPage}>next</button>
			</div>
		</>
	);
}
