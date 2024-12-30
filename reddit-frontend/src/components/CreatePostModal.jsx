import { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePostModal = ({ onClose, userId }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [subreddit, setSubreddit] = useState('');
  const [subreddits, setSubreddits] = useState([]);

  useEffect(() => {
    if(userId) {
        axios.get('http://localhost:3000/subreddits/followed', { headers: { user_id: userId }})
            .then(response => {
                setSubreddits(response.data);
            })
            .catch(error => console.error('Error fetching subreddits:', error));
    }
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/posts/new', { title, body, subreddit_id: subreddit }, { headers: { userid: userId } })
      .then(response => {
        console.log('Post created:', response.data);
        onClose();
      })
      .catch(error => console.error('Error creating post:', error));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content p-4 rounded shadow-lg bg-white">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="text-2xl font-bold mb-4">Create Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <select className="mb-2 p-2 border rounded" value={subreddit} onChange={(e) => setSubreddit(e.target.value)}>
            <option value="">Select a community</option>
            {subreddits.map((subreddit) => (
                <option key={subreddit._id} value={subreddit._id}>
                    {subreddit.name}
                </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Title"
            maxLength="300"
            className="mb-2 p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Body"
            className="mb-2 p-2 border rounded"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
