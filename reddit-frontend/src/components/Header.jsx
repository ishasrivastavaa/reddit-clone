import React from 'react';

const Header = ({ setView, onShowSignInModal, onShowSignUpModal }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-red-500 text-white">
      <div className="text-xl font-bold">Reddit Clone</div>
      <nav>
        <button onClick={() => setView('home')} className="ml-4">Home</button>
        <button onClick={() => setView('profile')} className="ml-4">Profile</button>
        <button onClick={onShowSignInModal} className="ml-4">Sign In</button>
        <button onClick={onShowSignUpModal} className="ml-4">Sign Up</button>
      </nav>
    </header>
  );
};

export default Header;
