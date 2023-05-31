import React, { useState } from 'react';
import '../styles/editcontact.css';

const EditContact = ({ contact, onSaveContact, onCancel }) => {
  const [editedContact, setEditedContact] = useState(contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSaveContact(editedContact);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="card edit-contact">
      <h2>Edit Contact</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedContact.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={editedContact.username}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={editedContact.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={editedContact.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="button-container">
          <button type="button" onClick={handleSave} className="btn save-btn">
            Save
          </button>
          <button type="button" onClick={handleCancel} className="btn cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContact;
