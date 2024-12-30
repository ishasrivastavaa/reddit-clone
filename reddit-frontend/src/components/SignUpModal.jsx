import { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const SignUpModal = ({ setUserId, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const saltRounds = 10;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const salt = await bcrypt.genSalt(saltRounds); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt);
    axios.post('http://localhost:3000/users/register', { email, name, password:hashedPassword })
      .then(response => {
        console.log('Sign Up:', response.data);
        setUserId(response.data.user_id);
        onClose();
      })
      .catch(error => console.error('Error signing up:', error));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content p-4 rounded shadow-lg bg-white">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            className="mb-2 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            className="mb-2 p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-2 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
