import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles/ManageContacts.css';

const ManageContacts = () => {
  const { dispatch } = useAppContext();
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const addContact = () => {
    if (!name || !id) {
      alert('Both name and ID are required!');
      return;
    }

    dispatch({
      type: 'ADD_CONTACT',
      payload: { id: Number(id), name },
    });

    setName('');
    setId('');
  };

  const deleteContact = () => {
    if (!id) {
      alert('ID is required to delete a contact!');
      return;
    }

    dispatch({
      type: 'DELETE_CONTACT',
      payload: Number(id),
    });

    setId('');
  };

  return (
    <div className="manage-contacts">
      <h3>Manage Contacts</h3>
      <div className="input-group">
        <input
          type="text"
          placeholder="Contact Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Contact ID (10 digits)"
          value={id}
          onChange={(e) => setId(e.target.value)}
          maxLength="10"
        />
      </div>
      <button onClick={addContact}>Add Contact</button>
      <button onClick={deleteContact}>Delete Contact</button>
    </div>
  );
};

export default ManageContacts;
