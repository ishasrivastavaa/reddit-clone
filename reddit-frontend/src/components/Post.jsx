import axios from 'axios';
import Comments from './Comments.jsx';
import { useState, useEffect} from 'react';

const Post = ({ post, userId }) => {

    const [likes, setLikes] = useState(post.likes.length || 0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post.comments);

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/comments/${post._id}`, {headers: {userid: userId}})
      .then(response => setComments(response.data.comments))
      .catch(error => console.error('Error fetching comments:', error));
  }, [post, userId]);

  const handleUpvote = () => {
    axios.get(`http://localhost:3000/posts/like/${post._id}`, { headers: { userid: userId}})
      .then(response => {
        console.log('Post liked:', response.data);
        setLikes(response.data.likes);
      })
      .catch(error => console.error('Error liking post:', error));
  };
  const handleComment = () => {
    axios.post(`http://localhost:3000/posts/comment/${post._id}`, { comment: comment }, { headers: { userid: userId}})
      .then(response => {
        console.log('Comment Posted:', response.data);
        setComment('');
        setComments(response.data.comments);
      })
      .catch(error => console.error('Error liking post:', error));
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="mb-2">{post.body}</p>
      <button onClick={handleUpvote} className="bg-red-500 text-white px-4 py-2 rounded">Upvote</button>
      <span className="ml-2">{likes}</span>
      <div className='flex'>
        <textarea
            className="w-96 p-4 my-4 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="1"
            placeholder="Write your comment here..." onChange={(e) => setComment(e.target.value)}></textarea>
        <button onClick={handleComment} className="bg-red-500 mx-4 my-4 h-10 text-white px-4 py-2 rounded">Comment</button>
      </div>
      <div className="mt-4">
      {!comments || comments.length === 0 ? (
        <p>No comments available</p>
      ) : (
        comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded mt-2">{comment.comment}</div>
        ))
      )}
    </div>
    </div>
  );
};

export default Post;
