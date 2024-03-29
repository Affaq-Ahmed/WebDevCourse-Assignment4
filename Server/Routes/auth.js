const router = require("express").Router();
const User = require("./../Models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(req.body.password, salt);
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPass,
		});

		const user = await newUser.save();
		user && res.status(201).json("User Created...");
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

//LOGIN
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		!user && res.status(400).json("User not Found...");

		const validated = await bcrypt.compare(req.body.password, user.password);
		!validated && res.status(400).json("Wrong Password...");

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
