import { openDB } from 'idb';

export const useIndexedDB = () => {
  const dbPromise = openDB('MessagingAppDB', 1, {
    upgrade(db) {
      db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
    },
  });

  const addMessage = async (message) => {
    const db = await dbPromise;
    await db.put('messages', message);
  };

  const getMessages = async (contactId) => {
    const db = await dbPromise;
    return await db.getAllFromIndex('messages', 'contactId', contactId);
  };

  return { addMessage, getMessages };
};
