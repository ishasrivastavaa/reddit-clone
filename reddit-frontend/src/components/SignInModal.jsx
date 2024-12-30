import React, { useState } from 'react';
import axios from 'axios';

const SignInModal = ({ onClose, setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/users/login', { email, password })
      .then(response => {
        console.log(response.data);
        setUserId(response.data.user_id);
        onClose();
      })
      .catch(error => console.error('Error signing in:', error));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content p-4 rounded shadow-lg bg-white">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            className="mb-2 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-2 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;
