import { useState, useEffect } from 'react';
import axios from 'axios';

const RSidebar = ( {userId, subreddits, setSubreddits, setFollowedSubreddits } ) => {

    useEffect(() => {
        axios.get('http://localhost:3000/subreddits')
            .then(response => {
                setSubreddits(response.data)
            })
            .catch(error => console.error('Error fetching subreddits:', error));
    }, [subreddits, setSubreddits]);

    const handleSubredditClick = (subredditId) => {
        if (userId && userId.length > 0) {
            axios.get(`http://localhost:3000/subreddits/follow/subreddit/${subredditId}`, { headers: { user_id: userId }})
                .then(response => {
                    console.log('Subreddit Followed', response.data);
                    const subreddit = response.data.subreddit;
                    setFollowedSubreddits(prevSubreddits => [...prevSubreddits, subreddit]);

            })
            .catch(error => console.error('Error fetching subreddit details:', error));
        }
    };

  return (
    <aside className="w-60 bg-white p-4 shadow-lg h-screen flex flex-col">
      <nav className="flex-grow">
        <h2 className="mt-4 mb-2 font-bold">All Communities</h2>
        <ul className="list-disc pl-5">
          {subreddits.map((subreddit) => (
            <li key={subreddit._id} onClick={() => handleSubredditClick(subreddit._id)} className="hover:underline cursor-pointer">
              {subreddit.name}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default RSidebar;
