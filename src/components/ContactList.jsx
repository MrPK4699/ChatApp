import React from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles/ContactList.css';

const ContactList = () => {
  const { state, dispatch } = useAppContext();

  const handleContactClick = (contact) => {
    dispatch({ type: 'SET_SELECTED_CONTACT', payload: contact });
  };

  return (
    <div className="contact-list">
      <div className="chatList-header">Chats</div>
      {state.contacts.map((contact) => (
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
