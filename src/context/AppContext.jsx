import React, { createContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  contacts: [
    { 
      contactId: '',
      name: '' 
    },
  ],
  messages: {},
  selectedContact: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };
    case 'SET_SELECTED_CONTACT':
      return { ...state, selectedContact: action.payload };
    case 'ADD_MESSAGE':
      const { contactId, message } = action.payload;
      return {
        ...state,
        messages: {
          ...state.messages,
          [contactId]: [...(state.messages[contactId] || []), message],
        },
      };
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload),
      };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
