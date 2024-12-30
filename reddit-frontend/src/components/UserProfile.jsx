import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UserProfile = ({ userId, subreddits }) => {
    const [upvotes, setUpvotes] = useState(0);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        if (userId) {
            axios.get('http://localhost:3000/posts', { headers: { user_id: userId } })
                .then(response => {
                    setPosts(response.data);
                    var count = 0;
                    posts.map((p) => count += p.likes.length);
                    setUpvotes(count);
                })
                .catch(error => console.error('Error fetching subreddits:', error));
        }
    }, [userId, posts]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <h2 className="text-xl font-semibold mb-2">Subscribed Subreddits</h2>
            <ul className="list-disc pl-5">
                {subreddits.map((subreddit) => (
                    <li key={subreddit.name}>{subreddit.name}</li>
                ))}
            </ul>
            <h2 className="text-xl font-semibold mt-4">Total Upvotes: {upvotes}</h2>
        </div>
    );
};

export default UserProfile;
