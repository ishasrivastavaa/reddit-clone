import React, { useState } from 'react';
import axios from 'axios';

const CreateCommunityModal = ({ onClose, userId }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/subreddits/new', { name }, { headers: { userid: userId } })
      .then(response => {
        console.log('Community created:', response.data);
        onClose();
      })
      .catch(error => console.error('Error creating community:', error));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content p-4 rounded shadow-lg bg-white">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="text-2xl font-bold mb-4">Create Community</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            placeholder="Name"
            className="mb-2 p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Create Community</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunityModal;
