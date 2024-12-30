const express = require('express');
const { getDb } = require('../config/mongodb');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
    const db = await getDb();
        const subreddits = await db.collection('subreddits').find({}).toArray();
        res.status(200).json(subreddits);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


router.get('/followed', async (req, res) => {
    try {
        const user_id = req.get('user_id');
        const db = await getDb();
        const user = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

        const objectIds = user.subreddits.map(id => new ObjectId(id));
        const documents = await db.collection('subreddits').find({ _id: { $in: objectIds } }).toArray();

        res.status(200).json(documents);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const subredditId = req.params.id;
    const db = await getDb();

    try {
        const subreddit = await db.collection('subreddits').findOne({ _id: new ObjectId(subredditId) });
        if (!subreddit) {
            return res.status(404).json({ message: 'Subreddit not found' });
        }
        res.json(subreddit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/new', async (req, res) => {
    try {
        const user_id = req.get('userid');
        const { name } = req.body;
        const db = await getDb();

        if (!name) {
            res.status(400).json({ message: 'Invalid Request' });
        }
        const newSubreddit = { name, author: user_id  };
        const result = await db.collection('subreddits').insertOne(newSubreddit);

        const updatedUser = await db.collection('users').updateOne(
            { _id: new ObjectId(user_id) },
            { $push: { subreddits: result.insertedId } }
        );

        res.status(201).json(result.insertedId);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.get('/follow/subreddit/:id', async (req, res) => {
    try {
        const user_id = req.get('user_id');
        const subreddit_id = req.params.id;
        const db = await getDb();

        const user = await db.collection('users').findOne({ _id: new ObjectId(user_id) });
        const subreddit = await db.collection('subreddits').findOne({ _id: new ObjectId(subreddit_id) });
        if (!subreddit) {
            return res.status(404).json({ message: 'Invalid Subredit Id' });
        }
        if (user.subreddits.includes(subreddit_id)) {
            return res.status(400).json({ message: 'Subreddit already followed' });
        }

        const updatedUser = await db.collection('users').updateOne(
            { _id: new ObjectId(user_id) },
            { $push: { subreddits: subreddit_id } }
        );
        res.status(200).json({ message: 'Subreddit followed successfully', subreddit });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
