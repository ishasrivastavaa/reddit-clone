import { useState, useEffect } from 'react';
import axios from 'axios';

const Sidebar = ({ onShowCreatePostModal, onShowCreateCommunityModal, setView, setSubreddit, userId, subreddits, setSubreddits }) => {

  useEffect(() => {
    if(userId) {
        axios.get('http://localhost:3000/subreddits/followed', { headers: { user_id: userId }})
            .then(response => setSubreddits(response.data))
            .catch(error => console.error('Error fetching subreddits:', error));
    }
  }, [userId, subreddits, setSubreddits]);

  return (
    <aside className="w-60 bg-white p-4 shadow-lg h-screen flex flex-col">
      <nav className="flex-grow">
        <button onClick={onShowCreatePostModal} className="block w-full text-left py-2 px-4 hover:bg-gray-200 mt-4">Create a post</button>
        <button onClick={onShowCreateCommunityModal} className="block w-full text-left py-2 px-4 hover:bg-gray-200">Create a community</button>
                { subreddits.length > 0 && <h2 className="mt-4 mb-2 font-bold">Communities</h2> }
        <ul className="list-disc pl-5">
          {subreddits.map((subreddit) => (
            <li key={subreddit._id} className="hover:underline cursor-pointer" onClick={() => {setView(subreddit.name); setSubreddit(subreddit); }}>
              {subreddit.name}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
