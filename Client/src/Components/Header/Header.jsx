import React from "react";
import "./header.css";
import image from "../../images/blog.jpg";

export default function Header() {
	return (
		<div className="header">
			<div className="headerTiles">
				<span className="headerTilesSm">IntelVilla</span>
				<span className="headerTilesLg">Blog</span>
			</div>
			<img src={image} alt="" className="headerImg" />
		</div>
	);
}
