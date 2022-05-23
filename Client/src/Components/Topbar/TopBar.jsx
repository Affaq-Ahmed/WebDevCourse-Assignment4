import React, { useContext } from "react";
import "./topbar.css";
import avatar from "../../images/avatar.jpg";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";

export default function TopBar() {
	const { user, dispatch } = useContext(Context);
	const PF = "http://localhost:5001/images/";

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
	};

	return (
		<div className="top d-flex">
			<div className="topLeft">
				<i className="topIcon fa-brands fa-facebook-square"></i>
				<i className="topIcon fa-brands fa-twitter-square"></i>
				<i className="topIcon fa-brands fa-pinterest-square"></i>
				<i className="topIcon fa-brands fa-instagram-square"></i>
			</div>
			<div className="topCenter">
				<ul className="topList">
					<li className="topListItem">
						<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
							HOME
						</Link>
					</li>
					<li className="topListItem">
						<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
							ABOUT
						</Link>
					</li>
					<li className="topListItem">
						<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
							CONTACT
						</Link>
					</li>
					<li className="topListItem">
						<Link
							to="/write"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							WRITE
						</Link>
					</li>
					<li className="topListItem" onClick={handleLogout}>
						{user && "LOGOUT"}
					</li>
				</ul>
			</div>
			<div className="topRight">
				{user ? (
					<Link
						to="/settings"
						style={{ textDecoration: "none", color: "inherit" }}
					>
						<img className="topImg" src={PF + user.profilePic} alt="avatar" />
					</Link>
				) : (
					<ul className="topList">
						<li className="topListItem">
							<Link
								to="/login"
								style={{ textDecoration: "none", color: "inherit" }}
							>
								LOGIN
							</Link>
						</li>
						<li className="topListItem">
							<Link
								to="/register"
								style={{ textDecoration: "none", color: "inherit" }}
							>
								REGISTER
							</Link>
						</li>
					</ul>
				)}
				<i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
			</div>
		</div>
	);
}
