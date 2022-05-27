import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Posts from "../../Components/Posts/Posts";
import SideBar from "../../Components/SideBar/SideBar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const { search } = useLocation();
	console.log(search);

	const pages = new Array(totalPages).fill(null).map((v, i) => i);

	useEffect(() => {
		const fetchPosts = async () => {
			const user = search.slice(1);
			const res = await axios.get(`/post?page=${pageNumber}&${user}`);

			setPosts(res.data.posts);
			setTotalPages(res.data.totalPages);
		};
		fetchPosts();
	}, [pageNumber, search]);

	const previousPage = () => {
		setPageNumber(Math.max(0, pageNumber - 1));
	};

	const nextPage = () => {
		setPageNumber(Math.min(totalPages - 1, pageNumber + 1));
	};

	return (
		<>
			<Header />
			<div className="home">
				<Posts
					posts={posts}
					pages={pages}
					setPageNumber={setPageNumber}
					previousPage={previousPage}
					nextPage={nextPage}
				/>
				<SideBar />
			</div>
		</>
	);
}
