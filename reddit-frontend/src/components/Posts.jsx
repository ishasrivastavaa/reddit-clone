import { useState, useEffect } from 'react';
import axios from 'axios';
import UPost from './UPost.jsx';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
        axios.get(`http://localhost:3000/posts`)
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="p-4">
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <UPost key={post._id} post={post} />
        ))
      )}
    </div>
  );
};

export default Posts;
