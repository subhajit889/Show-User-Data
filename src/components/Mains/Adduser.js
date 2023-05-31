import React, { useState } from 'react';
import '..//styles/adduser.css';

const AddUser = ({ onAddUser, onCancel }) => {
  const [newUser, setNewUser] = useState({ name: '', username: '', email: '', phone: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    
    if (!newUser.name || !newUser.username || !newUser.email || !newUser.phone) {
      setError('Please fill in all fields.');
      return;
    }
    
    onAddUser(newUser);
    setNewUser({ name: '', username: '', email: '', phone: '' });
    setError('');
  };

  const handleCancel = () => {
    onCancel();
    setNewUser({ name: '', username: '', email: '', phone: '' });
    setError('');
  };

  return (
    <form className="add-user-form" onSubmit={handleAddUser}>
      <h2>Create a New User</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newUser.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={newUser.username}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newUser.email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={newUser.phone}
        onChange={handleInputChange}
      />
      <div>
        <button type="submit">Add User </button>
        <button type="button" className="cancel-btn" onClick={handleCancel}>
  Cancel
</button>

      </div>
    </form>
  );
};

export default AddUser;

