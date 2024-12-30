const express = require('express');
const { getDb } = require('../config/mongodb');
const { ObjectId } = require('mongodb');
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const db = await getDb();

        const post = await db.collection('posts').findOne({ _id: new ObjectId(postId) });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/comments/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const db = await getDb();

        const post = await db.collection('posts').findOne({ _id: new ObjectId(postId) });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post.comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const user_id = req.get('user_id');
        const db = await getDb();
        var posts = await db.collection('posts').find({}).toArray();
        if(user_id) {
            posts = posts.filter(post => post.author === user_id);
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/subreddit/:id', async (req, res) => {
    try {
        const db = await getDb();
        const subreddit_id = req.params.id;
        const posts = await db.collection('posts').find({ subreddit_id: subreddit_id }).toArray();
        res.status(200).json(posts);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.get('/like/:id', async (req, res) => {
    try {
        const user_id = req.get('userid');
        const postId = req.params.id;
        const db = await getDb();
        const post = await db.collection('posts').findOne( { _id: new ObjectId(postId) });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const likes = post.likes.length;
        if(post.likes.includes(user_id)) {
            return res.status(200).json({message: 'Post Already Liked', likes: likes })
        }

        const updatedPost = await db.collection('posts').updateOne(
            { _id: new ObjectId(postId) },
            { $push: { likes: user_id } }
        );

        res.status(200).json({ message: 'Post liked successfully', likes: likes+1 });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.post('/new', async (req, res) => {
    try {
        const user_id = req.get('userid');
        const db = await getDb();
        const { title, body, subreddit_id } = req.body;

        if (!user_id || !title || !body) {
            res.send(400).json({ message: 'Invalid Request' });
        }
        const newPost = { title, body, author: user_id, subreddit_id, likes: [], comments:[], createdAt: new Date() };
        const result = await db.collection('posts').insertOne(newPost);
        res.status(201).json(result.insertedId);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/comment/:id', async (req, res) => {
    try {
        const user_id = req.get('userid');
        const { comment } = req.body;
        const db = await getDb();
        const postId = req.params.id;
        const post = await db.collection('posts').findOne({ _id: new ObjectId(postId) });
        if (!post) {
            return res.status(404).json({ message: 'Invalid Post Id' });
        }
        var comments = post.comments;
        const commentObject = { author: user_id, comment: comment };
        const updatedPost = await db.collection('posts').updateOne(
            { _id: new ObjectId(postId) },
            { $push: { comments: commentObject } }
        );
        comments.push(commentObject);
        res.status(200).json({ message: 'Comment posted successfully', comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
