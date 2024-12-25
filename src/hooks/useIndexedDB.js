import { openDB } from 'idb';

export const useIndexedDB = () => {
  const dbPromise = openDB('MessagingAppDB', 1, {
    upgrade(db) {
      const store = db.createObjectStore('messages', {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('contactId', 'contactId', { unique: false });
    },
  });

  const saveMessage = async (contactId, message) => {
    const db = await dbPromise;
    await db.put('messages', { contactId, ...message });
  };

  const getMessages = async (contactId) => {
    const db = await dbPromise;
    return db.getAllFromIndex('messages', 'contactId', contactId);
  };

  return { saveMessage, getMessages };
};
