const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const authRoute = require("./Routes/auth");
const usersRoute = require("./Routes/users");
const postsRoute = require("./Routes/posts");
const categoriesRoute = require("./Routes/categories");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
	.connect(process.env.MONGO_URL)
	.then(console.log("Connected to MongoDB..."))
	.catch((err) => {
		console.error(err);
	});

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
	res.status(200).json("File has been Uploaded...");
});

app.use("/api/auth", authRoute);
app.use("/api/user", usersRoute);
app.use("/api/post", postsRoute);
app.use("/api/category", categoriesRoute);

app.listen("5001", () => {
	console.log("Backend is running...");
});
