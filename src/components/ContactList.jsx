import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useInstantDB } from '../hooks/useInstantDB';
import '../styles/ContactList.css';

const ContactList = () => {
  const { state, dispatch } = useAppContext();
  const { addContact, showContacts } = useInstantDB();
  const [newContact, setNewContact] = useState({ id: '', name: '' });

  const { isLoading, error, contactList } = showContacts();
  console.log(contactList)

  if (isLoading) return <div className="placeholder">Loading Contacts...</div>;
  if (error) return <div className="placeholder">Error loading Contacts : {error.message}</div>;

  const handleAddContact = async () => {
    if (!newContact.id || !newContact.name) return;
    try {
      await addContact(newContact.id, newContact.name, contactList);
      dispatch({ type: 'ADD_CONTACT', payload: newContact });
      dispatch({type: 'SET_CONTACTS', payload: contactList});
      setNewContact({ id: '', name: '' });
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  // const handleDeleteContact = async (contactId) => {
  //   try {
  //     await deleteContact(contactId);
  //     dispatch({ type: 'DELETE_CONTACT', payload: contactId });
  //   } catch (error) {
  //     console.error('Error deleting contact:', error);
  //   }
  // };

  const handleContactClick = (contact) => {
    dispatch({ type: 'SET_SELECTED_CONTACT', payload: contact });
  };

  return (
    <div className="contact-list">
      <div className="chatList-header">Contacts</div>
      <div className="add-contact">
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Contact ID"
          value={newContact.id}
          onChange={(e) => setNewContact({ ...newContact, id: e.target.value })}
        />
        <button onClick={handleAddContact}>Add</button>
      </div>
      {contactList.map((contact) => (
        <div key={contact.contactId} className="contact-item" onClick={() => handleContactClick(contact)}>
          <span>{contact.name}</span>
          {/* <button onClick={() => handleDeleteContact(contact.id)}>Delete</button> */}
        </div>
      ))}
      {contactList?.length===0 && <div className='noContact'> Please Add Contacts First</div>}
    </div>
  );
};

export default ContactList;
