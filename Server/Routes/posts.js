const router = require("express").Router();
const Post = require("../Models/Post");

//CREATE POST
router.post("/", async (req, res) => {
	const newPost = new Post(req.body);

	try {
		console.log(newPost);
		const savedPost = await newPost.save();
		console.log(savedPost);
		res.status(200).json(savedPost);
	} catch (error) {
		res.status(500).json(error);
	}
});

//UPDATE POST
router.put("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.username === req.body.username) {
			try {
				const updatedPost = await Post.findByIdAndUpdate(
					req.params.id,
					{
						$set: req.body,
					},
					{ new: true }
				);
				res.status(200).json(updatedPost);
			} catch (error) {
				res.status(401).json("You can only update your own Post...");
			}
		}
	} catch (error) {
		//console.log(error);
		res.status(500).json(error);
	}
});

//DELETE
router.delete("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (req.body.username === post.username) {
			try {
				await post.delete();
				res.status(200).json("Post has been deleted...");
			} catch (error) {
				//console.log(error);
				res.status(500).json(error);
			}
		} else res.status(401).json("You can only delete your own Post...");
	} catch (error) {
		res.status(404).json("Post not Found...");
	}
});

//GET
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json(error);
	}
});

//GET ALL POSTS
router.get("/", async (req, res) => {
	console.log(req.query);
	const PAGE_SIZE = 2;
	const username = req.query.user;
	const categories = req.query.category;
	const page = parseInt(req.query.page);
	try {
		const total = await Post.countDocuments({});
		console.log(total);
		try {
			let posts;
			if (username)
				posts = await Post.find({ username })
					.limit(PAGE_SIZE)
					.skip(PAGE_SIZE * page);
			else if (categories)
				posts = await Post.find({ categories: { $in: [categories] } })
					.limit(PAGE_SIZE)
					.skip(PAGE_SIZE * page);
			else
				posts = await Post.find({})
					.limit(PAGE_SIZE)
					.skip(PAGE_SIZE * page);

			console.log({ posts, totalPages: Math.ceil(total / PAGE_SIZE) });
			res.status(200).json({ posts, totalPages: Math.ceil(total / PAGE_SIZE) });
		} catch (error) {
			res.status(500).json(error);
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
