const express = require('express');

const router = express.Router();

const User = require('../model/User');

const Post = require('../model/Post');

const Comment = require('../model/Comment');

// * POST - add user
router.post('/users', async (req, res) => {
	// console.log('Users route');
	const newUser = new User(req.body);
	try {
		await newUser.save();
		res.status(201).send(newUser);
	} catch (err) {
		// TODO: add response
		res.status(500).send();
	}
});

// * GET - get users
router.get('/users', async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (error) {
		res.status(404).send({ error: 'Path not found' });
	}
});

router.get('/users/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await User.findById(_id);
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
		res.send(user);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

// * PATCH  => update user
router.patch('/users/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	console.log(updates);
	const allowedUpdates = ['name'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Operation' });
	}

	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
		updates.forEach((update) => {
			user[update] = req.body[update];
		});
		await user.save();
		res.send(user);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

// * DELETE => delete user
router.delete('/users/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
		res.send(user);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});


//get all posts

router.get('/posts', async (req, res) => {
	try {
		const posts = await Post.find({});
		res.send(posts);
	} catch (error) {
		res.status(404).send({ error: 'Path not found' });
	}
});



//add a new post

router.post('/posts', async (req, res) => {
	const newPost = new Post(req.body);
	try {
		await newPost.save();
		res.status(201).send(newPost);
	} catch (err) {
		// TODO: add response
		res.status(500).send();
	}
});

//get post by id

router.get('/posts', async (req, res) => {
	const _id = req.params.id;
	try {
		const post = await Post.findById(_id);
		if (!post) {
			return res.status(404).send({ error: 'Post not found' });
		}
		res.send(post);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

//add a comment
router.post('/comments', async (req, res) => {
	const newCmnt = new Comment(req.body);
	try {
		await newCmnt.save();
		res.status(201).send(newCmnt);
	} catch (err) {
		// TODO: add response
		res.status(500).send();
	}
});

//get a commnet
router.get('/comments', async (req, res) => {
	try {
		const commnet = await Comment.find({});
		res.send(commnet);
	} catch (error) {
		res.status(404).send({ error: 'comment not found' });
	}
});



module.exports = router;
