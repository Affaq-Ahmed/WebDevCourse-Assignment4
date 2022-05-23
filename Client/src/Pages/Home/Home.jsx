import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Posts from "../../Components/Posts/Posts";
import SideBar from "../../Components/SideBar/SideBar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const { search } = useLocation();
	console.log(search);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await axios.get("/post" + search);
			setPosts(res.data);
		};
		fetchPosts();
	}, [search]);

	return (
		<>
			<Header />
			<div className="home">
				<Posts posts={posts} />
				<SideBar />
			</div>
		</>
	);
}
