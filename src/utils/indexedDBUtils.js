// // // utils/indexedDBUtils.js
// // const DB_NAME = 'ChatAppDB';
// // const DB_VERSION = 1;

// // export const openDB = () => {
// //   return new Promise((resolve, reject) => {
// //     const request = indexedDB.open(DB_NAME, DB_VERSION);

// //     request.onupgradeneeded = (event) => {
// //       const db = event.target.result;

// //       if (!db.objectStoreNames.contains('messages')) {
// //         db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
// //       }
// //       if (!db.objectStoreNames.contains('contacts')) {
// //         db.createObjectStore('contacts', { keyPath: 'id' });
// //       }
// //     };

// //     request.onsuccess = () => resolve(request.result);
// //     request.onerror = () => reject(request.error);
// //   });
// // };

// // export const addData = async (storeName, data) => {
// //   const db = await openDB();
// //   const transaction = db.transaction(storeName, 'readwrite');
// //   const store = transaction.objectStore(storeName);
// //   return store.add(data);
// // };

// // export const getData = async (storeName, key) => {
// //   const db = await openDB();
// //   const transaction = db.transaction(storeName, 'readonly');
// //   const store = transaction.objectStore(storeName);
// //   return new Promise((resolve, reject) => {
// //     const request = store.get(key);
// //     request.onsuccess = () => resolve(request.result);
// //     request.onerror = () => reject(request.error);
// //   });
// // };

// // export const getAllData = async (storeName) => {
// //   const db = await openDB();
// //   const transaction = db.transaction(storeName, 'readonly');
// //   const store = transaction.objectStore(storeName);
// //   return new Promise((resolve, reject) => {
// //     const request = store.getAll();
// //     request.onsuccess = () => resolve(request.result);
// //     request.onerror = () => reject(request.error);
// //   });
// // };


// import { openDB } from 'idb';

// const DB_NAME = 'ChatAppDB';
// const DB_VERSION = 1;

// export const dbPromise = openDB(DB_NAME, DB_VERSION, {
//   upgrade(db) {
//     if (!db.objectStoreNames.contains('messages')) {
//       db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
//     }
//     if (!db.objectStoreNames.contains('contacts')) {
//       db.createObjectStore('contacts', { keyPath: 'id' });
//     }
//   },
// });

// export const addData = async (storeName, data) => {
//   const db = await dbPromise;
//   return db.add(storeName, data);
// };

// export const getData = async (storeName, key) => {
//   const db = await dbPromise;
//   return db.get(storeName, key);
// };

// export const getAllData = async (storeName) => {
//   const db = await dbPromise;
//   return db.getAll(storeName);
// };

import { openDB } from 'idb';

const dbPromise = openDB('chat-app', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('messages')) {
      db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
    }
  },
});

export const saveMessage = async (message) => {
  const db = await dbPromise;
  await db.add('messages', message);
};

export const getMessagesForContact = async (contactId) => {
  const db = await dbPromise;
  const tx = db.transaction('messages', 'readonly');
  const store = tx.objectStore('messages');
  const allMessages = await store.getAll();
  return allMessages.filter(
    (msg) =>
      (msg.senderId === contactId || msg.receiverId === contactId)
  );
};
