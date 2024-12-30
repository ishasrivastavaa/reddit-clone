import axios from 'axios';
import Comments from './Comments.jsx';
import { useState, useEffect} from 'react';

const UPost = ({ post }) => {

    const [likes, setLikes] = useState(post.likes.length || 0);
    const [comments, setComments] = useState(post.comments || []);

  // useEffect(() => {
  //   axios.get(`http://localhost:3000/posts/comments/${post._id}`)
  //     .then(response => setComments(response.data.comments || []))
  //     .catch(error => console.error('Error fetching comments:', error));
  // }, [comments, post]);

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="mb-2">{post.body}</p>
      <button className="bg-red-500 text-white px-4 py-2 rounded">Upvote</button>
      <span className="ml-2">{likes}</span>
    </div>
  );
};

export default UPost;
