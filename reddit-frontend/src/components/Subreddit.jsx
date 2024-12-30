import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post.jsx';

const Subreddit = ({ subreddit, userId }) => {
  const [posts, setPosts] = useState([]);

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  useEffect(() => {
    if (!isEmpty(subreddit)) {
        axios.get(`http://localhost:3000/posts/subreddit/${subreddit._id}`)
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching posts:', error));
    }
  }, [subreddit]);

  return (
    <div className="p-4">
            { !isEmpty(subreddit) &&  <h1 className="text-2xl font-bold mb-4">{subreddit.name}</h1>}
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <Post key={post._id} post={post} userId={userId}/>
        ))
      )}
    </div>
  );
};

export default Subreddit;
