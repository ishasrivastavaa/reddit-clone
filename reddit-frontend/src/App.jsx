import { useState } from 'react';
import Subreddit from './components/Subreddit.jsx';
import UserProfile from './components/UserProfile.jsx';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import RSidebar from './components/RSidebar.jsx';
import CreatePostModal from './components/CreatePostModal.jsx';
import CreateCommunityModal from './components/CreateCommunityModal.jsx';
import SignInModal from './components/SignInModal.jsx';
import SignUpModal from './components/SignUpModal.jsx';
import './App.css';
import Posts from './components/Posts.jsx';

function App() {
  const [view, setView] = useState('home');
  const [subreddit, setSubreddit] = useState({});
  const [followedSubreddits, setFollowedSubreddits] = useState([]);
  const [allSubreddits, setAllSubreddits] = useState([]);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showCreateCommunityModal, setShowCreateCommunityModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  return (
    <>
      <Header
        setView={setView}
        onShowSignInModal={() => setShowSignInModal(true)}
        onShowSignUpModal={() => setShowSignUpModal(true)}
      />
      <div className="flex h-screen">
        <Sidebar
          setView={setView}
          setSubreddit={setSubreddit}
          subreddits={followedSubreddits}
          setSubreddits={setFollowedSubreddits}
          userId={userId}
          onShowCreatePostModal={() => setShowCreatePostModal(true)}
          onShowCreateCommunityModal={() => setShowCreateCommunityModal(true)}
        />
        <main className="flex-grow p-4 overflow-y-auto">
          {view === 'home' && <Posts />}
          {view === 'profile' && <UserProfile userId={userId} subreddits={followedSubreddits}/>}
          {view !== 'home' && view !== 'profile' && <Subreddit subreddit={subreddit} userId={userId} />}
        </main>
        <RSidebar
            userId={userId}
            setFollowedSubreddits={setFollowedSubreddits}
            subreddits={allSubreddits}
            setSubreddits={setAllSubreddits}
        />
      </div>
      {showCreatePostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <CreatePostModal onClose={() => setShowCreatePostModal(false)} userId={userId} />
        </div>
      )}
      {showCreateCommunityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <CreateCommunityModal onClose={() => setShowCreateCommunityModal(false)} userId={userId} />
        </div>
      )}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <SignInModal setUserId={setUserId} onClose={() => setShowSignInModal(false)} />
        </div>
      )}
      {showSignUpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <SignUpModal setUserId={setUserId} onClose={() => setShowSignUpModal(false)} />
        </div>
      )}
    </>
  );
}

export default App;

