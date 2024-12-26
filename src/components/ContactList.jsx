import React from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles/ContactList.css';

const ContactList = () => {
  const { state, dispatch } = useAppContext();

  const loggedInUserId = Number(localStorage.getItem('myContactId'));
  // const userName= 
  // Filter out the logged-in user from the contacts list
  const filteredContacts = state.contacts.filter(
    (contact) => contact.id !== loggedInUserId
  );

  const handleContactClick = (contact) => {
    dispatch({ type: 'SET_SELECTED_CONTACT', payload: contact });
  };

  return (
    <div className="contact-list">
      <div className="chatList-header">Chats</div>
      {filteredContacts.map((contact) => (
        <div
          key={contact.id}
          className="contact-item"
          onClick={() => handleContactClick(contact)}
        >
          {contact.name}
        </div>
      ))}
    </div>
  );
};

export default ContactList;

