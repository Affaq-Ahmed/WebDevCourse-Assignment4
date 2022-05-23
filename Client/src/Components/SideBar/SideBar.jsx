import React, { useEffect, useState } from "react";
import "./sidebar.css";
import avatar from "../../images/avatar.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SideBar() {
	const [cats, setCats] = useState([]);

	useEffect(() => {
		const getCategories = async () => {
			const res = await axios.get("/category");
			setCats(res.data);
		};
		getCategories();
	});

	return (
		<div className="sidebar">
			<div className="sidebarItem">
				<span className="sidebarTitle">ABOUT ME</span>
				<img src={avatar} alt="of-me" />
				<p className="sidebarDesc">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
					doloremque obcaecati magni soluta nihil,
				</p>
			</div>
			<div className="sidebarItem">
				<span className="sidebarTitle">CATEGORIES</span>
				<ul className="sidebarList">
					{cats.map((cat, key) => {
						return (
							<Link
								key={key}
								to={`/?category=${cat.name}`}
								style={{ textDecoration: "none", color: "inherit" }}
							>
								<li className="sidebarListItem">{cat.name}</li>
							</Link>
						);
					})}
				</ul>
			</div>
			<div className="sidebarItem">
				<span className="sidebarTitle">FOLLOW US</span>
				<ul className="sidebarSocial">
					<i className="sidebarIcon fa-brands fa-facebook-square"></i>
					<i className="sidebarIcon fa-brands fa-twitter-square"></i>
					<i className="sidebarIcon fa-brands fa-pinterest-square"></i>
					<i className="sidebarIcon fa-brands fa-instagram-square"></i>
				</ul>
			</div>
		</div>
	);
}
