import TopBar from "./Components/Topbar/TopBar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Settings from "./Pages/Settings/Settings";
import Single from "./Pages/SinglePost/Single";
import Write from "./Pages/Write/Write";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context/Context";

function App() {
	const { user } = useContext(Context);
	return (
		<Router>
			<TopBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={user ? <Home /> : <Register />} />
				<Route path="/login" element={user ? <Home /> : <Login />} />
				<Route path="/post/:postId" element={<Single />} />
				<Route path="/settings" element={user ? <Settings /> : <Register />} />
				<Route path="/write" element={user ? <Write /> : <Register />} />
			</Routes>
		</Router>
	);
}

export default App;
