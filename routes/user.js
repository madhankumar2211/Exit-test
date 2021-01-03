const express = require('express');

const router = express.Router();

const User = require('../model/User');

const Post = require('../model/Post');

const Comment = require('../model/Comment');

//1. add a new user
router.post('/addUser', async (req, res) => {
	const newUser = new User(req.body);
	try {
		await newUser.save();
		res.status(201).send(newUser);
	} catch (err) {
		res.status(500).send();
	}
});

//2. get all users
router.get('/', async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (error) {
		res.status(404).send({ error: 'Path not found' });
	}
});

//3. get user by id
router.get('/getUser/:id', async (req, res) => {
	const userId = req.params.id;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
		res.send(user);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

//4. update a user
router.patch('/updateUser/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name','phone','username'];
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

//5. delete a user
router.delete('/deleteUser/:id', async (req, res) => {
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

//6. get all posts

router.get('/posts', async (req, res) => {
	try {
		const posts = await Post.find({});
		res.send(posts);
	} catch (error) {
		res.status(404).send({ error: 'Path not found' });
	}
});

//7. add a new post

router.post('/:id/addPost', async (req, res) => {
	const newPost = new Post(req.body);
	const userId = req.params.id;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
		newPost.userId = user.id;
		await newPost.save();
		res.status(201).send(newPost);
	} catch (err) {
		res.status(500).send();
	}
});

//8. delete a post from user
router.delete('/:id/deletePost/:pid', async (req, res) => {
	const userId = req.params.id;
	const postId = req.params.pid;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
		const post = await Post.findByIdAndDelete(postId);
		if (!post) {
			return res.status(404).send({ error: 'Post not found' });
		}
		res.send(post);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});


//9. add a comment
router.post('/:id/posts/:pid/addComment', async (req, res) => {
	const newCmnt = new Comment(req.body);
	const postId = req.params.pid;
	const userId = req.params.id;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).send({ error: 'Post not found' });
		}
		newCmnt.postId = post.id;
		await newCmnt.save();
		res.status(201).send(newCmnt);
	} catch (err) {
		res.status(500).send();
	}
});

//10. delete a comment from a post
router.delete('/:id/posts/:pid/deleteComment/:cid', async (req, res) => {
	const userId = req.params.id;
	const postId = req.params.pid;
	const cmntId = req.params.cid;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).send({ error: 'Post not found' });
		}
		const comment = await Comment.findByIdAndDelete(cmntId);
		if (!comment) {
			return res.status(404).send({ error: 'Comment not found' });
		}
		res.send(comment);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

module.exports = router;